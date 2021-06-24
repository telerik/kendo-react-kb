---
title: Editor Raises an Error on Enter Press
description: Why the Kendoreact Editor Raises an Error on Enter Press.
type: how-to
page_title: Editor Raises an Error on Enter Press | KendoReact Editor
slug: editor-error-on-enter-press
tags: editor, kendoreact, error, enter
ticketid: 9999999
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

When I press Enter in the KendoReact Editor this errors occurs `"RangeError: Can not convert <> to a Fragment (looks like multiple versions of prosemirror-model were loaded)".`

## Solution

Currently, it happens on the KendoReact website. If you open an example in StackBlitz, download it and run it locally, you will see that it works as expected. The error happens when different versions of [ProseMirror packages]() are loaded.

To prevent this error in your app, use the ProseMirror packages from the `@progress/kendo-editor-common` package and install the same version as it is pointed in the editor's `package.json` file.
For example, for version 4.4.0., you should install version 1.1.5. of '@progress/kendo-editor-common'.
If you don't need to use the ProseMirror packages to customize or extend the editor's functionality, you will not get such an error.

If you use yarn, define all the ProseMirror packages versions in the [resolutions](https://classic.yarnpkg.com/en/docs/selective-version-resolutions/) section in package.json file.
