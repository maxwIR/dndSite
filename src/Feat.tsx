import * as React from 'react';

interface IFeat {
   children:
      {name: string,
      description: string}
}

class Feat extends React.Component<IFeat> {
	constructor(props: any) {
		super(props)
	}

	render() {
		return (
			<div className="row">
            <div className="col-md-4">
               <p>
                  <strong className="d-block text-gray-dark"> {this.props.children.name} </strong>
                  {this.props.children.description}
               </p>
            </div>
			</div>
		);
	}

}

export default Feat