---
title: Enter Edit Mode in Grid Cell by Pressing Enter
description: An example on how to edit a grid cell by pressing enter.
type: how-to
page_title: Enter Edit Mode in Grid Cell by Pressing Enter| KendoReact Grid
slug: grid-cell-edit-on-enter-press
tags: grid, edit, cell
ticketid: 1558287
res_type: kb
category: knowledge-base
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>5.1.0</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Progress® KendoReact</td>
		</tr>
	</tbody>
</table>


## Description

How can I edit a selected grid cell by pressing the Enter key?

## Solution

First we need to make the Grid navigatable by setting the [navigatable](https://www.telerik.com/kendo-react-ui/components/grid/api/GridProps/#toc-navigatable) prop to true. 

Create a custom cell component, attach the onKeyDown event and pass it to the [cellRender](https://www.telerik.com/kendo-react-ui/components/grid/api/GridProps/#toc-cellrender) prop:

{% meta id:index height:760 %}
{% embed_file grid/cell-edit-on-enter-press/main.jsx preview %}
{% embed_file grid/cell-edit-on-enter-press/renderers.jsx preview %}
{% embed_file grid/cell-edit-on-enter-press/sample-products.jsx preview %}
{% endmeta %}
