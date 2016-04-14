(function ($) {

    test("Validate Option can be constructed", function (assert) {
        var testValue = "Some value",
            testLabel = "Some label",
            $selectOption = $('<option>').val(testValue).text(testLabel),
            option = new SearchableOptionList.Option($selectOption);

        assert.notEqual(option, undefined, "Could not construct option");
    });

    test("Validate all Option attributes are present", function (assert) {
        var testValue = "Some value",
            testLabel = "Some label",
            $selectOption = $('<option>').val(testValue).text(testLabel),
            option = new SearchableOptionList.Option($selectOption);

        assert.equal(option.type, 'option');
        assert.equal(option.value, testValue);
        assert.equal(option.label, testLabel);
        assert.equal(option.selected, false);
        assert.equal(option.disabled, false);
        assert.equal(option.tooltip, undefined);
        assert.equal(option.cssClass, undefined);
    });

}(jQuery));



