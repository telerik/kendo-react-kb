---
title: Add Custom Event to the Editor
description: An example on how to add a custom event to the Editor.
type: how-to
page_title: Add Custom Event to the Editor | KendoReact Editor
slug: add-custom-event-to-the-editor
position:
tags: editor, event
ticketid: 1416867
res_type: kb
---

## Environment
<table>
    <tbody>
	    <tr>
	    	<td>Product Version</td>
	    	<td>3.0.0</td>
	    </tr>
	    <tr>
	    	<td>Product</td>
	    	<td>Progress® KendoReact</td>
	    </tr>
    </tbody>
</table>


## Description
How to attach a custom event like onBlur or onKeyDown to the EditorView.

## Solution
This can be achieved by programmatically attaching the desired event and the handler to the EditorView. These events can be attached to the [onMount]({% slug api_editor_editorprops %}#toc-onmount) event of the Editor.

This is an example showcasing how to attach the onBlur event:

{% meta id:index height:760 %}
{% embed_file editor/attach-events/main.jsx preview %}
{% endmeta %}
