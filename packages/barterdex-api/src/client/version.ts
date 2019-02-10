export default function versionFactory() {
  return {
    version() {
      const serverparams = {
        method: 'version'
      };
      return this.privateCall(serverparams);
    }
  };
}
