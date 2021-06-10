import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import PostDetails from './components/PostDetails'
import Home from './components/Home'

function App() {
  return (
  <>
    <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/postDetail/:id' component={PostDetails} />
        </Switch>
      </Router>
  </>
  );
}

export default App;
