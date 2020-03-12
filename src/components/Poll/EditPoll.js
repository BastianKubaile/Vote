import React from "react"
import BaseComponent from "../lib/BaseComponent"
import Poll from "./Poll"
import settings from "../../config"
import DateTimePicker from "react-datetime-picker";
import PollStats from "./PollStats"
import "./editpoll.scss"

class EditPoll extends BaseComponent{
    constructor(props){
        super(props);
        let initalpoll = this.props.poll? this.props.poll:{
            question: "",
            answers: [],
            multipleChoice: false,
            submittable: false,
            editable: true,
            end_date: new Date(),
            submitions: []
        };
        this.state = {
            submitted: false,
            client_id: "",
            secret_id: "",
            answer: "",
            poll_exists: this.props.poll? true: false,
            poll: initalpoll
        }
    }

    createPoll = (e) => {
        e.preventDefault();
        fetch(settings.server_url +  "poll/", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(this.state.poll)
        })
        .then(res => res.json())
        .then(json => {
            this.setState({
                submitted: true,
                client_id: json.client_id,
                secret_id: json.secret_id
            })
        });
    }

    addAnswer = (e) => {
        e.preventDefault();
        let current_poll = this.state.poll;
        current_poll.answers = [...current_poll.answers, 
            {"name": this.state.answer, "correct_answer": false}
        ];
        this.setState({poll: current_poll})
    }

    deleteAnswer = (e, key) => {
        let current_poll = this.state.poll;
        current_poll.answers = [
            ...current_poll.answers.slice(0, key),
            ...current_poll.answers.slice(key+1, current_poll.answers.length)
        ];
        this.setState({
            poll: current_poll
        });
    }

    toggleCorrectAnswer = (e, key) => {
        let current_poll = this.state.poll;
        let current_answer = current_poll.answers[key];
        current_poll.answers =[
            ...current_poll.answers.slice(0,key),
            {"name": current_answer.name, "correct_answer":       !current_answer.correct_answer},
            ...current_poll.answers.slice(key+1, current_poll.answers.length)
        ];
        this.setState({
            poll: current_poll
        });
    }

    setQuestion = (e) => {
        e.preventDefault();
    }

    handleDateChange = end_date => {
        let current_poll = this.state.poll;
        current_poll.end_date = end_date;
        this.setState({poll: current_poll});
    }
    
    render(){
        return (
            <div className="editPoll">
                {!this.state.submitted && 
                <>
                    <div className="editPoll">
                        <h3>Edit your Poll</h3>
                        <form onSubmit={this.setQuestion}>
                            <input id="question" 
                                value={this.state.poll.question}
                                onChange={(e) => this.handleChangeWithID(e, "poll")}
                                className="txtinput">
                            </input>
                            <button className="btn">Set question</button>
                        </form>
                        <form onSubmit={this.addAnswer}>
                            <input id="answer" 
                                value={this.state.answer}
                                onChange={(e) => this.handleChangeWithID(e)}
                                className="txtinput"></input>
                            <button className="btn">Add a new Answer</button> 
                        </form>
                        <div className="datetimepicker">
                            <DateTimePicker 
                                value={this.state.poll.end_date}
                                onChange={this.handleDateChange}
                            />
                        </div>
                        <label>
                            <input type="checkbox" id="multipleChoice" 
                            onChange={(e) => this.handleChangeWithID(e, "poll")}></input>
                            Multiplechoice
                        </label>
                    </div>
                    <Poll poll={Object.assign(this.state.poll, {
                        createPoll: this.createPoll,
                        toggleCorrectAnswer: this.toggleCorrectAnswer,
                        deleteAnswer: this.deleteAnswer

                    })}/>
                    <PollStats submitions={this.state.poll.submitions}/>
                    <form onSubmit={this.createPoll}>
                        <button className="btn" id="submitbtn">{this.state.poll_exists?"Update Poll":"Create New Poll"}</button>
                    </form>
                </>
                }
                {this.state.submitted && 
                <>
                    <h3>
                        The Poll has the ID <strong>{this.state.client_id}</strong>
                    </h3>
                    <h3>
                        To edit the Poll use this <strong>{this.state.secret_id}
                        </strong> Secret ID.
                    </h3>
                </>}
            </div>
        )
    }
}

export default EditPoll;