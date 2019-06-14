import * as races from "../../public/races.json";
import * as defaultCharacter from "../../public/defaultCharacter.json";
import { IRace } from "../common/interfaces.js";

export function getRaces() {
	let raceList = races as IRace[]; //replace with DB call
	raceList.forEach(race => {
		let func = '';
		try {
			func = eval(race.function as string);
		} catch (e){
			console.log("error in parsing race " + e);
		}
		delete race.function;
		race.function = func;
	});
	return races; 
}

export function createNew(ID: string, name: string, playerName: string, campaign: string){
	let character = defaultCharacter;
	character.id = ID;
	
}