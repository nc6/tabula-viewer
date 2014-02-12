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
    $("h1.log-heading").html("Project log");
    // Clear the project-data
    $("div#project-data .tabula-entry").remove();
    // For each entry
    $.each(data, function (index, entry) {
      var id = "tabula-entry-"+entry.timestamp.hashCode();
      // Clone the template
      var entryDiv = $('#template-entry-hidden').clone().children();
      entryDiv.attr("id", id);
      // Set background colour based on exit status
      entryDiv.find("span.tabula-exitstatus").html($("<span></span>")
        .html(entry.entry.exitStatus)
        .addClass("lozenge"))
        .addClass(exitClass(entry.entry.exitStatus));
      // Add the timing information
      entryDiv.find("span.tabula-entry-starttime")
        .html(processTime(entry.entry.startTime).time);
      entryDiv.find("span.tabula-entry-endtime")
        .html(processTime(entry.entry.endTime).time);

      // Add the directory thing  
      var cwd = processCwd(entry.entry.workingDirectory)
      entryDiv.find(".tabula-cwd")
        .html(cwd.short)
        .data("full", cwd.full)
        .data("short", cwd.short)
        .click(function(evt){
          var btn = $(evt.target);
          if (btn.html() == btn.data("short")) {
            btn.html(btn.data("full"));
          } else {
            btn.html(btn.data("short"));
          }
        });
      entryDiv.find(".tabula-command").html(entry.entry.command);
      // Add the stdin/stdout/stderr
      entryDiv.find(".tabula-streams").addClass("tab-content")
        .append(
          $("<div></div>").addClass("tabula-env tab-pane"))
        .append(
          $("<div></div>").addClass("tabula-stdin tab-pane").html(entry.entry.stdin))
        .append(
          $("<div></div>").addClass("tabula-stdout tab-pane").html(entry.entry.stdout))
        .append(
          $("<div></div>").addClass("tabula-stderr tab-pane").html(entry.entry.stderr));    
      
      // Add the environment
      var envTable = $("<table></table>").appendTo(entryDiv.find(".tabula-env"));
      envTable.append("<thead><tr><th>Key</th><th>Value</th></tr></thead>");
      $.each(entry.entry.priorEnv, function(key, env) {
        var row = $("<tr></tr>");
        row.append($("<td></td>").html(env[0]));
        row.append($("<td></td>").html(env[1]));
        envTable.append(row);
      });

      entryDiv.find(".tabula-env-btn").data("toggle", "tag")
        .data("target", "#"+id + " .tabula-env")
        .click(showTab);
      entryDiv.find(".tabula-stdin-btn").data("toggle", "tag")
        .data("target", "#"+id + " .tabula-stdin")
        .click(showTab);
      entryDiv.find(".tabula-stdout-btn").data("toggle", "tag")
        .data("target", "#"+id + " .tabula-stdout")
        .click(showTab);
      entryDiv.find(".tabula-stderr-btn").data("toggle", "tag")
        .data("target", "#"+id + " .tabula-stderr")
        .click(showTab);

      function showTab(evt) {
        var source = evt.target;
        var panel = $("#"+id+" .tabula-streams");
        if ($(source).parent().hasClass("active")) {
          $(source).parent().removeClass("active");
          panel.hide("fast");
        } else {
          panel.show("fast");
          $(source).tab('show');
        }
      }

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

  function processTime(timestamp) {
    var comps = timestamp.split("T");
    return { "date" : comps[0], "time" : comps[1]};
  }

  function processCwd(cwd) {
    var comps = cwd.split("/");
    return { "full" : cwd, "short" : "../" + comps[comps.length - 1]}
  }

  String.prototype.hashCode = function(){
    var hash = 0, i, char;
    if (this.length == 0) return hash;
    for (i = 0, l = this.length; i < l; i++) {
      char  = this.charCodeAt(i);
      hash  = ((hash<<5)-hash)+char;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

})(jQuery);
