module SearchableOptionList {

    export interface DataProvider {

        fetchData:(meh:string) => void;

    }

    export class OriginalElementDataProvider implements DataProvider {

        fetchData(meh:string):void {
            console.log("Fetching data");
        }

    }

}
