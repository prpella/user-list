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
    .then(userData => {
      const userIds = userData.items.map(user => user.id)
      const userIdsParams = userIds.map(id => 'ids=' + id).join('&')
      const userDetails = fetch('/api/profiles?' + userIdsParams)
      .then(results => results.json())
      .then(profileData => {
        return profileData.map((profile) => {
          const id = profile.id
          const user = userData.items.find((user) => user.id === id)
          console.log(id, user, profile)
          return {id, profile, user}
        })
      })
      console.log(userDetails)
      return userDetails
    })
    .then(data => {
      console.log('data', data)
        const userData = data.map((user)=>{
          console.log(user)
          return (
            <div className="profile-card" key="{user.id}">
              <div className="profile-header">Headline</div>
              {user.user.picture && user.user.picture.url && <img className="profile-image" src={user.user.picture.url} alt={user.user.name} />}
              <div className="profile-body">
                <p>{user.user.name}</p>
                <div>
                  Last Login: 
                  <TimeAgo date={user.user.last_login} />
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