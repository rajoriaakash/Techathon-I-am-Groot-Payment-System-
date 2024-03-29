import React, { useState, useEffect } from 'react'
import { gapi } from 'gapi-script'
import axios from 'axios'
import './index.css'
import meru_logo from '../../assets/images/meru_logo.png'
import login_background from '../../assets/images/login_background.png'
import { Link, useNavigate } from 'react-router-dom'
// import { LOCAL_SERVER_URL } from '../../../config.js'

const Login = ({ loginUser }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    username: '',
    password: ''
  })
  function handleChange (e) {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const loginDataSend = () => {
    //     axios.post(`${LOCAL_SERVER_URL}/auth/login`, user).then(res => {
    //       if (user.username != null) {
    //         loginUser(user.username)
    //         localStorage.setItem('user', user.username)
    //       } else {
    //         navigate('/signup', { replace: true })
    //       }
    //     })
    navigate('/dashboard')
    console.log(user)
  }
  const [showloginButton, setShowloginButton] = useState(true)
  const [showlogoutButton, setShowlogoutButton] = useState(false)
  const onLoginSuccess = res => {
    console.log('Login Success:', res.profileObj)
    setShowloginButton(false)
    setShowlogoutButton(true)
  }

  const onLoginFailure = res => {
    console.log('Login Failed:', res)
  }

  useEffect(() => {
    function start () {
      gapi.client.init({
        clientId:
          '844876409508-6q7c4i2ruj575eapu43ji11k3ka1ho94.apps.googleusercontent.com',
        scope: 'username'
      })
    }
    gapi.load('client:auth2', start)
  }, [showloginButton])

  return (
    <div className='LoginContainer'>
      <div className='LoginDesign'>
        <img className='LoginDesignImage' src={login_background}></img>
      </div>
      <div className='LoginContent'>
        <div>
          <span className='TagOuter'>Pragati</span>
        </div>
        <div>
          <form method='post' className='LoginForm'>
            <div className='LoginInputBox'>
              <input
                type='username'
                name='username'
                value={user.username}
                className='LoginInput'
                placeholder='User Name'
                onChange={handleChange}
              />
              <input
                type='password'
                name='password'
                className='LoginInput'
                value={user.password}
                placeholder='Password'
                onChange={handleChange}
              />
            </div>
            <input
              type='button'
              className='LoginButton'
              onClick={loginDataSend}
              value='Log in'
              name='login'
            ></input>
          </form>
        </div>
      </div>
      <div className='LoginLogo'>
        <img className='LoginLogoImage' src={meru_logo}></img>
      </div>
    </div>
  )
}
export default Login
