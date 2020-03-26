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
            userUSDAmount: 0, 
            userBTCAmount: 0.00,
            binanceFeePerc: 0.001,
            coinbaseFeePerc: 0.005,
            krakenMakerFeePerc: 0.0016,
            krakenTakerFeePerc: 0.0026,
            geminiProfitUSD: 0,
            binanceProfitUSD: 0,
            coinbaseProfitUSD: 0,
            krakenProfitUSD: 0,
            useBTC: false,
            useUSD: true,           
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.geminiFees();
        this.minMax();
        }

    handleChange(event) {
        event.preventDefault();
            this.setState({userUSDAmount: event.target.value});
        }
    
    handleSubmit(event) {
        event.preventDefault();
        this.geminiFees();
        this.geminiProfitUSD();
        this.binanceProfitUSD();
        this.coinbaseProfitUSD();
        this.krakenProfitUSD();
        this.geminiProfitBTC();
                  }

                      
    geminiFees = () => {
        let userUSDAmount = parseInt(this.state.userUSDAmount)
        if (userUSDAmount < 10 || userUSDAmount === 10){
            let geminiFee = 0.99
            let geminiFeeBTC = geminiFee / this.props.gemini
            this.setState({
                geminiFee: geminiFee
            });
        }
        else if (userUSDAmount > 10 && userUSDAmount < 25){
            let geminiFee = 1.49
            let geminiFeeBTC = geminiFee / this.props.gemini
            this.setState({
                geminiFee: geminiFee,
                geminiFeeBTC: geminiFeeBTC
            });
        }
        else if (userUSDAmount === 25){
            let geminiFee = 1.49
            let geminiFeeBTC = geminiFee / this.props.gemini
            this.setState({
                geminiFee: geminiFee,
                geminiFeeBTC: geminiFeeBTC
            });
        }
        else if (userUSDAmount > 25 && userUSDAmount < 50){
            let geminiFee = 1.99
            let geminiFeeBTC = geminiFee / this.props.gemini
            this.setState({
                geminiFee: geminiFee,
                geminiFeeBTC: geminiFeeBTC
            });
        }
        else if (userUSDAmount === 50 ){
            let geminiFee = 1.99
            let geminiFeeBTC = geminiFee / this.props.gemini
            this.setState({
                geminiFee: geminiFee,
                geminiFeeBTC: geminiFeeBTC
            });
        }
        else if (userUSDAmount > 50 && userUSDAmount < 200){
            let geminiFee = 2.99
            let geminiFeeBTC = geminiFee / this.props.gemini
            this.setState({
                geminiFee: geminiFee,
                geminiFeeBTC: geminiFeeBTC
            });
        }
        else if (userUSDAmount > 200 || userUSDAmount === 200 ){
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
                   takerExchange: 'gemini',
                   takerExchangePrice: this.props.gemini            
                });
            }
            else if (min == this.props.binance){
                this.setState({
                    takerFee: this.state.binanceFeePerc,
                    takerExchange: 'binance',
                    takerExchangePrice: this.props.binance                
                });
            }
            else if (min == this.props.coinbase){
                this.setState({
                    takerFee: this.state.coinbaseFeePerc,                
                    takerExchange: 'coinbase',
                    takerExchangePrice: this.props.coinbase                
                });
            }
            else if (min == this.props.kraken){
                this.setState({
                    takerFee: this.state.krakenTakerFeePerc,
                    takerExchange: 'kraken',
                    takerExchangePrice: this.props.kraken                
                });
            }
            if (max == this.props.gemini){
                this.setState({
                   makerFee: this.state.geminiFee,
                   makerExchange: 'gemini',
                   makerExchangePrice: this.props.gemini             
                });
            }
            else if (max == this.props.binance){
                this.setState({
                    makerFee: this.state.binanceFeePerc,
                    makerExchange: 'binance',
                    makerExchangePrice: this.props.binance              
                });
            }
            else if (max == this.props.coinbase){
                this.setState({
                    makerFee: this.state.coinbaseFeePerc,
                    makerExchange: 'coinbase',
                    makerExchangePrice: this.props.coinbase              
                });
            }
            else if (max == this.props.kraken){
                this.setState({
                    makerFee: this.state.krakenMakerFeePerc,
                    makerExchange: 'kraken',
                    makerExchangePrice: this.props.kraken              
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

    geminiProfitUSD = () => {
        let currentPrice = parseInt(this.props.gemini)
        let min = parseInt(this.state.min)
        let minerFeePrice = parseInt(currentPrice * this.props.minerFastBTC).toFixed(4)
        let userUSDAmount = parseInt(this.state.userUSDAmount)
        if (userUSDAmount > 200 || userUSDAmount == 200 ){
            let takerFees = (userUSDAmount * this.state.takerFee)
            let makerFees = ((this.state.userUSDAmount * 0.0149))
            let profit = (((((currentPrice/min) * userUSDAmount) - userUSDAmount) - makerFees - takerFees))
            console.log(profit)
            this.setState({
                geminiProfitUSD: profit.toFixed(2),
                test1: minerFeePrice,
                geminiTakerTest: takerFees,
                geminiMakerTest: makerFees

            });
        }
        else {
            
            let makerFees = (this.state.geminiFee)
            let takerFees = (userUSDAmount * this.state.takerFee)
            console.log('gemini taker fee', takerFees) 
            let profit = ((((currentPrice/min) * userUSDAmount) - userUSDAmount) - makerFees - takerFees)
            this.setState({
                geminiProfitUSD: profit.toFixed(2),
                geminiTakerTest: takerFees,
                geminiMakerTest: makerFees
            });
        }
       
       
    }

    geminiProfitBTC = () => {
        let currentPrice = parseInt(this.props.gemini)
        let min = parseInt(this.state.min)
        let minerFeePrice = parseInt(currentPrice * this.props.minerFastBTC).toFixed(4)
        let userUSDAmount = parseInt(this.state.userBTCAmount * this.props.gemini)
        let userBTCAmount = this.state.userBTCAmount
        if (userUSDAmount > 200 || userUSDAmount == 200 ){
            let takerFees = (userBTCAmount * this.state.takerFee)
            let makerFees = ((this.state.userBTCAmount * 0.0149))
            let profit = (((((currentPrice/min) * userUSDAmount) - userUSDAmount) - makerFees - takerFees))
            this.setState({
                geminiProfitBTC: profit.toFixed(6)
            });
        }
        else {
            
            let makerFees = (this.state.geminiFeeBTC)
            let takerFees = (userUSDAmount * this.state.takerFee)
            console.log('gemini taker fee', takerFees) 
            let profit = ((((currentPrice/min) * userUSDAmount) - userUSDAmount) - makerFees - takerFees)
            this.setState({
                geminiProfitBTC: profit.toFixed(6)
            });
        }
       
       
    }


    binanceProfitUSD = () => {
        let currentPrice = parseInt(this.props.binance)
        let min = parseInt(this.state.min)
        let minerFeePrice = (currentPrice * this.props.minerFastBTC).toFixed(4)
        let userUSDAmount = parseInt(this.state.userUSDAmount)            
        let makerFees = (userUSDAmount * .001)
        let takerFees = (userUSDAmount * this.state.takerFee)
        let profit = ((((currentPrice/min) * userUSDAmount) - userUSDAmount) - makerFees - takerFees)
            this.setState({
                binanceProfitUSD: profit.toFixed(2),
                binanceFees: makerFees
            });
    }

    coinbaseProfitUSD = () => {
        let currentPrice = parseInt(this.props.coinbase)
        let min = parseInt(this.state.min)
        let minerFeePrice = (currentPrice * this.props.minerFastBTC).toFixed(4)
        let userUSDAmount = parseInt(this.state.userUSDAmount)            
        let makerFees = (userUSDAmount * .005)
        let takerFees = (userUSDAmount * this.state.takerFee)
        let profit = ((((currentPrice/min) * userUSDAmount) - userUSDAmount) - makerFees - takerFees)
            this.setState({
                coinbaseProfitUSD: profit.toFixed(2)
            });
    }

    krakenProfitUSD = () => {
        let currentPrice = parseInt(this.props.kraken)
        let min = parseInt(this.state.min)
        let minerFeePrice = (currentPrice * this.props.minerFastBTC).toFixed(4)
        let userUSDAmount = parseInt(this.state.userUSDAmount) 
        let makerFees = (userUSDAmount * .0016)
        let takerFees = (userUSDAmount * this.state.takerFee)
        let profit = ((((currentPrice/min) * userUSDAmount) - userUSDAmount) - makerFees - takerFees)
            this.setState({
                krakenProfitUSD: profit.toFixed(2)
            });
        
           
    }

    useBTC = event => {
            event.preventDefault();
            this.setState(state => ({
            useBTC: true,
            useUSD: false,          
            }));
        }

    useUSD = event => {
            event.preventDefault();
            this.setState(state => ({
            useBTC: false,
            useUSD: true,          
            }));
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
                <input className='formInput' type='number' value={this.state.userUSDAmount} onChange={this.handleChange} />
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
                            <th className='chart-header' scope='col'>Profit (USD)</th>
                            
                            
                            
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
                            <td className='price-text' >${this.state.geminiProfitUSD}</td>
                            
                            
                            
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
                            <td className='price-text' >${this.state.binanceProfitUSD}</td>
                            
                            
                           
                            
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
                            <td className='price-text' >${this.state.coinbaseProfitUSD}</td>
                            
                            
                            
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
                            <td className='price-text' >${this.state.krakenProfitUSD}</td>
                            
                            
                        
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