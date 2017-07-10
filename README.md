# goScrollYourself
Cross platform and legacy browser support for triggering on scroll
* Fire only once at the beginning of a scroll
* No subsequent callbacks fired during a scroll/inertia
* Determines direction of the scroll/touch
* IE (10) / Firefox / Safari / Chrome / iOS / Android

## Use case
Triggering off of scrolling events across multiple platforms while maintaining cross browser support back through IE 10.
This was required in a Hype animation: http://tumult.com/hype/, some of the other requirements included:
* No 3rd party libraries
* No ES6+
* No JS transpiling

## How do things
Copypasta the contents of `index.js` into wherever scripts are happy. Update the config object as needed, like adding functions to get called in the `onDown` and `onUp` properties.

This is functional, but definitely a WIP.
It utilizes the mousewheel cross browser script found here at MDN: https://developer.mozilla.org/en-US/docs/Web/Events/wheel#Listening_to_this_event_across_browser, and magic.

Pull reqs welcome!

### MIT Licensed
```
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE._
```
