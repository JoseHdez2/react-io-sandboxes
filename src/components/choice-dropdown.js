import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const ChoiceDropdown = ({ title, choices, onChoice }) => (
  <DropdownButton title={title}>
    {choices.map(c => (
      <Dropdown.Item>{c}</Dropdown.Item>
    ))}
  </DropdownButton>
);

export default ChoiceDropdown;
