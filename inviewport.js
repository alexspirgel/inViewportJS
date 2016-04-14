/***************
* inViewportJS *
****************/
/*
Version: 1.20 - 4/13/2016
Written By: Alexander Spirgel - alexanderspirgel.com
*/
;(function($){
    // Default set of options that will be used unless set upon initialization
    var defaults = {
        'type': 'inView', // 'inView', 'inFullView'
        'viewportOffsetTop': 0, // Viewport offset top pixel value, accepts negative values
        'viewportOffsetRight': 0, // Viewport offset right pixel value, accepts negative values
        'viewportOffsetBottom': 0, // Viewport offset bottom pixel value, accepts negative values
        'viewportOffsetLeft': 0, // Viewport offset left pixel value, accepts negative values
        'enterCallback': function(){
            // Enter callback code here
        },
        'leaveCallback': function(){
            // Leave callback code here
        },
        'checkInterval': 200 // Frequency interval in miliseconds to check
    }
    $.fn.isInView = function(options){
        // Check for target element
        if(this.length == 0) return this;
        // Support mutltiple elements
        if(this.length > 1){
            this.each(function(){$(this).isInView(options)});
            return this;
        }
        // Set a reference to chosen element
        var elem = this;
        // Initialize
        var init = function(){
            // Merge options with defaults
            var mergedOptions = $.extend(defaults,options);
            // Initialize optionsValid flag
            var optionsValid = true;
            // Validate all inputs
            for(option in mergedOptions){
                if(!validateOptionInput(option, mergedOptions[option])){
                    optionsValid = false;
                }
            }
            // If options are valid
            if(optionsValid){
                var lastScroll = 0;
                $(window).scroll(function(){
                    // Get the current Time
                    var now = +new Date;
                    // If enough time has passed
                    if (now - lastScroll > mergedOptions['checkInterval']){
                        // Run check on scroll
                        adjustClasses(elem, checkInView(elem, mergedOptions), mergedOptions);
                        // Reset scroll time
                        lastScroll = now;
                    }
                });
                var lastResize = 0;
                $(window).resize(function(){
                    // Get the current Time
                    var now = +new Date;
                    // If enough time has passed
                    if (now - lastResize > mergedOptions['checkInterval']){
                        // Run check on resize
                        adjustClasses(elem, checkInView(elem, mergedOptions), mergedOptions);
                        // Reset scroll time
                        lastResize = now;
                    }
                });
                // Run initial check
                adjustClasses(elem, checkInView(elem, mergedOptions), mergedOptions);
            }
        }
        // Input validation
        function validateOptionInput(option, input){
            var passFlag = false;
            if(option == 'type'){
                // Check for valid in view type
                if(input == 'inView' || input == 'inFullView'){
                    passFlag = true;
                }
            }
            else if(option == 'viewportOffsetTop' || option == 'viewportOffsetRight' || option == 'viewportOffsetBottom' || option == 'viewportOffsetLeft' || option == 'checkInterval'){
                // Check that input is an integer
                if(!isNaN(input) && parseInt(Number(input)) == input && !isNaN(parseInt(input, 10))){
                    passFlag = true;
                }
            }
            else if(option == 'enterCallback' || option == 'leaveCallback'){
                // Do nothing. These values should be javascript which should throw their own errors
                passFlag = true;
            }
            if(!passFlag){
                // Throw error
                console.error('Error: inViewportJS option "' + option + '" value is invalid.');
            }
            return passFlag;
        }
        // Check if elem is within viewport
        function checkInView(elem, mergedOptions){
            // Convert from JQuery selector to normal JavaScript
            if (typeof jQuery === 'function' && elem instanceof jQuery){
                elem = elem[0];
            }
            // Set variable with outer boundaries of elem
            var rect = elem.getBoundingClientRect();
            if(mergedOptions['type'] == 'inFullView'){
                // Return true if all boundaries are within viewport, accounting for offset
                return (
                    (rect.top) >= (0 + mergedOptions['viewportOffsetTop']) &&
                    (rect.bottom) <= (window.innerHeight - mergedOptions['viewportOffsetBottom']) &&
                    (rect.left) >= (0 + mergedOptions['viewportOffsetLeft']) &&
                    (rect.right) <= (window.innerWidth - mergedOptions['viewportOffsetRight'])
                );
            }
            else{ // inView
                // Return true if one or more boundary is within viewport, accounting for offset
                return (
                    ( 
                        (rect.top) < (window.innerHeight - mergedOptions['viewportOffsetBottom']) &&
                        (rect.bottom) > (0 + mergedOptions['viewportOffsetTop'])
                    ) &&
                    (
                        (rect.left) < (window.innerWidth - mergedOptions['viewportOffsetRight']) &&
                        (rect.right) > (0 + mergedOptions['viewportOffsetLeft'])
                    )        
                );
            }
        }
        function adjustClasses(elem, isVisible, options){
            if(isVisible){
                if(!elem.hasClass('vp-viewing')){
                    elem.addClass('vp-viewing');
                    // Run enter callback
                   options.enterCallback();
                }
                if(!elem.hasClass('vp-viewed')){
                    elem.addClass('vp-viewed');
                }
                if(elem.hasClass('vp-unviewed')){
                    elem.removeClass('vp-unviewed');
                }
            }
            else{
                if(elem.hasClass('vp-viewing')){
                    elem.removeClass('vp-viewing');
                    // Run leave callback
                    options.leaveCallback();
                }
                if(!elem.hasClass('vp-viewed') && !elem.hasClass('vp-unviewed')){
                    elem.addClass('vp-unviewed');
                }
            }
            /*
                'vp-unviewed' - never been viewed
                'vp-viewing' - currently in view
                'vp-viewed' - has been viewed
            */
        }
        // Run it
        return init();
    }
})(jQuery);