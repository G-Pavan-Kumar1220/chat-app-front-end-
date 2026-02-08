import { jwtDecode } from "jwt-decode";

export const TokenValidationTime = (token) => {
  try {
    const { exp } = jwtDecode(token);
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export default TokenValidationTime;
