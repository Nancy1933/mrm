import { Component } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/auth.service"; // Измененный импорт
import IUser from "../types/user.type";

type Props = {};

type State = {
  redirect: string | null,
  currentUser: IUser | null
};

export default class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      redirect: null,
      currentUser: null,
    };
  }

  componentDidMount() {
    const currentUser = getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/login" });
    else this.setState({ currentUser: currentUser });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {currentUser && (
  <div>
    <h3>
      <strong>{currentUser.username}</strong> Профиль
    </h3>
      {currentUser.accessToken && (
        <p>
          <strong>Токен:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
      )}
      {currentUser.id && (
        <p>
          <strong>ID:</strong> {currentUser.id}
        </p>
      )}
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
    </div>
  )}
      </div>
    );
  }
}