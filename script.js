function floatKrathong() {
    let messageInput = document.getElementById("message").value;
    
    if (messageInput.trim() === "") {
        alert("กรุณากรอกคำอวยพรก่อนลอยกระทง!");
        return;
    }

    let krathongContainer = document.createElement("div");
    krathongContainer.classList.add("krathong-container");
    
    let krathongImg = document.createElement("img");
    krathongImg.src = "krathong.png";
    krathongImg.classList.add("krathong");

    let wishText = document.createElement("p");
    wishText.textContent = messageInput;
    wishText.classList.add("wish-text");

    krathongContainer.appendChild(krathongImg);
    krathongContainer.appendChild(wishText);
    document.getElementById("krathongArea").appendChild(krathongContainer);

    // แสดงป๊อปอัพ
    alert("🎇 กระทงของคุณได้ลอยไปแล้ว! 🎆");

    // เริ่มแอนิเมชันให้กระทงลอย
    krathongContainer.style.animation = "floatKrathong 15s linear infinite";
}
