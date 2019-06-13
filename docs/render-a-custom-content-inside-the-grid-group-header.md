---
title: Render a Custom Content Inside the Grid Group Header
description: How to Render a Custom Content Inside the Grid Group Header?
type: how-to
page_title: Render a Custom Content Inside the Grid Group Header | KendoReact Grid
slug: render-a-custom-content-inside-the-grid-group-header
position:
tags: grid, groupheader, cell, render
ticketid: 1410259
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
We want to implement a customized IconCell that renders an Icon. If we group the Grid by that IconColmn, we want to display a small Icon inside the group header row.

## Solution
A possible approach is to use the [cellRender](https://www.telerik.com/kendo-react-ui/components/grid/api/GridProps/#toc-cellrender) prop. Then for the specific header to return a modified td element with the desired icon or any other custom elements.

Please check the following example demonstrating how the modify the groupHeader:

{% meta id:index height:760 %}
{% embed_file grid/group-header-render/main.jsx preview %}
{% embed_file common/products.json %}
{% endmeta %}
