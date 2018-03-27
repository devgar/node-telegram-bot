# node-telegram-bot
A simple nodejs telegram bot

## Initialize

To start the app it needs a valid telegram token.

You can initialize your app by using a `TOKEN` env variable

```
TOKEN={{YOUR_TOKEN_KEY}} npm test
```

or passing your token as first arg

```
npm test -- {{YOUR_TOKEN_KEY}}
```

or storing your token in a token.txt file

## Commands inside telegram app

```
/start {{YOUR TITLE}}
```

```
/add {{URL}} ... {URL}
```
