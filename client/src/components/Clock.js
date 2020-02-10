import React, {Component} from 'react'
import './Clock.css'

class Clock extends Component {

    constructor() {
        super();
        this.state = { 
            time: new Date(),
            lastTime: localStorage.getItem('lastTime'),
            lastDate: localStorage.getItem('lastDate')
        }; 
    }

    componentDidMount() { 
        this.update = setInterval(() => {
            this.setState({ time: new Date() });
        }, 1 * 1000);
        this.setState({            
            lastDate: localStorage.getItem('lastDate'),
            lastTime: localStorage.getItem('lastTime'),                
          });              
          let { time } = this.state;
            localStorage.setItem('lastDate', time.toLocaleDateString()) 
            localStorage.setItem('lastTime', time.toLocaleTimeString()) 
          
        }
        
        componentWillUnmount() { // delete the interval just before component is removed
            clearInterval(this.update);
    }
    
    render() {
        let { time } = this.state; // retrieve the time from state

        return (
        <div className='Clock'>
            
            <h4>
                {/* print the string prettily */}
                {time.toLocaleTimeString()}
            </h4>
            <h4>
                Last check: {this.state.lastTime}
            </h4>
        </div>);
    }
}

export default Clock