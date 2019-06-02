import * as React from 'react';
import Login from './Login';

interface ISplashS {
    customer: "existing"|"new" ;
    id: string;
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
        if (this.state.customer == "existing")
            return (
                <Login pickNew = {this.pickNew} setCharacterId = {this.props.setCharacterId}/>
            );
        else {
            return (
                <h1> Make new character </h1>
            )
        }
	}

}

export default Splash