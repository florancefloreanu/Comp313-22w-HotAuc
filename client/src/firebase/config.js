/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client\src\firebase\config.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client
 * Created Date: Monday, January 17th 2022, 9:55:29 am
 * Author: han
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: Config firebase
 */


import firebase from "firebase/compat/app"
import "firebase/storage"
import { getStorage, ref } from "firebase/storage"


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAsqHK11jzAw84OLiG04oLPc8dQzzjSlNQ",
	authDomain: "hot-auc.firebaseapp.com",
	projectId: "hot-auc",
	storageBucket: "hot-auc.appspot.com",
	messagingSenderId: "866373266230",
	appId: "1:866373266230:web:7e4f9ad6974f339b7e6197"
}

const firebaseApp = initializeApp(firebaseConfig)

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp)


export default storage
