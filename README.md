#inViewport.js
Javascript functions to check if html elements are in the viewport

Written by: Alexander Spirgel - <a href="http://alexanderspirgel.com" target="_blank">alexanderspirgel.com</a>

###License
Released under the MIT license - <a href="http://opensource.org/licenses/MIT" target="_blank">http://opensource.org/licenses/MIT</a>

###Using the script
Using jQuery CSS selectors you can call .isInView() with various options. The script will change the classes of the selected elements depending if the element is in view.

These are the classes that are applied to the element:
* 'vp-unviewed'
* 'vp-viewing'
* 'vp-viewed'

###Options
Here are the options and their default values:

`'type': 'inView' // 'inView', 'inFullView'`

`'viewportOffsetTop': 0 // Viewport offset top pixel value`

`'viewportOffsetRight': 0 // Viewport offset right pixel value`

`'viewportOffsetBottom': 0 // Viewport offset bottom pixel value`

`'viewportOffsetLeft': 0 // Viewport offset left pixel value`

`'enterCallback': function(){
    // Enter callback code here
}`

`'leaveCallback': function(){
    // Leave callback code here
}`

`'checkInterval': 200 // Frequency interval in miliseconds to check`