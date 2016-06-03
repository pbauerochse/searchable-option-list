/// <reference path="../includes/jquery.d.ts" />
module SearchableOptionList {

    export class Sol {

        static DATA_KEY = "sol-element";

        constructor(options:any) {
            console.log("Init sol %o", options);
        }

        initialize(options:SolOptions) {
            console.log("invocation of initialize with %o", options);
        }

    }

}




