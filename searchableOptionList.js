/*
 * SOL - Searchable Option List jQuery plugin
 * Version 1.0.0
 * https://pbauerochse.github.io/searchable-option-list/
 *
 * Copyright 2015, Patrick Bauerochse
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
; (function ($, window, document) {
    'use strict';

    window.SOL = {
        configuration : {
            texts : {
                noItemsAvailable: 'No entries found',
                selectAll: 'Select all',
                selectNone: 'Select none',
                quickDelete: '&times;',
                searchplaceholder: 'Click here to search'
            },
            classes: {
                selectAll: null,
                selectNone: null
            },
            useBracketParameters: false,
            showSelectAll: false,
            showSelection: true,
            showSelectionBelowList: false,
            allowNullSelection: false,
            scrollContainer: undefined
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
            onRendered: null,
            onInitialized: null,
            onScroll: function (sol) {
                var posY = Math.floor(sol.input.offset().top) - Math.floor(sol.settings.scrollContainer.scrollTop()) + Math.floor(sol.input.outerHeight());

                sol.selectionContainer
                    .css('top', Math.floor(posY))
                    .css('left', Math.floor(sol.input.offset().left - 1))
                    .css('width', Math.ceil((sol.input.outerWidth() + 20) * 1.2));
            },
            onShown: null,
            onHidden: null,
            onChange: null
        };

    function SearchableOptionList(element, options) {
        this.element = element;
        this.settings = $.extend(true, {}, window.SOL.configuration, DEFAULT_OPTIONS, options);
        this.items = [];
        this.useCheckboxes = element.prop('multiple');

        if (!this.settings.scrollContainer) {
            this.settings.scrollContainer = $(window);
        }

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

                if ($.isFunction(sol.settings.onInitialized)) {
                    sol.settings.onInitialized.call(this);
                }
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
                this.selection.css('max-height', this.settings.maxHeight);
            }
            
            this.input.attr('placeholder', this.settings.texts.searchplaceholder);

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
            var selectWidth = Math.max(this.input.outerWidth(false), $(this.element).outerWidth(false));
            this.input.css('width', selectWidth);

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
            var sol = this,
                $form = this.input.parents('form').first(),
                scrollFunction = function () {
                    // delegate to settings function
                    // and pass in self as parameter
                    sol.settings.onScroll.call(sol, sol);
                };

            // register global events just once
            if (!window[EVENTS_KEY]) {
                $(document).on('click', function (e) {
                    var $closestSolContainer = $(e.target).closest('.sol-container'),
                        $currentItem = $closestSolContainer.first();

                    if (!$closestSolContainer.length) {
                        // clicked outside of any sol-container
                        $('.sol-container.sol-active')
                            .removeClass('sol-active')
                            .trigger('sol-closed')
                            .find('input[type="text"]')
                            .val('')
                            .trigger('keyup');
                    } else {
                        $('.sol-container.sol-active').not($currentItem).each(function (index, item) {
                            $(item)
                                .removeClass('sol-active')
                                .trigger('sol-closed')
                                .find('input[type="text"]')
                                .val('')
                                .trigger('keyup');
                        });
                    }
                });
                window[EVENTS_KEY] = new Date().getTime();
            }

            // element events
            if (!$.data(this.element, EVENTS_KEY)) {



                this.caret.on('click', function () {
                    sol
                        .container
                        .toggleClass('sol-active');

                    if (sol.container.hasClass('sol-active')) {
                        sol.container.trigger('sol-opened');
                    } else {
                        sol.container.trigger('sol-closed');
                    }
                });

                this.input
                    .on('focus', function () {
                        sol.container.addClass('sol-active');

                        if (sol.container.hasClass('sol-active')) {
                            sol.container.trigger('sol-opened');
                        } else {
                            sol.container.trigger('sol-closed');
                        }
                    });

                this.container
                    .on('sol-closed', function () {
                        if ($.isFunction(sol.settings.onHidden)) {
                            sol.settings.onHidden.call(sol, sol);
                        }

                        sol.settings.scrollContainer.unbind('scroll', scrollFunction);
                    })
                    .on('sol-opened', function () {
                        if ($.isFunction(sol.settings.onShown)) {
                            sol.settings.onShown.call(sol, sol);
                        }

                        scrollFunction.call(sol, sol);
                        sol.settings.scrollContainer.bind('scroll', scrollFunction);
                    })
                    .on('keydown', function (e) {
                        var keyCode = e.keyCode;

                        // event handling for keyboard navigation
                        // only when there are results to be shown
                        if (!sol.noResultsItem.is(':visible')) {

                            if (keyCode === 40 || keyCode === 38) {
                                // arrow down or arrow up
                                sol.keyboardNavigationMode = true;

                                var $currentHighlightedOption = sol.selection.find('.sol-option.keyboard-selection'),
                                    $nextHighlightedOption,
                                    directionUp = keyCode === 38;

                                if (directionUp) {
                                    $nextHighlightedOption = $currentHighlightedOption.prev('.sol-option:visible');
                                    if ($nextHighlightedOption.length === 0) {
                                        $nextHighlightedOption = sol.selection.find('.sol-option:visible:last');
                                    }
                                } else {
                                    $nextHighlightedOption = $currentHighlightedOption.next('.sol-option:visible');
                                    if ($nextHighlightedOption.length === 0) {
                                        $nextHighlightedOption = sol.selection.find('.sol-option:visible:first');
                                    }
                                }

                                $currentHighlightedOption.removeClass('keyboard-selection');
                                $nextHighlightedOption.addClass('keyboard-selection');

                                sol.selection.scrollTop(sol.selection.scrollTop() + $nextHighlightedOption.position().top);
                            } else if (sol.keyboardNavigationMode === true && keyCode === 32) {
                                // toggle current selected item with space bar
                                $currentHighlightedOption = sol.selection.find('.sol-option.keyboard-selection input');

                                $currentHighlightedOption
                                    .prop('checked', !$currentHighlightedOption.prop('checked'))
                                    .trigger('sol-change');

                                // don't add the space character to the input field if it is focused
                                e.preventDefault();
                                return false;
                            }
                        }
                    })
                    .on('keyup', function (e) {
                        var keyCode = e.keyCode;

                        if (keyCode === 27) {
                            // escape key
                            if (sol.keyboardNavigationMode === true) {
                                sol.keyboardNavigationMode = false;
                                sol.selectionContainer.find('.sol-option.keyboard-selection').removeClass('keyboard-selection');
                                sol.selection.scrollTop(0);
                            } else if (sol.input.val() === '') {
                                // trigger closing of container
                                sol.caret.trigger('click');
                                sol.input.trigger('blur');
                            } else {
                                // reset input
                                sol.input.val('');
                            }
                        } else if (keyCode === 16 || keyCode === 17 || keyCode === 18 || keyCode === 20) {
                            // special events like shift and control
                            return;
                        }

                        sol.applySearch();
                    });

                $.data(this.element, EVENTS_KEY, new Date().getTime());
            }

            // form events
            if ($form && $form.length === 1 && !$form.data(EVENTS_KEY)) {
                var resetFunction = function () {
                    $form.find('.sol-option input').each(function (index, item) {
                        var $item = $(item),
                            initialState = $item.data('sol-initial-state');

                        if ($item.prop('checked') !== initialState) {
                            $item
                                .prop('checked', initialState)
                                .trigger('sol-change');
                        }
                    });
                };

                $form.on('reset', function (event) {
                    // unfortunately the reset event gets fired _before_
                    // the inputs are actually reset. The only possibility
                    // to overcome this is to set an interval to execute
                    // own scripts some time after the actual reset event

                    // before fields are actually reset by the browser
                    // needed to reset newly checked fields
                    resetFunction.call(sol);

                    // timeout for selection after form reset
                    // needed to reset previously checked fields
                    setTimeout(function () {
                        resetFunction.call(sol);
                    }, 100);
                });

                $form.data(EVENTS_KEY, new Date().getTime());
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
                .on('change', function () {
                    $(this).trigger('sol-change');
                    if ($.isFunction(sol.settings.onChange)) {
                        sol.settings.onChange.call(sol, sol, $(this));
                    }
                })
                .data('sol-initial-state', item.selected)
                .prop('checked', item.selected)
                .prop('disabled', item.disabled)
                .attr('name', inputName)
                .data('sol-item', item)
                .val(item.value);

            var $labelText = $('<div class="sol-label-text" />')
                    .html(item.label);

            var $label = $('<label class="sol-label" />')
                    .attr('title', item.tooltip)
                    .append($uiInput)
                    .append($labelText),

                $entry = $('<div class="sol-option" />')
                    .append($label);

            item.displayElement = $entry;

            if (this.settings.showSelection) {
                $uiInput
                    .on('sol-change', function () {
                        if ($(this).prop('checked')) {
                            sol.addSelectionDisplayItem(item, $uiInput);
                        } else {
                            item.displaySelectionItem.remove();
                        }

                        sol.settings.onScroll.call(sol, sol);
                    });

                if (item.selected) {
                    this.addSelectionDisplayItem(item, $uiInput);
                }
            }

            $container.append($entry);
        },

        addSelectionDisplayItem: function (item, $uiInput) {
            var $existingDisplayItem = this.showSelectionContainer.find('[data-sol-item-val="' + $uiInput.val() + '"]');

            if ($existingDisplayItem.length === 0) {
                var $displaySelectionItem = $('<div class="sol-selected-display-item" data-sol-item-val="' + $uiInput.val() + '" />')
                    .html(item.label)
                    .attr('title', item.tooltip)
                    .appendTo(this.showSelectionContainer);

                if ((this.useCheckboxes || this.settings.allowNullSelection) && !$uiInput.prop('disabled')) {
                    $('<span class="sol-quick-delete" />')
                        .html(this.settings.texts.quickDelete)
                        .on('click', function () {
                            $uiInput
                                .prop('checked', false)
                                .trigger('change');
                            $displaySelectionItem.remove();
                        })
                        .prependTo($displaySelectionItem);
                }

                item.displaySelectionItem = $displaySelectionItem;
            }
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
            var $changedInputs = this.selectionContainer
                .find('input[type="checkbox"]:not([disabled], :checked)')
                .prop('checked', true)
                .trigger('sol-change');

            if ($.isFunction(this.settings.onChange)) {
                this.settings.onChange.call(this, this, $changedInputs);
            }
        },

        deselectAll: function () {
            var $changedInputs = this.selectionContainer
                .find('input[type="checkbox"]:not([disabled]):checked')
                .prop('checked', false)
                .trigger('sol-change');

            if ($.isFunction(this.settings.onChange)) {
                this.settings.onChange.call(this, this, $changedInputs);
            }
        },

        getSelection: function () {
            return this.element.find('option:selected');
        },

        addErrorLabel: function (message) {
            if (!this.container) {
                window.alert('Error: this.container not set yet. This is a bug in the plugin and needs to be fixed');
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
