logos = [
  'http://www.madoka-magica.com/common/img/header.png'
]
wallpapers = [
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
  $document = $(document)
  $main = $('#main')

  loader = do ->
    $loader = $('#loader')
    $text = $('#text')
    $bar = $('#bar')

    if 0 == $bar.length or 0 == $text.length
      $text = $('<p/>')
      $bar = $('<div/>')

      $text
      .attr
        id: 'text'
        'data-status': '0 %'
      .appendTo($loader)

      $bar
      .attr
        id: 'bar'
        'data-progress': 0
      .appendTo($loader)

    render = ->
      $text.text $text.data('status')
      $bar
      .css
        width: "#{$bar.data 'progress'}%"
      ,
        duration: 'fast'

    that =
      error: (value) ->
        console.log value
        $text.data 'status', value
        render()
      update: (value) ->
        $text.data 'status', "#{Math.round value} %"
        $bar.data 'progress', value
        render()
      destroy: ->
        $loader.remove()

    return that


  handleLoadProgress = (items...) ->
    threshold = 100 / items.length
    percentage = 0
    percentage += threshold for item in items when undefined != item

    loader.update percentage


  handleLoadError = (items...) ->
    loader.error 'Error occured.'


  handleLoadComplete = (logo, items) ->
    loader.destroy()

    $main
    .css
      height: "#{items.length * 100}%"

    $h1 = $('<h1/>')
    $img = $('<img/>')

    $img
    .attr
      src: logo
      alt: '魔法少女まどか☆マギカ'
    .appendTo($h1)

    $h1
    .attr
      id: 'title'
    .appendTo($main)

    for item, i in items
      $div = $('<div/>')

      $div
      .addClass('image')
      .attr
        id: i
        'data-scale': 1.1
      .css
        backgroundImage: "url(#{item})"
        backgroundSize: "#{$div.data('scale') * 100}%"

      $main.append $div

    $title = $('#title')
    titleOffsetTop = $title.offset().top
    titleHeight = $title.height()

    $(window).on 'scroll', (ev) ->
      adjustment = $document.height() / ($window.height() / 3)
      posY = 20 + $window.scrollTop() / adjustment

      $title
      .css
        bottom: "#{posY}px"

    $('.image').each (index) ->
      $self = $(@)
      selfOffsetTop = $self.offset().top
      selfHeight = $self.height()
      selfScale = $self.data 'scale'

      $(window).on 'scroll', (ev) ->
        windowBottomPosY = $window.scrollTop() + $window.height()
        selfBottomPosY = selfOffsetTop + selfHeight

        if windowBottomPosY > selfOffsetTop and selfBottomPosY > $window.scrollTop()
          middlePosY = ((selfHeight * selfScale) - selfHeight) / 2 * (-1)
          adjustment = $window.scrollTop() - selfOffsetTop
          posY = adjustment / 8 * (-1)

          $self.css
            backgroundPosition: "50% #{middlePosY + posY}px"


  promises = $.preloadByDOM(wallpapers)

  $.when.apply(@, promises)
  .progress(handleLoadProgress)
  .fail(handleLoadError)
  .done (wallpapers...) ->
    p = $.preloadByDOM(logos)
    $.when.apply(@, p)
    .fail(handleLoadError)
    .done (logos...) ->
      logo = logos[0]
      handleLoadComplete(logo, wallpapers)