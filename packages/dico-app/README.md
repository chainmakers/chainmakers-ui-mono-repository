<h1 align="center">
  <br>
  dICO 
  <br>
</h1>

<h4 align="center">A Decentralized ICO application built on top of <a href="https://komodoplatform.com/atomic-swaps/" target="_blank">BarterDEX swap</a>.</h4>

<div align="center">

[![Dependency Status](https://david-dm.org/KomodoPlatform/dicoapp-e.svg)](https://david-dm.org/KomodoPlatform/dicoapp-e)
[![devDependency Status](https://david-dm.org/KomodoPlatform/dicoapp-e/dev-status.svg)](https://david-dm.org/KomodoPlatform/dicoapp-e#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/github/KomodoPlatform/dicoapp-e/badge.svg)](https://coveralls.io/github/KomodoPlatform/dicoapp-e)
[![GitHub Issues](https://img.shields.io/github/issues/KomodoPlatform/dicoapp-e.svg)](https://github.com/KomodoPlatform/dicoapp-e/issues)

</div>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#quickstart">Quickstart</a> •
  <a href="#download">Download</a> •
  <a href="#documentation">Documentation</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

![screenshot](/docs/pictures/2018-12-13-16-07-01.png)

**This project is bound by a [Code of Conduct][].**

## Key Features

- No counterparty risk
  - No Account
  - No Email
  - No Password
- Lowest transaction fee. It's only is 1/777 of the transaction amount
- The easiest and safest way to distribute your coin
- Cross platform
  - Windows, macOS and Linux ready

## Quickstart

### Prerequisites

Following are the minimum tested versions for the tools and libraries you need for running dICO app:

- Nodejs: v10.13.0 or newer

- Yarn: v1.9.4 or newer

- Npm: v6.3.0 or newer

### Install

First, clone the repo via git:

```bash
git clone -b master https://github.com/KomodoPlatform/dicoapp-e.git
```

And install dependencies with yarn.

```bash
$ cd dicoapp-e
$ yarn install
```

Lastly, download the latest version of marketmaker app on [https://github.com/artemii235/SuperNET/releases](https://github.com/artemii235/SuperNET/releases) and and save it at `app/bin/marketmaker` folder.

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ yarn dev
```

## Download

You can [download](https://github.com/KomodoPlatform/dicoapp-e/releases) the latest installable version of dICO app for Windows, macOS and Linux.

## Documentation

- [Release Process](/docs/release-process.md)

- [White label the application](/docs/whitelabling.md)

## Credits

- **Nam Hoang** - _Initial work and maintainer_ - [particle4dev](https://github.com/particle4dev)

See also the list of [contributors](/AUTHORS.md) who participated in this project.

## License

This project is licensed under the MIT license, Copyright (c) 2018 Komodo. For more information see `LICENSE.md`.
