(function (tree) {

tree.Selector = function (elements) {
    this.elements = elements;
    if (this.elements[0].combinator.value === "") {
        this.elements[0].combinator.value = ' ';
    }
};
tree.Selector.prototype.match = function (other) {
    if (this.elements[0].value === other.elements[0].value) {
        return true;
    } else {
        return false;
    }
};
tree.Selector.prototype.toCSS = function (env) {
    if (this._css) { return this._css }

    return this._css = Ecma5.map(this.elements, function (e) {
        if (typeof(e) === 'string') {
            return ' ' + Ecma5.trim(e);
        } else {
            return e.toCSS(env);
        }
    }).join('');
};

})(require('less/tree'));
