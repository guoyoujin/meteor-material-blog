Template.post_edit.onCreated(function () {
  this.error = new ReactiveVar('');
});

// Template.post_edit.onRendered(function() {
//   var post = Template.instance().data;
//   $('input[name=title]').val(post.title);
//   $('input[name=slug]').val(post.slug);
//   $('textarea[name=body]').val(post.body);
// });

Template.post_edit.helpers({
  error: function() {
    return Template.instance().error.get();
  }
});
AutoForm.hooks({
    postEditForm: {
        before: {
            editPost: function(modifier) {
              console.log("编辑posts");
                var post = doc;
                if (!Meteor.user()) {
                    flashMessage(i18n.t('you_must_be_logged_in'), "");
                    return false;
                }
                post = postEditClientCallbacks.reduce(function(result, currentFunction) {
                    return currentFunction(result);
                }, post);
                return post;
            }
        },
        onSuccess: function(operation, post) {
          console.log("编辑posts");
          Router.go('post_single', {_id: post._id});
        },
        onError: function(operation, error) {
          console.log(error)
          flashMessage(error.reason.split('|')[0], "error");
          clearSeenMessages();
        }

    }
});
// Template.post_edit.events({
//   "keyup #post-title": function(event) {
//     var slug = $('input[name=title').val();
//     slug = slug.replace(/\s+/g, '-').trim().toLowerCase();
//     $('input[name=slug').val(slug);
//   },
//   "submit form": function(event, template) {
//     event.preventDefault();
//     var id = template.data._id;
//     var post = {
//       title: $('input[name=title').val(),
//       slug: $('input[name=slug').val(),
//       body: $('textarea[name=body').val()
//     }
//     Meteor.call('editPost', id, post, function(error) {
//       if (error) {
//         template.error.set(error.reason);
//       } else {
//         Router.go('/admin');
//       }
//     });
//   }
// });