$(function() {

    // Form data model
    var data = {
        step1: {
            badge_number: {
                required: false,
                value: ''
            },
            decline: {
                required: false,
                value: false
            },
            name: {
                required: true,
                value: ''
            },
            email: {
                required: true,
                value: ''
            },
            phone: {
                required: false,
                value: ''
            },
            company: {
                required: false,
                value: ''
            },
            department: {
                required: false,
                value: ''
            },
            call_taker_name: {
                required: false,
                value: ''
            },
            call_taker_phone: {
                required: false,
                value: ''
            },
            call_taker_company: {
                required: false,
                value: ''
            },
            call_taker_department: {
                required: false,
                value: ''
            }
        },
        step2: {
            description: {
                required: true,
                value: ''
            },
            location: {
                required: true,
                value: ''
            },
            date: {
                required: true,
                value: ''
            },
            time: {
                required: true,
                value: ''
            },
            what: {
                required: false,
                value: ''
            },
            injuries: {
                required: true,
                value: ''
            },
            property_damage: {
                required: true,
                value: ''
            },
            airlines: {
                required: true,
                value: ''
            },
            ssi: {
                required: false,
                value: ''
            }
        },
        step3: {
            persons: []
        },
        step4: {
            factors: {
                required: true,
                value: ''
            },
            human_error: {
                required: true,
                value: ''
            },
            mechanical_failure: {
                required: true,
                value: ''
            },
            environment: {
                required: true,
                value: ''
            },
            weather_conditions: {
                required: true,
                clear: false,
                dust: false,
                snow: false,
                clouds: false,
                rain: false,
                fog: false,
                windy: false,
                unkown: false
            },
            pavement_conditions: {
                required: true,
                dry: false,
                ice: false,
                water: false,
                snow: false,
                other: false,
                unkown: false
            },
            pavement_condition: {
                raquired: true,
                value: ''
            },
            other_relavent_info: {
                required: false,
                value: ''
            }
        },
        step5: {
            notes: [],
            files: []
        }
    }

    // the current step by default
    var currentStep = 1;

    // init
    var t = setTimeout(function() {
        // more state work todo...

        // Setup State by clicking once
        $('.nav-tabs > .active').find('a').trigger('click');
    }, 900);

    // Overlay fadeout
    var t = setTimeout(function() {
        $('.overlay').fadeOut();
    }, 1000);

    


    // App functions
    declineDisable = function(toggle) {
        $("#name").prop('disabled', toggle);
        $("#email").prop('disabled', toggle);
        $("#phone").prop('disabled', toggle);
        $("#company").prop('disabled', toggle);
        $("#department").prop('disabled', toggle);
    };

    validate = function(step) {
        console.log('validate step', step);
        //console.log('data',Object.size(data));

        /*for(var i=0; i < Object.size(data); i++) {
            if(step == i+1) {
                console.log(i+1);
                console.log(data[i]);
            }
        }*/

        //Object.entries(data).forEach(entry => {
            //console.log(entry)
        //    let key = entry[0];
        //    let value = entry[1];
            //console.log('',data[value]);
            //use key and value here
        //});

        return true;
    }

    // EVENTS

    // Step 1 - decline toggle
    $(".decline").change(function() {
        if(this.checked) {
            declineDisable(true);
        } else {
            declineDisable(false);
        }
    });

    // Weather Checkboxes
    

    // Submission
    //var validator = $("#main-form").validate();
    var validator = $("form[name='main-form']").validate({
        // Specify validation rules
        rules: {
          // The key name on the left side is the name attribute
          // of an input field. Validation rules are defined
          // on the right side
          name: "required",
          email: "required",
          description: "required",
          location: "required", 
          date: "required",
          time: "required",
          injuries: "required",
          property: "required",
          airlines: "required",
          factors: "required",
          human_error: "required",
          mechanical_failure: "required",
          environment: "required",
          'weather_conditions[]':  { required: true },
          'pavement_conditions[]':  { required: true },
          pavement_condition_description: "required"
        },
        // Specify validation error messages
        messages: {
            badge_number: "Please enter your firstname"
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function(form) {
          
            form.submit();
        }
    });

    // Nav events
    $(".nav-tabs>li>a").click(function(e) {
        var step = $(e.target).attr('data-step');
        console.log('Leaving', currentStep);
        console.log('Navigating to', step);

        var valid = validator.form();
        console.log('FORM ALPHA',valid);
        
        if(valid) {
            //console.log('valid');
            currentStep = step;
            if(currentStep == 1) {
                $('.btnPrevious').hide();
            } else {
                $('.btnPrevious').show();
            }
            if(currentStep == 5) {
                $('.btnNext').hide();
                $('.btnSubmit').show();
            } else {
                $('.btnNext').show();
                $('.btnSubmit').hide();
            }
        } else {
            console.log('invalid');
            e.preventDefault();
            return false;
        }
    });

    // Next and Previous Events
    $('.btnNext').click(function() {
        if(currentStep == 5) {
            return false;
        }
        $('.btnPrevious').show();
        console.log('FORM BETA',validator.form());
        if(validator.form()) {
            $('.nav-tabs > .active').next('li').find('a').trigger('click');
        }
    });
    
    $('.btnPrevious').click(function() {
        if(currentStep == 1) {
            return false;
        }
        $('.nav-tabs > .active').prev('li').find('a').trigger('click');
    });

});


// Helpers
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


// user warning
var confirmOnPageExit = function(e) {
    e = e || window.event;
    var message = 'Any text will block the navigation and display a prompt';
    // For IE6-8 and Firefox prior to version 4
    if(e) {
        e.returnValue = message;
    }
    return message;
};

//window.onbeforeunload = confirmOnPageExit;
window.onbeforeunload = null; // comment out to turn on
