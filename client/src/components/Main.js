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
            gemini: result,
            geminiBTCLast: localStorage.getItem('geminiBTCLast')
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
        (result) => {
          if (this.state.gemini){
            let geminiBTCLast = this.state.gemini
            localStorage.setItem('geminiBTCLast', geminiBTCLast)              
          }
        }
      )
    .then(
      fetch("/binance")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            binance: result,
            binanceBTCLast: localStorage.getItem('binanceBTCLast')
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
      (result) => {
        if (this.state.binance){
        let binanceBTCLast = this.state.binance
        console.log(binanceBTCLast)
        localStorage.setItem('binanceBTCLast', binanceBTCLast) 
      }             
      }
    )
    .then(
      fetch("/coinbase")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            coinbase: result,
            coinbaseBTCLast: localStorage.getItem('coinbaseBTCLast')
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
      (result) => {
        if (this.state.coinbase){
          let coinbaseBTCLast = this.state.coinbase
          localStorage.setItem('coinbaseBTCLast', coinbaseBTCLast)     
        }      
      }
    )
    .then(
      fetch("/kraken")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            kraken: result,
            krakenBTCLast: localStorage.getItem('krakenBTCLast')
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
        (result) => {
          if (this.state.kraken){
            let krakenBTCLast = this.state.kraken
            localStorage.setItem('krakenBTCLast', krakenBTCLast)   
          }
                    
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
              <button onClick={this.showGraph} className='NavButton'>Graph</button>
              <>
                {this.state.showSpread ?
                  <div>
                    <Table
                      gemini={this.state.gemini}
                      geminiBTCLast={this.state.geminiBTCLast}
                      binance={this.state.binance}
                      binanceBTCLast={this.state.binanceBTCLast}
                      coinbase={this.state.coinbase}
                      coinbaseBTCLast={this.state.coinbaseBTCLast}
                      kraken={this.state.kraken}
                      krakenBTCLast={this.state.krakenBTCLast}
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

