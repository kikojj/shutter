import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  btnAlignment: {
    textAlign: "right",
    marginTop: 15
  },
  fieldWidth: {
    width: '100%',
  },
  fieldMargin: {
    marginTop: 15
  },
  price: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 15
  },
  price_field: {
    width: 'calc(50% - 10px)'
  },
  price_input: {
    width: '100%'
  }
}));

export default useStyles;