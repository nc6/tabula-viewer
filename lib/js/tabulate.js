(function($) {
  $(document).ready(function() {

    $('#template-entry-hidden').load("entry.template.html");

    $('#btn-load-project').click(function(){
      var project = $('#project-name').val();
      $.getJSON(project, renderData);
    });
  });

  function renderData(data) {
    // For each entry
    $.each(data, function(index, entry) {
      // Clone the template
      var entryDiv = $('#template-entry-hidden').clone().children();
      // Set background colour based on exit status
      entryDiv.css("background-color", pickExitColour(entry.entry.exitStatus))
      entryDiv.find(".tabula-command").html(entry.entry.command);
      // Append to the main div
      entryDiv.appendTo('div#project-data');
    });

  }

  function pickExitColour(exitStatus) {
    if (exitStatus === 0) {
      // Successful
      return "#00FF00";
    } else if (exitStatus > 127) {
      // Killed by user
      return "#FFFF00";
    } else {
      // Failed for some reason.
      return "#FF0000";
    }
  }

})(jQuery);