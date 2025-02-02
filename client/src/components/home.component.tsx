import { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div className="container">
        <h2>Добро пожаловать!</h2>
        <div className="nav-links">
          <Link to="/login" className="btn btn-primary">Войти</Link>
          <Link to="/register" className="btn btn-secondary">Регистрация</Link>
        </div>
      </div>
    );
  }
}