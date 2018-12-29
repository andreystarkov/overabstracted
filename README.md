# React Soundcloud Playground

Someday i was bored so this app exists.
It takes a link and loads playlist data via Soundcloud API.

In the ./src/Config/Soundcloud.js i list links with awesome podcasts. 

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

### It looks like:

![Now it looks like](shot.png)

### Usage

```console
  npm i
  npm start
```
