---
title: Export to Excel Multiple Grids
description: How to export multiple Grid to a single Excel file.
type: how-to
page_title: Export to Excel Multiple Grids | KendoReact Grid
slug: export-to-excel-multiple-grids
position:
tags:
ticketid: 1408161
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
I am trying to export multiple tables on one click action.

## Solution
This can be achieved, by setting the second Grid sheet as a second sheet of the first document and only exporting the first one.


{% meta id:index height:760 %}
{% embed_file multiple-grid-export-excel/main.jsx preview %}
{% embed_file common/products.json preview %}
{% endmeta %}