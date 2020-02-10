import React, { Component } from 'react'
import './Table.css'

class Table extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoaded: false,
            error: null
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

        let geminiDiff = (this.props.gemini - this.props.geminiBTCLast).toFixed(2)
        let binanceDiff = (this.props.binance - this.props.binanceBTCLast).toFixed(2)
        let coinbaseDiff = (this.props.coinbase - this.props.coinbaseBTCLast).toFixed(2)
        let krakenDiff = (this.props.kraken - this.props.krakenBTCLast).toFixed(2)

        return(
            <>
            <div className='table'>
                <table >
                    <thead>
                    <tr>
                        <th className='chart-header' scope='col'>Exchange</th>
                        <th className='chart-header' scope='col'>Current</th>
                        <th className='chart-header' scope='col'>Last</th>
                        <th className='chart-header' scope='col'>Difference</th>
                        <th className='chart-header' scope='col'>Fees</th>
                        
                        
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th className='coin-text' scope='row'>Gemini</th>
                        <td className='price-text' >${this.props.gemini}</td>
                        <td className='price-text' >${this.props.geminiBTCLast}</td>
                        <td className='price-text' >${geminiDiff}</td>
                        <td className='price-text' ></td>
                        
                    </tr>
                    <tr>
                        <th className='coin-text' scope='row'>Binance</th>
                        <td className='price-text' >${this.props.binance}</td>
                        <td className='price-text' >${this.props.binanceBTCLast}</td>
                        <td className='price-text' >${binanceDiff}</td>
                        <td className='price-text' ></td>
                        
                    </tr>
                    <tr>
                        <th className='coin-text' scope='row'>Coinbase</th>
                        <td className='price-text' >${this.props.coinbase}</td>
                        <td className='price-text' >${this.props.coinbaseBTCLast}</td>
                        <td className='price-text' >${coinbaseDiff}</td>
                        <td className='price-text' ></td>
                        
                    </tr>
                    <tr>
                        <th className='coin-text' scope='row'>Kraken</th>
                        <td className='price-text' >${this.props.kraken}</td>
                        <td className='price-text' >${this.props.krakenBTCLast}</td>
                        <td className='price-text' >${krakenDiff}</td>
                        <td className='price-text' ></td>
                      
                    </tr>
                    </tbody>
                </table>
                
            </div>
            <div>
            <p className="spreadText">Spread: ${spread}</p>
            <p className="spreadText>">Miner Fees: {this.props.minerFees} Sats ({this.props.minerFastBTC})</p>
            {/* <p className="spreadText>">Average Price:{average}</p> */}
            </div>
            </>
        )
    }
}

export default Table