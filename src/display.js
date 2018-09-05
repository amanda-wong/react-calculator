import React, { Component } from 'react';

class Display extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div 
                id="display">{this.props.display}</div>
        )
    }
}

export default Display;