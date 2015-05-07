(function ($, window, document) {
    'use strict';

    window.SOL = {
        configuration : {
            texts : {
                noItemsAvailable: 'No entries found',
                selectAll: 'Select all',
                selectNone: 'Select none',
                quickDelete: '&times;'
            },
            classes: {
                selectAll: null,
                selectNone: null
            },
            useBracketParameters: false,
            showSelectAll: false,
            showSelection: true,
            showSelectionBelowList: false,
            allowNullSelection: false
        }
    };

    var PLUGIN_NAME = 'optionListCheckbox',
        DEFAULT_DATATYPE = '_sol_provided_',
        EVENTS_KEY = '_sol_events_',
        PLUGIN_KEY = 'plugin_' + PLUGIN_NAME,
        TYPE_OPTION_ITEM = {
            type: 'option',
            value: '',
            selected: false,
            disabled: false,
            label: '',
            tooltip: ''
        },
        TYPE_OPTION_GROUP = {
            type: 'optiongroup',
            label: '',
            tooltip: '',
            disabled: false
        },
        DEFAULT_OPTIONS = {
            data: DEFAULT_DATATYPE,
            maxHeight: null,
            converter: null,
            onRendered: null
        };

    function SearchableOptionList(element, options) {
        this.element = element;
        this.settings = $.extend(true, {}, window.SOL.configuration, DEFAULT_OPTIONS, options);
        this.items = [];
        this.useCheckboxes = element.prop('multiple');

        this.init();
    }

    $.extend(SearchableOptionList.prototype, {
        init : function () {
            var sol = this;
            this.addUiElements();

            if (!this.element.attr('name')) {
                this.addErrorLabel('name Attribute is required for single selection selects');
                return;
            }

            this.fetchData(function () {
                sol.registerEvents();

                // remove the original element since we completely replace it
                sol.element.remove();
                sol.element = undefined;
            });
        },

        addUiElements: function () {
            this.container = $('<div class="sol-container" />');
            this.inputContainer = $('<div class="sol-input-container" />');
            this.input = $('<input type="text" />');
            this.caret = $('<div class="sol-caret-container"><b class="caret" /></div>');
            this.selection = $('<div class="sol-selection" />');
            this.noResultsItem = $('<div class="sol-no-results"></div>').html(this.settings.texts.noItemsAvailable).hide();
            this.selectionContainer = $('<div class="sol-selection-container" />').append(this.noResultsItem).append(this.selection);

            if (this.settings.maxHeight) {
                this.selectionContainer.css('max-height', this.settings.maxHeight);
            }

            this.inputContainer
                .append(this.input)
                .append(this.caret)
                .append(this.selectionContainer);

            this.container
                .append(this.inputContainer)
                .insertBefore(this.element);

            if (this.settings.showSelection) {
                this.showSelectionContainer = $('<div class="sol-current-selection" />');

                if (this.settings.showSelectionBelowList) {
                    this.showSelectionContainer.insertAfter(this.inputContainer);
                } else {
                    this.showSelectionContainer.insertBefore(this.inputContainer);
                }
            }

            if (this.settings.showSelectAll && this.useCheckboxes) {
                var iocl = this;
                this.deselectAllButton = $('<a href="#" class="sol-deselect-all" />')
                    .on('click', function (e) { e.preventDefault(); iocl.deselectAll(); return false; })
                    .html(this.settings.texts.selectNone);

                if (this.settings.classes.selectNone) {
                    this.deselectAllButton.addClass(this.settings.classes.selectNone);
                }

                this.selectAllButton = $('<a href="#" class="sol-select-all" />')
                    .on('click', function (e) { e.preventDefault(); iocl.selectAll(); return false; })
                    .html(this.settings.texts.selectAll);

                if (this.settings.classes.selectAll) {
                    this.selectAllButton.addClass(this.settings.classes.selectAll);
                }

                this.actionButtons = $('<div class="sol-action-buttons" />')
                    .append(this.selectAllButton)
                    .append(this.deselectAllButton)
                    .append('<div class="sol-clearfix"></div>');
                this.selectionContainer.prepend(this.actionButtons);
            }

            // maximum of original <select> width and default <input> width
            this.input.css('width', Math.max(this.input.outerWidth(false), $(this.element).outerWidth(false)));

            if ($.isFunction(this.settings.onRendered)) {
                this.settings.onRendered.call(this);
            }
        },

        fetchData: function (callback) {
            var sol = this,
                doRender = true;

            if (this.settings.data === DEFAULT_DATATYPE) {
                this.items = this.getDataFromSelectElement();
            } else if ($.isFunction(this.settings.data)) {
                this.items = this.settings.data(this);
            } else if ($.isArray(this.settings.data)) {
                this.items = this.settings.data;
            } else if (typeof this.settings.data === 'string') {
                doRender = false;
                $.ajax(this.settings.data, {
                    success: function (actualData) {
                        sol.items = actualData;
                        sol.postProcessDataAndRender();
                        callback();
                    }
                });
            } else {
                this.addErrorLabel('Invalid data type');
                doRender = false;
            }

            if (doRender) {
                this.postProcessDataAndRender();
                callback();
            }
        },

        postProcessDataAndRender: function () {
            if ($.isFunction(this.settings.converter)) {
                this.items = this.settings.converter(this.items);
            }

            this.renderData();
        },

        renderData: function () {
            var sol = this;

            if (!this.items) {
                this.addErrorLabel('Data items not set. Maybe the converter did not return any values');
                return;
            }

            if (this.items.length === 0) {
                this.noResultsItem.show();
                return;
            }

            $.each(this.items, function (index, item) {
                if (item.type === 'option') {
                    sol.renderOption(index, item, sol.selection);
                } else {
                    sol.renderOptionGroup(index, item, sol.selection);
                }
            });
        },

        getDataFromSelectElement: function () {
            var dataArray = [],
                sol = this;

            $.each(this.element.children(), function (index, item) {
                var $item = $(item),
                    tagName = $item.prop('tagName').toLowerCase(),
                    converted;

                if ('option' === tagName) {
                    converted = sol.onHtmlOption(index, $item);
                    if (converted) {
                        converted.element = $item;
                        dataArray.push(converted);
                    }
                } else if ('optgroup' === tagName) {
                    converted = sol.onHtmlOptionGroup(index, $item);
                    if (converted) {
                        dataArray.push(converted);
                    }
                } else {
                    sol.addErrorLabel('Invalid element found in select: ' + tagName + '. Only option and optiongroup are allowed');
                }
            });

            return dataArray;
        },

        applySearch: function () {
            if (!this.items || this.items.length === 0) { return; }

            var searchTerm = this.input.val(),
                searchTermLowerCased = (searchTerm || '').toLowerCase();

            this.selectionContainer.find('.sol-filtered-search').removeClass('sol-filtered-search');
            this.noResultsItem.hide();

            if (searchTerm && searchTerm.trim().length > 0) {
                this.findTerms(this.items, searchTermLowerCased);
            }
        },

        findTerms: function (dataArray, searchTerm) {
            if (!dataArray || !$.isArray(dataArray) || dataArray.length === 0) { return; }

            var sol = this;

            $.each(dataArray, function (index, item) {
                if (item.type === 'option') {
                    var $element = item.displayElement,
                        elementSearchableTerms = (item.label + ' ' + item.tooltip).trim().toLowerCase();

                    if (elementSearchableTerms.indexOf(searchTerm) === -1) {
                        $element.addClass('sol-filtered-search');
                    }
                } else {
                    sol.findTerms(item.children, searchTerm);
                    var amountOfUnfilteredChildren = item.displayElement.find('.sol-option:not(.sol-filtered-search)');

                    if (amountOfUnfilteredChildren.length === 0) {
                        item.displayElement.addClass('sol-filtered-search');
                    }
                }
            });

            if (this.selectionContainer.find('.sol-option:not(.sol-filtered-search)').length === 0) {
                this.noResultsItem.show();
            } else {
                this.noResultsItem.hide();
            }
        },

        registerEvents: function () {
            var sol = this;

            // global events nur einmal
            if (!window[EVENTS_KEY]) {
                $(document).on('click', function (e) {
                    var $closestSolContainer = $(e.target).closest('.sol-container'),
                        $currentItem = $closestSolContainer.first();

                    if (!$closestSolContainer.length) {
                        // clicked outside of any sol-container
                        $('.sol-container.active').removeClass('active')
                            .find('input[type="text"]').val('').trigger('keyup');
                    } else {
                        $('.sol-container.active').not($currentItem).each(function (index, item) {
                            $(item).removeClass('active')
                                .find('input[type="text"]').val('').trigger('keyup');
                        });
                    }
                });
                window[EVENTS_KEY] = new Date().getTime();
            }

            // element events mehrfach
            if (!$.data(this.element, EVENTS_KEY)) {
                this.caret.on('click', function () {
                    sol.container.toggleClass('active');
                });

                this.input
                    .on('focus', function () {
                        sol.container.addClass('active');
                    })
                    .on('keyup', function (e) {
                        var keyCode = e.keyCode;
                        if (keyCode === 27) {
                            sol.input.val('');
                        }

                        if (keyCode === 16 || keyCode === 17 || keyCode === 18 || keyCode === 20) {
                            return;
                        }

                        sol.applySearch();
                    });

                $.data(this.element, EVENTS_KEY, new Date().getTime());
            }
        },

        onHtmlOption: function (index, $element) {
            return $.extend({}, TYPE_OPTION_ITEM, {
                value: $element.attr('value'),
                selected: $element.prop('selected'),
                disabled: $element.prop('disabled'),
                label: $element.html(),
                tooltip: $element.attr('title'),
                element: $element
            });
        },

        onHtmlOptionGroup: function (index, $element) {
            var optionGroup = $.extend({}, TYPE_OPTION_GROUP, {
                label: $element.attr('label'),
                tooltip: $element.attr('title'),
                disabled: $element.prop('disabled')
            }),
                childOptions = $element.children('option'),
                sol = this;
            optionGroup.children = [];

            $.each(childOptions, function (childIndex, child) {
                var $child = $(child),
                    childDataItem = sol.onHtmlOption(childIndex, $child);

                if (childDataItem) {
                    if (optionGroup.disabled) {
                        childDataItem.disabled = true;
                    }

                    childDataItem.parent = optionGroup;
                    optionGroup.children.push(childDataItem);
                }
            });

            return optionGroup;
        },

        renderOption: function (index, item, $container) {
            var $uiInput,
                inputName = this.element.attr('name'),
                sol = this;

            if (this.useCheckboxes) {
                $uiInput = $('<input type="checkbox" class="sol-checkbox" />');

                if (this.settings.useBracketParameters) {
                    inputName += '[]';
                }
            } else {
                $uiInput = $('<input type="radio" class="sol-radio" />')
                    .on('change', function () {
                        sol.selectionContainer.find('input[type="radio"][name="' + inputName + '"]').not($(this)).trigger('sol-deselect');
                    })
                    .on('sol-deselect', function () {
                        var $myDisplayItem = $(this).data('sol-item').displaySelectionItem;
                        if ($myDisplayItem) {
                            $myDisplayItem.remove();
                        }
                    });
            }

            $uiInput
                .prop('checked', item.selected)
                .prop('disabled', item.disabled)
                .attr('name', inputName)
                .data('sol-item', item)
                .val(item.value);

            var $label = $('<label class="sol-label" />')
                    .attr('title', item.tooltip)
                    .html(item.label)
                    .prepend($uiInput),

                $entry = $('<div class="sol-option" />')
                    .append($label);

            item.displayElement = $entry;

            if (this.settings.showSelection) {
                $uiInput.on('change', function () {
                    if ($(this).prop('checked')) {
                        sol.addSelectionDisplayItem(item, $uiInput);
                    } else {
                        item.displaySelectionItem.remove();
                    }
                });

                if (item.selected) {
                    this.addSelectionDisplayItem(item, $uiInput);
                }
            }

            $container.append($entry);
        },

        addSelectionDisplayItem: function (item, $uiInput) {
            var $displaySelectionItem = $('<div class="sol-selected-display-item" />')
                    .html(item.label)
                    .attr('title', item.tooltip)
                    .appendTo(this.showSelectionContainer);

            if (this.useCheckboxes || this.settings.allowNullSelection) {
                $('<span class="sol-quick-delete" />')
                    .html(this.settings.texts.quickDelete)
                    .on('click', function () {
                        $uiInput.prop('checked', false);
                        $displaySelectionItem.remove();
                    })
                    .prependTo($displaySelectionItem);
            }

            item.displaySelectionItem = $displaySelectionItem;
        },

        renderOptionGroup: function (index, item, $container, attachAndCreateElements) {
            var $groupCaption = $('<div class="sol-optiongroup-label">')
                    .attr('title', item.tooltip)
                    .html(item.label),
                $groupItem = $('<div class="sol-optiongroup" />')
                    .append($groupCaption),
                sol = this;

            if (item.disabled) {
                $groupItem.addClass('disabled');
            }

            if ($.isArray(item.children)) {
                $.each(item.children, function (childIndex, child) {
                    sol.renderOption(childIndex, child, $groupItem, attachAndCreateElements);
                });
            }

            item.displayElement = $groupItem;

            $container.append($groupItem);
        },

        selectAll: function () {
            this.selectionContainer
                .find('input[type="checkbox"]:not([disabled], :checked)')
                .prop('checked', true)
                .trigger('change');
        },

        deselectAll: function () {
            this.selectionContainer
                .find('input[type="checkbox"]:not([disabled]):checked')
                .prop('checked', false)
                .trigger('change');
        },

        getSelection: function () {
            return this.element.find('option:selected');
        },

        addErrorLabel: function (message) {
            if (!this.container) {
                alert('Error: this.container not set yet. This is a bug in the plugin and needs to be fixed');
            } else {
                this.container.append($('<div style="color: red; font-weight: bold;" />').html(message));
            }
        }
    });

	$.fn.searchableOptionList = function (options) {
        if (this.length === 1) {
            if (!$.data(this, PLUGIN_KEY)) {
                $.data(this, PLUGIN_KEY, new SearchableOptionList($(this), options));
            }

            return $.data(this, PLUGIN_KEY);
        } else {
            return this.each(function () {
                if (!$.data(this, PLUGIN_KEY)) {
                    $.data(this, PLUGIN_KEY, new SearchableOptionList($(this), options));
                }
            });
        }
    };
}(jQuery, window, document));
