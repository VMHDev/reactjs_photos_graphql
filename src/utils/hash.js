import CryptoJS from 'crypto-js';
import { PASS_PHRASE } from 'constants/system';

/**
 * Encrypt AES
 * @param {string} text Text
 */
export const encryptWithAES = (text) => {
  try {
    return CryptoJS.AES.encrypt(text, PASS_PHRASE).toString();
  } catch (error) {
    console.log('utils/hash/encryptWithAES', error);
  }
};

/**
 * Decrypt AES
 * @param {string} text Text
 */
export const decryptWithAES = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, PASS_PHRASE);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  } catch (error) {
    console.log('utils/hash/decryptWithAES', error);
  }
};

/**
 * Encrypt AES and TripleDES
 * @param {string} text Text
 */
export const encryptWithAESTripleDES = (text) => {
  try {
    const textTripleDES = CryptoJS.TripleDES.encrypt(
      encryptWithAES(text),
      PASS_PHRASE
    ).toString();
    return textTripleDES;
  } catch (error) {
    console.log('utils/hash/encryptWithAESTripleDES', error);
  }
};

/**
 * Decrypt AES and TripleDES
 * @param {string} text Text
 */
export const decryptWithAESTripleDES = (ciphertext) => {
  try {
    const bytes = CryptoJS.TripleDES.decrypt(ciphertext, PASS_PHRASE);
    const originalTextAES = bytes.toString(CryptoJS.enc.Utf8);
    const originalText = decryptWithAES(originalTextAES);
    return originalText;
  } catch (error) {
    console.log('utils/hash/decryptWithAESTripleDES', error);
  }
};
