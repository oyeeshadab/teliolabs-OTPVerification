export type NetworkState = {
    isConnected: boolean;
    isInternetReachable: boolean;
};
declare class NetworkManager {
    getStatus(): Promise<NetworkState>;
    addListener(callback: (state: NetworkState) => void): import("@react-native-community/netinfo").NetInfoSubscription;
}
declare const _default: NetworkManager;
export default _default;
