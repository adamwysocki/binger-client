import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  bingers: DS.hasMany('binger', {embedded: 'always'}),
  hasBingers: function() {
    return this.get('bingers').length;
  }.property('bingers')
});
