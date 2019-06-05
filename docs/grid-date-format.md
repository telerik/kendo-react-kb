---
title: Grid Date Format
description: How to format ISO string dates.
type: how-to
page_title: Grid Date Format | KendoReact Grid
slug: grid-date-format
position:
tags: grid, kendoreact, dates, format
ticketid: 1402874
res_type: kb
category: knowledge-base
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2.9.1</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Progress® KendoReact</td>
		</tr>
	</tbody>
</table>


## Description
I have an ISO date string, but setting a format property to the Grid does not change affect it.

## Solution
This occurs because the KendoReact Grid only formats valid JavaScipt date objects.

In cases like this, we recommend parsing the ISO strings to JavaScript dates as soon as they are received from the server and working with the parsed data. This will also ensure that the filtering will be working if it is made on the client.
