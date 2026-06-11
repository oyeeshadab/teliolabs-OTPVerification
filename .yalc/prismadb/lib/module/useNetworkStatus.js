import { useEffect, useState } from "react";
import NetworkManager from "./NetworkManager";
export const useNetworkStatus = () => {
  const [network, setNetwork] = useState({
    isConnected: false,
    isInternetReachable: false
  });
  useEffect(() => {
    NetworkManager.getStatus().then(setNetwork);
    const unsubscribe = NetworkManager.addListener(setNetwork);
    return () => unsubscribe();
  }, []);
  return {
    ...network,
    isOffline: !network.isConnected || !network.isInternetReachable
  };
};
//# sourceMappingURL=useNetworkStatus.js.map