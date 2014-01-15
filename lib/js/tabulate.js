(function($) {
  $(document).ready(function() {
    $('#btn-load-project').click(function(){
      var project = $('#project-name').val();
      $.getJSON(project, renderData);
    });
  });

  function renderData(data) {
    $.each(data, function(index, entry) {
      var entryDiv = $('<div class="tabula-entry panel panel-default"></div>');
      entryDiv.html('<div class="panel-body">'+entry.entry.command+'</div>');
      entryDiv.appendTo('div#project-data');
    });

  }

})(jQuery);