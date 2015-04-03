import Ember from 'ember';

export default Ember.Controller.extend({
  types: [{type:'PING', id:1}, {type:'WEBSITE [HTTP]', id:2}],
  requestTypes: [{type:'GET', id:1}, {type:'POST', id:2}]
});
