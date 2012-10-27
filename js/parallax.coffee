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
  $main = $('#main')

  handleLoadProgress = ->
    threshold = 100 / arguments.length
    percentage = 0
    percentage += threshold for item in arguments when undefined != item

    $('#loader').text("#{Math.round percentage} %")


  handleLoadError = (jqXHR, textStatus, errorThrown) ->
    console.log textStatus


  handleLoadComplete = ->
    items = arguments

    $main.empty()

    for item, i in items
      $div = $('<div/>')

      $div
      .addClass('image')
      .attr
        id: i
      .css
        backgroundImage: "url(#{item})"
        backgroundAttachment: 'fixed'

      $main.append $div

    $window = $(window)

    $('.image').each (index) ->
      $self = $(@)
      offsetCoords = $self.offset()

      $(window).on 'scroll', (ev) ->
        a = $window.scrollTop() + $window.height()
        b = offsetCoords.top + $self.height()

        if a > offsetCoords.top and b > $window.scrollTop()
          id = $self.attr 'id'
          yPos = $window.scrollTop() / -8

          switch id
            when '0'
              yPos = yPos
            when '1'
              yPos += 10
            when '2'
              yPos += 100
            when '3'
              yPos += 100
            when '4'
              yPos += 100
            when '5'
              yPos += 100
            when '6'
              yPos += 150
            when '7'
              yPos += 200
            when '8'
              yPos += 300
            when '9'
              yPos += 350
            when '10'
              yPos += 450
            when '11'
              yPos += 500
            else
              yPos += 500

          $self.css
            backgroundPositionY: "#{yPos}px"


  promises = $.preloadByDOM(items)

  $.when.apply(@, promises)
  .progress(handleLoadProgress)
  .fail(handleLoadError)
  .done(handleLoadComplete)