import Ember from 'ember';
import ENV from "../../config/environment"; // import ENV

export default Ember.Controller.extend({
  needs: ['auth'],
  isSubmitting: false,
  selectedType: {id: 1},
  types: [{type:'Ping', id:1}, {type:'Web (http)', id:2}],
  validateAddress: function(address) {
    if( (typeof(address) === 'undefined') ||
    (address.length <= 0) ) {
      return false;
    } else {
      return true;
    }
  },
  actions: {
    cancelAdd: function() {
      this.transitionToRoute('group');
    },
    addBinger: function(id) {
      var self = this;

      this.set('isSubmitting', true);

      console.log('selectedType: ', this.get('selectedType.id'));

      var address       = this.get('address');
      var type          = this.get('selectedType.id');
      var group         = id;

      console.log('[Group.newbinger][Controller] id: ', id);

      if(!this.validateAddress(address)) { return; }

      var url = ENV.APP.API_HOST  + "/api/1/bingers";     // API url

      var token = self.controllerFor('auth').get('token');

      console.log('[ConsoleController.saveNewBinger] token: ', token);

      Ember.$.ajaxSetup({headers: {"x-access-token": token}});

      Ember.$.post( url, {
        name: address,
        timestamp: new Date(),
        group: group,
        type: type
      }, function(data) {

        self.set('isSubmitting', false);

        if(data.success === true) {
          //self.resetAll();

          var group = self.get('model');

          data.binger.id = data.binger._id;

          var binger = self.store.push('binger', data.binger);

          console.log('[newBingerController.addBinger] ', JSON.stringify(group, null, 2));

          group.get('bingers').pushObject(binger);

        } else {
          //self.set('hasPageError', true);
          //self.set('pageErrorMessage', data.msg);
        }

        self.transitionToRoute("group");



      }).fail(function(){
        self.set('isSubmitting', false);
        //self.set('hasPageError', true);
        //self.set('pageErrorMessage', "Unable to connect to Binger " +
        //"application server. Please check your internet connection " +
        //"and try again.");
      });

    },

  }
});
