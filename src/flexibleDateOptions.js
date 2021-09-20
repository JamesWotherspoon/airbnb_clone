import calendarIcon from './images/flexible-stay-calendar-icon.jpg';
import calendarIconSelected from './images/flexible-stay-calendar-icon-selected.jpg';


// month names
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function calendarFlexibleOrSpecificDates(){

    $('.flexible-dates-container').hide();

    $('.dates-specific-dates').on('click', function(){
        $('.calender-option-selected').removeClass('calender-option-selected');
        $(this).addClass('calender-option-selected');
        $('.flexible-dates-container').hide();
        $('.calendar-months-container-stays').show();
        // search bar content change
        $('.check-in-container').show();
        $('.check-out-container').show();
        $('.search-bar-flexible-dates-container')
        .removeClass('search-bar-flexible-dates-container-display')
        .removeClass('search-bar-content-selected');
        // select check in container if no container selected
        if(!$('.check-in-container').hasClass('search-bar-content-selected') && !$('.check-out-container').hasClass('search-bar-content-selected')){
            $('.check-in-container').addClass('search-bar-content-selected');
        }
    });
    $('.dates-flexible-dates').on('click', function(){
        $('.calender-option-selected').removeClass('calender-option-selected');
        $(this).addClass('calender-option-selected');
        $('.calendar-months-container-stays').hide();
        $('.flexible-dates-container').show();
        // search bar content change
        $('.check-in-container').hide();
        $('.check-out-container').hide();
        $('.search-bar-flexible-dates-container')
        .addClass('search-bar-flexible-dates-container-display')
        .addClass('search-bar-content-selected');
        //
        removeCommaLastMonthElement();
    });

    (function flexibleDisplayMonthOptions(){
        let currentMonth = new Date().getMonth();
    
        for(let i=0; i < 6; i++){
            if(currentMonth + i === 12) currentMonth -= 12;
            $(`.flexible-dates-month-title:eq(${i})`).append(`<span class='flexible-month-short-string-${i}'>${monthNames[currentMonth + i]}</span>`);
            if(i < 2){
                $('#flexible-months-of-stay').append(`<span id='flexible-month-short-string-${i}'>${monthNames[currentMonth + i].substring(0, 3)}<span class="comma">,</span> </span>`);
            } else {
                $('#flexible-months-of-stay').append(`<span id='flexible-month-short-string-${i}'>${monthNames[currentMonth + i].substring(0, 3)}<span class="comma">,</span> </span>`);
                $(`#flexible-month-short-string-${i}`).hide();
            }
        } 
    })();


    $('.flexible-dates-length-of-stay').on('click', function(){
        $('.flexible-dates-length-of-stay-selected').removeClass('flexible-dates-length-of-stay-selected');
        $(this).addClass('flexible-dates-length-of-stay-selected');

        const lengthOfStay = $(this).text();
        $('#flexible-length-of-stay').empty().append(lengthOfStay);
    })
    $('.flexible-dates-month-option').on('click', function(){
        if($(this).hasClass('flexible-dates-month-option-selected')){
            if($('.flexible-dates-month-option-selected').length < 2) return
            $(this).removeClass('flexible-dates-month-option-selected').find('img').attr('src', calendarIcon);
            $(`#${$(this).find('span').attr('class')}`).hide();
            removeCommaLastMonthElement()
            return
        }
        $(this).addClass('flexible-dates-month-option-selected').find('img').attr('src', calendarIconSelected);
        $(`#${$(this).find('span').attr('class')}`).show();
        removeCommaLastMonthElement()
    })

    function removeCommaLastMonthElement(){
        $('#flexible-months-of-stay').children(':visible').find('span').show();
        $('#flexible-months-of-stay').children(':visible').last().find('span').hide()
    }
}