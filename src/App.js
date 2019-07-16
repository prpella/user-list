import React from 'react'
import TimeAgo from 'react-timeago'
import './App.css'


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
        const users = data.items.filter((item) => item)
        const userData = users.map((user)=>{
          console.log(user)
          return (
            <div className="profile-card">
              <div className="profile-header">Headline</div>
              <img className="profile-image" alt={user.name}></img>
              <div className="profile-body">
                <p>{user.name}</p>
                <div>
                  Last Login: 
                  <TimeAgo date={user.last_login} />
                </div>
              </div>
            </div>
          )
        })
        this.setState({userData: userData})  
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