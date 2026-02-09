export const TILE_SIZE = 32;
export class World {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.grid = [];
        this.generate();
    }
    generate() {
        for (let x = 0; x < this.width; x++) {
            this.grid[x] = [];
            for (let y = 0; y < this.height; y++) {
                let r = Math.random();
                // สุ่มสร้างน้ำ (Water) หรือต้นไม้ (Tree)
                if (r < 0.05) this.grid[x][y] = { type: 'WATER', color: '#2196F3' };
                else if (r < 0.15) this.grid[x][y] = { type: 'TREE', color: '#2d5a27' };
                else this.grid[x][y] = { type: 'GRASS', color: '#4caf50' };
            }
        }
    }
}
