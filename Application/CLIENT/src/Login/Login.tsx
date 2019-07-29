import * as React from 'react';
import { request } from '../Common/util';
import { createHash } from 'crypto';
// import Splash from '';

interface ILoginS {
    characterID:string;
}

interface ILoginP {
    pickNew: ()=>void;
    setCharacterId: (id: string)=>void;
}

class Login extends React.Component<ILoginP, ILoginS> {
	constructor(props: ILoginP) {
        super(props)
        
        this.state = {
            characterID: null
        }

        this.login = this.login.bind(this);
    }

    async login(e:any) {
        e.preventDefault();
        let name = (document.getElementById('charName') as HTMLInputElement).value;
        let pin = (document.getElementById('pin')as HTMLInputElement).value;
        let id = createHash('md5').update(name.toLowerCase()+pin).digest('hex');
        console.log(name, pin, id);

        let but = (document.getElementById('submitButton') as HTMLButtonElement); 
		  but.disabled= true;
		  but.innerHTML= '<i class="fa fa-circle-o-notch fa-spin"></i>';
        let idGood = await confirmID(id);
        if (idGood.exists){
          console.log("all good");
          this.props.setCharacterId(id);
        } else {
          console.log("not good");
          but.innerHTML= "Let's roll!";
          but.disabled=false;
          (document.getElementById('errorMessage')).hidden=false;
        }
        return "";
    }
    
	render() {
      console.log("in Login")
      return (
         <div className="row align-items-center full">
            <div className="col-xs-10 col-sm-8 col-md-6 col-lg-4 card align-items-center">
               <div className="row">
						<div className="col-12">
								<h1>Sign In</h1>
						</div>
               </div>
               <div className="row">
                  <div className="col-md-12">
                     <form className="form-horizontal" onSubmit={this.login}>
                        <div id="errorMessage" className="alert alert-danger" hidden>
									<p>Could not find character by that name and PIN</p>
								</div>
								<div className="form-group row">
									<label className="control-label col-sm-12">Your character:</label>
									<div className="col-sm-12">
										<input type="text" className="form-control" id="charName" placeholder="Enter character name" required/>
									</div>
								</div>
								<div className="form-group row">
									<label className="control-label col-sm-12">PIN:</label>
									<div className="col-sm-12"> 
										<input type="password" className="form-control" id="pin" placeholder="Enter PIN" required/>
									</div>
								</div>
								<div className="form-group row justify-content-center"> 
									<div className="col-sm-4">
										<button type="submit" id="submitButton" className="btn btn-primary start">Let's roll!</button>
									</div>
								</div>
								<div className="form-group row justify-content-right"> 
									<div className="offset-sm-5 col-sm-7">
										<button className="btn btn-default" onClick={(e) => {e.preventDefault(); this.props.pickNew();}}>No character yet?<br/>Make a new one!</button>
									</div>
								</div>
                     </form>
                  </div>
               </div> 
            </div> 
         </div>
      )
	}
}

export default Login

function confirmID(id:string):Promise<any>{
  return request('/api/character/'+id)
    .then(string => {console.log("out",string); return !!string}) as Promise<boolean>;
  //return new Promise(resolve => setTimeout(()=>resolve(true), 2000));
}
