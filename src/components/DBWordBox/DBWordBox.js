import React, { Component } from 'react'

export class DBWordBox extends Component {

  
  render() {

    const {word} = this.props;
    return (
      <li className="word-box">
        <h4>{word.original}</h4>
        <p>correct answer count: {word.correct_count}</p>
        <p>incorrect answer count: {word.incorrect_count}</p>
      </li>
    )
  }
}

export default DBWordBox
