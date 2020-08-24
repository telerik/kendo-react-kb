---
title: Export Data to Excel with Custom Header and Footer
description: An example on how to export data to Excel with custom header and footer.
type: how-to
page_title: Export Data to Excel with Custom Header and Footer | KendoReact Grid
slug: excel-export-with-custom-header-footer
tags: grid, kendoreact, export, excel, header, footer
ticketid: 1463826
res_type: kb
category: knowledge-base
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>3.15.0</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Progress® KendoReact</td>
		</tr>
	</tbody>
</table>


## Description

How can I add a custom header and footer to the exported data to Excel?

## Solution

This can be done by customizing the [Workbook](https://www.telerik.com/kendo-react-ui/components/excelexport/api/Workbook/) that will be exported. In this case, we have to add new rows to the current rows collection.

The following example shows how to:

1. Add a new row at the beginning and at the end of the workbook.
2. Apply [additional settings](https://www.telerik.com/kendo-react-ui/components/excelexport/api/WorkbookSheetRowCell/) to the cells.
3. [Freeze](https://www.telerik.com/kendo-react-ui/components/excelexport/api/WorkbookSheet/#toc-frozenrows) the first two rows in order to have the header and the column titles to be visible when scrolling.

{% meta id:index height:760 %}
{% embed_file grid/excel-export-header-footer/main.jsx preview %}
{% embed_file common/products.json %}
{% endmeta %}


