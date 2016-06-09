var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../includes/jquery.d.ts" />
var SearchableOptionList;
(function (SearchableOptionList) {
    /**
     * Base class for SolOption and SolOptionGroup
     */
    var BaseSolOption = (function () {
        function BaseSolOption($elem, label) {
            this.label = label;
            this.disabled = $elem.prop('disabled');
            this.tooltip = $elem.attr('title');
        }
        return BaseSolOption;
    }());
    /**
     * A selectable SOL option
     */
    var SolOption = (function (_super) {
        __extends(SolOption, _super);
        function SolOption($option) {
            _super.call(this, $option, $option.html());
            this.value = $option.val();
            this.selected = $option.prop('selected');
            this.cssClass = $option.attr('class');
            this.element = $option;
        }
        return SolOption;
    }(BaseSolOption));
    /**
     * Representation of a group of SolOptions
     */
    var SolOptionGroup = (function (_super) {
        __extends(SolOptionGroup, _super);
        function SolOptionGroup($optionGroup) {
            _super.call(this, $optionGroup, $optionGroup.attr('label'));
        }
        return SolOptionGroup;
    }(BaseSolOption));
})(SearchableOptionList || (SearchableOptionList = {}));
var SearchableOptionList;
(function (SearchableOptionList) {
    var OriginalElementDataProvider = (function () {
        function OriginalElementDataProvider() {
        }
        OriginalElementDataProvider.prototype.fetchData = function (meh) {
            console.log("Fetching data");
        };
        return OriginalElementDataProvider;
    }());
    SearchableOptionList.OriginalElementDataProvider = OriginalElementDataProvider;
})(SearchableOptionList || (SearchableOptionList = {}));
var SearchableOptionList;
(function (SearchableOptionList) {
    var DefaultEventListenerAdapter = (function () {
        function DefaultEventListenerAdapter() {
        }
        DefaultEventListenerAdapter.prototype.doIt = function (meh) {
            console.log("junge");
        };
        DefaultEventListenerAdapter.instance = new DefaultEventListenerAdapter();
        return DefaultEventListenerAdapter;
    }());
    SearchableOptionList.DefaultEventListenerAdapter = DefaultEventListenerAdapter;
})(SearchableOptionList || (SearchableOptionList = {}));
var DefaultEventListenerAdapter = SearchableOptionList.DefaultEventListenerAdapter;
var SearchableOptionList;
(function (SearchableOptionList) {
    var SolOptions = (function () {
        function SolOptions(options) {
            this.texts = new SolTexts();
            this.events = new SolEventsHandler();
            console.log("Creating new SolOptions from options");
        }
        return SolOptions;
    }());
    SearchableOptionList.SolOptions = SolOptions;
    var SolTexts = (function () {
        function SolTexts() {
            this.noItemsAvailable = SolTexts.noItemsAvailable;
            this.selectAll = SolTexts.selectAll;
            this.selectNone = SolTexts.selectNone;
            this.quickDelete = SolTexts.quickDelete;
            this.searchplaceholder = SolTexts.searchplaceholder;
            this.loadingData = SolTexts.loadingData;
            this.itemsSelected = SolTexts.itemsSelected;
        }
        SolTexts.noItemsAvailable = 'No entries found';
        SolTexts.selectAll = 'Select all';
        SolTexts.selectNone = 'Select none';
        SolTexts.quickDelete = '&times;';
        SolTexts.searchplaceholder = 'Click here to search';
        SolTexts.loadingData = 'Still loading data...';
        SolTexts.itemsSelected = '{$a} items selected';
        return SolTexts;
    }());
    SearchableOptionList.SolTexts = SolTexts;
    var SolEventsHandler = (function () {
        function SolEventsHandler() {
            this.onInitialized = SearchableOptionList.DefaultEventListenerAdapter.instance;
            this.onRendered = SearchableOptionList.DefaultEventListenerAdapter.instance;
            this.onOpen = SearchableOptionList.DefaultEventListenerAdapter.instance;
            this.onClose = SearchableOptionList.DefaultEventListenerAdapter.instance;
            this.onChange = SearchableOptionList.DefaultEventListenerAdapter.instance;
            this.onScroll = SearchableOptionList.DefaultEventListenerAdapter.instance;
        }
        return SolEventsHandler;
    }());
})(SearchableOptionList || (SearchableOptionList = {}));
/// <reference path="../includes/jquery.d.ts" />
var SearchableOptionList;
(function (SearchableOptionList) {
    var Sol = (function () {
        function Sol() {
            console.log("Construct SOL");
        }
        Sol.prototype.initialize = function (options) {
            console.log("invocation of initialize with %o", options);
            console.log(options.texts.loadingData);
        };
        Sol.DATA_KEY = "sol-element";
        return Sol;
    }());
    SearchableOptionList.Sol = Sol;
})(SearchableOptionList || (SearchableOptionList = {}));
var SolOptions = SearchableOptionList.SolOptions;
var Sol = SearchableOptionList.Sol;
/**
 * Boilerplate code to expose sol as a jQuery plugin
 */
(function ($, window, document) {
    $.fn.searchableOptionList = function (options) {
        var result = [];
        this.each(function () {
            var $this = $(this), $alreadyInitializedSol = $this.data(Sol.DATA_KEY);
            if ($alreadyInitializedSol) {
                result.push($alreadyInitializedSol);
            }
            else {
                var sol_1 = new Sol();
                var solOptions_1 = new SolOptions(options);
                setTimeout(function () {
                    sol_1.initialize(solOptions_1);
                }, 0);
                result.push(sol_1);
            }
        });
        if (result.length === 1) {
            return result[0];
        }
        return result;
    };
})(jQuery, window, document);
//# sourceMappingURL=sol.js.map