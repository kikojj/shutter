import React from 'react';

//Импоритруем готовые компоненты material design
import Slider from '@material-ui/core/Slider';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

//Стили
import useStyles from './style';

export default function (props) {
  //Стили
  const classes = useStyles();

  return (
    <>
      <TextField
        className={classes.fieldMargin + " " + classes.fieldWidth}
        value={props.searchState.city}
        onChange={e => props.setSearchState({ ...props.searchState, city: e.target.value })}
        label="Город"
        disabled={props.disabled ? true : false}
      />
      <InputLabel className={classes.fieldMargin} id="sex-label">Пол</InputLabel>
      <Select
        labelId="sex-label"
        className={classes.fieldWidth}
        value={props.searchState.sex}
        onChange={e => props.setSearchState({ ...props.searchState, sex: e.target.value })}
        disabled={props.disabled ? true : false}
      >
        <MenuItem value={'man'}>Мужчина</MenuItem>
        <MenuItem value={'woman'}>Женщина</MenuItem>
      </Select>
      <Typography className={classes.fieldMargin} gutterBottom>
        Возраст: {props.searchState.age}
      </Typography>
      <Slider
        value={props.searchState.age}
        onChange={(e, v) => props.setSearchState({ ...props.searchState, age: v })}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={0}
        max={100}
        disabled={props.disabled ? true : false}
      />
      <Typography className={classes.fieldMargin} gutterBottom>
        Опыт: {props.searchState.experience}
      </Typography>
      <Slider
        value={props.searchState.experience}
        onChange={(e, v) => props.setSearchState({ ...props.searchState, experience: v })}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={0}
        max={20}
        disabled={props.disabled ? true : false}
      />
      <InputLabel className={classes.fieldMargin} id="kindOfWork-label">Вид работы</InputLabel>
      <Select
        labelId="kindOfWork-label"
        className={classes.fieldWidth}
        value={props.searchState.kindOfWork}
        onChange={e => props.setSearchState({ ...props.searchState, kindOfWork: e.target.value })}
        disabled={props.disabled ? true : false}
      >
        <MenuItem value={'price'}>За оплату</MenuItem>
        <MenuItem value={'free'}>Бесплатно</MenuItem>
        <MenuItem value={'creativeProject'}>Творческий проект</MenuItem>
      </Select>
      {
        props.searchState.kindOfWork === 'price' ?
          <div className={classes.price_field}>
            <InputLabel htmlFor="amountFrom">Оплата</InputLabel>
            <Input
              id="amountFrom"
              className={classes.price_input}
              label="От"
              type="number"
              variant="outlined"
              value={props.searchState.price}
              onChange={e => props.setSearchState({ ...props.searchState, price: e.target.value })}
              startAdornment={<InputAdornment position="start">₽</InputAdornment>}
              disabled={props.disabled ? true : false}
            />
          </div>
          : ""
      }
      <InputLabel className={classes.fieldMargin} id="genre-label">Жанры</InputLabel>
      <Select
        labelId="genre-label"
        className={classes.fieldWidth}
        multiple
        value={props.searchState.genre}
        onChange={e => props.setSearchState({ ...props.searchState, genre: e.target.value })}
        disabled={props.disabled ? true : false}
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
    </>
  )
}