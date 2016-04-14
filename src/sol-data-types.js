/**
 * base class for common properties
 */
SearchableOptionList.OptionsBase = function () {
    throw "Base class should not be constructed";
};

SearchableOptionList.OptionsBase.prototype = {
    label: undefined,      // label string
    disabled: false,       // boolean disabled state
    tooltip: undefined     // tooltip string
};

/**
 * class for a select option
 */
SearchableOptionList.Option = function ($option) {
    this.value = $option.val();
    this.selected = $option.prop('selected');
    this.disabled = $option.prop('disabled');
    this.cssClass = $option.attr('class');
    this.label = $option.html();
    this.tooltip = $option.attr('title');
    this.element = $option;
};

SearchableOptionList.Option.prototype = $.extend({}, SearchableOptionList.OptionsBase.prototype, {
    type: 'option',        // fixed value
    value: undefined,      // value that will be submitted
    selected: false,       // boolean selected state
    cssClass: ''           // custom css class for container
});

/**
 * class for an option group containing any amount of
 * child options
 */
SearchableOptionList.OptionGroup = function ($optgroup) {
    this.label = $optgroup.attr('label');
    this.tooltip = $optgroup.attr('title');
    this.disabled = $optgroup.prop('disabled');
    this.children = [];
};

SearchableOptionList.OptionGroup.prototype = $.extend({}, SearchableOptionList.OptionsBase.prototype, {
    type: 'optiongroup',    // fixed
    label: undefined,       // label string
    children: undefined     // array of SOL_OPTION_FORMAT objects
});

