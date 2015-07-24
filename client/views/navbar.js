Template.navbar.events({
  "click #logout": function(event) {
    event.preventDefault();
    Meteor.logout();
    Router.go('/');
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
      $('.dropdown-button').dropdown({
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
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );
});
