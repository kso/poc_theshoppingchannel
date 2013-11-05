package com.gbi.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import com.gbi.gsa.BridgeFactory;
import com.gbi.gsa.Query;
import com.gbi.gsa.SimpleBridge;
import com.gbi.util.StringUtils;

public class NavigationController extends AbstractController implements
		InitializingBean {

	private static final Logger log = Logger
			.getLogger(NavigationController.class);
	private static TreeMap<String, String> passwords = new TreeMap<String, String>();

	@Override
	protected ModelAndView handleRequestInternal(HttpServletRequest pRequest,
			HttpServletResponse pResponse) throws Exception {
		pResponse.setCharacterEncoding("utf-8");
		if (log.isDebugEnabled()) {
			printRequestMap(pRequest);
		}
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
				model.put("error", "must provide email and password");
			} else {
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
					model.put("error", "incorrect password / email");
				}
			}
		}
		if (pRequest.getSession().getAttribute("signedIn") == null) {
			return new ModelAndView("signIn.jsp", model);
		} else {
			model.put("username", pRequest.getSession()
					.getAttribute("username"));
		}

		if ("autocomplete".equals(action)) {
			String q = ServletRequestUtils.getStringParameter(pRequest, "q",
					null);
			if (StringUtils.isNotBlank(q)) {
				model.put(
						"results",
						BridgeFactory.getBridge().searchRefinementsReturnMap(
								new Query().setSearchString(q)));
			}
			return new ModelAndView("includes/autocomplete.jsp", model);
		}
		if ("createNewUser".equals(action)) {
			String newEmail = ServletRequestUtils.getStringParameter(pRequest,
					"newEmail", null);
			String newPassword = ServletRequestUtils.getStringParameter(
					pRequest, "newPassword", null);
			passwords.put(newEmail.toLowerCase().trim(), newPassword);
			savePasswords();
		}
		if ("deleteUser".equals(action)) {
			String newEmail = ServletRequestUtils.getStringParameter(pRequest,
					"newEmail", null);
			passwords.remove(newEmail.toLowerCase().trim());
			savePasswords();
		}
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

	@SuppressWarnings("rawtypes")
	private void printRequestMap(HttpServletRequest pRequest) {
		Map parameterMap = pRequest.getParameterMap();
		Set keySet = parameterMap.keySet();
		for (Object key : keySet) {
			log.debug(key + ": " + ((String[]) parameterMap.get(key))[0]);
		}
	}

	private void savePasswords() throws IOException {
		Set<String> keySet = passwords.keySet();
		StringBuffer out = new StringBuffer();
		for (String key : keySet) {
			out.append(key).append("=").append(passwords.get(key)).append("\n");
		}
		FileUtils.writeStringToFile(new File("passwords.txt"), out.toString(),
				"utf-8");
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		passwords = readPasswords();
		String host = getServletContext().getInitParameter("bridgeHost");
		Integer port = new Integer(getServletContext().getInitParameter(
				"bridgePort"));
		BridgeFactory.setBridge(new SimpleBridge("bestbuydemo", host, port));
		if (log.isInfoEnabled()) {
			log.info("Setup on: " + host + ":" + port);
		}
	}

	private TreeMap<String, String> readPasswords() {
		try {
			TreeMap<String, String> passwordMap = new TreeMap<String, String>();
			passwordMap
					.put("will.warren@groupbyinc.com", "groupbyincspassword");
			passwordMap.put("roland.gossage@groupbyinc.com",
					"groupbyincspassword");
			passwordMap.put("leonard.meloff@groupbyinc.com",
					"groupbyincspassword");
			File file = new File("passwords.txt");
			if (log.isDebugEnabled()) {
				log.debug("loading passwords from: " + file.getCanonicalPath());
			}
			if (!file.exists()) {
				return passwordMap;
			}
			String passwords = FileUtils.readFileToString(file);

			String[] lines = passwords.split("\n");
			for (String line : lines) {
				String[] emailPassword = line.split("=", 2);
				passwordMap.put(emailPassword[0], emailPassword[1]);
				if (log.isDebugEnabled()) {
					log.debug("loaded: " + emailPassword[0]);
				}
			}
			return passwordMap;
		} catch (IOException e) {
			throw new IllegalStateException("Couldn't read passwords", e);
		}
	}

}
