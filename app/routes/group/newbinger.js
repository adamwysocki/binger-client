import Ember from 'ember';

export default Ember.Route.extend({
  needs: ['auth'],
  setupController: function(controller, model) {
    controller.set('model', model);
  },
  model : function() {
    return this.modelFor('group');
  }
});
