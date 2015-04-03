import Ember from 'ember';

export default Ember.Route.extend({
  needs: ['auth'],
  setupController: function(controller, model) {
    controller.set('model', model);
  },
  model : function() {
    return this.modelFor('console');
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
