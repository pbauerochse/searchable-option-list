// trim function in case not already supported by browser (older versions of IE)
if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

// SOL namespace and global constants
window.SearchableOptionList = {
    DATA_KEY : "sol-element",
    WINDOW_EVENTS_KEY : "sol-window-events"
};

// initialize SOL window events if not done yet
if (!window[SearchableOptionList.WINDOW_EVENTS_KEY]) {
    $(document).click(function (event) {
        // if clicked inside a sol element close all others
        // else close all sol containers

        var $clickedElement = $(event.target),
            $closestSelectionContainer = $clickedElement.closest('.sol-selection-container'),
            $closestInnerContainer = $clickedElement.closest('.sol-inner-container'),
            $clickedWithinThisSolContainer;

        if ($closestInnerContainer.length) {
            $clickedWithinThisSolContainer = $closestInnerContainer.first().parent('.sol-container');
        } else if ($closestSelectionContainer.length) {
            $clickedWithinThisSolContainer = $closestSelectionContainer.first().parent('.sol-container');
        }

        $('.sol-active')
            .not($clickedWithinThisSolContainer)
            .each(function (index, item) {
                $(item)
                    .data(SearchableOptionList.DATA_KEY)
                    .close();
            });
    });

    // remember we already registered the global events
    window[SearchableOptionList.WINDOW_EVENTS_KEY] = true;
}
