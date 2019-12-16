import React, {Component} from "react"
import settings from "../../config"

class BaseComponent extends Component{
    constructor(props){
        super(props);
    }

    handleChangeWithID = (e, state_attrib) => {
        const {target: {id, value}} = e;
        let currentState = this.state;
        if(state_attrib !== undefined){
            currentState = currentState[state_attrib];
        }
        if(typeof currentState[id] == "boolean"){
            //Toggle the value
            currentState[id] = !currentState[id];
        }else{
            currentState[id] = value;
        }
        this.setState(currentState);
    }

    fetch_poll = (id, callback) => {
        fetch(settings.server_url + `poll/${id}`, {
            method: "get",
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(json => {
            callback(json);
        });
    }
}

export default BaseComponent;