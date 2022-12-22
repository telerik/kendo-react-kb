---
title: Editor Raises an Error on Enter Press
description: Learn how to troubleshoot when the Kendoreact Editor raises an error on Enter press.
type: how-to
page_title: Editor Raises an Error on Enter Press - KendoReact Editor
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

Currently, it happens with the KendoReact Editor examples when opened in the StackBlitz and CodeSandBox websites. If you open an example in StackBlitz, download it and run it locally, you will see that it works as expected. It also works as expected in the [KendoReact website](https://www.telerik.com/kendo-react-ui/components/editor/paste/). The error happens when different versions of [ProseMirror](https://prosemirror.net/) packages are loaded.

To prevent this error in your app, use the ProseMirror packages from the `@progress/kendo-editor-common` [package](https://unpkg.com/browse/@progress/kendo-editor-common@1.1.6/package.json) and install the same version as it is pointed in the editor's [package.json](https://unpkg.com/browse/@progress/kendo-react-editor@4.4.0/package.json) file.
For example, for version 4.4.0 of `@progress/kendo-react-editor`, you should install version 1.1.5. of `@progress/kendo-editor-common`.
If you do not need to use the ProseMirror packages to customize or extend the editor's functionality, you will not get such an error.

If you use yarn, define all the ProseMirror packages versions in the [resolutions](https://classic.yarnpkg.com/en/docs/selective-version-resolutions/) section in package.json file. Here is a runnable example where this is implemented: [https://github.com/telerik/kendo-react/files/6502790/editor-yarn.zip](https://github.com/telerik/kendo-react/files/6502790/editor-yarn.zip)