import * as React from 'react';
import { ICharacter, IField } from "../Common/interfaces";
import { request } from '../Common/util';
import Field from './Field';
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
        this.listSkills = this.listSkills.bind(this);
        this.loadCharacter(this.props.characterID).then((char)=>this.setState({character: char}));
    }

    listSkills():JSX.Element{
        let ret = [];
        for(let skill in this.state.character.skills) {
            let obj = {name: skill, field: this.state.character.skills[skill]}
            ret.push(<Field {...obj}/>);
        };
        return <div>{ret}</div>;
    }
    
    async loadCharacter(id: string):Promise<ICharacter>{
        return request('/api/character/'+id)
            .then((data) => JSON.parse(data) as ICharacter);
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

	render() {
        console.log("in Character");
        console.log(this.state);
        if(!this.state || this.state.character == null){
            return (
        <div className="row align-items-center full">
            <div className="col-xs-10 col-sm-8 col-md-6 col-lg-4 card align-items-center">
               <div className="row justify-content-center">
					<div className="col-12">
						<h1>Loading character...</h1>
					</div>
               </div>
               <div className="row justify-content-center">
					<div className="col-5">
                        <i className="fa fa-circle-o-notch fa-spin"></i>
					</div>
               </div>
            </div>
        </div>
               );
        } else {
            return (
    <div>
        <nav id="navbar" className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <a className="navbar-brand" href="#">Pathfinder</a>
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#myNavbar" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="navbar-nav mr-auto nav-pills">
                    <li className="nav-item">
                        <a className="nav-link" href="#stat">
                            Stats
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#offence">
                            Offence
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#defense">
                            Defense
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#skills">
                            Skills
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#spells">
                            Spells
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#inventory">
                            Inventory
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

        <div className="scrollspy" data-spy="scroll" data-target="#navbar" data-offset="50">
            <div className="card row" id="overview">
                <h3> Character: </h3> 
                <p>Hi {this.state.character.player}</p>
                <p>{this.state.character.name}</p>
            </div>
            <div className="row">
                <div className="col-md-6" id="details"> 
                    <div id="stats" className="card">
                        <h3>Stats</h3>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card" id="skills"> 
                        <h3>Skills</h3>
                        {this.listSkills()}
                    </div>
                </div>
            </div>
            <h4 id="offence">ofsense</h4>
            <p>...</p>
            <p>...</p>
            <p>...</p>
            <p>...</p>
            <p>...</p>
            <p>...</p>
            <h4 id="defense">one</h4>
            <p>...</p>
            <p>...</p>
            <p>...</p>
            <p>...</p>
            <p>...</p>
            <p>...</p>
            <h4 id="inventory">three</h4>
            <p>...</p>
            <p>...</p>
            <p>...</p>
            <p>...</p>
            <p>...</p>
            <p>...</p>
        </div>

    </div>
            )
        }
	}
/*        <div>
            <h1>Hi {this.state.character.player}</h1>
            <h1>{this.state.character.name}</h1>
            <h3>Hit Points: {this.state.character.currentHp}</h3>
        </div>*/
}

export default Character