import React from "react";
import axios from "axios";

//Импоритруем собственные компоненты
import Header from "../../components/Header";
import Search from "../../components/Search";
import ProfessionalCard from "../../components/ProfessionalCard";

//Импоритруем готовые компоненты material design
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

//Стили
import useStyles from './style';

export default function (props) {
  //Стили
  const classes = useStyles();

  //Создаём нужные объекты из пропсов
  const searchResults = props.searchResults;
  const setSearchResults = v => props.setSearchResults(v);
  const mayBeFit = props.mayBeFit;
  const setMayBeFit = v => props.setMayBeFit(v);
  const genres = props.genres;
  const setGenres = v => props.setGenres(v);

  React.useEffect(() => {
    axios.get(window.location.origin + "/api/genre/").then(response => {
      setGenres(response.data);
    });
  }, []);

  let results = searchResults.map((result, key) => {
    return (
      <ProfessionalCard
        key={key}
        professional={result}
        genres={genres}
        dialogs={props.dialogs}
        setDialogs={v => props.setDialogs(v)}
        dialogs={props.dialogs}
        setDialogs={v => props.setDialogs(v)}
        currentDialog={props.currentDialog}
        setCurrentDialog={v => props.setCurrentDialog(v)}
      />
    )
  });

  let mayBeFitResults = mayBeFit.map((result, key) => {
    return (
      <ProfessionalCard
        key={key}
        professional={result}
        genres={genres}
        dialogs={props.dialogs}
        setDialogs={v => props.setDialogs(v)}
        currentDialog={props.currentDialog}
        setCurrentDialog={v => props.setCurrentDialog(v)}
      />
    )
  });

  return (
    <div className={classes.root}>
      <Header
        isAuth={props.isAuth}
        logOut={() => props.logOut()}
        badgeI={props.badgeI}
      />
      <Grid container spacing={3} className={classes.main}>
        <Grid item xs={8}>
          {
            results.length > 0 ?
              results :
              <Paper className={classes.paper}>Ничего не найдено</Paper>
          }
          {
            mayBeFitResults.length > 0 ?
              <>
                <Divider />
                <Typography className={classes.mayBeFit} variant="h6" gutterBottom>
                  Возможно Вам подойдут
                </Typography>
                {mayBeFitResults}
              </>
              : ""
          }
        </Grid>
        <Search
          setSearchResults={v => setSearchResults(v)}
          setMayBeFit={v => setMayBeFit(v)}
          profession={props.profession}
          setProfession={v => props.setProfession(v)}
          search={props.search}
          setSearch={v => props.setSearch(v)}
        />
      </Grid>
    </div >
  );
}
