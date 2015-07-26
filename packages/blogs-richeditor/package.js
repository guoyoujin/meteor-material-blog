Package.describe({
  name: 'blogs-richeditor',
  summary: 'Custom richeditor input type for AutoForm',
  version: '1.0.3'
});

Package.onUse(function(api) {
  api.use('templating@1.0.0');
  api.use('blaze@2.0.0');
  api.use('aldeed:autoform');
  api.use('fourseven:scss');
  api.use('jeremy:ghostdown');

  api.addFiles([
    'richeditor.scss',
    'autoform-blogs-richeditor.html',
    'autoform-blogs-richeditor.js'
  ], 'client');
});
