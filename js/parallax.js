/**
 * File built with Cakefile at 2012-10-28T09:34:50+09:00
 */
(function() {
  var $, items,
    __slice = [].slice;

  items = ['http://www.madoka-magica.com/tv/special/yokokugallery/img/01.jpg', 'http://www.madoka-magica.com/tv/special/yokokugallery/img/02.jpg', 'http://www.madoka-magica.com/tv/special/yokokugallery/img/03.jpg', 'http://www.madoka-magica.com/tv/special/yokokugallery/img/04.jpg', 'http://www.madoka-magica.com/tv/special/yokokugallery/img/05.jpg', 'http://www.madoka-magica.com/tv/special/yokokugallery/img/06.jpg', 'http://www.madoka-magica.com/tv/special/yokokugallery/img/07.jpg', 'http://www.madoka-magica.com/tv/special/yokokugallery/img/08.jpg', 'http://www.madoka-magica.com/tv/special/yokokugallery/img/09.jpg', 'http://www.madoka-magica.com/tv/special/yokokugallery/img/10.jpg', 'http://www.madoka-magica.com/tv/special/yokokugallery/img/11.jpg', 'http://www.madoka-magica.com/tv/special/yokokugallery/img/12.jpg'];

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
    var $main, $window, handleLoadComplete, handleLoadError, handleLoadProgress, promises;
    $window = $(window);
    $main = $('#main');
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
      return $('#loader').text("" + (Math.round(percentage)) + " %");
    };
    handleLoadError = function(jqXHR, textStatus, errorThrown) {
      return console.log(textStatus);
    };
    handleLoadComplete = function() {
      var $div, i, item, items, _i, _len;
      items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      $main.empty();
      for (i = _i = 0, _len = items.length; _i < _len; i = ++_i) {
        item = items[i];
        $div = $('<div/>');
        $div.addClass('image').attr({
          id: i
        }).css({
          backgroundImage: "url(" + item + ")"
        });
        $main.append($div);
      }
      return $('.image').each(function(index) {
        var $self;
        $self = $(this);
        return $(window).on('scroll', function(ev) {
          var adjustment, middlePosY, selfBottomPosY, windowBottomPosY, yPos;
          windowBottomPosY = $window.scrollTop() + $window.height();
          selfBottomPosY = $self.offset().top + $self.height();
          if (windowBottomPosY > $self.offset().top && selfBottomPosY > $window.scrollTop()) {
            middlePosY = (($self.height() * 1.5) - $self.height()) / 2 * (-1);
            adjustment = $window.scrollTop() - $self.offset().top;
            yPos = adjustment / 8 * (-1);
            return $self.css({
              backgroundPosition: "50% " + (middlePosY + yPos) + "px"
            });
          }
        });
      });
    };
    promises = $.preloadByDOM(items);
    return $.when.apply(this, promises).progress(handleLoadProgress).fail(handleLoadError).done(handleLoadComplete);
  });

}).call(this);
