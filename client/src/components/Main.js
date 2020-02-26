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
            isLoaded: true,
            gemini: parseInt(result.last).toFixed(2),
            geminiBTCLast: localStorage.getItem('geminiBTCLast'),
            geminiVol: parseInt(result.volume.BTC).toFixed(2)
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
        localStorage.setItem('binanceBTCLast', binanceBTCLast) 
      }             
      }
    )
    .then(
      fetch("/binanceVol")
      .then(res => res.json())
      .then(
        result => {
          //iteration over the object to separate RSVP and wait list. Using .map
          let binanceVol = this.state.binanceVol 
          result.map((result, i) =>{  
           
              if (result){
                return binanceVol.push({volume: parseInt(result.volume).toFixed(2), key: i})
              }
          })  
          this.setState({
            isLoaded: true,
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
      fetch("/coinbaseVol")
      .then(res => res.json())
      .then(
        result => {
          
          this.setState({
            isLoaded: true,
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

  sum = (input) => {
             
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
    for (let [key, value] of Object.entries(this.state.binanceVol)) {
      console.log(`${key}: ${value}`);
    }
    
    // console.log(gemini)
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
              : <p className='loading'>Loading...</p> }
        </>
      )
  }
}

export default Main;

