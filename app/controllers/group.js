import Ember from 'ember';
import ENV from "../config/environment"; // import ENV

export default Ember.Controller.extend({
  breadCrumb: "Group",
  actions: {
    deleteGroup: function() {
      Ember.$('#confirmDeleteModal').foundation('reveal', 'open');
    },
    confirmDelete: function(id) {
      var self  = this,
          url   = ENV.APP.API_HOST  + "/api/1/groups/" + id; // API url

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
    }
  }
});
