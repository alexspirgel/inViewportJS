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
            console.log(checkInView(elem, mergedOptions));
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
        function checkInView(elem, options){
            // If all relevant options are valid
            if(validateOptionInput("type", options["type"]) &&
            validateOptionInput("elementPadding", options["elementPadding"]) &&
            validateOptionInput("viewportpadding", options["viewportpadding"]) &&
            validateOptionInput("enterDelay", options["enterDelay"]) &&
            validateOptionInput("leaveDelay", options["leaveDelay"]) &&
            validateOptionInput("scrollInterval", options["scrollInterval"])){
                var elementPaddingObj = formatCSS(options["elementPadding"]);
                var viewportpaddingObj = formatCSS(options["viewportpadding"]);
                // Convert from JQuery selector to normal JavaScript
                if (typeof jQuery === "function" && elem instanceof jQuery){
                    elem = elem[0];
                }
                // Set variable with outer boundaries of elem
                var rect = elem.getBoundingClientRect();
                if(options["type"] == "isInFullView"){
                    // Return true if all boundaries are within viewport, accounting for padding
                    return (
                        (rect.top - elementPaddingObj["topVal"]) >= (0 - viewportpaddingObj["topVal"]) &&
                        (rect.bottom + elementPaddingObj["bottomVal"]) <= (window.innerHeight + viewportpaddingObj["bottomVal"]) &&
                        (rect.left - elementPaddingObj["leftVal"]) >= (0 - viewportpaddingObj["leftVal"]) &&
                        (rect.right + elementPaddingObj["rightVal"]) <= (window.innerWidth + viewportpaddingObj["rightVal"])
                    );
                }
                else{
                    // Return true if one or more boundary is within viewport, accounting for padding
                    return (
                        ( 
                            (rect.top - elementPaddingObj["topVal"]) < (window.innerHeight + viewportpaddingObj["bottomVal"]) &&
                            (rect.bottom + elementPaddingObj["bottomVal"]) > (0 - viewportpaddingObj["topVal"])
                        ) &&
                        (
                            (rect.left - elementPaddingObj["leftVal"]) < (window.innerWidth + viewportpaddingObj["rightVal"]) &&
                            (rect.right + elementPaddingObj["rightVal"]) > (0 - viewportpaddingObj["leftVal"])
                        )        
                    );
                }
            }
        }
        // Run it
        init();
    }
})(jQuery);