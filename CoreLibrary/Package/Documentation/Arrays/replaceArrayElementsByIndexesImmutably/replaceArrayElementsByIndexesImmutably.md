# `replaceArrayElementsByIndexesImmutably`: Replace array elements by indexes immutably

[![Official IntelliJ IDEA plugin live template](https://img.shields.io/badge/IntelliJ_IDEA_Live_Template-raebii-blue.svg?style=flat)](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions)

Creates the copy of target array and replaces the elements by specified indexes.
Such functionality is demanded in some JavaScript frameworks which could not observe the mutations of array.


## Usage

If you want to replace just one element, you can specify `index` and `newElement` at first level of named parameters object:



### Quick inputting

Use [Live templates](https://www.jetbrains.com/help/idea/using-live-templates.html#live_templates_types) functionality
of [IntelliJ IDEA family IDEs](https://www.jetbrains.com/idea/) (including WebStorm sharpened for web development)
to input the function calling expression quickly (available in [official YDEE plugin](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions)):

![](replaceArrayElementsByIndexesImmutably-LiveTemplateDemo.gif)

If target array has been copied to clipboard preliminarily, it will be immediately substituted.
