items = [
  'http://www.madoka-magica.com/tv/special/yokokugallery/img/01.jpg'
  'http://www.madoka-magica.com/tv/special/yokokugallery/img/02.jpg'
  'http://www.madoka-magica.com/tv/special/yokokugallery/img/03.jpg'
  'http://www.madoka-magica.com/tv/special/yokokugallery/img/04.jpg'
  'http://www.madoka-magica.com/tv/special/yokokugallery/img/05.jpg'
  'http://www.madoka-magica.com/tv/special/yokokugallery/img/06.jpg'
  'http://www.madoka-magica.com/tv/special/yokokugallery/img/07.jpg'
  'http://www.madoka-magica.com/tv/special/yokokugallery/img/08.jpg'
  'http://www.madoka-magica.com/tv/special/yokokugallery/img/09.jpg'
  'http://www.madoka-magica.com/tv/special/yokokugallery/img/10.jpg'
  'http://www.madoka-magica.com/tv/special/yokokugallery/img/11.jpg'
  'http://www.madoka-magica.com/tv/special/yokokugallery/img/12.jpg'
]

$ = jQuery

$.extend
  preloadByDOM: (items) ->
    promises = []
    request = (url, promise) ->
      $('<img/>')
      .attr('src', url)
      .on 'error', (ev) ->
        $(@).remove()
        promise.reject(url)
      .on 'load', (ev) ->
        $(@).remove()
        promise.notify(url)
        promise.resolve(url)
    for item in items
      deferred = $.Deferred()
      promises.push deferred
      request item, deferred
    promises


$ ->
  $window = $(window)
  $main = $('#main')

  handleLoadProgress = (items...) ->
    threshold = 100 / items.length
    percentage = 0
    percentage += threshold for item in items when undefined != item

    $('#loader').text("#{Math.round percentage} %")


  handleLoadError = (jqXHR, textStatus, errorThrown) ->
    console.log textStatus


  handleLoadComplete = (items...) ->
    $main.empty()

    for item, i in items
      $div = $('<div/>')

      $div
      .addClass('image')
      .attr
        id: i
      .css
        backgroundImage: "url(#{item})"

      $main.append $div

    $('.image').each (index) ->
      $self = $(@)

      $(window).on 'scroll', (ev) ->
        windowBottomPosY = $window.scrollTop() + $window.height()
        selfBottomPosY = $self.offset().top + $self.height()

        if windowBottomPosY > $self.offset().top and selfBottomPosY > $window.scrollTop()
          middlePosY = (($self.height() * 1.5) - $self.height()) / 2 * (-1)
          adjustment = $window.scrollTop() - $self.offset().top
          yPos = adjustment / 8 * (-1)

          $self.css
            backgroundPosition: "50% #{middlePosY + yPos}px"


  promises = $.preloadByDOM(items)

  $.when.apply(@, promises)
  .progress(handleLoadProgress)
  .fail(handleLoadError)
  .done(handleLoadComplete)