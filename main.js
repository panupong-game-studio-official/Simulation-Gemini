// main.js
import { World } from './world.js';
import { Human } from './human.js';
import { drawWorld, drawHuman } from './render.js';

const canvas = document.getElementById('worldCanvas');
const ctx = canvas.getContext('2d');
const world = new World();
let population = [
    new Human(1, 10, 10, 'M'), // Adam
    new Human(2, 12, 10, 'F')  // Eve
];

function update() {
    // 1. วาดโลก
    drawWorld(ctx, world);

    // 2. จัดการประชากร
    population.forEach(h => {
        // AI Logic: เดินหาคู่ หรือ หาไม้
        h.x += (Math.random() - 0.5) * 0.1;
        h.y += (Math.random() - 0.5) * 0.1;

        drawHuman(ctx, h);
    });

    // 3. ระบบสืบพันธุ์ (ถ้าอยู่ใกล้กันและพลังงานเยอะ)
    if (population.length < 1000) { 
        // อนาคตใส่ Logic: if(dist(Adam, Eve) < 1) spawnBaby()
    }

    requestAnimationFrame(update);
}
update();
