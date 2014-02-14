function ViewModel() {
  var self = this;
  self.entries = ko.observableArray();
  
  self.loadEntries = function(data) {
    self.entries.removeAll();
    data.forEach(function(e){
      e.entry.selectedTab = ko.observable("none");
      self.entries.push(e);
    });
  };
  
  self.exitStatusClass = ko.computed(function(status){
    if (status===0)
      return 'exitSuccess';
    if (status>0 && status<128)
      return 'exitFailure';
    if (status>128)
      return 'exitKilled';
  });
  
  self.changeTab = function(newTab) {
    if (this() === newTab) {
      this('none');
    } else {
      this(newTab);
    }
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