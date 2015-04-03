import Ember from 'ember';
import ENV from "../config/environment"; // import ENV

export function statusSmallText(status) {
  if(status === ENV.APP.BINGER_STATUS_PAUSED) {
    return new Ember.Handlebars.SafeString('<button class="xtra-tiny no-bottom" style="background:gray;"><b>PAUSED</b></button>');
  } else if(status === ENV.APP.BINGER_STATUS_ACTIVE) {
    return new Ember.Handlebars.SafeString('<button class="xtra-tiny no-bottom" style="background:green;"><b>ACTIVE</b></button>');
  } else if(status === ENV.APP.BINGER_STATUS_DOWN) {
    return new Ember.Handlebars.SafeString('<button class="xtra-tiny no-bottom" style="background:red;"><b>DOWN</b></button>');
  } else {
    return new Ember.Handlebars.SafeString('<button class="xtra-tiny no-bottom" style="background:gray;"><b>UNKNOWN</b></button>');
  }
}

export default Ember.Handlebars.makeBoundHelper(statusSmallText);
