import React from "react"
import BaseComponent from "../lib/BaseComponent"
import Poll from "./Poll";
import EditPoll from "./EditPoll"
import settings from "../../config"

class JoinPoll extends BaseComponent{
    constructor(props){
        super(props);
        this.state = {
            client_id: this.props.client_id,
            editable: false,
            poll: undefined
        }
        this.fetch_poll(this.state.client_id, (json) => {
            if(!json.editable){
                json.submittable = true;  
                for(let i = 0; i < json.answers.length; i++){
                    json.answers[i].selected = false;
                }
            }
            this.setState({poll:json, editable: json.editable})
        });
    }
    

    submitPoll = (e) => {
        e.preventDefault();
        fetch(settings.server_url + "poll/submit", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(this.state.poll)
        })
    }

    selectAnswer = (key) => {
        let curr_poll = this.state.poll;
        if(!this.state.poll.multipleChoice){
            for(let i = 0; i < curr_poll.answers.length; i++){
                if(i == key) continue;
                curr_poll.answers[i].selected = false;
            }
        }
        curr_poll.answers[key].selected = !curr_poll.answers[key].selected;
        this.setState({poll: curr_poll});
    }

    render = () => (
        <div className="joinPoll">
            {this.state.poll && 
                <>
                {!this.state.editable && 
                <Poll poll={this.state.poll} 
                submitPoll={this.submitPoll}
                selectAnswer={this.selectAnswer}/>}
                {this.state.editable && <EditPoll poll={this.state.poll}/>}
                </>
            }
        </div>
    )
}

export default JoinPoll;