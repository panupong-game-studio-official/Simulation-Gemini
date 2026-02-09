// world.js
export const TILE_SIZE = 32; 
export const MAP_COLUMNS = 100; // เพิ่มจำนวนแถว
export const MAP_ROWS = 100;    // เพิ่มจำนวนคอลัมน์

export class World {
    constructor() {
        this.grid = [];
        this.generateMap();
    }

    generateMap() {
        for (let x = 0; x < MAP_COLUMNS; x++) {
            this.grid[x] = [];
            for (let y = 0; y < MAP_ROWS; y++) {
                let rand = Math.random();
                // สุ่มภูมิประเทศให้ดูเป็นธรรมชาติขึ้น
                if (rand < 0.08) this.grid[x][y] = { type: 'WATER', color: '#1E88E5' }; // น้ำ
                else if (rand < 0.15) this.grid[x][y] = { type: 'FOREST', color: '#1B5E20' }; // ป่าทึบ
                else if (rand < 0.20) this.grid[x][y] = { type: 'MOUNTAIN', color: '#5D4037' }; // ภูเขา
                else this.grid[x][y] = { type: 'GRASS', color: '#4CAF50' }; // ทุ่งหญ้า
            }
        }
    }
}
