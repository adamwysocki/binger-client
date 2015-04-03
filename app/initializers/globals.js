import Ember from 'ember';

var globals = Ember.Object.extend({
  BINGER_STATUS_ACTIVE: 5,
  BINGER_STATUS_PAUSED: 10,
  BINGER_STATUS_DOWN: 1
});

export default {
  name: "Globals",

  initialize: function(container, application) {
    container.typeInjection('component', 'store', 'store:main');
    application.register('global:variables', globals, {singleton: true});
    application.inject('controller', 'globals', 'global:variables');
  }
};
