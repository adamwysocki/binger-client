import Ember from 'ember';
import ENV from "../config/environment"; // import ENV

export default Ember.Controller.extend({
  loggedIn: false,
  isAdmin: false,
  token: '',
  hasUserNameError: false,
  userNameErrorMessage: '',
  hasPasswordError: false,
  passwordErrorMessage: '',
  hasPageError: false,
  pageErrorMessage: '',
  /*
  loginChange: function() {
    console.log('[AuthController.loginChange] login has changed');
    if(this.get('loggedIn') === true) {
      this.transitionToRoute('console');
    } else {
      this.transitionToRoute('login');
    }
  }.observes('loggedIn'),*/
  clearAll : function() {
    this.setProperties({
      hasUserNameError: false,
      userNameErrorMessage: '',
      hasPasswordError: false,
      passwordErrorMessage: '',
      hasPageError: false,
      pageErrorMessage: ''
    });
    this.set('username', '');
    this.set('password', '');
  },
  actions : {
    clearPageError: function() {
      this.setProperties({
        hasPageError: false,
        pageErrorMessage: ''
      });
    },
    login : function() {

      var url   = ENV.APP.API_HOST  + "/api/1/login",     // API url
          self  = this;

      if(typeof(this.get('username')) === 'undefined') {
        this.set('hasUserNameError', true);
        this.set('userNameErrorMessage', 'Username cannot be blank');
        return;
      } else {
        this.set('hasUserNameError', false);
        this.set('userNameErrorMessage', '');
      }

      if(typeof(this.get('password')) === 'undefined') {
        this.set('hasPasswordError', true);
        this.set('passwordErrorMessage', 'Password cannot be blank');
        return;
      } else {
        this.set('hasPasswordError', false);
        this.set('passwordErrorMessage', '');
      }

      Ember.$.post( url, { username: this.get('username'), password: this.get('password') }, function(data) {

        if(data.success === true) {
          console.log('[AuthController.login] token: ', data.token);

          self.set('loggedIn', true);
          self.set('token', data.token);

          if(data.admin) {
            self.set('isAdmin', true);
          }

          if(typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            localStorage.setItem("token", self.get('token'));
          } else {
            // Sorry! No Web Storage support..
            console.log('No local storage');
          }

          self.clearAll();
          self.transitionToRoute('console');
        } else {
          self.set('hasPageError', true);
          self.set('pageErrorMessage', data.msg);
        }

      }).fail(function(){


      });
    }
  }
});
