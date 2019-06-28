---
title: Retain Checkbox Selection With Server Paging
description: How to retain checkbox selection with server paging
type: how-to
page_title: Retain Checkbox Selection With Server Paging | KendoReact Grid
slug:  how-to-retain-checkbox-selection-with-server-paging
position:
tags: grid, checkbox, selection, sever-paging
ticketid: 1413958
res_type: kb
category: knowledge-base
---

## Environment
<table>
    <tbody>
	    <tr>
	    	<td>Product Version</td>
	    	<td>3.0.0.</td>
	    </tr>
	    <tr>
	    	<td>Product</td>
	    	<td>Progress® KendoReact</td>
	    </tr>
    </tbody>
</table>


## Description
Retain selection of checkbox when we navigate across different page.
In my case, my data is coming from API. I have configured server-side paging and sorting.

## Solution
This requires to keep the selected items by their ids inside the state.

The following example demonstrates how to achieve this.

{% meta id:index height:760 %}
{% embed_file grid/checkbox-selection-server-side/main.jsx preview %}
{% embed_file grid/checkbox-selection-server-side/products-loader.jsx %}
{% endmeta %}