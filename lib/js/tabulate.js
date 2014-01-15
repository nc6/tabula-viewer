(function ($) {
  $(document).ready(function () {
    $('#template-entry-hidden').load("entry.template.html");

    $('#btn-load-project').click(function () {
     var project = $('#project-name').val();
     $.getJSON(project, renderData);
    });

    $('#project-name').keypress(function (e) {
     if (e.which == 13) {
      var project = $('#project-name').val();
      $.getJSON(project, renderData);
     }
    });
   });

   function renderData(data) {
    $("h2").append("Project log contents");
    // For each entry
    $.each(data, function (index, entry) {
     // Clone the template
     var entryDiv = $('#template-entry-hidden').clone().children();
     // Set background colour based on exit status
     entryDiv.addClass(exitClass(entry.entry.exitStatus));
     entryDiv.find(".tabula-command").html(entry.entry.command);
     // Append to the main div
     entryDiv.appendTo('div#project-data');
    });

   }

   function exitClass(exitStatus) {
    if (exitStatus === 0) {
     // Successful
     return "exitSuccess";
    } else if (exitStatus > 127) {
     // Killed by user
     return "exitKilled";
    } else {
     // Failed for some reason.
     return "exitFailure";
    }
   }

  })(jQuery);
