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
            poll: {editable:false}
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
        let status = undefined;
        fetch(settings.server_url + "poll/submit", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(this.state.poll)
        }).then(res => {
                status = res.status;
                return res.text()
            }
        ).then(text => {
            if(status === 200){
                //Submition was succesful, so give the user the response and reload the page soon
                this.setState({poll:undefined, client_id: undefined, submition_answer: text})
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }else if (status === 400){
                this.setState({submition_answer: text});
                setTimeout(() => {
                    this.setState({submition_answer: undefined})
                }, 2500);
            }
        });

    }

    selectAnswer = (key) => {
        let curr_poll = this.state.poll;
        //Switch the current choice
        curr_poll.answers[key].selected = !curr_poll.answers[key].selected;
        if(!curr_poll.multipleChoice){
            //If not multiplichoice make everything unselected
            for(let i = 0; i < curr_poll.answers.length; i++){
                if(i === key) continue;
                curr_poll.answers[i].selected = false;
            }
        }
        this.setState({poll: curr_poll});
    }

    render = () => {
        var {poll, submition_answer} = this.state;
        return (
            <div className="joinPoll">
                {(poll && !submition_answer) && 
                    <>
                    {!poll.editable && 
                    <Poll poll={poll} 
                    submitPoll={this.submitPoll}
                    selectAnswer={this.selectAnswer}/>}
                    {poll.editable && <EditPoll poll={poll}/>}
                    </>
                }
                {submition_answer &&
                    <>
                        <h2 id="submitionAnswer"> {submition_answer}
                        </h2>
                    </>
                }
            </div>
        );
    }
}

export default JoinPoll;