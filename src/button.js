import React, { Component } from 'react';

class Button extends Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }


    handleClick = () => {
        this.props.handleClick(this.props.name, this.props.role);
    }
    
    render() {
        return (
            <div 
                className={this.props.role + " button"}
                onClick={this.handleClick}>
                    {this.props.name}
            </div>
        )
    }
}

export default Button; 
