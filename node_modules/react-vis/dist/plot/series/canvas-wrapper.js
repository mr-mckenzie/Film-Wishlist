"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _d3Interpolate = require("d3-interpolate");

var _animation = require("../../animation");

var _seriesUtils = require("../../utils/series-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MAX_DRAWS = 30;
/**
 * Draw loop draws each of the layers until it should draw more
 * @param {CanvasContext} ctx - the context where the drawing will take place
 * @param {Number} height - height of the canvas
 * @param {Number} width - width of the canvas
 * @param {Array} layers - the layer objects to render
 */

function engageDrawLoop(ctx, height, width, layers) {
  var drawIteration = 0; // using setInterval because request animation frame goes too fast

  var drawCycle = setInterval(function () {
    if (!ctx) {
      clearInterval(drawCycle);
      return;
    }

    drawLayers(ctx, height, width, layers, drawIteration);

    if (drawIteration > MAX_DRAWS) {
      clearInterval(drawCycle);
    }

    drawIteration += 1;
  }, 1);
}
/**
 * Loops across each of the layers to be drawn and draws them
 * @param {CanvasContext} ctx - the context where the drawing will take place
 * @param {Number} height - height of the canvas
 * @param {Number} width - width of the canvas
 * @param {Array} layers - the layer objects to render
 * @param {Number} drawIteration - width of the canvas
 */


function drawLayers(ctx, height, width, layers, drawIteration) {
  ctx.clearRect(0, 0, width, height);
  layers.forEach(function (layer) {
    var interpolator = layer.interpolator,
        newProps = layer.newProps,
        animation = layer.animation; // return an empty object if dont need to be animating

    var interpolatedProps = animation ? interpolator ? interpolator(drawIteration / MAX_DRAWS) : interpolator : function () {
      return {};
    };
    layer.renderLayer(_objectSpread(_objectSpread({}, newProps), interpolatedProps), ctx);
  });
}
/**
 * Build an array of layer of objects the contain the method for drawing each series
 * as well as an interpolar (specifically a d3-interpolate interpolator)
 * @param {Object} newChildren the new children to be rendered.
 * @param {Object} oldChildren the old children to be rendered.
 * @returns {Array} Object for rendering
 */


function buildLayers(newChildren, oldChildren) {
  return newChildren.map(function (child, index) {
    var oldProps = oldChildren[index] ? oldChildren[index].props : {};
    var newProps = child.props;
    var oldAnimatedProps = (0, _animation.extractAnimatedPropValues)(_objectSpread(_objectSpread({}, oldProps), {}, {
      animatedProps: _seriesUtils.ANIMATED_SERIES_PROPS
    }));
    var newAnimatedProps = newProps ? (0, _animation.extractAnimatedPropValues)(_objectSpread(_objectSpread({}, newProps), {}, {
      animatedProps: _seriesUtils.ANIMATED_SERIES_PROPS
    })) : null;
    var interpolator = (0, _d3Interpolate.interpolate)(oldAnimatedProps, newAnimatedProps);
    return {
      renderLayer: child.type.renderLayer,
      newProps: child.props,
      animation: child.props.animation,
      interpolator: interpolator
    };
  });
}

var CanvasWrapper = /*#__PURE__*/function (_Component) {
  _inherits(CanvasWrapper, _Component);

  var _super = _createSuper(CanvasWrapper);

  function CanvasWrapper() {
    _classCallCheck(this, CanvasWrapper);

    return _super.apply(this, arguments);
  }

  _createClass(CanvasWrapper, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var ctx = this.canvas.getContext('2d');

      if (!ctx) {
        return;
      }

      var pixelRatio = this.props.pixelRatio;

      if (!ctx) {
        return;
      }

      ctx.scale(pixelRatio, pixelRatio);
      this.drawChildren(null, this.props, ctx);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(oldProps) {
      this.drawChildren(oldProps, this.props, this.canvas.getContext('2d'));
    }
    /**
     * Check that we can and should be animating, then kick off animations as apporpriate
     * @param {Object} newProps the new props to be interpolated to
     * @param {Object} oldProps the old props to be interpolated against
     * @param {DomRef} ctx the canvas context to be drawn on.
     * @returns {Array} Object for rendering
     */

  }, {
    key: "drawChildren",
    value: function drawChildren(oldProps, newProps, ctx) {
      var children = newProps.children,
          innerHeight = newProps.innerHeight,
          innerWidth = newProps.innerWidth,
          marginBottom = newProps.marginBottom,
          marginLeft = newProps.marginLeft,
          marginRight = newProps.marginRight,
          marginTop = newProps.marginTop;

      if (!ctx) {
        return;
      }

      var childrenShouldAnimate = children.find(function (child) {
        return child.props.animation;
      });
      var height = innerHeight + marginTop + marginBottom;
      var width = innerWidth + marginLeft + marginRight;
      var layers = buildLayers(newProps.children, oldProps ? oldProps.children : []); // if we don't need to be animating, dont! cut short

      if (!childrenShouldAnimate) {
        drawLayers(ctx, height, width, layers);
        return;
      }

      engageDrawLoop(ctx, height, width, layers);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          innerHeight = _this$props.innerHeight,
          innerWidth = _this$props.innerWidth,
          marginBottom = _this$props.marginBottom,
          marginLeft = _this$props.marginLeft,
          marginRight = _this$props.marginRight,
          marginTop = _this$props.marginTop,
          pixelRatio = _this$props.pixelRatio;
      var height = innerHeight + marginTop + marginBottom;
      var width = innerWidth + marginLeft + marginRight;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          left: 0,
          top: 0
        },
        className: "rv-xy-canvas"
      }, /*#__PURE__*/_react["default"].createElement("canvas", {
        className: "rv-xy-canvas-element",
        height: height * pixelRatio,
        width: width * pixelRatio,
        style: {
          height: "".concat(height, "px"),
          width: "".concat(width, "px")
        },
        ref: function ref(_ref) {
          return _this.canvas = _ref;
        }
      }), this.props.children);
    }
  }], [{
    key: "defaultProps",
    get: function get() {
      return {
        pixelRatio: window && window.devicePixelRatio || 1
      };
    }
  }]);

  return CanvasWrapper;
}(_react.Component);

CanvasWrapper.displayName = 'CanvasWrapper';
CanvasWrapper.propTypes = {
  marginBottom: _propTypes["default"].number.isRequired,
  marginLeft: _propTypes["default"].number.isRequired,
  marginRight: _propTypes["default"].number.isRequired,
  marginTop: _propTypes["default"].number.isRequired,
  innerHeight: _propTypes["default"].number.isRequired,
  innerWidth: _propTypes["default"].number.isRequired,
  pixelRatio: _propTypes["default"].number.isRequired
};
var _default = CanvasWrapper;
exports["default"] = _default;