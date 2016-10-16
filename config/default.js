module.exports = {

  // server
  server: {
    port: 8888,
    sync: [
      'package.json',
      'server/**',
      'config/**'
    ]
  },

  app: {
    cseId: 'CSE_ID',
    apiKey: 'API_KEY',
    apiSecret: 'API_SECRET'
  }

};
