const canvas = document.getElementById('worldCanvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// --- การตั้งค่าโลก ---
const TILE_W = 40; // ความกว้างของบล็อก
const TILE_H = 20; // ความสูงของบล็อก (ครึ่งหนึ่งของความกว้างเพื่อให้ได้มุมเฉียง)
const MAP_SIZE = 30; // ขนาดแผนที่ 30x30

let map = [];

// สร้างแผนที่แบบสุ่มภูมิประเทศ
function generateMap() {
    for (let x = 0; x < MAP_SIZE; x++) {
        map[x] = [];
        for (let y = 0; y < MAP_SIZE; y++) {
            let noise = Math.random();
            let type = "grass";
            let color = "#4CAF50";
            let elevation = 0;

            if (noise < 0.15) { type = "water"; color = "#2196F3"; }
            else if (noise > 0.85) { type = "mountain"; color = "#795548"; elevation = 10; }
            else if (noise > 0.7) { type = "forest"; color = "#2E7D32"; }

            map[x][y] = { type, color, elevation };
        }
    }
}

// ฟังก์ชันแปลงพิกัดปกติ (x, y) เป็นพิกัดเฉียง (Isometric)
function toIso(x, y) {
    return {
        isoX: (x - y) * (TILE_W / 2),
        isoY: (x + y) * (TILE_H / 2)
    };
}

function drawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // ย้ายจุดศูนย์กลางไปไว้ตรงกลางจอ
    const offsetX = canvas.width / 2;
    const offsetY = canvas.height / 4;

    for (let x = 0; x < MAP_SIZE; x++) {
        for (let y = 0; y < MAP_SIZE; y++) {
            const tile = map[x][y];
            const { isoX, isoY } = toIso(x, y);

            drawTile(offsetX + isoX, offsetY + isoY - tile.elevation, tile.color, tile.type === "mountain");
        }
    }
}

function drawTile(x, y, color, isTall) {
    // วาดส่วนบนของบล็อก
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + TILE_W / 2, y + TILE_H / 2);
    ctx.lineTo(x, y + TILE_H);
    ctx.lineTo(x - TILE_W / 2, y + TILE_H / 2);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    // วาดด้านข้างเพื่อให้ดูเป็น 3D (Depth)
    ctx.beginPath();
    ctx.moveTo(x - TILE_W / 2, y + TILE_H / 2);
    ctx.lineTo(x - TILE_W / 2, y + TILE_H / 2 + 5);
    ctx.lineTo(x, y + TILE_H + 5);
    ctx.lineTo(x + TILE_W / 2, y + TILE_H / 2 + 5);
    ctx.lineTo(x + TILE_W / 2, y + TILE_H / 2);
    ctx.lineTo(x, y + TILE_H);
    ctx.closePath();
    ctx.fillStyle = shadeColor(color, -20);
    ctx.fill();
}

// ฟังก์ชันปรับสีให้เข้มขึ้นสำหรับด้านข้างบล็อก
function shadeColor(color, percent) {
    let num = parseInt(color.replace("#",""),16), amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<0?0:R:255)*0x10000 + (G<255?G<0?0:G:255)*0x100 + (B<255?B<0?0:B:255)).toString(16).slice(1);
}

generateMap();
function loop() {
    drawMap();
    requestAnimationFrame(loop);
}
loop();
