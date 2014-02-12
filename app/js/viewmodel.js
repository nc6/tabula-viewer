function ViewModel() {
  var self = this;
}

// Activates knockout.js
ko.applyBindings(new ViewModel());



(function ($) {
  $(document).ready(function () {
    $('#btn-load-project').click(function () {
     var project = $('#project-name').val();
     $.getJSON(project, renderData);
   });
  });
})(jQuery);