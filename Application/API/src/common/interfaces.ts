export interface ICharacter {
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
	campaign: string
}

export interface ILevel {

}


export interface IStats {
    strength: IField,
    dexterity: IField,
    constitution: IField,
    intelligence: IField,
    wisdom: IField,
    charasima: IField,
}

export interface IField {
    breakdown: {[key:string]:number},
    conditional: {[key:string]:number}
}

export interface IAbility {
	name: string,
	description: string,
	function: null | string | ((char:ICharacter) => ICharacter[])
}

export interface IRace {
	name: string,
	description: string,
	baseSpeed:number,
	options:{ name:string,
		function: null | string | ((char:ICharacter) => ICharacter)}[],
	function: null | string | ((char:ICharacter) => ICharacter[]),
	racialAbilities: IAbility[]
}