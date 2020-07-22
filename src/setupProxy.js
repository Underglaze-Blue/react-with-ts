// const proxy = require('http-proxy-middleware');
const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://img.xjh.me/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  )
  app.use(
    '/bing',
    createProxyMiddleware({
      target: 'https://cn.bing.com',
      changeOrigin: true,
      pathRewrite: {
        '^/bing': ''
      }
    })
  )
};
