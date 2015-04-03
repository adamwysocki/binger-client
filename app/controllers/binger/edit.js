import Ember from 'ember';
import ENV from "../../config/environment"; // import ENV

export default Ember.Controller.extend({
  notSaved: true,
  types: [{type:'PING', id:1}, {type:'WEBSITE [HTTP]', id:2}],
  requestTypes: [{type:'GET', id:1}, {type:'POST', id:2}],
  actions: {
    cancel: function() {
      var binger = this.get('model');
      binger.rollback();
      this.transitionToRoute('binger');
    },
    save: function(id) {

      var self  = this,
          url   = ENV.APP.API_HOST  + "/api/1/bingers/" + id; // API url

      var interval = Ember.$('#interval_slider').attr('data-slider');

      Ember.$.ajax({
        url: url,
        type: 'PUT',
        data: { name: this.get('content').get('name'),
                hostname: this.get('content').get('hostname'),
                interval: interval,
                type: this.get('content').get('type'),
                path: this.get('content').get('path'),
                port: this.get('content').get('port'),
                expectedresult: this.get('content').get('expectedresult'),
                method: this.get('content').get('method')},
        success: function(data) {
          if(data.success === true) {
            self.set('notSaved', false);
            console.log('edit succeeded: ', JSON.stringify(data.binger, null, 2));
            self.store.push('binger', data.binger);
            self.transitionToRoute('binger.index');
          } else {
            console.log('edit failed');
          }
        }
      });
    }
  }
});
