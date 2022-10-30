import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import {
    getStorage,
    ref as sRef,
    uploadBytesResumable,
    uploadBytes,
    getDownloadURL 
} from "firebase/storage";
import { ref, runTransaction, getDatabase, set , onValue , get, onChildAdded, onChildChanged, onChildRemoved  } from 'firebase/database';
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
import { realDB } from './lib/initFirebase';
import 'firebase/database';
import 'firebase/storage';

function App() {

  const [fileHere, setfileHere] = useState('');
  const [fileUploadURL, setfileUploadURL] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const onFileInputChange = (event) => {
    const { files } = event.target;
    setfileHere(event.target.files[0])
  }
  const loadingHere = () => {
    if(isLoading){
      return(
        <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
      </div>
      )
    }
  }


  const submitImage = (e) => {
        e.preventDefault();
        let file = fileHere;
        setisLoading(true)
        const storage = getStorage();
        const storageRef = sRef(storage, "user_uploads" + file.name)
        const uploadTask = uploadBytesResumable(storageRef, file);


        uploadTask.on('state_changed', 
          (snapshot) => {

            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
          }, 
          () => {
   
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              setfileUploadURL(downloadURL)
              setisLoading(false)
            });
          }
        )

  }

  return (
    <div className="App">
      <header className="App-header">
        {loadingHere()}
        {isLoading ? (
          <p>
            Loading...
          </p>
        ) : (
          <div>
                 <p>
                        Upload Image and Get URL
                      </p>
                      <div>
                <label for="formFileLg" class="form-label">Pick File</label>
                <input class="form-control form-control-lg" id="formFileLg" type="file" onChange={onFileInputChange}/>
                <button type="button" class="btn btn-primary" onClick={(e) => submitImage(e)}>Upload</button>
          </div>
          </div>
        )
        }
       
        <h2>
          {
            fileUploadURL
          }
        </h2>
        <button type="button" class="btn btn-primary" onClick={() => {navigator.clipboard.writeText(fileUploadURL)}}>Copy</button>

        
      </header>
    </div>
  );
}

export default App;
