import { addKrathong, loadKrathongs } from "./firebase-config.js";

// ฟังก์ชันลอยกระทง
document.getElementById("submit").addEventListener("click", () => {
  const message = document.getElementById("wish").value;
  if (message) {
    addKrathong(message);
    alert("🌊 กระทงของคุณได้ลอยไปแล้ว!");
    document.getElementById("wish").value = ""; // เคลียร์ช่อง input
  }
});

// โหลดกระทงที่มีอยู่
loadKrathongs((krathongs) => {
  const container = document.getElementById("krathongList");
  container.innerHTML = "";
  krathongs.forEach((krathong) => {
    const item = document.createElement("p");
    item.textContent = "🎆 " + krathong.message;
    container.appendChild(item);
  });
});
