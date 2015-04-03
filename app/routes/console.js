import Ember from 'ember';
import ENV from "../config/environment"; // import ENV

export default Ember.Route.extend({
  needs: ['auth'],
  setupController: function(controller, model) {
    controller.set('model', model);
  },
  model : function() {
    var self  = this,
        token = self.controllerFor('auth').get('token');

    console.log('[ConsoleRoute] token: ', token);

    // return a promise
    return new Ember.RSVP.Promise(function(resolve, reject) {

      // setup variables
      var url       = ENV.APP.API_HOST  + "/api/1/groups";     // API url

      Ember.$.ajaxSetup({headers: {"x-access-token": token}});

      // make the GET request
      Ember.$.get( url, function( data ) {

        // if the API call was successful
        if(data.success === true) {

          var groupArray = Ember.A();

          var bingerArray = Ember.A();

          data.data.forEach(function(item) {

            item.id = item._id;

            for(var x = 0; x < item.bingers.length; x++) {
              item.bingers[x].id = item.bingers[x]._id;

              var binger = self.store.push('binger', item.bingers[x]);

              bingerArray.addObject(binger);
            }

            item.bingers = bingerArray;

            var group = self.store.push('group', item);

            groupArray.addObject(group);

          });

          resolve(bingerArray);

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
