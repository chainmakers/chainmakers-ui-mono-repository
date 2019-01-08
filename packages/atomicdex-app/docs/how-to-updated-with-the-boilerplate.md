# How to update with the boilerplate

### Copy these files and folder from boilerplate into project

- .dockerignore

- .editorconfig

- .eslintignore

- .flowconfig

- .gitattributes

- .prettierrc

- .stylelintrc

- .testcafe-electron-rc

- appveyor.yml

### we should keep these files

- ** mocks **

- .github/ISSUE_TEMPLATE

- app

- bin

- docs

- internals/scripts/RunTests.js

- .eslintrc added
  "env": {
  "browser": true,
  "node": true,
  "jest": true
  },

- .gitignore
  .idea
  npm-debug.log._
  myipaddr
  \*\*/DB/_
  account-test.md

- AUTHORS.md

- CHANGELOG.md

- README.md

- package.json

```
{
	"name": "dicoapp-e",
	"productName": "dICOApp",
	"version": "0.11.0",
	"description": "Lightweight GUI wallet with barterDEX swap capabilities",
	"main": "./main.prod.js",
	"build": {
		"productName": "dICOApp",
		"compression": "maximum",
		"appId": "com.komodoplatform.dICOApp",
		"asarUnpack": [
			"bin/marketmaker"
		],
		"files": [
			"!bin/marketmaker/*",
			"bin/marketmaker/${os}",
			"config/",
			"dist/",
			"node_modules/",
			"app.html",
			"main.prod.js",
			"main.prod.js.map",
			"package.json"
		],
		"dmg": {
			"contents": [{
					"x": 130,
					"y": 220
				},
				{
					"x": 410,
					"y": 220,
					"type": "link",
					"path": "/Applications"
				}
			]
		},
		"win": {
			"target": [
				"nsis"
			]
		},
		"linux": {
			"target": [
				"deb",
				"AppImage"
			],
			"category": "Development"
		},
		"directories": {
			"buildResources": "resources",
			"output": "release"
		},
		"publish": {
			"provider": "github",
			"publishAutoUpdate": true
		}
	},
	"repository": {
		"type": "git",
		"url": "git+https://github.com/particle4dev/dicoapp-e.git"
	},
	"author": {
		"name": "Hoang Nam",
		"email": "particle4dev@gmail.com",
		"url": "https://github.com/particle4dev"
	},
	"bugs": {
		"url": "https://github.com/particle4dev/dicoapp-e/issues"
	},
	"keywords": [
		"electron",
		"react",
		"redux",
		"flow",
		"kmd",
		"barterdex",
		"atomic",
		"swap",
		"cryptocurrency",
		"komodo"
	],
	"homepage": "https://github.com/particle4dev/dicoapp-e#readme",
	"engines": {
		"node": ">=10.x <11",
		"npm": ">=6.x",
		"yarn": ">=1.x"
	},
	"browserslist": "electron 1.6"
}
```

- remove "jest" field in package.json

- jest.config.js

- logo.png

### change these file

- babel.config.js merge with "plugins": ["add-module-exports", "inline-react-svg"]
