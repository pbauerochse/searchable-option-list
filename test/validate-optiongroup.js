(function ($) {

    test("Validate OptionGroup can be constructed", function (assert) {
        var testLabel = "Some label",
            optionGroup = new SearchableOptionList.OptionGroup(testLabel);

        assert.notEqual(optionGroup, undefined, "Could not construct optionGroup");
    });

    test("Validate all OptionGroup attributes are present", function (assert) {
        var testLabel = "Some label",
            option = new SearchableOptionList.OptionGroup(testLabel);

        assert.equal(option.type, 'optiongroup');
        assert.equal(option.label, testLabel);
        assert.equal(option.tooltip, undefined);
        assert.equal(option.disabled, false);
        assert.equal(option.children, undefined);
    });

}(jQuery));



