/// <reference path="../includes/jquery.d.ts" />
/// <reference path="sol-data-provider.ts"/>
/// <reference path="sol-event-listeners.ts"/>
import DataProvider = SearchableOptionList.DataProvider;
import DefaultEventListenerAdapter = SearchableOptionList.DefaultEventListenerAdapter;

module SearchableOptionList {

    export class SolOptions {

        data:DataProvider;
        name:string;
        texts:SolTexts = new SolTexts();
        events:SolEventsHandler = new SolEventsHandler();

        constructor(options:any) {
            console.log("Creating new SolOptions from options");
        }
    }

    export class SolTexts {

        static noItemsAvailable:string = 'No entries found';
        static selectAll:string = 'Select all';
        static selectNone:string = 'Select none';
        static quickDelete:string = '&times;';
        static searchplaceholder:string = 'Click here to search';
        static loadingData:string = 'Still loading data...';
        static itemsSelected:string = '{$a} items selected';

        noItemsAvailable:string = SolTexts.noItemsAvailable;
        selectAll:string = SolTexts.selectAll;
        selectNone:string = SolTexts.selectNone;
        quickDelete:string = SolTexts.quickDelete;
        searchplaceholder:string = SolTexts.searchplaceholder;
        loadingData:string = SolTexts.loadingData;
        itemsSelected:string = SolTexts.itemsSelected;

    }

    class SolEventsHandler {

        onInitialized:OnInitializedListener = DefaultEventListenerAdapter.instance;
        onRendered:OnRenderedListener = DefaultEventListenerAdapter.instance;
        onOpen:OnOpenListener = DefaultEventListenerAdapter.instance;
        onClose:OnCloseListener = DefaultEventListenerAdapter.instance;
        onChange:OnChangeListener = DefaultEventListenerAdapter.instance;
        onScroll:OnScrollListener = DefaultEventListenerAdapter.instance;

    }

}




