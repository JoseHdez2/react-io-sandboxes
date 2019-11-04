import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const TagsToggler = () => (
  <div>
    <h2>Hello, it's me! The Tags Toggler</h2>
    <TagsToggler2 />
  </div>
);

class TagsToggler2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagFamilies: [
        { name: "color", values: ["blue", "red"] },
        { name: "size", values: ["big", "small"] }
      ],
      tags: ["a1", "b2"]
    };
  }

  onSelect = ev => {
    alert(ev.target.value);
  };

  render() {
    let tf = this.state.tagFamilies;
    return (
      <TagFamilyDropdown
        currentTag={"a"}
        tagFamily={["a1", "a2"]}
        onSelectCallback={this.onSelect}
      />
    );
  }
}

const TagFamilyDropdown = ({ currentTag, tagFamily, onSelectCallback }) => (
  <DropdownButton
    id="dropdown-basic-button"
    title={currentTag}
    onSelect={onSelectCallback}
  >
    {tagFamily.map(t => (
      <Dropdown.Item key={t}>{t}</Dropdown.Item>
    ))}
  </DropdownButton>
);

export default TagsToggler;
