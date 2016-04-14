/**
 * SOL core functionality
 */
SearchableOptionList.SOL = function ($element, options) {
    this.$originalElement = $element;
    this.options = options;

    // allow setting options as data attribute
    // e.g. <select data-sol-options="{'allowNullSelection':true}">
    this.metadata = this.$originalElement.data('sol-options');
};

SearchableOptionList.SOL.DATA_KEY = "sol-element";
SearchableOptionList.SOL.WINDOW_EVENTS_KEY = "sol-window-events";
SearchableOptionList.SOL.prototype = {

    // default option values
    defaults: {
        data: undefined,
        name: undefined,           // name attribute, can also be set as name="" attribute on original element or data-sol-name=""


        texts: {
            noItemsAvailable: 'No entries found',
            selectAll: 'Select all',
            selectNone: 'Select none',
            quickDelete: '&times;',
            searchplaceholder: 'Click here to search',
            loadingData: 'Still loading data...',
            itemsSelected: '{$a} items selected'
        },

        events: {
            onInitialized: undefined,
            onRendered: undefined,
            onOpen: undefined,
            onClose: undefined,
            onChange: undefined,
            onScroll: undefined
        },

        selectAllMaxItemsThreshold: 30,
        showSelectAll: function () {
            return this.config.multiple && this.config.selectAllMaxItemsThreshold && this.items && this.items.length <= this.config.selectAllMaxItemsThreshold;
        },

        useBracketParameters: false,
        multiple: undefined,
        showSelectionBelowList: false,
        allowNullSelection: false,
        scrollTarget: undefined,
        maxHeight: undefined,
        converter: undefined,
        asyncBatchSize: 300,
        maxShow: 0
    },

    /**
     * Initializes this sol element
     */
    init: function () {
        this.config = $.extend(true, {}, this.defaults, this.options, this.metadata);
        this.config.events.onScroll = this.config.events.onScroll || new SearchableOptionList.DefaultScrollListener(this).handleScroll;
        this.config.multiple = this.config.multiple || this.$originalElement.attr('multiple');

        if (!this._validateOptions()) {
            return;
        }

    },

    /**
     * Returns whether all required options are set and valid
     * @returns {boolean}
     * @private
     */
    _validateOptions: function () {
        var requiredOptionsPresent = true;
        requiredOptionsPresent = requiredOptionsPresent && this._nameAttributeValid();
        return requiredOptionsPresent;
    },

    /**
     * Returns if the name attribute is present
     * @returns {boolean}
     * @private
     */
    _nameAttributeValid: function () {
        if (!this._getNameAttribute()) {
            this._showErrorLabel("required 'name' attribute not found");
            return false;
        }
        return true;
    },

    /**
     * Returns the name attribute. Either retrieved from the config options
     * the original element's data object or the original elements name attribute
     * @returns {string}
     * @private
     */
    _getNameAttribute: function () {
        return this.config.name || this.$originalElement.data('sol-name') || this.$originalElement.attr('name');
    },

    /**
     * Displays an error message for this SOL instance
     * @param message
     * @private
     */
    _showErrorLabel: function (message) {
        var $errorMessage = $('<div class="sol-error-message" />').html(message);
        if (!this.$container) {
            $errorMessage.insertAfter(this.$originalElement);
        } else {
            this.$container.append($errorMessage);
        }
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
