;(function ($, window, document, undefined) {
 'use strict';
window.SearchableOptionList = {};

SearchableOptionList.Option = function (value) {
    this.value = value;
};

SearchableOptionList.Option.prototype = {
    type: 'option',        // fixed value
    value: undefined,      // value that will be submitted
    selected: false,       // boolean selected state
    disabled: false,       // boolean disabled state
    label: undefined,      // label string
    tooltip: undefined,    // tooltip string
    cssClass: ''           // custom css class for container
};

SearchableOptionList.OptionGroup = function (label) {
    this.label = label;
};

SearchableOptionList.Option.prototype = {
    type: 'optiongroup',    // fixed
    label: undefined,       // label string
    tooltip: undefined,     // tooltip string
    disabled: false,        // all children disabled boolean property
    children: undefined     // array of SOL_OPTION_FORMAT objects
};

// sol core definitions

}(jQuery, window, document));