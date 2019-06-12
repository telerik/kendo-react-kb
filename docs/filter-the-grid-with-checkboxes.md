---
title: Filter the Grid with Checkboxes
description: How to Filter the Grid with Checkboxes
type: how-to
page_title: Filter the Grid with Checkboxes | KendoReact Grid
slug: filter-the-grid-with-checkboxes
position:
tags: kendoreact, grid, filter, checkbox
ticketid: 1410595
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
Is it possible to filter the Grid data with checkboxes?

I saw this is the jQuery version of the Grid. Is it support for React as well?

## Solution
In the KendoReact Grid this has to be achieved programmatically using the [ColumnMenu](https://www.telerik.com/kendo-react-ui/components/grid/columns/column-menu/) component.

Please check an example demonstrating how this can be achieved:

{% meta id:index height:760 %}
{% embed_file grid/grid-filter-checkbox/main.jsx preview %}
{% embed_file grid/grid-filter-checkbox/customColumnMenu.jsx %}
{% embed_file common/products.json %}
{% endmeta %}