import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import { reactWords } from "./words";
import state1 from "./hangmandrawings/state1.gif";
import state2 from './hangmandrawings/state2.gif';
import state3 from "./hangmandrawings/state3.gif";
import state4 from "./hangmandrawings/state4.gif";
import state5 from "./hangmandrawings/state5.gif";
import state6 from "./hangmandrawings/state6.gif";
import state7 from "./hangmandrawings/state7.gif";
import state8 from "./hangmandrawings/state8.gif";
import state9 from "./hangmandrawings/state9.gif";
import state10 from "./hangmandrawings/state10.gif";
import state11 from "./hangmandrawings/state11.gif";


class Hangman extends Component{
    static defaultProps ={
        images :[state1,state2,state3,state4,state5,state6,state7,state8,state9,state10,state11],
        maxWrong :11,
        
    };

    //define the initail state
    constructor (props){
        super(props);
        this.state={
            noOFWrong:0,
            guessed:new Set(),
            answear:reactWords(),
        };
        this.handleGuess=this.handleGuess.bind(this);
        this.reset=this.reset.bind(this);
    }

    //restarting the game 
    reset(){
        this.setState({
            noOFWrong:0,
            guessed:new Set(),
            answear:reactWords(),
        });
    }


    //method to guess the words
    guessedWord(){
        return this.state.answear.split("")
        .map((letter)=>(this.state.guessed.has(letter) ? letter:"_ "));
    }

    //handle guess function 
    handleGuess (e){
        let letter =e.target.value;
         this.setState((st) =>({guessed:st.guessed.add(letter),
            noOFWrong:st.noOFWrong + (st.answear.includes(letter)?0:1)
        }))

        // let addWord = this.state.noOFWrong;
        // if (!(this.state.answear.includes(letter))){
        //     addWord++;
        // }
        // this.setState((st)=>({
        //     guessed:st.guessed.add(letter),
        //     noOFWrong:addWord,
        //}));
    }

    //on screen keyboard
    generateKeypad(){
        return "abcdefghijklmnopqrstuvwxyz".split("").map((letter)=>(
            <button key ={letter} 
            value ={letter} 
            onClick={this.handleGuess}
             disabled={this.state.guessed.has(letter)}>
                {letter}
            </button>
        ));

        
    }
    render(){
        let gameOver=this.state.noOFWrong >= this.props.maxWrong;
        const isWinner =this.guessedWord().join("")===this.state.answear;
        let gameState= this.generateKeypad();
        if (isWinner) gameState="Congrats";
        if (gameOver) gameState="boo"
        let  restart= gameOver|| isWinner;

        return (
            <div className="Hangman">
                <h2>Hangman</h2>
                 <img src= {this.props.images[this.state.noOFWrong]} alt="Hangman" /> 
                 <p>
                     Guessed Left :{this.props.maxWrong - this.state.noOFWrong} / {""} {this.props.maxWrong}
                </p> 
                <p>Guess the Word</p>
                <p className="=Hangman-word">
                    {!gameOver?this.guessedWord():this.state.answear}
                     {/* {!(this.state.noOFWrong >= this.props.maxWrong)? <span>{this.guessedWord}</span>:<span>{this.state.answear}</span>} */}
                </p> 
                <p className="Hangman-buttons">
                    {gameState}
                </p> 
        
                {
                    restart && (
                        <button id ="reset" onClick={this.reset}>
                            Restart
                        </button>
                    )
                } 
            </div>
        );

       }
}

export default Hangman;



