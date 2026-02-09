import { World, TILE_SIZE } from './world.js';
import { Human } from './human.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800; canvas.height = 600;

const myWorld = new World(25, 20);
let population = [
    new Human("Adam", 5, 5, "M"),
    new Human("Eve", 10, 10, "F")
];

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. วาดโลกบล็อก
    for (let x = 0; x < myWorld.width; x++) {
        for (let y = 0; y < myWorld.height; y++) {
            ctx.fillStyle = myWorld.grid[x][y].color;
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }

    // 2. อัปเดตและวาด AI
    population.forEach(h => {
        // AI เดินสุ่มแบบช้าๆ
        if (Math.random() > 0.95) {
            h.x += Math.round(Math.random() * 2 - 1);
            h.y += Math.round(Math.random() * 2 - 1);
        }
        h.draw(ctx);
    });

    requestAnimationFrame(gameLoop);
}
gameLoop();
