package com.gbi.commerce.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class EandM {

	public static void addError(Map<String, Object> pModel, String... pErrors) {
		add(pModel, "errors", pErrors);
	}

	@SuppressWarnings("unchecked")
	private static void add(Map<String, Object> pModel, String type,
			String... pErrors) {
		if (pErrors != null && pModel != null) {
			if (!pModel.containsKey(type)) {
				pModel.put(type, new ArrayList<String>());
			}
			((List<String>) pModel.get(type)).addAll(Arrays.asList(pErrors));
		}
	}

	public static boolean hasErrors(Map<String, Object> pModel) {
		return has(pModel, "errors");
	}

	@SuppressWarnings("unchecked")
	private static boolean has(Map<String, Object> pModel, String type) {
		if (pModel != null) {
			if (pModel.containsKey(type)) {
				return ((List<String>) pModel.get(type)).size() > 0;
			}
		}
		return false;
	}

	public static boolean hasMessages(Map<String, Object> pModel) {
		return has(pModel, "messages");
	}

	public static void addMessage(Map<String, Object> pModel, String... pErrors) {
		add(pModel, "messages", pErrors);
	}

	public static boolean hasWarnings(Map<String, Object> pModel) {
		return has(pModel, "warnings");
	}

	public static void addWarning(Map<String, Object> pModel, String... pErrors) {
		add(pModel, "warnings", pErrors);
	}
}
