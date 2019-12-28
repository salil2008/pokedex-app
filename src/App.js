import React from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.


import Home from './components/home/home'

export default function App() {
  return (
    // <Router>
    //   <div>
    //     <ul>
    //       <li>
    //         <Link to="/">Home</Link>
    //       </li>
    //     </ul>

    //     <hr />

    //     <Switch>
    //       <Route exact path="/">
    //         <Home />
    //       </Route>
    //     </Switch>
    //   </div>
    // </Router>

    <Home />
  );
}
