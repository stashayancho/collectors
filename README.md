# Collectors

An app for people who collect Hot Wheels cars. Keep track of your collection and trade cars with other members.

Currently working on refactoring into React native.


## Setup

To use this app:

```
git clone https://github.com/stashayancho/collectors.git
npm install
```


* Create two postgres databases: `collectors` and `collectors-test`
  * To seed the database, run `python scraping/scrape.py`
* Create a file called `secrets.js` in the project root

  ```
    process.env.GOOGLE_CLIENT_ID = 'shhh'
    process.env.GOOGLE_CLIENT_SECRET = 'secret'
    process.env.GOOGLE_CALLBACK = '/auth/google/callback'
  ```

* To use OAuth with Google, get a real client ID and client secret from Google here: https://console.developers.google.com/apis/credentials

## Start

`npm run start-dev`

If you want to run the server and/or webpack separately, you can also `npm run start-server` and `npm run build-client`.
