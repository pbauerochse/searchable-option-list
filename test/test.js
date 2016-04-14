(function ($) {
    module('SOL Basic Tests');

    test("Validate namespace is present", function (assert) {
        assert.notEqual(SearchableOptionList, undefined, "SearchableOptionList namespace not found");
    });

    test("Validate SOL.Option is present", function (assert) {
        assert.notEqual(SearchableOptionList.Option, undefined, "SearchableOptionList.Option not found");
    });

    test("Validate SOL.OptionGroup is present", function (assert) {
        assert.notEqual(SearchableOptionList.OptionGroup, undefined, "SearchableOptionList.OptionGroup not found");
    });

    test("hello test", function (assert) {
        assert.ok(1 == "1", "Passed!");
    });

}(jQuery));



