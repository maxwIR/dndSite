import * as React from 'react';
import Feat from './Feat';

interface ListState {
   feats: any[]
}

class FeatList extends React.Component<ListState, ListState> {
	constructor(props: any) {
      super(props);
      this.displayFeat = this.displayFeat.bind(this);
   }
   displayFeat(feat: any, i: number) {
      return (
			<Feat>
				  {feat}
		   </Feat>
		);
   }
	render() {
		return (
         <div className="featList">
            <h2> Feat List </h2>
            {this.props.feats.map(this.displayFeat)}
         </div>
		)
	}
}

export default FeatList;