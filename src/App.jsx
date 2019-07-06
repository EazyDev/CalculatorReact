import React, {Component} from 'react';
import './App.css';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { ClearButton } from './components/ClearButton';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input:"",
      previousNumber:"",
      currentNumber:"",
      operator:"",
      history: [],
      BackCount: 0,
    };

    
  }

  // componentDidMount() {
  //   fetch('http://localhost:3001/')
  //   .then(res => res.json())
  //   .then(json => {
  //     this.setState({
  //       history: json,
  //     })
  //   });
  // }



  Back = () => {
  let self = this;
    axios.get('http://localhost:3001/')
  .then(function (response) {
    // handle success
    console.log(response.data[0].expr);

    console.log(response.data)

    console.log(self.state)

    self.setState({history:response.data});

    self.setState({input:self.state.history[self.state.BackCount].expr,
    BackCount: self.state.BackCount + 1});
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });   
  }

  // This function was for finding the answer for the expressions in history
  // BackAns = () => {
  //   this.setState({input:this.state.history[this.state.BackCount].ans});
  // }

  ClearHistory = () => {
    axios.delete('http://localhost:3001/')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    
    this.setState({input:"", //revert state to how it was at the starting
    previousNumber:"",
    currentNumber:"",
    operator:"",
    history: [],
    BackCount: 0,
  })
}


  addToInput = val => {
    this.setState({input: this.state.input + val});
  }

  addZeroToInput = val => {
    if(this.state.input !== "") //First digit won't be zero
    {
      this.setState({ input: this.state.input + val });
    }
  }

  addDecimal = val => {
    if(this.state.input.indexOf(".") === -1)
    {
      this.setState({ input: this.state.input + val });
    }
  }

  evaluate = () =>{
    this.state.currentNumber = this.state.input; //currentNumber is taken into memory now, previousNumber is taken into account when operator added
    // this.setState({ currentNumber: this.state.input })

    if(this.state.operator === "+")
    {
      this.setState({
        input: parseFloat(this.state.previousNumber) + parseFloat(this.state.currentNumber),
      },function () {this.Post();});
      // history.expr = this.state.previousNumber + '+' + this.state.currentNumber;
      // history.opr = this.state.operator;
      // history.ans = parseFloat(this.state.input);
    }

    if(this.state.operator === "-")
    {
      this.setState({
        input: parseFloat(this.state.previousNumber) - parseFloat(this.state.currentNumber)
      },function () {this.Post();});
    }

    if(this.state.operator === "*")
    {
      this.setState({
        input: parseFloat(this.state.previousNumber) * parseFloat(this.state.currentNumber)
      },function () {this.Post();});
    }

    if(this.state.operator === "/")
    {
      this.setState({
        input: parseFloat(this.state.previousNumber) / parseFloat(this.state.currentNumber)
      },function () {this.Post();});
    }

    if(this.state.operator === "%")
    {
      this.setState({
        input: parseFloat(this.state.previousNumber) % parseFloat(this.state.currentNumber)
      },function () {this.Post();});
    }

    // axios.post(`http://localhost:3001/`, { history })
    // .then(res => {
    //   console.log(res);
    //   console.log(res.data);
    // });

    // axios.post('http://localhost:3001/', {
    //   expr: this.state.previousNumber  + this.state.operator  + this.state.currentNumber,
    //   opr: this.state.operator,
    //   ans: this.state.input
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    
  }

  // //Here we just set the state, as well as store the number before the operator
  add = () => {
    this.state.previousNumber = this.state.input;
    this.setState({ input : "" });
    this.state.operator = "+";
    // this.setState({
    //   previousNumber: this.state.input,
    //   input: "",
    //   operator: "plus"
    // });
  };

  subtract = () =>{
    this.state.previousNumber = this.state.input;
    this.setState({ input: "" });
    this.state.operator = "-";
    // this.setState({
    //   previousNumber: this.state.input,
    //   input: "",
    //   operator : "minus"
    // });
  };

  multiply = () => {
    this.state.previousNumber = this.state.input;
    this.setState({ input: "" });
    this.state.operator = "*";
  };

  divide = () =>{
    this.state.previousNumber = this.state.input;
    this.setState({input: ""});
    this.state.operator = "/";
  };

  remainder = () => {
    this.state.previousNumber = this.state.input;
    this.setState({ input: "" });
    this.state.operator = "%";
  };


    //This post function is only for functions that have one number associated with them. (square,sqrt,cube,cuberoot,percentage) - these methods written after this function.
    Post = () => {
      // // let self = this;
      // console.log(this.state.previousNumber + this.state.operator + this.state.currentNumber);
      // console.log(this.state.input);
      axios.post('http://localhost:3001/', {
        expr: this.state.previousNumber + this.state.operator + this.state.currentNumber,
        opr: this.state.operator,
        ans: parseFloat(this.state.input)
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }


  // the following functions don't need the '=' button to be evaluated.
  mod = () => {
    this.setState({ previousNumber:this.state.input,
      input: parseFloat(this.state.input) * 0.01 ,
      operator: "*0.01"
    },function(){this.Post();});
    // this.state.previousNumber = this.state.input;
    // this.state.operator = "mod";
    // this.Post();
  };

  square = () => {
    this.setState({
      previousNumber: this.state.input,
      input: Math.pow(parseFloat(this.state.input),2),
      operator: "**",
      currentNumber:"2"
    },function(){this.Post();});
    // this.Post();
  };

  cube = () => {
    this.setState({ previousNumber: this.state.input,
      input: Math.pow(parseFloat(this.state.input),3),
    operator: "**",
    currentNumber:"3"
    },function(){this.Post();});
  };

  squareroot = () => {
    this.setState({ previousNumber: this.state.input,
      input: Math.sqrt(parseFloat(this.state.input)),
      operator: "**",
      currentNumber:"1/2"
    },function(){this.Post();});
  };

  cuberoot = () => {
    this.setState({ previousNumber: this.state.input,
      input: Math.cbrt(parseFloat(this.state.input)),
    operator: "**",
    currentNumber:"1/3"
    },function(){this.Post();} );

    
    
  };

  render() {
    return (<div className="App">
      <div className="calc-wrapper">
      <Input input={this.state.input} />
      <div className="row">
      <Button handleClick={this.ClearHistory}>CH</Button>
        <Button handleClick={this.cube}>x<sup>3</sup></Button>
        <Button handleClick={this.square}>x<sup>2</sup></Button>
        <Button handleClick={this.remainder}>rem</Button>
        <Button handleClick={this.mod}>%</Button>
      </div>
        <div className="row">
        <Button handleClick={this.Back}><bold>Back</bold></Button>
          <Button handleClick={this.addToInput}>7</Button>
          <Button handleClick={this.addToInput}>8</Button>
          <Button handleClick={this.addToInput}>9</Button>
          <Button handleClick={this.divide}>/</Button>
        </div>
        <div className="row">
          <Button handleClick={this.squareroot}>2<sub>root</sub></Button>
          <Button handleClick={this.addToInput}>4</Button>
          <Button handleClick={this.addToInput}>5</Button>
          <Button handleClick={this.addToInput}>6</Button>
          <Button handleClick={this.multiply}>x</Button>
        </div>
        <div className="row">
          <Button handleClick={this.cuberoot}>3<sub>root</sub></Button>
          <Button handleClick={this.addToInput}>1</Button>
          <Button handleClick={this.addToInput}>2</Button>
          <Button handleClick={this.addToInput}>3</Button>
          <Button handleClick={this.add}>+</Button>
        </div>
        <div className="row">
        <Button handleClick={() => {;}}></Button>
        <Button handleClick={this.addDecimal}>.</Button>
        <Button handleClick={this.addZeroToInput}>0</Button>
        <Button handleClick={this.evaluate}>=</Button>
        <Button handleClick={this.subtract}>-</Button>
      </div>
      <div className="row">
        <ClearButton handleClear={() => this.setState({input:"",previousNumber:"",currentNumber:"",operator:"",BackCount:0})}>Clear</ClearButton>
      </div>
      </div>
    </div>
    ); 
  }
}

export default App;
