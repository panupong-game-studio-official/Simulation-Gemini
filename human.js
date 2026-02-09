export class Human {
    constructor(id, name, gender) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.age = 0;
        
        // --- 🧬 DNA สมจริง 100% ---
        this.dna = {
            nationality: this.randomNation(),
            skin: ["#FFDBAC", "#8D5524", "#C68642"][Math.floor(Math.random()*3)],
            hairColor: ["#000", "#442211", "#DDAA66"][Math.floor(Math.random()*3)],
            eyeColor: ["#2E536F", "#3D671D", "#1C1C1C"][Math.floor(Math.random()*4)],
            eyeSize: 1 + Math.random(),
            height: 150 + Math.random() * 30
        };

        // --- 📍 กายภาพและการเคลื่อนที่ ---
        this.pos = { x: Math.random() * 800, y: Math.random() * 500 };
        this.target = { x: this.pos.x, y: this.pos.y };
        this.angle = 0; 
        this.clothes = { top: "#"+((1<<24)*Math.random()|0).toString(16) };
    }

    randomNation() {
        const nations = ["Thai", "Japan", "USA", "Brazil", "Norway"];
        return nations[Math.floor(Math.random() * nations.length)];
    }
}
