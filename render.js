// render.js
import { TILE_SIZE } from './world.js';

export function drawWorld(ctx, world) {
    world.grid.forEach((col, x) => {
        col.forEach((tile, y) => {
            ctx.fillStyle = tile.color;
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        });
    });
}

export function drawHuman(ctx, h) {
    const x = h.x * TILE_SIZE;
    const y = h.y * TILE_SIZE;

    // ตัว (เสื้อ)
    ctx.fillStyle = "#333"; 
    ctx.fillRect(x + 8, y + 10, 16, 20); 
    
    // หัวเหลี่ยมๆ แบบ Minecraft
    ctx.fillStyle = h.traits.skin;
    ctx.fillRect(x + 10, y, 12, 12);
    
    // ผม
    ctx.fillStyle = h.traits.hair;
    ctx.fillRect(x + 10, y, 12, 4);

    // ชื่อ
    ctx.fillStyle = "white";
    ctx.font = "bold 10px Arial";
    ctx.fillText(h.gender === 'M' ? "Adam" : "Eve", x + 5, y - 5);
}
