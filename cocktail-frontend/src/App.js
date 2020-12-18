import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Login from './containers/Login';
import Register from './containers/Register';
import { useSelector } from 'react-redux';
import AddCocktail from './containers/AddCocktail';
import Cocktails from './containers/Cocktails';
import MyCocktails from './containers/MyCocktails';

const ProtectedRout = ({ isAllowed, redirectTo, ...props }) => {
  return isAllowed ? <Route {...props} /> : <Redirect to={redirectTo}/>;
};

const App = () => {
  const user = useSelector(state => state.user.userInfo);

  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path={'/'} exact component={Cocktails}/>
          <Route path={'/my-cocktails'} component={MyCocktails}/>
          <Route path='/add-cocktail' component={AddCocktail}/>
          <ProtectedRout
            path={'/login'}
            component={Login}
            isAllowed={!user}
            redirectTo={'/'}
          />
          <ProtectedRout
            path={'/register'}
            component={Register}
            isAllowed={!user}
            redirectTo={'/'}
          />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;