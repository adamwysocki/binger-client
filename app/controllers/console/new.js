import Ember from 'ember';
import ENV from "../../config/environment"; // import ENV

export default Ember.Controller.extend({
  breadCrumb: "New Group",
  isSubmitting: false,
  resetAll: function() {
    this.setProperties({
      groupName: '',
      groupDescription: '',
      isSubmitting: false
    });
  },
  actions: {
    cancelAdd: function() {
      this.resetAll();
      this.transitionTo('console');
    },
    addNewGroup: function() {
      var self = this;

      this.set('isSubmitting', true);

      var name                  = this.get('groupName');
      var description           = this.get('groupDescription');

      //if(!this.validateAddress(serverAddress)) { return; }

      var url = ENV.APP.API_HOST  + "/api/1/groups";     // API url

      var token = self.controllerFor('auth').get('token');

      console.log('[ConsoleController.saveNewBinger] token: ', token);

      Ember.$.ajaxSetup({headers: {"x-access-token": token}});

      Ember.$.post( url, {
        name: name,
        description: description}, function(data) {

        self.set('isSubmitting', false);

        if(data.success === true) {
          self.resetAll();

          data.data.id = data.data._id;

          var group = self.store.push('group', data.data);

          self.get('model').addObject(group);

        } else {
          self.set('hasPageError', true);
          self.set('pageErrorMessage', data.msg);
        }

        self.transitionTo('console');

      }).fail(function(){
        self.set('isSubmitting', false);
        self.set('hasPageError', true);
        self.set('pageErrorMessage', "Unable to connect to Binger " +
        "application server. Please check your internet connection " +
        "and try again.");
      });

    }
  }
});
