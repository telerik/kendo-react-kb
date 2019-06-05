---
title: Custom Expand/Collapse Column
description: How to create custom expand collapse column
type: how-to
page_title: Custom Expand/Collapse Column | KendoReact
slug: howto_custom_expand_collapse_column
position:
tags:
ticketid: 1410508
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
I would like to have control over the expand collapse column to change or hide the columns.

## Solution
If the ultimate goal is to modify the expand collapse column, this can currently be achieved with a custom column.

Create a custom column bound to the expanded field and show the icons conditionally:

[cell prop](https://www.telerik.com/kendo-react-ui/components/grid/api/GridColumnProps/#toc-cell)

[headerCell props](https://www.telerik.com/kendo-react-ui/components/grid/api/GridColumnProps/#toc-headercell)

Please check the following example demonstrating this:

[Demo](https://stackblitz.com/edit/react-abh1id-pwtfuf?file=app/main.jsx)
