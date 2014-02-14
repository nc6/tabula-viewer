function ViewModel() {
  var self = this;
  self.entries = ko.observableArray();
  
  self.loadEntries = function(data) {
    self.entries.removeAll();
    data.forEach(function(e){
      e.entry.selectedTab = ko.observable("none");
      e.entry.dirLength = ko.observable("short");
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
    // 'this' is 'entry.selectedTab'
    if (this() === newTab) {
      this('none');
    } else {
      this(newTab);
    }
  };
  
  self.changeDirLength = function() {
    // 'this' is 'entry.dirLength'
    if (this() === 'short') {
      this('long');
    } else if (this() === 'long') {
      this('short');
    }
  };
  
  self.shortDir = function(dir) {
    var comps = dir.split("/");
    return "../" + comps[comps.length - 1];
  };
  
  self.getDate = function(dateTime) {
    var comps = dateTime.split("T");
    return comps[1];
    
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