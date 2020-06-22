import React from 'react'
import LanguageService from '../../services/language-service'

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
      <div>
        <header>
          <h2>Welcome to {language.name}!</h2>
        </header>
      </div>
    )
  }
}