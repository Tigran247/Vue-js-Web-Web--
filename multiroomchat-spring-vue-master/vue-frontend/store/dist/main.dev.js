"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = exports.mutations = exports.getters = exports.state = void 0;

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = function state() {
  return {
    sidebar: true,
    username: "",
    roomList: [],
    usersInChatRoom: {},
    roomMessages: {}
  };
};

exports.state = state;
var getters = {
  sidebar: function sidebar(state) {
    return state.sidebar;
  },
  username: function username(state) {
    return state.username;
  },
  roomList: function roomList(state) {
    return state.roomList;
  },
  roomName: function roomName(state) {
    return function (roomId) {
      return state.roomList.find(function (room) {
        return room.key === roomId;
      }).name;
    };
  },
  usersInChatRoom: function usersInChatRoom(state) {
    return function (roomId) {
      var userList = state.usersInChatRoom[roomId];
      return userList ? userList.users : [];
    };
  },
  roomMessages: function roomMessages(state) {
    return function (roomId) {
      var roomMessages = state.roomMessages[roomId];
      return roomMessages ? roomMessages.messages : [];
    };
  }
};
exports.getters = getters;
var mutations = {
  showSidebar: function showSidebar(state, payload) {
    state.sidebar = payload;
  },
  setUsername: function setUsername(state, payload) {
    state.username = payload;
  },
  addRoom: function addRoom(state, room) {
    state.roomList.push(room);
  },
  initRoom: function initRoom(state, roomList) {
    state.roomList = roomList;
  },
  subscribe: function subscribe(state, roomKey) {
    _subscribe(state, roomKey, true);
  },
  unsubscribe: function unsubscribe(state, roomKey) {
    _subscribe(state, roomKey, false);
  },
  sendMessage: function sendMessage(state, newMessage) {
    var roomMessage = state.roomMessages[newMessage.roomKey];

    if (roomMessage) {
      roomMessage.messages.push(newMessage.message);
    } else {
      var firstMessage = {
        roomKey: newMessage.roomKey,
        messages: [newMessage.message]
      };

      _vue["default"].set(state.roomMessages, newMessage.roomKey, firstMessage);
    }
  },
  updateRoomUserList: function updateRoomUserList(state, roomUserList) {
    _vue["default"].set(state.usersInChatRoom, roomUserList.roomKey, roomUserList);
  }
};
exports.mutations = mutations;
var actions = {
  addRoom: function addRoom(_ref, roomName) {
    var state = _ref.state,
        commit = _ref.commit;

    if (this.stompClient && this.stompClient.connected) {
      var newRoom = {
        roomName: roomName
      };
      this.stompClient.send("/app/chat/addRoom", JSON.stringify(newRoom), {});
    }
  },
  subscribeRoomUserList: function subscribeRoomUserList(_ref2, roomId) {
    var state = _ref2.state,
        commit = _ref2.commit;

    if (this.stompClient && this.stompClient.connected) {
      var subscribeUrl = "/chat/" + roomId + "/userList";
      this.stompClient.subscribe(subscribeUrl, function (tick) {
        var roomUserList = JSON.parse(tick.body);
        commit("updateRoomUserList", roomUserList);
      }, {
        id: roomId + "_userList"
      });
      this.stompClient.subscribe("/chat/" + roomId + "/messages", function (tick) {
        var message = JSON.parse(tick.body);
        var roomMessage = {
          roomKey: roomId,
          message: message
        };
        commit("sendMessage", roomMessage);
      }, {
        id: roomId + "_messages"
      });
      var joinRoom = {
        roomKey: roomId,
        userName: state.username
      };
      this.stompClient.send("/app/chat/" + roomId + "/join", JSON.stringify(joinRoom));
      commit("subscribe", roomId);
    }
  },
  unsubscribe: function unsubscribe(_ref3, roomId) {
    var state = _ref3.state,
        commit = _ref3.commit;
    var leaveRoom = {
      roomKey: roomId,
      userName: state.username
    };
    this.stompClient.send("/app/chat/" + roomId + "/leave", JSON.stringify(leaveRoom));
    this.stompClient.unsubscribe(roomId + "_userList");
    this.stompClient.unsubscribe(roomId + "_messages");
    commit("unsubscribe", roomId);
  },
  sendMessage: function sendMessage(_ref4, message) {
    var state = _ref4.state;
    message.message.userName = state.username;
    this.stompClient.send("/app/chat/" + message.roomId + "/sendMessage", JSON.stringify(message.message));
  }
};
exports.actions = actions;

function _subscribe(state, roomKey, value) {
  state.roomList.map(function (room) {
    return room.key === roomKey ? room.subscribed = value : room;
  });
}