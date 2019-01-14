const TIMEOUT = 10000;

// export default function isReadyFactory(state: StateType) {
export default function isReadyFactory() {
  return {
    isready(time: number = TIMEOUT) {
      return new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
          try {
            await this.get();
            clearInterval(interval);
            resolve('OK');
            // tslint:disable-next-line: no-empty
          } catch (_) {}
        }, 100);

        setTimeout(() => {
          clearInterval(interval);
          reject(new Error('Giving up trying to connect to marketmaker'));
        }, time);
      });
    }
  };
}
