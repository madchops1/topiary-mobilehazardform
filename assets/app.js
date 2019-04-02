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
                required: false,
                value: ''
            },
            email: {
                required: false,
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
    }, 1);

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

    // Nav events
    $(".nav-tabs>li>a").click(function(e) {
        var step = $(e.target).attr('data-step');
        console.log('Leaving', currentStep);
        console.log('Navigating to', step);
        if(validate(currentStep)) {
            console.log('valid');
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
        }
        //currentStep = step;
    });

    // Next and Previous Events
    $('.btnNext').click(function() {
        if(currentStep == 5) {
            return false;
        }
        $('.btnPrevious').show();
        if(validate(currentStep)) {
            $('.nav-tabs > .active').next('li').find('a').trigger('click');
        }
    });
    
    $('.btnPrevious').click(function() {
        if(currentStep == 1) {
            return false;
        }
        if(validate(currentStep)) {
            $('.nav-tabs > .active').prev('li').find('a').trigger('click');
        }
    });

    // Submission
    $(".submit").click(function() {

        // validate

    })
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
