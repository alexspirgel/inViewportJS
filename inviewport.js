/***************
* inViewportJS *
****************/
/*
Version: 1.00 - 2/5/2016
Written By: Alexander Spirgel - alexanderspirgel.com
*/
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