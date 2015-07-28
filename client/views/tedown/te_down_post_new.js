Template.te_down_post_new.onCreated(function () {
  this.error = new ReactiveVar('');
});

Template.te_down_post_new.helpers({
  error: function() {
    return Template.instance().error.get();
  }
});

Template.te_down_post_new.events({
  "keyup #post-title": function(event) {
    var slug = $('input[name=title').val();
    slug = slug.replace(/\s+/g, '-').trim().toLowerCase();
    $('input[name=slug').val(slug);
  },
  "submit form": function(event) {
    event.preventDefault();
    var post = {
      title: $('input[name=title').val().trim(),
      slug: $('input[name=slug').val().trim(),
      body: $('textarea[name=body').val().replace(/\n/g, '<br />')
    }
    Meteor.call('newPost', post, function(error) {
      if (error) {
        template.error.set(error.reason);
      } else {
        Router.go('/admin');
      }
    });
    document.getElementById("new-post").reset();
  }
});