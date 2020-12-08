export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const soundCloudSettings = {
  clientId: '310e867035eacd04d104cedd5705b31e',
  resolveUrl: 'https://soundcloud.com/starcowsky/likes', // sources[random(0, sources.length - 1)],
  preloadType: 'auto'
}

export default soundCloudSettings
