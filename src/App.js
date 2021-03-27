import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import StoriesContainer from './StoriesContainer';
import CreatorContainer from './CreatorContainer';

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
