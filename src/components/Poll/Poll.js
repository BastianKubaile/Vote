import React, {Component} from "react"
import Countdown from "react-countdown-now";
import "./poll.scss"

class Poll extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const{
            question,
            answers,
            submittable, 
            editable,
            multipleChoice,
            toggleCorrectAnswer,
            deleteAnswer,
            end_date,
            submitions
        } = this.props.poll;
        const {
            selectAnswer,
            submitPoll
        } = this.props;
        return(
            <div className="Poll">
                <h3>{question}</h3>
                <form onSubmit={submitPoll}>
                    <ul>
                        {answers.map((answer, key) => (
                            <li key={key}>
                                <div className="answer">
                                    <p>{answer.name}</p>
                                </div>
                                {editable && <div className="options">
                                <label>
                                    <input type={multipleChoice?"checkbox":"radio"} 
                                    key={key}
                                    onChange={(e) => 
                                    toggleCorrectAnswer(e, key)}
                                    checked={answer.correct_answer}
                                    ></input>
                                    <p>Correct answer</p>

                                </label>
                                <label>
                                    <i className="fas fa-trash-alt"
                                    onClick={(e) => deleteAnswer(e, key)}/>
                                    <p>Delete Answer</p>
                                </label>
                                </div>}
                                {submittable && 
                                <label>
                                    <input type={multipleChoice?"checkbox":"radio"}
                                    key={key}
                                    onClick={() => selectAnswer(key)}
                                    checked={
                                        this.props.poll.answers[key].selected}/>    
                                </label>
                                }
                            </li>
                        ))}
                    </ul>
                    {submittable && 
                        <>
                            <p>Poll ends in </p>
                            <Countdown date={end_date}/>
                            <button>Submit</button>
                        </>
                    }
                </form>
            </div>
        );
    }
}

export default Poll;