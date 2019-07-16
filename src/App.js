import React from 'react';
import './App.css';


//const request = require('request')

class App extends React.Component {
  
  render () {
    return (
      <main className="main">
        <UserList />
      </main>
    )
  }
}

console.log()

const UserList = () => {

  return (
    <ul>
      <li>
        <User />
      </li>
    </ul>
  )
}

class User extends React.Component {
  constructor() {
    super()
    this.state = {
      userName: []
    }
  }

  componentDidMount() {
    fetch('/api/search?length=32')
    .then(results => {
      return results.json()
    }).then(data => {
      console.log(data)
        const users = data.items.filter((item) => item)
        console.log('users ', users)
        const userName = users.map((user)=>{
          return (
            <ul>
              <li>{user.name}</li>
            </ul>
          )
        })
        this.setState({userName})  
        console.log('state', this.state.userName)
      })
    }
    

  render() {
    return (
      <div className="user-wrapper">
        {this.state.userName}
      </div>
    )
  }
  
}

export default App