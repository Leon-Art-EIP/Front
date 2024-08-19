/*! For license information please see components-single-art-page-SingleArtPage-stories.f8e3b267.iframe.bundle.js.LICENSE.txt */
(self.webpackChunktmp = self.webpackChunktmp || []).push([
  [92],
  {
    "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js": function (
      module,
      __unused_webpack_exports,
      __webpack_require__
    ) {
      var _typeof = __webpack_require__("./node_modules/@babel/runtime/helpers/typeof.js").default;
      function _regeneratorRuntime() {
        "use strict";
        (module.exports = _regeneratorRuntime =
          function _regeneratorRuntime() {
            return e;
          }),
          (module.exports.__esModule = !0),
          (module.exports.default = module.exports);
        var t,
          e = {},
          r = Object.prototype,
          n = r.hasOwnProperty,
          o =
            Object.defineProperty ||
            function (t, e, r) {
              t[e] = r.value;
            },
          i = "function" == typeof Symbol ? Symbol : {},
          a = i.iterator || "@@iterator",
          c = i.asyncIterator || "@@asyncIterator",
          u = i.toStringTag || "@@toStringTag";
        function define(t, e, r) {
          return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e];
        }
        try {
          define({}, "");
        } catch (t) {
          define = function define(t, e, r) {
            return (t[e] = r);
          };
        }
        function wrap(t, e, r, n) {
          var i = e && e.prototype instanceof Generator ? e : Generator,
            a = Object.create(i.prototype),
            c = new Context(n || []);
          return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a;
        }
        function tryCatch(t, e, r) {
          try {
            return { type: "normal", arg: t.call(e, r) };
          } catch (t) {
            return { type: "throw", arg: t };
          }
        }
        e.wrap = wrap;
        var h = "suspendedStart",
          l = "suspendedYield",
          f = "executing",
          s = "completed",
          y = {};
        function Generator() {}
        function GeneratorFunction() {}
        function GeneratorFunctionPrototype() {}
        var p = {};
        define(p, a, function () {
          return this;
        });
        var d = Object.getPrototypeOf,
          v = d && d(d(values([])));
        v && v !== r && n.call(v, a) && (p = v);
        var g = (GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p));
        function defineIteratorMethods(t) {
          ["next", "throw", "return"].forEach(function (e) {
            define(t, e, function (t) {
              return this._invoke(e, t);
            });
          });
        }
        function AsyncIterator(t, e) {
          function invoke(r, o, i, a) {
            var c = tryCatch(t[r], t, o);
            if ("throw" !== c.type) {
              var u = c.arg,
                h = u.value;
              return h && "object" == _typeof(h) && n.call(h, "__await")
                ? e.resolve(h.__await).then(
                    function (t) {
                      invoke("next", t, i, a);
                    },
                    function (t) {
                      invoke("throw", t, i, a);
                    }
                  )
                : e.resolve(h).then(
                    function (t) {
                      (u.value = t), i(u);
                    },
                    function (t) {
                      return invoke("throw", t, i, a);
                    }
                  );
            }
            a(c.arg);
          }
          var r;
          o(this, "_invoke", {
            value: function value(t, n) {
              function callInvokeWithMethodAndArg() {
                return new e(function (e, r) {
                  invoke(t, n, e, r);
                });
              }
              return (r = r
                ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg)
                : callInvokeWithMethodAndArg());
            },
          });
        }
        function makeInvokeMethod(e, r, n) {
          var o = h;
          return function (i, a) {
            if (o === f) throw new Error("Generator is already running");
            if (o === s) {
              if ("throw" === i) throw a;
              return { value: t, done: !0 };
            }
            for (n.method = i, n.arg = a; ; ) {
              var c = n.delegate;
              if (c) {
                var u = maybeInvokeDelegate(c, n);
                if (u) {
                  if (u === y) continue;
                  return u;
                }
              }
              if ("next" === n.method) n.sent = n._sent = n.arg;
              else if ("throw" === n.method) {
                if (o === h) throw ((o = s), n.arg);
                n.dispatchException(n.arg);
              } else "return" === n.method && n.abrupt("return", n.arg);
              o = f;
              var p = tryCatch(e, r, n);
              if ("normal" === p.type) {
                if (((o = n.done ? s : l), p.arg === y)) continue;
                return { value: p.arg, done: n.done };
              }
              "throw" === p.type && ((o = s), (n.method = "throw"), (n.arg = p.arg));
            }
          };
        }
        function maybeInvokeDelegate(e, r) {
          var n = r.method,
            o = e.iterator[n];
          if (o === t)
            return (
              (r.delegate = null),
              ("throw" === n &&
                e.iterator.return &&
                ((r.method = "return"), (r.arg = t), maybeInvokeDelegate(e, r), "throw" === r.method)) ||
                ("return" !== n &&
                  ((r.method = "throw"),
                  (r.arg = new TypeError("The iterator does not provide a '" + n + "' method")))),
              y
            );
          var i = tryCatch(o, e.iterator, r.arg);
          if ("throw" === i.type) return (r.method = "throw"), (r.arg = i.arg), (r.delegate = null), y;
          var a = i.arg;
          return a
            ? a.done
              ? ((r[e.resultName] = a.value),
                (r.next = e.nextLoc),
                "return" !== r.method && ((r.method = "next"), (r.arg = t)),
                (r.delegate = null),
                y)
              : a
            : ((r.method = "throw"),
              (r.arg = new TypeError("iterator result is not an object")),
              (r.delegate = null),
              y);
        }
        function pushTryEntry(t) {
          var e = { tryLoc: t[0] };
          1 in t && (e.catchLoc = t[1]),
            2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
            this.tryEntries.push(e);
        }
        function resetTryEntry(t) {
          var e = t.completion || {};
          (e.type = "normal"), delete e.arg, (t.completion = e);
        }
        function Context(t) {
          (this.tryEntries = [{ tryLoc: "root" }]), t.forEach(pushTryEntry, this), this.reset(!0);
        }
        function values(e) {
          if (e || "" === e) {
            var r = e[a];
            if (r) return r.call(e);
            if ("function" == typeof e.next) return e;
            if (!isNaN(e.length)) {
              var o = -1,
                i = function next() {
                  for (; ++o < e.length; ) if (n.call(e, o)) return (next.value = e[o]), (next.done = !1), next;
                  return (next.value = t), (next.done = !0), next;
                };
              return (i.next = i);
            }
          }
          throw new TypeError(_typeof(e) + " is not iterable");
        }
        return (
          (GeneratorFunction.prototype = GeneratorFunctionPrototype),
          o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }),
          o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }),
          (GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction")),
          (e.isGeneratorFunction = function (t) {
            var e = "function" == typeof t && t.constructor;
            return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
          }),
          (e.mark = function (t) {
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(t, GeneratorFunctionPrototype)
                : ((t.__proto__ = GeneratorFunctionPrototype), define(t, u, "GeneratorFunction")),
              (t.prototype = Object.create(g)),
              t
            );
          }),
          (e.awrap = function (t) {
            return { __await: t };
          }),
          defineIteratorMethods(AsyncIterator.prototype),
          define(AsyncIterator.prototype, c, function () {
            return this;
          }),
          (e.AsyncIterator = AsyncIterator),
          (e.async = function (t, r, n, o, i) {
            void 0 === i && (i = Promise);
            var a = new AsyncIterator(wrap(t, r, n, o), i);
            return e.isGeneratorFunction(r)
              ? a
              : a.next().then(function (t) {
                  return t.done ? t.value : a.next();
                });
          }),
          defineIteratorMethods(g),
          define(g, u, "Generator"),
          define(g, a, function () {
            return this;
          }),
          define(g, "toString", function () {
            return "[object Generator]";
          }),
          (e.keys = function (t) {
            var e = Object(t),
              r = [];
            for (var n in e) r.push(n);
            return (
              r.reverse(),
              function next() {
                for (; r.length; ) {
                  var t = r.pop();
                  if (t in e) return (next.value = t), (next.done = !1), next;
                }
                return (next.done = !0), next;
              }
            );
          }),
          (e.values = values),
          (Context.prototype = {
            constructor: Context,
            reset: function reset(e) {
              if (
                ((this.prev = 0),
                (this.next = 0),
                (this.sent = this._sent = t),
                (this.done = !1),
                (this.delegate = null),
                (this.method = "next"),
                (this.arg = t),
                this.tryEntries.forEach(resetTryEntry),
                !e)
              )
                for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
            },
            stop: function stop() {
              this.done = !0;
              var t = this.tryEntries[0].completion;
              if ("throw" === t.type) throw t.arg;
              return this.rval;
            },
            dispatchException: function dispatchException(e) {
              if (this.done) throw e;
              var r = this;
              function handle(n, o) {
                return (a.type = "throw"), (a.arg = e), (r.next = n), o && ((r.method = "next"), (r.arg = t)), !!o;
              }
              for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                var i = this.tryEntries[o],
                  a = i.completion;
                if ("root" === i.tryLoc) return handle("end");
                if (i.tryLoc <= this.prev) {
                  var c = n.call(i, "catchLoc"),
                    u = n.call(i, "finallyLoc");
                  if (c && u) {
                    if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
                    if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
                  } else if (c) {
                    if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
                  } else {
                    if (!u) throw new Error("try statement without catch or finally");
                    if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
                  }
                }
              }
            },
            abrupt: function abrupt(t, e) {
              for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                var o = this.tryEntries[r];
                if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                  var i = o;
                  break;
                }
              }
              i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
              var a = i ? i.completion : {};
              return (
                (a.type = t),
                (a.arg = e),
                i ? ((this.method = "next"), (this.next = i.finallyLoc), y) : this.complete(a)
              );
            },
            complete: function complete(t, e) {
              if ("throw" === t.type) throw t.arg;
              return (
                "break" === t.type || "continue" === t.type
                  ? (this.next = t.arg)
                  : "return" === t.type
                  ? ((this.rval = this.arg = t.arg), (this.method = "return"), (this.next = "end"))
                  : "normal" === t.type && e && (this.next = e),
                y
              );
            },
            finish: function finish(t) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var r = this.tryEntries[e];
                if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
              }
            },
            catch: function _catch(t) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var r = this.tryEntries[e];
                if (r.tryLoc === t) {
                  var n = r.completion;
                  if ("throw" === n.type) {
                    var o = n.arg;
                    resetTryEntry(r);
                  }
                  return o;
                }
              }
              throw new Error("illegal catch attempt");
            },
            delegateYield: function delegateYield(e, r, n) {
              return (
                (this.delegate = { iterator: values(e), resultName: r, nextLoc: n }),
                "next" === this.method && (this.arg = t),
                y
              );
            },
          }),
          e
        );
      }
      (module.exports = _regeneratorRuntime),
        (module.exports.__esModule = !0),
        (module.exports.default = module.exports);
    },
    "./node_modules/@babel/runtime/helpers/typeof.js": function (module) {
      function _typeof(o) {
        return (
          (module.exports = _typeof =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (o) {
                  return typeof o;
                }
              : function (o) {
                  return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype
                    ? "symbol"
                    : typeof o;
                }),
          (module.exports.__esModule = !0),
          (module.exports.default = module.exports),
          _typeof(o)
        );
      }
      (module.exports = _typeof), (module.exports.__esModule = !0), (module.exports.default = module.exports);
    },
    "./node_modules/@babel/runtime/regenerator/index.js": function (
      module,
      __unused_webpack_exports,
      __webpack_require__
    ) {
      var runtime = __webpack_require__("./node_modules/@babel/runtime/helpers/regeneratorRuntime.js")();
      module.exports = runtime;
      try {
        regeneratorRuntime = runtime;
      } catch (accidentalStrictMode) {
        "object" == typeof globalThis
          ? (globalThis.regeneratorRuntime = runtime)
          : Function("r", "regeneratorRuntime = r")(runtime);
      }
    },
    "./src/components/single-art-page/SingleArtPage.stories.tsx": function (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      "use strict";
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          BelongingCollection: function () {
            return BelongingCollection;
          },
          BelongingCommands: function () {
            return BelongingCommands;
          },
          Liked: function () {
            return Liked;
          },
          Regular: function () {
            return Regular;
          },
          default: function () {
            return SingleArtPage_stories;
          },
        });
      var defineProperty = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
      function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg),
            value = info.value;
        } catch (error) {
          return void reject(error);
        }
        info.done ? resolve(value) : Promise.resolve(value).then(_next, _throw);
      }
      var react = __webpack_require__("./node_modules/next/dist/compiled/react/index.js"),
        regenerator = __webpack_require__("./node_modules/@babel/runtime/regenerator/index.js"),
        regenerator_default = __webpack_require__.n(regenerator),
        objectWithoutProperties = __webpack_require__(
          "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"
        ),
        next_image = __webpack_require__("./node_modules/@storybook/nextjs/dist/images/next-image.mjs"),
        _excluded = ["icon"],
        __jsx = react.createElement;
      function IconButton(_ref) {
        var Icon = _ref.icon,
          props = (0, objectWithoutProperties.Z)(_ref, _excluded);
        return __jsx(
          "button",
          {
            id: props.id,
            className: "rounded-full flex gap-4 px-6 py-2.5 text-white",
            style: { background: "".concat("black" === props.backgroundColor ? "#3E3E3E" : "#F3F3F3") },
            onClick: props.onClick,
          },
          __jsx(Icon, { style: { color: props.color } }),
          props.text
        );
      }
      (IconButton.displayName = "IconButton"),
        (IconButton.__docgenInfo = {
          description: "",
          methods: [],
          displayName: "IconButton",
          props: {
            text: { required: !1, tsType: { name: "string" }, description: "" },
            icon: {
              required: !0,
              tsType: {
                name: "ReactComponentType",
                raw: "React.ComponentType<SvgIconProps>",
                elements: [{ name: "SvgIconProps" }],
              },
              description: "",
            },
            backgroundColor: {
              required: !0,
              tsType: {
                name: "union",
                raw: '"grey" | "black"',
                elements: [
                  { name: "literal", value: '"grey"' },
                  { name: "literal", value: '"black"' },
                ],
              },
              description: "",
            },
            color: { required: !0, tsType: { name: "string" }, description: "" },
            id: { required: !1, tsType: { name: "string" }, description: "" },
          },
        });
      try {
        (IconButton.displayName = "IconButton"),
          (IconButton.__docgenInfo = {
            description: "",
            displayName: "IconButton",
            props: {
              text: { defaultValue: null, description: "", name: "text", required: !1, type: { name: "string" } },
              icon: {
                defaultValue: null,
                description: "",
                name: "icon",
                required: !0,
                type: { name: "ComponentType<SvgIconProps>" },
              },
              backgroundColor: {
                defaultValue: null,
                description: "",
                name: "backgroundColor",
                required: !0,
                type: { name: "enum", value: [{ value: '"grey"' }, { value: '"black"' }] },
              },
              onClick: {
                defaultValue: null,
                description: "",
                name: "onClick",
                required: !0,
                type: { name: "() => void" },
              },
              color: { defaultValue: null, description: "", name: "color", required: !0, type: { name: "string" } },
              id: { defaultValue: null, description: "", name: "id", required: !1, type: { name: "string" } },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/single-art-page/artwork/IconButton.tsx#IconButton"] = {
              docgenInfo: IconButton.__docgenInfo,
              name: "IconButton",
              path: "src/components/single-art-page/artwork/IconButton.tsx#IconButton",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var createSvgIcon = __webpack_require__("./node_modules/@mui/material/utils/createSvgIcon.js"),
        jsx_runtime = __webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),
        BookmarkBorder = (0, createSvgIcon.Z)(
          (0, jsx_runtime.jsx)("path", {
            d: "M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15-5-2.18L7 18V5h10v13z",
          }),
          "BookmarkBorder"
        ),
        Favorite = (0, createSvgIcon.Z)(
          (0, jsx_runtime.jsx)("path", {
            d: "m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
          }),
          "Favorite"
        ),
        FavoriteBorder = (0, createSvgIcon.Z)(
          (0, jsx_runtime.jsx)("path", {
            d: "M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z",
          }),
          "FavoriteBorder"
        ),
        SingleArtPageArtwork_excluded = ["link"],
        SingleArtPageArtwork_jsx = react.createElement;
      function SingleArtPageArtwork(_ref) {
        var Link = _ref.link,
          props = (0, objectWithoutProperties.Z)(_ref, SingleArtPageArtwork_excluded);
        return SingleArtPageArtwork_jsx(
          "div",
          { className: "flex flex-col gap-5" },
          SingleArtPageArtwork_jsx(next_image.Z, {
            src: props.art,
            alt: "art",
            width: 900,
            height: 500,
            className: "rounded-2xl",
          }),
          SingleArtPageArtwork_jsx(
            "div",
            { className: "flex" },
            SingleArtPageArtwork_jsx("div", { className: "flex flex-1 font-bold text-3xl" }, props.title),
            SingleArtPageArtwork_jsx(
              "div",
              { className: "inline-flex gap-4 items-center" },
              SingleArtPageArtwork_jsx(IconButton, {
                id: "bookmark-button",
                icon: BookmarkBorder,
                backgroundColor: "grey",
                onClick: props.bookmarkOnClick,
                color: "black",
              }),
              SingleArtPageArtwork_jsx(IconButton, {
                id: "like-button",
                icon: props.liked ? Favorite : FavoriteBorder,
                text: props.nbrLikes.toString(),
                backgroundColor: "black",
                onClick: props.heartOnClick,
                color: props.liked ? "red" : "white",
              })
            )
          ),
          SingleArtPageArtwork_jsx(
            "div",
            null,
            SingleArtPageArtwork_jsx(
              Link,
              {
                href: "/profile/".concat(props.artistId),
                className: "inline-flex items-center gap-5 hover:bg-secondaryGrey rounded-3xl px-4 py-2 cursor-pointer",
              },
              SingleArtPageArtwork_jsx(
                react.Fragment,
                null,
                SingleArtPageArtwork_jsx(next_image.Z, {
                  src: props.profile,
                  alt: "profile",
                  width: 40,
                  height: 44,
                  className: "rounded-3xl",
                }),
                props.artisteName
              )
            )
          )
        );
      }
      (SingleArtPageArtwork.displayName = "SingleArtPageArtwork"),
        (SingleArtPageArtwork.__docgenInfo = {
          description: "",
          methods: [],
          displayName: "SingleArtPageArtwork",
          props: {
            art: { required: !0, tsType: { name: "string" }, description: "" },
            profile: { required: !0, tsType: { name: "string" }, description: "" },
            artisteName: { required: !0, tsType: { name: "string" }, description: "" },
            artistId: { required: !0, tsType: { name: "number" }, description: "" },
            title: { required: !0, tsType: { name: "string" }, description: "" },
            liked: { required: !0, tsType: { name: "boolean" }, description: "" },
            nbrLikes: { required: !0, tsType: { name: "number" }, description: "" },
            link: {
              required: !0,
              tsType: {
                name: "ElementType",
                elements: [
                  {
                    name: "signature",
                    type: "object",
                    raw: "{ children: JSX.Element; href: string }",
                    signature: {
                      properties: [
                        { key: "children", value: { name: "JSX.Element", required: !0 } },
                        { key: "href", value: { name: "string", required: !0 } },
                      ],
                    },
                  },
                ],
                raw: "ElementType<{ children: JSX.Element; href: string }>",
              },
              description: "",
            },
          },
        });
      try {
        (SingleArtPageArtwork.displayName = "SingleArtPageArtwork"),
          (SingleArtPageArtwork.__docgenInfo = {
            description: "",
            displayName: "SingleArtPageArtwork",
            props: {
              art: { defaultValue: null, description: "", name: "art", required: !0, type: { name: "string" } },
              profile: { defaultValue: null, description: "", name: "profile", required: !0, type: { name: "string" } },
              artisteName: {
                defaultValue: null,
                description: "",
                name: "artisteName",
                required: !0,
                type: { name: "string" },
              },
              artistId: {
                defaultValue: null,
                description: "",
                name: "artistId",
                required: !0,
                type: { name: "number" },
              },
              title: { defaultValue: null, description: "", name: "title", required: !0, type: { name: "string" } },
              liked: { defaultValue: null, description: "", name: "liked", required: !0, type: { name: "boolean" } },
              nbrLikes: {
                defaultValue: null,
                description: "",
                name: "nbrLikes",
                required: !0,
                type: { name: "number" },
              },
              bookmarkOnClick: {
                defaultValue: null,
                description: "",
                name: "bookmarkOnClick",
                required: !0,
                type: { name: "() => void" },
              },
              heartOnClick: {
                defaultValue: null,
                description: "",
                name: "heartOnClick",
                required: !0,
                type: { name: "() => void" },
              },
              link: {
                defaultValue: null,
                description: "",
                name: "link",
                required: !0,
                type: { name: "ElementType<{ children: Element; href: string; }>" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "src/components/single-art-page/artwork/SingleArtPageArtwork.tsx#SingleArtPageArtwork"
            ] = {
              docgenInfo: SingleArtPageArtwork.__docgenInfo,
              name: "SingleArtPageArtwork",
              path: "src/components/single-art-page/artwork/SingleArtPageArtwork.tsx#SingleArtPageArtwork",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var Button_jsx = react.createElement;
      function Button(props) {
        return Button_jsx(
          "button",
          {
            id: props.id,
            disabled: props.disabled,
            onClick: props.onClick,
            className:
              "text-center text-white rounded-full lg:text-xl min-h-full px-8 py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed",
            style: { background: "".concat("primaryBlack" === props.backgroundColor ? "#2d142c" : "#e03915") },
          },
          props.title
        );
      }
      (Button.displayName = "Button"),
        (Button.__docgenInfo = {
          description: "",
          methods: [],
          displayName: "Button",
          props: {
            title: { required: !0, tsType: { name: "string" }, description: "" },
            backgroundColor: {
              required: !0,
              tsType: {
                name: "union",
                raw: '"primaryBlack" | "primary"',
                elements: [
                  { name: "literal", value: '"primaryBlack"' },
                  { name: "literal", value: '"primary"' },
                ],
              },
              description: "",
            },
            disabled: { required: !1, tsType: { name: "boolean" }, description: "" },
            id: { required: !1, tsType: { name: "string" }, description: "" },
          },
        });
      try {
        (Button.displayName = "Button"),
          (Button.__docgenInfo = {
            description: "",
            displayName: "Button",
            props: {
              title: { defaultValue: null, description: "", name: "title", required: !0, type: { name: "string" } },
              onClick: {
                defaultValue: null,
                description: "",
                name: "onClick",
                required: !1,
                type: { name: "(() => void)" },
              },
              backgroundColor: {
                defaultValue: null,
                description: "",
                name: "backgroundColor",
                required: !0,
                type: { name: "enum", value: [{ value: '"primaryBlack"' }, { value: '"primary"' }] },
              },
              disabled: {
                defaultValue: null,
                description: "",
                name: "disabled",
                required: !1,
                type: { name: "boolean" },
              },
              id: { defaultValue: null, description: "", name: "id", required: !1, type: { name: "string" } },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/single-art-page/card/Button.tsx#Button"] = {
              docgenInfo: Button.__docgenInfo,
              name: "Button",
              path: "src/components/single-art-page/card/Button.tsx#Button",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var Label_jsx = react.createElement;
      function Label(props) {
        return Label_jsx(
          "div",
          { className: "flex flex-col gap-5" },
          Label_jsx("div", { className: "text-xl font-bold" }, props.title),
          Label_jsx("div", { className: "text-justify text-lg" }, props.text)
        );
      }
      (Label.displayName = "Label"),
        (Label.__docgenInfo = {
          description: "",
          methods: [],
          displayName: "Label",
          props: {
            title: { required: !0, tsType: { name: "string" }, description: "" },
            text: { required: !0, tsType: { name: "string" }, description: "" },
          },
        });
      try {
        (Label.displayName = "Label"),
          (Label.__docgenInfo = {
            description: "",
            displayName: "Label",
            props: {
              title: { defaultValue: null, description: "", name: "title", required: !0, type: { name: "string" } },
              text: { defaultValue: null, description: "", name: "text", required: !0, type: { name: "string" } },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/single-art-page/card/Label.tsx#Label"] = {
              docgenInfo: Label.__docgenInfo,
              name: "Label",
              path: "src/components/single-art-page/card/Label.tsx#Label",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var NotificationToast = __webpack_require__("./src/components/lib/NotificationToast/NotificationToast.tsx"),
        Modal = __webpack_require__("./src/components/lib/Modal/Modal.tsx"),
        SingleArtPageCard_excluded =
          (__webpack_require__("./src/components/lib/Card/Card.tsx"),
          __webpack_require__("./src/components/lib/Button/Button.tsx"),
          __webpack_require__("./src/components/lib/Badge/Badge.tsx"),
          __webpack_require__("./src/components/lib/Input/Input.tsx"),
          ["link"]),
        SingleArtPageCard_jsx = react.createElement;
      function SingleArtPageCard(_ref) {
        var Link = _ref.link,
          props = (0, objectWithoutProperties.Z)(_ref, SingleArtPageCard_excluded),
          _useState = (0, react.useState)(!1),
          notificationToast = _useState[0],
          setNotificationToast = _useState[1],
          belongingCommands = props.belongingCommands || notificationToast;
        return SingleArtPageCard_jsx(
          "div",
          { className: "p-8 w-full h-full flex flex-col rounded-2xl bg-cardBackground gap-10" },
          SingleArtPageCard_jsx(Label, { title: "Description", text: props.description }),
          SingleArtPageCard_jsx(Label, { title: "Caractéristiques", text: props.caracteristics }),
          SingleArtPageCard_jsx(Label, { title: "Prix", text: "".concat(props.price.toString(), " €") }),
          SingleArtPageCard_jsx(
            "div",
            { className: "flex h-full items-end justify-center" },
            SingleArtPageCard_jsx(
              "div",
              { className: "flex gap-8 flex-wrap" },
              SingleArtPageCard_jsx(
                Link,
                { href: "/purchase" },
                SingleArtPageCard_jsx(Button, { backgroundColor: "primaryBlack", title: "Faire une offre" })
              ),
              SingleArtPageCard_jsx(Button, {
                id: "add-to-commands-button",
                disabled: belongingCommands,
                backgroundColor: "primary",
                title: (belongingCommands ? "Ajouté" : "Ajouter") + " aux commandes",
                onClick: function onClick() {
                  setNotificationToast(!0);
                },
              }),
              notificationToast &&
                SingleArtPageCard_jsx(NotificationToast.Z, { message: "Oeuvre ajoutée aux commandes", type: "success" })
            )
          )
        );
      }
      (SingleArtPageCard.displayName = "SingleArtPageCard"),
        (SingleArtPageCard.__docgenInfo = {
          description: "",
          methods: [],
          displayName: "SingleArtPageCard",
          props: {
            description: { required: !0, tsType: { name: "string" }, description: "" },
            caracteristics: { required: !0, tsType: { name: "string" }, description: "" },
            price: { required: !0, tsType: { name: "number" }, description: "" },
            link: {
              required: !0,
              tsType: {
                name: "ElementType",
                elements: [
                  {
                    name: "signature",
                    type: "object",
                    raw: "{ children: JSX.Element; href: string }",
                    signature: {
                      properties: [
                        { key: "children", value: { name: "JSX.Element", required: !0 } },
                        { key: "href", value: { name: "string", required: !0 } },
                      ],
                    },
                  },
                ],
                raw: "ElementType<{ children: JSX.Element; href: string }>",
              },
              description: "",
            },
            belongingCommands: { required: !0, tsType: { name: "boolean" }, description: "" },
          },
        });
      try {
        (SingleArtPageCard.displayName = "SingleArtPageCard"),
          (SingleArtPageCard.__docgenInfo = {
            description: "",
            displayName: "SingleArtPageCard",
            props: {
              description: {
                defaultValue: null,
                description: "",
                name: "description",
                required: !0,
                type: { name: "string" },
              },
              caracteristics: {
                defaultValue: null,
                description: "",
                name: "caracteristics",
                required: !0,
                type: { name: "string" },
              },
              price: { defaultValue: null, description: "", name: "price", required: !0, type: { name: "number" } },
              link: {
                defaultValue: null,
                description: "",
                name: "link",
                required: !0,
                type: { name: "ElementType<{ children: Element; href: string; }>" },
              },
              belongingCommands: {
                defaultValue: null,
                description: "",
                name: "belongingCommands",
                required: !0,
                type: { name: "boolean" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/single-art-page/card/SingleArtPageCard.tsx#SingleArtPageCard"] = {
              docgenInfo: SingleArtPageCard.__docgenInfo,
              name: "SingleArtPageCard",
              path: "src/components/single-art-page/card/SingleArtPageCard.tsx#SingleArtPageCard",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var toConsumableArray = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js"),
        cn = __webpack_require__("./src/tools/cn.ts"),
        Collections_jsx = react.createElement;
      function Collections(props) {
        return Collections_jsx(
          "div",
          { className: "flex flex-wrap gap-6 justify-center" },
          props.collections.map(function (collection) {
            return Collections_jsx(
              "div",
              {
                key: "collection-".concat(collection.id),
                id: "collection-".concat(collection.id),
                className: (0, cn.cn)(
                  "flex flex-col gap-2 pb-1 px-3 pt-3 rounded-3xl cursor-pointer",
                  props.selectedCollections.includes(collection.id)
                    ? "bg-[#FF7F74] text-white"
                    : "hover:bg-secondaryGrey"
                ),
                onClick: function onClick() {
                  return props.handleSelectCollection(collection.id);
                },
              },
              Collections_jsx(next_image.Z, {
                src: collection.picture,
                height: 250,
                width: 250,
                alt: "picture",
                className: "h-64 w-64 rounded-3xl",
              }),
              Collections_jsx("div", { className: "text-xl font-semibold text-center" }, collection.title)
            );
          })
        );
      }
      (Collections.displayName = "Collections"),
        (Collections.__docgenInfo = {
          description: "",
          methods: [],
          displayName: "Collections",
          props: {
            collections: {
              required: !0,
              tsType: {
                name: "Array",
                elements: [
                  {
                    name: "signature",
                    type: "object",
                    raw: "{\n  id: number;\n  picture: string;\n  title: string;\n}",
                    signature: {
                      properties: [
                        { key: "id", value: { name: "number", required: !0 } },
                        { key: "picture", value: { name: "string", required: !0 } },
                        { key: "title", value: { name: "string", required: !0 } },
                      ],
                    },
                  },
                ],
                raw: "TCollection[]",
              },
              description: "",
            },
            selectedCollections: {
              required: !0,
              tsType: { name: "Array", elements: [{ name: "number" }], raw: "number[]" },
              description: "",
            },
          },
        });
      try {
        (Collections.displayName = "Collections"),
          (Collections.__docgenInfo = {
            description: "",
            displayName: "Collections",
            props: {
              collections: {
                defaultValue: null,
                description: "",
                name: "collections",
                required: !0,
                type: { name: "TCollection[]" },
              },
              selectedCollections: {
                defaultValue: null,
                description: "",
                name: "selectedCollections",
                required: !0,
                type: { name: "number[]" },
              },
              handleSelectCollection: {
                defaultValue: null,
                description: "",
                name: "handleSelectCollection",
                required: !0,
                type: { name: "(id: number) => void" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/single-art-page/artwork/Collections.tsx#Collections"] = {
              docgenInfo: Collections.__docgenInfo,
              name: "Collections",
              path: "src/components/single-art-page/artwork/Collections.tsx#Collections",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var console = __webpack_require__("./node_modules/console-browserify/index.js"),
        SaveGallery_jsx = react.createElement;
      function SaveGallery(props) {
        return SaveGallery_jsx(
          "div",
          { className: "flex flex-col gap-7 px-2 pb-2" },
          SaveGallery_jsx(
            "div",
            { className: "flex flex-row justify-between items-center flex-wrap gap-4" },
            SaveGallery_jsx("button", { className: "text-xl font-medium", onClick: props.handleClose }, "Annuler"),
            SaveGallery_jsx(
              "div",
              { className: "md:block text-3xl font-bold hidden" },
              "Enregistrer dans les galeries"
            ),
            SaveGallery_jsx(
              "button",
              {
                id: "save-button",
                className: "bg-primary rounded-lg px-4 py-2 font-semibold text-xl text-white",
                onClick: function handleSave() {
                  console.log("oeuvre ajoutée aux collections : ", props.selectedCollections), props.handleClose();
                },
              },
              "Terminer"
            )
          ),
          SaveGallery_jsx(Collections, {
            collections: props.collections,
            selectedCollections: props.selectedCollections,
            handleSelectCollection: function handleSelectCollection(id) {
              props.selectedCollections.includes(id)
                ? props.setSelectedCollections(
                    props.selectedCollections.filter(function (collectionId) {
                      return collectionId !== id;
                    })
                  )
                : props.setSelectedCollections([].concat((0, toConsumableArray.Z)(props.selectedCollections), [id]));
            },
          })
        );
      }
      (SaveGallery.displayName = "SaveGallery"),
        (SaveGallery.__docgenInfo = {
          description: "",
          methods: [],
          displayName: "SaveGallery",
          props: {
            collections: {
              required: !0,
              tsType: { name: "Array", elements: [{ name: "TCollection" }], raw: "TCollection[]" },
              description: "",
            },
            belongingCollections: {
              required: !0,
              tsType: { name: "Array", elements: [{ name: "number" }], raw: "number[]" },
              description: "",
            },
            selectedCollections: {
              required: !0,
              tsType: { name: "Array", elements: [{ name: "number" }], raw: "number[]" },
              description: "",
            },
            setSelectedCollections: {
              required: !0,
              tsType: {
                name: "Dispatch",
                elements: [
                  {
                    name: "SetStateAction",
                    elements: [{ name: "Array", elements: [{ name: "number" }], raw: "number[]" }],
                    raw: "SetStateAction<number[]>",
                  },
                ],
                raw: "Dispatch<SetStateAction<number[]>>",
              },
              description: "",
            },
          },
        });
      try {
        (SaveGallery.displayName = "SaveGallery"),
          (SaveGallery.__docgenInfo = {
            description: "",
            displayName: "SaveGallery",
            props: {
              handleClose: {
                defaultValue: null,
                description: "",
                name: "handleClose",
                required: !0,
                type: { name: "() => void" },
              },
              collections: {
                defaultValue: null,
                description: "",
                name: "collections",
                required: !0,
                type: { name: "TCollection[]" },
              },
              belongingCollections: {
                defaultValue: null,
                description: "",
                name: "belongingCollections",
                required: !0,
                type: { name: "number[]" },
              },
              selectedCollections: {
                defaultValue: null,
                description: "",
                name: "selectedCollections",
                required: !0,
                type: { name: "number[]" },
              },
              setSelectedCollections: {
                defaultValue: null,
                description: "",
                name: "setSelectedCollections",
                required: !0,
                type: { name: "Dispatch<SetStateAction<number[]>>" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/single-art-page/artwork/SaveGallery.tsx#SaveGallery"] = {
              docgenInfo: SaveGallery.__docgenInfo,
              name: "SaveGallery",
              path: "src/components/single-art-page/artwork/SaveGallery.tsx#SaveGallery",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var SingleArtPage_console = __webpack_require__("./node_modules/console-browserify/index.js"),
        SingleArtPage_jsx = react.createElement;
      function SingleArtPage(props) {
        var _useState = (0, react.useState)(!1),
          isModalOpen = _useState[0],
          setModalOpen = _useState[1],
          _useState2 = (0, react.useState)(props.liked),
          isLiked = _useState2[0],
          setLiked = _useState2[1],
          _useState3 = (0, react.useState)(props.belongingCollections),
          selectedCollections = _useState3[0],
          setSelectedCollections = _useState3[1],
          nbrLikes = props.nbrLikes;
        props.liked && !isLiked ? (nbrLikes -= 1) : !props.liked && isLiked && (nbrLikes += 1);
        var closeModal = function closeModal() {
            setModalOpen(!1);
          },
          fetchLikePublication = (function () {
            var _ref = (function _asyncToGenerator(fn) {
              return function () {
                var self = this,
                  args = arguments;
                return new Promise(function (resolve, reject) {
                  var gen = fn.apply(self, args);
                  function _next(value) {
                    asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
                  }
                  function _throw(err) {
                    asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
                  }
                  _next(void 0);
                });
              };
            })(
              regenerator_default().mark(function _callee(id) {
                var token;
                return regenerator_default().wrap(function _callee$(_context) {
                  for (;;)
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        if ((token = localStorage.getItem("token"))) {
                          _context.next = 4;
                          break;
                        }
                        return SingleArtPage_console.log("No token found"), _context.abrupt("return");
                      case 4:
                        return (
                          (_context.next = 6),
                          fetch("".concat("http://back-dev.leonart-dev.ovh", "/api/art-publication/like/").concat(id), {
                            method: "POST",
                            headers: { "Content-Type": "application/json", Authorization: "Bearer ".concat(token) },
                          })
                        );
                      case 6:
                        _context.sent.ok
                          ? SingleArtPage_console.log("Successful like request")
                          : SingleArtPage_console.log("Failed with like request");
                      case 8:
                      case "end":
                        return _context.stop();
                    }
                }, _callee);
              })
            );
            return function fetchLikePublication(_x) {
              return _ref.apply(this, arguments);
            };
          })();
        return SingleArtPage_jsx(
          react.Fragment,
          null,
          SingleArtPage_jsx(
            Modal.Z,
            { isOpen: isModalOpen, handleClose: closeModal },
            SingleArtPage_jsx(SaveGallery, {
              collections: props.collections,
              handleClose: closeModal,
              belongingCollections: props.belongingCollections,
              selectedCollections: selectedCollections,
              setSelectedCollections: setSelectedCollections,
            })
          ),
          SingleArtPage_jsx(
            "div",
            { className: "flex p-20 gap-8 flex-wrap lg:flex-nowrap" },
            SingleArtPage_jsx(SingleArtPageArtwork, {
              art: props.art,
              profile: props.profile,
              artisteName: props.artistName,
              artistId: props.artistId,
              title: props.title,
              liked: isLiked,
              nbrLikes: nbrLikes,
              bookmarkOnClick: function bookmarkOnClick() {
                SingleArtPage_console.log("bookmark click"), setModalOpen(!isModalOpen);
              },
              heartOnClick: function heartOnClick() {
                fetchLikePublication(props.artId), setLiked(!isLiked);
              },
              link: props.link,
            }),
            SingleArtPage_jsx(SingleArtPageCard, {
              caracteristics: props.caracteristics,
              description: props.description,
              price: props.price,
              link: props.link,
              belongingCommands: props.belongingCommands,
            })
          )
        );
      }
      SingleArtPage.__docgenInfo = {
        description: "",
        methods: [],
        displayName: "SingleArtPage",
        props: {
          description: { required: !0, tsType: { name: "string" }, description: "" },
          caracteristics: { required: !0, tsType: { name: "string" }, description: "" },
          price: { required: !0, tsType: { name: "number" }, description: "" },
          art: { required: !0, tsType: { name: "string" }, description: "" },
          artId: { required: !0, tsType: { name: "number" }, description: "" },
          profile: { required: !0, tsType: { name: "string" }, description: "" },
          artistName: { required: !0, tsType: { name: "string" }, description: "" },
          artistId: { required: !0, tsType: { name: "number" }, description: "" },
          title: { required: !0, tsType: { name: "string" }, description: "" },
          liked: { required: !0, tsType: { name: "boolean" }, description: "" },
          nbrLikes: { required: !0, tsType: { name: "number" }, description: "" },
          collections: {
            required: !0,
            tsType: { name: "Array", elements: [{ name: "TCollection" }], raw: "TCollection[]" },
            description: "",
          },
          belongingCollections: {
            required: !0,
            tsType: { name: "Array", elements: [{ name: "number" }], raw: "number[]" },
            description: "",
          },
          belongingCommands: { required: !0, tsType: { name: "boolean" }, description: "" },
          link: {
            required: !0,
            tsType: {
              name: "ElementType",
              elements: [
                {
                  name: "signature",
                  type: "object",
                  raw: "{ children: JSX.Element; href: string }",
                  signature: {
                    properties: [
                      { key: "children", value: { name: "JSX.Element", required: !0 } },
                      { key: "href", value: { name: "string", required: !0 } },
                    ],
                  },
                },
              ],
              raw: "ElementType<{ children: JSX.Element; href: string }>",
            },
            description: "",
          },
        },
      };
      try {
        (SingleArtPage.displayName = "SingleArtPage"),
          (SingleArtPage.__docgenInfo = {
            description: "",
            displayName: "SingleArtPage",
            props: {
              description: {
                defaultValue: null,
                description: "",
                name: "description",
                required: !0,
                type: { name: "string" },
              },
              caracteristics: {
                defaultValue: null,
                description: "",
                name: "caracteristics",
                required: !0,
                type: { name: "string" },
              },
              price: { defaultValue: null, description: "", name: "price", required: !0, type: { name: "number" } },
              art: { defaultValue: null, description: "", name: "art", required: !0, type: { name: "string" } },
              artId: { defaultValue: null, description: "", name: "artId", required: !0, type: { name: "number" } },
              profile: { defaultValue: null, description: "", name: "profile", required: !0, type: { name: "string" } },
              artistName: {
                defaultValue: null,
                description: "",
                name: "artistName",
                required: !0,
                type: { name: "string" },
              },
              artistId: {
                defaultValue: null,
                description: "",
                name: "artistId",
                required: !0,
                type: { name: "number" },
              },
              title: { defaultValue: null, description: "", name: "title", required: !0, type: { name: "string" } },
              liked: { defaultValue: null, description: "", name: "liked", required: !0, type: { name: "boolean" } },
              nbrLikes: {
                defaultValue: null,
                description: "",
                name: "nbrLikes",
                required: !0,
                type: { name: "number" },
              },
              collections: {
                defaultValue: null,
                description: "",
                name: "collections",
                required: !0,
                type: { name: "TCollection[]" },
              },
              belongingCollections: {
                defaultValue: null,
                description: "",
                name: "belongingCollections",
                required: !0,
                type: { name: "number[]" },
              },
              belongingCommands: {
                defaultValue: null,
                description: "",
                name: "belongingCommands",
                required: !0,
                type: { name: "boolean" },
              },
              link: {
                defaultValue: null,
                description: "",
                name: "link",
                required: !0,
                type: { name: "ElementType<{ children: Element; href: string; }>" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/single-art-page/SingleArtPage.tsx#SingleArtPage"] = {
              docgenInfo: SingleArtPage.__docgenInfo,
              name: "SingleArtPage",
              path: "src/components/single-art-page/SingleArtPage.tsx#SingleArtPage",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var _Regular$parameters,
        _Regular$parameters2,
        _Liked$parameters,
        _Liked$parameters2,
        _BelongingCollection$,
        _BelongingCollection$2,
        _BelongingCommands$pa,
        _BelongingCommands$pa2;
      function ownKeys(e, r) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          r &&
            (o = o.filter(function (r) {
              return Object.getOwnPropertyDescriptor(e, r).enumerable;
            })),
            t.push.apply(t, o);
        }
        return t;
      }
      function _objectSpread(e) {
        for (var r = 1; r < arguments.length; r++) {
          var t = null != arguments[r] ? arguments[r] : {};
          r % 2
            ? ownKeys(Object(t), !0).forEach(function (r) {
                (0, defineProperty.Z)(e, r, t[r]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
            : ownKeys(Object(t)).forEach(function (r) {
                Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
              });
        }
        return e;
      }
      var SingleArtPage_stories = { title: "Components/SingleArtPage", component: SingleArtPage },
        Regular = {
          args: _objectSpread(
            _objectSpread(
              {},
              {
                description:
                  "Cette peinture est l’expression la plus pure du mélange chaud/froid, défini par les différentes teintes de rose et de bleu. Ici, nous pouvons assister à un affrontement au sein même de la nature : le froid et la tristesse des vagues contre la chaleur ainsi que l’aridité du désert rosé.",
                caracteristics: "Peinture - Huile sur toile, 187 x 121 cm",
                price: 199,
                art: {
                  src: "static/media/art1.4b65827c.jpeg",
                  height: 1300,
                  width: 1733,
                  blurDataURL: "static/media/art1.4b65827c.jpeg",
                },
                artId: 1,
                profile: {
                  src: "static/media/profile1.a0c0c01b.jpeg",
                  height: 1300,
                  width: 1475,
                  blurDataURL: "static/media/profile1.a0c0c01b.jpeg",
                },
                artistName: "Rosalia Basquiat",
                artistId: 1,
                title: "Mer de dunes noyées",
                liked: !1,
                nbrLikes: 457,
                collections: [
                  {
                    id: 1,
                    picture: {
                      src: "static/media/picture1.3d974388.jpeg",
                      height: 1300,
                      width: 1729,
                      blurDataURL: "static/media/picture1.3d974388.jpeg",
                    },
                    title: "Collection 1",
                  },
                  {
                    id: 2,
                    picture: {
                      src: "static/media/picture2.68f8901a.jpeg",
                      height: 1080,
                      width: 1920,
                      blurDataURL: "static/media/picture2.68f8901a.jpeg",
                    },
                    title: "Collection 2",
                  },
                  {
                    id: 3,
                    picture: {
                      src: "static/media/picture3.500d596b.jpeg",
                      height: 1440,
                      width: 2560,
                      blurDataURL: "static/media/picture3.500d596b.jpeg",
                    },
                    title: "Collection 3",
                  },
                ],
                belongingCollections: [],
                belongingCommands: !1,
              }
            ),
            {},
            { link: "a" }
          ),
        },
        Liked = { args: _objectSpread(_objectSpread({}, Regular.args), {}, { liked: !0 }) },
        BelongingCollection = { args: _objectSpread(_objectSpread({}, Liked.args), {}, { belongingCollections: [1] }) },
        BelongingCommands = {
          args: _objectSpread(_objectSpread({}, BelongingCollection.args), {}, { belongingCommands: !0 }),
        };
      (Regular.parameters = _objectSpread(
        _objectSpread({}, Regular.parameters),
        {},
        {
          docs: _objectSpread(
            _objectSpread(
              {},
              null === (_Regular$parameters = Regular.parameters) || void 0 === _Regular$parameters
                ? void 0
                : _Regular$parameters.docs
            ),
            {},
            {
              source: _objectSpread(
                { originalSource: '{\n  args: {\n    ...fakeData,\n    link: "a"\n  }\n}' },
                null === (_Regular$parameters2 = Regular.parameters) ||
                  void 0 === _Regular$parameters2 ||
                  null === (_Regular$parameters2 = _Regular$parameters2.docs) ||
                  void 0 === _Regular$parameters2
                  ? void 0
                  : _Regular$parameters2.source
              ),
            }
          ),
        }
      )),
        (Liked.parameters = _objectSpread(
          _objectSpread({}, Liked.parameters),
          {},
          {
            docs: _objectSpread(
              _objectSpread(
                {},
                null === (_Liked$parameters = Liked.parameters) || void 0 === _Liked$parameters
                  ? void 0
                  : _Liked$parameters.docs
              ),
              {},
              {
                source: _objectSpread(
                  { originalSource: "{\n  args: {\n    ...Regular.args,\n    liked: true\n  }\n}" },
                  null === (_Liked$parameters2 = Liked.parameters) ||
                    void 0 === _Liked$parameters2 ||
                    null === (_Liked$parameters2 = _Liked$parameters2.docs) ||
                    void 0 === _Liked$parameters2
                    ? void 0
                    : _Liked$parameters2.source
                ),
              }
            ),
          }
        )),
        (BelongingCollection.parameters = _objectSpread(
          _objectSpread({}, BelongingCollection.parameters),
          {},
          {
            docs: _objectSpread(
              _objectSpread(
                {},
                null === (_BelongingCollection$ = BelongingCollection.parameters) || void 0 === _BelongingCollection$
                  ? void 0
                  : _BelongingCollection$.docs
              ),
              {},
              {
                source: _objectSpread(
                  { originalSource: "{\n  args: {\n    ...Liked.args,\n    belongingCollections: [1]\n  }\n}" },
                  null === (_BelongingCollection$2 = BelongingCollection.parameters) ||
                    void 0 === _BelongingCollection$2 ||
                    null === (_BelongingCollection$2 = _BelongingCollection$2.docs) ||
                    void 0 === _BelongingCollection$2
                    ? void 0
                    : _BelongingCollection$2.source
                ),
              }
            ),
          }
        )),
        (BelongingCommands.parameters = _objectSpread(
          _objectSpread({}, BelongingCommands.parameters),
          {},
          {
            docs: _objectSpread(
              _objectSpread(
                {},
                null === (_BelongingCommands$pa = BelongingCommands.parameters) || void 0 === _BelongingCommands$pa
                  ? void 0
                  : _BelongingCommands$pa.docs
              ),
              {},
              {
                source: _objectSpread(
                  {
                    originalSource:
                      "{\n  args: {\n    ...BelongingCollection.args,\n    belongingCommands: true\n  }\n}",
                  },
                  null === (_BelongingCommands$pa2 = BelongingCommands.parameters) ||
                    void 0 === _BelongingCommands$pa2 ||
                    null === (_BelongingCommands$pa2 = _BelongingCommands$pa2.docs) ||
                    void 0 === _BelongingCommands$pa2
                    ? void 0
                    : _BelongingCommands$pa2.source
                ),
              }
            ),
          }
        ));
    },
    "./src/components/lib/Badge/Badge.tsx": function (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      "use strict";
      var __jsx = __webpack_require__("./node_modules/next/dist/compiled/react/index.js").createElement,
        Badge = function Badge(_ref) {
          var badgeColor,
            text = _ref.text;
          switch (_ref.color) {
            case "danger":
              badgeColor = "bg-red-600 text-white";
              break;
            case "success":
              badgeColor = "bg-gray-200 text-purple-800";
              break;
            case "info":
              badgeColor = "bg-purple-800 text-white";
              break;
            default:
              badgeColor = "";
          }
          return __jsx(
            "span",
            { className: "inline-block py-3 px-5 rounded-full text-sm font-semibold ".concat(badgeColor) },
            text
          );
        };
      (Badge.displayName = "Badge"),
        (Badge.__docgenInfo = { description: "", methods: [], displayName: "Badge" }),
        (__webpack_exports__.Z = Badge);
      try {
        (Badge.displayName = "Badge"),
          (Badge.__docgenInfo = {
            description: "",
            displayName: "Badge",
            props: {
              text: { defaultValue: null, description: "", name: "text", required: !0, type: { name: "string" } },
              color: {
                defaultValue: null,
                description: "",
                name: "color",
                required: !1,
                type: { name: "enum", value: [{ value: '"danger"' }, { value: '"success"' }, { value: '"info"' }] },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/lib/Badge/Badge.tsx#Badge"] = {
              docgenInfo: Badge.__docgenInfo,
              name: "Badge",
              path: "src/components/lib/Badge/Badge.tsx#Badge",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./src/components/lib/Button/Button.tsx": function (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      "use strict";
      var __jsx = __webpack_require__("./node_modules/next/dist/compiled/react/index.js").createElement,
        Button = function Button(_ref) {
          var buttonColor,
            hoverColor,
            onClick = _ref.onClick,
            children = _ref.children;
          switch (_ref.color) {
            case "danger":
              (buttonColor = "bg-red-600 text-white"), (hoverColor = "hover:bg-red-700");
              break;
            case "success":
              (buttonColor = "bg-gray-200 text-purple-800"), (hoverColor = "hover:bg-gray-300");
              break;
            case "info":
              (buttonColor = "bg-purple-800 text-white"), (hoverColor = "hover:bg-purple-900");
              break;
            default:
              (buttonColor = ""), (hoverColor = "");
          }
          return __jsx(
            "button",
            {
              className:
                "rounded-lg py-3 px-10 text-base font-semibold cursor-pointer transition-colors duration-300 ease-in-out "
                  .concat(buttonColor, " ")
                  .concat(hoverColor),
              onClick: onClick,
            },
            children
          );
        };
      (Button.displayName = "Button"),
        (Button.__docgenInfo = { description: "", methods: [], displayName: "Button" }),
        (__webpack_exports__.Z = Button);
      try {
        (Button.displayName = "Button"),
          (Button.__docgenInfo = {
            description: "",
            displayName: "Button",
            props: {
              onClick: {
                defaultValue: null,
                description: "",
                name: "onClick",
                required: !0,
                type: { name: "() => void" },
              },
              color: {
                defaultValue: null,
                description: "",
                name: "color",
                required: !1,
                type: { name: "enum", value: [{ value: '"danger"' }, { value: '"success"' }, { value: '"info"' }] },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/lib/Button/Button.tsx#Button"] = {
              docgenInfo: Button.__docgenInfo,
              name: "Button",
              path: "src/components/lib/Button/Button.tsx#Button",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./src/components/lib/Card/Card.tsx": function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";
      var __jsx = __webpack_require__("./node_modules/next/dist/compiled/react/index.js").createElement,
        Card = function Card(_ref) {
          var title = _ref.title,
            children = _ref.children;
          return __jsx(
            "div",
            { className: "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl" },
            __jsx(
              "div",
              { className: "md:flex" },
              __jsx("div", { className: "md:flex-shrink-0" }),
              __jsx(
                "div",
                { className: "p-8" },
                __jsx("div", { className: "uppercase tracking-wide text-sm text-indigo-500 font-semibold" }, title),
                __jsx("div", { className: "mt-2 text-gray-500" }, children)
              )
            )
          );
        };
      (Card.displayName = "Card"),
        (Card.__docgenInfo = { description: "", methods: [], displayName: "Card" }),
        (__webpack_exports__.Z = Card);
      try {
        (Card.displayName = "Card"),
          (Card.__docgenInfo = {
            description: "",
            displayName: "Card",
            props: {
              title: { defaultValue: null, description: "", name: "title", required: !0, type: { name: "string" } },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/lib/Card/Card.tsx#Card"] = {
              docgenInfo: Card.__docgenInfo,
              name: "Card",
              path: "src/components/lib/Card/Card.tsx#Card",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./src/components/lib/Input/Input.tsx": function (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      "use strict";
      __webpack_require__.d(__webpack_exports__, {
        Z: function () {
          return Input;
        },
      });
      var __jsx = __webpack_require__("./node_modules/next/dist/compiled/react/index.js").createElement;
      function Input(_ref) {
        var value = _ref.value,
          type = _ref.type,
          name = _ref.name,
          placeholder = _ref.placeholder,
          _onChange = _ref.onChange,
          id = _ref.id;
        return __jsx("input", {
          id: id,
          value: value,
          type: type,
          name: name,
          placeholder: placeholder,
          onChange: function onChange(e) {
            return _onChange(e.target.value);
          },
          className: "rounded-full bg-gray-200 px-8 py-3 text-black font-semibold",
        });
      }
      (Input.displayName = "Input"),
        (Input.__docgenInfo = {
          description: "",
          methods: [],
          displayName: "Input",
          props: {
            value: { required: !0, tsType: { name: "string" }, description: "" },
            type: { required: !0, tsType: { name: "string" }, description: "" },
            name: { required: !0, tsType: { name: "string" }, description: "" },
            placeholder: { required: !0, tsType: { name: "string" }, description: "" },
            onChange: {
              required: !0,
              tsType: {
                name: "signature",
                type: "function",
                raw: "(value: string) => void",
                signature: { arguments: [{ name: "value", type: { name: "string" } }], return: { name: "void" } },
              },
              description: "",
            },
            id: { required: !1, tsType: { name: "string" }, description: "" },
          },
        });
      try {
        (Input.displayName = "Input"),
          (Input.__docgenInfo = {
            description: "",
            displayName: "Input",
            props: {
              value: { defaultValue: null, description: "", name: "value", required: !0, type: { name: "string" } },
              type: { defaultValue: null, description: "", name: "type", required: !0, type: { name: "string" } },
              name: { defaultValue: null, description: "", name: "name", required: !0, type: { name: "string" } },
              placeholder: {
                defaultValue: null,
                description: "",
                name: "placeholder",
                required: !0,
                type: { name: "string" },
              },
              onChange: {
                defaultValue: null,
                description: "",
                name: "onChange",
                required: !0,
                type: { name: "(value: string) => void" },
              },
              id: { defaultValue: null, description: "", name: "id", required: !1, type: { name: "string" } },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/lib/Input/Input.tsx#Input"] = {
              docgenInfo: Input.__docgenInfo,
              name: "Input",
              path: "src/components/lib/Input/Input.tsx#Input",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./src/components/lib/Modal/Modal.tsx": function (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      "use strict";
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/next/dist/compiled/react/index.js"),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement,
        Modal = function Modal(_ref) {
          var isOpen = _ref.isOpen,
            handleClose = _ref.handleClose,
            children = _ref.children;
          return (
            (0, react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(
              function () {
                isOpen
                  ? document.body.classList.add("overflow-hidden")
                  : document.body.classList.remove("overflow-hidden");
              },
              [isOpen]
            ),
            isOpen
              ? __jsx(
                  "div",
                  {
                    className: "fixed z-50 inset-0 overflow-y-auto",
                    "aria-labelledby": "modal-title",
                    role: "dialog",
                    "aria-modal": "true",
                  },
                  __jsx(
                    "div",
                    {
                      className:
                        "flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0",
                    },
                    __jsx("div", {
                      onClick: handleClose,
                      className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity",
                      "aria-hidden": "true",
                    }),
                    __jsx(
                      "span",
                      { className: "hidden sm:inline-block sm:align-middle sm:h-screen", "aria-hidden": "true" },
                      "​"
                    ),
                    __jsx(
                      "div",
                      {
                        className:
                          "inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all max-w-[95%] sm:my-8 sm:align-middle",
                      },
                      __jsx("div", { className: "bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, children)
                    )
                  )
                )
              : null
          );
        };
      (Modal.displayName = "Modal"),
        (Modal.__docgenInfo = { description: "", methods: [], displayName: "Modal" }),
        (__webpack_exports__.Z = Modal);
      try {
        (Modal.displayName = "Modal"),
          (Modal.__docgenInfo = {
            description: "",
            displayName: "Modal",
            props: {
              isOpen: { defaultValue: null, description: "", name: "isOpen", required: !0, type: { name: "boolean" } },
              handleClose: {
                defaultValue: null,
                description: "",
                name: "handleClose",
                required: !0,
                type: { name: "() => void" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/lib/Modal/Modal.tsx#Modal"] = {
              docgenInfo: Modal.__docgenInfo,
              name: "Modal",
              path: "src/components/lib/Modal/Modal.tsx#Modal",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./src/components/lib/NotificationToast/NotificationToast.tsx": function (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      "use strict";
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/next/dist/compiled/react/index.js"),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement,
        NotificationToast = function NotificationToast(_ref) {
          var message = _ref.message,
            type = _ref.type,
            _useState = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(!0),
            visible = _useState[0],
            setVisible = _useState[1];
          (0, react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
            var timer = setTimeout(function () {
              setVisible(!1);
            }, 5e3);
            return function () {
              clearTimeout(timer);
            };
          }, []);
          var borderColor;
          switch (type) {
            case "success":
              borderColor = "border-green-500";
              break;
            case "error":
              borderColor = "border-red-500";
              break;
            case "info":
              borderColor = "border-blue-500";
          }
          return visible
            ? __jsx(
                "div",
                {
                  className: "fixed right-0 top-0 m-6 p-4 border-2 ".concat(
                    borderColor,
                    " rounded-md bg-white shadow-lg z-50"
                  ),
                },
                __jsx(
                  "button",
                  {
                    id: "close-toast",
                    className: "float-right",
                    onClick: function closeToast() {
                      setVisible(!1);
                    },
                  },
                  "X"
                ),
                __jsx("p", null, message)
              )
            : null;
        };
      (NotificationToast.__docgenInfo = { description: "", methods: [], displayName: "NotificationToast" }),
        (__webpack_exports__.Z = NotificationToast);
      try {
        (NotificationToast.displayName = "NotificationToast"),
          (NotificationToast.__docgenInfo = {
            description: "",
            displayName: "NotificationToast",
            props: {
              message: { defaultValue: null, description: "", name: "message", required: !0, type: { name: "string" } },
              type: {
                defaultValue: null,
                description: "",
                name: "type",
                required: !0,
                type: { name: "enum", value: [{ value: '"success"' }, { value: '"info"' }, { value: '"error"' }] },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/lib/NotificationToast/NotificationToast.tsx#NotificationToast"] = {
              docgenInfo: NotificationToast.__docgenInfo,
              name: "NotificationToast",
              path: "src/components/lib/NotificationToast/NotificationToast.tsx#NotificationToast",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./src/tools/cn.ts": function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.d(__webpack_exports__, {
        cn: function () {
          return cn;
        },
      });
      var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/classnames/index.js"),
        classnames__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
          classnames__WEBPACK_IMPORTED_MODULE_0__
        );
      function cn() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++)
          args[_key] = arguments[_key];
        return classnames__WEBPACK_IMPORTED_MODULE_0___default()(args);
      }
    },
  },
]);
