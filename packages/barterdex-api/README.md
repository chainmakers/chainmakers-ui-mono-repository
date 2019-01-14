---
title: Barterdex API
description: Barterdex API for Node
---

### Prerequisites

Following are the minimum tested versions for the tools and libraries you need for running Barterdex API:

- Nodejs: v10.13.0 or newer

- Yarn: v1.9.4 or newer

- Npm: v6.3.0 or newer

- Typescript: v3.2.2 or newer

- TSlint: v5.11.0 or newer

## Usage

```
const { Server, Client } = require('barterdex-api');

const server = Server({
  client: 1,
  gui: 'AtomicDex',
  userhome: config.get('paths.homeDir')
}, {
  version: 2 // or 1
});

server.start({
  // NOTE: for testing
  netid: 9999,
  // canbind: 0,
  passphrase: "passphrase",
  coins
});

const client = Client({
  entrypoint: config.get('barterdex'),
  home: paths.homeDir
}, {
  version: 2 // or 1
});

```

  
