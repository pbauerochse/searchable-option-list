module SearchableOptionList {

    interface ScrollListener {

        doIt:(meh:string) => void;

    }

    class DefaultScrollLister implements ScrollListener {

        doIt(meh:string):void {
            console.log("junge");
        }
    }

}
