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
