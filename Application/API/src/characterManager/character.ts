import { ICharacter, IField } from "../common/interfaces";
import * as defaultCharacter from "../../public/defaultCharacter.json";

export async function getCharacter(id:string) : Promise<ICharacter>{
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
        weapons: ["wep1", "wep2"],
        campaign: "defaultCampaign"
    };
    return new Promise(resolve => setTimeout(()=>resolve(character), 2000));
} 

export class CCharacter {
    character: ICharacter;
    constructor(ID: string, name: string, playerName: string, campaign: string) {
        this.character = (defaultCharacter as ICharacter);
        this.character.id = ID;
        this.character.name = name;
        this.character.player = playerName;
        this.character.campaign = campaign;
    }

    
}