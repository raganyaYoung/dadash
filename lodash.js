/**
 * [lodash description] created by raganya on 2016/07/20
 * @type {Object}
 */
const lodash = {
  // array is really an array?
  isArray: function(array) {
    return Object.prototype.toString.call(array) === '[object Array]'
  },
  isNumber: function(num) {
    return Object.prototype.toString.call(num) === '[object Number]'
  },
  // 创建一个新数组并包含原数组中所有的非假值元素
  compact: function(array) {
    array = array.filter(function(el) {
      return el
    })
    return array
  },
  /**
   * 区别两个数组，返回一个新数组（第一个数组中每个元素与第二个数组不重复）
   * _.difference([1, 2, 3], [4, 2]);
   * => [1, 3]
   * _.difference([1, '2', 3], [4, 2]);
   * => [1, "2", 3]
   * 
   */
  difference: function(array, values) {
    var res = []
    for(var i=0; i<array.length; i++) {
      if(values.indexOf(array[i]) === -1){
        res.push(array[i])
      }
    } 
    for(var i=0; i<values.length; i++) {
      if(array.indexOf(values[i]) === -1){
        res.push(values[i])
      }
    }
    return res
  },
  // 两个数组的交集
  same: function(array, values) {
    var tmp = []
    for(var i of values) {
      if(array.indexOf(i) !== -1){
        tmp.push(i)
      }
    }
    return tmp
  },
  // 多个数组的交集
  intersection: function() {
    var final = []
    for(var i=0; i<arguments.length; i++) {
      final = same(arguments[i], arguments[arguments.length-i-1])
      if(final.length) {
        final = same(arguments[i], final)
      }
    }
    return final
  }, 
  //将 array 中的前 n 个元素去掉，然后返回剩余的部分。默认是1开始的
  drop: function(array, n) {
    var n = n ? n : 1
    var length = array.length
    return array = array.splice(n, length-n)
  },
  dropRight: function(array, n) {
    var n = n ? n : 1
    var length = array.length
    for (var i=0; i<n; i++) {
      array.pop()
    }
    return array
  },
  reverse: function(array){
    var len = array.length
    for(let i=0;i < len/2; i++){
      var tmp = array[i]
      array[i]=array[len-1-i]
      array[len-1-i] = tmp
    }
    return array
  },
  // 将一个数组中指定区间的所有元素的值, 都替换成或者说填充成为某个固定的值
  fill: function(arr, value, start, end) {
    var begin = isNumber(start) ? start : 0;
    var len = isNumber(end) || end <= arr.length ? end : arr.length;
    var i = begin;
    while(i<len) {
      arr[i] = value;
      i++;
    }
    return arr
  },
  // 将它的任意类型的多个参数放在一个数组里并返回 
  of: function(){
    return Array.prototype.slice.call(arguments)
  },
  concat: function() {
    var array = JSON.parse(JSON.stringify(arguments[0]))
    var length = arguments.length-1
    for(var i=1; i<=length; i++) {
      for(var j=0; j<arguments[i].length; j++) {
        array.push(arguments[i][j])
      }
    }
    return array
  },
  // 找出数组 arr 中重复出现过的元素
  duplicates: function(arr) {
    var res = arr.sort(function(a,b){
        return a-b
      })
      var result = []
      res.map(function(el, k) {
        if(res[k] === res[k+1] && result.indexOf(res[k]) === -1)
          result.push(res[k])
      })
      return result
  },
  // 删除数组条目中重复的条目(可能有多个)，返回值是一个包含被删除的重复条目的新数组。
  distinct: function(arr) {
    var ret = []
    for (var i=0; i<arr.length; i++) {
      for(var j=i+1; j<arr.length; ) {
        if(arr[i] === arr[j]) {
          ret.push(arr.splice(j, 1)[0])
        } else {
          j++;
        }
      }
    }
    return ret;
  },
  findIndex: function(arr, obj) {
    var keys = Object.keys(obj)
    var flag = true
    for(var i in arr){
      var el = arr[i]
      flag = true
      for(var key of keys) {
        if(el[key] === undefined || (el[key] !== obj[key])) {
          flag = false;
          break;
        }
      }
      if(flag) {
        return parseInt(i)
      }
    }
    return -1
  },
  findLastIndex: function(arr, obj) {
    var keys = Object.keys(obj)
    var flag = true
    for(var i=arr.length-1; i>=0; i--){
      var el = arr[i]
      flag = true
      for(var key of keys) {
        if(el[key] === undefined || (el[key] !== obj[key])) {
          flag = false;
          break;
        }
      }

      if(flag) {
        return parseInt(i)
      }
    }
    return -1
  },
  first: function(arr) {
    return arr.slice(0, 1)
  },
  //去除数组最后一个元素array.返回截取的数组array. 会改变数组
  initial: function(arr) {
    arr.splice(arr.length-1, 1)
    return arr
  },
  // 移除数组array中所有和 values 相等的元素， 返回新数组
  pull: function() {
    var array = arguments[0]
    var res = JSON.parse(JSON.stringify(array))
    for(var i=1; i<arguments.length; i++) {
      if(res.indexOf(arguments[i]) === -1) return
      removeSame(res, arguments[i])
    }
    return res
  },
  // 移除数组 arr 中的所有值与 item 相等的元素, 直接在数组上操作
  removeSame: function(arr, item) {
    for(var i=0;i<arr.length;i++){
      if(arr[i]===item){
        arr.splice(i,1);
        i--;
      }
    }
    return arr;
  },
  // Math
  getMaxOfArray: function(numArray) {
    return Math.max.apply(null, numArray);
  },


}

