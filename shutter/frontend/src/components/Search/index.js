import React from 'react';

//Импоритруем собственные компоненты
import ModelCriteria from '../SearchCriteria/ModelCriteria';
import PhotographerCriteria from '../SearchCriteria/PhotographerCriteria';
import VisagisteCriteria from '../SearchCriteria/VisagisteCriteria';
import BrandCriteria from '../SearchCriteria/BrandCriteria';

//Импоритруем готовые компоненты material design
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from "@material-ui/core/Typography";

//Стили
import useStyles from './style';

export default function (props) {
  //Стили
  const classes = useStyles();

  //Создаём нужные объекты из пропсов
  const profession = props.profession;
  const setProfession = v => props.setProfession(v);

  const search = props.search;
  const setSearch = v => props.setSearch(v);

  return (
    <Grid item xs>
      <Paper className={classes.paper}>
        <Typography gutterBottom>
          Поиск
        </Typography>
        <Typography gutterBottom>
          Категория
        </Typography>
        <ToggleButtonGroup
          value={profession}
          exclusive
          onChange={(event, newProfession) => setProfession(newProfession)}
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
          profession === 'model' ?
            <ModelCriteria
              searchState={search}
              setSearchState={v => setSearch(v)}
              setSearchResults={v => props.setSearchResults(v)}
              setMayBeFit={v => props.setMayBeFit(v)}
            />
            : ""
        }
        {
          profession === 'photographer' ?
            <PhotographerCriteria
              searchState={search}
              setSearchState={v => setSearch(v)}
              setSearchResults={v => props.setSearchResults(v)}
              setMayBeFit={v => props.setMayBeFit(v)}
            />
            : ""}
        {
          profession === 'visagiste' ?
            <VisagisteCriteria
              searchState={search}
              setSearchState={v => setSearch(v)}
              setSearchResults={v => props.setSearchResults(v)}
              setMayBeFit={v => props.setMayBeFit(v)}
            />
            : ""
        }
        {
          profession === 'brand' ?
            <BrandCriteria
              searchState={search}
              setSearchState={v => setSearch(v)}
              setSearchResults={v => props.setSearchResults(v)}
              setMayBeFit={v => props.setMayBeFit(v)}
            />
            : ""
        }
      </Paper>
    </Grid>
  )
}