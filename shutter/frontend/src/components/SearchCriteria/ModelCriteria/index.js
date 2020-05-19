import React from 'react';
import axios from 'axios';

//Импоритруем готовые компоненты material design
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';

//Стили
import useStyles from './style';

function contains(where, what) {
  for (var i = 0; i < what.length; i++) {
    if (where.indexOf(what[i]) !== -1) return true;
  }
  return false;
}

function inRange(val, arr) {
  return val >= arr[0] && val <= arr[1];
}

export default function (props) {
  //Стили
  const classes = useStyles();

  function doSearch() {
    const _user = props.user || JSON.parse(localStorage.user);

    let professionals = [];

    axios.get(window.location.origin + "/api/proffesionals/").then(({ data: professionalsData }) => {

      professionals = [...professionalsData];
      axios.get(window.location.origin + "/api/users/").then(({ data: usersData }) => {

        professionals.forEach(professional => {
          const user = usersData.find(user => professional.userInfo === user.id);
          professional.userInfo = { ...user };
        });

        const filteredProfessionals = professionals.filter(professional => {
          if (
            professional.profession === 'model'
            && professional.userInfo.id !== _user.id
            && (props.searchState['model'].city === '' || professional.city === props.searchState['model'].city)
            && (props.searchState['model'].sex === '' || professional.sex === props.searchState['model'].sex)
            && (props.searchState['model'].kindOfWork === '' || professional.kindOfWork === props.searchState['model'].kindOfWork)
            && (props.searchState['model'].genre.length === 0 || contains(professional.genre, props.searchState['model'].genre))
            && (professional.age && inRange(professional.age, props.searchState['model'].age))
            && (professional.height && inRange(professional.height, props.searchState['model'].height))
            && (professional.experience && inRange(professional.experience, props.searchState['model'].experience))
            && (professional.weight && inRange(professional.weight, props.searchState['model'].weight))
            && (professional.price && inRange(professional.price, props.searchState['model'].price))
          ) {
            return true;
          } else {
            if (
              professional.profession === 'model'
              && professional.userInfo.id !== _user.id
              && (props.searchState['model'].city === '' || professional.city === props.searchState['model'].city)
              && (props.searchState['model'].sex === '' || professional.sex === props.searchState['model'].sex)
              && (props.searchState['model'].genre.length === 0 || contains(professional.genre, props.searchState['model'].genre))
            ) {
              professional.mayBeFit = 0;
              if (!professional.age || !inRange(professional.age, props.searchState['model'].age)) {
                ++professional.mayBeFit;
              }
              if (!professional.height || !inRange(professional.height, props.searchState['model'].height)) {
                ++professional.mayBeFit;
              }
              if (!professional.experience || !inRange(professional.experience, props.searchState['model'].experience)) {
                ++professional.mayBeFit;
              }
              if (!professional.weight || !inRange(professional.weight, props.searchState['model'].weight)) {
                ++professional.mayBeFit;
              }
              if (!professional.kindOfWork || professional.kindOfWork !== props.searchState['model'].kindOfWork) {
                ++professional.mayBeFit;
              }
              if (professional.kindOfWork === 'price' && (!professional.price || !inRange(professional.price, props.searchState['model'].price))) {
                ++professional.mayBeFit;
              }
            }
            console.log(professional);
            return false;
          }
        });

        let mayBeFit = professionals.filter(professional => {
          return professional.mayBeFit && professional.mayBeFit <= 2;
        });


        filteredProfessionals.forEach(professional => {
          const searchWeightPrice = 1 - (professional.price - props.searchState['model'].price[0]) / (props.searchState['model'].price[1] - props.searchState['model'].price[0]);
          const searchWeightExperience = (professional.experience - props.searchState['model'].experience[0]) / (props.searchState['model'].experience[1] - props.searchState['model'].experience[0]);

          const searchWeight = searchWeightPrice + searchWeightExperience;
          professional.searchWeight = searchWeight;
        });

        const sortedProfessionals = filteredProfessionals.sort((a, b) => {
          if (a.searchWeight > b.searchWeight) return -1;
          else if (a.searchWeight < b.searchWeight) return 1;
          else return 0;
        });

        const sortedMayBeFit = mayBeFit.sort((a, b) => {
          if (a.mayBeFit > b.mayBeFit) return 1;
          else if (a.mayBeFit < b.mayBeFit) return -1;
          else return 0;
        });

        props.setSearchResults(sortedProfessionals);
        props.setMayBeFit(sortedMayBeFit);
      });
    });
  }

  return (
    <>
      <TextField
        className={classes.fieldMargin + " " + classes.fieldWidth}
        value={props.searchState['model'].city}
        onChange={(e) => {
          let state = { ...props.searchState['model'] };
          state.city = e.target.value;
          props.setSearchState({ ...props.searchState, 'model': state });
        }}
        label="Город"
      />
      <InputLabel className={classes.fieldMargin} id="sex-label">Пол</InputLabel>
      <Select
        labelId="sex-label"
        className={classes.fieldWidth}
        value={props.searchState['model'].sex}
        onChange={(e) => {
          let state = { ...props.searchState['model'] };
          state.sex = e.target.value;
          props.setSearchState({ ...props.searchState, 'model': state });
        }}
      >
        <MenuItem value={'man'}>Мужчина</MenuItem>
        <MenuItem value={'woman'}>Женщина</MenuItem>
      </Select>
      <Typography className={classes.fieldMargin} gutterBottom>
        Возраст
      </Typography>
      <Slider
        value={props.searchState['model'].age}
        onChange={(e, v) => {
          let state = { ...props.searchState['model'] };
          state.age = v;
          props.setSearchState({ ...props.searchState, 'model': state });
        }}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={0}
        max={100}
      />
      <Typography className={classes.fieldMargin} gutterBottom>
        Рост
      </Typography>
      <Slider
        value={props.searchState['model'].height}
        onChange={(e, v) => {
          let state = { ...props.searchState['model'] };
          state.height = v;
          props.setSearchState({ ...props.searchState, 'model': state });
        }}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={0}
        max={250}
      />
      <Typography className={classes.fieldMargin} gutterBottom>
        Вес
      </Typography>
      <Slider
        value={props.searchState['model'].weight}
        onChange={(e, v) => {
          let state = { ...props.searchState['model'] };
          state.weight = v;
          props.setSearchState({ ...props.searchState, 'model': state });
        }}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={0}
        max={200}
      />
      <Typography className={classes.fieldMargin} gutterBottom>
        Опыт
      </Typography>
      <Slider
        value={props.searchState['model'].experience}
        onChange={(e, v) => {
          let state = { ...props.searchState['model'] };
          state.experience = v;
          props.setSearchState({ ...props.searchState, 'model': state });
        }}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={0}
        max={20}
      />
      <InputLabel className={classes.fieldMargin} id="kindOfWork-label">Вид работы</InputLabel>
      <Select
        labelId="kindOfWork-label"
        className={classes.fieldWidth}
        value={props.searchState['model'].kindOfWork}
        onChange={(e) => {
          let state = { ...props.searchState['model'] };
          state.kindOfWork = e.target.value;
          props.setSearchState({ ...props.searchState, 'model': state });
        }}
      >
        <MenuItem value={'price'}>За оплату</MenuItem>
        <MenuItem value={'free'}>Бесплатно</MenuItem>
        <MenuItem value={'creativeProject'}>Творческий проект</MenuItem>
      </Select>
      {
        props.searchState['model'].kindOfWork === 'price' ?
          <div className={classes.price}>
            <div className={classes.price_field}>
              <InputLabel htmlFor="amountFrom">От</InputLabel>
              <Input
                id="amountFrom"
                className={classes.price_input}
                label="От"
                type="number"
                variant="outlined"
                value={props.searchState['model'].price[0]}
                onChange={(e) => {
                  let state = { ...props.searchState['model'] };
                  state.price[0] = e.target.value;
                  props.setSearchState({ ...props.searchState, 'model': state });
                }}
                startAdornment={<InputAdornment position="start">₽</InputAdornment>}
              />
            </div>
            <div className={classes.price_field}>
              <InputLabel htmlFor="amountTo">До</InputLabel>
              <Input
                id="amountTo"
                className={classes.price_input}
                label="До"
                type="number"
                variant="outlined"
                value={props.searchState['model'].price[1]}
                onChange={(e) => {
                  let state = { ...props.searchState['model'] };
                  state.price[1] = e.target.value;
                  props.setSearchState({ ...props.searchState, 'model': state });
                }}
                startAdornment={<InputAdornment position="start">₽</InputAdornment>}
              />
            </div>
          </div>
          : ""
      }
      <InputLabel className={classes.fieldMargin} id="genre-label">Жанры</InputLabel>
      <Select
        labelId="genre-label"
        className={classes.fieldWidth}
        multiple
        value={props.searchState['model'].genre}
        onChange={(e) => {
          let state = { ...props.searchState['model'] };
          state.genre = e.target.value;
          props.setSearchState({ ...props.searchState, 'model': state });
        }}
      >
        <MenuItem value={2}>Красота</MenuItem>
        <MenuItem value={3}>Мода</MenuItem>
        <MenuItem value={4}>Студия</MenuItem>
        <MenuItem value={5}>Стрит</MenuItem>
        <MenuItem value={6}>Творческие</MenuItem>
        <MenuItem value={7}>Показ мод</MenuItem>
        <MenuItem value={8}>Киносъёмки</MenuItem>
        <MenuItem value={9}>Одежда</MenuItem>
        <MenuItem value={10}>Бельё</MenuItem>
        <MenuItem value={11}>Спорт</MenuItem>
        <MenuItem value={1}>Эротика</MenuItem>
      </Select>
      <div className={classes.btnAlignment}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => doSearch()}
        >
          Найти
        </Button>
      </div>
    </>
  )
}