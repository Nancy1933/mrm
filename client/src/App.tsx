import { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import { getCurrentUser } from "./services/auth.service"; // Измененный импорт
import IUser from './types/user.type';

import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import Home from "./components/home.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

type State = {
  currentUser: IUser | null
}

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }

  componentDidMount() {
    const user = getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;