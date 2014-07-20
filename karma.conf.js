module.exports = function(config) {
  config.set({
    basePath: '',
    files: [
      'test/*.js'
    ],
    frameworks: ['jasmine'],
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};