import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import "./home.scss";
import Logo from "../../pokedex.png";

import Category from "./category/category";
import List from "./list/list";

class Home extends React.Component {
  render() {
    return (
      <Router>
        <div className="pokedex">
          <div className="pokedex-logo">
            <img alt="" src={Logo} />
          </div>
          <div className="pokedex-wrapper">
            <Container className="pokedex-container">
              <Row className="bottom-border">
                <Category />
              </Row>
              <Row>
                <Switch>
                  <Route path="/:categoryId" component={List} />
                </Switch>
              </Row>
            </Container>
          </div>
        </div>
      </Router>
    );
  }
}

export default Home;
