import Ember from 'ember';
import ENV from "../config/environment"; // import ENV

export function largeStatusIcon(status) {
  if(status === ENV.APP.BINGER_STATUS_PAUSED) {
    return new Ember.Handlebars.SafeString('<span class="gray-icon"><i class="fa fa-circle 3x" aria-hidden="true"></i></span>');
  } else if(status === ENV.APP.BINGER_STATUS_ACTIVE) {
    return new Ember.Handlebars.SafeString('<span class="green-icon"><i class="fa fa-circle 3x" aria-hidden="true"></i></span>');
  } else if(status === ENV.APP.BINGER_STATUS_DOWN) {
    return new Ember.Handlebars.SafeString('<span class="red-icon"><i class="fa fa-circle 3x" aria-hidden="true"></i></span>');
  } else {
    return new Ember.Handlebars.SafeString('<span class="gray-icon"><i class="fa fa-circle 3x" aria-hidden="true"></i></span>');
  }
}

export default Ember.Handlebars.makeBoundHelper(largeStatusIcon);
