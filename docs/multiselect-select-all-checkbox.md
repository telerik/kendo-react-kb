---
title: How to Add a Select All Checkbox in KendoReact MultiSelect
description: An example on how to add a select all checkbox in KendoReact MultiSelect.
type: how-to
page_title: How to а Add Select All Checkbox in KendoReact MultiSelect | KendoReact MultiSelect
slug: multiselect-select-all-checkbox
tags: multiselect, kendoreact, dropdownlist, dropdowns, checkbox, select, all
res_type: kb
category: knowledge-base
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>4.12.0</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Progress® KendoReact</td>
		</tr>
	</tbody>
</table>


## Description

How to add a checkbox to the KendoReact DropDowns and to how add a select all checkbox?

## Solution

This can be done with [the KendoReact Multiselect component]({% slug overview_multiselect %}) and will require the following:

1. Add an extra data item to the data collection that will represent the Select All item.
1. Use the [itemRender prop]({% slug api_dropdowns_multiselectprops %}#toc-itemrender) that will allow rendering the checkboxes.
1. Handle the extra logic inside the [onChange event]({% slug api_dropdowns_multiselectprops %}#toc-onchange) that will allow setting the specific logic for the select all item.

This is an example showcasing this in action:

{% meta id:index height:760 %}
{% embed_file multiselect/multiselect-select-all-checkbox/main.jsx preview %}
{% endmeta %}