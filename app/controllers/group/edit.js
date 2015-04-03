import Ember from 'ember';
import ENV from "../../config/environment"; // import ENV


export default Ember.Controller.extend({
  breadCrumb: "Edit",
  originalName: '',
  originalDescription: '',
  saveOriginalValues: function() {
    this.set('originalName', this.get('content').get('name'));
    this.set('originalDescription', this.get('content').get('description'));
  },
  restoreOriginalValues: function() {
    this.get('content').set('name', this.get('originalName'));
    this.get('content').set('description', this.get('originalDescription'));
  },
  actions: {
    cancelEdit: function() {
      this.restoreOriginalValues();
      this.transitionToRoute('group');
    },
    saveEdit: function(id) {

      var self  = this,
          url   = ENV.APP.API_HOST  + "/api/1/groups/" + id; // API url

      Ember.$.ajax({
        url: url,
        type: 'PUT',
        data: { name: this.get('content').get('name'),
                description: this.get('content').get('description')},
        success: function(data) {
          if(data.success === true) {
            console.log('edit succeeded');
          } else {
            console.log('edit failed');
          }

          self.transitionToRoute('group');
        }
      });
    }
  }
});
