// ตั้งค่า Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "https://YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// เริ่มต้น Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const krathongsRef = database.ref("krathongs");

// โหลดกระทงทั้งหมดจาก Firebase
krathongsRef.on("child_added", (snapshot) => {
    let data = snapshot.val();
    createFloatingKrathong(data.message);
});

function floatKrathong() {
    let messageInput = document.getElementById("message").value;

    if (messageInput.trim() === "") {
        alert("กรุณากรอกคำอวยพรก่อนลอยกระทง!");
        return;
    }

    // บันทึกข้อมูลไปที่ Firebase
    krathongsRef.push({
        message: messageInput
    });

    // แสดงป๊อปอัพ
    alert("🎇 กระทงของคุณได้ลอยไปแล้ว! 🎆");
}

// ฟังก์ชันสร้างกระทงลอย
function createFloatingKrathong(message) {
    let krathongContainer = document.createElement("div");
    krathongContainer.classList.add("krathong-container");
    
    let krathongImg = document.createElement("img");
    krathongImg.src = "krathong.png";
    krathongImg.classList.add("krathong");

    let wishText = document.createElement("p");
    wishText.textContent = message;
    wishText.classList.add("wish-text");

    krathongContainer.appendChild(krathongImg);
    krathongContainer.appendChild(wishText);
    document.getElementById("krathongArea").appendChild(krathongContainer);

    // เริ่มแอนิเมชันให้กระทงลอย
    krathongContainer.style.animation = "floatKrathong 15s linear infinite";
}
