To whitelabel the dICOApp:

1. Edit `app/main/config/tokenconfig.js`. This file will be to edit the information regarding the coin that will be on sale. Also it will pull the logo to the login screen.

2. Edit `app/main/config/coins-data.js`. This file will be to edit the coins accepted as payment method.

3. Add `.svg` file with the name of your coin to `app/components/CryptoIcons` directory.

4. Edit `app/components/CryptoIcons/index.js` to add your coins to the app variables.

5. Edit 'app/components/Theme/index.js` to change the colors of the buttons in the app.

6. Edit `app/translations/en.json` to edit all text in the app.

7. Edit `app/containers/HelpPage/index.js` to change text in the Help page.
