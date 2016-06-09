import SolOptions = SearchableOptionList.SolOptions;
import Sol = SearchableOptionList.Sol;

/**
 * Boilerplate code to expose sol as a jQuery plugin
 */
(function ($:JQueryStatic, window:Window, document:Document) {

    $.fn.searchableOptionList = function (options:any):any {
        var result:Sol[] = [];

        this.each(function () {
            var $this = $(this),
                $alreadyInitializedSol = $this.data(Sol.DATA_KEY);

            if ($alreadyInitializedSol) {
                result.push($alreadyInitializedSol);
            } else {
                const sol:Sol = new Sol();
                const solOptions:SolOptions = new SolOptions(options);

                setTimeout(function () {
                    sol.initialize(solOptions);
                }, 0);

                result.push(sol);
            }
        });

        if (result.length === 1) {
            return result[0];
        }

        return result;
    };

})(jQuery, window, document);
