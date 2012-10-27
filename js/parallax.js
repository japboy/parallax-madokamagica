/**
 * File built with Cakefile at 2012-10-28T03:14:04+09:00
 */
(function() {
  var $, items;

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
    var $main, handleLoadComplete, handleLoadError, handleLoadProgress, promises;
    $main = $('#main');
    handleLoadProgress = function() {
      var item, percentage, threshold, _i, _len;
      threshold = 100 / arguments.length;
      percentage = 0;
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        item = arguments[_i];
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
      var $div, $window, i, item, _i, _len;
      items = arguments;
      $main.empty();
      for (i = _i = 0, _len = items.length; _i < _len; i = ++_i) {
        item = items[i];
        $div = $('<div/>');
        $div.addClass('image').attr({
          id: i
        }).css({
          backgroundImage: "url(" + item + ")",
          backgroundAttachment: 'fixed'
        });
        $main.append($div);
      }
      $window = $(window);
      return $('.image').each(function(index) {
        var $self, offsetCoords;
        $self = $(this);
        offsetCoords = $self.offset();
        return $(window).on('scroll', function(ev) {
          var a, b, id, yPos;
          a = $window.scrollTop() + $window.height();
          b = offsetCoords.top + $self.height();
          if (a > offsetCoords.top && b > $window.scrollTop()) {
            id = $self.attr('id');
            yPos = $window.scrollTop() / -8;
            switch (id) {
              case '0':
                yPos = yPos;
                break;
              case '1':
                yPos += 10;
                break;
              case '2':
                yPos += 100;
                break;
              case '3':
                yPos += 100;
                break;
              case '4':
                yPos += 100;
                break;
              case '5':
                yPos += 100;
                break;
              case '6':
                yPos += 150;
                break;
              case '7':
                yPos += 200;
                break;
              case '8':
                yPos += 300;
                break;
              case '9':
                yPos += 350;
                break;
              case '10':
                yPos += 450;
                break;
              case '11':
                yPos += 500;
                break;
              default:
                yPos += 500;
            }
            return $self.css({
              backgroundPositionY: "" + yPos + "px"
            });
          }
        });
      });
    };
    promises = $.preloadByDOM(items);
    return $.when.apply(this, promises).progress(handleLoadProgress).fail(handleLoadError).done(handleLoadComplete);
  });

}).call(this);
