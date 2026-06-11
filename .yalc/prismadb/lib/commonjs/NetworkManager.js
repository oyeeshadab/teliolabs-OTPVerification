"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _netinfo = _interopRequireDefault(require("@react-native-community/netinfo"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class NetworkManager {
  async getStatus() {
    var _state$isConnected, _state$isInternetReac;
    const state = await _netinfo.default.fetch();
    return {
      isConnected: (_state$isConnected = state.isConnected) !== null && _state$isConnected !== void 0 ? _state$isConnected : false,
      isInternetReachable: (_state$isInternetReac = state.isInternetReachable) !== null && _state$isInternetReac !== void 0 ? _state$isInternetReac : false
    };
  }
  addListener(callback) {
    return _netinfo.default.addEventListener(state => {
      var _state$isConnected2, _state$isInternetReac2;
      callback({
        isConnected: (_state$isConnected2 = state.isConnected) !== null && _state$isConnected2 !== void 0 ? _state$isConnected2 : false,
        isInternetReachable: (_state$isInternetReac2 = state.isInternetReachable) !== null && _state$isInternetReac2 !== void 0 ? _state$isInternetReac2 : false
      });
    });
  }
}
var _default = exports.default = new NetworkManager();
//# sourceMappingURL=NetworkManager.js.map