import * as React from 'react';
import Splash from './Login/Splash';

interface IMain {
    characterID:string;
}

class Main extends React.Component<{}, IMain> {
	constructor(props: any) {
        super(props)
        
        this.state = {
            characterID: null
        }

        this.setCharacterId = this.setCharacterId.bind(this);
    }
    
    setCharacterId(id: string){
        this.setState({characterID : id});
    }

	render() {
        console.log("in Main")
        if (!this.state.characterID)
            return (
                <Splash setCharacterId = {this.setCharacterId}/>
            );
        else {
            return (
                <h1> Welcome back {this.state.characterID}</h1>
            )
        }
	}

}

export default Main