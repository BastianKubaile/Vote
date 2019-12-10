import React, {Component} from "react"

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
            vote_id: value
        });
    }

    render = () => {
        return(
            <div className="MainPage">
                <form onSubmit={this.handleSubmit}>
                    <input 
                        value={this.state.input_client_id}
                        onChange={this.handleChange}>
                    </input>
                    <button>Join this Vote</button>
                </form>
                <button onClick={this.props.createPoll}>Create a new Poll</button>
            </div>
        )
    }
}

export default MainPage;