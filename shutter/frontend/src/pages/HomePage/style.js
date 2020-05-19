import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  main: {
    margin: "80px 20px 0 20px",
    width: "calc(100% - 40px)"
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  mayBeFit: {
    marginTop: 30,
    marginBottom: 10,
  },
}));

export default useStyles;