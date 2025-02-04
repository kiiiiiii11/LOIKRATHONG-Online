// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// ตั้งค่า Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBI7EP6DRvPkCfuRKo75HgG2oSi0ciSND8",
  authDomain: "loikrathong-79265.firebaseapp.com",
  databaseURL: "https://loikrathong-79265-default-rtdb.firebaseio.com",
  projectId: "loikrathong-79265",
  storageBucket: "loikrathong-79265.appspot.com",
  messagingSenderId: "539436992765",
  appId: "1:539436992765:web:bf6845ccd72629e1551694",
  measurementId: "G-ZTFN0TD0S2"
};

// เริ่มต้นใช้งาน Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ฟังก์ชันเพิ่มกระทงไปยัง Firebase
function addKrathong(message) {
  push(ref(database, "krathongs"), {
    message: message,
    timestamp: Date.now()
  });
}

// ฟังก์ชันโหลดกระทงจาก Firebase
function loadKrathongs(callback) {
  onValue(ref(database, "krathongs"), (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const krathongs = Object.values(data);
      callback(krathongs);
    }
  });
}

export { addKrathong, loadKrathongs };
