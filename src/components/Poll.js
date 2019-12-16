import React, {Component} from "react"

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
            submitPoll,
            toggleCorrectAnswer,
            deleteAnswer
        } = this.props.poll;
        alert(submittable);
        return(
            <div className="Poll">
                <h3>{question}</h3>
                <form onSubmit={submitPoll}>
                    <ul>
                        {answers.map((answer, key) => (
                            <div key={key}>
                                <li key={key}>
                                    {answer.name}
                                </li>
                                {editable && 
                                <label>
                                    <input type="checkbox" 
                                    key={key}
                                    onChange={(e) => 
                                    toggleCorrectAnswer(e, key)}
                                    checked={answer.correct_answer}
                                    ></input>
                                    <p>Correct answer</p>
                                    <i className="fas fa-trash-alt"
                                    onClick={(e) => deleteAnswer(e, key)}/>
                                </label>
                                }
                                {submittable && 
                                <label>
                                    <input type={multipleChoice?"checkbox":"radio"}
                                    key={key}
                                    onChange={() => {}}/>    
                                </label>
                                }
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