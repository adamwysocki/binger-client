import Ember from 'ember';
import ENV from "../config/environment"; // import ENV

export function statusIcon(status) {
  if(status === ENV.APP.BINGER_STATUS_PAUSED) {
    return new Ember.Handlebars.SafeString('<span class="gray-icon"><i class="fa fa-circle" aria-hidden="true"></i></span>');
  } else if(status === ENV.APP.BINGER_STATUS_ACTIVE) {
    return new Ember.Handlebars.SafeString('<span class="green-icon" style="font-size:24px;"><i class="fa fa-play fa-rotate-270" aria-hidden="true"></i></span>');
  } else if(status === ENV.APP.BINGER_STATUS_DOWN) {
    return new Ember.Handlebars.SafeString('<span class="red-icon"><i class="fa fa-circle" aria-hidden="true"></i></span>');
  } else {
    return new Ember.Handlebars.SafeString('<span class="gray-icon"><i class="fa fa-circle" aria-hidden="true"></i></span>');
  }
}

export default Ember.Handlebars.makeBoundHelper(statusIcon);
