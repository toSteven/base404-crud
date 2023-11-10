import { initializeApp } from "firebase/app";

// config firebase
const firebaseConfig = {
  apiKey: "AIzaSyDmi4INb--I8t8J-fLtkZCVGvOx4zA0kyI",
  authDomain: "studentsrecords-2c002.firebaseapp.com",
  projectId: "studentsrecords-2c002",
  storageBucket: "studentsrecords-2c002.appspot.com",
  messagingSenderId: "704431992568",
  appId: "1:704431992568:web:008b973bb5a89ebfb5150d",
  measurementId: "G-PVK3X67VX0",
};

// init firebase
const app = initializeApp(firebaseConfig);

export default app;
