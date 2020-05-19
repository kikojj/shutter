import React from 'react';

//Импоритруем готовые компоненты material design
import TextField from "@material-ui/core/TextField";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

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
      <InputLabel
        className={classes.fieldMargin}
        id="direction-label"
        disabled={props.disabled ? true : false}
      >
        Вид работы
      </InputLabel>
      <Select
        labelId="direction-label"
        className={classes.fieldWidth}
        value={props.searchState.direction}
        onChange={e => props.setSearchState({ ...props.searchState, direction: e.target.value })}
        disabled={props.disabled ? true : false}
      >
        <MenuItem value={'photoshoot'}>Фотосессии</MenuItem>
        <MenuItem value={'impressions'}>Показы</MenuItem>
        <MenuItem value={'agencies'}>Агентства</MenuItem>
        <MenuItem value={'advertising'}>Реклама</MenuItem>
        <MenuItem value={'filming'}>Киносъёмки</MenuItem>
      </Select>
    </>
  )
}