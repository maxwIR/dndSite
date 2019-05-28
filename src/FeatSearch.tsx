import * as React from 'react';

interface IFeatSearchProps{
   updateList: (featList:any[]) => void,
}

class FeatSearch extends React.Component <IFeatSearchProps> {
	constructor(props: any) {
      super(props);
      const featList = [];
      this.props.updateList(featList);
      this.search = this.search.bind(this);
   }

   search(e){
      e.preventDefault();
      const featList = [
         {
            name: "Dodge",
            description: "Jump out of the way!"
         },
         {
            name: "Weapon Finesse",
            description: "You know your way around the weapon of your choice"
         }
      ];
      this.props.updateList(featList);
   }

	render() {
		return (
         <div className="featSearch">
            <h2>Search</h2>
            <form onSubmit={this.search}>
               <div className="row">
                  <div className="col-md-4">Base Attack Bonus:</div>
                  <div className="col-md-4"><input type="text" name="bab"/></div>
               </div>
               <div className="row">
                  <div className="col-md-4">Caster Level:</div>
                  <div className="col-md-4"><input type="text" name="cl"/></div>
               </div>
               <div className="row">
                  <div className="col-md-4">Feats:</div>
                  <div className="col-md-4"><input type="text" name="fts"/></div>
               </div>
               <div className="row">
                  <input className="col-md-2" type="submit" value="Search"/>
               </div>

            </form>
         </div>
		)
	}
}

export default FeatSearch;
