/**
 * SOL core functionality
 */
SearchableOptionList.SOL = function ($element, options) {

};

SearchableOptionList.SOL.DATA_KEY = "sol-element";
SearchableOptionList.SOL.WINDOW_EVENTS_KEY = "sol-window-events";
SearchableOptionList.SOL.prototype = {

    init: function () {
        console.log("Initializing SOL");
    }

};

/**
 * jquery plugin registration
 */
$.fn.searchableOptionList = function (options) {
    var result = [];
    this.each(function () {
        var $this = $(this),
            $alreadyInitializedSol = $this.data(SearchableOptionList.SOL.DATA_KEY);

        if ($alreadyInitializedSol) {
            result.push($alreadyInitializedSol);
        } else {
            var newSol = new SearchableOptionList.SOL($this, options);
            result.push(newSol);

            setTimeout(function () {
                newSol.init();
            }, 0);
        }
    });

    if (result.length === 1) {
        return result[0];
    }

    return result;
};
