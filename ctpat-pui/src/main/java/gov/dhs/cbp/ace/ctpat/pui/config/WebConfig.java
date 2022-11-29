package gov.dhs.cbp.ace.ctpat.pui.config;

import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.List;
import javax.net.ssl.SSLContext;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.tomcat.util.http.LegacyCookieProcessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.MimeMappings;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.env.Environment;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextListener;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import gov.dhs.cbp.ace.ctpat.pui.web.CtpatForwardedHeaderFilter;
import gov.dhs.cbp.ace.ctpat.pui.web.StaticAssetCacheFilter;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  
  private static final Logger logger = LoggerFactory.getLogger(WebConfig.class);

  @Autowired
  private Environment env;

//  @Value("${http.port:8080}")
 // private int httpPort;

  @Bean
  @ConditionalOnMissingBean(RequestContextListener.class)
  public RequestContextListener requestContextListener() {
    return new RequestContextListener();
  }

  @Bean
  public RestTemplate restTemplate()
      throws KeyManagementException, NoSuchAlgorithmException, KeyStoreException {
    RestTemplate restTemplate = new RestTemplate();
    List<HttpMessageConverter<?>> messageConverters = new ArrayList<>();
    messageConverters.add(new StringHttpMessageConverter());
    restTemplate.setRequestFactory(requestFactory());
    return restTemplate;
  }

  @Bean
  public HttpComponentsClientHttpRequestFactory requestFactory()
      throws KeyManagementException, NoSuchAlgorithmException, KeyStoreException {
    HttpComponentsClientHttpRequestFactory requestFactory =
        new HttpComponentsClientHttpRequestFactory();
    requestFactory.setHttpClient(httpClient());
    return requestFactory;
  }

  @Bean
  public HttpClient httpClient()
      throws KeyManagementException, NoSuchAlgorithmException, KeyStoreException {
    return HttpClientBuilder.create().setDefaultRequestConfig(requestConfig())
        .setConnectionManager(connectionManager()).build();
  }

  @Bean
  public PoolingHttpClientConnectionManager connectionManager()
      throws KeyManagementException, NoSuchAlgorithmException, KeyStoreException {
    PoolingHttpClientConnectionManager connectionManager;
    if (env.getProperty("ssl.cert.validation.disable", Boolean.class)) {
      TrustStrategy acceptingTrustStrategy = (X509Certificate[] chain, String authType) -> true;

      SSLContext sslContext = org.apache.http.ssl.SSLContexts.custom()
          .loadTrustMaterial(null, acceptingTrustStrategy).build();

      SSLConnectionSocketFactory csf =
          new SSLConnectionSocketFactory(sslContext, new NoopHostnameVerifier());
      Registry<ConnectionSocketFactory> socketFactoryRegistry =
          RegistryBuilder.<ConnectionSocketFactory>create().register("https", csf)
              .register("http", PlainConnectionSocketFactory.getSocketFactory()).build();
      connectionManager = new PoolingHttpClientConnectionManager(socketFactoryRegistry);
    } else {
      connectionManager = new PoolingHttpClientConnectionManager();
    }
    connectionManager.setMaxTotal(env.getProperty("rest.client.max-total", Integer.class));
    connectionManager
        .setDefaultMaxPerRoute(env.getProperty("rest.client.default-max-per-route", Integer.class));
    connectionManager.setValidateAfterInactivity(1);
    return connectionManager;
  }

  @Bean
  public RequestConfig requestConfig() {
	Integer timeoutConn = env.getProperty("rest.client.connect.timeout", Integer.class);
	Integer timeoutSocket = env.getProperty("rest.client.socket.timeout", Integer.class);
    return RequestConfig.custom()
        .setConnectTimeout(env.getProperty("rest.client.connect.timeout", Integer.class))
        .setSocketTimeout(env.getProperty("rest.client.socket.timeout", Integer.class)).build();
  }

  @Bean
  public WebServerFactoryCustomizer<TomcatServletWebServerFactory> tomcatCustomizer() {
    return (final TomcatServletWebServerFactory factory) -> {

//      Connector connector = new Connector(TomcatServletWebServerFactory.DEFAULT_PROTOCOL);
//      connector.setPort(httpPort);
//      factory.addAdditionalTomcatConnectors(connector);

      // Add correct mime types Angular assets
      MimeMappings mappings = new MimeMappings(MimeMappings.DEFAULT);
      mappings.add("woff", "application/font-woff");
      mappings.add("woff2", "application/font-woff2");
      mappings.add("ttf", "application/x-font-truetype");
      mappings.add("eot", "application/vnd.ms-fontobject");
      mappings.add("svg", "image/svg+xml");
      mappings.add("otf", "application/x-font-opentype");
      factory.setMimeMappings(mappings);

      factory.addContextCustomizers(
          (context) -> context.setCookieProcessor(new LegacyCookieProcessor()));
    };
  }

  @Bean
  FilterRegistrationBean<CtpatForwardedHeaderFilter> forwardedHeaderFilter() {
    FilterRegistrationBean<CtpatForwardedHeaderFilter> filterRegistrationBean =
        new FilterRegistrationBean<>();
    filterRegistrationBean.setFilter(new CtpatForwardedHeaderFilter(env));
    filterRegistrationBean.setOrder(Ordered.HIGHEST_PRECEDENCE);
    return filterRegistrationBean;
  }

  @Bean
  FilterRegistrationBean<StaticAssetCacheFilter> staticAssetCacheFilter() {
    FilterRegistrationBean<StaticAssetCacheFilter> filterRegistrationBean =
        new FilterRegistrationBean<>();
    filterRegistrationBean.setFilter(new StaticAssetCacheFilter());
    filterRegistrationBean.setOrder(Ordered.LOWEST_PRECEDENCE);
    filterRegistrationBean.addUrlPatterns("*.woff", "*.woff2", "*.ttf", "*.eot", "*.svg", "*.otf");
    return filterRegistrationBean;
  }

}
