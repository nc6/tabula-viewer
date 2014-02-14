function ViewModel() {
  var self = this;
  self.entries = ko.observableArray();
  
  self.loadEntries = function(data) {
    self.entries.removeAll();
    data.forEach(function(e){
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
  
  self.changeTab = function(tab) {
    if (!this.hasOwnProperty('selectedTab')) {
      this.selectedTab = tab;
    } else if (this.selectedTab == tab) {
      this.selectedTab = 'none';
    } else {
      this.selectedTab = tab;
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