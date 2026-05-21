"use server";

import { cookies } from "next/headers";

export async function loginAction(formData: FormData) {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return { error: "Sistem yapılandırma hatası: ADMIN_PASSWORD bulunamadı." };
  }

  if (password === adminPassword) {
    // Şifre doğruysa admin_token cookie'sini oluştur
    cookies().set({
      name: "admin_token",
      value: password,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 gün boyunca açık kalsın
      path: "/",
    });
    return { success: true };
  } else {
    return { error: "Hatalı şifre!" };
  }
}

export async function logoutAction() {
  cookies().delete("admin_token");
  return { success: true };
}
