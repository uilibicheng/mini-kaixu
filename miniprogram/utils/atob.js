!(function (e) {
  'use strict'
  if ('object' == typeof exports && null != exports && 'number' != typeof exports.nodeType)
    module.exports = e()
  else if ('function' == typeof define && null != define.amd) define([], e)
  else {
    var t = e(),
      o = 'undefined' != typeof self ? self : $.global
    'function' != typeof o.btoa && (o.btoa = t.btoa),
      'function' != typeof o.atob && (o.atob = t.atob)
  }
})(function () {
  'use strict'
  var f = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  function c(e) {
    this.message = e
  }
  return (
    ((c.prototype = new Error()).name = 'InvalidCharacterError'),
    {
      btoa: function (e) {
        for (
          var t, o, r = String(e), n = 0, a = f, i = '';
          r.charAt(0 | n) || ((a = '='), n % 1);
          i += a.charAt(63 & (t >> (8 - (n % 1) * 8)))
        ) {
          if (255 < (o = r.charCodeAt((n += 0.75))))
            throw new c(
              "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.",
            )
          t = (t << 8) | o
        }
        return i
      },
      atob: function (e) {
        var t = String(e).replace(/[=]+$/, '')
        if (t.length % 4 == 1)
          throw new c("'atob' failed: The string to be decoded is not correctly encoded.")
        for (
          var o, r, n = 0, a = 0, i = '';
          (r = t.charAt(a++));
          ~r &&
          ((o = n % 4 ? 64 * o + r : r), n++ % 4) &&
          (i += String.fromCharCode(255 & (o >> ((-2 * n) & 6))))
        )
          r = f.indexOf(r)
        return i
      },
    }
  )
})
!(function (e) {
  'use strict'
  if ('object' == typeof exports && null != exports && 'number' != typeof exports.nodeType)
    module.exports = e()
  else if ('function' == typeof define && null != define.amd) define([], e)
  else {
    var t = e(),
      o = 'undefined' != typeof self ? self : $.global
    'function' != typeof o.btoa && (o.btoa = t.btoa),
      'function' != typeof o.atob && (o.atob = t.atob)
  }
})(function () {
  'use strict'
  var f = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  function c(e) {
    this.message = e
  }
  return (
    ((c.prototype = new Error()).name = 'InvalidCharacterError'),
    {
      btoa: function (e) {
        for (
          var t, o, r = String(e), n = 0, a = f, i = '';
          r.charAt(0 | n) || ((a = '='), n % 1);
          i += a.charAt(63 & (t >> (8 - (n % 1) * 8)))
        ) {
          if (255 < (o = r.charCodeAt((n += 0.75))))
            throw new c(
              "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.",
            )
          t = (t << 8) | o
        }
        return i
      },
      atob: function (e) {
        var t = String(e).replace(/[=]+$/, '')
        if (t.length % 4 == 1)
          throw new c("'atob' failed: The string to be decoded is not correctly encoded.")
        for (
          var o, r, n = 0, a = 0, i = '';
          (r = t.charAt(a++));
          ~r &&
          ((o = n % 4 ? 64 * o + r : r), n++ % 4) &&
          (i += String.fromCharCode(255 & (o >> ((-2 * n) & 6))))
        )
          r = f.indexOf(r)
        return i
      },
    }
  )
})
