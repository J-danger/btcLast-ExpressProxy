import React, { Component } from "react";

import Table from './Table'
// import Graph from './Graph'
import './Main.css'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      showSpread: true,
      showGraph: false,
      lastTime: localStorage.getItem('lastTime'),
      lastDate: localStorage.getItem('lastDate'),
      kraken: []
    };
  }

  getPrices = () => {
    fetch("/gemini")
      .then(res => res.json())
      .then(
        result => {
          
          this.setState({
            isLoaded: true,
            gemini: parseInt(result.last).toFixed(2),
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
          if (result){
            this.setState({
              isLoaded: true,
              binance: parseInt(result.price).toFixed(2),
              binanceBTCLast: localStorage.getItem('binanceBTCLast')
            });

          }
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
            coinbase: parseInt(result.amount).toFixed(2),
            coinbaseBTCLast: localStorage.getItem('coinbaseBTCLast')
            // coinbaseBTCVol: result.
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
          console.log('works')
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
            kraken: parseInt(result.c[0]).toFixed(2),
            krakenBTCLast: localStorage.getItem('krakenBTCLast'),
            krakenBTCVol: result.v[1]
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
            console.log('works')
            let krakenBTCLast = (this.state.kraken)
            localStorage.setItem('krakenBTCLast', krakenBTCLast)   
          }
                    
        }
      )
    )
    .then(
      fetch("/fees")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            minerFees: result,
            minerFast: result.fastestFee,
            minerFastBTC: (result.fastestFee / 100000000).toFixed(8)
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

  componentWillUpdate(){
  //   this.update = setInterval(() => {
  //     this.getPrices();
  // }, 60 * 1000);
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
    // let gemini = this.state.gemini
    
    // console.log(gemini)
      return (
        <>
          {this.state.isLoaded ? 
          <>
              <button onClick={this.showSpread} className='NavButton'>Spread</button>
              <button onClick={this.showGraph} className='NavButton'>Graph</button>
              <>
                {this.state.showSpread ?
                  <div>
                    {/* <button onClick={this.getPrices()}>Refresh</button> */}
                    <Table
                      gemini={this.state.gemini}
                      geminiBTCLast={this.state.geminiBTCLast}
                      binance={this.state.binance}
                      binanceBTCLast={this.state.binanceBTCLast}
                      coinbase={this.state.coinbase}
                      coinbaseBTCLast={this.state.coinbaseBTCLast}
                      kraken={this.state.kraken}
                      krakenBTCLast={this.state.krakenBTCLast}
                      minerFees={this.state.minerFast}
                      minerFastBTC={this.state.minerFastBTC}
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

