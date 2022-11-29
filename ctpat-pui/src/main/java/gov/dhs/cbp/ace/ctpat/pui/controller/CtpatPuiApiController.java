package gov.dhs.cbp.ace.ctpat.pui.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import cbp.common.security.EntitlementUser;
import gov.dhs.cbp.ace.ctpat.pui.service.CtpatUser;

@RestController
@RequestMapping("/api")
public class CtpatPuiApiController {

  private static final Logger logger = LoggerFactory.getLogger(CtpatPuiApiController.class);

  public static final DateTimeFormatter formatter =
      DateTimeFormatter.ofPattern("u-MM-dd' 'HH:mm:ss.SSS");

  @Autowired
  private Environment env;
  
  @RequestMapping(value = {"/user"}, method = RequestMethod.GET)
  public Map<String, Object> principal(@AuthenticationPrincipal EntitlementUser user) {
    Map<String, Object> responseBody = new HashMap<>();

    if (user != null) {
      logger.debug("Returning Ctpat User info {}", user);
      responseBody.put("entitlementUser", user);
    } else {
      responseBody.put("entitlementUser", "");
    }

    responseBody.put("date-time", LocalDateTime.now().format(formatter));
    return responseBody;
  }
  
  @RequestMapping(value = {"/hostUrl"}, method = RequestMethod.GET)
  public Map<String, Object> hostUri(@AuthenticationPrincipal CtpatUser user,
		  HttpServletRequest req, HttpServletResponse resp) {
	  	Map<String, Object> responseBody = new HashMap<>();	
	  	String hostName= req.getHeader("X-Forwarded-Host");
	  	StringBuffer url = new StringBuffer();
	  	url.append("https://").append(hostName);
        String proxyPatchPath = env.getProperty("sso.filter.proxy.patchPath", "/ace/ctpat");
        String junction = env.getProperty("sso.filter.webseal.junction", "/nace");
        if (user.isLoginFromWebSeal()) {
        	responseBody.put("ctpatHostUrl", url.toString()+junction+proxyPatchPath);
        }else {
        	responseBody.put("ctpatHostUrl",  url.toString()+proxyPatchPath);
        }
        return responseBody;
  }
  
  public static void logHeaderCookies(String location, HttpServletRequest req, HttpServletResponse resp) {
	  Enumeration<String >headerNames= req.getHeaderNames();
	  if (headerNames != null) {
		  while(headerNames.hasMoreElements()) {
		    String headerName = headerNames.nextElement();
		    logger.info("["+location+" Header] " + headerName +"="+req.getHeader(headerName));
		  }
	  }
	  
	  Cookie[] cookies= req.getCookies();
	  if (cookies !=null) {
		  for (Cookie cookie: cookies) {
			  logger.info("["+location+" Cookie] " + cookie.getName() +"="+cookie.getValue());
		  }
	  }
  }
}
