import React from 'react';
import axios from 'axios';

//Импоритруем готовые компоненты material design
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

//Стили
import useStyles from './style';

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
            professional.profession === 'brand'
            && professional.userInfo.id !== _user.id
            && (props.searchState['brand'].city === '' || professional.city === props.searchState['brand'].city)
            && (props.searchState['brand'].direction === '' || professional.direction === props.searchState['brand'].direction)
          ) {
            return true;
          } else {
            return false;
          }
        });

        props.setSearchResults(filteredProfessionals);
      });
    });
  }

  return (
    <>
      <TextField
        className={classes.fieldMargin + " " + classes.fieldWidth}
        value={props.searchState['brand'].city}
        onChange={(e) => {
          let state = { ...props.searchState['brand'] };
          state.city = e.target.value;
          props.setSearchState({ ...props.searchState, 'brand': state });
        }}
        label="Город"
      />
      <InputLabel className={classes.fieldMargin} id="direction-label">Вид работы</InputLabel>
      <Select
        labelId="direction-label"
        className={classes.fieldWidth}
        value={props.searchState['brand'].direction}
        onChange={(e) => {
          let state = { ...props.searchState['brand'] };
          state.direction = e.target.value;
          props.setSearchState({ ...props.searchState, 'brand': state });
        }}
      >
        <MenuItem value={'photoshoot'}>Фотосессии</MenuItem>
        <MenuItem value={'impressions'}>Показы</MenuItem>
        <MenuItem value={'agencies'}>Агентства</MenuItem>
        <MenuItem value={'advertising'}>Реклама</MenuItem>
        <MenuItem value={'filming'}>Киносъёмки</MenuItem>
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