import React, {Component} from 'react'
import './Clock.css'

class Clock extends Component {

    constructor() {
        super();
        this.state = { 
            time: new Date(),
            
        }; 
    }

    componentDidMount() { 
        this.update = setInterval(() => {
            this.setState({ time: new Date() });
        }, 1 * 1000);
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
        </div>);
    }
}

export default Clock