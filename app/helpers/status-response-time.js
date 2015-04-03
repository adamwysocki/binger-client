import Ember from 'ember';

export function statusResponseTime(input) {

  var returnString = '--';

  if(Ember.$.isNumeric(input)) {
    returnString = input + ' ms';
  }

  return returnString;
}

export default Ember.Handlebars.makeBoundHelper(statusResponseTime);
