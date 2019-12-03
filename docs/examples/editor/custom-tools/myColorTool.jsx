
import React from 'react';
import { EditorUtils } from '@progress/kendo-react-editor';
import { ColorPicker } from '@progress/kendo-react-inputs';

const BackgroundColorTool = (props) => {
    const propsRef = React.useRef();
    propsRef.current = props;

    const onChange = (event) => {
        const { view } = propsRef.current;
        if (view) {
          EditorUtils.applyInlineStyle(view, { style: 'color', value: event.value });
        }
    };

    return (
        <ColorPicker
          view="gradient"
          defaultValue={'black'}
          onChange={onChange}
          onMouseDown={e => e.preventDefault()}
          onPointerDown={e => e.preventDefault()}
        />
    );
};

export default BackgroundColorTool;

