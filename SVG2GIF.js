/*!
 * VERSION: 0.14.8
 * DATE: 2016-07-18
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * Requires TweenLite and CSSPlugin version 1.17.0 or later (TweenMax contains both TweenLite and CSSPlugin). ThrowPropsPlugin is required for momentum-based continuation of movement after the mouse/touch is released (ThrowPropsPlugin is a membership benefit of Club GreenSock - http://greensock.com/club/).
 *
 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("utils.Draggable", ["events.EventDispatcher", "TweenLite", "plugins.CSSPlugin"], function(a, b, c) {
            var d, e, f, g, h, i, j, k, l, m = { css: {} },
                n = { css: {} },
                o = { css: {} },
                p = { css: {} },
                q = _gsScope._gsDefine.globals,
                r = {},
                s = document,
                t = s.documentElement || {},
                u = function(a) { return s.createElementNS ? s.createElementNS("http://www.w3.org/1999/xhtml", a) : s.createElement(a) },
                v = u("div"),
                w = [],
                x = function() { return !1 },
                y = 180 / Math.PI,
                z = 999999999999999,
                A = Date.now || function() { return (new Date).getTime() },
                B = !(s.addEventListener || !s.all),
                C = s.createElement("div"),
                D = [],
                E = {},
                F = 0,
                G = /^(?:a|input|textarea|button|select)$/i,
                H = 0,
                I = -1 !== navigator.userAgent.toLowerCase().indexOf("android"),
                J = 0,
                K = {},
                L = {},
                M = function(a) { if ("string" == typeof a && (a = b.selector(a)), !a || a.nodeType) return [a]; var c, d = [],
                        e = a.length; for (c = 0; c !== e; d.push(a[c++])); return d },
                N = function(a) { var b, c = {}; for (b in a) c[b] = a[b]; return c },
                O = function() { for (var a = D.length; --a > -1;) D[a]() },
                P = function(a) { D.push(a), 1 === D.length && b.ticker.addEventListener("tick", O, this, !1, 1) },
                Q = function(a) { for (var c = D.length; --c > -1;) D[c] === a && D.splice(c, 1);
                    b.to(R, 0, { overwrite: "all", delay: 15, onComplete: R }) },
                R = function() { D.length || b.ticker.removeEventListener("tick", O) },
                S = function(a, b) { var c; for (c in b) void 0 === a[c] && (a[c] = b[c]); return a },
                T = function() { return null != window.pageYOffset ? window.pageYOffset : null != s.scrollTop ? s.scrollTop : t.scrollTop || s.body.scrollTop || 0 },
                U = function() { return null != window.pageXOffset ? window.pageXOffset : null != s.scrollLeft ? s.scrollLeft : t.scrollLeft || s.body.scrollLeft || 0 },
                V = function(a, b) { Ia(a, "scroll", b), X(a.parentNode) || V(a.parentNode, b) },
                W = function(a, b) { Ja(a, "scroll", b), X(a.parentNode) || W(a.parentNode, b) },
                X = function(a) { return !(a && a !== t && a !== s && a !== s.body && a !== window && a.nodeType && a.parentNode) },
                Y = function(a, b) { var c = "x" === b ? "Width" : "Height",
                        d = "scroll" + c,
                        e = "client" + c,
                        f = s.body; return Math.max(0, X(a) ? Math.max(t[d], f[d]) - (window["inner" + c] || t[e] || f[e]) : a[d] - a[e]) },
                Z = function(a) { var b = X(a),
                        c = Y(a, "x"),
                        d = Y(a, "y");
                    b ? a = L : Z(a.parentNode), a._gsMaxScrollX = c, a._gsMaxScrollY = d, a._gsScrollX = a.scrollLeft || 0, a._gsScrollY = a.scrollTop || 0 },
                $ = function(a, b) { return a = a || window.event, r.pageX = a.clientX + s.body.scrollLeft + t.scrollLeft, r.pageY = a.clientY + s.body.scrollTop + t.scrollTop, b && (a.returnValue = !1), r },
                _ = function(a) { return a ? ("string" == typeof a && (a = b.selector(a)), a.length && a !== window && a[0] && a[0].style && !a.nodeType && (a = a[0]), a === window || a.nodeType && a.style ? a : null) : a },
                aa = function(a, b) { var c, e, f, g = a.style; if (void 0 === g[b]) { for (f = ["O", "Moz", "ms", "Ms", "Webkit"], e = 5, c = b.charAt(0).toUpperCase() + b.substr(1); --e > -1 && void 0 === g[f[e] + c];); if (0 > e) return "";
                        d = 3 === e ? "ms" : f[e], b = d + c } return b },
                ba = function(a, b, c) { var d = a.style;
                    d && (void 0 === d[b] && (b = aa(a, b)), null == c ? d.removeProperty ? d.removeProperty(b.replace(/([A-Z])/g, "-$1").toLowerCase()) : d.removeAttribute(b) : void 0 !== d[b] && (d[b] = c)) },
                ca = s.defaultView ? s.defaultView.getComputedStyle : x,
                da = /(?:Left|Right|Width)/i,
                ea = /(?:\d|\-|\+|=|#|\.)*/g,
                fa = function(a, b, c, d, e) { if ("px" === d || !d) return c; if ("auto" === d || !c) return 0; var f, g = da.test(b),
                        h = a,
                        i = v.style,
                        j = 0 > c; return j && (c = -c), "%" === d && -1 !== b.indexOf("border") ? f = c / 100 * (g ? a.clientWidth : a.clientHeight) : (i.cssText = "border:0 solid red;position:" + ha(a, "position", !0) + ";line-height:0;", "%" !== d && h.appendChild ? i[g ? "borderLeftWidth" : "borderTopWidth"] = c + d : (h = a.parentNode || s.body, i[g ? "width" : "height"] = c + d), h.appendChild(v), f = parseFloat(v[g ? "offsetWidth" : "offsetHeight"]), h.removeChild(v), 0 !== f || e || (f = fa(a, b, c, d, !0))), j ? -f : f },
                ga = function(a, b) { if ("absolute" !== ha(a, "position", !0)) return 0; var c = "left" === b ? "Left" : "Top",
                        d = ha(a, "margin" + c, !0); return a["offset" + c] - (fa(a, b, parseFloat(d), (d + "").replace(ea, "")) || 0) },
                ha = function(a, b, c) { var d, e = (a._gsTransform || {})[b]; return e || 0 === e ? e : (a.style[b] ? e = a.style[b] : (d = ca(a)) ? (e = d.getPropertyValue(b.replace(/([A-Z])/g, "-$1").toLowerCase()), e = e || d.length ? e : d[b]) : a.currentStyle && (e = a.currentStyle[b]), "auto" !== e || "top" !== b && "left" !== b || (e = ga(a, b)), c ? e : parseFloat(e) || 0) },
                ia = function(a, b, c) { var d = a.vars,
                        e = d[c],
                        f = a._listeners[b]; "function" == typeof e && e.apply(d[c + "Scope"] || d.callbackScope || a, d[c + "Params"] || [a.pointerEvent]), f && a.dispatchEvent(b) },
                ja = function(a, b) { var c, d, e, f = _(a); return f ? Da(f, b) : void 0 !== a.left ? (e = xa(b), { left: a.left - e.x, top: a.top - e.y, width: a.width, height: a.height }) : (d = a.min || a.minX || a.minRotation || 0, c = a.min || a.minY || 0, { left: d, top: c, width: (a.max || a.maxX || a.maxRotation || 0) - d, height: (a.max || a.maxY || 0) - c }) },
                ka = function() { if (!s.createElementNS) return g = 0, void(h = !1); var a, b, c, d, e = u("div"),
                        f = s.createElementNS("http://www.w3.org/2000/svg", "svg"),
                        l = u("div"),
                        m = e.style,
                        n = s.body || t;
                    s.body && na && (m.position = "absolute", n.appendChild(l), l.appendChild(e), d = e.offsetParent, l.style[na] = "rotate(1deg)", k = e.offsetParent === d, l.style.position = "absolute", m.height = "10px", d = e.offsetTop, l.style.border = "5px solid red", j = d !== e.offsetTop, n.removeChild(l)), m = f.style, f.setAttributeNS(null, "width", "400px"), f.setAttributeNS(null, "height", "400px"), f.setAttributeNS(null, "viewBox", "0 0 400 400"), m.display = "block", m.boxSizing = "border-box", m.border = "0px solid red", m.transform = "none", e.style.cssText = "width:100px;height:100px;overflow:scroll;-ms-overflow-style:none;", n.appendChild(e), e.appendChild(f), c = f.createSVGPoint().matrixTransform(f.getScreenCTM()), b = c.y, e.scrollTop = 100, c.x = c.y = 0, c = c.matrixTransform(f.getScreenCTM()), i = b - c.y < 100.1 ? 0 : b - c.y - 150, e.removeChild(f), n.removeChild(e), n.appendChild(f), a = f.getScreenCTM(), b = a.e, m.border = "50px solid red", a = f.getScreenCTM(), 0 === b && 0 === a.e && 0 === a.f && 1 === a.a ? (g = 1, h = !0) : (g = b !== a.e ? 1 : 0, h = 1 !== a.a), n.removeChild(f) },
                la = "" !== aa(v, "perspective"),
                ma = aa(v, "transformOrigin").replace(/^ms/g, "Ms").replace(/([A-Z])/g, "-$1").toLowerCase(),
                na = aa(v, "transform"),
                oa = na.replace(/^ms/g, "Ms").replace(/([A-Z])/g, "-$1").toLowerCase(),
                pa = {},
                qa = {},
                ra = window.SVGElement,
                sa = function(a) { return !!(ra && "function" == typeof a.getBBox && a.getCTM && (!a.parentNode || a.parentNode.getBBox && a.parentNode.getCTM)) },
                ta = (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent)) && parseFloat(RegExp.$1) < 11,
                ua = [],
                va = [],
                wa = function(a) { if (!a.getBoundingClientRect || !a.parentNode || !na) return { offsetTop: 0, offsetLeft: 0, scaleX: 1, scaleY: 1, offsetParent: t }; if (Sa.cacheSVGData !== !1 && a._gsCache && a._gsCache.lastUpdate === b.ticker.frame) return a._gsCache; var c, d, e, f, j, k, l, m, n, o, p, q, r = a,
                        u = ya(a); if (u.lastUpdate = b.ticker.frame, a.getBBox && !u.isSVGRoot) { for (r = a.parentNode, c = a.getBBox(); r && "svg" !== (r.nodeName + "").toLowerCase();) r = r.parentNode; return f = wa(r), u.offsetTop = c.y * f.scaleY, u.offsetLeft = c.x * f.scaleX, u.scaleX = f.scaleX, u.scaleY = f.scaleY, u.offsetParent = r || t, u } for (e = u.offsetParent, e === s.body && (e = t), va.length = ua.length = 0; r && (j = ha(r, na, !0), "matrix(1, 0, 0, 1, 0, 0)" !== j && "none" !== j && "translate3d(0px, 0px, 0px)" !== j && (va.push(r), ua.push(r.style[na]), r.style[na] = "none"), r !== e);) r = r.parentNode; for (d = e.getBoundingClientRect(), j = a.getScreenCTM(), m = a.createSVGPoint(), l = m.matrixTransform(j), m.x = m.y = 10, m = m.matrixTransform(j), u.scaleX = (m.x - l.x) / 10, u.scaleY = (m.y - l.y) / 10, void 0 === g && ka(), u.borderBox && !h && a.getAttribute("width") && (f = ca(a) || {}, n = parseFloat(f.borderLeftWidth) + parseFloat(f.borderRightWidth) || 0, o = parseFloat(f.borderTopWidth) + parseFloat(f.borderBottomWidth) || 0, p = parseFloat(f.width) || 0, q = parseFloat(f.height) || 0, u.scaleX *= (p - n) / p, u.scaleY *= (q - o) / q), i ? (c = a.getBoundingClientRect(), u.offsetLeft = c.left - d.left, u.offsetTop = c.top - d.top) : (u.offsetLeft = l.x - d.left, u.offsetTop = l.y - d.top), u.offsetParent = e, k = va.length; --k > -1;) va[k].style[na] = ua[k]; return u },
                xa = function(a, c) { if (c = c || {}, !a || a === t || !a.parentNode || a === window) return { x: 0, y: 0 }; var d = ca(a),
                        e = ma && d ? d.getPropertyValue(ma) : "50% 50%",
                        f = e.split(" "),
                        g = -1 !== e.indexOf("left") ? "0%" : -1 !== e.indexOf("right") ? "100%" : f[0],
                        h = -1 !== e.indexOf("top") ? "0%" : -1 !== e.indexOf("bottom") ? "100%" : f[1]; return ("center" === h || null == h) && (h = "50%"), ("center" === g || isNaN(parseFloat(g))) && (g = "50%"), a.getBBox && sa(a) ? (a._gsTransform || (b.set(a, { x: "+=0", overwrite: !1 }), void 0 === a._gsTransform.xOrigin && console.log("Draggable requires at least GSAP 1.17.0")), e = a.getBBox(), c.x = a._gsTransform.xOrigin - e.x, c.y = a._gsTransform.yOrigin - e.y) : (a.getBBox && -1 !== (g + h).indexOf("%") && (a = a.getBBox(), a = { offsetWidth: a.width, offsetHeight: a.height }), c.x = -1 !== g.indexOf("%") ? a.offsetWidth * parseFloat(g) / 100 : parseFloat(g), c.y = -1 !== h.indexOf("%") ? a.offsetHeight * parseFloat(h) / 100 : parseFloat(h)), c },
                ya = function(a) { if (Sa.cacheSVGData !== !1 && a._gsCache && a._gsCache.lastUpdate === b.ticker.frame) return a._gsCache; var c, d = a._gsCache = a._gsCache || {},
                        e = ca(a),
                        f = a.getBBox && sa(a),
                        g = "svg" === (a.nodeName + "").toLowerCase(); if (d.isSVG = f, d.isSVGRoot = g, d.borderBox = "border-box" === e.boxSizing, d.computedStyle = e, g) c = a.parentNode || t, c.insertBefore(v, a), d.offsetParent = v.offsetParent || t, c.removeChild(v);
                    else if (f) { for (c = a.parentNode; c && "svg" !== (c.nodeName + "").toLowerCase();) c = c.parentNode;
                        d.offsetParent = c } else d.offsetParent = a.offsetParent; return d },
                za = function(a, b, c, d) { if (a === window || !a || !a.style || !a.parentNode) return [1, 0, 0, 1, 0, 0]; var e, f, h, i, l, m, n, o, p, q, r, u, v, w, x = a._gsCache || ya(a),
                        y = a.parentNode,
                        z = y._gsCache || ya(y),
                        A = x.computedStyle,
                        B = x.isSVG ? z.offsetParent : y.offsetParent; return e = x.isSVG && -1 !== (a.style[na] + "").indexOf("matrix") ? a.style[na] : A ? A.getPropertyValue(oa) : a.currentStyle ? a.currentStyle[na] : "1,0,0,1,0,0", a.getBBox && -1 !== (a.getAttribute("transform") + "").indexOf("matrix") && (e = a.getAttribute("transform")), e = (e + "").match(/(?:\-|\.|\b)(\d|\.|e\-)+/g) || [1, 0, 0, 1, 0, 0], e.length > 6 && (e = [e[0], e[1], e[4], e[5], e[12], e[13]]), d ? e[4] = e[5] = 0 : x.isSVG && (l = a._gsTransform) && (l.xOrigin || l.yOrigin) && (e[0] = parseFloat(e[0]), e[1] = parseFloat(e[1]), e[2] = parseFloat(e[2]), e[3] = parseFloat(e[3]), e[4] = parseFloat(e[4]) - (l.xOrigin - (l.xOrigin * e[0] + l.yOrigin * e[2])), e[5] = parseFloat(e[5]) - (l.yOrigin - (l.xOrigin * e[1] + l.yOrigin * e[3]))), b && (void 0 === g && ka(), h = x.isSVG || x.isSVGRoot ? wa(a) : a, x.isSVG ? (i = a.getBBox(), q = z.isSVGRoot ? { x: 0, y: 0 } : y.getBBox(), h = { offsetLeft: i.x - q.x, offsetTop: i.y - q.y, offsetParent: x.offsetParent }) : x.isSVGRoot ? (r = parseInt(A.borderTopWidth, 10) || 0, u = parseInt(A.borderLeftWidth, 10) || 0, v = (e[0] - g) * u + e[2] * r, w = e[1] * u + (e[3] - g) * r, m = b.x, n = b.y, o = m - (m * e[0] + n * e[2]), p = n - (m * e[1] + n * e[3]), e[4] = parseFloat(e[4]) + o, e[5] = parseFloat(e[5]) + p, b.x -= o, b.y -= p, m = h.scaleX, n = h.scaleY, b.x *= m, b.y *= n, e[0] *= m, e[1] *= n, e[2] *= m, e[3] *= n, ta || (b.x += v, b.y += w)) : !j && a.offsetParent && (b.x += parseInt(ha(a.offsetParent, "borderLeftWidth"), 10) || 0, b.y += parseInt(ha(a.offsetParent, "borderTopWidth"), 10) || 0), f = y === t || y === s.body, e[4] = Number(e[4]) + b.x + (h.offsetLeft || 0) - c.x - (f ? 0 : y.scrollLeft || 0), e[5] = Number(e[5]) + b.y + (h.offsetTop || 0) - c.y - (f ? 0 : y.scrollTop || 0), y && "fixed" === ha(a, "position", A) && (e[4] += U(), e[5] += T()), !y || y === t || B !== h.offsetParent || z.isSVG || k && "100100" !== za(y).join("") || (h = z.isSVGRoot ? wa(y) : y, e[4] -= h.offsetLeft || 0, e[5] -= h.offsetTop || 0, j || !z.offsetParent || x.isSVG || x.isSVGRoot || (e[4] -= parseInt(ha(z.offsetParent, "borderLeftWidth"), 10) || 0, e[5] -= parseInt(ha(z.offsetParent, "borderTopWidth"), 10) || 0))), e },
                Aa = function(a, b) { if (!a || a === window || !a.parentNode) return [1, 0, 0, 1, 0, 0]; for (var c, d, e, f, g, h, i, j, k = xa(a, pa), l = xa(a.parentNode, qa), m = za(a, k, l);
                        (a = a.parentNode) && a.parentNode && a !== t;) k = l, l = xa(a.parentNode, k === pa ? qa : pa), i = za(a, k, l), c = m[0], d = m[1], e = m[2], f = m[3], g = m[4], h = m[5], m[0] = c * i[0] + d * i[2], m[1] = c * i[1] + d * i[3], m[2] = e * i[0] + f * i[2], m[3] = e * i[1] + f * i[3], m[4] = g * i[0] + h * i[2] + i[4], m[5] = g * i[1] + h * i[3] + i[5]; return b && (c = m[0], d = m[1], e = m[2], f = m[3], g = m[4], h = m[5], j = c * f - d * e, m[0] = f / j, m[1] = -d / j, m[2] = -e / j, m[3] = c / j, m[4] = (e * h - f * g) / j, m[5] = -(c * h - d * g) / j), m },
                Ba = function(a, b, c, d, e) { a = _(a); var f = Aa(a, !1, e),
                        g = b.x,
                        h = b.y; return c && (xa(a, b), g -= b.x, h -= b.y), d = d === !0 ? b : d || {}, d.x = g * f[0] + h * f[2] + f[4], d.y = g * f[1] + h * f[3] + f[5], d },
                Ca = function(a, b, c) { var d = a.x * b[0] + a.y * b[2] + b[4],
                        e = a.x * b[1] + a.y * b[3] + b[5]; return a.x = d * c[0] + e * c[2] + c[4], a.y = d * c[1] + e * c[3] + c[5], a },
                Da = function(a, b, c) { if (!(a = _(a))) return null;
                    b = _(b); var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, u, v, w, x, y, z, A, C = a.getBBox && sa(a); if (a === window) g = T(), e = U(), f = e + (t.clientWidth || a.innerWidth || s.body.clientWidth || 0), h = g + ((a.innerHeight || 0) - 20 < t.clientHeight ? t.clientHeight : a.innerHeight || s.body.clientHeight || 0);
                    else { if (void 0 === b || b === window) return a.getBoundingClientRect();
                        d = xa(a), e = -d.x, g = -d.y, C ? (o = a.getBBox(), p = o.width, q = o.height) : "svg" !== (a.nodeName + "").toLowerCase() && a.offsetWidth ? (p = a.offsetWidth, q = a.offsetHeight) : (z = ca(a), p = parseFloat(z.width), q = parseFloat(z.height)), f = e + p, h = g + q, "svg" !== a.nodeName.toLowerCase() || B || (r = wa(a), A = r.computedStyle || {}, w = (a.getAttribute("viewBox") || "0 0").split(" "), x = parseFloat(w[0]), y = parseFloat(w[1]), u = parseFloat(A.borderLeftWidth) || 0, v = parseFloat(A.borderTopWidth) || 0, f -= p - (p - u) / r.scaleX - x, h -= q - (q - v) / r.scaleY - y, e -= u / r.scaleX - x, g -= v / r.scaleY - y, z && (f += (parseFloat(A.borderRightWidth) + u) / r.scaleX, h += (v + parseFloat(A.borderBottomWidth)) / r.scaleY)) } return a === b ? { left: e, top: g, width: f - e, height: h - g } : (i = Aa(a), j = Aa(b, !0), k = Ca({ x: e, y: g }, i, j), l = Ca({ x: f, y: g }, i, j), m = Ca({ x: f, y: h }, i, j), n = Ca({ x: e, y: h }, i, j), e = Math.min(k.x, l.x, m.x, n.x), g = Math.min(k.y, l.y, m.y, n.y), K.x = K.y = 0, c && xa(b, K), { left: e + K.x, top: g + K.y, width: Math.max(k.x, l.x, m.x, n.x) - e, height: Math.max(k.y, l.y, m.y, n.y) - g }) },
                Ea = function(a) { return a && a.length && a[0] && (a[0].nodeType && a[0].style && !a.nodeType || a[0].length && a[0][0]) ? !0 : !1 },
                Fa = function(a) { var b, c, d, e = [],
                        f = a.length; for (b = 0; f > b; b++)
                        if (c = a[b], Ea(c))
                            for (d = c.length, d = 0; d < c.length; d++) e.push(c[d]);
                        else c && 0 !== c.length && e.push(c); return e },
                Ga = "ontouchstart" in t && "orientation" in window,
                Ha = function(a) { for (var b = a.split(","), c = (void 0 !== v.onpointerdown ? "pointerdown,pointermove,pointerup,pointercancel" : void 0 !== v.onmspointerdown ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : a).split(","), d = {}, e = 8; --e > -1;) d[b[e]] = c[e], d[c[e]] = b[e]; return d }("touchstart,touchmove,touchend,touchcancel"),
                Ia = function(a, b, c, d) { a.addEventListener ? a.addEventListener(Ha[b] || b, c, d) : a.attachEvent && a.attachEvent("on" + b, c) },
                Ja = function(a, b, c) { a.removeEventListener ? a.removeEventListener(Ha[b] || b, c) : a.detachEvent && a.detachEvent("on" + b, c) },
                Ka = function(a, b) { for (var c = a.length; --c > -1;)
                        if (a[c].identifier === b) return !0; return !1 },
                La = function(a) { e = a.touches && H < a.touches.length, Ja(a.target, "touchend", La) },
                Ma = function(a) { e = a.touches && H < a.touches.length, Ia(a.target, "touchend", La) },
                Na = function(a, b, c, d, e, f) { var g, h, i, j = {}; if (b)
                        if (1 !== e && b instanceof Array) { for (j.end = g = [], i = b.length, h = 0; i > h; h++) g[h] = b[h] * e;
                            c += 1.1, d -= 1.1 } else "function" == typeof b ? j.end = function(c) { return b.call(a, c) * e } : j.end = b; return (c || 0 === c) && (j.max = c), (d || 0 === d) && (j.min = d), f && (j.velocity = 0), j },
                Oa = function(a) { var b; return a && a.getAttribute && "BODY" !== a.nodeName ? "true" === (b = a.getAttribute("data-clickable")) || "false" !== b && (a.onclick || G.test(a.nodeName + "") || "true" === a.getAttribute("contentEditable")) ? !0 : Oa(a.parentNode) : !1 },
                Pa = function(a, b) { for (var c, d = a.length; --d > -1;) c = a[d], c.ondragstart = c.onselectstart = b ? null : x, ba(c, "userSelect", b ? "text" : "none") },
                Qa = function() { var a, b = s.createElement("div"),
                        c = s.createElement("div"),
                        d = c.style,
                        e = s.body || v; return d.display = "inline-block", d.position = "relative", b.style.cssText = c.innerHTML = "width:90px; height:40px; padding:10px; overflow:auto; visibility: hidden", b.appendChild(c), e.appendChild(b), l = c.offsetHeight + 18 > b.scrollHeight, d.width = "100%", na || (d.paddingRight = "500px", a = b.scrollLeft = b.scrollWidth - b.clientWidth, d.left = "-90px", a = a !== b.scrollLeft), e.removeChild(b), a }(),
                Ra = function(a, c) { a = _(a), c = c || {}; var d, e, f, g, h, i, j = s.createElement("div"),
                        k = j.style,
                        m = a.firstChild,
                        n = 0,
                        o = 0,
                        p = a.scrollTop,
                        q = a.scrollLeft,
                        r = a.scrollWidth,
                        t = a.scrollHeight,
                        u = 0,
                        v = 0,
                        w = 0;
                    la && c.force3D !== !1 ? (h = "translate3d(", i = "px,0px)") : na && (h = "translate(", i = "px)"), this.scrollTop = function(a, b) { return arguments.length ? void this.top(-a, b) : -this.top() }, this.scrollLeft = function(a, b) { return arguments.length ? void this.left(-a, b) : -this.left() }, this.left = function(d, e) { if (!arguments.length) return -(a.scrollLeft + o); var f = a.scrollLeft - q,
                            g = o; return (f > 2 || -2 > f) && !e ? (q = a.scrollLeft, b.killTweensOf(this, !0, { left: 1, scrollLeft: 1 }), this.left(-q), void(c.onKill && c.onKill())) : (d = -d, 0 > d ? (o = d - .5 | 0, d = 0) : d > v ? (o = d - v | 0, d = v) : o = 0, (o || g) && (h ? this._suspendTransforms || (k[na] = h + -o + "px," + -n + i) : k.left = -o + "px", Qa && o + u >= 0 && (k.paddingRight = o + u + "px")), a.scrollLeft = 0 | d, void(q = a.scrollLeft)) }, this.top = function(d, e) { if (!arguments.length) return -(a.scrollTop + n); var f = a.scrollTop - p,
                            g = n; return (f > 2 || -2 > f) && !e ? (p = a.scrollTop, b.killTweensOf(this, !0, { top: 1, scrollTop: 1 }), this.top(-p), void(c.onKill && c.onKill())) : (d = -d, 0 > d ? (n = d - .5 | 0, d = 0) : d > w ? (n = d - w | 0, d = w) : n = 0, (n || g) && (h ? this._suspendTransforms || (k[na] = h + -o + "px," + -n + i) : k.top = -n + "px"), a.scrollTop = 0 | d, void(p = a.scrollTop)) }, this.maxScrollTop = function() { return w }, this.maxScrollLeft = function() { return v }, this.disable = function() { for (m = j.firstChild; m;) g = m.nextSibling, a.appendChild(m), m = g;
                        a === j.parentNode && a.removeChild(j) }, this.enable = function() { if (m = a.firstChild, m !== j) { for (; m;) g = m.nextSibling, j.appendChild(m), m = g;
                            a.appendChild(j), this.calibrate() } }, this.calibrate = function(b) { var c, g, h = a.clientWidth === d;
                        p = a.scrollTop, q = a.scrollLeft, (!h || a.clientHeight !== e || j.offsetHeight !== f || r !== a.scrollWidth || t !== a.scrollHeight || b) && ((n || o) && (c = this.left(), g = this.top(), this.left(-a.scrollLeft), this.top(-a.scrollTop)), (!h || b) && (k.display = "block", k.width = "auto", k.paddingRight = "0px", u = Math.max(0, a.scrollWidth - a.clientWidth), u && (u += ha(a, "paddingLeft") + (l ? ha(a, "paddingRight") : 0))), k.display = "inline-block", k.position = "relative", k.overflow = "visible", k.verticalAlign = "top", k.width = "100%", k.paddingRight = u + "px", l && (k.paddingBottom = ha(a, "paddingBottom", !0)), B && (k.zoom = "1"), d = a.clientWidth, e = a.clientHeight, r = a.scrollWidth, t = a.scrollHeight, v = a.scrollWidth - d, w = a.scrollHeight - e, f = j.offsetHeight, k.display = "block", (c || g) && (this.left(c), this.top(g))) }, this.content = j, this.element = a, this._suspendTransforms = !1, this.enable() },
                Sa = function(d, g) {
                    a.call(this, d), d = _(d), f || (f = q.com.greensock.plugins.ThrowPropsPlugin), this.vars = g = N(g || {}), this.target = d, this.x = this.y = this.rotation = 0, this.dragResistance = parseFloat(g.dragResistance) || 0, this.edgeResistance = isNaN(g.edgeResistance) ? 1 : parseFloat(g.edgeResistance) || 0, this.lockAxis = g.lockAxis, this.autoScroll = g.autoScroll || 0, this.lockedAxis = null, this.allowEventDefault = !!g.allowEventDefault;
                    var h, i, j, k, l, r, u, v, x, D, G, K, O, R, T, U, Y, aa, ca, da, ea, fa, ga, ka, la, ma, na, oa, pa, qa, ra, sa, ta, ua = (g.type || (B ? "top,left" : "x,y")).toLowerCase(),
                        va = -1 !== ua.indexOf("x") || -1 !== ua.indexOf("y"),
                        wa = -1 !== ua.indexOf("rotation"),
                        xa = wa ? "rotation" : va ? "x" : "left",
                        ya = va ? "y" : "top",
                        za = -1 !== ua.indexOf("x") || -1 !== ua.indexOf("left") || "scroll" === ua,
                        Ca = -1 !== ua.indexOf("y") || -1 !== ua.indexOf("top") || "scroll" === ua,
                        Da = g.minimumMovement || 2,
                        Ea = this,
                        Fa = M(g.trigger || g.handle || d),
                        La = {},
                        Qa = 0,
                        Ta = !1,
                        Ua = g.clickableTest || Oa,
                        Va = 0,
                        Xa = function(a) { if (Ea.autoScroll && Ea.isDragging && (Ta || aa)) { var b, c, e, f, g, h, j, k, l = d,
                                    m = 15 * Ea.autoScroll; for (Ta = !1, L.scrollTop = null != window.pageYOffset ? window.pageYOffset : null != t.scrollTop ? t.scrollTop : s.body.scrollTop, L.scrollLeft = null != window.pageXOffset ? window.pageXOffset : null != t.scrollLeft ? t.scrollLeft : s.body.scrollLeft, f = Ea.pointerX - L.scrollLeft, g = Ea.pointerY - L.scrollTop; l && !c;) c = X(l.parentNode), b = c ? L : l.parentNode, e = c ? { bottom: Math.max(t.clientHeight, window.innerHeight || 0), right: Math.max(t.clientWidth, window.innerWidth || 0), left: 0, top: 0 } : b.getBoundingClientRect(), h = j = 0, Ca && (k = b._gsMaxScrollY - b.scrollTop, 0 > k ? j = k : g > e.bottom - 40 && k ? (Ta = !0, j = Math.min(k, m * (1 - Math.max(0, e.bottom - g) / 40) | 0)) : g < e.top + 40 && b.scrollTop && (Ta = !0, j = -Math.min(b.scrollTop, m * (1 - Math.max(0, g - e.top) / 40) | 0)), j && (b.scrollTop += j)), za && (k = b._gsMaxScrollX - b.scrollLeft, 0 > k ? h = k : f > e.right - 40 && k ? (Ta = !0, h = Math.min(k, m * (1 - Math.max(0, e.right - f) / 40) | 0)) : f < e.left + 40 && b.scrollLeft && (Ta = !0, h = -Math.min(b.scrollLeft, m * (1 - Math.max(0, f - e.left) / 40) | 0)), h && (b.scrollLeft += h)), c && (h || j) && (window.scrollTo(b.scrollLeft, b.scrollTop), ib(Ea.pointerX + h, Ea.pointerY + j)), l = b } if (aa) { var n = Ea.x,
                                    o = Ea.y,
                                    p = 1e-6;
                                p > n && n > -p && (n = 0), p > o && o > -p && (o = 0), wa ? (oa.data.rotation = Ea.rotation = n, oa.setRatio(1)) : i ? (Ca && i.top(o), za && i.left(n)) : va ? (Ca && (oa.data.y = o), za && (oa.data.x = n), oa.setRatio(1)) : (Ca && (d.style.top = o + "px"), za && (d.style.left = n + "px")), !v || a || ra || (ra = !0, ia(Ea, "drag", "onDrag"), ra = !1) } aa = !1 },
                        Ya = function(a, c) { var e;
                            Ea.x, Ea.y;
                            d._gsTransform || !va && !wa || b.set(d, { x: "+=0", overwrite: !1 }), va ? (Ea.y = d._gsTransform.y, Ea.x = d._gsTransform.x) : wa ? Ea.x = Ea.rotation = d._gsTransform.rotation : i ? (Ea.y = i.top(), Ea.x = i.left()) : (Ea.y = parseInt(d.style.top, 10) || 0, Ea.x = parseInt(d.style.left, 10) || 0), !da && !ea || c || (da && (e = da(Ea.x), e !== Ea.x && (Ea.x = e, wa && (Ea.rotation = e), aa = !0)), ea && (e = ea(Ea.y), e !== Ea.y && (Ea.y = e), aa = !0)), aa && Xa(!0), a || ia(Ea, "throwupdate", "onThrowUpdate") },
                        Za = function() { var a, b, c, e;
                            u = !1, i ? (i.calibrate(), Ea.minX = D = -i.maxScrollLeft(), Ea.minY = K = -i.maxScrollTop(), Ea.maxX = x = Ea.maxY = G = 0, u = !0) : g.bounds && (a = ja(g.bounds, d.parentNode), wa ? (Ea.minX = D = a.left, Ea.maxX = x = a.left + a.width, Ea.minY = K = Ea.maxY = G = 0) : void 0 !== g.bounds.maxX || void 0 !== g.bounds.maxY ? (a = g.bounds, Ea.minX = D = a.minX, Ea.minY = K = a.minY, Ea.maxX = x = a.maxX, Ea.maxY = G = a.maxY) : (b = ja(d, d.parentNode), Ea.minX = D = ha(d, xa) + a.left - b.left, Ea.minY = K = ha(d, ya) + a.top - b.top, Ea.maxX = x = D + (a.width - b.width), Ea.maxY = G = K + (a.height - b.height)), D > x && (Ea.minX = x, Ea.maxX = x = D, D = Ea.minX), K > G && (Ea.minY = G, Ea.maxY = G = K, K = Ea.minY), wa && (Ea.minRotation = D, Ea.maxRotation = x), u = !0), g.liveSnap && (c = g.liveSnap === !0 ? g.snap || {} : g.liveSnap, e = c instanceof Array || "function" == typeof c, wa ? (da = fb(e ? c : c.rotation, D, x, 1), ea = null) : (za && (da = fb(e ? c : c.x || c.left || c.scrollLeft, D, x, i ? -1 : 1)), Ca && (ea = fb(e ? c : c.y || c.top || c.scrollTop, K, G, i ? -1 : 1)))) },
                        $a = function() { Ea.isThrowing = !1, ia(Ea, "throwcomplete", "onThrowComplete") },
                        _a = function() { Ea.isThrowing = !1 },
                        ab = function(a, b) { var c, e, h, j;
                            a && f ? (a === !0 && (c = g.snap || {}, e = c instanceof Array || "function" == typeof c, a = { resistance: (g.throwResistance || g.resistance || 1e3) / (wa ? 10 : 1) }, wa ? a.rotation = Na(Ea, e ? c : c.rotation, x, D, 1, b) : (za && (a[xa] = Na(Ea, e ? c : c.x || c.left || c.scrollLeft, x, D, i ? -1 : 1, b || "x" === Ea.lockedAxis)), Ca && (a[ya] = Na(Ea, e ? c : c.y || c.top || c.scrollTop, G, K, i ? -1 : 1, b || "y" === Ea.lockedAxis)))), Ea.isThrowing = !0, j = isNaN(g.overshootTolerance) ? 1 === g.edgeResistance ? 0 : 1 - Ea.edgeResistance + .2 : g.overshootTolerance, Ea.tween = h = f.to(i || d, { throwProps: a, ease: g.ease || q.Power3.easeOut, onComplete: $a, onOverwrite: _a, onUpdate: g.fastMode ? ia : Ya, onUpdateParams: g.fastMode ? [Ea, "onthrowupdate", "onThrowUpdate"] : w }, isNaN(g.maxDuration) ? 2 : g.maxDuration, isNaN(g.minDuration) ? 0 === j ? 0 : .5 : g.minDuration, j), g.fastMode || (i && (i._suspendTransforms = !0), h.render(h.duration(), !0, !0), Ya(!0, !0), Ea.endX = Ea.x, Ea.endY = Ea.y, wa && (Ea.endRotation = Ea.x), h.play(0), Ya(!0, !0), i && (i._suspendTransforms = !1))) : u && Ea.applyBounds() },
                        bb = function(a) { var b, c, e, f, g, h, i, l, m, n = ka || [1, 0, 0, 1, 0, 0];
                            ka = Aa(d.parentNode, !0), a && Ea.isPressed && n.join(",") !== ka.join(",") && (b = n[0], c = n[1], e = n[2], f = n[3], g = n[4], h = n[5], i = b * f - c * e, l = j * (f / i) + k * (-e / i) + (e * h - f * g) / i, m = j * (-c / i) + k * (b / i) + -(b * h - c * g) / i, k = l * ka[1] + m * ka[3] + ka[5], j = l * ka[0] + m * ka[2] + ka[4]), ka[1] || ka[2] || 1 != ka[0] || 1 != ka[3] || 0 != ka[4] || 0 != ka[5] || (ka = null) },
                        cb = function() { var a = 1 - Ea.edgeResistance;
                            bb(!1), ka && (j = Ea.pointerX * ka[0] + Ea.pointerY * ka[2] + ka[4], k = Ea.pointerX * ka[1] + Ea.pointerY * ka[3] + ka[5]), aa && (ib(Ea.pointerX, Ea.pointerY), Xa(!0)), i ? (Za(), r = i.top(), l = i.left()) : (db() ? (Ya(!0, !0), Za()) : Ea.applyBounds(), wa ? (Y = Ba(d, { x: 0, y: 0 }), Ya(!0, !0), l = Ea.x, r = Ea.y = Math.atan2(Y.y - Ea.pointerY, Ea.pointerX - Y.x) * y) : (ma = d.parentNode ? d.parentNode.scrollTop || 0 : 0, na = d.parentNode ? d.parentNode.scrollLeft || 0 : 0, r = ha(d, ya), l = ha(d, xa))), u && a && (l > x ? l = x + (l - x) / a : D > l && (l = D - (D - l) / a), wa || (r > G ? r = G + (r - G) / a : K > r && (r = K - (K - r) / a))) },
                        db = function() { return Ea.tween && Ea.tween.isActive() },
                        eb = function() {!C.parentNode || db() || Ea.isDragging || C.parentNode.removeChild(C) },
                        fb = function(a, b, c, d) { return "function" == typeof a ? function(e) { var f = Ea.isPressed ? 1 - Ea.edgeResistance : 1; return a.call(Ea, e > c ? c + (e - c) * f : b > e ? b + (e - b) * f : e) * d } : a instanceof Array ? function(d) { for (var e, f, g = a.length, h = 0, i = z; --g > -1;) e = a[g], f = e - d, 0 > f && (f = -f), i > f && e >= b && c >= e && (h = g, i = f); return a[h] } : isNaN(a) ? function(a) { return a } : function() { return a * d } },
                        gb = function(a) { var c; if (!(!h || Ea.isPressed || !a || ("mousedown" === a.type || "pointerdown" === a.type) && A() - Va < 30 && Ha[Ea.pointerEvent.type])) { if (la = db(), Ea.pointerEvent = a, Ha[a.type] ? (ga = -1 !== a.type.indexOf("touch") ? a.currentTarget || a.target : s, Ia(ga, "touchend", jb), Ia(ga, "touchmove", hb), Ia(ga, "touchcancel", jb), Ia(s, "touchstart", Ma)) : (ga = null, Ia(s, "mousemove", hb)), qa = null, Ia(s, "mouseup", jb), a && a.target && Ia(a.target, "mouseup", jb), fa = Ua.call(Ea, a.target) && !g.dragClickables) return Ia(a.target, "change", jb), ia(Ea, "press", "onPress"), void Pa(Fa, !0); if (pa = !ga || za === Ca || i || Ea.vars.allowNativeTouchScrolling === !1 ? !1 : za ? "y" : "x", B ? a = $(a, !0) : pa || Ea.allowEventDefault || (a.preventDefault(), a.preventManipulation && a.preventManipulation()), a.changedTouches ? (a = T = a.changedTouches[0], U = a.identifier) : a.pointerId ? U = a.pointerId : T = U = null, H++, P(Xa), k = Ea.pointerY = a.pageY, j = Ea.pointerX = a.pageX, (pa || Ea.autoScroll) && Z(d.parentNode), d.parentNode && (i || Ea.autoScroll && !wa && d.parentNode._gsMaxScrollX && !C.parentNode) && !d.getBBox && (C.style.width = d.parentNode.scrollWidth + "px", d.parentNode.appendChild(C)), cb(), Ea.tween && Ea.tween.kill(), Ea.isThrowing = !1, b.killTweensOf(i || d, !0, La), i && b.killTweensOf(d, !0, { scrollTo: 1 }), Ea.tween = Ea.lockedAxis = null, (g.zIndexBoost || !wa && !i && g.zIndexBoost !== !1) && (d.style.zIndex = Sa.zIndex++), Ea.isPressed = !0, v = !(!g.onDrag && !Ea._listeners.drag), !wa)
                                    for (c = Fa.length; --c > -1;) ba(Fa[c], "cursor", g.cursor || "move");
                                ia(Ea, "press", "onPress") } },
                        hb = function(a) { var b, c, d, f, g = a; if (h && !e && Ea.isPressed && a) { if (Ea.pointerEvent = a, b = a.changedTouches) { if (a = b[0], a !== T && a.identifier !== U) { for (f = b.length; --f > -1 && (a = b[f]).identifier !== U;); if (0 > f) return } } else if (a.pointerId && U && a.pointerId !== U) return; if (B) a = $(a, !0);
                                else { if (ga && pa && !qa && (c = a.pageX, d = a.pageY, ka && (f = c * ka[0] + d * ka[2] + ka[4], d = c * ka[1] + d * ka[3] + ka[5], c = f), qa = Math.abs(c - j) > Math.abs(d - k) && za ? "x" : "y", Ea.vars.lockAxisOnTouchScroll !== !1 && (Ea.lockedAxis = "x" === qa ? "y" : "x", "function" == typeof Ea.vars.onLockAxis && Ea.vars.onLockAxis.call(Ea, g)), I && pa === qa)) return void jb(g);
                                    Ea.allowEventDefault || pa && (!qa || pa === qa) || g.cancelable === !1 || (g.preventDefault(), g.preventManipulation && g.preventManipulation()) } Ea.autoScroll && (Ta = !0), ib(a.pageX, a.pageY) } },
                        ib = function(a, b) { var c, d, e, f, g, h, i = 1 - Ea.dragResistance,
                                m = 1 - Ea.edgeResistance;
                            Ea.pointerX = a, Ea.pointerY = b, wa ? (f = Math.atan2(Y.y - b, a - Y.x) * y, g = Ea.y - f, Ea.y = f, g > 180 ? r -= 360 : -180 > g && (r += 360), e = l + (r - f) * i) : (ka && (h = a * ka[0] + b * ka[2] + ka[4], b = a * ka[1] + b * ka[3] + ka[5], a = h), d = b - k, c = a - j, Da > d && d > -Da && (d = 0), Da > c && c > -Da && (c = 0), (Ea.lockAxis || Ea.lockedAxis) && (c || d) && (h = Ea.lockedAxis, h || (Ea.lockedAxis = h = za && Math.abs(c) > Math.abs(d) ? "y" : Ca ? "x" : null, h && "function" == typeof Ea.vars.onLockAxis && Ea.vars.onLockAxis.call(Ea, Ea.pointerEvent)), "y" === h ? d = 0 : "x" === h && (c = 0)), e = l + c * i, f = r + d * i), da || ea ? (da && (e = da(e)), ea && (f = ea(f))) : u && (e > x ? e = x + (e - x) * m : D > e && (e = D + (e - D) * m), wa || (f > G ? f = G + (f - G) * m : K > f && (f = K + (f - K) * m))), wa || (e = Math.round(e), f = Math.round(f)), (Ea.x !== e || Ea.y !== f && !wa) && (wa ? Ea.endRotation = Ea.x = Ea.endX = e : (Ca && (Ea.y = Ea.endY = f), za && (Ea.x = Ea.endX = e)), aa = !0, !Ea.isDragging && Ea.isPressed && (Ea.isDragging = !0, ia(Ea, "dragstart", "onDragStart"))) },
                        jb = function(a, c) { if (h && Ea.isPressed && (!a || null == U || c || !(a.pointerId && a.pointerId !== U || a.changedTouches && !Ka(a.changedTouches, U)))) { Ea.isPressed = !1; var e, f, i, j, k, l = a,
                                    m = Ea.isDragging,
                                    n = b.delayedCall(.001, eb); if (ga ? (Ja(ga, "touchend", jb), Ja(ga, "touchmove", hb), Ja(ga, "touchcancel", jb), Ja(s, "touchstart", Ma)) : Ja(s, "mousemove", hb), Ja(s, "mouseup", jb), a && a.target && Ja(a.target, "mouseup", jb), aa = !1, fa) return a && Ja(a.target, "change", jb), Pa(Fa, !1), ia(Ea, "release", "onRelease"), ia(Ea, "click", "onClick"), void(fa = !1); if (Q(Xa), !wa)
                                    for (f = Fa.length; --f > -1;) ba(Fa[f], "cursor", g.cursor || "move"); if (m && (Qa = J = A(), Ea.isDragging = !1), H--, a) { if (B && (a = $(a, !1)), e = a.changedTouches, e && (a = e[0], a !== T && a.identifier !== U)) { for (f = e.length; --f > -1 && (a = e[f]).identifier !== U;); if (0 > f) return } Ea.pointerEvent = l, Ea.pointerX = a.pageX, Ea.pointerY = a.pageY } return l && !m ? (la && (g.snap || g.bounds) && ab(g.throwProps), ia(Ea, "release", "onRelease"), I && "touchmove" === l.type || (ia(Ea, "click", "onClick"), j = l.target || l.srcElement || d, Va = A(), k = function() { Va !== sa && Ea.enabled() && !Ea.isPressed && (j.click ? j.click() : s.createEvent && (i = s.createEvent("MouseEvents"), i.initMouseEvent("click", !0, !0, window, 1, Ea.pointerEvent.screenX, Ea.pointerEvent.screenY, Ea.pointerX, Ea.pointerY, !1, !1, !1, !1, 0, null), j.dispatchEvent(i))) }, I || b.delayedCall(1e-5, k))) : (ab(g.throwProps), B || Ea.allowEventDefault || !l || !g.dragClickables && Ua.call(Ea, l.target) || !m || pa && (!qa || pa !== qa) || l.cancelable === !1 || (l.preventDefault(), l.preventManipulation && l.preventManipulation()), ia(Ea, "release", "onRelease")), db() && n.duration(Ea.tween.duration()), m && ia(Ea, "dragend", "onDragEnd"), !0 } },
                        kb = function(a) { if (a && Ea.isDragging) { var b = a.target || a.srcElement || d.parentNode,
                                    c = b.scrollLeft - b._gsScrollX,
                                    e = b.scrollTop - b._gsScrollY;
                                (c || e) && (ka ? (j -= c * ka[0] + e * ka[2], k -= e * ka[3] + c * ka[1]) : (j -= c, k -= e), b._gsScrollX += c, b._gsScrollY += e, ib(Ea.pointerX, Ea.pointerY)) } },
                        lb = function(a) { var b = A(),
                                c = 40 > b - Va,
                                d = 40 > b - Qa,
                                e = c && sa === Va,
                                f = !!a.preventDefault,
                                g = c && ta === Va,
                                h = a.isTrusted || null == a.isTrusted && c && e; return f && (e || d && Ea.vars.suppressClickOnDrag !== !1) && a.stopImmediatePropagation(), !c || e && h === g ? void((Ea.isPressed || d || c) && (f ? h && a.detail && c || (a.preventDefault(), a.preventManipulation && a.preventManipulation()) : a.returnValue = !1)) : (h && e && (ta = Va), void(sa = Va)) };
                    ca = Sa.get(this.target), ca && ca.kill(), this.startDrag = function(a) { gb(a), Ea.isDragging || (Ea.isDragging = !0, ia(Ea, "dragstart", "onDragStart")) }, this.drag = hb, this.endDrag = function(a) { jb(a, !0) }, this.timeSinceDrag = function() { return Ea.isDragging ? 0 : (A() - Qa) / 1e3 }, this.hitTest = function(a, b) { return Sa.hitTest(Ea.target, a, b) }, this.getDirection = function(a, b) { var c, d, e, g, h, i, j = "velocity" === a && f ? a : "object" != typeof a || wa ? "start" : "element"; return "element" === j && (h = Wa(Ea.target), i = Wa(a)), c = "start" === j ? Ea.x - l : "velocity" === j ? f.getVelocity(this.target, xa) : h.left + h.width / 2 - (i.left + i.width / 2), wa ? 0 > c ? "counter-clockwise" : "clockwise" : (b = b || 2, d = "start" === j ? Ea.y - r : "velocity" === j ? f.getVelocity(this.target, ya) : h.top + h.height / 2 - (i.top + i.height / 2), e = Math.abs(c / d), g = 1 / b > e ? "" : 0 > c ? "left" : "right", b > e && ("" !== g && (g += "-"), g += 0 > d ? "up" : "down"), g) }, this.applyBounds = function(a) { var b, c, e, f, h, i; if (a && g.bounds !== a) return g.bounds = a, Ea.update(!0); if (Ya(!0), Za(), u) { if (b = Ea.x, c = Ea.y, b > x ? b = x : D > b && (b = D), c > G ? c = G : K > c && (c = K), (Ea.x !== b || Ea.y !== c) && (e = !0, Ea.x = Ea.endX = b, wa ? Ea.endRotation = b : Ea.y = Ea.endY = c, aa = !0, Xa(!0), Ea.autoScroll && !Ea.isDragging))
                                for (Z(d.parentNode), f = d, L.scrollTop = null != window.pageYOffset ? window.pageYOffset : null != t.scrollTop ? t.scrollTop : s.body.scrollTop, L.scrollLeft = null != window.pageXOffset ? window.pageXOffset : null != t.scrollLeft ? t.scrollLeft : s.body.scrollLeft; f && !i;) i = X(f.parentNode), h = i ? L : f.parentNode, Ca && h.scrollTop > h._gsMaxScrollY && (h.scrollTop = h._gsMaxScrollY), za && h.scrollLeft > h._gsMaxScrollX && (h.scrollLeft = h._gsMaxScrollX), f = h;
                            Ea.isThrowing && (e || Ea.endX > x || Ea.endX < D || Ea.endY > G || Ea.endY < K) && ab(g.throwProps, e) } return Ea }, this.update = function(a, b, c) { var e = Ea.x,
                            f = Ea.y; return bb(!b), a ? Ea.applyBounds() : (aa && c && Xa(!0), Ya(!0)), b && (ib(Ea.pointerX, Ea.pointerY), aa && Xa(!0)), Ea.isPressed && !b && (za && Math.abs(e - Ea.x) > .01 || Ca && Math.abs(f - Ea.y) > .01 && !wa) && cb(), Ea.autoScroll && (Z(d.parentNode), Ta = Ea.isDragging, Xa(!0)), Ea.autoScroll && (W(d, kb), V(d, kb)), Ea }, this.enable = function(a) { var e, j, k; if ("soft" !== a) { for (j = Fa.length; --j > -1;) k = Fa[j], Ia(k, "mousedown", gb), Ia(k, "touchstart", gb), Ia(k, "click", lb, !0), wa || ba(k, "cursor", g.cursor || "move"), ba(k, "touchCallout", "none"), ba(k, "touchAction", za === Ca || i ? "none" : za ? "pan-y" : "pan-x");
                            Pa(Fa, !1) } return V(d, kb), h = !0, f && "soft" !== a && f.track(i || d, va ? "x,y" : wa ? "rotation" : "top,left"), i && i.enable(), d._gsDragID = e = "d" + F++, E[e] = this, i && (i.element._gsDragID = e), b.set(d, { x: "+=0", overwrite: !1 }), oa = { t: d, data: B ? R : d._gsTransform, tween: {}, setRatio: B ? function() { b.set(d, O) } : c._internals.setTransformRatio || c._internals.set3DTransformRatio }, cb(), Ea.update(!0), Ea }, this.disable = function(a) {
                        var b, c, e = Ea.isDragging;
                        if (!wa)
                            for (b = Fa.length; --b > -1;) ba(Fa[b], "cursor", null);
                        if ("soft" !== a) {
                            for (b = Fa.length; --b > -1;) c = Fa[b], ba(c, "touchCallout", null), ba(c, "touchAction", null), Ja(c, "mousedown", gb), Ja(c, "touchstart", gb),
                                Ja(c, "click", lb);
                            Pa(Fa, !0), ga && (Ja(ga, "touchcancel", jb), Ja(ga, "touchend", jb), Ja(ga, "touchmove", hb)), Ja(s, "mouseup", jb), Ja(s, "mousemove", hb)
                        }
                        return W(d, kb), h = !1, f && "soft" !== a && f.untrack(i || d, va ? "x,y" : wa ? "rotation" : "top,left"), i && i.disable(), Q(Xa), Ea.isDragging = Ea.isPressed = fa = !1, e && ia(Ea, "dragend", "onDragEnd"), Ea
                    }, this.enabled = function(a, b) { return arguments.length ? a ? Ea.enable(b) : Ea.disable(b) : h }, this.kill = function() { return Ea.isThrowing = !1, b.killTweensOf(i || d, !0, La), Ea.disable(), delete E[d._gsDragID], Ea }, -1 !== ua.indexOf("scroll") && (i = this.scrollProxy = new Ra(d, S({ onKill: function() { Ea.isPressed && jb(null) } }, g)), d.style.overflowY = Ca && !Ga ? "auto" : "hidden", d.style.overflowX = za && !Ga ? "auto" : "hidden", d = i.content), g.force3D !== !1 && b.set(d, { force3D: !0 }), wa ? La.rotation = 1 : (za && (La[xa] = 1), Ca && (La[ya] = 1)), wa ? (O = p, R = O.css, O.overwrite = !1) : va && (O = za && Ca ? m : za ? n : o, R = O.css, O.overwrite = !1), this.enable()
                },
                Ta = Sa.prototype = new a;
            Ta.constructor = Sa, Ta.pointerX = Ta.pointerY = 0, Ta.isDragging = Ta.isPressed = !1, Sa.version = "0.14.8", Sa.zIndex = 1e3, Ia(s, "touchcancel", function() {}), Ia(s, "contextmenu", function(a) { var b; for (b in E) E[b].isPressed && E[b].endDrag() }), Sa.create = function(a, c) { "string" == typeof a && (a = b.selector(a)); for (var d = a && 0 !== a.length ? Ea(a) ? Fa(a) : [a] : [], e = d.length; --e > -1;) d[e] = new Sa(d[e], c); return d }, Sa.get = function(a) { return E[(_(a) || {})._gsDragID] }, Sa.timeSinceDrag = function() { return (A() - J) / 1e3 };
            var Ua = {},
                Va = function(a) { var b, c, d = 0,
                        e = 0; for (a = _(a), b = a.offsetWidth, c = a.offsetHeight; a;) d += a.offsetTop, e += a.offsetLeft, a = a.offsetParent; return { top: d, left: e, width: b, height: c } },
                Wa = function(a, b) { if (a === window) return Ua.left = Ua.top = 0, Ua.width = Ua.right = t.clientWidth || a.innerWidth || s.body.clientWidth || 0, Ua.height = Ua.bottom = (a.innerHeight || 0) - 20 < t.clientHeight ? t.clientHeight : a.innerHeight || s.body.clientHeight || 0, Ua; var c = a.pageX !== b ? { left: a.pageX - U(), top: a.pageY - T(), right: a.pageX - U() + 1, bottom: a.pageY - T() + 1 } : a.nodeType || a.left === b || a.top === b ? B ? Va(a) : _(a).getBoundingClientRect() : a; return c.right === b && c.width !== b ? (c.right = c.left + c.width, c.bottom = c.top + c.height) : c.width === b && (c = { width: c.right - c.left, height: c.bottom - c.top, right: c.right, left: c.left, bottom: c.bottom, top: c.top }), c };
            return Sa.hitTest = function(a, b, c) { if (a === b) return !1; var d, e, f, g = Wa(a),
                    h = Wa(b),
                    i = h.left > g.right || h.right < g.left || h.top > g.bottom || h.bottom < g.top; return i || !c ? !i : (f = -1 !== (c + "").indexOf("%"), c = parseFloat(c) || 0, d = { left: Math.max(g.left, h.left), top: Math.max(g.top, h.top) }, d.width = Math.min(g.right, h.right) - d.left, d.height = Math.min(g.bottom, h.bottom) - d.top, d.width < 0 || d.height < 0 ? !1 : f ? (c *= .01, e = d.width * d.height, e >= g.width * g.height * c || e >= h.width * h.height * c) : d.width > c && d.height > c) }, C.style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;", Sa
        }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(a) { "use strict"; var b = function() { return (_gsScope.GreenSockGlobals || _gsScope)[a] }; "function" == typeof define && define.amd ? define(["TweenLite", "CSSPlugin"], b) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), require("../plugins/CSSPlugin.js"), module.exports = b()) }("Draggable");


