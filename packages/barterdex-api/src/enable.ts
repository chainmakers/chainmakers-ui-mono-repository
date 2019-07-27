interface ECR20Type {
  coin: string,
  swap_contract_address: string,
  urls: Array<string>,
  name: string
};

export default function enableFactory() {
  return {
    enable(params: ECR20Type) {
      const serverparams = Object.assign({}, params, {
        method: 'enable'
      });
      return this.privateCall(serverparams);
    }
  };
}
