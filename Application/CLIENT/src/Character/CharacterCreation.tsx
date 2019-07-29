import * as React from 'react';
import { get, post } from '../Common/util';
import { createHash } from 'crypto';

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
        this.loadCharacter = this.loadCharacter.bind(this);
        this.createCharacter = this.createCharacter.bind(this);
        this.getCampaignList = this.getCampaignList.bind(this);

        if (!this.state.playerID){
            // CALL API TO GET CAMPAIGNS
        }
    }
    
    loadCharacter() {
        
    }

    async createCharacter(e) {
        e.preventDefault();
        let name = (document.getElementById('charName') as HTMLInputElement).value;
        let nickName = (document.getElementById('nickName') as HTMLInputElement).value;
        let pin = (document.getElementById('pin')as HTMLInputElement).value;
        let id = createHash('md5').update(nickName.toLowerCase()+pin).digest('hex');
        console.log(name, pin, id);

        let but = (document.getElementById('submitButton') as HTMLButtonElement); 
		  but.disabled= true;
		  but.innerHTML= '<i class="fa fa-circle-o-notch fa-spin"></i>';
        let idGood = await get("character/"+id);
        if (!idGood.exists){
          console.log("all good");
          let postCommand = await post("character/new",{
              id:id,
              name: name,
              nickName: nickName,
          });
          console.log('created', postCommand);
        } else {
          console.log("already exists");
          but.innerHTML= "Let's roll!";
          but.disabled=false;
          (document.getElementById('errorMessage')).hidden=false;
        }
        return "";
    }

    async getCampaignList() {
        let data = await get("campaign/all");
        this.setState({campaignList: data});
    }

	render() {
        console.log("in Creation")
        if (!this.state || this.state.playerID == null) {
            let campaignEl = <h3>Default</h3>;
            if (this.state.campaignList.length>0){
                let list = this.state.campaignList.map(camp => <option value={camp.id}>{camp.name}</option>);
                campaignEl = <select>Campaigns: {...list}</select>
            } else {
                this.getCampaignList();
                campaignEl = <h3>Loading..</h3>;
            }
            return (
                <div className="col-xs-10 col-sm-8 col-md-6 col-lg-4 card align-items-center">
                    <h3>New Character</h3>
                    <div className="row">
                        <div className="col-md-12">
                            <form className="form-horizontal">
                                <div className="alert alert-danger" id="errorMessage" hidden></div>
                                <div className="form-group row">
                                    <label className="control-label col-sm-12">Character Name:</label>
                                    <div className="col-sm-12">
                                        <input className="form-control" id="charName" required type="text" placeholder="Enter character full name"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="control-label col-sm-12">Nickname:</label>
                                    <div className="col-sm-12">
                                        <input className="form-control" id="nickName" required type="text" placeholder="Enter character shot name"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="control-label col-sm-12">PIN:</label>
                                    <div className="col-sm-12"><input className="form-control" id="pin" required type="password" placeholder="Create PIN"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="control-label col-sm-12">Confirm PIN:</label>
                                    <div className="col-sm-12"><input className="form-control" id="confirm_pin" required type="password" placeholder="Confirm PIN"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="control-label col-sm-12">Select Campaign:</label>
                                    <div className="col-sm-12">
                                        {campaignEl}
                                    </div>
                                </div>
                                <div className="form-group row justify-content-center">
                                    <div className="col-sm-4">
                                        <button onClick={(e) => {e.preventDefault(); this.createCharacter(e);}} className="btn btn-primary start" id="submitButton" type="submit">Let's roll!</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
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