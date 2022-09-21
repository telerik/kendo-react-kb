---
title: Set the Width of the Column Based on the Content
description: An example on how to set the width of the KendoReact Grid column based on the content.
type: how-to
page_title: Set the Width of the Column Based on the Content - KendoReact Grid
slug: grid-column-auto-width
tags: grid, kendoreact, width, column, auto
ticketid: 1469294
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

How can I set the width of the Grid column based on the content. I want the column width to be set based on the longest value in the column.

## Solution

For the column auto width, we can suggest using a package called [calculate-size](https://www.npmjs.com/package/calculate-size) or similar which will calculate the size of the text based on the font. Then we can use that information to dynamically set the width of the column:

{% meta id:index height:760 %}
{% embed_file grid/auto-width/main.jsx preview %}
{% embed_file shared/products.json %}
{% endmeta %}
