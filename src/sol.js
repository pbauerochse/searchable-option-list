// trim function in case not already supported by browser (older versions of IE)
if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

// SOL namespace
window.SearchableOptionList = {};
