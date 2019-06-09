interface ICharacter {
    id: string,
    name: string,
    player: string,
    experience: number,
    race: string,
    alignment: string,
    currentHp: number,
    stats: IStats,
    speed: IField,
    racialTraits: string [],
    levels: ILevel [],
    skills: {[key:string]:IField},
    proficiencies: string[],
    feats: string[],
    weapons: any[],
    inventory: string[],
    armorClass: IField,
    touchArmorClass: IField,
    flatFootedArmorClass: IField,
}

interface ILevel {

}


interface IStats {
    strength: IField,
    dexterity: IField,
    constitution: IField,
    intelligence: IField,
    wisdom: IField,
    charasima: IField,
}

interface IField {
    breakdown: {[key:string]:number},
    conditional: {[key:string]:number}
}



export async function getCharacter(id:string){
    let f:IField = {
        breakdown: {
            src1: 4,
            scr4: 2,
            src3: -2
        },
        conditional: {
            "in situation x": 1
        }
    }
    let character:ICharacter = {
        id: id,
        name : "Kwothe",
        alignment : "NG",
        armorClass : f,
        currentHp : 30,
        experience: 111,
        feats: [],
        flatFootedArmorClass: f,
        inventory: ["item1", "item2"],
        levels: [],
        player: "Max",
        proficiencies: ["low-light vision"],
        race: "Human",
        racialTraits: [],
        skills: {
            "skill1": f,
            "skill2": f
        },
        speed: f,
        stats: {
            strength: f,
            dexterity: f,
            constitution: f,
            wisdom: f,
            intelligence: f,
            charasima: f
        },
        touchArmorClass: f,
        weapons: ["wep1", "wep2"]
    };
    return new Promise(resolve => setTimeout(()=>resolve(character), 2000));
} 