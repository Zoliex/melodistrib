import { app as Rr, BrowserWindow as lu, ipcMain as Mn, dialog as gr, Menu as ca } from "electron";
import { fileURLToPath as Vl } from "node:url";
import Ct from "node:path";
import { readFileSync as Kl, stat as ha, writeFileSync as Hr } from "node:fs";
var $l = Object.defineProperty, Zl = Object.defineProperties, Xl = Object.getOwnPropertyDescriptors, fa = Object.getOwnPropertySymbols, Jl = Object.prototype.hasOwnProperty, Ql = Object.prototype.propertyIsEnumerable, hs = (t, e, r) => e in t ? $l(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Se = (t, e) => {
  for (var r in e || (e = {}))
    Jl.call(e, r) && hs(t, r, e[r]);
  if (fa)
    for (var r of fa(e))
      Ql.call(e, r) && hs(t, r, e[r]);
  return t;
}, Or = (t, e) => Zl(t, Xl(e)), ie = (t, e, r) => hs(t, typeof e != "symbol" ? e + "" : e, r), ec = (t, e, r) => new Promise((n, i) => {
  var a = (c) => {
    try {
      s(r.next(c));
    } catch (b) {
      i(b);
    }
  }, l = (c) => {
    try {
      s(r.throw(c));
    } catch (b) {
      i(b);
    }
  }, s = (c) => c.done ? n(c.value) : Promise.resolve(c.value).then(a, l);
  s((r = r.apply(t, e)).next());
});
class ln {
  constructor(e) {
    ie(this, "rootKey"), this.rootKey = e;
  }
}
const tc = Object.seal({});
class ae extends ln {
  constructor(e) {
    super(e), ie(this, "root"), this.root = new Array();
  }
  // This method is called by the formatter to get the XML representation of this component.
  // It is called recursively for all child components.
  // It is a serializer to be used in the xml library.
  // https://www.npmjs.com/package/xml
  // Child components can override this method to customize the XML representation, or execute side effects.
  prepForXml(e) {
    var r;
    e.stack.push(this);
    const n = this.root.map((i) => i instanceof ln ? i.prepForXml(e) : i).filter((i) => i !== void 0);
    return e.stack.pop(), {
      [this.rootKey]: n.length ? n.length === 1 && ((r = n[0]) != null && r._attr) ? n[0] : n : tc
    };
  }
  /**
   * @deprecated Do not use this method. It is only used internally by the library. It will be removed in a future version.
   */
  addChildElement(e) {
    return this.root.push(e), this;
  }
}
class Tt extends ae {
  prepForXml(e) {
    const r = super.prepForXml(e);
    if (r && (typeof r[this.rootKey] != "object" || Object.keys(r[this.rootKey]).length))
      return r;
  }
}
class ye extends ln {
  constructor(e) {
    super("_attr"), ie(this, "xmlKeys"), this.root = e;
  }
  prepForXml(e) {
    const r = {};
    return Object.entries(this.root).forEach(([n, i]) => {
      if (i !== void 0) {
        const a = this.xmlKeys && this.xmlKeys[n] || n;
        r[a] = i;
      }
    }), { _attr: r };
  }
}
class Pt extends ln {
  constructor(e) {
    super("_attr"), this.root = e;
  }
  prepForXml(e) {
    return { _attr: Object.values(this.root).filter(({ value: n }) => n !== void 0).reduce((n, { key: i, value: a }) => Or(Se({}, n), { [i]: a }), {}) };
  }
}
class Ie extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      val: "w:val",
      color: "w:color",
      fill: "w:fill",
      space: "w:space",
      sz: "w:sz",
      type: "w:type",
      rsidR: "w:rsidR",
      rsidRPr: "w:rsidRPr",
      rsidSect: "w:rsidSect",
      w: "w:w",
      h: "w:h",
      top: "w:top",
      right: "w:right",
      bottom: "w:bottom",
      left: "w:left",
      header: "w:header",
      footer: "w:footer",
      gutter: "w:gutter",
      linePitch: "w:linePitch",
      pos: "w:pos"
    });
  }
}
var ut = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function cu(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Ln = {}, Yr = { exports: {} }, da;
function Ts() {
  if (da) return Yr.exports;
  da = 1;
  var t = typeof Reflect == "object" ? Reflect : null, e = t && typeof t.apply == "function" ? t.apply : function(T, P, L) {
    return Function.prototype.apply.call(T, P, L);
  }, r;
  t && typeof t.ownKeys == "function" ? r = t.ownKeys : Object.getOwnPropertySymbols ? r = function(T) {
    return Object.getOwnPropertyNames(T).concat(Object.getOwnPropertySymbols(T));
  } : r = function(T) {
    return Object.getOwnPropertyNames(T);
  };
  function n(f) {
    console && console.warn && console.warn(f);
  }
  var i = Number.isNaN || function(T) {
    return T !== T;
  };
  function a() {
    a.init.call(this);
  }
  Yr.exports = a, Yr.exports.once = h, a.EventEmitter = a, a.prototype._events = void 0, a.prototype._eventsCount = 0, a.prototype._maxListeners = void 0;
  var l = 10;
  function s(f) {
    if (typeof f != "function")
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof f);
  }
  Object.defineProperty(a, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
      return l;
    },
    set: function(f) {
      if (typeof f != "number" || f < 0 || i(f))
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + f + ".");
      l = f;
    }
  }), a.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, a.prototype.setMaxListeners = function(T) {
    if (typeof T != "number" || T < 0 || i(T))
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + T + ".");
    return this._maxListeners = T, this;
  };
  function c(f) {
    return f._maxListeners === void 0 ? a.defaultMaxListeners : f._maxListeners;
  }
  a.prototype.getMaxListeners = function() {
    return c(this);
  }, a.prototype.emit = function(T) {
    for (var P = [], L = 1; L < arguments.length; L++) P.push(arguments[L]);
    var H = T === "error", D = this._events;
    if (D !== void 0)
      H = H && D.error === void 0;
    else if (!H)
      return !1;
    if (H) {
      var Z;
      if (P.length > 0 && (Z = P[0]), Z instanceof Error)
        throw Z;
      var ce = new Error("Unhandled error." + (Z ? " (" + Z.message + ")" : ""));
      throw ce.context = Z, ce;
    }
    var N = D[T];
    if (N === void 0)
      return !1;
    if (typeof N == "function")
      e(N, this, P);
    else
      for (var U = N.length, v = k(N, U), L = 0; L < U; ++L)
        e(v[L], this, P);
    return !0;
  };
  function b(f, T, P, L) {
    var H, D, Z;
    if (s(P), D = f._events, D === void 0 ? (D = f._events = /* @__PURE__ */ Object.create(null), f._eventsCount = 0) : (D.newListener !== void 0 && (f.emit(
      "newListener",
      T,
      P.listener ? P.listener : P
    ), D = f._events), Z = D[T]), Z === void 0)
      Z = D[T] = P, ++f._eventsCount;
    else if (typeof Z == "function" ? Z = D[T] = L ? [P, Z] : [Z, P] : L ? Z.unshift(P) : Z.push(P), H = c(f), H > 0 && Z.length > H && !Z.warned) {
      Z.warned = !0;
      var ce = new Error("Possible EventEmitter memory leak detected. " + Z.length + " " + String(T) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      ce.name = "MaxListenersExceededWarning", ce.emitter = f, ce.type = T, ce.count = Z.length, n(ce);
    }
    return f;
  }
  a.prototype.addListener = function(T, P) {
    return b(this, T, P, !1);
  }, a.prototype.on = a.prototype.addListener, a.prototype.prependListener = function(T, P) {
    return b(this, T, P, !0);
  };
  function S() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function A(f, T, P) {
    var L = { fired: !1, wrapFn: void 0, target: f, type: T, listener: P }, H = S.bind(L);
    return H.listener = P, L.wrapFn = H, H;
  }
  a.prototype.once = function(T, P) {
    return s(P), this.on(T, A(this, T, P)), this;
  }, a.prototype.prependOnceListener = function(T, P) {
    return s(P), this.prependListener(T, A(this, T, P)), this;
  }, a.prototype.removeListener = function(T, P) {
    var L, H, D, Z, ce;
    if (s(P), H = this._events, H === void 0)
      return this;
    if (L = H[T], L === void 0)
      return this;
    if (L === P || L.listener === P)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete H[T], H.removeListener && this.emit("removeListener", T, L.listener || P));
    else if (typeof L != "function") {
      for (D = -1, Z = L.length - 1; Z >= 0; Z--)
        if (L[Z] === P || L[Z].listener === P) {
          ce = L[Z].listener, D = Z;
          break;
        }
      if (D < 0)
        return this;
      D === 0 ? L.shift() : d(L, D), L.length === 1 && (H[T] = L[0]), H.removeListener !== void 0 && this.emit("removeListener", T, ce || P);
    }
    return this;
  }, a.prototype.off = a.prototype.removeListener, a.prototype.removeAllListeners = function(T) {
    var P, L, H;
    if (L = this._events, L === void 0)
      return this;
    if (L.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : L[T] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete L[T]), this;
    if (arguments.length === 0) {
      var D = Object.keys(L), Z;
      for (H = 0; H < D.length; ++H)
        Z = D[H], Z !== "removeListener" && this.removeAllListeners(Z);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (P = L[T], typeof P == "function")
      this.removeListener(T, P);
    else if (P !== void 0)
      for (H = P.length - 1; H >= 0; H--)
        this.removeListener(T, P[H]);
    return this;
  };
  function R(f, T, P) {
    var L = f._events;
    if (L === void 0)
      return [];
    var H = L[T];
    return H === void 0 ? [] : typeof H == "function" ? P ? [H.listener || H] : [H] : P ? O(H) : k(H, H.length);
  }
  a.prototype.listeners = function(T) {
    return R(this, T, !0);
  }, a.prototype.rawListeners = function(T) {
    return R(this, T, !1);
  }, a.listenerCount = function(f, T) {
    return typeof f.listenerCount == "function" ? f.listenerCount(T) : _.call(f, T);
  }, a.prototype.listenerCount = _;
  function _(f) {
    var T = this._events;
    if (T !== void 0) {
      var P = T[f];
      if (typeof P == "function")
        return 1;
      if (P !== void 0)
        return P.length;
    }
    return 0;
  }
  a.prototype.eventNames = function() {
    return this._eventsCount > 0 ? r(this._events) : [];
  };
  function k(f, T) {
    for (var P = new Array(T), L = 0; L < T; ++L)
      P[L] = f[L];
    return P;
  }
  function d(f, T) {
    for (; T + 1 < f.length; T++)
      f[T] = f[T + 1];
    f.pop();
  }
  function O(f) {
    for (var T = new Array(f.length), P = 0; P < T.length; ++P)
      T[P] = f[P].listener || f[P];
    return T;
  }
  function h(f, T) {
    return new Promise(function(P, L) {
      function H(Z) {
        f.removeListener(T, D), L(Z);
      }
      function D() {
        typeof f.removeListener == "function" && f.removeListener("error", H), P([].slice.call(arguments));
      }
      w(f, T, D, { once: !0 }), T !== "error" && g(f, H, { once: !0 });
    });
  }
  function g(f, T, P) {
    typeof f.on == "function" && w(f, "error", T, P);
  }
  function w(f, T, P, L) {
    if (typeof f.on == "function")
      L.once ? f.once(T, P) : f.on(T, P);
    else if (typeof f.addEventListener == "function")
      f.addEventListener(T, function H(D) {
        L.once && f.removeEventListener(T, H), P(D);
      });
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof f);
  }
  return Yr.exports;
}
var qr = { exports: {} }, pa;
function Mt() {
  return pa || (pa = 1, typeof Object.create == "function" ? qr.exports = function(e, r) {
    r && (e.super_ = r, e.prototype = Object.create(r.prototype, {
      constructor: {
        value: e,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }));
  } : qr.exports = function(e, r) {
    if (r) {
      e.super_ = r;
      var n = function() {
      };
      n.prototype = r.prototype, e.prototype = new n(), e.prototype.constructor = e;
    }
  }), qr.exports;
}
function rc(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var hu = { exports: {} }, Le = hu.exports = {}, st, at;
function fs() {
  throw new Error("setTimeout has not been defined");
}
function ds() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? st = setTimeout : st = fs;
  } catch {
    st = fs;
  }
  try {
    typeof clearTimeout == "function" ? at = clearTimeout : at = ds;
  } catch {
    at = ds;
  }
})();
function fu(t) {
  if (st === setTimeout)
    return setTimeout(t, 0);
  if ((st === fs || !st) && setTimeout)
    return st = setTimeout, setTimeout(t, 0);
  try {
    return st(t, 0);
  } catch {
    try {
      return st.call(null, t, 0);
    } catch {
      return st.call(this, t, 0);
    }
  }
}
function nc(t) {
  if (at === clearTimeout)
    return clearTimeout(t);
  if ((at === ds || !at) && clearTimeout)
    return at = clearTimeout, clearTimeout(t);
  try {
    return at(t);
  } catch {
    try {
      return at.call(null, t);
    } catch {
      return at.call(this, t);
    }
  }
}
var gt = [], tr = !1, zt, nn = -1;
function ic() {
  !tr || !zt || (tr = !1, zt.length ? gt = zt.concat(gt) : nn = -1, gt.length && du());
}
function du() {
  if (!tr) {
    var t = fu(ic);
    tr = !0;
    for (var e = gt.length; e; ) {
      for (zt = gt, gt = []; ++nn < e; )
        zt && zt[nn].run();
      nn = -1, e = gt.length;
    }
    zt = null, tr = !1, nc(t);
  }
}
Le.nextTick = function(t) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var r = 1; r < arguments.length; r++)
      e[r - 1] = arguments[r];
  gt.push(new pu(t, e)), gt.length === 1 && !tr && fu(du);
};
function pu(t, e) {
  this.fun = t, this.array = e;
}
pu.prototype.run = function() {
  this.fun.apply(null, this.array);
};
Le.title = "browser";
Le.browser = !0;
Le.env = {};
Le.argv = [];
Le.version = "";
Le.versions = {};
function kt() {
}
Le.on = kt;
Le.addListener = kt;
Le.once = kt;
Le.off = kt;
Le.removeListener = kt;
Le.removeAllListeners = kt;
Le.emit = kt;
Le.prependListener = kt;
Le.prependOnceListener = kt;
Le.listeners = function(t) {
  return [];
};
Le.binding = function(t) {
  throw new Error("process.binding is not supported");
};
Le.cwd = function() {
  return "/";
};
Le.chdir = function(t) {
  throw new Error("process.chdir is not supported");
};
Le.umask = function() {
  return 0;
};
var sc = hu.exports;
const _e = /* @__PURE__ */ rc(sc);
var Bn, ma;
function mu() {
  return ma || (ma = 1, Bn = Ts().EventEmitter), Bn;
}
var Un = {}, vr = {}, wa;
function ac() {
  if (wa) return vr;
  wa = 1, vr.byteLength = s, vr.toByteArray = b, vr.fromByteArray = R;
  for (var t = [], e = [], r = typeof Uint8Array < "u" ? Uint8Array : Array, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, a = n.length; i < a; ++i)
    t[i] = n[i], e[n.charCodeAt(i)] = i;
  e[45] = 62, e[95] = 63;
  function l(_) {
    var k = _.length;
    if (k % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var d = _.indexOf("=");
    d === -1 && (d = k);
    var O = d === k ? 0 : 4 - d % 4;
    return [d, O];
  }
  function s(_) {
    var k = l(_), d = k[0], O = k[1];
    return (d + O) * 3 / 4 - O;
  }
  function c(_, k, d) {
    return (k + d) * 3 / 4 - d;
  }
  function b(_) {
    var k, d = l(_), O = d[0], h = d[1], g = new r(c(_, O, h)), w = 0, f = h > 0 ? O - 4 : O, T;
    for (T = 0; T < f; T += 4)
      k = e[_.charCodeAt(T)] << 18 | e[_.charCodeAt(T + 1)] << 12 | e[_.charCodeAt(T + 2)] << 6 | e[_.charCodeAt(T + 3)], g[w++] = k >> 16 & 255, g[w++] = k >> 8 & 255, g[w++] = k & 255;
    return h === 2 && (k = e[_.charCodeAt(T)] << 2 | e[_.charCodeAt(T + 1)] >> 4, g[w++] = k & 255), h === 1 && (k = e[_.charCodeAt(T)] << 10 | e[_.charCodeAt(T + 1)] << 4 | e[_.charCodeAt(T + 2)] >> 2, g[w++] = k >> 8 & 255, g[w++] = k & 255), g;
  }
  function S(_) {
    return t[_ >> 18 & 63] + t[_ >> 12 & 63] + t[_ >> 6 & 63] + t[_ & 63];
  }
  function A(_, k, d) {
    for (var O, h = [], g = k; g < d; g += 3)
      O = (_[g] << 16 & 16711680) + (_[g + 1] << 8 & 65280) + (_[g + 2] & 255), h.push(S(O));
    return h.join("");
  }
  function R(_) {
    for (var k, d = _.length, O = d % 3, h = [], g = 16383, w = 0, f = d - O; w < f; w += g)
      h.push(A(_, w, w + g > f ? f : w + g));
    return O === 1 ? (k = _[d - 1], h.push(
      t[k >> 2] + t[k << 4 & 63] + "=="
    )) : O === 2 && (k = (_[d - 2] << 8) + _[d - 1], h.push(
      t[k >> 10] + t[k >> 4 & 63] + t[k << 2 & 63] + "="
    )), h.join("");
  }
  return vr;
}
var Gr = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
var ya;
function oc() {
  return ya || (ya = 1, Gr.read = function(t, e, r, n, i) {
    var a, l, s = i * 8 - n - 1, c = (1 << s) - 1, b = c >> 1, S = -7, A = r ? i - 1 : 0, R = r ? -1 : 1, _ = t[e + A];
    for (A += R, a = _ & (1 << -S) - 1, _ >>= -S, S += s; S > 0; a = a * 256 + t[e + A], A += R, S -= 8)
      ;
    for (l = a & (1 << -S) - 1, a >>= -S, S += n; S > 0; l = l * 256 + t[e + A], A += R, S -= 8)
      ;
    if (a === 0)
      a = 1 - b;
    else {
      if (a === c)
        return l ? NaN : (_ ? -1 : 1) * (1 / 0);
      l = l + Math.pow(2, n), a = a - b;
    }
    return (_ ? -1 : 1) * l * Math.pow(2, a - n);
  }, Gr.write = function(t, e, r, n, i, a) {
    var l, s, c, b = a * 8 - i - 1, S = (1 << b) - 1, A = S >> 1, R = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, _ = n ? 0 : a - 1, k = n ? 1 : -1, d = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0, l = S) : (l = Math.floor(Math.log(e) / Math.LN2), e * (c = Math.pow(2, -l)) < 1 && (l--, c *= 2), l + A >= 1 ? e += R / c : e += R * Math.pow(2, 1 - A), e * c >= 2 && (l++, c /= 2), l + A >= S ? (s = 0, l = S) : l + A >= 1 ? (s = (e * c - 1) * Math.pow(2, i), l = l + A) : (s = e * Math.pow(2, A - 1) * Math.pow(2, i), l = 0)); i >= 8; t[r + _] = s & 255, _ += k, s /= 256, i -= 8)
      ;
    for (l = l << i | s, b += i; b > 0; t[r + _] = l & 255, _ += k, l /= 256, b -= 8)
      ;
    t[r + _ - k] |= d * 128;
  }), Gr;
}
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var ga;
function wn() {
  return ga || (ga = 1, function(t) {
    var e = ac(), r = oc(), n = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
    t.Buffer = s, t.SlowBuffer = g, t.INSPECT_MAX_BYTES = 50;
    var i = 2147483647;
    t.kMaxLength = i, s.TYPED_ARRAY_SUPPORT = a(), !s.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
      "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
    );
    function a() {
      try {
        var E = new Uint8Array(1), o = { foo: function() {
          return 42;
        } };
        return Object.setPrototypeOf(o, Uint8Array.prototype), Object.setPrototypeOf(E, o), E.foo() === 42;
      } catch {
        return !1;
      }
    }
    Object.defineProperty(s.prototype, "parent", {
      enumerable: !0,
      get: function() {
        if (s.isBuffer(this))
          return this.buffer;
      }
    }), Object.defineProperty(s.prototype, "offset", {
      enumerable: !0,
      get: function() {
        if (s.isBuffer(this))
          return this.byteOffset;
      }
    });
    function l(E) {
      if (E > i)
        throw new RangeError('The value "' + E + '" is invalid for option "size"');
      var o = new Uint8Array(E);
      return Object.setPrototypeOf(o, s.prototype), o;
    }
    function s(E, o, u) {
      if (typeof E == "number") {
        if (typeof o == "string")
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        return A(E);
      }
      return c(E, o, u);
    }
    s.poolSize = 8192;
    function c(E, o, u) {
      if (typeof E == "string")
        return R(E, o);
      if (ArrayBuffer.isView(E))
        return k(E);
      if (E == null)
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof E
        );
      if (ee(E, ArrayBuffer) || E && ee(E.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (ee(E, SharedArrayBuffer) || E && ee(E.buffer, SharedArrayBuffer)))
        return d(E, o, u);
      if (typeof E == "number")
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      var p = E.valueOf && E.valueOf();
      if (p != null && p !== E)
        return s.from(p, o, u);
      var M = O(E);
      if (M) return M;
      if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof E[Symbol.toPrimitive] == "function")
        return s.from(
          E[Symbol.toPrimitive]("string"),
          o,
          u
        );
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof E
      );
    }
    s.from = function(E, o, u) {
      return c(E, o, u);
    }, Object.setPrototypeOf(s.prototype, Uint8Array.prototype), Object.setPrototypeOf(s, Uint8Array);
    function b(E) {
      if (typeof E != "number")
        throw new TypeError('"size" argument must be of type number');
      if (E < 0)
        throw new RangeError('The value "' + E + '" is invalid for option "size"');
    }
    function S(E, o, u) {
      return b(E), E <= 0 ? l(E) : o !== void 0 ? typeof u == "string" ? l(E).fill(o, u) : l(E).fill(o) : l(E);
    }
    s.alloc = function(E, o, u) {
      return S(E, o, u);
    };
    function A(E) {
      return b(E), l(E < 0 ? 0 : h(E) | 0);
    }
    s.allocUnsafe = function(E) {
      return A(E);
    }, s.allocUnsafeSlow = function(E) {
      return A(E);
    };
    function R(E, o) {
      if ((typeof o != "string" || o === "") && (o = "utf8"), !s.isEncoding(o))
        throw new TypeError("Unknown encoding: " + o);
      var u = w(E, o) | 0, p = l(u), M = p.write(E, o);
      return M !== u && (p = p.slice(0, M)), p;
    }
    function _(E) {
      for (var o = E.length < 0 ? 0 : h(E.length) | 0, u = l(o), p = 0; p < o; p += 1)
        u[p] = E[p] & 255;
      return u;
    }
    function k(E) {
      if (ee(E, Uint8Array)) {
        var o = new Uint8Array(E);
        return d(o.buffer, o.byteOffset, o.byteLength);
      }
      return _(E);
    }
    function d(E, o, u) {
      if (o < 0 || E.byteLength < o)
        throw new RangeError('"offset" is outside of buffer bounds');
      if (E.byteLength < o + (u || 0))
        throw new RangeError('"length" is outside of buffer bounds');
      var p;
      return o === void 0 && u === void 0 ? p = new Uint8Array(E) : u === void 0 ? p = new Uint8Array(E, o) : p = new Uint8Array(E, o, u), Object.setPrototypeOf(p, s.prototype), p;
    }
    function O(E) {
      if (s.isBuffer(E)) {
        var o = h(E.length) | 0, u = l(o);
        return u.length === 0 || E.copy(u, 0, 0, o), u;
      }
      if (E.length !== void 0)
        return typeof E.length != "number" || m(E.length) ? l(0) : _(E);
      if (E.type === "Buffer" && Array.isArray(E.data))
        return _(E.data);
    }
    function h(E) {
      if (E >= i)
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
      return E | 0;
    }
    function g(E) {
      return +E != E && (E = 0), s.alloc(+E);
    }
    s.isBuffer = function(o) {
      return o != null && o._isBuffer === !0 && o !== s.prototype;
    }, s.compare = function(o, u) {
      if (ee(o, Uint8Array) && (o = s.from(o, o.offset, o.byteLength)), ee(u, Uint8Array) && (u = s.from(u, u.offset, u.byteLength)), !s.isBuffer(o) || !s.isBuffer(u))
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      if (o === u) return 0;
      for (var p = o.length, M = u.length, q = 0, W = Math.min(p, M); q < W; ++q)
        if (o[q] !== u[q]) {
          p = o[q], M = u[q];
          break;
        }
      return p < M ? -1 : M < p ? 1 : 0;
    }, s.isEncoding = function(o) {
      switch (String(o).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    }, s.concat = function(o, u) {
      if (!Array.isArray(o))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (o.length === 0)
        return s.alloc(0);
      var p;
      if (u === void 0)
        for (u = 0, p = 0; p < o.length; ++p)
          u += o[p].length;
      var M = s.allocUnsafe(u), q = 0;
      for (p = 0; p < o.length; ++p) {
        var W = o[p];
        if (ee(W, Uint8Array))
          q + W.length > M.length ? s.from(W).copy(M, q) : Uint8Array.prototype.set.call(
            M,
            W,
            q
          );
        else if (s.isBuffer(W))
          W.copy(M, q);
        else
          throw new TypeError('"list" argument must be an Array of Buffers');
        q += W.length;
      }
      return M;
    };
    function w(E, o) {
      if (s.isBuffer(E))
        return E.length;
      if (ArrayBuffer.isView(E) || ee(E, ArrayBuffer))
        return E.byteLength;
      if (typeof E != "string")
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof E
        );
      var u = E.length, p = arguments.length > 2 && arguments[2] === !0;
      if (!p && u === 0) return 0;
      for (var M = !1; ; )
        switch (o) {
          case "ascii":
          case "latin1":
          case "binary":
            return u;
          case "utf8":
          case "utf-8":
            return y(E).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return u * 2;
          case "hex":
            return u >>> 1;
          case "base64":
            return I(E).length;
          default:
            if (M)
              return p ? -1 : y(E).length;
            o = ("" + o).toLowerCase(), M = !0;
        }
    }
    s.byteLength = w;
    function f(E, o, u) {
      var p = !1;
      if ((o === void 0 || o < 0) && (o = 0), o > this.length || ((u === void 0 || u > this.length) && (u = this.length), u <= 0) || (u >>>= 0, o >>>= 0, u <= o))
        return "";
      for (E || (E = "utf8"); ; )
        switch (E) {
          case "hex":
            return X(this, o, u);
          case "utf8":
          case "utf-8":
            return v(this, o, u);
          case "ascii":
            return j(this, o, u);
          case "latin1":
          case "binary":
            return te(this, o, u);
          case "base64":
            return U(this, o, u);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return oe(this, o, u);
          default:
            if (p) throw new TypeError("Unknown encoding: " + E);
            E = (E + "").toLowerCase(), p = !0;
        }
    }
    s.prototype._isBuffer = !0;
    function T(E, o, u) {
      var p = E[o];
      E[o] = E[u], E[u] = p;
    }
    s.prototype.swap16 = function() {
      var o = this.length;
      if (o % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (var u = 0; u < o; u += 2)
        T(this, u, u + 1);
      return this;
    }, s.prototype.swap32 = function() {
      var o = this.length;
      if (o % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (var u = 0; u < o; u += 4)
        T(this, u, u + 3), T(this, u + 1, u + 2);
      return this;
    }, s.prototype.swap64 = function() {
      var o = this.length;
      if (o % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (var u = 0; u < o; u += 8)
        T(this, u, u + 7), T(this, u + 1, u + 6), T(this, u + 2, u + 5), T(this, u + 3, u + 4);
      return this;
    }, s.prototype.toString = function() {
      var o = this.length;
      return o === 0 ? "" : arguments.length === 0 ? v(this, 0, o) : f.apply(this, arguments);
    }, s.prototype.toLocaleString = s.prototype.toString, s.prototype.equals = function(o) {
      if (!s.isBuffer(o)) throw new TypeError("Argument must be a Buffer");
      return this === o ? !0 : s.compare(this, o) === 0;
    }, s.prototype.inspect = function() {
      var o = "", u = t.INSPECT_MAX_BYTES;
      return o = this.toString("hex", 0, u).replace(/(.{2})/g, "$1 ").trim(), this.length > u && (o += " ... "), "<Buffer " + o + ">";
    }, n && (s.prototype[n] = s.prototype.inspect), s.prototype.compare = function(o, u, p, M, q) {
      if (ee(o, Uint8Array) && (o = s.from(o, o.offset, o.byteLength)), !s.isBuffer(o))
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof o
        );
      if (u === void 0 && (u = 0), p === void 0 && (p = o ? o.length : 0), M === void 0 && (M = 0), q === void 0 && (q = this.length), u < 0 || p > o.length || M < 0 || q > this.length)
        throw new RangeError("out of range index");
      if (M >= q && u >= p)
        return 0;
      if (M >= q)
        return -1;
      if (u >= p)
        return 1;
      if (u >>>= 0, p >>>= 0, M >>>= 0, q >>>= 0, this === o) return 0;
      for (var W = q - M, ne = p - u, le = Math.min(W, ne), se = this.slice(M, q), fe = o.slice(u, p), me = 0; me < le; ++me)
        if (se[me] !== fe[me]) {
          W = se[me], ne = fe[me];
          break;
        }
      return W < ne ? -1 : ne < W ? 1 : 0;
    };
    function P(E, o, u, p, M) {
      if (E.length === 0) return -1;
      if (typeof u == "string" ? (p = u, u = 0) : u > 2147483647 ? u = 2147483647 : u < -2147483648 && (u = -2147483648), u = +u, m(u) && (u = M ? 0 : E.length - 1), u < 0 && (u = E.length + u), u >= E.length) {
        if (M) return -1;
        u = E.length - 1;
      } else if (u < 0)
        if (M) u = 0;
        else return -1;
      if (typeof o == "string" && (o = s.from(o, p)), s.isBuffer(o))
        return o.length === 0 ? -1 : L(E, o, u, p, M);
      if (typeof o == "number")
        return o = o & 255, typeof Uint8Array.prototype.indexOf == "function" ? M ? Uint8Array.prototype.indexOf.call(E, o, u) : Uint8Array.prototype.lastIndexOf.call(E, o, u) : L(E, [o], u, p, M);
      throw new TypeError("val must be string, number or Buffer");
    }
    function L(E, o, u, p, M) {
      var q = 1, W = E.length, ne = o.length;
      if (p !== void 0 && (p = String(p).toLowerCase(), p === "ucs2" || p === "ucs-2" || p === "utf16le" || p === "utf-16le")) {
        if (E.length < 2 || o.length < 2)
          return -1;
        q = 2, W /= 2, ne /= 2, u /= 2;
      }
      function le(He, Ot) {
        return q === 1 ? He[Ot] : He.readUInt16BE(Ot * q);
      }
      var se;
      if (M) {
        var fe = -1;
        for (se = u; se < W; se++)
          if (le(E, se) === le(o, fe === -1 ? 0 : se - fe)) {
            if (fe === -1 && (fe = se), se - fe + 1 === ne) return fe * q;
          } else
            fe !== -1 && (se -= se - fe), fe = -1;
      } else
        for (u + ne > W && (u = W - ne), se = u; se >= 0; se--) {
          for (var me = !0, ge = 0; ge < ne; ge++)
            if (le(E, se + ge) !== le(o, ge)) {
              me = !1;
              break;
            }
          if (me) return se;
        }
      return -1;
    }
    s.prototype.includes = function(o, u, p) {
      return this.indexOf(o, u, p) !== -1;
    }, s.prototype.indexOf = function(o, u, p) {
      return P(this, o, u, p, !0);
    }, s.prototype.lastIndexOf = function(o, u, p) {
      return P(this, o, u, p, !1);
    };
    function H(E, o, u, p) {
      u = Number(u) || 0;
      var M = E.length - u;
      p ? (p = Number(p), p > M && (p = M)) : p = M;
      var q = o.length;
      p > q / 2 && (p = q / 2);
      for (var W = 0; W < p; ++W) {
        var ne = parseInt(o.substr(W * 2, 2), 16);
        if (m(ne)) return W;
        E[u + W] = ne;
      }
      return W;
    }
    function D(E, o, u, p) {
      return F(y(o, E.length - u), E, u, p);
    }
    function Z(E, o, u, p) {
      return F(z(o), E, u, p);
    }
    function ce(E, o, u, p) {
      return F(I(o), E, u, p);
    }
    function N(E, o, u, p) {
      return F(B(o, E.length - u), E, u, p);
    }
    s.prototype.write = function(o, u, p, M) {
      if (u === void 0)
        M = "utf8", p = this.length, u = 0;
      else if (p === void 0 && typeof u == "string")
        M = u, p = this.length, u = 0;
      else if (isFinite(u))
        u = u >>> 0, isFinite(p) ? (p = p >>> 0, M === void 0 && (M = "utf8")) : (M = p, p = void 0);
      else
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      var q = this.length - u;
      if ((p === void 0 || p > q) && (p = q), o.length > 0 && (p < 0 || u < 0) || u > this.length)
        throw new RangeError("Attempt to write outside buffer bounds");
      M || (M = "utf8");
      for (var W = !1; ; )
        switch (M) {
          case "hex":
            return H(this, o, u, p);
          case "utf8":
          case "utf-8":
            return D(this, o, u, p);
          case "ascii":
          case "latin1":
          case "binary":
            return Z(this, o, u, p);
          case "base64":
            return ce(this, o, u, p);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return N(this, o, u, p);
          default:
            if (W) throw new TypeError("Unknown encoding: " + M);
            M = ("" + M).toLowerCase(), W = !0;
        }
    }, s.prototype.toJSON = function() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function U(E, o, u) {
      return o === 0 && u === E.length ? e.fromByteArray(E) : e.fromByteArray(E.slice(o, u));
    }
    function v(E, o, u) {
      u = Math.min(E.length, u);
      for (var p = [], M = o; M < u; ) {
        var q = E[M], W = null, ne = q > 239 ? 4 : q > 223 ? 3 : q > 191 ? 2 : 1;
        if (M + ne <= u) {
          var le, se, fe, me;
          switch (ne) {
            case 1:
              q < 128 && (W = q);
              break;
            case 2:
              le = E[M + 1], (le & 192) === 128 && (me = (q & 31) << 6 | le & 63, me > 127 && (W = me));
              break;
            case 3:
              le = E[M + 1], se = E[M + 2], (le & 192) === 128 && (se & 192) === 128 && (me = (q & 15) << 12 | (le & 63) << 6 | se & 63, me > 2047 && (me < 55296 || me > 57343) && (W = me));
              break;
            case 4:
              le = E[M + 1], se = E[M + 2], fe = E[M + 3], (le & 192) === 128 && (se & 192) === 128 && (fe & 192) === 128 && (me = (q & 15) << 18 | (le & 63) << 12 | (se & 63) << 6 | fe & 63, me > 65535 && me < 1114112 && (W = me));
          }
        }
        W === null ? (W = 65533, ne = 1) : W > 65535 && (W -= 65536, p.push(W >>> 10 & 1023 | 55296), W = 56320 | W & 1023), p.push(W), M += ne;
      }
      return Q(p);
    }
    var V = 4096;
    function Q(E) {
      var o = E.length;
      if (o <= V)
        return String.fromCharCode.apply(String, E);
      for (var u = "", p = 0; p < o; )
        u += String.fromCharCode.apply(
          String,
          E.slice(p, p += V)
        );
      return u;
    }
    function j(E, o, u) {
      var p = "";
      u = Math.min(E.length, u);
      for (var M = o; M < u; ++M)
        p += String.fromCharCode(E[M] & 127);
      return p;
    }
    function te(E, o, u) {
      var p = "";
      u = Math.min(E.length, u);
      for (var M = o; M < u; ++M)
        p += String.fromCharCode(E[M]);
      return p;
    }
    function X(E, o, u) {
      var p = E.length;
      (!o || o < 0) && (o = 0), (!u || u < 0 || u > p) && (u = p);
      for (var M = "", q = o; q < u; ++q)
        M += J[E[q]];
      return M;
    }
    function oe(E, o, u) {
      for (var p = E.slice(o, u), M = "", q = 0; q < p.length - 1; q += 2)
        M += String.fromCharCode(p[q] + p[q + 1] * 256);
      return M;
    }
    s.prototype.slice = function(o, u) {
      var p = this.length;
      o = ~~o, u = u === void 0 ? p : ~~u, o < 0 ? (o += p, o < 0 && (o = 0)) : o > p && (o = p), u < 0 ? (u += p, u < 0 && (u = 0)) : u > p && (u = p), u < o && (u = o);
      var M = this.subarray(o, u);
      return Object.setPrototypeOf(M, s.prototype), M;
    };
    function Y(E, o, u) {
      if (E % 1 !== 0 || E < 0) throw new RangeError("offset is not uint");
      if (E + o > u) throw new RangeError("Trying to access beyond buffer length");
    }
    s.prototype.readUintLE = s.prototype.readUIntLE = function(o, u, p) {
      o = o >>> 0, u = u >>> 0, p || Y(o, u, this.length);
      for (var M = this[o], q = 1, W = 0; ++W < u && (q *= 256); )
        M += this[o + W] * q;
      return M;
    }, s.prototype.readUintBE = s.prototype.readUIntBE = function(o, u, p) {
      o = o >>> 0, u = u >>> 0, p || Y(o, u, this.length);
      for (var M = this[o + --u], q = 1; u > 0 && (q *= 256); )
        M += this[o + --u] * q;
      return M;
    }, s.prototype.readUint8 = s.prototype.readUInt8 = function(o, u) {
      return o = o >>> 0, u || Y(o, 1, this.length), this[o];
    }, s.prototype.readUint16LE = s.prototype.readUInt16LE = function(o, u) {
      return o = o >>> 0, u || Y(o, 2, this.length), this[o] | this[o + 1] << 8;
    }, s.prototype.readUint16BE = s.prototype.readUInt16BE = function(o, u) {
      return o = o >>> 0, u || Y(o, 2, this.length), this[o] << 8 | this[o + 1];
    }, s.prototype.readUint32LE = s.prototype.readUInt32LE = function(o, u) {
      return o = o >>> 0, u || Y(o, 4, this.length), (this[o] | this[o + 1] << 8 | this[o + 2] << 16) + this[o + 3] * 16777216;
    }, s.prototype.readUint32BE = s.prototype.readUInt32BE = function(o, u) {
      return o = o >>> 0, u || Y(o, 4, this.length), this[o] * 16777216 + (this[o + 1] << 16 | this[o + 2] << 8 | this[o + 3]);
    }, s.prototype.readIntLE = function(o, u, p) {
      o = o >>> 0, u = u >>> 0, p || Y(o, u, this.length);
      for (var M = this[o], q = 1, W = 0; ++W < u && (q *= 256); )
        M += this[o + W] * q;
      return q *= 128, M >= q && (M -= Math.pow(2, 8 * u)), M;
    }, s.prototype.readIntBE = function(o, u, p) {
      o = o >>> 0, u = u >>> 0, p || Y(o, u, this.length);
      for (var M = u, q = 1, W = this[o + --M]; M > 0 && (q *= 256); )
        W += this[o + --M] * q;
      return q *= 128, W >= q && (W -= Math.pow(2, 8 * u)), W;
    }, s.prototype.readInt8 = function(o, u) {
      return o = o >>> 0, u || Y(o, 1, this.length), this[o] & 128 ? (255 - this[o] + 1) * -1 : this[o];
    }, s.prototype.readInt16LE = function(o, u) {
      o = o >>> 0, u || Y(o, 2, this.length);
      var p = this[o] | this[o + 1] << 8;
      return p & 32768 ? p | 4294901760 : p;
    }, s.prototype.readInt16BE = function(o, u) {
      o = o >>> 0, u || Y(o, 2, this.length);
      var p = this[o + 1] | this[o] << 8;
      return p & 32768 ? p | 4294901760 : p;
    }, s.prototype.readInt32LE = function(o, u) {
      return o = o >>> 0, u || Y(o, 4, this.length), this[o] | this[o + 1] << 8 | this[o + 2] << 16 | this[o + 3] << 24;
    }, s.prototype.readInt32BE = function(o, u) {
      return o = o >>> 0, u || Y(o, 4, this.length), this[o] << 24 | this[o + 1] << 16 | this[o + 2] << 8 | this[o + 3];
    }, s.prototype.readFloatLE = function(o, u) {
      return o = o >>> 0, u || Y(o, 4, this.length), r.read(this, o, !0, 23, 4);
    }, s.prototype.readFloatBE = function(o, u) {
      return o = o >>> 0, u || Y(o, 4, this.length), r.read(this, o, !1, 23, 4);
    }, s.prototype.readDoubleLE = function(o, u) {
      return o = o >>> 0, u || Y(o, 8, this.length), r.read(this, o, !0, 52, 8);
    }, s.prototype.readDoubleBE = function(o, u) {
      return o = o >>> 0, u || Y(o, 8, this.length), r.read(this, o, !1, 52, 8);
    };
    function C(E, o, u, p, M, q) {
      if (!s.isBuffer(E)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (o > M || o < q) throw new RangeError('"value" argument is out of bounds');
      if (u + p > E.length) throw new RangeError("Index out of range");
    }
    s.prototype.writeUintLE = s.prototype.writeUIntLE = function(o, u, p, M) {
      if (o = +o, u = u >>> 0, p = p >>> 0, !M) {
        var q = Math.pow(2, 8 * p) - 1;
        C(this, o, u, p, q, 0);
      }
      var W = 1, ne = 0;
      for (this[u] = o & 255; ++ne < p && (W *= 256); )
        this[u + ne] = o / W & 255;
      return u + p;
    }, s.prototype.writeUintBE = s.prototype.writeUIntBE = function(o, u, p, M) {
      if (o = +o, u = u >>> 0, p = p >>> 0, !M) {
        var q = Math.pow(2, 8 * p) - 1;
        C(this, o, u, p, q, 0);
      }
      var W = p - 1, ne = 1;
      for (this[u + W] = o & 255; --W >= 0 && (ne *= 256); )
        this[u + W] = o / ne & 255;
      return u + p;
    }, s.prototype.writeUint8 = s.prototype.writeUInt8 = function(o, u, p) {
      return o = +o, u = u >>> 0, p || C(this, o, u, 1, 255, 0), this[u] = o & 255, u + 1;
    }, s.prototype.writeUint16LE = s.prototype.writeUInt16LE = function(o, u, p) {
      return o = +o, u = u >>> 0, p || C(this, o, u, 2, 65535, 0), this[u] = o & 255, this[u + 1] = o >>> 8, u + 2;
    }, s.prototype.writeUint16BE = s.prototype.writeUInt16BE = function(o, u, p) {
      return o = +o, u = u >>> 0, p || C(this, o, u, 2, 65535, 0), this[u] = o >>> 8, this[u + 1] = o & 255, u + 2;
    }, s.prototype.writeUint32LE = s.prototype.writeUInt32LE = function(o, u, p) {
      return o = +o, u = u >>> 0, p || C(this, o, u, 4, 4294967295, 0), this[u + 3] = o >>> 24, this[u + 2] = o >>> 16, this[u + 1] = o >>> 8, this[u] = o & 255, u + 4;
    }, s.prototype.writeUint32BE = s.prototype.writeUInt32BE = function(o, u, p) {
      return o = +o, u = u >>> 0, p || C(this, o, u, 4, 4294967295, 0), this[u] = o >>> 24, this[u + 1] = o >>> 16, this[u + 2] = o >>> 8, this[u + 3] = o & 255, u + 4;
    }, s.prototype.writeIntLE = function(o, u, p, M) {
      if (o = +o, u = u >>> 0, !M) {
        var q = Math.pow(2, 8 * p - 1);
        C(this, o, u, p, q - 1, -q);
      }
      var W = 0, ne = 1, le = 0;
      for (this[u] = o & 255; ++W < p && (ne *= 256); )
        o < 0 && le === 0 && this[u + W - 1] !== 0 && (le = 1), this[u + W] = (o / ne >> 0) - le & 255;
      return u + p;
    }, s.prototype.writeIntBE = function(o, u, p, M) {
      if (o = +o, u = u >>> 0, !M) {
        var q = Math.pow(2, 8 * p - 1);
        C(this, o, u, p, q - 1, -q);
      }
      var W = p - 1, ne = 1, le = 0;
      for (this[u + W] = o & 255; --W >= 0 && (ne *= 256); )
        o < 0 && le === 0 && this[u + W + 1] !== 0 && (le = 1), this[u + W] = (o / ne >> 0) - le & 255;
      return u + p;
    }, s.prototype.writeInt8 = function(o, u, p) {
      return o = +o, u = u >>> 0, p || C(this, o, u, 1, 127, -128), o < 0 && (o = 255 + o + 1), this[u] = o & 255, u + 1;
    }, s.prototype.writeInt16LE = function(o, u, p) {
      return o = +o, u = u >>> 0, p || C(this, o, u, 2, 32767, -32768), this[u] = o & 255, this[u + 1] = o >>> 8, u + 2;
    }, s.prototype.writeInt16BE = function(o, u, p) {
      return o = +o, u = u >>> 0, p || C(this, o, u, 2, 32767, -32768), this[u] = o >>> 8, this[u + 1] = o & 255, u + 2;
    }, s.prototype.writeInt32LE = function(o, u, p) {
      return o = +o, u = u >>> 0, p || C(this, o, u, 4, 2147483647, -2147483648), this[u] = o & 255, this[u + 1] = o >>> 8, this[u + 2] = o >>> 16, this[u + 3] = o >>> 24, u + 4;
    }, s.prototype.writeInt32BE = function(o, u, p) {
      return o = +o, u = u >>> 0, p || C(this, o, u, 4, 2147483647, -2147483648), o < 0 && (o = 4294967295 + o + 1), this[u] = o >>> 24, this[u + 1] = o >>> 16, this[u + 2] = o >>> 8, this[u + 3] = o & 255, u + 4;
    };
    function K(E, o, u, p, M, q) {
      if (u + p > E.length) throw new RangeError("Index out of range");
      if (u < 0) throw new RangeError("Index out of range");
    }
    function $(E, o, u, p, M) {
      return o = +o, u = u >>> 0, M || K(E, o, u, 4), r.write(E, o, u, p, 23, 4), u + 4;
    }
    s.prototype.writeFloatLE = function(o, u, p) {
      return $(this, o, u, !0, p);
    }, s.prototype.writeFloatBE = function(o, u, p) {
      return $(this, o, u, !1, p);
    };
    function re(E, o, u, p, M) {
      return o = +o, u = u >>> 0, M || K(E, o, u, 8), r.write(E, o, u, p, 52, 8), u + 8;
    }
    s.prototype.writeDoubleLE = function(o, u, p) {
      return re(this, o, u, !0, p);
    }, s.prototype.writeDoubleBE = function(o, u, p) {
      return re(this, o, u, !1, p);
    }, s.prototype.copy = function(o, u, p, M) {
      if (!s.isBuffer(o)) throw new TypeError("argument should be a Buffer");
      if (p || (p = 0), !M && M !== 0 && (M = this.length), u >= o.length && (u = o.length), u || (u = 0), M > 0 && M < p && (M = p), M === p || o.length === 0 || this.length === 0) return 0;
      if (u < 0)
        throw new RangeError("targetStart out of bounds");
      if (p < 0 || p >= this.length) throw new RangeError("Index out of range");
      if (M < 0) throw new RangeError("sourceEnd out of bounds");
      M > this.length && (M = this.length), o.length - u < M - p && (M = o.length - u + p);
      var q = M - p;
      return this === o && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(u, p, M) : Uint8Array.prototype.set.call(
        o,
        this.subarray(p, M),
        u
      ), q;
    }, s.prototype.fill = function(o, u, p, M) {
      if (typeof o == "string") {
        if (typeof u == "string" ? (M = u, u = 0, p = this.length) : typeof p == "string" && (M = p, p = this.length), M !== void 0 && typeof M != "string")
          throw new TypeError("encoding must be a string");
        if (typeof M == "string" && !s.isEncoding(M))
          throw new TypeError("Unknown encoding: " + M);
        if (o.length === 1) {
          var q = o.charCodeAt(0);
          (M === "utf8" && q < 128 || M === "latin1") && (o = q);
        }
      } else typeof o == "number" ? o = o & 255 : typeof o == "boolean" && (o = Number(o));
      if (u < 0 || this.length < u || this.length < p)
        throw new RangeError("Out of range index");
      if (p <= u)
        return this;
      u = u >>> 0, p = p === void 0 ? this.length : p >>> 0, o || (o = 0);
      var W;
      if (typeof o == "number")
        for (W = u; W < p; ++W)
          this[W] = o;
      else {
        var ne = s.isBuffer(o) ? o : s.from(o, M), le = ne.length;
        if (le === 0)
          throw new TypeError('The value "' + o + '" is invalid for argument "value"');
        for (W = 0; W < p - u; ++W)
          this[W + u] = ne[W % le];
      }
      return this;
    };
    var G = /[^+/0-9A-Za-z-_]/g;
    function x(E) {
      if (E = E.split("=")[0], E = E.trim().replace(G, ""), E.length < 2) return "";
      for (; E.length % 4 !== 0; )
        E = E + "=";
      return E;
    }
    function y(E, o) {
      o = o || 1 / 0;
      for (var u, p = E.length, M = null, q = [], W = 0; W < p; ++W) {
        if (u = E.charCodeAt(W), u > 55295 && u < 57344) {
          if (!M) {
            if (u > 56319) {
              (o -= 3) > -1 && q.push(239, 191, 189);
              continue;
            } else if (W + 1 === p) {
              (o -= 3) > -1 && q.push(239, 191, 189);
              continue;
            }
            M = u;
            continue;
          }
          if (u < 56320) {
            (o -= 3) > -1 && q.push(239, 191, 189), M = u;
            continue;
          }
          u = (M - 55296 << 10 | u - 56320) + 65536;
        } else M && (o -= 3) > -1 && q.push(239, 191, 189);
        if (M = null, u < 128) {
          if ((o -= 1) < 0) break;
          q.push(u);
        } else if (u < 2048) {
          if ((o -= 2) < 0) break;
          q.push(
            u >> 6 | 192,
            u & 63 | 128
          );
        } else if (u < 65536) {
          if ((o -= 3) < 0) break;
          q.push(
            u >> 12 | 224,
            u >> 6 & 63 | 128,
            u & 63 | 128
          );
        } else if (u < 1114112) {
          if ((o -= 4) < 0) break;
          q.push(
            u >> 18 | 240,
            u >> 12 & 63 | 128,
            u >> 6 & 63 | 128,
            u & 63 | 128
          );
        } else
          throw new Error("Invalid code point");
      }
      return q;
    }
    function z(E) {
      for (var o = [], u = 0; u < E.length; ++u)
        o.push(E.charCodeAt(u) & 255);
      return o;
    }
    function B(E, o) {
      for (var u, p, M, q = [], W = 0; W < E.length && !((o -= 2) < 0); ++W)
        u = E.charCodeAt(W), p = u >> 8, M = u % 256, q.push(M), q.push(p);
      return q;
    }
    function I(E) {
      return e.toByteArray(x(E));
    }
    function F(E, o, u, p) {
      for (var M = 0; M < p && !(M + u >= o.length || M >= E.length); ++M)
        o[M + u] = E[M];
      return M;
    }
    function ee(E, o) {
      return E instanceof o || E != null && E.constructor != null && E.constructor.name != null && E.constructor.name === o.name;
    }
    function m(E) {
      return E !== E;
    }
    var J = function() {
      for (var E = "0123456789abcdef", o = new Array(256), u = 0; u < 16; ++u)
        for (var p = u * 16, M = 0; M < 16; ++M)
          o[p + M] = E[u] + E[M];
      return o;
    }();
  }(Un)), Un;
}
var Wn = {}, jn = {}, zn, va;
function wu() {
  return va || (va = 1, zn = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var e = {}, r = Symbol("test"), n = Object(r);
    if (typeof r == "string" || Object.prototype.toString.call(r) !== "[object Symbol]" || Object.prototype.toString.call(n) !== "[object Symbol]")
      return !1;
    var i = 42;
    e[r] = i;
    for (r in e)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
      return !1;
    var a = Object.getOwnPropertySymbols(e);
    if (a.length !== 1 || a[0] !== r || !Object.prototype.propertyIsEnumerable.call(e, r))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var l = Object.getOwnPropertyDescriptor(e, r);
      if (l.value !== i || l.enumerable !== !0)
        return !1;
    }
    return !0;
  }), zn;
}
var Hn, _a;
function ks() {
  if (_a) return Hn;
  _a = 1;
  var t = wu();
  return Hn = function() {
    return t() && !!Symbol.toStringTag;
  }, Hn;
}
var Yn, ba;
function uc() {
  return ba || (ba = 1, Yn = Error), Yn;
}
var qn, xa;
function lc() {
  return xa || (xa = 1, qn = EvalError), qn;
}
var Gn, Sa;
function cc() {
  return Sa || (Sa = 1, Gn = RangeError), Gn;
}
var Vn, Ea;
function hc() {
  return Ea || (Ea = 1, Vn = ReferenceError), Vn;
}
var Kn, Ta;
function yu() {
  return Ta || (Ta = 1, Kn = SyntaxError), Kn;
}
var $n, ka;
function yn() {
  return ka || (ka = 1, $n = TypeError), $n;
}
var Zn, Aa;
function fc() {
  return Aa || (Aa = 1, Zn = URIError), Zn;
}
var Xn, Ra;
function dc() {
  if (Ra) return Xn;
  Ra = 1;
  var t = typeof Symbol < "u" && Symbol, e = wu();
  return Xn = function() {
    return typeof t != "function" || typeof Symbol != "function" || typeof t("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : e();
  }, Xn;
}
var Jn, Oa;
function pc() {
  if (Oa) return Jn;
  Oa = 1;
  var t = {
    __proto__: null,
    foo: {}
  }, e = Object;
  return Jn = function() {
    return { __proto__: t }.foo === t.foo && !(t instanceof e);
  }, Jn;
}
var Qn, Da;
function mc() {
  if (Da) return Qn;
  Da = 1;
  var t = "Function.prototype.bind called on incompatible ", e = Object.prototype.toString, r = Math.max, n = "[object Function]", i = function(c, b) {
    for (var S = [], A = 0; A < c.length; A += 1)
      S[A] = c[A];
    for (var R = 0; R < b.length; R += 1)
      S[R + c.length] = b[R];
    return S;
  }, a = function(c, b) {
    for (var S = [], A = b, R = 0; A < c.length; A += 1, R += 1)
      S[R] = c[A];
    return S;
  }, l = function(s, c) {
    for (var b = "", S = 0; S < s.length; S += 1)
      b += s[S], S + 1 < s.length && (b += c);
    return b;
  };
  return Qn = function(c) {
    var b = this;
    if (typeof b != "function" || e.apply(b) !== n)
      throw new TypeError(t + b);
    for (var S = a(arguments, 1), A, R = function() {
      if (this instanceof A) {
        var h = b.apply(
          this,
          i(S, arguments)
        );
        return Object(h) === h ? h : this;
      }
      return b.apply(
        c,
        i(S, arguments)
      );
    }, _ = r(0, b.length - S.length), k = [], d = 0; d < _; d++)
      k[d] = "$" + d;
    if (A = Function("binder", "return function (" + l(k, ",") + "){ return binder.apply(this,arguments); }")(R), b.prototype) {
      var O = function() {
      };
      O.prototype = b.prototype, A.prototype = new O(), O.prototype = null;
    }
    return A;
  }, Qn;
}
var ei, Na;
function As() {
  if (Na) return ei;
  Na = 1;
  var t = mc();
  return ei = Function.prototype.bind || t, ei;
}
var ti, Ca;
function wc() {
  if (Ca) return ti;
  Ca = 1;
  var t = Function.prototype.call, e = Object.prototype.hasOwnProperty, r = As();
  return ti = r.call(t, e), ti;
}
var ri, Ia;
function Fr() {
  if (Ia) return ri;
  Ia = 1;
  var t, e = /* @__PURE__ */ uc(), r = /* @__PURE__ */ lc(), n = /* @__PURE__ */ cc(), i = /* @__PURE__ */ hc(), a = /* @__PURE__ */ yu(), l = /* @__PURE__ */ yn(), s = /* @__PURE__ */ fc(), c = Function, b = function(j) {
    try {
      return c('"use strict"; return (' + j + ").constructor;")();
    } catch {
    }
  }, S = Object.getOwnPropertyDescriptor;
  if (S)
    try {
      S({}, "");
    } catch {
      S = null;
    }
  var A = function() {
    throw new l();
  }, R = S ? function() {
    try {
      return arguments.callee, A;
    } catch {
      try {
        return S(arguments, "callee").get;
      } catch {
        return A;
      }
    }
  }() : A, _ = dc()(), k = /* @__PURE__ */ pc()(), d = Object.getPrototypeOf || (k ? function(j) {
    return j.__proto__;
  } : null), O = {}, h = typeof Uint8Array > "u" || !d ? t : d(Uint8Array), g = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? t : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? t : ArrayBuffer,
    "%ArrayIteratorPrototype%": _ && d ? d([][Symbol.iterator]()) : t,
    "%AsyncFromSyncIteratorPrototype%": t,
    "%AsyncFunction%": O,
    "%AsyncGenerator%": O,
    "%AsyncGeneratorFunction%": O,
    "%AsyncIteratorPrototype%": O,
    "%Atomics%": typeof Atomics > "u" ? t : Atomics,
    "%BigInt%": typeof BigInt > "u" ? t : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? t : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? t : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? t : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": e,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": r,
    "%Float32Array%": typeof Float32Array > "u" ? t : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? t : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? t : FinalizationRegistry,
    "%Function%": c,
    "%GeneratorFunction%": O,
    "%Int8Array%": typeof Int8Array > "u" ? t : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? t : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? t : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": _ && d ? d(d([][Symbol.iterator]())) : t,
    "%JSON%": typeof JSON == "object" ? JSON : t,
    "%Map%": typeof Map > "u" ? t : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !_ || !d ? t : d((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? t : Promise,
    "%Proxy%": typeof Proxy > "u" ? t : Proxy,
    "%RangeError%": n,
    "%ReferenceError%": i,
    "%Reflect%": typeof Reflect > "u" ? t : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? t : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !_ || !d ? t : d((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? t : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": _ && d ? d(""[Symbol.iterator]()) : t,
    "%Symbol%": _ ? Symbol : t,
    "%SyntaxError%": a,
    "%ThrowTypeError%": R,
    "%TypedArray%": h,
    "%TypeError%": l,
    "%Uint8Array%": typeof Uint8Array > "u" ? t : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? t : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? t : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? t : Uint32Array,
    "%URIError%": s,
    "%WeakMap%": typeof WeakMap > "u" ? t : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? t : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? t : WeakSet
  };
  if (d)
    try {
      null.error;
    } catch (j) {
      var w = d(d(j));
      g["%Error.prototype%"] = w;
    }
  var f = function j(te) {
    var X;
    if (te === "%AsyncFunction%")
      X = b("async function () {}");
    else if (te === "%GeneratorFunction%")
      X = b("function* () {}");
    else if (te === "%AsyncGeneratorFunction%")
      X = b("async function* () {}");
    else if (te === "%AsyncGenerator%") {
      var oe = j("%AsyncGeneratorFunction%");
      oe && (X = oe.prototype);
    } else if (te === "%AsyncIteratorPrototype%") {
      var Y = j("%AsyncGenerator%");
      Y && d && (X = d(Y.prototype));
    }
    return g[te] = X, X;
  }, T = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  }, P = As(), L = /* @__PURE__ */ wc(), H = P.call(Function.call, Array.prototype.concat), D = P.call(Function.apply, Array.prototype.splice), Z = P.call(Function.call, String.prototype.replace), ce = P.call(Function.call, String.prototype.slice), N = P.call(Function.call, RegExp.prototype.exec), U = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, v = /\\(\\)?/g, V = function(te) {
    var X = ce(te, 0, 1), oe = ce(te, -1);
    if (X === "%" && oe !== "%")
      throw new a("invalid intrinsic syntax, expected closing `%`");
    if (oe === "%" && X !== "%")
      throw new a("invalid intrinsic syntax, expected opening `%`");
    var Y = [];
    return Z(te, U, function(C, K, $, re) {
      Y[Y.length] = $ ? Z(re, v, "$1") : K || C;
    }), Y;
  }, Q = function(te, X) {
    var oe = te, Y;
    if (L(T, oe) && (Y = T[oe], oe = "%" + Y[0] + "%"), L(g, oe)) {
      var C = g[oe];
      if (C === O && (C = f(oe)), typeof C > "u" && !X)
        throw new l("intrinsic " + te + " exists, but is not available. Please file an issue!");
      return {
        alias: Y,
        name: oe,
        value: C
      };
    }
    throw new a("intrinsic " + te + " does not exist!");
  };
  return ri = function(te, X) {
    if (typeof te != "string" || te.length === 0)
      throw new l("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof X != "boolean")
      throw new l('"allowMissing" argument must be a boolean');
    if (N(/^%?[^%]*%?$/, te) === null)
      throw new a("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var oe = V(te), Y = oe.length > 0 ? oe[0] : "", C = Q("%" + Y + "%", X), K = C.name, $ = C.value, re = !1, G = C.alias;
    G && (Y = G[0], D(oe, H([0, 1], G)));
    for (var x = 1, y = !0; x < oe.length; x += 1) {
      var z = oe[x], B = ce(z, 0, 1), I = ce(z, -1);
      if ((B === '"' || B === "'" || B === "`" || I === '"' || I === "'" || I === "`") && B !== I)
        throw new a("property names with quotes must have matching quotes");
      if ((z === "constructor" || !y) && (re = !0), Y += "." + z, K = "%" + Y + "%", L(g, K))
        $ = g[K];
      else if ($ != null) {
        if (!(z in $)) {
          if (!X)
            throw new l("base intrinsic for " + te + " exists, but the property is not available.");
          return;
        }
        if (S && x + 1 >= oe.length) {
          var F = S($, z);
          y = !!F, y && "get" in F && !("originalValue" in F.get) ? $ = F.get : $ = $[z];
        } else
          y = L($, z), $ = $[z];
        y && !re && (g[K] = $);
      }
    }
    return $;
  }, ri;
}
var ni = { exports: {} }, ii, Fa;
function Rs() {
  if (Fa) return ii;
  Fa = 1;
  var t = /* @__PURE__ */ Fr(), e = t("%Object.defineProperty%", !0) || !1;
  if (e)
    try {
      e({}, "a", { value: 1 });
    } catch {
      e = !1;
    }
  return ii = e, ii;
}
var si, Pa;
function Os() {
  if (Pa) return si;
  Pa = 1;
  var t = /* @__PURE__ */ Fr(), e = t("%Object.getOwnPropertyDescriptor%", !0);
  if (e)
    try {
      e([], "length");
    } catch {
      e = null;
    }
  return si = e, si;
}
var ai, Ma;
function yc() {
  if (Ma) return ai;
  Ma = 1;
  var t = /* @__PURE__ */ Rs(), e = /* @__PURE__ */ yu(), r = /* @__PURE__ */ yn(), n = /* @__PURE__ */ Os();
  return ai = function(a, l, s) {
    if (!a || typeof a != "object" && typeof a != "function")
      throw new r("`obj` must be an object or a function`");
    if (typeof l != "string" && typeof l != "symbol")
      throw new r("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
      throw new r("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
      throw new r("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
      throw new r("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean")
      throw new r("`loose`, if provided, must be a boolean");
    var c = arguments.length > 3 ? arguments[3] : null, b = arguments.length > 4 ? arguments[4] : null, S = arguments.length > 5 ? arguments[5] : null, A = arguments.length > 6 ? arguments[6] : !1, R = !!n && n(a, l);
    if (t)
      t(a, l, {
        configurable: S === null && R ? R.configurable : !S,
        enumerable: c === null && R ? R.enumerable : !c,
        value: s,
        writable: b === null && R ? R.writable : !b
      });
    else if (A || !c && !b && !S)
      a[l] = s;
    else
      throw new e("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  }, ai;
}
var oi, La;
function gc() {
  if (La) return oi;
  La = 1;
  var t = /* @__PURE__ */ Rs(), e = function() {
    return !!t;
  };
  return e.hasArrayLengthDefineBug = function() {
    if (!t)
      return null;
    try {
      return t([], "length", { value: 1 }).length !== 1;
    } catch {
      return !0;
    }
  }, oi = e, oi;
}
var ui, Ba;
function vc() {
  if (Ba) return ui;
  Ba = 1;
  var t = /* @__PURE__ */ Fr(), e = /* @__PURE__ */ yc(), r = /* @__PURE__ */ gc()(), n = /* @__PURE__ */ Os(), i = /* @__PURE__ */ yn(), a = t("%Math.floor%");
  return ui = function(s, c) {
    if (typeof s != "function")
      throw new i("`fn` is not a function");
    if (typeof c != "number" || c < 0 || c > 4294967295 || a(c) !== c)
      throw new i("`length` must be a positive 32-bit integer");
    var b = arguments.length > 2 && !!arguments[2], S = !0, A = !0;
    if ("length" in s && n) {
      var R = n(s, "length");
      R && !R.configurable && (S = !1), R && !R.writable && (A = !1);
    }
    return (S || A || !b) && (r ? e(
      /** @type {Parameters<define>[0]} */
      s,
      "length",
      c,
      !0,
      !0
    ) : e(
      /** @type {Parameters<define>[0]} */
      s,
      "length",
      c
    )), s;
  }, ui;
}
var Ua;
function gu() {
  return Ua || (Ua = 1, function(t) {
    var e = As(), r = /* @__PURE__ */ Fr(), n = /* @__PURE__ */ vc(), i = /* @__PURE__ */ yn(), a = r("%Function.prototype.apply%"), l = r("%Function.prototype.call%"), s = r("%Reflect.apply%", !0) || e.call(l, a), c = /* @__PURE__ */ Rs(), b = r("%Math.max%");
    t.exports = function(R) {
      if (typeof R != "function")
        throw new i("a function is required");
      var _ = s(e, l, arguments);
      return n(
        _,
        1 + b(0, R.length - (arguments.length - 1)),
        !0
      );
    };
    var S = function() {
      return s(e, a, arguments);
    };
    c ? c(t.exports, "apply", { value: S }) : t.exports.apply = S;
  }(ni)), ni.exports;
}
var li, Wa;
function vu() {
  if (Wa) return li;
  Wa = 1;
  var t = /* @__PURE__ */ Fr(), e = gu(), r = e(t("String.prototype.indexOf"));
  return li = function(i, a) {
    var l = t(i, !!a);
    return typeof l == "function" && r(i, ".prototype.") > -1 ? e(l) : l;
  }, li;
}
var ci, ja;
function _c() {
  if (ja) return ci;
  ja = 1;
  var t = ks()(), e = vu(), r = e("Object.prototype.toString"), n = function(s) {
    return t && s && typeof s == "object" && Symbol.toStringTag in s ? !1 : r(s) === "[object Arguments]";
  }, i = function(s) {
    return n(s) ? !0 : s !== null && typeof s == "object" && typeof s.length == "number" && s.length >= 0 && r(s) !== "[object Array]" && r(s.callee) === "[object Function]";
  }, a = function() {
    return n(arguments);
  }();
  return n.isLegacyArguments = i, ci = a ? n : i, ci;
}
var hi, za;
function bc() {
  if (za) return hi;
  za = 1;
  var t = Object.prototype.toString, e = Function.prototype.toString, r = /^\s*(?:function)?\*/, n = ks()(), i = Object.getPrototypeOf, a = function() {
    if (!n)
      return !1;
    try {
      return Function("return function*() {}")();
    } catch {
    }
  }, l;
  return hi = function(c) {
    if (typeof c != "function")
      return !1;
    if (r.test(e.call(c)))
      return !0;
    if (!n) {
      var b = t.call(c);
      return b === "[object GeneratorFunction]";
    }
    if (!i)
      return !1;
    if (typeof l > "u") {
      var S = a();
      l = S ? i(S) : !1;
    }
    return i(c) === l;
  }, hi;
}
var fi, Ha;
function xc() {
  if (Ha) return fi;
  Ha = 1;
  var t = Function.prototype.toString, e = typeof Reflect == "object" && Reflect !== null && Reflect.apply, r, n;
  if (typeof e == "function" && typeof Object.defineProperty == "function")
    try {
      r = Object.defineProperty({}, "length", {
        get: function() {
          throw n;
        }
      }), n = {}, e(function() {
        throw 42;
      }, null, r);
    } catch (g) {
      g !== n && (e = null);
    }
  else
    e = null;
  var i = /^\s*class\b/, a = function(w) {
    try {
      var f = t.call(w);
      return i.test(f);
    } catch {
      return !1;
    }
  }, l = function(w) {
    try {
      return a(w) ? !1 : (t.call(w), !0);
    } catch {
      return !1;
    }
  }, s = Object.prototype.toString, c = "[object Object]", b = "[object Function]", S = "[object GeneratorFunction]", A = "[object HTMLAllCollection]", R = "[object HTML document.all class]", _ = "[object HTMLCollection]", k = typeof Symbol == "function" && !!Symbol.toStringTag, d = !(0 in [,]), O = function() {
    return !1;
  };
  if (typeof document == "object") {
    var h = document.all;
    s.call(h) === s.call(document.all) && (O = function(w) {
      if ((d || !w) && (typeof w > "u" || typeof w == "object"))
        try {
          var f = s.call(w);
          return (f === A || f === R || f === _ || f === c) && w("") == null;
        } catch {
        }
      return !1;
    });
  }
  return fi = e ? function(w) {
    if (O(w))
      return !0;
    if (!w || typeof w != "function" && typeof w != "object")
      return !1;
    try {
      e(w, null, r);
    } catch (f) {
      if (f !== n)
        return !1;
    }
    return !a(w) && l(w);
  } : function(w) {
    if (O(w))
      return !0;
    if (!w || typeof w != "function" && typeof w != "object")
      return !1;
    if (k)
      return l(w);
    if (a(w))
      return !1;
    var f = s.call(w);
    return f !== b && f !== S && !/^\[object HTML/.test(f) ? !1 : l(w);
  }, fi;
}
var di, Ya;
function Sc() {
  if (Ya) return di;
  Ya = 1;
  var t = xc(), e = Object.prototype.toString, r = Object.prototype.hasOwnProperty, n = function(c, b, S) {
    for (var A = 0, R = c.length; A < R; A++)
      r.call(c, A) && (S == null ? b(c[A], A, c) : b.call(S, c[A], A, c));
  }, i = function(c, b, S) {
    for (var A = 0, R = c.length; A < R; A++)
      S == null ? b(c.charAt(A), A, c) : b.call(S, c.charAt(A), A, c);
  }, a = function(c, b, S) {
    for (var A in c)
      r.call(c, A) && (S == null ? b(c[A], A, c) : b.call(S, c[A], A, c));
  }, l = function(c, b, S) {
    if (!t(b))
      throw new TypeError("iterator must be a function");
    var A;
    arguments.length >= 3 && (A = S), e.call(c) === "[object Array]" ? n(c, b, A) : typeof c == "string" ? i(c, b, A) : a(c, b, A);
  };
  return di = l, di;
}
var pi, qa;
function Ec() {
  return qa || (qa = 1, pi = [
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Uint16Array",
    "Uint32Array",
    "BigInt64Array",
    "BigUint64Array"
  ]), pi;
}
var mi, Ga;
function Tc() {
  if (Ga) return mi;
  Ga = 1;
  var t = /* @__PURE__ */ Ec(), e = typeof globalThis > "u" ? ut : globalThis;
  return mi = function() {
    for (var n = [], i = 0; i < t.length; i++)
      typeof e[t[i]] == "function" && (n[n.length] = t[i]);
    return n;
  }, mi;
}
var wi, Va;
function _u() {
  if (Va) return wi;
  Va = 1;
  var t = Sc(), e = /* @__PURE__ */ Tc(), r = gu(), n = vu(), i = /* @__PURE__ */ Os(), a = n("Object.prototype.toString"), l = ks()(), s = typeof globalThis > "u" ? ut : globalThis, c = e(), b = n("String.prototype.slice"), S = Object.getPrototypeOf, A = n("Array.prototype.indexOf", !0) || function(O, h) {
    for (var g = 0; g < O.length; g += 1)
      if (O[g] === h)
        return g;
    return -1;
  }, R = { __proto__: null };
  l && i && S ? t(c, function(d) {
    var O = new s[d]();
    if (Symbol.toStringTag in O) {
      var h = S(O), g = i(h, Symbol.toStringTag);
      if (!g) {
        var w = S(h);
        g = i(w, Symbol.toStringTag);
      }
      R["$" + d] = r(g.get);
    }
  }) : t(c, function(d) {
    var O = new s[d](), h = O.slice || O.set;
    h && (R["$" + d] = r(h));
  });
  var _ = function(O) {
    var h = !1;
    return t(
      // eslint-disable-next-line no-extra-parens
      /** @type {Record<`\$${TypedArrayName}`, Getter>} */
      /** @type {any} */
      R,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(g, w) {
        if (!h)
          try {
            "$" + g(O) === w && (h = b(w, 1));
          } catch {
          }
      }
    ), h;
  }, k = function(O) {
    var h = !1;
    return t(
      // eslint-disable-next-line no-extra-parens
      /** @type {Record<`\$${TypedArrayName}`, Getter>} */
      /** @type {any} */
      R,
      /** @type {(getter: typeof cache, name: `\$${import('.').TypedArrayName}`) => void} */
      function(g, w) {
        if (!h)
          try {
            g(O), h = b(w, 1);
          } catch {
          }
      }
    ), h;
  };
  return wi = function(O) {
    if (!O || typeof O != "object")
      return !1;
    if (!l) {
      var h = b(a(O), 8, -1);
      return A(c, h) > -1 ? h : h !== "Object" ? !1 : k(O);
    }
    return i ? _(O) : null;
  }, wi;
}
var yi, Ka;
function kc() {
  if (Ka) return yi;
  Ka = 1;
  var t = /* @__PURE__ */ _u();
  return yi = function(r) {
    return !!t(r);
  }, yi;
}
var $a;
function Ac() {
  return $a || ($a = 1, function(t) {
    var e = _c(), r = bc(), n = /* @__PURE__ */ _u(), i = /* @__PURE__ */ kc();
    function a(p) {
      return p.call.bind(p);
    }
    var l = typeof BigInt < "u", s = typeof Symbol < "u", c = a(Object.prototype.toString), b = a(Number.prototype.valueOf), S = a(String.prototype.valueOf), A = a(Boolean.prototype.valueOf);
    if (l)
      var R = a(BigInt.prototype.valueOf);
    if (s)
      var _ = a(Symbol.prototype.valueOf);
    function k(p, M) {
      if (typeof p != "object")
        return !1;
      try {
        return M(p), !0;
      } catch {
        return !1;
      }
    }
    t.isArgumentsObject = e, t.isGeneratorFunction = r, t.isTypedArray = i;
    function d(p) {
      return typeof Promise < "u" && p instanceof Promise || p !== null && typeof p == "object" && typeof p.then == "function" && typeof p.catch == "function";
    }
    t.isPromise = d;
    function O(p) {
      return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(p) : i(p) || K(p);
    }
    t.isArrayBufferView = O;
    function h(p) {
      return n(p) === "Uint8Array";
    }
    t.isUint8Array = h;
    function g(p) {
      return n(p) === "Uint8ClampedArray";
    }
    t.isUint8ClampedArray = g;
    function w(p) {
      return n(p) === "Uint16Array";
    }
    t.isUint16Array = w;
    function f(p) {
      return n(p) === "Uint32Array";
    }
    t.isUint32Array = f;
    function T(p) {
      return n(p) === "Int8Array";
    }
    t.isInt8Array = T;
    function P(p) {
      return n(p) === "Int16Array";
    }
    t.isInt16Array = P;
    function L(p) {
      return n(p) === "Int32Array";
    }
    t.isInt32Array = L;
    function H(p) {
      return n(p) === "Float32Array";
    }
    t.isFloat32Array = H;
    function D(p) {
      return n(p) === "Float64Array";
    }
    t.isFloat64Array = D;
    function Z(p) {
      return n(p) === "BigInt64Array";
    }
    t.isBigInt64Array = Z;
    function ce(p) {
      return n(p) === "BigUint64Array";
    }
    t.isBigUint64Array = ce;
    function N(p) {
      return c(p) === "[object Map]";
    }
    N.working = typeof Map < "u" && N(/* @__PURE__ */ new Map());
    function U(p) {
      return typeof Map > "u" ? !1 : N.working ? N(p) : p instanceof Map;
    }
    t.isMap = U;
    function v(p) {
      return c(p) === "[object Set]";
    }
    v.working = typeof Set < "u" && v(/* @__PURE__ */ new Set());
    function V(p) {
      return typeof Set > "u" ? !1 : v.working ? v(p) : p instanceof Set;
    }
    t.isSet = V;
    function Q(p) {
      return c(p) === "[object WeakMap]";
    }
    Q.working = typeof WeakMap < "u" && Q(/* @__PURE__ */ new WeakMap());
    function j(p) {
      return typeof WeakMap > "u" ? !1 : Q.working ? Q(p) : p instanceof WeakMap;
    }
    t.isWeakMap = j;
    function te(p) {
      return c(p) === "[object WeakSet]";
    }
    te.working = typeof WeakSet < "u" && te(/* @__PURE__ */ new WeakSet());
    function X(p) {
      return te(p);
    }
    t.isWeakSet = X;
    function oe(p) {
      return c(p) === "[object ArrayBuffer]";
    }
    oe.working = typeof ArrayBuffer < "u" && oe(new ArrayBuffer());
    function Y(p) {
      return typeof ArrayBuffer > "u" ? !1 : oe.working ? oe(p) : p instanceof ArrayBuffer;
    }
    t.isArrayBuffer = Y;
    function C(p) {
      return c(p) === "[object DataView]";
    }
    C.working = typeof ArrayBuffer < "u" && typeof DataView < "u" && C(new DataView(new ArrayBuffer(1), 0, 1));
    function K(p) {
      return typeof DataView > "u" ? !1 : C.working ? C(p) : p instanceof DataView;
    }
    t.isDataView = K;
    var $ = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : void 0;
    function re(p) {
      return c(p) === "[object SharedArrayBuffer]";
    }
    function G(p) {
      return typeof $ > "u" ? !1 : (typeof re.working > "u" && (re.working = re(new $())), re.working ? re(p) : p instanceof $);
    }
    t.isSharedArrayBuffer = G;
    function x(p) {
      return c(p) === "[object AsyncFunction]";
    }
    t.isAsyncFunction = x;
    function y(p) {
      return c(p) === "[object Map Iterator]";
    }
    t.isMapIterator = y;
    function z(p) {
      return c(p) === "[object Set Iterator]";
    }
    t.isSetIterator = z;
    function B(p) {
      return c(p) === "[object Generator]";
    }
    t.isGeneratorObject = B;
    function I(p) {
      return c(p) === "[object WebAssembly.Module]";
    }
    t.isWebAssemblyCompiledModule = I;
    function F(p) {
      return k(p, b);
    }
    t.isNumberObject = F;
    function ee(p) {
      return k(p, S);
    }
    t.isStringObject = ee;
    function m(p) {
      return k(p, A);
    }
    t.isBooleanObject = m;
    function J(p) {
      return l && k(p, R);
    }
    t.isBigIntObject = J;
    function E(p) {
      return s && k(p, _);
    }
    t.isSymbolObject = E;
    function o(p) {
      return F(p) || ee(p) || m(p) || J(p) || E(p);
    }
    t.isBoxedPrimitive = o;
    function u(p) {
      return typeof Uint8Array < "u" && (Y(p) || G(p));
    }
    t.isAnyArrayBuffer = u, ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(p) {
      Object.defineProperty(t, p, {
        enumerable: !1,
        value: function() {
          throw new Error(p + " is not supported in userland");
        }
      });
    });
  }(jn)), jn;
}
var gi, Za;
function Rc() {
  return Za || (Za = 1, gi = function(e) {
    return e && typeof e == "object" && typeof e.copy == "function" && typeof e.fill == "function" && typeof e.readUInt8 == "function";
  }), gi;
}
var Xa;
function bu() {
  return Xa || (Xa = 1, function(t) {
    var e = Object.getOwnPropertyDescriptors || function(K) {
      for (var $ = Object.keys(K), re = {}, G = 0; G < $.length; G++)
        re[$[G]] = Object.getOwnPropertyDescriptor(K, $[G]);
      return re;
    }, r = /%[sdj%]/g;
    t.format = function(C) {
      if (!T(C)) {
        for (var K = [], $ = 0; $ < arguments.length; $++)
          K.push(l(arguments[$]));
        return K.join(" ");
      }
      for (var $ = 1, re = arguments, G = re.length, x = String(C).replace(r, function(z) {
        if (z === "%%") return "%";
        if ($ >= G) return z;
        switch (z) {
          case "%s":
            return String(re[$++]);
          case "%d":
            return Number(re[$++]);
          case "%j":
            try {
              return JSON.stringify(re[$++]);
            } catch {
              return "[Circular]";
            }
          default:
            return z;
        }
      }), y = re[$]; $ < G; y = re[++$])
        g(y) || !D(y) ? x += " " + y : x += " " + l(y);
      return x;
    }, t.deprecate = function(C, K) {
      if (typeof _e < "u" && _e.noDeprecation === !0)
        return C;
      if (typeof _e > "u")
        return function() {
          return t.deprecate(C, K).apply(this, arguments);
        };
      var $ = !1;
      function re() {
        if (!$) {
          if (_e.throwDeprecation)
            throw new Error(K);
          _e.traceDeprecation ? console.trace(K) : console.error(K), $ = !0;
        }
        return C.apply(this, arguments);
      }
      return re;
    };
    var n = {}, i = /^$/;
    if (_e.env.NODE_DEBUG) {
      var a = _e.env.NODE_DEBUG;
      a = a.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), i = new RegExp("^" + a + "$", "i");
    }
    t.debuglog = function(C) {
      if (C = C.toUpperCase(), !n[C])
        if (i.test(C)) {
          var K = _e.pid;
          n[C] = function() {
            var $ = t.format.apply(t, arguments);
            console.error("%s %d: %s", C, K, $);
          };
        } else
          n[C] = function() {
          };
      return n[C];
    };
    function l(C, K) {
      var $ = {
        seen: [],
        stylize: c
      };
      return arguments.length >= 3 && ($.depth = arguments[2]), arguments.length >= 4 && ($.colors = arguments[3]), h(K) ? $.showHidden = K : K && t._extend($, K), L($.showHidden) && ($.showHidden = !1), L($.depth) && ($.depth = 2), L($.colors) && ($.colors = !1), L($.customInspect) && ($.customInspect = !0), $.colors && ($.stylize = s), S($, C, $.depth);
    }
    t.inspect = l, l.colors = {
      bold: [1, 22],
      italic: [3, 23],
      underline: [4, 24],
      inverse: [7, 27],
      white: [37, 39],
      grey: [90, 39],
      black: [30, 39],
      blue: [34, 39],
      cyan: [36, 39],
      green: [32, 39],
      magenta: [35, 39],
      red: [31, 39],
      yellow: [33, 39]
    }, l.styles = {
      special: "cyan",
      number: "yellow",
      boolean: "yellow",
      undefined: "grey",
      null: "bold",
      string: "green",
      date: "magenta",
      // "name": intentionally not styling
      regexp: "red"
    };
    function s(C, K) {
      var $ = l.styles[K];
      return $ ? "\x1B[" + l.colors[$][0] + "m" + C + "\x1B[" + l.colors[$][1] + "m" : C;
    }
    function c(C, K) {
      return C;
    }
    function b(C) {
      var K = {};
      return C.forEach(function($, re) {
        K[$] = !0;
      }), K;
    }
    function S(C, K, $) {
      if (C.customInspect && K && N(K.inspect) && // Filter out the util module, it's inspect function is special
      K.inspect !== t.inspect && // Also filter out any prototype objects using the circular check.
      !(K.constructor && K.constructor.prototype === K)) {
        var re = K.inspect($, C);
        return T(re) || (re = S(C, re, $)), re;
      }
      var G = A(C, K);
      if (G)
        return G;
      var x = Object.keys(K), y = b(x);
      if (C.showHidden && (x = Object.getOwnPropertyNames(K)), ce(K) && (x.indexOf("message") >= 0 || x.indexOf("description") >= 0))
        return R(K);
      if (x.length === 0) {
        if (N(K)) {
          var z = K.name ? ": " + K.name : "";
          return C.stylize("[Function" + z + "]", "special");
        }
        if (H(K))
          return C.stylize(RegExp.prototype.toString.call(K), "regexp");
        if (Z(K))
          return C.stylize(Date.prototype.toString.call(K), "date");
        if (ce(K))
          return R(K);
      }
      var B = "", I = !1, F = ["{", "}"];
      if (O(K) && (I = !0, F = ["[", "]"]), N(K)) {
        var ee = K.name ? ": " + K.name : "";
        B = " [Function" + ee + "]";
      }
      if (H(K) && (B = " " + RegExp.prototype.toString.call(K)), Z(K) && (B = " " + Date.prototype.toUTCString.call(K)), ce(K) && (B = " " + R(K)), x.length === 0 && (!I || K.length == 0))
        return F[0] + B + F[1];
      if ($ < 0)
        return H(K) ? C.stylize(RegExp.prototype.toString.call(K), "regexp") : C.stylize("[Object]", "special");
      C.seen.push(K);
      var m;
      return I ? m = _(C, K, $, y, x) : m = x.map(function(J) {
        return k(C, K, $, y, J, I);
      }), C.seen.pop(), d(m, B, F);
    }
    function A(C, K) {
      if (L(K))
        return C.stylize("undefined", "undefined");
      if (T(K)) {
        var $ = "'" + JSON.stringify(K).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return C.stylize($, "string");
      }
      if (f(K))
        return C.stylize("" + K, "number");
      if (h(K))
        return C.stylize("" + K, "boolean");
      if (g(K))
        return C.stylize("null", "null");
    }
    function R(C) {
      return "[" + Error.prototype.toString.call(C) + "]";
    }
    function _(C, K, $, re, G) {
      for (var x = [], y = 0, z = K.length; y < z; ++y)
        te(K, String(y)) ? x.push(k(
          C,
          K,
          $,
          re,
          String(y),
          !0
        )) : x.push("");
      return G.forEach(function(B) {
        B.match(/^\d+$/) || x.push(k(
          C,
          K,
          $,
          re,
          B,
          !0
        ));
      }), x;
    }
    function k(C, K, $, re, G, x) {
      var y, z, B;
      if (B = Object.getOwnPropertyDescriptor(K, G) || { value: K[G] }, B.get ? B.set ? z = C.stylize("[Getter/Setter]", "special") : z = C.stylize("[Getter]", "special") : B.set && (z = C.stylize("[Setter]", "special")), te(re, G) || (y = "[" + G + "]"), z || (C.seen.indexOf(B.value) < 0 ? (g($) ? z = S(C, B.value, null) : z = S(C, B.value, $ - 1), z.indexOf(`
`) > -1 && (x ? z = z.split(`
`).map(function(I) {
        return "  " + I;
      }).join(`
`).slice(2) : z = `
` + z.split(`
`).map(function(I) {
        return "   " + I;
      }).join(`
`))) : z = C.stylize("[Circular]", "special")), L(y)) {
        if (x && G.match(/^\d+$/))
          return z;
        y = JSON.stringify("" + G), y.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (y = y.slice(1, -1), y = C.stylize(y, "name")) : (y = y.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), y = C.stylize(y, "string"));
      }
      return y + ": " + z;
    }
    function d(C, K, $) {
      var re = C.reduce(function(G, x) {
        return x.indexOf(`
`) >= 0, G + x.replace(/\u001b\[\d\d?m/g, "").length + 1;
      }, 0);
      return re > 60 ? $[0] + (K === "" ? "" : K + `
 `) + " " + C.join(`,
  `) + " " + $[1] : $[0] + K + " " + C.join(", ") + " " + $[1];
    }
    t.types = Ac();
    function O(C) {
      return Array.isArray(C);
    }
    t.isArray = O;
    function h(C) {
      return typeof C == "boolean";
    }
    t.isBoolean = h;
    function g(C) {
      return C === null;
    }
    t.isNull = g;
    function w(C) {
      return C == null;
    }
    t.isNullOrUndefined = w;
    function f(C) {
      return typeof C == "number";
    }
    t.isNumber = f;
    function T(C) {
      return typeof C == "string";
    }
    t.isString = T;
    function P(C) {
      return typeof C == "symbol";
    }
    t.isSymbol = P;
    function L(C) {
      return C === void 0;
    }
    t.isUndefined = L;
    function H(C) {
      return D(C) && v(C) === "[object RegExp]";
    }
    t.isRegExp = H, t.types.isRegExp = H;
    function D(C) {
      return typeof C == "object" && C !== null;
    }
    t.isObject = D;
    function Z(C) {
      return D(C) && v(C) === "[object Date]";
    }
    t.isDate = Z, t.types.isDate = Z;
    function ce(C) {
      return D(C) && (v(C) === "[object Error]" || C instanceof Error);
    }
    t.isError = ce, t.types.isNativeError = ce;
    function N(C) {
      return typeof C == "function";
    }
    t.isFunction = N;
    function U(C) {
      return C === null || typeof C == "boolean" || typeof C == "number" || typeof C == "string" || typeof C == "symbol" || // ES6 symbol
      typeof C > "u";
    }
    t.isPrimitive = U, t.isBuffer = Rc();
    function v(C) {
      return Object.prototype.toString.call(C);
    }
    function V(C) {
      return C < 10 ? "0" + C.toString(10) : C.toString(10);
    }
    var Q = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    function j() {
      var C = /* @__PURE__ */ new Date(), K = [
        V(C.getHours()),
        V(C.getMinutes()),
        V(C.getSeconds())
      ].join(":");
      return [C.getDate(), Q[C.getMonth()], K].join(" ");
    }
    t.log = function() {
      console.log("%s - %s", j(), t.format.apply(t, arguments));
    }, t.inherits = Mt(), t._extend = function(C, K) {
      if (!K || !D(K)) return C;
      for (var $ = Object.keys(K), re = $.length; re--; )
        C[$[re]] = K[$[re]];
      return C;
    };
    function te(C, K) {
      return Object.prototype.hasOwnProperty.call(C, K);
    }
    var X = typeof Symbol < "u" ? Symbol("util.promisify.custom") : void 0;
    t.promisify = function(K) {
      if (typeof K != "function")
        throw new TypeError('The "original" argument must be of type Function');
      if (X && K[X]) {
        var $ = K[X];
        if (typeof $ != "function")
          throw new TypeError('The "util.promisify.custom" argument must be of type Function');
        return Object.defineProperty($, X, {
          value: $,
          enumerable: !1,
          writable: !1,
          configurable: !0
        }), $;
      }
      function $() {
        for (var re, G, x = new Promise(function(B, I) {
          re = B, G = I;
        }), y = [], z = 0; z < arguments.length; z++)
          y.push(arguments[z]);
        y.push(function(B, I) {
          B ? G(B) : re(I);
        });
        try {
          K.apply(this, y);
        } catch (B) {
          G(B);
        }
        return x;
      }
      return Object.setPrototypeOf($, Object.getPrototypeOf(K)), X && Object.defineProperty($, X, {
        value: $,
        enumerable: !1,
        writable: !1,
        configurable: !0
      }), Object.defineProperties(
        $,
        e(K)
      );
    }, t.promisify.custom = X;
    function oe(C, K) {
      if (!C) {
        var $ = new Error("Promise was rejected with a falsy value");
        $.reason = C, C = $;
      }
      return K(C);
    }
    function Y(C) {
      if (typeof C != "function")
        throw new TypeError('The "original" argument must be of type Function');
      function K() {
        for (var $ = [], re = 0; re < arguments.length; re++)
          $.push(arguments[re]);
        var G = $.pop();
        if (typeof G != "function")
          throw new TypeError("The last argument must be of type Function");
        var x = this, y = function() {
          return G.apply(x, arguments);
        };
        C.apply(this, $).then(
          function(z) {
            _e.nextTick(y.bind(null, null, z));
          },
          function(z) {
            _e.nextTick(oe.bind(null, z, y));
          }
        );
      }
      return Object.setPrototypeOf(K, Object.getPrototypeOf(C)), Object.defineProperties(
        K,
        e(C)
      ), K;
    }
    t.callbackify = Y;
  }(Wn)), Wn;
}
var vi, Ja;
function Oc() {
  if (Ja) return vi;
  Ja = 1;
  function t(R, _) {
    var k = Object.keys(R);
    if (Object.getOwnPropertySymbols) {
      var d = Object.getOwnPropertySymbols(R);
      _ && (d = d.filter(function(O) {
        return Object.getOwnPropertyDescriptor(R, O).enumerable;
      })), k.push.apply(k, d);
    }
    return k;
  }
  function e(R) {
    for (var _ = 1; _ < arguments.length; _++) {
      var k = arguments[_] != null ? arguments[_] : {};
      _ % 2 ? t(Object(k), !0).forEach(function(d) {
        r(R, d, k[d]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(R, Object.getOwnPropertyDescriptors(k)) : t(Object(k)).forEach(function(d) {
        Object.defineProperty(R, d, Object.getOwnPropertyDescriptor(k, d));
      });
    }
    return R;
  }
  function r(R, _, k) {
    return _ in R ? Object.defineProperty(R, _, { value: k, enumerable: !0, configurable: !0, writable: !0 }) : R[_] = k, R;
  }
  function n(R, _) {
    if (!(R instanceof _))
      throw new TypeError("Cannot call a class as a function");
  }
  function i(R, _) {
    for (var k = 0; k < _.length; k++) {
      var d = _[k];
      d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(R, d.key, d);
    }
  }
  function a(R, _, k) {
    return _ && i(R.prototype, _), R;
  }
  var l = wn(), s = l.Buffer, c = bu(), b = c.inspect, S = b && b.custom || "inspect";
  function A(R, _, k) {
    s.prototype.copy.call(R, _, k);
  }
  return vi = /* @__PURE__ */ function() {
    function R() {
      n(this, R), this.head = null, this.tail = null, this.length = 0;
    }
    return a(R, [{
      key: "push",
      value: function(k) {
        var d = {
          data: k,
          next: null
        };
        this.length > 0 ? this.tail.next = d : this.head = d, this.tail = d, ++this.length;
      }
    }, {
      key: "unshift",
      value: function(k) {
        var d = {
          data: k,
          next: this.head
        };
        this.length === 0 && (this.tail = d), this.head = d, ++this.length;
      }
    }, {
      key: "shift",
      value: function() {
        if (this.length !== 0) {
          var k = this.head.data;
          return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, k;
        }
      }
    }, {
      key: "clear",
      value: function() {
        this.head = this.tail = null, this.length = 0;
      }
    }, {
      key: "join",
      value: function(k) {
        if (this.length === 0) return "";
        for (var d = this.head, O = "" + d.data; d = d.next; )
          O += k + d.data;
        return O;
      }
    }, {
      key: "concat",
      value: function(k) {
        if (this.length === 0) return s.alloc(0);
        for (var d = s.allocUnsafe(k >>> 0), O = this.head, h = 0; O; )
          A(O.data, d, h), h += O.data.length, O = O.next;
        return d;
      }
      // Consumes a specified amount of bytes or characters from the buffered data.
    }, {
      key: "consume",
      value: function(k, d) {
        var O;
        return k < this.head.data.length ? (O = this.head.data.slice(0, k), this.head.data = this.head.data.slice(k)) : k === this.head.data.length ? O = this.shift() : O = d ? this._getString(k) : this._getBuffer(k), O;
      }
    }, {
      key: "first",
      value: function() {
        return this.head.data;
      }
      // Consumes a specified amount of characters from the buffered data.
    }, {
      key: "_getString",
      value: function(k) {
        var d = this.head, O = 1, h = d.data;
        for (k -= h.length; d = d.next; ) {
          var g = d.data, w = k > g.length ? g.length : k;
          if (w === g.length ? h += g : h += g.slice(0, k), k -= w, k === 0) {
            w === g.length ? (++O, d.next ? this.head = d.next : this.head = this.tail = null) : (this.head = d, d.data = g.slice(w));
            break;
          }
          ++O;
        }
        return this.length -= O, h;
      }
      // Consumes a specified amount of bytes from the buffered data.
    }, {
      key: "_getBuffer",
      value: function(k) {
        var d = s.allocUnsafe(k), O = this.head, h = 1;
        for (O.data.copy(d), k -= O.data.length; O = O.next; ) {
          var g = O.data, w = k > g.length ? g.length : k;
          if (g.copy(d, d.length - k, 0, w), k -= w, k === 0) {
            w === g.length ? (++h, O.next ? this.head = O.next : this.head = this.tail = null) : (this.head = O, O.data = g.slice(w));
            break;
          }
          ++h;
        }
        return this.length -= h, d;
      }
      // Make sure the linked list only shows the minimal necessary information.
    }, {
      key: S,
      value: function(k, d) {
        return b(this, e({}, d, {
          // Only inspect one level.
          depth: 0,
          // It should not recurse.
          customInspect: !1
        }));
      }
    }]), R;
  }(), vi;
}
var _i, Qa;
function xu() {
  if (Qa) return _i;
  Qa = 1;
  function t(l, s) {
    var c = this, b = this._readableState && this._readableState.destroyed, S = this._writableState && this._writableState.destroyed;
    return b || S ? (s ? s(l) : l && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, _e.nextTick(i, this, l)) : _e.nextTick(i, this, l)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(l || null, function(A) {
      !s && A ? c._writableState ? c._writableState.errorEmitted ? _e.nextTick(r, c) : (c._writableState.errorEmitted = !0, _e.nextTick(e, c, A)) : _e.nextTick(e, c, A) : s ? (_e.nextTick(r, c), s(A)) : _e.nextTick(r, c);
    }), this);
  }
  function e(l, s) {
    i(l, s), r(l);
  }
  function r(l) {
    l._writableState && !l._writableState.emitClose || l._readableState && !l._readableState.emitClose || l.emit("close");
  }
  function n() {
    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
  }
  function i(l, s) {
    l.emit("error", s);
  }
  function a(l, s) {
    var c = l._readableState, b = l._writableState;
    c && c.autoDestroy || b && b.autoDestroy ? l.destroy(s) : l.emit("error", s);
  }
  return _i = {
    destroy: t,
    undestroy: n,
    errorOrDestroy: a
  }, _i;
}
var bi = {}, eo;
function hr() {
  if (eo) return bi;
  eo = 1;
  function t(s, c) {
    s.prototype = Object.create(c.prototype), s.prototype.constructor = s, s.__proto__ = c;
  }
  var e = {};
  function r(s, c, b) {
    b || (b = Error);
    function S(R, _, k) {
      return typeof c == "string" ? c : c(R, _, k);
    }
    var A = /* @__PURE__ */ function(R) {
      t(_, R);
      function _(k, d, O) {
        return R.call(this, S(k, d, O)) || this;
      }
      return _;
    }(b);
    A.prototype.name = b.name, A.prototype.code = s, e[s] = A;
  }
  function n(s, c) {
    if (Array.isArray(s)) {
      var b = s.length;
      return s = s.map(function(S) {
        return String(S);
      }), b > 2 ? "one of ".concat(c, " ").concat(s.slice(0, b - 1).join(", "), ", or ") + s[b - 1] : b === 2 ? "one of ".concat(c, " ").concat(s[0], " or ").concat(s[1]) : "of ".concat(c, " ").concat(s[0]);
    } else
      return "of ".concat(c, " ").concat(String(s));
  }
  function i(s, c, b) {
    return s.substr(0, c.length) === c;
  }
  function a(s, c, b) {
    return (b === void 0 || b > s.length) && (b = s.length), s.substring(b - c.length, b) === c;
  }
  function l(s, c, b) {
    return typeof b != "number" && (b = 0), b + c.length > s.length ? !1 : s.indexOf(c, b) !== -1;
  }
  return r("ERR_INVALID_OPT_VALUE", function(s, c) {
    return 'The value "' + c + '" is invalid for option "' + s + '"';
  }, TypeError), r("ERR_INVALID_ARG_TYPE", function(s, c, b) {
    var S;
    typeof c == "string" && i(c, "not ") ? (S = "must not be", c = c.replace(/^not /, "")) : S = "must be";
    var A;
    if (a(s, " argument"))
      A = "The ".concat(s, " ").concat(S, " ").concat(n(c, "type"));
    else {
      var R = l(s, ".") ? "property" : "argument";
      A = 'The "'.concat(s, '" ').concat(R, " ").concat(S, " ").concat(n(c, "type"));
    }
    return A += ". Received type ".concat(typeof b), A;
  }, TypeError), r("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), r("ERR_METHOD_NOT_IMPLEMENTED", function(s) {
    return "The " + s + " method is not implemented";
  }), r("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), r("ERR_STREAM_DESTROYED", function(s) {
    return "Cannot call " + s + " after a stream was destroyed";
  }), r("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), r("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), r("ERR_STREAM_WRITE_AFTER_END", "write after end"), r("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), r("ERR_UNKNOWN_ENCODING", function(s) {
    return "Unknown encoding: " + s;
  }, TypeError), r("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), bi.codes = e, bi;
}
var xi, to;
function Su() {
  if (to) return xi;
  to = 1;
  var t = hr().codes.ERR_INVALID_OPT_VALUE;
  function e(n, i, a) {
    return n.highWaterMark != null ? n.highWaterMark : i ? n[a] : null;
  }
  function r(n, i, a, l) {
    var s = e(i, l, a);
    if (s != null) {
      if (!(isFinite(s) && Math.floor(s) === s) || s < 0) {
        var c = l ? a : "highWaterMark";
        throw new t(c, s);
      }
      return Math.floor(s);
    }
    return n.objectMode ? 16 : 16 * 1024;
  }
  return xi = {
    getHighWaterMark: r
  }, xi;
}
var Si, ro;
function Dc() {
  if (ro) return Si;
  ro = 1, Si = t;
  function t(r, n) {
    if (e("noDeprecation"))
      return r;
    var i = !1;
    function a() {
      if (!i) {
        if (e("throwDeprecation"))
          throw new Error(n);
        e("traceDeprecation") ? console.trace(n) : console.warn(n), i = !0;
      }
      return r.apply(this, arguments);
    }
    return a;
  }
  function e(r) {
    try {
      if (!ut.localStorage) return !1;
    } catch {
      return !1;
    }
    var n = ut.localStorage[r];
    return n == null ? !1 : String(n).toLowerCase() === "true";
  }
  return Si;
}
var Ei, no;
function Eu() {
  if (no) return Ei;
  no = 1, Ei = H;
  function t(G) {
    var x = this;
    this.next = null, this.entry = null, this.finish = function() {
      re(x, G);
    };
  }
  var e;
  H.WritableState = P;
  var r = {
    deprecate: Dc()
  }, n = mu(), i = wn().Buffer, a = ut.Uint8Array || function() {
  };
  function l(G) {
    return i.from(G);
  }
  function s(G) {
    return i.isBuffer(G) || G instanceof a;
  }
  var c = xu(), b = Su(), S = b.getHighWaterMark, A = hr().codes, R = A.ERR_INVALID_ARG_TYPE, _ = A.ERR_METHOD_NOT_IMPLEMENTED, k = A.ERR_MULTIPLE_CALLBACK, d = A.ERR_STREAM_CANNOT_PIPE, O = A.ERR_STREAM_DESTROYED, h = A.ERR_STREAM_NULL_VALUES, g = A.ERR_STREAM_WRITE_AFTER_END, w = A.ERR_UNKNOWN_ENCODING, f = c.errorOrDestroy;
  Mt()(H, n);
  function T() {
  }
  function P(G, x, y) {
    e = e || ar(), G = G || {}, typeof y != "boolean" && (y = x instanceof e), this.objectMode = !!G.objectMode, y && (this.objectMode = this.objectMode || !!G.writableObjectMode), this.highWaterMark = S(this, G, "writableHighWaterMark", y), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var z = G.decodeStrings === !1;
    this.decodeStrings = !z, this.defaultEncoding = G.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(B) {
      Q(x, B);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = G.emitClose !== !1, this.autoDestroy = !!G.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new t(this);
  }
  P.prototype.getBuffer = function() {
    for (var x = this.bufferedRequest, y = []; x; )
      y.push(x), x = x.next;
    return y;
  }, function() {
    try {
      Object.defineProperty(P.prototype, "buffer", {
        get: r.deprecate(function() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch {
    }
  }();
  var L;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (L = Function.prototype[Symbol.hasInstance], Object.defineProperty(H, Symbol.hasInstance, {
    value: function(x) {
      return L.call(this, x) ? !0 : this !== H ? !1 : x && x._writableState instanceof P;
    }
  })) : L = function(x) {
    return x instanceof this;
  };
  function H(G) {
    e = e || ar();
    var x = this instanceof e;
    if (!x && !L.call(H, this)) return new H(G);
    this._writableState = new P(G, this, x), this.writable = !0, G && (typeof G.write == "function" && (this._write = G.write), typeof G.writev == "function" && (this._writev = G.writev), typeof G.destroy == "function" && (this._destroy = G.destroy), typeof G.final == "function" && (this._final = G.final)), n.call(this);
  }
  H.prototype.pipe = function() {
    f(this, new d());
  };
  function D(G, x) {
    var y = new g();
    f(G, y), _e.nextTick(x, y);
  }
  function Z(G, x, y, z) {
    var B;
    return y === null ? B = new h() : typeof y != "string" && !x.objectMode && (B = new R("chunk", ["string", "Buffer"], y)), B ? (f(G, B), _e.nextTick(z, B), !1) : !0;
  }
  H.prototype.write = function(G, x, y) {
    var z = this._writableState, B = !1, I = !z.objectMode && s(G);
    return I && !i.isBuffer(G) && (G = l(G)), typeof x == "function" && (y = x, x = null), I ? x = "buffer" : x || (x = z.defaultEncoding), typeof y != "function" && (y = T), z.ending ? D(this, y) : (I || Z(this, z, G, y)) && (z.pendingcb++, B = N(this, z, I, G, x, y)), B;
  }, H.prototype.cork = function() {
    this._writableState.corked++;
  }, H.prototype.uncork = function() {
    var G = this._writableState;
    G.corked && (G.corked--, !G.writing && !G.corked && !G.bufferProcessing && G.bufferedRequest && X(this, G));
  }, H.prototype.setDefaultEncoding = function(x) {
    if (typeof x == "string" && (x = x.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((x + "").toLowerCase()) > -1)) throw new w(x);
    return this._writableState.defaultEncoding = x, this;
  }, Object.defineProperty(H.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  function ce(G, x, y) {
    return !G.objectMode && G.decodeStrings !== !1 && typeof x == "string" && (x = i.from(x, y)), x;
  }
  Object.defineProperty(H.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function N(G, x, y, z, B, I) {
    if (!y) {
      var F = ce(x, z, B);
      z !== F && (y = !0, B = "buffer", z = F);
    }
    var ee = x.objectMode ? 1 : z.length;
    x.length += ee;
    var m = x.length < x.highWaterMark;
    if (m || (x.needDrain = !0), x.writing || x.corked) {
      var J = x.lastBufferedRequest;
      x.lastBufferedRequest = {
        chunk: z,
        encoding: B,
        isBuf: y,
        callback: I,
        next: null
      }, J ? J.next = x.lastBufferedRequest : x.bufferedRequest = x.lastBufferedRequest, x.bufferedRequestCount += 1;
    } else
      U(G, x, !1, ee, z, B, I);
    return m;
  }
  function U(G, x, y, z, B, I, F) {
    x.writelen = z, x.writecb = F, x.writing = !0, x.sync = !0, x.destroyed ? x.onwrite(new O("write")) : y ? G._writev(B, x.onwrite) : G._write(B, I, x.onwrite), x.sync = !1;
  }
  function v(G, x, y, z, B) {
    --x.pendingcb, y ? (_e.nextTick(B, z), _e.nextTick(K, G, x), G._writableState.errorEmitted = !0, f(G, z)) : (B(z), G._writableState.errorEmitted = !0, f(G, z), K(G, x));
  }
  function V(G) {
    G.writing = !1, G.writecb = null, G.length -= G.writelen, G.writelen = 0;
  }
  function Q(G, x) {
    var y = G._writableState, z = y.sync, B = y.writecb;
    if (typeof B != "function") throw new k();
    if (V(y), x) v(G, y, z, x, B);
    else {
      var I = oe(y) || G.destroyed;
      !I && !y.corked && !y.bufferProcessing && y.bufferedRequest && X(G, y), z ? _e.nextTick(j, G, y, I, B) : j(G, y, I, B);
    }
  }
  function j(G, x, y, z) {
    y || te(G, x), x.pendingcb--, z(), K(G, x);
  }
  function te(G, x) {
    x.length === 0 && x.needDrain && (x.needDrain = !1, G.emit("drain"));
  }
  function X(G, x) {
    x.bufferProcessing = !0;
    var y = x.bufferedRequest;
    if (G._writev && y && y.next) {
      var z = x.bufferedRequestCount, B = new Array(z), I = x.corkedRequestsFree;
      I.entry = y;
      for (var F = 0, ee = !0; y; )
        B[F] = y, y.isBuf || (ee = !1), y = y.next, F += 1;
      B.allBuffers = ee, U(G, x, !0, x.length, B, "", I.finish), x.pendingcb++, x.lastBufferedRequest = null, I.next ? (x.corkedRequestsFree = I.next, I.next = null) : x.corkedRequestsFree = new t(x), x.bufferedRequestCount = 0;
    } else {
      for (; y; ) {
        var m = y.chunk, J = y.encoding, E = y.callback, o = x.objectMode ? 1 : m.length;
        if (U(G, x, !1, o, m, J, E), y = y.next, x.bufferedRequestCount--, x.writing)
          break;
      }
      y === null && (x.lastBufferedRequest = null);
    }
    x.bufferedRequest = y, x.bufferProcessing = !1;
  }
  H.prototype._write = function(G, x, y) {
    y(new _("_write()"));
  }, H.prototype._writev = null, H.prototype.end = function(G, x, y) {
    var z = this._writableState;
    return typeof G == "function" ? (y = G, G = null, x = null) : typeof x == "function" && (y = x, x = null), G != null && this.write(G, x), z.corked && (z.corked = 1, this.uncork()), z.ending || $(this, z, y), this;
  }, Object.defineProperty(H.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function oe(G) {
    return G.ending && G.length === 0 && G.bufferedRequest === null && !G.finished && !G.writing;
  }
  function Y(G, x) {
    G._final(function(y) {
      x.pendingcb--, y && f(G, y), x.prefinished = !0, G.emit("prefinish"), K(G, x);
    });
  }
  function C(G, x) {
    !x.prefinished && !x.finalCalled && (typeof G._final == "function" && !x.destroyed ? (x.pendingcb++, x.finalCalled = !0, _e.nextTick(Y, G, x)) : (x.prefinished = !0, G.emit("prefinish")));
  }
  function K(G, x) {
    var y = oe(x);
    if (y && (C(G, x), x.pendingcb === 0 && (x.finished = !0, G.emit("finish"), x.autoDestroy))) {
      var z = G._readableState;
      (!z || z.autoDestroy && z.endEmitted) && G.destroy();
    }
    return y;
  }
  function $(G, x, y) {
    x.ending = !0, K(G, x), y && (x.finished ? _e.nextTick(y) : G.once("finish", y)), x.ended = !0, G.writable = !1;
  }
  function re(G, x, y) {
    var z = G.entry;
    for (G.entry = null; z; ) {
      var B = z.callback;
      x.pendingcb--, B(y), z = z.next;
    }
    x.corkedRequestsFree.next = G;
  }
  return Object.defineProperty(H.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(x) {
      this._writableState && (this._writableState.destroyed = x);
    }
  }), H.prototype.destroy = c.destroy, H.prototype._undestroy = c.undestroy, H.prototype._destroy = function(G, x) {
    x(G);
  }, Ei;
}
var Ti, io;
function ar() {
  if (io) return Ti;
  io = 1;
  var t = Object.keys || function(b) {
    var S = [];
    for (var A in b)
      S.push(A);
    return S;
  };
  Ti = l;
  var e = Tu(), r = Eu();
  Mt()(l, e);
  for (var n = t(r.prototype), i = 0; i < n.length; i++) {
    var a = n[i];
    l.prototype[a] || (l.prototype[a] = r.prototype[a]);
  }
  function l(b) {
    if (!(this instanceof l)) return new l(b);
    e.call(this, b), r.call(this, b), this.allowHalfOpen = !0, b && (b.readable === !1 && (this.readable = !1), b.writable === !1 && (this.writable = !1), b.allowHalfOpen === !1 && (this.allowHalfOpen = !1, this.once("end", s)));
  }
  Object.defineProperty(l.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  }), Object.defineProperty(l.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  }), Object.defineProperty(l.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function s() {
    this._writableState.ended || _e.nextTick(c, this);
  }
  function c(b) {
    b.end();
  }
  return Object.defineProperty(l.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(S) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = S, this._writableState.destroyed = S);
    }
  }), Ti;
}
var ki = {}, Vr = { exports: {} }, so;
function Nc() {
  return so || (so = 1, function(t, e) {
    var r = wn(), n = r.Buffer;
    function i(l, s) {
      for (var c in l)
        s[c] = l[c];
    }
    n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? t.exports = r : (i(r, e), e.Buffer = a);
    function a(l, s, c) {
      return n(l, s, c);
    }
    i(n, a), a.from = function(l, s, c) {
      if (typeof l == "number")
        throw new TypeError("Argument must not be a number");
      return n(l, s, c);
    }, a.alloc = function(l, s, c) {
      if (typeof l != "number")
        throw new TypeError("Argument must be a number");
      var b = n(l);
      return s !== void 0 ? typeof c == "string" ? b.fill(s, c) : b.fill(s) : b.fill(0), b;
    }, a.allocUnsafe = function(l) {
      if (typeof l != "number")
        throw new TypeError("Argument must be a number");
      return n(l);
    }, a.allocUnsafeSlow = function(l) {
      if (typeof l != "number")
        throw new TypeError("Argument must be a number");
      return r.SlowBuffer(l);
    };
  }(Vr, Vr.exports)), Vr.exports;
}
var ao;
function ps() {
  if (ao) return ki;
  ao = 1;
  var t = Nc().Buffer, e = t.isEncoding || function(h) {
    switch (h = "" + h, h && h.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return !0;
      default:
        return !1;
    }
  };
  function r(h) {
    if (!h) return "utf8";
    for (var g; ; )
      switch (h) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return h;
        default:
          if (g) return;
          h = ("" + h).toLowerCase(), g = !0;
      }
  }
  function n(h) {
    var g = r(h);
    if (typeof g != "string" && (t.isEncoding === e || !e(h))) throw new Error("Unknown encoding: " + h);
    return g || h;
  }
  ki.StringDecoder = i;
  function i(h) {
    this.encoding = n(h);
    var g;
    switch (this.encoding) {
      case "utf16le":
        this.text = A, this.end = R, g = 4;
        break;
      case "utf8":
        this.fillLast = c, g = 4;
        break;
      case "base64":
        this.text = _, this.end = k, g = 3;
        break;
      default:
        this.write = d, this.end = O;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = t.allocUnsafe(g);
  }
  i.prototype.write = function(h) {
    if (h.length === 0) return "";
    var g, w;
    if (this.lastNeed) {
      if (g = this.fillLast(h), g === void 0) return "";
      w = this.lastNeed, this.lastNeed = 0;
    } else
      w = 0;
    return w < h.length ? g ? g + this.text(h, w) : this.text(h, w) : g || "";
  }, i.prototype.end = S, i.prototype.text = b, i.prototype.fillLast = function(h) {
    if (this.lastNeed <= h.length)
      return h.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    h.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, h.length), this.lastNeed -= h.length;
  };
  function a(h) {
    return h <= 127 ? 0 : h >> 5 === 6 ? 2 : h >> 4 === 14 ? 3 : h >> 3 === 30 ? 4 : h >> 6 === 2 ? -1 : -2;
  }
  function l(h, g, w) {
    var f = g.length - 1;
    if (f < w) return 0;
    var T = a(g[f]);
    return T >= 0 ? (T > 0 && (h.lastNeed = T - 1), T) : --f < w || T === -2 ? 0 : (T = a(g[f]), T >= 0 ? (T > 0 && (h.lastNeed = T - 2), T) : --f < w || T === -2 ? 0 : (T = a(g[f]), T >= 0 ? (T > 0 && (T === 2 ? T = 0 : h.lastNeed = T - 3), T) : 0));
  }
  function s(h, g, w) {
    if ((g[0] & 192) !== 128)
      return h.lastNeed = 0, "�";
    if (h.lastNeed > 1 && g.length > 1) {
      if ((g[1] & 192) !== 128)
        return h.lastNeed = 1, "�";
      if (h.lastNeed > 2 && g.length > 2 && (g[2] & 192) !== 128)
        return h.lastNeed = 2, "�";
    }
  }
  function c(h) {
    var g = this.lastTotal - this.lastNeed, w = s(this, h);
    if (w !== void 0) return w;
    if (this.lastNeed <= h.length)
      return h.copy(this.lastChar, g, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    h.copy(this.lastChar, g, 0, h.length), this.lastNeed -= h.length;
  }
  function b(h, g) {
    var w = l(this, h, g);
    if (!this.lastNeed) return h.toString("utf8", g);
    this.lastTotal = w;
    var f = h.length - (w - this.lastNeed);
    return h.copy(this.lastChar, 0, f), h.toString("utf8", g, f);
  }
  function S(h) {
    var g = h && h.length ? this.write(h) : "";
    return this.lastNeed ? g + "�" : g;
  }
  function A(h, g) {
    if ((h.length - g) % 2 === 0) {
      var w = h.toString("utf16le", g);
      if (w) {
        var f = w.charCodeAt(w.length - 1);
        if (f >= 55296 && f <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = h[h.length - 2], this.lastChar[1] = h[h.length - 1], w.slice(0, -1);
      }
      return w;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = h[h.length - 1], h.toString("utf16le", g, h.length - 1);
  }
  function R(h) {
    var g = h && h.length ? this.write(h) : "";
    if (this.lastNeed) {
      var w = this.lastTotal - this.lastNeed;
      return g + this.lastChar.toString("utf16le", 0, w);
    }
    return g;
  }
  function _(h, g) {
    var w = (h.length - g) % 3;
    return w === 0 ? h.toString("base64", g) : (this.lastNeed = 3 - w, this.lastTotal = 3, w === 1 ? this.lastChar[0] = h[h.length - 1] : (this.lastChar[0] = h[h.length - 2], this.lastChar[1] = h[h.length - 1]), h.toString("base64", g, h.length - w));
  }
  function k(h) {
    var g = h && h.length ? this.write(h) : "";
    return this.lastNeed ? g + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : g;
  }
  function d(h) {
    return h.toString(this.encoding);
  }
  function O(h) {
    return h && h.length ? this.write(h) : "";
  }
  return ki;
}
var Ai, oo;
function Ds() {
  if (oo) return Ai;
  oo = 1;
  var t = hr().codes.ERR_STREAM_PREMATURE_CLOSE;
  function e(a) {
    var l = !1;
    return function() {
      if (!l) {
        l = !0;
        for (var s = arguments.length, c = new Array(s), b = 0; b < s; b++)
          c[b] = arguments[b];
        a.apply(this, c);
      }
    };
  }
  function r() {
  }
  function n(a) {
    return a.setHeader && typeof a.abort == "function";
  }
  function i(a, l, s) {
    if (typeof l == "function") return i(a, null, l);
    l || (l = {}), s = e(s || r);
    var c = l.readable || l.readable !== !1 && a.readable, b = l.writable || l.writable !== !1 && a.writable, S = function() {
      a.writable || R();
    }, A = a._writableState && a._writableState.finished, R = function() {
      b = !1, A = !0, c || s.call(a);
    }, _ = a._readableState && a._readableState.endEmitted, k = function() {
      c = !1, _ = !0, b || s.call(a);
    }, d = function(w) {
      s.call(a, w);
    }, O = function() {
      var w;
      if (c && !_)
        return (!a._readableState || !a._readableState.ended) && (w = new t()), s.call(a, w);
      if (b && !A)
        return (!a._writableState || !a._writableState.ended) && (w = new t()), s.call(a, w);
    }, h = function() {
      a.req.on("finish", R);
    };
    return n(a) ? (a.on("complete", R), a.on("abort", O), a.req ? h() : a.on("request", h)) : b && !a._writableState && (a.on("end", S), a.on("close", S)), a.on("end", k), a.on("finish", R), l.error !== !1 && a.on("error", d), a.on("close", O), function() {
      a.removeListener("complete", R), a.removeListener("abort", O), a.removeListener("request", h), a.req && a.req.removeListener("finish", R), a.removeListener("end", S), a.removeListener("close", S), a.removeListener("finish", R), a.removeListener("end", k), a.removeListener("error", d), a.removeListener("close", O);
    };
  }
  return Ai = i, Ai;
}
var Ri, uo;
function Cc() {
  if (uo) return Ri;
  uo = 1;
  var t;
  function e(h, g, w) {
    return g in h ? Object.defineProperty(h, g, { value: w, enumerable: !0, configurable: !0, writable: !0 }) : h[g] = w, h;
  }
  var r = Ds(), n = Symbol("lastResolve"), i = Symbol("lastReject"), a = Symbol("error"), l = Symbol("ended"), s = Symbol("lastPromise"), c = Symbol("handlePromise"), b = Symbol("stream");
  function S(h, g) {
    return {
      value: h,
      done: g
    };
  }
  function A(h) {
    var g = h[n];
    if (g !== null) {
      var w = h[b].read();
      w !== null && (h[s] = null, h[n] = null, h[i] = null, g(S(w, !1)));
    }
  }
  function R(h) {
    _e.nextTick(A, h);
  }
  function _(h, g) {
    return function(w, f) {
      h.then(function() {
        if (g[l]) {
          w(S(void 0, !0));
          return;
        }
        g[c](w, f);
      }, f);
    };
  }
  var k = Object.getPrototypeOf(function() {
  }), d = Object.setPrototypeOf((t = {
    get stream() {
      return this[b];
    },
    next: function() {
      var g = this, w = this[a];
      if (w !== null)
        return Promise.reject(w);
      if (this[l])
        return Promise.resolve(S(void 0, !0));
      if (this[b].destroyed)
        return new Promise(function(L, H) {
          _e.nextTick(function() {
            g[a] ? H(g[a]) : L(S(void 0, !0));
          });
        });
      var f = this[s], T;
      if (f)
        T = new Promise(_(f, this));
      else {
        var P = this[b].read();
        if (P !== null)
          return Promise.resolve(S(P, !1));
        T = new Promise(this[c]);
      }
      return this[s] = T, T;
    }
  }, e(t, Symbol.asyncIterator, function() {
    return this;
  }), e(t, "return", function() {
    var g = this;
    return new Promise(function(w, f) {
      g[b].destroy(null, function(T) {
        if (T) {
          f(T);
          return;
        }
        w(S(void 0, !0));
      });
    });
  }), t), k), O = function(g) {
    var w, f = Object.create(d, (w = {}, e(w, b, {
      value: g,
      writable: !0
    }), e(w, n, {
      value: null,
      writable: !0
    }), e(w, i, {
      value: null,
      writable: !0
    }), e(w, a, {
      value: null,
      writable: !0
    }), e(w, l, {
      value: g._readableState.endEmitted,
      writable: !0
    }), e(w, c, {
      value: function(P, L) {
        var H = f[b].read();
        H ? (f[s] = null, f[n] = null, f[i] = null, P(S(H, !1))) : (f[n] = P, f[i] = L);
      },
      writable: !0
    }), w));
    return f[s] = null, r(g, function(T) {
      if (T && T.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        var P = f[i];
        P !== null && (f[s] = null, f[n] = null, f[i] = null, P(T)), f[a] = T;
        return;
      }
      var L = f[n];
      L !== null && (f[s] = null, f[n] = null, f[i] = null, L(S(void 0, !0))), f[l] = !0;
    }), g.on("readable", R.bind(null, f)), f;
  };
  return Ri = O, Ri;
}
var Oi, lo;
function Ic() {
  return lo || (lo = 1, Oi = function() {
    throw new Error("Readable.from is not available in the browser");
  }), Oi;
}
var Di, co;
function Tu() {
  if (co) return Di;
  co = 1, Di = D;
  var t;
  D.ReadableState = H, Ts().EventEmitter;
  var e = function(F, ee) {
    return F.listeners(ee).length;
  }, r = mu(), n = wn().Buffer, i = ut.Uint8Array || function() {
  };
  function a(I) {
    return n.from(I);
  }
  function l(I) {
    return n.isBuffer(I) || I instanceof i;
  }
  var s = bu(), c;
  s && s.debuglog ? c = s.debuglog("stream") : c = function() {
  };
  var b = Oc(), S = xu(), A = Su(), R = A.getHighWaterMark, _ = hr().codes, k = _.ERR_INVALID_ARG_TYPE, d = _.ERR_STREAM_PUSH_AFTER_EOF, O = _.ERR_METHOD_NOT_IMPLEMENTED, h = _.ERR_STREAM_UNSHIFT_AFTER_END_EVENT, g, w, f;
  Mt()(D, r);
  var T = S.errorOrDestroy, P = ["error", "close", "destroy", "pause", "resume"];
  function L(I, F, ee) {
    if (typeof I.prependListener == "function") return I.prependListener(F, ee);
    !I._events || !I._events[F] ? I.on(F, ee) : Array.isArray(I._events[F]) ? I._events[F].unshift(ee) : I._events[F] = [ee, I._events[F]];
  }
  function H(I, F, ee) {
    t = t || ar(), I = I || {}, typeof ee != "boolean" && (ee = F instanceof t), this.objectMode = !!I.objectMode, ee && (this.objectMode = this.objectMode || !!I.readableObjectMode), this.highWaterMark = R(this, I, "readableHighWaterMark", ee), this.buffer = new b(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = I.emitClose !== !1, this.autoDestroy = !!I.autoDestroy, this.destroyed = !1, this.defaultEncoding = I.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, I.encoding && (g || (g = ps().StringDecoder), this.decoder = new g(I.encoding), this.encoding = I.encoding);
  }
  function D(I) {
    if (t = t || ar(), !(this instanceof D)) return new D(I);
    var F = this instanceof t;
    this._readableState = new H(I, this, F), this.readable = !0, I && (typeof I.read == "function" && (this._read = I.read), typeof I.destroy == "function" && (this._destroy = I.destroy)), r.call(this);
  }
  Object.defineProperty(D.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(F) {
      this._readableState && (this._readableState.destroyed = F);
    }
  }), D.prototype.destroy = S.destroy, D.prototype._undestroy = S.undestroy, D.prototype._destroy = function(I, F) {
    F(I);
  }, D.prototype.push = function(I, F) {
    var ee = this._readableState, m;
    return ee.objectMode ? m = !0 : typeof I == "string" && (F = F || ee.defaultEncoding, F !== ee.encoding && (I = n.from(I, F), F = ""), m = !0), Z(this, I, F, !1, m);
  }, D.prototype.unshift = function(I) {
    return Z(this, I, null, !0, !1);
  };
  function Z(I, F, ee, m, J) {
    c("readableAddChunk", F);
    var E = I._readableState;
    if (F === null)
      E.reading = !1, Q(I, E);
    else {
      var o;
      if (J || (o = N(E, F)), o)
        T(I, o);
      else if (E.objectMode || F && F.length > 0)
        if (typeof F != "string" && !E.objectMode && Object.getPrototypeOf(F) !== n.prototype && (F = a(F)), m)
          E.endEmitted ? T(I, new h()) : ce(I, E, F, !0);
        else if (E.ended)
          T(I, new d());
        else {
          if (E.destroyed)
            return !1;
          E.reading = !1, E.decoder && !ee ? (F = E.decoder.write(F), E.objectMode || F.length !== 0 ? ce(I, E, F, !1) : X(I, E)) : ce(I, E, F, !1);
        }
      else m || (E.reading = !1, X(I, E));
    }
    return !E.ended && (E.length < E.highWaterMark || E.length === 0);
  }
  function ce(I, F, ee, m) {
    F.flowing && F.length === 0 && !F.sync ? (F.awaitDrain = 0, I.emit("data", ee)) : (F.length += F.objectMode ? 1 : ee.length, m ? F.buffer.unshift(ee) : F.buffer.push(ee), F.needReadable && j(I)), X(I, F);
  }
  function N(I, F) {
    var ee;
    return !l(F) && typeof F != "string" && F !== void 0 && !I.objectMode && (ee = new k("chunk", ["string", "Buffer", "Uint8Array"], F)), ee;
  }
  D.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, D.prototype.setEncoding = function(I) {
    g || (g = ps().StringDecoder);
    var F = new g(I);
    this._readableState.decoder = F, this._readableState.encoding = this._readableState.decoder.encoding;
    for (var ee = this._readableState.buffer.head, m = ""; ee !== null; )
      m += F.write(ee.data), ee = ee.next;
    return this._readableState.buffer.clear(), m !== "" && this._readableState.buffer.push(m), this._readableState.length = m.length, this;
  };
  var U = 1073741824;
  function v(I) {
    return I >= U ? I = U : (I--, I |= I >>> 1, I |= I >>> 2, I |= I >>> 4, I |= I >>> 8, I |= I >>> 16, I++), I;
  }
  function V(I, F) {
    return I <= 0 || F.length === 0 && F.ended ? 0 : F.objectMode ? 1 : I !== I ? F.flowing && F.length ? F.buffer.head.data.length : F.length : (I > F.highWaterMark && (F.highWaterMark = v(I)), I <= F.length ? I : F.ended ? F.length : (F.needReadable = !0, 0));
  }
  D.prototype.read = function(I) {
    c("read", I), I = parseInt(I, 10);
    var F = this._readableState, ee = I;
    if (I !== 0 && (F.emittedReadable = !1), I === 0 && F.needReadable && ((F.highWaterMark !== 0 ? F.length >= F.highWaterMark : F.length > 0) || F.ended))
      return c("read: emitReadable", F.length, F.ended), F.length === 0 && F.ended ? y(this) : j(this), null;
    if (I = V(I, F), I === 0 && F.ended)
      return F.length === 0 && y(this), null;
    var m = F.needReadable;
    c("need readable", m), (F.length === 0 || F.length - I < F.highWaterMark) && (m = !0, c("length less than watermark", m)), F.ended || F.reading ? (m = !1, c("reading or ended", m)) : m && (c("do read"), F.reading = !0, F.sync = !0, F.length === 0 && (F.needReadable = !0), this._read(F.highWaterMark), F.sync = !1, F.reading || (I = V(ee, F)));
    var J;
    return I > 0 ? J = x(I, F) : J = null, J === null ? (F.needReadable = F.length <= F.highWaterMark, I = 0) : (F.length -= I, F.awaitDrain = 0), F.length === 0 && (F.ended || (F.needReadable = !0), ee !== I && F.ended && y(this)), J !== null && this.emit("data", J), J;
  };
  function Q(I, F) {
    if (c("onEofChunk"), !F.ended) {
      if (F.decoder) {
        var ee = F.decoder.end();
        ee && ee.length && (F.buffer.push(ee), F.length += F.objectMode ? 1 : ee.length);
      }
      F.ended = !0, F.sync ? j(I) : (F.needReadable = !1, F.emittedReadable || (F.emittedReadable = !0, te(I)));
    }
  }
  function j(I) {
    var F = I._readableState;
    c("emitReadable", F.needReadable, F.emittedReadable), F.needReadable = !1, F.emittedReadable || (c("emitReadable", F.flowing), F.emittedReadable = !0, _e.nextTick(te, I));
  }
  function te(I) {
    var F = I._readableState;
    c("emitReadable_", F.destroyed, F.length, F.ended), !F.destroyed && (F.length || F.ended) && (I.emit("readable"), F.emittedReadable = !1), F.needReadable = !F.flowing && !F.ended && F.length <= F.highWaterMark, G(I);
  }
  function X(I, F) {
    F.readingMore || (F.readingMore = !0, _e.nextTick(oe, I, F));
  }
  function oe(I, F) {
    for (; !F.reading && !F.ended && (F.length < F.highWaterMark || F.flowing && F.length === 0); ) {
      var ee = F.length;
      if (c("maybeReadMore read 0"), I.read(0), ee === F.length)
        break;
    }
    F.readingMore = !1;
  }
  D.prototype._read = function(I) {
    T(this, new O("_read()"));
  }, D.prototype.pipe = function(I, F) {
    var ee = this, m = this._readableState;
    switch (m.pipesCount) {
      case 0:
        m.pipes = I;
        break;
      case 1:
        m.pipes = [m.pipes, I];
        break;
      default:
        m.pipes.push(I);
        break;
    }
    m.pipesCount += 1, c("pipe count=%d opts=%j", m.pipesCount, F);
    var J = (!F || F.end !== !1) && I !== _e.stdout && I !== _e.stderr, E = J ? u : fe;
    m.endEmitted ? _e.nextTick(E) : ee.once("end", E), I.on("unpipe", o);
    function o(me, ge) {
      c("onunpipe"), me === ee && ge && ge.hasUnpiped === !1 && (ge.hasUnpiped = !0, q());
    }
    function u() {
      c("onend"), I.end();
    }
    var p = Y(ee);
    I.on("drain", p);
    var M = !1;
    function q() {
      c("cleanup"), I.removeListener("close", le), I.removeListener("finish", se), I.removeListener("drain", p), I.removeListener("error", ne), I.removeListener("unpipe", o), ee.removeListener("end", u), ee.removeListener("end", fe), ee.removeListener("data", W), M = !0, m.awaitDrain && (!I._writableState || I._writableState.needDrain) && p();
    }
    ee.on("data", W);
    function W(me) {
      c("ondata");
      var ge = I.write(me);
      c("dest.write", ge), ge === !1 && ((m.pipesCount === 1 && m.pipes === I || m.pipesCount > 1 && B(m.pipes, I) !== -1) && !M && (c("false write response, pause", m.awaitDrain), m.awaitDrain++), ee.pause());
    }
    function ne(me) {
      c("onerror", me), fe(), I.removeListener("error", ne), e(I, "error") === 0 && T(I, me);
    }
    L(I, "error", ne);
    function le() {
      I.removeListener("finish", se), fe();
    }
    I.once("close", le);
    function se() {
      c("onfinish"), I.removeListener("close", le), fe();
    }
    I.once("finish", se);
    function fe() {
      c("unpipe"), ee.unpipe(I);
    }
    return I.emit("pipe", ee), m.flowing || (c("pipe resume"), ee.resume()), I;
  };
  function Y(I) {
    return function() {
      var ee = I._readableState;
      c("pipeOnDrain", ee.awaitDrain), ee.awaitDrain && ee.awaitDrain--, ee.awaitDrain === 0 && e(I, "data") && (ee.flowing = !0, G(I));
    };
  }
  D.prototype.unpipe = function(I) {
    var F = this._readableState, ee = {
      hasUnpiped: !1
    };
    if (F.pipesCount === 0) return this;
    if (F.pipesCount === 1)
      return I && I !== F.pipes ? this : (I || (I = F.pipes), F.pipes = null, F.pipesCount = 0, F.flowing = !1, I && I.emit("unpipe", this, ee), this);
    if (!I) {
      var m = F.pipes, J = F.pipesCount;
      F.pipes = null, F.pipesCount = 0, F.flowing = !1;
      for (var E = 0; E < J; E++)
        m[E].emit("unpipe", this, {
          hasUnpiped: !1
        });
      return this;
    }
    var o = B(F.pipes, I);
    return o === -1 ? this : (F.pipes.splice(o, 1), F.pipesCount -= 1, F.pipesCount === 1 && (F.pipes = F.pipes[0]), I.emit("unpipe", this, ee), this);
  }, D.prototype.on = function(I, F) {
    var ee = r.prototype.on.call(this, I, F), m = this._readableState;
    return I === "data" ? (m.readableListening = this.listenerCount("readable") > 0, m.flowing !== !1 && this.resume()) : I === "readable" && !m.endEmitted && !m.readableListening && (m.readableListening = m.needReadable = !0, m.flowing = !1, m.emittedReadable = !1, c("on readable", m.length, m.reading), m.length ? j(this) : m.reading || _e.nextTick(K, this)), ee;
  }, D.prototype.addListener = D.prototype.on, D.prototype.removeListener = function(I, F) {
    var ee = r.prototype.removeListener.call(this, I, F);
    return I === "readable" && _e.nextTick(C, this), ee;
  }, D.prototype.removeAllListeners = function(I) {
    var F = r.prototype.removeAllListeners.apply(this, arguments);
    return (I === "readable" || I === void 0) && _e.nextTick(C, this), F;
  };
  function C(I) {
    var F = I._readableState;
    F.readableListening = I.listenerCount("readable") > 0, F.resumeScheduled && !F.paused ? F.flowing = !0 : I.listenerCount("data") > 0 && I.resume();
  }
  function K(I) {
    c("readable nexttick read 0"), I.read(0);
  }
  D.prototype.resume = function() {
    var I = this._readableState;
    return I.flowing || (c("resume"), I.flowing = !I.readableListening, $(this, I)), I.paused = !1, this;
  };
  function $(I, F) {
    F.resumeScheduled || (F.resumeScheduled = !0, _e.nextTick(re, I, F));
  }
  function re(I, F) {
    c("resume", F.reading), F.reading || I.read(0), F.resumeScheduled = !1, I.emit("resume"), G(I), F.flowing && !F.reading && I.read(0);
  }
  D.prototype.pause = function() {
    return c("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (c("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState.paused = !0, this;
  };
  function G(I) {
    var F = I._readableState;
    for (c("flow", F.flowing); F.flowing && I.read() !== null; )
      ;
  }
  D.prototype.wrap = function(I) {
    var F = this, ee = this._readableState, m = !1;
    I.on("end", function() {
      if (c("wrapped end"), ee.decoder && !ee.ended) {
        var o = ee.decoder.end();
        o && o.length && F.push(o);
      }
      F.push(null);
    }), I.on("data", function(o) {
      if (c("wrapped data"), ee.decoder && (o = ee.decoder.write(o)), !(ee.objectMode && o == null) && !(!ee.objectMode && (!o || !o.length))) {
        var u = F.push(o);
        u || (m = !0, I.pause());
      }
    });
    for (var J in I)
      this[J] === void 0 && typeof I[J] == "function" && (this[J] = /* @__PURE__ */ function(u) {
        return function() {
          return I[u].apply(I, arguments);
        };
      }(J));
    for (var E = 0; E < P.length; E++)
      I.on(P[E], this.emit.bind(this, P[E]));
    return this._read = function(o) {
      c("wrapped _read", o), m && (m = !1, I.resume());
    }, this;
  }, typeof Symbol == "function" && (D.prototype[Symbol.asyncIterator] = function() {
    return w === void 0 && (w = Cc()), w(this);
  }), Object.defineProperty(D.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), Object.defineProperty(D.prototype, "readableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState && this._readableState.buffer;
    }
  }), Object.defineProperty(D.prototype, "readableFlowing", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.flowing;
    },
    set: function(F) {
      this._readableState && (this._readableState.flowing = F);
    }
  }), D._fromList = x, Object.defineProperty(D.prototype, "readableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.length;
    }
  });
  function x(I, F) {
    if (F.length === 0) return null;
    var ee;
    return F.objectMode ? ee = F.buffer.shift() : !I || I >= F.length ? (F.decoder ? ee = F.buffer.join("") : F.buffer.length === 1 ? ee = F.buffer.first() : ee = F.buffer.concat(F.length), F.buffer.clear()) : ee = F.buffer.consume(I, F.decoder), ee;
  }
  function y(I) {
    var F = I._readableState;
    c("endReadable", F.endEmitted), F.endEmitted || (F.ended = !0, _e.nextTick(z, F, I));
  }
  function z(I, F) {
    if (c("endReadableNT", I.endEmitted, I.length), !I.endEmitted && I.length === 0 && (I.endEmitted = !0, F.readable = !1, F.emit("end"), I.autoDestroy)) {
      var ee = F._writableState;
      (!ee || ee.autoDestroy && ee.finished) && F.destroy();
    }
  }
  typeof Symbol == "function" && (D.from = function(I, F) {
    return f === void 0 && (f = Ic()), f(D, I, F);
  });
  function B(I, F) {
    for (var ee = 0, m = I.length; ee < m; ee++)
      if (I[ee] === F) return ee;
    return -1;
  }
  return Di;
}
var Ni, ho;
function ku() {
  if (ho) return Ni;
  ho = 1, Ni = s;
  var t = hr().codes, e = t.ERR_METHOD_NOT_IMPLEMENTED, r = t.ERR_MULTIPLE_CALLBACK, n = t.ERR_TRANSFORM_ALREADY_TRANSFORMING, i = t.ERR_TRANSFORM_WITH_LENGTH_0, a = ar();
  Mt()(s, a);
  function l(S, A) {
    var R = this._transformState;
    R.transforming = !1;
    var _ = R.writecb;
    if (_ === null)
      return this.emit("error", new r());
    R.writechunk = null, R.writecb = null, A != null && this.push(A), _(S);
    var k = this._readableState;
    k.reading = !1, (k.needReadable || k.length < k.highWaterMark) && this._read(k.highWaterMark);
  }
  function s(S) {
    if (!(this instanceof s)) return new s(S);
    a.call(this, S), this._transformState = {
      afterTransform: l.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null
    }, this._readableState.needReadable = !0, this._readableState.sync = !1, S && (typeof S.transform == "function" && (this._transform = S.transform), typeof S.flush == "function" && (this._flush = S.flush)), this.on("prefinish", c);
  }
  function c() {
    var S = this;
    typeof this._flush == "function" && !this._readableState.destroyed ? this._flush(function(A, R) {
      b(S, A, R);
    }) : b(this, null, null);
  }
  s.prototype.push = function(S, A) {
    return this._transformState.needTransform = !1, a.prototype.push.call(this, S, A);
  }, s.prototype._transform = function(S, A, R) {
    R(new e("_transform()"));
  }, s.prototype._write = function(S, A, R) {
    var _ = this._transformState;
    if (_.writecb = R, _.writechunk = S, _.writeencoding = A, !_.transforming) {
      var k = this._readableState;
      (_.needTransform || k.needReadable || k.length < k.highWaterMark) && this._read(k.highWaterMark);
    }
  }, s.prototype._read = function(S) {
    var A = this._transformState;
    A.writechunk !== null && !A.transforming ? (A.transforming = !0, this._transform(A.writechunk, A.writeencoding, A.afterTransform)) : A.needTransform = !0;
  }, s.prototype._destroy = function(S, A) {
    a.prototype._destroy.call(this, S, function(R) {
      A(R);
    });
  };
  function b(S, A, R) {
    if (A) return S.emit("error", A);
    if (R != null && S.push(R), S._writableState.length) throw new i();
    if (S._transformState.transforming) throw new n();
    return S.push(null);
  }
  return Ni;
}
var Ci, fo;
function Fc() {
  if (fo) return Ci;
  fo = 1, Ci = e;
  var t = ku();
  Mt()(e, t);
  function e(r) {
    if (!(this instanceof e)) return new e(r);
    t.call(this, r);
  }
  return e.prototype._transform = function(r, n, i) {
    i(null, r);
  }, Ci;
}
var Ii, po;
function Pc() {
  if (po) return Ii;
  po = 1;
  var t;
  function e(R) {
    var _ = !1;
    return function() {
      _ || (_ = !0, R.apply(void 0, arguments));
    };
  }
  var r = hr().codes, n = r.ERR_MISSING_ARGS, i = r.ERR_STREAM_DESTROYED;
  function a(R) {
    if (R) throw R;
  }
  function l(R) {
    return R.setHeader && typeof R.abort == "function";
  }
  function s(R, _, k, d) {
    d = e(d);
    var O = !1;
    R.on("close", function() {
      O = !0;
    }), t === void 0 && (t = Ds()), t(R, {
      readable: _,
      writable: k
    }, function(g) {
      if (g) return d(g);
      O = !0, d();
    });
    var h = !1;
    return function(g) {
      if (!O && !h) {
        if (h = !0, l(R)) return R.abort();
        if (typeof R.destroy == "function") return R.destroy();
        d(g || new i("pipe"));
      }
    };
  }
  function c(R) {
    R();
  }
  function b(R, _) {
    return R.pipe(_);
  }
  function S(R) {
    return !R.length || typeof R[R.length - 1] != "function" ? a : R.pop();
  }
  function A() {
    for (var R = arguments.length, _ = new Array(R), k = 0; k < R; k++)
      _[k] = arguments[k];
    var d = S(_);
    if (Array.isArray(_[0]) && (_ = _[0]), _.length < 2)
      throw new n("streams");
    var O, h = _.map(function(g, w) {
      var f = w < _.length - 1, T = w > 0;
      return s(g, f, T, function(P) {
        O || (O = P), P && h.forEach(c), !f && (h.forEach(c), d(O));
      });
    });
    return _.reduce(b);
  }
  return Ii = A, Ii;
}
var Fi, mo;
function Ns() {
  if (mo) return Fi;
  mo = 1, Fi = r;
  var t = Ts().EventEmitter, e = Mt();
  e(r, t), r.Readable = Tu(), r.Writable = Eu(), r.Duplex = ar(), r.Transform = ku(), r.PassThrough = Fc(), r.finished = Ds(), r.pipeline = Pc(), r.Stream = r;
  function r() {
    t.call(this);
  }
  return r.prototype.pipe = function(n, i) {
    var a = this;
    function l(_) {
      n.writable && n.write(_) === !1 && a.pause && a.pause();
    }
    a.on("data", l);
    function s() {
      a.readable && a.resume && a.resume();
    }
    n.on("drain", s), !n._isStdio && (!i || i.end !== !1) && (a.on("end", b), a.on("close", S));
    var c = !1;
    function b() {
      c || (c = !0, n.end());
    }
    function S() {
      c || (c = !0, typeof n.destroy == "function" && n.destroy());
    }
    function A(_) {
      if (R(), t.listenerCount(this, "error") === 0)
        throw _;
    }
    a.on("error", A), n.on("error", A);
    function R() {
      a.removeListener("data", l), n.removeListener("drain", s), a.removeListener("end", b), a.removeListener("close", S), a.removeListener("error", A), n.removeListener("error", A), a.removeListener("end", R), a.removeListener("close", R), n.removeListener("close", R);
    }
    return a.on("end", R), a.on("close", R), n.on("close", R), n.emit("pipe", a), n;
  }, Fi;
}
var wo;
function Mc() {
  return wo || (wo = 1, function(t) {
    (function(e) {
      e.parser = function(x, y) {
        return new n(x, y);
      }, e.SAXParser = n, e.SAXStream = S, e.createStream = b, e.MAX_BUFFER_LENGTH = 64 * 1024;
      var r = [
        "comment",
        "sgmlDecl",
        "textNode",
        "tagName",
        "doctype",
        "procInstName",
        "procInstBody",
        "entity",
        "attribName",
        "attribValue",
        "cdata",
        "script"
      ];
      e.EVENTS = [
        "text",
        "processinginstruction",
        "sgmldeclaration",
        "doctype",
        "comment",
        "opentagstart",
        "attribute",
        "opentag",
        "closetag",
        "opencdata",
        "cdata",
        "closecdata",
        "error",
        "end",
        "ready",
        "script",
        "opennamespace",
        "closenamespace"
      ];
      function n(x, y) {
        if (!(this instanceof n))
          return new n(x, y);
        var z = this;
        a(z), z.q = z.c = "", z.bufferCheckPosition = e.MAX_BUFFER_LENGTH, z.opt = y || {}, z.opt.lowercase = z.opt.lowercase || z.opt.lowercasetags, z.looseCase = z.opt.lowercase ? "toLowerCase" : "toUpperCase", z.tags = [], z.closed = z.closedRoot = z.sawRoot = !1, z.tag = z.error = null, z.strict = !!x, z.noscript = !!(x || z.opt.noscript), z.state = D.BEGIN, z.strictEntities = z.opt.strictEntities, z.ENTITIES = z.strictEntities ? Object.create(e.XML_ENTITIES) : Object.create(e.ENTITIES), z.attribList = [], z.opt.xmlns && (z.ns = Object.create(d)), z.trackPosition = z.opt.position !== !1, z.trackPosition && (z.position = z.line = z.column = 0), ce(z, "onready");
      }
      Object.create || (Object.create = function(x) {
        function y() {
        }
        y.prototype = x;
        var z = new y();
        return z;
      }), Object.keys || (Object.keys = function(x) {
        var y = [];
        for (var z in x) x.hasOwnProperty(z) && y.push(z);
        return y;
      });
      function i(x) {
        for (var y = Math.max(e.MAX_BUFFER_LENGTH, 10), z = 0, B = 0, I = r.length; B < I; B++) {
          var F = x[r[B]].length;
          if (F > y)
            switch (r[B]) {
              case "textNode":
                U(x);
                break;
              case "cdata":
                N(x, "oncdata", x.cdata), x.cdata = "";
                break;
              case "script":
                N(x, "onscript", x.script), x.script = "";
                break;
              default:
                V(x, "Max buffer length exceeded: " + r[B]);
            }
          z = Math.max(z, F);
        }
        var ee = e.MAX_BUFFER_LENGTH - z;
        x.bufferCheckPosition = ee + x.position;
      }
      function a(x) {
        for (var y = 0, z = r.length; y < z; y++)
          x[r[y]] = "";
      }
      function l(x) {
        U(x), x.cdata !== "" && (N(x, "oncdata", x.cdata), x.cdata = ""), x.script !== "" && (N(x, "onscript", x.script), x.script = "");
      }
      n.prototype = {
        end: function() {
          Q(this);
        },
        write: G,
        resume: function() {
          return this.error = null, this;
        },
        close: function() {
          return this.write(null);
        },
        flush: function() {
          l(this);
        }
      };
      var s;
      try {
        s = Ns().Stream;
      } catch {
        s = function() {
        };
      }
      var c = e.EVENTS.filter(function(x) {
        return x !== "error" && x !== "end";
      });
      function b(x, y) {
        return new S(x, y);
      }
      function S(x, y) {
        if (!(this instanceof S))
          return new S(x, y);
        s.apply(this), this._parser = new n(x, y), this.writable = !0, this.readable = !0;
        var z = this;
        this._parser.onend = function() {
          z.emit("end");
        }, this._parser.onerror = function(B) {
          z.emit("error", B), z._parser.error = null;
        }, this._decoder = null, c.forEach(function(B) {
          Object.defineProperty(z, "on" + B, {
            get: function() {
              return z._parser["on" + B];
            },
            set: function(I) {
              if (!I)
                return z.removeAllListeners(B), z._parser["on" + B] = I, I;
              z.on(B, I);
            },
            enumerable: !0,
            configurable: !1
          });
        });
      }
      S.prototype = Object.create(s.prototype, {
        constructor: {
          value: S
        }
      }), S.prototype.write = function(x) {
        if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(x)) {
          if (!this._decoder) {
            var y = ps().StringDecoder;
            this._decoder = new y("utf8");
          }
          x = this._decoder.write(x);
        }
        return this._parser.write(x.toString()), this.emit("data", x), !0;
      }, S.prototype.end = function(x) {
        return x && x.length && this.write(x), this._parser.end(), !0;
      }, S.prototype.on = function(x, y) {
        var z = this;
        return !z._parser["on" + x] && c.indexOf(x) !== -1 && (z._parser["on" + x] = function() {
          var B = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
          B.splice(0, 0, x), z.emit.apply(z, B);
        }), s.prototype.on.call(z, x, y);
      };
      var A = "[CDATA[", R = "DOCTYPE", _ = "http://www.w3.org/XML/1998/namespace", k = "http://www.w3.org/2000/xmlns/", d = { xml: _, xmlns: k }, O = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, h = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, g = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, w = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function f(x) {
        return x === " " || x === `
` || x === "\r" || x === "	";
      }
      function T(x) {
        return x === '"' || x === "'";
      }
      function P(x) {
        return x === ">" || f(x);
      }
      function L(x, y) {
        return x.test(y);
      }
      function H(x, y) {
        return !L(x, y);
      }
      var D = 0;
      e.STATE = {
        BEGIN: D++,
        // leading byte order mark or whitespace
        BEGIN_WHITESPACE: D++,
        // leading whitespace
        TEXT: D++,
        // general stuff
        TEXT_ENTITY: D++,
        // &amp and such.
        OPEN_WAKA: D++,
        // <
        SGML_DECL: D++,
        // <!BLARG
        SGML_DECL_QUOTED: D++,
        // <!BLARG foo "bar
        DOCTYPE: D++,
        // <!DOCTYPE
        DOCTYPE_QUOTED: D++,
        // <!DOCTYPE "//blah
        DOCTYPE_DTD: D++,
        // <!DOCTYPE "//blah" [ ...
        DOCTYPE_DTD_QUOTED: D++,
        // <!DOCTYPE "//blah" [ "foo
        COMMENT_STARTING: D++,
        // <!-
        COMMENT: D++,
        // <!--
        COMMENT_ENDING: D++,
        // <!-- blah -
        COMMENT_ENDED: D++,
        // <!-- blah --
        CDATA: D++,
        // <![CDATA[ something
        CDATA_ENDING: D++,
        // ]
        CDATA_ENDING_2: D++,
        // ]]
        PROC_INST: D++,
        // <?hi
        PROC_INST_BODY: D++,
        // <?hi there
        PROC_INST_ENDING: D++,
        // <?hi "there" ?
        OPEN_TAG: D++,
        // <strong
        OPEN_TAG_SLASH: D++,
        // <strong /
        ATTRIB: D++,
        // <a
        ATTRIB_NAME: D++,
        // <a foo
        ATTRIB_NAME_SAW_WHITE: D++,
        // <a foo _
        ATTRIB_VALUE: D++,
        // <a foo=
        ATTRIB_VALUE_QUOTED: D++,
        // <a foo="bar
        ATTRIB_VALUE_CLOSED: D++,
        // <a foo="bar"
        ATTRIB_VALUE_UNQUOTED: D++,
        // <a foo=bar
        ATTRIB_VALUE_ENTITY_Q: D++,
        // <foo bar="&quot;"
        ATTRIB_VALUE_ENTITY_U: D++,
        // <foo bar=&quot
        CLOSE_TAG: D++,
        // </a
        CLOSE_TAG_SAW_WHITE: D++,
        // </a   >
        SCRIPT: D++,
        // <script> ...
        SCRIPT_ENDING: D++
        // <script> ... <
      }, e.XML_ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'"
      }, e.ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'",
        AElig: 198,
        Aacute: 193,
        Acirc: 194,
        Agrave: 192,
        Aring: 197,
        Atilde: 195,
        Auml: 196,
        Ccedil: 199,
        ETH: 208,
        Eacute: 201,
        Ecirc: 202,
        Egrave: 200,
        Euml: 203,
        Iacute: 205,
        Icirc: 206,
        Igrave: 204,
        Iuml: 207,
        Ntilde: 209,
        Oacute: 211,
        Ocirc: 212,
        Ograve: 210,
        Oslash: 216,
        Otilde: 213,
        Ouml: 214,
        THORN: 222,
        Uacute: 218,
        Ucirc: 219,
        Ugrave: 217,
        Uuml: 220,
        Yacute: 221,
        aacute: 225,
        acirc: 226,
        aelig: 230,
        agrave: 224,
        aring: 229,
        atilde: 227,
        auml: 228,
        ccedil: 231,
        eacute: 233,
        ecirc: 234,
        egrave: 232,
        eth: 240,
        euml: 235,
        iacute: 237,
        icirc: 238,
        igrave: 236,
        iuml: 239,
        ntilde: 241,
        oacute: 243,
        ocirc: 244,
        ograve: 242,
        oslash: 248,
        otilde: 245,
        ouml: 246,
        szlig: 223,
        thorn: 254,
        uacute: 250,
        ucirc: 251,
        ugrave: 249,
        uuml: 252,
        yacute: 253,
        yuml: 255,
        copy: 169,
        reg: 174,
        nbsp: 160,
        iexcl: 161,
        cent: 162,
        pound: 163,
        curren: 164,
        yen: 165,
        brvbar: 166,
        sect: 167,
        uml: 168,
        ordf: 170,
        laquo: 171,
        not: 172,
        shy: 173,
        macr: 175,
        deg: 176,
        plusmn: 177,
        sup1: 185,
        sup2: 178,
        sup3: 179,
        acute: 180,
        micro: 181,
        para: 182,
        middot: 183,
        cedil: 184,
        ordm: 186,
        raquo: 187,
        frac14: 188,
        frac12: 189,
        frac34: 190,
        iquest: 191,
        times: 215,
        divide: 247,
        OElig: 338,
        oelig: 339,
        Scaron: 352,
        scaron: 353,
        Yuml: 376,
        fnof: 402,
        circ: 710,
        tilde: 732,
        Alpha: 913,
        Beta: 914,
        Gamma: 915,
        Delta: 916,
        Epsilon: 917,
        Zeta: 918,
        Eta: 919,
        Theta: 920,
        Iota: 921,
        Kappa: 922,
        Lambda: 923,
        Mu: 924,
        Nu: 925,
        Xi: 926,
        Omicron: 927,
        Pi: 928,
        Rho: 929,
        Sigma: 931,
        Tau: 932,
        Upsilon: 933,
        Phi: 934,
        Chi: 935,
        Psi: 936,
        Omega: 937,
        alpha: 945,
        beta: 946,
        gamma: 947,
        delta: 948,
        epsilon: 949,
        zeta: 950,
        eta: 951,
        theta: 952,
        iota: 953,
        kappa: 954,
        lambda: 955,
        mu: 956,
        nu: 957,
        xi: 958,
        omicron: 959,
        pi: 960,
        rho: 961,
        sigmaf: 962,
        sigma: 963,
        tau: 964,
        upsilon: 965,
        phi: 966,
        chi: 967,
        psi: 968,
        omega: 969,
        thetasym: 977,
        upsih: 978,
        piv: 982,
        ensp: 8194,
        emsp: 8195,
        thinsp: 8201,
        zwnj: 8204,
        zwj: 8205,
        lrm: 8206,
        rlm: 8207,
        ndash: 8211,
        mdash: 8212,
        lsquo: 8216,
        rsquo: 8217,
        sbquo: 8218,
        ldquo: 8220,
        rdquo: 8221,
        bdquo: 8222,
        dagger: 8224,
        Dagger: 8225,
        bull: 8226,
        hellip: 8230,
        permil: 8240,
        prime: 8242,
        Prime: 8243,
        lsaquo: 8249,
        rsaquo: 8250,
        oline: 8254,
        frasl: 8260,
        euro: 8364,
        image: 8465,
        weierp: 8472,
        real: 8476,
        trade: 8482,
        alefsym: 8501,
        larr: 8592,
        uarr: 8593,
        rarr: 8594,
        darr: 8595,
        harr: 8596,
        crarr: 8629,
        lArr: 8656,
        uArr: 8657,
        rArr: 8658,
        dArr: 8659,
        hArr: 8660,
        forall: 8704,
        part: 8706,
        exist: 8707,
        empty: 8709,
        nabla: 8711,
        isin: 8712,
        notin: 8713,
        ni: 8715,
        prod: 8719,
        sum: 8721,
        minus: 8722,
        lowast: 8727,
        radic: 8730,
        prop: 8733,
        infin: 8734,
        ang: 8736,
        and: 8743,
        or: 8744,
        cap: 8745,
        cup: 8746,
        int: 8747,
        there4: 8756,
        sim: 8764,
        cong: 8773,
        asymp: 8776,
        ne: 8800,
        equiv: 8801,
        le: 8804,
        ge: 8805,
        sub: 8834,
        sup: 8835,
        nsub: 8836,
        sube: 8838,
        supe: 8839,
        oplus: 8853,
        otimes: 8855,
        perp: 8869,
        sdot: 8901,
        lceil: 8968,
        rceil: 8969,
        lfloor: 8970,
        rfloor: 8971,
        lang: 9001,
        rang: 9002,
        loz: 9674,
        spades: 9824,
        clubs: 9827,
        hearts: 9829,
        diams: 9830
      }, Object.keys(e.ENTITIES).forEach(function(x) {
        var y = e.ENTITIES[x], z = typeof y == "number" ? String.fromCharCode(y) : y;
        e.ENTITIES[x] = z;
      });
      for (var Z in e.STATE)
        e.STATE[e.STATE[Z]] = Z;
      D = e.STATE;
      function ce(x, y, z) {
        x[y] && x[y](z);
      }
      function N(x, y, z) {
        x.textNode && U(x), ce(x, y, z);
      }
      function U(x) {
        x.textNode = v(x.opt, x.textNode), x.textNode && ce(x, "ontext", x.textNode), x.textNode = "";
      }
      function v(x, y) {
        return x.trim && (y = y.trim()), x.normalize && (y = y.replace(/\s+/g, " ")), y;
      }
      function V(x, y) {
        return U(x), x.trackPosition && (y += `
Line: ` + x.line + `
Column: ` + x.column + `
Char: ` + x.c), y = new Error(y), x.error = y, ce(x, "onerror", y), x;
      }
      function Q(x) {
        return x.sawRoot && !x.closedRoot && j(x, "Unclosed root tag"), x.state !== D.BEGIN && x.state !== D.BEGIN_WHITESPACE && x.state !== D.TEXT && V(x, "Unexpected end"), U(x), x.c = "", x.closed = !0, ce(x, "onend"), n.call(x, x.strict, x.opt), x;
      }
      function j(x, y) {
        if (typeof x != "object" || !(x instanceof n))
          throw new Error("bad call to strictFail");
        x.strict && V(x, y);
      }
      function te(x) {
        x.strict || (x.tagName = x.tagName[x.looseCase]());
        var y = x.tags[x.tags.length - 1] || x, z = x.tag = { name: x.tagName, attributes: {} };
        x.opt.xmlns && (z.ns = y.ns), x.attribList.length = 0, N(x, "onopentagstart", z);
      }
      function X(x, y) {
        var z = x.indexOf(":"), B = z < 0 ? ["", x] : x.split(":"), I = B[0], F = B[1];
        return y && x === "xmlns" && (I = "xmlns", F = ""), { prefix: I, local: F };
      }
      function oe(x) {
        if (x.strict || (x.attribName = x.attribName[x.looseCase]()), x.attribList.indexOf(x.attribName) !== -1 || x.tag.attributes.hasOwnProperty(x.attribName)) {
          x.attribName = x.attribValue = "";
          return;
        }
        if (x.opt.xmlns) {
          var y = X(x.attribName, !0), z = y.prefix, B = y.local;
          if (z === "xmlns")
            if (B === "xml" && x.attribValue !== _)
              j(
                x,
                "xml: prefix must be bound to " + _ + `
Actual: ` + x.attribValue
              );
            else if (B === "xmlns" && x.attribValue !== k)
              j(
                x,
                "xmlns: prefix must be bound to " + k + `
Actual: ` + x.attribValue
              );
            else {
              var I = x.tag, F = x.tags[x.tags.length - 1] || x;
              I.ns === F.ns && (I.ns = Object.create(F.ns)), I.ns[B] = x.attribValue;
            }
          x.attribList.push([x.attribName, x.attribValue]);
        } else
          x.tag.attributes[x.attribName] = x.attribValue, N(x, "onattribute", {
            name: x.attribName,
            value: x.attribValue
          });
        x.attribName = x.attribValue = "";
      }
      function Y(x, y) {
        if (x.opt.xmlns) {
          var z = x.tag, B = X(x.tagName);
          z.prefix = B.prefix, z.local = B.local, z.uri = z.ns[B.prefix] || "", z.prefix && !z.uri && (j(x, "Unbound namespace prefix: " + JSON.stringify(x.tagName)), z.uri = B.prefix);
          var I = x.tags[x.tags.length - 1] || x;
          z.ns && I.ns !== z.ns && Object.keys(z.ns).forEach(function(W) {
            N(x, "onopennamespace", {
              prefix: W,
              uri: z.ns[W]
            });
          });
          for (var F = 0, ee = x.attribList.length; F < ee; F++) {
            var m = x.attribList[F], J = m[0], E = m[1], o = X(J, !0), u = o.prefix, p = o.local, M = u === "" ? "" : z.ns[u] || "", q = {
              name: J,
              value: E,
              prefix: u,
              local: p,
              uri: M
            };
            u && u !== "xmlns" && !M && (j(x, "Unbound namespace prefix: " + JSON.stringify(u)), q.uri = u), x.tag.attributes[J] = q, N(x, "onattribute", q);
          }
          x.attribList.length = 0;
        }
        x.tag.isSelfClosing = !!y, x.sawRoot = !0, x.tags.push(x.tag), N(x, "onopentag", x.tag), y || (!x.noscript && x.tagName.toLowerCase() === "script" ? x.state = D.SCRIPT : x.state = D.TEXT, x.tag = null, x.tagName = ""), x.attribName = x.attribValue = "", x.attribList.length = 0;
      }
      function C(x) {
        if (!x.tagName) {
          j(x, "Weird empty close tag."), x.textNode += "</>", x.state = D.TEXT;
          return;
        }
        if (x.script) {
          if (x.tagName !== "script") {
            x.script += "</" + x.tagName + ">", x.tagName = "", x.state = D.SCRIPT;
            return;
          }
          N(x, "onscript", x.script), x.script = "";
        }
        var y = x.tags.length, z = x.tagName;
        x.strict || (z = z[x.looseCase]());
        for (var B = z; y--; ) {
          var I = x.tags[y];
          if (I.name !== B)
            j(x, "Unexpected close tag");
          else
            break;
        }
        if (y < 0) {
          j(x, "Unmatched closing tag: " + x.tagName), x.textNode += "</" + x.tagName + ">", x.state = D.TEXT;
          return;
        }
        x.tagName = z;
        for (var F = x.tags.length; F-- > y; ) {
          var ee = x.tag = x.tags.pop();
          x.tagName = x.tag.name, N(x, "onclosetag", x.tagName);
          var m = {};
          for (var J in ee.ns)
            m[J] = ee.ns[J];
          var E = x.tags[x.tags.length - 1] || x;
          x.opt.xmlns && ee.ns !== E.ns && Object.keys(ee.ns).forEach(function(o) {
            var u = ee.ns[o];
            N(x, "onclosenamespace", { prefix: o, uri: u });
          });
        }
        y === 0 && (x.closedRoot = !0), x.tagName = x.attribValue = x.attribName = "", x.attribList.length = 0, x.state = D.TEXT;
      }
      function K(x) {
        var y = x.entity, z = y.toLowerCase(), B, I = "";
        return x.ENTITIES[y] ? x.ENTITIES[y] : x.ENTITIES[z] ? x.ENTITIES[z] : (y = z, y.charAt(0) === "#" && (y.charAt(1) === "x" ? (y = y.slice(2), B = parseInt(y, 16), I = B.toString(16)) : (y = y.slice(1), B = parseInt(y, 10), I = B.toString(10))), y = y.replace(/^0+/, ""), isNaN(B) || I.toLowerCase() !== y ? (j(x, "Invalid character entity"), "&" + x.entity + ";") : String.fromCodePoint(B));
      }
      function $(x, y) {
        y === "<" ? (x.state = D.OPEN_WAKA, x.startTagPosition = x.position) : f(y) || (j(x, "Non-whitespace before first tag."), x.textNode = y, x.state = D.TEXT);
      }
      function re(x, y) {
        var z = "";
        return y < x.length && (z = x.charAt(y)), z;
      }
      function G(x) {
        var y = this;
        if (this.error)
          throw this.error;
        if (y.closed)
          return V(
            y,
            "Cannot write after close. Assign an onready handler."
          );
        if (x === null)
          return Q(y);
        typeof x == "object" && (x = x.toString());
        for (var z = 0, B = ""; B = re(x, z++), y.c = B, !!B; )
          switch (y.trackPosition && (y.position++, B === `
` ? (y.line++, y.column = 0) : y.column++), y.state) {
            case D.BEGIN:
              if (y.state = D.BEGIN_WHITESPACE, B === "\uFEFF")
                continue;
              $(y, B);
              continue;
            case D.BEGIN_WHITESPACE:
              $(y, B);
              continue;
            case D.TEXT:
              if (y.sawRoot && !y.closedRoot) {
                for (var I = z - 1; B && B !== "<" && B !== "&"; )
                  B = re(x, z++), B && y.trackPosition && (y.position++, B === `
` ? (y.line++, y.column = 0) : y.column++);
                y.textNode += x.substring(I, z - 1);
              }
              B === "<" && !(y.sawRoot && y.closedRoot && !y.strict) ? (y.state = D.OPEN_WAKA, y.startTagPosition = y.position) : (!f(B) && (!y.sawRoot || y.closedRoot) && j(y, "Text data outside of root node."), B === "&" ? y.state = D.TEXT_ENTITY : y.textNode += B);
              continue;
            case D.SCRIPT:
              B === "<" ? y.state = D.SCRIPT_ENDING : y.script += B;
              continue;
            case D.SCRIPT_ENDING:
              B === "/" ? y.state = D.CLOSE_TAG : (y.script += "<" + B, y.state = D.SCRIPT);
              continue;
            case D.OPEN_WAKA:
              if (B === "!")
                y.state = D.SGML_DECL, y.sgmlDecl = "";
              else if (!f(B)) if (L(O, B))
                y.state = D.OPEN_TAG, y.tagName = B;
              else if (B === "/")
                y.state = D.CLOSE_TAG, y.tagName = "";
              else if (B === "?")
                y.state = D.PROC_INST, y.procInstName = y.procInstBody = "";
              else {
                if (j(y, "Unencoded <"), y.startTagPosition + 1 < y.position) {
                  var F = y.position - y.startTagPosition;
                  B = new Array(F).join(" ") + B;
                }
                y.textNode += "<" + B, y.state = D.TEXT;
              }
              continue;
            case D.SGML_DECL:
              (y.sgmlDecl + B).toUpperCase() === A ? (N(y, "onopencdata"), y.state = D.CDATA, y.sgmlDecl = "", y.cdata = "") : y.sgmlDecl + B === "--" ? (y.state = D.COMMENT, y.comment = "", y.sgmlDecl = "") : (y.sgmlDecl + B).toUpperCase() === R ? (y.state = D.DOCTYPE, (y.doctype || y.sawRoot) && j(
                y,
                "Inappropriately located doctype declaration"
              ), y.doctype = "", y.sgmlDecl = "") : B === ">" ? (N(y, "onsgmldeclaration", y.sgmlDecl), y.sgmlDecl = "", y.state = D.TEXT) : (T(B) && (y.state = D.SGML_DECL_QUOTED), y.sgmlDecl += B);
              continue;
            case D.SGML_DECL_QUOTED:
              B === y.q && (y.state = D.SGML_DECL, y.q = ""), y.sgmlDecl += B;
              continue;
            case D.DOCTYPE:
              B === ">" ? (y.state = D.TEXT, N(y, "ondoctype", y.doctype), y.doctype = !0) : (y.doctype += B, B === "[" ? y.state = D.DOCTYPE_DTD : T(B) && (y.state = D.DOCTYPE_QUOTED, y.q = B));
              continue;
            case D.DOCTYPE_QUOTED:
              y.doctype += B, B === y.q && (y.q = "", y.state = D.DOCTYPE);
              continue;
            case D.DOCTYPE_DTD:
              y.doctype += B, B === "]" ? y.state = D.DOCTYPE : T(B) && (y.state = D.DOCTYPE_DTD_QUOTED, y.q = B);
              continue;
            case D.DOCTYPE_DTD_QUOTED:
              y.doctype += B, B === y.q && (y.state = D.DOCTYPE_DTD, y.q = "");
              continue;
            case D.COMMENT:
              B === "-" ? y.state = D.COMMENT_ENDING : y.comment += B;
              continue;
            case D.COMMENT_ENDING:
              B === "-" ? (y.state = D.COMMENT_ENDED, y.comment = v(y.opt, y.comment), y.comment && N(y, "oncomment", y.comment), y.comment = "") : (y.comment += "-" + B, y.state = D.COMMENT);
              continue;
            case D.COMMENT_ENDED:
              B !== ">" ? (j(y, "Malformed comment"), y.comment += "--" + B, y.state = D.COMMENT) : y.state = D.TEXT;
              continue;
            case D.CDATA:
              B === "]" ? y.state = D.CDATA_ENDING : y.cdata += B;
              continue;
            case D.CDATA_ENDING:
              B === "]" ? y.state = D.CDATA_ENDING_2 : (y.cdata += "]" + B, y.state = D.CDATA);
              continue;
            case D.CDATA_ENDING_2:
              B === ">" ? (y.cdata && N(y, "oncdata", y.cdata), N(y, "onclosecdata"), y.cdata = "", y.state = D.TEXT) : B === "]" ? y.cdata += "]" : (y.cdata += "]]" + B, y.state = D.CDATA);
              continue;
            case D.PROC_INST:
              B === "?" ? y.state = D.PROC_INST_ENDING : f(B) ? y.state = D.PROC_INST_BODY : y.procInstName += B;
              continue;
            case D.PROC_INST_BODY:
              if (!y.procInstBody && f(B))
                continue;
              B === "?" ? y.state = D.PROC_INST_ENDING : y.procInstBody += B;
              continue;
            case D.PROC_INST_ENDING:
              B === ">" ? (N(y, "onprocessinginstruction", {
                name: y.procInstName,
                body: y.procInstBody
              }), y.procInstName = y.procInstBody = "", y.state = D.TEXT) : (y.procInstBody += "?" + B, y.state = D.PROC_INST_BODY);
              continue;
            case D.OPEN_TAG:
              L(h, B) ? y.tagName += B : (te(y), B === ">" ? Y(y) : B === "/" ? y.state = D.OPEN_TAG_SLASH : (f(B) || j(y, "Invalid character in tag name"), y.state = D.ATTRIB));
              continue;
            case D.OPEN_TAG_SLASH:
              B === ">" ? (Y(y, !0), C(y)) : (j(y, "Forward-slash in opening tag not followed by >"), y.state = D.ATTRIB);
              continue;
            case D.ATTRIB:
              if (f(B))
                continue;
              B === ">" ? Y(y) : B === "/" ? y.state = D.OPEN_TAG_SLASH : L(O, B) ? (y.attribName = B, y.attribValue = "", y.state = D.ATTRIB_NAME) : j(y, "Invalid attribute name");
              continue;
            case D.ATTRIB_NAME:
              B === "=" ? y.state = D.ATTRIB_VALUE : B === ">" ? (j(y, "Attribute without value"), y.attribValue = y.attribName, oe(y), Y(y)) : f(B) ? y.state = D.ATTRIB_NAME_SAW_WHITE : L(h, B) ? y.attribName += B : j(y, "Invalid attribute name");
              continue;
            case D.ATTRIB_NAME_SAW_WHITE:
              if (B === "=")
                y.state = D.ATTRIB_VALUE;
              else {
                if (f(B))
                  continue;
                j(y, "Attribute without value"), y.tag.attributes[y.attribName] = "", y.attribValue = "", N(y, "onattribute", {
                  name: y.attribName,
                  value: ""
                }), y.attribName = "", B === ">" ? Y(y) : L(O, B) ? (y.attribName = B, y.state = D.ATTRIB_NAME) : (j(y, "Invalid attribute name"), y.state = D.ATTRIB);
              }
              continue;
            case D.ATTRIB_VALUE:
              if (f(B))
                continue;
              T(B) ? (y.q = B, y.state = D.ATTRIB_VALUE_QUOTED) : (j(y, "Unquoted attribute value"), y.state = D.ATTRIB_VALUE_UNQUOTED, y.attribValue = B);
              continue;
            case D.ATTRIB_VALUE_QUOTED:
              if (B !== y.q) {
                B === "&" ? y.state = D.ATTRIB_VALUE_ENTITY_Q : y.attribValue += B;
                continue;
              }
              oe(y), y.q = "", y.state = D.ATTRIB_VALUE_CLOSED;
              continue;
            case D.ATTRIB_VALUE_CLOSED:
              f(B) ? y.state = D.ATTRIB : B === ">" ? Y(y) : B === "/" ? y.state = D.OPEN_TAG_SLASH : L(O, B) ? (j(y, "No whitespace between attributes"), y.attribName = B, y.attribValue = "", y.state = D.ATTRIB_NAME) : j(y, "Invalid attribute name");
              continue;
            case D.ATTRIB_VALUE_UNQUOTED:
              if (!P(B)) {
                B === "&" ? y.state = D.ATTRIB_VALUE_ENTITY_U : y.attribValue += B;
                continue;
              }
              oe(y), B === ">" ? Y(y) : y.state = D.ATTRIB;
              continue;
            case D.CLOSE_TAG:
              if (y.tagName)
                B === ">" ? C(y) : L(h, B) ? y.tagName += B : y.script ? (y.script += "</" + y.tagName, y.tagName = "", y.state = D.SCRIPT) : (f(B) || j(y, "Invalid tagname in closing tag"), y.state = D.CLOSE_TAG_SAW_WHITE);
              else {
                if (f(B))
                  continue;
                H(O, B) ? y.script ? (y.script += "</" + B, y.state = D.SCRIPT) : j(y, "Invalid tagname in closing tag.") : y.tagName = B;
              }
              continue;
            case D.CLOSE_TAG_SAW_WHITE:
              if (f(B))
                continue;
              B === ">" ? C(y) : j(y, "Invalid characters in closing tag");
              continue;
            case D.TEXT_ENTITY:
            case D.ATTRIB_VALUE_ENTITY_Q:
            case D.ATTRIB_VALUE_ENTITY_U:
              var ee, m;
              switch (y.state) {
                case D.TEXT_ENTITY:
                  ee = D.TEXT, m = "textNode";
                  break;
                case D.ATTRIB_VALUE_ENTITY_Q:
                  ee = D.ATTRIB_VALUE_QUOTED, m = "attribValue";
                  break;
                case D.ATTRIB_VALUE_ENTITY_U:
                  ee = D.ATTRIB_VALUE_UNQUOTED, m = "attribValue";
                  break;
              }
              B === ";" ? (y[m] += K(y), y.entity = "", y.state = ee) : L(y.entity.length ? w : g, B) ? y.entity += B : (j(y, "Invalid character in entity name"), y[m] += "&" + y.entity + B, y.entity = "", y.state = ee);
              continue;
            default:
              throw new Error(y, "Unknown state: " + y.state);
          }
        return y.position >= y.bufferCheckPosition && i(y), y;
      }
      /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
      String.fromCodePoint || function() {
        var x = String.fromCharCode, y = Math.floor, z = function() {
          var B = 16384, I = [], F, ee, m = -1, J = arguments.length;
          if (!J)
            return "";
          for (var E = ""; ++m < J; ) {
            var o = Number(arguments[m]);
            if (!isFinite(o) || // `NaN`, `+Infinity`, or `-Infinity`
            o < 0 || // not a valid Unicode code point
            o > 1114111 || // not a valid Unicode code point
            y(o) !== o)
              throw RangeError("Invalid code point: " + o);
            o <= 65535 ? I.push(o) : (o -= 65536, F = (o >> 10) + 55296, ee = o % 1024 + 56320, I.push(F, ee)), (m + 1 === J || I.length > B) && (E += x.apply(null, I), I.length = 0);
          }
          return E;
        };
        Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
          value: z,
          configurable: !0,
          writable: !0
        }) : String.fromCodePoint = z;
      }();
    })(t);
  }(Ln)), Ln;
}
var Pi, yo;
function Cs() {
  return yo || (yo = 1, Pi = {
    isArray: function(t) {
      return Array.isArray ? Array.isArray(t) : Object.prototype.toString.call(t) === "[object Array]";
    }
  }), Pi;
}
var Mi, go;
function Is() {
  if (go) return Mi;
  go = 1;
  var t = Cs().isArray;
  return Mi = {
    copyOptions: function(e) {
      var r, n = {};
      for (r in e)
        e.hasOwnProperty(r) && (n[r] = e[r]);
      return n;
    },
    ensureFlagExists: function(e, r) {
      (!(e in r) || typeof r[e] != "boolean") && (r[e] = !1);
    },
    ensureSpacesExists: function(e) {
      (!("spaces" in e) || typeof e.spaces != "number" && typeof e.spaces != "string") && (e.spaces = 0);
    },
    ensureAlwaysArrayExists: function(e) {
      (!("alwaysArray" in e) || typeof e.alwaysArray != "boolean" && !t(e.alwaysArray)) && (e.alwaysArray = !1);
    },
    ensureKeyExists: function(e, r) {
      (!(e + "Key" in r) || typeof r[e + "Key"] != "string") && (r[e + "Key"] = r.compact ? "_" + e : e);
    },
    checkFnExists: function(e, r) {
      return e + "Fn" in r;
    }
  }, Mi;
}
var Li, vo;
function Au() {
  if (vo) return Li;
  vo = 1;
  var t = Mc(), e = Is(), r = Cs().isArray, n, i;
  function a(h) {
    return n = e.copyOptions(h), e.ensureFlagExists("ignoreDeclaration", n), e.ensureFlagExists("ignoreInstruction", n), e.ensureFlagExists("ignoreAttributes", n), e.ensureFlagExists("ignoreText", n), e.ensureFlagExists("ignoreComment", n), e.ensureFlagExists("ignoreCdata", n), e.ensureFlagExists("ignoreDoctype", n), e.ensureFlagExists("compact", n), e.ensureFlagExists("alwaysChildren", n), e.ensureFlagExists("addParent", n), e.ensureFlagExists("trim", n), e.ensureFlagExists("nativeType", n), e.ensureFlagExists("nativeTypeAttributes", n), e.ensureFlagExists("sanitize", n), e.ensureFlagExists("instructionHasAttributes", n), e.ensureFlagExists("captureSpacesBetweenElements", n), e.ensureAlwaysArrayExists(n), e.ensureKeyExists("declaration", n), e.ensureKeyExists("instruction", n), e.ensureKeyExists("attributes", n), e.ensureKeyExists("text", n), e.ensureKeyExists("comment", n), e.ensureKeyExists("cdata", n), e.ensureKeyExists("doctype", n), e.ensureKeyExists("type", n), e.ensureKeyExists("name", n), e.ensureKeyExists("elements", n), e.ensureKeyExists("parent", n), e.checkFnExists("doctype", n), e.checkFnExists("instruction", n), e.checkFnExists("cdata", n), e.checkFnExists("comment", n), e.checkFnExists("text", n), e.checkFnExists("instructionName", n), e.checkFnExists("elementName", n), e.checkFnExists("attributeName", n), e.checkFnExists("attributeValue", n), e.checkFnExists("attributes", n), n;
  }
  function l(h) {
    var g = Number(h);
    if (!isNaN(g))
      return g;
    var w = h.toLowerCase();
    return w === "true" ? !0 : w === "false" ? !1 : h;
  }
  function s(h, g) {
    var w;
    if (n.compact) {
      if (!i[n[h + "Key"]] && (r(n.alwaysArray) ? n.alwaysArray.indexOf(n[h + "Key"]) !== -1 : n.alwaysArray) && (i[n[h + "Key"]] = []), i[n[h + "Key"]] && !r(i[n[h + "Key"]]) && (i[n[h + "Key"]] = [i[n[h + "Key"]]]), h + "Fn" in n && typeof g == "string" && (g = n[h + "Fn"](g, i)), h === "instruction" && ("instructionFn" in n || "instructionNameFn" in n)) {
        for (w in g)
          if (g.hasOwnProperty(w))
            if ("instructionFn" in n)
              g[w] = n.instructionFn(g[w], w, i);
            else {
              var f = g[w];
              delete g[w], g[n.instructionNameFn(w, f, i)] = f;
            }
      }
      r(i[n[h + "Key"]]) ? i[n[h + "Key"]].push(g) : i[n[h + "Key"]] = g;
    } else {
      i[n.elementsKey] || (i[n.elementsKey] = []);
      var T = {};
      if (T[n.typeKey] = h, h === "instruction") {
        for (w in g)
          if (g.hasOwnProperty(w))
            break;
        T[n.nameKey] = "instructionNameFn" in n ? n.instructionNameFn(w, g, i) : w, n.instructionHasAttributes ? (T[n.attributesKey] = g[w][n.attributesKey], "instructionFn" in n && (T[n.attributesKey] = n.instructionFn(T[n.attributesKey], w, i))) : ("instructionFn" in n && (g[w] = n.instructionFn(g[w], w, i)), T[n.instructionKey] = g[w]);
      } else
        h + "Fn" in n && (g = n[h + "Fn"](g, i)), T[n[h + "Key"]] = g;
      n.addParent && (T[n.parentKey] = i), i[n.elementsKey].push(T);
    }
  }
  function c(h) {
    if ("attributesFn" in n && h && (h = n.attributesFn(h, i)), (n.trim || "attributeValueFn" in n || "attributeNameFn" in n || n.nativeTypeAttributes) && h) {
      var g;
      for (g in h)
        if (h.hasOwnProperty(g) && (n.trim && (h[g] = h[g].trim()), n.nativeTypeAttributes && (h[g] = l(h[g])), "attributeValueFn" in n && (h[g] = n.attributeValueFn(h[g], g, i)), "attributeNameFn" in n)) {
          var w = h[g];
          delete h[g], h[n.attributeNameFn(g, h[g], i)] = w;
        }
    }
    return h;
  }
  function b(h) {
    var g = {};
    if (h.body && (h.name.toLowerCase() === "xml" || n.instructionHasAttributes)) {
      for (var w = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\w+))\s*/g, f; (f = w.exec(h.body)) !== null; )
        g[f[1]] = f[2] || f[3] || f[4];
      g = c(g);
    }
    if (h.name.toLowerCase() === "xml") {
      if (n.ignoreDeclaration)
        return;
      i[n.declarationKey] = {}, Object.keys(g).length && (i[n.declarationKey][n.attributesKey] = g), n.addParent && (i[n.declarationKey][n.parentKey] = i);
    } else {
      if (n.ignoreInstruction)
        return;
      n.trim && (h.body = h.body.trim());
      var T = {};
      n.instructionHasAttributes && Object.keys(g).length ? (T[h.name] = {}, T[h.name][n.attributesKey] = g) : T[h.name] = h.body, s("instruction", T);
    }
  }
  function S(h, g) {
    var w;
    if (typeof h == "object" && (g = h.attributes, h = h.name), g = c(g), "elementNameFn" in n && (h = n.elementNameFn(h, i)), n.compact) {
      if (w = {}, !n.ignoreAttributes && g && Object.keys(g).length) {
        w[n.attributesKey] = {};
        var f;
        for (f in g)
          g.hasOwnProperty(f) && (w[n.attributesKey][f] = g[f]);
      }
      !(h in i) && (r(n.alwaysArray) ? n.alwaysArray.indexOf(h) !== -1 : n.alwaysArray) && (i[h] = []), i[h] && !r(i[h]) && (i[h] = [i[h]]), r(i[h]) ? i[h].push(w) : i[h] = w;
    } else
      i[n.elementsKey] || (i[n.elementsKey] = []), w = {}, w[n.typeKey] = "element", w[n.nameKey] = h, !n.ignoreAttributes && g && Object.keys(g).length && (w[n.attributesKey] = g), n.alwaysChildren && (w[n.elementsKey] = []), i[n.elementsKey].push(w);
    w[n.parentKey] = i, i = w;
  }
  function A(h) {
    n.ignoreText || !h.trim() && !n.captureSpacesBetweenElements || (n.trim && (h = h.trim()), n.nativeType && (h = l(h)), n.sanitize && (h = h.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")), s("text", h));
  }
  function R(h) {
    n.ignoreComment || (n.trim && (h = h.trim()), s("comment", h));
  }
  function _(h) {
    var g = i[n.parentKey];
    n.addParent || delete i[n.parentKey], i = g;
  }
  function k(h) {
    n.ignoreCdata || (n.trim && (h = h.trim()), s("cdata", h));
  }
  function d(h) {
    n.ignoreDoctype || (h = h.replace(/^ /, ""), n.trim && (h = h.trim()), s("doctype", h));
  }
  function O(h) {
    h.note = h;
  }
  return Li = function(h, g) {
    var w = t.parser(!0, {}), f = {};
    if (i = f, n = a(g), w.opt = { strictEntities: !0 }, w.onopentag = S, w.ontext = A, w.oncomment = R, w.onclosetag = _, w.onerror = O, w.oncdata = k, w.ondoctype = d, w.onprocessinginstruction = b, w.write(h).close(), f[n.elementsKey]) {
      var T = f[n.elementsKey];
      delete f[n.elementsKey], f[n.elementsKey] = T, delete f.text;
    }
    return f;
  }, Li;
}
var Bi, _o;
function Lc() {
  if (_o) return Bi;
  _o = 1;
  var t = Is(), e = Au();
  function r(n) {
    var i = t.copyOptions(n);
    return t.ensureSpacesExists(i), i;
  }
  return Bi = function(n, i) {
    var a, l, s, c;
    return a = r(i), l = e(n, a), c = "compact" in a && a.compact ? "_parent" : "parent", "addParent" in a && a.addParent ? s = JSON.stringify(l, function(b, S) {
      return b === c ? "_" : S;
    }, a.spaces) : s = JSON.stringify(l, null, a.spaces), s.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }, Bi;
}
var Ui, bo;
function Ru() {
  if (bo) return Ui;
  bo = 1;
  var t = Is(), e = Cs().isArray, r, n;
  function i(w) {
    var f = t.copyOptions(w);
    return t.ensureFlagExists("ignoreDeclaration", f), t.ensureFlagExists("ignoreInstruction", f), t.ensureFlagExists("ignoreAttributes", f), t.ensureFlagExists("ignoreText", f), t.ensureFlagExists("ignoreComment", f), t.ensureFlagExists("ignoreCdata", f), t.ensureFlagExists("ignoreDoctype", f), t.ensureFlagExists("compact", f), t.ensureFlagExists("indentText", f), t.ensureFlagExists("indentCdata", f), t.ensureFlagExists("indentAttributes", f), t.ensureFlagExists("indentInstruction", f), t.ensureFlagExists("fullTagEmptyElement", f), t.ensureFlagExists("noQuotesForNativeAttributes", f), t.ensureSpacesExists(f), typeof f.spaces == "number" && (f.spaces = Array(f.spaces + 1).join(" ")), t.ensureKeyExists("declaration", f), t.ensureKeyExists("instruction", f), t.ensureKeyExists("attributes", f), t.ensureKeyExists("text", f), t.ensureKeyExists("comment", f), t.ensureKeyExists("cdata", f), t.ensureKeyExists("doctype", f), t.ensureKeyExists("type", f), t.ensureKeyExists("name", f), t.ensureKeyExists("elements", f), t.checkFnExists("doctype", f), t.checkFnExists("instruction", f), t.checkFnExists("cdata", f), t.checkFnExists("comment", f), t.checkFnExists("text", f), t.checkFnExists("instructionName", f), t.checkFnExists("elementName", f), t.checkFnExists("attributeName", f), t.checkFnExists("attributeValue", f), t.checkFnExists("attributes", f), t.checkFnExists("fullTagEmptyElement", f), f;
  }
  function a(w, f, T) {
    return (!T && w.spaces ? `
` : "") + Array(f + 1).join(w.spaces);
  }
  function l(w, f, T) {
    if (f.ignoreAttributes)
      return "";
    "attributesFn" in f && (w = f.attributesFn(w, n, r));
    var P, L, H, D, Z = [];
    for (P in w)
      w.hasOwnProperty(P) && w[P] !== null && w[P] !== void 0 && (D = f.noQuotesForNativeAttributes && typeof w[P] != "string" ? "" : '"', L = "" + w[P], L = L.replace(/"/g, "&quot;"), H = "attributeNameFn" in f ? f.attributeNameFn(P, L, n, r) : P, Z.push(f.spaces && f.indentAttributes ? a(f, T + 1, !1) : " "), Z.push(H + "=" + D + ("attributeValueFn" in f ? f.attributeValueFn(L, P, n, r) : L) + D));
    return w && Object.keys(w).length && f.spaces && f.indentAttributes && Z.push(a(f, T, !1)), Z.join("");
  }
  function s(w, f, T) {
    return r = w, n = "xml", f.ignoreDeclaration ? "" : "<?xml" + l(w[f.attributesKey], f, T) + "?>";
  }
  function c(w, f, T) {
    if (f.ignoreInstruction)
      return "";
    var P;
    for (P in w)
      if (w.hasOwnProperty(P))
        break;
    var L = "instructionNameFn" in f ? f.instructionNameFn(P, w[P], n, r) : P;
    if (typeof w[P] == "object")
      return r = w, n = L, "<?" + L + l(w[P][f.attributesKey], f, T) + "?>";
    var H = w[P] ? w[P] : "";
    return "instructionFn" in f && (H = f.instructionFn(H, P, n, r)), "<?" + L + (H ? " " + H : "") + "?>";
  }
  function b(w, f) {
    return f.ignoreComment ? "" : "<!--" + ("commentFn" in f ? f.commentFn(w, n, r) : w) + "-->";
  }
  function S(w, f) {
    return f.ignoreCdata ? "" : "<![CDATA[" + ("cdataFn" in f ? f.cdataFn(w, n, r) : w.replace("]]>", "]]]]><![CDATA[>")) + "]]>";
  }
  function A(w, f) {
    return f.ignoreDoctype ? "" : "<!DOCTYPE " + ("doctypeFn" in f ? f.doctypeFn(w, n, r) : w) + ">";
  }
  function R(w, f) {
    return f.ignoreText ? "" : (w = "" + w, w = w.replace(/&amp;/g, "&"), w = w.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "textFn" in f ? f.textFn(w, n, r) : w);
  }
  function _(w, f) {
    var T;
    if (w.elements && w.elements.length)
      for (T = 0; T < w.elements.length; ++T)
        switch (w.elements[T][f.typeKey]) {
          case "text":
            if (f.indentText)
              return !0;
            break;
          case "cdata":
            if (f.indentCdata)
              return !0;
            break;
          case "instruction":
            if (f.indentInstruction)
              return !0;
            break;
          case "doctype":
          case "comment":
          case "element":
            return !0;
          default:
            return !0;
        }
    return !1;
  }
  function k(w, f, T) {
    r = w, n = w.name;
    var P = [], L = "elementNameFn" in f ? f.elementNameFn(w.name, w) : w.name;
    P.push("<" + L), w[f.attributesKey] && P.push(l(w[f.attributesKey], f, T));
    var H = w[f.elementsKey] && w[f.elementsKey].length || w[f.attributesKey] && w[f.attributesKey]["xml:space"] === "preserve";
    return H || ("fullTagEmptyElementFn" in f ? H = f.fullTagEmptyElementFn(w.name, w) : H = f.fullTagEmptyElement), H ? (P.push(">"), w[f.elementsKey] && w[f.elementsKey].length && (P.push(d(w[f.elementsKey], f, T + 1)), r = w, n = w.name), P.push(f.spaces && _(w, f) ? `
` + Array(T + 1).join(f.spaces) : ""), P.push("</" + L + ">")) : P.push("/>"), P.join("");
  }
  function d(w, f, T, P) {
    return w.reduce(function(L, H) {
      var D = a(f, T, P && !L);
      switch (H.type) {
        case "element":
          return L + D + k(H, f, T);
        case "comment":
          return L + D + b(H[f.commentKey], f);
        case "doctype":
          return L + D + A(H[f.doctypeKey], f);
        case "cdata":
          return L + (f.indentCdata ? D : "") + S(H[f.cdataKey], f);
        case "text":
          return L + (f.indentText ? D : "") + R(H[f.textKey], f);
        case "instruction":
          var Z = {};
          return Z[H[f.nameKey]] = H[f.attributesKey] ? H : H[f.instructionKey], L + (f.indentInstruction ? D : "") + c(Z, f, T);
      }
    }, "");
  }
  function O(w, f, T) {
    var P;
    for (P in w)
      if (w.hasOwnProperty(P))
        switch (P) {
          case f.parentKey:
          case f.attributesKey:
            break;
          case f.textKey:
            if (f.indentText || T)
              return !0;
            break;
          case f.cdataKey:
            if (f.indentCdata || T)
              return !0;
            break;
          case f.instructionKey:
            if (f.indentInstruction || T)
              return !0;
            break;
          case f.doctypeKey:
          case f.commentKey:
            return !0;
          default:
            return !0;
        }
    return !1;
  }
  function h(w, f, T, P, L) {
    r = w, n = f;
    var H = "elementNameFn" in T ? T.elementNameFn(f, w) : f;
    if (typeof w > "u" || w === null || w === "")
      return "fullTagEmptyElementFn" in T && T.fullTagEmptyElementFn(f, w) || T.fullTagEmptyElement ? "<" + H + "></" + H + ">" : "<" + H + "/>";
    var D = [];
    if (f) {
      if (D.push("<" + H), typeof w != "object")
        return D.push(">" + R(w, T) + "</" + H + ">"), D.join("");
      w[T.attributesKey] && D.push(l(w[T.attributesKey], T, P));
      var Z = O(w, T, !0) || w[T.attributesKey] && w[T.attributesKey]["xml:space"] === "preserve";
      if (Z || ("fullTagEmptyElementFn" in T ? Z = T.fullTagEmptyElementFn(f, w) : Z = T.fullTagEmptyElement), Z)
        D.push(">");
      else
        return D.push("/>"), D.join("");
    }
    return D.push(g(w, T, P + 1, !1)), r = w, n = f, f && D.push((L ? a(T, P, !1) : "") + "</" + H + ">"), D.join("");
  }
  function g(w, f, T, P) {
    var L, H, D, Z = [];
    for (H in w)
      if (w.hasOwnProperty(H))
        for (D = e(w[H]) ? w[H] : [w[H]], L = 0; L < D.length; ++L) {
          switch (H) {
            case f.declarationKey:
              Z.push(s(D[L], f, T));
              break;
            case f.instructionKey:
              Z.push((f.indentInstruction ? a(f, T, P) : "") + c(D[L], f, T));
              break;
            case f.attributesKey:
            case f.parentKey:
              break;
            case f.textKey:
              Z.push((f.indentText ? a(f, T, P) : "") + R(D[L], f));
              break;
            case f.cdataKey:
              Z.push((f.indentCdata ? a(f, T, P) : "") + S(D[L], f));
              break;
            case f.doctypeKey:
              Z.push(a(f, T, P) + A(D[L], f));
              break;
            case f.commentKey:
              Z.push(a(f, T, P) + b(D[L], f));
              break;
            default:
              Z.push(a(f, T, P) + h(D[L], H, f, T, O(D[L], f)));
          }
          P = P && !Z.length;
        }
    return Z.join("");
  }
  return Ui = function(w, f) {
    f = i(f);
    var T = [];
    return r = w, n = "_root_", f.compact ? T.push(g(w, f, 0, !0)) : (w[f.declarationKey] && T.push(s(w[f.declarationKey], f, 0)), w[f.elementsKey] && w[f.elementsKey].length && T.push(d(w[f.elementsKey], f, 0, !T.length))), T.join("");
  }, Ui;
}
var Wi, xo;
function Bc() {
  if (xo) return Wi;
  xo = 1;
  var t = Ru();
  return Wi = function(e, r) {
    e instanceof Buffer && (e = e.toString());
    var n = null;
    if (typeof e == "string")
      try {
        n = JSON.parse(e);
      } catch {
        throw new Error("The JSON structure is invalid");
      }
    else
      n = e;
    return t(n, r);
  }, Wi;
}
var ji, So;
function Uc() {
  if (So) return ji;
  So = 1;
  var t = Au(), e = Lc(), r = Ru(), n = Bc();
  return ji = {
    xml2js: t,
    xml2json: e,
    js2xml: r,
    json2xml: n
  }, ji;
}
var Ou = Uc();
const Fs = (t) => {
  switch (t.type) {
    case void 0:
    case "element":
      const e = new jc(t.name, t.attributes), r = t.elements || [];
      for (const n of r) {
        const i = Fs(n);
        i !== void 0 && e.push(i);
      }
      return e;
    case "text":
      return t.text;
    default:
      return;
  }
};
class Wc extends ye {
  // noop
}
class jc extends ae {
  /**
   * Converts the xml string to a XmlComponent tree.
   *
   * @param importedContent xml content of the imported component
   */
  static fromXmlString(e) {
    const r = Ou.xml2js(e, { compact: !1 });
    return Fs(r);
  }
  /**
   * Converts the xml string to a XmlComponent tree.
   *
   * @param importedContent xml content of the imported component
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(e, r) {
    super(e), r && this.root.push(new Wc(r));
  }
  push(e) {
    this.root.push(e);
  }
}
class zc extends ae {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(e) {
    super(""), this._attr = e;
  }
  prepForXml(e) {
    return {
      _attr: this._attr
    };
  }
}
class Du extends ae {
  constructor(e, r) {
    super(e), r && (this.root = r.root);
  }
}
const ze = (t) => {
  if (isNaN(t))
    throw new Error(`Invalid value '${t}' specified. Must be an integer.`);
  return Math.floor(t);
}, gn = (t) => {
  const e = ze(t);
  if (e < 0)
    throw new Error(`Invalid value '${t}' specified. Must be a positive integer.`);
  return e;
}, Nu = (t, e) => {
  const r = e * 2;
  if (t.length !== r || isNaN(+`0x${t}`))
    throw new Error(`Invalid hex value '${t}'. Expected ${r} digit hex value`);
  return t;
}, Eo = (t) => Nu(t, 1), Ps = (t) => {
  const e = t.slice(-2), r = t.substring(0, t.length - 2);
  return `${Number(r)}${e}`;
}, Cu = (t) => {
  const e = Ps(t);
  if (parseFloat(e) < 0)
    throw new Error(`Invalid value '${e}' specified. Expected a positive number.`);
  return e;
}, or = (t) => {
  if (t === "auto")
    return t;
  const e = t.charAt(0) === "#" ? t.substring(1) : t;
  return Nu(e, 3);
}, vt = (t) => typeof t == "string" ? Ps(t) : ze(t), Hc = (t) => typeof t == "string" ? Cu(t) : gn(t), Ue = (t) => typeof t == "string" ? Cu(t) : gn(t), Yc = (t) => {
  const e = t.substring(0, t.length - 1);
  return `${Number(e)}%`;
}, qc = (t) => typeof t == "number" ? ze(t) : t.slice(-1) === "%" ? Yc(t) : Ps(t), Gc = gn, Vc = gn, Kc = (t) => t.toISOString();
class ue extends ae {
  constructor(e, r = !0) {
    super(e), r !== !0 && this.root.push(new Ie({ val: r }));
  }
}
class zi extends ae {
  constructor(e, r) {
    super(e), this.root.push(new Ie({ val: Hc(r) }));
  }
}
class qt extends ae {
  constructor(e, r) {
    super(e), this.root.push(new Ie({ val: r }));
  }
}
const _r = (t, e) => new Ft({
  name: t,
  attributes: {
    value: { key: "w:val", value: e }
  }
});
class kr extends ae {
  constructor(e, r) {
    super(e), this.root.push(new Ie({ val: r }));
  }
}
class $c extends ae {
  constructor(e, r) {
    super(e), this.root.push(new Ie({ val: r }));
  }
}
class Bt extends ae {
  constructor(e, r) {
    super(e), this.root.push(r);
  }
}
class Ft extends ae {
  constructor({
    name: e,
    attributes: r,
    children: n
  }) {
    super(e), r && this.root.push(new Pt(r)), n && this.root.push(...n);
  }
}
const qe = {
  /** Align Start */
  START: "start",
  /** Align Center */
  CENTER: "center",
  /** Align Left */
  LEFT: "left"
};
class Zc extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", { val: "w:val" });
  }
}
class Iu extends ae {
  constructor(e) {
    super("w:jc"), this.root.push(new Zc({ val: e }));
  }
}
class Ae extends ae {
  constructor(e, { color: r, size: n, space: i, style: a }) {
    super(e), this.root.push(
      new Xc({
        style: a,
        color: r === void 0 ? void 0 : or(r),
        size: n === void 0 ? void 0 : Gc(n),
        space: i === void 0 ? void 0 : Vc(i)
      })
    );
  }
}
class Xc extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      style: "w:val",
      color: "w:color",
      size: "w:sz",
      space: "w:space"
    });
  }
}
const Ms = {
  SINGLE: "single",
  NONE: "none"
};
class Jc extends Tt {
  constructor(e) {
    super("w:pBdr"), e.top && this.root.push(new Ae("w:top", e.top)), e.bottom && this.root.push(new Ae("w:bottom", e.bottom)), e.left && this.root.push(new Ae("w:left", e.left)), e.right && this.root.push(new Ae("w:right", e.right));
  }
}
class Qc extends ae {
  constructor() {
    super("w:pBdr");
    const e = new Ae("w:bottom", {
      color: "auto",
      space: 1,
      style: Ms.SINGLE,
      size: 6
    });
    this.root.push(e);
  }
}
class eh extends ae {
  constructor({ start: e, end: r, left: n, right: i, hanging: a, firstLine: l }) {
    super("w:ind"), this.root.push(
      new Pt({
        start: {
          key: "w:start",
          value: e === void 0 ? void 0 : vt(e)
        },
        end: {
          key: "w:end",
          value: r === void 0 ? void 0 : vt(r)
        },
        left: {
          key: "w:left",
          value: n === void 0 ? void 0 : vt(n)
        },
        right: {
          key: "w:right",
          value: i === void 0 ? void 0 : vt(i)
        },
        hanging: {
          key: "w:hanging",
          value: a === void 0 ? void 0 : Ue(a)
        },
        firstLine: {
          key: "w:firstLine",
          value: l === void 0 ? void 0 : Ue(l)
        }
      })
    );
  }
}
let th = class extends ae {
  constructor() {
    super("w:br");
  }
};
const Ls = {
  BEGIN: "begin",
  END: "end",
  SEPARATE: "separate"
};
class Bs extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", { type: "w:fldCharType", dirty: "w:dirty" });
  }
}
class Kr extends ae {
  constructor(e) {
    super("w:fldChar"), this.root.push(new Bs({ type: Ls.BEGIN, dirty: e }));
  }
}
class $r extends ae {
  constructor(e) {
    super("w:fldChar"), this.root.push(new Bs({ type: Ls.SEPARATE, dirty: e }));
  }
}
class Zr extends ae {
  constructor(e) {
    super("w:fldChar"), this.root.push(new Bs({ type: Ls.END, dirty: e }));
  }
}
const ur = {
  DEFAULT: "default",
  PRESERVE: "preserve"
};
class lr extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", { space: "xml:space" });
  }
}
class rh extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new lr({ space: ur.PRESERVE })), this.root.push("PAGE");
  }
}
class nh extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new lr({ space: ur.PRESERVE })), this.root.push("NUMPAGES");
  }
}
class ih extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new lr({ space: ur.PRESERVE })), this.root.push("SECTIONPAGES");
  }
}
class sh extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new lr({ space: ur.PRESERVE })), this.root.push("SECTION");
  }
}
class ah extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      fill: "w:fill",
      color: "w:color",
      type: "w:val"
    });
  }
}
class vn extends ae {
  constructor({ fill: e, color: r, type: n }) {
    super("w:shd"), this.root.push(
      new ah({
        fill: e === void 0 ? void 0 : or(e),
        color: r === void 0 ? void 0 : or(r),
        type: n
      })
    );
  }
}
class oh extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      id: "w:id",
      author: "w:author",
      date: "w:date"
    });
  }
}
const uh = {
  DOT: "dot"
};
class lh extends ae {
  constructor(e) {
    super("w:em"), this.root.push(
      new Ie({
        val: e
      })
    );
  }
}
class ch extends lh {
  constructor(e = uh.DOT) {
    super(e);
  }
}
class hh extends ae {
  constructor(e) {
    super("w:spacing"), this.root.push(
      new Ie({
        val: vt(e)
      })
    );
  }
}
class fh extends ae {
  constructor(e) {
    super("w:color"), this.root.push(
      new Ie({
        val: or(e)
      })
    );
  }
}
class dh extends ae {
  constructor(e) {
    super("w:highlight"), this.root.push(
      new Ie({
        val: e
      })
    );
  }
}
class ph extends ae {
  constructor(e) {
    super("w:highlightCs"), this.root.push(
      new Ie({
        val: e
      })
    );
  }
}
const mh = (t) => new Ft({
  name: "w:lang",
  attributes: {
    value: {
      key: "w:val",
      value: t.value
    },
    eastAsia: {
      key: "w:eastAsia",
      value: t.eastAsia
    },
    bidirectional: {
      key: "w:bidi",
      value: t.bidirectional
    }
  }
});
class To extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      ascii: "w:ascii",
      cs: "w:cs",
      eastAsia: "w:eastAsia",
      hAnsi: "w:hAnsi",
      hint: "w:hint"
    });
  }
}
class Hi extends ae {
  constructor(e, r) {
    if (super("w:rFonts"), typeof e == "string") {
      const n = e;
      this.root.push(
        new To({
          ascii: n,
          cs: n,
          eastAsia: n,
          hAnsi: n,
          hint: r
        })
      );
    } else {
      const n = e;
      this.root.push(new To(n));
    }
  }
}
let Fu = class extends ae {
  constructor(e) {
    super("w:vertAlign"), this.root.push(
      new Ie({
        val: e
      })
    );
  }
};
class wh extends Fu {
  constructor() {
    super("superscript");
  }
}
class yh extends Fu {
  constructor() {
    super("subscript");
  }
}
const Pu = {
  SINGLE: "single"
};
class gh extends ae {
  constructor(e = Pu.SINGLE, r) {
    super("w:u"), this.root.push(
      new Ie({
        val: e,
        color: r === void 0 ? void 0 : or(r)
      })
    );
  }
}
class Vt extends Tt {
  constructor(e) {
    var r, n;
    if (super("w:rPr"), !e)
      return;
    e.noProof !== void 0 && this.push(new ue("w:noProof", e.noProof)), e.bold !== void 0 && this.push(new ue("w:b", e.bold)), (e.boldComplexScript === void 0 && e.bold !== void 0 || e.boldComplexScript) && this.push(new ue("w:bCs", (r = e.boldComplexScript) != null ? r : e.bold)), e.italics !== void 0 && this.push(new ue("w:i", e.italics)), (e.italicsComplexScript === void 0 && e.italics !== void 0 || e.italicsComplexScript) && this.push(new ue("w:iCs", (n = e.italicsComplexScript) != null ? n : e.italics)), e.underline && this.push(new gh(e.underline.type, e.underline.color)), e.effect && this.push(new qt("w:effect", e.effect)), e.emphasisMark && this.push(new ch(e.emphasisMark.type)), e.color && this.push(new fh(e.color)), e.kern && this.push(new zi("w:kern", e.kern)), e.position && this.push(new qt("w:position", e.position)), e.size !== void 0 && this.push(new zi("w:sz", e.size));
    const i = e.sizeComplexScript === void 0 || e.sizeComplexScript === !0 ? e.size : e.sizeComplexScript;
    i && this.push(new zi("w:szCs", i)), e.rightToLeft !== void 0 && this.push(new ue("w:rtl", e.rightToLeft)), e.smallCaps !== void 0 ? this.push(new ue("w:smallCaps", e.smallCaps)) : e.allCaps !== void 0 && this.push(new ue("w:caps", e.allCaps)), e.strike !== void 0 && this.push(new ue("w:strike", e.strike)), e.doubleStrike !== void 0 && this.push(new ue("w:dstrike", e.doubleStrike)), e.subScript && this.push(new yh()), e.superScript && this.push(new wh()), e.style && this.push(new qt("w:rStyle", e.style)), e.font && (typeof e.font == "string" ? this.push(new Hi(e.font)) : "name" in e.font ? this.push(new Hi(e.font.name, e.font.hint)) : this.push(new Hi(e.font))), e.highlight && this.push(new dh(e.highlight));
    const a = e.highlightComplexScript === void 0 || e.highlightComplexScript === !0 ? e.highlight : e.highlightComplexScript;
    a && this.push(new ph(a)), e.characterSpacing && this.push(new hh(e.characterSpacing)), e.emboss !== void 0 && this.push(new ue("w:emboss", e.emboss)), e.imprint !== void 0 && this.push(new ue("w:imprint", e.imprint)), e.shading && this.push(new vn(e.shading)), e.revision && this.push(new vh(e.revision)), e.border && this.push(new Ae("w:bdr", e.border)), e.snapToGrid !== void 0 && this.push(new ue("w:snapToGrid", e.snapToGrid)), e.vanish && this.push(new ue("w:vanish", e.vanish)), e.specVanish && this.push(new ue("w:specVanish", e.vanish)), e.scale !== void 0 && this.push(new kr("w:w", e.scale)), e.language && this.push(mh(e.language)), e.math && this.push(new ue("w:oMath", e.math));
  }
  push(e) {
    this.root.push(e);
  }
}
class vh extends ae {
  constructor(e) {
    super("w:rPrChange"), this.root.push(
      new oh({
        id: e.id,
        author: e.author,
        date: e.date
      })
    ), this.addChildElement(new Vt(e));
  }
}
class ko extends ae {
  constructor(e) {
    var r;
    super("w:t"), typeof e == "string" ? (this.root.push(new lr({ space: ur.PRESERVE })), this.root.push(e)) : (this.root.push(new lr({ space: (r = e.space) != null ? r : ur.DEFAULT })), this.root.push(e.text));
  }
}
const Xr = {
  CURRENT: "CURRENT",
  TOTAL_PAGES: "TOTAL_PAGES",
  TOTAL_PAGES_IN_SECTION: "TOTAL_PAGES_IN_SECTION",
  CURRENT_SECTION: "SECTION"
};
class _n extends ae {
  constructor(e) {
    if (super("w:r"), ie(this, "properties"), this.properties = new Vt(e), this.root.push(this.properties), e.break)
      for (let r = 0; r < e.break; r++)
        this.root.push(new th());
    if (e.children)
      for (const r of e.children) {
        if (typeof r == "string") {
          switch (r) {
            case Xr.CURRENT:
              this.root.push(new Kr()), this.root.push(new rh()), this.root.push(new $r()), this.root.push(new Zr());
              break;
            case Xr.TOTAL_PAGES:
              this.root.push(new Kr()), this.root.push(new nh()), this.root.push(new $r()), this.root.push(new Zr());
              break;
            case Xr.TOTAL_PAGES_IN_SECTION:
              this.root.push(new Kr()), this.root.push(new ih()), this.root.push(new $r()), this.root.push(new Zr());
              break;
            case Xr.CURRENT_SECTION:
              this.root.push(new Kr()), this.root.push(new sh()), this.root.push(new $r()), this.root.push(new Zr());
              break;
            default:
              this.root.push(new ko(r));
              break;
          }
          continue;
        }
        this.root.push(r);
      }
    else e.text !== void 0 && this.root.push(new ko(e.text));
  }
}
class We extends _n {
  constructor(e) {
    super(typeof e == "string" ? { text: e } : e);
  }
}
var Yi = {}, ke = {}, qi, Ao;
function Pr() {
  if (Ao) return qi;
  Ao = 1, qi = t;
  function t(e, r) {
    if (!e)
      throw new Error(r || "Assertion failed");
  }
  return t.equal = function(r, n, i) {
    if (r != n)
      throw new Error(i || "Assertion failed: " + r + " != " + n);
  }, qi;
}
var Ro;
function ct() {
  if (Ro) return ke;
  Ro = 1;
  var t = Pr(), e = Mt();
  ke.inherits = e;
  function r(N, U) {
    return (N.charCodeAt(U) & 64512) !== 55296 || U < 0 || U + 1 >= N.length ? !1 : (N.charCodeAt(U + 1) & 64512) === 56320;
  }
  function n(N, U) {
    if (Array.isArray(N))
      return N.slice();
    if (!N)
      return [];
    var v = [];
    if (typeof N == "string")
      if (U) {
        if (U === "hex")
          for (N = N.replace(/[^a-z0-9]+/ig, ""), N.length % 2 !== 0 && (N = "0" + N), Q = 0; Q < N.length; Q += 2)
            v.push(parseInt(N[Q] + N[Q + 1], 16));
      } else for (var V = 0, Q = 0; Q < N.length; Q++) {
        var j = N.charCodeAt(Q);
        j < 128 ? v[V++] = j : j < 2048 ? (v[V++] = j >> 6 | 192, v[V++] = j & 63 | 128) : r(N, Q) ? (j = 65536 + ((j & 1023) << 10) + (N.charCodeAt(++Q) & 1023), v[V++] = j >> 18 | 240, v[V++] = j >> 12 & 63 | 128, v[V++] = j >> 6 & 63 | 128, v[V++] = j & 63 | 128) : (v[V++] = j >> 12 | 224, v[V++] = j >> 6 & 63 | 128, v[V++] = j & 63 | 128);
      }
    else
      for (Q = 0; Q < N.length; Q++)
        v[Q] = N[Q] | 0;
    return v;
  }
  ke.toArray = n;
  function i(N) {
    for (var U = "", v = 0; v < N.length; v++)
      U += s(N[v].toString(16));
    return U;
  }
  ke.toHex = i;
  function a(N) {
    var U = N >>> 24 | N >>> 8 & 65280 | N << 8 & 16711680 | (N & 255) << 24;
    return U >>> 0;
  }
  ke.htonl = a;
  function l(N, U) {
    for (var v = "", V = 0; V < N.length; V++) {
      var Q = N[V];
      U === "little" && (Q = a(Q)), v += c(Q.toString(16));
    }
    return v;
  }
  ke.toHex32 = l;
  function s(N) {
    return N.length === 1 ? "0" + N : N;
  }
  ke.zero2 = s;
  function c(N) {
    return N.length === 7 ? "0" + N : N.length === 6 ? "00" + N : N.length === 5 ? "000" + N : N.length === 4 ? "0000" + N : N.length === 3 ? "00000" + N : N.length === 2 ? "000000" + N : N.length === 1 ? "0000000" + N : N;
  }
  ke.zero8 = c;
  function b(N, U, v, V) {
    var Q = v - U;
    t(Q % 4 === 0);
    for (var j = new Array(Q / 4), te = 0, X = U; te < j.length; te++, X += 4) {
      var oe;
      V === "big" ? oe = N[X] << 24 | N[X + 1] << 16 | N[X + 2] << 8 | N[X + 3] : oe = N[X + 3] << 24 | N[X + 2] << 16 | N[X + 1] << 8 | N[X], j[te] = oe >>> 0;
    }
    return j;
  }
  ke.join32 = b;
  function S(N, U) {
    for (var v = new Array(N.length * 4), V = 0, Q = 0; V < N.length; V++, Q += 4) {
      var j = N[V];
      U === "big" ? (v[Q] = j >>> 24, v[Q + 1] = j >>> 16 & 255, v[Q + 2] = j >>> 8 & 255, v[Q + 3] = j & 255) : (v[Q + 3] = j >>> 24, v[Q + 2] = j >>> 16 & 255, v[Q + 1] = j >>> 8 & 255, v[Q] = j & 255);
    }
    return v;
  }
  ke.split32 = S;
  function A(N, U) {
    return N >>> U | N << 32 - U;
  }
  ke.rotr32 = A;
  function R(N, U) {
    return N << U | N >>> 32 - U;
  }
  ke.rotl32 = R;
  function _(N, U) {
    return N + U >>> 0;
  }
  ke.sum32 = _;
  function k(N, U, v) {
    return N + U + v >>> 0;
  }
  ke.sum32_3 = k;
  function d(N, U, v, V) {
    return N + U + v + V >>> 0;
  }
  ke.sum32_4 = d;
  function O(N, U, v, V, Q) {
    return N + U + v + V + Q >>> 0;
  }
  ke.sum32_5 = O;
  function h(N, U, v, V) {
    var Q = N[U], j = N[U + 1], te = V + j >>> 0, X = (te < V ? 1 : 0) + v + Q;
    N[U] = X >>> 0, N[U + 1] = te;
  }
  ke.sum64 = h;
  function g(N, U, v, V) {
    var Q = U + V >>> 0, j = (Q < U ? 1 : 0) + N + v;
    return j >>> 0;
  }
  ke.sum64_hi = g;
  function w(N, U, v, V) {
    var Q = U + V;
    return Q >>> 0;
  }
  ke.sum64_lo = w;
  function f(N, U, v, V, Q, j, te, X) {
    var oe = 0, Y = U;
    Y = Y + V >>> 0, oe += Y < U ? 1 : 0, Y = Y + j >>> 0, oe += Y < j ? 1 : 0, Y = Y + X >>> 0, oe += Y < X ? 1 : 0;
    var C = N + v + Q + te + oe;
    return C >>> 0;
  }
  ke.sum64_4_hi = f;
  function T(N, U, v, V, Q, j, te, X) {
    var oe = U + V + j + X;
    return oe >>> 0;
  }
  ke.sum64_4_lo = T;
  function P(N, U, v, V, Q, j, te, X, oe, Y) {
    var C = 0, K = U;
    K = K + V >>> 0, C += K < U ? 1 : 0, K = K + j >>> 0, C += K < j ? 1 : 0, K = K + X >>> 0, C += K < X ? 1 : 0, K = K + Y >>> 0, C += K < Y ? 1 : 0;
    var $ = N + v + Q + te + oe + C;
    return $ >>> 0;
  }
  ke.sum64_5_hi = P;
  function L(N, U, v, V, Q, j, te, X, oe, Y) {
    var C = U + V + j + X + Y;
    return C >>> 0;
  }
  ke.sum64_5_lo = L;
  function H(N, U, v) {
    var V = U << 32 - v | N >>> v;
    return V >>> 0;
  }
  ke.rotr64_hi = H;
  function D(N, U, v) {
    var V = N << 32 - v | U >>> v;
    return V >>> 0;
  }
  ke.rotr64_lo = D;
  function Z(N, U, v) {
    return N >>> v;
  }
  ke.shr64_hi = Z;
  function ce(N, U, v) {
    var V = N << 32 - v | U >>> v;
    return V >>> 0;
  }
  return ke.shr64_lo = ce, ke;
}
var Gi = {}, Oo;
function Mr() {
  if (Oo) return Gi;
  Oo = 1;
  var t = ct(), e = Pr();
  function r() {
    this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
  }
  return Gi.BlockHash = r, r.prototype.update = function(i, a) {
    if (i = t.toArray(i, a), this.pending ? this.pending = this.pending.concat(i) : this.pending = i, this.pendingTotal += i.length, this.pending.length >= this._delta8) {
      i = this.pending;
      var l = i.length % this._delta8;
      this.pending = i.slice(i.length - l, i.length), this.pending.length === 0 && (this.pending = null), i = t.join32(i, 0, i.length - l, this.endian);
      for (var s = 0; s < i.length; s += this._delta32)
        this._update(i, s, s + this._delta32);
    }
    return this;
  }, r.prototype.digest = function(i) {
    return this.update(this._pad()), e(this.pending === null), this._digest(i);
  }, r.prototype._pad = function() {
    var i = this.pendingTotal, a = this._delta8, l = a - (i + this.padLength) % a, s = new Array(l + this.padLength);
    s[0] = 128;
    for (var c = 1; c < l; c++)
      s[c] = 0;
    if (i <<= 3, this.endian === "big") {
      for (var b = 8; b < this.padLength; b++)
        s[c++] = 0;
      s[c++] = 0, s[c++] = 0, s[c++] = 0, s[c++] = 0, s[c++] = i >>> 24 & 255, s[c++] = i >>> 16 & 255, s[c++] = i >>> 8 & 255, s[c++] = i & 255;
    } else
      for (s[c++] = i & 255, s[c++] = i >>> 8 & 255, s[c++] = i >>> 16 & 255, s[c++] = i >>> 24 & 255, s[c++] = 0, s[c++] = 0, s[c++] = 0, s[c++] = 0, b = 8; b < this.padLength; b++)
        s[c++] = 0;
    return s;
  }, Gi;
}
var Ut = {}, nt = {}, Do;
function Mu() {
  if (Do) return nt;
  Do = 1;
  var t = ct(), e = t.rotr32;
  function r(S, A, R, _) {
    if (S === 0)
      return n(A, R, _);
    if (S === 1 || S === 3)
      return a(A, R, _);
    if (S === 2)
      return i(A, R, _);
  }
  nt.ft_1 = r;
  function n(S, A, R) {
    return S & A ^ ~S & R;
  }
  nt.ch32 = n;
  function i(S, A, R) {
    return S & A ^ S & R ^ A & R;
  }
  nt.maj32 = i;
  function a(S, A, R) {
    return S ^ A ^ R;
  }
  nt.p32 = a;
  function l(S) {
    return e(S, 2) ^ e(S, 13) ^ e(S, 22);
  }
  nt.s0_256 = l;
  function s(S) {
    return e(S, 6) ^ e(S, 11) ^ e(S, 25);
  }
  nt.s1_256 = s;
  function c(S) {
    return e(S, 7) ^ e(S, 18) ^ S >>> 3;
  }
  nt.g0_256 = c;
  function b(S) {
    return e(S, 17) ^ e(S, 19) ^ S >>> 10;
  }
  return nt.g1_256 = b, nt;
}
var Vi, No;
function _h() {
  if (No) return Vi;
  No = 1;
  var t = ct(), e = Mr(), r = Mu(), n = t.rotl32, i = t.sum32, a = t.sum32_5, l = r.ft_1, s = e.BlockHash, c = [
    1518500249,
    1859775393,
    2400959708,
    3395469782
  ];
  function b() {
    if (!(this instanceof b))
      return new b();
    s.call(this), this.h = [
      1732584193,
      4023233417,
      2562383102,
      271733878,
      3285377520
    ], this.W = new Array(80);
  }
  return t.inherits(b, s), Vi = b, b.blockSize = 512, b.outSize = 160, b.hmacStrength = 80, b.padLength = 64, b.prototype._update = function(A, R) {
    for (var _ = this.W, k = 0; k < 16; k++)
      _[k] = A[R + k];
    for (; k < _.length; k++)
      _[k] = n(_[k - 3] ^ _[k - 8] ^ _[k - 14] ^ _[k - 16], 1);
    var d = this.h[0], O = this.h[1], h = this.h[2], g = this.h[3], w = this.h[4];
    for (k = 0; k < _.length; k++) {
      var f = ~~(k / 20), T = a(n(d, 5), l(f, O, h, g), w, _[k], c[f]);
      w = g, g = h, h = n(O, 30), O = d, d = T;
    }
    this.h[0] = i(this.h[0], d), this.h[1] = i(this.h[1], O), this.h[2] = i(this.h[2], h), this.h[3] = i(this.h[3], g), this.h[4] = i(this.h[4], w);
  }, b.prototype._digest = function(A) {
    return A === "hex" ? t.toHex32(this.h, "big") : t.split32(this.h, "big");
  }, Vi;
}
var Ki, Co;
function Lu() {
  if (Co) return Ki;
  Co = 1;
  var t = ct(), e = Mr(), r = Mu(), n = Pr(), i = t.sum32, a = t.sum32_4, l = t.sum32_5, s = r.ch32, c = r.maj32, b = r.s0_256, S = r.s1_256, A = r.g0_256, R = r.g1_256, _ = e.BlockHash, k = [
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ];
  function d() {
    if (!(this instanceof d))
      return new d();
    _.call(this), this.h = [
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ], this.k = k, this.W = new Array(64);
  }
  return t.inherits(d, _), Ki = d, d.blockSize = 512, d.outSize = 256, d.hmacStrength = 192, d.padLength = 64, d.prototype._update = function(h, g) {
    for (var w = this.W, f = 0; f < 16; f++)
      w[f] = h[g + f];
    for (; f < w.length; f++)
      w[f] = a(R(w[f - 2]), w[f - 7], A(w[f - 15]), w[f - 16]);
    var T = this.h[0], P = this.h[1], L = this.h[2], H = this.h[3], D = this.h[4], Z = this.h[5], ce = this.h[6], N = this.h[7];
    for (n(this.k.length === w.length), f = 0; f < w.length; f++) {
      var U = l(N, S(D), s(D, Z, ce), this.k[f], w[f]), v = i(b(T), c(T, P, L));
      N = ce, ce = Z, Z = D, D = i(H, U), H = L, L = P, P = T, T = i(U, v);
    }
    this.h[0] = i(this.h[0], T), this.h[1] = i(this.h[1], P), this.h[2] = i(this.h[2], L), this.h[3] = i(this.h[3], H), this.h[4] = i(this.h[4], D), this.h[5] = i(this.h[5], Z), this.h[6] = i(this.h[6], ce), this.h[7] = i(this.h[7], N);
  }, d.prototype._digest = function(h) {
    return h === "hex" ? t.toHex32(this.h, "big") : t.split32(this.h, "big");
  }, Ki;
}
var $i, Io;
function bh() {
  if (Io) return $i;
  Io = 1;
  var t = ct(), e = Lu();
  function r() {
    if (!(this instanceof r))
      return new r();
    e.call(this), this.h = [
      3238371032,
      914150663,
      812702999,
      4144912697,
      4290775857,
      1750603025,
      1694076839,
      3204075428
    ];
  }
  return t.inherits(r, e), $i = r, r.blockSize = 512, r.outSize = 224, r.hmacStrength = 192, r.padLength = 64, r.prototype._digest = function(i) {
    return i === "hex" ? t.toHex32(this.h.slice(0, 7), "big") : t.split32(this.h.slice(0, 7), "big");
  }, $i;
}
var Zi, Fo;
function Bu() {
  if (Fo) return Zi;
  Fo = 1;
  var t = ct(), e = Mr(), r = Pr(), n = t.rotr64_hi, i = t.rotr64_lo, a = t.shr64_hi, l = t.shr64_lo, s = t.sum64, c = t.sum64_hi, b = t.sum64_lo, S = t.sum64_4_hi, A = t.sum64_4_lo, R = t.sum64_5_hi, _ = t.sum64_5_lo, k = e.BlockHash, d = [
    1116352408,
    3609767458,
    1899447441,
    602891725,
    3049323471,
    3964484399,
    3921009573,
    2173295548,
    961987163,
    4081628472,
    1508970993,
    3053834265,
    2453635748,
    2937671579,
    2870763221,
    3664609560,
    3624381080,
    2734883394,
    310598401,
    1164996542,
    607225278,
    1323610764,
    1426881987,
    3590304994,
    1925078388,
    4068182383,
    2162078206,
    991336113,
    2614888103,
    633803317,
    3248222580,
    3479774868,
    3835390401,
    2666613458,
    4022224774,
    944711139,
    264347078,
    2341262773,
    604807628,
    2007800933,
    770255983,
    1495990901,
    1249150122,
    1856431235,
    1555081692,
    3175218132,
    1996064986,
    2198950837,
    2554220882,
    3999719339,
    2821834349,
    766784016,
    2952996808,
    2566594879,
    3210313671,
    3203337956,
    3336571891,
    1034457026,
    3584528711,
    2466948901,
    113926993,
    3758326383,
    338241895,
    168717936,
    666307205,
    1188179964,
    773529912,
    1546045734,
    1294757372,
    1522805485,
    1396182291,
    2643833823,
    1695183700,
    2343527390,
    1986661051,
    1014477480,
    2177026350,
    1206759142,
    2456956037,
    344077627,
    2730485921,
    1290863460,
    2820302411,
    3158454273,
    3259730800,
    3505952657,
    3345764771,
    106217008,
    3516065817,
    3606008344,
    3600352804,
    1432725776,
    4094571909,
    1467031594,
    275423344,
    851169720,
    430227734,
    3100823752,
    506948616,
    1363258195,
    659060556,
    3750685593,
    883997877,
    3785050280,
    958139571,
    3318307427,
    1322822218,
    3812723403,
    1537002063,
    2003034995,
    1747873779,
    3602036899,
    1955562222,
    1575990012,
    2024104815,
    1125592928,
    2227730452,
    2716904306,
    2361852424,
    442776044,
    2428436474,
    593698344,
    2756734187,
    3733110249,
    3204031479,
    2999351573,
    3329325298,
    3815920427,
    3391569614,
    3928383900,
    3515267271,
    566280711,
    3940187606,
    3454069534,
    4118630271,
    4000239992,
    116418474,
    1914138554,
    174292421,
    2731055270,
    289380356,
    3203993006,
    460393269,
    320620315,
    685471733,
    587496836,
    852142971,
    1086792851,
    1017036298,
    365543100,
    1126000580,
    2618297676,
    1288033470,
    3409855158,
    1501505948,
    4234509866,
    1607167915,
    987167468,
    1816402316,
    1246189591
  ];
  function O() {
    if (!(this instanceof O))
      return new O();
    k.call(this), this.h = [
      1779033703,
      4089235720,
      3144134277,
      2227873595,
      1013904242,
      4271175723,
      2773480762,
      1595750129,
      1359893119,
      2917565137,
      2600822924,
      725511199,
      528734635,
      4215389547,
      1541459225,
      327033209
    ], this.k = d, this.W = new Array(160);
  }
  t.inherits(O, k), Zi = O, O.blockSize = 1024, O.outSize = 512, O.hmacStrength = 192, O.padLength = 128, O.prototype._prepareBlock = function(v, V) {
    for (var Q = this.W, j = 0; j < 32; j++)
      Q[j] = v[V + j];
    for (; j < Q.length; j += 2) {
      var te = ce(Q[j - 4], Q[j - 3]), X = N(Q[j - 4], Q[j - 3]), oe = Q[j - 14], Y = Q[j - 13], C = D(Q[j - 30], Q[j - 29]), K = Z(Q[j - 30], Q[j - 29]), $ = Q[j - 32], re = Q[j - 31];
      Q[j] = S(
        te,
        X,
        oe,
        Y,
        C,
        K,
        $,
        re
      ), Q[j + 1] = A(
        te,
        X,
        oe,
        Y,
        C,
        K,
        $,
        re
      );
    }
  }, O.prototype._update = function(v, V) {
    this._prepareBlock(v, V);
    var Q = this.W, j = this.h[0], te = this.h[1], X = this.h[2], oe = this.h[3], Y = this.h[4], C = this.h[5], K = this.h[6], $ = this.h[7], re = this.h[8], G = this.h[9], x = this.h[10], y = this.h[11], z = this.h[12], B = this.h[13], I = this.h[14], F = this.h[15];
    r(this.k.length === Q.length);
    for (var ee = 0; ee < Q.length; ee += 2) {
      var m = I, J = F, E = L(re, G), o = H(re, G), u = h(re, G, x, y, z), p = g(re, G, x, y, z, B), M = this.k[ee], q = this.k[ee + 1], W = Q[ee], ne = Q[ee + 1], le = R(
        m,
        J,
        E,
        o,
        u,
        p,
        M,
        q,
        W,
        ne
      ), se = _(
        m,
        J,
        E,
        o,
        u,
        p,
        M,
        q,
        W,
        ne
      );
      m = T(j, te), J = P(j, te), E = w(j, te, X, oe, Y), o = f(j, te, X, oe, Y, C);
      var fe = c(m, J, E, o), me = b(m, J, E, o);
      I = z, F = B, z = x, B = y, x = re, y = G, re = c(K, $, le, se), G = b($, $, le, se), K = Y, $ = C, Y = X, C = oe, X = j, oe = te, j = c(le, se, fe, me), te = b(le, se, fe, me);
    }
    s(this.h, 0, j, te), s(this.h, 2, X, oe), s(this.h, 4, Y, C), s(this.h, 6, K, $), s(this.h, 8, re, G), s(this.h, 10, x, y), s(this.h, 12, z, B), s(this.h, 14, I, F);
  }, O.prototype._digest = function(v) {
    return v === "hex" ? t.toHex32(this.h, "big") : t.split32(this.h, "big");
  };
  function h(U, v, V, Q, j) {
    var te = U & V ^ ~U & j;
    return te < 0 && (te += 4294967296), te;
  }
  function g(U, v, V, Q, j, te) {
    var X = v & Q ^ ~v & te;
    return X < 0 && (X += 4294967296), X;
  }
  function w(U, v, V, Q, j) {
    var te = U & V ^ U & j ^ V & j;
    return te < 0 && (te += 4294967296), te;
  }
  function f(U, v, V, Q, j, te) {
    var X = v & Q ^ v & te ^ Q & te;
    return X < 0 && (X += 4294967296), X;
  }
  function T(U, v) {
    var V = n(U, v, 28), Q = n(v, U, 2), j = n(v, U, 7), te = V ^ Q ^ j;
    return te < 0 && (te += 4294967296), te;
  }
  function P(U, v) {
    var V = i(U, v, 28), Q = i(v, U, 2), j = i(v, U, 7), te = V ^ Q ^ j;
    return te < 0 && (te += 4294967296), te;
  }
  function L(U, v) {
    var V = n(U, v, 14), Q = n(U, v, 18), j = n(v, U, 9), te = V ^ Q ^ j;
    return te < 0 && (te += 4294967296), te;
  }
  function H(U, v) {
    var V = i(U, v, 14), Q = i(U, v, 18), j = i(v, U, 9), te = V ^ Q ^ j;
    return te < 0 && (te += 4294967296), te;
  }
  function D(U, v) {
    var V = n(U, v, 1), Q = n(U, v, 8), j = a(U, v, 7), te = V ^ Q ^ j;
    return te < 0 && (te += 4294967296), te;
  }
  function Z(U, v) {
    var V = i(U, v, 1), Q = i(U, v, 8), j = l(U, v, 7), te = V ^ Q ^ j;
    return te < 0 && (te += 4294967296), te;
  }
  function ce(U, v) {
    var V = n(U, v, 19), Q = n(v, U, 29), j = a(U, v, 6), te = V ^ Q ^ j;
    return te < 0 && (te += 4294967296), te;
  }
  function N(U, v) {
    var V = i(U, v, 19), Q = i(v, U, 29), j = l(U, v, 6), te = V ^ Q ^ j;
    return te < 0 && (te += 4294967296), te;
  }
  return Zi;
}
var Xi, Po;
function xh() {
  if (Po) return Xi;
  Po = 1;
  var t = ct(), e = Bu();
  function r() {
    if (!(this instanceof r))
      return new r();
    e.call(this), this.h = [
      3418070365,
      3238371032,
      1654270250,
      914150663,
      2438529370,
      812702999,
      355462360,
      4144912697,
      1731405415,
      4290775857,
      2394180231,
      1750603025,
      3675008525,
      1694076839,
      1203062813,
      3204075428
    ];
  }
  return t.inherits(r, e), Xi = r, r.blockSize = 1024, r.outSize = 384, r.hmacStrength = 192, r.padLength = 128, r.prototype._digest = function(i) {
    return i === "hex" ? t.toHex32(this.h.slice(0, 12), "big") : t.split32(this.h.slice(0, 12), "big");
  }, Xi;
}
var Mo;
function Sh() {
  return Mo || (Mo = 1, Ut.sha1 = _h(), Ut.sha224 = bh(), Ut.sha256 = Lu(), Ut.sha384 = xh(), Ut.sha512 = Bu()), Ut;
}
var Ji = {}, Lo;
function Eh() {
  if (Lo) return Ji;
  Lo = 1;
  var t = ct(), e = Mr(), r = t.rotl32, n = t.sum32, i = t.sum32_3, a = t.sum32_4, l = e.BlockHash;
  function s() {
    if (!(this instanceof s))
      return new s();
    l.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little";
  }
  t.inherits(s, l), Ji.ripemd160 = s, s.blockSize = 512, s.outSize = 160, s.hmacStrength = 192, s.padLength = 64, s.prototype._update = function(O, h) {
    for (var g = this.h[0], w = this.h[1], f = this.h[2], T = this.h[3], P = this.h[4], L = g, H = w, D = f, Z = T, ce = P, N = 0; N < 80; N++) {
      var U = n(
        r(
          a(g, c(N, w, f, T), O[A[N] + h], b(N)),
          _[N]
        ),
        P
      );
      g = P, P = T, T = r(f, 10), f = w, w = U, U = n(
        r(
          a(L, c(79 - N, H, D, Z), O[R[N] + h], S(N)),
          k[N]
        ),
        ce
      ), L = ce, ce = Z, Z = r(D, 10), D = H, H = U;
    }
    U = i(this.h[1], f, Z), this.h[1] = i(this.h[2], T, ce), this.h[2] = i(this.h[3], P, L), this.h[3] = i(this.h[4], g, H), this.h[4] = i(this.h[0], w, D), this.h[0] = U;
  }, s.prototype._digest = function(O) {
    return O === "hex" ? t.toHex32(this.h, "little") : t.split32(this.h, "little");
  };
  function c(d, O, h, g) {
    return d <= 15 ? O ^ h ^ g : d <= 31 ? O & h | ~O & g : d <= 47 ? (O | ~h) ^ g : d <= 63 ? O & g | h & ~g : O ^ (h | ~g);
  }
  function b(d) {
    return d <= 15 ? 0 : d <= 31 ? 1518500249 : d <= 47 ? 1859775393 : d <= 63 ? 2400959708 : 2840853838;
  }
  function S(d) {
    return d <= 15 ? 1352829926 : d <= 31 ? 1548603684 : d <= 47 ? 1836072691 : d <= 63 ? 2053994217 : 0;
  }
  var A = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    7,
    4,
    13,
    1,
    10,
    6,
    15,
    3,
    12,
    0,
    9,
    5,
    2,
    14,
    11,
    8,
    3,
    10,
    14,
    4,
    9,
    15,
    8,
    1,
    2,
    7,
    0,
    6,
    13,
    11,
    5,
    12,
    1,
    9,
    11,
    10,
    0,
    8,
    12,
    4,
    13,
    3,
    7,
    15,
    14,
    5,
    6,
    2,
    4,
    0,
    5,
    9,
    7,
    12,
    2,
    10,
    14,
    1,
    3,
    8,
    11,
    6,
    15,
    13
  ], R = [
    5,
    14,
    7,
    0,
    9,
    2,
    11,
    4,
    13,
    6,
    15,
    8,
    1,
    10,
    3,
    12,
    6,
    11,
    3,
    7,
    0,
    13,
    5,
    10,
    14,
    15,
    8,
    12,
    4,
    9,
    1,
    2,
    15,
    5,
    1,
    3,
    7,
    14,
    6,
    9,
    11,
    8,
    12,
    2,
    10,
    0,
    4,
    13,
    8,
    6,
    4,
    1,
    3,
    11,
    15,
    0,
    5,
    12,
    2,
    13,
    9,
    7,
    10,
    14,
    12,
    15,
    10,
    4,
    1,
    5,
    8,
    7,
    6,
    2,
    13,
    14,
    0,
    3,
    9,
    11
  ], _ = [
    11,
    14,
    15,
    12,
    5,
    8,
    7,
    9,
    11,
    13,
    14,
    15,
    6,
    7,
    9,
    8,
    7,
    6,
    8,
    13,
    11,
    9,
    7,
    15,
    7,
    12,
    15,
    9,
    11,
    7,
    13,
    12,
    11,
    13,
    6,
    7,
    14,
    9,
    13,
    15,
    14,
    8,
    13,
    6,
    5,
    12,
    7,
    5,
    11,
    12,
    14,
    15,
    14,
    15,
    9,
    8,
    9,
    14,
    5,
    6,
    8,
    6,
    5,
    12,
    9,
    15,
    5,
    11,
    6,
    8,
    13,
    12,
    5,
    12,
    13,
    14,
    11,
    8,
    5,
    6
  ], k = [
    8,
    9,
    9,
    11,
    13,
    15,
    15,
    5,
    7,
    7,
    8,
    11,
    14,
    14,
    12,
    6,
    9,
    13,
    15,
    7,
    12,
    8,
    9,
    11,
    7,
    7,
    12,
    7,
    6,
    15,
    13,
    11,
    9,
    7,
    15,
    11,
    8,
    6,
    6,
    14,
    12,
    13,
    5,
    14,
    13,
    13,
    7,
    5,
    15,
    5,
    8,
    11,
    14,
    14,
    6,
    14,
    6,
    9,
    12,
    9,
    12,
    5,
    15,
    8,
    8,
    5,
    12,
    9,
    12,
    5,
    14,
    6,
    8,
    13,
    6,
    5,
    15,
    13,
    11,
    11
  ];
  return Ji;
}
var Qi, Bo;
function Th() {
  if (Bo) return Qi;
  Bo = 1;
  var t = ct(), e = Pr();
  function r(n, i, a) {
    if (!(this instanceof r))
      return new r(n, i, a);
    this.Hash = n, this.blockSize = n.blockSize / 8, this.outSize = n.outSize / 8, this.inner = null, this.outer = null, this._init(t.toArray(i, a));
  }
  return Qi = r, r.prototype._init = function(i) {
    i.length > this.blockSize && (i = new this.Hash().update(i).digest()), e(i.length <= this.blockSize);
    for (var a = i.length; a < this.blockSize; a++)
      i.push(0);
    for (a = 0; a < i.length; a++)
      i[a] ^= 54;
    for (this.inner = new this.Hash().update(i), a = 0; a < i.length; a++)
      i[a] ^= 106;
    this.outer = new this.Hash().update(i);
  }, r.prototype.update = function(i, a) {
    return this.inner.update(i, a), this;
  }, r.prototype.digest = function(i) {
    return this.outer.update(this.inner.digest()), this.outer.digest(i);
  }, Qi;
}
var Uo;
function kh() {
  return Uo || (Uo = 1, function(t) {
    var e = t;
    e.utils = ct(), e.common = Mr(), e.sha = Sh(), e.ripemd = Eh(), e.hmac = Th(), e.sha1 = e.sha.sha1, e.sha256 = e.sha.sha256, e.sha224 = e.sha.sha224, e.sha384 = e.sha.sha384, e.sha512 = e.sha.sha512, e.ripemd160 = e.ripemd.ripemd160;
  }(Yi)), Yi;
}
kh();
let Ah = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", Rh = (t, e = 21) => (r = e) => {
  let n = "", i = r | 0;
  for (; i--; )
    n += t[Math.random() * t.length | 0];
  return n;
}, Oh = (t = 21) => {
  let e = "", r = t | 0;
  for (; r--; )
    e += Ah[Math.random() * 64 | 0];
  return e;
};
const Xe = (t) => Math.floor(t * 72 * 20), Us = (t = 0) => {
  let e = t;
  return () => ++e;
}, Dh = () => Us(), Nh = () => Us(1), Ch = () => Us(), Ih = () => Oh().toLowerCase(), br = (t) => Rh("1234567890abcdef", t)(), Fh = () => `${br(8)}-${br(4)}-${br(4)}-${br(4)}-${br(12)}`;
class Ph extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", { id: "w:id", initials: "w:initials", author: "w:author", date: "w:date" });
  }
}
class Mh extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      "xmlns:cx": "xmlns:cx",
      "xmlns:cx1": "xmlns:cx1",
      "xmlns:cx2": "xmlns:cx2",
      "xmlns:cx3": "xmlns:cx3",
      "xmlns:cx4": "xmlns:cx4",
      "xmlns:cx5": "xmlns:cx5",
      "xmlns:cx6": "xmlns:cx6",
      "xmlns:cx7": "xmlns:cx7",
      "xmlns:cx8": "xmlns:cx8",
      "xmlns:mc": "xmlns:mc",
      "xmlns:aink": "xmlns:aink",
      "xmlns:am3d": "xmlns:am3d",
      "xmlns:o": "xmlns:o",
      "xmlns:r": "xmlns:r",
      "xmlns:m": "xmlns:m",
      "xmlns:v": "xmlns:v",
      "xmlns:wp14": "xmlns:wp14",
      "xmlns:wp": "xmlns:wp",
      "xmlns:w10": "xmlns:w10",
      "xmlns:w": "xmlns:w",
      "xmlns:w14": "xmlns:w14",
      "xmlns:w15": "xmlns:w15",
      "xmlns:w16cex": "xmlns:w16cex",
      "xmlns:w16cid": "xmlns:w16cid",
      "xmlns:w16": "xmlns:w16",
      "xmlns:w16sdtdh": "xmlns:w16sdtdh",
      "xmlns:w16se": "xmlns:w16se",
      "xmlns:wpg": "xmlns:wpg",
      "xmlns:wpi": "xmlns:wpi",
      "xmlns:wne": "xmlns:wne",
      "xmlns:wps": "xmlns:wps"
    });
  }
}
class Lh extends ae {
  constructor({ id: e, initials: r, author: n, date: i = /* @__PURE__ */ new Date(), children: a }) {
    super("w:comment"), this.root.push(
      new Ph({
        id: e,
        initials: r,
        author: n,
        date: i.toISOString()
      })
    );
    for (const l of a)
      this.root.push(l);
  }
}
class Bh extends ae {
  constructor({ children: e }) {
    super("w:comments"), this.root.push(
      new Mh({
        "xmlns:cx": "http://schemas.microsoft.com/office/drawing/2014/chartex",
        "xmlns:cx1": "http://schemas.microsoft.com/office/drawing/2015/9/8/chartex",
        "xmlns:cx2": "http://schemas.microsoft.com/office/drawing/2015/10/21/chartex",
        "xmlns:cx3": "http://schemas.microsoft.com/office/drawing/2016/5/9/chartex",
        "xmlns:cx4": "http://schemas.microsoft.com/office/drawing/2016/5/10/chartex",
        "xmlns:cx5": "http://schemas.microsoft.com/office/drawing/2016/5/11/chartex",
        "xmlns:cx6": "http://schemas.microsoft.com/office/drawing/2016/5/12/chartex",
        "xmlns:cx7": "http://schemas.microsoft.com/office/drawing/2016/5/13/chartex",
        "xmlns:cx8": "http://schemas.microsoft.com/office/drawing/2016/5/14/chartex",
        "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
        "xmlns:aink": "http://schemas.microsoft.com/office/drawing/2016/ink",
        "xmlns:am3d": "http://schemas.microsoft.com/office/drawing/2017/model3d",
        "xmlns:o": "urn:schemas-microsoft-com:office:office",
        "xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
        "xmlns:m": "http://schemas.openxmlformats.org/officeDocument/2006/math",
        "xmlns:v": "urn:schemas-microsoft-com:vml",
        "xmlns:wp14": "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
        "xmlns:wp": "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
        "xmlns:w10": "urn:schemas-microsoft-com:office:word",
        "xmlns:w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
        "xmlns:w14": "http://schemas.microsoft.com/office/word/2010/wordml",
        "xmlns:w15": "http://schemas.microsoft.com/office/word/2012/wordml",
        "xmlns:w16cex": "http://schemas.microsoft.com/office/word/2018/wordml/cex",
        "xmlns:w16cid": "http://schemas.microsoft.com/office/word/2016/wordml/cid",
        "xmlns:w16": "http://schemas.microsoft.com/office/word/2018/wordml",
        "xmlns:w16sdtdh": "http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash",
        "xmlns:w16se": "http://schemas.microsoft.com/office/word/2015/wordml/symex",
        "xmlns:wpg": "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
        "xmlns:wpi": "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
        "xmlns:wne": "http://schemas.microsoft.com/office/word/2006/wordml",
        "xmlns:wps": "http://schemas.microsoft.com/office/word/2010/wordprocessingShape"
      })
    );
    for (const r of e)
      this.root.push(new Lh(r));
  }
}
class Uh extends ae {
  constructor() {
    super("w:pageBreakBefore");
  }
}
const ms = {
  AUTO: "auto"
};
class Wh extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      after: "w:after",
      before: "w:before",
      line: "w:line",
      lineRule: "w:lineRule",
      beforeAutoSpacing: "w:beforeAutospacing",
      afterAutoSpacing: "w:afterAutoSpacing"
    });
  }
}
class jh extends ae {
  constructor(e) {
    super("w:spacing"), this.root.push(new Wh(e));
  }
}
let Jr = class extends ae {
  constructor(e) {
    super("w:pStyle"), this.root.push(
      new Ie({
        val: e
      })
    );
  }
};
class zh extends ae {
  constructor(e) {
    super("w:tabs");
    for (const r of e)
      this.root.push(new Yh(r));
  }
}
const Wo = {
  LEFT: "left",
  RIGHT: "right"
};
class Hh extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", { val: "w:val", pos: "w:pos", leader: "w:leader" });
  }
}
class Yh extends ae {
  constructor({ type: e, position: r, leader: n }) {
    super("w:tab"), this.root.push(
      new Hh({
        val: e,
        pos: r,
        leader: n
      })
    );
  }
}
class es extends ae {
  constructor(e, r) {
    super("w:numPr"), this.root.push(new qh(r)), this.root.push(new Gh(e));
  }
}
class qh extends ae {
  constructor(e) {
    if (super("w:ilvl"), e > 9)
      throw new Error(
        "Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7"
      );
    this.root.push(
      new Ie({
        val: e
      })
    );
  }
}
class Gh extends ae {
  constructor(e) {
    super("w:numId"), this.root.push(
      new Ie({
        val: typeof e == "string" ? `{${e}}` : e
      })
    );
  }
}
class Uu extends ae {
  constructor() {
    super(...arguments), ie(this, "fileChild", Symbol());
  }
}
class Vh extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      id: "Id",
      type: "Type",
      target: "Target",
      targetMode: "TargetMode"
    });
  }
}
const Kh = {
  EXTERNAL: "External"
};
class $h extends ae {
  constructor(e, r, n, i) {
    super("Relationship"), this.root.push(
      new Vh({
        id: e,
        type: r,
        target: n,
        targetMode: i
      })
    );
  }
}
class Zh extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      id: "r:id",
      history: "w:history",
      anchor: "w:anchor"
    });
  }
}
class Xh extends ae {
  constructor(e, r, n) {
    super("w:hyperlink"), ie(this, "linkId"), this.linkId = r;
    const i = {
      history: 1,
      anchor: n || void 0,
      id: n ? void 0 : `rId${this.linkId}`
    }, a = new Zh(i);
    this.root.push(a), e.forEach((l) => {
      this.root.push(l);
    });
  }
}
class Jh extends ae {
  constructor(e) {
    super("w:externalHyperlink"), this.options = e;
  }
}
class Qh extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      id: "w:id",
      name: "w:name"
    });
  }
}
class ef extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      id: "w:id"
    });
  }
}
class tf {
  constructor(e) {
    ie(this, "bookmarkUniqueNumericId", Ch()), ie(this, "start"), ie(this, "children"), ie(this, "end");
    const r = this.bookmarkUniqueNumericId();
    this.start = new rf(e.id, r), this.children = e.children, this.end = new nf(r);
  }
}
class rf extends ae {
  constructor(e, r) {
    super("w:bookmarkStart");
    const n = new Qh({
      name: e,
      id: r
    });
    this.root.push(n);
  }
}
class nf extends ae {
  constructor(e) {
    super("w:bookmarkEnd");
    const r = new ef({
      id: e
    });
    this.root.push(r);
  }
}
class sf extends ae {
  constructor(e) {
    super("w:outlineLvl"), this.level = e, this.root.push(
      new Ie({
        val: e
      })
    );
  }
}
class af extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      verticalAlign: "w:val"
    });
  }
}
class Wu extends ae {
  constructor(e) {
    super("w:vAlign"), this.root.push(new af({ verticalAlign: e }));
  }
}
class of extends ae {
  constructor({ space: e, count: r, separate: n, equalWidth: i, children: a }) {
    super("w:cols"), this.root.push(
      new Pt({
        space: { key: "w:space", value: e === void 0 ? void 0 : Ue(e) },
        count: { key: "w:num", value: r === void 0 ? void 0 : ze(r) },
        separate: { key: "w:sep", value: n },
        equalWidth: { key: "w:equalWidth", value: i }
      })
    ), !i && a && a.forEach((l) => this.addChildElement(l));
  }
}
class uf extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      type: "w:type",
      linePitch: "w:linePitch",
      charSpace: "w:charSpace"
    });
  }
}
class lf extends ae {
  constructor(e, r, n) {
    super("w:docGrid"), this.root.push(
      new uf({
        type: n,
        linePitch: ze(e),
        charSpace: r ? ze(r) : void 0
      })
    );
  }
}
const rr = {
  DEFAULT: "default",
  FIRST: "first",
  EVEN: "even"
};
class cf extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      type: "w:type",
      id: "r:id"
    });
  }
}
const jo = {
  HEADER: "w:headerReference",
  FOOTER: "w:footerReference"
};
class ts extends ae {
  constructor(e, r) {
    super(e), this.root.push(
      new cf({
        type: r.type || rr.DEFAULT,
        id: `rId${r.id}`
      })
    );
  }
}
const hf = ({ countBy: t, start: e, restart: r, distance: n }) => new Ft({
  name: "w:lnNumType",
  attributes: {
    countBy: { key: "w:countBy", value: t === void 0 ? void 0 : ze(t) },
    start: { key: "w:start", value: e === void 0 ? void 0 : ze(e) },
    restart: { key: "w:restart", value: r },
    distance: {
      key: "w:distance",
      value: n === void 0 ? void 0 : Ue(n)
    }
  }
});
class zo extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      display: "w:display",
      offsetFrom: "w:offsetFrom",
      zOrder: "w:zOrder"
    });
  }
}
class ff extends Tt {
  constructor(e) {
    if (super("w:pgBorders"), !e)
      return this;
    e.pageBorders ? this.root.push(
      new zo({
        display: e.pageBorders.display,
        offsetFrom: e.pageBorders.offsetFrom,
        zOrder: e.pageBorders.zOrder
      })
    ) : this.root.push(new zo({})), e.pageBorderTop && this.root.push(new Ae("w:top", e.pageBorderTop)), e.pageBorderLeft && this.root.push(new Ae("w:left", e.pageBorderLeft)), e.pageBorderBottom && this.root.push(new Ae("w:bottom", e.pageBorderBottom)), e.pageBorderRight && this.root.push(new Ae("w:right", e.pageBorderRight));
  }
}
class df extends ae {
  constructor(e, r, n, i, a, l, s) {
    super("w:pgMar"), this.root.push(
      new Pt({
        top: { key: "w:top", value: vt(e) },
        right: { key: "w:right", value: Ue(r) },
        bottom: { key: "w:bottom", value: vt(n) },
        left: { key: "w:left", value: Ue(i) },
        header: { key: "w:header", value: Ue(a) },
        footer: { key: "w:footer", value: Ue(l) },
        gutter: { key: "w:gutter", value: Ue(s) }
      })
    );
  }
}
class pf extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      start: "w:start",
      formatType: "w:fmt",
      separator: "w:chapSep"
    });
  }
}
class mf extends ae {
  constructor({ start: e, formatType: r, separator: n }) {
    super("w:pgNumType"), this.root.push(
      new pf({
        start: e === void 0 ? void 0 : ze(e),
        formatType: r,
        separator: n
      })
    );
  }
}
const ju = {
  PORTRAIT: "portrait",
  LANDSCAPE: "landscape"
};
class wf extends ae {
  constructor(e, r, n) {
    super("w:pgSz");
    const i = n === ju.LANDSCAPE, a = Ue(e), l = Ue(r);
    this.root.push(
      new Pt({
        width: { key: "w:w", value: i ? l : a },
        height: { key: "w:h", value: i ? a : l },
        orientation: { key: "w:orient", value: n }
      })
    );
  }
}
class yf extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", { val: "w:val" });
  }
}
class gf extends ae {
  constructor(e) {
    super("w:textDirection"), this.root.push(
      new yf({
        val: e
      })
    );
  }
}
class vf extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      val: "w:val"
    });
  }
}
class _f extends ae {
  constructor(e) {
    super("w:type"), this.root.push(new vf({ val: e }));
  }
}
const Wt = {
  TOP: 1440,
  RIGHT: 1440,
  BOTTOM: 1440,
  LEFT: 1440,
  HEADER: 708,
  FOOTER: 708,
  GUTTER: 0
}, rs = {
  WIDTH: 11906,
  HEIGHT: 16838,
  ORIENTATION: ju.PORTRAIT
};
class bf extends ae {
  constructor({
    page: {
      size: {
        width: e = rs.WIDTH,
        height: r = rs.HEIGHT,
        orientation: n = rs.ORIENTATION
      } = {},
      margin: {
        top: i = Wt.TOP,
        right: a = Wt.RIGHT,
        bottom: l = Wt.BOTTOM,
        left: s = Wt.LEFT,
        header: c = Wt.HEADER,
        footer: b = Wt.FOOTER,
        gutter: S = Wt.GUTTER
      } = {},
      pageNumbers: A = {},
      borders: R,
      textDirection: _
    } = {},
    grid: { linePitch: k = 360, charSpace: d, type: O } = {},
    headerWrapperGroup: h = {},
    footerWrapperGroup: g = {},
    lineNumbers: w,
    titlePage: f,
    verticalAlign: T,
    column: P,
    type: L
  } = {}) {
    super("w:sectPr"), this.addHeaderFooterGroup(jo.HEADER, h), this.addHeaderFooterGroup(jo.FOOTER, g), L && this.root.push(new _f(L)), this.root.push(new wf(e, r, n)), this.root.push(new df(i, a, l, s, c, b, S)), R && this.root.push(new ff(R)), w && this.root.push(hf(w)), this.root.push(new mf(A)), P && this.root.push(new of(P)), T && this.root.push(new Wu(T)), f !== void 0 && this.root.push(new ue("w:titlePg", f)), _ && this.root.push(new gf(_)), this.root.push(new lf(k, d, O));
  }
  addHeaderFooterGroup(e, r) {
    r.default && this.root.push(
      new ts(e, {
        type: rr.DEFAULT,
        id: r.default.View.ReferenceId
      })
    ), r.first && this.root.push(
      new ts(e, {
        type: rr.FIRST,
        id: r.first.View.ReferenceId
      })
    ), r.even && this.root.push(
      new ts(e, {
        type: rr.EVEN,
        id: r.even.View.ReferenceId
      })
    );
  }
}
class xf extends ae {
  constructor() {
    super("w:body"), ie(this, "sections", []);
  }
  /**
   * Adds new section properties.
   * Note: Previous section is created in paragraph after the current element, and then new section will be added.
   * The spec says:
   *  - section element should be in the last paragraph of the section
   *  - last section should be direct child of body
   *
   * @param options new section options
   */
  addSection(e) {
    const r = this.sections.pop();
    this.root.push(this.createSectionParagraph(r)), this.sections.push(new bf(e));
  }
  prepForXml(e) {
    return this.sections.length === 1 && (this.root.splice(0, 1), this.root.push(this.sections.pop())), super.prepForXml(e);
  }
  push(e) {
    this.root.push(e);
  }
  createSectionParagraph(e) {
    const r = new Ce({}), n = new cr({});
    return n.push(e), r.addChildElement(n), r;
  }
}
const Ho = {
  wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
  mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
  o: "urn:schemas-microsoft-com:office:office",
  r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
  m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
  v: "urn:schemas-microsoft-com:vml",
  wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
  wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
  w10: "urn:schemas-microsoft-com:office:word",
  w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
  w14: "http://schemas.microsoft.com/office/word/2010/wordml",
  w15: "http://schemas.microsoft.com/office/word/2012/wordml",
  wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
  wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
  wne: "http://schemas.microsoft.com/office/word/2006/wordml",
  wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
  cp: "http://schemas.openxmlformats.org/package/2006/metadata/core-properties",
  dc: "http://purl.org/dc/elements/1.1/",
  dcterms: "http://purl.org/dc/terms/",
  dcmitype: "http://purl.org/dc/dcmitype/",
  xsi: "http://www.w3.org/2001/XMLSchema-instance",
  cx: "http://schemas.microsoft.com/office/drawing/2014/chartex",
  cx1: "http://schemas.microsoft.com/office/drawing/2015/9/8/chartex",
  cx2: "http://schemas.microsoft.com/office/drawing/2015/10/21/chartex",
  cx3: "http://schemas.microsoft.com/office/drawing/2016/5/9/chartex",
  cx4: "http://schemas.microsoft.com/office/drawing/2016/5/10/chartex",
  cx5: "http://schemas.microsoft.com/office/drawing/2016/5/11/chartex",
  cx6: "http://schemas.microsoft.com/office/drawing/2016/5/12/chartex",
  cx7: "http://schemas.microsoft.com/office/drawing/2016/5/13/chartex",
  cx8: "http://schemas.microsoft.com/office/drawing/2016/5/14/chartex",
  aink: "http://schemas.microsoft.com/office/drawing/2016/ink",
  am3d: "http://schemas.microsoft.com/office/drawing/2017/model3d",
  w16cex: "http://schemas.microsoft.com/office/word/2018/wordml/cex",
  w16cid: "http://schemas.microsoft.com/office/word/2016/wordml/cid",
  w16: "http://schemas.microsoft.com/office/word/2018/wordml",
  w16sdtdh: "http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash",
  w16se: "http://schemas.microsoft.com/office/word/2015/wordml/symex"
};
class bn extends ye {
  constructor(e, r) {
    super(Se({ Ignorable: r }, Object.fromEntries(e.map((n) => [n, Ho[n]])))), ie(this, "xmlKeys", Se({
      Ignorable: "mc:Ignorable"
    }, Object.fromEntries(Object.keys(Ho).map((n) => [n, `xmlns:${n}`]))));
  }
}
class Sf extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      color: "w:color",
      themeColor: "w:themeColor",
      themeShade: "w:themeShade",
      themeTint: "w:themeTint"
    });
  }
}
class Ef extends ae {
  constructor(e) {
    super("w:background"), this.root.push(
      new Sf({
        color: e.color === void 0 ? void 0 : or(e.color),
        themeColor: e.themeColor,
        themeShade: e.themeShade === void 0 ? void 0 : Eo(e.themeShade),
        themeTint: e.themeTint === void 0 ? void 0 : Eo(e.themeTint)
      })
    );
  }
}
class Tf extends ae {
  constructor(e) {
    super("w:document"), ie(this, "body"), this.root.push(
      new bn(
        [
          "wpc",
          "mc",
          "o",
          "r",
          "m",
          "v",
          "wp14",
          "wp",
          "w10",
          "w",
          "w14",
          "w15",
          "wpg",
          "wpi",
          "wne",
          "wps",
          "cx",
          "cx1",
          "cx2",
          "cx3",
          "cx4",
          "cx5",
          "cx6",
          "cx7",
          "cx8",
          "aink",
          "am3d",
          "w16cex",
          "w16cid",
          "w16",
          "w16sdtdh",
          "w16se"
        ],
        "w14 w15 wp14"
      )
    ), this.body = new xf(), e.background && this.root.push(new Ef(e.background)), this.root.push(this.body);
  }
  add(e) {
    return this.body.push(e), this;
  }
  get Body() {
    return this.body;
  }
}
class kf extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      xmlns: "xmlns"
    });
  }
}
class fr extends ae {
  constructor() {
    super("Relationships"), this.root.push(
      new kf({
        xmlns: "http://schemas.openxmlformats.org/package/2006/relationships"
      })
    );
  }
  createRelationship(e, r, n, i) {
    const a = new $h(`rId${e}`, r, n, i);
    return this.root.push(a), a;
  }
  get RelationshipCount() {
    return this.root.length - 1;
  }
}
class zu {
  constructor(e) {
    ie(this, "document"), ie(this, "relationships"), this.document = new Tf(e), this.relationships = new fr();
  }
  get View() {
    return this.document;
  }
  get Relationships() {
    return this.relationships;
  }
}
class Af extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", { val: "w:val" });
  }
}
class Rf extends ae {
  constructor() {
    super("w:wordWrap"), this.root.push(new Af({ val: 0 }));
  }
}
const Of = (t) => {
  var e, r;
  return new Ft({
    name: "w:framePr",
    attributes: {
      anchorLock: {
        key: "w:anchorLock",
        value: t.anchorLock
      },
      dropCap: {
        key: "w:dropCap",
        value: t.dropCap
      },
      width: {
        key: "w:w",
        value: t.width
      },
      height: {
        key: "w:h",
        value: t.height
      },
      x: {
        key: "w:x",
        value: t.position ? t.position.x : void 0
      },
      y: {
        key: "w:y",
        value: t.position ? t.position.y : void 0
      },
      anchorHorizontal: {
        key: "w:hAnchor",
        value: t.anchor.horizontal
      },
      anchorVertical: {
        key: "w:vAnchor",
        value: t.anchor.vertical
      },
      spaceHorizontal: {
        key: "w:hSpace",
        value: (e = t.space) == null ? void 0 : e.horizontal
      },
      spaceVertical: {
        key: "w:vSpace",
        value: (r = t.space) == null ? void 0 : r.vertical
      },
      rule: {
        key: "w:hRule",
        value: t.rule
      },
      alignmentX: {
        key: "w:xAlign",
        value: t.alignment ? t.alignment.x : void 0
      },
      alignmentY: {
        key: "w:yAlign",
        value: t.alignment ? t.alignment.y : void 0
      },
      lines: {
        key: "w:lines",
        value: t.lines
      },
      wrap: {
        key: "w:wrap",
        value: t.wrap
      }
    }
  });
};
class cr extends Tt {
  constructor(e) {
    var r, n;
    if (super("w:pPr"), ie(this, "numberingReferences", []), !e)
      return this;
    e.heading && this.push(new Jr(e.heading)), e.bullet && this.push(new Jr("ListParagraph")), e.numbering && !e.style && !e.heading && (e.numbering.custom || this.push(new Jr("ListParagraph"))), e.style && this.push(new Jr(e.style)), e.keepNext !== void 0 && this.push(new ue("w:keepNext", e.keepNext)), e.keepLines !== void 0 && this.push(new ue("w:keepLines", e.keepLines)), e.pageBreakBefore && this.push(new Uh()), e.frame && this.push(Of(e.frame)), e.widowControl !== void 0 && this.push(new ue("w:widowControl", e.widowControl)), e.bullet && this.push(new es(1, e.bullet.level)), e.numbering ? (this.numberingReferences.push({
      reference: e.numbering.reference,
      instance: (r = e.numbering.instance) != null ? r : 0
    }), this.push(new es(`${e.numbering.reference}-${(n = e.numbering.instance) != null ? n : 0}`, e.numbering.level))) : e.numbering === !1 && this.push(new es(0, 0)), e.border && this.push(new Jc(e.border)), e.thematicBreak && this.push(new Qc()), e.shading && this.push(new vn(e.shading)), e.wordWrap && this.push(new Rf()), e.overflowPunctuation && this.push(new ue("w:overflowPunct", e.overflowPunctuation));
    const i = [
      ...e.rightTabStop !== void 0 ? [{ type: Wo.RIGHT, position: e.rightTabStop }] : [],
      ...e.tabStops ? e.tabStops : [],
      ...e.leftTabStop !== void 0 ? [{ type: Wo.LEFT, position: e.leftTabStop }] : []
    ];
    i.length > 0 && this.push(new zh(i)), e.bidirectional !== void 0 && this.push(new ue("w:bidi", e.bidirectional)), e.spacing && this.push(new jh(e.spacing)), e.indent && this.push(new eh(e.indent)), e.contextualSpacing !== void 0 && this.push(new ue("w:contextualSpacing", e.contextualSpacing)), e.alignment && this.push(new Iu(e.alignment)), e.outlineLevel !== void 0 && this.push(new sf(e.outlineLevel)), e.suppressLineNumbers !== void 0 && this.push(new ue("w:suppressLineNumbers", e.suppressLineNumbers)), e.autoSpaceEastAsianText !== void 0 && this.push(new ue("w:autoSpaceDN", e.autoSpaceEastAsianText)), e.run && this.push(new Vt(e.run));
  }
  push(e) {
    this.root.push(e);
  }
  prepForXml(e) {
    if (e.viewWrapper instanceof zu)
      for (const r of this.numberingReferences)
        e.file.Numbering.createConcreteNumberingInstance(r.reference, r.instance);
    return super.prepForXml(e);
  }
}
class Ce extends Uu {
  constructor(e) {
    if (super("w:p"), ie(this, "properties"), typeof e == "string")
      return this.properties = new cr({}), this.root.push(this.properties), this.root.push(new We(e)), this;
    if (this.properties = new cr(e), this.root.push(this.properties), e.text && this.root.push(new We(e.text)), e.children)
      for (const r of e.children) {
        if (r instanceof tf) {
          this.root.push(r.start);
          for (const n of r.children)
            this.root.push(n);
          this.root.push(r.end);
          continue;
        }
        this.root.push(r);
      }
  }
  prepForXml(e) {
    for (const r of this.root)
      if (r instanceof Jh) {
        const n = this.root.indexOf(r), i = new Xh(r.options.children, Ih());
        e.viewWrapper.Relationships.createRelationship(
          i.linkId,
          "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
          r.options.link,
          Kh.EXTERNAL
        ), this.root[n] = i;
      }
    return super.prepForXml(e);
  }
  addRunToFront(e) {
    return this.root.splice(1, 0, e), this;
  }
}
class Df extends ae {
  constructor(e) {
    super("w:tblGrid");
    for (const r of e)
      this.root.push(new Nf(r));
  }
}
class Nf extends ae {
  constructor(e) {
    super("w:gridCol"), e !== void 0 && this.root.push(
      new Pt({
        width: { key: "w:w", value: Ue(e) }
      })
    );
  }
}
const Hu = {
  TABLE: "w:tblCellMar",
  TABLE_CELL: "w:tcMar"
};
class Yu extends Tt {
  constructor(e, { marginUnitType: r = cn.DXA, top: n, left: i, bottom: a, right: l }) {
    super(e), n !== void 0 && this.root.push(new Ht("w:top", { type: r, size: n })), i !== void 0 && this.root.push(new Ht("w:left", { type: r, size: i })), a !== void 0 && this.root.push(new Ht("w:bottom", { type: r, size: a })), l !== void 0 && this.root.push(new Ht("w:right", { type: r, size: l }));
  }
}
const cn = {
  /** Auto. */
  AUTO: "auto",
  /** Value is in twentieths of a point */
  DXA: "dxa",
  /** Value is in percentage. */
  PERCENTAGE: "pct"
};
class Ht extends ae {
  constructor(e, { type: r = cn.AUTO, size: n }) {
    super(e);
    let i = n;
    r === cn.PERCENTAGE && typeof n == "number" && (i = `${n}%`), this.root.push(
      new Pt({
        type: { key: "w:type", value: r },
        size: { key: "w:w", value: qc(i) }
      })
    );
  }
}
class Cf extends Tt {
  constructor(e) {
    super("w:tcBorders"), e.top && this.root.push(new Ae("w:top", e.top)), e.start && this.root.push(new Ae("w:start", e.start)), e.left && this.root.push(new Ae("w:left", e.left)), e.bottom && this.root.push(new Ae("w:bottom", e.bottom)), e.end && this.root.push(new Ae("w:end", e.end)), e.right && this.root.push(new Ae("w:right", e.right));
  }
}
class If extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", { val: "w:val" });
  }
}
class Ff extends ae {
  constructor(e) {
    super("w:gridSpan"), this.root.push(
      new If({
        val: ze(e)
      })
    );
  }
}
const qu = {
  /**
   * Cell that is merged with upper one.
   */
  CONTINUE: "continue",
  /**
   * Cell that is starting the vertical merge.
   */
  RESTART: "restart"
};
class Pf extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", { val: "w:val" });
  }
}
class Yo extends ae {
  constructor(e) {
    super("w:vMerge"), this.root.push(
      new Pf({
        val: e
      })
    );
  }
}
class Mf extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", { val: "w:val" });
  }
}
class Lf extends ae {
  constructor(e) {
    super("w:textDirection"), this.root.push(
      new Mf({
        val: e
      })
    );
  }
}
class Bf extends Tt {
  constructor(e) {
    super("w:tcPr"), e.width && this.root.push(new Ht("w:tcW", e.width)), e.columnSpan && this.root.push(new Ff(e.columnSpan)), e.verticalMerge ? this.root.push(new Yo(e.verticalMerge)) : e.rowSpan && e.rowSpan > 1 && this.root.push(new Yo(qu.RESTART)), e.borders && this.root.push(new Cf(e.borders)), e.shading && this.root.push(new vn(e.shading)), e.margins && this.root.push(new Yu(Hu.TABLE_CELL, e.margins)), e.textDirection && this.root.push(new Lf(e.textDirection)), e.verticalAlign && this.root.push(new Wu(e.verticalAlign));
  }
}
class it extends ae {
  constructor(e) {
    super("w:tc"), this.options = e, this.root.push(new Bf(e));
    for (const r of e.children)
      this.root.push(r);
  }
  prepForXml(e) {
    return this.root[this.root.length - 1] instanceof Ce || this.root.push(new Ce({})), super.prepForXml(e);
  }
}
const $t = {
  style: Ms.NONE,
  size: 0,
  color: "auto"
}, Zt = {
  style: Ms.SINGLE,
  size: 4,
  color: "auto"
};
class Gu extends ae {
  constructor(e) {
    super("w:tblBorders"), e.top ? this.root.push(new Ae("w:top", e.top)) : this.root.push(new Ae("w:top", Zt)), e.left ? this.root.push(new Ae("w:left", e.left)) : this.root.push(new Ae("w:left", Zt)), e.bottom ? this.root.push(new Ae("w:bottom", e.bottom)) : this.root.push(new Ae("w:bottom", Zt)), e.right ? this.root.push(new Ae("w:right", e.right)) : this.root.push(new Ae("w:right", Zt)), e.insideHorizontal ? this.root.push(new Ae("w:insideH", e.insideHorizontal)) : this.root.push(new Ae("w:insideH", Zt)), e.insideVertical ? this.root.push(new Ae("w:insideV", e.insideVertical)) : this.root.push(new Ae("w:insideV", Zt));
  }
}
ie(Gu, "NONE", {
  top: $t,
  bottom: $t,
  left: $t,
  right: $t,
  insideHorizontal: $t,
  insideVertical: $t
});
class Uf extends ae {
  constructor({
    horizontalAnchor: e,
    verticalAnchor: r,
    absoluteHorizontalPosition: n,
    relativeHorizontalPosition: i,
    absoluteVerticalPosition: a,
    relativeVerticalPosition: l,
    bottomFromText: s,
    topFromText: c,
    leftFromText: b,
    rightFromText: S,
    overlap: A
  }) {
    super("w:tblpPr"), this.root.push(
      new Pt({
        leftFromText: {
          key: "w:leftFromText",
          value: b === void 0 ? void 0 : Ue(b)
        },
        rightFromText: {
          key: "w:rightFromText",
          value: S === void 0 ? void 0 : Ue(S)
        },
        topFromText: {
          key: "w:topFromText",
          value: c === void 0 ? void 0 : Ue(c)
        },
        bottomFromText: {
          key: "w:bottomFromText",
          value: s === void 0 ? void 0 : Ue(s)
        },
        absoluteHorizontalPosition: {
          key: "w:tblpX",
          value: n === void 0 ? void 0 : vt(n)
        },
        absoluteVerticalPosition: {
          key: "w:tblpY",
          value: a === void 0 ? void 0 : vt(a)
        },
        horizontalAnchor: {
          key: "w:horzAnchor",
          value: e === void 0 ? void 0 : e
        },
        relativeHorizontalPosition: {
          key: "w:tblpXSpec",
          value: i
        },
        relativeVerticalPosition: {
          key: "w:tblpYSpec",
          value: l
        },
        verticalAnchor: {
          key: "w:vertAnchor",
          value: r
        }
      })
    ), A && this.root.push(new $c("w:tblOverlap", A));
  }
}
class Wf extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", { type: "w:type" });
  }
}
class jf extends ae {
  constructor(e) {
    super("w:tblLayout"), this.root.push(new Wf({ type: e }));
  }
}
class zf extends Tt {
  constructor(e) {
    super("w:tblPr"), e.style && this.root.push(new qt("w:tblStyle", e.style)), e.float && this.root.push(new Uf(e.float)), e.visuallyRightToLeft !== void 0 && this.root.push(new ue("w:bidiVisual", e.visuallyRightToLeft)), e.width && this.root.push(new Ht("w:tblW", e.width)), e.alignment && this.root.push(new Iu(e.alignment)), e.indent && this.root.push(new Ht("w:tblInd", e.indent)), e.borders && this.root.push(new Gu(e.borders)), e.shading && this.root.push(new vn(e.shading)), e.layout && this.root.push(new jf(e.layout)), e.cellMargin && this.root.push(new Yu(Hu.TABLE, e.cellMargin));
  }
}
class Hf extends Uu {
  constructor({
    rows: e,
    width: r,
    // eslint-disable-next-line functional/immutable-data
    columnWidths: n = Array(Math.max(...e.map((R) => R.CellCount))).fill(100),
    margins: i,
    indent: a,
    float: l,
    layout: s,
    style: c,
    borders: b,
    alignment: S,
    visuallyRightToLeft: A
  }) {
    super("w:tbl"), this.root.push(
      new zf({
        borders: b ?? {},
        width: r ?? { size: 100 },
        indent: a,
        float: l,
        layout: s,
        style: c,
        alignment: S,
        cellMargin: i,
        visuallyRightToLeft: A
      })
    ), this.root.push(new Df(n));
    for (const R of e)
      this.root.push(R);
    e.forEach((R, _) => {
      if (_ === e.length - 1)
        return;
      let k = 0;
      R.cells.forEach((d) => {
        if (d.options.rowSpan && d.options.rowSpan > 1) {
          const O = new it({
            // the inserted CONTINUE cell has rowSpan, and will be handled when process the next row
            rowSpan: d.options.rowSpan - 1,
            columnSpan: d.options.columnSpan,
            borders: d.options.borders,
            children: [],
            verticalMerge: qu.CONTINUE
          });
          e[_ + 1].addCellToColumnIndex(O, k);
        }
        k += d.options.columnSpan || 1;
      });
    });
  }
}
class Yf extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", { value: "w:val", rule: "w:hRule" });
  }
}
class qf extends ae {
  constructor(e, r) {
    super("w:trHeight"), this.root.push(
      new Yf({
        value: Ue(e),
        rule: r
      })
    );
  }
}
class Gf extends Tt {
  constructor(e) {
    super("w:trPr"), e.cantSplit !== void 0 && this.root.push(new ue("w:cantSplit", e.cantSplit)), e.tableHeader !== void 0 && this.root.push(new ue("w:tblHeader", e.tableHeader)), e.height && this.root.push(new qf(e.height.value, e.height.rule));
  }
}
class qo extends ae {
  constructor(e) {
    super("w:tr"), this.options = e, this.root.push(new Gf(e));
    for (const r of e.children)
      this.root.push(r);
  }
  get CellCount() {
    return this.options.children.length;
  }
  get cells() {
    return this.root.filter((e) => e instanceof it);
  }
  addCellToIndex(e, r) {
    this.root.splice(r + 1, 0, e);
  }
  addCellToColumnIndex(e, r) {
    const n = this.columnIndexToRootIndex(r, !0);
    this.addCellToIndex(e, n - 1);
  }
  rootIndexToColumnIndex(e) {
    if (e < 1 || e >= this.root.length)
      throw new Error(`cell 'rootIndex' should between 1 to ${this.root.length - 1}`);
    let r = 0;
    for (let n = 1; n < e; n++) {
      const i = this.root[n];
      r += i.options.columnSpan || 1;
    }
    return r;
  }
  columnIndexToRootIndex(e, r = !1) {
    if (e < 0)
      throw new Error("cell 'columnIndex' should not less than zero");
    let n = 0, i = 1;
    for (; n <= e; ) {
      if (i >= this.root.length) {
        if (r)
          return this.root.length;
        throw new Error(`cell 'columnIndex' should not great than ${n - 1}`);
      }
      const a = this.root[i];
      i += 1, n += a && a.options.columnSpan || 1;
    }
    return i - 1;
  }
}
class Vf extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      xmlns: "xmlns",
      vt: "xmlns:vt"
    });
  }
}
class Kf extends ae {
  constructor() {
    super("Properties"), this.root.push(
      new Vf({
        xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
        vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
      })
    );
  }
}
class $f extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      xmlns: "xmlns"
    });
  }
}
class Zf extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      contentType: "ContentType",
      extension: "Extension"
    });
  }
}
class pt extends ae {
  constructor(e, r) {
    super("Default"), this.root.push(
      new Zf({
        contentType: e,
        extension: r
      })
    );
  }
}
class Xf extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      contentType: "ContentType",
      partName: "PartName"
    });
  }
}
class Ve extends ae {
  constructor(e, r) {
    super("Override"), this.root.push(
      new Xf({
        contentType: e,
        partName: r
      })
    );
  }
}
class Jf extends ae {
  constructor() {
    super("Types"), this.root.push(
      new $f({
        xmlns: "http://schemas.openxmlformats.org/package/2006/content-types"
      })
    ), this.root.push(new pt("image/png", "png")), this.root.push(new pt("image/jpeg", "jpeg")), this.root.push(new pt("image/jpeg", "jpg")), this.root.push(new pt("image/bmp", "bmp")), this.root.push(new pt("image/gif", "gif")), this.root.push(new pt("image/svg+xml", "svg")), this.root.push(new pt("application/vnd.openxmlformats-package.relationships+xml", "rels")), this.root.push(new pt("application/xml", "xml")), this.root.push(new pt("application/vnd.openxmlformats-officedocument.obfuscatedFont", "odttf")), this.root.push(
      new Ve("application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml", "/word/document.xml")
    ), this.root.push(new Ve("application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml", "/word/styles.xml")), this.root.push(new Ve("application/vnd.openxmlformats-package.core-properties+xml", "/docProps/core.xml")), this.root.push(new Ve("application/vnd.openxmlformats-officedocument.custom-properties+xml", "/docProps/custom.xml")), this.root.push(new Ve("application/vnd.openxmlformats-officedocument.extended-properties+xml", "/docProps/app.xml")), this.root.push(new Ve("application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml", "/word/numbering.xml")), this.root.push(new Ve("application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml", "/word/footnotes.xml")), this.root.push(new Ve("application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml", "/word/settings.xml")), this.root.push(new Ve("application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml", "/word/comments.xml")), this.root.push(new Ve("application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml", "/word/fontTable.xml"));
  }
  addFooter(e) {
    this.root.push(
      new Ve("application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml", `/word/footer${e}.xml`)
    );
  }
  addHeader(e) {
    this.root.push(
      new Ve("application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml", `/word/header${e}.xml`)
    );
  }
}
class Qf extends ae {
  constructor(e) {
    super("cp:coreProperties"), this.root.push(new bn(["cp", "dc", "dcterms", "dcmitype", "xsi"])), e.title && this.root.push(new Bt("dc:title", e.title)), e.subject && this.root.push(new Bt("dc:subject", e.subject)), e.creator && this.root.push(new Bt("dc:creator", e.creator)), e.keywords && this.root.push(new Bt("cp:keywords", e.keywords)), e.description && this.root.push(new Bt("dc:description", e.description)), e.lastModifiedBy && this.root.push(new Bt("cp:lastModifiedBy", e.lastModifiedBy)), e.revision && this.root.push(new Bt("cp:revision", String(e.revision))), this.root.push(new Go("dcterms:created")), this.root.push(new Go("dcterms:modified"));
  }
}
class ed extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", { type: "xsi:type" });
  }
}
class Go extends ae {
  constructor(e) {
    super(e), this.root.push(
      new ed({
        type: "dcterms:W3CDTF"
      })
    ), this.root.push(Kc(/* @__PURE__ */ new Date()));
  }
}
class td extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      xmlns: "xmlns",
      vt: "xmlns:vt"
    });
  }
}
class rd extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      fmtid: "fmtid",
      pid: "pid",
      name: "name"
    });
  }
}
class nd extends ae {
  constructor(e, r) {
    super("property"), this.root.push(
      new rd({
        fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
        pid: e.toString(),
        name: r.name
      })
    ), this.root.push(new id(r.value));
  }
}
class id extends ae {
  constructor(e) {
    super("vt:lpwstr"), this.root.push(e);
  }
}
class sd extends ae {
  constructor(e) {
    super("Properties"), ie(this, "nextId"), ie(this, "properties", []), this.root.push(
      new td({
        xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
        vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
      })
    ), this.nextId = 2;
    for (const r of e)
      this.addCustomProperty(r);
  }
  prepForXml(e) {
    return this.properties.forEach((r) => this.root.push(r)), super.prepForXml(e);
  }
  addCustomProperty(e) {
    this.properties.push(new nd(this.nextId++, e));
  }
}
const Qr = ({ id: t, fontKey: e, subsetted: r }, n) => new Ft({
  name: n,
  attributes: Se({
    id: { key: "r:id", value: t }
  }, e ? { fontKey: { key: "w:fontKey", value: `{${e}}` } } : {}),
  children: [...r ? [new ue("w:subsetted", r)] : []]
}), ad = ({
  name: t,
  altName: e,
  panose1: r,
  charset: n,
  family: i,
  notTrueType: a,
  pitch: l,
  sig: s,
  embedRegular: c,
  embedBold: b,
  embedItalic: S,
  embedBoldItalic: A
}) => (
  // http://www.datypic.com/sc/ooxml/e-w_font-1.html
  new Ft({
    name: "w:font",
    attributes: {
      name: { key: "w:name", value: t }
    },
    children: [
      // http://www.datypic.com/sc/ooxml/e-w_altName-1.html
      ...e ? [_r("w:altName", e)] : [],
      // http://www.datypic.com/sc/ooxml/e-w_panose1-1.html
      ...r ? [_r("w:panose1", r)] : [],
      // http://www.datypic.com/sc/ooxml/e-w_charset-1.html
      ...n ? [_r("w:charset", n)] : [],
      _r("w:family", i),
      // http://www.datypic.com/sc/ooxml/e-w_notTrueType-1.html
      ...a ? [new ue("w:notTrueType", a)] : [],
      _r("w:pitch", l),
      // http://www.datypic.com/sc/ooxml/e-w_sig-1.html
      ...s ? [
        new Ft({
          name: "w:sig",
          attributes: {
            usb0: { key: "w:usb0", value: s.usb0 },
            usb1: { key: "w:usb1", value: s.usb1 },
            usb2: { key: "w:usb2", value: s.usb2 },
            usb3: { key: "w:usb3", value: s.usb3 },
            csb0: { key: "w:csb0", value: s.csb0 },
            csb1: { key: "w:csb1", value: s.csb1 }
          }
        })
      ] : [],
      // http://www.datypic.com/sc/ooxml/e-w_embedRegular-1.html
      ...c ? [Qr(c, "w:embedRegular")] : [],
      // http://www.datypic.com/sc/ooxml/e-w_embedBold-1.html
      ...b ? [Qr(b, "w:embedBold")] : [],
      // http://www.datypic.com/sc/ooxml/e-w_embedItalic-1.html
      ...S ? [Qr(S, "w:embedItalic")] : [],
      // http://www.datypic.com/sc/ooxml/e-w_embedBoldItalic-1.html
      ...A ? [Qr(A, "w:embedBoldItalic")] : []
    ]
  })
), od = ({
  name: t,
  index: e,
  fontKey: r,
  characterSet: n
}) => ad({
  name: t,
  sig: {
    usb0: "E0002AFF",
    usb1: "C000247B",
    usb2: "00000009",
    usb3: "00000000",
    csb0: "000001FF",
    csb1: "00000000"
  },
  charset: n,
  family: "auto",
  pitch: "variable",
  embedRegular: {
    fontKey: r,
    id: `rId${e}`
  }
}), ud = (t) => (
  // https://c-rex.net/projects/samples/ooxml/e1/Part4/OOXML_P4_DOCX_Font_topic_ID0ERNCU.html
  // http://www.datypic.com/sc/ooxml/e-w_fonts.html
  new Ft({
    name: "w:fonts",
    attributes: {
      mc: { key: "xmlns:mc", value: "http://schemas.openxmlformats.org/markup-compatibility/2006" },
      r: { key: "xmlns:r", value: "http://schemas.openxmlformats.org/officeDocument/2006/relationships" },
      w: { key: "xmlns:w", value: "http://schemas.openxmlformats.org/wordprocessingml/2006/main" },
      w14: { key: "xmlns:w14", value: "http://schemas.microsoft.com/office/word/2010/wordml" },
      w15: { key: "xmlns:w15", value: "http://schemas.microsoft.com/office/word/2012/wordml" },
      w16cex: { key: "xmlns:w16cex", value: "http://schemas.microsoft.com/office/word/2018/wordml/cex" },
      w16cid: { key: "xmlns:w16cid", value: "http://schemas.microsoft.com/office/word/2016/wordml/cid" },
      w16: { key: "xmlns:w16", value: "http://schemas.microsoft.com/office/word/2018/wordml" },
      w16sdtdh: { key: "xmlns:w16sdtdh", value: "http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash" },
      w16se: { key: "xmlns:w16se", value: "http://schemas.microsoft.com/office/word/2015/wordml/symex" },
      Ignorable: { key: "mc:Ignorable", value: "w14 w15 w16se w16cid w16 w16cex w16sdtdh" }
    },
    children: t.map(
      (e, r) => od({
        name: e.name,
        index: r + 1,
        fontKey: e.fontKey
      })
    )
  })
);
class ld {
  constructor(e) {
    ie(this, "fontTable"), ie(this, "relationships"), ie(this, "fontOptionsWithKey", []), this.options = e, this.fontOptionsWithKey = e.map((r) => Or(Se({}, r), { fontKey: Fh() })), this.fontTable = ud(this.fontOptionsWithKey), this.relationships = new fr();
    for (let r = 0; r < e.length; r++)
      this.relationships.createRelationship(
        r + 1,
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/font",
        `fonts/${e[r].name}.odttf`
      );
  }
  get View() {
    return this.fontTable;
  }
  get Relationships() {
    return this.relationships;
  }
}
class cd extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      wpc: "xmlns:wpc",
      mc: "xmlns:mc",
      o: "xmlns:o",
      r: "xmlns:r",
      m: "xmlns:m",
      v: "xmlns:v",
      wp14: "xmlns:wp14",
      wp: "xmlns:wp",
      w10: "xmlns:w10",
      w: "xmlns:w",
      w14: "xmlns:w14",
      w15: "xmlns:w15",
      wpg: "xmlns:wpg",
      wpi: "xmlns:wpi",
      wne: "xmlns:wne",
      wps: "xmlns:wps",
      cp: "xmlns:cp",
      dc: "xmlns:dc",
      dcterms: "xmlns:dcterms",
      dcmitype: "xmlns:dcmitype",
      xsi: "xmlns:xsi",
      type: "xsi:type"
    });
  }
}
let hd = class extends Du {
  constructor(e, r) {
    super("w:ftr", r), ie(this, "refId"), this.refId = e, r || this.root.push(
      new cd({
        wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
        mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
        o: "urn:schemas-microsoft-com:office:office",
        r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
        m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
        v: "urn:schemas-microsoft-com:vml",
        wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
        wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
        w10: "urn:schemas-microsoft-com:office:word",
        w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
        w14: "http://schemas.microsoft.com/office/word/2010/wordml",
        w15: "http://schemas.microsoft.com/office/word/2012/wordml",
        wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
        wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
        wne: "http://schemas.microsoft.com/office/word/2006/wordml",
        wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape"
      })
    );
  }
  get ReferenceId() {
    return this.refId;
  }
  add(e) {
    this.root.push(e);
  }
};
class fd {
  constructor(e, r, n) {
    ie(this, "footer"), ie(this, "relationships"), this.media = e, this.footer = new hd(r, n), this.relationships = new fr();
  }
  add(e) {
    this.footer.add(e);
  }
  addChildElement(e) {
    this.footer.addChildElement(e);
  }
  get View() {
    return this.footer;
  }
  get Relationships() {
    return this.relationships;
  }
  get Media() {
    return this.media;
  }
}
class dd extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      type: "w:type",
      id: "w:id"
    });
  }
}
class pd extends ae {
  constructor() {
    super("w:footnoteRef");
  }
}
class md extends _n {
  constructor() {
    super({
      style: "FootnoteReference"
    }), this.root.push(new pd());
  }
}
const Vo = {
  SEPERATOR: "separator",
  CONTINUATION_SEPERATOR: "continuationSeparator"
};
class ns extends ae {
  constructor(e) {
    super("w:footnote"), this.root.push(
      new dd({
        type: e.type,
        id: e.id
      })
    );
    for (let r = 0; r < e.children.length; r++) {
      const n = e.children[r];
      r === 0 && n.addRunToFront(new md()), this.root.push(n);
    }
  }
}
class wd extends ae {
  constructor() {
    super("w:continuationSeparator");
  }
}
class yd extends _n {
  constructor() {
    super({}), this.root.push(new wd());
  }
}
class gd extends ae {
  constructor() {
    super("w:separator");
  }
}
class vd extends _n {
  constructor() {
    super({}), this.root.push(new gd());
  }
}
class _d extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      wpc: "xmlns:wpc",
      mc: "xmlns:mc",
      o: "xmlns:o",
      r: "xmlns:r",
      m: "xmlns:m",
      v: "xmlns:v",
      wp14: "xmlns:wp14",
      wp: "xmlns:wp",
      w10: "xmlns:w10",
      w: "xmlns:w",
      w14: "xmlns:w14",
      w15: "xmlns:w15",
      wpg: "xmlns:wpg",
      wpi: "xmlns:wpi",
      wne: "xmlns:wne",
      wps: "xmlns:wps",
      Ignorable: "mc:Ignorable"
    });
  }
}
class bd extends ae {
  constructor() {
    super("w:footnotes"), this.root.push(
      new _d({
        wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
        mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
        o: "urn:schemas-microsoft-com:office:office",
        r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
        m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
        v: "urn:schemas-microsoft-com:vml",
        wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
        wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
        w10: "urn:schemas-microsoft-com:office:word",
        w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
        w14: "http://schemas.microsoft.com/office/word/2010/wordml",
        w15: "http://schemas.microsoft.com/office/word/2012/wordml",
        wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
        wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
        wne: "http://schemas.microsoft.com/office/word/2006/wordml",
        wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
        Ignorable: "w14 w15 wp14"
      })
    );
    const e = new ns({
      id: -1,
      type: Vo.SEPERATOR,
      children: [
        new Ce({
          spacing: {
            after: 0,
            line: 240,
            lineRule: ms.AUTO
          },
          children: [new vd()]
        })
      ]
    });
    this.root.push(e);
    const r = new ns({
      id: 0,
      type: Vo.CONTINUATION_SEPERATOR,
      children: [
        new Ce({
          spacing: {
            after: 0,
            line: 240,
            lineRule: ms.AUTO
          },
          children: [new yd()]
        })
      ]
    });
    this.root.push(r);
  }
  createFootNote(e, r) {
    const n = new ns({
      id: e,
      children: r
    });
    this.root.push(n);
  }
}
class xd {
  constructor() {
    ie(this, "footnotess"), ie(this, "relationships"), this.footnotess = new bd(), this.relationships = new fr();
  }
  get View() {
    return this.footnotess;
  }
  get Relationships() {
    return this.relationships;
  }
}
class Sd extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      wpc: "xmlns:wpc",
      mc: "xmlns:mc",
      o: "xmlns:o",
      r: "xmlns:r",
      m: "xmlns:m",
      v: "xmlns:v",
      wp14: "xmlns:wp14",
      wp: "xmlns:wp",
      w10: "xmlns:w10",
      w: "xmlns:w",
      w14: "xmlns:w14",
      w15: "xmlns:w15",
      wpg: "xmlns:wpg",
      wpi: "xmlns:wpi",
      wne: "xmlns:wne",
      wps: "xmlns:wps",
      cp: "xmlns:cp",
      dc: "xmlns:dc",
      dcterms: "xmlns:dcterms",
      dcmitype: "xmlns:dcmitype",
      xsi: "xmlns:xsi",
      type: "xsi:type",
      cx: "xmlns:cx",
      cx1: "xmlns:cx1",
      cx2: "xmlns:cx2",
      cx3: "xmlns:cx3",
      cx4: "xmlns:cx4",
      cx5: "xmlns:cx5",
      cx6: "xmlns:cx6",
      cx7: "xmlns:cx7",
      cx8: "xmlns:cx8",
      w16cid: "xmlns:w16cid",
      w16se: "xmlns:w16se"
    });
  }
}
let Ed = class extends Du {
  constructor(e, r) {
    super("w:hdr", r), ie(this, "refId"), this.refId = e, r || this.root.push(
      new Sd({
        wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
        mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
        o: "urn:schemas-microsoft-com:office:office",
        r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
        m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
        v: "urn:schemas-microsoft-com:vml",
        wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
        wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
        w10: "urn:schemas-microsoft-com:office:word",
        w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
        w14: "http://schemas.microsoft.com/office/word/2010/wordml",
        w15: "http://schemas.microsoft.com/office/word/2012/wordml",
        wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
        wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
        wne: "http://schemas.microsoft.com/office/word/2006/wordml",
        wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
        cx: "http://schemas.microsoft.com/office/drawing/2014/chartex",
        cx1: "http://schemas.microsoft.com/office/drawing/2015/9/8/chartex",
        cx2: "http://schemas.microsoft.com/office/drawing/2015/10/21/chartex",
        cx3: "http://schemas.microsoft.com/office/drawing/2016/5/9/chartex",
        cx4: "http://schemas.microsoft.com/office/drawing/2016/5/10/chartex",
        cx5: "http://schemas.microsoft.com/office/drawing/2016/5/11/chartex",
        cx6: "http://schemas.microsoft.com/office/drawing/2016/5/12/chartex",
        cx7: "http://schemas.microsoft.com/office/drawing/2016/5/13/chartex",
        cx8: "http://schemas.microsoft.com/office/drawing/2016/5/14/chartex",
        w16cid: "http://schemas.microsoft.com/office/word/2016/wordml/cid",
        w16se: "http://schemas.microsoft.com/office/word/2015/wordml/symex"
      })
    );
  }
  get ReferenceId() {
    return this.refId;
  }
  add(e) {
    this.root.push(e);
  }
};
class Td {
  constructor(e, r, n) {
    ie(this, "header"), ie(this, "relationships"), this.media = e, this.header = new Ed(r, n), this.relationships = new fr();
  }
  add(e) {
    return this.header.add(e), this;
  }
  addChildElement(e) {
    this.header.addChildElement(e);
  }
  get View() {
    return this.header;
  }
  get Relationships() {
    return this.relationships;
  }
  get Media() {
    return this.media;
  }
}
class kd {
  constructor() {
    ie(this, "map"), this.map = /* @__PURE__ */ new Map();
  }
  addImage(e, r) {
    this.map.set(e, r);
  }
  get Array() {
    return Array.from(this.map.values());
  }
}
const mt = {
  BULLET: "bullet"
};
class Ad extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      ilvl: "w:ilvl",
      tentative: "w15:tentative"
    });
  }
}
class Rd extends ae {
  constructor(e) {
    super("w:numFmt"), this.root.push(
      new Ie({
        val: e
      })
    );
  }
}
class Od extends ae {
  constructor(e) {
    super("w:lvlText"), this.root.push(
      new Ie({
        val: e
      })
    );
  }
}
class Dd extends ae {
  constructor(e) {
    super("w:lvlJc"), this.root.push(
      new Ie({
        val: e
      })
    );
  }
}
class Nd extends ae {
  constructor(e) {
    super("w:suff"), this.root.push(
      new Ie({
        val: e
      })
    );
  }
}
class Cd extends ae {
  constructor() {
    super("w:isLgl");
  }
}
class Id extends ae {
  constructor({
    level: e,
    format: r,
    text: n,
    alignment: i = qe.START,
    start: a = 1,
    style: l,
    suffix: s,
    isLegalNumberingStyle: c
  }) {
    if (super("w:lvl"), ie(this, "paragraphProperties"), ie(this, "runProperties"), this.root.push(new kr("w:start", ze(a))), r && this.root.push(new Rd(r)), s && this.root.push(new Nd(s)), c && this.root.push(new Cd()), n && this.root.push(new Od(n)), this.root.push(new Dd(i)), this.paragraphProperties = new cr(l && l.paragraph), this.runProperties = new Vt(l && l.run), this.root.push(this.paragraphProperties), this.root.push(this.runProperties), e > 9)
      throw new Error(
        "Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7"
      );
    this.root.push(
      new Ad({
        ilvl: ze(e),
        tentative: 1
      })
    );
  }
}
class Fd extends Id {
  // This is the level that sits under abstractNum. We make a
  // handful of properties required
}
class Pd extends ae {
  constructor(e) {
    super("w:multiLevelType"), this.root.push(
      new Ie({
        val: e
      })
    );
  }
}
class Md extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      abstractNumId: "w:abstractNumId",
      restartNumberingAfterBreak: "w15:restartNumberingAfterBreak"
    });
  }
}
class Ko extends ae {
  constructor(e, r) {
    super("w:abstractNum"), ie(this, "id"), this.root.push(
      new Md({
        abstractNumId: ze(e),
        restartNumberingAfterBreak: 0
      })
    ), this.root.push(new Pd("hybridMultilevel")), this.id = e;
    for (const n of r)
      this.root.push(new Fd(n));
  }
}
class Ld extends ae {
  constructor(e) {
    super("w:abstractNumId"), this.root.push(
      new Ie({
        val: e
      })
    );
  }
}
class Bd extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", { numId: "w:numId" });
  }
}
class $o extends ae {
  constructor(e) {
    if (super("w:num"), ie(this, "numId"), ie(this, "reference"), ie(this, "instance"), this.numId = e.numId, this.reference = e.reference, this.instance = e.instance, this.root.push(
      new Bd({
        numId: ze(e.numId)
      })
    ), this.root.push(new Ld(ze(e.abstractNumId))), e.overrideLevels && e.overrideLevels.length)
      for (const r of e.overrideLevels)
        this.root.push(new Wd(r.num, r.start));
  }
}
class Ud extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", { ilvl: "w:ilvl" });
  }
}
class Wd extends ae {
  constructor(e, r) {
    super("w:lvlOverride"), this.root.push(new Ud({ ilvl: e })), r !== void 0 && this.root.push(new zd(r));
  }
}
class jd extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", { val: "w:val" });
  }
}
class zd extends ae {
  constructor(e) {
    super("w:startOverride"), this.root.push(new jd({ val: e }));
  }
}
class Hd extends ae {
  constructor(e) {
    super("w:numbering"), ie(this, "abstractNumberingMap", /* @__PURE__ */ new Map()), ie(this, "concreteNumberingMap", /* @__PURE__ */ new Map()), ie(this, "referenceConfigMap", /* @__PURE__ */ new Map()), ie(this, "abstractNumUniqueNumericId", Dh()), ie(this, "concreteNumUniqueNumericId", Nh()), this.root.push(
      new bn(
        ["wpc", "mc", "o", "r", "m", "v", "wp14", "wp", "w10", "w", "w14", "w15", "wpg", "wpi", "wne", "wps"],
        "w14 w15 wp14"
      )
    );
    const r = new Ko(this.abstractNumUniqueNumericId(), [
      {
        level: 0,
        format: mt.BULLET,
        text: "●",
        alignment: qe.LEFT,
        style: {
          paragraph: {
            indent: { left: Xe(0.5), hanging: Xe(0.25) }
          }
        }
      },
      {
        level: 1,
        format: mt.BULLET,
        text: "○",
        alignment: qe.LEFT,
        style: {
          paragraph: {
            indent: { left: Xe(1), hanging: Xe(0.25) }
          }
        }
      },
      {
        level: 2,
        format: mt.BULLET,
        text: "■",
        alignment: qe.LEFT,
        style: {
          paragraph: {
            indent: { left: 2160, hanging: Xe(0.25) }
          }
        }
      },
      {
        level: 3,
        format: mt.BULLET,
        text: "●",
        alignment: qe.LEFT,
        style: {
          paragraph: {
            indent: { left: 2880, hanging: Xe(0.25) }
          }
        }
      },
      {
        level: 4,
        format: mt.BULLET,
        text: "○",
        alignment: qe.LEFT,
        style: {
          paragraph: {
            indent: { left: 3600, hanging: Xe(0.25) }
          }
        }
      },
      {
        level: 5,
        format: mt.BULLET,
        text: "■",
        alignment: qe.LEFT,
        style: {
          paragraph: {
            indent: { left: 4320, hanging: Xe(0.25) }
          }
        }
      },
      {
        level: 6,
        format: mt.BULLET,
        text: "●",
        alignment: qe.LEFT,
        style: {
          paragraph: {
            indent: { left: 5040, hanging: Xe(0.25) }
          }
        }
      },
      {
        level: 7,
        format: mt.BULLET,
        text: "●",
        alignment: qe.LEFT,
        style: {
          paragraph: {
            indent: { left: 5760, hanging: Xe(0.25) }
          }
        }
      },
      {
        level: 8,
        format: mt.BULLET,
        text: "●",
        alignment: qe.LEFT,
        style: {
          paragraph: {
            indent: { left: 6480, hanging: Xe(0.25) }
          }
        }
      }
    ]);
    this.concreteNumberingMap.set(
      "default-bullet-numbering",
      new $o({
        numId: 1,
        abstractNumId: r.id,
        reference: "default-bullet-numbering",
        instance: 0,
        overrideLevels: [
          {
            num: 0,
            start: 1
          }
        ]
      })
    ), this.abstractNumberingMap.set("default-bullet-numbering", r);
    for (const n of e.config)
      this.abstractNumberingMap.set(n.reference, new Ko(this.abstractNumUniqueNumericId(), n.levels)), this.referenceConfigMap.set(n.reference, n.levels);
  }
  prepForXml(e) {
    for (const r of this.abstractNumberingMap.values())
      this.root.push(r);
    for (const r of this.concreteNumberingMap.values())
      this.root.push(r);
    return super.prepForXml(e);
  }
  createConcreteNumberingInstance(e, r) {
    const n = this.abstractNumberingMap.get(e);
    if (!n)
      return;
    const i = `${e}-${r}`;
    if (this.concreteNumberingMap.has(i))
      return;
    const a = this.referenceConfigMap.get(e), l = a && a[0].start, s = {
      numId: this.concreteNumUniqueNumericId(),
      abstractNumId: n.id,
      reference: e,
      instance: r,
      overrideLevels: [
        l && Number.isInteger(l) ? {
          num: 0,
          start: l
        } : {
          num: 0,
          start: 1
        }
      ]
    };
    this.concreteNumberingMap.set(i, new $o(s));
  }
  get ConcreteNumbering() {
    return Array.from(this.concreteNumberingMap.values());
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get ReferenceConfig() {
    return Array.from(this.referenceConfigMap.values());
  }
}
class Yd extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      version: "w:val",
      name: "w:name",
      uri: "w:uri"
    });
  }
}
class qd extends ae {
  constructor(e) {
    super("w:compatSetting"), this.root.push(
      new Yd({
        version: e,
        uri: "http://schemas.microsoft.com/office/word",
        name: "compatibilityMode"
      })
    );
  }
}
class Gd extends ae {
  constructor(e) {
    super("w:compat"), e.version && this.root.push(new qd(e.version)), e.useSingleBorderforContiguousCells && this.root.push(new ue("w:useSingleBorderforContiguousCells", e.useSingleBorderforContiguousCells)), e.wordPerfectJustification && this.root.push(new ue("w:wpJustification", e.wordPerfectJustification)), e.noTabStopForHangingIndent && this.root.push(new ue("w:noTabHangInd", e.noTabStopForHangingIndent)), e.noLeading && this.root.push(new ue("w:noLeading", e.noLeading)), e.spaceForUnderline && this.root.push(new ue("w:spaceForUL", e.spaceForUnderline)), e.noColumnBalance && this.root.push(new ue("w:noColumnBalance", e.noColumnBalance)), e.balanceSingleByteDoubleByteWidth && this.root.push(new ue("w:balanceSingleByteDoubleByteWidth", e.balanceSingleByteDoubleByteWidth)), e.noExtraLineSpacing && this.root.push(new ue("w:noExtraLineSpacing", e.noExtraLineSpacing)), e.doNotLeaveBackslashAlone && this.root.push(new ue("w:doNotLeaveBackslashAlone", e.doNotLeaveBackslashAlone)), e.underlineTrailingSpaces && this.root.push(new ue("w:ulTrailSpace", e.underlineTrailingSpaces)), e.doNotExpandShiftReturn && this.root.push(new ue("w:doNotExpandShiftReturn", e.doNotExpandShiftReturn)), e.spacingInWholePoints && this.root.push(new ue("w:spacingInWholePoints", e.spacingInWholePoints)), e.lineWrapLikeWord6 && this.root.push(new ue("w:lineWrapLikeWord6", e.lineWrapLikeWord6)), e.printBodyTextBeforeHeader && this.root.push(new ue("w:printBodyTextBeforeHeader", e.printBodyTextBeforeHeader)), e.printColorsBlack && this.root.push(new ue("w:printColBlack", e.printColorsBlack)), e.spaceWidth && this.root.push(new ue("w:wpSpaceWidth", e.spaceWidth)), e.showBreaksInFrames && this.root.push(new ue("w:showBreaksInFrames", e.showBreaksInFrames)), e.subFontBySize && this.root.push(new ue("w:subFontBySize", e.subFontBySize)), e.suppressBottomSpacing && this.root.push(new ue("w:suppressBottomSpacing", e.suppressBottomSpacing)), e.suppressTopSpacing && this.root.push(new ue("w:suppressTopSpacing", e.suppressTopSpacing)), e.suppressSpacingAtTopOfPage && this.root.push(new ue("w:suppressSpacingAtTopOfPage", e.suppressSpacingAtTopOfPage)), e.suppressTopSpacingWP && this.root.push(new ue("w:suppressTopSpacingWP", e.suppressTopSpacingWP)), e.suppressSpBfAfterPgBrk && this.root.push(new ue("w:suppressSpBfAfterPgBrk", e.suppressSpBfAfterPgBrk)), e.swapBordersFacingPages && this.root.push(new ue("w:swapBordersFacingPages", e.swapBordersFacingPages)), e.convertMailMergeEsc && this.root.push(new ue("w:convMailMergeEsc", e.convertMailMergeEsc)), e.truncateFontHeightsLikeWP6 && this.root.push(new ue("w:truncateFontHeightsLikeWP6", e.truncateFontHeightsLikeWP6)), e.macWordSmallCaps && this.root.push(new ue("w:mwSmallCaps", e.macWordSmallCaps)), e.usePrinterMetrics && this.root.push(new ue("w:usePrinterMetrics", e.usePrinterMetrics)), e.doNotSuppressParagraphBorders && this.root.push(new ue("w:doNotSuppressParagraphBorders", e.doNotSuppressParagraphBorders)), e.wrapTrailSpaces && this.root.push(new ue("w:wrapTrailSpaces", e.wrapTrailSpaces)), e.footnoteLayoutLikeWW8 && this.root.push(new ue("w:footnoteLayoutLikeWW8", e.footnoteLayoutLikeWW8)), e.shapeLayoutLikeWW8 && this.root.push(new ue("w:shapeLayoutLikeWW8", e.shapeLayoutLikeWW8)), e.alignTablesRowByRow && this.root.push(new ue("w:alignTablesRowByRow", e.alignTablesRowByRow)), e.forgetLastTabAlignment && this.root.push(new ue("w:forgetLastTabAlignment", e.forgetLastTabAlignment)), e.adjustLineHeightInTable && this.root.push(new ue("w:adjustLineHeightInTable", e.adjustLineHeightInTable)), e.autoSpaceLikeWord95 && this.root.push(new ue("w:autoSpaceLikeWord95", e.autoSpaceLikeWord95)), e.noSpaceRaiseLower && this.root.push(new ue("w:noSpaceRaiseLower", e.noSpaceRaiseLower)), e.doNotUseHTMLParagraphAutoSpacing && this.root.push(new ue("w:doNotUseHTMLParagraphAutoSpacing", e.doNotUseHTMLParagraphAutoSpacing)), e.layoutRawTableWidth && this.root.push(new ue("w:layoutRawTableWidth", e.layoutRawTableWidth)), e.layoutTableRowsApart && this.root.push(new ue("w:layoutTableRowsApart", e.layoutTableRowsApart)), e.useWord97LineBreakRules && this.root.push(new ue("w:useWord97LineBreakRules", e.useWord97LineBreakRules)), e.doNotBreakWrappedTables && this.root.push(new ue("w:doNotBreakWrappedTables", e.doNotBreakWrappedTables)), e.doNotSnapToGridInCell && this.root.push(new ue("w:doNotSnapToGridInCell", e.doNotSnapToGridInCell)), e.selectFieldWithFirstOrLastCharacter && this.root.push(new ue("w:selectFldWithFirstOrLastChar", e.selectFieldWithFirstOrLastCharacter)), e.applyBreakingRules && this.root.push(new ue("w:applyBreakingRules", e.applyBreakingRules)), e.doNotWrapTextWithPunctuation && this.root.push(new ue("w:doNotWrapTextWithPunct", e.doNotWrapTextWithPunctuation)), e.doNotUseEastAsianBreakRules && this.root.push(new ue("w:doNotUseEastAsianBreakRules", e.doNotUseEastAsianBreakRules)), e.useWord2002TableStyleRules && this.root.push(new ue("w:useWord2002TableStyleRules", e.useWord2002TableStyleRules)), e.growAutofit && this.root.push(new ue("w:growAutofit", e.growAutofit)), e.useFELayout && this.root.push(new ue("w:useFELayout", e.useFELayout)), e.useNormalStyleForList && this.root.push(new ue("w:useNormalStyleForList", e.useNormalStyleForList)), e.doNotUseIndentAsNumberingTabStop && this.root.push(new ue("w:doNotUseIndentAsNumberingTabStop", e.doNotUseIndentAsNumberingTabStop)), e.useAlternateEastAsianLineBreakRules && this.root.push(new ue("w:useAltKinsokuLineBreakRules", e.useAlternateEastAsianLineBreakRules)), e.allowSpaceOfSameStyleInTable && this.root.push(new ue("w:allowSpaceOfSameStyleInTable", e.allowSpaceOfSameStyleInTable)), e.doNotSuppressIndentation && this.root.push(new ue("w:doNotSuppressIndentation", e.doNotSuppressIndentation)), e.doNotAutofitConstrainedTables && this.root.push(new ue("w:doNotAutofitConstrainedTables", e.doNotAutofitConstrainedTables)), e.autofitToFirstFixedWidthCell && this.root.push(new ue("w:autofitToFirstFixedWidthCell", e.autofitToFirstFixedWidthCell)), e.underlineTabInNumberingList && this.root.push(new ue("w:underlineTabInNumList", e.underlineTabInNumberingList)), e.displayHangulFixedWidth && this.root.push(new ue("w:displayHangulFixedWidth", e.displayHangulFixedWidth)), e.splitPgBreakAndParaMark && this.root.push(new ue("w:splitPgBreakAndParaMark", e.splitPgBreakAndParaMark)), e.doNotVerticallyAlignCellWithSp && this.root.push(new ue("w:doNotVertAlignCellWithSp", e.doNotVerticallyAlignCellWithSp)), e.doNotBreakConstrainedForcedTable && this.root.push(new ue("w:doNotBreakConstrainedForcedTable", e.doNotBreakConstrainedForcedTable)), e.ignoreVerticalAlignmentInTextboxes && this.root.push(new ue("w:doNotVertAlignInTxbx", e.ignoreVerticalAlignmentInTextboxes)), e.useAnsiKerningPairs && this.root.push(new ue("w:useAnsiKerningPairs", e.useAnsiKerningPairs)), e.cachedColumnBalance && this.root.push(new ue("w:cachedColBalance", e.cachedColumnBalance));
  }
}
class Vd extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      wpc: "xmlns:wpc",
      mc: "xmlns:mc",
      o: "xmlns:o",
      r: "xmlns:r",
      m: "xmlns:m",
      v: "xmlns:v",
      wp14: "xmlns:wp14",
      wp: "xmlns:wp",
      w10: "xmlns:w10",
      w: "xmlns:w",
      w14: "xmlns:w14",
      w15: "xmlns:w15",
      wpg: "xmlns:wpg",
      wpi: "xmlns:wpi",
      wne: "xmlns:wne",
      wps: "xmlns:wps",
      Ignorable: "mc:Ignorable"
    });
  }
}
class Kd extends ae {
  constructor(e) {
    var r, n, i, a, l, s, c, b;
    super("w:settings"), this.root.push(
      new Vd({
        wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
        mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
        o: "urn:schemas-microsoft-com:office:office",
        r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
        m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
        v: "urn:schemas-microsoft-com:vml",
        wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
        wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
        w10: "urn:schemas-microsoft-com:office:word",
        w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
        w14: "http://schemas.microsoft.com/office/word/2010/wordml",
        w15: "http://schemas.microsoft.com/office/word/2012/wordml",
        wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
        wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
        wne: "http://schemas.microsoft.com/office/word/2006/wordml",
        wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
        Ignorable: "w14 w15 wp14"
      })
    ), this.root.push(new ue("w:displayBackgroundShape", !0)), e.trackRevisions !== void 0 && this.root.push(new ue("w:trackRevisions", e.trackRevisions)), e.evenAndOddHeaders !== void 0 && this.root.push(new ue("w:evenAndOddHeaders", e.evenAndOddHeaders)), e.updateFields !== void 0 && this.root.push(new ue("w:updateFields", e.updateFields)), e.defaultTabStop !== void 0 && this.root.push(new kr("w:defaultTabStop", e.defaultTabStop)), ((r = e.hyphenation) == null ? void 0 : r.autoHyphenation) !== void 0 && this.root.push(new ue("w:autoHyphenation", e.hyphenation.autoHyphenation)), ((n = e.hyphenation) == null ? void 0 : n.hyphenationZone) !== void 0 && this.root.push(new kr("w:hyphenationZone", e.hyphenation.hyphenationZone)), ((i = e.hyphenation) == null ? void 0 : i.consecutiveHyphenLimit) !== void 0 && this.root.push(new kr("w:consecutiveHyphenLimit", e.hyphenation.consecutiveHyphenLimit)), ((a = e.hyphenation) == null ? void 0 : a.doNotHyphenateCaps) !== void 0 && this.root.push(new ue("w:doNotHyphenateCaps", e.hyphenation.doNotHyphenateCaps)), this.root.push(
      new Gd(Or(Se({}, (l = e.compatibility) != null ? l : {}), {
        version: (b = (c = (s = e.compatibility) == null ? void 0 : s.version) != null ? c : e.compatibilityModeVersion) != null ? b : 15
      }))
    );
  }
}
class Vu extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", { val: "w:val" });
  }
}
class $d extends ae {
  constructor(e) {
    super("w:name"), this.root.push(new Vu({ val: e }));
  }
}
class Zd extends ae {
  constructor(e) {
    super("w:uiPriority"), this.root.push(new Vu({ val: ze(e) }));
  }
}
class Xd extends ye {
  constructor() {
    super(...arguments), ie(this, "xmlKeys", {
      type: "w:type",
      styleId: "w:styleId",
      default: "w:default",
      customStyle: "w:customStyle"
    });
  }
}
class Ku extends ae {
  constructor(e, r) {
    super("w:style"), this.root.push(new Xd(e)), r.name && this.root.push(new $d(r.name)), r.basedOn && this.root.push(new qt("w:basedOn", r.basedOn)), r.next && this.root.push(new qt("w:next", r.next)), r.link && this.root.push(new qt("w:link", r.link)), r.uiPriority !== void 0 && this.root.push(new Zd(r.uiPriority)), r.semiHidden !== void 0 && this.root.push(new ue("w:semiHidden", r.semiHidden)), r.unhideWhenUsed !== void 0 && this.root.push(new ue("w:unhideWhenUsed", r.unhideWhenUsed)), r.quickFormat !== void 0 && this.root.push(new ue("w:qFormat", r.quickFormat));
  }
}
class xn extends Ku {
  constructor(e) {
    super({ type: "paragraph", styleId: e.id }, e), ie(this, "paragraphProperties"), ie(this, "runProperties"), this.paragraphProperties = new cr(e.paragraph), this.runProperties = new Vt(e.run), this.root.push(this.paragraphProperties), this.root.push(this.runProperties);
  }
}
class Sn extends Ku {
  constructor(e) {
    super(
      { type: "character", styleId: e.id },
      Se({
        uiPriority: 99,
        unhideWhenUsed: !0
      }, e)
    ), ie(this, "runProperties"), this.runProperties = new Vt(e.run), this.root.push(this.runProperties);
  }
}
class Lt extends xn {
  constructor(e) {
    super(Se({
      basedOn: "Normal",
      next: "Normal",
      quickFormat: !0
    }, e));
  }
}
class Jd extends Lt {
  constructor(e) {
    super(Se({
      id: "Title",
      name: "Title"
    }, e));
  }
}
class Qd extends Lt {
  constructor(e) {
    super(Se({
      id: "Heading1",
      name: "Heading 1"
    }, e));
  }
}
class ep extends Lt {
  constructor(e) {
    super(Se({
      id: "Heading2",
      name: "Heading 2"
    }, e));
  }
}
class tp extends Lt {
  constructor(e) {
    super(Se({
      id: "Heading3",
      name: "Heading 3"
    }, e));
  }
}
class rp extends Lt {
  constructor(e) {
    super(Se({
      id: "Heading4",
      name: "Heading 4"
    }, e));
  }
}
class np extends Lt {
  constructor(e) {
    super(Se({
      id: "Heading5",
      name: "Heading 5"
    }, e));
  }
}
class ip extends Lt {
  constructor(e) {
    super(Se({
      id: "Heading6",
      name: "Heading 6"
    }, e));
  }
}
class sp extends Lt {
  constructor(e) {
    super(Se({
      id: "Strong",
      name: "Strong"
    }, e));
  }
}
class ap extends xn {
  constructor(e) {
    super(Se({
      id: "ListParagraph",
      name: "List Paragraph",
      basedOn: "Normal",
      quickFormat: !0
    }, e));
  }
}
class op extends xn {
  constructor(e) {
    super(Se({
      id: "FootnoteText",
      name: "footnote text",
      link: "FootnoteTextChar",
      basedOn: "Normal",
      uiPriority: 99,
      semiHidden: !0,
      unhideWhenUsed: !0,
      paragraph: {
        spacing: {
          after: 0,
          line: 240,
          lineRule: ms.AUTO
        }
      },
      run: {
        size: 20
      }
    }, e));
  }
}
class up extends Sn {
  constructor(e) {
    super(Se({
      id: "FootnoteReference",
      name: "footnote reference",
      basedOn: "DefaultParagraphFont",
      semiHidden: !0,
      run: {
        superScript: !0
      }
    }, e));
  }
}
class lp extends Sn {
  constructor(e) {
    super(Se({
      id: "FootnoteTextChar",
      name: "Footnote Text Char",
      basedOn: "DefaultParagraphFont",
      link: "FootnoteText",
      semiHidden: !0,
      run: {
        size: 20
      }
    }, e));
  }
}
class cp extends Sn {
  constructor(e) {
    super(Se({
      id: "Hyperlink",
      name: "Hyperlink",
      basedOn: "DefaultParagraphFont",
      run: {
        color: "0563C1",
        underline: {
          type: Pu.SINGLE
        }
      }
    }, e));
  }
}
class ws extends ae {
  constructor(e) {
    if (super("w:styles"), e.initialStyles && this.root.push(e.initialStyles), e.importedStyles)
      for (const r of e.importedStyles)
        this.root.push(r);
    if (e.paragraphStyles)
      for (const r of e.paragraphStyles)
        this.root.push(new xn(r));
    if (e.characterStyles)
      for (const r of e.characterStyles)
        this.root.push(new Sn(r));
  }
}
class hp extends ae {
  constructor(e) {
    super("w:pPrDefault"), this.root.push(new cr(e));
  }
}
class fp extends ae {
  constructor(e) {
    super("w:rPrDefault"), this.root.push(new Vt(e));
  }
}
class dp extends ae {
  constructor(e) {
    super("w:docDefaults"), ie(this, "runPropertiesDefaults"), ie(this, "paragraphPropertiesDefaults"), this.runPropertiesDefaults = new fp(e.run), this.paragraphPropertiesDefaults = new hp(e.paragraph), this.root.push(this.runPropertiesDefaults), this.root.push(this.paragraphPropertiesDefaults);
  }
}
class pp {
  /**
   * Creates new Style based on the given styles.
   * Parses the styles and convert them to XmlComponent.
   * Example content from styles.xml:
   * <?xml version="1.0">
   * <w:styles xmlns:mc="some schema" ...>
   *
   *   <w:style w:type="paragraph" w:styleId="Heading1">
   *           <w:name w:val="heading 1"/>
   *           .....
   *   </w:style>
   *
   *   <w:style w:type="paragraph" w:styleId="Heading2">
   *           <w:name w:val="heading 2"/>
   *           .....
   *   </w:style>
   *
   *   <w:docDefaults>Or any other element will be parsed to</w:docDefaults>
   *
   * </w:styles>
   *
   * @param externalStyles context from styles.xml
   */
  newInstance(e) {
    const r = Ou.xml2js(e, { compact: !1 });
    let n;
    for (const l of r.elements || [])
      l.name === "w:styles" && (n = l);
    if (n === void 0)
      throw new Error("can not find styles element");
    const i = n.elements || [];
    return new ws({
      initialStyles: new zc(n.attributes),
      importedStyles: i.map((l) => Fs(l))
    });
  }
}
class Zo {
  newInstance(e = {}) {
    var r;
    return {
      initialStyles: new bn(["mc", "r", "w", "w14", "w15"], "w14 w15"),
      importedStyles: [
        new dp((r = e.document) != null ? r : {}),
        new Jd(Se({
          run: {
            size: 56
          }
        }, e.title)),
        new Qd(Se({
          run: {
            color: "2E74B5",
            size: 32
          }
        }, e.heading1)),
        new ep(Se({
          run: {
            color: "2E74B5",
            size: 26
          }
        }, e.heading2)),
        new tp(Se({
          run: {
            color: "1F4D78",
            size: 24
          }
        }, e.heading3)),
        new rp(Se({
          run: {
            color: "2E74B5",
            italics: !0
          }
        }, e.heading4)),
        new np(Se({
          run: {
            color: "2E74B5"
          }
        }, e.heading5)),
        new ip(Se({
          run: {
            color: "1F4D78"
          }
        }, e.heading6)),
        new sp(Se({
          run: {
            bold: !0
          }
        }, e.strong)),
        new ap(e.listParagraph || {}),
        new cp(e.hyperlink || {}),
        new up(e.footnoteReference || {}),
        new op(e.footnoteText || {}),
        new lp(e.footnoteTextChar || {})
      ]
    };
  }
}
class mp {
  constructor(e) {
    ie(this, "currentRelationshipId", 1), ie(this, "documentWrapper"), ie(this, "headers", []), ie(this, "footers", []), ie(this, "coreProperties"), ie(this, "numbering"), ie(this, "media"), ie(this, "fileRelationships"), ie(this, "footnotesWrapper"), ie(this, "settings"), ie(this, "contentTypes"), ie(this, "customProperties"), ie(this, "appProperties"), ie(this, "styles"), ie(this, "comments"), ie(this, "fontWrapper");
    var r, n, i, a, l, s, c, b, S, A, R, _;
    if (this.coreProperties = new Qf(Or(Se({}, e), {
      creator: (r = e.creator) != null ? r : "Un-named",
      revision: (n = e.revision) != null ? n : 1,
      lastModifiedBy: (i = e.lastModifiedBy) != null ? i : "Un-named"
    })), this.numbering = new Hd(e.numbering ? e.numbering : { config: [] }), this.comments = new Bh((a = e.comments) != null ? a : { children: [] }), this.fileRelationships = new fr(), this.customProperties = new sd((l = e.customProperties) != null ? l : []), this.appProperties = new Kf(), this.footnotesWrapper = new xd(), this.contentTypes = new Jf(), this.documentWrapper = new zu({ background: e.background }), this.settings = new Kd({
      compatibilityModeVersion: e.compatabilityModeVersion,
      compatibility: e.compatibility,
      evenAndOddHeaders: !!e.evenAndOddHeaderAndFooters,
      trackRevisions: (s = e.features) == null ? void 0 : s.trackRevisions,
      updateFields: (c = e.features) == null ? void 0 : c.updateFields,
      defaultTabStop: e.defaultTabStop,
      hyphenation: {
        autoHyphenation: (b = e.hyphenation) == null ? void 0 : b.autoHyphenation,
        hyphenationZone: (S = e.hyphenation) == null ? void 0 : S.hyphenationZone,
        consecutiveHyphenLimit: (A = e.hyphenation) == null ? void 0 : A.consecutiveHyphenLimit,
        doNotHyphenateCaps: (R = e.hyphenation) == null ? void 0 : R.doNotHyphenateCaps
      }
    }), this.media = new kd(), e.externalStyles !== void 0) {
      const k = new pp();
      this.styles = k.newInstance(e.externalStyles);
    } else if (e.styles) {
      const d = new Zo().newInstance(e.styles.default);
      this.styles = new ws(Se(Se({}, d), e.styles));
    } else {
      const k = new Zo();
      this.styles = new ws(k.newInstance());
    }
    this.addDefaultRelationships();
    for (const k of e.sections)
      this.addSection(k);
    if (e.footnotes)
      for (const k in e.footnotes)
        this.footnotesWrapper.View.createFootNote(parseFloat(k), e.footnotes[k].children);
    this.fontWrapper = new ld((_ = e.fonts) != null ? _ : []);
  }
  addSection({ headers: e = {}, footers: r = {}, children: n, properties: i }) {
    this.documentWrapper.View.Body.addSection(Or(Se({}, i), {
      headerWrapperGroup: {
        default: e.default ? this.createHeader(e.default) : void 0,
        first: e.first ? this.createHeader(e.first) : void 0,
        even: e.even ? this.createHeader(e.even) : void 0
      },
      footerWrapperGroup: {
        default: r.default ? this.createFooter(r.default) : void 0,
        first: r.first ? this.createFooter(r.first) : void 0,
        even: r.even ? this.createFooter(r.even) : void 0
      }
    }));
    for (const a of n)
      this.documentWrapper.View.add(a);
  }
  createHeader(e) {
    const r = new Td(this.media, this.currentRelationshipId++);
    for (const n of e.options.children)
      r.add(n);
    return this.addHeaderToDocument(r), r;
  }
  createFooter(e) {
    const r = new fd(this.media, this.currentRelationshipId++);
    for (const n of e.options.children)
      r.add(n);
    return this.addFooterToDocument(r), r;
  }
  addHeaderToDocument(e, r = rr.DEFAULT) {
    this.headers.push({ header: e, type: r }), this.documentWrapper.Relationships.createRelationship(
      e.View.ReferenceId,
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/header",
      `header${this.headers.length}.xml`
    ), this.contentTypes.addHeader(this.headers.length);
  }
  addFooterToDocument(e, r = rr.DEFAULT) {
    this.footers.push({ footer: e, type: r }), this.documentWrapper.Relationships.createRelationship(
      e.View.ReferenceId,
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer",
      `footer${this.footers.length}.xml`
    ), this.contentTypes.addFooter(this.footers.length);
  }
  addDefaultRelationships() {
    this.fileRelationships.createRelationship(
      1,
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
      "word/document.xml"
    ), this.fileRelationships.createRelationship(
      2,
      "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties",
      "docProps/core.xml"
    ), this.fileRelationships.createRelationship(
      3,
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties",
      "docProps/app.xml"
    ), this.fileRelationships.createRelationship(
      4,
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties",
      "docProps/custom.xml"
    ), this.documentWrapper.Relationships.createRelationship(
      // eslint-disable-next-line functional/immutable-data
      this.currentRelationshipId++,
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
      "styles.xml"
    ), this.documentWrapper.Relationships.createRelationship(
      // eslint-disable-next-line functional/immutable-data
      this.currentRelationshipId++,
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering",
      "numbering.xml"
    ), this.documentWrapper.Relationships.createRelationship(
      // eslint-disable-next-line functional/immutable-data
      this.currentRelationshipId++,
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes",
      "footnotes.xml"
    ), this.documentWrapper.Relationships.createRelationship(
      // eslint-disable-next-line functional/immutable-data
      this.currentRelationshipId++,
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings",
      "settings.xml"
    ), this.documentWrapper.Relationships.createRelationship(
      // eslint-disable-next-line functional/immutable-data
      this.currentRelationshipId++,
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments",
      "comments.xml"
    );
  }
  get Document() {
    return this.documentWrapper;
  }
  get Styles() {
    return this.styles;
  }
  get CoreProperties() {
    return this.coreProperties;
  }
  get Numbering() {
    return this.numbering;
  }
  get Media() {
    return this.media;
  }
  get FileRelationships() {
    return this.fileRelationships;
  }
  get Headers() {
    return this.headers.map((e) => e.header);
  }
  get Footers() {
    return this.footers.map((e) => e.footer);
  }
  get ContentTypes() {
    return this.contentTypes;
  }
  get CustomProperties() {
    return this.customProperties;
  }
  get AppProperties() {
    return this.appProperties;
  }
  get FootNotes() {
    return this.footnotesWrapper;
  }
  get Settings() {
    return this.settings;
  }
  get Comments() {
    return this.comments;
  }
  get FontTable() {
    return this.fontWrapper;
  }
}
var wp = Ns();
function en(t) {
  throw new Error('Could not dynamically require "' + t + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var is = { exports: {} }, Xo;
function yp() {
  return Xo || (Xo = 1, function(t, e) {
    (function(r) {
      t.exports = r();
    })(function() {
      return function r(n, i, a) {
        function l(b, S) {
          if (!i[b]) {
            if (!n[b]) {
              var A = typeof en == "function" && en;
              if (!S && A) return A(b, !0);
              if (s) return s(b, !0);
              var R = new Error("Cannot find module '" + b + "'");
              throw R.code = "MODULE_NOT_FOUND", R;
            }
            var _ = i[b] = { exports: {} };
            n[b][0].call(_.exports, function(k) {
              var d = n[b][1][k];
              return l(d || k);
            }, _, _.exports, r, n, i, a);
          }
          return i[b].exports;
        }
        for (var s = typeof en == "function" && en, c = 0; c < a.length; c++) l(a[c]);
        return l;
      }({ 1: [function(r, n, i) {
        var a = r("./utils"), l = r("./support"), s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        i.encode = function(c) {
          for (var b, S, A, R, _, k, d, O = [], h = 0, g = c.length, w = g, f = a.getTypeOf(c) !== "string"; h < c.length; ) w = g - h, A = f ? (b = c[h++], S = h < g ? c[h++] : 0, h < g ? c[h++] : 0) : (b = c.charCodeAt(h++), S = h < g ? c.charCodeAt(h++) : 0, h < g ? c.charCodeAt(h++) : 0), R = b >> 2, _ = (3 & b) << 4 | S >> 4, k = 1 < w ? (15 & S) << 2 | A >> 6 : 64, d = 2 < w ? 63 & A : 64, O.push(s.charAt(R) + s.charAt(_) + s.charAt(k) + s.charAt(d));
          return O.join("");
        }, i.decode = function(c) {
          var b, S, A, R, _, k, d = 0, O = 0, h = "data:";
          if (c.substr(0, h.length) === h) throw new Error("Invalid base64 input, it looks like a data url.");
          var g, w = 3 * (c = c.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
          if (c.charAt(c.length - 1) === s.charAt(64) && w--, c.charAt(c.length - 2) === s.charAt(64) && w--, w % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
          for (g = l.uint8array ? new Uint8Array(0 | w) : new Array(0 | w); d < c.length; ) b = s.indexOf(c.charAt(d++)) << 2 | (R = s.indexOf(c.charAt(d++))) >> 4, S = (15 & R) << 4 | (_ = s.indexOf(c.charAt(d++))) >> 2, A = (3 & _) << 6 | (k = s.indexOf(c.charAt(d++))), g[O++] = b, _ !== 64 && (g[O++] = S), k !== 64 && (g[O++] = A);
          return g;
        };
      }, { "./support": 30, "./utils": 32 }], 2: [function(r, n, i) {
        var a = r("./external"), l = r("./stream/DataWorker"), s = r("./stream/Crc32Probe"), c = r("./stream/DataLengthProbe");
        function b(S, A, R, _, k) {
          this.compressedSize = S, this.uncompressedSize = A, this.crc32 = R, this.compression = _, this.compressedContent = k;
        }
        b.prototype = { getContentWorker: function() {
          var S = new l(a.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new c("data_length")), A = this;
          return S.on("end", function() {
            if (this.streamInfo.data_length !== A.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
          }), S;
        }, getCompressedWorker: function() {
          return new l(a.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
        } }, b.createWorkerFrom = function(S, A, R) {
          return S.pipe(new s()).pipe(new c("uncompressedSize")).pipe(A.compressWorker(R)).pipe(new c("compressedSize")).withStreamInfo("compression", A);
        }, n.exports = b;
      }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(r, n, i) {
        var a = r("./stream/GenericWorker");
        i.STORE = { magic: "\0\0", compressWorker: function() {
          return new a("STORE compression");
        }, uncompressWorker: function() {
          return new a("STORE decompression");
        } }, i.DEFLATE = r("./flate");
      }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(r, n, i) {
        var a = r("./utils"), l = function() {
          for (var s, c = [], b = 0; b < 256; b++) {
            s = b;
            for (var S = 0; S < 8; S++) s = 1 & s ? 3988292384 ^ s >>> 1 : s >>> 1;
            c[b] = s;
          }
          return c;
        }();
        n.exports = function(s, c) {
          return s !== void 0 && s.length ? a.getTypeOf(s) !== "string" ? function(b, S, A, R) {
            var _ = l, k = R + A;
            b ^= -1;
            for (var d = R; d < k; d++) b = b >>> 8 ^ _[255 & (b ^ S[d])];
            return -1 ^ b;
          }(0 | c, s, s.length, 0) : function(b, S, A, R) {
            var _ = l, k = R + A;
            b ^= -1;
            for (var d = R; d < k; d++) b = b >>> 8 ^ _[255 & (b ^ S.charCodeAt(d))];
            return -1 ^ b;
          }(0 | c, s, s.length, 0) : 0;
        };
      }, { "./utils": 32 }], 5: [function(r, n, i) {
        i.base64 = !1, i.binary = !1, i.dir = !1, i.createFolders = !0, i.date = null, i.compression = null, i.compressionOptions = null, i.comment = null, i.unixPermissions = null, i.dosPermissions = null;
      }, {}], 6: [function(r, n, i) {
        var a = null;
        a = typeof Promise < "u" ? Promise : r("lie"), n.exports = { Promise: a };
      }, { lie: 37 }], 7: [function(r, n, i) {
        var a = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", l = r("pako"), s = r("./utils"), c = r("./stream/GenericWorker"), b = a ? "uint8array" : "array";
        function S(A, R) {
          c.call(this, "FlateWorker/" + A), this._pako = null, this._pakoAction = A, this._pakoOptions = R, this.meta = {};
        }
        i.magic = "\b\0", s.inherits(S, c), S.prototype.processChunk = function(A) {
          this.meta = A.meta, this._pako === null && this._createPako(), this._pako.push(s.transformTo(b, A.data), !1);
        }, S.prototype.flush = function() {
          c.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
        }, S.prototype.cleanUp = function() {
          c.prototype.cleanUp.call(this), this._pako = null;
        }, S.prototype._createPako = function() {
          this._pako = new l[this._pakoAction]({ raw: !0, level: this._pakoOptions.level || -1 });
          var A = this;
          this._pako.onData = function(R) {
            A.push({ data: R, meta: A.meta });
          };
        }, i.compressWorker = function(A) {
          return new S("Deflate", A);
        }, i.uncompressWorker = function() {
          return new S("Inflate", {});
        };
      }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(r, n, i) {
        function a(_, k) {
          var d, O = "";
          for (d = 0; d < k; d++) O += String.fromCharCode(255 & _), _ >>>= 8;
          return O;
        }
        function l(_, k, d, O, h, g) {
          var w, f, T = _.file, P = _.compression, L = g !== b.utf8encode, H = s.transformTo("string", g(T.name)), D = s.transformTo("string", b.utf8encode(T.name)), Z = T.comment, ce = s.transformTo("string", g(Z)), N = s.transformTo("string", b.utf8encode(Z)), U = D.length !== T.name.length, v = N.length !== Z.length, V = "", Q = "", j = "", te = T.dir, X = T.date, oe = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
          k && !d || (oe.crc32 = _.crc32, oe.compressedSize = _.compressedSize, oe.uncompressedSize = _.uncompressedSize);
          var Y = 0;
          k && (Y |= 8), L || !U && !v || (Y |= 2048);
          var C = 0, K = 0;
          te && (C |= 16), h === "UNIX" ? (K = 798, C |= function(re, G) {
            var x = re;
            return re || (x = G ? 16893 : 33204), (65535 & x) << 16;
          }(T.unixPermissions, te)) : (K = 20, C |= function(re) {
            return 63 & (re || 0);
          }(T.dosPermissions)), w = X.getUTCHours(), w <<= 6, w |= X.getUTCMinutes(), w <<= 5, w |= X.getUTCSeconds() / 2, f = X.getUTCFullYear() - 1980, f <<= 4, f |= X.getUTCMonth() + 1, f <<= 5, f |= X.getUTCDate(), U && (Q = a(1, 1) + a(S(H), 4) + D, V += "up" + a(Q.length, 2) + Q), v && (j = a(1, 1) + a(S(ce), 4) + N, V += "uc" + a(j.length, 2) + j);
          var $ = "";
          return $ += `
\0`, $ += a(Y, 2), $ += P.magic, $ += a(w, 2), $ += a(f, 2), $ += a(oe.crc32, 4), $ += a(oe.compressedSize, 4), $ += a(oe.uncompressedSize, 4), $ += a(H.length, 2), $ += a(V.length, 2), { fileRecord: A.LOCAL_FILE_HEADER + $ + H + V, dirRecord: A.CENTRAL_FILE_HEADER + a(K, 2) + $ + a(ce.length, 2) + "\0\0\0\0" + a(C, 4) + a(O, 4) + H + V + ce };
        }
        var s = r("../utils"), c = r("../stream/GenericWorker"), b = r("../utf8"), S = r("../crc32"), A = r("../signature");
        function R(_, k, d, O) {
          c.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = k, this.zipPlatform = d, this.encodeFileName = O, this.streamFiles = _, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
        }
        s.inherits(R, c), R.prototype.push = function(_) {
          var k = _.meta.percent || 0, d = this.entriesCount, O = this._sources.length;
          this.accumulate ? this.contentBuffer.push(_) : (this.bytesWritten += _.data.length, c.prototype.push.call(this, { data: _.data, meta: { currentFile: this.currentFile, percent: d ? (k + 100 * (d - O - 1)) / d : 100 } }));
        }, R.prototype.openedSource = function(_) {
          this.currentSourceOffset = this.bytesWritten, this.currentFile = _.file.name;
          var k = this.streamFiles && !_.file.dir;
          if (k) {
            var d = l(_, k, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            this.push({ data: d.fileRecord, meta: { percent: 0 } });
          } else this.accumulate = !0;
        }, R.prototype.closedSource = function(_) {
          this.accumulate = !1;
          var k = this.streamFiles && !_.file.dir, d = l(_, k, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          if (this.dirRecords.push(d.dirRecord), k) this.push({ data: function(O) {
            return A.DATA_DESCRIPTOR + a(O.crc32, 4) + a(O.compressedSize, 4) + a(O.uncompressedSize, 4);
          }(_), meta: { percent: 100 } });
          else for (this.push({ data: d.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
          this.currentFile = null;
        }, R.prototype.flush = function() {
          for (var _ = this.bytesWritten, k = 0; k < this.dirRecords.length; k++) this.push({ data: this.dirRecords[k], meta: { percent: 100 } });
          var d = this.bytesWritten - _, O = function(h, g, w, f, T) {
            var P = s.transformTo("string", T(f));
            return A.CENTRAL_DIRECTORY_END + "\0\0\0\0" + a(h, 2) + a(h, 2) + a(g, 4) + a(w, 4) + a(P.length, 2) + P;
          }(this.dirRecords.length, d, _, this.zipComment, this.encodeFileName);
          this.push({ data: O, meta: { percent: 100 } });
        }, R.prototype.prepareNextSource = function() {
          this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
        }, R.prototype.registerPrevious = function(_) {
          this._sources.push(_);
          var k = this;
          return _.on("data", function(d) {
            k.processChunk(d);
          }), _.on("end", function() {
            k.closedSource(k.previous.streamInfo), k._sources.length ? k.prepareNextSource() : k.end();
          }), _.on("error", function(d) {
            k.error(d);
          }), this;
        }, R.prototype.resume = function() {
          return !!c.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
        }, R.prototype.error = function(_) {
          var k = this._sources;
          if (!c.prototype.error.call(this, _)) return !1;
          for (var d = 0; d < k.length; d++) try {
            k[d].error(_);
          } catch {
          }
          return !0;
        }, R.prototype.lock = function() {
          c.prototype.lock.call(this);
          for (var _ = this._sources, k = 0; k < _.length; k++) _[k].lock();
        }, n.exports = R;
      }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(r, n, i) {
        var a = r("../compressions"), l = r("./ZipFileWorker");
        i.generateWorker = function(s, c, b) {
          var S = new l(c.streamFiles, b, c.platform, c.encodeFileName), A = 0;
          try {
            s.forEach(function(R, _) {
              A++;
              var k = function(g, w) {
                var f = g || w, T = a[f];
                if (!T) throw new Error(f + " is not a valid compression method !");
                return T;
              }(_.options.compression, c.compression), d = _.options.compressionOptions || c.compressionOptions || {}, O = _.dir, h = _.date;
              _._compressWorker(k, d).withStreamInfo("file", { name: R, dir: O, date: h, comment: _.comment || "", unixPermissions: _.unixPermissions, dosPermissions: _.dosPermissions }).pipe(S);
            }), S.entriesCount = A;
          } catch (R) {
            S.error(R);
          }
          return S;
        };
      }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(r, n, i) {
        function a() {
          if (!(this instanceof a)) return new a();
          if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
          this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
            var l = new a();
            for (var s in this) typeof this[s] != "function" && (l[s] = this[s]);
            return l;
          };
        }
        (a.prototype = r("./object")).loadAsync = r("./load"), a.support = r("./support"), a.defaults = r("./defaults"), a.version = "3.10.1", a.loadAsync = function(l, s) {
          return new a().loadAsync(l, s);
        }, a.external = r("./external"), n.exports = a;
      }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(r, n, i) {
        var a = r("./utils"), l = r("./external"), s = r("./utf8"), c = r("./zipEntries"), b = r("./stream/Crc32Probe"), S = r("./nodejsUtils");
        function A(R) {
          return new l.Promise(function(_, k) {
            var d = R.decompressed.getContentWorker().pipe(new b());
            d.on("error", function(O) {
              k(O);
            }).on("end", function() {
              d.streamInfo.crc32 !== R.decompressed.crc32 ? k(new Error("Corrupted zip : CRC32 mismatch")) : _();
            }).resume();
          });
        }
        n.exports = function(R, _) {
          var k = this;
          return _ = a.extend(_ || {}, { base64: !1, checkCRC32: !1, optimizedBinaryString: !1, createFolders: !1, decodeFileName: s.utf8decode }), S.isNode && S.isStream(R) ? l.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : a.prepareContent("the loaded zip file", R, !0, _.optimizedBinaryString, _.base64).then(function(d) {
            var O = new c(_);
            return O.load(d), O;
          }).then(function(d) {
            var O = [l.Promise.resolve(d)], h = d.files;
            if (_.checkCRC32) for (var g = 0; g < h.length; g++) O.push(A(h[g]));
            return l.Promise.all(O);
          }).then(function(d) {
            for (var O = d.shift(), h = O.files, g = 0; g < h.length; g++) {
              var w = h[g], f = w.fileNameStr, T = a.resolve(w.fileNameStr);
              k.file(T, w.decompressed, { binary: !0, optimizedBinaryString: !0, date: w.date, dir: w.dir, comment: w.fileCommentStr.length ? w.fileCommentStr : null, unixPermissions: w.unixPermissions, dosPermissions: w.dosPermissions, createFolders: _.createFolders }), w.dir || (k.file(T).unsafeOriginalName = f);
            }
            return O.zipComment.length && (k.comment = O.zipComment), k;
          });
        };
      }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(r, n, i) {
        var a = r("../utils"), l = r("../stream/GenericWorker");
        function s(c, b) {
          l.call(this, "Nodejs stream input adapter for " + c), this._upstreamEnded = !1, this._bindStream(b);
        }
        a.inherits(s, l), s.prototype._bindStream = function(c) {
          var b = this;
          (this._stream = c).pause(), c.on("data", function(S) {
            b.push({ data: S, meta: { percent: 0 } });
          }).on("error", function(S) {
            b.isPaused ? this.generatedError = S : b.error(S);
          }).on("end", function() {
            b.isPaused ? b._upstreamEnded = !0 : b.end();
          });
        }, s.prototype.pause = function() {
          return !!l.prototype.pause.call(this) && (this._stream.pause(), !0);
        }, s.prototype.resume = function() {
          return !!l.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
        }, n.exports = s;
      }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(r, n, i) {
        var a = r("readable-stream").Readable;
        function l(s, c, b) {
          a.call(this, c), this._helper = s;
          var S = this;
          s.on("data", function(A, R) {
            S.push(A) || S._helper.pause(), b && b(R);
          }).on("error", function(A) {
            S.emit("error", A);
          }).on("end", function() {
            S.push(null);
          });
        }
        r("../utils").inherits(l, a), l.prototype._read = function() {
          this._helper.resume();
        }, n.exports = l;
      }, { "../utils": 32, "readable-stream": 16 }], 14: [function(r, n, i) {
        n.exports = { isNode: typeof Buffer < "u", newBufferFrom: function(a, l) {
          if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(a, l);
          if (typeof a == "number") throw new Error('The "data" argument must not be a number');
          return new Buffer(a, l);
        }, allocBuffer: function(a) {
          if (Buffer.alloc) return Buffer.alloc(a);
          var l = new Buffer(a);
          return l.fill(0), l;
        }, isBuffer: function(a) {
          return Buffer.isBuffer(a);
        }, isStream: function(a) {
          return a && typeof a.on == "function" && typeof a.pause == "function" && typeof a.resume == "function";
        } };
      }, {}], 15: [function(r, n, i) {
        function a(T, P, L) {
          var H, D = s.getTypeOf(P), Z = s.extend(L || {}, S);
          Z.date = Z.date || /* @__PURE__ */ new Date(), Z.compression !== null && (Z.compression = Z.compression.toUpperCase()), typeof Z.unixPermissions == "string" && (Z.unixPermissions = parseInt(Z.unixPermissions, 8)), Z.unixPermissions && 16384 & Z.unixPermissions && (Z.dir = !0), Z.dosPermissions && 16 & Z.dosPermissions && (Z.dir = !0), Z.dir && (T = h(T)), Z.createFolders && (H = O(T)) && g.call(this, H, !0);
          var ce = D === "string" && Z.binary === !1 && Z.base64 === !1;
          L && L.binary !== void 0 || (Z.binary = !ce), (P instanceof A && P.uncompressedSize === 0 || Z.dir || !P || P.length === 0) && (Z.base64 = !1, Z.binary = !0, P = "", Z.compression = "STORE", D = "string");
          var N = null;
          N = P instanceof A || P instanceof c ? P : k.isNode && k.isStream(P) ? new d(T, P) : s.prepareContent(T, P, Z.binary, Z.optimizedBinaryString, Z.base64);
          var U = new R(T, N, Z);
          this.files[T] = U;
        }
        var l = r("./utf8"), s = r("./utils"), c = r("./stream/GenericWorker"), b = r("./stream/StreamHelper"), S = r("./defaults"), A = r("./compressedObject"), R = r("./zipObject"), _ = r("./generate"), k = r("./nodejsUtils"), d = r("./nodejs/NodejsStreamInputAdapter"), O = function(T) {
          T.slice(-1) === "/" && (T = T.substring(0, T.length - 1));
          var P = T.lastIndexOf("/");
          return 0 < P ? T.substring(0, P) : "";
        }, h = function(T) {
          return T.slice(-1) !== "/" && (T += "/"), T;
        }, g = function(T, P) {
          return P = P !== void 0 ? P : S.createFolders, T = h(T), this.files[T] || a.call(this, T, null, { dir: !0, createFolders: P }), this.files[T];
        };
        function w(T) {
          return Object.prototype.toString.call(T) === "[object RegExp]";
        }
        var f = { load: function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, forEach: function(T) {
          var P, L, H;
          for (P in this.files) H = this.files[P], (L = P.slice(this.root.length, P.length)) && P.slice(0, this.root.length) === this.root && T(L, H);
        }, filter: function(T) {
          var P = [];
          return this.forEach(function(L, H) {
            T(L, H) && P.push(H);
          }), P;
        }, file: function(T, P, L) {
          if (arguments.length !== 1) return T = this.root + T, a.call(this, T, P, L), this;
          if (w(T)) {
            var H = T;
            return this.filter(function(Z, ce) {
              return !ce.dir && H.test(Z);
            });
          }
          var D = this.files[this.root + T];
          return D && !D.dir ? D : null;
        }, folder: function(T) {
          if (!T) return this;
          if (w(T)) return this.filter(function(D, Z) {
            return Z.dir && T.test(D);
          });
          var P = this.root + T, L = g.call(this, P), H = this.clone();
          return H.root = L.name, H;
        }, remove: function(T) {
          T = this.root + T;
          var P = this.files[T];
          if (P || (T.slice(-1) !== "/" && (T += "/"), P = this.files[T]), P && !P.dir) delete this.files[T];
          else for (var L = this.filter(function(D, Z) {
            return Z.name.slice(0, T.length) === T;
          }), H = 0; H < L.length; H++) delete this.files[L[H].name];
          return this;
        }, generate: function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, generateInternalStream: function(T) {
          var P, L = {};
          try {
            if ((L = s.extend(T || {}, { streamFiles: !1, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: l.utf8encode })).type = L.type.toLowerCase(), L.compression = L.compression.toUpperCase(), L.type === "binarystring" && (L.type = "string"), !L.type) throw new Error("No output type specified.");
            s.checkSupport(L.type), L.platform !== "darwin" && L.platform !== "freebsd" && L.platform !== "linux" && L.platform !== "sunos" || (L.platform = "UNIX"), L.platform === "win32" && (L.platform = "DOS");
            var H = L.comment || this.comment || "";
            P = _.generateWorker(this, L, H);
          } catch (D) {
            (P = new c("error")).error(D);
          }
          return new b(P, L.type || "string", L.mimeType);
        }, generateAsync: function(T, P) {
          return this.generateInternalStream(T).accumulate(P);
        }, generateNodeStream: function(T, P) {
          return (T = T || {}).type || (T.type = "nodebuffer"), this.generateInternalStream(T).toNodejsStream(P);
        } };
        n.exports = f;
      }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(r, n, i) {
        n.exports = r("stream");
      }, { stream: void 0 }], 17: [function(r, n, i) {
        var a = r("./DataReader");
        function l(s) {
          a.call(this, s);
          for (var c = 0; c < this.data.length; c++) s[c] = 255 & s[c];
        }
        r("../utils").inherits(l, a), l.prototype.byteAt = function(s) {
          return this.data[this.zero + s];
        }, l.prototype.lastIndexOfSignature = function(s) {
          for (var c = s.charCodeAt(0), b = s.charCodeAt(1), S = s.charCodeAt(2), A = s.charCodeAt(3), R = this.length - 4; 0 <= R; --R) if (this.data[R] === c && this.data[R + 1] === b && this.data[R + 2] === S && this.data[R + 3] === A) return R - this.zero;
          return -1;
        }, l.prototype.readAndCheckSignature = function(s) {
          var c = s.charCodeAt(0), b = s.charCodeAt(1), S = s.charCodeAt(2), A = s.charCodeAt(3), R = this.readData(4);
          return c === R[0] && b === R[1] && S === R[2] && A === R[3];
        }, l.prototype.readData = function(s) {
          if (this.checkOffset(s), s === 0) return [];
          var c = this.data.slice(this.zero + this.index, this.zero + this.index + s);
          return this.index += s, c;
        }, n.exports = l;
      }, { "../utils": 32, "./DataReader": 18 }], 18: [function(r, n, i) {
        var a = r("../utils");
        function l(s) {
          this.data = s, this.length = s.length, this.index = 0, this.zero = 0;
        }
        l.prototype = { checkOffset: function(s) {
          this.checkIndex(this.index + s);
        }, checkIndex: function(s) {
          if (this.length < this.zero + s || s < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + s + "). Corrupted zip ?");
        }, setIndex: function(s) {
          this.checkIndex(s), this.index = s;
        }, skip: function(s) {
          this.setIndex(this.index + s);
        }, byteAt: function() {
        }, readInt: function(s) {
          var c, b = 0;
          for (this.checkOffset(s), c = this.index + s - 1; c >= this.index; c--) b = (b << 8) + this.byteAt(c);
          return this.index += s, b;
        }, readString: function(s) {
          return a.transformTo("string", this.readData(s));
        }, readData: function() {
        }, lastIndexOfSignature: function() {
        }, readAndCheckSignature: function() {
        }, readDate: function() {
          var s = this.readInt(4);
          return new Date(Date.UTC(1980 + (s >> 25 & 127), (s >> 21 & 15) - 1, s >> 16 & 31, s >> 11 & 31, s >> 5 & 63, (31 & s) << 1));
        } }, n.exports = l;
      }, { "../utils": 32 }], 19: [function(r, n, i) {
        var a = r("./Uint8ArrayReader");
        function l(s) {
          a.call(this, s);
        }
        r("../utils").inherits(l, a), l.prototype.readData = function(s) {
          this.checkOffset(s);
          var c = this.data.slice(this.zero + this.index, this.zero + this.index + s);
          return this.index += s, c;
        }, n.exports = l;
      }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(r, n, i) {
        var a = r("./DataReader");
        function l(s) {
          a.call(this, s);
        }
        r("../utils").inherits(l, a), l.prototype.byteAt = function(s) {
          return this.data.charCodeAt(this.zero + s);
        }, l.prototype.lastIndexOfSignature = function(s) {
          return this.data.lastIndexOf(s) - this.zero;
        }, l.prototype.readAndCheckSignature = function(s) {
          return s === this.readData(4);
        }, l.prototype.readData = function(s) {
          this.checkOffset(s);
          var c = this.data.slice(this.zero + this.index, this.zero + this.index + s);
          return this.index += s, c;
        }, n.exports = l;
      }, { "../utils": 32, "./DataReader": 18 }], 21: [function(r, n, i) {
        var a = r("./ArrayReader");
        function l(s) {
          a.call(this, s);
        }
        r("../utils").inherits(l, a), l.prototype.readData = function(s) {
          if (this.checkOffset(s), s === 0) return new Uint8Array(0);
          var c = this.data.subarray(this.zero + this.index, this.zero + this.index + s);
          return this.index += s, c;
        }, n.exports = l;
      }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(r, n, i) {
        var a = r("../utils"), l = r("../support"), s = r("./ArrayReader"), c = r("./StringReader"), b = r("./NodeBufferReader"), S = r("./Uint8ArrayReader");
        n.exports = function(A) {
          var R = a.getTypeOf(A);
          return a.checkSupport(R), R !== "string" || l.uint8array ? R === "nodebuffer" ? new b(A) : l.uint8array ? new S(a.transformTo("uint8array", A)) : new s(a.transformTo("array", A)) : new c(A);
        };
      }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(r, n, i) {
        i.LOCAL_FILE_HEADER = "PK", i.CENTRAL_FILE_HEADER = "PK", i.CENTRAL_DIRECTORY_END = "PK", i.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", i.ZIP64_CENTRAL_DIRECTORY_END = "PK", i.DATA_DESCRIPTOR = "PK\x07\b";
      }, {}], 24: [function(r, n, i) {
        var a = r("./GenericWorker"), l = r("../utils");
        function s(c) {
          a.call(this, "ConvertWorker to " + c), this.destType = c;
        }
        l.inherits(s, a), s.prototype.processChunk = function(c) {
          this.push({ data: l.transformTo(this.destType, c.data), meta: c.meta });
        }, n.exports = s;
      }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(r, n, i) {
        var a = r("./GenericWorker"), l = r("../crc32");
        function s() {
          a.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
        }
        r("../utils").inherits(s, a), s.prototype.processChunk = function(c) {
          this.streamInfo.crc32 = l(c.data, this.streamInfo.crc32 || 0), this.push(c);
        }, n.exports = s;
      }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(r, n, i) {
        var a = r("../utils"), l = r("./GenericWorker");
        function s(c) {
          l.call(this, "DataLengthProbe for " + c), this.propName = c, this.withStreamInfo(c, 0);
        }
        a.inherits(s, l), s.prototype.processChunk = function(c) {
          if (c) {
            var b = this.streamInfo[this.propName] || 0;
            this.streamInfo[this.propName] = b + c.data.length;
          }
          l.prototype.processChunk.call(this, c);
        }, n.exports = s;
      }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(r, n, i) {
        var a = r("../utils"), l = r("./GenericWorker");
        function s(c) {
          l.call(this, "DataWorker");
          var b = this;
          this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, c.then(function(S) {
            b.dataIsReady = !0, b.data = S, b.max = S && S.length || 0, b.type = a.getTypeOf(S), b.isPaused || b._tickAndRepeat();
          }, function(S) {
            b.error(S);
          });
        }
        a.inherits(s, l), s.prototype.cleanUp = function() {
          l.prototype.cleanUp.call(this), this.data = null;
        }, s.prototype.resume = function() {
          return !!l.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, a.delay(this._tickAndRepeat, [], this)), !0);
        }, s.prototype._tickAndRepeat = function() {
          this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (a.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
        }, s.prototype._tick = function() {
          if (this.isPaused || this.isFinished) return !1;
          var c = null, b = Math.min(this.max, this.index + 16384);
          if (this.index >= this.max) return this.end();
          switch (this.type) {
            case "string":
              c = this.data.substring(this.index, b);
              break;
            case "uint8array":
              c = this.data.subarray(this.index, b);
              break;
            case "array":
            case "nodebuffer":
              c = this.data.slice(this.index, b);
          }
          return this.index = b, this.push({ data: c, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
        }, n.exports = s;
      }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(r, n, i) {
        function a(l) {
          this.name = l || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
        }
        a.prototype = { push: function(l) {
          this.emit("data", l);
        }, end: function() {
          if (this.isFinished) return !1;
          this.flush();
          try {
            this.emit("end"), this.cleanUp(), this.isFinished = !0;
          } catch (l) {
            this.emit("error", l);
          }
          return !0;
        }, error: function(l) {
          return !this.isFinished && (this.isPaused ? this.generatedError = l : (this.isFinished = !0, this.emit("error", l), this.previous && this.previous.error(l), this.cleanUp()), !0);
        }, on: function(l, s) {
          return this._listeners[l].push(s), this;
        }, cleanUp: function() {
          this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
        }, emit: function(l, s) {
          if (this._listeners[l]) for (var c = 0; c < this._listeners[l].length; c++) this._listeners[l][c].call(this, s);
        }, pipe: function(l) {
          return l.registerPrevious(this);
        }, registerPrevious: function(l) {
          if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
          this.streamInfo = l.streamInfo, this.mergeStreamInfo(), this.previous = l;
          var s = this;
          return l.on("data", function(c) {
            s.processChunk(c);
          }), l.on("end", function() {
            s.end();
          }), l.on("error", function(c) {
            s.error(c);
          }), this;
        }, pause: function() {
          return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0);
        }, resume: function() {
          if (!this.isPaused || this.isFinished) return !1;
          var l = this.isPaused = !1;
          return this.generatedError && (this.error(this.generatedError), l = !0), this.previous && this.previous.resume(), !l;
        }, flush: function() {
        }, processChunk: function(l) {
          this.push(l);
        }, withStreamInfo: function(l, s) {
          return this.extraStreamInfo[l] = s, this.mergeStreamInfo(), this;
        }, mergeStreamInfo: function() {
          for (var l in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, l) && (this.streamInfo[l] = this.extraStreamInfo[l]);
        }, lock: function() {
          if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
          this.isLocked = !0, this.previous && this.previous.lock();
        }, toString: function() {
          var l = "Worker " + this.name;
          return this.previous ? this.previous + " -> " + l : l;
        } }, n.exports = a;
      }, {}], 29: [function(r, n, i) {
        var a = r("../utils"), l = r("./ConvertWorker"), s = r("./GenericWorker"), c = r("../base64"), b = r("../support"), S = r("../external"), A = null;
        if (b.nodestream) try {
          A = r("../nodejs/NodejsStreamOutputAdapter");
        } catch {
        }
        function R(k, d) {
          return new S.Promise(function(O, h) {
            var g = [], w = k._internalType, f = k._outputType, T = k._mimeType;
            k.on("data", function(P, L) {
              g.push(P), d && d(L);
            }).on("error", function(P) {
              g = [], h(P);
            }).on("end", function() {
              try {
                var P = function(L, H, D) {
                  switch (L) {
                    case "blob":
                      return a.newBlob(a.transformTo("arraybuffer", H), D);
                    case "base64":
                      return c.encode(H);
                    default:
                      return a.transformTo(L, H);
                  }
                }(f, function(L, H) {
                  var D, Z = 0, ce = null, N = 0;
                  for (D = 0; D < H.length; D++) N += H[D].length;
                  switch (L) {
                    case "string":
                      return H.join("");
                    case "array":
                      return Array.prototype.concat.apply([], H);
                    case "uint8array":
                      for (ce = new Uint8Array(N), D = 0; D < H.length; D++) ce.set(H[D], Z), Z += H[D].length;
                      return ce;
                    case "nodebuffer":
                      return Buffer.concat(H);
                    default:
                      throw new Error("concat : unsupported type '" + L + "'");
                  }
                }(w, g), T);
                O(P);
              } catch (L) {
                h(L);
              }
              g = [];
            }).resume();
          });
        }
        function _(k, d, O) {
          var h = d;
          switch (d) {
            case "blob":
            case "arraybuffer":
              h = "uint8array";
              break;
            case "base64":
              h = "string";
          }
          try {
            this._internalType = h, this._outputType = d, this._mimeType = O, a.checkSupport(h), this._worker = k.pipe(new l(h)), k.lock();
          } catch (g) {
            this._worker = new s("error"), this._worker.error(g);
          }
        }
        _.prototype = { accumulate: function(k) {
          return R(this, k);
        }, on: function(k, d) {
          var O = this;
          return k === "data" ? this._worker.on(k, function(h) {
            d.call(O, h.data, h.meta);
          }) : this._worker.on(k, function() {
            a.delay(d, arguments, O);
          }), this;
        }, resume: function() {
          return a.delay(this._worker.resume, [], this._worker), this;
        }, pause: function() {
          return this._worker.pause(), this;
        }, toNodejsStream: function(k) {
          if (a.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
          return new A(this, { objectMode: this._outputType !== "nodebuffer" }, k);
        } }, n.exports = _;
      }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(r, n, i) {
        if (i.base64 = !0, i.array = !0, i.string = !0, i.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", i.nodebuffer = typeof Buffer < "u", i.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") i.blob = !1;
        else {
          var a = new ArrayBuffer(0);
          try {
            i.blob = new Blob([a], { type: "application/zip" }).size === 0;
          } catch {
            try {
              var l = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              l.append(a), i.blob = l.getBlob("application/zip").size === 0;
            } catch {
              i.blob = !1;
            }
          }
        }
        try {
          i.nodestream = !!r("readable-stream").Readable;
        } catch {
          i.nodestream = !1;
        }
      }, { "readable-stream": 16 }], 31: [function(r, n, i) {
        for (var a = r("./utils"), l = r("./support"), s = r("./nodejsUtils"), c = r("./stream/GenericWorker"), b = new Array(256), S = 0; S < 256; S++) b[S] = 252 <= S ? 6 : 248 <= S ? 5 : 240 <= S ? 4 : 224 <= S ? 3 : 192 <= S ? 2 : 1;
        b[254] = b[254] = 1;
        function A() {
          c.call(this, "utf-8 decode"), this.leftOver = null;
        }
        function R() {
          c.call(this, "utf-8 encode");
        }
        i.utf8encode = function(_) {
          return l.nodebuffer ? s.newBufferFrom(_, "utf-8") : function(k) {
            var d, O, h, g, w, f = k.length, T = 0;
            for (g = 0; g < f; g++) (64512 & (O = k.charCodeAt(g))) == 55296 && g + 1 < f && (64512 & (h = k.charCodeAt(g + 1))) == 56320 && (O = 65536 + (O - 55296 << 10) + (h - 56320), g++), T += O < 128 ? 1 : O < 2048 ? 2 : O < 65536 ? 3 : 4;
            for (d = l.uint8array ? new Uint8Array(T) : new Array(T), g = w = 0; w < T; g++) (64512 & (O = k.charCodeAt(g))) == 55296 && g + 1 < f && (64512 & (h = k.charCodeAt(g + 1))) == 56320 && (O = 65536 + (O - 55296 << 10) + (h - 56320), g++), O < 128 ? d[w++] = O : (O < 2048 ? d[w++] = 192 | O >>> 6 : (O < 65536 ? d[w++] = 224 | O >>> 12 : (d[w++] = 240 | O >>> 18, d[w++] = 128 | O >>> 12 & 63), d[w++] = 128 | O >>> 6 & 63), d[w++] = 128 | 63 & O);
            return d;
          }(_);
        }, i.utf8decode = function(_) {
          return l.nodebuffer ? a.transformTo("nodebuffer", _).toString("utf-8") : function(k) {
            var d, O, h, g, w = k.length, f = new Array(2 * w);
            for (d = O = 0; d < w; ) if ((h = k[d++]) < 128) f[O++] = h;
            else if (4 < (g = b[h])) f[O++] = 65533, d += g - 1;
            else {
              for (h &= g === 2 ? 31 : g === 3 ? 15 : 7; 1 < g && d < w; ) h = h << 6 | 63 & k[d++], g--;
              1 < g ? f[O++] = 65533 : h < 65536 ? f[O++] = h : (h -= 65536, f[O++] = 55296 | h >> 10 & 1023, f[O++] = 56320 | 1023 & h);
            }
            return f.length !== O && (f.subarray ? f = f.subarray(0, O) : f.length = O), a.applyFromCharCode(f);
          }(_ = a.transformTo(l.uint8array ? "uint8array" : "array", _));
        }, a.inherits(A, c), A.prototype.processChunk = function(_) {
          var k = a.transformTo(l.uint8array ? "uint8array" : "array", _.data);
          if (this.leftOver && this.leftOver.length) {
            if (l.uint8array) {
              var d = k;
              (k = new Uint8Array(d.length + this.leftOver.length)).set(this.leftOver, 0), k.set(d, this.leftOver.length);
            } else k = this.leftOver.concat(k);
            this.leftOver = null;
          }
          var O = function(g, w) {
            var f;
            for ((w = w || g.length) > g.length && (w = g.length), f = w - 1; 0 <= f && (192 & g[f]) == 128; ) f--;
            return f < 0 || f === 0 ? w : f + b[g[f]] > w ? f : w;
          }(k), h = k;
          O !== k.length && (l.uint8array ? (h = k.subarray(0, O), this.leftOver = k.subarray(O, k.length)) : (h = k.slice(0, O), this.leftOver = k.slice(O, k.length))), this.push({ data: i.utf8decode(h), meta: _.meta });
        }, A.prototype.flush = function() {
          this.leftOver && this.leftOver.length && (this.push({ data: i.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
        }, i.Utf8DecodeWorker = A, a.inherits(R, c), R.prototype.processChunk = function(_) {
          this.push({ data: i.utf8encode(_.data), meta: _.meta });
        }, i.Utf8EncodeWorker = R;
      }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(r, n, i) {
        var a = r("./support"), l = r("./base64"), s = r("./nodejsUtils"), c = r("./external");
        function b(d) {
          return d;
        }
        function S(d, O) {
          for (var h = 0; h < d.length; ++h) O[h] = 255 & d.charCodeAt(h);
          return O;
        }
        r("setimmediate"), i.newBlob = function(d, O) {
          i.checkSupport("blob");
          try {
            return new Blob([d], { type: O });
          } catch {
            try {
              var h = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              return h.append(d), h.getBlob(O);
            } catch {
              throw new Error("Bug : can't construct the Blob.");
            }
          }
        };
        var A = { stringifyByChunk: function(d, O, h) {
          var g = [], w = 0, f = d.length;
          if (f <= h) return String.fromCharCode.apply(null, d);
          for (; w < f; ) O === "array" || O === "nodebuffer" ? g.push(String.fromCharCode.apply(null, d.slice(w, Math.min(w + h, f)))) : g.push(String.fromCharCode.apply(null, d.subarray(w, Math.min(w + h, f)))), w += h;
          return g.join("");
        }, stringifyByChar: function(d) {
          for (var O = "", h = 0; h < d.length; h++) O += String.fromCharCode(d[h]);
          return O;
        }, applyCanBeUsed: { uint8array: function() {
          try {
            return a.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
          } catch {
            return !1;
          }
        }(), nodebuffer: function() {
          try {
            return a.nodebuffer && String.fromCharCode.apply(null, s.allocBuffer(1)).length === 1;
          } catch {
            return !1;
          }
        }() } };
        function R(d) {
          var O = 65536, h = i.getTypeOf(d), g = !0;
          if (h === "uint8array" ? g = A.applyCanBeUsed.uint8array : h === "nodebuffer" && (g = A.applyCanBeUsed.nodebuffer), g) for (; 1 < O; ) try {
            return A.stringifyByChunk(d, h, O);
          } catch {
            O = Math.floor(O / 2);
          }
          return A.stringifyByChar(d);
        }
        function _(d, O) {
          for (var h = 0; h < d.length; h++) O[h] = d[h];
          return O;
        }
        i.applyFromCharCode = R;
        var k = {};
        k.string = { string: b, array: function(d) {
          return S(d, new Array(d.length));
        }, arraybuffer: function(d) {
          return k.string.uint8array(d).buffer;
        }, uint8array: function(d) {
          return S(d, new Uint8Array(d.length));
        }, nodebuffer: function(d) {
          return S(d, s.allocBuffer(d.length));
        } }, k.array = { string: R, array: b, arraybuffer: function(d) {
          return new Uint8Array(d).buffer;
        }, uint8array: function(d) {
          return new Uint8Array(d);
        }, nodebuffer: function(d) {
          return s.newBufferFrom(d);
        } }, k.arraybuffer = { string: function(d) {
          return R(new Uint8Array(d));
        }, array: function(d) {
          return _(new Uint8Array(d), new Array(d.byteLength));
        }, arraybuffer: b, uint8array: function(d) {
          return new Uint8Array(d);
        }, nodebuffer: function(d) {
          return s.newBufferFrom(new Uint8Array(d));
        } }, k.uint8array = { string: R, array: function(d) {
          return _(d, new Array(d.length));
        }, arraybuffer: function(d) {
          return d.buffer;
        }, uint8array: b, nodebuffer: function(d) {
          return s.newBufferFrom(d);
        } }, k.nodebuffer = { string: R, array: function(d) {
          return _(d, new Array(d.length));
        }, arraybuffer: function(d) {
          return k.nodebuffer.uint8array(d).buffer;
        }, uint8array: function(d) {
          return _(d, new Uint8Array(d.length));
        }, nodebuffer: b }, i.transformTo = function(d, O) {
          if (O = O || "", !d) return O;
          i.checkSupport(d);
          var h = i.getTypeOf(O);
          return k[h][d](O);
        }, i.resolve = function(d) {
          for (var O = d.split("/"), h = [], g = 0; g < O.length; g++) {
            var w = O[g];
            w === "." || w === "" && g !== 0 && g !== O.length - 1 || (w === ".." ? h.pop() : h.push(w));
          }
          return h.join("/");
        }, i.getTypeOf = function(d) {
          return typeof d == "string" ? "string" : Object.prototype.toString.call(d) === "[object Array]" ? "array" : a.nodebuffer && s.isBuffer(d) ? "nodebuffer" : a.uint8array && d instanceof Uint8Array ? "uint8array" : a.arraybuffer && d instanceof ArrayBuffer ? "arraybuffer" : void 0;
        }, i.checkSupport = function(d) {
          if (!a[d.toLowerCase()]) throw new Error(d + " is not supported by this platform");
        }, i.MAX_VALUE_16BITS = 65535, i.MAX_VALUE_32BITS = -1, i.pretty = function(d) {
          var O, h, g = "";
          for (h = 0; h < (d || "").length; h++) g += "\\x" + ((O = d.charCodeAt(h)) < 16 ? "0" : "") + O.toString(16).toUpperCase();
          return g;
        }, i.delay = function(d, O, h) {
          setImmediate(function() {
            d.apply(h || null, O || []);
          });
        }, i.inherits = function(d, O) {
          function h() {
          }
          h.prototype = O.prototype, d.prototype = new h();
        }, i.extend = function() {
          var d, O, h = {};
          for (d = 0; d < arguments.length; d++) for (O in arguments[d]) Object.prototype.hasOwnProperty.call(arguments[d], O) && h[O] === void 0 && (h[O] = arguments[d][O]);
          return h;
        }, i.prepareContent = function(d, O, h, g, w) {
          return c.Promise.resolve(O).then(function(f) {
            return a.blob && (f instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(f)) !== -1) && typeof FileReader < "u" ? new c.Promise(function(T, P) {
              var L = new FileReader();
              L.onload = function(H) {
                T(H.target.result);
              }, L.onerror = function(H) {
                P(H.target.error);
              }, L.readAsArrayBuffer(f);
            }) : f;
          }).then(function(f) {
            var T = i.getTypeOf(f);
            return T ? (T === "arraybuffer" ? f = i.transformTo("uint8array", f) : T === "string" && (w ? f = l.decode(f) : h && g !== !0 && (f = function(P) {
              return S(P, a.uint8array ? new Uint8Array(P.length) : new Array(P.length));
            }(f))), f) : c.Promise.reject(new Error("Can't read the data of '" + d + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
          });
        };
      }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(r, n, i) {
        var a = r("./reader/readerFor"), l = r("./utils"), s = r("./signature"), c = r("./zipEntry"), b = r("./support");
        function S(A) {
          this.files = [], this.loadOptions = A;
        }
        S.prototype = { checkSignature: function(A) {
          if (!this.reader.readAndCheckSignature(A)) {
            this.reader.index -= 4;
            var R = this.reader.readString(4);
            throw new Error("Corrupted zip or bug: unexpected signature (" + l.pretty(R) + ", expected " + l.pretty(A) + ")");
          }
        }, isSignature: function(A, R) {
          var _ = this.reader.index;
          this.reader.setIndex(A);
          var k = this.reader.readString(4) === R;
          return this.reader.setIndex(_), k;
        }, readBlockEndOfCentral: function() {
          this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
          var A = this.reader.readData(this.zipCommentLength), R = b.uint8array ? "uint8array" : "array", _ = l.transformTo(R, A);
          this.zipComment = this.loadOptions.decodeFileName(_);
        }, readBlockZip64EndOfCentral: function() {
          this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
          for (var A, R, _, k = this.zip64EndOfCentralSize - 44; 0 < k; ) A = this.reader.readInt(2), R = this.reader.readInt(4), _ = this.reader.readData(R), this.zip64ExtensibleData[A] = { id: A, length: R, value: _ };
        }, readBlockZip64EndOfCentralLocator: function() {
          if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
        }, readLocalFiles: function() {
          var A, R;
          for (A = 0; A < this.files.length; A++) R = this.files[A], this.reader.setIndex(R.localHeaderOffset), this.checkSignature(s.LOCAL_FILE_HEADER), R.readLocalPart(this.reader), R.handleUTF8(), R.processAttributes();
        }, readCentralDir: function() {
          var A;
          for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER); ) (A = new c({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(A);
          if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
        }, readEndOfCentral: function() {
          var A = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);
          if (A < 0) throw this.isSignature(0, s.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
          this.reader.setIndex(A);
          var R = A;
          if (this.checkSignature(s.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === l.MAX_VALUE_16BITS || this.diskWithCentralDirStart === l.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === l.MAX_VALUE_16BITS || this.centralDirRecords === l.MAX_VALUE_16BITS || this.centralDirSize === l.MAX_VALUE_32BITS || this.centralDirOffset === l.MAX_VALUE_32BITS) {
            if (this.zip64 = !0, (A = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
            if (this.reader.setIndex(A), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
          }
          var _ = this.centralDirOffset + this.centralDirSize;
          this.zip64 && (_ += 20, _ += 12 + this.zip64EndOfCentralSize);
          var k = R - _;
          if (0 < k) this.isSignature(R, s.CENTRAL_FILE_HEADER) || (this.reader.zero = k);
          else if (k < 0) throw new Error("Corrupted zip: missing " + Math.abs(k) + " bytes.");
        }, prepareReader: function(A) {
          this.reader = a(A);
        }, load: function(A) {
          this.prepareReader(A), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
        } }, n.exports = S;
      }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(r, n, i) {
        var a = r("./reader/readerFor"), l = r("./utils"), s = r("./compressedObject"), c = r("./crc32"), b = r("./utf8"), S = r("./compressions"), A = r("./support");
        function R(_, k) {
          this.options = _, this.loadOptions = k;
        }
        R.prototype = { isEncrypted: function() {
          return (1 & this.bitFlag) == 1;
        }, useUTF8: function() {
          return (2048 & this.bitFlag) == 2048;
        }, readLocalPart: function(_) {
          var k, d;
          if (_.skip(22), this.fileNameLength = _.readInt(2), d = _.readInt(2), this.fileName = _.readData(this.fileNameLength), _.skip(d), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
          if ((k = function(O) {
            for (var h in S) if (Object.prototype.hasOwnProperty.call(S, h) && S[h].magic === O) return S[h];
            return null;
          }(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + l.pretty(this.compressionMethod) + " unknown (inner file : " + l.transformTo("string", this.fileName) + ")");
          this.decompressed = new s(this.compressedSize, this.uncompressedSize, this.crc32, k, _.readData(this.compressedSize));
        }, readCentralPart: function(_) {
          this.versionMadeBy = _.readInt(2), _.skip(2), this.bitFlag = _.readInt(2), this.compressionMethod = _.readString(2), this.date = _.readDate(), this.crc32 = _.readInt(4), this.compressedSize = _.readInt(4), this.uncompressedSize = _.readInt(4);
          var k = _.readInt(2);
          if (this.extraFieldsLength = _.readInt(2), this.fileCommentLength = _.readInt(2), this.diskNumberStart = _.readInt(2), this.internalFileAttributes = _.readInt(2), this.externalFileAttributes = _.readInt(4), this.localHeaderOffset = _.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
          _.skip(k), this.readExtraFields(_), this.parseZIP64ExtraField(_), this.fileComment = _.readData(this.fileCommentLength);
        }, processAttributes: function() {
          this.unixPermissions = null, this.dosPermissions = null;
          var _ = this.versionMadeBy >> 8;
          this.dir = !!(16 & this.externalFileAttributes), _ == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), _ == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = !0);
        }, parseZIP64ExtraField: function() {
          if (this.extraFields[1]) {
            var _ = a(this.extraFields[1].value);
            this.uncompressedSize === l.MAX_VALUE_32BITS && (this.uncompressedSize = _.readInt(8)), this.compressedSize === l.MAX_VALUE_32BITS && (this.compressedSize = _.readInt(8)), this.localHeaderOffset === l.MAX_VALUE_32BITS && (this.localHeaderOffset = _.readInt(8)), this.diskNumberStart === l.MAX_VALUE_32BITS && (this.diskNumberStart = _.readInt(4));
          }
        }, readExtraFields: function(_) {
          var k, d, O, h = _.index + this.extraFieldsLength;
          for (this.extraFields || (this.extraFields = {}); _.index + 4 < h; ) k = _.readInt(2), d = _.readInt(2), O = _.readData(d), this.extraFields[k] = { id: k, length: d, value: O };
          _.setIndex(h);
        }, handleUTF8: function() {
          var _ = A.uint8array ? "uint8array" : "array";
          if (this.useUTF8()) this.fileNameStr = b.utf8decode(this.fileName), this.fileCommentStr = b.utf8decode(this.fileComment);
          else {
            var k = this.findExtraFieldUnicodePath();
            if (k !== null) this.fileNameStr = k;
            else {
              var d = l.transformTo(_, this.fileName);
              this.fileNameStr = this.loadOptions.decodeFileName(d);
            }
            var O = this.findExtraFieldUnicodeComment();
            if (O !== null) this.fileCommentStr = O;
            else {
              var h = l.transformTo(_, this.fileComment);
              this.fileCommentStr = this.loadOptions.decodeFileName(h);
            }
          }
        }, findExtraFieldUnicodePath: function() {
          var _ = this.extraFields[28789];
          if (_) {
            var k = a(_.value);
            return k.readInt(1) !== 1 || c(this.fileName) !== k.readInt(4) ? null : b.utf8decode(k.readData(_.length - 5));
          }
          return null;
        }, findExtraFieldUnicodeComment: function() {
          var _ = this.extraFields[25461];
          if (_) {
            var k = a(_.value);
            return k.readInt(1) !== 1 || c(this.fileComment) !== k.readInt(4) ? null : b.utf8decode(k.readData(_.length - 5));
          }
          return null;
        } }, n.exports = R;
      }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(r, n, i) {
        function a(k, d, O) {
          this.name = k, this.dir = O.dir, this.date = O.date, this.comment = O.comment, this.unixPermissions = O.unixPermissions, this.dosPermissions = O.dosPermissions, this._data = d, this._dataBinary = O.binary, this.options = { compression: O.compression, compressionOptions: O.compressionOptions };
        }
        var l = r("./stream/StreamHelper"), s = r("./stream/DataWorker"), c = r("./utf8"), b = r("./compressedObject"), S = r("./stream/GenericWorker");
        a.prototype = { internalStream: function(k) {
          var d = null, O = "string";
          try {
            if (!k) throw new Error("No output type specified.");
            var h = (O = k.toLowerCase()) === "string" || O === "text";
            O !== "binarystring" && O !== "text" || (O = "string"), d = this._decompressWorker();
            var g = !this._dataBinary;
            g && !h && (d = d.pipe(new c.Utf8EncodeWorker())), !g && h && (d = d.pipe(new c.Utf8DecodeWorker()));
          } catch (w) {
            (d = new S("error")).error(w);
          }
          return new l(d, O, "");
        }, async: function(k, d) {
          return this.internalStream(k).accumulate(d);
        }, nodeStream: function(k, d) {
          return this.internalStream(k || "nodebuffer").toNodejsStream(d);
        }, _compressWorker: function(k, d) {
          if (this._data instanceof b && this._data.compression.magic === k.magic) return this._data.getCompressedWorker();
          var O = this._decompressWorker();
          return this._dataBinary || (O = O.pipe(new c.Utf8EncodeWorker())), b.createWorkerFrom(O, k, d);
        }, _decompressWorker: function() {
          return this._data instanceof b ? this._data.getContentWorker() : this._data instanceof S ? this._data : new s(this._data);
        } };
        for (var A = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], R = function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, _ = 0; _ < A.length; _++) a.prototype[A[_]] = R;
        n.exports = a;
      }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(r, n, i) {
        (function(a) {
          var l, s, c = a.MutationObserver || a.WebKitMutationObserver;
          if (c) {
            var b = 0, S = new c(k), A = a.document.createTextNode("");
            S.observe(A, { characterData: !0 }), l = function() {
              A.data = b = ++b % 2;
            };
          } else if (a.setImmediate || a.MessageChannel === void 0) l = "document" in a && "onreadystatechange" in a.document.createElement("script") ? function() {
            var d = a.document.createElement("script");
            d.onreadystatechange = function() {
              k(), d.onreadystatechange = null, d.parentNode.removeChild(d), d = null;
            }, a.document.documentElement.appendChild(d);
          } : function() {
            setTimeout(k, 0);
          };
          else {
            var R = new a.MessageChannel();
            R.port1.onmessage = k, l = function() {
              R.port2.postMessage(0);
            };
          }
          var _ = [];
          function k() {
            var d, O;
            s = !0;
            for (var h = _.length; h; ) {
              for (O = _, _ = [], d = -1; ++d < h; ) O[d]();
              h = _.length;
            }
            s = !1;
          }
          n.exports = function(d) {
            _.push(d) !== 1 || s || l();
          };
        }).call(this, typeof ut < "u" ? ut : typeof self < "u" ? self : typeof window < "u" ? window : {});
      }, {}], 37: [function(r, n, i) {
        var a = r("immediate");
        function l() {
        }
        var s = {}, c = ["REJECTED"], b = ["FULFILLED"], S = ["PENDING"];
        function A(h) {
          if (typeof h != "function") throw new TypeError("resolver must be a function");
          this.state = S, this.queue = [], this.outcome = void 0, h !== l && d(this, h);
        }
        function R(h, g, w) {
          this.promise = h, typeof g == "function" && (this.onFulfilled = g, this.callFulfilled = this.otherCallFulfilled), typeof w == "function" && (this.onRejected = w, this.callRejected = this.otherCallRejected);
        }
        function _(h, g, w) {
          a(function() {
            var f;
            try {
              f = g(w);
            } catch (T) {
              return s.reject(h, T);
            }
            f === h ? s.reject(h, new TypeError("Cannot resolve promise with itself")) : s.resolve(h, f);
          });
        }
        function k(h) {
          var g = h && h.then;
          if (h && (typeof h == "object" || typeof h == "function") && typeof g == "function") return function() {
            g.apply(h, arguments);
          };
        }
        function d(h, g) {
          var w = !1;
          function f(L) {
            w || (w = !0, s.reject(h, L));
          }
          function T(L) {
            w || (w = !0, s.resolve(h, L));
          }
          var P = O(function() {
            g(T, f);
          });
          P.status === "error" && f(P.value);
        }
        function O(h, g) {
          var w = {};
          try {
            w.value = h(g), w.status = "success";
          } catch (f) {
            w.status = "error", w.value = f;
          }
          return w;
        }
        (n.exports = A).prototype.finally = function(h) {
          if (typeof h != "function") return this;
          var g = this.constructor;
          return this.then(function(w) {
            return g.resolve(h()).then(function() {
              return w;
            });
          }, function(w) {
            return g.resolve(h()).then(function() {
              throw w;
            });
          });
        }, A.prototype.catch = function(h) {
          return this.then(null, h);
        }, A.prototype.then = function(h, g) {
          if (typeof h != "function" && this.state === b || typeof g != "function" && this.state === c) return this;
          var w = new this.constructor(l);
          return this.state !== S ? _(w, this.state === b ? h : g, this.outcome) : this.queue.push(new R(w, h, g)), w;
        }, R.prototype.callFulfilled = function(h) {
          s.resolve(this.promise, h);
        }, R.prototype.otherCallFulfilled = function(h) {
          _(this.promise, this.onFulfilled, h);
        }, R.prototype.callRejected = function(h) {
          s.reject(this.promise, h);
        }, R.prototype.otherCallRejected = function(h) {
          _(this.promise, this.onRejected, h);
        }, s.resolve = function(h, g) {
          var w = O(k, g);
          if (w.status === "error") return s.reject(h, w.value);
          var f = w.value;
          if (f) d(h, f);
          else {
            h.state = b, h.outcome = g;
            for (var T = -1, P = h.queue.length; ++T < P; ) h.queue[T].callFulfilled(g);
          }
          return h;
        }, s.reject = function(h, g) {
          h.state = c, h.outcome = g;
          for (var w = -1, f = h.queue.length; ++w < f; ) h.queue[w].callRejected(g);
          return h;
        }, A.resolve = function(h) {
          return h instanceof this ? h : s.resolve(new this(l), h);
        }, A.reject = function(h) {
          var g = new this(l);
          return s.reject(g, h);
        }, A.all = function(h) {
          var g = this;
          if (Object.prototype.toString.call(h) !== "[object Array]") return this.reject(new TypeError("must be an array"));
          var w = h.length, f = !1;
          if (!w) return this.resolve([]);
          for (var T = new Array(w), P = 0, L = -1, H = new this(l); ++L < w; ) D(h[L], L);
          return H;
          function D(Z, ce) {
            g.resolve(Z).then(function(N) {
              T[ce] = N, ++P !== w || f || (f = !0, s.resolve(H, T));
            }, function(N) {
              f || (f = !0, s.reject(H, N));
            });
          }
        }, A.race = function(h) {
          var g = this;
          if (Object.prototype.toString.call(h) !== "[object Array]") return this.reject(new TypeError("must be an array"));
          var w = h.length, f = !1;
          if (!w) return this.resolve([]);
          for (var T = -1, P = new this(l); ++T < w; ) L = h[T], g.resolve(L).then(function(H) {
            f || (f = !0, s.resolve(P, H));
          }, function(H) {
            f || (f = !0, s.reject(P, H));
          });
          var L;
          return P;
        };
      }, { immediate: 36 }], 38: [function(r, n, i) {
        var a = {};
        (0, r("./lib/utils/common").assign)(a, r("./lib/deflate"), r("./lib/inflate"), r("./lib/zlib/constants")), n.exports = a;
      }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(r, n, i) {
        var a = r("./zlib/deflate"), l = r("./utils/common"), s = r("./utils/strings"), c = r("./zlib/messages"), b = r("./zlib/zstream"), S = Object.prototype.toString, A = 0, R = -1, _ = 0, k = 8;
        function d(h) {
          if (!(this instanceof d)) return new d(h);
          this.options = l.assign({ level: R, method: k, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: _, to: "" }, h || {});
          var g = this.options;
          g.raw && 0 < g.windowBits ? g.windowBits = -g.windowBits : g.gzip && 0 < g.windowBits && g.windowBits < 16 && (g.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new b(), this.strm.avail_out = 0;
          var w = a.deflateInit2(this.strm, g.level, g.method, g.windowBits, g.memLevel, g.strategy);
          if (w !== A) throw new Error(c[w]);
          if (g.header && a.deflateSetHeader(this.strm, g.header), g.dictionary) {
            var f;
            if (f = typeof g.dictionary == "string" ? s.string2buf(g.dictionary) : S.call(g.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(g.dictionary) : g.dictionary, (w = a.deflateSetDictionary(this.strm, f)) !== A) throw new Error(c[w]);
            this._dict_set = !0;
          }
        }
        function O(h, g) {
          var w = new d(g);
          if (w.push(h, !0), w.err) throw w.msg || c[w.err];
          return w.result;
        }
        d.prototype.push = function(h, g) {
          var w, f, T = this.strm, P = this.options.chunkSize;
          if (this.ended) return !1;
          f = g === ~~g ? g : g === !0 ? 4 : 0, typeof h == "string" ? T.input = s.string2buf(h) : S.call(h) === "[object ArrayBuffer]" ? T.input = new Uint8Array(h) : T.input = h, T.next_in = 0, T.avail_in = T.input.length;
          do {
            if (T.avail_out === 0 && (T.output = new l.Buf8(P), T.next_out = 0, T.avail_out = P), (w = a.deflate(T, f)) !== 1 && w !== A) return this.onEnd(w), !(this.ended = !0);
            T.avail_out !== 0 && (T.avail_in !== 0 || f !== 4 && f !== 2) || (this.options.to === "string" ? this.onData(s.buf2binstring(l.shrinkBuf(T.output, T.next_out))) : this.onData(l.shrinkBuf(T.output, T.next_out)));
          } while ((0 < T.avail_in || T.avail_out === 0) && w !== 1);
          return f === 4 ? (w = a.deflateEnd(this.strm), this.onEnd(w), this.ended = !0, w === A) : f !== 2 || (this.onEnd(A), !(T.avail_out = 0));
        }, d.prototype.onData = function(h) {
          this.chunks.push(h);
        }, d.prototype.onEnd = function(h) {
          h === A && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = l.flattenChunks(this.chunks)), this.chunks = [], this.err = h, this.msg = this.strm.msg;
        }, i.Deflate = d, i.deflate = O, i.deflateRaw = function(h, g) {
          return (g = g || {}).raw = !0, O(h, g);
        }, i.gzip = function(h, g) {
          return (g = g || {}).gzip = !0, O(h, g);
        };
      }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(r, n, i) {
        var a = r("./zlib/inflate"), l = r("./utils/common"), s = r("./utils/strings"), c = r("./zlib/constants"), b = r("./zlib/messages"), S = r("./zlib/zstream"), A = r("./zlib/gzheader"), R = Object.prototype.toString;
        function _(d) {
          if (!(this instanceof _)) return new _(d);
          this.options = l.assign({ chunkSize: 16384, windowBits: 0, to: "" }, d || {});
          var O = this.options;
          O.raw && 0 <= O.windowBits && O.windowBits < 16 && (O.windowBits = -O.windowBits, O.windowBits === 0 && (O.windowBits = -15)), !(0 <= O.windowBits && O.windowBits < 16) || d && d.windowBits || (O.windowBits += 32), 15 < O.windowBits && O.windowBits < 48 && !(15 & O.windowBits) && (O.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new S(), this.strm.avail_out = 0;
          var h = a.inflateInit2(this.strm, O.windowBits);
          if (h !== c.Z_OK) throw new Error(b[h]);
          this.header = new A(), a.inflateGetHeader(this.strm, this.header);
        }
        function k(d, O) {
          var h = new _(O);
          if (h.push(d, !0), h.err) throw h.msg || b[h.err];
          return h.result;
        }
        _.prototype.push = function(d, O) {
          var h, g, w, f, T, P, L = this.strm, H = this.options.chunkSize, D = this.options.dictionary, Z = !1;
          if (this.ended) return !1;
          g = O === ~~O ? O : O === !0 ? c.Z_FINISH : c.Z_NO_FLUSH, typeof d == "string" ? L.input = s.binstring2buf(d) : R.call(d) === "[object ArrayBuffer]" ? L.input = new Uint8Array(d) : L.input = d, L.next_in = 0, L.avail_in = L.input.length;
          do {
            if (L.avail_out === 0 && (L.output = new l.Buf8(H), L.next_out = 0, L.avail_out = H), (h = a.inflate(L, c.Z_NO_FLUSH)) === c.Z_NEED_DICT && D && (P = typeof D == "string" ? s.string2buf(D) : R.call(D) === "[object ArrayBuffer]" ? new Uint8Array(D) : D, h = a.inflateSetDictionary(this.strm, P)), h === c.Z_BUF_ERROR && Z === !0 && (h = c.Z_OK, Z = !1), h !== c.Z_STREAM_END && h !== c.Z_OK) return this.onEnd(h), !(this.ended = !0);
            L.next_out && (L.avail_out !== 0 && h !== c.Z_STREAM_END && (L.avail_in !== 0 || g !== c.Z_FINISH && g !== c.Z_SYNC_FLUSH) || (this.options.to === "string" ? (w = s.utf8border(L.output, L.next_out), f = L.next_out - w, T = s.buf2string(L.output, w), L.next_out = f, L.avail_out = H - f, f && l.arraySet(L.output, L.output, w, f, 0), this.onData(T)) : this.onData(l.shrinkBuf(L.output, L.next_out)))), L.avail_in === 0 && L.avail_out === 0 && (Z = !0);
          } while ((0 < L.avail_in || L.avail_out === 0) && h !== c.Z_STREAM_END);
          return h === c.Z_STREAM_END && (g = c.Z_FINISH), g === c.Z_FINISH ? (h = a.inflateEnd(this.strm), this.onEnd(h), this.ended = !0, h === c.Z_OK) : g !== c.Z_SYNC_FLUSH || (this.onEnd(c.Z_OK), !(L.avail_out = 0));
        }, _.prototype.onData = function(d) {
          this.chunks.push(d);
        }, _.prototype.onEnd = function(d) {
          d === c.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = l.flattenChunks(this.chunks)), this.chunks = [], this.err = d, this.msg = this.strm.msg;
        }, i.Inflate = _, i.inflate = k, i.inflateRaw = function(d, O) {
          return (O = O || {}).raw = !0, k(d, O);
        }, i.ungzip = k;
      }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(r, n, i) {
        var a = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
        i.assign = function(c) {
          for (var b = Array.prototype.slice.call(arguments, 1); b.length; ) {
            var S = b.shift();
            if (S) {
              if (typeof S != "object") throw new TypeError(S + "must be non-object");
              for (var A in S) S.hasOwnProperty(A) && (c[A] = S[A]);
            }
          }
          return c;
        }, i.shrinkBuf = function(c, b) {
          return c.length === b ? c : c.subarray ? c.subarray(0, b) : (c.length = b, c);
        };
        var l = { arraySet: function(c, b, S, A, R) {
          if (b.subarray && c.subarray) c.set(b.subarray(S, S + A), R);
          else for (var _ = 0; _ < A; _++) c[R + _] = b[S + _];
        }, flattenChunks: function(c) {
          var b, S, A, R, _, k;
          for (b = A = 0, S = c.length; b < S; b++) A += c[b].length;
          for (k = new Uint8Array(A), b = R = 0, S = c.length; b < S; b++) _ = c[b], k.set(_, R), R += _.length;
          return k;
        } }, s = { arraySet: function(c, b, S, A, R) {
          for (var _ = 0; _ < A; _++) c[R + _] = b[S + _];
        }, flattenChunks: function(c) {
          return [].concat.apply([], c);
        } };
        i.setTyped = function(c) {
          c ? (i.Buf8 = Uint8Array, i.Buf16 = Uint16Array, i.Buf32 = Int32Array, i.assign(i, l)) : (i.Buf8 = Array, i.Buf16 = Array, i.Buf32 = Array, i.assign(i, s));
        }, i.setTyped(a);
      }, {}], 42: [function(r, n, i) {
        var a = r("./common"), l = !0, s = !0;
        try {
          String.fromCharCode.apply(null, [0]);
        } catch {
          l = !1;
        }
        try {
          String.fromCharCode.apply(null, new Uint8Array(1));
        } catch {
          s = !1;
        }
        for (var c = new a.Buf8(256), b = 0; b < 256; b++) c[b] = 252 <= b ? 6 : 248 <= b ? 5 : 240 <= b ? 4 : 224 <= b ? 3 : 192 <= b ? 2 : 1;
        function S(A, R) {
          if (R < 65537 && (A.subarray && s || !A.subarray && l)) return String.fromCharCode.apply(null, a.shrinkBuf(A, R));
          for (var _ = "", k = 0; k < R; k++) _ += String.fromCharCode(A[k]);
          return _;
        }
        c[254] = c[254] = 1, i.string2buf = function(A) {
          var R, _, k, d, O, h = A.length, g = 0;
          for (d = 0; d < h; d++) (64512 & (_ = A.charCodeAt(d))) == 55296 && d + 1 < h && (64512 & (k = A.charCodeAt(d + 1))) == 56320 && (_ = 65536 + (_ - 55296 << 10) + (k - 56320), d++), g += _ < 128 ? 1 : _ < 2048 ? 2 : _ < 65536 ? 3 : 4;
          for (R = new a.Buf8(g), d = O = 0; O < g; d++) (64512 & (_ = A.charCodeAt(d))) == 55296 && d + 1 < h && (64512 & (k = A.charCodeAt(d + 1))) == 56320 && (_ = 65536 + (_ - 55296 << 10) + (k - 56320), d++), _ < 128 ? R[O++] = _ : (_ < 2048 ? R[O++] = 192 | _ >>> 6 : (_ < 65536 ? R[O++] = 224 | _ >>> 12 : (R[O++] = 240 | _ >>> 18, R[O++] = 128 | _ >>> 12 & 63), R[O++] = 128 | _ >>> 6 & 63), R[O++] = 128 | 63 & _);
          return R;
        }, i.buf2binstring = function(A) {
          return S(A, A.length);
        }, i.binstring2buf = function(A) {
          for (var R = new a.Buf8(A.length), _ = 0, k = R.length; _ < k; _++) R[_] = A.charCodeAt(_);
          return R;
        }, i.buf2string = function(A, R) {
          var _, k, d, O, h = R || A.length, g = new Array(2 * h);
          for (_ = k = 0; _ < h; ) if ((d = A[_++]) < 128) g[k++] = d;
          else if (4 < (O = c[d])) g[k++] = 65533, _ += O - 1;
          else {
            for (d &= O === 2 ? 31 : O === 3 ? 15 : 7; 1 < O && _ < h; ) d = d << 6 | 63 & A[_++], O--;
            1 < O ? g[k++] = 65533 : d < 65536 ? g[k++] = d : (d -= 65536, g[k++] = 55296 | d >> 10 & 1023, g[k++] = 56320 | 1023 & d);
          }
          return S(g, k);
        }, i.utf8border = function(A, R) {
          var _;
          for ((R = R || A.length) > A.length && (R = A.length), _ = R - 1; 0 <= _ && (192 & A[_]) == 128; ) _--;
          return _ < 0 || _ === 0 ? R : _ + c[A[_]] > R ? _ : R;
        };
      }, { "./common": 41 }], 43: [function(r, n, i) {
        n.exports = function(a, l, s, c) {
          for (var b = 65535 & a | 0, S = a >>> 16 & 65535 | 0, A = 0; s !== 0; ) {
            for (s -= A = 2e3 < s ? 2e3 : s; S = S + (b = b + l[c++] | 0) | 0, --A; ) ;
            b %= 65521, S %= 65521;
          }
          return b | S << 16 | 0;
        };
      }, {}], 44: [function(r, n, i) {
        n.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
      }, {}], 45: [function(r, n, i) {
        var a = function() {
          for (var l, s = [], c = 0; c < 256; c++) {
            l = c;
            for (var b = 0; b < 8; b++) l = 1 & l ? 3988292384 ^ l >>> 1 : l >>> 1;
            s[c] = l;
          }
          return s;
        }();
        n.exports = function(l, s, c, b) {
          var S = a, A = b + c;
          l ^= -1;
          for (var R = b; R < A; R++) l = l >>> 8 ^ S[255 & (l ^ s[R])];
          return -1 ^ l;
        };
      }, {}], 46: [function(r, n, i) {
        var a, l = r("../utils/common"), s = r("./trees"), c = r("./adler32"), b = r("./crc32"), S = r("./messages"), A = 0, R = 4, _ = 0, k = -2, d = -1, O = 4, h = 2, g = 8, w = 9, f = 286, T = 30, P = 19, L = 2 * f + 1, H = 15, D = 3, Z = 258, ce = Z + D + 1, N = 42, U = 113, v = 1, V = 2, Q = 3, j = 4;
        function te(m, J) {
          return m.msg = S[J], J;
        }
        function X(m) {
          return (m << 1) - (4 < m ? 9 : 0);
        }
        function oe(m) {
          for (var J = m.length; 0 <= --J; ) m[J] = 0;
        }
        function Y(m) {
          var J = m.state, E = J.pending;
          E > m.avail_out && (E = m.avail_out), E !== 0 && (l.arraySet(m.output, J.pending_buf, J.pending_out, E, m.next_out), m.next_out += E, J.pending_out += E, m.total_out += E, m.avail_out -= E, J.pending -= E, J.pending === 0 && (J.pending_out = 0));
        }
        function C(m, J) {
          s._tr_flush_block(m, 0 <= m.block_start ? m.block_start : -1, m.strstart - m.block_start, J), m.block_start = m.strstart, Y(m.strm);
        }
        function K(m, J) {
          m.pending_buf[m.pending++] = J;
        }
        function $(m, J) {
          m.pending_buf[m.pending++] = J >>> 8 & 255, m.pending_buf[m.pending++] = 255 & J;
        }
        function re(m, J) {
          var E, o, u = m.max_chain_length, p = m.strstart, M = m.prev_length, q = m.nice_match, W = m.strstart > m.w_size - ce ? m.strstart - (m.w_size - ce) : 0, ne = m.window, le = m.w_mask, se = m.prev, fe = m.strstart + Z, me = ne[p + M - 1], ge = ne[p + M];
          m.prev_length >= m.good_match && (u >>= 2), q > m.lookahead && (q = m.lookahead);
          do
            if (ne[(E = J) + M] === ge && ne[E + M - 1] === me && ne[E] === ne[p] && ne[++E] === ne[p + 1]) {
              p += 2, E++;
              do
                ;
              while (ne[++p] === ne[++E] && ne[++p] === ne[++E] && ne[++p] === ne[++E] && ne[++p] === ne[++E] && ne[++p] === ne[++E] && ne[++p] === ne[++E] && ne[++p] === ne[++E] && ne[++p] === ne[++E] && p < fe);
              if (o = Z - (fe - p), p = fe - Z, M < o) {
                if (m.match_start = J, q <= (M = o)) break;
                me = ne[p + M - 1], ge = ne[p + M];
              }
            }
          while ((J = se[J & le]) > W && --u != 0);
          return M <= m.lookahead ? M : m.lookahead;
        }
        function G(m) {
          var J, E, o, u, p, M, q, W, ne, le, se = m.w_size;
          do {
            if (u = m.window_size - m.lookahead - m.strstart, m.strstart >= se + (se - ce)) {
              for (l.arraySet(m.window, m.window, se, se, 0), m.match_start -= se, m.strstart -= se, m.block_start -= se, J = E = m.hash_size; o = m.head[--J], m.head[J] = se <= o ? o - se : 0, --E; ) ;
              for (J = E = se; o = m.prev[--J], m.prev[J] = se <= o ? o - se : 0, --E; ) ;
              u += se;
            }
            if (m.strm.avail_in === 0) break;
            if (M = m.strm, q = m.window, W = m.strstart + m.lookahead, ne = u, le = void 0, le = M.avail_in, ne < le && (le = ne), E = le === 0 ? 0 : (M.avail_in -= le, l.arraySet(q, M.input, M.next_in, le, W), M.state.wrap === 1 ? M.adler = c(M.adler, q, le, W) : M.state.wrap === 2 && (M.adler = b(M.adler, q, le, W)), M.next_in += le, M.total_in += le, le), m.lookahead += E, m.lookahead + m.insert >= D) for (p = m.strstart - m.insert, m.ins_h = m.window[p], m.ins_h = (m.ins_h << m.hash_shift ^ m.window[p + 1]) & m.hash_mask; m.insert && (m.ins_h = (m.ins_h << m.hash_shift ^ m.window[p + D - 1]) & m.hash_mask, m.prev[p & m.w_mask] = m.head[m.ins_h], m.head[m.ins_h] = p, p++, m.insert--, !(m.lookahead + m.insert < D)); ) ;
          } while (m.lookahead < ce && m.strm.avail_in !== 0);
        }
        function x(m, J) {
          for (var E, o; ; ) {
            if (m.lookahead < ce) {
              if (G(m), m.lookahead < ce && J === A) return v;
              if (m.lookahead === 0) break;
            }
            if (E = 0, m.lookahead >= D && (m.ins_h = (m.ins_h << m.hash_shift ^ m.window[m.strstart + D - 1]) & m.hash_mask, E = m.prev[m.strstart & m.w_mask] = m.head[m.ins_h], m.head[m.ins_h] = m.strstart), E !== 0 && m.strstart - E <= m.w_size - ce && (m.match_length = re(m, E)), m.match_length >= D) if (o = s._tr_tally(m, m.strstart - m.match_start, m.match_length - D), m.lookahead -= m.match_length, m.match_length <= m.max_lazy_match && m.lookahead >= D) {
              for (m.match_length--; m.strstart++, m.ins_h = (m.ins_h << m.hash_shift ^ m.window[m.strstart + D - 1]) & m.hash_mask, E = m.prev[m.strstart & m.w_mask] = m.head[m.ins_h], m.head[m.ins_h] = m.strstart, --m.match_length != 0; ) ;
              m.strstart++;
            } else m.strstart += m.match_length, m.match_length = 0, m.ins_h = m.window[m.strstart], m.ins_h = (m.ins_h << m.hash_shift ^ m.window[m.strstart + 1]) & m.hash_mask;
            else o = s._tr_tally(m, 0, m.window[m.strstart]), m.lookahead--, m.strstart++;
            if (o && (C(m, !1), m.strm.avail_out === 0)) return v;
          }
          return m.insert = m.strstart < D - 1 ? m.strstart : D - 1, J === R ? (C(m, !0), m.strm.avail_out === 0 ? Q : j) : m.last_lit && (C(m, !1), m.strm.avail_out === 0) ? v : V;
        }
        function y(m, J) {
          for (var E, o, u; ; ) {
            if (m.lookahead < ce) {
              if (G(m), m.lookahead < ce && J === A) return v;
              if (m.lookahead === 0) break;
            }
            if (E = 0, m.lookahead >= D && (m.ins_h = (m.ins_h << m.hash_shift ^ m.window[m.strstart + D - 1]) & m.hash_mask, E = m.prev[m.strstart & m.w_mask] = m.head[m.ins_h], m.head[m.ins_h] = m.strstart), m.prev_length = m.match_length, m.prev_match = m.match_start, m.match_length = D - 1, E !== 0 && m.prev_length < m.max_lazy_match && m.strstart - E <= m.w_size - ce && (m.match_length = re(m, E), m.match_length <= 5 && (m.strategy === 1 || m.match_length === D && 4096 < m.strstart - m.match_start) && (m.match_length = D - 1)), m.prev_length >= D && m.match_length <= m.prev_length) {
              for (u = m.strstart + m.lookahead - D, o = s._tr_tally(m, m.strstart - 1 - m.prev_match, m.prev_length - D), m.lookahead -= m.prev_length - 1, m.prev_length -= 2; ++m.strstart <= u && (m.ins_h = (m.ins_h << m.hash_shift ^ m.window[m.strstart + D - 1]) & m.hash_mask, E = m.prev[m.strstart & m.w_mask] = m.head[m.ins_h], m.head[m.ins_h] = m.strstart), --m.prev_length != 0; ) ;
              if (m.match_available = 0, m.match_length = D - 1, m.strstart++, o && (C(m, !1), m.strm.avail_out === 0)) return v;
            } else if (m.match_available) {
              if ((o = s._tr_tally(m, 0, m.window[m.strstart - 1])) && C(m, !1), m.strstart++, m.lookahead--, m.strm.avail_out === 0) return v;
            } else m.match_available = 1, m.strstart++, m.lookahead--;
          }
          return m.match_available && (o = s._tr_tally(m, 0, m.window[m.strstart - 1]), m.match_available = 0), m.insert = m.strstart < D - 1 ? m.strstart : D - 1, J === R ? (C(m, !0), m.strm.avail_out === 0 ? Q : j) : m.last_lit && (C(m, !1), m.strm.avail_out === 0) ? v : V;
        }
        function z(m, J, E, o, u) {
          this.good_length = m, this.max_lazy = J, this.nice_length = E, this.max_chain = o, this.func = u;
        }
        function B() {
          this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = g, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new l.Buf16(2 * L), this.dyn_dtree = new l.Buf16(2 * (2 * T + 1)), this.bl_tree = new l.Buf16(2 * (2 * P + 1)), oe(this.dyn_ltree), oe(this.dyn_dtree), oe(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new l.Buf16(H + 1), this.heap = new l.Buf16(2 * f + 1), oe(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new l.Buf16(2 * f + 1), oe(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
        }
        function I(m) {
          var J;
          return m && m.state ? (m.total_in = m.total_out = 0, m.data_type = h, (J = m.state).pending = 0, J.pending_out = 0, J.wrap < 0 && (J.wrap = -J.wrap), J.status = J.wrap ? N : U, m.adler = J.wrap === 2 ? 0 : 1, J.last_flush = A, s._tr_init(J), _) : te(m, k);
        }
        function F(m) {
          var J = I(m);
          return J === _ && function(E) {
            E.window_size = 2 * E.w_size, oe(E.head), E.max_lazy_match = a[E.level].max_lazy, E.good_match = a[E.level].good_length, E.nice_match = a[E.level].nice_length, E.max_chain_length = a[E.level].max_chain, E.strstart = 0, E.block_start = 0, E.lookahead = 0, E.insert = 0, E.match_length = E.prev_length = D - 1, E.match_available = 0, E.ins_h = 0;
          }(m.state), J;
        }
        function ee(m, J, E, o, u, p) {
          if (!m) return k;
          var M = 1;
          if (J === d && (J = 6), o < 0 ? (M = 0, o = -o) : 15 < o && (M = 2, o -= 16), u < 1 || w < u || E !== g || o < 8 || 15 < o || J < 0 || 9 < J || p < 0 || O < p) return te(m, k);
          o === 8 && (o = 9);
          var q = new B();
          return (m.state = q).strm = m, q.wrap = M, q.gzhead = null, q.w_bits = o, q.w_size = 1 << q.w_bits, q.w_mask = q.w_size - 1, q.hash_bits = u + 7, q.hash_size = 1 << q.hash_bits, q.hash_mask = q.hash_size - 1, q.hash_shift = ~~((q.hash_bits + D - 1) / D), q.window = new l.Buf8(2 * q.w_size), q.head = new l.Buf16(q.hash_size), q.prev = new l.Buf16(q.w_size), q.lit_bufsize = 1 << u + 6, q.pending_buf_size = 4 * q.lit_bufsize, q.pending_buf = new l.Buf8(q.pending_buf_size), q.d_buf = 1 * q.lit_bufsize, q.l_buf = 3 * q.lit_bufsize, q.level = J, q.strategy = p, q.method = E, F(m);
        }
        a = [new z(0, 0, 0, 0, function(m, J) {
          var E = 65535;
          for (E > m.pending_buf_size - 5 && (E = m.pending_buf_size - 5); ; ) {
            if (m.lookahead <= 1) {
              if (G(m), m.lookahead === 0 && J === A) return v;
              if (m.lookahead === 0) break;
            }
            m.strstart += m.lookahead, m.lookahead = 0;
            var o = m.block_start + E;
            if ((m.strstart === 0 || m.strstart >= o) && (m.lookahead = m.strstart - o, m.strstart = o, C(m, !1), m.strm.avail_out === 0) || m.strstart - m.block_start >= m.w_size - ce && (C(m, !1), m.strm.avail_out === 0)) return v;
          }
          return m.insert = 0, J === R ? (C(m, !0), m.strm.avail_out === 0 ? Q : j) : (m.strstart > m.block_start && (C(m, !1), m.strm.avail_out), v);
        }), new z(4, 4, 8, 4, x), new z(4, 5, 16, 8, x), new z(4, 6, 32, 32, x), new z(4, 4, 16, 16, y), new z(8, 16, 32, 32, y), new z(8, 16, 128, 128, y), new z(8, 32, 128, 256, y), new z(32, 128, 258, 1024, y), new z(32, 258, 258, 4096, y)], i.deflateInit = function(m, J) {
          return ee(m, J, g, 15, 8, 0);
        }, i.deflateInit2 = ee, i.deflateReset = F, i.deflateResetKeep = I, i.deflateSetHeader = function(m, J) {
          return m && m.state ? m.state.wrap !== 2 ? k : (m.state.gzhead = J, _) : k;
        }, i.deflate = function(m, J) {
          var E, o, u, p;
          if (!m || !m.state || 5 < J || J < 0) return m ? te(m, k) : k;
          if (o = m.state, !m.output || !m.input && m.avail_in !== 0 || o.status === 666 && J !== R) return te(m, m.avail_out === 0 ? -5 : k);
          if (o.strm = m, E = o.last_flush, o.last_flush = J, o.status === N) if (o.wrap === 2) m.adler = 0, K(o, 31), K(o, 139), K(o, 8), o.gzhead ? (K(o, (o.gzhead.text ? 1 : 0) + (o.gzhead.hcrc ? 2 : 0) + (o.gzhead.extra ? 4 : 0) + (o.gzhead.name ? 8 : 0) + (o.gzhead.comment ? 16 : 0)), K(o, 255 & o.gzhead.time), K(o, o.gzhead.time >> 8 & 255), K(o, o.gzhead.time >> 16 & 255), K(o, o.gzhead.time >> 24 & 255), K(o, o.level === 9 ? 2 : 2 <= o.strategy || o.level < 2 ? 4 : 0), K(o, 255 & o.gzhead.os), o.gzhead.extra && o.gzhead.extra.length && (K(o, 255 & o.gzhead.extra.length), K(o, o.gzhead.extra.length >> 8 & 255)), o.gzhead.hcrc && (m.adler = b(m.adler, o.pending_buf, o.pending, 0)), o.gzindex = 0, o.status = 69) : (K(o, 0), K(o, 0), K(o, 0), K(o, 0), K(o, 0), K(o, o.level === 9 ? 2 : 2 <= o.strategy || o.level < 2 ? 4 : 0), K(o, 3), o.status = U);
          else {
            var M = g + (o.w_bits - 8 << 4) << 8;
            M |= (2 <= o.strategy || o.level < 2 ? 0 : o.level < 6 ? 1 : o.level === 6 ? 2 : 3) << 6, o.strstart !== 0 && (M |= 32), M += 31 - M % 31, o.status = U, $(o, M), o.strstart !== 0 && ($(o, m.adler >>> 16), $(o, 65535 & m.adler)), m.adler = 1;
          }
          if (o.status === 69) if (o.gzhead.extra) {
            for (u = o.pending; o.gzindex < (65535 & o.gzhead.extra.length) && (o.pending !== o.pending_buf_size || (o.gzhead.hcrc && o.pending > u && (m.adler = b(m.adler, o.pending_buf, o.pending - u, u)), Y(m), u = o.pending, o.pending !== o.pending_buf_size)); ) K(o, 255 & o.gzhead.extra[o.gzindex]), o.gzindex++;
            o.gzhead.hcrc && o.pending > u && (m.adler = b(m.adler, o.pending_buf, o.pending - u, u)), o.gzindex === o.gzhead.extra.length && (o.gzindex = 0, o.status = 73);
          } else o.status = 73;
          if (o.status === 73) if (o.gzhead.name) {
            u = o.pending;
            do {
              if (o.pending === o.pending_buf_size && (o.gzhead.hcrc && o.pending > u && (m.adler = b(m.adler, o.pending_buf, o.pending - u, u)), Y(m), u = o.pending, o.pending === o.pending_buf_size)) {
                p = 1;
                break;
              }
              p = o.gzindex < o.gzhead.name.length ? 255 & o.gzhead.name.charCodeAt(o.gzindex++) : 0, K(o, p);
            } while (p !== 0);
            o.gzhead.hcrc && o.pending > u && (m.adler = b(m.adler, o.pending_buf, o.pending - u, u)), p === 0 && (o.gzindex = 0, o.status = 91);
          } else o.status = 91;
          if (o.status === 91) if (o.gzhead.comment) {
            u = o.pending;
            do {
              if (o.pending === o.pending_buf_size && (o.gzhead.hcrc && o.pending > u && (m.adler = b(m.adler, o.pending_buf, o.pending - u, u)), Y(m), u = o.pending, o.pending === o.pending_buf_size)) {
                p = 1;
                break;
              }
              p = o.gzindex < o.gzhead.comment.length ? 255 & o.gzhead.comment.charCodeAt(o.gzindex++) : 0, K(o, p);
            } while (p !== 0);
            o.gzhead.hcrc && o.pending > u && (m.adler = b(m.adler, o.pending_buf, o.pending - u, u)), p === 0 && (o.status = 103);
          } else o.status = 103;
          if (o.status === 103 && (o.gzhead.hcrc ? (o.pending + 2 > o.pending_buf_size && Y(m), o.pending + 2 <= o.pending_buf_size && (K(o, 255 & m.adler), K(o, m.adler >> 8 & 255), m.adler = 0, o.status = U)) : o.status = U), o.pending !== 0) {
            if (Y(m), m.avail_out === 0) return o.last_flush = -1, _;
          } else if (m.avail_in === 0 && X(J) <= X(E) && J !== R) return te(m, -5);
          if (o.status === 666 && m.avail_in !== 0) return te(m, -5);
          if (m.avail_in !== 0 || o.lookahead !== 0 || J !== A && o.status !== 666) {
            var q = o.strategy === 2 ? function(W, ne) {
              for (var le; ; ) {
                if (W.lookahead === 0 && (G(W), W.lookahead === 0)) {
                  if (ne === A) return v;
                  break;
                }
                if (W.match_length = 0, le = s._tr_tally(W, 0, W.window[W.strstart]), W.lookahead--, W.strstart++, le && (C(W, !1), W.strm.avail_out === 0)) return v;
              }
              return W.insert = 0, ne === R ? (C(W, !0), W.strm.avail_out === 0 ? Q : j) : W.last_lit && (C(W, !1), W.strm.avail_out === 0) ? v : V;
            }(o, J) : o.strategy === 3 ? function(W, ne) {
              for (var le, se, fe, me, ge = W.window; ; ) {
                if (W.lookahead <= Z) {
                  if (G(W), W.lookahead <= Z && ne === A) return v;
                  if (W.lookahead === 0) break;
                }
                if (W.match_length = 0, W.lookahead >= D && 0 < W.strstart && (se = ge[fe = W.strstart - 1]) === ge[++fe] && se === ge[++fe] && se === ge[++fe]) {
                  me = W.strstart + Z;
                  do
                    ;
                  while (se === ge[++fe] && se === ge[++fe] && se === ge[++fe] && se === ge[++fe] && se === ge[++fe] && se === ge[++fe] && se === ge[++fe] && se === ge[++fe] && fe < me);
                  W.match_length = Z - (me - fe), W.match_length > W.lookahead && (W.match_length = W.lookahead);
                }
                if (W.match_length >= D ? (le = s._tr_tally(W, 1, W.match_length - D), W.lookahead -= W.match_length, W.strstart += W.match_length, W.match_length = 0) : (le = s._tr_tally(W, 0, W.window[W.strstart]), W.lookahead--, W.strstart++), le && (C(W, !1), W.strm.avail_out === 0)) return v;
              }
              return W.insert = 0, ne === R ? (C(W, !0), W.strm.avail_out === 0 ? Q : j) : W.last_lit && (C(W, !1), W.strm.avail_out === 0) ? v : V;
            }(o, J) : a[o.level].func(o, J);
            if (q !== Q && q !== j || (o.status = 666), q === v || q === Q) return m.avail_out === 0 && (o.last_flush = -1), _;
            if (q === V && (J === 1 ? s._tr_align(o) : J !== 5 && (s._tr_stored_block(o, 0, 0, !1), J === 3 && (oe(o.head), o.lookahead === 0 && (o.strstart = 0, o.block_start = 0, o.insert = 0))), Y(m), m.avail_out === 0)) return o.last_flush = -1, _;
          }
          return J !== R ? _ : o.wrap <= 0 ? 1 : (o.wrap === 2 ? (K(o, 255 & m.adler), K(o, m.adler >> 8 & 255), K(o, m.adler >> 16 & 255), K(o, m.adler >> 24 & 255), K(o, 255 & m.total_in), K(o, m.total_in >> 8 & 255), K(o, m.total_in >> 16 & 255), K(o, m.total_in >> 24 & 255)) : ($(o, m.adler >>> 16), $(o, 65535 & m.adler)), Y(m), 0 < o.wrap && (o.wrap = -o.wrap), o.pending !== 0 ? _ : 1);
        }, i.deflateEnd = function(m) {
          var J;
          return m && m.state ? (J = m.state.status) !== N && J !== 69 && J !== 73 && J !== 91 && J !== 103 && J !== U && J !== 666 ? te(m, k) : (m.state = null, J === U ? te(m, -3) : _) : k;
        }, i.deflateSetDictionary = function(m, J) {
          var E, o, u, p, M, q, W, ne, le = J.length;
          if (!m || !m.state || (p = (E = m.state).wrap) === 2 || p === 1 && E.status !== N || E.lookahead) return k;
          for (p === 1 && (m.adler = c(m.adler, J, le, 0)), E.wrap = 0, le >= E.w_size && (p === 0 && (oe(E.head), E.strstart = 0, E.block_start = 0, E.insert = 0), ne = new l.Buf8(E.w_size), l.arraySet(ne, J, le - E.w_size, E.w_size, 0), J = ne, le = E.w_size), M = m.avail_in, q = m.next_in, W = m.input, m.avail_in = le, m.next_in = 0, m.input = J, G(E); E.lookahead >= D; ) {
            for (o = E.strstart, u = E.lookahead - (D - 1); E.ins_h = (E.ins_h << E.hash_shift ^ E.window[o + D - 1]) & E.hash_mask, E.prev[o & E.w_mask] = E.head[E.ins_h], E.head[E.ins_h] = o, o++, --u; ) ;
            E.strstart = o, E.lookahead = D - 1, G(E);
          }
          return E.strstart += E.lookahead, E.block_start = E.strstart, E.insert = E.lookahead, E.lookahead = 0, E.match_length = E.prev_length = D - 1, E.match_available = 0, m.next_in = q, m.input = W, m.avail_in = M, E.wrap = p, _;
        }, i.deflateInfo = "pako deflate (from Nodeca project)";
      }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(r, n, i) {
        n.exports = function() {
          this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
        };
      }, {}], 48: [function(r, n, i) {
        n.exports = function(a, l) {
          var s, c, b, S, A, R, _, k, d, O, h, g, w, f, T, P, L, H, D, Z, ce, N, U, v, V;
          s = a.state, c = a.next_in, v = a.input, b = c + (a.avail_in - 5), S = a.next_out, V = a.output, A = S - (l - a.avail_out), R = S + (a.avail_out - 257), _ = s.dmax, k = s.wsize, d = s.whave, O = s.wnext, h = s.window, g = s.hold, w = s.bits, f = s.lencode, T = s.distcode, P = (1 << s.lenbits) - 1, L = (1 << s.distbits) - 1;
          e: do {
            w < 15 && (g += v[c++] << w, w += 8, g += v[c++] << w, w += 8), H = f[g & P];
            t: for (; ; ) {
              if (g >>>= D = H >>> 24, w -= D, (D = H >>> 16 & 255) === 0) V[S++] = 65535 & H;
              else {
                if (!(16 & D)) {
                  if (!(64 & D)) {
                    H = f[(65535 & H) + (g & (1 << D) - 1)];
                    continue t;
                  }
                  if (32 & D) {
                    s.mode = 12;
                    break e;
                  }
                  a.msg = "invalid literal/length code", s.mode = 30;
                  break e;
                }
                Z = 65535 & H, (D &= 15) && (w < D && (g += v[c++] << w, w += 8), Z += g & (1 << D) - 1, g >>>= D, w -= D), w < 15 && (g += v[c++] << w, w += 8, g += v[c++] << w, w += 8), H = T[g & L];
                r: for (; ; ) {
                  if (g >>>= D = H >>> 24, w -= D, !(16 & (D = H >>> 16 & 255))) {
                    if (!(64 & D)) {
                      H = T[(65535 & H) + (g & (1 << D) - 1)];
                      continue r;
                    }
                    a.msg = "invalid distance code", s.mode = 30;
                    break e;
                  }
                  if (ce = 65535 & H, w < (D &= 15) && (g += v[c++] << w, (w += 8) < D && (g += v[c++] << w, w += 8)), _ < (ce += g & (1 << D) - 1)) {
                    a.msg = "invalid distance too far back", s.mode = 30;
                    break e;
                  }
                  if (g >>>= D, w -= D, (D = S - A) < ce) {
                    if (d < (D = ce - D) && s.sane) {
                      a.msg = "invalid distance too far back", s.mode = 30;
                      break e;
                    }
                    if (U = h, (N = 0) === O) {
                      if (N += k - D, D < Z) {
                        for (Z -= D; V[S++] = h[N++], --D; ) ;
                        N = S - ce, U = V;
                      }
                    } else if (O < D) {
                      if (N += k + O - D, (D -= O) < Z) {
                        for (Z -= D; V[S++] = h[N++], --D; ) ;
                        if (N = 0, O < Z) {
                          for (Z -= D = O; V[S++] = h[N++], --D; ) ;
                          N = S - ce, U = V;
                        }
                      }
                    } else if (N += O - D, D < Z) {
                      for (Z -= D; V[S++] = h[N++], --D; ) ;
                      N = S - ce, U = V;
                    }
                    for (; 2 < Z; ) V[S++] = U[N++], V[S++] = U[N++], V[S++] = U[N++], Z -= 3;
                    Z && (V[S++] = U[N++], 1 < Z && (V[S++] = U[N++]));
                  } else {
                    for (N = S - ce; V[S++] = V[N++], V[S++] = V[N++], V[S++] = V[N++], 2 < (Z -= 3); ) ;
                    Z && (V[S++] = V[N++], 1 < Z && (V[S++] = V[N++]));
                  }
                  break;
                }
              }
              break;
            }
          } while (c < b && S < R);
          c -= Z = w >> 3, g &= (1 << (w -= Z << 3)) - 1, a.next_in = c, a.next_out = S, a.avail_in = c < b ? b - c + 5 : 5 - (c - b), a.avail_out = S < R ? R - S + 257 : 257 - (S - R), s.hold = g, s.bits = w;
        };
      }, {}], 49: [function(r, n, i) {
        var a = r("../utils/common"), l = r("./adler32"), s = r("./crc32"), c = r("./inffast"), b = r("./inftrees"), S = 1, A = 2, R = 0, _ = -2, k = 1, d = 852, O = 592;
        function h(N) {
          return (N >>> 24 & 255) + (N >>> 8 & 65280) + ((65280 & N) << 8) + ((255 & N) << 24);
        }
        function g() {
          this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new a.Buf16(320), this.work = new a.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
        }
        function w(N) {
          var U;
          return N && N.state ? (U = N.state, N.total_in = N.total_out = U.total = 0, N.msg = "", U.wrap && (N.adler = 1 & U.wrap), U.mode = k, U.last = 0, U.havedict = 0, U.dmax = 32768, U.head = null, U.hold = 0, U.bits = 0, U.lencode = U.lendyn = new a.Buf32(d), U.distcode = U.distdyn = new a.Buf32(O), U.sane = 1, U.back = -1, R) : _;
        }
        function f(N) {
          var U;
          return N && N.state ? ((U = N.state).wsize = 0, U.whave = 0, U.wnext = 0, w(N)) : _;
        }
        function T(N, U) {
          var v, V;
          return N && N.state ? (V = N.state, U < 0 ? (v = 0, U = -U) : (v = 1 + (U >> 4), U < 48 && (U &= 15)), U && (U < 8 || 15 < U) ? _ : (V.window !== null && V.wbits !== U && (V.window = null), V.wrap = v, V.wbits = U, f(N))) : _;
        }
        function P(N, U) {
          var v, V;
          return N ? (V = new g(), (N.state = V).window = null, (v = T(N, U)) !== R && (N.state = null), v) : _;
        }
        var L, H, D = !0;
        function Z(N) {
          if (D) {
            var U;
            for (L = new a.Buf32(512), H = new a.Buf32(32), U = 0; U < 144; ) N.lens[U++] = 8;
            for (; U < 256; ) N.lens[U++] = 9;
            for (; U < 280; ) N.lens[U++] = 7;
            for (; U < 288; ) N.lens[U++] = 8;
            for (b(S, N.lens, 0, 288, L, 0, N.work, { bits: 9 }), U = 0; U < 32; ) N.lens[U++] = 5;
            b(A, N.lens, 0, 32, H, 0, N.work, { bits: 5 }), D = !1;
          }
          N.lencode = L, N.lenbits = 9, N.distcode = H, N.distbits = 5;
        }
        function ce(N, U, v, V) {
          var Q, j = N.state;
          return j.window === null && (j.wsize = 1 << j.wbits, j.wnext = 0, j.whave = 0, j.window = new a.Buf8(j.wsize)), V >= j.wsize ? (a.arraySet(j.window, U, v - j.wsize, j.wsize, 0), j.wnext = 0, j.whave = j.wsize) : (V < (Q = j.wsize - j.wnext) && (Q = V), a.arraySet(j.window, U, v - V, Q, j.wnext), (V -= Q) ? (a.arraySet(j.window, U, v - V, V, 0), j.wnext = V, j.whave = j.wsize) : (j.wnext += Q, j.wnext === j.wsize && (j.wnext = 0), j.whave < j.wsize && (j.whave += Q))), 0;
        }
        i.inflateReset = f, i.inflateReset2 = T, i.inflateResetKeep = w, i.inflateInit = function(N) {
          return P(N, 15);
        }, i.inflateInit2 = P, i.inflate = function(N, U) {
          var v, V, Q, j, te, X, oe, Y, C, K, $, re, G, x, y, z, B, I, F, ee, m, J, E, o, u = 0, p = new a.Buf8(4), M = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
          if (!N || !N.state || !N.output || !N.input && N.avail_in !== 0) return _;
          (v = N.state).mode === 12 && (v.mode = 13), te = N.next_out, Q = N.output, oe = N.avail_out, j = N.next_in, V = N.input, X = N.avail_in, Y = v.hold, C = v.bits, K = X, $ = oe, J = R;
          e: for (; ; ) switch (v.mode) {
            case k:
              if (v.wrap === 0) {
                v.mode = 13;
                break;
              }
              for (; C < 16; ) {
                if (X === 0) break e;
                X--, Y += V[j++] << C, C += 8;
              }
              if (2 & v.wrap && Y === 35615) {
                p[v.check = 0] = 255 & Y, p[1] = Y >>> 8 & 255, v.check = s(v.check, p, 2, 0), C = Y = 0, v.mode = 2;
                break;
              }
              if (v.flags = 0, v.head && (v.head.done = !1), !(1 & v.wrap) || (((255 & Y) << 8) + (Y >> 8)) % 31) {
                N.msg = "incorrect header check", v.mode = 30;
                break;
              }
              if ((15 & Y) != 8) {
                N.msg = "unknown compression method", v.mode = 30;
                break;
              }
              if (C -= 4, m = 8 + (15 & (Y >>>= 4)), v.wbits === 0) v.wbits = m;
              else if (m > v.wbits) {
                N.msg = "invalid window size", v.mode = 30;
                break;
              }
              v.dmax = 1 << m, N.adler = v.check = 1, v.mode = 512 & Y ? 10 : 12, C = Y = 0;
              break;
            case 2:
              for (; C < 16; ) {
                if (X === 0) break e;
                X--, Y += V[j++] << C, C += 8;
              }
              if (v.flags = Y, (255 & v.flags) != 8) {
                N.msg = "unknown compression method", v.mode = 30;
                break;
              }
              if (57344 & v.flags) {
                N.msg = "unknown header flags set", v.mode = 30;
                break;
              }
              v.head && (v.head.text = Y >> 8 & 1), 512 & v.flags && (p[0] = 255 & Y, p[1] = Y >>> 8 & 255, v.check = s(v.check, p, 2, 0)), C = Y = 0, v.mode = 3;
            case 3:
              for (; C < 32; ) {
                if (X === 0) break e;
                X--, Y += V[j++] << C, C += 8;
              }
              v.head && (v.head.time = Y), 512 & v.flags && (p[0] = 255 & Y, p[1] = Y >>> 8 & 255, p[2] = Y >>> 16 & 255, p[3] = Y >>> 24 & 255, v.check = s(v.check, p, 4, 0)), C = Y = 0, v.mode = 4;
            case 4:
              for (; C < 16; ) {
                if (X === 0) break e;
                X--, Y += V[j++] << C, C += 8;
              }
              v.head && (v.head.xflags = 255 & Y, v.head.os = Y >> 8), 512 & v.flags && (p[0] = 255 & Y, p[1] = Y >>> 8 & 255, v.check = s(v.check, p, 2, 0)), C = Y = 0, v.mode = 5;
            case 5:
              if (1024 & v.flags) {
                for (; C < 16; ) {
                  if (X === 0) break e;
                  X--, Y += V[j++] << C, C += 8;
                }
                v.length = Y, v.head && (v.head.extra_len = Y), 512 & v.flags && (p[0] = 255 & Y, p[1] = Y >>> 8 & 255, v.check = s(v.check, p, 2, 0)), C = Y = 0;
              } else v.head && (v.head.extra = null);
              v.mode = 6;
            case 6:
              if (1024 & v.flags && (X < (re = v.length) && (re = X), re && (v.head && (m = v.head.extra_len - v.length, v.head.extra || (v.head.extra = new Array(v.head.extra_len)), a.arraySet(v.head.extra, V, j, re, m)), 512 & v.flags && (v.check = s(v.check, V, re, j)), X -= re, j += re, v.length -= re), v.length)) break e;
              v.length = 0, v.mode = 7;
            case 7:
              if (2048 & v.flags) {
                if (X === 0) break e;
                for (re = 0; m = V[j + re++], v.head && m && v.length < 65536 && (v.head.name += String.fromCharCode(m)), m && re < X; ) ;
                if (512 & v.flags && (v.check = s(v.check, V, re, j)), X -= re, j += re, m) break e;
              } else v.head && (v.head.name = null);
              v.length = 0, v.mode = 8;
            case 8:
              if (4096 & v.flags) {
                if (X === 0) break e;
                for (re = 0; m = V[j + re++], v.head && m && v.length < 65536 && (v.head.comment += String.fromCharCode(m)), m && re < X; ) ;
                if (512 & v.flags && (v.check = s(v.check, V, re, j)), X -= re, j += re, m) break e;
              } else v.head && (v.head.comment = null);
              v.mode = 9;
            case 9:
              if (512 & v.flags) {
                for (; C < 16; ) {
                  if (X === 0) break e;
                  X--, Y += V[j++] << C, C += 8;
                }
                if (Y !== (65535 & v.check)) {
                  N.msg = "header crc mismatch", v.mode = 30;
                  break;
                }
                C = Y = 0;
              }
              v.head && (v.head.hcrc = v.flags >> 9 & 1, v.head.done = !0), N.adler = v.check = 0, v.mode = 12;
              break;
            case 10:
              for (; C < 32; ) {
                if (X === 0) break e;
                X--, Y += V[j++] << C, C += 8;
              }
              N.adler = v.check = h(Y), C = Y = 0, v.mode = 11;
            case 11:
              if (v.havedict === 0) return N.next_out = te, N.avail_out = oe, N.next_in = j, N.avail_in = X, v.hold = Y, v.bits = C, 2;
              N.adler = v.check = 1, v.mode = 12;
            case 12:
              if (U === 5 || U === 6) break e;
            case 13:
              if (v.last) {
                Y >>>= 7 & C, C -= 7 & C, v.mode = 27;
                break;
              }
              for (; C < 3; ) {
                if (X === 0) break e;
                X--, Y += V[j++] << C, C += 8;
              }
              switch (v.last = 1 & Y, C -= 1, 3 & (Y >>>= 1)) {
                case 0:
                  v.mode = 14;
                  break;
                case 1:
                  if (Z(v), v.mode = 20, U !== 6) break;
                  Y >>>= 2, C -= 2;
                  break e;
                case 2:
                  v.mode = 17;
                  break;
                case 3:
                  N.msg = "invalid block type", v.mode = 30;
              }
              Y >>>= 2, C -= 2;
              break;
            case 14:
              for (Y >>>= 7 & C, C -= 7 & C; C < 32; ) {
                if (X === 0) break e;
                X--, Y += V[j++] << C, C += 8;
              }
              if ((65535 & Y) != (Y >>> 16 ^ 65535)) {
                N.msg = "invalid stored block lengths", v.mode = 30;
                break;
              }
              if (v.length = 65535 & Y, C = Y = 0, v.mode = 15, U === 6) break e;
            case 15:
              v.mode = 16;
            case 16:
              if (re = v.length) {
                if (X < re && (re = X), oe < re && (re = oe), re === 0) break e;
                a.arraySet(Q, V, j, re, te), X -= re, j += re, oe -= re, te += re, v.length -= re;
                break;
              }
              v.mode = 12;
              break;
            case 17:
              for (; C < 14; ) {
                if (X === 0) break e;
                X--, Y += V[j++] << C, C += 8;
              }
              if (v.nlen = 257 + (31 & Y), Y >>>= 5, C -= 5, v.ndist = 1 + (31 & Y), Y >>>= 5, C -= 5, v.ncode = 4 + (15 & Y), Y >>>= 4, C -= 4, 286 < v.nlen || 30 < v.ndist) {
                N.msg = "too many length or distance symbols", v.mode = 30;
                break;
              }
              v.have = 0, v.mode = 18;
            case 18:
              for (; v.have < v.ncode; ) {
                for (; C < 3; ) {
                  if (X === 0) break e;
                  X--, Y += V[j++] << C, C += 8;
                }
                v.lens[M[v.have++]] = 7 & Y, Y >>>= 3, C -= 3;
              }
              for (; v.have < 19; ) v.lens[M[v.have++]] = 0;
              if (v.lencode = v.lendyn, v.lenbits = 7, E = { bits: v.lenbits }, J = b(0, v.lens, 0, 19, v.lencode, 0, v.work, E), v.lenbits = E.bits, J) {
                N.msg = "invalid code lengths set", v.mode = 30;
                break;
              }
              v.have = 0, v.mode = 19;
            case 19:
              for (; v.have < v.nlen + v.ndist; ) {
                for (; z = (u = v.lencode[Y & (1 << v.lenbits) - 1]) >>> 16 & 255, B = 65535 & u, !((y = u >>> 24) <= C); ) {
                  if (X === 0) break e;
                  X--, Y += V[j++] << C, C += 8;
                }
                if (B < 16) Y >>>= y, C -= y, v.lens[v.have++] = B;
                else {
                  if (B === 16) {
                    for (o = y + 2; C < o; ) {
                      if (X === 0) break e;
                      X--, Y += V[j++] << C, C += 8;
                    }
                    if (Y >>>= y, C -= y, v.have === 0) {
                      N.msg = "invalid bit length repeat", v.mode = 30;
                      break;
                    }
                    m = v.lens[v.have - 1], re = 3 + (3 & Y), Y >>>= 2, C -= 2;
                  } else if (B === 17) {
                    for (o = y + 3; C < o; ) {
                      if (X === 0) break e;
                      X--, Y += V[j++] << C, C += 8;
                    }
                    C -= y, m = 0, re = 3 + (7 & (Y >>>= y)), Y >>>= 3, C -= 3;
                  } else {
                    for (o = y + 7; C < o; ) {
                      if (X === 0) break e;
                      X--, Y += V[j++] << C, C += 8;
                    }
                    C -= y, m = 0, re = 11 + (127 & (Y >>>= y)), Y >>>= 7, C -= 7;
                  }
                  if (v.have + re > v.nlen + v.ndist) {
                    N.msg = "invalid bit length repeat", v.mode = 30;
                    break;
                  }
                  for (; re--; ) v.lens[v.have++] = m;
                }
              }
              if (v.mode === 30) break;
              if (v.lens[256] === 0) {
                N.msg = "invalid code -- missing end-of-block", v.mode = 30;
                break;
              }
              if (v.lenbits = 9, E = { bits: v.lenbits }, J = b(S, v.lens, 0, v.nlen, v.lencode, 0, v.work, E), v.lenbits = E.bits, J) {
                N.msg = "invalid literal/lengths set", v.mode = 30;
                break;
              }
              if (v.distbits = 6, v.distcode = v.distdyn, E = { bits: v.distbits }, J = b(A, v.lens, v.nlen, v.ndist, v.distcode, 0, v.work, E), v.distbits = E.bits, J) {
                N.msg = "invalid distances set", v.mode = 30;
                break;
              }
              if (v.mode = 20, U === 6) break e;
            case 20:
              v.mode = 21;
            case 21:
              if (6 <= X && 258 <= oe) {
                N.next_out = te, N.avail_out = oe, N.next_in = j, N.avail_in = X, v.hold = Y, v.bits = C, c(N, $), te = N.next_out, Q = N.output, oe = N.avail_out, j = N.next_in, V = N.input, X = N.avail_in, Y = v.hold, C = v.bits, v.mode === 12 && (v.back = -1);
                break;
              }
              for (v.back = 0; z = (u = v.lencode[Y & (1 << v.lenbits) - 1]) >>> 16 & 255, B = 65535 & u, !((y = u >>> 24) <= C); ) {
                if (X === 0) break e;
                X--, Y += V[j++] << C, C += 8;
              }
              if (z && !(240 & z)) {
                for (I = y, F = z, ee = B; z = (u = v.lencode[ee + ((Y & (1 << I + F) - 1) >> I)]) >>> 16 & 255, B = 65535 & u, !(I + (y = u >>> 24) <= C); ) {
                  if (X === 0) break e;
                  X--, Y += V[j++] << C, C += 8;
                }
                Y >>>= I, C -= I, v.back += I;
              }
              if (Y >>>= y, C -= y, v.back += y, v.length = B, z === 0) {
                v.mode = 26;
                break;
              }
              if (32 & z) {
                v.back = -1, v.mode = 12;
                break;
              }
              if (64 & z) {
                N.msg = "invalid literal/length code", v.mode = 30;
                break;
              }
              v.extra = 15 & z, v.mode = 22;
            case 22:
              if (v.extra) {
                for (o = v.extra; C < o; ) {
                  if (X === 0) break e;
                  X--, Y += V[j++] << C, C += 8;
                }
                v.length += Y & (1 << v.extra) - 1, Y >>>= v.extra, C -= v.extra, v.back += v.extra;
              }
              v.was = v.length, v.mode = 23;
            case 23:
              for (; z = (u = v.distcode[Y & (1 << v.distbits) - 1]) >>> 16 & 255, B = 65535 & u, !((y = u >>> 24) <= C); ) {
                if (X === 0) break e;
                X--, Y += V[j++] << C, C += 8;
              }
              if (!(240 & z)) {
                for (I = y, F = z, ee = B; z = (u = v.distcode[ee + ((Y & (1 << I + F) - 1) >> I)]) >>> 16 & 255, B = 65535 & u, !(I + (y = u >>> 24) <= C); ) {
                  if (X === 0) break e;
                  X--, Y += V[j++] << C, C += 8;
                }
                Y >>>= I, C -= I, v.back += I;
              }
              if (Y >>>= y, C -= y, v.back += y, 64 & z) {
                N.msg = "invalid distance code", v.mode = 30;
                break;
              }
              v.offset = B, v.extra = 15 & z, v.mode = 24;
            case 24:
              if (v.extra) {
                for (o = v.extra; C < o; ) {
                  if (X === 0) break e;
                  X--, Y += V[j++] << C, C += 8;
                }
                v.offset += Y & (1 << v.extra) - 1, Y >>>= v.extra, C -= v.extra, v.back += v.extra;
              }
              if (v.offset > v.dmax) {
                N.msg = "invalid distance too far back", v.mode = 30;
                break;
              }
              v.mode = 25;
            case 25:
              if (oe === 0) break e;
              if (re = $ - oe, v.offset > re) {
                if ((re = v.offset - re) > v.whave && v.sane) {
                  N.msg = "invalid distance too far back", v.mode = 30;
                  break;
                }
                G = re > v.wnext ? (re -= v.wnext, v.wsize - re) : v.wnext - re, re > v.length && (re = v.length), x = v.window;
              } else x = Q, G = te - v.offset, re = v.length;
              for (oe < re && (re = oe), oe -= re, v.length -= re; Q[te++] = x[G++], --re; ) ;
              v.length === 0 && (v.mode = 21);
              break;
            case 26:
              if (oe === 0) break e;
              Q[te++] = v.length, oe--, v.mode = 21;
              break;
            case 27:
              if (v.wrap) {
                for (; C < 32; ) {
                  if (X === 0) break e;
                  X--, Y |= V[j++] << C, C += 8;
                }
                if ($ -= oe, N.total_out += $, v.total += $, $ && (N.adler = v.check = v.flags ? s(v.check, Q, $, te - $) : l(v.check, Q, $, te - $)), $ = oe, (v.flags ? Y : h(Y)) !== v.check) {
                  N.msg = "incorrect data check", v.mode = 30;
                  break;
                }
                C = Y = 0;
              }
              v.mode = 28;
            case 28:
              if (v.wrap && v.flags) {
                for (; C < 32; ) {
                  if (X === 0) break e;
                  X--, Y += V[j++] << C, C += 8;
                }
                if (Y !== (4294967295 & v.total)) {
                  N.msg = "incorrect length check", v.mode = 30;
                  break;
                }
                C = Y = 0;
              }
              v.mode = 29;
            case 29:
              J = 1;
              break e;
            case 30:
              J = -3;
              break e;
            case 31:
              return -4;
            case 32:
            default:
              return _;
          }
          return N.next_out = te, N.avail_out = oe, N.next_in = j, N.avail_in = X, v.hold = Y, v.bits = C, (v.wsize || $ !== N.avail_out && v.mode < 30 && (v.mode < 27 || U !== 4)) && ce(N, N.output, N.next_out, $ - N.avail_out) ? (v.mode = 31, -4) : (K -= N.avail_in, $ -= N.avail_out, N.total_in += K, N.total_out += $, v.total += $, v.wrap && $ && (N.adler = v.check = v.flags ? s(v.check, Q, $, N.next_out - $) : l(v.check, Q, $, N.next_out - $)), N.data_type = v.bits + (v.last ? 64 : 0) + (v.mode === 12 ? 128 : 0) + (v.mode === 20 || v.mode === 15 ? 256 : 0), (K == 0 && $ === 0 || U === 4) && J === R && (J = -5), J);
        }, i.inflateEnd = function(N) {
          if (!N || !N.state) return _;
          var U = N.state;
          return U.window && (U.window = null), N.state = null, R;
        }, i.inflateGetHeader = function(N, U) {
          var v;
          return N && N.state && 2 & (v = N.state).wrap ? ((v.head = U).done = !1, R) : _;
        }, i.inflateSetDictionary = function(N, U) {
          var v, V = U.length;
          return N && N.state ? (v = N.state).wrap !== 0 && v.mode !== 11 ? _ : v.mode === 11 && l(1, U, V, 0) !== v.check ? -3 : ce(N, U, V, V) ? (v.mode = 31, -4) : (v.havedict = 1, R) : _;
        }, i.inflateInfo = "pako inflate (from Nodeca project)";
      }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(r, n, i) {
        var a = r("../utils/common"), l = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], s = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], c = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], b = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
        n.exports = function(S, A, R, _, k, d, O, h) {
          var g, w, f, T, P, L, H, D, Z, ce = h.bits, N = 0, U = 0, v = 0, V = 0, Q = 0, j = 0, te = 0, X = 0, oe = 0, Y = 0, C = null, K = 0, $ = new a.Buf16(16), re = new a.Buf16(16), G = null, x = 0;
          for (N = 0; N <= 15; N++) $[N] = 0;
          for (U = 0; U < _; U++) $[A[R + U]]++;
          for (Q = ce, V = 15; 1 <= V && $[V] === 0; V--) ;
          if (V < Q && (Q = V), V === 0) return k[d++] = 20971520, k[d++] = 20971520, h.bits = 1, 0;
          for (v = 1; v < V && $[v] === 0; v++) ;
          for (Q < v && (Q = v), N = X = 1; N <= 15; N++) if (X <<= 1, (X -= $[N]) < 0) return -1;
          if (0 < X && (S === 0 || V !== 1)) return -1;
          for (re[1] = 0, N = 1; N < 15; N++) re[N + 1] = re[N] + $[N];
          for (U = 0; U < _; U++) A[R + U] !== 0 && (O[re[A[R + U]]++] = U);
          if (L = S === 0 ? (C = G = O, 19) : S === 1 ? (C = l, K -= 257, G = s, x -= 257, 256) : (C = c, G = b, -1), N = v, P = d, te = U = Y = 0, f = -1, T = (oe = 1 << (j = Q)) - 1, S === 1 && 852 < oe || S === 2 && 592 < oe) return 1;
          for (; ; ) {
            for (H = N - te, Z = O[U] < L ? (D = 0, O[U]) : O[U] > L ? (D = G[x + O[U]], C[K + O[U]]) : (D = 96, 0), g = 1 << N - te, v = w = 1 << j; k[P + (Y >> te) + (w -= g)] = H << 24 | D << 16 | Z | 0, w !== 0; ) ;
            for (g = 1 << N - 1; Y & g; ) g >>= 1;
            if (g !== 0 ? (Y &= g - 1, Y += g) : Y = 0, U++, --$[N] == 0) {
              if (N === V) break;
              N = A[R + O[U]];
            }
            if (Q < N && (Y & T) !== f) {
              for (te === 0 && (te = Q), P += v, X = 1 << (j = N - te); j + te < V && !((X -= $[j + te]) <= 0); ) j++, X <<= 1;
              if (oe += 1 << j, S === 1 && 852 < oe || S === 2 && 592 < oe) return 1;
              k[f = Y & T] = Q << 24 | j << 16 | P - d | 0;
            }
          }
          return Y !== 0 && (k[P + Y] = N - te << 24 | 64 << 16 | 0), h.bits = Q, 0;
        };
      }, { "../utils/common": 41 }], 51: [function(r, n, i) {
        n.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
      }, {}], 52: [function(r, n, i) {
        var a = r("../utils/common"), l = 0, s = 1;
        function c(u) {
          for (var p = u.length; 0 <= --p; ) u[p] = 0;
        }
        var b = 0, S = 29, A = 256, R = A + 1 + S, _ = 30, k = 19, d = 2 * R + 1, O = 15, h = 16, g = 7, w = 256, f = 16, T = 17, P = 18, L = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], H = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], D = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], Z = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], ce = new Array(2 * (R + 2));
        c(ce);
        var N = new Array(2 * _);
        c(N);
        var U = new Array(512);
        c(U);
        var v = new Array(256);
        c(v);
        var V = new Array(S);
        c(V);
        var Q, j, te, X = new Array(_);
        function oe(u, p, M, q, W) {
          this.static_tree = u, this.extra_bits = p, this.extra_base = M, this.elems = q, this.max_length = W, this.has_stree = u && u.length;
        }
        function Y(u, p) {
          this.dyn_tree = u, this.max_code = 0, this.stat_desc = p;
        }
        function C(u) {
          return u < 256 ? U[u] : U[256 + (u >>> 7)];
        }
        function K(u, p) {
          u.pending_buf[u.pending++] = 255 & p, u.pending_buf[u.pending++] = p >>> 8 & 255;
        }
        function $(u, p, M) {
          u.bi_valid > h - M ? (u.bi_buf |= p << u.bi_valid & 65535, K(u, u.bi_buf), u.bi_buf = p >> h - u.bi_valid, u.bi_valid += M - h) : (u.bi_buf |= p << u.bi_valid & 65535, u.bi_valid += M);
        }
        function re(u, p, M) {
          $(u, M[2 * p], M[2 * p + 1]);
        }
        function G(u, p) {
          for (var M = 0; M |= 1 & u, u >>>= 1, M <<= 1, 0 < --p; ) ;
          return M >>> 1;
        }
        function x(u, p, M) {
          var q, W, ne = new Array(O + 1), le = 0;
          for (q = 1; q <= O; q++) ne[q] = le = le + M[q - 1] << 1;
          for (W = 0; W <= p; W++) {
            var se = u[2 * W + 1];
            se !== 0 && (u[2 * W] = G(ne[se]++, se));
          }
        }
        function y(u) {
          var p;
          for (p = 0; p < R; p++) u.dyn_ltree[2 * p] = 0;
          for (p = 0; p < _; p++) u.dyn_dtree[2 * p] = 0;
          for (p = 0; p < k; p++) u.bl_tree[2 * p] = 0;
          u.dyn_ltree[2 * w] = 1, u.opt_len = u.static_len = 0, u.last_lit = u.matches = 0;
        }
        function z(u) {
          8 < u.bi_valid ? K(u, u.bi_buf) : 0 < u.bi_valid && (u.pending_buf[u.pending++] = u.bi_buf), u.bi_buf = 0, u.bi_valid = 0;
        }
        function B(u, p, M, q) {
          var W = 2 * p, ne = 2 * M;
          return u[W] < u[ne] || u[W] === u[ne] && q[p] <= q[M];
        }
        function I(u, p, M) {
          for (var q = u.heap[M], W = M << 1; W <= u.heap_len && (W < u.heap_len && B(p, u.heap[W + 1], u.heap[W], u.depth) && W++, !B(p, q, u.heap[W], u.depth)); ) u.heap[M] = u.heap[W], M = W, W <<= 1;
          u.heap[M] = q;
        }
        function F(u, p, M) {
          var q, W, ne, le, se = 0;
          if (u.last_lit !== 0) for (; q = u.pending_buf[u.d_buf + 2 * se] << 8 | u.pending_buf[u.d_buf + 2 * se + 1], W = u.pending_buf[u.l_buf + se], se++, q === 0 ? re(u, W, p) : (re(u, (ne = v[W]) + A + 1, p), (le = L[ne]) !== 0 && $(u, W -= V[ne], le), re(u, ne = C(--q), M), (le = H[ne]) !== 0 && $(u, q -= X[ne], le)), se < u.last_lit; ) ;
          re(u, w, p);
        }
        function ee(u, p) {
          var M, q, W, ne = p.dyn_tree, le = p.stat_desc.static_tree, se = p.stat_desc.has_stree, fe = p.stat_desc.elems, me = -1;
          for (u.heap_len = 0, u.heap_max = d, M = 0; M < fe; M++) ne[2 * M] !== 0 ? (u.heap[++u.heap_len] = me = M, u.depth[M] = 0) : ne[2 * M + 1] = 0;
          for (; u.heap_len < 2; ) ne[2 * (W = u.heap[++u.heap_len] = me < 2 ? ++me : 0)] = 1, u.depth[W] = 0, u.opt_len--, se && (u.static_len -= le[2 * W + 1]);
          for (p.max_code = me, M = u.heap_len >> 1; 1 <= M; M--) I(u, ne, M);
          for (W = fe; M = u.heap[1], u.heap[1] = u.heap[u.heap_len--], I(u, ne, 1), q = u.heap[1], u.heap[--u.heap_max] = M, u.heap[--u.heap_max] = q, ne[2 * W] = ne[2 * M] + ne[2 * q], u.depth[W] = (u.depth[M] >= u.depth[q] ? u.depth[M] : u.depth[q]) + 1, ne[2 * M + 1] = ne[2 * q + 1] = W, u.heap[1] = W++, I(u, ne, 1), 2 <= u.heap_len; ) ;
          u.heap[--u.heap_max] = u.heap[1], function(ge, He) {
            var Ot, rt, wr, Fe, jr, Pn, dt = He.dyn_tree, ua = He.max_code, Yl = He.stat_desc.static_tree, ql = He.stat_desc.has_stree, Gl = He.stat_desc.extra_bits, la = He.stat_desc.extra_base, yr = He.stat_desc.max_length, zr = 0;
            for (Fe = 0; Fe <= O; Fe++) ge.bl_count[Fe] = 0;
            for (dt[2 * ge.heap[ge.heap_max] + 1] = 0, Ot = ge.heap_max + 1; Ot < d; Ot++) yr < (Fe = dt[2 * dt[2 * (rt = ge.heap[Ot]) + 1] + 1] + 1) && (Fe = yr, zr++), dt[2 * rt + 1] = Fe, ua < rt || (ge.bl_count[Fe]++, jr = 0, la <= rt && (jr = Gl[rt - la]), Pn = dt[2 * rt], ge.opt_len += Pn * (Fe + jr), ql && (ge.static_len += Pn * (Yl[2 * rt + 1] + jr)));
            if (zr !== 0) {
              do {
                for (Fe = yr - 1; ge.bl_count[Fe] === 0; ) Fe--;
                ge.bl_count[Fe]--, ge.bl_count[Fe + 1] += 2, ge.bl_count[yr]--, zr -= 2;
              } while (0 < zr);
              for (Fe = yr; Fe !== 0; Fe--) for (rt = ge.bl_count[Fe]; rt !== 0; ) ua < (wr = ge.heap[--Ot]) || (dt[2 * wr + 1] !== Fe && (ge.opt_len += (Fe - dt[2 * wr + 1]) * dt[2 * wr], dt[2 * wr + 1] = Fe), rt--);
            }
          }(u, p), x(ne, me, u.bl_count);
        }
        function m(u, p, M) {
          var q, W, ne = -1, le = p[1], se = 0, fe = 7, me = 4;
          for (le === 0 && (fe = 138, me = 3), p[2 * (M + 1) + 1] = 65535, q = 0; q <= M; q++) W = le, le = p[2 * (q + 1) + 1], ++se < fe && W === le || (se < me ? u.bl_tree[2 * W] += se : W !== 0 ? (W !== ne && u.bl_tree[2 * W]++, u.bl_tree[2 * f]++) : se <= 10 ? u.bl_tree[2 * T]++ : u.bl_tree[2 * P]++, ne = W, me = (se = 0) === le ? (fe = 138, 3) : W === le ? (fe = 6, 3) : (fe = 7, 4));
        }
        function J(u, p, M) {
          var q, W, ne = -1, le = p[1], se = 0, fe = 7, me = 4;
          for (le === 0 && (fe = 138, me = 3), q = 0; q <= M; q++) if (W = le, le = p[2 * (q + 1) + 1], !(++se < fe && W === le)) {
            if (se < me) for (; re(u, W, u.bl_tree), --se != 0; ) ;
            else W !== 0 ? (W !== ne && (re(u, W, u.bl_tree), se--), re(u, f, u.bl_tree), $(u, se - 3, 2)) : se <= 10 ? (re(u, T, u.bl_tree), $(u, se - 3, 3)) : (re(u, P, u.bl_tree), $(u, se - 11, 7));
            ne = W, me = (se = 0) === le ? (fe = 138, 3) : W === le ? (fe = 6, 3) : (fe = 7, 4);
          }
        }
        c(X);
        var E = !1;
        function o(u, p, M, q) {
          $(u, (b << 1) + (q ? 1 : 0), 3), function(W, ne, le, se) {
            z(W), K(W, le), K(W, ~le), a.arraySet(W.pending_buf, W.window, ne, le, W.pending), W.pending += le;
          }(u, p, M);
        }
        i._tr_init = function(u) {
          E || (function() {
            var p, M, q, W, ne, le = new Array(O + 1);
            for (W = q = 0; W < S - 1; W++) for (V[W] = q, p = 0; p < 1 << L[W]; p++) v[q++] = W;
            for (v[q - 1] = W, W = ne = 0; W < 16; W++) for (X[W] = ne, p = 0; p < 1 << H[W]; p++) U[ne++] = W;
            for (ne >>= 7; W < _; W++) for (X[W] = ne << 7, p = 0; p < 1 << H[W] - 7; p++) U[256 + ne++] = W;
            for (M = 0; M <= O; M++) le[M] = 0;
            for (p = 0; p <= 143; ) ce[2 * p + 1] = 8, p++, le[8]++;
            for (; p <= 255; ) ce[2 * p + 1] = 9, p++, le[9]++;
            for (; p <= 279; ) ce[2 * p + 1] = 7, p++, le[7]++;
            for (; p <= 287; ) ce[2 * p + 1] = 8, p++, le[8]++;
            for (x(ce, R + 1, le), p = 0; p < _; p++) N[2 * p + 1] = 5, N[2 * p] = G(p, 5);
            Q = new oe(ce, L, A + 1, R, O), j = new oe(N, H, 0, _, O), te = new oe(new Array(0), D, 0, k, g);
          }(), E = !0), u.l_desc = new Y(u.dyn_ltree, Q), u.d_desc = new Y(u.dyn_dtree, j), u.bl_desc = new Y(u.bl_tree, te), u.bi_buf = 0, u.bi_valid = 0, y(u);
        }, i._tr_stored_block = o, i._tr_flush_block = function(u, p, M, q) {
          var W, ne, le = 0;
          0 < u.level ? (u.strm.data_type === 2 && (u.strm.data_type = function(se) {
            var fe, me = 4093624447;
            for (fe = 0; fe <= 31; fe++, me >>>= 1) if (1 & me && se.dyn_ltree[2 * fe] !== 0) return l;
            if (se.dyn_ltree[18] !== 0 || se.dyn_ltree[20] !== 0 || se.dyn_ltree[26] !== 0) return s;
            for (fe = 32; fe < A; fe++) if (se.dyn_ltree[2 * fe] !== 0) return s;
            return l;
          }(u)), ee(u, u.l_desc), ee(u, u.d_desc), le = function(se) {
            var fe;
            for (m(se, se.dyn_ltree, se.l_desc.max_code), m(se, se.dyn_dtree, se.d_desc.max_code), ee(se, se.bl_desc), fe = k - 1; 3 <= fe && se.bl_tree[2 * Z[fe] + 1] === 0; fe--) ;
            return se.opt_len += 3 * (fe + 1) + 5 + 5 + 4, fe;
          }(u), W = u.opt_len + 3 + 7 >>> 3, (ne = u.static_len + 3 + 7 >>> 3) <= W && (W = ne)) : W = ne = M + 5, M + 4 <= W && p !== -1 ? o(u, p, M, q) : u.strategy === 4 || ne === W ? ($(u, 2 + (q ? 1 : 0), 3), F(u, ce, N)) : ($(u, 4 + (q ? 1 : 0), 3), function(se, fe, me, ge) {
            var He;
            for ($(se, fe - 257, 5), $(se, me - 1, 5), $(se, ge - 4, 4), He = 0; He < ge; He++) $(se, se.bl_tree[2 * Z[He] + 1], 3);
            J(se, se.dyn_ltree, fe - 1), J(se, se.dyn_dtree, me - 1);
          }(u, u.l_desc.max_code + 1, u.d_desc.max_code + 1, le + 1), F(u, u.dyn_ltree, u.dyn_dtree)), y(u), q && z(u);
        }, i._tr_tally = function(u, p, M) {
          return u.pending_buf[u.d_buf + 2 * u.last_lit] = p >>> 8 & 255, u.pending_buf[u.d_buf + 2 * u.last_lit + 1] = 255 & p, u.pending_buf[u.l_buf + u.last_lit] = 255 & M, u.last_lit++, p === 0 ? u.dyn_ltree[2 * M]++ : (u.matches++, p--, u.dyn_ltree[2 * (v[M] + A + 1)]++, u.dyn_dtree[2 * C(p)]++), u.last_lit === u.lit_bufsize - 1;
        }, i._tr_align = function(u) {
          $(u, 2, 3), re(u, w, ce), function(p) {
            p.bi_valid === 16 ? (K(p, p.bi_buf), p.bi_buf = 0, p.bi_valid = 0) : 8 <= p.bi_valid && (p.pending_buf[p.pending++] = 255 & p.bi_buf, p.bi_buf >>= 8, p.bi_valid -= 8);
          }(u);
        };
      }, { "../utils/common": 41 }], 53: [function(r, n, i) {
        n.exports = function() {
          this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
        };
      }, {}], 54: [function(r, n, i) {
        (function(a) {
          (function(l, s) {
            if (!l.setImmediate) {
              var c, b, S, A, R = 1, _ = {}, k = !1, d = l.document, O = Object.getPrototypeOf && Object.getPrototypeOf(l);
              O = O && O.setTimeout ? O : l, c = {}.toString.call(l.process) === "[object process]" ? function(f) {
                _e.nextTick(function() {
                  g(f);
                });
              } : function() {
                if (l.postMessage && !l.importScripts) {
                  var f = !0, T = l.onmessage;
                  return l.onmessage = function() {
                    f = !1;
                  }, l.postMessage("", "*"), l.onmessage = T, f;
                }
              }() ? (A = "setImmediate$" + Math.random() + "$", l.addEventListener ? l.addEventListener("message", w, !1) : l.attachEvent("onmessage", w), function(f) {
                l.postMessage(A + f, "*");
              }) : l.MessageChannel ? ((S = new MessageChannel()).port1.onmessage = function(f) {
                g(f.data);
              }, function(f) {
                S.port2.postMessage(f);
              }) : d && "onreadystatechange" in d.createElement("script") ? (b = d.documentElement, function(f) {
                var T = d.createElement("script");
                T.onreadystatechange = function() {
                  g(f), T.onreadystatechange = null, b.removeChild(T), T = null;
                }, b.appendChild(T);
              }) : function(f) {
                setTimeout(g, 0, f);
              }, O.setImmediate = function(f) {
                typeof f != "function" && (f = new Function("" + f));
                for (var T = new Array(arguments.length - 1), P = 0; P < T.length; P++) T[P] = arguments[P + 1];
                var L = { callback: f, args: T };
                return _[R] = L, c(R), R++;
              }, O.clearImmediate = h;
            }
            function h(f) {
              delete _[f];
            }
            function g(f) {
              if (k) setTimeout(g, 0, f);
              else {
                var T = _[f];
                if (T) {
                  k = !0;
                  try {
                    (function(P) {
                      var L = P.callback, H = P.args;
                      switch (H.length) {
                        case 0:
                          L();
                          break;
                        case 1:
                          L(H[0]);
                          break;
                        case 2:
                          L(H[0], H[1]);
                          break;
                        case 3:
                          L(H[0], H[1], H[2]);
                          break;
                        default:
                          L.apply(s, H);
                      }
                    })(T);
                  } finally {
                    h(f), k = !1;
                  }
                }
              }
            }
            function w(f) {
              f.source === l && typeof f.data == "string" && f.data.indexOf(A) === 0 && g(+f.data.slice(A.length));
            }
          })(typeof self > "u" ? a === void 0 ? this : a : self);
        }).call(this, typeof ut < "u" ? ut : typeof self < "u" ? self : typeof window < "u" ? window : {});
      }, {}] }, {}, [10])(10);
    });
  }(is)), is.exports;
}
var gp = yp();
const vp = /* @__PURE__ */ cu(gp);
var xr = { exports: {} }, ss, Jo;
function _p() {
  if (Jo) return ss;
  Jo = 1;
  var t = {
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
    "<": "&lt;",
    ">": "&gt;"
  };
  function e(r) {
    return r && r.replace ? r.replace(/([&"<>'])/g, function(n, i) {
      return t[i];
    }) : r;
  }
  return ss = e, ss;
}
var Qo;
function bp() {
  if (Qo) return xr.exports;
  Qo = 1;
  var t = _p(), e = Ns().Stream, r = "    ";
  function n(b, S) {
    typeof S != "object" && (S = {
      indent: S
    });
    var A = S.stream ? new e() : null, R = "", _ = !1, k = S.indent ? S.indent === !0 ? r : S.indent : "", d = !0;
    function O(T) {
      d ? _e.nextTick(T) : T();
    }
    function h(T, P) {
      if (P !== void 0 && (R += P), T && !_ && (A = A || new e(), _ = !0), T && _) {
        var L = R;
        O(function() {
          A.emit("data", L);
        }), R = "";
      }
    }
    function g(T, P) {
      s(h, l(T, k, k ? 1 : 0), P);
    }
    function w() {
      if (A) {
        var T = R;
        O(function() {
          A.emit("data", T), A.emit("end"), A.readable = !1, A.emit("close");
        });
      }
    }
    function f(T) {
      var P = T.encoding || "UTF-8", L = { version: "1.0", encoding: P };
      T.standalone && (L.standalone = T.standalone), g({ "?xml": { _attr: L } }), R = R.replace("/>", "?>");
    }
    return O(function() {
      d = !1;
    }), S.declaration && f(S.declaration), b && b.forEach ? b.forEach(function(T, P) {
      var L;
      P + 1 === b.length && (L = w), g(T, L);
    }) : g(b, w), A ? (A.readable = !0, A) : R;
  }
  function i() {
    var b = Array.prototype.slice.call(arguments), S = {
      _elem: l(b)
    };
    return S.push = function(A) {
      if (!this.append)
        throw new Error("not assigned to a parent!");
      var R = this, _ = this._elem.indent;
      s(
        this.append,
        l(
          A,
          _,
          this._elem.icount + (_ ? 1 : 0)
        ),
        function() {
          R.append(!0);
        }
      );
    }, S.close = function(A) {
      A !== void 0 && this.push(A), this.end && this.end();
    }, S;
  }
  function a(b, S) {
    return new Array(S || 0).join(b || "");
  }
  function l(b, S, A) {
    A = A || 0;
    var R = a(S, A), _, k = b, d = !1;
    if (typeof b == "object") {
      var O = Object.keys(b);
      if (_ = O[0], k = b[_], k && k._elem)
        return k._elem.name = _, k._elem.icount = A, k._elem.indent = S, k._elem.indents = R, k._elem.interrupt = k, k._elem;
    }
    var h = [], g = [], w;
    function f(T) {
      var P = Object.keys(T);
      P.forEach(function(L) {
        h.push(c(L, T[L]));
      });
    }
    switch (typeof k) {
      case "object":
        if (k === null) break;
        k._attr && f(k._attr), k._cdata && g.push(
          ("<![CDATA[" + k._cdata).replace(/\]\]>/g, "]]]]><![CDATA[>") + "]]>"
        ), k.forEach && (w = !1, g.push(""), k.forEach(function(T) {
          if (typeof T == "object") {
            var P = Object.keys(T)[0];
            P == "_attr" ? f(T._attr) : g.push(l(
              T,
              S,
              A + 1
            ));
          } else
            g.pop(), w = !0, g.push(t(T));
        }), w || g.push(""));
        break;
      default:
        g.push(t(k));
    }
    return {
      name: _,
      interrupt: d,
      attributes: h,
      content: g,
      icount: A,
      indents: R,
      indent: S
    };
  }
  function s(b, S, A) {
    if (typeof S != "object")
      return b(!1, S);
    var R = S.interrupt ? 1 : S.content.length;
    function _() {
      for (; S.content.length; ) {
        var d = S.content.shift();
        if (d !== void 0) {
          if (k(d)) return;
          s(b, d);
        }
      }
      b(!1, (R > 1 ? S.indents : "") + (S.name ? "</" + S.name + ">" : "") + (S.indent && !A ? `
` : "")), A && A();
    }
    function k(d) {
      return d.interrupt ? (d.interrupt.append = b, d.interrupt.end = _, d.interrupt = !1, b(!0), !0) : !1;
    }
    if (b(!1, S.indents + (S.name ? "<" + S.name : "") + (S.attributes.length ? " " + S.attributes.join(" ") : "") + (R ? S.name ? ">" : "" : S.name ? "/>" : "") + (S.indent && R > 1 ? `
` : "")), !R)
      return b(!1, S.indent ? `
` : "");
    k(S) || _();
  }
  function c(b, S) {
    return b + '="' + t(S) + '"';
  }
  return xr.exports = n, xr.exports.element = xr.exports.Element = i, xr.exports;
}
var xp = bp();
const Pe = /* @__PURE__ */ cu(xp), Sr = 0, as = 32, Sp = 32, Ep = (t, e) => {
  const r = e.replace(/-/g, "");
  if (r.length !== Sp)
    throw new Error(`Error: Cannot extract GUID from font filename: ${e}`);
  const i = r.replace(/(..)/g, "$1 ").trim().split(" ").map((c) => parseInt(c, 16));
  i.reverse();
  const l = t.slice(Sr, as).map((c, b) => c ^ i[b % i.length]), s = new Uint8Array(Sr + l.length + Math.max(0, t.length - as));
  return s.set(t.slice(0, Sr)), s.set(l, Sr), s.set(t.slice(as), Sr + l.length), s;
};
class Tp {
  format(e, r = { stack: [] }) {
    const n = e.prepForXml(r);
    if (n)
      return n;
    throw Error("XMLComponent did not format correctly");
  }
}
class kp {
  replace(e, r, n) {
    let i = e;
    return r.forEach((a, l) => {
      i = i.replace(new RegExp(`{${a.fileName}}`, "g"), (n + l).toString());
    }), i;
  }
  getMediaData(e, r) {
    return r.Array.filter((n) => e.search(`{${n.fileName}}`) > 0);
  }
}
class Ap {
  replace(e, r) {
    let n = e;
    for (const i of r)
      n = n.replace(
        new RegExp(`{${i.reference}-${i.instance}}`, "g"),
        i.numId.toString()
      );
    return n;
  }
}
class Rp {
  constructor() {
    ie(this, "formatter"), ie(this, "imageReplacer"), ie(this, "numberingReplacer"), this.formatter = new Tp(), this.imageReplacer = new kp(), this.numberingReplacer = new Ap();
  }
  compile(e, r, n = []) {
    const i = new vp(), a = this.xmlifyFile(e, r), l = new Map(Object.entries(a));
    for (const [, s] of l)
      if (Array.isArray(s))
        for (const c of s)
          i.file(c.path, c.data);
      else
        i.file(s.path, s.data);
    for (const s of n)
      i.file(s.path, s.data);
    for (const s of e.Media.Array)
      s.type !== "svg" ? i.file(`word/media/${s.fileName}`, s.data) : (i.file(`word/media/${s.fileName}`, s.data), i.file(`word/media/${s.fallback.fileName}`, s.fallback.data));
    for (const { data: s, name: c, fontKey: b } of e.FontTable.fontOptionsWithKey) {
      const [S] = c.split(".");
      i.file(`word/fonts/${S}.odttf`, Ep(s, b));
    }
    return i;
  }
  xmlifyFile(e, r) {
    const n = e.Document.Relationships.RelationshipCount + 1, i = Pe(
      this.formatter.format(e.Document.View, {
        viewWrapper: e.Document,
        file: e,
        stack: []
      }),
      {
        indent: r,
        declaration: {
          standalone: "yes",
          encoding: "UTF-8"
        }
      }
    ), a = this.imageReplacer.getMediaData(i, e.Media);
    return {
      Relationships: {
        data: (a.forEach((l, s) => {
          e.Document.Relationships.createRelationship(
            n + s,
            "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
            `media/${l.fileName}`
          );
        }), e.Document.Relationships.createRelationship(
          e.Document.Relationships.RelationshipCount + 1,
          "http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable",
          "fontTable.xml"
        ), Pe(
          this.formatter.format(e.Document.Relationships, {
            viewWrapper: e.Document,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              encoding: "UTF-8"
            }
          }
        )),
        path: "word/_rels/document.xml.rels"
      },
      Document: {
        data: (() => {
          const l = this.imageReplacer.replace(i, a, n);
          return this.numberingReplacer.replace(l, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/document.xml"
      },
      Styles: {
        data: (() => {
          const l = Pe(
            this.formatter.format(e.Styles, {
              viewWrapper: e.Document,
              file: e,
              stack: []
            }),
            {
              indent: r,
              declaration: {
                standalone: "yes",
                encoding: "UTF-8"
              }
            }
          );
          return this.numberingReplacer.replace(l, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/styles.xml"
      },
      Properties: {
        data: Pe(
          this.formatter.format(e.CoreProperties, {
            viewWrapper: e.Document,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              standalone: "yes",
              encoding: "UTF-8"
            }
          }
        ),
        path: "docProps/core.xml"
      },
      Numbering: {
        data: Pe(
          this.formatter.format(e.Numbering, {
            viewWrapper: e.Document,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              standalone: "yes",
              encoding: "UTF-8"
            }
          }
        ),
        path: "word/numbering.xml"
      },
      FileRelationships: {
        data: Pe(
          this.formatter.format(e.FileRelationships, {
            viewWrapper: e.Document,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              encoding: "UTF-8"
            }
          }
        ),
        path: "_rels/.rels"
      },
      HeaderRelationships: e.Headers.map((l, s) => {
        const c = Pe(
          this.formatter.format(l.View, {
            viewWrapper: l,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              encoding: "UTF-8"
            }
          }
        );
        return this.imageReplacer.getMediaData(c, e.Media).forEach((S, A) => {
          l.Relationships.createRelationship(
            A,
            "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
            `media/${S.fileName}`
          );
        }), {
          data: Pe(
            this.formatter.format(l.Relationships, {
              viewWrapper: l,
              file: e,
              stack: []
            }),
            {
              indent: r,
              declaration: {
                encoding: "UTF-8"
              }
            }
          ),
          path: `word/_rels/header${s + 1}.xml.rels`
        };
      }),
      FooterRelationships: e.Footers.map((l, s) => {
        const c = Pe(
          this.formatter.format(l.View, {
            viewWrapper: l,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              encoding: "UTF-8"
            }
          }
        );
        return this.imageReplacer.getMediaData(c, e.Media).forEach((S, A) => {
          l.Relationships.createRelationship(
            A,
            "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
            `media/${S.fileName}`
          );
        }), {
          data: Pe(
            this.formatter.format(l.Relationships, {
              viewWrapper: l,
              file: e,
              stack: []
            }),
            {
              indent: r,
              declaration: {
                encoding: "UTF-8"
              }
            }
          ),
          path: `word/_rels/footer${s + 1}.xml.rels`
        };
      }),
      Headers: e.Headers.map((l, s) => {
        const c = Pe(
          this.formatter.format(l.View, {
            viewWrapper: l,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              encoding: "UTF-8"
            }
          }
        ), b = this.imageReplacer.getMediaData(c, e.Media), S = this.imageReplacer.replace(c, b, 0);
        return {
          data: this.numberingReplacer.replace(S, e.Numbering.ConcreteNumbering),
          path: `word/header${s + 1}.xml`
        };
      }),
      Footers: e.Footers.map((l, s) => {
        const c = Pe(
          this.formatter.format(l.View, {
            viewWrapper: l,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              encoding: "UTF-8"
            }
          }
        ), b = this.imageReplacer.getMediaData(c, e.Media), S = this.imageReplacer.replace(c, b, 0);
        return {
          data: this.numberingReplacer.replace(S, e.Numbering.ConcreteNumbering),
          path: `word/footer${s + 1}.xml`
        };
      }),
      ContentTypes: {
        data: Pe(
          this.formatter.format(e.ContentTypes, {
            viewWrapper: e.Document,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              encoding: "UTF-8"
            }
          }
        ),
        path: "[Content_Types].xml"
      },
      CustomProperties: {
        data: Pe(
          this.formatter.format(e.CustomProperties, {
            viewWrapper: e.Document,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              standalone: "yes",
              encoding: "UTF-8"
            }
          }
        ),
        path: "docProps/custom.xml"
      },
      AppProperties: {
        data: Pe(
          this.formatter.format(e.AppProperties, {
            viewWrapper: e.Document,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              standalone: "yes",
              encoding: "UTF-8"
            }
          }
        ),
        path: "docProps/app.xml"
      },
      FootNotes: {
        data: Pe(
          this.formatter.format(e.FootNotes.View, {
            viewWrapper: e.FootNotes,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              encoding: "UTF-8"
            }
          }
        ),
        path: "word/footnotes.xml"
      },
      FootNotesRelationships: {
        data: Pe(
          this.formatter.format(e.FootNotes.Relationships, {
            viewWrapper: e.FootNotes,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              encoding: "UTF-8"
            }
          }
        ),
        path: "word/_rels/footnotes.xml.rels"
      },
      Settings: {
        data: Pe(
          this.formatter.format(e.Settings, {
            viewWrapper: e.Document,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              standalone: "yes",
              encoding: "UTF-8"
            }
          }
        ),
        path: "word/settings.xml"
      },
      Comments: {
        data: Pe(
          this.formatter.format(e.Comments, {
            viewWrapper: e.Document,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              standalone: "yes",
              encoding: "UTF-8"
            }
          }
        ),
        path: "word/comments.xml"
      },
      FontTable: {
        data: Pe(
          this.formatter.format(e.FontTable.View, {
            viewWrapper: e.Document,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              standalone: "yes",
              encoding: "UTF-8"
            }
          }
        ),
        path: "word/fontTable.xml"
      },
      FontTableRelationships: {
        data: Pe(
          this.formatter.format(e.FontTable.Relationships, {
            viewWrapper: e.Document,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              encoding: "UTF-8"
            }
          }
        ),
        path: "word/_rels/fontTable.xml.rels"
      }
    };
  }
}
const Op = {
  WITH_2_BLANKS: "  "
}, eu = (t) => t === !0 ? Op.WITH_2_BLANKS : t === !1 ? void 0 : t, $u = class Jt {
  // eslint-disable-next-line require-await
  static pack(e, r, n) {
    return ec(this, arguments, function* (i, a, l, s = []) {
      return this.compiler.compile(i, eu(l), s).generateAsync({
        type: a,
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        compression: "DEFLATE"
      });
    });
  }
  static toString(e, r, n = []) {
    return Jt.pack(e, "string", r, n);
  }
  static toBuffer(e, r, n = []) {
    return Jt.pack(e, "nodebuffer", r, n);
  }
  static toBase64String(e, r, n = []) {
    return Jt.pack(e, "base64", r, n);
  }
  static toBlob(e, r, n = []) {
    return Jt.pack(e, "blob", r, n);
  }
  static toArrayBuffer(e, r, n = []) {
    return Jt.pack(e, "arraybuffer", r, n);
  }
  static toStream(e, r, n = []) {
    const i = new wp.Stream();
    return this.compiler.compile(e, eu(r), n).generateAsync({
      type: "nodebuffer",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      compression: "DEFLATE"
    }).then((l) => {
      i.emit("data", l), i.emit("end");
    }), i;
  }
};
ie($u, "compiler", new Rp());
let Dp = $u;
//! moment.js
//! version : 2.30.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var Zu;
function de() {
  return Zu.apply(null, arguments);
}
function Np(t) {
  Zu = t;
}
function Qe(t) {
  return t instanceof Array || Object.prototype.toString.call(t) === "[object Array]";
}
function Gt(t) {
  return t != null && Object.prototype.toString.call(t) === "[object Object]";
}
function Ee(t, e) {
  return Object.prototype.hasOwnProperty.call(t, e);
}
function Ws(t) {
  if (Object.getOwnPropertyNames)
    return Object.getOwnPropertyNames(t).length === 0;
  var e;
  for (e in t)
    if (Ee(t, e))
      return !1;
  return !0;
}
function Ye(t) {
  return t === void 0;
}
function Et(t) {
  return typeof t == "number" || Object.prototype.toString.call(t) === "[object Number]";
}
function Lr(t) {
  return t instanceof Date || Object.prototype.toString.call(t) === "[object Date]";
}
function Xu(t, e) {
  var r = [], n, i = t.length;
  for (n = 0; n < i; ++n)
    r.push(e(t[n], n));
  return r;
}
function Dt(t, e) {
  for (var r in e)
    Ee(e, r) && (t[r] = e[r]);
  return Ee(e, "toString") && (t.toString = e.toString), Ee(e, "valueOf") && (t.valueOf = e.valueOf), t;
}
function ht(t, e, r, n) {
  return _l(t, e, r, n, !0).utc();
}
function Cp() {
  return {
    empty: !1,
    unusedTokens: [],
    unusedInput: [],
    overflow: -2,
    charsLeftOver: 0,
    nullInput: !1,
    invalidEra: null,
    invalidMonth: null,
    invalidFormat: !1,
    userInvalidated: !1,
    iso: !1,
    parsedDateParts: [],
    era: null,
    meridiem: null,
    rfc2822: !1,
    weekdayMismatch: !1
  };
}
function ve(t) {
  return t._pf == null && (t._pf = Cp()), t._pf;
}
var ys;
Array.prototype.some ? ys = Array.prototype.some : ys = function(t) {
  var e = Object(this), r = e.length >>> 0, n;
  for (n = 0; n < r; n++)
    if (n in e && t.call(this, e[n], n, e))
      return !0;
  return !1;
};
function js(t) {
  var e = null, r = !1, n = t._d && !isNaN(t._d.getTime());
  if (n && (e = ve(t), r = ys.call(e.parsedDateParts, function(i) {
    return i != null;
  }), n = e.overflow < 0 && !e.empty && !e.invalidEra && !e.invalidMonth && !e.invalidWeekday && !e.weekdayMismatch && !e.nullInput && !e.invalidFormat && !e.userInvalidated && (!e.meridiem || e.meridiem && r), t._strict && (n = n && e.charsLeftOver === 0 && e.unusedTokens.length === 0 && e.bigHour === void 0)), Object.isFrozen == null || !Object.isFrozen(t))
    t._isValid = n;
  else
    return n;
  return t._isValid;
}
function En(t) {
  var e = ht(NaN);
  return t != null ? Dt(ve(e), t) : ve(e).userInvalidated = !0, e;
}
var tu = de.momentProperties = [], os = !1;
function zs(t, e) {
  var r, n, i, a = tu.length;
  if (Ye(e._isAMomentObject) || (t._isAMomentObject = e._isAMomentObject), Ye(e._i) || (t._i = e._i), Ye(e._f) || (t._f = e._f), Ye(e._l) || (t._l = e._l), Ye(e._strict) || (t._strict = e._strict), Ye(e._tzm) || (t._tzm = e._tzm), Ye(e._isUTC) || (t._isUTC = e._isUTC), Ye(e._offset) || (t._offset = e._offset), Ye(e._pf) || (t._pf = ve(e)), Ye(e._locale) || (t._locale = e._locale), a > 0)
    for (r = 0; r < a; r++)
      n = tu[r], i = e[n], Ye(i) || (t[n] = i);
  return t;
}
function Br(t) {
  zs(this, t), this._d = new Date(t._d != null ? t._d.getTime() : NaN), this.isValid() || (this._d = /* @__PURE__ */ new Date(NaN)), os === !1 && (os = !0, de.updateOffset(this), os = !1);
}
function et(t) {
  return t instanceof Br || t != null && t._isAMomentObject != null;
}
function Ju(t) {
  de.suppressDeprecationWarnings === !1 && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + t);
}
function $e(t, e) {
  var r = !0;
  return Dt(function() {
    if (de.deprecationHandler != null && de.deprecationHandler(null, t), r) {
      var n = [], i, a, l, s = arguments.length;
      for (a = 0; a < s; a++) {
        if (i = "", typeof arguments[a] == "object") {
          i += `
[` + a + "] ";
          for (l in arguments[0])
            Ee(arguments[0], l) && (i += l + ": " + arguments[0][l] + ", ");
          i = i.slice(0, -2);
        } else
          i = arguments[a];
        n.push(i);
      }
      Ju(
        t + `
Arguments: ` + Array.prototype.slice.call(n).join("") + `
` + new Error().stack
      ), r = !1;
    }
    return e.apply(this, arguments);
  }, e);
}
var ru = {};
function Qu(t, e) {
  de.deprecationHandler != null && de.deprecationHandler(t, e), ru[t] || (Ju(e), ru[t] = !0);
}
de.suppressDeprecationWarnings = !1;
de.deprecationHandler = null;
function ft(t) {
  return typeof Function < "u" && t instanceof Function || Object.prototype.toString.call(t) === "[object Function]";
}
function Ip(t) {
  var e, r;
  for (r in t)
    Ee(t, r) && (e = t[r], ft(e) ? this[r] = e : this["_" + r] = e);
  this._config = t, this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function gs(t, e) {
  var r = Dt({}, t), n;
  for (n in e)
    Ee(e, n) && (Gt(t[n]) && Gt(e[n]) ? (r[n] = {}, Dt(r[n], t[n]), Dt(r[n], e[n])) : e[n] != null ? r[n] = e[n] : delete r[n]);
  for (n in t)
    Ee(t, n) && !Ee(e, n) && Gt(t[n]) && (r[n] = Dt({}, r[n]));
  return r;
}
function Hs(t) {
  t != null && this.set(t);
}
var vs;
Object.keys ? vs = Object.keys : vs = function(t) {
  var e, r = [];
  for (e in t)
    Ee(t, e) && r.push(e);
  return r;
};
var Fp = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function Pp(t, e, r) {
  var n = this._calendar[t] || this._calendar.sameElse;
  return ft(n) ? n.call(e, r) : n;
}
function lt(t, e, r) {
  var n = "" + Math.abs(t), i = e - n.length, a = t >= 0;
  return (a ? r ? "+" : "" : "-") + Math.pow(10, Math.max(0, i)).toString().substr(1) + n;
}
var Ys = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, tn = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, us = {}, nr = {};
function we(t, e, r, n) {
  var i = n;
  typeof n == "string" && (i = function() {
    return this[n]();
  }), t && (nr[t] = i), e && (nr[e[0]] = function() {
    return lt(i.apply(this, arguments), e[1], e[2]);
  }), r && (nr[r] = function() {
    return this.localeData().ordinal(
      i.apply(this, arguments),
      t
    );
  });
}
function Mp(t) {
  return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "");
}
function Lp(t) {
  var e = t.match(Ys), r, n;
  for (r = 0, n = e.length; r < n; r++)
    nr[e[r]] ? e[r] = nr[e[r]] : e[r] = Mp(e[r]);
  return function(i) {
    var a = "", l;
    for (l = 0; l < n; l++)
      a += ft(e[l]) ? e[l].call(i, t) : e[l];
    return a;
  };
}
function sn(t, e) {
  return t.isValid() ? (e = el(e, t.localeData()), us[e] = us[e] || Lp(e), us[e](t)) : t.localeData().invalidDate();
}
function el(t, e) {
  var r = 5;
  function n(i) {
    return e.longDateFormat(i) || i;
  }
  for (tn.lastIndex = 0; r >= 0 && tn.test(t); )
    t = t.replace(
      tn,
      n
    ), tn.lastIndex = 0, r -= 1;
  return t;
}
var Bp = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function Up(t) {
  var e = this._longDateFormat[t], r = this._longDateFormat[t.toUpperCase()];
  return e || !r ? e : (this._longDateFormat[t] = r.match(Ys).map(function(n) {
    return n === "MMMM" || n === "MM" || n === "DD" || n === "dddd" ? n.slice(1) : n;
  }).join(""), this._longDateFormat[t]);
}
var Wp = "Invalid date";
function jp() {
  return this._invalidDate;
}
var zp = "%d", Hp = /\d{1,2}/;
function Yp(t) {
  return this._ordinal.replace("%d", t);
}
var qp = {
  future: "in %s",
  past: "%s ago",
  s: "a few seconds",
  ss: "%d seconds",
  m: "a minute",
  mm: "%d minutes",
  h: "an hour",
  hh: "%d hours",
  d: "a day",
  dd: "%d days",
  w: "a week",
  ww: "%d weeks",
  M: "a month",
  MM: "%d months",
  y: "a year",
  yy: "%d years"
};
function Gp(t, e, r, n) {
  var i = this._relativeTime[r];
  return ft(i) ? i(t, e, r, n) : i.replace(/%d/i, t);
}
function Vp(t, e) {
  var r = this._relativeTime[t > 0 ? "future" : "past"];
  return ft(r) ? r(e) : r.replace(/%s/i, e);
}
var nu = {
  D: "date",
  dates: "date",
  date: "date",
  d: "day",
  days: "day",
  day: "day",
  e: "weekday",
  weekdays: "weekday",
  weekday: "weekday",
  E: "isoWeekday",
  isoweekdays: "isoWeekday",
  isoweekday: "isoWeekday",
  DDD: "dayOfYear",
  dayofyears: "dayOfYear",
  dayofyear: "dayOfYear",
  h: "hour",
  hours: "hour",
  hour: "hour",
  ms: "millisecond",
  milliseconds: "millisecond",
  millisecond: "millisecond",
  m: "minute",
  minutes: "minute",
  minute: "minute",
  M: "month",
  months: "month",
  month: "month",
  Q: "quarter",
  quarters: "quarter",
  quarter: "quarter",
  s: "second",
  seconds: "second",
  second: "second",
  gg: "weekYear",
  weekyears: "weekYear",
  weekyear: "weekYear",
  GG: "isoWeekYear",
  isoweekyears: "isoWeekYear",
  isoweekyear: "isoWeekYear",
  w: "week",
  weeks: "week",
  week: "week",
  W: "isoWeek",
  isoweeks: "isoWeek",
  isoweek: "isoWeek",
  y: "year",
  years: "year",
  year: "year"
};
function Ze(t) {
  return typeof t == "string" ? nu[t] || nu[t.toLowerCase()] : void 0;
}
function qs(t) {
  var e = {}, r, n;
  for (n in t)
    Ee(t, n) && (r = Ze(n), r && (e[r] = t[n]));
  return e;
}
var Kp = {
  date: 9,
  day: 11,
  weekday: 11,
  isoWeekday: 11,
  dayOfYear: 4,
  hour: 13,
  millisecond: 16,
  minute: 14,
  month: 8,
  quarter: 7,
  second: 15,
  weekYear: 1,
  isoWeekYear: 1,
  week: 5,
  isoWeek: 5,
  year: 1
};
function $p(t) {
  var e = [], r;
  for (r in t)
    Ee(t, r) && e.push({ unit: r, priority: Kp[r] });
  return e.sort(function(n, i) {
    return n.priority - i.priority;
  }), e;
}
var tl = /\d/, Ge = /\d\d/, rl = /\d{3}/, Gs = /\d{4}/, Tn = /[+-]?\d{6}/, De = /\d\d?/, nl = /\d\d\d\d?/, il = /\d\d\d\d\d\d?/, kn = /\d{1,3}/, Vs = /\d{1,4}/, An = /[+-]?\d{1,6}/, dr = /\d+/, Rn = /[+-]?\d+/, Zp = /Z|[+-]\d\d:?\d\d/gi, On = /Z|[+-]\d\d(?::?\d\d)?/gi, Xp = /[+-]?\d+(\.\d{1,3})?/, Ur = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, pr = /^[1-9]\d?/, Ks = /^([1-9]\d|\d)/, hn;
hn = {};
function pe(t, e, r) {
  hn[t] = ft(e) ? e : function(n, i) {
    return n && r ? r : e;
  };
}
function Jp(t, e) {
  return Ee(hn, t) ? hn[t](e._strict, e._locale) : new RegExp(Qp(t));
}
function Qp(t) {
  return xt(
    t.replace("\\", "").replace(
      /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
      function(e, r, n, i, a) {
        return r || n || i || a;
      }
    )
  );
}
function xt(t) {
  return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
function Ke(t) {
  return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
}
function be(t) {
  var e = +t, r = 0;
  return e !== 0 && isFinite(e) && (r = Ke(e)), r;
}
var _s = {};
function Re(t, e) {
  var r, n = e, i;
  for (typeof t == "string" && (t = [t]), Et(e) && (n = function(a, l) {
    l[e] = be(a);
  }), i = t.length, r = 0; r < i; r++)
    _s[t[r]] = n;
}
function Wr(t, e) {
  Re(t, function(r, n, i, a) {
    i._w = i._w || {}, e(r, i._w, i, a);
  });
}
function em(t, e, r) {
  e != null && Ee(_s, t) && _s[t](e, r._a, r, t);
}
function Dn(t) {
  return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0;
}
var je = 0, _t = 1, ot = 2, Be = 3, Je = 4, bt = 5, Yt = 6, tm = 7, rm = 8;
we("Y", 0, 0, function() {
  var t = this.year();
  return t <= 9999 ? lt(t, 4) : "+" + t;
});
we(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
we(0, ["YYYY", 4], 0, "year");
we(0, ["YYYYY", 5], 0, "year");
we(0, ["YYYYYY", 6, !0], 0, "year");
pe("Y", Rn);
pe("YY", De, Ge);
pe("YYYY", Vs, Gs);
pe("YYYYY", An, Tn);
pe("YYYYYY", An, Tn);
Re(["YYYYY", "YYYYYY"], je);
Re("YYYY", function(t, e) {
  e[je] = t.length === 2 ? de.parseTwoDigitYear(t) : be(t);
});
Re("YY", function(t, e) {
  e[je] = de.parseTwoDigitYear(t);
});
Re("Y", function(t, e) {
  e[je] = parseInt(t, 10);
});
function Ar(t) {
  return Dn(t) ? 366 : 365;
}
de.parseTwoDigitYear = function(t) {
  return be(t) + (be(t) > 68 ? 1900 : 2e3);
};
var sl = mr("FullYear", !0);
function nm() {
  return Dn(this.year());
}
function mr(t, e) {
  return function(r) {
    return r != null ? (al(this, t, r), de.updateOffset(this, e), this) : Dr(this, t);
  };
}
function Dr(t, e) {
  if (!t.isValid())
    return NaN;
  var r = t._d, n = t._isUTC;
  switch (e) {
    case "Milliseconds":
      return n ? r.getUTCMilliseconds() : r.getMilliseconds();
    case "Seconds":
      return n ? r.getUTCSeconds() : r.getSeconds();
    case "Minutes":
      return n ? r.getUTCMinutes() : r.getMinutes();
    case "Hours":
      return n ? r.getUTCHours() : r.getHours();
    case "Date":
      return n ? r.getUTCDate() : r.getDate();
    case "Day":
      return n ? r.getUTCDay() : r.getDay();
    case "Month":
      return n ? r.getUTCMonth() : r.getMonth();
    case "FullYear":
      return n ? r.getUTCFullYear() : r.getFullYear();
    default:
      return NaN;
  }
}
function al(t, e, r) {
  var n, i, a, l, s;
  if (!(!t.isValid() || isNaN(r))) {
    switch (n = t._d, i = t._isUTC, e) {
      case "Milliseconds":
        return void (i ? n.setUTCMilliseconds(r) : n.setMilliseconds(r));
      case "Seconds":
        return void (i ? n.setUTCSeconds(r) : n.setSeconds(r));
      case "Minutes":
        return void (i ? n.setUTCMinutes(r) : n.setMinutes(r));
      case "Hours":
        return void (i ? n.setUTCHours(r) : n.setHours(r));
      case "Date":
        return void (i ? n.setUTCDate(r) : n.setDate(r));
      case "FullYear":
        break;
      default:
        return;
    }
    a = r, l = t.month(), s = t.date(), s = s === 29 && l === 1 && !Dn(a) ? 28 : s, i ? n.setUTCFullYear(a, l, s) : n.setFullYear(a, l, s);
  }
}
function im(t) {
  return t = Ze(t), ft(this[t]) ? this[t]() : this;
}
function sm(t, e) {
  if (typeof t == "object") {
    t = qs(t);
    var r = $p(t), n, i = r.length;
    for (n = 0; n < i; n++)
      this[r[n].unit](t[r[n].unit]);
  } else if (t = Ze(t), ft(this[t]))
    return this[t](e);
  return this;
}
function am(t, e) {
  return (t % e + e) % e;
}
var Me;
Array.prototype.indexOf ? Me = Array.prototype.indexOf : Me = function(t) {
  var e;
  for (e = 0; e < this.length; ++e)
    if (this[e] === t)
      return e;
  return -1;
};
function $s(t, e) {
  if (isNaN(t) || isNaN(e))
    return NaN;
  var r = am(e, 12);
  return t += (e - r) / 12, r === 1 ? Dn(t) ? 29 : 28 : 31 - r % 7 % 2;
}
we("M", ["MM", 2], "Mo", function() {
  return this.month() + 1;
});
we("MMM", 0, 0, function(t) {
  return this.localeData().monthsShort(this, t);
});
we("MMMM", 0, 0, function(t) {
  return this.localeData().months(this, t);
});
pe("M", De, pr);
pe("MM", De, Ge);
pe("MMM", function(t, e) {
  return e.monthsShortRegex(t);
});
pe("MMMM", function(t, e) {
  return e.monthsRegex(t);
});
Re(["M", "MM"], function(t, e) {
  e[_t] = be(t) - 1;
});
Re(["MMM", "MMMM"], function(t, e, r, n) {
  var i = r._locale.monthsParse(t, n, r._strict);
  i != null ? e[_t] = i : ve(r).invalidMonth = t;
});
var om = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), ol = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), ul = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, um = Ur, lm = Ur;
function cm(t, e) {
  return t ? Qe(this._months) ? this._months[t.month()] : this._months[(this._months.isFormat || ul).test(e) ? "format" : "standalone"][t.month()] : Qe(this._months) ? this._months : this._months.standalone;
}
function hm(t, e) {
  return t ? Qe(this._monthsShort) ? this._monthsShort[t.month()] : this._monthsShort[ul.test(e) ? "format" : "standalone"][t.month()] : Qe(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
}
function fm(t, e, r) {
  var n, i, a, l = t.toLocaleLowerCase();
  if (!this._monthsParse)
    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], n = 0; n < 12; ++n)
      a = ht([2e3, n]), this._shortMonthsParse[n] = this.monthsShort(
        a,
        ""
      ).toLocaleLowerCase(), this._longMonthsParse[n] = this.months(a, "").toLocaleLowerCase();
  return r ? e === "MMM" ? (i = Me.call(this._shortMonthsParse, l), i !== -1 ? i : null) : (i = Me.call(this._longMonthsParse, l), i !== -1 ? i : null) : e === "MMM" ? (i = Me.call(this._shortMonthsParse, l), i !== -1 ? i : (i = Me.call(this._longMonthsParse, l), i !== -1 ? i : null)) : (i = Me.call(this._longMonthsParse, l), i !== -1 ? i : (i = Me.call(this._shortMonthsParse, l), i !== -1 ? i : null));
}
function dm(t, e, r) {
  var n, i, a;
  if (this._monthsParseExact)
    return fm.call(this, t, e, r);
  for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), n = 0; n < 12; n++) {
    if (i = ht([2e3, n]), r && !this._longMonthsParse[n] && (this._longMonthsParse[n] = new RegExp(
      "^" + this.months(i, "").replace(".", "") + "$",
      "i"
    ), this._shortMonthsParse[n] = new RegExp(
      "^" + this.monthsShort(i, "").replace(".", "") + "$",
      "i"
    )), !r && !this._monthsParse[n] && (a = "^" + this.months(i, "") + "|^" + this.monthsShort(i, ""), this._monthsParse[n] = new RegExp(a.replace(".", ""), "i")), r && e === "MMMM" && this._longMonthsParse[n].test(t))
      return n;
    if (r && e === "MMM" && this._shortMonthsParse[n].test(t))
      return n;
    if (!r && this._monthsParse[n].test(t))
      return n;
  }
}
function ll(t, e) {
  if (!t.isValid())
    return t;
  if (typeof e == "string") {
    if (/^\d+$/.test(e))
      e = be(e);
    else if (e = t.localeData().monthsParse(e), !Et(e))
      return t;
  }
  var r = e, n = t.date();
  return n = n < 29 ? n : Math.min(n, $s(t.year(), r)), t._isUTC ? t._d.setUTCMonth(r, n) : t._d.setMonth(r, n), t;
}
function cl(t) {
  return t != null ? (ll(this, t), de.updateOffset(this, !0), this) : Dr(this, "Month");
}
function pm() {
  return $s(this.year(), this.month());
}
function mm(t) {
  return this._monthsParseExact ? (Ee(this, "_monthsRegex") || hl.call(this), t ? this._monthsShortStrictRegex : this._monthsShortRegex) : (Ee(this, "_monthsShortRegex") || (this._monthsShortRegex = um), this._monthsShortStrictRegex && t ? this._monthsShortStrictRegex : this._monthsShortRegex);
}
function wm(t) {
  return this._monthsParseExact ? (Ee(this, "_monthsRegex") || hl.call(this), t ? this._monthsStrictRegex : this._monthsRegex) : (Ee(this, "_monthsRegex") || (this._monthsRegex = lm), this._monthsStrictRegex && t ? this._monthsStrictRegex : this._monthsRegex);
}
function hl() {
  function t(c, b) {
    return b.length - c.length;
  }
  var e = [], r = [], n = [], i, a, l, s;
  for (i = 0; i < 12; i++)
    a = ht([2e3, i]), l = xt(this.monthsShort(a, "")), s = xt(this.months(a, "")), e.push(l), r.push(s), n.push(s), n.push(l);
  e.sort(t), r.sort(t), n.sort(t), this._monthsRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp(
    "^(" + r.join("|") + ")",
    "i"
  ), this._monthsShortStrictRegex = new RegExp(
    "^(" + e.join("|") + ")",
    "i"
  );
}
function ym(t, e, r, n, i, a, l) {
  var s;
  return t < 100 && t >= 0 ? (s = new Date(t + 400, e, r, n, i, a, l), isFinite(s.getFullYear()) && s.setFullYear(t)) : s = new Date(t, e, r, n, i, a, l), s;
}
function Nr(t) {
  var e, r;
  return t < 100 && t >= 0 ? (r = Array.prototype.slice.call(arguments), r[0] = t + 400, e = new Date(Date.UTC.apply(null, r)), isFinite(e.getUTCFullYear()) && e.setUTCFullYear(t)) : e = new Date(Date.UTC.apply(null, arguments)), e;
}
function fn(t, e, r) {
  var n = 7 + e - r, i = (7 + Nr(t, 0, n).getUTCDay() - e) % 7;
  return -i + n - 1;
}
function fl(t, e, r, n, i) {
  var a = (7 + r - n) % 7, l = fn(t, n, i), s = 1 + 7 * (e - 1) + a + l, c, b;
  return s <= 0 ? (c = t - 1, b = Ar(c) + s) : s > Ar(t) ? (c = t + 1, b = s - Ar(t)) : (c = t, b = s), {
    year: c,
    dayOfYear: b
  };
}
function Cr(t, e, r) {
  var n = fn(t.year(), e, r), i = Math.floor((t.dayOfYear() - n - 1) / 7) + 1, a, l;
  return i < 1 ? (l = t.year() - 1, a = i + St(l, e, r)) : i > St(t.year(), e, r) ? (a = i - St(t.year(), e, r), l = t.year() + 1) : (l = t.year(), a = i), {
    week: a,
    year: l
  };
}
function St(t, e, r) {
  var n = fn(t, e, r), i = fn(t + 1, e, r);
  return (Ar(t) - n + i) / 7;
}
we("w", ["ww", 2], "wo", "week");
we("W", ["WW", 2], "Wo", "isoWeek");
pe("w", De, pr);
pe("ww", De, Ge);
pe("W", De, pr);
pe("WW", De, Ge);
Wr(
  ["w", "ww", "W", "WW"],
  function(t, e, r, n) {
    e[n.substr(0, 1)] = be(t);
  }
);
function gm(t) {
  return Cr(t, this._week.dow, this._week.doy).week;
}
var vm = {
  dow: 0,
  // Sunday is the first day of the week.
  doy: 6
  // The week that contains Jan 6th is the first week of the year.
};
function _m() {
  return this._week.dow;
}
function bm() {
  return this._week.doy;
}
function xm(t) {
  var e = this.localeData().week(this);
  return t == null ? e : this.add((t - e) * 7, "d");
}
function Sm(t) {
  var e = Cr(this, 1, 4).week;
  return t == null ? e : this.add((t - e) * 7, "d");
}
we("d", 0, "do", "day");
we("dd", 0, 0, function(t) {
  return this.localeData().weekdaysMin(this, t);
});
we("ddd", 0, 0, function(t) {
  return this.localeData().weekdaysShort(this, t);
});
we("dddd", 0, 0, function(t) {
  return this.localeData().weekdays(this, t);
});
we("e", 0, 0, "weekday");
we("E", 0, 0, "isoWeekday");
pe("d", De);
pe("e", De);
pe("E", De);
pe("dd", function(t, e) {
  return e.weekdaysMinRegex(t);
});
pe("ddd", function(t, e) {
  return e.weekdaysShortRegex(t);
});
pe("dddd", function(t, e) {
  return e.weekdaysRegex(t);
});
Wr(["dd", "ddd", "dddd"], function(t, e, r, n) {
  var i = r._locale.weekdaysParse(t, n, r._strict);
  i != null ? e.d = i : ve(r).invalidWeekday = t;
});
Wr(["d", "e", "E"], function(t, e, r, n) {
  e[n] = be(t);
});
function Em(t, e) {
  return typeof t != "string" ? t : isNaN(t) ? (t = e.weekdaysParse(t), typeof t == "number" ? t : null) : parseInt(t, 10);
}
function Tm(t, e) {
  return typeof t == "string" ? e.weekdaysParse(t) % 7 || 7 : isNaN(t) ? null : t;
}
function Zs(t, e) {
  return t.slice(e, 7).concat(t.slice(0, e));
}
var km = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), dl = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), Am = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), Rm = Ur, Om = Ur, Dm = Ur;
function Nm(t, e) {
  var r = Qe(this._weekdays) ? this._weekdays : this._weekdays[t && t !== !0 && this._weekdays.isFormat.test(e) ? "format" : "standalone"];
  return t === !0 ? Zs(r, this._week.dow) : t ? r[t.day()] : r;
}
function Cm(t) {
  return t === !0 ? Zs(this._weekdaysShort, this._week.dow) : t ? this._weekdaysShort[t.day()] : this._weekdaysShort;
}
function Im(t) {
  return t === !0 ? Zs(this._weekdaysMin, this._week.dow) : t ? this._weekdaysMin[t.day()] : this._weekdaysMin;
}
function Fm(t, e, r) {
  var n, i, a, l = t.toLocaleLowerCase();
  if (!this._weekdaysParse)
    for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], n = 0; n < 7; ++n)
      a = ht([2e3, 1]).day(n), this._minWeekdaysParse[n] = this.weekdaysMin(
        a,
        ""
      ).toLocaleLowerCase(), this._shortWeekdaysParse[n] = this.weekdaysShort(
        a,
        ""
      ).toLocaleLowerCase(), this._weekdaysParse[n] = this.weekdays(a, "").toLocaleLowerCase();
  return r ? e === "dddd" ? (i = Me.call(this._weekdaysParse, l), i !== -1 ? i : null) : e === "ddd" ? (i = Me.call(this._shortWeekdaysParse, l), i !== -1 ? i : null) : (i = Me.call(this._minWeekdaysParse, l), i !== -1 ? i : null) : e === "dddd" ? (i = Me.call(this._weekdaysParse, l), i !== -1 || (i = Me.call(this._shortWeekdaysParse, l), i !== -1) ? i : (i = Me.call(this._minWeekdaysParse, l), i !== -1 ? i : null)) : e === "ddd" ? (i = Me.call(this._shortWeekdaysParse, l), i !== -1 || (i = Me.call(this._weekdaysParse, l), i !== -1) ? i : (i = Me.call(this._minWeekdaysParse, l), i !== -1 ? i : null)) : (i = Me.call(this._minWeekdaysParse, l), i !== -1 || (i = Me.call(this._weekdaysParse, l), i !== -1) ? i : (i = Me.call(this._shortWeekdaysParse, l), i !== -1 ? i : null));
}
function Pm(t, e, r) {
  var n, i, a;
  if (this._weekdaysParseExact)
    return Fm.call(this, t, e, r);
  for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), n = 0; n < 7; n++) {
    if (i = ht([2e3, 1]).day(n), r && !this._fullWeekdaysParse[n] && (this._fullWeekdaysParse[n] = new RegExp(
      "^" + this.weekdays(i, "").replace(".", "\\.?") + "$",
      "i"
    ), this._shortWeekdaysParse[n] = new RegExp(
      "^" + this.weekdaysShort(i, "").replace(".", "\\.?") + "$",
      "i"
    ), this._minWeekdaysParse[n] = new RegExp(
      "^" + this.weekdaysMin(i, "").replace(".", "\\.?") + "$",
      "i"
    )), this._weekdaysParse[n] || (a = "^" + this.weekdays(i, "") + "|^" + this.weekdaysShort(i, "") + "|^" + this.weekdaysMin(i, ""), this._weekdaysParse[n] = new RegExp(a.replace(".", ""), "i")), r && e === "dddd" && this._fullWeekdaysParse[n].test(t))
      return n;
    if (r && e === "ddd" && this._shortWeekdaysParse[n].test(t))
      return n;
    if (r && e === "dd" && this._minWeekdaysParse[n].test(t))
      return n;
    if (!r && this._weekdaysParse[n].test(t))
      return n;
  }
}
function Mm(t) {
  if (!this.isValid())
    return t != null ? this : NaN;
  var e = Dr(this, "Day");
  return t != null ? (t = Em(t, this.localeData()), this.add(t - e, "d")) : e;
}
function Lm(t) {
  if (!this.isValid())
    return t != null ? this : NaN;
  var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return t == null ? e : this.add(t - e, "d");
}
function Bm(t) {
  if (!this.isValid())
    return t != null ? this : NaN;
  if (t != null) {
    var e = Tm(t, this.localeData());
    return this.day(this.day() % 7 ? e : e - 7);
  } else
    return this.day() || 7;
}
function Um(t) {
  return this._weekdaysParseExact ? (Ee(this, "_weekdaysRegex") || Xs.call(this), t ? this._weekdaysStrictRegex : this._weekdaysRegex) : (Ee(this, "_weekdaysRegex") || (this._weekdaysRegex = Rm), this._weekdaysStrictRegex && t ? this._weekdaysStrictRegex : this._weekdaysRegex);
}
function Wm(t) {
  return this._weekdaysParseExact ? (Ee(this, "_weekdaysRegex") || Xs.call(this), t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (Ee(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Om), this._weekdaysShortStrictRegex && t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
}
function jm(t) {
  return this._weekdaysParseExact ? (Ee(this, "_weekdaysRegex") || Xs.call(this), t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (Ee(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Dm), this._weekdaysMinStrictRegex && t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
}
function Xs() {
  function t(S, A) {
    return A.length - S.length;
  }
  var e = [], r = [], n = [], i = [], a, l, s, c, b;
  for (a = 0; a < 7; a++)
    l = ht([2e3, 1]).day(a), s = xt(this.weekdaysMin(l, "")), c = xt(this.weekdaysShort(l, "")), b = xt(this.weekdays(l, "")), e.push(s), r.push(c), n.push(b), i.push(s), i.push(c), i.push(b);
  e.sort(t), r.sort(t), n.sort(t), i.sort(t), this._weekdaysRegex = new RegExp("^(" + i.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp(
    "^(" + n.join("|") + ")",
    "i"
  ), this._weekdaysShortStrictRegex = new RegExp(
    "^(" + r.join("|") + ")",
    "i"
  ), this._weekdaysMinStrictRegex = new RegExp(
    "^(" + e.join("|") + ")",
    "i"
  );
}
function Js() {
  return this.hours() % 12 || 12;
}
function zm() {
  return this.hours() || 24;
}
we("H", ["HH", 2], 0, "hour");
we("h", ["hh", 2], 0, Js);
we("k", ["kk", 2], 0, zm);
we("hmm", 0, 0, function() {
  return "" + Js.apply(this) + lt(this.minutes(), 2);
});
we("hmmss", 0, 0, function() {
  return "" + Js.apply(this) + lt(this.minutes(), 2) + lt(this.seconds(), 2);
});
we("Hmm", 0, 0, function() {
  return "" + this.hours() + lt(this.minutes(), 2);
});
we("Hmmss", 0, 0, function() {
  return "" + this.hours() + lt(this.minutes(), 2) + lt(this.seconds(), 2);
});
function pl(t, e) {
  we(t, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      e
    );
  });
}
pl("a", !0);
pl("A", !1);
function ml(t, e) {
  return e._meridiemParse;
}
pe("a", ml);
pe("A", ml);
pe("H", De, Ks);
pe("h", De, pr);
pe("k", De, pr);
pe("HH", De, Ge);
pe("hh", De, Ge);
pe("kk", De, Ge);
pe("hmm", nl);
pe("hmmss", il);
pe("Hmm", nl);
pe("Hmmss", il);
Re(["H", "HH"], Be);
Re(["k", "kk"], function(t, e, r) {
  var n = be(t);
  e[Be] = n === 24 ? 0 : n;
});
Re(["a", "A"], function(t, e, r) {
  r._isPm = r._locale.isPM(t), r._meridiem = t;
});
Re(["h", "hh"], function(t, e, r) {
  e[Be] = be(t), ve(r).bigHour = !0;
});
Re("hmm", function(t, e, r) {
  var n = t.length - 2;
  e[Be] = be(t.substr(0, n)), e[Je] = be(t.substr(n)), ve(r).bigHour = !0;
});
Re("hmmss", function(t, e, r) {
  var n = t.length - 4, i = t.length - 2;
  e[Be] = be(t.substr(0, n)), e[Je] = be(t.substr(n, 2)), e[bt] = be(t.substr(i)), ve(r).bigHour = !0;
});
Re("Hmm", function(t, e, r) {
  var n = t.length - 2;
  e[Be] = be(t.substr(0, n)), e[Je] = be(t.substr(n));
});
Re("Hmmss", function(t, e, r) {
  var n = t.length - 4, i = t.length - 2;
  e[Be] = be(t.substr(0, n)), e[Je] = be(t.substr(n, 2)), e[bt] = be(t.substr(i));
});
function Hm(t) {
  return (t + "").toLowerCase().charAt(0) === "p";
}
var Ym = /[ap]\.?m?\.?/i, qm = mr("Hours", !0);
function Gm(t, e, r) {
  return t > 11 ? r ? "pm" : "PM" : r ? "am" : "AM";
}
var wl = {
  calendar: Fp,
  longDateFormat: Bp,
  invalidDate: Wp,
  ordinal: zp,
  dayOfMonthOrdinalParse: Hp,
  relativeTime: qp,
  months: om,
  monthsShort: ol,
  week: vm,
  weekdays: km,
  weekdaysMin: Am,
  weekdaysShort: dl,
  meridiemParse: Ym
}, Ne = {}, Er = {}, Ir;
function Vm(t, e) {
  var r, n = Math.min(t.length, e.length);
  for (r = 0; r < n; r += 1)
    if (t[r] !== e[r])
      return r;
  return n;
}
function iu(t) {
  return t && t.toLowerCase().replace("_", "-");
}
function Km(t) {
  for (var e = 0, r, n, i, a; e < t.length; ) {
    for (a = iu(t[e]).split("-"), r = a.length, n = iu(t[e + 1]), n = n ? n.split("-") : null; r > 0; ) {
      if (i = Nn(a.slice(0, r).join("-")), i)
        return i;
      if (n && n.length >= r && Vm(a, n) >= r - 1)
        break;
      r--;
    }
    e++;
  }
  return Ir;
}
function $m(t) {
  return !!(t && t.match("^[^/\\\\]*$"));
}
function Nn(t) {
  var e = null, r;
  if (Ne[t] === void 0 && typeof module < "u" && module && module.exports && $m(t))
    try {
      e = Ir._abbr, r = require, r("./locale/" + t), It(e);
    } catch {
      Ne[t] = null;
    }
  return Ne[t];
}
function It(t, e) {
  var r;
  return t && (Ye(e) ? r = At(t) : r = Qs(t, e), r ? Ir = r : typeof console < "u" && console.warn && console.warn(
    "Locale " + t + " not found. Did you forget to load it?"
  )), Ir._abbr;
}
function Qs(t, e) {
  if (e !== null) {
    var r, n = wl;
    if (e.abbr = t, Ne[t] != null)
      Qu(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ), n = Ne[t]._config;
    else if (e.parentLocale != null)
      if (Ne[e.parentLocale] != null)
        n = Ne[e.parentLocale]._config;
      else if (r = Nn(e.parentLocale), r != null)
        n = r._config;
      else
        return Er[e.parentLocale] || (Er[e.parentLocale] = []), Er[e.parentLocale].push({
          name: t,
          config: e
        }), null;
    return Ne[t] = new Hs(gs(n, e)), Er[t] && Er[t].forEach(function(i) {
      Qs(i.name, i.config);
    }), It(t), Ne[t];
  } else
    return delete Ne[t], null;
}
function Zm(t, e) {
  if (e != null) {
    var r, n, i = wl;
    Ne[t] != null && Ne[t].parentLocale != null ? Ne[t].set(gs(Ne[t]._config, e)) : (n = Nn(t), n != null && (i = n._config), e = gs(i, e), n == null && (e.abbr = t), r = new Hs(e), r.parentLocale = Ne[t], Ne[t] = r), It(t);
  } else
    Ne[t] != null && (Ne[t].parentLocale != null ? (Ne[t] = Ne[t].parentLocale, t === It() && It(t)) : Ne[t] != null && delete Ne[t]);
  return Ne[t];
}
function At(t) {
  var e;
  if (t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t)
    return Ir;
  if (!Qe(t)) {
    if (e = Nn(t), e)
      return e;
    t = [t];
  }
  return Km(t);
}
function Xm() {
  return vs(Ne);
}
function ea(t) {
  var e, r = t._a;
  return r && ve(t).overflow === -2 && (e = r[_t] < 0 || r[_t] > 11 ? _t : r[ot] < 1 || r[ot] > $s(r[je], r[_t]) ? ot : r[Be] < 0 || r[Be] > 24 || r[Be] === 24 && (r[Je] !== 0 || r[bt] !== 0 || r[Yt] !== 0) ? Be : r[Je] < 0 || r[Je] > 59 ? Je : r[bt] < 0 || r[bt] > 59 ? bt : r[Yt] < 0 || r[Yt] > 999 ? Yt : -1, ve(t)._overflowDayOfYear && (e < je || e > ot) && (e = ot), ve(t)._overflowWeeks && e === -1 && (e = tm), ve(t)._overflowWeekday && e === -1 && (e = rm), ve(t).overflow = e), t;
}
var Jm = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Qm = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, ew = /Z|[+-]\d\d(?::?\d\d)?/, rn = [
  ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
  ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
  ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
  ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
  ["YYYY-DDD", /\d{4}-\d{3}/],
  ["YYYY-MM", /\d{4}-\d\d/, !1],
  ["YYYYYYMMDD", /[+-]\d{10}/],
  ["YYYYMMDD", /\d{8}/],
  ["GGGG[W]WWE", /\d{4}W\d{3}/],
  ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
  ["YYYYDDD", /\d{7}/],
  ["YYYYMM", /\d{6}/, !1],
  ["YYYY", /\d{4}/, !1]
], ls = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], tw = /^\/?Date\((-?\d+)/i, rw = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, nw = {
  UT: 0,
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function yl(t) {
  var e, r, n = t._i, i = Jm.exec(n) || Qm.exec(n), a, l, s, c, b = rn.length, S = ls.length;
  if (i) {
    for (ve(t).iso = !0, e = 0, r = b; e < r; e++)
      if (rn[e][1].exec(i[1])) {
        l = rn[e][0], a = rn[e][2] !== !1;
        break;
      }
    if (l == null) {
      t._isValid = !1;
      return;
    }
    if (i[3]) {
      for (e = 0, r = S; e < r; e++)
        if (ls[e][1].exec(i[3])) {
          s = (i[2] || " ") + ls[e][0];
          break;
        }
      if (s == null) {
        t._isValid = !1;
        return;
      }
    }
    if (!a && s != null) {
      t._isValid = !1;
      return;
    }
    if (i[4])
      if (ew.exec(i[4]))
        c = "Z";
      else {
        t._isValid = !1;
        return;
      }
    t._f = l + (s || "") + (c || ""), ra(t);
  } else
    t._isValid = !1;
}
function iw(t, e, r, n, i, a) {
  var l = [
    sw(t),
    ol.indexOf(e),
    parseInt(r, 10),
    parseInt(n, 10),
    parseInt(i, 10)
  ];
  return a && l.push(parseInt(a, 10)), l;
}
function sw(t) {
  var e = parseInt(t, 10);
  return e <= 49 ? 2e3 + e : e <= 999 ? 1900 + e : e;
}
function aw(t) {
  return t.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function ow(t, e, r) {
  if (t) {
    var n = dl.indexOf(t), i = new Date(
      e[0],
      e[1],
      e[2]
    ).getDay();
    if (n !== i)
      return ve(r).weekdayMismatch = !0, r._isValid = !1, !1;
  }
  return !0;
}
function uw(t, e, r) {
  if (t)
    return nw[t];
  if (e)
    return 0;
  var n = parseInt(r, 10), i = n % 100, a = (n - i) / 100;
  return a * 60 + i;
}
function gl(t) {
  var e = rw.exec(aw(t._i)), r;
  if (e) {
    if (r = iw(
      e[4],
      e[3],
      e[2],
      e[5],
      e[6],
      e[7]
    ), !ow(e[1], r, t))
      return;
    t._a = r, t._tzm = uw(e[8], e[9], e[10]), t._d = Nr.apply(null, t._a), t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), ve(t).rfc2822 = !0;
  } else
    t._isValid = !1;
}
function lw(t) {
  var e = tw.exec(t._i);
  if (e !== null) {
    t._d = /* @__PURE__ */ new Date(+e[1]);
    return;
  }
  if (yl(t), t._isValid === !1)
    delete t._isValid;
  else
    return;
  if (gl(t), t._isValid === !1)
    delete t._isValid;
  else
    return;
  t._strict ? t._isValid = !1 : de.createFromInputFallback(t);
}
de.createFromInputFallback = $e(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(t) {
    t._d = /* @__PURE__ */ new Date(t._i + (t._useUTC ? " UTC" : ""));
  }
);
function Qt(t, e, r) {
  return t ?? e ?? r;
}
function cw(t) {
  var e = new Date(de.now());
  return t._useUTC ? [
    e.getUTCFullYear(),
    e.getUTCMonth(),
    e.getUTCDate()
  ] : [e.getFullYear(), e.getMonth(), e.getDate()];
}
function ta(t) {
  var e, r, n = [], i, a, l;
  if (!t._d) {
    for (i = cw(t), t._w && t._a[ot] == null && t._a[_t] == null && hw(t), t._dayOfYear != null && (l = Qt(t._a[je], i[je]), (t._dayOfYear > Ar(l) || t._dayOfYear === 0) && (ve(t)._overflowDayOfYear = !0), r = Nr(l, 0, t._dayOfYear), t._a[_t] = r.getUTCMonth(), t._a[ot] = r.getUTCDate()), e = 0; e < 3 && t._a[e] == null; ++e)
      t._a[e] = n[e] = i[e];
    for (; e < 7; e++)
      t._a[e] = n[e] = t._a[e] == null ? e === 2 ? 1 : 0 : t._a[e];
    t._a[Be] === 24 && t._a[Je] === 0 && t._a[bt] === 0 && t._a[Yt] === 0 && (t._nextDay = !0, t._a[Be] = 0), t._d = (t._useUTC ? Nr : ym).apply(
      null,
      n
    ), a = t._useUTC ? t._d.getUTCDay() : t._d.getDay(), t._tzm != null && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), t._nextDay && (t._a[Be] = 24), t._w && typeof t._w.d < "u" && t._w.d !== a && (ve(t).weekdayMismatch = !0);
  }
}
function hw(t) {
  var e, r, n, i, a, l, s, c, b;
  e = t._w, e.GG != null || e.W != null || e.E != null ? (a = 1, l = 4, r = Qt(
    e.GG,
    t._a[je],
    Cr(Oe(), 1, 4).year
  ), n = Qt(e.W, 1), i = Qt(e.E, 1), (i < 1 || i > 7) && (c = !0)) : (a = t._locale._week.dow, l = t._locale._week.doy, b = Cr(Oe(), a, l), r = Qt(e.gg, t._a[je], b.year), n = Qt(e.w, b.week), e.d != null ? (i = e.d, (i < 0 || i > 6) && (c = !0)) : e.e != null ? (i = e.e + a, (e.e < 0 || e.e > 6) && (c = !0)) : i = a), n < 1 || n > St(r, a, l) ? ve(t)._overflowWeeks = !0 : c != null ? ve(t)._overflowWeekday = !0 : (s = fl(r, n, i, a, l), t._a[je] = s.year, t._dayOfYear = s.dayOfYear);
}
de.ISO_8601 = function() {
};
de.RFC_2822 = function() {
};
function ra(t) {
  if (t._f === de.ISO_8601) {
    yl(t);
    return;
  }
  if (t._f === de.RFC_2822) {
    gl(t);
    return;
  }
  t._a = [], ve(t).empty = !0;
  var e = "" + t._i, r, n, i, a, l, s = e.length, c = 0, b, S;
  for (i = el(t._f, t._locale).match(Ys) || [], S = i.length, r = 0; r < S; r++)
    a = i[r], n = (e.match(Jp(a, t)) || [])[0], n && (l = e.substr(0, e.indexOf(n)), l.length > 0 && ve(t).unusedInput.push(l), e = e.slice(
      e.indexOf(n) + n.length
    ), c += n.length), nr[a] ? (n ? ve(t).empty = !1 : ve(t).unusedTokens.push(a), em(a, n, t)) : t._strict && !n && ve(t).unusedTokens.push(a);
  ve(t).charsLeftOver = s - c, e.length > 0 && ve(t).unusedInput.push(e), t._a[Be] <= 12 && ve(t).bigHour === !0 && t._a[Be] > 0 && (ve(t).bigHour = void 0), ve(t).parsedDateParts = t._a.slice(0), ve(t).meridiem = t._meridiem, t._a[Be] = fw(
    t._locale,
    t._a[Be],
    t._meridiem
  ), b = ve(t).era, b !== null && (t._a[je] = t._locale.erasConvertYear(b, t._a[je])), ta(t), ea(t);
}
function fw(t, e, r) {
  var n;
  return r == null ? e : t.meridiemHour != null ? t.meridiemHour(e, r) : (t.isPM != null && (n = t.isPM(r), n && e < 12 && (e += 12), !n && e === 12 && (e = 0)), e);
}
function dw(t) {
  var e, r, n, i, a, l, s = !1, c = t._f.length;
  if (c === 0) {
    ve(t).invalidFormat = !0, t._d = /* @__PURE__ */ new Date(NaN);
    return;
  }
  for (i = 0; i < c; i++)
    a = 0, l = !1, e = zs({}, t), t._useUTC != null && (e._useUTC = t._useUTC), e._f = t._f[i], ra(e), js(e) && (l = !0), a += ve(e).charsLeftOver, a += ve(e).unusedTokens.length * 10, ve(e).score = a, s ? a < n && (n = a, r = e) : (n == null || a < n || l) && (n = a, r = e, l && (s = !0));
  Dt(t, r || e);
}
function pw(t) {
  if (!t._d) {
    var e = qs(t._i), r = e.day === void 0 ? e.date : e.day;
    t._a = Xu(
      [e.year, e.month, r, e.hour, e.minute, e.second, e.millisecond],
      function(n) {
        return n && parseInt(n, 10);
      }
    ), ta(t);
  }
}
function mw(t) {
  var e = new Br(ea(vl(t)));
  return e._nextDay && (e.add(1, "d"), e._nextDay = void 0), e;
}
function vl(t) {
  var e = t._i, r = t._f;
  return t._locale = t._locale || At(t._l), e === null || r === void 0 && e === "" ? En({ nullInput: !0 }) : (typeof e == "string" && (t._i = e = t._locale.preparse(e)), et(e) ? new Br(ea(e)) : (Lr(e) ? t._d = e : Qe(r) ? dw(t) : r ? ra(t) : ww(t), js(t) || (t._d = null), t));
}
function ww(t) {
  var e = t._i;
  Ye(e) ? t._d = new Date(de.now()) : Lr(e) ? t._d = new Date(e.valueOf()) : typeof e == "string" ? lw(t) : Qe(e) ? (t._a = Xu(e.slice(0), function(r) {
    return parseInt(r, 10);
  }), ta(t)) : Gt(e) ? pw(t) : Et(e) ? t._d = new Date(e) : de.createFromInputFallback(t);
}
function _l(t, e, r, n, i) {
  var a = {};
  return (e === !0 || e === !1) && (n = e, e = void 0), (r === !0 || r === !1) && (n = r, r = void 0), (Gt(t) && Ws(t) || Qe(t) && t.length === 0) && (t = void 0), a._isAMomentObject = !0, a._useUTC = a._isUTC = i, a._l = r, a._i = t, a._f = e, a._strict = n, mw(a);
}
function Oe(t, e, r, n) {
  return _l(t, e, r, n, !1);
}
var yw = $e(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var t = Oe.apply(null, arguments);
    return this.isValid() && t.isValid() ? t < this ? this : t : En();
  }
), gw = $e(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var t = Oe.apply(null, arguments);
    return this.isValid() && t.isValid() ? t > this ? this : t : En();
  }
);
function bl(t, e) {
  var r, n;
  if (e.length === 1 && Qe(e[0]) && (e = e[0]), !e.length)
    return Oe();
  for (r = e[0], n = 1; n < e.length; ++n)
    (!e[n].isValid() || e[n][t](r)) && (r = e[n]);
  return r;
}
function vw() {
  var t = [].slice.call(arguments, 0);
  return bl("isBefore", t);
}
function _w() {
  var t = [].slice.call(arguments, 0);
  return bl("isAfter", t);
}
var bw = function() {
  return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
}, Tr = [
  "year",
  "quarter",
  "month",
  "week",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond"
];
function xw(t) {
  var e, r = !1, n, i = Tr.length;
  for (e in t)
    if (Ee(t, e) && !(Me.call(Tr, e) !== -1 && (t[e] == null || !isNaN(t[e]))))
      return !1;
  for (n = 0; n < i; ++n)
    if (t[Tr[n]]) {
      if (r)
        return !1;
      parseFloat(t[Tr[n]]) !== be(t[Tr[n]]) && (r = !0);
    }
  return !0;
}
function Sw() {
  return this._isValid;
}
function Ew() {
  return tt(NaN);
}
function Cn(t) {
  var e = qs(t), r = e.year || 0, n = e.quarter || 0, i = e.month || 0, a = e.week || e.isoWeek || 0, l = e.day || 0, s = e.hour || 0, c = e.minute || 0, b = e.second || 0, S = e.millisecond || 0;
  this._isValid = xw(e), this._milliseconds = +S + b * 1e3 + // 1000
  c * 6e4 + // 1000 * 60
  s * 1e3 * 60 * 60, this._days = +l + a * 7, this._months = +i + n * 3 + r * 12, this._data = {}, this._locale = At(), this._bubble();
}
function an(t) {
  return t instanceof Cn;
}
function bs(t) {
  return t < 0 ? Math.round(-1 * t) * -1 : Math.round(t);
}
function Tw(t, e, r) {
  var n = Math.min(t.length, e.length), i = Math.abs(t.length - e.length), a = 0, l;
  for (l = 0; l < n; l++)
    be(t[l]) !== be(e[l]) && a++;
  return a + i;
}
function xl(t, e) {
  we(t, 0, 0, function() {
    var r = this.utcOffset(), n = "+";
    return r < 0 && (r = -r, n = "-"), n + lt(~~(r / 60), 2) + e + lt(~~r % 60, 2);
  });
}
xl("Z", ":");
xl("ZZ", "");
pe("Z", On);
pe("ZZ", On);
Re(["Z", "ZZ"], function(t, e, r) {
  r._useUTC = !0, r._tzm = na(On, t);
});
var kw = /([\+\-]|\d\d)/gi;
function na(t, e) {
  var r = (e || "").match(t), n, i, a;
  return r === null ? null : (n = r[r.length - 1] || [], i = (n + "").match(kw) || ["-", 0, 0], a = +(i[1] * 60) + be(i[2]), a === 0 ? 0 : i[0] === "+" ? a : -a);
}
function ia(t, e) {
  var r, n;
  return e._isUTC ? (r = e.clone(), n = (et(t) || Lr(t) ? t.valueOf() : Oe(t).valueOf()) - r.valueOf(), r._d.setTime(r._d.valueOf() + n), de.updateOffset(r, !1), r) : Oe(t).local();
}
function xs(t) {
  return -Math.round(t._d.getTimezoneOffset());
}
de.updateOffset = function() {
};
function Aw(t, e, r) {
  var n = this._offset || 0, i;
  if (!this.isValid())
    return t != null ? this : NaN;
  if (t != null) {
    if (typeof t == "string") {
      if (t = na(On, t), t === null)
        return this;
    } else Math.abs(t) < 16 && !r && (t = t * 60);
    return !this._isUTC && e && (i = xs(this)), this._offset = t, this._isUTC = !0, i != null && this.add(i, "m"), n !== t && (!e || this._changeInProgress ? Tl(
      this,
      tt(t - n, "m"),
      1,
      !1
    ) : this._changeInProgress || (this._changeInProgress = !0, de.updateOffset(this, !0), this._changeInProgress = null)), this;
  } else
    return this._isUTC ? n : xs(this);
}
function Rw(t, e) {
  return t != null ? (typeof t != "string" && (t = -t), this.utcOffset(t, e), this) : -this.utcOffset();
}
function Ow(t) {
  return this.utcOffset(0, t);
}
function Dw(t) {
  return this._isUTC && (this.utcOffset(0, t), this._isUTC = !1, t && this.subtract(xs(this), "m")), this;
}
function Nw() {
  if (this._tzm != null)
    this.utcOffset(this._tzm, !1, !0);
  else if (typeof this._i == "string") {
    var t = na(Zp, this._i);
    t != null ? this.utcOffset(t) : this.utcOffset(0, !0);
  }
  return this;
}
function Cw(t) {
  return this.isValid() ? (t = t ? Oe(t).utcOffset() : 0, (this.utcOffset() - t) % 60 === 0) : !1;
}
function Iw() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function Fw() {
  if (!Ye(this._isDSTShifted))
    return this._isDSTShifted;
  var t = {}, e;
  return zs(t, this), t = vl(t), t._a ? (e = t._isUTC ? ht(t._a) : Oe(t._a), this._isDSTShifted = this.isValid() && Tw(t._a, e.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted;
}
function Pw() {
  return this.isValid() ? !this._isUTC : !1;
}
function Mw() {
  return this.isValid() ? this._isUTC : !1;
}
function Sl() {
  return this.isValid() ? this._isUTC && this._offset === 0 : !1;
}
var Lw = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, Bw = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function tt(t, e) {
  var r = t, n = null, i, a, l;
  return an(t) ? r = {
    ms: t._milliseconds,
    d: t._days,
    M: t._months
  } : Et(t) || !isNaN(+t) ? (r = {}, e ? r[e] = +t : r.milliseconds = +t) : (n = Lw.exec(t)) ? (i = n[1] === "-" ? -1 : 1, r = {
    y: 0,
    d: be(n[ot]) * i,
    h: be(n[Be]) * i,
    m: be(n[Je]) * i,
    s: be(n[bt]) * i,
    ms: be(bs(n[Yt] * 1e3)) * i
    // the millisecond decimal point is included in the match
  }) : (n = Bw.exec(t)) ? (i = n[1] === "-" ? -1 : 1, r = {
    y: jt(n[2], i),
    M: jt(n[3], i),
    w: jt(n[4], i),
    d: jt(n[5], i),
    h: jt(n[6], i),
    m: jt(n[7], i),
    s: jt(n[8], i)
  }) : r == null ? r = {} : typeof r == "object" && ("from" in r || "to" in r) && (l = Uw(
    Oe(r.from),
    Oe(r.to)
  ), r = {}, r.ms = l.milliseconds, r.M = l.months), a = new Cn(r), an(t) && Ee(t, "_locale") && (a._locale = t._locale), an(t) && Ee(t, "_isValid") && (a._isValid = t._isValid), a;
}
tt.fn = Cn.prototype;
tt.invalid = Ew;
function jt(t, e) {
  var r = t && parseFloat(t.replace(",", "."));
  return (isNaN(r) ? 0 : r) * e;
}
function su(t, e) {
  var r = {};
  return r.months = e.month() - t.month() + (e.year() - t.year()) * 12, t.clone().add(r.months, "M").isAfter(e) && --r.months, r.milliseconds = +e - +t.clone().add(r.months, "M"), r;
}
function Uw(t, e) {
  var r;
  return t.isValid() && e.isValid() ? (e = ia(e, t), t.isBefore(e) ? r = su(t, e) : (r = su(e, t), r.milliseconds = -r.milliseconds, r.months = -r.months), r) : { milliseconds: 0, months: 0 };
}
function El(t, e) {
  return function(r, n) {
    var i, a;
    return n !== null && !isNaN(+n) && (Qu(
      e,
      "moment()." + e + "(period, number) is deprecated. Please use moment()." + e + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
    ), a = r, r = n, n = a), i = tt(r, n), Tl(this, i, t), this;
  };
}
function Tl(t, e, r, n) {
  var i = e._milliseconds, a = bs(e._days), l = bs(e._months);
  t.isValid() && (n = n ?? !0, l && ll(t, Dr(t, "Month") + l * r), a && al(t, "Date", Dr(t, "Date") + a * r), i && t._d.setTime(t._d.valueOf() + i * r), n && de.updateOffset(t, a || l));
}
var Ww = El(1, "add"), jw = El(-1, "subtract");
function kl(t) {
  return typeof t == "string" || t instanceof String;
}
function zw(t) {
  return et(t) || Lr(t) || kl(t) || Et(t) || Yw(t) || Hw(t) || t === null || t === void 0;
}
function Hw(t) {
  var e = Gt(t) && !Ws(t), r = !1, n = [
    "years",
    "year",
    "y",
    "months",
    "month",
    "M",
    "days",
    "day",
    "d",
    "dates",
    "date",
    "D",
    "hours",
    "hour",
    "h",
    "minutes",
    "minute",
    "m",
    "seconds",
    "second",
    "s",
    "milliseconds",
    "millisecond",
    "ms"
  ], i, a, l = n.length;
  for (i = 0; i < l; i += 1)
    a = n[i], r = r || Ee(t, a);
  return e && r;
}
function Yw(t) {
  var e = Qe(t), r = !1;
  return e && (r = t.filter(function(n) {
    return !Et(n) && kl(t);
  }).length === 0), e && r;
}
function qw(t) {
  var e = Gt(t) && !Ws(t), r = !1, n = [
    "sameDay",
    "nextDay",
    "lastDay",
    "nextWeek",
    "lastWeek",
    "sameElse"
  ], i, a;
  for (i = 0; i < n.length; i += 1)
    a = n[i], r = r || Ee(t, a);
  return e && r;
}
function Gw(t, e) {
  var r = t.diff(e, "days", !0);
  return r < -6 ? "sameElse" : r < -1 ? "lastWeek" : r < 0 ? "lastDay" : r < 1 ? "sameDay" : r < 2 ? "nextDay" : r < 7 ? "nextWeek" : "sameElse";
}
function Vw(t, e) {
  arguments.length === 1 && (arguments[0] ? zw(arguments[0]) ? (t = arguments[0], e = void 0) : qw(arguments[0]) && (e = arguments[0], t = void 0) : (t = void 0, e = void 0));
  var r = t || Oe(), n = ia(r, this).startOf("day"), i = de.calendarFormat(this, n) || "sameElse", a = e && (ft(e[i]) ? e[i].call(this, r) : e[i]);
  return this.format(
    a || this.localeData().calendar(i, this, Oe(r))
  );
}
function Kw() {
  return new Br(this);
}
function $w(t, e) {
  var r = et(t) ? t : Oe(t);
  return this.isValid() && r.isValid() ? (e = Ze(e) || "millisecond", e === "millisecond" ? this.valueOf() > r.valueOf() : r.valueOf() < this.clone().startOf(e).valueOf()) : !1;
}
function Zw(t, e) {
  var r = et(t) ? t : Oe(t);
  return this.isValid() && r.isValid() ? (e = Ze(e) || "millisecond", e === "millisecond" ? this.valueOf() < r.valueOf() : this.clone().endOf(e).valueOf() < r.valueOf()) : !1;
}
function Xw(t, e, r, n) {
  var i = et(t) ? t : Oe(t), a = et(e) ? e : Oe(e);
  return this.isValid() && i.isValid() && a.isValid() ? (n = n || "()", (n[0] === "(" ? this.isAfter(i, r) : !this.isBefore(i, r)) && (n[1] === ")" ? this.isBefore(a, r) : !this.isAfter(a, r))) : !1;
}
function Jw(t, e) {
  var r = et(t) ? t : Oe(t), n;
  return this.isValid() && r.isValid() ? (e = Ze(e) || "millisecond", e === "millisecond" ? this.valueOf() === r.valueOf() : (n = r.valueOf(), this.clone().startOf(e).valueOf() <= n && n <= this.clone().endOf(e).valueOf())) : !1;
}
function Qw(t, e) {
  return this.isSame(t, e) || this.isAfter(t, e);
}
function ey(t, e) {
  return this.isSame(t, e) || this.isBefore(t, e);
}
function ty(t, e, r) {
  var n, i, a;
  if (!this.isValid())
    return NaN;
  if (n = ia(t, this), !n.isValid())
    return NaN;
  switch (i = (n.utcOffset() - this.utcOffset()) * 6e4, e = Ze(e), e) {
    case "year":
      a = on(this, n) / 12;
      break;
    case "month":
      a = on(this, n);
      break;
    case "quarter":
      a = on(this, n) / 3;
      break;
    case "second":
      a = (this - n) / 1e3;
      break;
    case "minute":
      a = (this - n) / 6e4;
      break;
    case "hour":
      a = (this - n) / 36e5;
      break;
    case "day":
      a = (this - n - i) / 864e5;
      break;
    case "week":
      a = (this - n - i) / 6048e5;
      break;
    default:
      a = this - n;
  }
  return r ? a : Ke(a);
}
function on(t, e) {
  if (t.date() < e.date())
    return -on(e, t);
  var r = (e.year() - t.year()) * 12 + (e.month() - t.month()), n = t.clone().add(r, "months"), i, a;
  return e - n < 0 ? (i = t.clone().add(r - 1, "months"), a = (e - n) / (n - i)) : (i = t.clone().add(r + 1, "months"), a = (e - n) / (i - n)), -(r + a) || 0;
}
de.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
de.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function ry() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function ny(t) {
  if (!this.isValid())
    return null;
  var e = t !== !0, r = e ? this.clone().utc() : this;
  return r.year() < 0 || r.year() > 9999 ? sn(
    r,
    e ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
  ) : ft(Date.prototype.toISOString) ? e ? this.toDate().toISOString() : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", sn(r, "Z")) : sn(
    r,
    e ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
  );
}
function iy() {
  if (!this.isValid())
    return "moment.invalid(/* " + this._i + " */)";
  var t = "moment", e = "", r, n, i, a;
  return this.isLocal() || (t = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", e = "Z"), r = "[" + t + '("]', n = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", i = "-MM-DD[T]HH:mm:ss.SSS", a = e + '[")]', this.format(r + n + i + a);
}
function sy(t) {
  t || (t = this.isUtc() ? de.defaultFormatUtc : de.defaultFormat);
  var e = sn(this, t);
  return this.localeData().postformat(e);
}
function ay(t, e) {
  return this.isValid() && (et(t) && t.isValid() || Oe(t).isValid()) ? tt({ to: this, from: t }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate();
}
function oy(t) {
  return this.from(Oe(), t);
}
function uy(t, e) {
  return this.isValid() && (et(t) && t.isValid() || Oe(t).isValid()) ? tt({ from: this, to: t }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate();
}
function ly(t) {
  return this.to(Oe(), t);
}
function Al(t) {
  var e;
  return t === void 0 ? this._locale._abbr : (e = At(t), e != null && (this._locale = e), this);
}
var Rl = $e(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(t) {
    return t === void 0 ? this.localeData() : this.locale(t);
  }
);
function Ol() {
  return this._locale;
}
var dn = 1e3, ir = 60 * dn, pn = 60 * ir, Dl = (365 * 400 + 97) * 24 * pn;
function sr(t, e) {
  return (t % e + e) % e;
}
function Nl(t, e, r) {
  return t < 100 && t >= 0 ? new Date(t + 400, e, r) - Dl : new Date(t, e, r).valueOf();
}
function Cl(t, e, r) {
  return t < 100 && t >= 0 ? Date.UTC(t + 400, e, r) - Dl : Date.UTC(t, e, r);
}
function cy(t) {
  var e, r;
  if (t = Ze(t), t === void 0 || t === "millisecond" || !this.isValid())
    return this;
  switch (r = this._isUTC ? Cl : Nl, t) {
    case "year":
      e = r(this.year(), 0, 1);
      break;
    case "quarter":
      e = r(
        this.year(),
        this.month() - this.month() % 3,
        1
      );
      break;
    case "month":
      e = r(this.year(), this.month(), 1);
      break;
    case "week":
      e = r(
        this.year(),
        this.month(),
        this.date() - this.weekday()
      );
      break;
    case "isoWeek":
      e = r(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1)
      );
      break;
    case "day":
    case "date":
      e = r(this.year(), this.month(), this.date());
      break;
    case "hour":
      e = this._d.valueOf(), e -= sr(
        e + (this._isUTC ? 0 : this.utcOffset() * ir),
        pn
      );
      break;
    case "minute":
      e = this._d.valueOf(), e -= sr(e, ir);
      break;
    case "second":
      e = this._d.valueOf(), e -= sr(e, dn);
      break;
  }
  return this._d.setTime(e), de.updateOffset(this, !0), this;
}
function hy(t) {
  var e, r;
  if (t = Ze(t), t === void 0 || t === "millisecond" || !this.isValid())
    return this;
  switch (r = this._isUTC ? Cl : Nl, t) {
    case "year":
      e = r(this.year() + 1, 0, 1) - 1;
      break;
    case "quarter":
      e = r(
        this.year(),
        this.month() - this.month() % 3 + 3,
        1
      ) - 1;
      break;
    case "month":
      e = r(this.year(), this.month() + 1, 1) - 1;
      break;
    case "week":
      e = r(
        this.year(),
        this.month(),
        this.date() - this.weekday() + 7
      ) - 1;
      break;
    case "isoWeek":
      e = r(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1) + 7
      ) - 1;
      break;
    case "day":
    case "date":
      e = r(this.year(), this.month(), this.date() + 1) - 1;
      break;
    case "hour":
      e = this._d.valueOf(), e += pn - sr(
        e + (this._isUTC ? 0 : this.utcOffset() * ir),
        pn
      ) - 1;
      break;
    case "minute":
      e = this._d.valueOf(), e += ir - sr(e, ir) - 1;
      break;
    case "second":
      e = this._d.valueOf(), e += dn - sr(e, dn) - 1;
      break;
  }
  return this._d.setTime(e), de.updateOffset(this, !0), this;
}
function fy() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function dy() {
  return Math.floor(this.valueOf() / 1e3);
}
function py() {
  return new Date(this.valueOf());
}
function my() {
  var t = this;
  return [
    t.year(),
    t.month(),
    t.date(),
    t.hour(),
    t.minute(),
    t.second(),
    t.millisecond()
  ];
}
function wy() {
  var t = this;
  return {
    years: t.year(),
    months: t.month(),
    date: t.date(),
    hours: t.hours(),
    minutes: t.minutes(),
    seconds: t.seconds(),
    milliseconds: t.milliseconds()
  };
}
function yy() {
  return this.isValid() ? this.toISOString() : null;
}
function gy() {
  return js(this);
}
function vy() {
  return Dt({}, ve(this));
}
function _y() {
  return ve(this).overflow;
}
function by() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict
  };
}
we("N", 0, 0, "eraAbbr");
we("NN", 0, 0, "eraAbbr");
we("NNN", 0, 0, "eraAbbr");
we("NNNN", 0, 0, "eraName");
we("NNNNN", 0, 0, "eraNarrow");
we("y", ["y", 1], "yo", "eraYear");
we("y", ["yy", 2], 0, "eraYear");
we("y", ["yyy", 3], 0, "eraYear");
we("y", ["yyyy", 4], 0, "eraYear");
pe("N", sa);
pe("NN", sa);
pe("NNN", sa);
pe("NNNN", Cy);
pe("NNNNN", Iy);
Re(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(t, e, r, n) {
    var i = r._locale.erasParse(t, n, r._strict);
    i ? ve(r).era = i : ve(r).invalidEra = t;
  }
);
pe("y", dr);
pe("yy", dr);
pe("yyy", dr);
pe("yyyy", dr);
pe("yo", Fy);
Re(["y", "yy", "yyy", "yyyy"], je);
Re(["yo"], function(t, e, r, n) {
  var i;
  r._locale._eraYearOrdinalRegex && (i = t.match(r._locale._eraYearOrdinalRegex)), r._locale.eraYearOrdinalParse ? e[je] = r._locale.eraYearOrdinalParse(t, i) : e[je] = parseInt(t, 10);
});
function xy(t, e) {
  var r, n, i, a = this._eras || At("en")._eras;
  for (r = 0, n = a.length; r < n; ++r) {
    switch (typeof a[r].since) {
      case "string":
        i = de(a[r].since).startOf("day"), a[r].since = i.valueOf();
        break;
    }
    switch (typeof a[r].until) {
      case "undefined":
        a[r].until = 1 / 0;
        break;
      case "string":
        i = de(a[r].until).startOf("day").valueOf(), a[r].until = i.valueOf();
        break;
    }
  }
  return a;
}
function Sy(t, e, r) {
  var n, i, a = this.eras(), l, s, c;
  for (t = t.toUpperCase(), n = 0, i = a.length; n < i; ++n)
    if (l = a[n].name.toUpperCase(), s = a[n].abbr.toUpperCase(), c = a[n].narrow.toUpperCase(), r)
      switch (e) {
        case "N":
        case "NN":
        case "NNN":
          if (s === t)
            return a[n];
          break;
        case "NNNN":
          if (l === t)
            return a[n];
          break;
        case "NNNNN":
          if (c === t)
            return a[n];
          break;
      }
    else if ([l, s, c].indexOf(t) >= 0)
      return a[n];
}
function Ey(t, e) {
  var r = t.since <= t.until ? 1 : -1;
  return e === void 0 ? de(t.since).year() : de(t.since).year() + (e - t.offset) * r;
}
function Ty() {
  var t, e, r, n = this.localeData().eras();
  for (t = 0, e = n.length; t < e; ++t)
    if (r = this.clone().startOf("day").valueOf(), n[t].since <= r && r <= n[t].until || n[t].until <= r && r <= n[t].since)
      return n[t].name;
  return "";
}
function ky() {
  var t, e, r, n = this.localeData().eras();
  for (t = 0, e = n.length; t < e; ++t)
    if (r = this.clone().startOf("day").valueOf(), n[t].since <= r && r <= n[t].until || n[t].until <= r && r <= n[t].since)
      return n[t].narrow;
  return "";
}
function Ay() {
  var t, e, r, n = this.localeData().eras();
  for (t = 0, e = n.length; t < e; ++t)
    if (r = this.clone().startOf("day").valueOf(), n[t].since <= r && r <= n[t].until || n[t].until <= r && r <= n[t].since)
      return n[t].abbr;
  return "";
}
function Ry() {
  var t, e, r, n, i = this.localeData().eras();
  for (t = 0, e = i.length; t < e; ++t)
    if (r = i[t].since <= i[t].until ? 1 : -1, n = this.clone().startOf("day").valueOf(), i[t].since <= n && n <= i[t].until || i[t].until <= n && n <= i[t].since)
      return (this.year() - de(i[t].since).year()) * r + i[t].offset;
  return this.year();
}
function Oy(t) {
  return Ee(this, "_erasNameRegex") || aa.call(this), t ? this._erasNameRegex : this._erasRegex;
}
function Dy(t) {
  return Ee(this, "_erasAbbrRegex") || aa.call(this), t ? this._erasAbbrRegex : this._erasRegex;
}
function Ny(t) {
  return Ee(this, "_erasNarrowRegex") || aa.call(this), t ? this._erasNarrowRegex : this._erasRegex;
}
function sa(t, e) {
  return e.erasAbbrRegex(t);
}
function Cy(t, e) {
  return e.erasNameRegex(t);
}
function Iy(t, e) {
  return e.erasNarrowRegex(t);
}
function Fy(t, e) {
  return e._eraYearOrdinalRegex || dr;
}
function aa() {
  var t = [], e = [], r = [], n = [], i, a, l, s, c, b = this.eras();
  for (i = 0, a = b.length; i < a; ++i)
    l = xt(b[i].name), s = xt(b[i].abbr), c = xt(b[i].narrow), e.push(l), t.push(s), r.push(c), n.push(l), n.push(s), n.push(c);
  this._erasRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._erasNameRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._erasAbbrRegex = new RegExp("^(" + t.join("|") + ")", "i"), this._erasNarrowRegex = new RegExp(
    "^(" + r.join("|") + ")",
    "i"
  );
}
we(0, ["gg", 2], 0, function() {
  return this.weekYear() % 100;
});
we(0, ["GG", 2], 0, function() {
  return this.isoWeekYear() % 100;
});
function In(t, e) {
  we(0, [t, t.length], 0, e);
}
In("gggg", "weekYear");
In("ggggg", "weekYear");
In("GGGG", "isoWeekYear");
In("GGGGG", "isoWeekYear");
pe("G", Rn);
pe("g", Rn);
pe("GG", De, Ge);
pe("gg", De, Ge);
pe("GGGG", Vs, Gs);
pe("gggg", Vs, Gs);
pe("GGGGG", An, Tn);
pe("ggggg", An, Tn);
Wr(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(t, e, r, n) {
    e[n.substr(0, 2)] = be(t);
  }
);
Wr(["gg", "GG"], function(t, e, r, n) {
  e[n] = de.parseTwoDigitYear(t);
});
function Py(t) {
  return Il.call(
    this,
    t,
    this.week(),
    this.weekday() + this.localeData()._week.dow,
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function My(t) {
  return Il.call(
    this,
    t,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function Ly() {
  return St(this.year(), 1, 4);
}
function By() {
  return St(this.isoWeekYear(), 1, 4);
}
function Uy() {
  var t = this.localeData()._week;
  return St(this.year(), t.dow, t.doy);
}
function Wy() {
  var t = this.localeData()._week;
  return St(this.weekYear(), t.dow, t.doy);
}
function Il(t, e, r, n, i) {
  var a;
  return t == null ? Cr(this, n, i).year : (a = St(t, n, i), e > a && (e = a), jy.call(this, t, e, r, n, i));
}
function jy(t, e, r, n, i) {
  var a = fl(t, e, r, n, i), l = Nr(a.year, 0, a.dayOfYear);
  return this.year(l.getUTCFullYear()), this.month(l.getUTCMonth()), this.date(l.getUTCDate()), this;
}
we("Q", 0, "Qo", "quarter");
pe("Q", tl);
Re("Q", function(t, e) {
  e[_t] = (be(t) - 1) * 3;
});
function zy(t) {
  return t == null ? Math.ceil((this.month() + 1) / 3) : this.month((t - 1) * 3 + this.month() % 3);
}
we("D", ["DD", 2], "Do", "date");
pe("D", De, pr);
pe("DD", De, Ge);
pe("Do", function(t, e) {
  return t ? e._dayOfMonthOrdinalParse || e._ordinalParse : e._dayOfMonthOrdinalParseLenient;
});
Re(["D", "DD"], ot);
Re("Do", function(t, e) {
  e[ot] = be(t.match(De)[0]);
});
var Fl = mr("Date", !0);
we("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
pe("DDD", kn);
pe("DDDD", rl);
Re(["DDD", "DDDD"], function(t, e, r) {
  r._dayOfYear = be(t);
});
function Hy(t) {
  var e = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return t == null ? e : this.add(t - e, "d");
}
we("m", ["mm", 2], 0, "minute");
pe("m", De, Ks);
pe("mm", De, Ge);
Re(["m", "mm"], Je);
var Yy = mr("Minutes", !1);
we("s", ["ss", 2], 0, "second");
pe("s", De, Ks);
pe("ss", De, Ge);
Re(["s", "ss"], bt);
var qy = mr("Seconds", !1);
we("S", 0, 0, function() {
  return ~~(this.millisecond() / 100);
});
we(0, ["SS", 2], 0, function() {
  return ~~(this.millisecond() / 10);
});
we(0, ["SSS", 3], 0, "millisecond");
we(0, ["SSSS", 4], 0, function() {
  return this.millisecond() * 10;
});
we(0, ["SSSSS", 5], 0, function() {
  return this.millisecond() * 100;
});
we(0, ["SSSSSS", 6], 0, function() {
  return this.millisecond() * 1e3;
});
we(0, ["SSSSSSS", 7], 0, function() {
  return this.millisecond() * 1e4;
});
we(0, ["SSSSSSSS", 8], 0, function() {
  return this.millisecond() * 1e5;
});
we(0, ["SSSSSSSSS", 9], 0, function() {
  return this.millisecond() * 1e6;
});
pe("S", kn, tl);
pe("SS", kn, Ge);
pe("SSS", kn, rl);
var Nt, Pl;
for (Nt = "SSSS"; Nt.length <= 9; Nt += "S")
  pe(Nt, dr);
function Gy(t, e) {
  e[Yt] = be(("0." + t) * 1e3);
}
for (Nt = "S"; Nt.length <= 9; Nt += "S")
  Re(Nt, Gy);
Pl = mr("Milliseconds", !1);
we("z", 0, 0, "zoneAbbr");
we("zz", 0, 0, "zoneName");
function Vy() {
  return this._isUTC ? "UTC" : "";
}
function Ky() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var he = Br.prototype;
he.add = Ww;
he.calendar = Vw;
he.clone = Kw;
he.diff = ty;
he.endOf = hy;
he.format = sy;
he.from = ay;
he.fromNow = oy;
he.to = uy;
he.toNow = ly;
he.get = im;
he.invalidAt = _y;
he.isAfter = $w;
he.isBefore = Zw;
he.isBetween = Xw;
he.isSame = Jw;
he.isSameOrAfter = Qw;
he.isSameOrBefore = ey;
he.isValid = gy;
he.lang = Rl;
he.locale = Al;
he.localeData = Ol;
he.max = gw;
he.min = yw;
he.parsingFlags = vy;
he.set = sm;
he.startOf = cy;
he.subtract = jw;
he.toArray = my;
he.toObject = wy;
he.toDate = py;
he.toISOString = ny;
he.inspect = iy;
typeof Symbol < "u" && Symbol.for != null && (he[Symbol.for("nodejs.util.inspect.custom")] = function() {
  return "Moment<" + this.format() + ">";
});
he.toJSON = yy;
he.toString = ry;
he.unix = dy;
he.valueOf = fy;
he.creationData = by;
he.eraName = Ty;
he.eraNarrow = ky;
he.eraAbbr = Ay;
he.eraYear = Ry;
he.year = sl;
he.isLeapYear = nm;
he.weekYear = Py;
he.isoWeekYear = My;
he.quarter = he.quarters = zy;
he.month = cl;
he.daysInMonth = pm;
he.week = he.weeks = xm;
he.isoWeek = he.isoWeeks = Sm;
he.weeksInYear = Uy;
he.weeksInWeekYear = Wy;
he.isoWeeksInYear = Ly;
he.isoWeeksInISOWeekYear = By;
he.date = Fl;
he.day = he.days = Mm;
he.weekday = Lm;
he.isoWeekday = Bm;
he.dayOfYear = Hy;
he.hour = he.hours = qm;
he.minute = he.minutes = Yy;
he.second = he.seconds = qy;
he.millisecond = he.milliseconds = Pl;
he.utcOffset = Aw;
he.utc = Ow;
he.local = Dw;
he.parseZone = Nw;
he.hasAlignedHourOffset = Cw;
he.isDST = Iw;
he.isLocal = Pw;
he.isUtcOffset = Mw;
he.isUtc = Sl;
he.isUTC = Sl;
he.zoneAbbr = Vy;
he.zoneName = Ky;
he.dates = $e(
  "dates accessor is deprecated. Use date instead.",
  Fl
);
he.months = $e(
  "months accessor is deprecated. Use month instead",
  cl
);
he.years = $e(
  "years accessor is deprecated. Use year instead",
  sl
);
he.zone = $e(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  Rw
);
he.isDSTShifted = $e(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  Fw
);
function $y(t) {
  return Oe(t * 1e3);
}
function Zy() {
  return Oe.apply(null, arguments).parseZone();
}
function Ml(t) {
  return t;
}
var Te = Hs.prototype;
Te.calendar = Pp;
Te.longDateFormat = Up;
Te.invalidDate = jp;
Te.ordinal = Yp;
Te.preparse = Ml;
Te.postformat = Ml;
Te.relativeTime = Gp;
Te.pastFuture = Vp;
Te.set = Ip;
Te.eras = xy;
Te.erasParse = Sy;
Te.erasConvertYear = Ey;
Te.erasAbbrRegex = Dy;
Te.erasNameRegex = Oy;
Te.erasNarrowRegex = Ny;
Te.months = cm;
Te.monthsShort = hm;
Te.monthsParse = dm;
Te.monthsRegex = wm;
Te.monthsShortRegex = mm;
Te.week = gm;
Te.firstDayOfYear = bm;
Te.firstDayOfWeek = _m;
Te.weekdays = Nm;
Te.weekdaysMin = Im;
Te.weekdaysShort = Cm;
Te.weekdaysParse = Pm;
Te.weekdaysRegex = Um;
Te.weekdaysShortRegex = Wm;
Te.weekdaysMinRegex = jm;
Te.isPM = Hm;
Te.meridiem = Gm;
function mn(t, e, r, n) {
  var i = At(), a = ht().set(n, e);
  return i[r](a, t);
}
function Ll(t, e, r) {
  if (Et(t) && (e = t, t = void 0), t = t || "", e != null)
    return mn(t, e, r, "month");
  var n, i = [];
  for (n = 0; n < 12; n++)
    i[n] = mn(t, n, r, "month");
  return i;
}
function oa(t, e, r, n) {
  typeof t == "boolean" ? (Et(e) && (r = e, e = void 0), e = e || "") : (e = t, r = e, t = !1, Et(e) && (r = e, e = void 0), e = e || "");
  var i = At(), a = t ? i._week.dow : 0, l, s = [];
  if (r != null)
    return mn(e, (r + a) % 7, n, "day");
  for (l = 0; l < 7; l++)
    s[l] = mn(e, (l + a) % 7, n, "day");
  return s;
}
function Xy(t, e) {
  return Ll(t, e, "months");
}
function Jy(t, e) {
  return Ll(t, e, "monthsShort");
}
function Qy(t, e, r) {
  return oa(t, e, r, "weekdays");
}
function eg(t, e, r) {
  return oa(t, e, r, "weekdaysShort");
}
function tg(t, e, r) {
  return oa(t, e, r, "weekdaysMin");
}
It("en", {
  eras: [
    {
      since: "0001-01-01",
      until: 1 / 0,
      offset: 1,
      name: "Anno Domini",
      narrow: "AD",
      abbr: "AD"
    },
    {
      since: "0000-12-31",
      until: -1 / 0,
      offset: 1,
      name: "Before Christ",
      narrow: "BC",
      abbr: "BC"
    }
  ],
  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
  ordinal: function(t) {
    var e = t % 10, r = be(t % 100 / 10) === 1 ? "th" : e === 1 ? "st" : e === 2 ? "nd" : e === 3 ? "rd" : "th";
    return t + r;
  }
});
de.lang = $e(
  "moment.lang is deprecated. Use moment.locale instead.",
  It
);
de.langData = $e(
  "moment.langData is deprecated. Use moment.localeData instead.",
  At
);
var wt = Math.abs;
function rg() {
  var t = this._data;
  return this._milliseconds = wt(this._milliseconds), this._days = wt(this._days), this._months = wt(this._months), t.milliseconds = wt(t.milliseconds), t.seconds = wt(t.seconds), t.minutes = wt(t.minutes), t.hours = wt(t.hours), t.months = wt(t.months), t.years = wt(t.years), this;
}
function Bl(t, e, r, n) {
  var i = tt(e, r);
  return t._milliseconds += n * i._milliseconds, t._days += n * i._days, t._months += n * i._months, t._bubble();
}
function ng(t, e) {
  return Bl(this, t, e, 1);
}
function ig(t, e) {
  return Bl(this, t, e, -1);
}
function au(t) {
  return t < 0 ? Math.floor(t) : Math.ceil(t);
}
function sg() {
  var t = this._milliseconds, e = this._days, r = this._months, n = this._data, i, a, l, s, c;
  return t >= 0 && e >= 0 && r >= 0 || t <= 0 && e <= 0 && r <= 0 || (t += au(Ss(r) + e) * 864e5, e = 0, r = 0), n.milliseconds = t % 1e3, i = Ke(t / 1e3), n.seconds = i % 60, a = Ke(i / 60), n.minutes = a % 60, l = Ke(a / 60), n.hours = l % 24, e += Ke(l / 24), c = Ke(Ul(e)), r += c, e -= au(Ss(c)), s = Ke(r / 12), r %= 12, n.days = e, n.months = r, n.years = s, this;
}
function Ul(t) {
  return t * 4800 / 146097;
}
function Ss(t) {
  return t * 146097 / 4800;
}
function ag(t) {
  if (!this.isValid())
    return NaN;
  var e, r, n = this._milliseconds;
  if (t = Ze(t), t === "month" || t === "quarter" || t === "year")
    switch (e = this._days + n / 864e5, r = this._months + Ul(e), t) {
      case "month":
        return r;
      case "quarter":
        return r / 3;
      case "year":
        return r / 12;
    }
  else
    switch (e = this._days + Math.round(Ss(this._months)), t) {
      case "week":
        return e / 7 + n / 6048e5;
      case "day":
        return e + n / 864e5;
      case "hour":
        return e * 24 + n / 36e5;
      case "minute":
        return e * 1440 + n / 6e4;
      case "second":
        return e * 86400 + n / 1e3;
      case "millisecond":
        return Math.floor(e * 864e5) + n;
      default:
        throw new Error("Unknown unit " + t);
    }
}
function Rt(t) {
  return function() {
    return this.as(t);
  };
}
var Wl = Rt("ms"), og = Rt("s"), ug = Rt("m"), lg = Rt("h"), cg = Rt("d"), hg = Rt("w"), fg = Rt("M"), dg = Rt("Q"), pg = Rt("y"), mg = Wl;
function wg() {
  return tt(this);
}
function yg(t) {
  return t = Ze(t), this.isValid() ? this[t + "s"]() : NaN;
}
function Kt(t) {
  return function() {
    return this.isValid() ? this._data[t] : NaN;
  };
}
var gg = Kt("milliseconds"), vg = Kt("seconds"), _g = Kt("minutes"), bg = Kt("hours"), xg = Kt("days"), Sg = Kt("months"), Eg = Kt("years");
function Tg() {
  return Ke(this.days() / 7);
}
var yt = Math.round, er = {
  ss: 44,
  // a few seconds to seconds
  s: 45,
  // seconds to minute
  m: 45,
  // minutes to hour
  h: 22,
  // hours to day
  d: 26,
  // days to month/week
  w: null,
  // weeks to month
  M: 11
  // months to year
};
function kg(t, e, r, n, i) {
  return i.relativeTime(e || 1, !!r, t, n);
}
function Ag(t, e, r, n) {
  var i = tt(t).abs(), a = yt(i.as("s")), l = yt(i.as("m")), s = yt(i.as("h")), c = yt(i.as("d")), b = yt(i.as("M")), S = yt(i.as("w")), A = yt(i.as("y")), R = a <= r.ss && ["s", a] || a < r.s && ["ss", a] || l <= 1 && ["m"] || l < r.m && ["mm", l] || s <= 1 && ["h"] || s < r.h && ["hh", s] || c <= 1 && ["d"] || c < r.d && ["dd", c];
  return r.w != null && (R = R || S <= 1 && ["w"] || S < r.w && ["ww", S]), R = R || b <= 1 && ["M"] || b < r.M && ["MM", b] || A <= 1 && ["y"] || ["yy", A], R[2] = e, R[3] = +t > 0, R[4] = n, kg.apply(null, R);
}
function Rg(t) {
  return t === void 0 ? yt : typeof t == "function" ? (yt = t, !0) : !1;
}
function Og(t, e) {
  return er[t] === void 0 ? !1 : e === void 0 ? er[t] : (er[t] = e, t === "s" && (er.ss = e - 1), !0);
}
function Dg(t, e) {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var r = !1, n = er, i, a;
  return typeof t == "object" && (e = t, t = !1), typeof t == "boolean" && (r = t), typeof e == "object" && (n = Object.assign({}, er, e), e.s != null && e.ss == null && (n.ss = e.s - 1)), i = this.localeData(), a = Ag(this, !r, n, i), r && (a = i.pastFuture(+this, a)), i.postformat(a);
}
var cs = Math.abs;
function Xt(t) {
  return (t > 0) - (t < 0) || +t;
}
function Fn() {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var t = cs(this._milliseconds) / 1e3, e = cs(this._days), r = cs(this._months), n, i, a, l, s = this.asSeconds(), c, b, S, A;
  return s ? (n = Ke(t / 60), i = Ke(n / 60), t %= 60, n %= 60, a = Ke(r / 12), r %= 12, l = t ? t.toFixed(3).replace(/\.?0+$/, "") : "", c = s < 0 ? "-" : "", b = Xt(this._months) !== Xt(s) ? "-" : "", S = Xt(this._days) !== Xt(s) ? "-" : "", A = Xt(this._milliseconds) !== Xt(s) ? "-" : "", c + "P" + (a ? b + a + "Y" : "") + (r ? b + r + "M" : "") + (e ? S + e + "D" : "") + (i || n || t ? "T" : "") + (i ? A + i + "H" : "") + (n ? A + n + "M" : "") + (t ? A + l + "S" : "")) : "P0D";
}
var xe = Cn.prototype;
xe.isValid = Sw;
xe.abs = rg;
xe.add = ng;
xe.subtract = ig;
xe.as = ag;
xe.asMilliseconds = Wl;
xe.asSeconds = og;
xe.asMinutes = ug;
xe.asHours = lg;
xe.asDays = cg;
xe.asWeeks = hg;
xe.asMonths = fg;
xe.asQuarters = dg;
xe.asYears = pg;
xe.valueOf = mg;
xe._bubble = sg;
xe.clone = wg;
xe.get = yg;
xe.milliseconds = gg;
xe.seconds = vg;
xe.minutes = _g;
xe.hours = bg;
xe.days = xg;
xe.weeks = Tg;
xe.months = Sg;
xe.years = Eg;
xe.humanize = Dg;
xe.toISOString = Fn;
xe.toString = Fn;
xe.toJSON = Fn;
xe.locale = Al;
xe.localeData = Ol;
xe.toIsoString = $e(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  Fn
);
xe.lang = Rl;
we("X", 0, 0, "unix");
we("x", 0, 0, "valueOf");
pe("x", Rn);
pe("X", Xp);
Re("X", function(t, e, r) {
  r._d = new Date(parseFloat(t) * 1e3);
});
Re("x", function(t, e, r) {
  r._d = new Date(be(t));
});
//! moment.js
de.version = "2.30.1";
Np(Oe);
de.fn = he;
de.min = vw;
de.max = _w;
de.now = bw;
de.utc = ht;
de.unix = $y;
de.months = Xy;
de.isDate = Lr;
de.locale = It;
de.invalid = En;
de.duration = tt;
de.isMoment = et;
de.weekdays = Qy;
de.parseZone = Zy;
de.localeData = At;
de.isDuration = an;
de.monthsShort = Jy;
de.weekdaysMin = tg;
de.defineLocale = Qs;
de.updateLocale = Zm;
de.locales = Xm;
de.weekdaysShort = eg;
de.normalizeUnits = Ze;
de.relativeTimeRounding = Rg;
de.relativeTimeThreshold = Og;
de.calendarFormat = Gw;
de.prototype = he;
de.HTML5_FMT = {
  DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
  // <input type="datetime-local" />
  DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
  // <input type="datetime-local" step="1" />
  DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
  // <input type="datetime-local" step="0.001" />
  DATE: "YYYY-MM-DD",
  // <input type="date" />
  TIME: "HH:mm",
  // <input type="time" />
  TIME_SECONDS: "HH:mm:ss",
  // <input type="time" step="1" />
  TIME_MS: "HH:mm:ss.SSS",
  // <input type="time" step="0.001" />
  WEEK: "GGGG-[W]WW",
  // <input type="week" />
  MONTH: "YYYY-MM"
  // <input type="month" />
};
function ou(t, e) {
  const r = e.find((n) => n.uuid === t);
  return r != null && r.name && (r != null && r.surname) ? `${r.name} ${r.surname}` : r != null && r.name ? `${r.name} ???` : r != null && r.surname ? `??? ${r.surname}` : "Musicien inconnu";
}
async function uu(t) {
  var e = [], r = [];
  const { tracks: n, musicians: i, distribution: a, stats: l } = t;
  a.forEach((d, O) => {
    var h, g;
    e.push(
      new Ce({
        children: [
          new We(`${O + 1}) `),
          new We({
            text: ((h = n.find((w) => w.uuid === d.trackUUID)) == null ? void 0 : h.name) || "Morceau inconnu",
            bold: !0
          }),
          new We(
            ` (${((g = n.find((w) => w.uuid === d.trackUUID)) == null ? void 0 : g.maxMusicians) || 0} Musiciens)`
          )
        ],
        style: "track"
      })
    ), e.push(
      new Ce({
        children: [
          new We({
            text: `Il y a ${d.assignedMusiciansUUID.length} musicien${d.assignedMusiciansUUID.length > 1 ? "s" : ""} qui joue${d.assignedMusiciansUUID.length > 1 ? "nt" : ""} sur ce morceau${O + 1 == a.length ? "" : d.musiciansInCommonWithNextTrack ? ` et ${d.musiciansInCommonWithNextTrack.length} musicien${d.musiciansInCommonWithNextTrack.length > 1 ? "s" : ""} en commun avec le morceau suivant` : ""}.`,
            italics: !0
          }),
          new We({ break: 1 })
        ]
      })
    ), d.assignedMusiciansUUID.length > 0 && e.push(
      new Ce({
        children: [
          new We({ text: "Musiciens assignés : ", bold: !0 }),
          new We({
            text: d.assignedMusiciansUUID.map((w) => ou(w, i)).join(", ")
          }),
          new We({ break: 1 })
        ]
      })
    ), d.rejectedMusiciansUUID.length > 0 && e.push(
      new Ce({
        children: [
          new We({ text: "Musiciens rejetés : ", bold: !0 }),
          new We({
            text: d.rejectedMusiciansUUID.map((w) => ou(w, i)).join(", ")
          }),
          new We({ break: 1 })
        ]
      })
    );
  }), l.musicians.filter((d) => d.totalSelectedTracks > 0).forEach((d) => {
    var O, h, g;
    r.push(
      new qo({
        children: [
          new it({
            children: [
              new Ce(
                ((O = i.find((w) => w.uuid == d.uuid)) == null ? void 0 : O.name) || "Musicien inconnu"
              )
            ]
          }),
          new it({
            children: [
              new Ce(
                ((h = i.find((w) => w.uuid == d.uuid)) == null ? void 0 : h.surname) || "Musicien inconnu"
              )
            ]
          }),
          new it({
            children: [
              new Ce(
                String(
                  a.filter(
                    (w) => w.assignedMusiciansUUID.includes(d.uuid)
                  ).length
                )
              )
            ]
          }),
          new it({
            children: [
              new Ce(
                String(
                  ((g = i.find((w) => w.uuid == d.uuid)) == null ? void 0 : g.selectedTracks.length) || 0
                )
              )
            ]
          })
        ]
      })
    );
  });
  const s = new Ce({
    text: `Répartition des morceaux du ${de().format("DD/MM/YYYY")}`,
    style: "title",
    alignment: qe.CENTER
  }), c = new Ce({
    children: [new We({ text: "Répartition des musiciens" })],
    style: "title",
    alignment: qe.CENTER
  }), b = new Hf({
    width: {
      size: 100,
      type: cn.PERCENTAGE
    },
    rows: [
      new qo({
        children: [
          new it({
            children: [new Ce("Nom")]
          }),
          new it({
            children: [new Ce("Prénom")]
          }),
          new it({
            children: [new Ce("Morceaux joués")]
          }),
          new it({
            children: [new Ce("Morceaux sélectionnés")]
          })
        ]
      }),
      ...r
    ]
  }), S = new Ce({
    children: [new We({ text: "Musiciens avec aucune sélection" })],
    style: "title",
    alignment: qe.CENTER
  }), A = i.filter((d) => d.selectedTracks.length == 0).map((d) => new Ce({
    children: [
      new We({
        text: `${d.name || "???"} ${d.surname || "???"}`
      })
    ],
    bullet: {
      level: 0
    },
    style: "normal"
  })), R = new Ce({
    text: "",
    run: {
      size: 24
    }
  }), _ = new mp({
    creator: "Melodistrib",
    title: `Répartition des morceaux du ${de().format("DD/MM/YYYY")}`,
    description: `Document généré avec Melodistrib.
Melodistrib est un logiciel de répartition équitable de morceaux.`,
    styles: {
      paragraphStyles: [
        {
          id: "title",
          name: "Titre",
          basedOn: "Normal",
          quickFormat: !0,
          run: {
            size: 40,
            bold: !0,
            font: "Arial"
          }
        },
        {
          id: "track",
          name: "Titre du morceau",
          basedOn: "Normal",
          quickFormat: !0,
          run: {
            size: 30,
            font: "Arial"
          }
        },
        {
          id: "legend",
          name: "Légende",
          basedOn: "Normal",
          quickFormat: !0,
          run: {
            size: 20,
            font: "Arial"
          }
        },
        {
          id: "normal",
          name: "Normal",
          basedOn: "Normal",
          quickFormat: !0,
          run: {
            size: 24,
            font: "Arial"
          }
        }
      ]
    },
    sections: [
      {
        properties: {},
        children: [s, R, ...e]
      },
      {
        properties: {},
        children: [c, R, b]
      },
      ...A.length > 0 ? [{
        properties: {},
        children: [S, R, ...A]
      }] : []
    ]
  });
  return await Dp.toBuffer(_);
}
const jl = Ct.dirname(Vl(import.meta.url));
process.env.APP_ROOT = Ct.join(jl, "..");
const Es = process.env.VITE_DEV_SERVER_URL, Wg = Ct.join(process.env.APP_ROOT, "dist-electron"), zl = Ct.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Es ? Ct.join(process.env.APP_ROOT, "public") : zl;
let un;
function Hl() {
  if (un = new lu({
    icon: Ct.join(process.env.VITE_PUBLIC, "icon.png"),
    width: 750,
    height: 615,
    minWidth: 750,
    minHeight: 615,
    webPreferences: {
      preload: Ct.join(jl, "preload.mjs")
    },
    title: `Melodistrib - v${Rr.getVersion()}${process.env.NODE_ENV == "development" ? " - (Dev MODE)" : ""}`
  }), process.env.NODE_ENV != "development") {
    const t = ca.buildFromTemplate([]);
    ca.setApplicationMenu(t);
  }
  Es ? un.loadURL(Es) : un.loadFile(Ct.join(zl, "index.html"));
}
Rr.on("window-all-closed", () => {
  process.platform !== "darwin" && (Rr.quit(), un = null);
});
Rr.on("activate", () => {
  lu.getAllWindows().length === 0 && Hl();
});
Rr.whenReady().then(() => {
  Hl(), Mn.handle(
    "open-file",
    async (t, e, r) => {
      const n = gr.showOpenDialogSync({
        title: e,
        properties: ["openFile"],
        filters: r
      });
      return n ? Kl(n[0], "utf-8") : null;
    }
  ), Mn.on(
    "save-file",
    async (t, e, r, n) => {
      const i = gr.showOpenDialogSync({
        title: e,
        properties: ["openFile", "promptToCreate"],
        filters: n,
        buttonLabel: "Enregistrer"
      });
      i && ha(i[0], (a) => {
        if (a) {
          Hr(i[0], r, "utf-8");
          return;
        }
        gr.showMessageBox({
          type: "warning",
          message: "Ce fichier existe déjà. Voulez-vous le remplacer ?",
          buttons: ["Oui", "Non"]
        }).then((l) => {
          l.response == 0 && Hr(i[0], r, "utf-8");
        });
      });
    }
  ), Mn.on(
    "export-word",
    async (t, e) => {
      const r = gr.showOpenDialogSync({
        title: "Exporter l'enchaînement en Word",
        properties: ["openFile", "promptToCreate"],
        filters: [{ name: "Fichier Word", extensions: ["docx"] }],
        buttonLabel: "Exporter"
      });
      r && ha(r[0], async (n) => {
        if (n) {
          const i = await uu(e);
          Hr(r[0], i, "utf-8");
          return;
        }
        gr.showMessageBox({
          type: "warning",
          message: "Ce fichier existe déjà. Voulez-vous le remplacer ?",
          buttons: ["Oui", "Non"]
        }).then(async (i) => {
          if (i.response == 0) {
            const a = await uu(e);
            Hr(r[0], a);
          }
        });
      });
    }
  );
});
export {
  Wg as MAIN_DIST,
  zl as RENDERER_DIST,
  Es as VITE_DEV_SERVER_URL
};
