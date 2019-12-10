import React, {Component} from "react"

class BaseComponent extends Component{
    constructor(props){
        super(props);
    }

    handleChangeWithID = (e) => {
        const {target: {id, value}} = e;
        let currentState = this.state.poll;
        if(typeof currentState[id] == "boolean"){
            //Toggle the value
            currentState[id] = !currentState[id];
        }else{
            currentState[id] = value;
        }
        this.setState(currentState);
    }
}

export default BaseComponent;