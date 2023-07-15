import React, {useState, useRef, useEffect, useCallback} from 'react';
import encryptData from '../Encryption/simpleEncrypt';

export default function Encrypt() {

  const textAreaRef = useRef();
  const secretKeyRef = useRef();
  const [message, setMessage] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const savingEncryptedData = useCallback((encryptedData) => {
    const objectToFile = {
      encryptedText: encryptedData,
      secretKey,
      HowToDecrypt: `Please visit this URL for decrypting the data ${window.location.href}`
    }

    const fileData = JSON.stringify(objectToFile);
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "encrypted-text.json";
    link.href = url;
    link.click();
  }, [secretKey]);

  useEffect(() => {

    if (message !== "" && secretKey !== "") {
      textAreaRef.current.value = "";
      secretKeyRef.current.value = "";
      const encryptedData = encryptData(message, secretKey);
      savingEncryptedData(encryptedData);
    }

  }, [message, secretKey, savingEncryptedData]);

  const onFormSubmission = (e) => {
    e.preventDefault();
    const messageToEncrypt = textAreaRef.current.value;
    const secretKeyToEncrypt = secretKeyRef.current.value;
    if (messageToEncrypt !== "" && secretKeyToEncrypt !== "") {
      setMessage(messageToEncrypt);
      setSecretKey(secretKeyToEncrypt);
    } else {
      alert("Please Fill all the details");
    }

  }

  return (
    <div>
      <h3 className='d-flex justify-content-center mt-3'>Please put your text to encrypt</h3>
      <form
        className='d-flex justify-content-center flex-column align-items-center'
        onSubmit={onFormSubmission}
      >
        <textarea
          ref={textAreaRef}
          className='textArea mt-3'
        />
        <div className='d-flex flex-row gap-3 mt-2'>
          <label>Secret Key</label>
          <input
            type='password'
            ref={secretKeyRef}
            className='secretKey'
          />
        </div>
        <input
          className='encryptDecryptSubmit d-flex justify-content-center mt-3'
          type="submit"
        />
      </form>
    </div>
  )
}
