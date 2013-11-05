package com.gbi.commerce.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

public class SignInController extends AbstractController implements
		InitializingBean {

	private static final Logger log = Logger.getLogger(SignInController.class);

	static TreeMap<String, String> passwords = new TreeMap<String, String>();

	@Override
	protected ModelAndView handleRequestInternal(HttpServletRequest pRequest,
			HttpServletResponse pResponse) throws Exception {
		String action = ServletRequestUtils.getStringParameter(pRequest,
				"action", "");

		if (action.equals("signOut")) {
			pRequest.getSession().removeAttribute("signedIn");
			pResponse.sendRedirect("/manager/index.html");
			return null;
		}
		Boolean signedIn = (Boolean) pRequest.getSession().getAttribute(
				"signedIn");
		if (signedIn != null) {
			pResponse.sendRedirect("/manager/index.html");
			return null;
		}
		Map<String, Object> model = new HashMap<String, Object>();

	if (action.equals("signIn")) {
			String email = ServletRequestUtils.getStringParameter(pRequest,
					"email", "");
			String password = ServletRequestUtils.getStringParameter(pRequest,
					"password", "");
			if (PasswordManager.matches(passwords, email, password)) {
				pRequest.getSession().setAttribute("username",
						email.toLowerCase().trim());
				String url = ServletRequestUtils.getStringParameter(pRequest,
						"url", null);
				if (StringUtils.isNotBlank(url)) {
					pResponse.sendRedirect(url);
				} else {
					pResponse.sendRedirect("/manager/index.html");
				}
				pRequest.getSession().setAttribute("signedIn", true);
				return null;
			} else {
				List<String> errors = new ArrayList<String>();
				errors.add("Password incorrect");
				model.put("errors", errors);
			}
		}
		return new ModelAndView("signIn.jsp", model);
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		passwords = readPasswords();
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

	static void savePasswords() throws IOException {
		Set<String> keySet = passwords.keySet();
		StringBuffer out = new StringBuffer();
		for (String key : keySet) {
			out.append(key).append("=").append(passwords.get(key)).append("\n");
		}
		FileUtils.writeStringToFile(new File("passwords.txt"), out.toString(),
				"utf-8");
	}
}