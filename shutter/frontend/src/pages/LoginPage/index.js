import React from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

//Импоритруем готовые компоненты material design
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import CameraIcon from '@material-ui/icons/Camera';

//Стили
import useStyles from './style';

export default function (props) {
  //Стили
  const classes = useStyles();

  let history = useHistory();

  //Объявляем state
  const [login, setLogin] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [loginError, setLoginError] = React.useState([false, ""]);

  function doLogin(username, password) {
    if (!username || !password) return;
    axios.post(window.location.origin + "/api/auth/login", { username, password }).then(response => {
      props.setUser(response.data.user);
      props.setToken(response.data.token);
      props.setAuth(true);
    }).catch(error => {
      setLoginError([true, "Неверный логин/пароль"]);
    });
  }

  React.useEffect(() => {
    if (props.isAuth) history.push("/");
  }, [props.isAuth]);

  return (
    <div className={classes.root}>
      <Paper className={classes.loginForm}>
        <Typography variant="h5" className={classes.title}><CameraIcon />Shutter</Typography>
        <Typography variant="h6" className={classes.title}>Вход</Typography>

        <TextField
          className={classes.loginForm_field}
          label="Логин"
          variant="outlined"
          value={login || ""}
          onChange={(e) => {
            setLogin(e.target.value);
            setLoginError([false, ""]);
          }}
          error={login === "" || loginError[0] ? true : false}
          helperText={login === "" ? "Введите логин" : loginError[0] ? loginError[1] : ""} />
        <TextField
          className={classes.loginForm_field}
          label="Пароль"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={password || ""}
          onChange={(e) => {
            setPassword(e.target.value);
            setLoginError([false, ""]);
          }}
          error={password === "" || loginError[0] ? true : false}
          helperText={password === "" ? "Введите пароль" : loginError[0] ? loginError[1] : ""} />

        <div className={classes.loginForm_actions}>
          <Button
            className={classes.loginForm_btnSignUp}
            onClick={() => history.push("/registration")}>
            Зарегистрироваться
          </Button>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => doLogin(login, password)}>
            Войти
          </Button>
        </div>
      </Paper>
    </div>
  )
}