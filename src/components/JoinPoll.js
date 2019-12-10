import React, {Component} from "react"
import settings from "../config"
import Poll from "./Poll";

class JoinPoll extends Component{
    constructor(props){
        super(props);
        this.state = {
            client_id: this.props.client_id,
            poll: undefined
        }
        this.fetch_poll();
    }

    fetch_poll = () => {
        fetch(settings.server_url + `poll/${this.state.client_id}`, {
            method: "get",
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(json => {
            this.setState({poll: json})
        });
    }

    submitPoll = (e) => {
        e.preventDefault();
    }

    render = () => (
        <div className="joinPoll">
            {this.state.poll && 
                <Poll poll={this.state.poll} submittable={true} submitPoll={this.submitPoll}/>
            }
        </div>
    )
}

export default JoinPoll;