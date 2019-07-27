import * as React from 'react';

interface ICharacterCreationS {
    playerID: string | null,
    campaignList: any[],
}

interface ICharacterCreationP {
   playerID: string | null;
}

class CharacterCreation extends React.Component<ICharacterCreationP, ICharacterCreationS> {
	constructor(props: ICharacterCreationP) {
        super(props)
        this.state = {
            playerID: this.props.playerID,
            campaignList: []
        };
        this.loadCharacter = this.loadCharacter.bind(this)

        if (!this.state.playerID){
            // CALL API TO GET CAMPAIGNS
        }
    }
    
    loadCharacter() {
        
    }

    getCampaignList() {

    }

	render() {
        console.log("in Creation")
        if (!this.state || this.state.playerID == null) {
            let campaignEl = <h3>Default</h3>;
            if (this.state.campaignList){
                let list = this.state.campaignList.map(camp => <li>{camp}</li>);
                campaignEl = <ul>Campaigns: {...list}</ul>
            } else {
                campaignEl = <h3>Loading</h3>;
            }
            return (
                <div>
                    <h1>Create</h1>
                    {campaignEl}
                </div>
            );
        }
        console.log("continuing creation");
            return (
                <h1>not new creation</h1>
            );
	}

}

export default CharacterCreation