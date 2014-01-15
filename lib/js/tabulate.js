(function($) {
  $(document).ready(function() {

    $('#template-entry-hidden').load("entry.template.html");

    $('#btn-load-project').click(function(){
      var project = $('#project-name').val();
      $.getJSON(project, renderData);
    });
  });

  function renderData(data) {
    $.each(data, function(index, entry) {
      var entryDiv = $('#template-entry-hidden').clone().children();
      entryDiv.find(".tabula-command").html(entry.entry.command);
      entryDiv.appendTo('div#project-data');
    });

  }

})(jQuery);