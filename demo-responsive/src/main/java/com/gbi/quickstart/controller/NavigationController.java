package com.gbi.quickstart.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import com.gbi.gsa.Bridge;
import com.gbi.gsa.Query;
import com.gbi.gsa.SimpleBridge;
import com.gbi.gsa.model.Results;

public class NavigationController extends AbstractController {
	@Override
	protected ModelAndView handleRequestInternal(HttpServletRequest pRequest,
			HttpServletResponse pResponse) throws Exception {

		// Create the query object
		Query query = new Query();

		HashMap<String, Object> model = new HashMap<String, Object>();
		String action = ServletRequestUtils.getStringParameter(pRequest,
				"action");

		if ("signIn".equals(action)) {
			String email = ServletRequestUtils.getStringParameter(pRequest,
					"email", null);
			String password = ServletRequestUtils.getStringParameter(pRequest,
					"password", null);
			model.put("email", email);
			model.put("password", password);
			if (StringUtils.isBlank(email) || StringUtils.isBlank(password)) {
				model.put("error", "Must provide email and password");
			} else {
				final TreeMap<String, String> passwords = readPasswords();
				email = email.toLowerCase().trim();
				if (passwords.containsKey(email)
						&& password.equals(passwords.get(email))) {
					pRequest.getSession().setAttribute("signedIn", true);
					pRequest.getSession().setAttribute("username", email);
					if (email != null && email.indexOf("@") != -1) {
						pRequest.getSession()
								.setAttribute(
										"area",
										email.substring(0, email.indexOf("@"))
												.toLowerCase()
												.replaceAll("[^a-z]", ""));
					}
				} else {
					model.put("error", "Incorrect password / email");
				}
			}
		} else if ("signOut".equals(action)) {
			pRequest.getSession().removeAttribute("signedIn");
			pRequest.getSession().removeAttribute("username");
			pRequest.getSession().removeAttribute("area");
		}

		if (pRequest.getSession().getAttribute("signedIn") == null) {
			return new ModelAndView("signIn.jsp", model);
		} else {
			// set a area end if required
			// query.setArea("responsive");
			model.put("username", pRequest.getSession()
					.getAttribute("username"));
			query.setArea(pRequest.getSession().getAttribute("area").toString());
		}

		query.addField("*");
		String refinements = ServletRequestUtils.getStringParameter(pRequest,
				"refinements", "");
		query.addRefinementsByString(refinements);
		String q = ServletRequestUtils.getStringParameter(pRequest, "q", "");
		query.setSearchString(q);

		query.setSkip(ServletRequestUtils.getLongParameter(pRequest, "p", 0));
		// set a sub collection.
		String tab = ServletRequestUtils.getStringParameter(pRequest, "tab",
				null);

		if (StringUtils.isNotBlank(tab)) {
			query.setSubCollection("Stores");
			query.setPageSize(300);
		}
		if (StringUtils.isBlank(tab) && StringUtils.isBlank(q)
				&& StringUtils.isBlank(refinements)) {
			query.addCustomUrlParam("home", "true");
			query.setSubCollection("Simple");
		}

		String region = ServletRequestUtils.getStringParameter(pRequest,
				"region", null);
		if (StringUtils.isNotBlank(region) && !region.endsWith("1")) {
			query.addCustomUrlParam("region", "true");
		}

		// Setup parameters for the bridge
		String host = System.getProperty("bridgeHost", getServletContext()
				.getInitParameter("bridgeHost"));
		Integer port = new Integer(System.getProperty("bridgePort",
				getServletContext().getInitParameter("bridgePort")));
		String key = System.getProperty("bridgeKey", getServletContext()
				.getInitParameter("bridgeKey"));

		Bridge bridge = new SimpleBridge(key, host, port);

		// fire the query.
		Results results = bridge.search(query);
		model.put("results", results);

		String uri = pRequest.getRequestURI();
		int lastIndexOf = uri.lastIndexOf("/");
		String page = "";
		int lastIndexOf2 = uri.lastIndexOf(".");
		if (lastIndexOf == -1 || lastIndexOf2 == -1) {
			page = "index";
		} else {
			page = uri.substring(lastIndexOf + 1, lastIndexOf2);
		}
		return new ModelAndView(page + ".jsp", model);

	}

	private TreeMap<String, String> readPasswords() {
		try {
			TreeMap<String, String> passwordMap = new TreeMap<String, String>();
			File file = new File("passwords.txt");

			if (!file.exists()) {
				return passwordMap;
			}
			String passwords = FileUtils.readFileToString(file);

			String[] lines = passwords.split("\n");
			for (String line : lines) {
				String[] emailPassword = line.split("=", 2);
				passwordMap.put(emailPassword[0].trim(),
						emailPassword[1].trim());
			}
			return passwordMap;
		} catch (IOException e) {
			throw new IllegalStateException("Couldn't read passwords", e);
		}
	}

}
