import * as React from 'react';
import { IField } from "../Common/interfaces";

interface IFieldP {
    name: string,
    field: IField
}

class Field extends React.Component<IFieldP> {
	constructor(props: any) {
        super(props)
        this.getTotal = this.getTotal.bind(this);
    }

    getTotal():number{
        let total = 0;
        for (let i in this.props.field.breakdown){
            total+= this.props.field.breakdown[i];
        }
        return total;
    }

	render() {
        return (<div className="field">
            <span>{this.props.name}: </span><span>{this.getTotal()}</span>
        </div>)
    }
}

export default Field