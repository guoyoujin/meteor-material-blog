// Posts = new Meteor.Collection('posts');


postSchemaObject = {
  title: {
    type: String,
    label: "标题",
    max:100,
    optional: false,
    autoform: {
      editable: true
    }
  },
  slug: {
    type: String,
    label: "二级标题",
    max:100,
    optional: false,
    autoform: {
      editable: true
    }
  },
  body: {
    type: String,
    label: "内容",
    optional: true,
    autoform: {
      editable: true,
      rows:8,
      type:"blogs-richeditor"
    }
  },
  summary: {
    type: String,
    label: "内容",
    optional: true,
    autoform: {
      omit: true
    }
  },
  htmlBody: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  },
  created_at: {
    type: Date,
    optional: true,
    autoform: {
      omit: true
    }
  },
  updated_at: {
    type: Date,
    optional: true,
    autoform: {
      omit: true
    }
  },
  authorName: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  },
  authorId: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  },
  publishedOn: {
    type: Number,
    optional: true,
    autoform: {
      omit: true
    }
  },
  userId: {
        type: String, // XXX
        optional: true,
        autoform: {
          omit: true
        }
      },
      author: {
        type: String,
        optional: true,
        autoform: {
          omit: true
        }
      },
      commentsCount: {
        type: Number,
        optional: true,
        autoform: {
          omit: true
        }
      },
      votes: {
        type: Number,
        optional: true,
        autoform: {
          omit: true
        }
      }
    };

// add any extra properties to postSchemaObject (provided by packages for example)
//_.each(addToPostSchema, function(item){
//    postSchemaObject[item.propertyName] = item.propertySchema;
//});

Posts = new Meteor.Collection("posts");

postSchema = new SimpleSchema(postSchemaObject);

Posts.attachSchema(postSchema);

// ------------------------------------------------------------------------------------------- //
// ----------------------------------------- Helpers ----------------------------------------- //
// ------------------------------------------------------------------------------------------- //

//
Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); }
});

Posts.deny({
  update: function(userId, post, fieldNames) {
        // 只能更改如下两个字段：
        return (_.without(fieldNames, 'body', 'title').length > 0);
      }
    });

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.body;
  }
});

validatePost = function (post) {
  var errors = {};
  if (!post.title)
    errors.title = "请填写标题";
  if (!post.body)
    errors.body =  "请填写 body";
  return errors;
}

Meteor.methods({
  postInsert: function(postAttributes) {
    console.log("插入数据库");
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      body: String,
      slug: String
    });
    var errors = validatePost(postAttributes);
    if (errors.title || errors.body)
      throw new Meteor.Error('invalid-post', "你必须为你的帖子填写标题和 内容");
    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      created_at: new Date(),
      updated_at: new Date(),
      publishedOn: new Date().getTime(),
      authorName: user.profile.name,
      summary: postAttributes.body.replace(/<[^>]+>/g," ").substring(0, 300).trim(),
      authorId: user._id,
      commentsCount: 0,
      votes: 0
    });
    var postId = Posts.insert(post);
    Router.go('/admin');
    return {
      _id: postId
    };
  },
  postEdit: function (modifier, postId) {
    check(Meteor.userId(), String);
    check(modifier.$set, {
      title: String,
      body: String,
      slug: String
    });
    var errors = validatePost(modifier.$set);
    if (errors.title || errors.body)
      throw new Meteor.Error('invalid-post', "你必须为你的帖子填写标题和 内容");
    modifier.$set.updated_at = new Date();
    Posts.update(postId, modifier);
    return Posts.findOne(postId);
  },
  postDelete: function (postId) {
    check(Meteor.userId(), String);
    Comments.remove({postId:postId});
    Upvoters.remove({postId:postId});
    Posts.remove(postId);
    return {success:true}
  }
});