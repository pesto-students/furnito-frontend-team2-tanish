import React, { FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, InputLabel } from "@mui/material";
import useInput from "../../../hooks/input/use-input";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { reset, login } from "../../../features/auth/auth-slice";
import validateEmail from "../../../shared/utils/validation/email";
import { validatePasswordLength } from "../../../shared/utils/validation/length";
import { LoginUser } from "../../../features/auth/models/login-user";

function LoginPage() {
  const {
    text: email,
    shouldDisplayError: emailHasError,
    textChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    clearHandler: emailClearHandler,
  } = useInput(validateEmail);

  const {
    text: password,
    shouldDisplayError: passwordHasError,
    textChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    clearHandler: passwordClearHandler,
  } = useInput(validatePasswordLength);

  const clearForm = () => {
    emailClearHandler();
    passwordClearHandler();
  };

  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
    window.scroll(0, 0);
    if (isSuccess) {
      dispatch(reset());
      clearForm();
    }
  }, []);

  useEffect(() => {
    window.scroll(0, 0);
    if (!isAuthenticated) return;
    navigate("../home");
  }, [isAuthenticated, navigate]);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailHasError || passwordHasError) return;

    if (email.length === 0 || password.length === 0) return;

    const loginUser: LoginUser = { email, password };

    dispatch(login(loginUser));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Login to your account
            </h1>
            <form
              action="/login"
              onSubmit={onSubmitHandler}
              method="POST"
              className="space-y-4 md:space-y-6"
            >
              <div>
                <InputLabel htmlFor="email">Email</InputLabel>
                <TextField
                  fullWidth
                  value={email}
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                  error={emailHasError}
                  helperText={emailHasError ? "Enter your email" : ""}
                  type="email"
                  name="email"
                  id="email"
                  variant="outlined"
                  size="small"
                />
              </div>
              <div>
                <InputLabel htmlFor="password">Password</InputLabel>
                <TextField
                  fullWidth
                  value={password}
                  onChange={passwordChangeHandler}
                  onBlur={passwordBlurHandler}
                  error={passwordHasError}
                  helperText={
                    passwordHasError ? "Minimum 6 characters required" : ""
                  }
                  type="password"
                  name="password"
                  id="password"
                  variant="outlined"
                  size="small"
                  placeholder="Minimum 6 characters required"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-200 hover:bg-primary-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Login
              </button>
              <p className="text-sm font-light text-secondary-100">
                Do not have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-400 hover:underline"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
