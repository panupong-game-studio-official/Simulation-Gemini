export class LifeManager {
    constructor() {
        this.entities = [];
        this.initEcosystem();
    }

    initEcosystem() {
        // สุ่มสร้างต้นไม้และดอกไม้
        for(let i=0; i<50; i++) this.entities.push(new Plant("Tree", Math.random()*window.innerWidth, Math.random()*window.innerHeight));
        // สุ่มสร้างสัตว์ (สัตว์กินพืช/กินเนื้อ)
        this.entities.push(new Animal("Wolf", "Carnivore", true)); // ดุร้าย กินเนื้อ
        this.entities.push(new Animal("Deer", "Herbivore", false)); // ไม่ดุร้าย กินพืช
        this.entities.push(new Animal("Snake", "Carnivore", true, true)); // มีพิษ
    }

    updateAndDraw(ctx, light) {
        this.entities.forEach(ent => {
            ent.update();
            ent.draw(ctx, light);
        });
    }
}

class Animal {
    constructor(type, diet, aggressive, isPoisonous = false) {
        this.type = type;
        this.diet = diet; // "Carnivore" หรือ "Herbivore"
        this.aggressive = aggressive;
        this.isPoisonous = isPoisonous;
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.health = 100;
        this.energy = 100;
        this.hasCancer = Math.random() < 0.01; // มะเร็งสุ่มเกิด (1%)
    }

    update() {
        // AI เดินหาอาหารตามประเภท
        this.x += (Math.random() - 0.5) * 2;
        this.y += (Math.random() - 0.5) * 2;
        
        if (this.hasCancer) this.health -= 0.001; // ค่อยๆ ลดเลือดถ้าเป็นมะเร็ง
    }

    draw(ctx, light) {
        ctx.fillStyle = this.aggressive ? `rgba(255,0,0,${light})` : `rgba(255,255,255,${light})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.fillText(this.type, this.x - 10, this.y - 10);
    }
}

class Plant {
    constructor(type, x, y) {
        this.type = type;
        this.x = x; this.y = y;
        this.isMedicinal = Math.random() > 0.8; // พืชสมุนไพร
    }
    update() {}
    draw(ctx, light) {
        ctx.fillStyle = `rgba(0, ${200 * light}, 0, 1)`;
        ctx.fillRect(this.x, this.y, 4, 10);
    }
}
