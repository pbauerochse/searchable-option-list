(function ($) {

    test("Validate OptionGroup can be constructed", function (assert) {
        var testLabel = "Some label",
            $htmlOptgroup = $("<optgroup/>").attr("label", testLabel),
            optionGroup = new SearchableOptionList.OptionGroup($htmlOptgroup);

        assert.notEqual(optionGroup, undefined, "Could not construct optionGroup");
    });

    test("Validate all OptionGroup attributes are present", function (assert) {
        var testLabel = "Some label",
            $htmlOptgroup = $("<optgroup/>").attr("label", testLabel),
            optionGroup = new SearchableOptionList.OptionGroup($htmlOptgroup);

        assert.equal(optionGroup.type, 'optiongroup');
        assert.equal(optionGroup.label, testLabel);
        assert.equal(optionGroup.tooltip, undefined);
        assert.equal(optionGroup.disabled, false);
        assert.notEqual(optionGroup.children, undefined);
        assert.ok(optionGroup.children.length === 0);
    });

}(jQuery));



