### Disable eval in the renderer by default

Run this command on chrome-devtools:

```js
eval('console.log(123)');
```

### Disable or limit navigation

```js
window.location.replace('https://stackoverflow.com');
```

### Disable or limit creation of new windows

```js
window.open('https://stackoverflow.com', '_blank');
```

### Do Not Use allowpopups

```js
window.open('https://stackoverflow.com');
```
