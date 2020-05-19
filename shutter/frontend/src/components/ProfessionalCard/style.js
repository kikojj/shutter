import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: 20,
    width: 'calc(100% - 10px)',
  },
  cardContent: {
    display: 'flex'
  },
  media: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: 350,
    width: 300
  },
  cardContent_text: {
    width: 'calc(100% - 300px)'
  },
  chip: {
    marginRight: 5,
    marginBottom: 5
  },
  card_actions: {
    padding: '10px',
    backgroundColor: "#f9f9f9",
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
}));

export default useStyles;