/// <reference path="../includes/jquery.d.ts" />
module SearchableOptionList {

    export class Sol {

        static DATA_KEY = "sol-element";

        constructor() {
            console.log("Construct SOL");
        }

        initialize(options:SolOptions) {
            console.log("invocation of initialize with %o", options);
            console.log(options.texts.loadingData);
        }

    }

}




