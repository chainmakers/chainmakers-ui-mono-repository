<h1 align="center">
  <br>
  Atomic Decentralized Exchange 
  <br>
</h1>

<h4 align="center">An instant exchange built on top of <a href="https://komodoplatform.com/atomic-swaps/" target="_blank">BarterDEX swap</a>.</h4>

<div align="center">

[![Dependency Status](https://david-dm.org/particle4dev/atomicdex.svg)](https://david-dm.org/particle4dev/atomicdex)
[![devDependency Status](https://david-dm.org/particle4dev/atomicdex/dev-status.svg)](https://david-dm.org/particle4dev/atomicdex#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/github/particle4dev/atomicdex/badge.svg)](https://coveralls.io/github/particle4dev/atomicdex)
[![GitHub Issues](https://img.shields.io/github/issues/particle4dev/atomicdex.svg)](https://github.com/particle4dev/atomicdex/issues)
[![Build Status](https://travis-ci.com/particle4dev/atomicdex.svg?branch=master)](https://travis-ci.com/particle4dev/atomicdex)

</div>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#quickstart">Quickstart</a> •
  <a href="#download">Download</a> •
  <a href="#documentation">Documentation</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

![screenshot](./docs/pictures/demo-dec-11-2018-15-54-48.png)

**This project is bound by a [Code of Conduct][].**

## Key Features

- No counterparty risk
  - No Account
  - No Email
  - No Password
- Lowest transaction fee. It's only is 1/777 of the transaction amount
- The easiest and safest way to swap coin
- Cross platform
  - Windows, macOS and Linux ready

## Quickstart

### Prerequisites

Following are the minimum tested versions for the tools and libraries you need for running Atomic Decentralized app:

- Nodejs: v10.13.0 or newer

- Yarn: v1.9.4 or newer

- Npm: v6.3.0 or newer

### Install

First, clone the repo via git:

```bash
git clone --depth 1 -b master https://github.com/particle4dev/atomicdex.git
```

And install dependencies with yarn.

```bash
$ cd atomicdex
$ yarn install
```

Lastly, download the latest version of marketmaker app on [https://github.com/artemii235/SuperNET/releases](https://github.com/artemii235/SuperNET/releases) and and save it at `app/bin/marketmaker` folder.

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ yarn dev
```

## Download

You can [download](https://github.com/particle4dev/atomicdex/releases) the latest installable version of AtomicDex app for Windows, macOS and Linux.

## Documentation

- [How to contribute this project](/docs/how-to-contribute.md)

- [Release Process](/docs/release-process.md)

## Credits

- **Nam Hoang** - _Initial work and maintainer_ - [particle4dev](https://github.com/particle4dev)

See also the list of [contributors](/AUTHORS.md) who participated in this project.

## License

This project is licensed under the MIT license, Copyright (c) 2018 Komodo. For more information see `LICENSE.md`.
