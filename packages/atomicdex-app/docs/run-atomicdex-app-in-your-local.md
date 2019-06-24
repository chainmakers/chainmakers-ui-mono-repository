## Follow this instruction to run atomicdex app in your local:

### Prerequisites:

- Nodejs: v10.13.0 or newer

- Yarn: v1.9.4 or newer

- Npm: v6.3.0 or newer

### Install

1. Clone the repo via git:

```git clone -b master git@github.com:particle4dev/komodo-ui-mono-repository```

2. To setup the marketmaker app, [download](http://195.201.0.6/mm2) unzip and copy it to `packages/atomicdex-app/app/bin/marketmaker/linux`.

```
atomicdex/packages/atomicdex-app/app/bin
									├── marketmaker
									    ├── mac
									    ├── linux
									    └── win
```

3. Install project dependencies

- Root project
```
$ cd komodo-ui-mono-repository
$ yarn install
```

- barterdex-api project
```
$ cd packages/barterdex-api/
$ yarn clean && yarn install
```

- barterdex-server project
```
$ cd packages/barterdex-server/
$ yarn clean && yarn install
```

- barterdex-utilities project
```
$ cd packages/barterdex-utilities/
$ yarn install
```

- barterdex-rssm project
```
$ cd packages/barterdex-rssm/
$ yarn install
```

- barterdex-components project
```
$ cd packages/barterdex-components/
$ yarn install
```
NOTE: It still be fine if you see some lint's error. Please ignore it.

- atomicdex-app project
```
$ cd packages/atomicdex-app/
$ yarn install
```

### Running

- Run app via yarn
```
yarn dev
```

- If your install is successful, you will see the application looks like this:
<img width="1268" alt="screen shot 2019-02-08 at 11 30 10" src="https://user-images.githubusercontent.com/3245868/52458960-037a9f00-2b95-11e9-9fde-eb0b3d4bc620.png">
<img width="1268" alt="screen shot 2019-02-08 at 11 30 37" src="https://user-images.githubusercontent.com/3245868/52458965-0bd2da00-2b95-11e9-9840-d38e33b4dae3.png">
<img width="1268" alt="screen shot 2019-02-08 at 11 35 47" src="https://user-images.githubusercontent.com/3245868/52459093-bea33800-2b95-11e9-9508-26d22acdb448.png">
