import Ember from 'ember';
import ENV from "../config/environment"; // import ENV

export default Ember.ArrayController.extend({
  breadCrumb: "Console",
  needs: ['auth', 'binger'],
  addingNewGroup: false,
  selectedType: {id: 1},
  types: [{type:'Ping', id:1}, {type:'Web (http)', id:2}],
  sortProperties: ['status', 'responsetime'],
  sortAscending: true,
  addNew : false,
  hasError: false,
  hasPageError: false,
  pageErrorMessage: '',
  errorMessage: '',
  isSubmitting: false,
  responsetime: function(){
    var count = 0;
    var totalResponseTime = 0;
    this.get('content').forEach(function(item) {
      count++;
      totalResponseTime += item.get('responsetime');
    });

    if(count) {
      return totalResponseTime / count;
    } else {
      return 0;
    }
  }.property('content.@each.responsetime'),
  down: function(){
    var count = 0;
    this.get('content').forEach(function(item) {
      if(item.get('status') === ENV.APP.BINGER_STATUS_DOWN) {
        count++;
      }
    });
    return count;
  }.property('content.@each.status'),
  up: function(){
    var count = 0;
    this.get('content').forEach(function(item) {
      if(item.get('status') === ENV.APP.BINGER_STATUS_ACTIVE) {
        count++;
      }
    });
    return count;
  }.property('content.@each.status'),
  /*data.id, data.address, data.status, data.responsetime, data.lastevent*/
  updateBinger: function(id, name, status, responsetime, lastevent) {
    var binger = this.get('model').findBy('id', id);
    if(binger) {
      binger.set('responsetime', responsetime);
      binger.set('status', status);
      binger.set('lastevent', lastevent);
    }
  },
  newBinger: function(id, name, status, responseTime, lastevent, type) {
    var b = this.store.createRecord('binger', {
      id: id,
      name: name,
      status: status,
      responsetime: responseTime,
      lastevent: lastevent,
      type: type
    });
    this.get('model').addObject(b);
  },
  removeBinger: function(id) {
    this.get('model').removeObject(this.get('model').findBy('id', id));
  },
  validateAddress: function(serverAddress) {
    if( (typeof(serverAddress) === 'undefined') ||
    (serverAddress.length <= 0) ) {
      this.set('errorMessage', 'Hostname cannot be blank');
      this.set('hasError', true);
      return false;
    } else {
      this.resetErrorState();
      return true;
    }
  },
  resetAll: function() {
    this.resetErrorState();

    this.setProperties({
      addNew: false,
      addingNewGroup: false,
      groupName: '',
      groupDescription: '',
      address: ''
    });
  },
  resetErrorState: function() {
    this.setProperties({
      errorMessage: '',
      hasError: false,
      hasPageError: false,
      pageErrorMessage: ''
    });
  },
  actions : {
    addNewGroup: function() {
      this.transitionTo('console.new');
    },
    addNewBinger: function() {
      this.set('addNew', true);
    },
    cancelAdd: function() {
      this.resetAll();
    },
    clearPageError: function() {
      this.setProperties({
        hasPageError: false,
        pageErrorMessage: ''
      });
    },
    saveNewBinger: function() {
      var self = this;

      this.set('isSubmitting', true);

      var serverAddress = this.get('address');
      var type          = this.get('selectedType.id');

      if(!this.validateAddress(serverAddress)) { return; }

      var url = ENV.APP.API_HOST  + "/api/1/bingers";     // API url

      var token = self.controllerFor('auth').get('token');

      console.log('[ConsoleController.saveNewBinger] token: ', token);

      Ember.$.ajaxSetup({headers: {"x-access-token": token}});

      Ember.$.post( url, {
        address: serverAddress,
        timestamp: new Date(),
        type: type}, function(data) {

        self.set('isSubmitting', false);

        if(data.success === true) {
          self.resetAll();
        } else {
          self.set('hasPageError', true);
          self.set('pageErrorMessage', data.msg);
        }

      }).fail(function(){
        self.set('isSubmitting', false);
        self.set('hasPageError', true);
        self.set('pageErrorMessage', "Unable to connect to Binger " +
        "application server. Please check your internet connection " +
        "and try again.");
      });

    },
    deleteBinger: function(bingerId) {
      var self  = this,
          url   = ENV.APP.API_HOST  + "/api/1/bingers/" + bingerId; // API url

      Ember.$.ajax({
        url: url,
        type: 'DELETE',
        success: function(data) {
          if(data.success === true) {

            self.get('model')
                .removeObject(self.get('model')
                .findBy('id', bingerId));
          } else {
            console.log('delete failed');
          }
        }
      });
    },
    pauseBinger: function(id) {
      this.get('controllers.binger').send('pause', id);
    },
    resumeBinger: function(id) {
      this.get('controllers.binger').send('resume', id);
    }
  },
  sockets: {
    newBinger: function(data) {
      console.log('newBinger: ', data.id, data.address, data.status);

      this.newBinger(data.id, data.address, data.status, data.responsetime, data.lastevent, data.type);

      if(! ('Notification' in window) ){
        return;
      }

      window.Notification.requestPermission(function(permission){

        var notification = new window.Notification("New Binger",{body:data.address + ' has been added'});

        setTimeout(function(){
          notification.close(); //closes the notification
        },5000);

      });

    },
    removeBinger: function(data) {
      console.log('deleteBinger: ', data.id);

      this.removeBinger(data.id);

      if(! ('Notification' in window) ){
        return;
      }

      window.Notification.requestPermission(function(permission){

        var notification = new window.Notification("Binger Deleted",{body:data.name + ' has been deleted'});

        setTimeout(function(){
          notification.close(); //closes the notification
        },5000);

      });

    },
    updateBinger: function(data) {
      /*{id: id, address: address, status: status, responsetime: responsetime, lastevent: lastevent}*/
      console.log('updateBinger: ', data.id, data.address, data.responsetime, data.status);

      this.updateBinger(data.id, data.address, data.status, data.responsetime, data.lastevent);

      if(data.changeevent) {

        if(! ('Notification' in window) ){
          return;
        }

        window.Notification.requestPermission(function(permission){

          var notification = new window.Notification("Binger Alert",{body:data.address + ' is ' + data.status});

          setTimeout(function(){
            notification.close(); //closes the notification
          },5000);

        });
      }

    },
    connect: function() {
      console.log('EmberSockets has connected...');
    },
    disconnect: function() {
      console.log('EmberSockets has disconnected...');
    }
  },
});
