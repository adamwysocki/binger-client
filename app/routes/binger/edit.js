import Ember from 'ember';

export default Ember.Route.extend({
  needs: ['auth'],
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('notSaved', true);
  },
  model : function() {
    return this.modelFor('binger');
  },
  actions: {
    willTransition: function(transition) {
      console.log('willTransition');
      if (this.controller.get('model').get('isDirty') &&
          this.controller.get('notSaved') &&
          !confirm("Are you sure you want to abandon your changes?")) {
        transition.abort();
      } else {
        if(this.controller.get('model').get('isDirty')) {
          this.controller.get('model').rollback();
        }
        // Bubble the `willTransition` action so that
        // parent routes can decide whether or not to abort.
        return true;
      }
    }
  }
});
