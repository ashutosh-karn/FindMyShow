import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import Login from './Login';

function App() {
  return (
    <Router>
      {/* <div> */}
        <Routes>
          <Route exact path="/" component={Homepage} />
          <Route path="/login" component={Login} />
        </Routes>
      {/* </div> */}
    </Router>
  );
}

export default App;
