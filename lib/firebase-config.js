// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBKThjXQ0mylLzy6ueluBG_YfSYnINjoJU',
	authDomain: 'readyup-1a967.firebaseapp.com',
	projectId: 'readyup-1a967',
	storageBucket: 'readyup-1a967.appspot.com',
	messagingSenderId: '348918032967',
	appId: '1:348918032967:web:9b5722a30bf196c7e39f62',
	measurementId: 'G-4PD42M4444',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
