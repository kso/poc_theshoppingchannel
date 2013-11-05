package com.gbi.commerce.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.servlet.ModelAndView;

import com.gbi.gsa.config.GsaTool;

public class NavigationController extends MassTransitController {

	private String bestbuyLocation;

	@Override
	protected ModelAndView handleTransitRequest(HttpServletRequest pRequest,
			HttpServletResponse pResponse) throws Exception {
		HashMap<String, Object> model = new HashMap<String, Object>();

		String action = ServletRequestUtils.getStringParameter(pRequest,
				"action", "");

		if ("resetgsa".equals(action)) {
			new GsaTool().restore(new File(bestbuyLocation));
		}
		if ("createNewUser".equals(action)) {
			String newEmail = ServletRequestUtils.getStringParameter(pRequest,
					"newEmail", null);
			String newPassword = ServletRequestUtils.getStringParameter(
					pRequest, "newPassword", null);
			SignInController.passwords.put(newEmail.toLowerCase().trim(),
					newPassword);
			SignInController.savePasswords();
		}
		if ("deleteUser".equals(action)) {
			String newEmail = ServletRequestUtils.getStringParameter(pRequest,
					"newEmail", null);
			SignInController.passwords.remove(newEmail.toLowerCase().trim());
			SignInController.savePasswords();
		} else

		if (null != ServletRequestUtils.getStringParameter(pRequest,
				"halloween", null)) {
			setHalloween(ServletRequestUtils.getStringParameter(pRequest,
					"halloween", null));
		}
		String uri = pRequest.getRequestURI();
		String page = uri.substring(uri.lastIndexOf("/") + 1,
				uri.lastIndexOf("."));
		model.put("username", pRequest.getSession().getAttribute("username"));
		return new ModelAndView(page + ".jsp", model);
	}

	private void setHalloween(String pShould) throws ClientProtocolException,
			IOException {
		DefaultHttpClient httpclient = new DefaultHttpClient();
		if ("yes".equals(pShould)) {
			HttpPost httpPost = new HttpPost("http://localhost:9050/augment");
			httpclient.execute(httpPost);
		} else {
			HttpPost httpPost = new HttpPost("http://localhost:9050/deaugment");
			httpclient.execute(httpPost);
		}
	}

	@Override
	protected void initServletContext(ServletContext pServletContext) {
		super.initServletContext(pServletContext);
		bestbuyLocation = pServletContext
				.getRealPath("/WEB-INF/config/bestbuyconfiguration.xml");
	}

}
