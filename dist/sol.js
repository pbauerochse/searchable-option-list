;(function ($, window, document, undefined) {
 'use strict';
window.SearchableOptionList = {};

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
SearchableOptionList.Option = function (value, label) {
    this.value = value;
    this.label = label;
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
SearchableOptionList.OptionGroup = function (label) {
    this.label = label;
};

SearchableOptionList.OptionGroup.prototype = $.extend({}, SearchableOptionList.OptionsBase.prototype, {
    type: 'optiongroup',    // fixed
    label: undefined,       // label string
    children: undefined     // array of SOL_OPTION_FORMAT objects
});


/**
 * SOL core functionality
 */
SearchableOptionList.SOL = function ($element, options) {

};

SearchableOptionList.SOL.DATA_KEY = "sol-element";
SearchableOptionList.SOL.WINDOW_EVENTS_KEY = "sol-window-events";
SearchableOptionList.SOL.prototype = {

    init: function () {
        console.log("Initializing SOL");
    }

};

/**
 * jquery plugin registration
 */
$.fn.searchableOptionList = function (options) {
    var result = [];
    this.each(function () {
        var $this = $(this),
            $alreadyInitializedSol = $this.data(SearchableOptionList.SOL.DATA_KEY);

        if ($alreadyInitializedSol) {
            result.push($alreadyInitializedSol);
        } else {
            var newSol = new SearchableOptionList.SOL($this, options);
            result.push(newSol);

            setTimeout(function () {
                newSol.init();
            }, 0);
        }
    });

    if (result.length === 1) {
        return result[0];
    }

    return result;
};
}(jQuery, window, document));