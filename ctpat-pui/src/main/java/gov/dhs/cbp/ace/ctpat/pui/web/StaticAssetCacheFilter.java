package gov.dhs.cbp.ace.ctpat.pui.web;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class StaticAssetCacheFilter implements Filter {

	private static final Logger logger = LoggerFactory.getLogger(StaticAssetCacheFilter.class);
	private ServletContext context;
	
	
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		this.context = filterConfig.getServletContext();
		this.context.log("RequestLoggingFilter initialized");
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		HttpServletResponse httpResponse = (HttpServletResponse) response;
	    HttpServletRequest httpRequest = (HttpServletRequest) request;
	    
	    this.context.log("requestURI " + httpRequest.getRequestURI());
		httpResponse.setHeader("Expires", "-1"); 
		httpResponse.setHeader("Pragma", "cache");

        chain.doFilter(request, response);
		
	}

	@Override
	public void destroy() {	
		this.context = null;
	}
	

	
	

}
