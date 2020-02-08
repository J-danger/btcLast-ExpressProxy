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

    render(){

        let minMax = [this.props.gemini, this.props.binance, this.props.coinbase, this.props.kraken];
        let max = Math.max(...minMax);
        let min = Math.min(...minMax);
        let spread = (max - min).toFixed(2);
        return(
            <>
            <div className='table'>
                <table >
                    <thead>
                    <tr>
                        <th className='chart-header' scope='col'>Exchange</th>
                        <th className='chart-header' scope='col'>Price</th>
                        <th className='chart-header' scope='col'>Last</th>
                        <th className='chart-header' scope='col'>Currency</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th className='coin-text' scope='row'>Gemini</th>
                        <td className='price-text' >${this.props.gemini}</td>
                        <td className='price-text' ></td>
                        <td className='price-text' >USD</td>
                    </tr>
                    <tr>
                        <th className='coin-text' scope='row'>Binance</th>
                        <td className='price-text' >${this.props.binance}</td>
                        <td className='price-text' ></td>
                        <td className='price-text' >USD</td>
                    </tr>
                    <tr>
                        <th className='coin-text' scope='row'>Coinbase</th>
                        <td className='price-text' >${this.props.coinbase}</td>
                        <td className='price-text' ></td>
                        <td className='price-text' >USD</td>
                    </tr>
                    <tr>
                        <th className='coin-text' scope='row'>Kraken</th>
                        <td className='price-text' >${this.props.kraken}</td>
                        <td className='price-text' ></td>
                        <td className='price-text' >USD</td>
                    </tr>
                    </tbody>
                </table>
                
            </div>
            <p className="spreadText">Spread: ${spread}</p>
            </>
        )
    }
}

export default Table