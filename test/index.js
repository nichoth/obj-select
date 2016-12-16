var test = require('tape')
var select = require('../')

test('find a node in an object', function (t) {
    t.plan(3)
    var obj = {
        a: 1,
        b: {
            bb: 'in here'
        },
        c: 2,
        d: {
            dd: 'dd'
        }
    }
    var val = select(n => n === 'in here', obj, ['b','bb', 'other'])
    t.equal(val[0], 'in here', 'should return the node')
    t.equal(val[1], 'other', 'should return remaining list items')
    var val2 = select(n => typeof n === 'string', obj, ['d', 'dd', [1,2]])
    t.deepEqual(val2, [ 'dd', [1,2] ], 'should return arrays')
})

test('find a function', function (t) {
    t.plan(2)
    function node (arg) {
        return 'it worked ' + arg
    }
    node.d = 'bad'
    var obj = {
        a: {
            b: {
                c: node
            }
        }
    }

    var fn = select.fn(obj, ['a','b','c','d'])
    t.equal(fn[0], node, 'should find the function')
    t.equal(fn[1], 'd', 'should return the remaining list items')
})

test('find and call fn', function (t) {
    t.plan(1)
    function node (arg) {
        return 'it worked ' + arg
    }
    node.d = 'bad'
    var obj = {
        a: {
            b: {
                c: node
            }
        }
    }
    var val = select.andCall(obj, ['a','b','c','d'])
    t.equal(val, 'it worked d',
        'should call the function with the rest of the list')
})
