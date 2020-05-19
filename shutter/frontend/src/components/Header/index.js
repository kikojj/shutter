import React from 'react';
import { useHistory } from "react-router-dom";

//Импоритруем готовые компоненты material design
import AccountCircle from "@material-ui/icons/AccountCircle";
import AppBar from "@material-ui/core/AppBar";
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import CameraIcon from '@material-ui/icons/Camera';

//Стили
import useStyles from './style';

export default function (props) {
  //Стили
  const classes = useStyles();

  let history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const badgeI = props.badgeI;

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar className={classes.header}>
        <Typography variant="h6" className={classes.title} onClick={() => history.push("/")}>
          <CameraIcon className={classes.logo} />
          Shutter
        </Typography>
        {props.isAuth ?
          <div>
            <Badge badgeContent={badgeI} color="secondary">
              <Button color="inherit" onClick={() => history.push("/im")}>Сообщения</Button>
            </Badge>
            <IconButton
              onClick={e => setAnchorEl(e.currentTarget)}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => history.push("/profile")}>Профиль</MenuItem>
              <MenuItem onClick={() => props.logOut()}>Выйти</MenuItem>
            </Menu>
          </div>
          :
          <Button color="inherit" onClick={() => history.push("/login")}>Войти</Button>
        }
      </Toolbar>
    </AppBar>
  )
}