// String
String.prototype.repeatify = String.prototype.repeatify || function repeatify(times) {
  var str = ''
  for(var i=0; i<times; i++) {
    str += this
  }
  return str
}


// polyfills
// ie9一下不能使用 map, map polyfill
if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {
    var T, A, k;
    if (this == null) {
      throw new TypeError(" this is null or not defined");
    }
    // 1. 将O赋值为调用map方法的数组.
    var O = Object(this);
    // 2.将len赋值为数组O的长度.
    var len = O.length >>> 0;
    // 3.如果callback不是函数,则抛出TypeError异常.
    if (Object.prototype.toString.call(callback) != "[object Function]") {
      throw new TypeError(callback + " is not a function");
    }
    // 4. 如果参数thisArg有值,则将T赋值为thisArg;否则T为undefined.
    if (thisArg) {
      T = thisArg;
    }
    // 5. 创建新数组A,长度为原数组O长度len
    A = new Array(len);
    // 6. 将k赋值为0
    k = 0;
    // 7. 当 k < len 时,执行循环.
    while(k < len) {
      var kValue, mappedValue;
      //遍历O,k为原数组索引
      if (k in O) {
        //kValue为索引k对应的值.
        kValue = O[ k ];
        // 执行callback,this指向T,参数有三个.分别是kValue:值,k:索引,O:原数组.
        mappedValue = callback.call(T, kValue, k, O);
        // 返回值添加到新数组A中.
        A[ k ] = mappedValue;
      }
      // k自增1
      k++;
    }
    // 8. 返回新数组A
    return A;
  };      
}

// filter polyfill ie9
if (!Array.prototype.filter)
{
  Array.prototype.filter = function(fun /*, thisArg */)
  {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++)
    {
      if (i in t)
      {
        var val = t[i];

        // NOTE: Technically this should Object.defineProperty at
        //       the next index, as push can be affected by
        //       properties on Object.prototype and Array.prototype.
        //       But that method's new, and collisions should be
        //       rare, so use the more-compatible alternative.
        if (fun.call(thisArg, val, i, t))
          res.push(val);
      }
    }

    return res;
  };
}

if (!Date.now) {
  Date.now = function now() {
    return new Date().getTime();
  };
}

export default lodash




