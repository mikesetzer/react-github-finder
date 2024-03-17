import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }

  // Fetch users at load
  // async componentDidMount() {
  //   

  //   const res = await Axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   this.setState({ users: res.data, loading: false });
  // }

  // Search users request
  searchUsers = async (text) => {
    this.setState({ loading: true });

    const res = await Axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

    this.setState({ users: res.data.items, loading: false });
  }

  // Get a single user
  getUser = async (username) => {
    this.setState({ loading: true });

    const res = await Axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

    this.setState({ user: res.data, loading: false });
  }

  // Clear users from state
  clearUsers = () => this.setState({ users: [], loading: false })

  // Set alert for empty field
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type }});

    setTimeout(() => this.setState({ alert: null }), 5000);
  }

  render(){
    const { users, loading, alert, user } = this.state;

    return (
      <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert}/>
          <Routes>
            <Route 
              path='/' 
              element={
                <Fragment>
                  <Search 
                    searchUsers={this.searchUsers} 
                    clearUsers={this.clearUsers} 
                    showClear={users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Users loading = {loading} users = {users} />
                </Fragment>
              }
            />
            <Route 
              path='/about'
              element={<About />}
            />
            <Route 
              path='/user/:login'
              element ={ 
                <User 
                  user={user} 
                  getUser={this.getUser} 
                  loading={loading}
                />}
            />
          </Routes>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
