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
        'type': 'isInView', // 'inView', 'inFullView'
        'elementOffsetTop': 0, // Element offset top, accepts negative values
        'elementOffsetRight': 0, // Element offset right pixel value, accepts negative values
        'elementOffsetBottom': 0, // Element offset bottom pixel value, accepts negative values
        'elementOffsetLeft': 0, // Element offset left pixel value, accepts negative values
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
        'checkInterval': 100 // Frequency interval in miliseconds to check
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
                    if (now - lastScroll > mergedOptions["checkInterval"]){
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
                    if (now - lastResize > mergedOptions["checkInterval"]){
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
                if(input == 'isInView' || input == 'isInFullView'){
                    passFlag = true;
                }
            }
            else if(option == "elementOffsetTop" || option == "elementOffsetRight" || option == "elementOffsetBottom" || option == "elementOffsetLeft" || option == "viewportOffsetTop" || option == "viewportOffsetRight" || option == "viewportOffsetBottom" || option == "viewportOffsetLeft" || option == "checkInterval"){
                // Check that input is an integer
                if(!isNaN(input) && parseInt(Number(input)) == input && !isNaN(parseInt(input, 10))){
                    passFlag = true;
                }
            }
            else if(option == "enterCallback" || option == "leaveCallback"){
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
            if (typeof jQuery === "function" && elem instanceof jQuery){
                elem = elem[0];
            }
            // Set variable with outer boundaries of elem
            var rect = elem.getBoundingClientRect();
            if(mergedOptions["type"] == "isInFullView"){
                // Return true if all boundaries are within viewport, accounting for offset
                return (
                    (rect.top) >= (0) &&
                    (rect.bottom) <= (window.innerHeight) &&
                    (rect.left) >= (0) &&
                    (rect.right) <= (window.innerWidth)
                );
            }
            else{
                // Return true if one or more boundary is within viewport, accounting for offset
                return (
                    ( 
                        (rect.top) < (window.innerHeight) &&
                        (rect.bottom) > (0)
                    ) &&
                    (
                        (rect.left) < (window.innerWidth) &&
                        (rect.right) > (0)
                    )        
                );
            }
        }
        function adjustClasses(elem, isVisible, options){
            //adjust classes
            if(isVisible){
                if(!elem.hasClass('ivp-viewing')){
                    elem.addClass('ivp-viewing');
                    // Run enter callback
                   options.enterCallback();
                }
                if(!elem.hasClass('ivp-viewed')){
                    elem.addClass('ivp-viewed');
                }
                if(elem.hasClass('ivp-unviewed')){
                    elem.removeClass('ivp-unviewed');
                }
            }
            else{
                if(elem.hasClass('ivp-viewing')){
                    elem.removeClass('ivp-viewing');
                    // Run leave callback
                    options.leaveCallback();
                }
                if(!elem.hasClass('ivp-viewed') && !elem.hasClass('ivp-unviewed')){
                    elem.addClass('ivp-unviewed');
                }
            }
            /*
                'ivp-unviewed' - never been viewed
                'ivp-viewing' - currently in view
                'ivp-viewed' - has been viewed
            */
        }
        // Run it
        return init();
    }
})(jQuery);