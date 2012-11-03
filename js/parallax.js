/**
 * File built with Cakefile at 2012-11-03T13:06:34+09:00
 */
(function() {
  var $, logos, wallpapers,
    __slice = [].slice;

  logos = ['http://www.madoka-magica.com/common/img/header.png'];

  wallpapers = ['http://www.madoka-magica.com/tv/special/yokokugallery/img/01.jpg', 'http://www.madoka-magica.com/tv/special/yokokugallery/img/02.jpg', 'http://www.madoka-magica.com/tv/special/yokokugallery/img/03.jpg', 'http://www.madoka-magica.com/tv/special/yokokugallery/img/04.jpg', 'http://www.madoka-magica.com/tv/special/yokokugallery/img/05.jpg', 'http://www.madoka-magica.com/tv/special/yokokugallery/img/06.jpg', 'http://www.madoka-magica.com/tv/special/yokokugallery/img/07.jpg', 'http://www.madoka-magica.com/tv/special/yokokugallery/img/08.jpg', 'http://www.madoka-magica.com/tv/special/yokokugallery/img/09.jpg', 'http://www.madoka-magica.com/tv/special/yokokugallery/img/10.jpg', 'http://www.madoka-magica.com/tv/special/yokokugallery/img/11.jpg', 'http://www.madoka-magica.com/tv/special/yokokugallery/img/12.jpg'];

  $ = jQuery;

  $.extend({
    preloadByDOM: function(items) {
      var deferred, item, promises, request, _i, _len;
      promises = [];
      request = function(url, promise) {
        return $('<img/>').attr('src', url).on('error', function(ev) {
          $(this).remove();
          return promise.reject(url);
        }).on('load', function(ev) {
          $(this).remove();
          promise.notify(url);
          return promise.resolve(url);
        });
      };
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        deferred = $.Deferred();
        promises.push(deferred);
        request(item, deferred);
      }
      return promises;
    }
  });

  $(function() {
    var $document, $main, $window, handleLoadComplete, handleLoadError, handleLoadProgress, loader, promises;
    $window = $(window);
    $document = $(document);
    $main = $('#main');
    loader = (function() {
      var $bar, $loader, $text, render, that;
      $loader = $('#loader');
      $text = $('#text');
      $bar = $('#bar');
      if (0 === $bar.length || 0 === $text.length) {
        $text = $('<p/>');
        $bar = $('<div/>');
        $text.attr({
          id: 'text',
          'data-status': '0 %'
        }).appendTo($loader);
        $bar.attr({
          id: 'bar',
          'data-progress': 0
        }).appendTo($loader);
      }
      render = function() {
        $text.text($text.data('status'));
        return $bar.css({
          width: "" + ($bar.data('progress')) + "%"
        }, {
          duration: 'fast'
        });
      };
      that = {
        error: function(value) {
          console.log(value);
          $text.data('status', value);
          return render();
        },
        update: function(value) {
          $text.data('status', "" + (Math.round(value)) + " %");
          $bar.data('progress', value);
          return render();
        },
        destroy: function() {
          return $loader.remove();
        }
      };
      return that;
    })();
    handleLoadProgress = function() {
      var item, items, percentage, threshold, _i, _len;
      items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      threshold = 100 / items.length;
      percentage = 0;
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        if (void 0 !== item) {
          percentage += threshold;
        }
      }
      return loader.update(percentage);
    };
    handleLoadError = function() {
      var items;
      items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return loader.error('Error occured.');
    };
    handleLoadComplete = function(logo, items) {
      var $div, $h1, $img, $title, i, item, titleHeight, titleOffsetTop, _i, _len;
      loader.destroy();
      $main.css({
        height: "" + (items.length * 100) + "%"
      });
      $h1 = $('<h1/>');
      $img = $('<img/>');
      $img.attr({
        src: logo,
        alt: '魔法少女まどか☆マギカ'
      }).appendTo($h1);
      $h1.attr({
        id: 'title'
      }).appendTo($main);
      for (i = _i = 0, _len = items.length; _i < _len; i = ++_i) {
        item = items[i];
        $div = $('<div/>');
        $div.addClass('image').attr({
          id: i,
          'data-scale': 1.1
        }).css({
          backgroundImage: "url(" + item + ")",
          backgroundSize: "" + ($div.data('scale') * 100) + "%"
        });
        $main.append($div);
      }
      $title = $('#title');
      titleOffsetTop = $title.offset().top;
      titleHeight = $title.height();
      $(window).on('scroll', function(ev) {
        var adjustment, posY;
        adjustment = $document.height() / ($window.height() / 3);
        posY = 20 + $window.scrollTop() / adjustment;
        return $title.css({
          bottom: "" + posY + "px"
        });
      });
      return $('.image').each(function(index) {
        var $self, selfHeight, selfOffsetTop, selfScale;
        $self = $(this);
        selfOffsetTop = $self.offset().top;
        selfHeight = $self.height();
        selfScale = $self.data('scale');
        return $(window).on('scroll', function(ev) {
          var adjustment, middlePosY, posY, selfBottomPosY, windowBottomPosY;
          windowBottomPosY = $window.scrollTop() + $window.height();
          selfBottomPosY = selfOffsetTop + selfHeight;
          if (windowBottomPosY > selfOffsetTop && selfBottomPosY > $window.scrollTop()) {
            middlePosY = ((selfHeight * selfScale) - selfHeight) / 2 * (-1);
            adjustment = $window.scrollTop() - selfOffsetTop;
            posY = adjustment / 8 * (-1);
            return $self.css({
              backgroundPosition: "50% " + (middlePosY + posY) + "px"
            });
          }
        });
      });
    };
    promises = $.preloadByDOM(wallpapers);
    return $.when.apply(this, promises).progress(handleLoadProgress).fail(handleLoadError).done(function() {
      var p, wallpapers;
      wallpapers = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      p = $.preloadByDOM(logos);
      return $.when.apply(this, p).fail(handleLoadError).done(function() {
        var logo, logos;
        logos = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        logo = logos[0];
        return handleLoadComplete(logo, wallpapers);
      });
    });
  });

}).call(this);
