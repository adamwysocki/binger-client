import Ember from 'ember';

export default Ember.Route.extend({
  needs: ['auth'],
  beforeModel: function() {
    console.log('[ApplicationRoute.beforeModel] success');

    if(typeof(Storage) !== "undefined") {
      // Code for localStorage/sessionStorage.
      var token = localStorage.getItem("token");

      if(token) {
        console.log('[ApplicationRoute.beforeModel] token: ', token);
        this.controllerFor('auth').set('loggedIn', true);
        this.controllerFor('auth').set('token', token);
      }
    }
  }
});
