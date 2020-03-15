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
      binanceVol: []
    };
  }

  getPrices = () => {
    fetch("/gemini")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            gemini: parseInt(result.last).toFixed(2),
            geminiBTCLast: localStorage.getItem('geminiBTCLast'),
            geminiVol: parseInt(result.volume.BTC).toFixed(2)
          });
          let geminiBTCLast = this.state.gemini
          localStorage.setItem('geminiBTCLast', geminiBTCLast)
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
              binance: parseInt(result.price).toFixed(2),
              binanceBTCLast: localStorage.getItem('binanceBTCLast')
            });
            let binanceBTCLast = this.state.binance
            localStorage.setItem('binanceBTCLast', binanceBTCLast)
         
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
      fetch("/binanceVol")
      .then(res => res.json())
      .then(
        result => {
          // Volume given in multiple objects, need to extract volume key pairs, push them into an array and calculate the total value
          let binanceVol = this.state.binanceVol 
          result.map((result, i) =>{  
              if (result){
                return binanceVol.push(parseInt(result.volume).toFixed(2))
              }
              else {
                return null
              }
            })  
            function sum(input){
              if (toString.call(input) !== "[object Array]")
                 return false;
                         var total =  0;
                         for(var i=0;i<input.length;i++)
                           {                  
                             if(isNaN(input[i])){
                             continue;
                              }
                               total += Number(input[i]);
                            }
                          return total;
                         }
            this.setState({
              binanceVol: sum(this.state.binanceVol)
            });
          },
          (error) => {
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
            coinbase: parseInt(result.amount).toFixed(2),
            coinbaseBTCLast: localStorage.getItem('coinbaseBTCLast')
          });
          let coinbaseBTCLast = this.state.coinbase
          localStorage.setItem('coinbaseBTCLast', coinbaseBTCLast) 
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
      fetch("/coinbaseVol")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            coinbaseVol: parseInt(result.volume).toFixed(2),
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
            kraken: parseInt(result.c[0]).toFixed(2),
            krakenBTCLast: localStorage.getItem('krakenBTCLast'),
            krakenBTCVol: parseInt(result.v[1]).toFixed(2)
          });
          let krakenBTCLast = (this.state.kraken)
          localStorage.setItem('krakenBTCLast', krakenBTCLast) 
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
              <nav className='navbar'>
                <button onClick={this.showSpread} className='navButton'>Home</button>
                <button onClick={this.showGraph} className='navButton'>Graph</button>
              </nav>
              <>
                {this.state.showSpread ?
                  <div>
                    <Table
                      gemini={this.state.gemini}
                      geminiBTCLast={this.state.geminiBTCLast}
                      geminiVol={this.state.geminiVol}
                      binance={this.state.binance}
                      binanceBTCLast={this.state.binanceBTCLast}
                      binanceVol={this.state.binanceVol}
                      coinbase={this.state.coinbase}
                      coinbaseBTCLast={this.state.coinbaseBTCLast}
                      coinbaseVol={this.state.coinbaseVol}
                      kraken={this.state.kraken}
                      krakenBTCLast={this.state.krakenBTCLast}
                      krakenVol={this.state.krakenBTCVol}
                      minerFees={this.state.minerFast}
                      minerFastBTC={this.state.minerFastBTC}
                    />
                  </div>
                :  <p>Placeholder for graph</p> }
              </>
          </>
              : <>
              <nav className='navbar'>
                <button onClick={this.showSpread} className='navButton'>Home</button>
                <button onClick={this.showGraph} className='navButton'>Graph</button>
              </nav>
              <p className='loading'>Loading...</p> 

              </>}
        </>
      )
  }
}

export default Main;

