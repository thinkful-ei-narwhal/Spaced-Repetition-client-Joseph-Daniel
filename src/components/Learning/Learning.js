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

  updateHead = () => {
    LanguageService.getLanguageHead()
      .then(data => {
        this.setState({ head: data})
        this.clearAnswer()
    })
  }

  renderAnsScreen() {
    return (
    <div className="DisplayContainer">
    <div className="DisplayScore">
      <p>Your total score is: {this.state.next.totalScore}</p><br/>
      <span>Correct Count: {this.state.head.wordCorrectCount}</span><br/>
      <span>Incorrect Count: {this.state.head.wordIncorrectCount}</span><br/>
      {this.state.next.isCorrect ? <h2>You were correct! :D</h2> : <h2>Good try, but not quite right :(</h2>}
    </div>
    <div className="DisplayFeedback">
        <p>The correct translation for {this.state.head.nextWord} was {this.state.next.answer} and you chose {this.state.input.value}!</p>
    </div>
      <Button
      onClick={() => {
        this.updateHead()
        }}
      >Try another word!</Button>
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
        <form className="answer-form" onSubmit={(e) => {
          e.preventDefault();
          this.handlePost();
        }}>
          <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
          <input type='text' id='learn-guess-input' name='learn-guess-input' value={this.state.input.value} onChange={e => this.setInput(e.target.value)}required/>
          <Button type='submit'
          >Submit your answer</Button>
        </form>
      </div>
    )
  }

  render() {
    return (
      <main>
        {this.state.answered ? this.renderAnsScreen() : this.renderUsual()}
      </main>
    )
    
  }
}

export default Learning


