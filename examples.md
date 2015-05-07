---
layout: default
includeSol: true
title:  Examples
tabId:  examples
---

Examples
========

# Prerequisites
First of all you need to have jQuery included in your HTML, then you simply include the SOL js file and the SOL stylesheet.

{% highlight html %}
<!-- basic HTML code ommited -->
<head>
    <link rel="stylesheet" href="searchableOptionList.css">
    <script type="text/javascript" src="jQuery.js"></script>
    <script type="text/javascript" src="searchableOptionList.js"></script>
</head>
{% endhighlight %}

That's all you need to get started.

# Basic usage

The most basic usage is to initialize the plugin on your `<select>` element without any parameters:

{% highlight html %}
<select id="my-select" name="character">
    <option value="Peter">Peter</option>
    <option value="Lois">Lois</option>
    <option value="Chris">Chris</option>
    <option value="Meg">Meg</option>
    <option value="Stewie">Stewie</option>
    <option value="Cleveland">Cleveland</option>    
    <option value="Joe">Joe</option>    
    <option value="Quagmire">Quagmire</option>    
    <option value="Evil Monkey">Evil Monkey</option>    
</select>

<script type="text/javascript">
    $(function() {
        $('#my-select').searchableOptionList();
    });
</script>
{% endhighlight %}

Which outputs the following result:

<select id="my-select" name="character">
    <option value="Peter">Peter</option>
    <option value="Lois">Lois</option>
    <option value="Chris">Chris</option>
    <option value="Meg">Meg</option>
    <option value="Stewie">Stewie</option>
    <option value="Cleveland">Cleveland</option>    
    <option value="Joe">Joe</option>    
    <option value="Quagmire">Quagmire</option>    
    <option value="Evil Monkey">Evil Monkey</option>    
</select>

The selected entry will be shown on top of the HTML element. When you open the option list, you will see, that all the options are shown with a radio button in front of it. That's because the original select was a single selection element.

**So how do we allow selecting more than one entry?**

Well, how do you allow selecting multiple options in a regular `<select>`? Right, simply add the `multiple="multiple"` attribute!
SOL will adapt accordingly. Easy as pie! Let's try it out:

{% highlight html %}
<select id="my-select" name="character" multiple="multiple">
    <option value="Peter">Peter</option>
    <option value="Lois">Lois</option>
    <option value="Chris">Chris</option>
    <option value="Meg">Meg</option>
    <option value="Stewie">Stewie</option>
    <option value="Cleveland">Cleveland</option>    
    <option value="Joe">Joe</option>    
    <option value="Quagmire">Quagmire</option>    
    <option value="Evil Monkey">Evil Monkey</option>    
</select>
{% endhighlight %}

<select id="my-multiple-select" name="character" multiple="multiple">
    <option value="Peter">Peter</option>
    <option value="Lois">Lois</option>
    <option value="Chris">Chris</option>
    <option value="Meg">Meg</option>
    <option value="Stewie">Stewie</option>
    <option value="Cleveland">Cleveland</option>    
    <option value="Joe">Joe</option>    
    <option value="Quagmire">Quagmire</option>    
    <option value="Evil Monkey">Evil Monkey</option>    
</select>


<script type="text/javascript">
    $(function() {
        $('#my-select').searchableOptionList();
        $('#my-multiple-select').searchableOptionList();
    });
</script>
