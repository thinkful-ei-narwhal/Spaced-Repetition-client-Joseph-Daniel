import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import LanguageService from '../../services/language-service';
import Button from '../Button/Button';


export class Learning extends Component {

  state = {
    head: {}
  }

  componentDidMount() {
    LanguageService.getLanguageHead()
      .then(data => {
        this.setState({ head: data})
      })
  }

  render() {
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
          <input type='text' id='learn-guess-input' name='learn-guess-input' required/>
          <Button type='submit'>Submit your answer</Button>
        </form>
      </div>
    )
  }
}

export default Learning


