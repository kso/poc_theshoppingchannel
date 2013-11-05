package com.gbi.commerce.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;

public abstract class MassTransitController extends SignedInController {

	@Override
	protected final ModelAndView handleRequestSignedIn(
			HttpServletRequest pRequest, HttpServletResponse pResponse)
			throws Exception {
		return handleTransitRequest(pRequest, pResponse);
	}

	protected abstract ModelAndView handleTransitRequest(
			HttpServletRequest pRequest, HttpServletResponse pResponse)
			throws Exception;

}
