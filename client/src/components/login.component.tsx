import { Component } from "react";
import { Navigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../services/auth.service"; // Измененный импорт

type State = {
  redirect: string | null,
  message: string,
  loading: boolean
};

export default class Login extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      redirect: null,
      message: "",
      loading: false
    };
  }

  validationSchema() {
    return Yup.object().shape({
      username: Yup.string().required("Это поле обязательно!"),
      password: Yup.string().required("Это поле обязательно!"),
    });
  }

  handleSubmit = (values: { username: string; password: string }, 
                 { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    this.setState({
      message: "",
      loading: true
    });

    login(values.username, values.password).then(
      () => {
        this.setState({
          redirect: "/profile"
        });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          loading: false,
          message: resMessage
        });
        setSubmitting(false);
      }
    );
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const initialValues = {
      username: "",
      password: "",
    };

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <Formik
            initialValues={initialValues}
            validationSchema={this.validationSchema}
            onSubmit={this.handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="username">Логин</label>
                  <Field name="username" type="text" className="form-control" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Пароль</label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={isSubmitting}
                  >
                    {this.state.loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Войти</span>
                  </button>
                </div>

                {this.state.message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {this.state.message}
                    </div>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}