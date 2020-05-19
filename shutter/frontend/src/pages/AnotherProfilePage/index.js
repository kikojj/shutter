import React from "react";
import axios from 'axios';
import { useParams, useHistory } from "react-router-dom";

//Импоритруем собственные компоненты
import Header from "../../components/Header";
import ModelCriteria from '../../components/ProfileCriteria/ModelCriteria';
import PhotographerCriteria from '../../components/ProfileCriteria/PhotographerCriteria';
import VisagisteCriteria from '../../components/ProfileCriteria/VisagisteCriteria';
import BrandCriteria from '../../components/ProfileCriteria/BrandCriteria';

//Импоритруем готовые компоненты material design
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

//Стили
import useStyles from './style';

export default function (props) {
  //Стили
  const classes = useStyles();

  let history = useHistory();
  let { id } = useParams();

  //Создаем state
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
    photo: window.location.origin + '/media/images/default.png',
    price: 0,
  });

  function startMsg() {
    if (localStorage.token.length <= 2) {
      console.log("Login first");
      return;
    }
    axios.get(window.location.origin + `/api/proffesionals/${id}/`).then(response => {
      let check = props.dialogs.find(dialog => dialog.penFriend.userInfo[1] === response.data.userInfo);
      if (check) {
        props.setCurrentDialog(props.dialogs.indexOf(check));
        history.push("/im");
      } else {

        const data = {
          userFrom: JSON.parse(localStorage.user).id,
          userTo: response.data.userInfo,
          text: "👋",
        };
        props.setCurrentDialog(0);
        axios.post(window.location.origin + "/api/messages/", data).then(resp => {
          history.push("/im");
        });
      }
    });
  }

  React.useEffect(() => {
    if (!id) return;
    const state = { ...profileInfo };
    axios.get(`${window.location.origin}/api/proffesionals/${id}/`).then(({ data }) => {
      state.professionalId = data.id;
      state.profession = data.profession || '';
      state.city = data.city || '';
      state.sex = data.sex || '';
      state.age = data.age || 0;
      state.height = data.height || 0;
      state.weight = data.weight || 0;
      state.experience = data.experience || 0;
      state.kindOfWork = data.kindOfWork || '';
      state.genre = data.genre || [];
      state.additional_info = data.additional_info || '';
      state.photo = data.photo || window.location.origin + '/media/images/default.png';
      state.price = data.price || 0;
      state.direction = data.direction || "";

      axios.get(`${window.location.origin}/api/users/${data.userInfo}/`).then((res) => {
        state.first_name = res.data.first_name;
        state.last_name = res.data.last_name;
        state.username = res.data.username;
        setProfileInfo(state);
      });

    });
  }, [props.user]);

  return (
    <div className={classes.root}>
      <Header
        isAuth={props.isAuth}
        logOut={() => props.logOut()}
        badgeI={props.badgeI}
      />
      <Paper className={classes.main + " " + classes.paper}>
        <Typography className={classes.title} variant="h5" gutterBottom>
          Профиль / {profileInfo.username}
        </Typography>
        <Divider />
        <div className={classes.profileContent}>
          <div className={classes.profileImage}>
            <div className={classes.profileImage_image} style={{ backgroundImage: `url(${profileInfo.photo})` }}></div>
            <Button
              variant="contained"
              color="primary"
              component="span"
              onClick={() => startMsg()}
            >
              Написать сообщение
            </Button>
          </div>
          <div className={classes.profileContent_main}>
            <div className={classes.profileField}>
              <TextField
                className={classes.profileField_input}
                label="Имя"
                value={profileInfo.first_name}
                disabled
              />
              <TextField
                className={classes.profileField_input}
                label="Фамилия"
                value={profileInfo.last_name}
                disabled
              />
            </div>
            <Divider />
            <Typography className={classes.professionTitle} gutterBottom>
              Профессия
            </Typography>
            <ToggleButtonGroup
              value={profileInfo.profession}
              exclusive
              aria-label="text alignment"
              disabled
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
                  disabled
                />
                : ""
            }
            {
              profileInfo.profession === 'photographer' ?
                <PhotographerCriteria
                  searchState={profileInfo}
                  setSearchState={v => setProfileInfo(v)}
                  disabled
                />
                : ""}
            {
              profileInfo.profession === 'visagiste' ?
                <VisagisteCriteria
                  searchState={profileInfo}
                  setSearchState={v => setProfileInfo(v)}
                  disabled
                />
                : ""
            }
            {
              profileInfo.profession === 'brand' ?
                <BrandCriteria
                  searchState={profileInfo}
                  setSearchState={v => setProfileInfo(v)}
                  disabled
                />
                : ""
            }
            <Divider style={{ marginTop: 15 }} />
            <TextField
              className={classes.profileField_textbox}
              label="Дополнительная информация"
              multiline
              value={profileInfo.additional_info}
              disabled
            />
          </div>
        </div>
      </Paper>
    </div >
  );
}
