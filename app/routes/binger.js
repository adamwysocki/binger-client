import Ember from 'ember';
import ENV from "../config/environment"; // import ENV

export default Ember.Route.extend({
  needs: ['auth'],
  setupController: function(controller, model) {
    controller.set('model', model);
  },
  model : function(params) {
    var self  = this,
        token = self.controllerFor('auth').get('token');

    console.log('[ConsoleRoute] token: ', token);

    // return a promise
    return new Ember.RSVP.Promise(function(resolve, reject) {

      // setup variables
      var url       = ENV.APP.API_HOST  + "/api/1/bingers/" + params.id;

      Ember.$.ajaxSetup({headers: {"x-access-token": token}});

      // make the GET request
      Ember.$.get( url, function( data ) {

        // if the API call was successful
        if(data.success === true) {

          var item          = data.data;
          item.id           = item._id;

          var binger         = self.store.push('binger', item);

          // resolve the promoise and return the model
          resolve(binger);

        } else {
          // API call failed, return an error
          if(data.error === 401) {
            reject({error: 401, msg: data.msg});
          } else {
            reject({error: 500, msg: 'unknown error'});
          }
        }

      }).fail(function() {
        reject({error: 500, msg: 'unknown error'});
      });
    });
  },
  actions: {
    error: function(reason) {
      console.log('[ConsoleRoute.error] error: ',
                   JSON.stringify(reason)); // "FAIL"

      if(reason.error === 401) {
        this.transitionTo('login');
      } else {
        this.transitionTo('error');
      }
    }
  }
});
