// Router.route('/', {
//   template: ('home'),
  
//   waitOn: function() {
//     return Meteor.subscribe('all-posts')
//   },
  
//   data: function() {
//     return Posts.find();
//   },
  
//   onAfterAction: function () {
//     document.title = '天青色等烟雨 | 全部blog';
//   }
// });


Router.route('/about', function() {
  this.render();
});

Router.route('/markdown', function() {
  this.render();
});

Router.route('/contact', function() {
  this.render();
});

Router.route('/admin/users', {
  template: 'users',
  
  waitOn: function() {
    return Meteor.subscribe('get-users');
  }
});

Router.route('/admin', {
  template: 'admin',

  onBeforeAction: function () {
    if ( !Meteor.userId() ) {
      Router.go('/admin/login');
    } else {
      this.render();
    }
  },
  
  waitOn: function() {
    return Meteor.subscribe('all-posts')
  },
  
  data: function() {
    return Posts.find({ authorId: Meteor.userId() });
  },

});

Router.route('/admin/new-post', {
  template: 'post_new',

  onBeforeAction: function () {
    if ( !Meteor.userId() ) {
      Router.go('/admin/login');
    } else {
      this.render();
    }
  },

  onAfterAction: function () {
    document.title = '天青色等烟雨 | 添加blog';
  }

});

Router.route('/admin/te_down_post_new', {
  template: 'te_down_post_new',

  onBeforeAction: function () {
    if ( !Meteor.userId() ) {
      Router.go('/admin/login');
    } else {
      this.render();
    }
  },

  onAfterAction: function () {
    document.title = '天青色等烟雨 | 添加blog';
  }

});


Router.route('/admin/edit/:_id', {
  template: 'post_edit',
  
  onBeforeAction: function () {
    if ( !Meteor.userId() ) {
      Router.go('/admin/login');
    } else {
      this.render();
    }
  },
  
  waitOn: function() {
    return Meteor.subscribe('post-edit', this.params._id)
  },
  
  data: function() {
    return Posts.findOne();
  },
  
  onAfterAction: function () {
    var postFound = this.data();
    if ( !postFound || postFound === undefined) {
      Router.go('/');
    }
  }
  
});

Router.route('/admin/login', {
  template: 'login',
  
  onBeforeAction: function () {
    if ( Meteor.userId() ) {
      Router.go('/admin');
    } else {
      this.render();
    }
  },
  
  onAfterAction: function () {
    document.title = '天青色等烟雨 | 登陆';
  }
  
});

Router.route('/admin/add-new-user', {
  template: 'new_user',
  
  onBeforeAction: function () {
    if ( Meteor.user() && Meteor.user().roles === 'admin' ) {
      this.render();
    } else {
      Router.go('/admin');
    }
  },
  
});

PostsListController = RouteController.extend({
    template: 'home',
    increment: 5,
    postsLimit: function() {
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions: function() {
        return {sort: this.sort, limit: this.postsLimit()+1};
    },
    subscriptions: function() {
        this.postsSub = Meteor.subscribe('posts',this.params.query.search_text, this.findOptions());
    },
    posts: function() {
        return Posts.find({}, this.findOptions());
    },
    data: function() {
        var hasMore = this.posts().count() > this.postsLimit();
        var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
        return {
            posts: this.posts(),
            ready: this.postsSub.ready,
            nextPath: hasMore ? this.nextPath() : null
        };
    },
    onAfterAction: function () {
      document.title = '天青色等烟雨 | 全部blog';
    }
});
NewPostsController = PostsListController.extend({
    sort: {created_at: -1, _id: -1},
    nextPath: function() {
        return Router.routes.newPosts.path({postsLimit: this.postsLimit() + this.increment})
    }
});

Router.route('/', {
    name: 'home',
    controller: NewPostsController
});
Router.route('/:postsLimit?', {name: 'newPosts'});





Router.route('/posts/:_id', {
  template: 'post_single',
  
  waitOn: function() {
    return Meteor.subscribe('post', this.params._id);
  },
  
  data: function() {
    return Posts.findOne();
  }
});


