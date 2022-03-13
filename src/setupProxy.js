module.exports = function(app) {

  app.use((req, res, next) => {
    res.headers
    res.set({
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp'
    });
    next();
  });
};
