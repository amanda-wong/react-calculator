import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Display from './display';
import Button from './button';
import './style.css'

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: '0',
            name: '',
            role: '',
            lastNumber: ''
        }

    }

    buttonClickHandler = (name, role) => {
        let displayVal = this.state.display;
        let lastChar = displayVal.charAt(displayVal.length - 1);

        if (role === 'clear') {
            this.clearCalculator();
        } else if(role === 'equal') {
            this.calculate(name,role);
        } else if(this.state.role === 'equal') {
            this.replaceEquationWithVal(name,role);
        } else if(displayVal === '0') {
            this.handleFirstButtonClick(name, role);
        } else if(lastChar === '.') {
            this.handleIfLastCharIsDecimal(name,role);
        } else if(new RegExp(/\w/).test(lastChar)) {
            this.handleIfLastCharIsNumber(name,role);
        } else if(new RegExp(/[*/\-+]/).test(lastChar)) {
            this.handleIfLastCharIsOperator(name,role);
        }
    }

    calculate = (name,role) => {
        let calculateDisplay = eval(this.state.display).toString();

        console.log(calculateDisplay);
        
        this.setState({
            display: calculateDisplay,
            name: name,
            role: role,
            lastNumber: calculateDisplay
        })
    } 

    clearCalculator = () => {
        this.setState({
            display: '0',
            name: '',
            role: '',
            lastNumber: ''
        });
    }

    handleIfLastCharIsOperator = (name,role) => {
        let currentDisplay = this.state.display;

        if(role === 'number') {
            this.appendValueToEquation(name,role);
        } else if (role === 'operator') {
            this.setState({
                display: currentDisplay.substring(0, currentDisplay.length - 1) + name,
                name: name,
                role: role
            });
        }
    }

    handleIfLastCharIsNumber = (name,role) => {
        let currentDisplay = this.state.display;

        if (role === 'number' || role === 'operator' || (role === 'decimal' && currentDisplay.indexOf('.') < 0)) {
            
            this.appendValueToEquation(name,role);
        }
    }


    handleIfLastCharIsDecimal = (name, role) => {
        if(role === 'number') {
            this.appendValueToEquation(name,role)
        }
    }

    handleFirstButtonClick = (name, role) => {
        if (role === 'number' && name !== '0') {
            this.replaceEquationWithVal(name, role)
        } else if(role === 'decimal' || role === 'operator') {
            this.appendValueToEquation(name, role)
        }
    }

    replaceEquationWithVal = (name, role) => {
        this.setState({
            display: name,
            name: name,
            role: role,
            lastNumber: name
        });
    }

    appendValueToEquation = (name, role) => {
        let currentDisplay = this.state.display; 

        if(new RegExp(/[\w.]/).test(name)) {
            this.setState({
                lastNumber: this.state.lastNumber + name
            });
        } else if(new RegExp(/[*/\-+]/).test(name)) {
            this.setState({
                lastNumber: ''
            });
        }

        this.setState({
            display: currentDisplay + name,
            name: name,
            role: role
        });
    }
    
    render() {
        return (
            <div id="calculator">
                <Display display={this.state.display} />
                <div className="button-panel">
                    <Button role="number" name="1" handleClick={this.buttonClickHandler} />
                    <Button role="number" name="2" handleClick={this.buttonClickHandler} />
                    <Button role="number" name="3" handleClick={this.buttonClickHandler} />
                    <Button role="number" name="4" handleClick={this.buttonClickHandler} />
                    <Button role="number" name="5" handleClick={this.buttonClickHandler} />
                    <Button role="number" name="6" handleClick={this.buttonClickHandler} />
                    <Button role="number" name="7" handleClick={this.buttonClickHandler} />
                    <Button role="number" name="8" handleClick={this.buttonClickHandler} />
                    <Button role="number" name="9" handleClick={this.buttonClickHandler} />
                    <Button role="number" name="0" handleClick={this.buttonClickHandler} />
                    <Button role="operator" name="+" handleClick={this.buttonClickHandler} />
                    <Button role="operator" name="-" handleClick={this.buttonClickHandler} />
                    <Button role="operator" name="*" handleClick={this.buttonClickHandler} />
                    <Button role="operator" name="/" handleClick={this.buttonClickHandler} />
                    <Button role="decimal" name="." handleClick={this.buttonClickHandler} />
                    <Button role="clear" name="C" handleClick={this.buttonClickHandler} />
                    <Button role="equal" name="=" handleClick={this.buttonClickHandler} />
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Calculator />, document.getElementById('root'))