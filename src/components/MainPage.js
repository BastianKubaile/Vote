import React, {Component} from "react"
import "./mainpage.scss"

class MainPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            input_client_id: ""
        }
    }
    
        handleSubmit = (e) => {
            e.preventDefault();
        this.props.joinPollPage(this.state.input_client_id);
    }

    handleChange = (e) => {
        const {target: {value}} = e;
        this.setState({
            input_client_id: value
        });
    }

    render = () => {
        return(
            <div className="MainPage">
                <form onSubmit={this.handleSubmit}>
                    <input 
                        value={this.state.input_client_id}
                        onChange={this.handleChange}
                        className="textinput txtinput"
                        placeholder="Public or Secret ID">
                    </input>
                    <button id="joinPoll" className="btn">Join this Vote</button>
                </form>
                <button onClick={this.props.createPoll} id="newPoll" className="btn">Create a new Poll</button>
            </div>
        )
    }
}

export default MainPage;