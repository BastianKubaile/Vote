import React from "react"
import BaseComponent from "./lib/BaseComponent"

class Poll extends BaseComponent{
    constructor(props){
        super(props);
    }

    set_poll = (poll) => {
        this.state = poll;
    }
    
    render = () =>{
        const{question, answers, submittable, multipleChoice, submitPoll} = this.state;
        return(
            <div className="Poll">
                <h3>{question}</h3>
                <form onSubmit={submitPoll}>
                    <ul>
                        {answers.map((name, key) => (
                            <div key={key}>
                                <li key={key}>
                                    {name}
                                </li>
                                <input type={multipleChoice?"checkbox": "radio"}></input>
                            </div>
                        ))}
                    </ul>
                    {submittable && <button>Submit</button>}
                </form>
            </div>
        );
    }
}



















export default Poll;