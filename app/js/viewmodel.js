function ViewModel() {
  var self = this;
  self.entries = ko.observableArray();
  self.loadEntries = function (data) {
    data.forEach(function(e){
      self.entries.push(e);
      alert("banana");
    });
  };

  (function ($) {
    $(document).ready(function () {
      $('#btn-load-project').click(function () {
        var project = $('#project-name').val();
        $.getJSON(project, self.loadEntries);
      });
    });
  })(jQuery);
}



// Activates knockout.js
ko.applyBindings(new ViewModel());