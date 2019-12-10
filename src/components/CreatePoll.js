import React from "react"
import BaseComponent from "./lib/BaseComponent"
import Poll from "./Poll"
import settings from "../config"

class CreatePoll extends BaseComponent{
    constructor(){
        super();
        this.state = {
            submitted_id: "",
            submitted: false,
            poll: new Poll()
        }
    }

    createPoll = (e) => {
        e.preventDefault();
        console.log(this.state.poll);
        fetch(settings.server_url +  "poll/", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(this.state.poll)
        })
        .then(res => res.json())
        .then(json => {
            this.setState({
                submitted: true,
                submitted_id: json.client_id
            })
            console.log(json);
        });
    }

    addAnswer = (e) => {
        e.preventDefault();
        let temp = this.state.poll.answer;
        let currentState = this.state.poll;
        currentState.answers = [... currentState.answers, temp];
        this.setState({
            poll: currentState
        });
        return;
    }

    setQuestion = (e) => {
        e.preventDefault();
    }
    
    render(){
        return (
            <div className="createPoll">
                {!this.state.submitted && 
                <>
                    <form onSubmit={this.setQuestion}>
                        <input id="question" 
                            value={this.state.poll.question}
                            onChange={this.handleChangeWithID}>
                        </input>
                        <button>Set question</button>
                    </form>
                    <form onSubmit={this.addAnswer}>
                        <input id="answer" 
                            value={this.state.poll.answer}
                            onChange={this.handleChangeWithID}></input>
                        <button>Add a new Answer</button> 
                    </form>
                    <label>
                        <input type="checkbox" id="multipleChoice" 
                        onChange={this.handleChangeWithID}></input>
                        Multiplechoice
                    </label>
                    {this.state.poll}
                    <form onSubmit={this.createPoll}>
                        <button>Create New Poll</button>
                    </form>
                </>
                }
                {this.state.submitted && 
                <>
                    <h3>
                        The Poll has the ID <strong>{this.state.submitted_id}</strong></h3>
                </>}
            </div>
        )
    }
}

export default CreatePoll;