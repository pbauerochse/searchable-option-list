/**
 * Boilerplate code to expose sol as a jQuery plugin
 */
(function ($:JQueryStatic, window:Window, document:Document) {

    $.fn.searchableOptionList = function (options:any):SearchableOptionList.Sol[] {
        var result:SearchableOptionList.Sol[] = [];

        this.each(function () {
            var $this = $(this),
                $alreadyInitializedSol = $this.data(SearchableOptionList.Sol.DATA_KEY);

            if ($alreadyInitializedSol) {
                result.push($alreadyInitializedSol);
            } else {
                const sol:SearchableOptionList.Sol = new SearchableOptionList.Sol(options);

                setTimeout(function () {
                    sol.initialize();
                }, 0);

                result.push(sol);
            }
        });

        return result;
    };

})(jQuery, window, document);
