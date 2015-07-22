---
layout: default
title:  Configuration Options
tabId:  configuration
---

Configuration options
=====================

## Options

To better suit your needs, SOL comes with a bunch of options which influence its behaviour.

| Option                 | Type                       | Default      | Description | Example |
|------------------------|----------------------------|--------------|-------------|---------|
| data                   | `array`, `function`, `url` | `autodetect` | The valid options to show. If you don't pass in the data option SOL will use any already defined `option` or `optgroup` in the original `select` element.<br><br>You can directly pass in the data as array or a function, that is called on initialization, which needs to return the data.<br><br>If you pass in a string, it will be interpreted as URL and an AJAX call to that URL will be done. That called URL should return an array with the [SOL data structure](#data-format). | [Array](examples.html#initialize-empty-select-with-data-from-array),<br>[Function](examples.html#initialize-empty-select-with-data-returned-from-a-function),<br>[URL](examples.html#initialize-empty-select-from-a-remote-url) |
| converter              | `function`                 | `undefined`  | If you pass in the data yourself (via an array, a function or loaded from a url) and the data is not in the required [SOL Format](#data-format) you should pass in a function that converts the data into the proper format | [Converting data](examples.html#converting-data) |
| name                   | `string`                   | `autodetect` | The `name` attribute, that will be used when the values of the form are submitted. There are three ways to define the name attribute. Setting the `name` attribute in the options, setting the `name="somename"` attribute on the original select, setting the `data-sol-name="somename"` attribute on the original element (for elements that normally don't have a name tag) | |
| multiple               | `boolean`                  | `autodetect` | Tells SOL, that more than one option is selectable.<br><br>If you initialize SOL from a `<select>` element it automatically detects the standard html `multiple` attribute. You only need to use this option if you pass in the data yourself. In single selection mode SOL will render `<input type="radio">` elements, while in multiple selection mode it will render `<input type="checkbox">` elements | |
| useBracketParameters   | `boolean`                  | `false`      | Determines how multiple values are sent to the server.<br><br>Per default SOL sends it `name=value1&name=value2&name=value3`, if you set this option to `true`, SOL will append square brackets to the parameter names: `name[]=value1&name[]=value2&name[]=value3`.<br><br>If you need to set this option to `true` depends on the server which processes the submitted data | |
| showSelectAll          | `boolean`                  | `false`      | If set to `true`, SOL will render two links allowing the user to (de-)select all options at once | [(de-)selecting all](examples.html#allowing-to-(de-)select-all-at-once) |
| showSelectionBelowList | `boolean`                  | `false`      | If set to `true`, the selected items will be displayed below the input element, instead of above. | |
| allowNullSelection     | `boolean`                  | `false`      | Only relevant for single selection SOL (radio button mode): in standard html there is no possibility to deselect an already checked radio button again. If you set this option to `true` SOL will allow the user to do that | [Allowing null selection](examples.html#allowing-empty-selections-for-single-selects) |
| maxHeight              | `integer`                  | `undefined`  | You may use this option to set the height (in pixels) of the option popup. If you don't set this option, the list will be as long as it needs to be | [Limiting the height](examples.html#limiting-the-height-of-the-selection-container) |
| scrollTarget           | `element`           | `$(window)`  | SOL needs to register a scroll event handler to render the open option popup at the proper location. If your website layout renders the content in an own scrollable area within your page (e.g. a div with `overflow: auto`), SOL needs to listen for the scroll event on that div instead of on the window. You then need to set the scrollTarget option to that particular div and might need to override the [onScroll event](examples.html#proper-positioning-of-the-option-popup) | [Positioning the popup](examples.html#proper-positioning-of-the-option-popup) |
| texts                  | `object`              |              | The texts displayed by SOL can be changed globally, as well as on a per SOL basis by passing in the texts as options. | [Overriding the default labels](examples.html#overriding-the-default-labels) |


## Events

You may listen for state changes on SOL by passing in event listeners in the options like this:

{% highlight html %}
<select id="my-select" name="character" multiple="multiple"><!-- options ommited --></select>

<script type="text/javascript">
$(function() {
    $('#my-select').searchableOptionList({
        // other options here
        
        // register events
        events: {            
            onRendered: function() {
            },
            
            // more events as you need
        }
    });
});    
</script>
{% endhighlight %}

The following events are available:

| Event       | Signature                       | Description |
|-------------|---------------------------------|-------------|
|onRendered   | `function(sol)`                 | Triggered when the basic SOL HTML markup is present. This does not mean, that SOL is already fully initialized (the data is loaded) |
|onInitialized| `function(sol, items)`          | Triggered when the data items are loaded and processed and SOL is fully usable |
|onOpen       | `function(sol)`                 | Triggered when the SOL options popup was opened |
|onClose      | `function(sol)`                 | Triggered when the SOL options popup was closed |
|onChange     | `function(sol,changedElements)` | Triggered when one or more options were (de-) selected. The second parameter are the actual `<input>` elements that have been changed |
|onScroll     | `function()`                    | Triggered when the scrollTarget detected a user scroll. Required to [position the options popup properly](examples.html#proper-positioning-of-the-option-popup) |

## Methods

The following methods may be called on the SOL object:

| Method         | Return type | Description |
|----------------|-------------|-------------|
| isOpen()       | `boolean`   | Returns whether this particular SOL is currently open                      |
| isClosed()     | `boolean`   | Returns whether this particular SOL is currently closed                    |
| toggle()       | `void`      | Toggles the open/closed state                                              |
| open()         | `void`      | Opens the options popup (if not already open)                              |
| close()        | `void`      | Closes the options popup (if not already open)                             |
| selectAll()    | `void`      | Selects all selectable options. Same as clicking the select all link       |
| deselectAll()  | `void`      | Deselects all deselectable options. Same as clicking the deselect all link |
| getSelection() | `array`     | Returns all currently selected `<input>` elements.                         |

## Data Format

SOL requires the data returned from the converter / array / function passed in as data option to be in the following form:

{% highlight javascript %}

var aSingleOptionItem = {
    // required attributes
    "type":  "option",   
    "label": "The label that will be displayed",
    "value": "The value which will be passed to the server when this entry is selected and the form is being submitted",
    
    // optional attributes
    "selected": false,          // true or false, determines whether this entry is preselected
    "disabled": false,          // true or false, determines whether this entry is changeable
    "tooltip":  "An optional tooltip which will be shown when the mouse hovers above the entry"
};

var anOptionGroupWithThreeItems = {
    // required attributes
    "type":     "optiongroup",
    "label":    "The label that will be displayed for this group",
    "children": [   // the array of child elements for this optiongroup, all children must be of type "option" (see above)
        { "type": "option", "label": "Another option", "value": "entry-1" },
        { "type": "option", "label": "And another option", "value": "entry-2" },
        { "type": "option", "label": "Yet another option", "value": "entry-3" }
    ],             
    
    // optional attributes
    "disabled": false,          // true or false, set to true to disallow changing of any of the child elements
    "tooltip":  "An optional tooltip which will be shown when the mouse hovers above the group caption"
};

var validSolDataArray = [
    aSingleOptionItem,
    anOptionGroupWithThreeItems,
    { "type": "option", "label": "Another option", "value": "entry-8193" },
    { "type": "option", "label": "Another option", "value": "entry-8193" },
];

{% endhighlight %}
