import Ember from 'ember';
import ENV from "../config/environment"; // import ENV

export function statusButton(status) {
  if(status === ENV.APP.BINGER_STATUS_PAUSED) {
    return new Ember.Handlebars.SafeString('<i class="fa fa-play" aria-hidden="true"></i>');
  } else {
    return new Ember.Handlebars.SafeString('<i class="fa fa-pause" aria-hidden="true"></i>');
  }
}

export default Ember.Handlebars.makeBoundHelper(statusButton);
