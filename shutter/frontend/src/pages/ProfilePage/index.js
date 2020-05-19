import React from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";

//Импоритруем собственные
import Header from "../../components/Header";
import ModelCriteria from '../../components/ProfileCriteria/ModelCriteria';
import PhotographerCriteria from '../../components/ProfileCriteria/PhotographerCriteria';
import VisagisteCriteria from '../../components/ProfileCriteria/VisagisteCriteria';
import BrandCriteria from '../../components/ProfileCriteria/BrandCriteria';

//Импоритруем готовые компоненты material design
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

//Стили
import useStyles from './style';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function (props) {
  //Стили
  const classes = useStyles();

  let history = useHistory();

  //Объявляем state
  const [open, setOpen] = React.useState(false);
  const [profileInfo, setProfileInfo] = React.useState({
    professionalId: -1,
    profession: '',
    first_name: '',
    last_name: '',
    username: '',
    city: '',
    sex: '',
    age: 0,
    height: 0,
    weight: 0,
    experience: 0,
    kindOfWork: '',
    genre: [],
    direction: '',
    additional_info: '',
    price: 0,
    photo: 'media/images/default.png',
  });

  function saveInfo() {
    axios.put(`http://localhost:8000/api/proffesionals/${profileInfo.professionalId}/`, {
      profession: profileInfo.profession,
      city: profileInfo.city,
      sex: (profileInfo.profession === 'model' || profileInfo.profession === 'photographer' ? profileInfo.sex : ""),
      age: (profileInfo.profession !== 'brand' ? profileInfo.age : 0),
      height: (profileInfo.profession === 'model' ? profileInfo.height : 0),
      weight: (profileInfo.profession === 'model' ? profileInfo.weight : 0),
      experience: (profileInfo.profession !== 'brand' ? profileInfo.experience : 0),
      kindOfWork: (profileInfo.profession !== 'brand' ? profileInfo.kindOfWork : ""),
      genre: (profileInfo.profession !== 'brand' ? profileInfo.genre : []),
      direction: (profileInfo.profession === 'brand' ? profileInfo.direction : ""),
      additional_info: profileInfo.additional_info,
      price: (profileInfo.profession !== 'brand' ? profileInfo.price : 0),
    }).then(response => {
      setOpen(false);
      setTimeout(() => {
        setOpen(true);
      }, 300);
    });
  }

  function saveUserInfo() {
    if (!localStorage.token || localStorage.token.length <= 3) history.push("/");
    const user = props.user || JSON.parse(localStorage.user);
    if (user.id === undefined) return;
    axios.put(`http://localhost:8000/api/users/${user.id}/`, {
      username: user.username,
      password: user.password,
      first_name: profileInfo.first_name,
      last_name: profileInfo.last_name,
    }).then(response => {
      setOpen(false);
      setTimeout(() => {
        setOpen(true);
      }, 300);
    });
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  React.useEffect(() => {
    if (!localStorage.token || localStorage.token.length <= 3) history.push("/");
    const user = props.user || JSON.parse(localStorage.user);
    if (user.id === undefined) return;
    const state = { ...profileInfo };
    state.first_name = user.first_name;
    state.last_name = user.last_name;
    state.username = user.username;

    axios.get(`api/proffesionals/?id=${user.id}`).then(({ data }) => {
      state.professionalId = data[0].id;
      state.profession = data[0].profession || '';
      state.city = data[0].city || '';
      state.sex = data[0].sex || '';
      state.age = data[0].age || 0;
      state.height = data[0].height || 0;
      state.weight = data[0].weight || 0;
      state.experience = data[0].experience || 0;
      state.kindOfWork = data[0].kindOfWork || '';
      state.genre = data[0].genre || [];
      state.additional_info = data[0].additional_info || '';
      state.photo = data[0].photo || 'media/images/default.png';
      state.price = data[0].price || 0;
      state.direction = data[0].direction || '';

      setProfileInfo(state);
    });
  }, [props.user, localStorage.token]);

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Информация сохранена!
        </Alert>
      </Snackbar>
      <Header
        isAuth={props.isAuth}
        logOut={() => props.logOut()}
        badgeI={props.badgeI}
      />
      <Paper className={classes.main + " " + classes.paper}>
        <Typography className={classes.title} variant="h5" gutterBottom>
          Мой профиль / {profileInfo.username}
        </Typography>
        <Divider />
        <div className={classes.profileContent}>
          <div className={classes.profileImage}>
            <div className={classes.profileImage_image} style={{ backgroundImage: `url(${profileInfo.photo})` }}></div>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              type="file"
              onChange={(e) => {
                var oData = new FormData();
                oData.append("photo", e.target.files[0]);
                var xhr = new XMLHttpRequest();
                xhr.open("PUT", `http://localhost:8000/api/proffesionals/${profileInfo.professionalId}/`, true);
                xhr.onload = function (xhrEvent) {
                  setOpen(false);
                  setTimeout(() => {
                    setOpen(true);
                    location.reload();
                  }, 300);
                };
                xhr.send(oData);
              }}
            />
            <label className={classes.profileImage_button} htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload
            </Button>
            </label>
          </div>
          <div className={classes.profileContent_main}>
            <Typography className={classes.professionTitle + " " + classes.title} gutterBottom>
              Настройки аккаунта
            </Typography>
            <div className={classes.profileField}>
              <TextField
                className={classes.profileField_input}
                label="Имя"
                value={profileInfo.first_name}
                onChange={e => setProfileInfo({ ...profileInfo, first_name: e.target.value })}
              />
              <TextField
                className={classes.profileField_input}
                label="Фамилия"
                value={profileInfo.last_name}
                onChange={e => setProfileInfo({ ...profileInfo, last_name: e.target.value })}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => saveUserInfo()}
              >
                Сохранить
              </Button>
            </div>
            <Divider />
            <Typography className={classes.professionTitle + " " + classes.title} gutterBottom>
              Ваша профессия
            </Typography>
            <ToggleButtonGroup
              value={profileInfo.profession}
              exclusive
              onChange={(event, v) => setProfileInfo({ ...profileInfo, profession: v })}
              aria-label="text alignment"
            >
              <ToggleButton value="model">
                Модель
              </ToggleButton>
              <ToggleButton value="photographer">
                Фотограф
              </ToggleButton>
              <ToggleButton value="visagiste">
                Визажист
              </ToggleButton>
              <ToggleButton value="brand">
                Брэнд
              </ToggleButton>
            </ToggleButtonGroup>
            {
              profileInfo.profession === 'model' ?
                <ModelCriteria
                  searchState={profileInfo}
                  setSearchState={v => setProfileInfo(v)}
                />
                : ""
            }
            {
              profileInfo.profession === 'photographer' ?
                <PhotographerCriteria
                  searchState={profileInfo}
                  setSearchState={v => setProfileInfo(v)}
                />
                : ""}
            {
              profileInfo.profession === 'visagiste' ?
                <VisagisteCriteria
                  searchState={profileInfo}
                  setSearchState={v => setProfileInfo(v)}
                />
                : ""
            }
            {
              profileInfo.profession === 'brand' ?
                <BrandCriteria
                  searchState={profileInfo}
                  setSearchState={v => setProfileInfo(v)}
                />
                : ""
            }
            <Divider style={{ marginTop: 15 }} />
            <TextField
              className={classes.profileField_textbox}
              label="Дополнительная информация"
              multiline
              value={profileInfo.additional_info}
              onChange={e => setProfileInfo({ ...profileInfo, additional_info: e.target.value })}
            />
            <div className={classes.btnAlignment}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => saveInfo()}
              >
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      </Paper>
    </div >
  );
}
