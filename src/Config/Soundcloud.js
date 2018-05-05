
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const sources = [
  'https://soundcloud.com/blumarten/sets/podcasts',
  'https://soundcloud.com/soul-trader-records/sets/podcasts',
  'https://soundcloud.com/fokuzrecordings/sets/fokuz-recordings-podcast',
  'https://soundcloud.com/ninjaninja/sets/podcasts',
  'https://soundcloud.com/ninjaninja/sets/guest-mixes',
  'https://soundcloud.com/sunandbass/sets/sun-and-bass-podcast',
  'https://soundcloud.com/lokomotiv-music/sets/podcast-series',
  'https://soundcloud.com/afterhours-uk-au/sets/afterhours-podcast',
  'https://soundcloud.com/atmoteka/sets/atmoteka-season-4',
  'https://soundcloud.com/atmoteka/sets/atmoteka-season-3',
  'https://soundcloud.com/dinsubsol/sets/romanian-artists-mixes',
  'https://soundcloud.com/soundroom-studio/sets/soundroom-podcast',
  'https://soundcloud.com/rtsfm/sets/rts-fm-bucharest',
  'https://soundcloud.com/tzinah-records/sets/tzinah-family-artists-podcasts',
  'https://soundcloud.com/blumarten/sets/blu-mar-ten-music-guest-mixes'
]

const soundCloudSettings = {
  clientId: '310e867035eacd04d104cedd5705b31e',
  resolveUrl: sources[random(0, sources.length - 1)],
  preloadType: 'auto'
}

export default soundCloudSettings
