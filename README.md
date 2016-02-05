#inViewport.js
##Javascript functions to check if html elements are in the viewport

Written by: Alexander Spirgel - <a href="http://alexanderspirgel.com" target="_blank">alexanderspirgel.com</a>

###License
Released under the MIT license - <a href="http://opensource.org/licenses/MIT" target="_blank">http://opensource.org/licenses/MIT</a>

###Using the script
Each function will return true or false depending on whether the element is in view.
"isInView" checks if any of the element is in view, "isInFullView" checks if all of the element is in view.
Jquery selectors are supported and can be passed into the function.
Pixel offsets can be entered in as function parameters after the element.

isInView(elem, offsetTop, offsetRight, offsetBottom, offsetLeft)
returns true or false

Supports CSS style offset inputs
isInView(elem, 10) = isInView(elem, 10, 10, 10, 10)
isInView(elem, 10, 20) = isInView(elem, 10, 20, 10, 20)