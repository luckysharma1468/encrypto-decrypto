import CryptoJS from "crypto-js";

const encryptData = (message, secretKey) => {
    const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(message),
        secretKey
    ).toString();

    return encryptedData;
}

export default encryptData;