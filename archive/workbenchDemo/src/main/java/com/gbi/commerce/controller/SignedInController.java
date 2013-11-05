package com.gbi.commerce.controller;

import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

public abstract class SignedInController extends AbstractController {

	@Override
	protected final ModelAndView handleRequestInternal(
			HttpServletRequest pRequest, HttpServletResponse pResponse)
			throws Exception {
		if (isSignedIn(pRequest)) {
			return handleRequestSignedIn(pRequest, pResponse);
		}
		if (isAjaxRequest(pRequest)) {
			return new ModelAndView("ajax/notSignedIn.jsp");
		}
		pResponse.sendRedirect("/manager/signIn.html?url="
				+ URLEncoder.encode(
						pRequest.getRequestURI()
								+ (pRequest.getQueryString() == null ? ""
										: ("?" + pRequest.getQueryString())),
						"UTF8"));
		return null;
	}

	private boolean isAjaxRequest(HttpServletRequest pRequest) {
		return pRequest.getQueryString() != null
				&& pRequest.getQueryString().indexOf("ajax") != -1;
	}

	protected abstract ModelAndView handleRequestSignedIn(
			HttpServletRequest pRequest, HttpServletResponse pResponse)
			throws Exception;

	private boolean isSignedIn(HttpServletRequest pRequest) {
		Boolean signedIn = (Boolean) pRequest.getSession().getAttribute(
				"signedIn");
		return signedIn != null;
	}

	String getAction(HttpServletRequest pRequest) {
		return ServletRequestUtils.getStringParameter(pRequest, "action", "");
	}

}
