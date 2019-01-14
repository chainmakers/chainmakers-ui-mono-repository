export default function loginFactory(
  homeDir: string
) {
  return {
    login(passphrase: string) {
      const serverparams = {
        userpass:
          '1d8b27b21efabcd96571cd56f91a40fb9aa4cc623d273c63bf9223dc6f8cd81f',
        userhome: homeDir,
        method: 'passphrase',
        passphrase,
        gui: 'AtomicDex'
        // netid:
        // seednode:
      };
      return this.publicCall(serverparams).then(data => {
        // save userpass
        this.setUserpass(data.userpass);
        return data;
      });
    }
  };
}
