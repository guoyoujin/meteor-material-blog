Template.posts_list.helpers({
  posts: function() {
  	if(Session.get('search_post')){
  		return Posts.find({title: {$regex: Session.get('search_post'), $options:'i'}});
  	}
    return Posts.find( {}, {sort: {publishedOn: -1} } );
  }
});