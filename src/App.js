import React from 'react'
import TimeAgo from 'react-timeago'
import './App.css'

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
    .then(results => results.json())
    .then(data => {
      const userIds = data.items.map(user => user.id)
      const userIdsParams = userIds.map(id => 'ids=' + id).join('&')
      const profiles = fetch('/api/profiles?' + userIdsParams)
      .then(results => results.json())
      console.log(data)
      console.log(profiles)
      return {users: data.items, profiles}
    })
    .then(data => {
        const userData = data.items.map((user)=>{
          //fetch('/api/profiles?ids=' + user.id)
          console.log(user)
          return (
            <div className="profile-card" key="{user.id}">
              <div className="profile-header">Headline</div>
              {user.picture && user.picture.url && <img className="profile-image" src={user.picture.url} alt={user.name} />}
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