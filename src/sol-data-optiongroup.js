SearchableOptionList.OptionGroup = function (label) {
    this.label = label;
};

SearchableOptionList.OptionGroup.prototype = {
    type: 'optiongroup',    // fixed
    label: undefined,       // label string
    tooltip: undefined,     // tooltip string
    disabled: false,        // all children disabled boolean property
    children: undefined     // array of SOL_OPTION_FORMAT objects
};
