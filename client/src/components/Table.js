import React, { Component } from 'react'
import User from './User'
import './Table.css'


class Table extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            isLoaded: false,
            error: null,
            lastTime: localStorage.getItem('lastTime'),
            lastDate: localStorage.getItem('lastDate'),
            time: new Date(),
            userBTCAmount: 0,
            binanceFeePerc: 0.001,
            coinbaseFeePerc: 0.005,
            krakenMakerFeePerc: 0.0016,
            krakenTakerFeePerc: 0.0026,
            geminiProfit: 0,
            binanceProfit: 0,
            coinbaseProfit: 0,
            krakenProfit: 0           
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.geminiFees()
        this.minMax()
        this.maker()
        
        }

    handleChange(event) {
        this.setState({userBTCAmount: event.target.value});
        event.preventDefault();
        }
    
    handleSubmit(event) {
        this.geminiFees()
        this.potentialGeminiProfit()
        this.binanceProfit()
        this.coinbaseProfit()
        this.krakenProfit()
        event.preventDefault();
                  }

                      
    geminiFees = () => {
        let userBTCAmount = parseInt(this.state.userBTCAmount)
        if (userBTCAmount < 10 || userBTCAmount === 10){
            let geminiFee = 0.99
            this.setState({
                geminiFee: geminiFee
            });
        }
        else if (userBTCAmount > 10 && userBTCAmount < 25){
            let geminiFee = 1.49
            this.setState({
                geminiFee: geminiFee
            });
        }
        else if (userBTCAmount === 25){
            let geminiFee = 1.49
            this.setState({
                geminiFee: geminiFee
            });
        }
        else if (userBTCAmount > 25 && userBTCAmount < 50){
            let geminiFee = 1.99
            this.setState({
                geminiFee: geminiFee
            });
        }
        else if (userBTCAmount === 50 ){
            let geminiFee = 1.99
            this.setState({
                geminiFee: geminiFee
            });
        }
        else if (userBTCAmount > 50 && userBTCAmount < 200){
            let geminiFee = 2.99
            this.setState({
                geminiFee: geminiFee
            });
        }
        else if (userBTCAmount > 200 || userBTCAmount === 200 ){
            let geminiFee = 0.0149
            this.setState({
                geminiFee: geminiFee
            });
        }
    }


    minMax = () => {
        if (!this.state.isLoaded){
            let minMax = [this.props.gemini, this.props.binance, this.props.coinbase, this.props.kraken];
            let max = Math.max(...minMax);
            let min = Math.min(...minMax);
            if (min == this.props.gemini){
                this.setState({
                   takerFee: this.state.geminiFee,
                   takerExchange: 'gemini'            
                });
            }
            else if (min == this.props.binance){
                this.setState({
                    takerFee: this.state.binanceFeePerc,
                    takerExchange: 'binance'                
                });
            }
            else if (min == this.props.coinbase){
                this.setState({
                    takerFee: this.state.coinbaseFeePerc,                
                    takerExchange: 'coinbase'                
                });
            }
            else if (min == this.props.kraken){
                this.setState({
                    takerFee: this.state.krakenTakerFeePerc,
                    takerExchange: 'kraken'                
                });
            }
            if (this.state.max === this.props.gemini){
                this.setState({
                   makerFee: this.state.geminiFee,
                   makerExchange: 'gemini'             
                });
            }
            else if (this.state.max === this.props.binance){
                this.setState({
                    makerFee: this.state.binanceFeePerc,
                    makerExchange: 'binance'              
                });
            }
            else if (this.state.max === this.props.coinbase){
                this.setState({
                    makerFee: this.state.coinbaseFeePerc,
                    makerExchange: 'coinbase'              
                });
            }
            else if (this.state.max === this.props.kraken){
                this.setState({
                    makerFee: this.state.krakenMakerFeePerc,
                    makerExchange: 'kraken'              
                });
            }
            this.setState({
                max: max,
                min: min,
                isLoaded: true              
            });
        }
        else {
            this.minMax()
        }
    }

    maker = () => {
        // if (this.state.max === this.props.gemini){
        //     this.setState({
        //        makerFee: this.state.geminiFee,
        //        makerExchange: 'gemini'             
        //     });
        // }
        // else if (this.state.max === this.props.binance){
        //     this.setState({
        //         makerFee: this.state.binanceFeePerc,
        //         makerExchange: 'binance'              
        //     });
        // }
        // else if (this.state.max === this.props.coinbase){
        //     this.setState({
        //         makerFee: this.state.coinbaseFeePerc,
        //         makerExchange: 'coinbase'              
        //     });
        // }
        // else if (this.state.max === this.props.kraken){
        //     this.setState({
        //         makerFee: this.state.krakenMakerFeePerc,
        //         makerExchange: 'kraken'              
        //     });
        // }
    }

    taker = () => {
        // let min = this.state.min
        // if (min == this.props.gemini){
        //     this.setState({
        //        takerFee: this.state.geminiFee,
        //        takerExchange: 'gemini'            
        //     });
        // }
        // else if (min == this.props.binance){
        //     this.setState({
        //         takerFee: this.state.binanceFeePerc,
        //         takerExchange: 'binance'                
        //     });
        // }
        // else if (min == this.props.coinbase){
        //     this.setState({
        //         takerFee: this.state.coinbaseFeePerc,                
        //         takerExchange: 'coinbase'                
        //     });
        // }
        // else if (min == this.props.kraken){
        //     this.setState({
        //         takerFee: this.state.krakenTakerFeePerc,
        //         takerExchange: 'kraken'                
        //     });
        // }
    }


    potentialGeminiProfit = () => {
        let currentPrice = parseInt(this.props.gemini)
        let min = parseInt(this.state.min)
        let minerFeePrice = parseInt(currentPrice * this.props.minerFastBTC).toFixed(4)
        let userBTCAmount = parseInt(this.state.userBTCAmount)
        if (userBTCAmount > 200 || userBTCAmount == 200 ){
            let takerFees = (userBTCAmount * this.state.takerFee)
            console.log('gemini taker fee', takerFees) 
            let makerFees = ((this.state.userBTCAmount * 0.0149))
            let profit = (((((currentPrice/min) * userBTCAmount) - userBTCAmount) - makerFees - takerFees))
            this.setState({
                geminiProfit: profit.toFixed(2),
                test1: minerFeePrice,
                geminiTakerTest: takerFees,
                geminiMakerTest: makerFees

            });
        }
        else {
            
            let makerFees = (this.state.geminiFee)
            let takerFees = (userBTCAmount * this.state.takerFee)
            console.log('gemini taker fee', takerFees) 
            let profit = ((((currentPrice/min) * userBTCAmount) - userBTCAmount) - makerFees - takerFees)
            this.setState({
                geminiProfit: profit.toFixed(2),
                geminiTakerTest: takerFees,
                geminiMakerTest: makerFees
            });
        }
       
       
    }


    binanceProfit = () => {
        let currentPrice = parseInt(this.props.binance)
        let min = parseInt(this.state.min)
        let minerFeePrice = (currentPrice * this.props.minerFastBTC).toFixed(4)
        let userBTCAmount = parseInt(this.state.userBTCAmount)            
        let makerFees = (userBTCAmount * .001)
        let takerFees = (userBTCAmount * this.state.takerFee)
        console.log('binance taker fee', takerFees)
        let profit = ((((currentPrice/min) * userBTCAmount) - userBTCAmount) - makerFees - takerFees)
            this.setState({
                binanceProfit: profit.toFixed(2),
                binanceFees: makerFees
            });
    }

    coinbaseProfit = () => {
        let currentPrice = parseInt(this.props.coinbase)
        let min = parseInt(this.state.min)
        let minerFeePrice = (currentPrice * this.props.minerFastBTC).toFixed(4)
        let userBTCAmount = parseInt(this.state.userBTCAmount)            
        let makerFees = (userBTCAmount * .005)
        let takerFees = (userBTCAmount * this.state.takerFee)
        console.log('coinbase taker fee', takerFees)
        let profit = ((((currentPrice/min) * userBTCAmount) - userBTCAmount) - makerFees - takerFees)
            this.setState({
                coinbaseProfit: profit.toFixed(2)
            });
    }

    krakenProfit = () => {
        let currentPrice = parseInt(this.props.kraken)
        let min = parseInt(this.state.min)
        let minerFeePrice = (currentPrice * this.props.minerFastBTC).toFixed(4)
        let userBTCAmount = parseInt(this.state.userBTCAmount) 
        let makerFees = (userBTCAmount * .0016)
        let takerFees = (userBTCAmount * this.state.takerFee)
        console.log('kraken taker fee', takerFees)
        let profit = ((((currentPrice/min) * userBTCAmount) - userBTCAmount) - makerFees - takerFees)
            this.setState({
                krakenProfit: profit.toFixed(2)
            });
        
           
    }


    render(){

        let { time } = this.state;
              localStorage.setItem('lastDate', time.toLocaleDateString()) 
              localStorage.setItem('lastTime', time.toLocaleTimeString())
   
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        let geminiVolUSD = formatter.format((this.props.gemini * this.props.geminiVol))
        let binanceVol = formatter.format((this.props.binance * this.props.binanceVol))
        let coinbaseVolUSD = formatter.format((this.props.coinbase * this.props.coinbaseVol))
        let krakenVolUSD = formatter.format((this.props.kraken * this.props.krakenVol))
       
        let spread = (this.state.max - this.state.min).toFixed(2);
       
        let geminiBTCDiff = formatter.format((this.props.gemini - this.props.geminiBTCLast).toFixed(2))
        let binanceBTCDiff = formatter.format((this.props.binance - this.props.binanceBTCLast).toFixed(2))
        let coinbaseBTCDiff = formatter.format((this.props.coinbase - this.props.coinbaseBTCLast).toFixed(2))
        let krakenBTCDiff = formatter.format((this.props.kraken - this.props.krakenBTCLast).toFixed(2))

        let geminiBTCPerc = (((this.props.gemini - this.props.geminiBTCLast) / this.props.geminiBTCLast) * 100).toFixed(4)
        let binanceBTCPerc = (((this.props.binance - this.props.binanceBTCLast) / this.props.binanceBTCLast) * 100).toFixed(4)
        let coinbaseBTCPerc = (((this.props.coinbase - this.props.coinbaseBTCLast) / this.props.coinbaseBTCLast) * 100).toFixed(4)
        let krakenBTCPerc = (((this.props.kraken - this.props.krakenBTCLast) / this.props.krakenBTCLast) * 100).toFixed(4)
       
        let geminiInt = parseInt(this.props.gemini)
        let binanceInt = parseInt(this.props.binance)
        let coinbaseInt = parseInt(this.props.coinbase)
        let krakenInt = parseInt(this.props.kraken)

        let btcAvr = ((geminiInt + binanceInt + coinbaseInt + krakenInt)/4).toFixed(2)

        let minerFeePrice = (btcAvr * this.props.minerFastBTC).toFixed(4)
        
        return(

        <>  
        
                <p className='last-check'>You last checked at {this.state.lastTime} on {this.state.lastDate}</p>
          
            <form className='userInput' onSubmit={this.handleSubmit}>
                <label className='formLabel'>
                Trade limit in USD  
                <input className='formInput' type='number' value={this.state.userBTCAmount} onChange={this.handleChange} />
                </label>
                <input className='formSubmit' type='submit' value='Submit' />
            </form>

            <div className='tables'>
                <div className='price-table'>
                    <table>
                        <thead>
                        <tr>
                            <th className='chart-header' scope='col'>Exchange</th>
                            <th className='chart-header' scope='col'>Current</th>
                            <th className='chart-header' scope='col'>Last</th>
                            <th className='chart-header' scope='col'>Difference</th>
                            <th className='chart-header' scope='col'>Volume (24h)</th>
                            <th className='chart-header' scope='col'>Fees</th>
                            <th className='chart-header' scope='col'>Profit</th>
                            
                            
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th className='coin-text' scope='row'>Gemini</th>
                            <td className='price-text' >${this.props.gemini}</td>
                            <td className='price-text' >${this.props.geminiBTCLast}</td>
                            <td className='tooltip' >{geminiBTCPerc}%
                            <span className='tooltiptext'>{geminiBTCDiff}</span>
                            </td>
                            <td className='price-text' >{geminiVolUSD}</td>
                            <td className='price-text' >${this.state.geminiFee}</td>
                            <td className='price-text' >${this.state.geminiProfit}</td>
                            
                            
                        </tr>
                        <tr>
                            <th className='coin-text' scope='row'>Binance</th>
                            <td className='price-text' >${this.props.binance}</td>
                            <td className='price-text' >${this.props.binanceBTCLast}</td>
                            <td className='tooltip' >{binanceBTCPerc}%
                            <span className='tooltiptext'>{binanceBTCDiff}</span>
                            </td>
                            <td className='price-text' >{binanceVol}</td>
                            <td className='price-text' >{this.state.binanceFeePerc}%</td>
                            <td className='price-text' >${this.state.binanceProfit}</td>
                           
                            
                        </tr>
                        <tr>
                            <th className='coin-text' scope='row'>Coinbase</th>
                            <td className='price-text' >${this.props.coinbase}</td>
                            <td className='price-text' >${this.props.coinbaseBTCLast}</td>
                            <td className='tooltip' >{coinbaseBTCPerc}%
                            <span className='tooltiptext'>{coinbaseBTCDiff}</span>
                            </td>
                            <td className='price-text' >{coinbaseVolUSD}</td>
                            <td className='price-text' >{this.state.coinbaseFeePerc}%</td>
                            <td className='price-text' >${this.state.coinbaseProfit}</td>
                            
                            
                        </tr>
                        <tr>
                            <th className='coin-text' scope='row'>Kraken</th>
                            <td className='price-text' >${this.props.kraken}</td>
                            <td className='price-text' >${this.props.krakenBTCLast}</td>
                            <td className='tooltip' >{krakenBTCPerc}%
                            <span className='tooltiptext'>{krakenBTCDiff}</span>
                            </td>
                            <td className='price-text' >{krakenVolUSD}</td>
                            <td className='price-text' >{this.state.krakenMakerFeePerc}-{this.state.krakenTakerFeePerc}%</td>
                            <td className='price-text' >${this.state.krakenProfit}</td>
                            
                        
                        </tr>
                        </tbody>
                    </table>
                    
                </div>
                <div className='spread-data'>
                    <table className='spread-table'>
                        <tbody>
                        <tr>
                            <th className='spreadText'>Average: </th>
                            <td className='spreadText'>${btcAvr}</td>
                        </tr>
                        <tr>
                            <th className='spreadText'>Spread: </th>
                            <td className='spreadText'>${spread}</td>
                        </tr>
                        <tr>
                            <th className='spreadText'>Miner Fee: </th>
                            <td className='tooltip'>${minerFeePrice} 
                            <span className='tooltiptext'>{this.props.minerFastBTC} BTC</span></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
        )
    }
}

export default Table

// BTC (Sats {this.props.minerFees}) (${minerFeePrice})