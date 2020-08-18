import DataStreamer, { ServerRespond } from './DataStreamer';
import React, { Component } from 'react';
import Graph from './Graph';
import './App.css';

/**
 * Interface states the declaration for <App/>
 */
interface IState {
  data: ServerRespond[],
  showGraph: boolean,
}

/**
 * The parent element of the react app which rendersthe title, button, and graph react element
 */
class App extends Component<{}, IState> {
  // Constructor initializes props from the parent class
  constructor(props: {}) {
    super(props);
    this.state = {
      // data saves the server responds to parse the data to the graph 
      data: [],
      showGraph: false,
    };
  }

  /**
   * Renders the graph react component with state.data and parses as property data
   * @return graph data as state data
   */
  renderGraph() {
    if (this.state.showGraph){
      return (<Graph data={this.state.data}/>)
    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    let x = 0;
    const interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        // Update the state by creating a new array of data that consists of
        // Previous data in the state and the new data from server
        this.setState({ 
          data: serverResponds,
          showGraph: true,
        });
      });
      x++
      if (x > 1000){
        clearInterval(interval);
      }
    }, 100);  
  }

  /**
   * Renders the app react component
   * @return the rendered graph, button, and title
   */
  //HEREREREREREERERERERE
  render() {
    return (
      <div className = "App">
        <header className = "App-header">
          Bank & Merge Co Task 2
        </header>
        <div className = "App-content">
          <button className = "btn btn-primary Stream-button"
            // On click, data is recieved from the server and keeps requesting until the app is closed or there is no data
            onClick = {() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className = "Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;