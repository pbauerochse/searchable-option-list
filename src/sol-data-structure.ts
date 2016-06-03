/// <reference path="../includes/jquery.d.ts" />
module SearchableOptionList {

    /**
     * Base class for SolOption and SolOptionGroup
     */
    abstract class BaseSolOption {
        label:string;       // the display label
        disabled:boolean;   // whether this component may be selectable
        tooltip:string;     // optional tooltip that gets displayed on mouse hover

        constructor($elem:JQuery, label:string) {
            this.label = label;
            this.disabled = $elem.prop('disabled');
            this.tooltip = $elem.attr('title');
        }
    }

    /**
     * A selectable SOL option
     */
    class SolOption extends BaseSolOption {

        value:string;       // the value that will be transferred
        selected:boolean;   // whether this option is selected
        cssClass:string;    // the css class(es) of this element
        element:JQuery;     // the original element this option was derived from

        constructor($option:JQuery) {
            super($option, $option.html());
            this.value = $option.val();
            this.selected = $option.prop('selected');
            this.cssClass = $option.attr('class');
            this.element = $option;
        }

    }

    /**
     * Representation of a group of SolOptions
     */
    class SolOptionGroup extends BaseSolOption {

        children:SolOption[];   // the children of this option group

        constructor($optionGroup:JQuery) {
            super($optionGroup, $optionGroup.attr('label'));
        }
    }

}
