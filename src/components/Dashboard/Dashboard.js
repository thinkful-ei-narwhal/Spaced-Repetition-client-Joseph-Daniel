import React from 'react';
import { Link } from 'react-router-dom'
import LanguageService from '../../services/language-service';
import DBWordList from '../DBWordList/DBWordList';

export default class Dashboard extends React.Component {
  state = {
    language: '',
    words: [],
    error: null
  }

  componentDidMount() {
    LanguageService.getAllData()
      .then(data => {
        this.setState({ language: data.language, words: data.words })
      })
  }
  
  render() {
    const { language } = this.state
    return (
      <section className="dashboard">
        <header>
          <h2>Welcome to {language.name}!</h2> <img className="flagicon" src='https://icons.iconarchive.com/icons/wikipedia/flags/256/IT-Italy-Flag-icon.png' alt='italian flag icon'></img>
          <h4>Total correct answers: {language.total_score}</h4>
          <h3>Words to practice</h3>
        </header>
        <DBWordList words={this.state.words}/>
        <Link to='/learn'>Start practicing</Link>
      </section>
    )
  }
}