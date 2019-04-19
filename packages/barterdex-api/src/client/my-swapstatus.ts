// @doc

interface ParamsType {
  uuid: string
};

interface SwapstatusType {
  params: ParamsType
};

export default function myswapstatusFactory() {
  return {
    myswapstatus(params: SwapstatusType) {
      const serverparams = Object.assign({}, params, {
        method: 'my_swap_status'
      });
      return this.privateCall(serverparams);
    }
  };
}
