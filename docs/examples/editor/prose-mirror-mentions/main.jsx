import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Editor, ProseMirror, EditorUtils } from '../src/main';
import { addMentionNodes, addTagNodes, getMentionsPlugin } from 'prosemirror-mentions';

const { Schema, EditorView, EditorState } = ProseMirror;

import '@progress/kendo-theme-default/dist/all.css';

const mentionsData = [
    
    { name: 'Anna Brown', id: '103', email: 'anna@gmail.com' },
    { name: 'John Doe', id: '101', email: 'joe@gmail.com' },
    { name: 'Joe Lewis', id: '102', email: 'lewis@gmail.com' }
];

const tagsData = [
    { tag: 'WikiLeaks' },
    { tag: 'NetNeutrality' },
    { tag: 'KendoReact'}
];

/**
 * IMPORTANT: outer div's "suggestion-item-list" class is mandatory. The plugin uses this class for querying.
 * IMPORTANT: inner div's "suggestion-item" class is mandatory too for the same reasons
 */
const getMentionSuggestionsHTML = items => {
    return '<div class="suggestion-item-list">' +
        items.map(i => '<div class="suggestion-item">' + i.name + '</div>').join('') + '</div>';
};

/**
 * IMPORTANT: outer div's "suggestion-item-list" class is mandatory. The plugin uses this class for querying.
 * IMPORTANT: inner div's "suggestion-item" class is mandatory too for the same reasons
 */
const getTagSuggestionsHTML = items => {
    return '<div class="suggestion-item-list">' +
        items.map(i => '<div class="suggestion-item">' + i.tag + '</div>').join('') + '</div>';
};

export const mentionPlugin = getMentionsPlugin({
    getSuggestions: (type, text, done) => {
        setTimeout(
            () => {
                if (type === 'mention') {
                    done(mentionsData);
                } else {
                    done(tagsData);
                }
            },
            0);
    },
    getSuggestionsHTML: (items, type) => {
        if (type === 'mention') {
            return getMentionSuggestionsHTML(items);
        } else if (type === 'tag') {
            return getTagSuggestionsHTML(items);
        }
    }
});

const App = () => {
    const handleMount = (event) => {
        const { viewProps } = event;
        const { plugins, schema } = viewProps.state;
        const marks = schema.spec.marks;
        const nodes = schema.spec.nodes;

        const mySchema = new Schema({
            nodes: addTagNodes(addMentionNodes(nodes)),
            marks
        });

        const document = event.dom.ownerDocument;
        document.querySelector('style').appendChild(document.createTextNode(styles));

        const doc = EditorUtils.createDocument(mySchema, '');

        plugins.unshift(mentionPlugin);

        return new EditorView(
            { mount: event.dom }, {
            ...viewProps,
            state: EditorState.create({ doc, plugins })
        }
        );
    };

    return (
        <Editor
            contentStyle={{ height: 500 }}
            onMount={handleMount}
        />
    );
};

export const styles =
    `.suggestion-item-list {
        margin: 15px;
        border: solid 1px #dce3e5;
        box-sizing: border-box;
        padding: 16px;
        border-radius: 2px;
        margin-bottom: 2em;
        box-shadow: inset 0px 1px 8px -3px #ABABAB;
        background: #fefefe;
        cursor: text;
        text-align: center;

    }
    .suggestion-item {
        transition: background-color 0.4s cubic-bezier(.27,1.27,.48,.56);
    }
    .suggestion-item-active {
        background-color: #cce7ff;
        font-weight: bold;
        margin: 0px -16px 0px -15px;
    }
    `;

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
