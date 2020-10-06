import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { TreeView } from '@progress/kendo-react-treeview'
import '@progress/kendo-react-animation'

const tree = [{
  text: 'Furniture', expanded: true, items: [
    { text: 'Tables & Chairs' }, { text: 'Sofas' }, { text: 'Occasional Furniture' }]
}, {
  text: 'Decor', items: [
    { text: 'Bed Linen' }, { text: 'Curtains & Blinds' }, { text: 'Carpets' }]
}];

class App extends React.Component {
  render() {
    document.querySelector('.k-textbox')
    return (
      <TreeView
        data={tree}
        expandIcons={true}
        itemRender={this.itemRender}
        onExpandChange={this.onExpandChange}
        onItemClick={this.onItemClick}
      />
    );
  }

  handleChange = (e, item) => {
    item.text = e.target.value;
    this.forceUpdate();
  }

  handleBlur = (e, item) => {
    item.edit = false;
    this.forceUpdate();
  }

  itemRender = (props) => {
    if (props.item.edit) {
      return (
        <span>
          <input className='k-textbox'
            autoFocus
            value={props.item.text}
            onChange={(e) => this.handleChange(e, props.item)}
            onBlur={(e) => this.handleBlur(e, props.item)} />
        </span>
      )
    }
    return <span>{props.item.text}</span>
  }
  onItemClick = (event) => {
    event.item.edit = true;
    this.forceUpdate();
  }
  onExpandChange = (event) => {
    event.item.expanded = !event.item.expanded;
    this.forceUpdate();
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('my-app')
);

