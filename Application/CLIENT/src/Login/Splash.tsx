import * as React from 'react';
import Login from './Login';
import CharacterCreation from '../Character/CharacterCreation';

interface ISplashS {
    customer: "existing"|"new" ;
    id: string | null;
}

interface ISplashP {
    setCharacterId: (id: string)=>void;
}

class Splash extends React.Component<ISplashP, ISplashS> {
	constructor(props: ISplashP) {
        super(props)
        this.state = {
            customer: "existing",
            id: null
        }

        this.pickNew = this.pickNew.bind(this)
    }
    
    pickNew() {
        this.setState({customer: "new"});
    }

	render() {
        console.log("in Splash")
        if (this.state.customer == "existing") {
            return (
                <Login pickNew = {this.pickNew} setCharacterId = {this.props.setCharacterId}/>
            );
        }
        else {
            return (
                <CharacterCreation playerID = {null}/>
            )
        }
	}

}

export default Splash