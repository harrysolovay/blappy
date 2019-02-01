module.exports = {
  devServer: config => {
    const newConfig = {...config}
    newConfig.headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, Content-Type, Authorization',
    }
    return newConfig
  },
}
