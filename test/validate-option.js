(function ($) {

    test("Validate Option can be constructed", function (assert) {
        var testValue = "Some value",
            testLabel = "Some label",
            option = new SearchableOptionList.Option(testValue, testLabel);

        assert.notEqual(option, undefined, "Could not construct option");
    });

    test("Validate all Option attributes are present", function (assert) {
        var testValue = "Some value",
            testLabel = "Some label",
            option = new SearchableOptionList.Option(testValue, testLabel);

        assert.equal(option.type, 'option');
        assert.equal(option.value, testValue);
        assert.equal(option.label, testLabel);
        assert.equal(option.selected, false);
        assert.equal(option.disabled, false);
        assert.equal(option.tooltip, undefined);
        assert.equal(option.cssClass, '');
    });

}(jQuery));



