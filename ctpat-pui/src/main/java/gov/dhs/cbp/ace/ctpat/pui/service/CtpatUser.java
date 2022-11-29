package gov.dhs.cbp.ace.ctpat.pui.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;

import cbp.common.security.EntitlementUser;

public class CtpatUser extends EntitlementUser {
	private boolean loginFromWebSeal;
	private String userAceId;
	private EntitlementUser entitlementUser;
	
	private static final Logger logger = LoggerFactory.getLogger(CtpatUser.class);
	
	public CtpatUser(EntitlementUser entitlementUser,boolean loginFromWebSeal , String userAceId) {
		this(loginFromWebSeal, userAceId);
		this.entitlementUser=entitlementUser;		
	}
	public CtpatUser(boolean loginFromWebSeal,String userAceId) {
		super();
		this.loginFromWebSeal = loginFromWebSeal;
		this.userAceId= userAceId;
	}

	public boolean isLoginFromWebSeal() {
		return loginFromWebSeal;
	}

	public void setLoginFromWebSeal(boolean loginFromWebSeal) {
		this.loginFromWebSeal = loginFromWebSeal;
	}
	@Override
	public List<Map<String, String>> initAuthorizations(Map<String, Object> input) {
		// TODO Auto-generated method stub
		return entitlementUser.initAuthorizations(input);
	}
	@Override
	public List<String> initSystems(Map<String, Object> input) {
		// TODO Auto-generated method stub
		return entitlementUser.initSystems(input);
	}
	@Override
	public String getUserId() {
		// TODO Auto-generated method stub
		return entitlementUser.getUserId();
	}
	@Override
	public String getLastName() {
		// TODO Auto-generated method stub
		return entitlementUser.getLastName();
	}
	@Override
	public String getFirstName() {
		// TODO Auto-generated method stub
		return entitlementUser.getFirstName();
	}
	@Override
	public String getMiddleName() {
		// TODO Auto-generated method stub
		return entitlementUser.getMiddleName();
	}
	@Override
	public String getEmail() {
		// TODO Auto-generated method stub
		return entitlementUser.getEmail();
	}
	@Override
	public String getDefaultPortCode() {
		// TODO Auto-generated method stub
		return entitlementUser.getDefaultPortCode();
	}
	@Override
	public String getDefaultPortName() {
		// TODO Auto-generated method stub
		return entitlementUser.getDefaultPortName();
	}
	@Override
	public String getAgencyCode() {
		// TODO Auto-generated method stub
		return entitlementUser.getAgencyCode();
	}
	@Override
	public String getAgencyName() {
		// TODO Auto-generated method stub
		return entitlementUser.getAgencyName();
	}
	@Override
	public String getCountry() {
		// TODO Auto-generated method stub
		return entitlementUser.getCountry();
	}
	@Override
	public String getUpn() {
		// TODO Auto-generated method stub
		return entitlementUser.getUpn();
	}
	@Override
	public String getIpAddr() {
		// TODO Auto-generated method stub
		return entitlementUser.getIpAddr();
	}
	@Override
	public List<String> getContactAddresses() {
		// TODO Auto-generated method stub
		return entitlementUser.getContactAddresses();
	}
	@Override
	public List<String> getContactPhones() {
		// TODO Auto-generated method stub
		return entitlementUser.getContactPhones();
	}
	@Override
	public Map<String, List<String>> getContact() {
		// TODO Auto-generated method stub
		return entitlementUser.getContact();
	}
	@Override
	public Map<String, String> getAgency() {
		// TODO Auto-generated method stub
		return entitlementUser.getAgency();
	}
	@Override
	public Map<String, String> getDefaultPort() {
		// TODO Auto-generated method stub
		return entitlementUser.getDefaultPort();
	}
	@Override
	public Map<String, String> getLogonStatus() {
		// TODO Auto-generated method stub
		return entitlementUser.getLogonStatus();
	}
	@Override
	public Map<String, Object> getAuthorization() {
		// TODO Auto-generated method stub
		return entitlementUser.getAuthorization();
	}
	@Override
	public Set<String> getAuthorizedPorts() {
		// TODO Auto-generated method stub
		return entitlementUser.getAuthorizedPorts();
	}
	@Override
	public Set<Integer> getAuthorizedTeams() {
		// TODO Auto-generated method stub
		return entitlementUser.getAuthorizedTeams();
	}
	@Override
	public List<Map<String, Object>> getAuthorizedPortDetails() {
		// TODO Auto-generated method stub
		return entitlementUser.getAuthorizedPortDetails();
	}
	@Override
	public List<Map<String, Object>> getAuthorizedTeamDetails() {
		// TODO Auto-generated method stub
		return entitlementUser.getAuthorizedTeamDetails();
	}
	@Override
	public Map<String, Object> getTecsProfile() {
		// TODO Auto-generated method stub
		return entitlementUser.getTecsProfile();
	}
	@Override
	public Map<String, Object> getAggregator() {
		// TODO Auto-generated method stub
		return entitlementUser.getAggregator();
	}
	@Override
	public boolean didAggregatorComplete() {
		// TODO Auto-generated method stub
		return entitlementUser.didAggregatorComplete();
	}
	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return entitlementUser.getPassword();
	}
	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return entitlementUser.getUsername();
	}
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return entitlementUser.isAccountNonExpired();
	}
	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return entitlementUser.isAccountNonLocked();
	}
	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return entitlementUser.isCredentialsNonExpired();
	}
	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return entitlementUser.isEnabled();
	}
	@Override
	public List<GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return entitlementUser.getAuthorities();
	}
	public String getUserAceId() {
		return userAceId;
	}
	public void setUserAceId(String userAceId) {
		this.userAceId = userAceId;
	}
}
