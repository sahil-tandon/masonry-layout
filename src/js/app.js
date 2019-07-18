/** @component : masonry grid layout */
(function () {
  const masonryOptions = {
    itemSelector: '.grid-tile',
    columnWidth: '.grid-sizer',
    gutter: 10,
    fitWidth: true
  }

  $('.grid').masonry(masonryOptions);

  $('body').on('click', '.grid-tile:not(.grid-tile__open)', function () {
    $(this).addClass("grid-tile__open");
    $('.grid').masonry(masonryOptions);
  });

  $('body').on('click', '.tile-collapse', function () {
    $(this).parent().removeClass("grid-tile__open");
    $('.grid').masonry(masonryOptions);
  });

  $('.grid-filters a').click(function (e) {
    e.preventDefault();
    const $thisParent = $(this).parent();

    $('.selected').removeClass("selected");
    $thisParent.addClass("selected");

    $('.grid-tile').hide();
    $($thisParent.data('filter')).show();

    $('.grid').masonry(masonryOptions);
  });
})();