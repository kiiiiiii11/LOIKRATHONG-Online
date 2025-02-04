import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// ตั้งค่า Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBI7EP6DRvPkCfuRKo75HgG2oSi0ciSND8",
    authDomain: "loikrathong-79265.firebaseapp.com",
    databaseURL: "https://loikrathong-79265-default-rtdb.firebaseio.com",
    projectId: "loikrathong-79265",
    storageBucket: "loikrathong-79265.appspot.com",
    messagingSenderId: "539436992765",
    appId: "1:539436992765:web:bf6845ccd72629e1551694"
};

// เชื่อมต่อ Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const krathongsRef = ref(db, "krathongs");

// ฟังก์ชันลอยกระทง
window.sendKrathong = function () {
    const wishText = document.getElementById("wish").value;
    if (wishText.trim() !== "") {
        push(krathongsRef, { wish: wishText });
        document.getElementById("wish").value = ""; // ล้างช่องป้อนข้อความ
        showPopup();
    }
};

// ฟังก์ชันสร้างกระทงใหม่
function addKrathong(wish, index) {
    const river = document.getElementById("river");

    const krathong = document.createElement("div");
    krathong.className = "krathong";
    
    // สุ่มตำแหน่งให้อยู่กลางแม่น้ำ
    const topPosition = 30 + Math.random() * 20; 
    krathong.style.top = `${topPosition}vh`;

    // สุ่มความเร็ว
    const duration = 20 + Math.random() * 10; 
    const delay = Math.random() * 5; 

    // สลับทิศทางกระทง
    if (index % 2 === 0) {
        krathong.style.animation = `floatKrathong ${duration}s linear ${delay}s infinite alternate`;
    } else {
        krathong.style.animation = `floatKrathongReverse ${duration}s linear ${delay}s infinite alternate`;
    }

    // เพิ่มรูปกระทง
    const img = document.createElement("img");
    img.src = "krathong.png";

    // เพิ่มข้อความ
    const wishDiv = document.createElement("div");
    wishDiv.className = "wish";
    wishDiv.textContent = wish;

    krathong.appendChild(img);
    krathong.appendChild(wishDiv);
    river.appendChild(krathong);
}

// ดึงข้อมูลจาก Firebase
onValue(krathongsRef, (snapshot) => {
    document.getElementById("river").innerHTML = "";
    const data = snapshot.val();
    if (data) {
        Object.values(data).forEach((item, index) => {
            addKrathong(item.wish, index);
        });
    }
});

// ฟังก์ชันแสดงป๊อปอัพ
function showPopup() {
    document.getElementById("popup").style.display = "block";
}

// ปิดป๊อปอัพ
window.closePopup = function () {
    document.getElementById("popup").style.display = "none";
};

// รีเซ็ตกระทง
window.resetKrathongs = function () {
    remove(krathongsRef);
};
