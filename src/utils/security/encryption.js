import CryptoJS from "crypto-js";

export const generateEncryption = ({plainText, signature = process.env.ENCRYPTION_PHONE_SIGNATURE}) => {
    const cipherText = CryptoJS.AES.encrypt(plainText, signature).toString();
    return cipherText;
}

export const generateDecryption = ({cipherText, signature = process.env.ENCRYPTION_PHONE_SIGNATURE}) => {
    const decrypted = CryptoJS.AES.decrypt(cipherText, signature).toString(CryptoJS.enc.Utf8);
    return decrypted;
}