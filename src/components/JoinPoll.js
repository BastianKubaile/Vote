import React from "react"
import BaseComponent from "./lib/BaseComponent"
import Poll from "./Poll";
import EditPoll from "./EditPoll"

class JoinPoll extends BaseComponent{
    constructor(props){
        super(props);
        this.state = {
            client_id: this.props.client_id,
            editable: false,
            poll: undefined
        }
        this.fetch_poll(this.state.client_id, (json) => {
            if(!json.editable) json.submittable = true;
            this.setState({poll:json, editable: json.editable})
        });
    }

    submitPoll = (e) => {
        e.preventDefault();
    }

    render = () => (
        <div className="joinPoll">
            {this.state.poll && 
                <>
                {!this.state.editable && <Poll poll={this.state.poll} submitPoll={this.submitPoll}/>}
                {this.state.editable && <EditPoll poll={this.state.poll}/>}
                </>
            }
        </div>
    )
}

export default JoinPoll;