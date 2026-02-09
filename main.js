import { World, TILE_SIZE, MAP_COLUMNS, MAP_ROWS } from './world.js';
import { Human } from './human.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// ฟังก์ชันปรับขนาด Canvas ให้เต็มจอ
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const myWorld = new World();
let population = [
    new Human("Adam", 50, 50, "M"), // เกิดตรงกลางแมพ
    new Human("Eve", 52, 50, "F")
];

// ระบบกล้อง (Camera Offset) เพื่อให้เราเลื่อนดูแมพได้ในอนาคต
let camera = { x: 0, y: 0 };

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // วาดโลกตามขนาด Grid ที่ขยายใหญ่ขึ้น
    for (let x = 0; x < MAP_COLUMNS; x++) {
        for (let y = 0; y < MAP_ROWS; y++) {
            ctx.fillStyle = myWorld.grid[x][y].color;
            // วาดโดยอ้างอิงตำแหน่งกล้อง
            ctx.fillRect(
                x * TILE_SIZE - camera.x, 
                y * TILE_SIZE - camera.y, 
                TILE_SIZE + 0.5, TILE_SIZE + 0.5 // +0.5 เพื่อลบเส้นรอยต่อ
            );
        }
    }

    // วาดคน
    population.forEach(h => {
        h.update(myWorld); // เพิ่ม AI การเดินในไฟล์ human.js
        h.draw(ctx, camera);
    });

    requestAnimationFrame(gameLoop);
}
gameLoop();
