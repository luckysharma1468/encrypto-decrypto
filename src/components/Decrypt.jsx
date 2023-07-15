import React, {useState, useRef, useEffect} from 'react';
import decryptData from '../Decryption/simpleDecrypt';

export default function Decrypt() {

  const [encryptedText, setEncryptedText] = useState("");
  const textAreaRef = useRef();
  const secretKeyRef = useRef();
  const [secretKey, setSecretKey] = useState("");
  const [textAdded, setTextAdded] = useState(false);
  const [decryptedData, setDecryptedData] = useState(false);

  useEffect(() => {
    if (encryptedText !== "" && secretKey !== "") {
      const data = decryptData(encryptedText, secretKey);
      setDecryptedData(data);

      let timer = setTimeout(() => {
        setDecryptedData(false);
      }, 10000);

      return () => {
        clearTimeout(timer);
      }
    }
  }, [encryptedText, secretKey]);

  const onFormSubmission = (e) => {
    e.preventDefault();

    if(!textAdded && textAreaRef.current.value === "") {
      alert("Please fill the encrypted text to move forward");
      return;
    }

    if(textAdded && secretKeyRef.current.value === ""){
      alert("Please fill the secret key to decrypt the data");
      return;
    }

    if(!textAdded){
      setTextAdded(true);
      setEncryptedText(textAreaRef.current.value);
    }

    if(textAdded) {
      setSecretKey(secretKeyRef.current.value);
    }
  }

  return (
    <div>
      {
        decryptedData ?
          <div className='d-flex flex-column justify-content-center align-items-center mt-3'>
            <h3>Your Decrypted Data</h3>
            <h4>{decryptedData}</h4>
          </div>
          :
          <div>
            <h3 className='d-flex justify-content-center mt-3'>Please put your text to decrypt</h3>
            <form
              className='d-flex justify-content-center flex-column align-items-center'
              onSubmit={onFormSubmission}
            >
              {textAdded ?
                <div className='d-flex flex-row gap-3 mt-2'>
                  <label>Secret Key</label>
                  <input
                    type='password'
                    ref={secretKeyRef}
                    className='secretKey'
                  />
                </div>
                : <textarea
                ref={textAreaRef}
                className='textArea mt-3'
              />
              }
              <input
                className='encryptDecryptSubmit d-flex justify-content-center mt-3'
                type="submit"
              />
            </form>
          </div>
      }
    </div>
  )
}
