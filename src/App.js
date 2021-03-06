import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import StoriesContainer from './components/StoriesContainer';
import CreatorContainer from './components/CreatorContainer';

function App() {

  return (
      <Router>
        <Switch>
          <Route path='/creator/:id'>
              <CreatorContainer />
          </Route>
          <Route path='/'>
            <StoriesContainer />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
