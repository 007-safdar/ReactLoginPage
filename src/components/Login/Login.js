import React, { useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const reducerFn = (state, action) => {
  if (action.type === "ON_USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  } else if (action.type === "ON_USER_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const reducerFnPass = (state, action) => {
  if (action.type === "ON_USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  } else if (action.type === "ON_USER_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  return { value: "", isValid: null };
};
const Login = (props) => {
  //const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [reducerEmail, dispatchEmail] = useReducer(reducerFn, {
    value: "",
    isValid: null
  });
  const [reducerPass, dispatchPass] = useReducer(reducerFnPass, {
    value: "",
    isValid: null
  });

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "ON_USER_INPUT", val: event.target.value });
    setFormIsValid(
      event.target.value.includes("@") && reducerPass.value.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
    dispatchPass({ type: "ON_USER_INPUT", val: event.target.value });
    setFormIsValid(
      event.target.value.trim().length > 6 && reducerEmail.isValid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "ON_USER_BLUR" });
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPass({ type: "ON_USER_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(reducerEmail.value, reducerPass.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            reducerEmail.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={reducerEmail.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            reducerPass.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={reducerPass.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
