import DS from 'ember-data';
import ENV from "../config/environment"; // import ENV

export default DS.Model.extend({
  name: DS.attr('string'),
  hostname: DS.attr('string'),
  address: DS.attr('string'),
  type: DS.attr('number'),
  status: DS.attr('number'),
  lastevent: DS.attr('string'),
  responsetime: DS.attr('number'),
  created: DS.attr('date'),
  modified: DS.attr('date'),
  interval: DS.attr('number'),
  port: DS.attr('number'),
  method: DS.attr('number'),
  path: DS.attr('string'),
  expectedstatus: DS.attr('number'),
  expectedresult: DS.attr('string'),

  display_name: function() {
    if(this.get('name')) {
      return this.get('name');
    } else {
      return this.get('host');
    }
  }.property('name', 'host'),

  isWebType: function() {
    if(this.get('type') === 2) {
      return true;
    } else {
      return false;
    }
  }.property('type'),

  paused: function() {
    if(this.get('status') === ENV.APP.BINGER_STATUS_PAUSED) {
      return true;
    } else {
      return false;
    }
  }.property('status')
});
