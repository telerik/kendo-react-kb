---
title: TreeView Editing
description: How to edit the TreeView nodes.
type: how-to
page_title: TreeView Editing| KendoReact TreeView
slug: treeview-editing
position:
tags:
ticketid: 1408165
res_type: kb
---

## Environment
<table>
    <tbody>
	    <tr>
	    	<td>Product</td>
	    	<td>Progress® KendoReact</td>
	    </tr>
    </tbody>
</table>


## Description
How to edit the TreeView nodes.

## Solution
This can be achieved, by using the [itemRender](https://www.telerik.com/kendo-react-ui/components/treeview/api/TreeViewProps/#toc-itemrender) to render an input bound to the node value on click.

{% meta id:index height:760 %}
{% embed_file treeview/treeview-editing/main.jsx preview %}
{% endmeta %}