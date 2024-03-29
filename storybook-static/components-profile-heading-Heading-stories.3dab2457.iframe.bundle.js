"use strict";
(self.webpackChunktmp = self.webpackChunktmp || []).push([
  [345],
  {
    "./src/components/profile/heading/Heading.stories.tsx": function (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Regular: function () {
            return Regular;
          },
          default: function () {
            return Heading_stories;
          },
        });
      var _Regular$parameters,
        _Regular$parameters2,
        defineProperty = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),
        react = __webpack_require__("./node_modules/next/dist/compiled/react/index.js"),
        next_image = __webpack_require__("./node_modules/@storybook/nextjs/dist/images/next-image.mjs"),
        profileBanner = {
          src: "static/media/profileBanner.c79873d0.png",
          height: 374,
          width: 1920,
          blurDataURL: "static/media/profileBanner.c79873d0.png",
        },
        profilePicture = __webpack_require__("./src/assets/profilePicture.png"),
        ProfilePicture = __webpack_require__("./src/components/profile/profilePicture/ProfilePicture.tsx"),
        __jsx = react.createElement;
      function Heading() {
        return __jsx(
          "div",
          { className: "grid grid-cols-4 relative h-64" },
          __jsx(next_image.Z, { src: profileBanner, alt: "profileBanner", className: "absolute h-64 z-0" }),
          __jsx("div", null),
          __jsx("div", null),
          __jsx("div", null),
          __jsx(
            "div",
            { className: "z-10 h-full flex items-center justify-center" },
            __jsx(ProfilePicture.Z, { src: profilePicture.Z })
          )
        );
      }
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
      (Heading.displayName = "Heading"),
        (Heading.__docgenInfo = { description: "", methods: [], displayName: "Heading" });
      var Heading_stories = { title: "Components/Profile/Heading", component: Heading },
        Regular = { args: {} };
      Regular.parameters = _objectSpread(
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
                { originalSource: "{\n  args: {}\n}" },
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
      );
    },
    "./src/components/profile/profilePicture/ProfilePicture.tsx": function (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        Z: function () {
          return ProfilePicture;
        },
      });
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/next/dist/compiled/react/index.js"),
        next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./node_modules/@storybook/nextjs/dist/images/next-image.mjs"
        ),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function ProfilePicture(props) {
        return __jsx(next_image__WEBPACK_IMPORTED_MODULE_1__.Z, {
          className: "w-52 h-52 rounded-full border-white border-4",
          alt: "profilePicture",
          src: props.src,
        });
      }
      (ProfilePicture.displayName = "ProfilePicture"),
        (ProfilePicture.__docgenInfo = {
          description: "",
          methods: [],
          displayName: "ProfilePicture",
          props: { src: { required: !0, tsType: { name: "string" }, description: "" } },
        });
      try {
        (ProfilePicture.displayName = "ProfilePicture"),
          (ProfilePicture.__docgenInfo = {
            description: "",
            displayName: "ProfilePicture",
            props: {
              src: { defaultValue: null, description: "", name: "src", required: !0, type: { name: "string" } },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/profile/profilePicture/ProfilePicture.tsx#ProfilePicture"] = {
              docgenInfo: ProfilePicture.__docgenInfo,
              name: "ProfilePicture",
              path: "src/components/profile/profilePicture/ProfilePicture.tsx#ProfilePicture",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./src/assets/profilePicture.png": function (__unused_webpack_module, __webpack_exports__) {
      __webpack_exports__.Z = {
        src: "static/media/profilePicture.b0788c1e.png",
        height: 247,
        width: 247,
        blurDataURL: "static/media/profilePicture.b0788c1e.png",
      };
    },
  },
]);
