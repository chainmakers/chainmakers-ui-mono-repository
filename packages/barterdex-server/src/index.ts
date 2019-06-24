import controlFactory from "./control";
import { StateType } from "./schema";

interface ServerOption {
  gui: string,
  userhome: string,
  bin: string,
  netid?: number
};

export default function setupServer(options: ServerOption) {
  const state: StateType = Object.assign({
    netid: 0,
    client: 1,
    rpcport: 7783
  }, options);

  return Object.assign(
    {
      getState: () => {
        return state;
      }
    },
    controlFactory(state)
  );
}
