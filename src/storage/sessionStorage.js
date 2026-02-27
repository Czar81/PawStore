import { setCookie, getCookie, deleteCookie } from '/src/utils/cookie.js';

const TOKEN = 'token';

export const setUserToken = (token) => setCookie(TOKEN, token, 'max-age=31536000');
export const getUserToken = () => getCookie(TOKEN);
export const clearUserToken = () => deleteCookie(TOKEN);
