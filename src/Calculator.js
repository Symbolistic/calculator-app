import React from 'react'

const inputs = [
    {
        id: 'zero',
        value: '0'
    },
    {
        id: 'one',
        value: '1'
    },

    {
        id: 'two',
        value: '2'
    },

    {
        id: 'three',
        value: '3'
    },

    {
        id: 'four',
        value: '4'
    },

    {
        id: 'five',
        value: '5'
    },

    {
        id: 'six',
        value: '6'
    },
    {
        id: 'seven',
        value: '7'
    },

    {
        id: 'eight',
        value: '8'
    },

    {
        id: 'nine',
        value: '9'
    },

    {
        id: 'decimal',
        value: '.'
    },

    {
        id: 'equals',
        value: '='
    },

    {
        id: 'add',
        value: '+'
    },

    {
        id: 'subtract',
        value: '-'
    },

    {
        id: 'multiply',
        value: '*'
    },

    {
        id: 'divide',
        value: '/'
    },
      
    {
        id: 'clear',
        value: 'clear'
    }
]

class Calculator extends React.Component {
    constructor() {
        super()

        this.state = {
            inputs,
            currentInput: '0',
            output: ''
        }
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(event) {
        const input = event.target.value;

            // If input is 'CLEAR' do this
        if (input === "clear") {

            this.setState ({currentInput: '0', output: ''})
        
            // If input IS a number, start these conditionals
        } else if (!isNaN(input)) {

            if (this.state.output.includes('=')){
                this.setState (prevState => {
                    return {
                        currentInput: input,
                        output: input
                    }
                })
            }
            
            // If selected input is 0 and CURRENT input is also already 0...
            else if (input === '0' && this.state.currentInput === '0'){
                this.setState ({currentInput:'0'}) // Keep current input as 0.

             // If selected input ISN'T 0 and CURRENT input IS 0...
            } else if(input !== '0' && this.state.currentInput === '0') {
                this.setState (prevState => {
                    return {
                        currentInput: input,  // Replace current 0 input with the new selected number
                        output: prevState.output + input
                    }
                })
            } else if (isNaN(this.state.currentInput)) { // If CURRENT DISPLAYED INPUT ISN'T A NUMBER, ERASE THAT HOE!
                                                         // REPLACE HER WITH A NEW ONE, new, being a number :)
                this.setState (prevState => {
                    return {
                        currentInput: input,  
                        output: prevState.output + input
                    }
                })

            } else { // Else, if input is a number and current input is not 0, just append the selected input
                this.setState (prevState => {
                    return {
                        currentInput: prevState.currentInput + input, 
                        output: prevState.output + input
                    }
                })
            }

            // If input is a decimal
        } else if (input === '.') {
            
            // If there isn't already a decimal, run this
            if (!this.state.currentInput.includes('.')) {
                
                this.setState (prevState => {
                    return {
                        currentInput: prevState.currentInput + input, 
                        output: prevState.output + input
                    }
                })
            }

            // If input is an OPERATOR
        } else if (['+', '-', '*', '/'].includes(input)) {

            if (this.state.output.includes('=')){
                this.setState (prevState => {
                    return {
                        currentInput: input,
                        output: prevState.currentInput
                    }
                })
            }

            // If CURRENT input is a number, use the NEWLY CLICKED input and update CURRENT input
            if (!isNaN(this.state.currentInput)) {

                this.setState (prevState => {
                    return {
                        currentInput: input, 
                        output: prevState.output + input
                    }
                })
                // This checks currentInput to see if it has ONLY 0 - 1 other Operators in it currently
            } else if (['+', '-', '*', '/'].some(symbol => this.state.currentInput === symbol)) {

                    // This avoids duplicate operators, so no ** or -- or ++ or //, this makes sure its only mixed OPERATORS
                if (input === this.state.currentInput) {
                    this.setState (prevState => {
                        return {
                            currentInput: input
                        }
                    })
                } else if (input === '-') { // Now that we avoid duplicate operators, if the new operator is -, append it

                    this.setState (prevState => {
                        return {
                            currentInput: prevState.currentInput + input,
                            output: prevState.output + input
                        }
                    })

                } else if (input === '*' || '/' || '+') { // If its anything else, basically we override it with the old operator
                        this.setState (prevState => {
                            return {
                                currentInput: input,
                                output: prevState.output.slice(0,-1) + input
                            }
                        })
                    }
                } // END OF THIS NESTED IF STATEMENT
                 // Usually if we have more than 2 operators currently its ending with a '-', if we click '-' again, this overrides
                 // the old '-'
                else if (input === '-') {
                    this.setState (prevState => {
                        return {
                            currentInput: prevState.currentInput,
                            output: prevState.output
                        }
                    })
                } else if (input === '+' || '/' || '*') { // If its more than 2 operators and any of these are picked
                    this.setState (prevState => {         // just override all operators and use the newly picked operator
                        return {
                            currentInput: input,
                            output: prevState.output.slice(0,-2) + input
                        }
                    })
                }
            } // END OF OPERATOR NESTED STATEMENTS.....THANK GOD! 

            else if (input === '=')  {

                if (['+', '-', '*', '/'].some(symbol => this.state.output.endsWith(symbol))) { 

                    let currOutput = this.state.output.slice(0,-1) // I made this because I didn't want to mutate current state
                    
                    if (['+', '-', '*', '/'].some(symbol => currOutput.endsWith(symbol))) {
                        currOutput = currOutput.slice(0,-1)
                        
                        this.setState (prevState => {
                            return {
                                currentInput: eval(currOutput),
                                output: currOutput + input + eval(currOutput)
                            }
                        })
                    }
                    
                }

                else if (this.state.output.includes('=')){
                    this.setState (prevState => {
                        return {
                            currentInput: prevState.currentInput,
                            output: prevState.output
                        }
                    })
                } else if (this.state.output === '') {

                    this.setState ({currentInput: 'NaN', output: 'NaN'})

                } else if (this.state.output === "NaN") {


                } else {
                    this.setState (prevState => {        
                        return {
                            currentInput: eval(prevState.output),
                            output: prevState.output + input + eval(prevState.output)
                        }
                    })
                }
            }
        }

    render() {
        return (
            <div className="calc-container">
                <div id="display-container">
                    <div id="outputDisplay">{this.state.output}</div>
                    <div id="display">{this.state.currentInput}</div>
                </div>
                <div id="inputs">
                    {this.state.inputs.map(({id, value}) => {
                        return (
                            <button key={id} id={id} value={value} onClick={this.handleInput}>{value}</button>
                        )
                    })}
                </div>
                <div id="info"><p>Copyright &copy; 2020 Created by V.S</p></div>
            </div>
        )
    }
}

export default Calculator