import Ember from 'ember';

export function statusTime(input) {
  return moment(input).format("MMM Do YYYY, h:mm a");
}

export default Ember.Handlebars.makeBoundHelper(statusTime);
