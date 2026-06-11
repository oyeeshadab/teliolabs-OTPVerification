import NetInfo from "@react-native-community/netinfo";
class NetworkManager {
  async getStatus() {
    var _state$isConnected, _state$isInternetReac;
    const state = await NetInfo.fetch();
    return {
      isConnected: (_state$isConnected = state.isConnected) !== null && _state$isConnected !== void 0 ? _state$isConnected : false,
      isInternetReachable: (_state$isInternetReac = state.isInternetReachable) !== null && _state$isInternetReac !== void 0 ? _state$isInternetReac : false
    };
  }
  addListener(callback) {
    return NetInfo.addEventListener(state => {
      var _state$isConnected2, _state$isInternetReac2;
      callback({
        isConnected: (_state$isConnected2 = state.isConnected) !== null && _state$isConnected2 !== void 0 ? _state$isConnected2 : false,
        isInternetReachable: (_state$isInternetReac2 = state.isInternetReachable) !== null && _state$isInternetReac2 !== void 0 ? _state$isInternetReac2 : false
      });
    });
  }
}
export default new NetworkManager();
//# sourceMappingURL=NetworkManager.js.map