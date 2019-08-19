// @doc

interface MyRecentSwapsType {
  limit?: Number,
  from_uuid?: String
};

export default function myRecentSwapsFactory() {
  return {
    myRecentSwaps(params?: MyRecentSwapsType) {
      const serverparams = Object.assign({}, params, {
        method: 'my_recent_swaps'
      });
      return this.privateCall(serverparams);
    }
  };
}
