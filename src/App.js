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

const UserList = () => {

  return (
    <div id="user-list">
      <User />
    </div>
        
    
  )
}

class User extends React.Component {
  constructor() {
    super()
    this.componentDidMount = this.componentDidMount.bind(this)
    this.state = {
      userData: []
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
        const userData = users.map((user)=>{
          return (
            <ul>
              <li key={user.id + 1}>{user.name}</li>
              <li key={user.id + 2}>{user.online_status}</li>
            </ul>
          )
        })
        this.setState({userData: userData})  
        console.log('state', this.state.userData)
      })
    }
    

  render() {
    return (
      <div className="user-wrapper">
        {this.state.userData}
      </div>
    )
  }
  
}

export default App