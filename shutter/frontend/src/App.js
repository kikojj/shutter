import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from 'axios';

//Импорт страниц приложения
import { HomePage, LoginPage, RegistrationPage, ProfilePage, AnotherProfilePage, MessagesPage } from './pages';

export default function App() {
  //Инициализирую state
  const [user, _setUser] = React.useState({});
  const [token, _setToken] = React.useState("");
  const [isAuth, setAuth] = React.useState(false);

  //Header
  const [badgeI, setBadgeI] = React.useState(0);

  //Home Page
  const [searchResults, setSearchResults] = React.useState([]);
  const [mayBeFit, setMayBeFit] = React.useState([]);
  const [genres, setGenres] = React.useState([]);

  //Message Page
  const [dialogs, setDialogs] = React.useState([]);
  const [currentDialog, setCurrentDialog] = React.useState(undefined);

  //Search
  const [profession, setProfession] = React.useState('model');
  const [search, setSearch] = React.useState({
    'model': {
      city: '',
      sex: '',
      age: [0, 100],
      height: [0, 250],
      weight: [0, 200],
      experience: [0, 20],
      kindOfWork: '',
      price: [0, 1000000],
      genre: [],
    },
    'photographer': {
      city: '',
      sex: '',
      age: [0, 100],
      experience: [0, 20],
      kindOfWork: '',
      price: [0, 1000000],
      genre: [],
    },
    'visagiste': {
      city: '',
      age: [0, 100],
      experience: [0, 20],
      kindOfWork: '',
      price: [0, 1000000],
      genre: [],
    },
    'brand': {
      city: '',
      direction: '',
    },
  });

  function unSetStates() {
    _setUser({});
    _setToken("");
    setAuth(false);

    setBadgeI(0);

    setSearchResults([]);
    setMayBeFit([]);
    setGenres([]);

    setDialogs([]);
    setCurrentDialog(undefined);

    setProfession('model');
    setSearch({
      'model': {
        city: '',
        sex: '',
        age: [0, 100],
        height: [0, 250],
        weight: [0, 200],
        experience: [0, 20],
        kindOfWork: '',
        price: [0, 1000000],
        genre: [],
      },
      'photographer': {
        city: '',
        sex: '',
        age: [0, 100],
        experience: [0, 20],
        kindOfWork: '',
        price: [0, 1000000],
        genre: [],
      },
      'visagiste': {
        city: '',
        age: [0, 100],
        experience: [0, 20],
        kindOfWork: '',
        price: [0, 1000000],
        genre: [],
      },
      'brand': {
        city: '',
        direction: '',
      },
    });
  }

  function setToken(value) {
    _setToken(value);
    localStorage.setItem("token", JSON.stringify(value));
  }

  function setUser(value) {
    _setUser(value);
    localStorage.setItem("user", JSON.stringify(value));
  }

  function logOut(_token) {
    if (!_token) return;
    fetch(window.location.origin + '/api/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${_token}`
      }
    }).then(response => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      unSetStates();
    })
  }

  function updateMsg() {
    const user = JSON.parse(localStorage.user) || user;
    axios.get(window.location.origin + `/api/messages?id=${user.id}`).then(messagesResponse => {

      const _messages = messagesResponse.data;
      if (_messages.length === 0) return;
      axios.get(window.location.origin + `/api/proffesionals/`).then(professionalsResponse => {

        const professionals = professionalsResponse.data;
        axios.get(window.location.origin + `/api/users/`).then(usersResponse => {

          const users = usersResponse.data;
          professionals.forEach(professional => professional.userInfo = [users.find(user => user.id === professional.userInfo), professional.userInfo]);
          _messages.forEach(message => {
            message.userFrom = [professionals.find(professional => professional.userInfo[1] === message.userFrom), message.userFrom];
            message.userTo = [professionals.find(professional => professional.userInfo[1] === message.userTo), message.userTo];
          });

          _messages.sort((a, b) => {
            if (a.id > b.id) {
              return -1;
            }
            if (a.id < b.id) {
              return 1;
            }
            return 0;
          });

          let _dialogs = [];
          let _badgeI = 0;
          _messages.forEach(message => {
            if (!message.checked && message.userFrom[1] !== user.id) ++_badgeI;
            let check = _dialogs.find(dialog => {
              const _id = (user.id === message.userFrom[1] ? message.userTo[1] : message.userFrom[1]);
              if (_id === dialog.penFriend.userInfo[0].id) {
                dialog.messages.push({ ...message });
                return true;
              }
            });
            if (!check) {
              let _newDialog = {};
              const _penFriend = (user.id === message.userFrom[1] ? message.userTo[0] : message.userFrom[0]);
              _newDialog.penFriend = _penFriend;
              _newDialog.messages = [message];
              _dialogs.push(_newDialog);
            }
          });

          setDialogs(_dialogs);
          setBadgeI(_badgeI);
        });
      })
    });
  }

  React.useEffect(() => {
    let _token = token || JSON.parse(localStorage.getItem("token"));
    if (_token) {
      axios.get(window.location.origin + "/api/auth/user", {
        headers: {
          'Authorization': `Token ${_token}`
        }
      })
        .then(response => {
          setUser(response.data);
          setToken(_token);
          setAuth(true);
        })
        .catch(error => {
          console.log("Пользователь не существует!");
          setUser({});
          setToken("");
          setAuth(false);
        });
    } else {
      setUser({});
      setToken("");
      setAuth(false);
    }
  }, [token]);

  React.useEffect(() => {
    if (localStorage.token.length <= 3) return;
    updateMsg();
    let interval = setInterval(() => updateMsg(), 2000);

    return function () {
      clearInterval(interval);
    }
  }, [isAuth]);


  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage
            isAuth={isAuth}
            badgeI={badgeI}
            searchResults={searchResults}
            mayBeFit={mayBeFit}
            genres={genres}
            profession={profession}
            search={search}
            dialogs={dialogs}
            currentDialog={currentDialog}

            logOut={() => logOut(token)}
            setSearchResults={v => setSearchResults(v)}
            setMayBeFit={v => setMayBeFit(v)}
            setGenres={v => setGenres(v)}
            setProfession={v => setProfession(v)}
            setSearch={v => setSearch(v)}
            setDialogs={(v) => setDialogs(v)}
            setCurrentDialog={(v) => setCurrentDialog(v)}
          />
        </Route>
        <Route path="/profile" exact>
          <ProfilePage
            user={user}
            token={token}
            isAuth={isAuth}
            badgeI={badgeI}

            logOut={() => logOut(token)}
          />
        </Route>
        <Route path="/profile/:id" children={
          <AnotherProfilePage
            user={user}
            token={token}
            isAuth={isAuth}
            dialogs={dialogs}
            badgeI={badgeI}

            logOut={() => logOut(token)}
            setCurrentDialog={(v) => setCurrentDialog(v)}
          />
        } />
        <Route path="/im" exact>
          <MessagesPage
            user={user}
            token={token}
            isAuth={isAuth}
            dialogs={dialogs}
            currentDialog={currentDialog}
            badgeI={badgeI}

            logOut={() => logOut(token)}
            setDialogs={(v) => setDialogs(v)}
            setCurrentDialog={(v) => setCurrentDialog(v)}
          />
        </Route>
        <Route path="/login">
          <LoginPage
            user={user}
            token={token}
            isAuth={isAuth}
            setToken={(value) => setToken(value)}
            setUser={(value) => setUser(value)}
            setAuth={(value) => setAuth(value)}
          />
        </Route>
        <Route path="/registration">
          <RegistrationPage
            user={user}
            token={token}
            isAuth={isAuth}
            setToken={(value) => setToken(value)}
            setUser={(value) => setUser(value)}
            setAuth={(value) => setAuth(value)}
          />
        </Route>
      </Switch>
    </Router>
  );
}