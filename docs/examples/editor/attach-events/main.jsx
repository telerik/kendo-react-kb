
import React from 'react';
import ReactDOM from 'react-dom';

import { Editor, EditorTools, ProseMirror } from '@progress/kendo-react-editor';
import { Menu, MenuItem } from '@progress/kendo-react-layout';
import { Popup } from '@progress/kendo-react-popup';

const { Bold, Italic, Underline } = EditorTools;

class App extends React.Component {
  state = {
    show: false
  }
  onMount = event => {
    return new ProseMirror.EditorView(
      { mount: event.dom }, {
        ...event.viewProps,

        // http://prosemirror.net/docs/ref/#view.EditorProps.handleDOMEvents
        handleDOMEvents: {
          ...(event.viewProps.handleDOMEvents || {}),
          'contextmenu': this.onContextMenu
        }
      }
    );
  }

  onContextMenu = (view, domEvent) => {
    domEvent.preventDefault()
    this.offSet = { left: domEvent.clientX, top: domEvent.clientY };
    this.setState({ show: true });
  }

  render() {
    return (
      <div>
        <Popup show={this.state.show} offset={this.offSet}>
          <Menu vertical={true} style={{ display: 'inline-block' }}>
            <MenuItem text="Item1">
              <MenuItem text="Item1.1" />
              <MenuItem text="Item1.2">
                <MenuItem text="Item1.2.1" />
                <MenuItem text="Item1.2.2" />
              </MenuItem>
            </MenuItem>
            <MenuItem text="Item2">
              <MenuItem text="Item2.1" />
              <MenuItem text="Item2.2" />
            </MenuItem>
            <MenuItem text="Item3" />
          </Menu>
        </Popup>
        <Editor
          defaultEditMode="div"
          tools={[
            [Bold, Italic, Underline]
          ]}
          contentStyle={{ height: 220 }}
          defaultContent="<p>blur event example</p>"
          onMount={this.onMount}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('my-app')
);

