/***************
* inViewportJS *
****************/
/*
Version: 1.10 - 2/14/2016
Written By: Alexander Spirgel - alexanderspirgel.com
*/
;(function($){
    var defaults = {
        'type': 'isInView', // 'inView', 'inFullView'
        'elementPadding': '0 0 0 0', // CSS style input element padding, accepts negative values
        'viewportpadding': '0 0 0 0', // CSS style input viewport padding, accepts negative values
        'enterDelay': 0, // Delay in miliseconds for enter trigger
        'leaveDelay': 0, // Delay in miliseconds for leave trigger
        'enterCallback': function(){
            // Enter callback code here
        },
        'leaveCallback': function(){
            // Leave callback code here
        },
        'scrollInterval': 100 // Interval in miliseconds to check when scrolling
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

        /*
        $(window).bind('resize', resizeWindow);
        $(window).unbind('resize', resizeWindow);
        */

        // Initialize
        var init = function(){
            // Merge options with defaults
            var mergedOptions = $.extend(defaults,options);
            // If options are valid
            if(validateOptionInput("type", mergedOptions["type"]) &&
            validateOptionInput("elementPadding", mergedOptions["elementPadding"]) &&
            validateOptionInput("viewportpadding", mergedOptions["viewportpadding"]) &&
            validateOptionInput("enterDelay", mergedOptions["enterDelay"]) &&
            validateOptionInput("leaveDelay", mergedOptions["leaveDelay"]) &&
            validateOptionInput("scrollInterval", mergedOptions["scrollInterval"])){
                // Convert from CSS formatting
                mergedOptions["elementPadding"] = formatCSS(mergedOptions["elementPadding"]);
                mergedOptions["viewportpadding"] = formatCSS(mergedOptions["viewportpadding"]);
                var lastScroll = 0;
                $(window).scroll(function(){
                    var now = +new Date;
                    if (now - lastScroll > mergedOptions["scrollInterval"]){
                        console.log(checkInView(elem, mergedOptions));
                        lastScroll = now;
                    }
                });
                console.log(checkInView(elem, mergedOptions));
            }
        }

        // Split by ' ' and remove nulls
        function splitSpace(inputStr){
            var inputArray = inputStr.split(" ");
            // Remove empty array values caused by excessive spaces
            inputArray = inputArray.filter(Boolean)
            return inputArray;
        }
        // Input validation
        function validateOptionInput(option, input){
            var passFlag = false;
            if(option == 'type'){
                if(input == 'isInView' || input == 'isInFullView'){
                    passFlag = true;
                }
            }
            else if(option == "viewportpadding" || option == "elementPadding"){
                var inputArray = splitSpace(input);
                // Check for the right amount of values and that all characters are digits or spaces
                if(inputArray.length >= 1 && inputArray.length <= 4 && input.match(/(?=\D)(\S)/g) == null){
                    passFlag = true;
                }
            }
            else if(option == "enterDelay" || option == "leaveDelay" || option == "scrollInterval"){
                // Check that input is an integer
                if(input === parseInt(input, 10)){
                    passFlag = true;
                }
            }
            if(!passFlag){
                // Throw error
                console.error('Error: option "' + option + '" value is invalid.');
            }
            return passFlag;
        }
        // CSS Style formatting
        function formatCSS(str){
            var arrLabels = ["topVal","rightVal","bottomVal","leftVal"];
            var arrVals = splitSpace(str);
            arrVals = arrVals.filter(Boolean)
            if(arrVals.length == 1){
                arrVals[1] = arrVals[2] = arrVals[3] = arrVals[0];
            }
            else if(arrVals.length == 2){
                arrVals[2] = arrVals[0];
                arrVals[3] = arrVals[1];
            }
            else if(arrVals.length == 3){
                arrVals[3] = arrVals[1];
            }
            var objOut = {};
            for(i = 0;i < 4;i++){
                objOut[arrLabels[i]] = parseInt(arrVals[i]);
            }
            return objOut;
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
                // Return true if all boundaries are within viewport, accounting for padding
                return (
                    (rect.top - mergedOptions["elementPadding"]["topVal"]) >= (0 - mergedOptions["viewportpadding"]["topVal"]) &&
                    (rect.bottom + mergedOptions["elementPadding"]["bottomVal"]) <= (window.innerHeight + mergedOptions["viewportpadding"]["bottomVal"]) &&
                    (rect.left - mergedOptions["elementPadding"]["leftVal"]) >= (0 - mergedOptions["viewportpadding"]["leftVal"]) &&
                    (rect.right + mergedOptions["elementPadding"]["rightVal"]) <= (window.innerWidth + mergedOptions["viewportpadding"]["rightVal"])
                );
            }
            else{
                // Return true if one or more boundary is within viewport, accounting for padding
                return (
                    ( 
                        (rect.top - mergedOptions["elementPadding"]["topVal"]) < (window.innerHeight + mergedOptions["viewportpadding"]["bottomVal"]) &&
                        (rect.bottom + mergedOptions["elementPadding"]["bottomVal"]) > (0 - mergedOptions["viewportpadding"]["topVal"])
                    ) &&
                    (
                        (rect.left - mergedOptions["elementPadding"]["leftVal"]) < (window.innerWidth + mergedOptions["viewportpadding"]["rightVal"]) &&
                        (rect.right + mergedOptions["elementPadding"]["rightVal"]) > (0 - mergedOptions["viewportpadding"]["leftVal"])
                    )        
                );
            }
        }
        function adjustClasses(elem){

        }
        // Run it
        return init();
    }
})(jQuery);