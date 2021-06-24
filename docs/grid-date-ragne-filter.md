---
title: How to Make Date Range Filter in the KendoReact Grid
description: An example on how to make date range filter in the KendoReact Grid.
type: how-to
page_title: How to Make Date Range Filter in the KendoReact Grid | KendoReact Grid
slug: grid-date-range-filter
tags: grid, kendoreact, dates, filter
ticketid: 1402875
res_type: kb
category: knowledge-base
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>4.5.0</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Progress® KendoReact</td>
		</tr>
	</tbody>
</table>


## Description

How can I filter date ranges in the Grid.

Also, how to make Grid custom range filter working with Odata.

## Solution

This requires using the [filterCell]({% slug api_grid_gridcolumnprops %}#toc-filterCell) property of the Grid column to add two DatePickers/DateInputs that will allow the user to select a start and an end date.

{% meta height:450 %}
{% embed_file grid/date-range-filter/main.jsx preview %}
{% embed_file shared/sample-products.js preview %}
{% endmeta %}