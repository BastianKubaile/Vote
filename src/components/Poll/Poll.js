import React, {Component} from "react"
import Countdown from "react-countdown-now";
import "./poll.scss"

const render_countdown = (props) => {
    var {total, days, hours, minutes, seconds, milliseconds, completed} = props;
    console.log(props);
    if(completed){
        return(
            <div>
                <p> The poll is already over</p>
        </div>); 
    }else{
        let render_millis = (days === 0) && (hours === 0) && (minutes === 0);
        let background_color = "";
        if(render_millis){
            //Poll is due very soon
            background_color = "rgb(197, 66, 43)";
        }else if(hours === 0 && days === 0){
            //Poll is due soon
            background_color = "rgb(25, 36, 240)";
        }else{
            //Poll is ending only in the near future
            background_color = "rgb(61, 168, 52)";
        }
        return( 
        <div className="countdown" style={{backgroundColor: background_color}}>
            <h2>The poll ends in </h2>
            {render_prop(days, days !== 0, "Days")}
            {render_prop(hours, hours !== 0, "Hours")}
            {render_prop(minutes, true, "Minutes")}
            {render_prop(seconds, true, "Seconds")}
        </div>);
    }
}

const render_prop = (prop, condition, explanation) => {
    return(condition && 
    <div className={explanation} >
        <p>{prop}</p>
        <p>{explanation}</p>
    </div>);
}
class Poll extends Component{

    render(){
        const{
            question,
            answers,
            submittable, 
            editable,
            multipleChoice,
            toggleCorrectAnswer,
            deleteAnswer,
            end_date
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
                        {answers && answers.map((answer, key) => (
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
                        <button id="submitButton">Submit</button>
                        <Countdown 
                            date={end_date}
                            renderer={render_countdown}/>
                    </>
                    }
                </form>
            </div>
        );
    }
}

export default Poll;