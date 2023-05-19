import { initializeApp } from "firebase/app";
import { getFirestore,doc,setDoc} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCR1tfldY3tGoHgIHRJFEULd1C5XYv8kKQ",
    authDomain: "hris-9fdcd.firebaseapp.com",
    databaseURL: "https://hris-9fdcd-default-rtdb.firebaseio.com",
    projectId: "hris-9fdcd",
    storageBucket: "hris-9fdcd.appspot.com",
    messagingSenderId: "1022926588255",
    appId: "1:1022926588255:web:e7120ad059470660a44eea",
    measurementId: "G-99YK3M8SVL"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addEmailToFirestore = async (data) => {
  try {
    const recipientEmail = data.to;
    const userEmailNode = recipientEmail.replace("@gmail.com", "");

    // Create a document reference for the recipient's email node
    const recipientRef = doc(db, "emails", userEmailNode);

    // Set the email data in the recipient's email node
    await setDoc(recipientRef, {
      from:data.from,
      subject: data.subject,
      message: data.message,
      timestamp: new Date().getTime(),
      status:'unread',
      isRead:false,
    });

    console.log("Email added to Firestore successfully");
  } catch (error) {
    console.error("Error adding email to Firestore: ", error);
  }
};

export default db;

