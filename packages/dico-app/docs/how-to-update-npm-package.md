# How to update npm package

### Install syncyarnlock package

```
YARN
$ yarn global add syncyarnlock

or

NPM
$ npm install -g syncyarnlock
```

### Update npm package

Step one: check packages that are currently outdated.

```
$ yarn outdated
```

Step two: check if new package contain changes that break backward compatibility.

Step three: upgrade package

```
$ yarn upgrade-interactive --latest
```

Step four: update the codebase if new package contain changes that break backward compatibility.

Step five: Syncs yarn.lock versions into an exsisting package.json

```
$ syncyarnlock --save --keepUpArrow
```

Step six: Cleans and removes unnecessary files from package dependencies.

```
$ yarn autoclean --init && yarn autoclean --force
```

NOTE:

```
rm -rf node_modules .yarnclean && yarn install
```

https://github.com/gotwarlost/istanbul/issues/743
