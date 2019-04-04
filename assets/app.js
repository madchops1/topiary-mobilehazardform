var currentStep = 1;

$(function() {

    // the current step by default
    var retrievedObject = false;
    var personCounter = 0;

    // init
    var t = setTimeout(function() {
        // more state work todo...

        // Setup State by clicking once
        $('.btnSubmit').hide();
        $('.nav-tabs > .active').find('a').trigger('click');
        // Retrieve the object from storage

        retrievedObject = localStorage.getItem('topiaryFormData');
        //console.log('retrievedObject', retrievedObject);
        if(retrievedObject) {
            retrievedObject = JSON.parse(retrievedObject);
            console.log('There is saved data', retrievedObject);
        }
        //console.log('retrievedObject: ', JSON.parse(retrievedObject));

    }, 900);

    // Overlay fadeout
    var t = setTimeout(function() {
        $('.overlay').fadeOut();
        if(retrievedObject) {
            // set the data...
            $("form[name='main-form']").deserialize(retrievedObject);
            
            // set current step
            $('.nav-tabs > li').eq(currentStep-1).find('a').trigger('click');
            

            // Datepicker
            $('#date').datetimepicker({
                format: 'MM/DD/YYYY'
            });
            $('#time').datetimepicker({
                format: "LT"
            });
            
        }
        
    }, 1000);

    // App functions
    declineDisable = function(toggle) {
        $("#name").prop('disabled', toggle);
        $("#email").prop('disabled', toggle);
        $("#phone").prop('disabled', toggle);
        $("#company").prop('disabled', toggle);
        $("#department").prop('disabled', toggle);
    };

    populatePersons = function() {
        var formData = $("form[name='main-form']").serializeArray();
        console.log('populatePersons()', formData);
        //...
    }

    clearPersons = function() {
        $("input[name='person_badge_number']").val('');        
        $("input[name='person_name']").val('');
        $("input[name='person_email']").val('');
        $("input[name='person_phone']").val('');
        $("input[name='person_company']").val('');
        $("input[name='person_department']").val('');
        $("input[name='person_involved']").val('');
        $("input[name='person_witness']").val('');
        $("input[name='person_contact']").val('');
        $("input[name='person_notes']").val('');
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

    var validator = $("form[name='main-form']").validate({
        rules: {
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
        //console.log('FORM ALPHA',valid);
        
        // validate if navigating forward only
        if(valid || step < currentStep) {
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

    $('.btnSave').click(function(e) {
        var formData = $("form[name='main-form']").serialize();
        formData += "&step=" + currentStep;
        localStorage.setItem('topiaryFormData', JSON.stringify(formData));
        alert('You data has been saved for later.');
        e.preventDefault();
    });

    $('.btnClear').click(function(e) {
        localStorage.setItem('topiaryFormData', null);
        e.preventDefault();
    })

    $('.btnAddPerson').click(function(e) {
        e.preventDefault();

        $(".no-persons").hide();
        
        //$('.pers')
        
        var ele = $('.person').clone(true);
        
        // update name unique attr
        $(ele).find('*[name]').each(function(item) {
            console.log('NAME ATTR', item);
            var name = $(ele).find('*[name]').eq(item).attr('name');
            name = name + personCounter;
            $(ele).find('*[name]').eq(item).prop('name',name);
            $(ele).removeClass('person').addClass('aperson').prop('id','collapsePerson'+personCounter).attr('data-index', personCounter);
            console.log(name);
        });

        clearPersons();
        $('.persons-buttons').after('<a id="person'+personCounter+'" data-index="'+personCounter+'" href="#" class="btn btn-primary btnEditPerson">Person '+personCounter+'</a>');
        $('.persons-top').after(ele);
        $(".aperson").hide();
        personCounter++;
        
        //populatePersons();
    });

    $('body').on('click','.btnEditPerson',function(e) {
        //console.log('editPerson');
        //$(".aperson").hide();
        
        var index = $(this).attr('data-index');
        console.log('INDEX', index);
        if($(".aperson[data-index='"+index+"']").is(':visible')){
            console.log('VISIBLE')
            $(".aperson[data-index='"+index+"']").hide();
        } else {
            $(".aperson").hide();
            $(".aperson[data-index='"+index+"']").show();
            //
        }
            //if($(".aperson").eq(eq).not(':visible')){
        //    console.log('visible');
        //    //$(".aperson").eq(eq)
        //    $(".aperson").eq(eq).show();
        //}
        //$(".aperson").eq(eq).siblings('.aperson').hide();
        //.toggle();
        //e.preventDefault();
    });

    //$('.collapse').on('show.bs.collapse', function () {
    //    $('.collapse.in').each(function(){
    //        $(this).collapse('hide');
    //    });
    //});

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


jQuery.fn.deserialize = function (data) {
    var f = this,
        map = {},
        find = function (selector) { return f.is("form") ? f.find(selector) : f.filter(selector); };
    //Get map of values
    jQuery.each(data.split("&"), function () {
        var nv = this.split("="),
            n = decodeURIComponent(nv[0]),
            v = nv.length > 1 ? decodeURIComponent(nv[1]) : null;
        if (!(n in map)) {
            map[n] = [];
        }
        map[n].push(v);
    })

    if(map.step) {
        console.log('Loaded step', map.step);
        currentStep = parseInt(map.step);
    }
    //Set values for all form elements in the data
    jQuery.each(map, function (n, v) {
        find("[name='" + n + "']").val(v).change();

    })
    //Clear all form elements not in form data
    find("input:text,select,textarea").each(function () {
        if (!(jQuery(this).attr("name") in map)) {
            jQuery(this).val("");
        }
    })
    find("input:checkbox:checked,input:radio:checked").each(function () {
        if (!(jQuery(this).attr("name") in map)) {
            this.checked = false;
        }
    })
    return this;
};