import React from "react"
import BaseComponent from "../lib/BaseComponent"
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
            {"name": "Put your answer in here", "correct_answer": false}
        ];
        this.setState({poll: current_poll})
    }

    changeAnswer = (e, idx) => {
        const {target: {value}} = e;
        let current_poll = this.state.poll;
        console.log(idx);
        console.log(current_poll.answers);
        current_poll.answers[idx].name = value;
        this.setState({poll: current_poll});
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

    selectText = event => {
        event.target.select();
    }
    
    render(){
        var {answers, multipleChoice} = this.state.poll;
        return (
            <div className="editPoll">
                {!this.state.submitted && 
                <>
                    <div className="editPoll">
                        <h3>Edit your Poll</h3>

                        <input type="text" 
                        id="question"
                        className="seemlessInput headline"
                        onFocus={this.selectText}
                        value={this.state.poll.question!==""?
                        this.state.poll.question: "Put your question in here"}
                        onChange={e => this.handleChangeWithID(e, "poll")}/>

                        <ul>
                            {answers && answers.map((answer, key) => (
                                <li key={key}>
                                    {/*Possible answer to the question*/}
                                    <input type="text"
                                    id="question"
                                    className="seemlessInput"
                                    defaultValue="Put a possible Answer here or delete this."
                                    value={answer.name}
                                    onFocus={this.selectText}
                                    onChange={e => this.changeAnswer(e, key)}/>

                                    {/*Element is only displayed when element is used, allows user to delete answer*/}
                                    <span>
                                    <i className="fas fa-times"
                                    onClick={(e) => this.deleteAnswer(e, key)}/>
                                    </span>
                                    
                                    <div className="options">
                                        <label>
                                            <input type={multipleChoice?"checkbox":"radio"} 
                                            key={key}
                                            onChange={(e) => 
                                            this.toggleCorrectAnswer(e, key)}
                                            checked={answer.correct_answer}
                                            ></input>
                                            <p> mark as {multipleChoice?"a": "the"} correct answer</p>

                                        </label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        
                        <div id="addAnswer">
                            <button className="submitButton" onClick={this.addAnswer}>
                            <i className="fas fa-plus"/>
                                Add a new answer
                            </button>
                        </div>


                        <div id="datetimePicker">
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