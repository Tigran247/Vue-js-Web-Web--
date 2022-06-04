"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = exports.mutations = exports.getters = exports.state = void 0;

var _sockjsClient = _interopRequireDefault(require("sockjs-client"));

var _webstompClient = _interopRequireDefault(require("webstomp-client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = function state() {
  return {
    websocketUrl: "http://localhost:8086/ws",
    connected: false
  };
};
exports.state = state;
var getters = {
  connected: function connected(state) {
    return state.connected;
  }
};
exports.getters = getters;
var mutations = {
  setConnected: function setConnected(state, status) {
    state.connected = status;
  }
};
exports.mutations = mutations;
var actions = {
  connect: function connect(_ref) {
    var _this = this;

    var state = _ref.state,
        commit = _ref.commit;
    if (state.connected) return;
    this.socket = new _sockjsClient["default"](state.websocketUrl);
    this.stompClient = _webstompClient["default"].over(this.socket); // comment the line below if you want to see debug messages

    this.stompClient.debug = function (msg) {};

    this.stompClient.connect({}, function (frame) {
      commit("setConnected", true);

      _this.stompClient.subscribe("/app/chat/roomList", function (tick) {
        var roomList = JSON.parse(tick.body);
        commit("main/initRoom", roomList, {
          root: true
        });
      }); // subscribe new rooms


      _this.stompClient.subscribe("/chat/newRoom", function (tick) {
        var room = JSON.parse(tick.body);
        commit("main/addRoom", room, {
          root: true
        });
      });
    }, function (error) {
      console.log(error);
      commit("setConnected", false);
    });
  },
  subscribeRoomList: function subscribeRoomList() {}
};
exports.actions = actions;
