import React, {Component} from 'react';
import Header from "./components/Header"
import MainPage from "./components/MainPage"
import EditPoll from "./components/Poll/EditPoll"
import JoinPoll from "./components/Poll/JoinPoll"
import Content from "./components/Content"
import './App.css';

class App extends Component{
  constructor(){
    super();
    this.state = {
      current_page: "main",
      client_id: ""
    }
  }

  createPollPage = () => {
    this.setState({
      current_page: "create_poll"
    })
  }
  
  joinPollPage = async (client_id) => {
    this.setState({
      current_page: "join_poll",
      client_id: client_id
    })
  }

  selectPage = () => {
    switch(this.state.current_page){
      case "create_poll":
        return (
          <EditPoll/>
        );
      case "join_poll":
        return (
          <JoinPoll 
          client_id={this.state.client_id}
          />
        )
      case "main":
      default:
        return (
          <MainPage 
          createPoll={this.createPollPage}
          joinPollPage={this.joinPollPage}
          />
        );
    }

  }

  render = () => {
    return (
      <div className="App">
        <Header/>
        <Content children={this.selectPage()}/>
      </div>
    )
  }
}

export default App;
