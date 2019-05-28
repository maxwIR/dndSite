import * as React from 'react';
import FeatSearch from './FeatSearch';
import FeatList from './FeatList';

interface ListState {
   feats: any[]
}

class FeatsApp extends React.Component<{}, ListState> {
	constructor(props: any) {
      super(props);
      this.state = {
			feats: []
      };
      this.handleList = this.handleList.bind(this);
   }

   private handleList(newFeats: any[]) {
      this.setState({ feats: newFeats });
   }

	render() {

		return (
            <div>
               <FeatSearch updateList={this.handleList} />
               <hr/>
               <FeatList feats={this.state.feats}/>
            </div>
		);
	}

}

export default FeatsApp