"use server";

import { cookies } from "next/headers";

const SITE_SECRETS = {
    main: "Admin1234",
    pdpa: "PDPA1234"
};

export async function loginAction(site: string, password: string) {
    const cookieStore = await cookies();
    const expectedPassword = SITE_SECRETS[site as keyof typeof SITE_SECRETS] || "Admin1234";

    if (expectedPassword === password) {
        cookieStore.set(`admin_auth_${site}`, "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/admin",
            maxAge: 60 * 60 * 24 // 1 day
        });
        return { success: true };
    }
    return { success: false, error: "รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง" };
}

export async function checkAuthAction(site: string) {
    const cookieStore = await cookies();
    const auth = cookieStore.get(`admin_auth_${site}`)?.value;
    return auth === "true";
}

export async function logoutAction(site: string) {
    const cookieStore = await cookies();
    cookieStore.delete({
        name: `admin_auth_${site}`,
        path: "/admin"
    });
    return { success: true };
}
