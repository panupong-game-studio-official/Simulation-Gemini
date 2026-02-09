// human.js
export class Human {
    constructor(id, x, y, gender, parents = null) {
        this.id = id;
        this.gender = gender;
        this.x = x;
        this.y = y;
        this.age = 0;
        this.isChild = true;
        
        // --- 🧬 DNA สมจริง ---
        this.traits = {
            skin: parents ? this.mix(parents[0].skin, parents[1].skin) : this.randomColor(),
            hair: parents ? parents[Math.round(Math.random())].hair : this.randomColor(),
            nationality: parents ? parents[0].nationality : ["Asian", "European", "African", "Latino"][Math.floor(Math.random()*4)],
            strength: Math.random() * 100
        };

        this.inventory = { wood: 0, food: 0 };
        this.energy = 100;
        this.target = null;
    }

    randomColor() { return '#' + Math.floor(Math.random()*16777215).toString(16); }
    mix(c1, c2) { /* ฟังก์ชันผสมสีผิวลูก */ return c1; }
}
