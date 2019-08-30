
import React from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorTools, ProseMirror } from '@progress/kendo-react-editor';

import { columnResizing } from 'prosemirror-tables';
const { EditorState, EditorView } = ProseMirror;

const {
    InsertTable,
    AddRowBefore, AddRowAfter, AddColumnBefore, AddColumnAfter,
    DeleteRow, DeleteColumn, DeleteTable,
    MergeCells, SplitCell,
    Undo, Redo
} = EditorTools;

const content =
   `<p>some paragraph</p>
<table>
    <tbody>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>`;

class App extends React.Component {
  onMount = event => {
      const state = event.viewProps.state;
      const plugins = [
        ...state.plugins,
        columnResizing({})
      ];

      return new EditorView(
        { mount: event.dom }, {
          ...event.viewProps,
          state: EditorState.create({ doc: state.doc, plugins })
        }
      );
    }

    render() {
        return (
            <Editor
                tools={[
                    [ InsertTable ],
                    [ AddRowBefore, AddRowAfter, AddColumnBefore, AddColumnAfter ],
                    [ DeleteRow, DeleteColumn, DeleteTable ],
                    [ MergeCells, SplitCell ],
                    [ Undo, Redo ]
                ]}
                defaultEditMode="div"
                onMount={this.onMount}
                contentStyle={{ height: 300 }}
                defaultContent={content}
            />
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('my-app')
);

