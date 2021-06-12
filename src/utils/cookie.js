import Cookies from 'js-cookie';
import { encryptWithAES, decryptWithAES } from 'utils/hash';

/**
 * Set Value Cookies
 * @param {string} name Key Cookies
 * @param {object} value Value Cookies
 * @param {object} options Options
 */
export function setValueToCookies(name, value, options = null) {
  try {
    const encryptValue = encryptWithAES(value);
    if (options) {
      Cookies.set(name, encryptValue, options);
    } else {
      Cookies.set(name, encryptValue);
    }
  } catch (error) {
    console.log('utils/cookie/setValueToCookies', error);
  }
}

/**
 * Get Value Cookies
 * @param {string} name Key Cookies
 */
export function getValueFromCookies(name) {
  try {
    if (Cookies.get(name)) {
      return decryptWithAES(Cookies.get(name));
    }
    return null;
  } catch (error) {
    console.log('utils/cookie/getValueFromCookies', error);
  }
}

/**
 * Remove Value Cookies
 * @param {string} names List Key Cookies
 */
export function removeValueFromCookies(names) {
  try {
    names.forEach((name) => {
      Cookies.remove(name);
    });
  } catch (error) {
    console.log('utils/cookie/removeValueFromCookies', error);
  }
}
