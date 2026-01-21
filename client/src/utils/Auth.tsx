export interface AuthUser {
  userId: string;
  role: "USER" | "ADMIN";
}

export const getAuthUser = (): AuthUser | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      userId: payload.userId,
      role: payload.role,
    };
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  window.dispatchEvent(new Event("auth-change"));
  window.location.href = "/login";
};
