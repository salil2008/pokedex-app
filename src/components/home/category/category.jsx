import React from "react";
import { Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom"
import "./category.scss"

class Category extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      categories: [
        {
          id: 'all',
          displayName: 'All'
        },
        {
          id: 'category-1',
          displayName: 'Category 1'
        },
        {
          id: 'category-2',
          displayName: 'Category 2'
        }
      ]
    }
  }

  initializeNav = categories => {
    return categories.map((item, index) => <Nav.Item key={`category-item-${index}`}>
      <Link to={item.id}>{item.displayName}</Link>
    </Nav.Item>)
  }
  
  render = () => {
    return (
      <div className="pokedex-nav">
      <Col md={12}>
        <Nav
          variant="tabs">
          { this.state.categories && this.state.categories.length && this.initializeNav(this.state.categories) }
        </Nav>
      </Col></div>
    );
  }
}

export default Category;
