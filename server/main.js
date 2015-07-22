// Uncomment the code below and fill in your information.
// Then start Meteor in your project to create an initial admin user


if (Meteor.users.find().count() === 0) {
  var userObj = {
      username: 'guoyoujin', 
      email: 'guoyoujin123@gmail.com', 
      password: '',
      profile: {name: '郭友进'},
      roles: 'admin',
    };
  Accounts.createUser(userObj);
}
