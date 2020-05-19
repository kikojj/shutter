import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginForm: {
    padding: 32,
    textAlign: 'right'
  },
  loginForm_field: {
    display: 'flex',
    width: 350,
    marginBottom: 16
  },
  loginForm_actions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 40
  },
  loginForm_btnSignUp: {
    marginRight: 10
  }
}));

export default useStyles;