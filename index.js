var config = {
        desktopTiming: 100,
        mobileTiming: 100,
        onDown: doDownThings,
        onUp: doUpThings,
}

function doDownThings() {
        document.location = '#section2'
}

function doUpThings() {
        document.location = '#section1'
}

/*
*   Add desktop cross browser support for listening to mousewheel events
*   https://developer.mozilla.org/en-US/docs/Web/Events/wheel#Listening_to_this_event_across_browser
*/
;(function(window, document) {
        var prefix = '',
                _addEventListener,
                support

        // detect event model
        if (window.addEventListener) {
                _addEventListener = 'addEventListener'
        } else {
                _addEventListener = 'attachEvent'
                prefix = 'on'
        }

        // detect available wheel event
        support =
                'onwheel' in document.createElement('div')
                        ? 'wheel' // Modern browsers support "wheel"
                        : document.onmousewheel !== undefined
                          ? 'mousewheel' // Webkit and IE support at least "mousewheel"
                          : 'DOMMouseScroll' // let's assume that remaining browsers are older Firefox

        window.addWheelListener = function(elem, callback, useCapture) {
                _addWheelListener(elem, support, callback, useCapture)

                // handle MozMousePixelScroll in older Firefox
                if (support == 'DOMMouseScroll') {
                        _addWheelListener(
                                elem,
                                'MozMousePixelScroll',
                                callback,
                                useCapture,
                        )
                }
        }

        function _addWheelListener(elem, eventName, callback, useCapture) {
                elem[_addEventListener](
                        prefix + eventName,
                        support == 'wheel'
                                ? callback
                                : function(originalEvent) {
                                          !originalEvent &&
                                                  (originalEvent = window.event)

                                          // create a normalized event object
                                          var event = {
                                                  // keep a ref to the original event object
                                                  originalEvent: originalEvent,
                                                  target:
                                                          originalEvent.target ||
                                                          originalEvent.srcElement,
                                                  type: 'wheel',
                                                  deltaMode:
                                                          originalEvent.type ==
                                                          'MozMousePixelScroll'
                                                                  ? 0
                                                                  : 1,
                                                  deltaX: 0,
                                                  deltaY: 0,
                                                  deltaZ: 0,
                                                  preventDefault: function() {
                                                          originalEvent.preventDefault
                                                                  ? originalEvent.preventDefault()
                                                                  : (originalEvent.returnValue = false)
                                                  },
                                          }

                                          // calculate deltaY (and deltaX) according to the event
                                          if (support == 'mousewheel') {
                                                  event.deltaY =
                                                          -1 /
                                                          40 *
                                                          originalEvent.wheelDelta
                                                  // Webkit also support wheelDeltaX
                                                  originalEvent.wheelDeltaX &&
                                                          (event.deltaX =
                                                                  -1 /
                                                                  40 *
                                                                  originalEvent.wheelDeltaX)
                                          } else {
                                                  event.deltaY =
                                                          originalEvent.deltaY ||
                                                          originalEvent.detail
                                          }

                                          // it's time to fire the callback
                                          return callback(event)
                                  },
                        useCapture || false,
                )
        }
})(window, document)

/*
*   Initiate State
*/
window.goScrollYourself = {
        scrolling: false,
        touchScrolling: false,
        touchStartY: 0,
        timeoutId: void 0,
        hydrate: function() {
                this.scrolling = false
                this.touchScrolling = false
                clearTimeout(this.timeoutId)
                this.timeoutId = void 0
        },
}

/*
*   Add scroll listener for desktop
*/
addWheelListener(window, function handleWheelMove(e) {
        catchStream(e, config.desktopTiming)
        e.preventDefault()
})

/*
*   Add scroll listeners for mobile/touch screens
*/
window.addEventListener('touchstart', function handleTouchStart(e) {
        goScrollYourself.touchStartY = e.touches[0].clientY
})

window.addEventListener('touchmove', function handleTouchMove(e) {
        goScrollYourself.touchScrolling = true
})

window.addEventListener('touchend', function handleTouchEnd(e) {
        // Only fire if there has been movement
        if (goScrollYourself.touchScrolling) {
                catchStream(e, config.mobileTiming)
        }
})

function catchStream(e, timing) {
        if (typeof goScrollYourself.timeoutId === 'number') {
                clearTimeout(goScrollYourself.timeoutId)
                goScrollYourself.timeoutId = void 0
        }

        determineDirection.apply(this, arguments)
}

function determineDirection(e, timing) {
        var direction = 'onUp'
        var deltaY = e.changedTouches
                ? goScrollYourself.touchStartY - e.changedTouches[0].clientY
                : null

        if (e.deltaY > 0 || deltaY > 0) {
                direction = 'onDown'
        }

        onScroll(direction, timing)
}

function onScroll(direction, timing) {
        if (!goScrollYourself.scrolling) {
                // Fire the CB only once at the start of a scroll, but no subsequent calls while scrolling
                config[direction]()
                goScrollYourself.scrolling = true
        }

        goScrollYourself.timeoutId = setTimeout(function() {
                goScrollYourself.hydrate()
        }, timing)
}
