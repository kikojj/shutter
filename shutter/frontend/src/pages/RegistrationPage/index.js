import React from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

//Импоритруем готовые компоненты material design
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
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
  const [confirmPassword, setConfirmPassword] = React.useState(null);
  const [registartionError, setRegistartionError] = React.useState([false, ""]);

  function doRegistration(username, password) {
    if (!username || !password || password !== confirmPassword) return;
    axios.post(window.location.origin + "/api/auth/register", { username, password }).then(response => {
      axios.post(window.location.origin + "/api/proffesionals/", { userInfo: response.data.user.id }).then(res => {
        props.setUser(response.data.user);
        props.setToken(response.data.token);
        props.setAuth(true);
      });
    }).catch(e => {
      setRegistartionError([true, "Пользователь уже существует!"]);
    });
  }

  React.useEffect(() => {
    if (props.isAuth) history.push("/profile");
  }, [props.isAuth]);

  return (
    <div className={classes.root}>
      <Paper className={classes.loginForm}>
        <Typography variant="h5" className={classes.title}><CameraIcon />Shutter</Typography>
        <Typography className={classes.title} variant="h6"> Регистрация</Typography>

        <TextField
          className={classes.loginForm_field}
          label="Логин"
          variant="outlined"
          value={login || ""}
          onChange={(e) => {
            setLogin(e.target.value);
            setRegistartionError([false, ""]);
          }}
          error={login === "" || registartionError[0] ? true : false}
          helperText={login === "" ? "Введите логин" : registartionError[0] ? registartionError[1] : ""} />
        <TextField
          className={classes.loginForm_field}
          label="Пароль"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
          error={password === "" || registartionError[0] ? true : false}
          helperText={password === "" ? "Введите пароль" : ""} />
        <TextField
          className={classes.loginForm_field}
          label="Подтвердите пароль"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={confirmPassword || ""}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPassword !== password || registartionError[0] ? true : false}
          helperText={confirmPassword !== password ? "Пароли не совпадают" : ""} />

        <div className={classes.loginForm_actions}>
          <Button
            className={classes.loginForm_btnSignUp}
            onClick={() => history.push("/login")}>
            Войти
          </Button>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => doRegistration(login, password)}>
            Зарегистрироваться
          </Button>
        </div>
      </Paper>
    </div>
  )
}