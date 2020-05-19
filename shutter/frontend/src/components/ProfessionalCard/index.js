import React from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

//Импоритруем готовые компоненты material design
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

//Стили
import useStyles from './style';

export default function RecipeReviewCard(props) {
  //Стили
  const classes = useStyles();

  let history = useHistory();

  function startMsg() {
    if (localStorage.token.length <= 2) {
      console.log("Login first");
      return;
    }
    let check = props.dialogs.find(dialog => dialog.penFriend.userInfo[1] === props.professional.userInfo.id);
    if (check) {
      props.setCurrentDialog(props.dialogs.indexOf(check));
      history.push("/im");
    } else {
      const data = {
        userFrom: JSON.parse(localStorage.user).id,
        userTo: props.professional.userInfo.id,
        text: "👋",
      };
      props.setCurrentDialog(0);
      axios.post(window.location.origin + "/api/messages/", data).then(response => {
        history.push("/im");
      });
    }
  }

  const genres = props.professional.genre.map((genre, key) => {
    return (
      <Chip
        key={key}
        className={classes.chip}
        label={props.genres.find(v => v.id === genre).title}
        color="primary"
      />
    )
  });

  let profession;
  switch (props.professional.profession) {
    case 'model':
      profession = "Модель";
      break;
    case 'photographer':
      profession = "Фотограф";
      break;
    case 'visagiste':
      profession = "Визажист";
      break;
    case 'brand':
      profession = "Брэнд";
      break;
  }

  let kindOfWork;
  switch (props.professional.kindOfWork) {
    case 'price':
      kindOfWork = "За оплату";
      break;
    case 'free':
      kindOfWork = "Бесплатно";
      break;
    case 'creativeProject':
      kindOfWork = "Творческий проект";
      break;
  }

  let direction;
  switch (props.professional.direction) {
    case 'photoshoot':
      direction = "Фотосессии";
      break;
    case 'impressions':
      direction = "Показы";
      break;
    case 'agencies':
      direction = "Агентства";
      break;
    case 'advertising':
      direction = "Реклама";
      break;
    case 'filming':
      direction = "Киносъёмки";
      break;
  }

  return (
    <Card className={classes.root}>
      <div className={classes.cardContent}>
        <div className={classes.media} style={{ backgroundImage: `url(${props.professional.photo})` }}></div>
        <CardContent className={classes.cardContent_text}>
          <Typography component="h5" variant="h5">
            {props.professional.userInfo.first_name} {props.professional.userInfo.last_name}{props.professional.age ? ", " + props.professional.age : ""}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.professional.city}, {profession}
          </Typography>
          {
            props.professional.height ?
              <Typography variant="subtitle1" color="textSecondary">
                Рост: {props.professional.height} см
                </Typography>
              : ""
          }
          {
            props.professional.weight ?
              <Typography variant="subtitle1" color="textSecondary">
                Вес: {props.professional.weight} кг
                </Typography>
              : ""
          }
          {
            props.professional.experience ?
              <Typography variant="subtitle1" color="textSecondary">
                Опыт: {props.professional.experience} г.
                </Typography>
              : ""
          }
          {
            props.professional.kindOfWork !== "" ?
              <Typography variant="subtitle1" color="textSecondary">
                Вид работы: {kindOfWork}
              </Typography>
              : ""
          }
          {
            props.professional.kindOfWork === "price" ?
              <Typography variant="subtitle1" color="textSecondary">
                Оплата: {props.professional.price}
              </Typography>
              : ""
          }
          {
            props.professional.genre.length > 0 ?
              <>
                <Typography variant="subtitle1" color="textSecondary">
                  Жанры:
                </Typography>
                {genres}
              </>
              : ""
          }
          {
            props.professional.direction !== "" && props.professional.direction !== null ?
              <Typography variant="subtitle1" color="textSecondary">
                Навправление: {direction}
              </Typography>
              : ""
          }
        </CardContent>
      </div>
      <div className={classes.card_actions}>
        <Button color="primary" onClick={() => history.push("profile/" + props.professional.id)}>
          Посмотреть профиль
        </Button>
        <Button color="primary" onClick={() => startMsg()}>
          Отправить сообщение
        </Button>
      </div>
    </Card >
  );
}
