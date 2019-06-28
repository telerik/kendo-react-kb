---
title: Merge Rows in the Grid
description: How to Merge Rows in the Grid
type: how-to
page_title: Merge Rows in the Grid | KendoReact Grid
slug: merge-row-in-the-grid
position:
tags: grid, rows, merge
ticketid: 1414492
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
How to merge rows in React Data Grid?

## Solution
This can be achieved using a [cellRender](https://www.telerik.com/kendo-react-ui/components/grid/api/GridProps/#toc-cellrender) and adding rowSpan to the cells that need it:

Please check the following example on how this can be done.

{% meta id:index height:760 %}
{% embed_file grid/merge-rows/main.jsx preview %}
{% embed_file common/products.json %}
{% endmeta %}
