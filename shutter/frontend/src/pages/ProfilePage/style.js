import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    color: "black"
  },
  main: {
    margin: "80px 100px 40px 100px",
    width: "calc(100% - 200px)"
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  input: {
    display: 'none',
  },
  profileImage: {
    marginTop: 15,
    marginBottom: 15,
    textAlign: "center",
    marginRight: 50
  },
  profileField: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  profileImage_image: {
    height: 250,
    width: 250,
    display: 'block',
    marginBottom: 20,
    borderRadius: 1000,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  profileContent: {
    display: 'flex'
  },
  profileContent_main: {
    width: '100%'
  },
  profileField_input: {
    width: 300,
    marginRight: 30
  },
  profileField_textbox: {
    width: '100%',
    marginTop: 15
  },
  professionTitle: {
    marginTop: 15,
    marginBottom: 10
  },
  btnAlignment: {
    textAlign: "right",
    marginTop: 15
  },
}));

export default useStyles;