// @doc
// https://docs.komodoplatform.com/barterDEX/barterDEX-API.html?highlight=listunspent#recentswaps

interface RecentswapsType {
  limit?: number
};

export default function recentswapsFactory() {
  return {
    recentswaps(params?: RecentswapsType) {
      const serverparams = Object.assign({}, params, {
        method: 'recentswaps'
      });
      return this.privateCall(serverparams);
    }
  };
}
