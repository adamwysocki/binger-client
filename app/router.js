import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('console', { path: "/" }, function() {
    this.route('new');
  });
  this.route('login');
  this.route('signup');
  this.route('settings');
  this.route('reports');
  this.route('group', { path: "/group/:id"}, function() {
    this.route('edit');
    this.route('newbinger');
  });
  this.route('binger', {path: "/binger/:id"}, function() {
    this.route('edit');
  });
  this.route('groups');
});

export default Router;
