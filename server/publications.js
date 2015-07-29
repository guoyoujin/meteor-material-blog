Meteor.publish('all-posts', function() {
  return Posts.find();
});

Meteor.publish('post', function(_id) {
  return Posts.find({ _id: _id });
});

Meteor.publish('post-edit', function(_id) {
  var user = Meteor.users.findOne(this.userId);
  var post = Posts.findOne({ _id: _id });
  if ( this.userId === post.authorId || user.roles === 'admin' ) {
    return Posts.find({ _id: _id });
  } else {
    return [];
  } 
});

Meteor.publish('post-comments', function(postId) {
  return Comments.find({ postId: postId });
});

Meteor.publish('get-users', function() {
  var user = Meteor.users.findOne(this.userId);
  if ( user.roles === 'admin' ) {
    return Meteor.users.find({});
  } else {
    return Meteor.users.find({_id: user.id});
  }
});

Meteor.publish(null, function() {
 if (this.userId) {
   return Meteor.users.find(
     {_id: this.userId},
     {fields: {profile: 1, username: 1, emails: 1, roles: 1} });
 } else {
   return null;
 }
});