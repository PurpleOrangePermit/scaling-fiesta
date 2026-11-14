export function openWalletSdk() {
  window.postMessage({ type: "connect-wallet-btn" }, "*");
}
