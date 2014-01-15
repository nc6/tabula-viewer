(function($) {
  $(document).ready(function() {
    $('#btn-load-project').click(function(){
      var project = $('#project-name').val();
      $.getJSON(project, renderData);
    });
  });

  function renderData(data) {
    $('#project-data').html(data);
  }

})(jQuery);