package gov.dhs.cbp.ace.ctpat.pui.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import cbp.common.security.EntitlementUser;
import cbp.common.security.logout.SingleSignonLogoutHandler;

@Controller
public class CtpatPuiIndexController {

  private static final Logger logger = LoggerFactory.getLogger(CtpatPuiIndexController.class);

  private static final String ANONYMOUS_USER = "anonymousUser";
  private static final String IV_USER = "iv-user";
  private static final String ACE_USER_TYPE = "aceusertype";
  private static final String VIA = "via";

  @Autowired
  SingleSignonLogoutHandler logoutHandler;
/*
  @RequestMapping({"/"})
	public String indexPage(@RequestHeader(required = false, name = "x-forwarded-server") String xFwdSrv) {
		String indexPage = "forward:/index.html";

		if (xFwdSrv != null) { // Coming through reverse proxy
			// Serve proxy index page
			logger.debug("Coming through reverse proxy, forwarding to index.proxy.html");
			indexPage = "forward:/index.proxy.html";
		} else {
			logger.debug("Not coming through reverse proxy, forwarding to index.html");
		}

		return indexPage;
	}
 */
  @RequestMapping({"/"})
  public String index(@AuthenticationPrincipal EntitlementUser user, HttpServletRequest req,
      HttpServletResponse resp, @RequestHeader(required = false, name = "x-forwarded-server") String xFwdSrv) {
    String indexPage = "forward:/index.html";
    if (xFwdSrv != null) { // Coming through reverse proxy
		// Serve proxy index page
		logger.debug("Coming through reverse proxy, forwarding to index.proxy.html");
		indexPage = "forward:/index.proxy.html";
	} else {
		logger.debug("Not coming through reverse proxy, forwarding to index.html");
	}
    

    logger.debug("Index page request with headers {} {} {}", req.getHeader(IV_USER),
        req.getHeader(ACE_USER_TYPE), req.getHeader(VIA));
    if ((req.getHeader(IV_USER) != null) && (req.getHeader(ACE_USER_TYPE) != null)
        && (req.getHeader(VIA) != null)) {
      if (!user.getUserId().equalsIgnoreCase(req.getHeader(IV_USER))) {
        logger.error("Incoming webseal user doesnot match {}/{} EntitlementUser auth token.",
            req.getHeader(IV_USER), user.getUserId());
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
          logoutHandler.logout(req, resp, auth);
          logger.error("Loggedout user {}.Cleaned up old cached auth token from legacy ACE.",
              user.getUserId());
        }
      }

      // Coming through webseal junction. serve sso index page
      indexPage = "forward:/index.seal.html";
    }

    return indexPage;
  }
  
  @RequestMapping(value = {"/loggedoff"}, method = RequestMethod.GET)
  public String loggedoff(HttpServletRequest req, HttpServletResponse resp) {
	  if (SecurityContextHolder.getContext() != null) {
	      Authentication auth = SecurityContextHolder.getContext().getAuthentication();

	      if ((auth != null) && !ANONYMOUS_USER.equalsIgnoreCase(auth.getName())) {
	        logoutHandler.logout(req, resp, auth);
	        logger.info("Loggedout user {}.", auth.getName());
	      }
	    }
     return "forward:/sessionEnd.html";
  }
  

}
