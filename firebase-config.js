import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBI7EP6DRvPkCfuRKo75HgG2oSi0ciSND8",
  authDomain: "loikrathong-79265.firebaseapp.com",
  databaseURL: "https://loikrathong-79265-default-rtdb.firebaseio.com",
  projectId: "loikrathong-79265",
  storageBucket: "loikrathong-79265.firebasestorage.app",
  messagingSenderId: "539436992765",
  appId: "1:539436992765:web:bf6845ccd72629e1551694",
  measurementId: "G-ZTFN0TD0S2"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const krathongRef = ref(db, "krathongs");

// ฟังก์ชันเพิ่มกระทงลง Firebase
export function addKrathong(message) {
    push(krathongRef, { message });
}

// ฟังก์ชันโหลดกระทงทั้งหมด
export function loadKrathongs(callback) {
    onValue(krathongRef, (snapshot) => {
        const data = snapshot.val();
        const krathongs = data ? Object.values(data) : [];
        callback(krathongs);
    });
}
