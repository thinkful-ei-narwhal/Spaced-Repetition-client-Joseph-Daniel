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
      <div className='header'>
        <header>
          <h1>
            <Link to='/' className="app-name">
              Oratore <i className="fas fa-universal-access"></i>
            </Link>
          </h1>
        </header>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </div>
    );
  }
}

export default Header
