import {Route , BrowserRouter , Switch ,Redirect } from 'react-router-dom'

import Home from './components/Home';
import Chats from './components/Chats';
import Login from './components/Login';
import {getId} from './components/Chats_Utils';


function App() {

  const {myid , fid} =getId();
  const Routes = (myid && fid)?(
      <>
          <Switch>
            <Route path="/" exact >
              <Home />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/chats" exact >
                      <Chats />
            </Route>
            <Redirect to='/Login'></Redirect>
          </Switch>
      </>
    ):
    (
      <>
      <Switch>
        <Route path="/" exact >
          <Home />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/chats" exact >
          <Chats />
        </Route>
        <Redirect to='/Login'></Redirect>
      </Switch>
    </>
    )

  return (
    <div className="App">
      <BrowserRouter>
        {Routes}
      </BrowserRouter>
    </div>
  );
}

export default App;
