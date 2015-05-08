---
layout: default
title:  Configuration Options
tabId:  configuration
---

Configuration options
=====================

## Options

To better suit your needs, SOL comes with a bunch of options which influence its behaviour.

| Option | Type | Default | Description | Example |
|--------|------|---------|-------------|---------|
|data|`empty`, `array`, `function`, `url` | `null` | The valid options to show. If you don't pass in the data option SOL will use any already defined `option` or `optgroup` in the original `select` element.<br><br>You can directly pass in the data as array or a function, that is called on initialization, which needs to return the data.<br><br>If you pass in a string, it will be interpreted as URL and an AJAX call to that URL will be done. That called URL should return an array with the data structure. | [Array](examples.html#initialize-empty-select-with-data-from-array),<br>[Function](examples.html#initialize-empty-select-with-data-returned-from-a-function),<br>[URL](examples.html#initialize-empty-select-from-a-remote-url) |
|converter|`function`|`null`|If the data you pass in is not in the required [SOL format](#fata-format) you can define a function here which can then convert your given data format to the SOL format | [Example](examples.html#converter) 
|maxHeight|`string`|`null`|||
|texts|`object`||||
|classes|`object`||||
|useBracketParameters|`boolean`|`false`|||
|showSelectAll|`boolean`|`false`|||
|showSelection|`boolean`|`true`|||
|showSelectionBelowList|`boolean`|`false`|||

## Events
| Event  | Type | Default | Description | Example |
|--------|------|---------|-------------|---------|
|onRendered|`function`|`null`|||