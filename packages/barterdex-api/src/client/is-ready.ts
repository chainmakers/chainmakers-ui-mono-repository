// export default function isReadyFactory(state: StateType) {
export default function isReadyFactory() {
  return {
    isready() {
      return new Promise(async (resolve) => {
        try {
          await this.version();
          resolve({
            ok: "done"
          });
        } catch (_) {
          resolve({
            ok: "failed"
          });
        }
      });
    }
  };
}
