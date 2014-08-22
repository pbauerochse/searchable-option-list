# Searchable Option List

Searchable Option List (SOL) is a [jQuery](http://www.jquery.com) plugin which enhances your `<select>` HTML elements and makes the options searchable. It will also work for option lists marked as `multiple`.

## Basic usage

1. Include the library and css style
   
   ```html
   <script src="searchableOptionList.js"></script>
   <link href="searchableOptionList.css" rel="stylesheet" />
   ```

2. Initialize your existing `<select>` elements

   ```javascript
   $('select').searchableOptionList();
   ```

**Please Note**: In order to work properly every `<select>` needs to have the `name` attribute defined.

## Options

To better suit your needs, Searchable Option List comes with a bunch of options which influence it's behaviour.

| Option | Type | Default | Description | Example |
|--------|------|---------|-------------|---------|
|data|`empty`, `array`, `function`, `url` | `null` | The valid options to show. If you don't pass in the data option SOL will use any already defined `option` or `optgroup` in the original `select` element.<br><br>You can directly pass in the data as array or a function, that is called on initialization, which needs to return the data.<br><br>If you pass in a string, it will be interpreted as URL and an AJAX call to that URL will be done. That called URL should return an array with the data structure. | [Array](#array),<br>[Function](#function),<br>[URL](#url) |
|converter|`function`|`null`|If the data you pass in is not in the required [SOL format](#fata-format) you can define a function here which can then convert your given data format to the SOL format | [Example](#converter) 
|maxHeight|`string`|`null`|||
|onRendered|`function`|`null`|||
|texts|`object`||||
|classes|`object`||||
|useBracketParameters|`boolean`|`false`|||
|showSelectAll|`boolean`|`false`|||
|showSelection|`boolean`|`true`|||
|showSelectionBelowList|`boolean`|`false`|||
            

## Examples

### Data

#### Array
```javascript
$('select').searchableOptionList({
    data: [
        {
            type: 'option',
            value: 1,
            selected: false,
            disabled: false,
            label: 'My first option',
            tooltip: 'This is the first option, it has a tooltip'
        },
        {
            type: 'option',
            value: 2,
            selected: true,
            label: 'My second option'
        },
        ...
    ]
})
```

#### Function
```javascript
$('select').searchableOptionList({
    data: function(solInstance) {
            return [
                {
                    type: 'option',
                    value: 1,
                    selected: false,
                    disabled: false,
                    label: 'My first option',
                    tooltip: 'This is the first option, it has a tooltip'
                },
                {
                    type: 'option',
                    value: 2,
                    selected: true,
                    label: 'My second option'
                },
                ...
            ];
    }
})
```

#### URL
```javascript
$('select').searchableOptionList({ data: 'example.json' });
```

example.json then needs to return the data in the required format.

### Converter
If your URL or function can not return the required [SOL Format](#fata-format), you can define a converter which will be called with the raw data and then has to return the proper SOL format.

```javascript
var myNonWorkingData = [
    {id: 15, name: 'The name of the first item', active: true, /* ... */ },
    {id: 27, name: 'The name of the second item', active: false, /*... */},
    // ...
];

function myConverterFunction(rawData) {
    var convertedData = [];
    
    for (var i = 0; i < rawData.length; i++) {
        var currentItem = rawData[i];
        
        convertedData.push({
            type: 'option',
            value: currentItem.id,
            label: currentItem.name,
            selected: currentItem.active
        });
    }
    
    return convertedData;
}

$(select).searchableOptionList({
    data: myNonWorkingData,
    converter: myConverterFunction
});
```

## Data format

### Option

### Optiongroup
