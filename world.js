const canvas = document.getElementById('worldCanvas');
const ctx = canvas.getContext('2d');

// ปรับขนาดให้เต็มจอและคมชัด
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const TILE_W = 64; // ความกว้างบล็อก
const TILE_H = 32; // ความสูงบล็อก
const MAP_SIZE = 25; // ขนาดแมพ

// ตั้งค่าสี Biome ให้ดูสมจริง
const COLORS = {
    grass: { top: "#55a630", side: "#2b9348" },
    water: { top: "#4895ef", side: "#4361ee" },
    dirt:  { top: "#795548", side: "#5d4037" },
    sand:  { top: "#eeef20", side: "#d4d700" }
};

let map = [];

function initMap() {
    for (let x = 0; x < MAP_SIZE; x++) {
        map[x] = [];
        for (let y = 0; y < MAP_SIZE; y++) {
            let noise = Math.random();
            let type = "grass";
            let height = 0;

            if (noise < 0.1) type = "water";
            else if (noise > 0.9) { type = "dirt"; height = 15; } // ภูเขาสูงขึ้น
            else if (noise < 0.2) type = "sand";

            map[x][y] = { type, height };
        }
    }
}

function drawTile(x, y, type, heightOffset) {
    const screenX = (x - y) * (TILE_W / 2) + canvas.width / 2;
    const screenY = (x + y) * (TILE_H / 2) + canvas.height / 4 - heightOffset;

    const colors = COLORS[type];

    // 1. วาดด้านข้าง (Left Face) - สร้างมิติความหนา
    ctx.beginPath();
    ctx.moveTo(screenX - TILE_W / 2, screenY);
    ctx.lineTo(screenX, screenY + TILE_H / 2);
    ctx.lineTo(screenX, screenY + TILE_H / 2 + 10);
    ctx.lineTo(screenX - TILE_W / 2, screenY + 10);
    ctx.fillStyle = colors.side;
    ctx.fill();

    // 2. วาดด้านข้าง (Right Face)
    ctx.beginPath();
    ctx.moveTo(screenX + TILE_W / 2, screenY);
    ctx.lineTo(screenX, screenY + TILE_H / 2);
    ctx.lineTo(screenX, screenY + TILE_H / 2 + 10);
    ctx.lineTo(screenX + TILE_W / 2, screenY + 10);
    ctx.fillStyle = shadeColor(colors.side, -10);
    ctx.fill();

    // 3. วาดด้านบน (Top Face)
    ctx.beginPath();
    ctx.moveTo(screenX, screenY);
    ctx.lineTo(screenX + TILE_W / 2, screenY - TILE_H / 2);
    ctx.lineTo(screenX + TILE_W, screenY); // ปรับตำแหน่งเล็กน้อยเพื่อความเป๊ะ
    ctx.moveTo(screenX, screenY);
    ctx.lineTo(screenX + TILE_W / 2, screenY + TILE_H / 2);
    ctx.lineTo(screenX + TILE_W, screenY);
    
    // วาดรูปสี่เหลี่ยมข้าวหลามตัดด้านบน
    ctx.beginPath();
    ctx.moveTo(screenX, screenY);
    ctx.lineTo(screenX + TILE_W / 2, screenY - TILE_H / 2);
    ctx.lineTo(screenX + TILE_W, screenY);
    ctx.lineTo(screenX + TILE_W / 2, screenY + TILE_H / 2);
    
    // แก้ไขการวาด Top Face ใหม่ให้สมบูรณ์
    ctx.beginPath();
    ctx.moveTo(screenX, screenY);
    ctx.lineTo(screenX + TILE_W / 2, screenY - TILE_H / 2);
    ctx.lineTo(screenX + TILE_W, screenY);
    ctx.lineTo(screenX + TILE_W / 2, screenY + TILE_H / 2);
    ctx.closePath();
    ctx.fillStyle = colors.top;
    ctx.fill();
    
    // ใส่เส้นขอบบางๆ ให้ดูคม
    ctx.strokeStyle = "rgba(0,0,0,0.05)";
    ctx.stroke();
}

// ฟังก์ชันช่วยปรับความเข้มสี
function shadeColor(color, percent) {
    let num = parseInt(color.replace("#",""),16), amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<0?0:R:255)*0x10000 + (G<255?G<0?0:G:255)*0x100 + (B<255?B<0?0:B:255)).toString(16).slice(1);
}

function render() {
    ctx.fillStyle = "#1a1a1a"; // พื้นหลังมืดให้งานดูเด่น
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < MAP_SIZE; x++) {
        for (let y = 0; y < MAP_SIZE; y++) {
            const tile = map[x][y];
            drawTile(x, y, tile.type, tile.height);
        }
    }
    requestAnimationFrame(render);
}

initMap();
render();
