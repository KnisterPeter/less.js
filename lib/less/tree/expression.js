(function (tree) {

tree.Expression = function (value) { this.value = value };
tree.Expression.prototype = {
    eval: function (env) {
        if (this.value.length > 1) {
            return new(tree.Expression)(Ecma5.map(this.value, function (e) {
                return e.eval(env);
            }));
        } else {
            return this.value[0].eval(env);
        }
    },
    toCSS: function (env) {
        return Ecma5.map(this.value, function (e) {
            return e.toCSS(env);
        }).join(' ');
    }
};

})(require('less/tree'));
