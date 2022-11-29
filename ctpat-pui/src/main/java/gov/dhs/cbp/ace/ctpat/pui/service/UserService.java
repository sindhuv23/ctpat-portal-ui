package gov.dhs.cbp.ace.ctpat.pui.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import cbp.common.security.EntitlementUser;
import gov.dhs.cbp.ace.ctpat.pui.web.CtpatRoleUtils;
import gov.dhs.cbp.ace.ctpat.pui.web.CtpatRoleUtils.CTPAT_ROLE;

public class UserService extends cbp.common.security.service.UserService {

  private static final Logger logger = LoggerFactory.getLogger(UserService.class);

  private static final String ENTITLEMENT_ROLE_PREFIX = "ROLE_ACE_OBJ_CTPAT";

  private static final String REQ_HEADER_IV_USER = "iv-user";
  private static final String REQ_HEADER_ACE_USER_TYPE = "aceusertype";
  private static final String REQ_HEADER_VIA = "via";

  private static final String USER_TYPE_CBP = "1";
  private static final String USER_TYPE_TRADE = "4";

  private RestTemplate restTemplate;
  private String aceusrSvcUrl;


  public UserService(String requestedEnv, String systemName, String aceusrSvcUrl, int totalAttempts,
      RestTemplate restTemplate) {
    super(requestedEnv, systemName);
    this.aceusrSvcUrl = aceusrSvcUrl;
    super.setTotalAttempts(totalAttempts);
    this.restTemplate = restTemplate;
  }

  @Override
  public  CtpatUser getUserDetails(String userName, String ip, String tokenKey) {

    HttpServletRequest req =
        ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
    boolean frowWebSeal=false;
    String userACEId=StringUtils.EMPTY;
    if ((req.getHeader(REQ_HEADER_IV_USER) != null)
        && (req.getHeader(REQ_HEADER_ACE_USER_TYPE) != null)
        && (req.getHeader(REQ_HEADER_VIA) != null)) {
    	frowWebSeal = true;
      if (!userName.equalsIgnoreCase(req.getHeader("iv-user"))) {
        logger.error("Incoming webseal user doesnot match {}/{} EntitlementUser auth token.",
            req.getHeader("iv-user"), userName);
      }
      // Coming through Legacy ace
      logger.info("getUserDetails for Legacy ACE user {} {} {} {}", userName,
          req.getHeader("iv-user"), req.getHeader("aceusertype"), req.getHeader("via"));
    } else {
      logger.debug("getUserDetails for EntitlementUser user {}", userName);
    }

    EntitlementUser u = super.getUserDetails(userName, ip, tokenKey);
    if (!"5000".equalsIgnoreCase(u.getLogonStatus().get("number")) ||
    		!hasCtpatRoles(u)) {
      logger.debug("Unable to get user {} details from entitlement", userName);
      try {
        String aceUser = restTemplate.getForObject(aceusrSvcUrl + "/" + userName, String.class);
        logger.info("Legacy ACE usr is :{} ", aceUser);
        JSONObject userDetailsNode = new JSONObject(aceUser);
        u = u.setUserId(userDetailsNode.optString("userId"))
            .setFirstName(userDetailsNode.optString("firstName"))
            .setLastName(userDetailsNode.optString("lastName"))
            .setAuthorities(UserService.getAuthoritiesFromAuthorizations(
                UserService.getListMapFromJson(userDetailsNode.optJSONArray("roles"))));
        
        userACEId = userDetailsNode.optString("userACEId");
      // u.getAuthorities().add(new SimpleGrantedAuthority("ROLE_ACE_TRD_AO_49910019999999"));
        if (USER_TYPE_CBP.equals(userDetailsNode.optString("userType"))) { // Set the agency for CBP
                                                                           // users
          Map<String, String> agency = new HashMap<>();

          agency.put("code", "TC");
          agency.put("name", "CBP");
          u.setAgency(agency);
          
        } else if (USER_TYPE_TRADE.equals(userDetailsNode.optString("userType"))) { 
          Map<String, String> agency = new HashMap<>();

          agency.put("code", "TR");
          agency.put("name", "TRADE");
          u.setAgency(agency);
         
        }

        logger.info("Updated Ace user {} roles from Ace usr svc : {}", userName, u);
      } catch (RestClientException rex) {
        logger.error("Unable to query Ace usr svc @{} for legacy portal roles.", aceusrSvcUrl, rex);
      }
    }

    logger.debug("EntitlementUser user type : {}", u.getClass().getCanonicalName());

     u.setAuthorities(mapLegacyPortalRoles(u.getAuthorities()));
     logUser(u, frowWebSeal);
     CtpatUser ctpatUser = new CtpatUser(u, frowWebSeal,userACEId);
     return ctpatUser;
     
  }

