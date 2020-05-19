import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    maxWidth: '100%',
  },
  msgRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  dialogs: {
    margin: "80px 20px 40px 100px",
    width: 400,
    maxHeight: 'calc(100vh - 120px)'
  },
  dialogsList: {
    maxHeight: 'calc(100vh - 175px)',
    overflow: "auto",
    '&::-webkit-scrollbar': {
      width: 5,
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  },
  messages: {
    margin: "80px 100px 40px 0",
    width: 'calc(100% - 600px)',
    height: 'calc(100vh - 120px)',
    display: 'flex',
    flexDirection: 'column'
  },
  dialogsTitle: {
    margin: '20px 0 0 16px',
  },
  noDialogs: {
    margin: '0 0 0 16px',
  },
  noMsg: {
    margin: '20px 0 0 16px',
  },
  msgChecked: {
    display: 'block',
    width: 7,
    height: 7,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 100
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  msgArea: {
    height: '100%',
    overflow: 'auto',
    overflowAnchor: 'auto',
    paddingBottom: 20,
    '&::-webkit-scrollbar': {
      width: 5,
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  },
  typingArea: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '20px'
  },
  typingArea_input: {
    width: '100%'
  },
  message: {
    margin: 20,
    padding: 10,
    display: 'inline-block',
    maxWidth: 'calc(100% - 120px)',
    wordWrap: 'break-word',
    margin: '20px 100px 0 20px',
  },
  message_myMessage: {
    margin: '20px 20px 0 100px',
  },
  msgAlignment: {
    textAlign: 'left'
  },
  msgAlignment_myMessage: {
    textAlign: 'right'
  }
}));

export default useStyles;