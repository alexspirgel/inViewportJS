/***************
* inViewportJS *
****************/
/*
Version: 1.01 - 2/9/2016
Written By: Alexander Spirgel - alexanderspirgel.com
*/
;(function($){
    var defaults = {
        type: 'isInVeiw', // 'inView', 'inFullView'
        viewportpadding: '0 0 0 0', // CSS style input viewport padding, accepts negative values
        elementPadding: '0 0 0 0', // CSS style input element padding, accepts negative values
        enterDelay: 0, // Delay in miliseconds for enter trigger
        leaveDelay: 0, // Delay in miliseconds for leave trigger
        enterCallback: function(){
            // Enter callback code here
        },
        leaveCallback: function(){
            // Leave callback code here
        },
        scrollInterval: 100 // Interval in miliseconds to check when scrolling
    }
    $.fn.isInView = function(options){
        console.log(this)
        console.log(options)
        // Check for target element
        if(this.length == 0) return this;
        // Support mutltiple elements
        if(this.length > 1){
            this.each(function(){$(this).isInView(options)});
            console.log("multiple trigger")
            return this;
        }
        function formatCSS(strIn){
            return strIn.splt(" ");
            /*if(topVal != undefined && rightVal == undefined && bottomVal == undefined && leftVal == undefined) {rightVal = bottomVal = leftVal = topVal;}
            if(topVal != undefined && bottomVal == undefined) {bottomVal = topVal;}
            if(rightVal != undefined && leftVal == undefined) {leftVal = rightVal;}
            if(topVal == undefined) {topVal = 0;}
            if(rightVal == undefined) {rightVal = 0;}
            if(bottomVal == undefined) {bottomVal = 0;}
            if(leftVal == undefined) {leftVal = 0;}
            var formatOut = [topVal,rightVal,bottomVal,leftVal];
            return formatOut*/
        }
    }
})(jQuery);
/*
// Check if elem is at least partially within viewport
function isInView(elem, offsetTop, offsetRight, offsetBottom, offsetLeft){
    // Check for offsets
    if(offsetTop != undefined && offsetRight == undefined && offsetBottom == undefined && offsetLeft == undefined) {offsetRight = offsetBottom = offsetLeft = offsetTop;}
    if(offsetTop != undefined && offsetBottom == undefined) {offsetBottom = offsetTop;}
    if(offsetRight != undefined && offsetLeft == undefined) {offsetLeft = offsetRight;}
    if(offsetTop == undefined) {offsetTop = 0;}
    if(offsetRight == undefined) {offsetRight = 0;}
    if(offsetBottom == undefined) {offsetBottom = 0;}
    if(offsetLeft == undefined) {offsetLeft = 0;}
    // For those using jQuery
    if (typeof jQuery === "function" && elem instanceof jQuery) {elem = elem[0];}
    // Set variable with outer boundaries of elem
    var rect = elem.getBoundingClientRect();
    // Return true if one or more boundary is within viewport
    return (
        ((rect.top - offsetTop) < window.innerHeight && (rect.bottom + offsetBottom) > 0) &&
        ((rect.left - offsetLeft) < window.innerWidth && (rect.right + offsetRight) > 0)        
    );
}
// Check if all of elem is within viewport
function isInFullView(elem, offsetTop, offsetRight, offsetBottom, offsetLeft){
    // Check for offsets
    if(offsetTop != undefined && offsetRight == undefined && offsetBottom == undefined && offsetLeft == undefined) {offsetRight = offsetBottom = offsetLeft = offsetTop;}
    if(offsetTop != undefined && offsetBottom == undefined) {offsetBottom = offsetTop;}
    if(offsetRight != undefined && offsetLeft == undefined) {offsetLeft = offsetRight;}
    if(offsetTop == undefined) {offsetTop = 0;}
    if(offsetRight == undefined) {offsetRight = 0;}
    if(offsetBottom == undefined) {offsetBottom = 0;}
    if(offsetLeft == undefined) {offsetLeft = 0;}
    // For those using jQuery
    if (typeof jQuery === "function" && elem instanceof jQuery) {elem = elem[0];}
    // Set variable with outer boundaries of elem
    var rect = elem.getBoundingClientRect();
    // Return true if all boundaries are within viewport
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || $(window).height()) &&
        rect.right <= (window.innerWidth || $(window).width())
    );
}
*/