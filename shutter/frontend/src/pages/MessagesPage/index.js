import React from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";

//Импоритруем собственные
import Header from "../../components/Header";

//Импоритруем готовые компоненты material design
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

//Стили
import useStyles from './style';

export default function (props) {
  let history = useHistory();
  const classes = useStyles();

  //Создаём нужные объекты из пропсов
  const dialogs = props.dialogs;
  const setDialogs = v => props.setDialogs(v);

  const currentDialog = props.currentDialog;
  const setCurrentDialog = v => props.setCurrentDialog(v);

  //Объявляем state
  const [msgText, setMsgText] = React.useState('');
  const [dialogsScroll, setDialogsScroll] = React.useState([]);

  //Создаём реф
  const msgArea = React.useRef();

  function sendMsg() {
    if (msgText === "") return;
    const user = JSON.parse(localStorage.user) || props.user;
    const data = {
      userFrom: user.id,
      userTo: dialogs[currentDialog].penFriend.userInfo[1],
      text: msgText
    };
    axios.post(window.location.origin + "/api/messages/", data).then(response => {
      setMsgText("");
      const _dialogs = [...dialogs];
      response.data.checked = true;
      _dialogs[currentDialog].messages.unshift(response.data);
      setDialogs(_dialogs);
    });
  }

  React.useEffect(() => {
    if (!localStorage.token || localStorage.token.length <= 3) history.push("/");
  }, []);

  React.useEffect(() => {
    if (msgArea.current) {
      msgArea.current.scrollTop = dialogsScroll[currentDialog] || msgArea.current.scrollHeight;
    }
  }, [currentDialog]);

  let dialogList = [];
  let messagesList = [];
  dialogList = dialogs.map((dialog, key) => {
    return (
      <ListItem
        key={key}
        alignItems="flex-start"
        button onClick={() => setCurrentDialog(key)}
        selected={currentDialog === key}
      >
        <ListItemAvatar>
          <Avatar alt={dialog.penFriend.userInfo[0].username} src={dialog.penFriend.photo} />
        </ListItemAvatar>
        <ListItemText
          primary={dialog.penFriend.userInfo[0].first_name === "" && dialog.penFriend.userInfo[0].last_name === "" ? dialog.penFriend.userInfo[0].username : dialog.penFriend.userInfo[0].first_name + " " + dialog.penFriend.userInfo[0].last_name}
          secondary={
            <Typography
              component="p"
              variant="body2"
              color="textPrimary"
            >
              {dialog.messages[0] && (dialog.messages[0].userFrom === JSON.parse(localStorage.user).id || dialog.messages[0].userFrom[0].userInfo[1] === JSON.parse(localStorage.user).id) ? "Я: " : ""}
              {dialog.messages[0] ? dialog.messages[0].text.substr(0, 20) : ""}{dialog.messages[0].text.length > 20 ? "..." : ""}
            </Typography>
          }
        />
        {
          dialog.messages[0] && !dialog.messages[0].checked ?
            <ListItemSecondaryAction>
              <span className={classes.msgChecked}></span>
            </ListItemSecondaryAction>
            : ""
        }
      </ListItem>
    )
  });

  if (dialogs.length > 0 && currentDialog !== undefined) {
    messagesList = dialogs[currentDialog].messages.map((msg, key) => {
      if (!msg.checked && msg.userFrom[1] === dialogs[currentDialog].penFriend.userInfo[1]) {
        axios.put(window.location.origin + `/api/messages/${msg.id}/`, { "checked": true });
      }
      if (msg.userFrom[1] === dialogs[currentDialog].penFriend.userInfo[1]) {
        return (
          <div key={key} className={classes.msgAlignment}>
            <Paper className={classes.message}>
              <Typography variant="body2">
                {msg.userFrom[0].userInfo[0].first_name + " " + msg.userFrom[0].userInfo[0].last_name}
              </Typography>
              {msg.text}
            </Paper>
          </div>
        )
      } else {
        return (
          <div key={key} className={classes.msgAlignment_myMessage}>
            <Paper className={classes.message + " " + classes.message_myMessage}>
              {msg.text}
            </Paper>
          </div>
        )
      }
    });
    messagesList.reverse();
  }

  return (
    <div className={classes.root}>
      <Header
        isAuth={props.isAuth}
        logOut={() => props.logOut()}
        badgeI={props.badgeI}
      />
      <div className={classes.msgRoot}>
        <Paper className={classes.dialogs}>
          <Typography className={classes.dialogsTitle} variant="h6">
            Ваши диалоги
          </Typography>
          <List className={classes.dialogsList}>
            {
              dialogList.length > 0 ?
                dialogList :
                <Typography className={classes.noDialogs} variant="body2" component="p">
                  У Вас ещё нет диалогов
                </Typography>
            }
          </List>
        </Paper>
        <Paper className={classes.messages}>
          {
            (dialogs.length > 0 && currentDialog !== undefined) ?
              <React.Fragment>
                <AppBar position="sticky">
                  <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                      <span style={{ cursor: 'pointer' }} onClick={() => history.push('profile/' + dialogs[currentDialog].penFriend.id)}>
                        {dialogs[currentDialog].penFriend.userInfo[0].first_name === "" && dialogs[currentDialog].penFriend.userInfo[0].last_name === "" ? dialogs[currentDialog].penFriend.userInfo[0].username : dialogs[currentDialog].penFriend.userInfo[0].first_name + " " + dialogs[currentDialog].penFriend.userInfo[0].last_name}
                      </span>
                      <IconButton
                        aria-label="info"
                        onClick={() => history.push('profile/' + dialogs[currentDialog].penFriend.id)}
                      >
                        <InfoOutlinedIcon style={{ color: "#fff" }} />
                      </IconButton>
                    </Typography>
                  </Toolbar>
                </AppBar>
                <div
                  className={classes.msgArea}
                  ref={msgArea}
                  onScroll={e => {
                    const _dialogsScroll = dialogsScroll;
                    _dialogsScroll[currentDialog] = e.target.scrollTop;
                    setDialogsScroll(_dialogsScroll);
                  }}>
                  {messagesList}
                </div>
                <div className={classes.typingArea}>
                  <TextField
                    className={classes.typingArea_input}
                    label="Сообщение"
                    multiline
                    rowsMax={10}
                    value={msgText}
                    onChange={e => setMsgText(e.target.value)}
                  />
                  <IconButton
                    aria-label="send"
                    color={msgText === "" ? "default" : "primary"}
                    onClick={() => sendMsg()}
                  >
                    <SendIcon />
                  </IconButton>
                </div>
              </React.Fragment>
              :
              <Typography className={classes.noMsg} variant="body1" component="p">
                Выберите диалог
              </Typography>
          }
        </Paper>
      </div>
    </div >
  );
}
