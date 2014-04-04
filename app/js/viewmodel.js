function ViewModel() {
  var self = this;
  self.entries = ko.observableArray();
  
  self.loaded = ko.observable(false);
  
  self.loadEntries = function (data) {
    self.entries.removeAll();
    data.forEach(function (e) {
      e.entry.selectedTab = ko.observable("none");
      e.entry.dirLength = ko.observable("short");
      self.entries.push(e);
    });
    self.loaded(true);
  };

  self.exitStatusClass = ko.computed(function (status) {
    if (status === 0)
      return 'exitSuccess';
    if (status > 0 && status < 128)
      return 'exitFailure';
    if (status > 128)
      return 'exitKilled';
  });

  self.changeTab = function (newTab) {
    // 'this' is 'entry.selectedTab'
    if (this() === newTab) {
      this('none');
    } else {
      this(newTab);
    }
  };

  self.changeDirLength = function () {
    // 'this' is 'entry.dirLength'
    if (this() === 'short') {
      this('long');
    } else if (this() === 'long') {
      this('short');
    }
  };

  self.shortDir = function (dir) {
    var comps = dir.split("/");
    return "../" + comps[comps.length - 1];
  };

  self.getDate = function (dateTime) {
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

ko.bindingHandlers.popoverInit = {
  // This will be called when the binding is first applied to an element
  init: function (element) {
    element = $(element);
    var contentSelector = element.data("popover-content-selector");
    var contentElement = element.find(contentSelector);
    $(contentElement).hide();

    element.popover({
      html: true,
      content: contentElement.html(),
      trigger: "click",
      title: element.attr("title"),
      placement: "bottom",
      container: '.large-bootstrap-popover'
    });
  }
};


// Activates knockout.js
ko.applyBindings(new ViewModel());