# Soundcloud Player

It takes a link and loads playlist data via Soundcloud API.

List your favourite playlists at ./src/Config/Soundcloud.js  

```js
  const sources = [
    'https://soundcloud.com/afterhours-uk-au/sets/afterhours-podcast',
    'https://soundcloud.com/atmoteka/sets/atmoteka-season-4',
    'https://soundcloud.com/dinsubsol/sets/romanian-artists-mixes',
    'https://soundcloud.com/soundroom-studio/sets/soundroom-podcast',
    'https://soundcloud.com/blumarten/sets/blu-mar-ten-music-guest-mixes'
  ]
```

It loads random playlist on every page load. And you can play that. That's it!

Here the [demo](https://build.andreystarkov.now.sh/), that loads last liked tracks by me.

### Usage

```console
  npm i
  npm start
```
