---
layout: default
includeSol: true
title:  Examples
tabId:  examples
---

Examples
========

## What you will get

Here is an example of what you will get when you use SOL

<select id="demonstration" name="character0" style="width: 250px" multiple="multiple">
    <optgroup label="The Griffins">
        <option value="Peter" selected>Peter Griffin</option>
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
    <option value="Adam" selected>Adam West</option>
    <option value="Buzz Killington">Buzz Killington</option>
    <option value="Tricia">Tricia Takanawa</option>
    <option value="Tom">Tom Tucker</option>
    <option value="Jake">Jake Tucker</option>
    <option value="Diane">Diane Simmons</option>
    <option value="Ollie">Ollie Williams</option>
    <option value="Dr Hartmann">Dr. Elmer Hartmann</option>
    <option value="Barbara">Barbara Pewterschmidt</option>
    <option value="Carter">Carter Pewterschmidt</option>
    <option value="Neil">Neil Goldmann</option>
    <option value="Mort">Mort Goldmann</option>
    <option value="Muriel">Muriel Goldmann</option>
    <option value="Consuela">Consuela</option>
    <option value="Jillian">Jillian Russel</option>
    <option value="Phineas and Barnaby" selected>Phineas and Barnaby</option>
    <option value="Vern and Johnny">Vern and Johnny</option>
    <option value="Ernie">Ernie The Giant Chicken</option>
    <option value="Bruce">Bruce</option>
    <option value="Jeffrey">Jeffrey</option>
    <option value="Carl">Carl</option>    
</select>


## Prerequisites
First of all you need to have jQuery included in your HTML, then you simply include the SOL js file and the SOL stylesheet.

{% highlight html %}
<!-- basic HTML code ommited -->
<head>
    <link rel="stylesheet" href="searchableOptionList.css">
    <script type="text/javascript" src="jQuery.js"></script>
    <script type="text/javascript" src="sol-{VERSION}.js"></script>
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

<select class="basicSelect" name="character1">
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

<select class="basicSelect" name="character2" multiple="multiple">
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

<select class="basicSelect" name="character3" multiple="multiple">
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

## More data sources

There are more ways to pass the data to SOL than to use an existing `select`.

### Initialize empty select with data from array

