import { Human } from './human.js';
import { Brain } from './brain.js';

const canvas = document.getElementById('worldCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let population = [
    new Human(1, "Adam", "Male"),
    new Human(2, "Eve", "Female")
];

function drawHuman(h) {
    const { x, y } = h.pos;
    const walk = Math.sin(h.angle) * 5;

    // วาดเงา
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.beginPath(); ctx.ellipse(x, y+15, 10, 5, 0, 0, Math.PI*2); ctx.fill();

    // วาดลำตัวและมือเท้า
    ctx.fillStyle = h.clothes.top;
    ctx.fillRect(x - 8, y - 10, 16, 20); // เสื้อ
    ctx.fillStyle = h.dna.skin;
    ctx.fillRect(x - 12, y - 5 + walk, 4, 8); // แขนซ้าย
    ctx.fillRect(x + 8, y - 5 - walk, 4, 8);  // แขนขวา

    // วาดหัว อวัยวะใบหน้า
    ctx.beginPath(); ctx.arc(x, y - 20, 10, 0, Math.PI * 2); ctx.fill();
    
    // ตาและสีดวงตา
    ctx.fillStyle = "white"; ctx.fillRect(x-5, y-22, 3, 3); ctx.fillRect(x+2, y-22, 3, 3);
    ctx.fillStyle = h.dna.eyeColor; ctx.fillRect(x-4, y-21, 1.5, 1.5); ctx.fillRect(x+3, y-21, 1.5, 1.5);
    
    // ทรงผม
    ctx.fillStyle = h.dna.hairColor; ctx.fillRect(x-10, y-30, 20, 7);

    // ชื่อและสัญชาติ
    ctx.fillStyle = "white";
    ctx.font = "12px Arial";
    ctx.fillText(`${h.name} (${h.dna.nationality})`, x - 20, y - 40);
}

function update() {
    ctx.fillStyle = "#2e7d32"; // พื้นหญ้า
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    population.forEach(h => {
        const action = Brain.decide(h);
        
        // ระบบเคลื่อนที่
        let dx = h.target.x - h.pos.x;
        let dy = h.target.y - h.pos.y;
        let dist = Math.sqrt(dx*dx + dy*dy);

        if (dist > 5) {
            h.pos.x += (dx / dist) * 1.5;
            h.pos.y += (dy / dist) * 1.5;
            h.angle += 0.2;
        } else {
            h.target = { x: Math.random() * canvas.width, y: Math.random() * canvas.height };
        }

        drawHuman(h);
    });

    requestAnimationFrame(update);
}

update();
