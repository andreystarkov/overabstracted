# Overabstracted

I liked over 800 [true tech podcasts](https://soundcloud.com/starcowsky/likes) at soundcloud. And i won't stop. This app shows and plays last liked.

Here the [demo](https://tech.andreystarkov.now.sh/).

## Also

You can list your playlists as array at ./src/Config/Soundcloud.js  

```js
  const sources = [
    'https://soundcloud.com/afterhours-uk-au/sets/afterhours-podcast',
    'https://soundcloud.com/atmoteka/sets/atmoteka-season-4',
    'https://soundcloud.com/dinsubsol/sets/romanian-artists-mixes',
    'https://soundcloud.com/soundroom-studio/sets/soundroom-podcast',
    'https://soundcloud.com/blumarten/sets/blu-mar-ten-music-guest-mixes'
  ]
```

And it will load random playlist on every page load.

### Usage

```console
  npm i
  npm start
```