You may initialize SOL from any HTML element by passing in an JavaScript array with the initial data. The data must be in valid [SOL JSON data format](configuration.html#data-format). In that case you also need to specify the `name` option by setting the `data-sol-name="character"` attribute. You also could just pass in the name as an option value.

This example will result in the same SOL as the optgroup example:

{% highlight html %}
<div id="my-div" data-sol-name="character"></div>

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

<div id="json-data-array-example" data-sol-name="character4"></div>

Note, that SOL now stretches over the full width of the content area. This is because we used a block element (div) to initialize SOL. SOL automatically uses the same width the original element had.

### Initialize empty select with data returned from a function

If you need more control you may also pass in a function which then has to return the data to initialize SOL. This enables you to process data retrieved from an url before passing it on to SOL

{% highlight html %}
<select id="my-select" name="character"></select>

<script type="text/javascript">
    $(function() {
        $('#my-select').searchableOptionList({
            data: function () {
                // do what you have to do to get the valid SOL data
                var dataInSolFormat = loadDataFromWhereverYouWant();                
                return dataInSolFormat;
            }
        });
    });
</script>
{% endhighlight %}

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

### Converting data

Sometimes you might want to load the data from a remote URL but that data is not in valid SOL format. In that case you might want to add a converter function which then converts the data to proper SOL format like this:

{% highlight html %}
<div id="my-select" name="character" style="width: 250px"></div>

<script type="text/javascript">
    $(function() {
        $('#my-select').searchableOptionList({
            data: 'some-url-that-does-not-return-sol-format.json',
            converter: function (sol, rawDataFromUrl) {
                var solData = [];
                
                // do whatever you have to do
                // to convert rawDataFromUrl to
                // valid SOL data format
                
                return solData;
            }
        });
    });
</script>
{% endhighlight %}


## Options

SOL comes with a couple of options with which you can customize its behaviour. All available options are documented on the [configuration page](configuration.html).


### Limiting the height of the selection container

When there are a lot of possible options available, the selection container might get really long. With the `maxHeight` option, you can set a maximum height the container will reach. If the content is longer than that limit, the selection will be scrollable:

{% highlight html %}
<select id="my-select" name="character" style="width: 300px">
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
    <option value="Adam">Adam West</option>
    <option value="Buzz Killington">Buzz Killington</option>
    <option value="Tricia">Tricia Takanawa</option>
    <option value="Tom">Tom Tucker</option>
    <option value="Jake">Jake Tucker</option>
    <option value="Diane">Diane Simmons</option>
    <option value="Ollie">Ollie Williams</option>
    <option value="Dr Hartmann">Dr. Elmer Hartmann</option>
    <option value="Barbara">Barbara Pewterschmidt</option>
    <option value="Carter">Carter Pewterschmidt</option>
    <option value="Neil">Neil Goldmann</option>
    <option value="Mort">Mort Goldmann</option>
    <option value="Muriel">Muriel Goldmann</option>
    <option value="Consuela">Consuela</option>
    <option value="Jillian">Jillian Russel</option>
    <option value="Phineas and Barnaby">Phineas and Barnaby</option>
    <option value="Vern and Johnny">Vern and Johnny</option>
    <option value="Ernie">Ernie The Giant Chicken</option>
    <option value="Bruce">Bruce</option>
    <option value="Jeffrey">Jeffrey</option>
    <option value="Carl">Carl</option>
</select>

<script type="text/javascript">
$(function() {
    $('#my-select').searchableOptionList({
        maxHeight: '250px'
    });
});    
</script>
{% endhighlight %}

<select id="my-verylong-select" name="character5" style="width: 300px">
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
    <option value="Adam">Adam West</option>
    <option value="Buzz Killington">Buzz Killington</option>
    <option value="Tricia">Tricia Takanawa</option>
    <option value="Tom">Tom Tucker</option>
    <option value="Jake">Jake Tucker</option>
    <option value="Diane">Diane Simmons</option>
    <option value="Ollie">Ollie Williams</option>
    <option value="Dr Hartmann">Dr. Elmer Hartmann</option>
    <option value="Barbara">Barbara Pewterschmidt</option>
    <option value="Carter">Carter Pewterschmidt</option>
    <option value="Neil">Neil Goldmann</option>
    <option value="Mort">Mort Goldmann</option>
    <option value="Muriel">Muriel Goldmann</option>
    <option value="Consuela">Consuela</option>
    <option value="Jillian">Jillian Russel</option>
    <option value="Phineas and Barnaby">Phineas and Barnaby</option>
    <option value="Vern and Johnny">Vern and Johnny</option>
    <option value="Ernie">Ernie The Giant Chicken</option>
    <option value="Bruce">Bruce</option>
    <option value="Jeffrey">Jeffrey</option>
    <option value="Carl">Carl</option>
</select>

### Allowing to (de-)select all at once

On a multiple select box it can be very tedious to click every single entry when you actually want to select everything at once. Luckily SOL has the `showSelectAll` option. Set this option to `true` and the SOL selection container will show two links at the top do select and deselect all entries.

The label of these links can be customized by [overriding the `texts` configuration](#toc-overriding-the-default-labels).

{% highlight html %}
<select id="my-select" name="character" multiple="multiple">
    <option value="Peter">Peter Griffin</option>
    <option value="Lois">Lois Griffin</option>
    <option value="Chris">Chris Griffin</option>
    <option value="Meg">Meg Griffin</option>
    <option value="Stewie">Stewie Griffin</option>
</select>

<script type="text/javascript">
$(function() {
    $('#my-select').searchableOptionList({
        showSelectAll: true
    });
});    
</script>
{% endhighlight %}

<select id="my-multiselect-all" name="character6" multiple="multiple">
    <option value="Peter">Peter Griffin</option>
    <option value="Lois">Lois Griffin</option>
    <option value="Chris">Chris Griffin</option>
    <option value="Meg">Meg Griffin</option>
    <option value="Stewie">Stewie Griffin</option>
</select>

### Allowing empty selections for single selects

When you have single select box and you want to give the user to opportunity to select nothing at all, you can simply set the `allowNullSelection` option to `true`.

{% highlight html %}
<select id="my-select" name="character">
    <option value="Peter">Peter Griffin</option>
    <option value="Lois">Lois Griffin</option>
    <option value="Chris">Chris Griffin</option>
    <option value="Meg">Meg Griffin</option>
    <option value="Stewie">Stewie Griffin</option>
</select>

<select id="null-allowed-select" name="null-character">   
    <option value="Peter">Peter Griffin</option>
    <option value="Lois">Lois Griffin</option>
    <option value="Chris">Chris Griffin</option>
    <option value="Meg">Meg Griffin</option>
    <option value="Stewie">Stewie Griffin</option>
</select>

<script type="text/javascript">
$(function() {
    $('#my-select').searchableOptionList();
    $('#null-allowed-select').searchableOptionList({
        allowNullSelection: true
    });
});    
</script>
{% endhighlight %}

See the difference for yourself

<select class="basicSelect" name="character7">
    <option value="Peter">Peter Griffin</option>
    <option value="Lois">Lois Griffin</option>
    <option value="Chris">Chris Griffin</option>
    <option value="Meg">Meg Griffin</option>
    <option value="Stewie">Stewie Griffin</option>
</select>

<select id="null-allowed-select" name="character8">   
    <option value="Peter">Peter Griffin</option>
    <option value="Lois">Lois Griffin</option>
    <option value="Chris">Chris Griffin</option>
    <option value="Meg">Meg Griffin</option>
    <option value="Stewie">Stewie Griffin</option>
</select>


### Overriding the default labels

The texts used in SOL are completely customizable. You may set the texts for all SOL elements globally or on a per element basis.

{% highlight html %}
<select id="my-default-text-select" name="character" multiple><!-- options ommited for the example --></select>
<select id="my-custom-text-select" name="character2" multiple><!-- options ommited for the example --></select>

<script type="text/javascript">
$(function() {
    
    // set texts globally for all SOL like this
    // these are all available text options
    // also the values shown here are the default labels
    SearchableOptionList.defaults.texts.noItemsAvailable: 'No entries found';
    SearchableOptionList.defaults.texts.selectAll: 'Select all';
    SearchableOptionList.defaults.texts.selectNone: 'Select none';
    SearchableOptionList.defaults.texts.quickDelete: '&times;';
    SearchableOptionList.defaults.texts.searchplaceholder: 'Click here to search';
   
    $('#my-default-text-select').searchableOptionList({showSelectAll: true});
    $('#my-custom-text-select').searchableOptionList({
        showSelectAll: true,
        // set texts for this SOL only, overriding the defaults
        texts: {
            noItemsAvailable: 'Go on, nothing to see here',
            selectAll: 'Get em all',
            selectNone: 'Nah',
            quickDelete: 'Kick',
            searchplaceholder: 'Giggity giggity...'
        }
    });
});    
</script>
{% endhighlight %}

<select id="default-texts" name="character9" multiple>
    <optgroup label="The Griffins">
        <option value="Peter">Peter Griffin</option>
        <option value="Lois" selected>Lois Griffin</option>
        <option value="Chris">Chris Griffin</option>
        <option value="Meg">Meg Griffin</option>
        <option value="Stewie">Stewie Griffin</option>
    </optgroup>    
    <optgroup label="Peter's Friends">
        <option value="Cleveland">Cleveland Brown</option>    
        <option value="Joe" selected>Joe Swanson</option>    
        <option value="Quagmire">Glenn Quagmire</option>    
    </optgroup>    
    <option value="Evil Monkey">Evil Monkey</option>
    <option value="Herbert">John Herbert</option>
</select>

<select id="custom-texts" name="character10" multiple>   
    <optgroup label="The Griffins">
        <option value="Peter">Peter Griffin</option>
        <option value="Lois" selected>Lois Griffin</option>
        <option value="Chris">Chris Griffin</option>
        <option value="Meg">Meg Griffin</option>
        <option value="Stewie">Stewie Griffin</option>
    </optgroup>    
    <optgroup label="Peter's Friends">
        <option value="Cleveland">Cleveland Brown</option>    
        <option value="Joe" selected>Joe Swanson</option>    
        <option value="Quagmire">Glenn Quagmire</option>    
    </optgroup>    
    <option value="Evil Monkey">Evil Monkey</option>
    <option value="Herbert">John Herbert</option>
</select>


## Proper positioning of the option popup

Note: this is an advanced technique you most propably won't ever need. But if you ever need it, you might want to take a closer look at the internal structure of SOL to know which elements exist in the `this` scope.

The position of the option popup needs to be recalculated every time the popup is opened or the position of the searchable option list changes (e.g. when scrolling). This is due to the fact, that the popup needs to be positioned fixed on the screen to break out of parent containers. If the popup wasn't to be positioned like that, half of it could be cut off due to the container constraints.

Here is an example to show you what I mean: The red border is a parent container with a fixed height (for example it could be a modal popup). For the SOL popup to break out of the container and display itself beyond the parent's bounds, we need to position it fixed on the screen:

<p id="positionshowcase">
Click any SOL to see the difference<br>

<select name="character12" multiple>   
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

<select name="character13" multiple>   
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
</p>

Unfortunately fixed elements can not automatically be positioned relative to another object so we have to take care of the ourselves. Most of the time the default implementation of the positioning algorithm should suit your needs but in some cases you might have to override it and position the popup yourself.

You do that in the `onScroll` event which gets called whenever the set `scrollTarget` is scrolled. The default scrollTarget to listen for scroll elements is the browser window `$(window)` but you could also set it to your content area in the options like this:

{% highlight html %}
<select id="my-select" name="character"></select>

<script type="text/javascript">
$(function() {
    
    $('#my-select').searchableOptionList({
        scrollTarget: $('#my-content-area'),    // change the scrollTarget if neccessary
        events: {
           
            // override the default onScroll positioning event if neccessary
            onScroll: function () {
                // gets called when the contents of the
                // my-content-area container are scrolled
                
                // now you need to position sol popup
                // below is the default implementation to
                // give you a hint how to position the popup
                // adapt it to your needs
                // 
                // you have access to all internal SOL attributes via "this."
                
                var posY = this.$input.offset().top - this.config.scrollTarget.scrollTop() + this.$input.outerHeight(),
                    selectionContainerWidth = this.$innerContainer.outerWidth(false) - parseInt(this.$selectionContainer.css('border-left-width'), 10) - parseInt(this.$selectionContainer.css('border-right-width'), 10);

                if (this.$innerContainer.css('display') !== 'block') {
                    // container has a certain width
                    // make selection container a bit wider
                    selectionContainerWidth = Math.ceil(selectionContainerWidth * 1.2);
                } else {
                    // no border radius on top
                    this.$selectionContainer
                        .css('border-top-right-radius', 'initial');

                    if (this.$actionButtons) {
                        this.$actionButtons
                            .css('border-top-right-radius', 'initial');
                    }
                }

                this.$selectionContainer
                    .css('top', Math.floor(posY))
                    .css('left', Math.floor(this.$container.offset().left))
                    .css('width', selectionContainerWidth);
            }
        }
    });
    
});    
</script>
{% endhighlight %}

<style type="text/css">    
    #positionshowcase {
        border: 1px solid red;
        padding: 5px;
        height: 140px;
        overflow: auto;
    }
    
    #positionshowcase .sol-container {
        display: inline-block;    
    }
    
    #positionshowcase .sol-container:nth-of-type(1) .sol-selection-container {
        position: absolute;
        top: 30px;
        width: 280px;
    }
</style>

<script type="text/javascript">
    $(function() {
        $('#demonstration').searchableOptionList({ maxHeight: '300px', showSelectAll: true });
       
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
        
        $('#my-verylong-select').searchableOptionList({ maxHeight: '250px' });
        $('#my-multiselect-all').searchableOptionList({ showSelectAll: true });
        $('#null-allowed-select').searchableOptionList({ allowNullSelection: true });        
        $('#default-texts').searchableOptionList({ showSelectAll: true });
        $('#custom-texts').searchableOptionList({            
            showSelectAll: true,
            texts: {
                noItemsAvailable: 'Go on, nothing to see here',
                selectAll: 'Get em all',
                selectNone: 'Nah',
                quickDelete: 'Kick',
                searchplaceholder: 'Giggity giggity...'
            }
        });
        
        $('#positionshowcase select:first').searchableOptionList({
            texts: {
                searchplaceholder: 'Not fixed'
            },
            events: {
                onScroll: function () {}
            }
        });
        $('#positionshowcase select:not(:first)').searchableOptionList({
            texts: {
                searchplaceholder: 'Fixed'
            }
        });
    });
</script>
