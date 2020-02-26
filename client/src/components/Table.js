import React, { Component } from 'react'
import './Table.css'

class Table extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoaded: false,
            error: null,
            lastTime: localStorage.getItem('lastTime'),
            lastDate: localStorage.getItem('lastDate')           
        }
    }

    componentDidMount(){
        let values = [this.props.gemini, this.props.binance, this.props.coinbase, this.props.kraken];
        let sum = values.reduce((previous, current) => current += previous);
        let avg = sum / values.length;
        console.log(avg)
    }

    render(){

        let minMax = [this.props.gemini, this.props.binance, this.props.coinbase, this.props.kraken];
        let max = Math.max(...minMax);
        let min = Math.min(...minMax);
        let spread = (max - min).toFixed(2);

        let geminiBTCDiff = (this.props.gemini - this.props.geminiBTCLast).toFixed(2)
        let binanceBTCDiff = (this.props.binance - this.props.binanceBTCLast).toFixed(2)
        let coinbaseBTCDiff = (this.props.coinbase - this.props.coinbaseBTCLast).toFixed(2)
        let krakenBTCDiff = (this.props.kraken - this.props.krakenBTCLast).toFixed(2)

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
            <div className='tables'>
                <div className='price-table'>
                    <table>
                        <thead>
                        <tr>
                            <th className='chart-header' scope='col'>Exchange</th>
                            <th className='chart-header' scope='col'>Current</th>
                            <th className='chart-header' scope='col'>Last</th>
                            <th className='chart-header' scope='col'>Difference</th>
                            {/* <th className='chart-header' scope='col'>Fees</th> */}
                            
                            
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th className='coin-text' scope='row'>Gemini</th>
                            <td className='price-text' >${this.props.gemini}</td>
                            <td className='price-text' >${this.props.geminiBTCLast}</td>
                            <td className='tooltip' >{geminiBTCPerc}%
                            <span className='tooltiptext'>${geminiBTCDiff}</span>
                            </td>
                            
                            
                        </tr>
                        <tr>
                            <th className='coin-text' scope='row'>Binance</th>
                            <td className='price-text' >${this.props.binance}</td>
                            <td className='price-text' >${this.props.binanceBTCLast}</td>
                            <td className='tooltip' >{binanceBTCPerc}%
                            <span className='tooltiptext'>${binanceBTCDiff}</span>
                            </td>
                           
                            
                        </tr>
                        <tr>
                            <th className='coin-text' scope='row'>Coinbase</th>
                            <td className='price-text' >${this.props.coinbase}</td>
                            <td className='price-text' >${this.props.coinbaseBTCLast}</td>
                            <td className='tooltip' >{coinbaseBTCPerc}%
                            <span className='tooltiptext'>${coinbaseBTCDiff}</span>
                            </td>
                            
                            
                        </tr>
                        <tr>
                            <th className='coin-text' scope='row'>Kraken</th>
                            <td className='price-text' >${this.props.kraken}</td>
                            <td className='price-text' >${this.props.krakenBTCLast}</td>
                            <td className='tooltip' >{krakenBTCPerc}%
                            <span className='tooltiptext'>${krakenBTCDiff}</span>
                            </td>
                            
                        
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
                            <td className='tooltip'>{this.props.minerFastBTC} BTC
                            <span className='tooltiptext'>${minerFeePrice}</span></td>
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