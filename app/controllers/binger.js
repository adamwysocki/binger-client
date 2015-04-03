import Ember from 'ember';
import ENV from "../config/environment"; // import ENV

export default Ember.Controller.extend({
  actions: {
    deleteBinger: function() {
      Ember.$('#confirmDeleteModal').foundation('reveal', 'open');
    },
    confirmDelete: function(id) {
      var self  = this,
          url   = ENV.APP.API_HOST  + "/api/1/bingers/" + id; // API url

      Ember.$.ajax({
        url: url,
        type: 'DELETE',
        success: function(data) {
          if(data.success === true) {
            console.log('delete succeeded');
          } else {
            console.log('delete failed');
          }

          Ember.$('#confirmDeleteModal').foundation('reveal', 'close');

          self.transitionToRoute('console');
        }
      });
    },
    cancelDelete: function() {
      Ember.$('#confirmDeleteModal').foundation('reveal', 'close');
    },
    pause: function(id) {
      var self  = this,
          url   = ENV.APP.API_HOST  + "/api/1/bingers/" + id; // API url

      Ember.$.ajax({
        url: url,
        type: 'PUT',
        data: { status: ENV.APP.BINGER_STATUS_PAUSED},
        success: function(data) {
          if(data.success === true) {
            console.log('pause succeeded: ', JSON.stringify(data.binger, null, 2));
            self.store.push('binger', data.binger);
          } else {
            console.log('pause failed');
          }
        }
      });
    },
    resume: function(id) {
      var self  = this,
          url   = ENV.APP.API_HOST  + "/api/1/bingers/" + id; // API url

      Ember.$.ajax({
        url: url,
        type: 'PUT',
        data: { status: ENV.APP.BINGER_STATUS_ACTIVE},
        success: function(data) {
          if(data.success === true) {
            console.log('resume succeeded: ', JSON.stringify(data.binger, null, 2));
            self.store.push('binger', data.binger);
          } else {
            console.log('resume failed');
          }
        }
      });
    }
  }
});
