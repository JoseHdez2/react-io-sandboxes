import React from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  ButtonToolbar,
  Dropdown,
  DropdownButton,
  ListGroup,
  InputGroup,
  FormControl,
  Row,
  Col
} from "react-bootstrap";

const fs = require("fs");
const load = async fn => JSON.parse(fs.readFileSync(fn));

export default class GameApp extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      filterMap: { name: "" },
      filterStr: "",
      groceryItems: []
    };
  }

  async componentWillMount() {
    this.reloadData();
  }

  createNewGroceryItem = groceryItemName => {
    // Api.postThing(new Object({type: 'game', thing: {name: groceryItemName, tags: []}}));
    alert(`Created '${groceryItemName}' game.`);
    this.reloadData();
  };

  reloadData = async () => {
    let groceryItems = await load("./src/tags/games.json"); // await Api.getThings("game");
    let tags = []; // await Api.getThings("tag");
    this.setState({
      groceryItems: groceryItems.data,
      tags: tags.data,
      filterMap: { name: "" },
      filterStr: ""
    });
  };

  componentDidMount() {
    this.setState({
      isLoading: false
    });
  }

  onSearchFilterChange = ev => {
    let newVal = ev.target.value;
    this.setState({
      filterMap: { name: newVal },
      filterStr: newVal
    });
  };

  onSelectGroceryItem = id => {
    this.setState({
      selectedGroceryItemId: id
    });
    console.log(id); //deleteme
  };

  render() {
    let groceryItems = this.state.groceryItems || [];
    let selectedId = this.state.selectedGroceryItemId;
    if (this.state.isLoading === true) {
      return <p>Loading...</p>;
    }

    return (
      <Col className="justify-content-md-center">
        <Row className="justify-content-md-center">
          <SearchFilter
            filterMap={this.state.filterMap}
            onChange={this.onSearchFilterChange}
          />
        </Row>
        <Row>
          <Col>
            <h3>
              List{" "}
              {
                <GroceryCounter
                  groceryItems={groceryItems}
                  filterMap={this.state.filterMap}
                />
              }
            </h3>
            <GroceryList
              groceryItems={groceryItems}
              filterMap={this.state.filterMap}
              tfo={undefined}
              onSelectGroceryItem={this.onSelectGroceryItem}
              selectedId={selectedId}
            />
          </Col>
        </Row>
        <Row>(:y)</Row>
      </Col>
    );
  }
}

const GroceryCounter = ({ groceryItems, filterMap }) => (
  <Badge className={"search-highlight"}>
    {groceryItems.filter(gi => filterGroceryItem(gi, filterMap)).length}
  </Badge>
);

const SearchFilter = ({ filterMap, onChange }) => (
  <div>
    <label>Search: </label>
    <input onChange={onChange} value={filterMapToStr(filterMap)} />
  </div>
);

const filterMapToStr = filterMap => `${filterMap.name}`;

const strToFilterMap = filterStr => ({ name: filterStr });

const GroceryList = ({
  groceryItems,
  filterMap,
  tfo,
  onSelectGroceryItem,
  selectedId
}) => (
  <Card>
    <ListGroup variant="flush">
      {groceryItems
        .filter(gi => filterGroceryItem(gi, filterMap))
        .map(gi => (
          <GroceryItem
            gi={gi}
            onSelectGroceryItem={onSelectGroceryItem}
            filterMap={filterMap}
          />
        ))}
    </ListGroup>
  </Card>
);

// returns boolean
const filterGroceryItem = (gi, filterMap) => {
  if (gi === undefined) return false;
  let _gi = gi.thing;
  let filterString = filterMap.name;
  return (
    _gi.name.toLowerCase().includes(filterString.toLowerCase()) ||
    _gi.tags.some(t => t.includes(filterString.toLowerCase()))
  );
};

const GroceryItem = ({
  gi,
  onSelectGroceryItem,
  filterMap,
  button,
  variant
}) => (
  <ListGroup.Item
    action
    key={gi._id}
    onClick={() => onSelectGroceryItem(gi._id)}
    variant={variant}
  >
    {button} {formatLabel(gi.thing.name, filterMap.name)}{" "}
    {gi.thing.tags.map(tag => (
      <TagBadge tag={tag} filterMap={filterMap} />
    ))}
  </ListGroup.Item>
);

const TagBadge = ({ tag, filterMap }) => (
  <Badge key={tag}>{formatLabel(tag, filterMap.name)}</Badge>
);

/**
 * Find and highlight relevant keywords within a block of text
 * @param  {string} label - The text to parse
 * @param  {string} value - The search keyword to highlight
 * @return {object} A JSX object containing an array of alternating strings and JSX
 */
const formatLabel = (label, value) => {
  if (!value) {
    return label;
  }
  var regex = new RegExp(value, "i");
  return (
    <span>
      {label.split(regex).reduce((prev, current, j) => {
        if (!j) {
          return [current];
        }
        return prev.concat(
          <span className="search-highlight" key={value + current}>
            {value}
          </span>,
          current
        );
      }, [])}
    </span>
  );
};
