import { LifeManager } from './life.js';

const canvas = document.getElementById('worldCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class World {
    constructor() {
        this.time = 0; // 0 - 1440 (นาทีใน 1 วัน)
        this.day = 1;
        this.month = 1;
        this.year = 1;
        this.season = "Summer";
        this.ambientLight = 1; // ความสว่างตามเวลา
        this.lifeManager = new LifeManager();
    }

    updateTime() {
        this.time += 2; // ความเร็วเวลา (เพิ่มทีละ 2 นาที)
        if (this.time >= 1440) {
            this.time = 0;
            this.day++;
            if (this.day > 30) { this.day = 1; this.month++; }
            if (this.month > 12) { this.month = 1; this.year++; }
            this.updateSeason();
        }
        
        // คำนวณแสงสว่าง (กลางวัน/กลางคืน)
        // 0-360 มืดมาก, 360-720 สว่างขึ้น, 720-1080 สว่างจ้า, 1080-1440 ค่อยๆ มืด
        let hour = this.time / 60;
        if (hour < 6 || hour > 18) this.ambientLight = 0.3; // กลางคืน
        else if (hour >= 10 && hour <= 15) this.ambientLight = 1.0; // เที่ยง
        else this.ambientLight = 0.7; // เช้า/เย็น
    }

    updateSeason() {
        if (this.month >= 3 && this.month <= 5) this.season = "Summer";
        else if (this.month >= 6 && this.month <= 8) this.season = "Rainy";
        else if (this.month >= 9 && this.month <= 11) this.season = "Winter";
        else this.season = "Dry";
    }

    render() {
        // วาดพื้นหลังตามแสง
        ctx.fillStyle = `rgb(${46 * this.ambientLight}, ${125 * this.ambientLight}, ${50 * this.ambientLight})`; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // แสดงผล UI
        document.getElementById('clock').innerText = `${Math.floor(this.time/60).toString().padStart(2,'0')}:${(this.time%60).toString().padStart(2,'0')}`;
        document.getElementById('calendar').innerText = `วันที่ ${this.day} เดือน ${this.month} ปี ${this.year} | ${this.season}`;
        
        this.lifeManager.updateAndDraw(ctx, this.ambientLight);
        requestAnimationFrame(() => this.render());
    }
}

const myWorld = new World();
setInterval(() => myWorld.updateTime(), 100); // อัปเดตเวลาทุก 0.1 วินาที
myWorld.render();
