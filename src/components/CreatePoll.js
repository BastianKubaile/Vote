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
            answer: "",
            poll: {
                question: "",
                answers: [],
                multipleChoice: false,
                submittable: false,
                editable: true
            }
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
        let current_poll = this.state.poll;
        current_poll.answers = [... current_poll.answers, 
            {"name": this.state.answer, "correct_answer": false}
        ];
        this.setState({poll: current_poll})
    }

    deleteAnswer = (e, key) => {
        let current_poll = this.state.poll;
        current_poll.answers = [
            ... current_poll.answers.slice(0, key),
            ... current_poll.answers.slice(key+1, current_poll.answers.length)
        ];
        this.setState({
            poll: current_poll
        });
    }

    toggleCorrectAnswer = (e, key) => {
        let current_poll = this.state.poll;
        let current_answer = current_poll.answers[key];
        current_poll.answers =[
            ... current_poll.answers.slice(0,key),
            {"name": current_answer.name, "correct_answer":       !current_answer.correct_answer},
            ... current_poll.answers.slice(key+1, current_poll.answers.length)
        ];
        this.setState({
            poll: current_poll
        });
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
                            onChange={(e) => this.handleChangeWithID(e, "poll")}>
                        </input>
                        <button>Set question</button>
                    </form>
                    <form onSubmit={this.addAnswer}>
                        <input id="answer" 
                            value={this.state.answer}
                            onChange={(e) => this.handleChangeWithID(e)}></input>
                        <button>Add a new Answer</button> 
                    </form>
                    <label>
                        <input type="checkbox" id="multipleChoice" 
                        onChange={(e) => this.handleChangeWithID(e, "poll")}></input>
                        Multiplechoice
                    </label>
                    <Poll poll={Object.assign(this.state.poll, {
                        createPoll: this.createPoll,
                        toggleCorrectAnswer: this.toggleCorrectAnswer,
                        deleteAnswer: this.deleteAnswer

                    })}/>
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