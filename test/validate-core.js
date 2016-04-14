(function ($) {

    test("Validate constants", function (assert) {
        assert.notEqual(SearchableOptionList.SOL, undefined, "SOL class not found");
        assert.equal(SearchableOptionList.SOL.DATA_KEY, "sol-element", "SOL data key not present");
        assert.equal(SearchableOptionList.SOL.WINDOW_EVENTS_KEY, "sol-window-events", "SOL data key not present");
    });

    test("Validate SOL can be constructed", function (assert) {
        expect(0);
    });

}(jQuery));



