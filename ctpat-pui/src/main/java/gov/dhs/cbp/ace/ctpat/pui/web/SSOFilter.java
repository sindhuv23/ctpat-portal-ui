package gov.dhs.cbp.ace.ctpat.pui.web;

import java.net.MalformedURLException;
import java.net.URL;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;

public class SSOFilter extends cbp.common.security.sso.SSOFilter {

  private static final Logger logger = LoggerFactory.getLogger(SSOFilter.class);
  private Environment env;

  public SSOFilter(Environment env) {
    super();
    this.env = env;
  }
  

@Override
  public String makeRedirectUrlWithTarget(HttpServletRequest httpReq, String target) {
	
    
    if (httpReq.getHeader("X-Forwarded-Host") != null) {
      String qString = httpReq.getQueryString() != null ? "?" + httpReq.getQueryString() : "";
      String fwdHostProp = env.getProperty("sso.filter.webseal.hostUrl");
      String proxyPatchPath = env.getProperty("sso.filter.proxy.patchPath", "/ace/ctpat");
      String junction = env.getProperty("sso.filter.webseal.junction", "/nace");
      if ((fwdHostProp != null) && !fwdHostProp.trim().isEmpty()
          && fwdHostProp.startsWith("http")) {
        URL websealHostUrl;
        try {
          // Check if coming through webseal
          websealHostUrl = new URL(fwdHostProp);
          URL forwardHostUrl= new URL("https://"+httpReq.getHeader("X-Forwarded-Host"));
          if (websealHostUrl.getHost().equalsIgnoreCase(httpReq.getHeader("X-Forwarded-Host"))) {
            target = "?targetUrl=" + websealHostUrl + junction + httpReq.getRequestURI() + qString;
          }else {
              target = "?targetUrl=" + forwardHostUrl + httpReq.getRequestURI() + qString;  
          }
        } catch (MalformedURLException e) {
          logger.error("Unable re-construct target url.Invalid webseal host url", e);
        }

      } else {
        logger.error("Unable re-construct target url.Invalid sso.filter.webseal.hostUrl : {}",
            env.getProperty("sso.filter.webseal.hostUrl"));
      }
    }

    logger.debug("Constructed target {}", target);

    return super.makeRedirectUrlWithTarget(httpReq, target);
  }

}
