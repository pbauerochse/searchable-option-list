/**
 * The default scroll listener
 * @constructor
 */
SearchableOptionList.DefaultScrollListener = function (sol) {
    this.sol = sol;
};
SearchableOptionList.DefaultScrollListener.prototype = {

    handleScroll: function (scrollEvent) {
        console.log("scrolliscroll");

        var selectionContainerYPos = this.sol.$input.offset().top - this.sol.config.scrollTarget.scrollTop() + this.sol.$input.outerHeight(false),
            selectionContainerHeight = this.sol.$selectionContainer.outerHeight(false),
            selectionContainerBottom = selectionContainerYPos + selectionContainerHeight,
            displayContainerAboveInput = this.sol.config.displayContainerAboveInput || document.documentElement.clientHeight - this.sol.config.scrollTarget.scrollTop() < selectionContainerBottom,
            selectionContainerWidth = this.sol.$innerContainer.outerWidth(false) - parseInt(this.sol.$selectionContainer.css('border-left-width'), 10) - parseInt(this.sol.$selectionContainer.css('border-right-width'), 10);

        if (displayContainerAboveInput) {
            // position the popup above the input
            selectionContainerYPos = this.sol.$input.offset().top - selectionContainerHeight - this.sol.config.scrollTarget.scrollTop() + parseInt(this.sol.$selectionContainer.css('border-bottom-width'), 10);
            this.sol.$container
                .removeClass('sol-selection-bottom')
                .addClass('sol-selection-top');
        } else {
            this.sol.$container
                .removeClass('sol-selection-top')
                .addClass('sol-selection-bottom');
        }

        if (this.sol.$innerContainer.css('display') !== 'block') {
            // container has a certain width
            // make selection container a bit wider
            selectionContainerWidth = selectionContainerWidth * 1.2;
        } else {

            var borderRadiusSelector = displayContainerAboveInput ? 'border-bottom-right-radius' : 'border-top-right-radius';

            // no border radius on top
            this.sol.$selectionContainer
                .css(borderRadiusSelector, 'initial');

            if (this.sol.$actionButtons) {
                this.sol.$actionButtons
                    .css(borderRadiusSelector, 'initial');
            }
        }

        this.sol.$selectionContainer
            .css('top', Math.floor(selectionContainerYPos))
            .css('left', Math.floor(this.sol.$container.offset().left))
            .css('width', selectionContainerWidth);

        // remember the position
        this.sol.config.displayContainerAboveInput = displayContainerAboveInput;
    }

};
