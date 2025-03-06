// IIFE
(function ($) {

  // The plugin definition
  $.fn.myPlugin = function (options) {

    // Default settings
    let settings = $.extend({ /* default settings go here */ }, options);

    // Plugin logic will go here, if needed
    console.log('running with settings', settings);

    // Return 'this' to allow chaining
    return this;
  };

})(jQuery);