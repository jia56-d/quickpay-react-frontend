import {jwtDecode} from "jwt-decode";

export const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.accountType;
  } catch (error) {
    console.error("Invalid Token:", error);
    return null;
  }
};
