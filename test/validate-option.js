(function ($) {

    test("Validate namespace is present", function (assert) {
        var testValue = 'Some value',
            option = new SearchableOptionList.Option(testValue);

        assert.notEqual(option, undefined, "Could not construct option");
        assert.notEqual(option.value, undefined, "value not present");
        assert.equal(option.value, testValue);
    });

    test("Validate all options are present", function (assert) {
        var testValue = 'Some value',
            option = new SearchableOptionList.Option(testValue);

        assert.equal(option.type, 'option');
        assert.equal(option.value, testValue);
        assert.equal(option.selected, false);
        assert.equal(option.disabled, false);
        assert.equal(option.label, undefined);
        assert.equal(option.tooltip, undefined);
        assert.equal(option.cssClass, '');
    });

}(jQuery));



