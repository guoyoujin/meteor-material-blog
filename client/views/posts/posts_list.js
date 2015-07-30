Template.posts_list.helpers({
  posts: function() {
  	if(Router.current().params.query.search){
  		return Posts.find({title: {$regex: Router.current().params.query.search, $options:'i'}});
  	}
    return Posts.find( {}, {sort: {publishedOn: -1} } );
  }
});