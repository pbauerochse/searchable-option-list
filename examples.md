---
layout: default
includeSol: true
title:  Examples
tabId:  examples
---

Examples
========

## Prerequisites
First of all you need to have jQuery included in your HTML, then you simply include the SOL js file and the SOL stylesheet.

{% highlight html %}
<!-- basic HTML code ommited -->
<head>
    <link rel="stylesheet" href="searchableOptionList.css">
    <script type="text/javascript" src="jQuery.js"></script>
    <script type="text/javascript" src="searchableOptionList.js"></script>
</head>
{% endhighlight %}

That's all you need to get started. Let's dive directly into the examples.

## Basic usage

The most basic usage is to initialize the plugin without any parameters using an existing `<select>` element:

{% highlight html %}
<select id="my-select" name="character">
    <option value="Peter">Peter Griffin</option>
    <option value="Lois">Lois Griffin</option>
    <option value="Chris">Chris Griffin</option>
    <option value="Meg">Meg Griffin</option>
    <option value="Stewie">Stewie Griffin</option>
    <option value="Cleveland">Cleveland Brown</option>    
    <option value="Joe">Joe Swanson</option>    
    <option value="Quagmire">Glenn Quagmire</option>    
    <option value="Evil Monkey">Evil Monkey</option>
    <option value="Herbert">John Herbert</option>    
</select>

<script type="text/javascript">
    $(function() {
        // initialize sol
        $('#my-select').searchableOptionList();
    });
</script>
{% endhighlight %}

This will produce the following result:

<select class="basicSelect" name="character">
    <option value="Peter">Peter Griffin</option>
    <option value="Lois">Lois Griffin</option>
    <option value="Chris">Chris Griffin</option>
    <option value="Meg">Meg Griffin</option>
    <option value="Stewie">Stewie Griffin</option>
    <option value="Cleveland">Cleveland Brown</option>    
    <option value="Joe">Joe Swanson</option>    
    <option value="Quagmire">Glenn Quagmire</option>    
    <option value="Evil Monkey">Evil Monkey</option>
    <option value="Herbert">John Herbert</option>    
</select>

The selected entry will be shown on top of the HTML element. When you open the option list, you will see, that all the options are shown with a radio button in front of it. That's because the original select was a single selection element.

**So how do we allow selecting more than one entry?**

Well, how do you allow selecting multiple options in a regular `<select>`? Right, simply add the `multiple="multiple"` attribute!
SOL will adapt accordingly. Easy as pie! No changes to the javascript needed.

Let's try it out:

{% highlight html %}
<select id="my-select" name="character" multiple="multiple">
    <option value="Peter">Peter Griffin</option>
    <option value="Lois">Lois Griffin</option>
    <option value="Chris">Chris Griffin</option>
    <option value="Meg">Meg Griffin</option>
    <option value="Stewie">Stewie Griffin</option>
    <option value="Cleveland">Cleveland Brown</option>    
    <option value="Joe">Joe Swanson</option>    
    <option value="Quagmire">Glenn Quagmire</option>    
    <option value="Evil Monkey">Evil Monkey</option>
    <option value="Herbert">John Herbert</option>   
</select>
{% endhighlight %}

<select class="basicSelect" name="character" multiple="multiple">
    <option value="Peter">Peter Griffin</option>
    <option value="Lois">Lois Griffin</option>
    <option value="Chris">Chris Griffin</option>
    <option value="Meg">Meg Griffin</option>
    <option value="Stewie">Stewie Griffin</option>
    <option value="Cleveland">Cleveland Brown</option>    
    <option value="Joe">Joe Swanson</option>    
    <option value="Quagmire">Glenn Quagmire</option>    
    <option value="Evil Monkey">Evil Monkey</option>
    <option value="Herbert">John Herbert</option> 
</select>

That was easy, wasn't it? How about we add some complexity? What about `<optgroup>`? Are they supported? Well yes of course they are:

{% highlight html %}
<select id="my-select" name="character" multiple="multiple">
    <optgroup label="The Griffins">
        <option value="Peter">Peter Griffin</option>
        <option value="Lois">Lois Griffin</option>
        <option value="Chris">Chris Griffin</option>
        <option value="Meg">Meg Griffin</option>
        <option value="Stewie">Stewie Griffin</option>
    </optgroup>
    
    <optgroup label="Peter's Friends">
        <option value="Cleveland">Cleveland Brown</option>    
        <option value="Joe">Joe Swanson</option>    
        <option value="Quagmire">Glenn Quagmire</option>    
    </optgroup>
    
    <option value="Evil Monkey">Evil Monkey</option>
    <option value="Herbert">John Herbert</option>   
</select>
{% endhighlight %}

