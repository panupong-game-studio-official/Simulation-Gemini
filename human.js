export class Human {
    constructor(name, x, y, gender) {
        this.name = name;
        this.x = x; this.y = y;
        this.gender = gender;
        this.inventory = { wood: 0 };
        this.skin = ["#FFDBAC", "#8D5524", "#E0AC69"][Math.floor(Math.random()*3)];
        this.hair = ["#442211", "#221100", "#000000"][Math.floor(Math.random()*3)];
    }

    draw(ctx) {
        const px = this.x * 32;
        const py = this.y * 32;
        
        // ตัวละครแบบ Blocky (Minecraft Style)
        ctx.fillStyle = this.skin;
        ctx.fillRect(px + 8, py + 4, 16, 16); // หัว
        ctx.fillStyle = this.hair;
        ctx.fillRect(px + 8, py + 4, 16, 5); // ผม
        ctx.fillStyle = "#333"; 
        ctx.fillRect(px + 6, py + 20, 20, 10); // เสื้อ
        
        ctx.fillStyle = "white";
        ctx.font = "10px Arial";
        ctx.fillText(this.name, px + 5, py);
    }
}
