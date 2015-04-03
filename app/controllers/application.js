import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['auth'],
  loggedIn: Ember.computed.alias('controllers.auth.loggedIn'),
  isAdmin: Ember.computed.alias('controllers.auth.isAdmin'),
  actions : {
    logout: function() {
      this.get('controllers.auth').set('isAdmin', false);
      this.get('controllers.auth').set('loggedIn', false);
      this.get('controllers.auth').set('token', '');

      if(typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        localStorage.removeItem("token");

        console.log('[Application.logout] token removed');

      } else {
        // Sorry! No Web Storage support..
        console.log('No local storage');
      }

      this.transitionToRoute('login');
    }
  }
});
