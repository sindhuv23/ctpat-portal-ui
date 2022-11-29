package gov.dhs.cbp.ace.ctpat.pui.config;

import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;
import javax.crypto.NoSuchPaddingException;
import javax.naming.ConfigurationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.annotation.Order;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.EnumerablePropertySource;
import org.springframework.core.env.Environment;
import org.springframework.core.env.PropertySource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsByNameServiceWrapper;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationProvider;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.web.client.RestTemplate;
import cbp.common.security.CbpPreAuthAccessDeniedHandler;
import cbp.common.security.EntitlementUserDetailsService;
import cbp.common.security.ProxyUserPersistenceFilter;
import cbp.common.security.SessionAuthenticationFilter;
import cbp.common.security.crypto.DESedeCryptoService;
import cbp.common.security.logout.SingleSignonLogoutHandler;
import cbp.common.security.sso.SSOCookieService;
import gov.dhs.cbp.ace.ctpat.pui.service.UserService;
import gov.dhs.cbp.ace.ctpat.pui.web.CtpatRoleUtils;
import gov.dhs.cbp.ace.ctpat.pui.web.SSOFilter;

@Configuration
@Order(2)
@ComponentScan({"cbp.common.security"})
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SsoConfig extends WebSecurityConfigurerAdapter {

  private static final Logger logger = LoggerFactory.getLogger(SsoConfig.class);



  @Autowired
  private Environment env;

  @Autowired
  RestTemplate restTemplate;

  public SsoConfig() {
    super();
    SecurityContextHolder.setStrategyName(SecurityContextHolder.MODE_INHERITABLETHREADLOCAL);
  }

  @Bean
  public SSOCookieService ssoCookieService() {
    return new SSOCookieService(env.getProperty("sso.cookie.name"),
        env.getProperty("sso.cookie.purpose"), env.getProperty("sso.cookie.domain"),
        env.getProperty("sso.cookie.path"));
  }

  @Bean(name = {"crypto", "cryptoService"})
  public DESedeCryptoService cryptoService()
      throws NoSuchAlgorithmException, NoSuchPaddingException {
    return new DESedeCryptoService(env.getProperty("sso.crypto.key"),
        env.getProperty("sso.crypto.iv"), env.getProperty("sso.crypto.cipher"),
        env.getProperty("sso.crypto.spec"));
  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.authenticationProvider(preauthAuthProvider());
  }

  @Override
  protected void configure(HttpSecurity http) throws ConfigurationException {

    try {
      http.requiresChannel().and().csrf()
          .disable().authorizeRequests()
          .regexMatchers(env.getProperty("sso.filter.excludePatterns")).permitAll().and()
          .authorizeRequests().antMatchers("/api/**").authenticated().and()
         .authorizeRequests().antMatchers("/**").hasAnyAuthority(Stream.concat(Stream.of(CtpatRoleUtils.CTPAT_ROLE.CBP_ROLE.roles()), 
        		 Stream.of(CtpatRoleUtils.CTPAT_ROLE.TRADE_ROLE.roles())).toArray(String[]::new)).and()
         .authorizeRequests().and().exceptionHandling()
         .accessDeniedHandler(new CbpPreAuthAccessDeniedHandler()).and().addFilter(logoutFilter())
          .addFilter(sessionAuthFilter())
          .addFilterAfter(proxyUserPersistenceFilter(), SessionAuthenticationFilter.class).headers()
          .frameOptions().disable();
    } catch (Exception e) {
      ConfigurationException ce = new ConfigurationException("Failed to configure http security");
      ce.setRootCause(e);
      throw ce;
    }

  }

  @Bean(name = "authenticationManager")
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  @Bean
  public SessionAuthenticationFilter sessionAuthFilter() throws Exception {
    SessionAuthenticationFilter filter = new SessionAuthenticationFilter();
    filter.setPrincipalSessionKey("userId");
    filter.setRetrieveCredentialsFromCookie("false");
    filter.setExceptionIfUserSessionMissing("false");
    filter.setRetrieveTokenFromHeader("false");
    filter.setAuthenticationManager(authenticationManager());
    return filter;
  }

  @Bean
  public ProxyUserPersistenceFilter proxyUserPersistenceFilter() throws ConfigurationException {
    ProxyUserPersistenceFilter filter = new ProxyUserPersistenceFilter();
    filter.setSsoFilterExcludePattern(env.getProperty("sso.filter.excludePatterns"));
    return filter;
  }

  @Bean
  public PreAuthenticatedAuthenticationProvider preauthAuthProvider() {
    PreAuthenticatedAuthenticationProvider preauthAuthProvider =
        new PreAuthenticatedAuthenticationProvider();
    preauthAuthProvider.setPreAuthenticatedUserDetailsService(userDetailsServiceWrapper());
    return preauthAuthProvider;
  }

  @Bean
  public UserDetailsByNameServiceWrapper<PreAuthenticatedAuthenticationToken> userDetailsServiceWrapper() {
    // 180 characters length line for single assignment, wow
    UserDetailsByNameServiceWrapper<PreAuthenticatedAuthenticationToken> userDetailsServiceWrapper =
        new UserDetailsByNameServiceWrapper<PreAuthenticatedAuthenticationToken>();
    userDetailsServiceWrapper.setUserDetailsService(customUserDetailsService());
    return userDetailsServiceWrapper;
  }

  @Bean
  public EntitlementUserDetailsService customUserDetailsService() {
    EntitlementUserDetailsService customUserDetailsService = new EntitlementUserDetailsService();
    customUserDetailsService
        .setSystemEnvironment(env.getProperty("sso.entitlement.systemEnvironment"));
    customUserDetailsService
        .setApplicationToken(env.getProperty("sso.entitlement.applicationToken"));
    customUserDetailsService
        .setSupportedSystems(env.getProperty("sso.entitlement.supportedSystems"));
    customUserDetailsService.setSystemName(env.getProperty("sso.entitlement.systemName"));
    return customUserDetailsService;
  }

  @Bean
  @Primary
  public cbp.common.security.service.UserService userService() {
    return new UserService(env.getProperty("sso.filter.loginHost", "dev"),
        env.getProperty("sso.entitlement.systemName"),
        env.getProperty("sso.ace.userservice.url",
            "https://apps-dev.sat.cbp.dhs.gov/aceusersvc/getUserDetails"),
        Integer.parseInt(env.getProperty("sso.entitlement.totalAttempts")), restTemplate);
  }

  /**
   * Logout Will invoke two logout handlers: SecurityContextLogoutHandler and
   * SingleSignonLogoutHandler to clear the session and the Cookie containing the SSO token
   * identified by singleSignonCookieName. After the handlers execute successfully,
   * SingleSignOnLogoutSuccessHandler is invoked.
   *
   */
  @Bean
  public LogoutFilter logoutFilter() {
    return new LogoutFilter(singleSignOnLogoutSuccessHandler(), securityContextLogoutHandler(),
        singleSignonLogoutHandler());
  }

  @Bean
  public SimpleUrlLogoutSuccessHandler singleSignOnLogoutSuccessHandler() {
    SimpleUrlLogoutSuccessHandler l = new SimpleUrlLogoutSuccessHandler();
    l.setAlwaysUseDefaultTargetUrl(true);
    l.setDefaultTargetUrl("/logoff");
    return l;
  }

  @Bean
  public SecurityContextLogoutHandler securityContextLogoutHandler() {
    SecurityContextLogoutHandler l = new SecurityContextLogoutHandler();
    l.setClearAuthentication(true);
    l.setInvalidateHttpSession(true);
    return l;
  }

  @Bean
  public SingleSignonLogoutHandler singleSignonLogoutHandler() {
    SingleSignonLogoutHandler singleSignonLogoutHandler = new SingleSignonLogoutHandler();
    singleSignonLogoutHandler.setSessionAttributeForUserId("userId");
    return singleSignonLogoutHandler;
  }

  private Map<String, String> getSsoProps() {

    Map<String, String> ssoProps = new HashMap<>();
    if (env instanceof ConfigurableEnvironment) {
      for (PropertySource<?> propertySource : ((ConfigurableEnvironment) env)
          .getPropertySources()) {
        if (propertySource instanceof EnumerablePropertySource) {
          for (String key : ((EnumerablePropertySource<?>) propertySource).getPropertyNames()) {
            if (key.startsWith("sso")) {
              ssoProps.put(key, propertySource.getProperty(key).toString());
              logger.info("SSO Properties : {} = {}", key, propertySource.getProperty(key));
            }

          }
        }
      }
    }

    return ssoProps;
  }

  @Bean
  public FilterRegistrationBean<SSOFilter> ssoFilterRegistrationBean() {
    FilterRegistrationBean<SSOFilter> registrationBean = new FilterRegistrationBean<>();

    registrationBean.setFilter(new SSOFilter(env));
    registrationBean.setInitParameters(getSsoProps());
    registrationBean.setName("SSOFilter");
    registrationBean.addUrlPatterns("/*");
    registrationBean.setOrder(SecurityProperties.DEFAULT_FILTER_ORDER - 100);
    return registrationBean;
  }

}
