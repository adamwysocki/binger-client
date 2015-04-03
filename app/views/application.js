import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement : function() {
    var self = this;

    this.$(document).foundation({
      offcanvas : {
        // Sets method in which offcanvas opens.
        // [ move | overlap_single | overlap ]
        open_method: 'overlap',
        // Should the menu close when a menu link is clicked?
        // [ true | false ]
        close_on_click : true
      }
    });

    this.$('a.left-off-canvas-toggle').click(function() {
      self.$('.inner-wrap').css('min-height', self.$(window).height() + 'px');
    });
  }
});
