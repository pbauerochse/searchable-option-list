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
/// <reference path="../includes/jquery.d.ts" />
var SearchableOptionList;
(function (SearchableOptionList) {
    var SolOptions = (function () {
        function SolOptions() {
        }
        return SolOptions;
    }());
    SearchableOptionList.SolOptions = SolOptions;
})(SearchableOptionList || (SearchableOptionList = {}));
var SearchableOptionList;
(function (SearchableOptionList) {
    var DefaultScrollLister = (function () {
        function DefaultScrollLister() {
        }
        DefaultScrollLister.prototype.doIt = function (meh) {
            console.log("junge");
        };
        return DefaultScrollLister;
    }());
})(SearchableOptionList || (SearchableOptionList = {}));
/// <reference path="../includes/jquery.d.ts" />
var SearchableOptionList;
(function (SearchableOptionList) {
    var Sol = (function () {
        function Sol(options) {
            console.log("Init sol %o", options);
        }
        Sol.prototype.initialize = function (options) {
            console.log("invocation of initialize with %o", options);
        };
        Sol.DATA_KEY = "sol-element";
        return Sol;
    }());
    SearchableOptionList.Sol = Sol;
})(SearchableOptionList || (SearchableOptionList = {}));
/**
 * Boilerplate code to expose sol as a jQuery plugin
 */
(function ($, window, document) {
    $.fn.searchableOptionList = function (options) {
        var result = [];
        this.each(function () {
            var $this = $(this), $alreadyInitializedSol = $this.data(SearchableOptionList.Sol.DATA_KEY);
            if ($alreadyInitializedSol) {
                result.push($alreadyInitializedSol);
            }
            else {
                var sol_1 = new SearchableOptionList.Sol(options);
                setTimeout(function () {
                    sol_1.initialize();
                }, 0);
                result.push(sol_1);
            }
        });
        return result;
    };
})(jQuery, window, document);
//# sourceMappingURL=sol.js.map