  private static void logUser(EntitlementUser u, boolean frowWebSeal) {
	  if (CtpatRoleUtils.hasAgencyRoles(u, CTPAT_ROLE.CBP_ROLE)) {
		  if (frowWebSeal) {
			  logger.info ("[Login] A CBP User Logged in from WebSeal");
		  }else {
			  logger.info ("[Login] A CBP User Logged in from Entitlement"); 
		  }
	  }else if (CtpatRoleUtils.hasAgencyRoles(u, CTPAT_ROLE.TRADE_ROLE)){
		  if (frowWebSeal) {
			  logger.info ("[Login] A Trade User Logged in from WebSeal");
		  }else {
			  logger.info ("[Login] A Trade User Logged in from Entitlement"); 
		  }
	  }
  }
  private static void mapToEntitlementRole(String userRole, ArrayList<GrantedAuthority> list) {
    for (GrantedAuthority aEnRole : CtpatRoleUtils.getEntitlementRoles(userRole)) {
      if (!list.contains(aEnRole)) {
        list.add(aEnRole);
        logger.debug("Mapped Legacy Role {} to Entitlement Role {} ", userRole, aEnRole);
      }
    }
  }

  private static List<GrantedAuthority> mapLegacyPortalRoles(List<GrantedAuthority> allRoles) {
    ArrayList<GrantedAuthority> list = new ArrayList<>();
    for (GrantedAuthority aRole : allRoles) {
      String userRole = aRole.getAuthority();
      
      if (userRole.startsWith(ENTITLEMENT_ROLE_PREFIX)) {
    	  if (!list.contains(aRole)) {
    		  list.add(aRole);
    	  }
      } else {
        mapToEntitlementRole(userRole, list);
      }
    }
    return list;
  }

  private static List<Map<String, String>> getListMapFromJson(JSONArray input) {
    List<Map<String, String>> list = new ArrayList<>();
    for (int i = 0; i < input.length(); i++) {
      list.add(getMapFromJson(input.getJSONObject(i)));
    }
    return list;
  }

  private static Map<String, String> getMapFromJson(JSONObject input) {
    Map<String, String> map = new HashMap<>();
    for (String k : input.keySet()) {
      map.put(k, input.getString(k));
    }
    return map;
  }

  private static List<GrantedAuthority> getAuthoritiesFromAuthorizations(
      List<Map<String, String>> authorizations) {
    ArrayList<GrantedAuthority> list = new ArrayList<>();

    for (Map<String, String> a : authorizations) {
      list.add(new SimpleGrantedAuthority("ROLE_" + a.get("system") + "_" + a.get("permission")));
    }

    return list;
  }

  private static Boolean hasCtpatRoles(EntitlementUser entitlementUser) {

    Boolean result = false;

    for (String role : CtpatRoleUtils.Entitlement_Ctpat_Roles) {

      boolean hasUserRole =
          entitlementUser.getAuthorities().stream().anyMatch(r -> r.getAuthority().equals(role));

      if (hasUserRole) {
        result = true;
        break;
      }
    }

    logger.debug("hasCtpatRoles return " + result);

    return result;
  }
}
