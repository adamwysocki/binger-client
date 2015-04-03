import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement : function() {
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

    var content = this.get('controller.content');
    var new_value = content.get('interval');
    Ember.$('#interval_slider').foundation('slider', 'set_value', new_value);

    Ember.$("select").prop('disabled', true);
  }
});
