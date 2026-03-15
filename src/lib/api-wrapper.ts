// API wrapper to handle dynamic imports and compatibility issues
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import type { PasswordInput } from "@/types/api";

// Dynamic import wrapper for reddy-api-srm
const getAPI = async () => {
  try {
    const api = await import("reddy-api-srm");
    return api;
  } catch (error) {
    console.error("Failed to load API:", error);
    throw new Error("API not available");
  }
};

export async function validateUser(email: string) {
  try {
    const { verifyUser } = await getAPI();
    const res = await verifyUser(email);
    return { res };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("validateUser error:", error);
    return { res: { error: true, errorReason: "Service unavailable" } };
  }
}

export async function validatePassword(params: PasswordInput) {
  try {
    const { verifyPassword } = await getAPI();
    const res = await verifyPassword(params);
    return { res };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("validatePassword error:", error);
    return { res: { error: true, errorReason: "Service unavailable" } };
  }
}

export async function terminateSessions(params: { flowId: string | null; identifier: string; digest: string; csrfToken?: string }) {
  try {
    const api = await getAPI();
    if (!('terminateSessions' in api)) {
      return { res: { success: false, error: "terminateSessions not available in this API version" } };
    }
    const { terminateSessions: _terminate } = api as { terminateSessions: (p: typeof params) => Promise<{ success: boolean; error?: string }> };
    const res = await _terminate(params);
    return { res };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("terminateSessions error:", error);
    return { res: { success: false, error: "Service unavailable" } };
  }
}

export async function getLogout(cookie: string) {
  try {
    const { logoutUser } = await getAPI();
    const res = await logoutUser(cookie);
    return { res };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("getLogout error:", error);
    return { res: { error: true, errorReason: "Service unavailable" } };
  }
}

export async function timetable(cookie: string) {
  try {
    const { getTimetable } = await getAPI();
    const data = await getTimetable(cookie);
    if (data.status === 404) redirect("/auth/logout");
    return { data };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("timetable error:", error);
    return { data: { error: "Service unavailable", status: 500 } };
  }
}

export async function attendance(cookie: string) {
  try {
    const { getAttendance } = await getAPI();
    const data = await getAttendance(cookie);
    if (data.status === 404) redirect("/auth/logout");
    return { data };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("attendance error:", error);
    return { data: { error: "Service unavailable", status: 500 } };
  }
}

export async function marks(cookie: string) {
  try {
    const { getMarks } = await getAPI();
    const data = await getMarks(cookie);
    if (data.status === 404) redirect("/auth/logout");
    return { data };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("marks error:", error);
    return { data: { error: "Service unavailable", status: 500 } };
  }
}

export async function Calendar(cookie: string) {
  try {
    const { getCalendar } = await getAPI();
    const data = await getCalendar(cookie);
    if (data.status === 404) redirect("/auth/logout");
    return { data };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("Calendar error:", error);
    return { data: { error: "Service unavailable", status: 500 } };
  }
}

export async function Course(cookie: string) {
  try {
    const { getCourse } = await getAPI();
    const data = await getCourse(cookie);
    if (data.status === 404) redirect("/auth/logout");
    return { data };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("Course error:", error);
    return { data: { error: "Service unavailable", status: 500 } };
  }
}

export async function userInfo(cookie: string) {
  try {
    const { getUserInfo } = await getAPI();
    const data = await getUserInfo(cookie);
    if (data.status === 404) redirect("/auth/logout");
    return { data };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("userInfo error:", error);
    return { data: { error: "Service unavailable", status: 500 } };
  }
}

export async function dayOrder(cookie: string) {
  try {
    const { getDayOrder } = await getAPI();
    const data = await getDayOrder(cookie);
    if (data.status === 404) redirect("/auth/logout");
    return { data };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("dayOrder error:", error);
    return { data: { error: "Service unavailable", status: 500 } };
  }
}

// Friend authentication and marks fetching
export async function validateFriendUser(email: string) {
  try {
    const { verifyUser } = await getAPI();
    const res = await verifyUser(email);
    return { res };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("validateFriendUser error:", error);
    return { res: { error: true, errorReason: "Service unavailable" } };
  }
}

export async function validateFriendPassword(params: PasswordInput) {
  try {
    const { verifyPassword } = await getAPI();
    const res = await verifyPassword(params);
    return { res };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("validateFriendPassword error:", error);
    return { res: { error: true, errorReason: "Service unavailable" } };
  }
}

export async function getFriendMarks(cookie: string) {
  try {
    const { getMarks } = await getAPI();
    const data = await getMarks(cookie);
    if (data.status === 404) {
      return { data: { error: "Authentication failed", status: 404 } };
    }
    return { data };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("getFriendMarks error:", error);
    return { data: { error: "Service unavailable", status: 500 } };
  }
}

export async function getFriendLogout(cookie: string) {
  try {
    const { logoutUser } = await getAPI();
    const res = await logoutUser(cookie);
    return { res };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("getFriendLogout error:", error);
    return { res: { error: true, errorReason: "Service unavailable" } };
  }
}
