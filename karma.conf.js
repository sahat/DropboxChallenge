module.exports = function(config) {
  config.set({
    basePath: '',
    files: [
      'test/*Spec.js'
    ],
    frameworks: ['jasmine'],
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};