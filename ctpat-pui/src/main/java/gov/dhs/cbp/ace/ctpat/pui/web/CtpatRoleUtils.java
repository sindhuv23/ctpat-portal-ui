package gov.dhs.cbp.ace.ctpat.pui.web;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import cbp.common.security.EntitlementUser;

public final class CtpatRoleUtils {

  private static final List<String> Trade = Arrays.asList("ROLE_ACE_TRD_AO_49910019999999",
      "ROLE_ACE_TRD_PAO_49910029999999", "ROLE_ACE_TRD_BAU_49910101001111");

	public static final List<String> Legacy_Ctpat_Roles=Arrays.asList(
			"CBP_TEAM_REVIEW_ADMINISTRATOR_19931099991111","CBP_TEAM_REVIEW_OWNER_19931089991111");
  
	public static final List<String> Entitlement_Ctpat_Roles=Arrays.asList(
		  "ROLE_ACE_OBJ_CTPAT_ADMIN", "ROLE_ACE_OBJ_CTPAT_EDIT_USER", "ROLE_ACE_OBJ_CTPAT_READONLY");
  
  private static final Map<String, List<GrantedAuthority>> legacyToEntitlementRoleMap= new HashMap<>(){
	  {
		  put("ROLE_ACE_CBP_TEAM_REVIEW_ADMINISTRATOR_19931099991111",  Arrays.asList(new SimpleGrantedAuthority("ROLE_ACE_OBJ_CTPAT_EDIT_USER")));
		  put("ROLE_ACE_CBP_TEAM_REVIEW_OWNER_19931089991111", Arrays.asList(new SimpleGrantedAuthority("ROLE_ACE_OBJ_CTPAT_EDIT_USER")));
		  
		  put("ROLE_ACE_TRD_AO_49910019999999", Arrays.asList(new SimpleGrantedAuthority("ROLE_ACE_OBJ_CBP_TRADE_USER")));
		  put("ROLE_ACE_TRD_PAO_49910029999999", Arrays.asList(new SimpleGrantedAuthority("ROLE_ACE_OBJ_CBP_TRADE_USER")));
		  put("ROLE_ACE_TRD_BAU_49910101001111", Arrays.asList(new SimpleGrantedAuthority("ROLE_ACE_OBJ_CBP_TRADE_USER")));
		  
	  }
  };
  
  public static  enum CTPAT_ROLE {
	  
	  CBP_ROLE("ROLE_ACE_OBJ_CTPAT_ADMIN",
				"ROLE_ACE_OBJ_CTPAT_EDIT_USER",
				"ROLE_ACE_OBJ_CTPAT_READONLY"),
		
	  	TRADE_ROLE("ROLE_ACE_OBJ_CBP_TRADE_USER");
	    private String[] name;

	    CTPAT_ROLE(String... name) {
	        this.name = name;
	    }

	    public String[] roles() {
	        return name;
	    }
	    
  }
  
  public static final List<GrantedAuthority> getEntitlementRoles(String legacyRole) {
	  List<GrantedAuthority> l=  legacyToEntitlementRoleMap.get(legacyRole);
	  return l==null?Collections.EMPTY_LIST:l;
  }
  
  public static Boolean hasAgencyRoles(EntitlementUser entitlementUser, CTPAT_ROLE roles) {

	    Boolean result = false;

	    for (String role : roles.name) {

	      boolean hasUserRole =
	          entitlementUser.getAuthorities().stream().anyMatch(r -> r.getAuthority().equals(role));

	      if (hasUserRole) {
	        result = true;
	        break;
	      }
	    }

	    return result;
  }
}
