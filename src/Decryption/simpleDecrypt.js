import CryptoJS from "crypto-js";

const decryptData = (message, secretKey) => {
    try {
        const bytes = CryptoJS.AES.decrypt(
            message,
            secretKey
        );
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    } catch (error) {
        return "Secret key is Incorrect, Please check Again";
    }
}

export default decryptData;