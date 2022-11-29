package gov.dhs.cbp.ace.ctpat.pui.web;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.lang.Nullable;
import org.springframework.util.CollectionUtils;
import org.springframework.util.LinkedCaseInsensitiveMap;
import org.springframework.web.filter.ForwardedHeaderFilter;


public class CtpatForwardedHeaderFilter extends ForwardedHeaderFilter {

	private static final Logger logger = LoggerFactory.getLogger(CtpatForwardedHeaderFilter.class);
	private Environment env;
	
	private static final Set<String> FORWARDED_HEADER_NAMES =
			Collections.newSetFromMap(new LinkedCaseInsensitiveMap<>(6, Locale.ENGLISH));

	static {
		FORWARDED_HEADER_NAMES.add("X-Forwarded-Host");
		FORWARDED_HEADER_NAMES.add("X-Forwarded-Port");
		FORWARDED_HEADER_NAMES.add("X-Forwarded-Proto");
		FORWARDED_HEADER_NAMES.add("X-Forwarded-Prefix");
	}
	
	public CtpatForwardedHeaderFilter(Environment env) {
		super();
		this.env = env;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		if((request.getHeader("iv-user")!=null) && (request.getHeader("aceusertype")!=null)  && (request.getHeader("via")!=null)) {
			HttpServletRequest wrappedRequest = new ForwardedHeaderRequestFix(request,env);
			filterChain.doFilter(wrappedRequest, response);
		} else {
			filterChain.doFilter(request, response);
		}
	
	}
	
	private static class ForwardedHeaderRequestFix extends HttpServletRequestWrapper {
		private final Map<String, List<String>> headers;

		public ForwardedHeaderRequestFix(HttpServletRequest request,Environment env) {
			super(request);
			this.headers = initHeaders(request,env);
		}
		
		@Override
		@Nullable
		public String getHeader(String name) {
			List<String> value = this.headers.get(name);
			return (CollectionUtils.isEmpty(value) ? null : value.get(0));
		}

		@Override
		public Enumeration<String> getHeaders(String name) {
			List<String> value = this.headers.get(name);
			return (Collections.enumeration(value != null ? value : Collections.emptySet()));
		}

		@Override
		public Enumeration<String> getHeaderNames() {
			return Collections.enumeration(this.headers.keySet());
		}
		private static Map<String, List<String>> initHeaders(HttpServletRequest request, Environment env) {
			Map<String, List<String>> headers = new LinkedCaseInsensitiveMap<>(Locale.ENGLISH);
			Enumeration<String> names = request.getHeaderNames();
			while (names.hasMoreElements()) {
				String name = names.nextElement();
				if (!FORWARDED_HEADER_NAMES.contains(name)) {
					headers.put(name, Collections.list(request.getHeaders(name)));
				} 
				
			}
			
			String fwdHost = request.getHeader("X-Forwarded-Host");
			String fwdPort = request.getHeader("X-Forwarded-Port");
			String fwdProto = request.getHeader("X-Forwarded-Proto");
			String fwdPrefix = request.getHeader("X-Forwarded-Prefix");
		
			String fwdHostProp = env.getProperty("sso.filter.webseal.hostUrl");
            if((fwdHostProp!=null) && !fwdHostProp.trim().isEmpty() && fwdHostProp.startsWith("http")) {
            	//extract host, port & proto from url
            	URL websealHostUrl;
				try {
					websealHostUrl = new URL(fwdHostProp);
					fwdHost = websealHostUrl.getHost();
					if(websealHostUrl.getPort()>0) {
						fwdPort = String.valueOf(websealHostUrl.getPort());
					} else {
						//fwdPort = "80";
					}
	            	fwdProto = websealHostUrl.getProtocol();
				} catch (MalformedURLException e) {
					logger.error("Invalid webseal host url",e);
				}
            	
            } else {
            	logger.error("Invalid sso.filter.webseal.hostUrl : {}",env.getProperty("sso.filter.webseal.hostUrl"));
            }
            
            if(request.getCookies()!=null) {

				for (Cookie e : request.getCookies()) {
					if(e.getName().equalsIgnoreCase("IV_JCT")) {
						try {
							fwdPrefix = URLDecoder.decode(e.getValue(), StandardCharsets.UTF_8.toString());
							break;
						} catch (UnsupportedEncodingException uee) {
							logger.error("Unable to decode webseal junction",uee);
						}
					}
				}
			}
            
            if(fwdHost!=null) {
            	List<String> hostList = new ArrayList<>(1);
            	hostList.add(fwdHost);
            	headers.put("X-Forwarded-Host", hostList);
            }
            
            if(fwdPort!=null) {
            	List<String> portList = new ArrayList<>(1);
            	portList.add(fwdPort);
            	headers.put("X-Forwarded-Port", portList);
            }
            
            if(fwdProto!=null) {
            	List<String> protoList = new ArrayList<>(1);
            	protoList.add(fwdProto);
            	headers.put("X-Forwarded-Proto", protoList);
            }
            
            if(fwdPrefix!=null) {
            	List<String> prefixList = new ArrayList<>(1);
            	prefixList.add(fwdPrefix);
            	headers.put("X-Forwarded-Prefix", prefixList);
            }
       
            logger.debug("Forwarded headers CODE FIX: host/{} port/{} protocol/{}  Junction/{} ",fwdHost,fwdPort,fwdProto,fwdPrefix);
			return headers;
		}
	}
}
