(function ($) {

    test("Validate namespace is present", function (assert) {
        assert.notEqual(SearchableOptionList, undefined, "SearchableOptionList namespace not found");
    });

    test("Validate global keys", function(assert) {
        assert.equal(SearchableOptionList.DATA_KEY, "sol-element", "SOL data key not present");
        assert.equal(SearchableOptionList.WINDOW_EVENTS_KEY, "sol-window-events", "SOL data key not present");
    });

    test("Validate SOL.Option is present", function (assert) {
        assert.notEqual(SearchableOptionList.Option, undefined, "SearchableOptionList.Option not found");
    });

    test("Validate SOL.OptionGroup is present", function (assert) {
        assert.notEqual(SearchableOptionList.OptionGroup, undefined, "SearchableOptionList.OptionGroup not found");
    });

}(jQuery));



