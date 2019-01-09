# dicoapp-e

#### whitelabel instructions: https://github.com/KomodoPlatform/dicoapp-e/blob/master/docs/whitelabel.md

## Install dependencies

```
sudo apt install git curl libc6-i386 libgconf-2-4
```

## Install NVM

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

Exit from the current terminal and start another terminal window and enter the following.
nvm install 9.11.2
nvm use 9.11.2
```

## Install Yarn

```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install --no-install-recommends yarn
```

## Clone the repo

```
git clone https://github.com/KomodoPlatform/dicoapp-e
cd dicoapp-e
yarn install
yarn dev
```
