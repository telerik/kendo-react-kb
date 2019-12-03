import React from 'react';
import { EditorTools } from "@progress/kendo-react-editor";

const colorToolSettings = {
  style: "font-size",
  defaultItem: { text: "*", value: "" },
  items: [
    {
      text: "9",
      value: "9pt",
      id: 1
    },
    {
      text: "10",
      value: "10pt",
      id: 2
    },
    {
      text: "11",
      value: "11pt",
      id: 3
    },
    {
      text: "12",
      value: "12pt",
      id: 4
    },
    {
      text: "14",
      value: "14pt",
      id: 5
    },
    {
      text: "16",
      value: "16pt",
      id: 6
    },
    {
      text: "18",
      value: "18pt",
      id: 7
    },
    {
      text: "22",
      value: "22pt",
      id: 8
    },
    {
      text: "24",
      value: "24pt",
      id: 9
    },
    {
      text: "30",
      value: "30pt",
      id: 10
    },
    {
      text: "36",
      value: "36pt",
      id: 11
    }
  ]
};

const MyFornSizeTool = EditorTools.createStyleDropDownList(colorToolSettings);

const CustomFontSize = props => (
  <MyFornSizeTool
    {...props}
    style={{
      width: "100px",
      fontSize: "10px",
      height: "36px",
      background: "#fff",
      ...props.style
    }}
  />
);

export default CustomFontSize;
