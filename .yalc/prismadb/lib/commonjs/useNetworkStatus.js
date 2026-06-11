"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNetworkStatus = void 0;
var _react = require("react");
var _NetworkManager = _interopRequireDefault(require("./NetworkManager"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const useNetworkStatus = () => {
  const [network, setNetwork] = (0, _react.useState)({
    isConnected: false,
    isInternetReachable: false
  });
  (0, _react.useEffect)(() => {
    _NetworkManager.default.getStatus().then(setNetwork);
    const unsubscribe = _NetworkManager.default.addListener(setNetwork);
    return () => unsubscribe();
  }, []);
  return {
    ...network,
    isOffline: !network.isConnected || !network.isInternetReachable
  };
};
exports.useNetworkStatus = useNetworkStatus;
//# sourceMappingURL=useNetworkStatus.js.map