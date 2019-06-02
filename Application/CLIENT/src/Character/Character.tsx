import * as React from 'react';
import { ICharacter } from "../Common/interfaces";
//import Splash from './Splash';

interface IMainP {
    characterID: string;
}

interface IMainS {
    character: ICharacter;
}

class Main extends React.Component< IMainP, IMainS> {
	constructor(props: any) {
        super(props)

        this.loadCharacter = this.loadCharacter.bind(this);
    }
    
    async loadCharacter(id: string){

        this.setState({});
    }

	render() {
        console.log("in Character");
       return (
           <h1>Hi this.props.characterID</h1>
       )
	}

}

export default Main