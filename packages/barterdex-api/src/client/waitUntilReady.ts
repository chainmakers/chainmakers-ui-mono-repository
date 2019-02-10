const TIMEOUT = 60 * 1000;

export default function waitUntilReadyFactory() {
  return {
    waitUntilReady(time: number = TIMEOUT): Promise<any> {
      return new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
          try {
            await this.version();
            clearInterval(interval);
            resolve({
              ok: "done"
            });
          } catch (_) {}
        }, 100);

        setTimeout(() => {
          clearInterval(interval);
          reject(new Error("Giving up trying to connect to marketmaker"));
        }, time);
      });
    }
  };
}
