// ข้อมูลสำหรับแต่ละ LEVEL (รวมข้อความ รหัสผ่าน และรูปภาพ)
const levels = [
    { description: "ลองใส่ PASSWORD ดูสิ", password: "PASSWORD", image: "" }, // LEVEL 1 ไม่มีรูปภาพ
    { description: "HERE", password: "311", image: "" }, // LEVEL 2 ไม่มีรูปภาพ
    { description: "", password: "APT.", image: "images/level3.jpg" } // LEVEL 3 มีรูปภาพและรหัสผ่านเป็น APT.
];

const attempts = Array(levels.length).fill(0); // เก็บจำนวนครั้งที่พลาดในแต่ละ LEVEL
let currentLevel = 0; // ตัวแปรเก็บ LEVEL ปัจจุบัน

// อัพเดตข้อความและรูปภาพสำหรับ LEVEL ปัจจุบัน
function updateLevelText() {
    document.getElementById("levelText").textContent = `LEVEL ${currentLevel + 1}: ${levels[currentLevel].description}`;
    const levelImage = document.getElementById("levelImage");
    
    // แสดงรูปภาพเฉพาะ LEVEL ที่มีรูปภาพ
    if (levels[currentLevel].image) {
        levelImage.src = levels[currentLevel].image;
        levelImage.style.display = "block"; // แสดงรูปภาพ
    } else {
        levelImage.style.display = "none"; // ซ่อนรูปภาพถ้าไม่มี
    }
}

// เริ่มเกมโดยการอัพเดต LEVEL แรก
updateLevelText();

// ตรวจสอบรหัสผ่านเมื่อคลิกปุ่มตรวจสอบ
document.getElementById("checkButton").addEventListener("click", function() {
    const userInput = document.getElementById("passwordInput").value;

    // เพิ่มจำนวนครั้งที่พลาดใน LEVEL ปัจจุบัน
    attempts[currentLevel]++;

    // ล้างข้อความผลลัพธ์ก่อนหน้านี้
    document.getElementById("result").textContent = '';

    // ตรวจสอบรหัสผ่าน
    if (userInput === levels[currentLevel].password) {
        document.getElementById("result").textContent = `รหัสผ่านถูกต้อง! คุณพยายาม ${attempts[currentLevel]} ครั้งใน LEVEL นี้`;
        document.getElementById("result").className = 'correct'; // เปลี่ยนเป็นสีเขียว
        
        if (currentLevel < levels.length - 1) {
            currentLevel++; // ไปยัง LEVEL ถัดไป
            updateLevelText(); // อัพเดตข้อความและรูปภาพสำหรับ LEVEL ใหม่
        } else {
            // เมื่อผ่าน LEVEL สุดท้าย
            let totalAttempts = attempts.reduce((sum, attempts) => sum + attempts, 0); // คำนวณยอดรวมทั้งหมด
            let summary = "สรุปจำนวนครั้งที่พลาดในแต่ละ LEVEL:<br>";
            for (let i = 0; i < attempts.length; i++) {
                summary += `LEVEL ${i + 1}: ${attempts[i]} ครั้ง<br>`;
            }
            summary += `<br>รวมทั้งหมด: ${totalAttempts} ครั้ง`; // แสดงยอดรวม
            document.getElementById("result").innerHTML = summary;
            document.getElementById("result").className = 'summary'; // เปลี่ยนเป็นสีน้ำเงิน
            document.getElementById("levelImage").style.display = "none"; // ซ่อนรูปภาพเมื่อจบเกม
        }
    } else {
        document.getElementById("result").textContent = `รหัสผ่านผิด! คุณพยายาม ${attempts[currentLevel]} ครั้งใน LEVEL นี้`;
        document.getElementById("result").className = 'incorrect'; // เปลี่ยนเป็นสีแดง
    }

    // ล้างช่องกรอกรหัสผ่าน
    document.getElementById("passwordInput").value = '';
});
