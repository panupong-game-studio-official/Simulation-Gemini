// world.js
export const TILE_SIZE = 32; // ขนาดบล็อกเหมือน Minecraft
export const MAP_SIZE = 50; // 50x50 บล็อก

export class World {
    constructor() {
        this.grid = [];
        this.generateMap();
    }

    generateMap() {
        for (let x = 0; x < MAP_SIZE; x++) {
            this.grid[x] = [];
            for (let y = 0; y < MAP_SIZE; y++) {
                // สุ่มสร้าง ป่า (Forest), หญ้า (Grass), น้ำ (Water)
                let rand = Math.random();
                if (rand < 0.1) this.grid[x][y] = { type: 'WATER', color: '#2196F3' };
                else if (rand < 0.25) this.grid[x][y] = { type: 'WOOD', color: '#2d5a27', resource: 100 };
                else this.grid[x][y] = { type: 'GRASS', color: '#4caf50' };
            }
        }
    }
}
