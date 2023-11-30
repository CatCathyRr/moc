const TOKEN_KEY='key';

export function setToken(token){
  return localStorage.setItem(TOKEN_KEY,token);
}

export const getToken=()=> <string>(localStorage.getItem(TOKEN_KEY) || '');