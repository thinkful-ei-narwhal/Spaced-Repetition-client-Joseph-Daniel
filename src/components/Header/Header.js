import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div className='nav-text'>
        <div className='user-welcome-text'>
          Welcome, {this.context.user.name}!
        </div>
        <nav>
          <Link
            onClick={this.handleLogoutClick}
            to='/login' 
            className='logout-link'>
            Logout
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav>
        <Link to='/login' className='login-link'>Login</Link>
        {' '}
        <Link to='/register' className='signup-link'>Sign up</Link>
      </nav>
    )
  }

  render() {
    return (
      
        <header className="header">
          <h1>
            <Link to='/' className="app-name">
              Spaced repetition 
            </Link>
          </h1>
          <h1>Oratore <i className="fas fa-universal-access"></i></h1>
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </header>
        
      
    );
  }
}

export default Header
