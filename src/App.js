import React from 'react';
import './App.css';

class App extends React.Component {
  render () {
    return (
      <main className="main">
        <UserList />
      </main>
    )
  }
}

const UserList = () => {

  return (
    <ul>
      <li>
        <User />
      </li>
    </ul>
  )
}

const User = () => {
  return (
    <div>
      <li>Headline</li>
      <li>UserAame</li>
      <li>UserAge</li>
      <li>Location</li>
      <li>Last Login</li>
    </div>
  )
}

export default App