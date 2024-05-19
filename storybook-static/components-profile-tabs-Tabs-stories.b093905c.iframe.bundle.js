/*! For license information please see components-profile-tabs-Tabs-stories.b093905c.iframe.bundle.js.LICENSE.txt */
(self.webpackChunktmp = self.webpackChunktmp || []).push([
  [100],
  {
    "./node_modules/@babel/runtime/helpers/esm/defineProperty.js": function (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      "use strict";
      function _typeof(o) {
        return (
          (_typeof =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (o) {
                  return typeof o;
                }
              : function (o) {
                  return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype
                    ? "symbol"
                    : typeof o;
                }),
          _typeof(o)
        );
      }
      function _toPropertyKey(arg) {
        var key = (function _toPrimitive(input, hint) {
          if ("object" !== _typeof(input) || null === input) return input;
          var prim = input[Symbol.toPrimitive];
          if (void 0 !== prim) {
            var res = prim.call(input, hint || "default");
            if ("object" !== _typeof(res)) return res;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === hint ? String : Number)(input);
        })(arg, "string");
        return "symbol" === _typeof(key) ? key : String(key);
      }
      function _defineProperty(obj, key, value) {
        return (
          (key = _toPropertyKey(key)) in obj
            ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 })
            : (obj[key] = value),
          obj
        );
      }
      __webpack_require__.d(__webpack_exports__, {
        Z: function () {
          return _defineProperty;
        },
      });
    },
    "./src/components/profile/tabs/Tabs.stories.tsx": function (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      "use strict";
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          AboutSelected: function () {
            return AboutSelected;
          },
          CollectionsSelected: function () {
            return CollectionsSelected;
          },
          PublicationsSelected: function () {
            return PublicationsSelected;
          },
          default: function () {
            return Tabs_stories;
          },
        });
      var _PublicationsSelected,
        _PublicationsSelected2,
        _CollectionsSelected$,
        _CollectionsSelected$2,
        _AboutSelected$parame,
        _AboutSelected$parame2,
        defineProperty = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),
        react = __webpack_require__("./node_modules/next/dist/compiled/react/index.js"),
        cn = __webpack_require__("./src/tools/cn.ts"),
        __jsx = react.createElement;
      function Tabs(props) {
        return __jsx(
          "div",
          { className: "relative h-[40px] rounded-full" },
          __jsx(
            "button",
            {
              className: (0, cn.cn)(
                "absolute w-1/3 h-full z-20 grid grid-cols-1 items-center border-4 border-white rounded-full text-center",
                "publications" === props.selectedTab ? "bg-primary text-white" : "bg-[#ECECEC]"
              ),
              onClick: props.publicationsTabOnClick,
            },
            "Publications"
          ),
          __jsx(
            "button",
            {
              className: (0, cn.cn)(
                "absolute w-2/3 h-full z-10 grid grid-cols-2 items-center border-4 border-white rounded-full",
                "collections" === props.selectedTab ? "bg-primary text-white" : "bg-[#ECECEC]"
              ),
              onClick: props.collectionsTabOnClick,
            },
            __jsx("div", { className: "text-center" }, "First div"),
            __jsx("div", { className: "text-center" }, "Collections")
          ),
          __jsx(
            "button",
            {
              className: (0, cn.cn)(
                "absolute w-full h-full z-0 grid grid-cols-3 items-center border-4 border-white rounded-full",
                "about" === props.selectedTab ? "bg-primary text-white" : "bg-[#ECECEC]"
              ),
              onClick: props.aboutTabOnClick,
            },
            __jsx("div", { className: "text-center" }, "First div"),
            __jsx("div", { className: "text-center" }, "Second div"),
            __jsx("div", { className: "text-center" }, "A propos")
          )
        );
      }
      (Tabs.displayName = "Tabs"),
        (Tabs.__docgenInfo = {
          description: "",
          methods: [],
          displayName: "Tabs",
          props: {
            publicationsTabOnClick: {
              required: !0,
              tsType: {
                name: "signature",
                type: "function",
                raw: "() => void",
                signature: { arguments: [], return: { name: "void" } },
              },
              description: "",
            },
            collectionsTabOnClick: {
              required: !0,
              tsType: {
                name: "signature",
                type: "function",
                raw: "() => void",
                signature: { arguments: [], return: { name: "void" } },
              },
              description: "",
            },
            aboutTabOnClick: {
              required: !0,
              tsType: {
                name: "signature",
                type: "function",
                raw: "() => void",
                signature: { arguments: [], return: { name: "void" } },
              },
              description: "",
            },
            selectedTab: {
              required: !0,
              tsType: {
                name: "union",
                raw: '"publications" | "collections" | "about"',
                elements: [
                  { name: "literal", value: '"publications"' },
                  { name: "literal", value: '"collections"' },
                  { name: "literal", value: '"about"' },
                ],
              },
              description: "",
            },
          },
        });
      try {
        (Tabs.displayName = "Tabs"),
          (Tabs.__docgenInfo = {
            description: "",
            displayName: "Tabs",
            props: {
              publicationsTabOnClick: {
                defaultValue: null,
                description: "",
                name: "publicationsTabOnClick",
                required: !0,
                type: { name: "() => void" },
              },
              collectionsTabOnClick: {
                defaultValue: null,
                description: "",
                name: "collectionsTabOnClick",
                required: !0,
                type: { name: "() => void" },
              },
              aboutTabOnClick: {
                defaultValue: null,
                description: "",
                name: "aboutTabOnClick",
                required: !0,
                type: { name: "() => void" },
              },
              selectedTab: {
                defaultValue: null,
                description: "",
                name: "selectedTab",
                required: !0,
                type: {
                  name: "enum",
                  value: [{ value: '"collections"' }, { value: '"publications"' }, { value: '"about"' }],
                },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/profile/tabs/Tabs.tsx#Tabs"] = {
              docgenInfo: Tabs.__docgenInfo,
              name: "Tabs",
              path: "src/components/profile/tabs/Tabs.tsx#Tabs",
            });
      } catch (__react_docgen_typescript_loader_error) {}
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
      var Tabs_stories = { title: "Components/Profile/Tabs", component: Tabs },
        PublicationsSelected = { args: { selectedTab: "publications" } },
        CollectionsSelected = { args: { selectedTab: "collections" } },
        AboutSelected = { args: { selectedTab: "about" } };
      (PublicationsSelected.parameters = _objectSpread(
        _objectSpread({}, PublicationsSelected.parameters),
        {},
        {
          docs: _objectSpread(
            _objectSpread(
              {},
              null === (_PublicationsSelected = PublicationsSelected.parameters) || void 0 === _PublicationsSelected
                ? void 0
                : _PublicationsSelected.docs
            ),
            {},
            {
              source: _objectSpread(
                { originalSource: '{\n  args: {\n    selectedTab: "publications"\n  }\n}' },
                null === (_PublicationsSelected2 = PublicationsSelected.parameters) ||
                  void 0 === _PublicationsSelected2 ||
                  null === (_PublicationsSelected2 = _PublicationsSelected2.docs) ||
                  void 0 === _PublicationsSelected2
                  ? void 0
                  : _PublicationsSelected2.source
              ),
            }
          ),
        }
      )),
        (CollectionsSelected.parameters = _objectSpread(
          _objectSpread({}, CollectionsSelected.parameters),
          {},
          {
            docs: _objectSpread(
              _objectSpread(
                {},
                null === (_CollectionsSelected$ = CollectionsSelected.parameters) || void 0 === _CollectionsSelected$
                  ? void 0
                  : _CollectionsSelected$.docs
              ),
              {},
              {
                source: _objectSpread(
                  { originalSource: '{\n  args: {\n    selectedTab: "collections"\n  }\n}' },
                  null === (_CollectionsSelected$2 = CollectionsSelected.parameters) ||
                    void 0 === _CollectionsSelected$2 ||
                    null === (_CollectionsSelected$2 = _CollectionsSelected$2.docs) ||
                    void 0 === _CollectionsSelected$2
                    ? void 0
                    : _CollectionsSelected$2.source
                ),
              }
            ),
          }
        )),
        (AboutSelected.parameters = _objectSpread(
          _objectSpread({}, AboutSelected.parameters),
          {},
          {
            docs: _objectSpread(
              _objectSpread(
                {},
                null === (_AboutSelected$parame = AboutSelected.parameters) || void 0 === _AboutSelected$parame
                  ? void 0
                  : _AboutSelected$parame.docs
              ),
              {},
              {
                source: _objectSpread(
                  { originalSource: '{\n  args: {\n    selectedTab: "about"\n  }\n}' },
                  null === (_AboutSelected$parame2 = AboutSelected.parameters) ||
                    void 0 === _AboutSelected$parame2 ||
                    null === (_AboutSelected$parame2 = _AboutSelected$parame2.docs) ||
                    void 0 === _AboutSelected$parame2
                    ? void 0
                    : _AboutSelected$parame2.source
                ),
              }
            ),
          }
        ));
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
    "./node_modules/classnames/index.js": function (module, exports) {
      var __WEBPACK_AMD_DEFINE_RESULT__;
      !(function () {
        "use strict";
        var hasOwn = {}.hasOwnProperty;
        function classNames() {
          for (var classes = [], i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            if (arg) {
              var argType = typeof arg;
              if ("string" === argType || "number" === argType) classes.push(arg);
              else if (Array.isArray(arg)) {
                if (arg.length) {
                  var inner = classNames.apply(null, arg);
                  inner && classes.push(inner);
                }
              } else if ("object" === argType) {
                if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
                  classes.push(arg.toString());
                  continue;
                }
                for (var key in arg) hasOwn.call(arg, key) && arg[key] && classes.push(key);
              }
            }
          }
          return classes.join(" ");
        }
        module.exports
          ? ((classNames.default = classNames), (module.exports = classNames))
          : void 0 ===
              (__WEBPACK_AMD_DEFINE_RESULT__ = function () {
                return classNames;
              }.apply(exports, [])) || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
      })();
    },
  },
]);
