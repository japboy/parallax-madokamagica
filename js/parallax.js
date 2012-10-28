/**
 * File built with Cakefile at 2012-10-28T10:18:56+09:00
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
      $main.css({
        height: "" + (items.length * 100) + "%"
      }).empty();
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
      return $('.image').each(function(index) {
        var $self, selfHeight, selfOffsetTop, selfScale;
        $self = $(this);
        selfOffsetTop = $self.offset().top;
        selfHeight = $self.height();
        selfScale = $self.data('scale');
        return $(window).on('scroll', function(ev) {
          var adjustment, middlePosY, selfBottomPosY, windowBottomPosY, yPos;
          windowBottomPosY = $window.scrollTop() + $window.height();
          selfBottomPosY = $self.offset().top + $self.height();
          if (windowBottomPosY > selfOffsetTop && selfBottomPosY > $window.scrollTop()) {
            middlePosY = ((selfHeight * selfScale) - selfHeight) / 2 * (-1);
            adjustment = $window.scrollTop() - selfOffsetTop;
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
