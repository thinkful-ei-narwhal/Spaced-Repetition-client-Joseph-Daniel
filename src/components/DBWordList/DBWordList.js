import React, { Component } from 'react'
import DBWordBox from '../DBWordBox/DBWordBox'

export class DBWordList extends Component {
  
  render() {

    const WordList = this.props.words.map((word, i) => {
      return <DBWordBox key={i} word={word}/>});
    
    return (
      <div className="word-list">
        {WordList}
      </div>
    )
  }
}

export default DBWordList
