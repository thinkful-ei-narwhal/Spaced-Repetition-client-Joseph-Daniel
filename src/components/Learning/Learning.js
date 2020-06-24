import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import LanguageService from '../../services/language-service';
import Button from '../Button/Button';


export class Learning extends Component {


  state = {
    input: {value: '', touched: false},
    answered: false,
    next: {},
    head: {}
  }

  componentDidMount() {
    LanguageService.getLanguageHead()
      .then(data => {
        this.setState({ head: data})
      })
  }

  setInput = (i) => {
    this.setState({input: {value: i, touched: true}})
  }

  handlePost = () => {
    LanguageService.postGuess(this.state.input.value)
      .then(data => {
        this.setState({next: data, answered: true});
      })
  }

  clearAnswer = () => {
    this.setState({answered: false})
  }

  renderAnsScreen() {
    console.log(this.state.next);
    return (
      
    <div>
      <p>Total Score: {this.state.next.totalScore}</p>
      <p>Correct Count: {this.state.next.wordCorrectCount}</p>
      <p>Incorrect Count: {this.state.next.wordIncorrectCount}</p>
      {this.state.next.isCorrect ? <p>You got it correct</p> : <p>you got it incorrect</p>}
      <button
      onClick={() => this.clearAnswer()}
      >Next</button>
    </div>
    )
  }

  renderUsual() {
    return (
      <div className="learning-card">
        <h2>Translate the word:</h2><span>{this.state.head.nextWord}</span>
        <p>Your total score is: <b>{this.state.head.totalScore}</b></p>
        <div className="correct-incorrect">
          <p>You have answered this word correctly <b>{this.state.head.wordCorrectCount}</b> times.</p>
          <p>You have answered this word incorrectly <b>{this.state.head.wordIncorrectCount}</b> times.</p>
        </div>
        <form className="answer-form">
          <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
          <input type='text' id='learn-guess-input' name='learn-guess-input' value={this.state.input.value} onChange={e => this.setInput(e.target.value)}required/>
          <Button type='submit'
          onClick={(e) => {
            e.preventDefault();
            this.handlePost();
          }}>Submit your answer</Button>
        </form>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.state.answered ? this.renderAnsScreen() : this.renderUsual()}
      </div>
    )
    
  }
}

export default Learning


