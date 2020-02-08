import React, { Component } from "react";

import Table from './Table'
import './Main.css'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      showSpread: true,
      showGraph: false
    };
  }

  getPrices = () => {
    fetch("/gemini")
      .then(res => res.json())
      .then(
        result => {
          
          this.setState({
            isLoaded: true,
            gemini: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    .then(
      fetch("/binance")
      .then(res => res.json())
      .then(
        result => {
         
          this.setState({
            isLoaded: true,
            binance: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    )
    .then(
      fetch("/coinbase")
      .then(res => res.json())
      .then(
        result => {
          
          this.setState({
            isLoaded: true,
            coinbase: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    )
    .then(
      fetch("/kraken")
      .then(res => res.json())
      .then(
        result => {
          
          this.setState({
            isLoaded: true,
            kraken: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    )
  };

  componentDidMount(){
    this.getPrices()
  }

showSpread = () => {
  this.setState({
    showSpread: true,
    showGraph: false
})
  }

showGraph = () => {
    this.setState({
      showSpread: false,
      showGraph: true
  })
  }

  render() {
      return (
        <>
          {this.state.isLoaded ? 
          <>
              <button onClick={this.showSpread} className='NavButton'>Spread</button>
              <button onClick={this.showGraph}className='NavButton'>Graph</button>
              <>
                {this.state.showSpread ?
                  <div className='table'>
                    <Table
                      gemini={this.state.gemini}
                      binance={this.state.binance}
                      coinbase={this.state.coinbase}
                      kraken={this.state.kraken}
                    />
                  </div>
                :  <p>Placeholder for graph</p> }
              </>
          </>
              : <p>Loading...</p> }
        </>
      )
  }
}

export default Main;

