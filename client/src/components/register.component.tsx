import { Component } from "react";
import { Navigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../services/auth.service"; // Измененный импорт

type State = {
  successful: boolean,
  message: string
};

export default class Register extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      successful: false,
      message: ""
    };
  }

  validationSchema() {
    return Yup.object().shape({
      username: Yup.string()
        .required("Имя пользователя обязательно!")
        .min(3, "Минимум 3 символа")
        .max(20, "Максимум 20 символов"),
      email: Yup.string()
        .required("Email обязателен!")
        .email("Некорректный email"),
      password: Yup.string()
        .required("Пароль обязателен!")
        .min(6, "Минимум 6 символов"),
    });
  }

  handleSubmit = (values: { username: string; email: string; password: string }, 
                 { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    this.setState({
      message: "",
      successful: false
    });

    register(values.username, values.email, values.password).then(
      (response) => {
        this.setState({
          message: response.data.message,
          successful: true
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
          successful: false,
          message: resMessage
        });
        setSubmitting(false);
      }
    );
  };

  render() {
    const initialValues = {
      username: "",
      email: "",
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
                {!this.state.successful && (
                  <div>
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
                      <label htmlFor="email">Email</label>
                      <Field name="email" type="email" className="form-control" />
                      <ErrorMessage
                        name="email"
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
                        Зарегистрироваться
                      </button>
                    </div>
                  </div>
                )}

                {this.state.message && (
                  <div className="form-group">
                    <div
                      className={
                        this.state.successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
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