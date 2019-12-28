import React from "react";
import { Row, Col, InputGroup, Spinner } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

import "./list.scss";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "white",
  padding: grid
});

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      items: [],
      orderedItemsList: []
    };
  }

  fetchDetails = async () => {
    const categoryId =
      this.props.match.params && this.props.match.params.categoryId;
    const baseURL = "https://5n6ugc33m6.execute-api.us-east-1.amazonaws.com";
    const apiURL = "/api/pokedex";

    if (categoryId === "all") {
      const response = await axios.get(`${baseURL}${apiURL}`);
      this.setState({
        loading: false,
        categoryId: categoryId,
        items:
          response && response.data && response.data.length && response.data
      });
    } else {
      this.setState({
        categoryId: categoryId,
        loading: false,
        items: []
      });
    }
  };

  componentDidMount = () => {
    this.setState({ loading: true });
    this.fetchDetails();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevProps.match.params.categoryId !== this.props.match.params.categoryId
    ) {
      this.setState({ loading: true });
      this.fetchDetails();
    }
  };

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  };
  render() {
    return this.state.loading ? (
      <Col md={ 12 } className="spinner"><Spinner animation="border" /></Col>
    ) : (
      <Col md={12} className="pokemon-list">
        {this.state.categoryId !== "all" ? (
          <Row>
            <Col md={2}>
              <span className="undo-reorder">Undo Reorder</span>
            </Col>
            <Col md={4}>
              <span className="delete-category">Delete Category</span>
            </Col>
            <Col md={8}></Col>
          </Row>
        ) : null}
        <Row>
          <Col md={12} className="pokemon-list-items">
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {this.state.items.map((item, index) => (
                      <Draggable
                        key={item.slug}
                        draggableId={item.slug}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                            className="bottom-border"
                          >
                            {/* { this.state.categoryId === 'all' ? <ListItemDetail item={item}/> : <ListItem item={item} />} */}
                            {<ListItem {...item} />}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Col>
        </Row>
      </Col>
    );
  }
}

const ListItem = ({ name, ThumbnailImage }) => {
  return (
    <Row>
      <InputGroup>
        <Col md={2} className="display-flex">
          <InputGroup.Checkbox />
          <span>
            <img className="pokemon-thumbnail" alt="" src={ThumbnailImage} />
          </span>
        </Col>
        <Col md={4}>
          <span className="pokemon-title">
            <strong>{name}</strong>
          </span>
        </Col>
        <Col md={6}></Col>
      </InputGroup>
    </Row>
  );
};

// const ListItemDetail = item => {
//     return <h1>{item}</h1>;
//   }

export default List;
