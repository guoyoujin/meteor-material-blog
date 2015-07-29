Template.navbar.events({
  "click #logout": function(event) {
    event.preventDefault();
    Meteor.logout();
    Router.go('/');
  },
  "search form": function(event) {
    var search_value = Session.get('addHabitMainView.search_value');
    if (search_value){
      return Habits.find({name: {$regex: search_value, $options:'i'}});
    }
    return null;
  }
});
Template.navbar.helpers({
  is_login:function(){
    if(Meteor.user()){
      return true
    }
    return false
  }
});
Template.navbar.onRendered(function(){
  $( document ).ready(function() {
      $('#dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: true, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false // Displays dropdown below the button
      }
    );
  });
  $(".button-collapse").sideNav({
      menuWidth: 200, // Default is 240
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );
});
