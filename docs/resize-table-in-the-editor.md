---
title: Editor - table resizing
description: How to resize a table in the Editor
type: how-to
page_title: Resize Table in the Editor | KendoReact Ediotor
slug: resize-table-in-the-editor
position:
tags: editor, table, resize
ticketid: 1418205
res_type: kb
category: knowledge-base
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
How to make the table elements inside the Editor resizable?

## Solution
There is an already made plugin for table column resizing from ProseMirror:

https://github.com/ProseMirror/prosemirror-tables

We have made an example of KendoReact Editor that uses the columnResizing plugin. The plugin has to be added to the plugins collection on the [onMount]({% slug api_editor_editorprops %}#toc-onmount) event:

{% meta id:index height:760 %}
{% embed_file editor/table-resize/main.jsx preview %}
{% endmeta %}