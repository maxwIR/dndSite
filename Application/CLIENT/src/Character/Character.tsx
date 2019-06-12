import * as React from 'react';
import { ICharacter, IField } from "../Common/interfaces";
import { request } from '../Common/util';
//import Splash from './Splash';

interface ICharacterP {
    characterID: string;
}

interface ICharacterS {
    character: ICharacter|null;
}

class Character extends React.Component<ICharacterP, ICharacterS> {
	constructor(props: any) {
        super(props)
        this.setState({character: null});
        this.setState = this.setState.bind(this);
        this.loadCharacter = this.loadCharacter.bind(this);
        this.loadCharacter(this.props.characterID).then((char)=>this.setState({character: char}));
    }
    
    async loadCharacter(id: string):Promise<ICharacter>{
        return request('/api/character/'+id)
            .then((data) => JSON.parse(data) as ICharacter);
        // let f:IField = {
        //     breakdown: {
        //         src1: 4,
        //         scr4: 2,
        //         src3: -2
        //     },
        //     conditional: {
        //         "in situation x": 1
        //     }
        // }
        // let character:ICharacter = {
        //     id: id,
        //     name : "Kwothe",
        //     alignment : "NG",
        //     armorClass : f,
        //     currentHp : 30,
        //     experience: 111,
        //     feats: [],
        //     flatFootedArmorClass: f,
        //     inventory: ["item1", "item2"],
        //     levels: [],
        //     player: "Max",
        //     proficiencies: ["low-light vision"],
        //     race: "Human",
        //     racialTraits: [],
        //     skills: {
        //         "skill1": f,
        //         "skill2": f
        //     },
        //     speed: f,
        //     stats: {
        //         strength: f,
        //         dexterity: f,
        //         constitution: f,
        //         wisdom: f,
        //         intelligence: f,
        //         charasima: f
        //     },
        //     touchArmorClass: f,
        //     weapons: ["wep1", "wep2"]
        // };
        // return new Promise(resolve => setTimeout(()=>resolve(character), 2000));
    }

	render() {
        console.log("in Character");
        console.log(this.state);
        if(!this.state || this.state.character == null){
            return (<h1>LOADING CHARACTER</h1>);
        } else {
            return (
                <div>
                    <h1>Hi {this.state.character.player}</h1>
                    <h1>{this.state.character.name}</h1>
                    <h3>Hit Points: {this.state.character.currentHp}</h3>
                </div>
            )
        }
	}

}

export default Character