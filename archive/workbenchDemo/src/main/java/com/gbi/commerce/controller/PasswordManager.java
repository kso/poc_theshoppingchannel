package com.gbi.commerce.controller;

import java.util.TreeMap;

public class PasswordManager {

	public static boolean matches(TreeMap<String, String> pPasswords,
			String pEmail, String pPassword) {
		return pPasswords.containsKey(pEmail.toLowerCase().trim())
				&& pPasswords.get(pEmail.toLowerCase().trim())
						.equals(pPassword);
	}

	public static void writePassword(String pNewPassword) {
		// TODO Auto-generated method stub

	}

}
