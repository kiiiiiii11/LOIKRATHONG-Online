import { addKrathong, loadKrathongs } from "./firebase-config.js";

// ฟังก์ชันลอยกระทง
document.getElementById("submit").addEventListener("click", () => {
    const message = document.getElementById("wish").value;
    if (message) {
        addKrathong(message);
        createFloatingKrathong(message); // เพิ่มกระทงลอยใหม่
        alert("🌊 กระทงของคุณได้ลอยไปแล้ว!");
        document.getElementById("wish").value = ""; // เคลียร์ช่อง input
    }
});

// โหลดกระทงที่มีอยู่ และให้กระทงของทุกคนลอยขึ้น
loadKrathongs((krathongs) => {
    const container = document.getElementById("krathongList");
    container.innerHTML = "";

    krathongs.forEach((krathong) => {
        // แสดงรายการข้อความของกระทง
        const item = document.createElement("p");
        item.textContent = "🎆 " + krathong.message;
        container.appendChild(item);

        // ให้กระทงของทุกคนลอยขึ้นมา
        createFloatingKrathong(krathong.message);
    });
});

// ฟังก์ชันสร้างกระทงลอย
function createFloatingKrathong(message) {
    const floatingContainer = document.getElementById("floating-container");
    const krathong = document.createElement("img");

    krathong.src = "krathong.png"; // ใช้รูปภาพกระทง
    krathong.classList.add("krathong");

    // สุ่มตำแหน่ง
    const randomX = Math.random() * window.innerWidth * 0.8; // ให้อยู่ในหน้าจอ
    const randomDuration = 5 + Math.random() * 10; // ความเร็วในการลอย (5-15 วิ)

    krathong.style.left = `${randomX}px`;
    krathong.style.animationDuration = `${randomDuration}s`;

    floatingContainer.appendChild(krathong);

    // ลบกระทงออกเมื่อจบแอนิเมชัน
    setTimeout(() => {
        krathong.remove();
    }, randomDuration * 1000);
}