<select class="basicSelect" name="character" multiple="multiple">
    <optgroup label="The Griffins">
        <option value="Peter">Peter Griffin</option>
        <option value="Lois">Lois Griffin</option>
        <option value="Chris">Chris Griffin</option>
        <option value="Meg">Meg Griffin</option>
        <option value="Stewie">Stewie Griffin</option>
    </optgroup>
    <optgroup label="Peter's Friends">
        <option value="Cleveland">Cleveland Brown</option>    
        <option value="Joe">Joe Swanson</option>    
        <option value="Quagmire">Glenn Quagmire</option>    
    </optgroup>
    <option value="Evil Monkey">Evil Monkey</option>
    <option value="Herbert">John Herbert</option>    
</select>

## Data sources

There are more ways to pass the data to SOL than to use an existing `select`.

### Initialize empty select with data from array

You can also initialize an empty `<select>` by passing in an JavaScript array with the initial data. This example will result in the same SOL as the optgroup example:

{% highlight html %}
<select id="my-select" name="character"></select>

<script type="text/javascript">
    $(function() {
        $('#my-select').searchableOptionList({
            data: [
                {
                    "type": "optiongroup",
                    "label": "The Griffins",
                    "children": [
                        { "type": "option", "value": "Peter",  "label": "Peter Griffin"},
                        { "type": "option", "value": "Lois",   "label": "Lois Griffin"},
                        { "type": "option", "value": "Chris",  "label": "Chris Griffin"},
                        { "type": "option", "value": "Meg",    "label": "Meg Griffin"},
                        { "type": "option", "value": "Stewie", "label": "Stewie Griffin"}
                    ]
                },
                {
                    "type": "optiongroup",
                    "label": "Peter's Friends",
                    "children": [
                        { "type": "option", "value": "Cleveland", "label": "Cleveland Brown"},
                        { "type": "option", "value": "Joe",       "label": "Joe Swanson"},
                        { "type": "option", "value": "Quagmire",  "label": "Glenn Quagmire"}
                    ]
                },
                { "type": "option", "value": "Evil Monkey", "label": "Evil Monkey"},
                { "type": "option", "value": "Herbert",     "label": "John Herbert"}
            ]
        });
    });
</script>
{% endhighlight %}

Here is the proof:

<select id="json-data-array-example" name="character"></select>

### Initialize empty select from a remote URL

If you provide an url the data will be loaded from that url via an ajax.get call. The data returned from that URL must be in the same format as in the example before.

{% highlight html %}
<select id="my-select" name="character"></select>

<script type="text/javascript">
    $(function() {
        $('#my-select').searchableOptionList({
            data: 'testdata.json'
        });
    });
</script>
{% endhighlight %}

### Initialize empty select with data returned from a function

If you need more control you may also pass in a function which then has to return the data to initialize SOL. This enables you to process data retrieved from an url before passing it on to SOL

{% highlight html %}
<select id="my-select" name="character"></select>

<script type="text/javascript">
    $(function() {
        $('#my-select').searchableOptionList({
            data: function (self) {
                // get and convert the data from the server
                var rawData = loadDataFromServer();
                var dataInSolFormat = convertToSolFormat(rawData);
                return dataInSolFormat;
            }
        });
    });
</script>
{% endhighlight %}

## Adding options

SOL comes with a couple of options with which you can customize its behaviour. All available options are documented on the [configuration page](configuration.html).


### Limiting the height of the selection container

When there are a lot of possible options availab



<script type="text/javascript">
    $(function() {
        $('.basicSelect').searchableOptionList();
        
        $('#json-data-array-example').searchableOptionList({
            data: [
                {
                    "type": "optiongroup",
                    "label": "The Griffins",
                    "children": [
                        { "type": "option", "value": "Peter",  "label": "Peter Griffin"},
                        { "type": "option", "value": "Lois",   "label": "Lois Griffin"},
                        { "type": "option", "value": "Chris",  "label": "Chris Griffin"},
                        { "type": "option", "value": "Meg",    "label": "Meg Griffin"},
                        { "type": "option", "value": "Stewie", "label": "Stewie Griffin"}
                    ]
                },
                {
                    "type": "optiongroup",
                    "label": "Peter's Friends",
                    "children": [
                        { "type": "option", "value": "Cleveland", "label": "Cleveland Brown"},
                        { "type": "option", "value": "Joe",       "label": "Joe Swanson"},
                        { "type": "option", "value": "Quagmire",  "label": "Glenn Quagmire"}
                    ]
                },
                { "type": "option", "value": "Evil Monkey", "label": "Evil Monkey"},
                { "type": "option", "value": "Herbert",     "label": "John Herbert"}
            ]
        });
    });
</script>
