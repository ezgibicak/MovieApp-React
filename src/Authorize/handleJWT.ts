import { authenticationResponse, claim } from "./auth.model.d";
const tokenKey = "token";
const expirationKey = "token-expiration";
export function saveToken(response: authenticationResponse) {
  localStorage.setItem(tokenKey, response.token);
  localStorage.setItem(expirationKey, response.expiration.toString());
}
export function getClaims(): claim[] {
  const token = localStorage.getItem(tokenKey);
  if (!token) {
    return [];
  }
  const expiration = localStorage.getItem(expirationKey);
  if (expiration) {
    const expirationDate = new Date(expiration);
    if (expirationDate <= new Date()) {
      logOut();
      return [];
    }
  }
  const dataToken = JSON.parse(atob(token.split(".")[1]));
  const response: claim[] = [];
  for (const property in dataToken) {
    response.push({ name: property, value: dataToken[property] });
  }
  return response;
}
export function logOut() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(expirationKey);
}
export function getToken() {
  return localStorage.getItem(tokenKey);
}
