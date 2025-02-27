import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './components/Home';
import Planning from './components/Planning';
import Appointments from './components/Appointments';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/planning">PLANNING</Link></li>
            <li><Link to="/appointments">APPUNTAMENTI</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/planning" component={Planning} />
          <Route path="/appointments" component={Appointments} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;