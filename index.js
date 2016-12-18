function Select (testFn, tree, path) {
    var _path = [].concat(path)
    var node = tree[_path.shift()]
    if (testFn(node)) return [node].concat(_path)
    if (node === undefined) throw new Error('Node not found')
    return Select(testFn, node, _path)
}

Select.fn = function (tree, path) {
    function test (node) {
        return typeof node === 'function'
    }
    return Select(test, tree, path)
}

Select.andCall = function (tree, path) {
    var match = Select.fn(tree, path)
    var args = match[1] ?
        [].concat(match[1]) :
        []
    return match[0].apply(null, args)
}

module.exports = Select
