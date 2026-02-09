export class Brain {
    static decide(human) {
        // ระบบความต้องการพื้นฐาน
        if (!human.needs) human.needs = { hunger: 100, energy: 100 };

        human.needs.hunger -= 0.01;
        human.needs.energy -= 0.005;

        // การตัดสินใจแบบ Logic
        if (human.needs.hunger < 30) return "หาอาหาร";
        if (human.needs.energy < 20) return "นอนหลับ";
        
        return "เดินสำรวจโลก";
    }
}
