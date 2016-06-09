module SearchableOptionList {

    export interface OnInitializedListener {

    }

    export interface OnRenderedListener {

    }

    export interface OnOpenListener {

    }

    export interface OnCloseListener {

    }

    export interface OnChangeListener {

    }

    export interface OnScrollListener {

        doIt:(meh:string) => void;

    }

    export class DefaultEventListenerAdapter implements OnInitializedListener, OnRenderedListener, OnOpenListener, OnCloseListener, OnChangeListener, OnScrollListener {

        static instance:DefaultEventListenerAdapter = new DefaultEventListenerAdapter();

        doIt(meh:string):void {
            console.log("junge");
        }

    }

}
