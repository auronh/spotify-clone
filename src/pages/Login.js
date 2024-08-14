import { useLocalStorage } from '@uidotdev/usehooks'
import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  const [users, setUsers] = useLocalStorage('users')
  const [loggedin, setLoggedIn] = useLocalStorage('loggedin')

  const handleLogin = e => {
    e.preventDefault()

    const form = e.target.elements
    const email = form['email'].value
    const password = form['password'].value

    const ls_users = users.filter(user => (user.email === email && user.password === password))

    if(ls_users.length) {
      setLoggedIn(ls_users[0])
      window.location.href = 'http://localhost:3000/'
    } else {
      alert('Invalid credentials or/and user does not exist')
    }
  }

  return (
    <div className="d-flex flex-column align-items-center " style={{marginTop:"120px"}}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd4jbXkWaYRcqw7zkFheo1YSlmlUSaEZyQFw&s"
        alt=""
        style={{ height: "40px" }}
      />
      <h1 className="text-white text-center fw-bold fs-1 mt-3">
        Log in to Spotify
      </h1>
      <form action="POST" className="d-flex flex-column w-25 p-4" onSubmit={handleLogin}>
        <label htmlFor="email" className="text-white mb-1">
          Email Address
        </label>
        <input
          className="p-1 px-2 bg-transparent border text-white mb-3"
          type="email"
          name="email"
          placeholder="name@domain.com"
          required
        />
        <label htmlFor="password" className="text-white mb-1">
          Password
        </label>
        <input
          className="p-1 px-2 bg-transparent border text-white mb-3"
          type="password"
          name="password"
          required
        />
        <button
          type="submit"
          className="fw-semibold border-0 rounded-pill"
          style={{ height: "40px", backgroundColor: "#1DB954" }}
        >
          Log In
        </button>
      </form>
      <hr className="w-25 text-white mb-4" />
      <p className="text-white">
      Don't have an account? <Link to="/signup">Sign up for Spotify</Link>
      </p>
    </div>
  )
}

export default Login