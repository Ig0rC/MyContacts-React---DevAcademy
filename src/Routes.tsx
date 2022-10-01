import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import EditContact from './pages/EditContact';
import NewContact from './pages/NewContact';

function Routes(): JSX.Element {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/new" component={NewContact} />
      <Route path="/edit/:id" component={EditContact} />
    </Switch>
  );
}

export default Routes;