/*
 @overview es6-promise - a tiny implementation of Promises/A+.
 @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 @license   Licensed under MIT license
            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
 @version   2.0.1
 https://mths.be/punycode v1.3.1 by @mathias */
(function(m, r, R, S, E, L) {
    function La(a, b, c, d, e) { return ha(a, a, c, d, b, a.defaultView.pageXOffset, a.defaultView.pageYOffset).then(function(f) { p("Document cloned"); var g = "data-html2canvas-node" + e,
                h = "[" + g + "='" + e + "']";
            a.querySelector(h).removeAttribute(g); var g = f.contentWindow,
                n = g.document.querySelector(h); return ("function" === typeof b.onclone ? Promise.resolve(b.onclone(g.document)) : Promise.resolve(!0)).then(function() { return ia(n, f, b, c, d) }) }) }

    function ia(a, b, c, d, e) {
        var f = b.contentWindow,
            g = new T(f.document),
            h = new u(c, g),
            n = U(a);
        d = "view" === c.type ? d : Ma(f.document);
        e = "view" === c.type ? e : Na(f.document);
        var F = new c.renderer(d, e, h, c, r);
        return (new q(a, F, g, h, c)).ready.then(function() {
            p("Finished rendering");
            var d;
            d = "view" === c.type ? ja(F.canvas, { width: F.canvas.width, height: F.canvas.height, top: 0, left: 0, x: 0, y: 0 }) : a === f.document.body || a === f.document.documentElement || null != c.canvas ? F.canvas : ja(F.canvas, {
                width: null != c.width ? c.width : n.width,
                height: null != c.height ? c.height : n.height,
                top: n.top,
                left: n.left,
                x: f.pageXOffset,
                y: f.pageYOffset
            });
            c.removeContainer && (b.parentNode.removeChild(b), p("Cleaned up container"));
            return d
        })
    }

    function ja(a, b) {
        var c = r.createElement("canvas"),
            d = Math.min(a.width - 1, Math.max(0, b.left)),
            e = Math.min(a.width, Math.max(1, b.left + b.width)),
            f = Math.min(a.height - 1, Math.max(0, b.top)),
            g = Math.min(a.height, Math.max(1, b.top + b.height));
        c.width = b.width;
        c.height = b.height;
        p("Cropping canvas at:", "left:", b.left, "top:", b.top, "width:", e - d, "height:", g - f);
        p("Resulting crop with width", b.width, "and height", b.height,
            " with x", d, "and y", f);
        c.getContext("2d").drawImage(a, d, f, e - d, g - f, b.x, b.y, e - d, g - f);
        return c
    }

    function Ma(a) { return Math.max(Math.max(a.body.scrollWidth, a.documentElement.scrollWidth), Math.max(a.body.offsetWidth, a.documentElement.offsetWidth), Math.max(a.body.clientWidth, a.documentElement.clientWidth)) }

    function Na(a) { return Math.max(Math.max(a.body.scrollHeight, a.documentElement.scrollHeight), Math.max(a.body.offsetHeight, a.documentElement.offsetHeight), Math.max(a.body.clientHeight, a.documentElement.clientHeight)) }

    function ka() { return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" }

    function la(a, b) { for (var c = 3 === a.nodeType ? r.createTextNode(a.nodeValue) : a.cloneNode(!1), d = a.firstChild; d;) !0 !== b && 1 === d.nodeType && "SCRIPT" === d.nodeName || c.appendChild(la(d, b)), d = d.nextSibling; return c }

    function ha(a, b, c, d, e, f, g) {
        Oa(a);
        var h = r.documentMode && 9 >= r.documentMode ? la(a.documentElement, e.javascriptEnabled) : a.documentElement.cloneNode(!0),
            n = b.createElement("iframe");
        n.className = "html2canvas-container";
        n.style.visibility = "hidden";
        n.style.position = "fixed";
        n.style.left = "-10000px";
        n.style.top = "0px";
        n.style.border = "0";
        n.width = c;
        n.height = d;
        n.scrolling = "no";
        b.body.appendChild(n);
        return new Promise(function(b) {
            var c = n.contentWindow.document;
            ma(a.documentElement, h, "textarea");
            ma(a.documentElement, h, "select");
            n.contentWindow.onload = n.onload = function() { var d = setInterval(function() { 0 < c.body.childNodes.length && (Pa(a, c), clearInterval(d), "view" === e.type && n.contentWindow.scrollTo(f, g), b(n)) }, 50) };
            c.open();
            c.write("<!DOCTYPE html><html></html>");
            !a.defaultView || f === a.defaultView.pageXOffset && g === a.defaultView.pageYOffset || a.defaultView.scrollTo(f, g);
            c.replaceChild(!0 === e.javascriptEnabled ? c.adoptNode(h) : na(c.adoptNode(h)), c.documentElement);
            c.close()
        })
    }

    function ma(a, b, c) { a = a.getElementsByTagName(c);
        b = b.getElementsByTagName(c);
        c = a.length; for (var d = 0; d < c; d++) b[d].value = a[d].value }

    function oa(a, b, c, d, e, f) { return (new Qa(a, b, m.document)).then(Ra(a)).then(function(a) { return ha(a, c, d, e, f, 0, 0) }) }

    function Ra(a) {
        return function(b) {
            var c = new DOMParser,
                d;
            try { d = c.parseFromString(b, "text/html") } catch (e) { p("DOMParser not supported, falling back to createHTMLDocument");
                d = r.implementation.createHTMLDocument(""); try { d.open(), d.write(b), d.close() } catch (f) { p("createHTMLDocument write not supported, falling back to document.body.innerHTML"), d.body.innerHTML = b } } b = d.querySelector("base");
            b && b.href.host || (b = d.createElement("base"), b.href = a, d.head.insertBefore(b, d.head.firstChild));
            return d
        }
    }

    function Oa(a) {
        [].slice.call(a.querySelectorAll("canvas"), 0).forEach(function(a) {
            a.setAttribute("data-html2canvas-canvas-clone",
                "canvas-" + Sa++)
        })
    }

    function Pa(a, b) {
        [].slice.call(a.querySelectorAll("[data-html2canvas-canvas-clone]"), 0).forEach(function(a) { try { var c = b.querySelector('[data-html2canvas-canvas-clone="' + a.getAttribute("data-html2canvas-canvas-clone") + '"]');
                c && (c.width = a.width, c.height = a.height, c.getContext("2d").putImageData(a.getContext("2d").getImageData(0, 0, a.width, a.height), 0, 0)) } catch (e) { p("Unable to copy canvas content from", a, e) } a.removeAttribute("data-html2canvas-canvas-clone") }) }

    function na(a) {
        [].slice.call(a.childNodes,
            0).filter(Ta).forEach(function(b) { "SCRIPT" === b.tagName ? a.removeChild(b) : na(b) });
        return a
    }

    function Ta(a) { return a.nodeType === Node.ELEMENT_NODE }

    function Ua(a) { var b = r.createElement("a");
        b.href = a;
        b.href = b.href; return b }

    function t(a) { this.b = this.g = this.r = 0;
        this.a = null;
        this.fromArray(a) || this.namedColor(a) || this.rgb(a) || this.rgba(a) || this.hex6(a) || this.hex3(a) }

    function M(a) {
        this.src = a;
        p("DummyImageContainer for", a);
        if (!this.promise || !this.image) {
            p("Initiating DummyImageContainer");
            M.prototype.image = new Image;
            var b = this.image;
            M.prototype.promise = new Promise(function(a, d) { b.onload = a;
                b.onerror = d;
                b.src = ka();!0 === b.complete && a(b) })
        }
    }

    function Va(a, b) {
        var c = r.createElement("div"),
            d = r.createElement("img"),
            e = r.createElement("span"),
            f;
        c.style.visibility = "hidden";
        c.style.fontFamily = a;
        c.style.fontSize = b;
        c.style.margin = 0;
        c.style.padding = 0;
        r.body.appendChild(c);
        d.src = ka();
        d.width = 1;
        d.height = 1;
        d.style.margin = 0;
        d.style.padding = 0;
        d.style.verticalAlign = "baseline";
        e.style.fontFamily = a;
        e.style.fontSize = b;
        e.style.margin =
            0;
        e.style.padding = 0;
        e.appendChild(r.createTextNode("Hidden Text"));
        c.appendChild(e);
        c.appendChild(d);
        f = d.offsetTop - e.offsetTop + 1;
        c.removeChild(e);
        c.appendChild(r.createTextNode("Hidden Text"));
        c.style.lineHeight = "normal";
        d.style.verticalAlign = "super";
        d = d.offsetTop - c.offsetTop + 1;
        r.body.removeChild(c);
        this.baseline = f;
        this.lineWidth = 1;
        this.middle = d
    }

    function pa() { this.data = {} }

    function qa(a, b, c) {
        this.image = null;
        this.src = a;
        var d = this,
            e = U(a);
        this.promise = (b ? new Promise(function(b) {
            "about:blank" === a.contentWindow.document.URL ||
                null == a.contentWindow.document.documentElement ? a.contentWindow.onload = a.onload = function() { b(a) } : b(a)
        }) : this.proxyLoad(c.proxy, e, c)).then(function(a) { return html2canvas(a.contentWindow.document.documentElement, { type: "view", width: a.width, height: a.height, proxy: c.proxy, javascriptEnabled: c.javascriptEnabled, removeContainer: c.removeContainer, allowTaint: c.allowTaint, imageTimeout: c.imageTimeout / 2 }) }).then(function(a) { return d.image = a })
    }

    function N(a) {
        this.src = a.value;
        this.colorStops = [];
        this.type = null;
        this.y1 =
            this.x1 = this.y0 = this.x0 = .5;
        this.promise = Promise.resolve(!0)
    }

    function ba(a, b) { this.src = a;
        this.image = new Image; var c = this;
        this.tainted = null;
        this.promise = new Promise(function(d, e) { c.image.onload = d;
            c.image.onerror = e;
            b && (c.image.crossOrigin = "anonymous");
            c.image.src = a;!0 === c.image.complete && d(c.image) }) }

    function u(a, b) { this.link = null;
        this.options = a;
        this.support = b;
        this.origin = this.getOrigin(m.location.href) }

    function V(a) {
        N.apply(this, arguments);
        this.type = this.TYPES.LINEAR;
        var b = null === a.args[0].match(this.stepRegExp);
        b ? a.args[0].split(" ").reverse().forEach(function(a) { switch (a) {
                case "left":
                    this.x0 = 0;
                    this.x1 = 1; break;
                case "top":
                    this.y0 = 0;
                    this.y1 = 1; break;
                case "right":
                    this.x0 = 1;
                    this.x1 = 0; break;
                case "bottom":
                    this.y0 = 1;
                    this.y1 = 0; break;
                case "to":
                    a = this.y0; var b = this.x0;
                    this.y0 = this.y1;
                    this.x0 = this.x1;
                    this.x1 = b;
                    this.y1 = a } }, this) : (this.y0 = 0, this.y1 = 1);
        this.colorStops = a.args.slice(b ? 1 : 0).map(function(a) { a = a.match(this.stepRegExp); return { color: new t(a[1]), stop: "%" === a[3] ? a[2] / 100 : null } }, this);
        null === this.colorStops[0].stop &&
            (this.colorStops[0].stop = 0);
        null === this.colorStops[this.colorStops.length - 1].stop && (this.colorStops[this.colorStops.length - 1].stop = 1);
        this.colorStops.forEach(function(a, b) { null === a.stop && this.colorStops.slice(b).some(function(c, d) { return null !== c.stop ? (a.stop = (c.stop - this.colorStops[b - 1].stop) / (d + 1) + this.colorStops[b - 1].stop, !0) : !1 }, this) }, this)
    }

    function p() {
        m.html2canvas.logging && m.console && m.console.log && Function.prototype.bind.call(m.console.log, m.console).apply(m.console, [Date.now() - m.html2canvas.start +
            "ms", "html2canvas:"
        ].concat([].slice.call(arguments, 0)))
    }

    function k(a, b) { this.node = a;
        this.parent = b;
        this.borders = this.bounds = this.stack = null;
        this.clip = [];
        this.backgroundClip = [];
        this.computedStyles = this.visible = this.offsetBounds = null;
        this.colors = {};
        this.styles = {};
        this.transformMatrix = this.transformData = this.backgroundImages = null;
        this.isPseudoElement = !1;
        this.opacity = null }

    function Wa(a) { if (a && "matrix" === a[1]) return a[2].split(",").map(function(a) { return parseFloat(a.trim()) }) }

    function W(a) {
        return -1 !==
            a.toString().indexOf("%")
    }

    function ra(a) {
        var b, c, d, e, f, g = [],
            h = 0,
            n = 0,
            k, m, p = function() { b && ('"' === c.substr(0, 1) && (c = c.substr(1, c.length - 2)), c && m.push(c), "-" === b.substr(0, 1) && 0 < (e = b.indexOf("-", 1) + 1) && (d = b.substr(0, e), b = b.substr(e)), g.push({ prefix: d, method: b.toLowerCase(), value: f, args: m, image: null }));
                m = [];
                b = d = c = f = "" };
        m = [];
        b = d = c = f = "";
        a.split("").forEach(function(a) {
            if (!(0 === h && -1 < " \r\n\t".indexOf(a))) {
                switch (a) {
                    case '"':
                        k ? k === a && (k = null) : k = a;
                        break;
                    case "(":
                        if (!k) { if (0 === h) { h = 1;
                                f += a; return } n++ }
                        break;
                    case ")":
                        if (!k &&
                            1 === h) { if (0 === n) { h = 0;
                                f += a;
                                p(); return } n-- }
                        break;
                    case ",":
                        if (!k) { if (0 === h) { p(); return } if (1 === h && 0 === n && !b.match(/^url$/i)) { m.push(c);
                                c = "";
                                f += a; return } }
                }
                f += a;
                0 === h ? b += a : c += a
            }
        });
        p();
        return g
    }

    function Xa(a) { return a.replace("px", "") }

    function Ya(a) { return parseFloat(a) }

    function U(a) {
        if (a.getBoundingClientRect) {
            var b = a.getBoundingClientRect(),
                c = null == a.offsetWidth ? b.width : a.offsetWidth;
            return {
                top: b.top,
                bottom: b.bottom || b.top + b.height,
                right: b.left + c,
                left: b.left,
                width: c,
                height: null == a.offsetHeight ? b.height : a.offsetHeight
            }
        }
        return {}
    }

    function ca(a) { var b = a.offsetParent ? ca(a.offsetParent) : { top: 0, left: 0 }; return { top: a.offsetTop + b.top, bottom: a.offsetTop + a.offsetHeight + b.top, right: a.offsetLeft + b.left + a.offsetWidth, left: a.offsetLeft + b.left, width: a.offsetWidth, height: a.offsetHeight } }

    function q(a, b, c, d, e) {
        p("Starting NodeParser");
        this.renderer = b;
        this.options = e;
        this.range = null;
        this.support = c;
        this.renderQueue = [];
        this.stack = new G(!0, 1, a.ownerDocument, null);
        c = new k(a, null);
        e.background && b.rectangle(0, 0, b.width, b.height,
            new t(e.background));
        if (a === a.ownerDocument.documentElement) { var f = new k(c.color("backgroundColor").isTransparent() ? a.ownerDocument.body : a.ownerDocument.documentElement, null);
            b.rectangle(0, 0, b.width, b.height, f.color("backgroundColor")) } c.visibile = c.isElementVisible();
        this.createPseudoHideStyles(a.ownerDocument);
        this.disableAnimations(a.ownerDocument);
        this.nodes = [].concat.apply([], [c].concat(this.getChildren(c)).filter(function(a) { return a.visible = a.isElementVisible() }).map(this.getPseudoElements,
            this));
        this.fontMetrics = new pa;
        p("Fetched nodes, total:", this.nodes.length);
        p("Calculate overflow clips");
        this.calculateOverflowClips();
        p("Start fetching images");
        this.images = d.fetch(this.nodes.filter(O));
        this.ready = this.images.ready.then(X(function() {
            p("Images loaded, starting parsing");
            p("Creating stacking contexts");
            this.createStackingContexts();
            p("Sorting stacking contexts");
            this.sortStackingContexts(this.stack);
            this.parse(this.stack);
            p("Render queue created with " + this.renderQueue.length + " items");
            return new Promise(X(function(a) { e.async ? "function" === typeof e.async ? e.async.call(this, this.renderQueue, a) : 0 < this.renderQueue.length ? (this.renderIndex = 0, this.asyncRenderer(this.renderQueue, a)) : a() : (this.renderQueue.forEach(this.paint, this), a()) }, this))
        }, this))
    }

    function Za(a) { return a.replace(/(\-[a-z])/g, function(a) { return a.toUpperCase().replace("-", "") }) }

    function sa() {}

    function ta(a, b, c, d) {
        return a.map(function(e, f) {
            if (0 < e.width) {
                var g = b.left,
                    h = b.top,
                    n = b.width,
                    k = b.height - a[2].width;
                switch (f) {
                    case 0:
                        k =
                            a[0].width;
                        e.args = Y({ c1: [g, h], c2: [g + n, h], c3: [g + n - a[1].width, h + k], c4: [g + a[3].width, h + k] }, d[0], d[1], c.topLeftOuter, c.topLeftInner, c.topRightOuter, c.topRightInner);
                        break;
                    case 1:
                        g = b.left + b.width - a[1].width;
                        n = a[1].width;
                        e.args = Y({ c1: [g + n, h], c2: [g + n, h + k + a[2].width], c3: [g, h + k], c4: [g, h + a[0].width] }, d[1], d[2], c.topRightOuter, c.topRightInner, c.bottomRightOuter, c.bottomRightInner);
                        break;
                    case 2:
                        h = h + b.height - a[2].width;
                        k = a[2].width;
                        e.args = Y({ c1: [g + n, h + k], c2: [g, h + k], c3: [g + a[3].width, h], c4: [g + n - a[3].width, h] }, d[2],
                            d[3], c.bottomRightOuter, c.bottomRightInner, c.bottomLeftOuter, c.bottomLeftInner);
                        break;
                    case 3:
                        n = a[3].width, e.args = Y({ c1: [g, h + k + a[2].width], c2: [g, h], c3: [g + n, h + a[0].width], c4: [g + n, h + k] }, d[3], d[0], c.bottomLeftOuter, c.bottomLeftInner, c.topLeftOuter, c.topLeftInner)
                }
            }
            return e
        })
    }

    function C(a, b, c, d) {
        var e = (Math.sqrt(2) - 1) / 3 * 4,
            f = c * e,
            e = d * e;
        c = a + c;
        d = b + d;
        return {
            topLeft: H({ x: a, y: d }, { x: a, y: d - e }, { x: c - f, y: b }, { x: c, y: b }),
            topRight: H({ x: a, y: b }, { x: a + f, y: b }, { x: c, y: d - e }, { x: c, y: d }),
            bottomRight: H({ x: c, y: b }, { x: c, y: b + e }, {
                x: a +
                    f,
                y: d
            }, { x: a, y: d }),
            bottomLeft: H({ x: c, y: d }, { x: c - f, y: d }, { x: a, y: b + e }, { x: a, y: b })
        }
    }

    function ua(a, b, c) {
        var d = a.left,
            e = a.top,
            f = a.width;
        a = a.height;
        var g = b[0][0],
            h = b[0][1],
            n = b[1][0],
            k = b[1][1],
            m = b[2][0],
            p = b[2][1],
            r = b[3][0];
        b = b[3][1];
        var q = f - n,
            t = a - p,
            l = f - m,
            u = a - b;
        return {
            topLeftOuter: C(d, e, g, h).topLeft.subdivide(.5),
            topLeftInner: C(d + c[3].width, e + c[0].width, Math.max(0, g - c[3].width), Math.max(0, h - c[0].width)).topLeft.subdivide(.5),
            topRightOuter: C(d + q, e, n, k).topRight.subdivide(.5),
            topRightInner: C(d + Math.min(q, f + c[3].width),
                e + c[0].width, q > f + c[3].width ? 0 : n - c[3].width, k - c[0].width).topRight.subdivide(.5),
            bottomRightOuter: C(d + l, e + t, m, p).bottomRight.subdivide(.5),
            bottomRightInner: C(d + Math.min(l, f - c[3].width), e + Math.min(t, a + c[0].width), Math.max(0, m - c[1].width), p - c[2].width).bottomRight.subdivide(.5),
            bottomLeftOuter: C(d, e + u, r, b).bottomLeft.subdivide(.5),
            bottomLeftInner: C(d + c[3].width, e + u, Math.max(0, r - c[3].width), b - c[2].width).bottomLeft.subdivide(.5)
        }
    }

    function H(a, b, c, d) {
        var e = function(a, b, c) {
            return {
                x: a.x + (b.x - a.x) * c,
                y: a.y +
                    (b.y - a.y) * c
            }
        };
        return { start: a, startControl: b, endControl: c, end: d, subdivide: function(f) { var g = e(a, b, f),
                    h = e(b, c, f),
                    n = e(c, d, f),
                    k = e(g, h, f),
                    h = e(h, n, f);
                f = e(k, h, f); return [H(a, g, k, f), H(f, h, n, d)] }, curveTo: function(a) { a.push(["bezierCurve", b.x, b.y, c.x, c.y, d.x, d.y]) }, curveToReversed: function(d) { d.push(["bezierCurve", c.x, c.y, b.x, b.y, a.x, a.y]) } }
    }

    function Y(a, b, c, d, e, f, g) {
        var h = [];
        0 < b[0] || 0 < b[1] ? (h.push(["line", d[1].start.x, d[1].start.y]), d[1].curveTo(h)) : h.push(["line", a.c1[0], a.c1[1]]);
        0 < c[0] || 0 < c[1] ? (h.push(["line",
            f[0].start.x, f[0].start.y
        ]), f[0].curveTo(h), h.push(["line", g[0].end.x, g[0].end.y]), g[0].curveToReversed(h)) : (h.push(["line", a.c2[0], a.c2[1]]), h.push(["line", a.c3[0], a.c3[1]]));
        0 < b[0] || 0 < b[1] ? (h.push(["line", e[1].end.x, e[1].end.y]), e[1].curveToReversed(h)) : h.push(["line", a.c4[0], a.c4[1]]);
        return h
    }

    function D(a, b, c, d, e, f, g) { 0 < b[0] || 0 < b[1] ? (a.push(["line", d[0].start.x, d[0].start.y]), d[0].curveTo(a), d[1].curveTo(a)) : a.push(["line", f, g]);
        (0 < c[0] || 0 < c[1]) && a.push(["line", e[0].start.x, e[0].start.y]) }

    function $a(a) {
        return 0 >
            a.cssInt("zIndex")
    }

    function ab(a) { return 0 < a.cssInt("zIndex") }

    function va(a) { return 0 === a.cssInt("zIndex") }

    function wa(a) { return -1 !== ["inline", "inline-block", "inline-table"].indexOf(a.css("display")) }

    function bb(a) { return 0 < a.node.data.trim().length }

    function cb(a) { return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function(b) { b = a.css("border" + b + "Radius").split(" ");
            1 >= b.length && (b[1] = b[0]); return b.map(db) }) }

    function eb(a) { return a.nodeType === Node.TEXT_NODE || a.nodeType === Node.ELEMENT_NODE }

    function P(a) { return "static" !== a.css("position") }

    function da(a) { return "none" !== a.css("float") }

    function Q(a) { var b = this; return function() { return !a.apply(b, arguments) } }

    function O(a) { return a.node.nodeType === Node.ELEMENT_NODE }

    function ea(a) { return a.node.nodeType === Node.TEXT_NODE }

    function fb(a) { return function(b, c) { return b.cssInt("zIndex") + a.indexOf(b) / a.length - (c.cssInt("zIndex") + a.indexOf(c) / a.length) } }

    function X(a, b) { return function() { return a.apply(b, arguments) } }

    function db(a) {
        return parseInt(a,
            10)
    }

    function gb(a) { return a.width }

    function hb(a) { return a.node.nodeType !== Node.ELEMENT_NODE || -1 === "SCRIPT HEAD TITLE OBJECT BR OPTION".split(" ").indexOf(a.node.nodeName) }

    function ib(a) { for (var b = [], c = 0, d = !1, e; a.length;) - 1 !== [32, 13, 10, 9, 45].indexOf(a[c]) === d ? (e = a.splice(0, c), e.length && b.push(m.html2canvas.punycode.ucs2.encode(e)), d = !d, c = 0) : c++, c >= a.length && (e = a.splice(0, c), e.length && b.push(m.html2canvas.punycode.ucs2.encode(e))); return b }

    function Qa(a, b, c) {
        if (!b) return Promise.reject("No proxy configured");
        var d = xa(ya);
        a = za(b, a, d);
        return ya ? Aa(a) : Ba(c, a, d).then(function(a) { return Ca(a.content) })
    }

    function jb(a, b, c) { var d = xa(Da);
        a = za(b, a, d); return Da ? Promise.resolve(a) : Ba(c, a, d).then(function(a) { return "data:" + a.type + ";base64," + a.content }) }

    function Ba(a, b, c) { return new Promise(function(d, e) { var f = a.createElement("script"),
                g = function() { delete m.html2canvas.proxy[c];
                    a.body.removeChild(f) };
            m.html2canvas.proxy[c] = function(a) { g();
                d(a) };
            f.src = b;
            f.onerror = function(a) { g();
                e(a) };
            a.body.appendChild(f) }) }

    function xa(a) {
        return a ?
            "" : "html2canvas_" + Date.now() + "_" + ++kb + "_" + Math.round(1E5 * Math.random())
    }

    function za(a, b, c) { return a + "?url=" + encodeURIComponent(b) + (c.length ? "&callback=html2canvas.proxy." + c : "") }

    function lb(a, b) { r.createElement("script"); var c = r.createElement("a");
        c.href = a;
        this.src = a = c.href;
        this.image = new Image; var d = this;
        this.promise = new Promise(function(c, f) { d.image.crossOrigin = "Anonymous";
            d.image.onload = c;
            d.image.onerror = f;
            (new jb(a, b, r)).then(function(a) { d.image.src = a })["catch"](f) }) }

    function v(a, b, c) {
        k.call(this,
            a, b);
        this.isPseudoElement = !0;
        this.before = ":before" === c
    }

    function w(a, b, c, d, e) { this.width = a;
        this.height = b;
        this.images = c;
        this.options = d;
        this.document = e }

    function G(a, b, c, d) { k.call(this, c, d);
        this.ownStacking = a;
        this.contexts = [];
        this.children = [];
        this.opacity = (this.parent ? this.parent.stack.opacity : 1) * b }

    function T(a) { this.rangeBounds = this.testRangeBounds(a);
        this.cors = this.testCORS();
        this.svg = this.testSVG() }

    function A(a) {
        this.src = a;
        this.image = null;
        var b = this;
        this.promise = this.hasFabric().then(function() {
            return b.isInline(a) ?
                Promise.resolve(b.inlineFormatting(a)) : Aa(a)
        }).then(function(a) { return new Promise(function(c) { html2canvas.fabric.loadSVGFromString(a, b.createCanvas.call(b, c)) }) })
    }

    function Ca(a) {
        var b = a.length,
            c, d, e, f, g, h, n = "";
        for (c = 0; c < b; c += 4) d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a[c]), e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a[c + 1]), f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a[c + 2]), g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a[c +
            3]), d = d << 2 | e >> 4, e = (e & 15) << 4 | f >> 2, h = (f & 3) << 6 | g, n = 64 === f ? n + String.fromCharCode(d) : 64 === g || -1 === g ? n + String.fromCharCode(d, e) : n + String.fromCharCode(d, e, h);
        return n
    }

    function Ea(a, b) {
        this.src = a;
        this.image = null;
        var c = this;
        this.promise = b ? new Promise(function(b, e) { c.image = new Image;
            c.image.onload = b;
            c.image.onerror = e;
            c.image.src = "data:image/svg+xml," + (new XMLSerializer).serializeToString(a);!0 === c.image.complete && b(c.image) }) : this.hasFabric().then(function() {
            return new Promise(function(b) {
                html2canvas.fabric.parseSVGDocument(a,
                    c.createCanvas.call(c, b))
            })
        })
    }

    function I(a, b) { k.call(this, a, b) }

    function mb(a, b, c) { if (0 < a.length) return b + c.toUpperCase() }

    function Fa(a) { N.apply(this, arguments);
        this.type = "linear" === a.args[0] ? this.TYPES.LINEAR : this.TYPES.RADIAL }

    function Aa(a) { return new Promise(function(b, c) { var d = new XMLHttpRequest;
            d.open("GET", a);
            d.onload = function() { 200 === d.status ? b(d.responseText) : c(Error(d.statusText)) };
            d.onerror = function() { c(Error("Network Error")) };
            d.send() }) }

    function l(a, b) {
        w.apply(this, arguments);
        this.canvas =
            this.options.canvas || this.document.createElement("canvas");
        this.options.canvas || (this.canvas.width = a, this.canvas.height = b);
        this.ctx = this.canvas.getContext("2d");
        this.taintCtx = this.document.createElement("canvas").getContext("2d");
        this.ctx.textBaseline = "bottom";
        this.variables = {};
        p("Initialized CanvasRenderer with size", a, "x", b)
    }

    function nb(a) { return 0 < a.length }(function() {
        function a(a, b) { J[K] = a;
            J[K + 1] = b;
            K += 2;
            2 === K && Ha() }

        function b(a) { return "function" === typeof a }

        function c() { return function() { process.nextTick(g) } }

        function d() { var a = 0,
                b = new Ia(g),
                c = r.createTextNode("");
            b.observe(c, { characterData: !0 }); return function() { c.data = a = ++a % 2 } }

        function e() { var a = new MessageChannel;
            a.port1.onmessage = g; return function() { a.port2.postMessage(0) } }

        function f() { return function() { setTimeout(g, 1) } }

        function g() { for (var a = 0; a < K; a += 2)(0, J[a])(J[a + 1]), J[a] = void 0, J[a + 1] = void 0;
            K = 0 }

        function h() {}

        function n(a, b, c, d) { try { a.call(b, c, d) } catch (qb) { return qb } }

        function k(b, c, d) {
            a(function(a) {
                var b = !1,
                    e = n(d, c, function(d) {
                        b || (b = !0, c !== d ? q(a,
                            d) : l(a, d))
                    }, function(c) { b || (b = !0, x(a, c)) });
                !b && e && (b = !0, x(a, e))
            }, b)
        }

        function p(a, b) { 1 === b.a ? l(a, b.b) : 2 === a.a ? x(a, b.b) : u(b, void 0, function(b) { q(a, b) }, function(b) { x(a, b) }) }

        function q(a, c) { if (a === c) x(a, new TypeError("You cannot resolve a promise with itself"));
            else if ("function" === typeof c || "object" === typeof c && null !== c)
                if (c.constructor === a.constructor) p(a, c);
                else { var d; try { d = c.then } catch (pb) { Z.error = pb, d = Z } d === Z ? x(a, Z.error) : void 0 === d ? l(a, c) : b(d) ? k(a, c, d) : l(a, c) } else l(a, c) }

        function t(a) {
            a.f && a.f(a.b);
            v(a)
        }

        function l(b, c) { void 0 === b.a && (b.b = c, b.a = 1, 0 !== b.e.length && a(v, b)) }

        function x(b, c) { void 0 === b.a && (b.a = 2, b.b = c, a(t, b)) }

        function u(b, c, d, e) { var f = b.e,
                g = f.length;
            b.f = null;
            f[g] = c;
            f[g + 1] = d;
            f[g + 2] = e;
            0 === g && b.a && a(v, b) }

        function v(a) { var b = a.e,
                c = a.a; if (0 !== b.length) { for (var d, e, f = a.b, g = 0; g < b.length; g += 3) d = b[g], e = b[g + c], d ? z(c, d, e, f) : e(f);
                a.e.length = 0 } }

        function w() { this.error = null }

        function z(a, c, d, e) {
            var f = b(d),
                g, h, n, Ga;
            if (f) {
                try { g = d(e) } catch (rb) { fa.error = rb, g = fa } g === fa ? (Ga = !0, h = g.error, g = null) : n = !0;
                if (c ===
                    g) { x(c, new TypeError("A promises callback cannot return that same promise.")); return }
            } else g = e, n = !0;
            void 0 === c.a && (f && n ? q(c, g) : Ga ? x(c, h) : 1 === a ? l(c, g) : 2 === a && x(c, g))
        }

        function A(a, b) { try { b(function(b) { q(a, b) }, function(b) { x(a, b) }) } catch (ob) { x(a, ob) } }

        function y(a, b, c, d) { this.n = a;
            this.c = new a(h, d);
            this.i = c;
            this.o(b) ? (this.m = b, this.d = this.length = b.length, this.l(), 0 === this.length ? l(this.c, this.b) : (this.length = this.length || 0, this.k(), 0 === this.d && l(this.c, this.b))) : x(this.c, this.p()) }

        function B(a) {
            sb++;
            this.b =
                this.a = void 0;
            this.e = [];
            if (h !== a) { if (!b(a)) throw new TypeError("You must pass a resolver function as the first argument to the promise constructor"); if (!(this instanceof B)) throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
                A(this, a) }
        }
        var Ja = Array.isArray ? Array.isArray : function(a) { return "[object Array]" === Object.prototype.toString.call(a) },
            K = 0,
            aa = "undefined" !== typeof m ? m : {},
            Ia = aa.MutationObserver || aa.WebKitMutationObserver,
            aa = "undefined" !== typeof Uint8ClampedArray && "undefined" !== typeof importScripts && "undefined" !== typeof MessageChannel,
            J = Array(1E3),
            Ha;
        Ha = "undefined" !== typeof process && "[object process]" === {}.toString.call(process) ? c() : Ia ? d() : aa ? e() : f();
        var Z = new w,
            fa = new w;
        y.prototype.o = function(a) { return Ja(a) };
        y.prototype.p = function() { return Error("Array Methods must be provided an Array") };
        y.prototype.l = function() { this.b = Array(this.length) };
        y.prototype.k = function() {
            for (var a = this.length, b = this.c, c = this.m, d = 0; void 0 ===
                b.a && d < a; d++) this.j(c[d], d)
        };
        y.prototype.j = function(a, b) { var c = this.n; "object" === typeof a && null !== a ? a.constructor === c && void 0 !== a.a ? (a.f = null, this.g(a.a, b, a.b)) : this.q(c.resolve(a), b) : (this.d--, this.b[b] = this.h(a)) };
        y.prototype.g = function(a, b, c) { var d = this.c;
            void 0 === d.a && (this.d--, this.i && 2 === a ? x(d, c) : this.b[b] = this.h(c));
            0 === this.d && l(d, this.b) };
        y.prototype.h = function(a) { return a };
        y.prototype.q = function(a, b) { var c = this;
            u(a, void 0, function(a) { c.g(1, b, a) }, function(a) { c.g(2, b, a) }) };
        var sb = 0;
        B.all =
            function(a, b) { return (new y(this, a, !0, b)).c };
        B.race = function(a, b) {
            function c(a) { q(e, a) }

            function d(a) { x(e, a) } var e = new this(h, b); if (!Ja(a)) return x(e, new TypeError("You must pass an array to race.")), e; for (var f = a.length, g = 0; void 0 === e.a && g < f; g++) u(this.resolve(a[g]), void 0, c, d); return e };
        B.resolve = function(a, b) { if (a && "object" === typeof a && a.constructor === this) return a; var c = new this(h, b);
            q(c, a); return c };
        B.reject = function(a, b) { var c = new this(h, b);
            x(c, a); return c };
        B.prototype = {
            constructor: B,
            then: function(b,
                c) { var d = this.a; if (1 === d && !b || 2 === d && !c) return this; var e = new this.constructor(h),
                    f = this.b; if (d) { var g = arguments[d - 1];
                    a(function() { z(d, e, g, f) }) } else u(this, e, b, c); return e },
            "catch": function(a) { return this.then(null, a) }
        };
        var ga = {
            Promise: B,
            polyfill: function() {
                var a;
                a = "undefined" !== typeof S ? S : "undefined" !== typeof m && m.document ? m : self;
                "Promise" in a && "resolve" in a.Promise && "reject" in a.Promise && "all" in a.Promise && "race" in a.Promise && function() { var c;
                    new a.Promise(function(a) { c = a }); return b(c) }() || (a.Promise =
                    B)
            }
        };
        "function" === typeof E && E.amd ? E(function() { return ga }) : "undefined" !== typeof module && module.exports ? module.exports = ga : "undefined" !== typeof this && (this.ES6Promise = ga)
    }).call(m);
    m && m.ES6Promise.polyfill();
    if ("undefined" === typeof r || "function" !== typeof Object.create || "function" !== typeof r.createElement("canvas").getContext)(m || module.exports).html2canvas = function() { return Promise.reject("No canvas support") };
    else {
        (function(a) {
            function b(a) { throw RangeError(v[a]); }

            function c(a, b) {
                for (var c = a.length,
                        d = []; c--;) d[c] = b(a[c]);
                return d
            }

            function d(a, b) { var d = a.split("@"),
                    e = "";
                1 < d.length && (e = d[0] + "@", a = d[1]);
                d = a.split(u);
                d = c(d, b).join("."); return e + d }

            function e(a) { for (var b = [], c = 0, d = a.length, e, f; c < d;) e = a.charCodeAt(c++), 55296 <= e && 56319 >= e && c < d ? (f = a.charCodeAt(c++), 56320 == (f & 64512) ? b.push(((e & 1023) << 10) + (f & 1023) + 65536) : (b.push(e), c--)) : b.push(e); return b }

            function f(a) { return c(a, function(a) { var b = "";
                    65535 < a && (a -= 65536, b += w(a >>> 10 & 1023 | 55296), a = 56320 | a & 1023); return b += w(a) }).join("") }

            function g(a, b) {
                return a +
                    22 + 75 * (26 > a) - ((0 != b) << 5)
            }

            function h(a, b, c) { var d = 0;
                a = c ? z(a / 700) : a >> 1; for (a += z(a / b); 455 < a; d += 36) a = z(a / 35); return z(d + 36 * a / (a + 38)) }

            function n(a) {
                var c = [],
                    d = a.length,
                    e, g = 0,
                    n = 128,
                    k = 72,
                    m, q, p, l, r;
                m = a.lastIndexOf("-");
                0 > m && (m = 0);
                for (q = 0; q < m; ++q) 128 <= a.charCodeAt(q) && b("not-basic"), c.push(a.charCodeAt(q));
                for (m = 0 < m ? m + 1 : 0; m < d;) {
                    q = g;
                    e = 1;
                    for (p = 36;; p += 36) {
                        m >= d && b("invalid-input");
                        l = a.charCodeAt(m++);
                        l = 10 > l - 48 ? l - 22 : 26 > l - 65 ? l - 65 : 26 > l - 97 ? l - 97 : 36;
                        (36 <= l || l > z((2147483647 - g) / e)) && b("overflow");
                        g += l * e;
                        r = p <= k ? 1 : p >= k +
                            26 ? 26 : p - k;
                        if (l < r) break;
                        l = 36 - r;
                        e > z(2147483647 / l) && b("overflow");
                        e *= l
                    }
                    e = c.length + 1;
                    k = h(g - q, e, 0 == q);
                    z(g / e) > 2147483647 - n && b("overflow");
                    n += z(g / e);
                    g %= e;
                    c.splice(g++, 0, n)
                }
                return f(c)
            }

            function k(a) {
                var c, d, f, n, k, l, m, q, p, r = [],
                    t, u, v;
                a = e(a);
                t = a.length;
                c = 128;
                d = 0;
                k = 72;
                for (l = 0; l < t; ++l) p = a[l], 128 > p && r.push(w(p));
                for ((f = n = r.length) && r.push("-"); f < t;) {
                    m = 2147483647;
                    for (l = 0; l < t; ++l) p = a[l], p >= c && p < m && (m = p);
                    u = f + 1;
                    m - c > z((2147483647 - d) / u) && b("overflow");
                    d += (m - c) * u;
                    c = m;
                    for (l = 0; l < t; ++l)
                        if (p = a[l], p < c && 2147483647 < ++d && b("overflow"),
                            p == c) { q = d; for (m = 36;; m += 36) { p = m <= k ? 1 : m >= k + 26 ? 26 : m - k; if (q < p) break;
                                v = q - p;
                                q = 36 - p;
                                r.push(w(g(p + v % q, 0)));
                                q = z(v / q) } r.push(w(g(q, 0)));
                            k = h(d, u, f == n);
                            d = 0;++f }++ d;
                    ++c
                }
                return r.join("")
            }
            var m = "object" == typeof R && R && !R.nodeType && R,
                p = "object" == typeof module && module && !module.nodeType && module,
                q = "object" == typeof S && S;
            if (q.global === q || q.window === q || q.self === q) a = q;
            var l, r = /^xn--/,
                t = /[^\x20-\x7E]/,
                u = /[\x2E\u3002\uFF0E\uFF61]/g,
                v = {
                    overflow: "Overflow: input needs wider integers to process",
                    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                    "invalid-input": "Invalid input"
                },
                z = Math.floor,
                w = String.fromCharCode,
                y;
            l = { version: "1.3.1", ucs2: { decode: e, encode: f }, decode: n, encode: k, toASCII: function(a) { return d(a, function(a) { return t.test(a) ? "xn--" + k(a) : a }) }, toUnicode: function(a) { return d(a, function(a) { return r.test(a) ? n(a.slice(4).toLowerCase()) : a }) } };
            if ("function" == typeof E && "object" == typeof E.amd && E.amd) E("punycode", function() { return l });
            else if (m && p)
                if (module.exports == m) p.exports = l;
                else
                    for (y in l) l.hasOwnProperty(y) && (m[y] = l[y]);
            else a.punycode =
                l
        })(this);
        var Sa = 0,
            tb = 0;
        m.html2canvas = function(a, b) {
            var c = tb++;
            b = b || {};
            b.logging && (m.html2canvas.logging = !0, m.html2canvas.start = Date.now());
            b.async = "undefined" === typeof b.async ? !0 : b.async;
            b.allowTaint = "undefined" === typeof b.allowTaint ? !1 : b.allowTaint;
            b.removeContainer = "undefined" === typeof b.removeContainer ? !0 : b.removeContainer;
            b.javascriptEnabled = "undefined" === typeof b.javascriptEnabled ? !1 : b.javascriptEnabled;
            b.imageTimeout = "undefined" === typeof b.imageTimeout ? 1E4 : b.imageTimeout;
            b.renderer = "function" ===
                typeof b.renderer ? b.renderer : l;
            b.strict = !!b.strict;
            if ("string" === typeof a) { if ("string" !== typeof b.proxy) return Promise.reject("Proxy must be used when rendering url"); var d = null != b.width ? b.width : m.innerWidth,
                    e = null != b.height ? b.height : m.innerHeight; return oa(Ua(a), b.proxy, r, d, e, b).then(function(a) { return ia(a.contentWindow.document.documentElement, a, b, d, e) }) }
            var f = (a === L ? [r.documentElement] : a.length ? a : [a])[0];
            f.setAttribute("data-html2canvas-node" + c, c);
            return La(f.ownerDocument, b, f.ownerDocument.defaultView.innerWidth,
                f.ownerDocument.defaultView.innerHeight, c).then(function(a) { "function" === typeof b.onrendered && (p("options.onrendered is deprecated, html2canvas returns a Promise containing the canvas"), b.onrendered(a)); return a })
        };
        m.html2canvas.punycode = this.punycode;
        m.html2canvas.proxy = {};
        t.prototype.darken = function(a) { a = 1 - a; return new t([Math.round(this.r * a), Math.round(this.g * a), Math.round(this.b * a), this.a]) };
        t.prototype.isTransparent = function() { return 0 === this.a };
        t.prototype.isBlack = function() {
            return 0 === this.r &&
                0 === this.g && 0 === this.b
        };
        t.prototype.fromArray = function(a) { Array.isArray(a) && (this.r = Math.min(a[0], 255), this.g = Math.min(a[1], 255), this.b = Math.min(a[2], 255), 3 < a.length && (this.a = a[3])); return Array.isArray(a) };
        var ub = /^#([a-f0-9]{3})$/i;
        t.prototype.hex3 = function(a) { null !== (a = a.match(ub)) && (this.r = parseInt(a[1][0] + a[1][0], 16), this.g = parseInt(a[1][1] + a[1][1], 16), this.b = parseInt(a[1][2] + a[1][2], 16)); return null !== a };
        var vb = /^#([a-f0-9]{6})$/i;
        t.prototype.hex6 = function(a) {
            null !== (a = a.match(vb)) && (this.r =
                parseInt(a[1].substring(0, 2), 16), this.g = parseInt(a[1].substring(2, 4), 16), this.b = parseInt(a[1].substring(4, 6), 16));
            return null !== a
        };
        var wb = /^rgb\((\d{1,3}) *, *(\d{1,3}) *, *(\d{1,3})\)$/;
        t.prototype.rgb = function(a) { null !== (a = a.match(wb)) && (this.r = Number(a[1]), this.g = Number(a[2]), this.b = Number(a[3])); return null !== a };
        var xb = /^rgba\((\d{1,3}) *, *(\d{1,3}) *, *(\d{1,3}) *, *(\d+\.?\d*)\)$/;
        t.prototype.rgba = function(a) {
            null !== (a = a.match(xb)) && (this.r = Number(a[1]), this.g = Number(a[2]), this.b = Number(a[3]),
                this.a = Number(a[4]));
            return null !== a
        };
        t.prototype.toString = function() { return null !== this.a && 1 !== this.a ? "rgba(" + [this.r, this.g, this.b, this.a].join() + ")" : "rgb(" + [this.r, this.g, this.b].join() + ")" };
        t.prototype.namedColor = function(a) { var b = yb[a.toLowerCase()]; if (b) this.r = b[0], this.g = b[1], this.b = b[2];
            else if ("transparent" === a.toLowerCase()) return this.r = this.g = this.b = this.a = 0, !0; return !!b };
        t.prototype.isColor = !0;
        var yb = {
            aliceblue: [240, 248, 255],
            antiquewhite: [250, 235, 215],
            aqua: [0, 255, 255],
            aquamarine: [127,
                255, 212
            ],
            azure: [240, 255, 255],
            beige: [245, 245, 220],
            bisque: [255, 228, 196],
            black: [0, 0, 0],
            blanchedalmond: [255, 235, 205],
            blue: [0, 0, 255],
            blueviolet: [138, 43, 226],
            brown: [165, 42, 42],
            burlywood: [222, 184, 135],
            cadetblue: [95, 158, 160],
            chartreuse: [127, 255, 0],
            chocolate: [210, 105, 30],
            coral: [255, 127, 80],
            cornflowerblue: [100, 149, 237],
            cornsilk: [255, 248, 220],
            crimson: [220, 20, 60],
            cyan: [0, 255, 255],
            darkblue: [0, 0, 139],
            darkcyan: [0, 139, 139],
            darkgoldenrod: [184, 134, 11],
            darkgray: [169, 169, 169],
            darkgreen: [0, 100, 0],
            darkgrey: [169, 169, 169],
            darkkhaki: [189, 183, 107],
            darkmagenta: [139, 0, 139],
            darkolivegreen: [85, 107, 47],
            darkorange: [255, 140, 0],
            darkorchid: [153, 50, 204],
            darkred: [139, 0, 0],
            darksalmon: [233, 150, 122],
            darkseagreen: [143, 188, 143],
            darkslateblue: [72, 61, 139],
            darkslategray: [47, 79, 79],
            darkslategrey: [47, 79, 79],
            darkturquoise: [0, 206, 209],
            darkviolet: [148, 0, 211],
            deeppink: [255, 20, 147],
            deepskyblue: [0, 191, 255],
            dimgray: [105, 105, 105],
            dimgrey: [105, 105, 105],
            dodgerblue: [30, 144, 255],
            firebrick: [178, 34, 34],
            floralwhite: [255, 250, 240],
            forestgreen: [34, 139, 34],
            fuchsia: [255, 0, 255],
            gainsboro: [220, 220, 220],
            ghostwhite: [248, 248, 255],
            gold: [255, 215, 0],
            goldenrod: [218, 165, 32],
            gray: [128, 128, 128],
            green: [0, 128, 0],
            greenyellow: [173, 255, 47],
            grey: [128, 128, 128],
            honeydew: [240, 255, 240],
            hotpink: [255, 105, 180],
            indianred: [205, 92, 92],
            indigo: [75, 0, 130],
            ivory: [255, 255, 240],
            khaki: [240, 230, 140],
            lavender: [230, 230, 250],
            lavenderblush: [255, 240, 245],
            lawngreen: [124, 252, 0],
            lemonchiffon: [255, 250, 205],
            lightblue: [173, 216, 230],
            lightcoral: [240, 128, 128],
            lightcyan: [224, 255, 255],
            lightgoldenrodyellow: [250,
                250, 210
            ],
            lightgray: [211, 211, 211],
            lightgreen: [144, 238, 144],
            lightgrey: [211, 211, 211],
            lightpink: [255, 182, 193],
            lightsalmon: [255, 160, 122],
            lightseagreen: [32, 178, 170],
            lightskyblue: [135, 206, 250],
            lightslategray: [119, 136, 153],
            lightslategrey: [119, 136, 153],
            lightsteelblue: [176, 196, 222],
            lightyellow: [255, 255, 224],
            lime: [0, 255, 0],
            limegreen: [50, 205, 50],
            linen: [250, 240, 230],
            magenta: [255, 0, 255],
            maroon: [128, 0, 0],
            mediumaquamarine: [102, 205, 170],
            mediumblue: [0, 0, 205],
            mediumorchid: [186, 85, 211],
            mediumpurple: [147, 112, 219],
            mediumseagreen: [60,
                179, 113
            ],
            mediumslateblue: [123, 104, 238],
            mediumspringgreen: [0, 250, 154],
            mediumturquoise: [72, 209, 204],
            mediumvioletred: [199, 21, 133],
            midnightblue: [25, 25, 112],
            mintcream: [245, 255, 250],
            mistyrose: [255, 228, 225],
            moccasin: [255, 228, 181],
            navajowhite: [255, 222, 173],
            navy: [0, 0, 128],
            oldlace: [253, 245, 230],
            olive: [128, 128, 0],
            olivedrab: [107, 142, 35],
            orange: [255, 165, 0],
            orangered: [255, 69, 0],
            orchid: [218, 112, 214],
            palegoldenrod: [238, 232, 170],
            palegreen: [152, 251, 152],
            paleturquoise: [175, 238, 238],
            palevioletred: [219, 112, 147],
            papayawhip: [255,
                239, 213
            ],
            peachpuff: [255, 218, 185],
            peru: [205, 133, 63],
            pink: [255, 192, 203],
            plum: [221, 160, 221],
            powderblue: [176, 224, 230],
            purple: [128, 0, 128],
            rebeccapurple: [102, 51, 153],
            red: [255, 0, 0],
            rosybrown: [188, 143, 143],
            royalblue: [65, 105, 225],
            saddlebrown: [139, 69, 19],
            salmon: [250, 128, 114],
            sandybrown: [244, 164, 96],
            seagreen: [46, 139, 87],
            seashell: [255, 245, 238],
            sienna: [160, 82, 45],
            silver: [192, 192, 192],
            skyblue: [135, 206, 235],
            slateblue: [106, 90, 205],
            slategray: [112, 128, 144],
            slategrey: [112, 128, 144],
            snow: [255, 250, 250],
            springgreen: [0,
                255, 127
            ],
            steelblue: [70, 130, 180],
            tan: [210, 180, 140],
            teal: [0, 128, 128],
            thistle: [216, 191, 216],
            tomato: [255, 99, 71],
            turquoise: [64, 224, 208],
            violet: [238, 130, 238],
            wheat: [245, 222, 179],
            white: [255, 255, 255],
            whitesmoke: [245, 245, 245],
            yellow: [255, 255, 0],
            yellowgreen: [154, 205, 50]
        };
        pa.prototype.getMetrics = function(a, b) { this.data[a + "-" + b] === L && (this.data[a + "-" + b] = new Va(a, b)); return this.data[a + "-" + b] };
        qa.prototype.proxyLoad = function(a, b, c) { var d = this.src; return oa(d.src, a, d.ownerDocument, b.width, b.height, c) };
        N.prototype.TYPES = { LINEAR: 1, RADIAL: 2 };
        u.prototype.findImages = function(a) { var b = [];
            a.reduce(function(a, b) { switch (b.node.nodeName) {
                    case "IMG":
                        return a.concat([{ args: [b.node.src], method: "url" }]);
                    case "svg":
                    case "IFRAME":
                        return a.concat([{ args: [b.node], method: b.node.nodeName }]) } return a }, []).forEach(this.addImage(b, this.loadImage), this); return b };
        u.prototype.findBackgroundImage = function(a, b) { b.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(a, this.loadImage), this); return a };
        u.prototype.addImage =
            function(a, b) { return function(c) { c.args.forEach(function(d) { this.imageExists(a, d) || (a.splice(0, 0, b.call(this, c)), p("Added image #" + a.length, "string" === typeof d ? d.substring(0, 100) : d)) }, this) } };
        u.prototype.hasImageBackground = function(a) { return "none" !== a.method };
        u.prototype.loadImage = function(a) {
            return "url" === a.method ? (a = a.args[0], !this.isSVG(a) || this.support.svg || this.options.allowTaint ? a.match(/data:image\/.*;base64,/i) ? new ba(a.replace(/url\(['"]{0,}|['"]{0,}\)$/ig, ""), !1) : this.isSameOrigin(a) || !0 ===
                this.options.allowTaint || this.isSVG(a) ? new ba(a, !1) : this.support.cors && !this.options.allowTaint && this.options.useCORS ? new ba(a, !0) : this.options.proxy ? new lb(a, this.options.proxy) : new M(a) : new A(a)) : "linear-gradient" === a.method ? new V(a) : "gradient" === a.method ? new Fa(a) : "svg" === a.method ? new Ea(a.args[0], this.support.svg) : "IFRAME" === a.method ? new qa(a.args[0], this.isSameOrigin(a.args[0].src), this.options) : new M(a)
        };
        u.prototype.isSVG = function(a) { return "svg" === a.substring(a.length - 3).toLowerCase() || A.prototype.isInline(a) };
        u.prototype.imageExists = function(a, b) { return a.some(function(a) { return a.src === b }) };
        u.prototype.isSameOrigin = function(a) { return this.getOrigin(a) === this.origin };
        u.prototype.getOrigin = function(a) { var b = this.link || (this.link = r.createElement("a"));
            b.href = a;
            b.href = b.href; return b.protocol + b.hostname + b.port };
        u.prototype.getPromise = function(a) { return this.timeout(a, this.options.imageTimeout)["catch"](function() { return (new M(a.src)).promise.then(function(b) { a.image = b }) }) };
        u.prototype.get = function(a) {
            var b =
                null;
            return this.images.some(function(c) { return (b = c).src === a }) ? b : null
        };
        u.prototype.fetch = function(a) { this.images = a.reduce(X(this.findBackgroundImage, this), this.findImages(a));
            this.images.forEach(function(a, c) { a.promise.then(function() { p("Succesfully loaded image #" + (c + 1), a) }, function(b) { p("Failed loading image #" + (c + 1), a, b) }) });
            this.ready = Promise.all(this.images.map(this.getPromise, this));
            p("Finished searching images"); return this };
        u.prototype.timeout = function(a, b) {
            var c, d = Promise.race([a.promise,
                new Promise(function(d, f) { c = setTimeout(function() { p("Timed out loading image", a);
                        f(a) }, b) })
            ]).then(function(a) { clearTimeout(c); return a });
            d["catch"](function() { clearTimeout(c) });
            return d
        };
        V.prototype = Object.create(N.prototype);
        V.prototype.stepRegExp = /((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/;
        k.prototype.cloneTo = function(a) {
            a.visible = this.visible;
            a.borders = this.borders;
            a.bounds = this.bounds;
            a.clip = this.clip;
            a.backgroundClip = this.backgroundClip;
            a.computedStyles =
                this.computedStyles;
            a.styles = this.styles;
            a.backgroundImages = this.backgroundImages;
            a.opacity = this.opacity
        };
        k.prototype.getOpacity = function() { return null === this.opacity ? this.opacity = this.cssFloat("opacity") : this.opacity };
        k.prototype.assignStack = function(a) { this.stack = a;
            a.children.push(this) };
        k.prototype.isElementVisible = function() {
            return this.node.nodeType === Node.TEXT_NODE ? this.parent.visible : "none" !== this.css("display") && "hidden" !== this.css("visibility") && !this.node.hasAttribute("data-html2canvas-ignore") &&
                ("INPUT" !== this.node.nodeName || "hidden" !== this.node.getAttribute("type"))
        };
        k.prototype.css = function(a) { this.computedStyles || (this.computedStyles = this.isPseudoElement ? this.parent.computedStyle(this.before ? ":before" : ":after") : this.computedStyle(null)); return this.styles[a] || (this.styles[a] = this.computedStyles[a]) };
        k.prototype.prefixedCss = function(a) {
            var b = ["webkit", "moz", "ms", "o"],
                c = this.css(a);
            c === L && b.some(function(b) { c = this.css(b + a.substr(0, 1).toUpperCase() + a.substr(1)); return c !== L }, this);
            return c ===
                L ? null : c
        };
        k.prototype.computedStyle = function(a) { return this.node.ownerDocument.defaultView.getComputedStyle(this.node, a) };
        k.prototype.cssInt = function(a) { a = parseInt(this.css(a), 10); return isNaN(a) ? 0 : a };
        k.prototype.color = function(a) { return this.colors[a] || (this.colors[a] = new t(this.css(a))) };
        k.prototype.cssFloat = function(a) { a = parseFloat(this.css(a)); return isNaN(a) ? 0 : a };
        k.prototype.fontWeight = function() { var a = this.css("fontWeight"); switch (parseInt(a, 10)) {
                case 401:
                    a = "bold"; break;
                case 400:
                    a = "normal" } return a };
        k.prototype.parseClip = function() { var a = this.css("clip").match(this.CLIP); return a ? { top: parseInt(a[1], 10), right: parseInt(a[2], 10), bottom: parseInt(a[3], 10), left: parseInt(a[4], 10) } : null };
        k.prototype.parseBackgroundImages = function() { return this.backgroundImages || (this.backgroundImages = ra(this.css("backgroundImage"))) };
        k.prototype.cssList = function(a, b) { var c = (this.css(a) || "").split(","),
                c = c[b || 0] || c[0] || "auto",
                c = c.trim().split(" ");
            1 === c.length && (c = [c[0], c[0]]); return c };
        k.prototype.parseBackgroundSize =
            function(a, b, c) { c = this.cssList("backgroundSize", c); var d; if (W(c[0])) d = a.width * parseFloat(c[0]) / 100;
                else { if (/contain|cover/.test(c[0])) return b = b.width / b.height, a.width / a.height < b ^ "contain" === c[0] ? { width: a.height * b, height: a.height } : { width: a.width, height: a.width / b };
                    d = parseInt(c[0], 10) } a = "auto" === c[0] && "auto" === c[1] ? b.height : "auto" === c[1] ? d / b.width * b.height : W(c[1]) ? a.height * parseFloat(c[1]) / 100 : parseInt(c[1], 10); "auto" === c[0] && (d = a / b.height * b.width); return { width: d, height: a } };
        k.prototype.parseBackgroundPosition =
            function(a, b, c, d) { c = this.cssList("backgroundPosition", c); var e;
                e = W(c[0]) ? (a.width - (d || b).width) * (parseFloat(c[0]) / 100) : parseInt(c[0], 10);
                a = "auto" === c[1] ? e / b.width * b.height : W(c[1]) ? (a.height - (d || b).height) * parseFloat(c[1]) / 100 : parseInt(c[1], 10); "auto" === c[0] && (e = a / b.height * b.width); return { left: e, top: a } };
        k.prototype.parseBackgroundRepeat = function(a) { return this.cssList("backgroundRepeat", a)[0] };
        k.prototype.parseTextShadows = function() {
            var a = this.css("textShadow"),
                b = [];
            if (a && "none" !== a)
                for (var a = a.match(this.TEXT_SHADOW_PROPERTY),
                        c = 0; a && c < a.length; c++) { var d = a[c].match(this.TEXT_SHADOW_VALUES);
                    b.push({ color: new t(d[0]), offsetX: d[1] ? parseFloat(d[1].replace("px", "")) : 0, offsetY: d[2] ? parseFloat(d[2].replace("px", "")) : 0, blur: d[3] ? d[3].replace("px", "") : 0 }) }
            return b
        };
        k.prototype.parseTransform = function() {
            if (!this.transformData)
                if (this.hasTransform()) { var a = this.parseBounds(),
                        b = this.prefixedCss("transformOrigin").split(" ").map(Xa).map(Ya);
                    b[0] += a.left;
                    b[1] += a.top;
                    this.transformData = { origin: b, matrix: this.parseTransformMatrix() } } else this.transformData = { origin: [0, 0], matrix: [1, 0, 0, 1, 0, 0] };
            return this.transformData
        };
        k.prototype.parseTransformMatrix = function() { if (!this.transformMatrix) { var a = this.prefixedCss("transform");
                this.transformMatrix = (a = a ? Wa(a.match(this.MATRIX_PROPERTY)) : null) ? a : [1, 0, 0, 1, 0, 0] } return this.transformMatrix };
        k.prototype.parseBounds = function() { return this.bounds || (this.bounds = this.hasTransform() ? ca(this.node) : U(this.node)) };
        k.prototype.hasTransform = function() {
            return "1,0,0,1,0,0" !== this.parseTransformMatrix().join(",") || this.parent &&
                this.parent.hasTransform()
        };
        k.prototype.getValue = function() { var a = this.node.value || ""; "SELECT" === this.node.tagName ? (a = this.node, a = (a = a.options[a.selectedIndex || 0]) ? a.text || "" : "") : "password" === this.node.type && (a = Array(a.length + 1).join("\u2022")); return 0 === a.length ? this.node.placeholder || "" : a };
        k.prototype.MATRIX_PROPERTY = /(matrix)\((.+)\)/;
        k.prototype.TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g;
        k.prototype.TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g;
        k.prototype.CLIP =
            /^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/;
        q.prototype.calculateOverflowClips = function() {
            this.nodes.forEach(function(a) {
                if (O(a)) {
                    !0 === a.isPseudoElement && a.appendToDOM();
                    a.borders = this.parseBorders(a);
                    var b = "hidden" === a.css("overflow") ? [a.borders.clip] : [],
                        c = a.parseClip();
                    c && -1 !== ["absolute", "fixed"].indexOf(a.css("position")) && b.push([
                        ["rect", a.bounds.left + c.left, a.bounds.top + c.top, c.right - c.left, c.bottom - c.top]
                    ]);
                    a.clip = a.parent && a.parent.clip.length ? a.parent.clip.concat(b) : b;
                    a.backgroundClip =
                        "hidden" !== a.css("overflow") ? a.clip.concat([a.borders.clip]) : a.clip;
                    !0 === a.isPseudoElement && a.cleanDOM()
                } else ea(a) && (a.clip = a.parent && a.parent.clip.length ? a.parent.clip : []);
                !0 !== a.isPseudoElement && (a.bounds = null)
            }, this)
        };
        q.prototype.asyncRenderer = function(a, b, c) { c = c || Date.now();
            this.paint(a[this.renderIndex++]);
            a.length === this.renderIndex ? b() : c + 20 > Date.now() ? this.asyncRenderer(a, b, c) : setTimeout(X(function() { this.asyncRenderer(a, b) }, this), 0) };
        q.prototype.createPseudoHideStyles = function(a) {
            this.createStyles(a,
                "." + v.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + ':before { content: "" !important; display: none !important; }.' + v.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER + ':after { content: "" !important; display: none !important; }')
        };
        q.prototype.disableAnimations = function(a) { this.createStyles(a, "* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; -webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}") };
        q.prototype.createStyles = function(a, b) { var c = a.createElement("style");
            c.innerHTML = b;
            a.body.appendChild(c) };
        q.prototype.getPseudoElements = function(a) { var b = [
                [a]
            ]; if (a.node.nodeType === Node.ELEMENT_NODE) { var c = this.getPseudoElement(a, ":before");
                a = this.getPseudoElement(a, ":after");
                c && b.push(c);
                a && b.push(a) } return [].concat.apply([], b) };
        q.prototype.getPseudoElement = function(a, b) {
            var c = a.computedStyle(b);
            if (!c || !c.content || "none" === c.content || "-moz-alt-content" === c.content || "none" === c.display) return null;
            var d, e = c.content,
                f = e.substr(0, 1);
            d = f === e.substr(e.length - 1) && f.match(/'|"/) ? e.substr(1, e.length - 2) : e;
            for (var g = "url" === d.substr(0, 3), e = r.createElement(g ? "img" : "html2canvaspseudoelement"), f = new v(e, a, b), h = c.length - 1; 0 <= h; h--) { var n = Za(c.item(h));
                e.style[n] = c[n] } e.className = v.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + v.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
            if (g) return e.src = ra(d)[0].args[0], [f];
            c = r.createTextNode(d);
            e.appendChild(c);
            return [f, new I(c, f)]
        };
        q.prototype.getChildren = function(a) {
            return [].concat.apply([],
                [].filter.call(a.node.childNodes, eb).map(function(b) { var c = [b.nodeType === Node.TEXT_NODE ? new I(b, a) : new k(b, a)].filter(hb); return b.nodeType === Node.ELEMENT_NODE && c.length && "TEXTAREA" !== b.tagName ? c[0].isElementVisible() ? c.concat(this.getChildren(c[0])) : [] : c }, this))
        };
        q.prototype.newStackingContext = function(a, b) { var c = new G(b, a.getOpacity(), a.node, a.parent);
            a.cloneTo(c);
            (b ? c.getParentStack(this) : c.parent.stack).contexts.push(c);
            a.stack = c };
        q.prototype.createStackingContexts = function() {
            this.nodes.forEach(function(a) {
                var b;
                if (b = O(a))(b = this.isRootElement(a) || 1 > a.getOpacity()) || (b = a.css("position"), b = "auto" !== (-1 !== ["absolute", "relative", "fixed"].indexOf(b) ? a.css("zIndex") : "auto")), b = b || this.isBodyWithTransparentRoot(a) || a.hasTransform();
                b ? this.newStackingContext(a, !0) : O(a) && (P(a) && va(a) || -1 !== ["inline-block", "inline-table"].indexOf(a.css("display")) || da(a)) ? this.newStackingContext(a, !1) : a.assignStack(a.parent.stack)
            }, this)
        };
        q.prototype.isBodyWithTransparentRoot = function(a) { return "BODY" === a.node.nodeName && a.parent.color("backgroundColor").isTransparent() };
        q.prototype.isRootElement = function(a) { return null === a.parent };
        q.prototype.sortStackingContexts = function(a) { a.contexts.sort(fb(a.contexts.slice(0)));
            a.contexts.forEach(this.sortStackingContexts, this) };
        q.prototype.parseTextBounds = function(a) {
            return function(b, c, d) {
                if ("none" !== a.parent.css("textDecoration").substr(0, 4) || 0 !== b.trim().length) {
                    if (this.support.rangeBounds && !a.parent.hasTransform()) return c = d.slice(0, c).join("").length, this.getRangeBounds(a.node, c, b.length);
                    if (a.node && "string" === typeof a.node.data) return b =
                        a.node.splitText(b.length), c = this.getWrapperBounds(a.node, a.parent.hasTransform()), a.node = b, c
                } else if (!this.support.rangeBounds || a.parent.hasTransform()) a.node = a.node.splitText(b.length);
                return {}
            }
        };
        q.prototype.getWrapperBounds = function(a, b) { var c = a.ownerDocument.createElement("html2canvaswrapper"),
                d = a.parentNode,
                e = a.cloneNode(!0);
            c.appendChild(a.cloneNode(!0));
            d.replaceChild(c, a); var f = b ? ca(c) : U(c);
            d.replaceChild(e, c); return f };
        q.prototype.getRangeBounds = function(a, b, c) {
            var d = this.range || (this.range =
                a.ownerDocument.createRange());
            d.setStart(a, b);
            d.setEnd(a, b + c);
            return d.getBoundingClientRect()
        };
        q.prototype.parse = function(a) {
            var b = a.contexts.filter($a),
                c = a.children.filter(O),
                d = c.filter(Q(da)),
                e = d.filter(Q(P)).filter(Q(wa)),
                c = c.filter(Q(P)).filter(da),
                f = d.filter(Q(P)).filter(wa),
                d = a.contexts.concat(d.filter(P)).filter(va),
                g = a.children.filter(ea).filter(bb);
            a = a.contexts.filter(ab);
            b.concat(e).concat(c).concat(f).concat(d).concat(g).concat(a).forEach(function(a) {
                this.renderQueue.push(a);
                a instanceof
                G && (this.parse(a), this.renderQueue.push(new sa))
            }, this)
        };
        q.prototype.paint = function(a) { try { a instanceof sa ? this.renderer.ctx.restore() : ea(a) ? (!0 === a.parent.isPseudoElement && a.parent.appendToDOM(), this.paintText(a), !0 === a.parent.isPseudoElement && a.parent.cleanDOM()) : this.paintNode(a) } catch (b) { if (p(b), this.options.strict) throw b; } };
        q.prototype.paintNode = function(a) {
            a instanceof G && (this.renderer.setOpacity(a.opacity), this.renderer.ctx.save(), a.hasTransform() && this.renderer.setTransform(a.parseTransform()));
            "INPUT" === a.node.nodeName && "checkbox" === a.node.type ? this.paintCheckbox(a) : "INPUT" === a.node.nodeName && "radio" === a.node.type ? this.paintRadio(a) : this.paintElement(a)
        };
        q.prototype.paintElement = function(a) {
            var b = a.parseBounds();
            this.renderer.clip(a.backgroundClip, function() { this.renderer.renderBackground(a, b, a.borders.borders.map(gb)) }, this);
            this.renderer.clip(a.clip, function() { this.renderer.renderBorders(a.borders.borders) }, this);
            this.renderer.clip(a.backgroundClip, function() {
                switch (a.node.nodeName) {
                    case "svg":
                    case "IFRAME":
                        var c =
                            this.images.get(a.node);
                        c ? this.renderer.renderImage(a, b, a.borders, c) : p("Error loading <" + a.node.nodeName + ">", a.node);
                        break;
                    case "IMG":
                        (c = this.images.get(a.node.src)) ? this.renderer.renderImage(a, b, a.borders, c): p("Error loading <img>", a.node.src);
                        break;
                    case "CANVAS":
                        this.renderer.renderImage(a, b, a.borders, { image: a.node });
                        break;
                    case "SELECT":
                    case "INPUT":
                    case "TEXTAREA":
                        this.paintFormValue(a)
                }
            }, this)
        };
        q.prototype.paintCheckbox = function(a) {
            var b = a.parseBounds(),
                c = Math.min(b.width, b.height),
                d = {
                    width: c -
                        1,
                    height: c - 1,
                    top: b.top,
                    left: b.left
                },
                b = [3, 3],
                e = [b, b, b, b],
                f = [1, 1, 1, 1].map(function(a) { return { color: new t("#A5A5A5"), width: a } }),
                g = ua(d, e, f);
            this.renderer.clip(a.backgroundClip, function() { this.renderer.rectangle(d.left + 1, d.top + 1, d.width - 2, d.height - 2, new t("#DEDEDE"));
                this.renderer.renderBorders(ta(f, d, g, e));
                a.node.checked && (this.renderer.font(new t("#424242"), "normal", "normal", "bold", c - 3 + "px", "arial"), this.renderer.text("\u2714", d.left + c / 6, d.top + c - 1)) }, this)
        };
        q.prototype.paintRadio = function(a) {
            var b =
                a.parseBounds(),
                c = Math.min(b.width, b.height) - 2;
            this.renderer.clip(a.backgroundClip, function() { this.renderer.circleStroke(b.left + 1, b.top + 1, c, new t("#DEDEDE"), 1, new t("#A5A5A5"));
                a.node.checked && this.renderer.circle(Math.ceil(b.left + c / 4) + 1, Math.ceil(b.top + c / 4) + 1, Math.floor(c / 2), new t("#424242")) }, this)
        };
        q.prototype.paintFormValue = function(a) {
            var b = a.getValue();
            if (0 < b.length) {
                var c = a.node.ownerDocument,
                    d = c.createElement("html2canvaswrapper");
                "lineHeight textAlign fontFamily fontWeight fontSize color paddingLeft paddingTop paddingRight paddingBottom width height borderLeftStyle borderTopStyle borderLeftWidth borderTopWidth boxSizing whiteSpace wordWrap".split(" ").forEach(function(b) {
                    try {
                        d.style[b] =
                            a.css(b)
                    } catch (g) { p("html2canvas: Parse: Exception caught in renderFormValue: " + g.message) }
                });
                var e = a.parseBounds();
                d.style.position = "fixed";
                d.style.left = e.left + "px";
                d.style.top = e.top + "px";
                d.textContent = b;
                c.body.appendChild(d);
                this.paintText(new I(d.firstChild, a));
                c.body.removeChild(d)
            }
        };
        q.prototype.paintText = function(a) {
            a.applyTextTransform();
            var b = m.html2canvas.punycode.ucs2.decode(a.node.data),
                c = this.options.letterRendering && !/^(normal|none|0px)$/.test(a.parent.css("letterSpacing")) || /[^\u0000-\u00ff]/.test(a.node.data) ?
                b.map(function(a) { return m.html2canvas.punycode.ucs2.encode([a]) }) : ib(b),
                b = a.parent.fontWeight(),
                d = a.parent.css("fontSize"),
                e = a.parent.css("fontFamily"),
                f = a.parent.parseTextShadows();
            this.renderer.font(a.parent.color("color"), a.parent.css("fontStyle"), a.parent.css("fontVariant"), b, d, e);
            f.length ? this.renderer.fontShadow(f[0].color, f[0].offsetX, f[0].offsetY, f[0].blur) : this.renderer.clearShadow();
            this.renderer.clip(a.parent.clip, function() {
                c.map(this.parseTextBounds(a), this).forEach(function(b, f) {
                    b &&
                        (this.renderer.text(c[f], b.left, b.bottom), this.renderTextDecoration(a.parent, b, this.fontMetrics.getMetrics(e, d)))
                }, this)
            }, this)
        };
        q.prototype.renderTextDecoration = function(a, b, c) {
            switch (a.css("textDecoration").split(" ")[0]) {
                case "underline":
                    this.renderer.rectangle(b.left, Math.round(b.top + c.baseline + c.lineWidth), b.width, 1, a.color("color"));
                    break;
                case "overline":
                    this.renderer.rectangle(b.left, Math.round(b.top), b.width, 1, a.color("color"));
                    break;
                case "line-through":
                    this.renderer.rectangle(b.left, Math.ceil(b.top +
                        c.middle + c.lineWidth), b.width, 1, a.color("color"))
            }
        };
        var Ka = { inset: [
                ["darken", .6],
                ["darken", .1],
                ["darken", .1],
                ["darken", .6]
            ] };
        q.prototype.parseBorders = function(a) {
            var b = a.parseBounds(),
                c = cb(a),
                d = ["Top", "Right", "Bottom", "Left"].map(function(b, c) { var d = a.css("border" + b + "Style"),
                        e = a.color("border" + b + "Color"); "inset" === d && e.isBlack() && (e = new t([255, 255, 255, e.a]));
                    d = Ka[d] ? Ka[d][c] : null; return { width: a.cssInt("border" + b + "Width"), color: d ? e[d[0]](d[1]) : e, args: null } }),
                e = ua(b, c, d);
            return {
                clip: this.parseBackgroundClip(a,
                    e, d, c, b),
                borders: ta(d, b, e, c)
            }
        };
        q.prototype.parseBackgroundClip = function(a, b, c, d, e) {
            var f = [];
            switch (a.css("backgroundClip")) {
                case "content-box":
                case "padding-box":
                    D(f, d[0], d[1], b.topLeftInner, b.topRightInner, e.left + c[3].width, e.top + c[0].width);
                    D(f, d[1], d[2], b.topRightInner, b.bottomRightInner, e.left + e.width - c[1].width, e.top + c[0].width);
                    D(f, d[2], d[3], b.bottomRightInner, b.bottomLeftInner, e.left + e.width - c[1].width, e.top + e.height - c[2].width);
                    D(f, d[3], d[0], b.bottomLeftInner, b.topLeftInner, e.left + c[3].width,
                        e.top + e.height - c[2].width);
                    break;
                default:
                    D(f, d[0], d[1], b.topLeftOuter, b.topRightOuter, e.left, e.top), D(f, d[1], d[2], b.topRightOuter, b.bottomRightOuter, e.left + e.width, e.top), D(f, d[2], d[3], b.bottomRightOuter, b.bottomLeftOuter, e.left + e.width, e.top + e.height), D(f, d[3], d[0], b.bottomLeftOuter, b.topLeftOuter, e.left, e.top + e.height)
            }
            return f
        };
        var kb = 0,
            ya = "withCredentials" in new XMLHttpRequest,
            Da = "crossOrigin" in new Image;
        v.prototype.cloneTo = function(a) {
            v.prototype.cloneTo.call(this, a);
            a.isPseudoElement = !0;
            a.before =
                this.before
        };
        v.prototype = Object.create(k.prototype);
        v.prototype.appendToDOM = function() { this.before ? this.parent.node.insertBefore(this.node, this.parent.node.firstChild) : this.parent.node.appendChild(this.node);
            this.parent.node.className += " " + this.getHideClass() };
        v.prototype.cleanDOM = function() { this.node.parentNode.removeChild(this.node);
            this.parent.node.className = this.parent.node.className.replace(this.getHideClass(), "") };
        v.prototype.getHideClass = function() {
            return this["PSEUDO_HIDE_ELEMENT_CLASS_" +
                (this.before ? "BEFORE" : "AFTER")]
        };
        v.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = "___html2canvas___pseudoelement_before";
        v.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER = "___html2canvas___pseudoelement_after";
        w.prototype.renderImage = function(a, b, c, d) {
            var e = a.cssInt("paddingLeft"),
                f = a.cssInt("paddingTop"),
                g = a.cssInt("paddingRight");
            a = a.cssInt("paddingBottom");
            c = c.borders;
            g = b.width - (c[1].width + c[3].width + e + g);
            a = b.height - (c[0].width + c[2].width + f + a);
            this.drawImage(d, 0, 0, d.image.width || g, d.image.height || a, b.left +
                e + c[3].width, b.top + f + c[0].width, g, a)
        };
        w.prototype.renderBackground = function(a, b, c) { 0 < b.height && 0 < b.width && (this.renderBackgroundColor(a, b), this.renderBackgroundImage(a, b, c)) };
        w.prototype.renderBackgroundColor = function(a, b) { var c = a.color("backgroundColor");
            c.isTransparent() || this.rectangle(b.left, b.top, b.width, b.height, c) };
        w.prototype.renderBorders = function(a) { a.forEach(this.renderBorder, this) };
        w.prototype.renderBorder = function(a) { a.color.isTransparent() || null === a.args || this.drawShape(a.args, a.color) };
        w.prototype.renderBackgroundImage = function(a, b, c) {
            a.parseBackgroundImages().reverse().forEach(function(d, e, f) { switch (d.method) {
                        case "url":
                            var g = this.images.get(d.args[0]);
                            g ? this.renderBackgroundRepeating(a, b, g, f.length - (e + 1), c) : p("Error loading background-image", d.args[0]); break;
                        case "linear-gradient":
                        case "gradient":
                            (e = this.images.get(d.value)) ? this.renderBackgroundGradient(e, b, c): p("Error loading background-image", d.args[0]); break;
                        case "none":
                            break;
                        default:
                            p("Unknown background-image type", d.args[0]) } },
                this)
        };
        w.prototype.renderBackgroundRepeating = function(a, b, c, d, e) {
            var f = a.parseBackgroundSize(b, c.image, d),
                g = a.parseBackgroundPosition(b, c.image, d, f);
            switch (a.parseBackgroundRepeat(d)) {
                case "repeat-x":
                case "repeat no-repeat":
                    this.backgroundRepeatShape(c, g, f, b, b.left + e[3], b.top + g.top + e[0], 99999, f.height, e);
                    break;
                case "repeat-y":
                case "no-repeat repeat":
                    this.backgroundRepeatShape(c, g, f, b, b.left + g.left + e[3], b.top + e[0], f.width, 99999, e);
                    break;
                case "no-repeat":
                    this.backgroundRepeatShape(c, g, f, b, b.left + g.left +
                        e[3], b.top + g.top + e[0], f.width, f.height, e);
                    break;
                default:
                    this.renderBackgroundRepeat(c, g, f, { top: b.top, left: b.left }, e[3], e[0])
            }
        };
        G.prototype = Object.create(k.prototype);
        G.prototype.getParentStack = function(a) { var b = this.parent ? this.parent.stack : null; return b ? b.ownStacking ? b : b.getParentStack(a) : a.stack };
        T.prototype.testRangeBounds = function(a) {
            var b, c, d = !1;
            a.createRange && (b = a.createRange(), b.getBoundingClientRect && (c = a.createElement("boundtest"), c.style.height = "123px", c.style.display = "block", a.body.appendChild(c),
                b.selectNode(c), b = b.getBoundingClientRect(), b = b.height, 123 === b && (d = !0), a.body.removeChild(c)));
            return d
        };
        T.prototype.testCORS = function() { return "undefined" !== typeof(new Image).crossOrigin };
        T.prototype.testSVG = function() { var a = new Image,
                b = r.createElement("canvas"),
                c = b.getContext("2d");
            a.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>"; try { c.drawImage(a, 0, 0), b.toDataURL() } catch (d) { return !1 } return !0 };
        A.prototype.hasFabric = function() { return html2canvas.fabric ? Promise.resolve() : Promise.reject(Error("html2canvas.svg.js is not loaded, cannot render svg")) };
        A.prototype.inlineFormatting = function(a) { return /^data:image\/svg\+xml;base64,/.test(a) ? this.decode64(this.removeContentType(a)) : this.removeContentType(a) };
        A.prototype.removeContentType = function(a) { return a.replace(/^data:image\/svg\+xml(;base64)?,/, "") };
        A.prototype.isInline = function(a) { return /^data:image\/svg\+xml/i.test(a) };
        A.prototype.createCanvas = function(a) {
            var b = this;
            return function(c, d) {
                var e = new html2canvas.fabric.StaticCanvas("c");
                b.image = e.lowerCanvasEl;
                e.setWidth(d.width).setHeight(d.height).add(html2canvas.fabric.util.groupSVGElements(c,
                    d)).renderAll();
                a(e.lowerCanvasEl)
            }
        };
        A.prototype.decode64 = function(a) { return "function" === typeof m.atob ? m.atob(a) : Ca(a) };
        Ea.prototype = Object.create(A.prototype);
        I.prototype = Object.create(k.prototype);
        I.prototype.applyTextTransform = function() { this.node.data = this.transform(this.parent.css("textTransform")) };
        I.prototype.transform = function(a) {
            var b = this.node.data;
            switch (a) {
                case "lowercase":
                    return b.toLowerCase();
                case "capitalize":
                    return b.replace(/(^|\s|:|-|\(|\))([a-z])/g, mb);
                case "uppercase":
                    return b.toUpperCase();
                default:
                    return b
            }
        };
        Fa.prototype = Object.create(N.prototype);
        l.prototype = Object.create(w.prototype);
        l.prototype.setFillStyle = function(a) { this.ctx.fillStyle = "object" === typeof a && a.isColor ? a.toString() : a; return this.ctx };
        l.prototype.rectangle = function(a, b, c, d, e) { this.setFillStyle(e).fillRect(a, b, c, d) };
        l.prototype.circle = function(a, b, c, d) { this.setFillStyle(d);
            this.ctx.beginPath();
            this.ctx.arc(a + c / 2, b + c / 2, c / 2, 0, 2 * Math.PI, !0);
            this.ctx.closePath();
            this.ctx.fill() };
        l.prototype.circleStroke = function(a, b, c,
            d, e, f) { this.circle(a, b, c, d);
            this.ctx.strokeStyle = f.toString();
            this.ctx.stroke() };
        l.prototype.drawShape = function(a, b) { this.shape(a);
            this.setFillStyle(b).fill() };
        l.prototype.taints = function(a) { if (null === a.tainted) { this.taintCtx.drawImage(a.image, 0, 0); try { this.taintCtx.getImageData(0, 0, 1, 1), a.tainted = !1 } catch (b) { this.taintCtx = r.createElement("canvas").getContext("2d"), a.tainted = !0 } } return a.tainted };
        l.prototype.drawImage = function(a, b, c, d, e, f, g, h, k) {
            this.taints(a) && !this.options.allowTaint || this.ctx.drawImage(a.image,
                b, c, d, e, f, g, h, k)
        };
        l.prototype.clip = function(a, b, c) { this.ctx.save();
            a.filter(nb).forEach(function(a) { this.shape(a).clip() }, this);
            b.call(c);
            this.ctx.restore() };
        l.prototype.shape = function(a) { this.ctx.beginPath();
            a.forEach(function(a, c) { "rect" === a[0] ? this.ctx.rect.apply(this.ctx, a.slice(1)) : this.ctx[0 === c ? "moveTo" : a[0] + "To"].apply(this.ctx, a.slice(1)) }, this);
            this.ctx.closePath(); return this.ctx };
        l.prototype.font = function(a, b, c, d, e, f) { this.setFillStyle(a).font = [b, c, d, e, f].join(" ").split(",")[0] };
        l.prototype.fontShadow =
            function(a, b, c, d) { this.setVariable("shadowColor", a.toString()).setVariable("shadowOffsetY", b).setVariable("shadowOffsetX", c).setVariable("shadowBlur", d) };
        l.prototype.clearShadow = function() { this.setVariable("shadowColor", "rgba(0,0,0,0)") };
        l.prototype.setOpacity = function(a) { this.ctx.globalAlpha = a };
        l.prototype.setTransform = function(a) { this.ctx.translate(a.origin[0], a.origin[1]);
            this.ctx.transform.apply(this.ctx, a.matrix);
            this.ctx.translate(-a.origin[0], -a.origin[1]) };
        l.prototype.setVariable = function(a,
            b) { this.variables[a] !== b && (this.variables[a] = this.ctx[a] = b); return this };
        l.prototype.text = function(a, b, c) { this.ctx.fillText(a, b, c) };
        l.prototype.backgroundRepeatShape = function(a, b, c, d, e, f, g, h, k) { this.clip([
                [
                    ["line", Math.round(e), Math.round(f)],
                    ["line", Math.round(e + g), Math.round(f)],
                    ["line", Math.round(e + g), Math.round(h + f)],
                    ["line", Math.round(e), Math.round(h + f)]
                ]
            ], function() { this.renderBackgroundRepeat(a, b, c, d, k[3], k[0]) }, this) };
        l.prototype.renderBackgroundRepeat = function(a, b, c, d, e, f) {
            e = Math.round(d.left +
                b.left + e);
            b = Math.round(d.top + b.top + f);
            this.setFillStyle(this.ctx.createPattern(this.resizeImage(a, c), "repeat"));
            this.ctx.translate(e, b);
            this.ctx.fill();
            this.ctx.translate(-e, -b)
        };
        l.prototype.renderBackgroundGradient = function(a, b) { if (a instanceof V) { var c = this.ctx.createLinearGradient(b.left + b.width * a.x0, b.top + b.height * a.y0, b.left + b.width * a.x1, b.top + b.height * a.y1);
                a.colorStops.forEach(function(a) { c.addColorStop(a.stop, a.color.toString()) });
                this.rectangle(b.left, b.top, b.width, b.height, c) } };
        l.prototype.resizeImage =
            function(a, b) { var c = a.image; if (c.width === b.width && c.height === b.height) return c; var d = r.createElement("canvas");
                d.width = b.width;
                d.height = b.height;
                d.getContext("2d").drawImage(c, 0, 0, c.width, c.height, 0, 0, b.width, b.height); return d }
    }
}).call({}, "undefined" !== typeof window ? window : void 0, "undefined" !== typeof document ? document : void 0);



(function(c) {
    function a(b, d) { if ({}.hasOwnProperty.call(a.cache, b)) return a.cache[b]; var e = a.resolve(b); if (!e) throw new Error('Failed to resolve module ' + b); var c = { id: b, require: a, filename: b, exports: {}, loaded: !1, parent: d, children: [] };
        d && d.children.push(c); var f = b.slice(0, b.lastIndexOf('/') + 1); return a.cache[b] = c.exports, e.call(c.exports, c, c.exports, f, b), c.loaded = !0, a.cache[b] = c.exports } a.modules = {}, a.cache = {}, a.resolve = function(b) { return {}.hasOwnProperty.call(a.modules, b) ? a.modules[b] : void 0 }, a.define = function(b, c) { a.modules[b] = c }; var b = function(a) { return a = '/', { title: 'browser', version: 'v0.10.26', browser: !0, env: {}, argv: [], nextTick: c.setImmediate || function(a) { setTimeout(a, 0) }, cwd: function() { return a }, chdir: function(b) { a = b } } }();
    a.define('/gif.coffee', function(d, m, l, k) {
        function g(a, b) { return {}.hasOwnProperty.call(a, b) }

        function j(d, b) { for (var a = 0, c = b.length; a < c; ++a)
                if (a in b && b[a] === d) return !0; return !1 }

        function i(a, b) {
            function d() { this.constructor = a } for (var c in b) g(b, c) && (a[c] = b[c]); return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a } var h, c, f, b, e;
        f = a('events', d).EventEmitter, h = a('/browser.coffee', d), e = function(d) {
            function a(d) { var a, b;
                this.running = !1, this.options = {}, this.frames = [], this.freeWorkers = [], this.activeWorkers = [], this.setOptions(d); for (a in c) b = c[a], null != this.options[a] ? this.options[a] : this.options[a] = b } return i(a, d), c = { workerScript: 'gif.worker.js', workers: 2, repeat: 0, background: '#fff', quality: 10, width: null, height: null, transparent: null }, b = { delay: 500, copy: !1 }, a.prototype.setOption = function(a, b) { return this.options[a] = b, null != this._canvas && (a === 'width' || a === 'height') ? this._canvas[a] = b : void 0 }, a.prototype.setOptions = function(b) { var a, c; return function(d) { for (a in b) { if (!g(b, a)) continue;
                        c = b[a], d.push(this.setOption(a, c)) } return d }.call(this, []) }, a.prototype.addFrame = function(a, d) { var c, e;
                null == d && (d = {}), c = {}, c.transparent = this.options.transparent; for (e in b) c[e] = d[e] || b[e]; if (null != this.options.width || this.setOption('width', a.width), null != this.options.height || this.setOption('height', a.height), 'undefined' !== typeof ImageData && null != ImageData && a instanceof ImageData) c.data = a.data;
                else if ('undefined' !== typeof CanvasRenderingContext2D && null != CanvasRenderingContext2D && a instanceof CanvasRenderingContext2D || 'undefined' !== typeof WebGLRenderingContext && null != WebGLRenderingContext && a instanceof WebGLRenderingContext) d.copy ? c.data = this.getContextData(a) : c.context = a;
                else if (null != a.childNodes) d.copy ? c.data = this.getImageData(a) : c.image = a;
                else throw new Error('Invalid image'); return this.frames.push(c) }, a.prototype.render = function() { var d, a; if (this.running) throw new Error('Already running'); if (!(null != this.options.width && null != this.options.height)) throw new Error('Width and height must be set prior to rendering');
                this.running = !0, this.nextFrame = 0, this.finishedFrames = 0, this.imageParts = function(c) { for (var b = function() { var b;
                            b = []; for (var a = 0; 0 <= this.frames.length ? a < this.frames.length : a > this.frames.length; 0 <= this.frames.length ? ++a : --a) b.push(a); return b }.apply(this, arguments), a = 0, e = b.length; a < e; ++a) d = b[a], c.push(null); return c }.call(this, []), a = this.spawnWorkers(); for (var c = function() { var c;
                        c = []; for (var b = 0; 0 <= a ? b < a : b > a; 0 <= a ? ++b : --b) c.push(b); return c }.apply(this, arguments), b = 0, e = c.length; b < e; ++b) d = c[b], this.renderNextFrame(); return this.emit('start'), this.emit('progress', 0) }, a.prototype.abort = function() { var a; while (!0) { if (a = this.activeWorkers.shift(), !(null != a)) break;
                    console.log('killing active worker'), a.terminate() } return this.running = !1, this.emit('abort') }, a.prototype.spawnWorkers = function() { var a; return a = Math.min(this.options.workers, this.frames.length),
                    function() { var c;
                        c = []; for (var b = this.freeWorkers.length; this.freeWorkers.length <= a ? b < a : b > a; this.freeWorkers.length <= a ? ++b : --b) c.push(b); return c }.apply(this, arguments).forEach(function(a) { return function(c) { var b; return console.log('spawning worker ' + c), b = new Worker(a.options.workerScript), b.onmessage = function(a) { return function(c) { return a.activeWorkers.splice(a.activeWorkers.indexOf(b), 1), a.freeWorkers.push(b), a.frameFinished(c.data) } }(a), a.freeWorkers.push(b) } }(this)), a }, a.prototype.frameFinished = function(a) { return console.log('frame ' + a.index + ' finished - ' + this.activeWorkers.length + ' active'), this.finishedFrames++, this.emit('progress', this.finishedFrames / this.frames.length), this.imageParts[a.index] = a, j(null, this.imageParts) ? this.renderNextFrame() : this.finishRendering() }, a.prototype.finishRendering = function() { var e, a, k, m, b, d, h;
                b = 0; for (var f = 0, j = this.imageParts.length; f < j; ++f) a = this.imageParts[f], b += (a.data.length - 1) * a.pageSize + a.cursor;
                b += a.pageSize - a.cursor, console.log('rendering finished - filesize ' + Math.round(b / 1e3) + 'kb'), e = new Uint8Array(b), d = 0; for (var g = 0, l = this.imageParts.length; g < l; ++g) { a = this.imageParts[g]; for (var c = 0, i = a.data.length; c < i; ++c) h = a.data[c], k = c, e.set(h, d), k === a.data.length - 1 ? d += a.cursor : d += a.pageSize } return m = new Blob([e], { type: 'image/gif' }), this.emit('finished', m, e) }, a.prototype.renderNextFrame = function() { var c, a, b; if (this.freeWorkers.length === 0) throw new Error('No free workers'); return this.nextFrame >= this.frames.length ? void 0 : (c = this.frames[this.nextFrame++], b = this.freeWorkers.shift(), a = this.getTask(c), console.log('starting frame ' + (a.index + 1) + ' of ' + this.frames.length), this.activeWorkers.push(b), b.postMessage(a)) }, a.prototype.getContextData = function(a) { return a.getImageData(0, 0, this.options.width, this.options.height).data }, a.prototype.getImageData = function(b) { var a; return null != this._canvas || (this._canvas = document.createElement('canvas'), this._canvas.width = this.options.width, this._canvas.height = this.options.height), a = this._canvas.getContext('2d'), a.setFill = this.options.background, a.fillRect(0, 0, this.options.width, this.options.height), a.drawImage(b, 0, 0), this.getContextData(a) }, a.prototype.getTask = function(a) { var c, b; if (c = this.frames.indexOf(a), b = { index: c, last: c === this.frames.length - 1, delay: a.delay, transparent: a.transparent, width: this.options.width, height: this.options.height, quality: this.options.quality, repeat: this.options.repeat, canTransfer: h.name === 'chrome' }, null != a.data) b.data = a.data;
                else if (null != a.context) b.data = this.getContextData(a.context);
                else if (null != a.image) b.data = this.getImageData(a.image);
                else throw new Error('Invalid frame'); return b }, a }(f), d.exports = e }), a.define('/browser.coffee', function(f, g, h, i) { var a, d, e, c, b;
        c = navigator.userAgent.toLowerCase(), e = navigator.platform.toLowerCase(), b = c.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/) || [null, 'unknown', 0], d = b[1] === 'ie' && document.documentMode, a = { name: b[1] === 'version' ? b[3] : b[1], version: d || parseFloat(b[1] === 'opera' && b[4] ? b[4] : b[2]), platform: { name: c.match(/ip(?:ad|od|hone)/) ? 'ios' : (c.match(/(?:webos|android)/) || e.match(/mac|win|linux/) || ['other'])[0] } }, a[a.name] = !0, a[a.name + parseInt(a.version, 10)] = !0, a.platform[a.platform.name] = !0, f.exports = a }), a.define('events', function(f, e, g, h) { b.EventEmitter || (b.EventEmitter = function() {}); var a = e.EventEmitter = b.EventEmitter,
            c = typeof Array.isArray === 'function' ? Array.isArray : function(a) { return Object.prototype.toString.call(a) === '[object Array]' },
            d = 10;
        a.prototype.setMaxListeners = function(a) { this._events || (this._events = {}), this._events.maxListeners = a }, a.prototype.emit = function(f) { if (f === 'error' && (!(this._events && this._events.error) || c(this._events.error) && !this._events.error.length)) throw arguments[1] instanceof Error ? arguments[1] : new Error("Uncaught, unspecified 'error' event."); if (!this._events) return !1; var a = this._events[f]; if (!a) return !1; if (!(typeof a == 'function'))
                if (c(a)) { var b = Array.prototype.slice.call(arguments, 1),
                        e = a.slice(); for (var d = 0, g = e.length; d < g; d++) e[d].apply(this, b); return !0 } else return !1; switch (arguments.length) {
                case 1:
                    a.call(this); break;
                case 2:
                    a.call(this, arguments[1]); break;
                case 3:
                    a.call(this, arguments[1], arguments[2]); break;
                default:
                    var b = Array.prototype.slice.call(arguments, 1);
                    a.apply(this, b) } return !0 }, a.prototype.addListener = function(a, b) { if ('function' !== typeof b) throw new Error('addListener only takes instances of Function'); if (this._events || (this._events = {}), this.emit('newListener', a, b), !this._events[a]) this._events[a] = b;
            else if (c(this._events[a])) { if (!this._events[a].warned) { var e;
                    this._events.maxListeners !== undefined ? e = this._events.maxListeners : e = d, e && e > 0 && this._events[a].length > e && (this._events[a].warned = !0, console.error('(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.', this._events[a].length), console.trace()) } this._events[a].push(b) } else this._events[a] = [this._events[a], b]; return this }, a.prototype.on = a.prototype.addListener, a.prototype.once = function(b, c) { var a = this; return a.on(b, function d() { a.removeListener(b, d), c.apply(this, arguments) }), this }, a.prototype.removeListener = function(a, d) { if ('function' !== typeof d) throw new Error('removeListener only takes instances of Function'); if (!(this._events && this._events[a])) return this; var b = this._events[a]; if (c(b)) { var e = b.indexOf(d); if (e < 0) return this;
                b.splice(e, 1), b.length == 0 && delete this._events[a] } else this._events[a] === d && delete this._events[a]; return this }, a.prototype.removeAllListeners = function(a) { return a && this._events && this._events[a] && (this._events[a] = null), this }, a.prototype.listeners = function(a) { return this._events || (this._events = {}), this._events[a] || (this._events[a] = []), c(this._events[a]) || (this._events[a] = [this._events[a]]), this._events[a] } }), c.GIF = a('/gif.coffee') }.call(this, this));
//# sourceMappingURL=gif.js.map
// gif.js 0.1.6 - https://github.com/jnordberg/gif.js

/*
  html2canvas 0.5.0-alpha1 <http://html2canvas.hertzen.com>
  Copyright (c) 2015 Niklas von Hertzen

  Released under MIT License
*/


(function() {

    function GIFMaker(obj) {

        var fps = (obj.fps) ? obj.fps : 30,
            frameCount,
            gif,
            data = obj,
            increment = 1 / fps,
            tl = obj.timeline,
            startFrameValue = obj.startFrameValue,
            numFrames = tl.totalDuration() / increment,
            svg = obj.svg,
            frameDelay = Math.floor((1 / fps) * 1000),
            currentFrame,
            gifMaker = this,
            renderTl,
            mainButtonTl = obj.mainButtonTl,
            convertButton = obj.convertButton,
            repeatPlayback = obj.repeatPlayback;

        this.init = function() {

            if (svg.tagName == "svg") {
                svg.style = "none";
                if (!svg.getAttribute('width')) {
                    svg.setAttribute('width', obj.svgWidth);
                    svg.setAttribute('height', obj.svgHeight);
                    svg.setAttribute('style', "width:" + obj.svgWidth + "px; height:" + obj.svgHeight + "px;visibility:visible;");

                    svg.style.width = obj.svgWidth;
                    svg.style.height = obj.svgHeight;
                }

            }

            numFrames /= tl.timeScale(), frameCount = 0;


            svg.style.position = "relative";
            svg.style.transform = "none";
            svg.style.webkitTransform = "none";
            svg.style.mozTransform = "none";

            var workerStr = "(function(b){function a(b,d){if({}.hasOwnProperty.call(a.cache,b))return a.cache[b];var e=a.resolve(b);if(!e)throw new Error('Failed to resolve module '+b);var c={id:b,require:a,filename:b,exports:{},loaded:!1,parent:d,children:[]};d&&d.children.push(c);var f=b.slice(0,b.lastIndexOf('/')+1);return a.cache[b]=c.exports,e.call(c.exports,c,c.exports,f,b),c.loaded=!0,a.cache[b]=c.exports}a.modules={},a.cache={},a.resolve=function(b){return{}.hasOwnProperty.call(a.modules,b)?a.modules[b]:void 0},a.define=function(b,c){a.modules[b]=c},a.define('/gif.worker.coffee',function(d,e,f,g){var b,c;b=a('/GIFEncoder.js',d),c=function(a){var c,e,d,f;return c=new b(a.width,a.height),a.index===0?c.writeHeader():c.firstFrame=!1,c.setTransparent(a.transparent),c.setRepeat(a.repeat),c.setDelay(a.delay),c.setQuality(a.quality),c.addFrame(a.data),a.last&&c.finish(),d=c.stream(),a.data=d.pages,a.cursor=d.cursor,a.pageSize=d.constructor.pageSize,a.canTransfer?(f=function(c){for(var b=0,d=a.data.length;b<d;++b)e=a.data[b],c.push(e.buffer);return c}.call(this,[]),self.postMessage(a,f)):self.postMessage(a)},self.onmessage=function(a){return c(a.data)}}),a.define('/GIFEncoder.js',function(e,h,i,j){function c(){this.page=-1,this.pages=[],this.newPage()}function b(a,b){this.width=~~a,this.height=~~b,this.transparent=null,this.transIndex=0,this.repeat=-1,this.delay=0,this.image=null,this.pixels=null,this.indexedPixels=null,this.colorDepth=null,this.colorTab=null,this.usedEntry=new Array,this.palSize=7,this.dispose=-1,this.firstFrame=!0,this.sample=10,this.out=new c}var f=a('/TypedNeuQuant.js',e),g=a('/LZWEncoder.js',e);c.pageSize=4096,c.charMap={};for(var d=0;d<256;d++)c.charMap[d]=String.fromCharCode(d);c.prototype.newPage=function(){this.pages[++this.page]=new Uint8Array(c.pageSize),this.cursor=0},c.prototype.getData=function(){var d='';for(var a=0;a<this.pages.length;a++)for(var b=0;b<c.pageSize;b++)d+=c.charMap[this.pages[a][b]];return d},c.prototype.writeByte=function(a){this.cursor>=c.pageSize&&this.newPage(),this.pages[this.page][this.cursor++]=a},c.prototype.writeUTFBytes=function(b){for(var c=b.length,a=0;a<c;a++)this.writeByte(b.charCodeAt(a))},c.prototype.writeBytes=function(b,d,e){for(var c=e||b.length,a=d||0;a<c;a++)this.writeByte(b[a])},b.prototype.setDelay=function(a){this.delay=Math.round(a/10)},b.prototype.setFrameRate=function(a){this.delay=Math.round(100/a)},b.prototype.setDispose=function(a){a>=0&&(this.dispose=a)},b.prototype.setRepeat=function(a){this.repeat=a},b.prototype.setTransparent=function(a){this.transparent=a},b.prototype.addFrame=function(a){this.image=a,this.getImagePixels(),this.analyzePixels(),this.firstFrame&&(this.writeLSD(),this.writePalette(),this.repeat>=0&&this.writeNetscapeExt()),this.writeGraphicCtrlExt(),this.writeImageDesc(),this.firstFrame||this.writePalette(),this.writePixels(),this.firstFrame=!1},b.prototype.finish=function(){this.out.writeByte(59)},b.prototype.setQuality=function(a){a<1&&(a=1),this.sample=a},b.prototype.writeHeader=function(){this.out.writeUTFBytes('GIF89a')},b.prototype.analyzePixels=function(){var g=this.pixels.length,d=g/3;this.indexedPixels=new Uint8Array(d);var a=new f(this.pixels,this.sample);a.buildColormap(),this.colorTab=a.getColormap();var b=0;for(var c=0;c<d;c++){var e=a.lookupRGB(this.pixels[b++]&255,this.pixels[b++]&255,this.pixels[b++]&255);this.usedEntry[e]=!0,this.indexedPixels[c]=e}this.pixels=null,this.colorDepth=8,this.palSize=7,this.transparent!==null&&(this.transIndex=this.findClosest(this.transparent))},b.prototype.findClosest=function(e){if(this.colorTab===null)return-1;var k=(e&16711680)>>16,l=(e&65280)>>8,m=e&255,c=0,d=16777216,j=this.colorTab.length;for(var a=0;a<j;){var f=k-(this.colorTab[a++]&255),g=l-(this.colorTab[a++]&255),h=m-(this.colorTab[a]&255),i=f*f+g*g+h*h,b=parseInt(a/3);this.usedEntry[b]&&i<d&&(d=i,c=b),a++}return c},b.prototype.getImagePixels=function(){var a=this.width,g=this.height;this.pixels=new Uint8Array(a*g*3);var b=this.image,c=0;for(var d=0;d<g;d++)for(var e=0;e<a;e++){var f=d*a*4+e*4;this.pixels[c++]=b[f],this.pixels[c++]=b[f+1],this.pixels[c++]=b[f+2]}},b.prototype.writeGraphicCtrlExt=function(){this.out.writeByte(33),this.out.writeByte(249),this.out.writeByte(4);var b,a;this.transparent===null?(b=0,a=0):(b=1,a=2),this.dispose>=0&&(a=dispose&7),a<<=2,this.out.writeByte(0|a|0|b),this.writeShort(this.delay),this.out.writeByte(this.transIndex),this.out.writeByte(0)},b.prototype.writeImageDesc=function(){this.out.writeByte(44),this.writeShort(0),this.writeShort(0),this.writeShort(this.width),this.writeShort(this.height),this.firstFrame?this.out.writeByte(0):this.out.writeByte(128|this.palSize)},b.prototype.writeLSD=function(){this.writeShort(this.width),this.writeShort(this.height),this.out.writeByte(240|this.palSize),this.out.writeByte(0),this.out.writeByte(0)},b.prototype.writeNetscapeExt=function(){this.out.writeByte(33),this.out.writeByte(255),this.out.writeByte(11),this.out.writeUTFBytes('NETSCAPE2.0'),this.out.writeByte(3),this.out.writeByte(1),this.writeShort(this.repeat),this.out.writeByte(0)},b.prototype.writePalette=function(){this.out.writeBytes(this.colorTab);var b=768-this.colorTab.length;for(var a=0;a<b;a++)this.out.writeByte(0)},b.prototype.writeShort=function(a){this.out.writeByte(a&255),this.out.writeByte(a>>8&255)},b.prototype.writePixels=function(){var a=new g(this.width,this.height,this.indexedPixels,this.colorDepth);a.encode(this.out)},b.prototype.stream=function(){return this.out},e.exports=b}),a.define('/LZWEncoder.js',function(e,g,h,i){function f(y,D,C,B){function w(a,b){r[f++]=a,f>=254&&t(b)}function x(b){u(a),k=i+2,j=!0,l(i,b)}function u(b){for(var a=0;a<b;++a)h[a]=-1}function A(z,r){var g,t,d,e,y,w,s;for(q=z,j=!1,n_bits=q,m=p(n_bits),i=1<<z-1,o=i+1,k=i+2,f=0,e=v(),s=0,g=a;g<65536;g*=2)++s;s=8-s,w=a,u(w),l(i,r);a:while((t=v())!=c){if(g=(t<<b)+e,d=t<<s^e,h[d]===g){e=n[d];continue}if(h[d]>=0){y=w-d,d===0&&(y=1);do if((d-=y)<0&&(d+=w),h[d]===g){e=n[d];continue a}while(h[d]>=0)}l(e,r),e=t,k<1<<b?(n[d]=k++,h[d]=g):x(r)}l(e,r),l(o,r)}function z(a){a.writeByte(s),remaining=y*D,curPixel=0,A(s+1,a),a.writeByte(0)}function t(a){f>0&&(a.writeByte(f),a.writeBytes(r,0,f),f=0)}function p(a){return(1<<a)-1}function v(){if(remaining===0)return c;--remaining;var a=C[curPixel++];return a&255}function l(a,c){g&=d[e],e>0?g|=a<<e:g=a,e+=n_bits;while(e>=8)w(g&255,c),g>>=8,e-=8;if((k>m||j)&&(j?(m=p(n_bits=q),j=!1):(++n_bits,n_bits==b?m=1<<b:m=p(n_bits))),a==o){while(e>0)w(g&255,c),g>>=8,e-=8;t(c)}}var s=Math.max(2,B),r=new Uint8Array(256),h=new Int32Array(a),n=new Int32Array(a),g,e=0,f,k=0,m,j=!1,q,i,o;this.encode=z}var c=-1,b=12,a=5003,d=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];e.exports=f}),a.define('/TypedNeuQuant.js',function(A,F,E,D){function C(A,B){function I(){o=[],q=new Int32Array(256),t=new Int32Array(a),y=new Int32Array(a),z=new Int32Array(a>>3);var c,d;for(c=0;c<a;c++)d=(c<<b+8)/a,o[c]=new Float64Array([d,d,d,0]),y[c]=e/a,t[c]=0}function J(){for(var c=0;c<a;c++)o[c][0]>>=b,o[c][1]>>=b,o[c][2]>>=b,o[c][3]=c}function K(b,a,c,e,f){o[a][0]-=b*(o[a][0]-c)/d,o[a][1]-=b*(o[a][1]-e)/d,o[a][2]-=b*(o[a][2]-f)/d}function L(j,e,n,l,k){var h=Math.abs(e-j),i=Math.min(e+j,a),g=e+1,f=e-1,m=1,b,d;while(g<i||f>h)d=z[m++],g<i&&(b=o[g++],b[0]-=d*(b[0]-n)/c,b[1]-=d*(b[1]-l)/c,b[2]-=d*(b[2]-k)/c),f>h&&(b=o[f--],b[0]-=d*(b[0]-n)/c,b[1]-=d*(b[1]-l)/c,b[2]-=d*(b[2]-k)/c)}function C(p,s,q){var h=2147483647,k=h,d=-1,m=d,c,j,e,n,l;for(c=0;c<a;c++)j=o[c],e=Math.abs(j[0]-p)+Math.abs(j[1]-s)+Math.abs(j[2]-q),e<h&&(h=e,d=c),n=e-(t[c]>>i-b),n<k&&(k=n,m=c),l=y[c]>>g,y[c]-=l,t[c]+=l<<f;return y[d]+=x,t[d]-=r,m}function D(){var d,b,e,c,h,g,f=0,i=0;for(d=0;d<a;d++){for(e=o[d],h=d,g=e[1],b=d+1;b<a;b++)c=o[b],c[1]<g&&(h=b,g=c[1]);if(c=o[h],d!=h&&(b=c[0],c[0]=e[0],e[0]=b,b=c[1],c[1]=e[1],e[1]=b,b=c[2],c[2]=e[2],e[2]=b,b=c[3],c[3]=e[3],e[3]=b),g!=f){for(q[f]=i+d>>1,b=f+1;b<g;b++)q[b]=d;f=g,i=d}}for(q[f]=i+n>>1,b=f+1;b<256;b++)q[b]=n}function E(j,i,k){var b,d,c,e=1e3,h=-1,f=q[i],g=f-1;while(f<a||g>=0)f<a&&(d=o[f],c=d[1]-i,c>=e?f=a:(f++,c<0&&(c=-c),b=d[0]-j,b<0&&(b=-b),c+=b,c<e&&(b=d[2]-k,b<0&&(b=-b),c+=b,c<e&&(e=c,h=d[3])))),g>=0&&(d=o[g],c=i-d[1],c>=e?g=-1:(g--,c<0&&(c=-c),b=d[0]-j,b<0&&(b=-b),c+=b,c<e&&(b=d[2]-k,b<0&&(b=-b),c+=b,c<e&&(e=c,h=d[3]))));return h}function F(){var c,f=A.length,D=30+(B-1)/3,y=f/(3*B),q=~~(y/w),n=d,o=u,a=o>>h;for(a<=1&&(a=0),c=0;c<a;c++)z[c]=n*((a*a-c*c)*m/(a*a));var i;f<s?(B=1,i=3):f%l!==0?i=3*l:f%k!==0?i=3*k:f%p!==0?i=3*p:i=3*j;var r,t,x,e,g=0;c=0;while(c<y)if(r=(A[g]&255)<<b,t=(A[g+1]&255)<<b,x=(A[g+2]&255)<<b,e=C(r,t,x),K(n,e,r,t,x),a!==0&&L(a,e,r,t,x),g+=i,g>=f&&(g-=f),c++,q===0&&(q=1),c%q===0)for(n-=n/D,o-=o/v,a=o>>h,a<=1&&(a=0),e=0;e<a;e++)z[e]=n*((a*a-e*e)*m/(a*a))}function G(){I(),F(),J(),D()}function H(){var b=[],g=[];for(var c=0;c<a;c++)g[o[c][3]]=c;var d=0;for(var e=0;e<a;e++){var f=g[e];b[d++]=o[f][0],b[d++]=o[f][1],b[d++]=o[f][2]}return b}var o,q,t,y,z;this.buildColormap=G,this.getColormap=H,this.lookupRGB=E}var w=100,a=256,n=a-1,b=4,i=16,e=1<<i,f=10,B=1<<f,g=10,x=e>>g,r=e<<f-g,z=a>>3,h=6,t=1<<h,u=z*t,v=30,o=10,d=1<<o,q=8,m=1<<q,y=o+q,c=1<<y,l=499,k=491,p=487,j=503,s=3*j;A.exports=C}),a('/gif.worker.coffee')}.call(this,this))"

            var blob;
            try {
                blob = new Blob([workerStr], {
                    type: 'application/javascript'
                });
            } catch (e) { // Backwards-compatibility
                window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
                blob = new BlobBuilder();
                blob.append(response);
                blob = blob.getBlob();
            }

            gif = new GIF({
                workers: (data.workers) ? data.workers : 10,
                workerScript: URL.createObjectURL(blob),
                repeat: repeatPlayback
            });

            gif.on('finished', gifMaker.onFinished);


            renderTl = new TimelineMax({ paused: true });
            renderTl.add(tl);

            tl.play(0);

            gifMaker.makeFrame();

        }

        this.onFinished = function(blob) {

            convertButton.value = "Show GIF";
            convertButton.className = 'form-sub finished';

            convertButton.onclick = function(e) {

                window.open(URL.createObjectURL(blob));
            }

            TweenMax.to('.circleLoaderSVG', 0.3, {
                width: 0,
                height: 0

            })


        }





        this.makeFrame = function() {

            currentFrame = frameCount * increment;

            if (frameCount >= numFrames) {

                makeFrame = null;

                if (startFrameValue > 1) {
                    var arr1 = gif.frames.slice(0, startFrameValue);
                    var arr2 = gif.frames.slice(startFrameValue);
                    console.log(arr1.length, arr2.length);
                    var splitArray = arr2.concat(arr1);
                    gif.frames = splitArray;
                    gif.render();
                    return;

                }

                gif.render();


                return;
            }

            renderTl.seek(currentFrame, false);

            html2canvas(svg,


                { background: obj.backgroundColor, allowTaint: true }

            ).then(function(canvas) {

                gif.addFrame(canvas, { copy: true, delay: frameDelay });

                frameCount++;

                gifMaker.makeFrame();
            });

        }
    }


    var ui, allTimelines, myTimeline, mySVG, svgs, svgDropdown, repeatPlayback, convertButton, svgWidth, svgHeight, startFrame, gsapTimeline, numWorkers, bgColor, playButton, myDragger, numFrames, mainButtonTl;


    function getTimelines() {
        var root = TweenLite.to({}, 0.1, {}).timeline, //just a quick way to get the root timeline
            child = root._first,
            timelines = [];
        while (child) { //loop through the linked list. If the child has a "getChildren()" method, it's a timeline.
            if (child.getChildren) {
                timelines.push(child);
                child.progress(0.999);
                child.pause();
            }
            child = child._next;
        }
        console.log(timelines);
        return timelines;
    }




    function initConverter() {

        ui = document.createElement('div');
        ui.setAttribute('style', 'width:100%; position:absolute; height:100%; top:0;');

        //THIS LINE!
        //ui.innerHTML = '<style type="text/css"> .uiContainer{width:100%; height: 100%; text-align: center; background: rgba(0,0,0,0.3); position: absolute; top: 0; left: 0; z-index: 999;}.uiPanel h2,.uiPanel h4{padding-top: 20px; font-size: 1.3em; width: 100%; text-align: center;}.uiPanel h4{font-size: 0.9em; padding: 0;}.uiPanel{position: relative; text-align: left; width:500px; padding-bottom: 20px; /* background:rgba(237,237,237,0.95); */ background: #FFF; /* border:4px solid #ED4A70; */ border-radius: 12px; transform: translate(-50%, -50%); left: 50%; top: 50%; box-sizing: border-box; box-shadow: 0 0 10px rgba(0,0,0,0.5); overflow:hidden;}.uiContainer *{font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; color: #666;}.uiContainer li{list-style-type: none; line-height: 40px; padding: 6px;}.uiContainer li label{margin-left: 40px;}.uiContainer ul li input, .uiContainer ul li select{width: 50%; padding: 10px 12px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; color: #333; border: none; background: rgba(0,0,0,0.07); border-radius: 6px; box-shadow: inset 0 1px 2px rgba(0,0,0,0.12); box-sizing: border-box; outline : none; -webkit-appearance: none; -moz-appearance: none; appearance: none;}.uiContainer ul li input:focus, .uiContainer ul li select:focus{background: rgba(255,255,255,0.07);}.uiContainer ul li label{}.uiButton{outline : none;}.form-sub{padding: 10px 15px 10px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-weight: 500; cursor: pointer; border: none; text-decoration: none; background: #ED4A70; border-radius: 6px; color: #FFF; margin: 10px; font-size: 18px; outline: none;}.uiContainer .playButton{padding: 8px 20px 8px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-weight: 500; cursor: pointer; border: none; text-decoration: none; background: #FFF; border-radius: 6px; color: #ED4A70; margin: 10px; font-size: 18px; border:2px solid #ED4A70; outline: none;}.uiButton-disabled{opacity: 0.25; cursor: default;}.uiButtonContainer{text-align: center; width: 100%;}.uiButtonContainer .circleLoaderSVG{background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgOTYgOTYiPiAgPHRpdGxlPmNpcmNsZUxvYWRlcjwvdGl0bGU+ICAgICAgPGNpcmNsZSBjbGFzcz0iY2lyY2xlTG9hZGVyIiBjeD0iNDgiIGN5PSI0OCIgcj0iMzIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2VkNGE3MCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjEwIiBzdHJva2UtZGFzaGFycmF5PSI1MCIvPjwvc3ZnPg==); background-repeat: no-repeat; background-position: 50% 50%; width: 0; height: 0; position: relative; transform: none; vertical-align: middle; margin: 0; padding: 0;display: inline-block;}.uiElements{width: 100%; height: 100%;margin-bottom: 20px; padding:0;}.uiElements .start-frame{text-align: right; width: 80px !important;}.uiContainer .playButton{display: inline-block; background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgOTYgOTYiIHdpZHRoPSIyMyIgaGVpZ2h0PSIyMyI+ICAgICAgPHBhdGggaWQ9InBsYXlJY29uIiBkPSJNMzQuNyw4NC40NGMtMy4zMywwLTYuNy0yLjYyLTYuNy03LjYzVjE4LjY0YzAtNSwzLjM3LTcuNjQsNi43LTcuNjRhOC4wNyw4LjA3LDAsMCwxLDUuMiwyLjA3TDczLDQwLjc4YTguOTEsOC45MSwwLDAsMSwwLDEzLjg3TDM5LjksODIuMzZBOC4wNSw4LjA1LDAsMCwxLDM0LjcsODQuNDRaIiBmaWxsPSIjZWQ0YTcwIj48dGl0bGU+UGxheSBTVkcgdGltZWxpbmU8L3RpdGxlPjwvcGF0aD48L3N2Zz4=); background-repeat: no-repeat; background-position: 50% 50%;;}.uiElements .uiButtonContainer, .uiElements .num-frames{padding: 0; margin: 0; left: 270px; position: absolute; width: 180px;}select > option{background: #FFF; color:#ED4A70 !important; outline: none;}.chooseOption{color: #666 !important;}.tick-icon, .finished{background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgY2xhc3M9InRpY2staWNvbiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNDAgNDAiPiAgPHRpdGxlPnRpY2tfaWNvbjwvdGl0bGU+ICAgICAgPHBvbHlnb24gaWQ9InRpY2siIHBvaW50cz0iMzkuMyA4NS4xNyAxMS4zIDYxLjg0IDE3LjcgNTQuMTYgMzcuNyA3MC44MyA3Ny41MyAxOC45NSA4NS40NyAyNS4wNSAzOS4zIDg1LjE3IiBmaWxsPSIjZmZmIi8+PC9zdmc+); background-repeat: no-repeat; background-position: 100% 50%; width: 180px;}.uiPanel hr{width:80%; margin-bottom: 20px; border-color: #DDD; border-width: 1px;}.svg2gif-logo{background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMjEyLjMyIDY5LjQ5Ij4gIDx0aXRsZT5zdmcyZ2lmX2xvZ288L3RpdGxlPiAgICAgIDxnIGlkPSJzdmcyZ2lmX2xvZ28iPiAgICAgICAgPGc+ICAgICAgICAgIDxwYXRoIGQ9Ik02MC41NywzNC40MWMwLS45LTIuNzgtMi4yOS01LjgxLTIuMjktNC4zMywwLTYuMzMsMS40NS02LjMzLDIuOTQsMCw0LjQ5LDE2LjkzLDIuMiwxNi45Myw5LjY2LDAsNC4zOS00LjQ2LDYuNzUtMTEuMjQsNi43NWExNi43MywxNi43MywwLDAsMS02LjY5LTEuMWMtMS4zMi0uNTItMy4yMy0xLjYyLTMuMjMtMi43NVY0NC4xM2MwLS41MiwxLjY1LTEuMjMsMi44MS0xLjIzLjM2LDAsLjY4LjI5LjY4LDEuMDdWNDYuM2MwLC45NCwzLjQ5LDIuMzksNi41MywyLjM5LDUuMzksMCw3LTEuNjIsNy0zLjQ2LDAtNC44OC0xNy4xOS0xLjc4LTE3LjE5LTkuNjYsMC0zLjkxLDUuNjItNi4yNywxMC41LTYuMjdhMTQuMjYsMTQuMjYsMCwwLDEsNywxLjM5YzEsLjQ4LDIuMTMsMS4yNiwyLjEzLDIuMzl2My4xN2MwLC41Mi0xLjc1LDEuMjMtMi41OCwxLjIzLS4zOSwwLS41OC0uMjYtLjU4LS42NVoiIGZpbGw9IiM2NjYiLz4gICAgICAgICAgPHBhdGggZD0iTTgxLjU0LDUxLjQ3YTIuMywyLjMsMCwwLDEtMi4xNy0xLjI2TDY5LjEsMzIuODNhLjY4LjY4LDAsMCwwLS43NC0uNDJoLTJhLjguOCwwLDAsMS0uOS0uODRWMzAuMzdjMC0uNTIuMzYtLjc0LjktLjc0SDc1Yy41MiwwLC45LjIzLjkuNzR2MS4xOWEuODEuODEsMCwwLDEtLjkuODRoLS4yOWMtLjM2LDAtLjY4LDAtLjY4LjI2LDAsMCwwLC4wNi4xMy4zMmw3LjMzLDEyLjUzYy4yMy4zNi4yMy40Mi40Mi40MnMuMTktLjA2LjQyLS40Mkw4OS42NSwzM2MuMTMtLjI2LjEzLS4yOS4xMy0uMzIsMC0uMjYtLjMyLS4yNi0uNzEtLjI2aC0uMjlhLjguOCwwLDAsMS0uOS0uODRWMzAuMzdjMC0uNTIuMzYtLjc0LjktLjc0aDguMzNjLjU1LDAsLjkuMjMuOS43NHYxLjE5YS44LjgsMCwwLDEtLjkuODRoLTJhLjY4LjY4LDAsMCwwLS43NC40Mkw4NC4wOSw1MC4yMWEyLjMyLDIuMzIsMCwwLDEtMi4xNiwxLjI2WiIgZmlsbD0iIzY2NiIvPiAgICAgICAgICA8cGF0aCBkPSJNMTE1LjQ2LDQzLjYyYy0uNDUsMC0xLjIzLTEuNzUtMS4yMy0yLjU4LDAtLjM5LjI2LS41OC42NS0uNThIMTIxYTEuMTYsMS4xNiwwLDAsMSwxLjI5LDEuMjZ2Ni4xMWMwLC44Ny00LjU1LDMuNjUtMTIsMy42NVM5Ni4zNCw0OCw5Ni4zNCw0MC44N2MwLTYuODIsNi44OC0xMS41NiwxNS4zOC0xMS41NmExNC4yNiwxNC4yNiwwLDAsMSw3LDEuMzljMSwuNDgsMi4xMywxLjI2LDIuMTMsMi4zOXYzLjE3YzAsLjQ1LTEuNzQsMS4yMy0yLjU4LDEuMjMtLjM5LDAtLjU4LS4yNi0uNTgtLjY1VjM0LjQxYzAtLjktMi43OC0yLjI2LTUuODEtMi4yNi02LjIsMC0xMS4xMSwzLjQyLTExLjExLDguNjYsMCw0LjM5LDMuNzEsNy42Niw5LjYzLDcuNjYsNywwLDguNzItMS43NCw4LjcyLTIuMDd2LTJjMC0uNTUtLjI2LS43NC0uNzgtLjc0WiIgZmlsbD0iIzY2NiIvPiAgICAgICAgICA8cGF0aCBkPSJNMTI3LDUxLjE0Yy0uOTQsMC0uOTQtLjUyLS45NC0yLjE2LDAtLjQyLjk0LTEsMS40OS0xLjM5LDQuNjUtMy4yMywxMS43My03LjI3LDExLjczLTEyLjY2LDAtMS43MS0xLjQ1LTMtNC4yMy0zLTMsMC01LjA3LDEuMzItNS4wNywyLjE3djEuODRjMCwuNDgtMS42NSwxLjIzLTIuODEsMS4yMy0uNDUsMC0uNjgtLjQ1LS42OC0xLjIzVjMyLjc2YzAtMS4xMywxLjEzLTEuNzQsMi4xMy0yLjI2YTEzLjM4LDEzLjM4LDAsMCwxLDctMS41MmM0LjQ5LDAsOC4zLDIuMiw4LjMsNiwwLDYuMDctOS41LDExLjc2LTEwLjc2LDEyLjUzLS4xMy4xLS4xOS4xMy0uMTkuMjNzLjEuMTMuMjkuMTNoOS44NWMuNjgsMCwxLjEuMSwxLjEuNjUsMCwuNzEtLjYxLDIuNjItMS40NSwyLjYyWiIgZmlsbD0iIzY2NiIvPiAgICAgICAgICA8cGF0aCBkPSJNMTY2LjA5LDQzLjYyYy0uNDUsMC0xLjIzLTEuNzUtMS4yMy0yLjU4LDAtLjM5LjI2LS41OC42NS0uNThoNi4xN0ExLjE2LDEuMTYsMCwwLDEsMTczLDQxLjcxdjYuMTFjMCwuODctNC41NSwzLjY1LTEyLDMuNjVTMTQ3LDQ4LDE0Nyw0MC44N2MwLTYuODIsNi44OC0xMS41NiwxNS4zOC0xMS41NmExNC4yNiwxNC4yNiwwLDAsMSw3LDEuMzljMSwuNDgsMi4xMywxLjI2LDIuMTMsMi4zOXYzLjE3YzAsLjQ1LTEuNzQsMS4yMy0yLjU4LDEuMjMtLjM5LDAtLjU4LS4yNi0uNTgtLjY1VjM0LjQxYzAtLjktMi43OC0yLjI2LTUuODEtMi4yNi02LjIsMC0xMS4xMSwzLjQyLTExLjExLDguNjYsMCw0LjM5LDMuNzEsNy42Niw5LjYzLDcuNjYsNywwLDguNzItMS43NCw4LjcyLTIuMDd2LTJjMC0uNTUtLjI2LS43NC0uNzgtLjc0WiIgZmlsbD0iIzY2NiIvPiAgICAgICAgICA8cGF0aCBkPSJNMTgzLjQxLDQ3Ljc4YzAsLjQyLjIzLjU4LjY1LjU4aDEuNzRhLjguOCwwLDAsMSwuOTEuODRWNTAuNGMwLC41Mi0uMzYuNzQtLjkxLjc0aC04Ljg1Yy0uNTUsMC0uOS0uMjMtLjktLjc0VjQ5LjIxYS44LjgsMCwwLDEsLjktLjg0aDEuNzRjLjQyLDAsLjY1LS4xNi42NS0uNThWMzNjMC0uNDItLjIzLS41OC0uNjUtLjU4aC0xLjc0YS44LjgsMCwwLDEtLjktLjg0VjMwLjM3YzAtLjUyLjM2LS43NC45LS43NGg4Ljg1Yy41NSwwLC45MS4yMy45MS43NHYxLjE5YS44LjgsMCwwLDEtLjkxLjg0aC0xLjc0Yy0uNDIsMC0uNjUuMTYtLjY1LjU4WiIgZmlsbD0iIzY2NiIvPiAgICAgICAgICA8cGF0aCBkPSJNMjEyLjMyLDM1LjMyYzAsLjc4LS4zMiwxLjA3LS42OCwxLjA3LTEuMTYsMC0yLjQ5LS43OC0yLjQ5LTEuMjNWMzMuMDljMC0uNDItLjMyLS42OC0uODctLjY4SDE5OC4wOGEuNTcuNTcsMCwwLDAtLjY1LjY1djVhLjUxLjUxLDAsMCwwLC41NS41NWg5LjM0YS44LjgsMCwwLDEsLjkuODRWNDFjMCwuNTItLjM2Ljc0LS45Ljc0SDE5OGEuNTYuNTYsMCwwLDAtLjU4LjU4VjQ4YzAsLjM5LjIzLjM5LjY1LjM5aDEuNzRhLjguOCwwLDAsMSwuOTEuODRWNTAuNGMwLC41Mi0uMzYuNzQtLjkxLjc0SDE5MWMtLjU1LDAtLjktLjIzLS45LS43NFY0OS4yMWEuOC44LDAsMCwxLC45LS44NGgxLjc0Yy40MiwwLC42NSwwLC42NS0uMzlWMzIuOGMwLS4zOS0uMjMtLjM5LS42NS0uMzlIMTkxYS44LjgsMCwwLDEtLjktLjg0VjMwLjM3YzAtLjUyLjM2LS43NC45LS43NGgyMC4xM2ExLjE0LDEuMTQsMCwwLDEsMS4yMywxLjI5WiIgZmlsbD0iIzY2NiIvPiAgICAgICAgPC9nPiAgICAgICAgPGc+ICAgICAgICAgIDxwYXRoIGQ9Ik03LjM1LDYyLjMyYzUuNS02LjkxLDIxLjIxLTcuMTgsMjEuMjEtMTcuNTciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwOWRkYyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS13aWR0aD0iMy43MyIvPiAgICAgICAgICA8cGF0aCBkPSJNMjguNTYsNDQuNzVjMC0xMC4zOS0yMS4yMS03LjE4LTIxLjIxLTE3LjU4IiBmaWxsPSJub25lIiBzdHJva2U9IiNmY2I4MjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjMuNzMiLz4gICAgICAgICAgPHBhdGggZD0iTTcuMzUsMjcuMTdjMC0xMC4zOSwxNS4yOS0xMi43OSwyMS4yMS0xNy41OCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTAzYTNlIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIzLjczIi8+ICAgICAgICAgIDxyZWN0IHg9IjIzLjExIiB5PSI0LjEyIiB3aWR0aD0iMTAuNzMiIGhlaWdodD0iMTAuNzMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMwLjg5IDM5LjM5KSByb3RhdGUoLTExMy4wNCkiIGZpbGw9IiNmZmYiLz4gICAgICAgICAgPHBhdGggZD0iTTI0LjY1LDE5LDE5LDUuNjYsMzIuMjksMCwzOCwxMy4zWk0yMy44OCw3LjYzbDIuNzQsNi40NCw2LjQ0LTIuNzRMMzAuMzIsNC44OVoiIGZpbGw9IiM2NjYiLz4gICAgICAgICAgPGc+ICAgICAgICAgICAgPGNpcmNsZSBjeD0iNy4yMyIgY3k9IjYyLjI2IiByPSI1LjM2IiBmaWxsPSIjZmZmIi8+ICAgICAgICAgICAgPHBhdGggZD0iTTcuMjMsNjkuNDlhNy4yMyw3LjIzLDAsMSwxLDcuMjMtNy4yM0E3LjI0LDcuMjQsMCwwLDEsNy4yMyw2OS40OVptMC0xMC43M2EzLjUsMy41LDAsMSwwLDMuNSwzLjVBMy41LDMuNSwwLDAsMCw3LjIzLDU4Ljc2WiIgZmlsbD0iIzY2NiIvPiAgICAgICAgICA8L2c+ICAgICAgICA8L2c+ICAgICAgPC9nPjwvc3ZnPg==); height: 45px; margin:20px; /* width: 100%; */ padding-top: 20px; background-repeat: no-repeat; background-position: 50% 50%;}.warningtriangle{background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNzMuNTIgNjYuMDUiPiAgPHRpdGxlPndhcm5pbmdUcmlhbmdsZTwvdGl0bGU+ICAgICAgICAgIDxwYXRoIGQ9Ik05LDYzYTYsNiwwLDAsMS01LjE2LTguOTNMMzEuNiw2QTYsNiwwLDAsMSw0MS45Miw2TDY5LjcxLDU0LjEyQTYsNiwwLDAsMSw2NC41NSw2M1oiIGZpbGw9IiNmZmUxMDYiLz4gICAgICAgICAgPHBhdGggZD0iTTM2Ljc2LDZhMi45LDIuOSwwLDAsMSwyLjU2LDEuNDhMNjcuMTEsNTUuNjJBMywzLDAsMCwxLDY0LjU1LDYwSDlhMywzLDAsMCwxLTIuNTYtNC40M0wzNC4yLDcuNDhBMi45LDIuOSwwLDAsMSwzNi43Niw2bTAtNkE4Ljg3LDguODcsMCwwLDAsMjksNC40OEwxLjIxLDUyLjYyQTksOSwwLDAsMCw5LDY2SDY0LjU1YTksOSwwLDAsMCw3Ljc1LTEzLjQzTDQ0LjUxLDQuNDhBOC44Nyw4Ljg3LDAsMCwwLDM2Ljc2LDBaIiBmaWxsPSIjNjY2Ii8+ICAgICAgICA8cGF0aCBkPSJNMzYuNzgsNDcuNzVjMi4yNCwwLDMuNiwxLjQ1LDMuNiwzLjEzcy0xLjM1LDMuMTgtMy42LDMuMTgtMy42NS0xLjQtMy42NS0zLjE4UzM0LjU0LDQ3Ljc1LDM2Ljc4LDQ3Ljc1Wm0yLjQ4LTNhMSwxLDAsMCwxLTEuMTIsMS4wN0gzNS42NmExLDEsMCwwLDEtMS4xMi0xLjA3TDMzLjYxLDIxYTEsMSwwLDAsMSwxLjEyLTFoNC4zNWExLDEsMCwwLDEsMS4xMiwxWiIgZmlsbD0iIzY2NiIvPjwvc3ZnPg==) no-repeat; width: 24px; height: 24px; background-repeat: no-repeat; background-position: 50% 50%; /* display: inline-block; */}.uiElements .num-frames{}</style><div class="uiContainer"> <div class="uiPanel"><div class="svg2gif-logo"> </div><ul class="uiElements"> <li><label title="If this is blank ensure you have added a class to the SVG you wish to convert.">SVG class:<select style="left: 180px; position: absolute;" class="svg-tags"><option class="chooseOption" value="" selected>Choose...</option></select></label></li><li><label title="The current width and height of the SVG.">SVG size: <input onkeypress="return event.charCode >=48 && event.charCode <=57" class="svg-width" style="left: 180px; width: 60px; position: absolute;" type="text" name="svg-width" value="800"></label><label style="left:215px; position: absolute;">x</label><input onkeypress="return event.charCode >=48 && event.charCode <=57" class="svg-height" style="left: 278px; width: 60px; position: absolute;" type="text" name="svg-height" value="600"></li><li><label title="The background colour of the GIF (usually the background colour of the body).">BG Color: <input class="gif-background-color" style="left: 180px; width: 80px; position: absolute;" type="text" name="gif-background-color" value="#FFF"></label></li><li><label title="Default is 5. Higher values mean quicker conversion but may drain memory.">Workers: <input onkeypress="return event.charCode >=48 && event.charCode <=57" class="num-workers" style="left: 180px; width: 40px; position: absolute;" type="text" value="5" name="num-workers"></label></li><li><label title="The frame that will be the first frame of the GIF" >Start frame: <input onkeypress="return event.charCode >=48 && event.charCode <=57" class="start-frame" style="left: 180px; width: 80px; position: absolute;" type="text" name="start-frame" value="1"></label><label class="num-frames">Calculating...</label></li><li><label title="Repeat forever: 0 - Play once: -1" >Repeat: <input class="repeat-playback" style="left: 180px; width: 80px; position: absolute;" type="text" name="repeat-playback" value="0"></label></li></ul> <div class="uiButtonContainer"><input type="submit" name="play" value=" " class="playButton"><input disabled type="submit" name="commit" value="Convert SVG to GIF" class="form-sub uiButton-disabled"><div class="circleLoaderSVG"></div></div></div>';

        document.body.appendChild(ui);


        playButton = document.querySelector('.playButton');

        svgs = document.getElementsByTagName('svg');
        svgDropdown = document.querySelector('.svg-tags');


        for (var i = 0; i < svgs.length; i++) {
            var option = document.createElement('option');
            option.value = svgs[i].className.baseVal;
            option.innerHTML = (svgs[i].className.baseVal) ? svgs[i].className.baseVal : '[Unknown SVG]';
            svgDropdown.appendChild(option);
        }
        svgDropdown.onchange = dropdownChange;
        convertButton = document.querySelector('.form-sub');
        svgWidth = document.querySelector('.svg-width');
        svgHeight = document.querySelector('.svg-height');
        startFrame = document.querySelector('.start-frame');
        gsapTimeline = document.querySelector('.gsap-timeline');
        numWorkers = document.querySelector('.num-workers');
        bgColor = document.querySelector('.gif-background-color');
        numFrames = document.querySelector('.num-frames');
        repeatPlayback = document.querySelector('.repeat-playback');

        allTimelines = getTimelines();
        myTimeline = allTimelines[0];
        playButton.onclick = function() {

            myTimeline.play(0);
        }

        timelineFrames = Math.floor(myTimeline.totalDuration() / (1 / 30));

        timelineFrames = (timelineFrames > 9999999) ? '<div class="warningTriangle"></div> Set timeline repeat:0' : 'of ' + timelineFrames;
        numFrames.innerHTML = timelineFrames;


        convertButton.onclick = convert;


        myDragger = Draggable.create(document.querySelector('.uiPanel'), {

            bounds: window
        })

        window.onresize = function() {

            myDragger[0].applyBounds();
        }
    }




    function convert(e) {

        myTimeline.progress(0);




        mainButtonTl = new TimelineMax({
            onComplete: function() {
                new GIFMaker(obj).init();
            }
        });

        mainButtonTl.to('.uiElements', 1, {
                height: 1,
                width: 230,
                autoAlpha: 0,
                padding: 0,
                marginBottom: 0,
                ease: Back.easeOut.config(0.7)
            })

            .to(playButton, 0, {
                display: 'none'
            }, '-=1')
            .to('.uiPanel', 1, {
                width: 290,
                ease: Back.easeOut.config(0.7)
            }, '-=1')



        var obj = {
            preview: false,
            fps: 30,
            //startInMiddle:false, 
            workers: parseInt((numWorkers.value == "") ? 5 : numWorkers.value),
            timeline: myTimeline,
            svg: mySVG,
            svgWidth: (svgWidth.value != "") ? Number(svgWidth.value) : 800,
            svgHeight: (svgHeight.value != "") ? Number(svgHeight.value) : 600,
            startFrameValue: (startFrame.value != "") ? parseInt(startFrame.value) : 1,
            backgroundColor: bgColor.value,
            convertButton: convertButton,
            mainButtonTl: mainButtonTl,
            repeatPlayback: repeatPlayback.value
        }

        convertButton.value = "Converting...";


        var cTl = new TimelineMax()
        cTl.set('.circleLoaderSVG', {
                alpha: 1,
                visibility: 'visible',

                width: 40,
                height: 40

            })
            .to('.circleLoaderSVG', 1, {
                transformOrigin: '50% 50%',
                rotation: 360,
                ease: Linear.easeNone,
                repeat: -1
            })


    }


    function dropdownChange() {

        if (svgDropdown.value != '') {
            document.querySelector('.form-sub').disabled = false;
            document.querySelector('.form-sub').className = 'form-sub';

            mySVG = document.getElementsByClassName(svgDropdown.value)[0];

        } else {
            document.querySelector('.form-sub').className = 'form-sub uiButton-disabled';
            document.querySelector('.form-sub').disabled = true;
            mySVG = null;
        }


    }


    console.log("::SVG2GIF Loaded::")
    TweenMax.delayedCall(1, initConverter);
})()
