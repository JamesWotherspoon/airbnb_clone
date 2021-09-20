import calendarFlexibleOrSpecificDates from './flexibleDateOptions';

// month names
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//generating the calander only trigger when show calander clicked
export default function loadCalendar(){

    loadCalendar.passDatesUpToStringDisplay = passDatesUpToStringDisplay
    
    function passDatesUpToStringDisplay(){
    
        if(window.searchBarSelected.placesToStay){
            if(!storeDateSelection.checkIn.dateString){
                $('#check-in-string-date-display').empty().append('Add dates').removeClass('selected-date-string-display');
                $('#check-in-date-remove-button').removeClass('display-delete-button');
            } else {
                $('#check-in-string-date-display').empty().append(`${storeDateSelection.checkIn.dayDate} ${monthNames[storeDateSelection.checkIn.month].substring(0, 3)}`).addClass('selected-date-string-display');
                $('#check-in-date-remove-button').addClass('display-delete-button');
                $('.search-bar-content-selected').removeClass('search-bar-content-selected');
                $('.check-out-container').addClass('search-bar-content-selected');
            }
                
            if(!storeDateSelection.checkOut.dateString){
                $('#check-out-string-date-display').empty().append('Add dates').removeClass('selected-date-string-display');
                $('#check-out-date-remove-button').removeClass('display-delete-button');
            } else {
                $('#check-out-string-date-display').empty().append(`${storeDateSelection.checkOut.dayDate} ${monthNames[storeDateSelection.checkOut.month].substring(0, 3)}`).addClass('selected-date-string-display');
                $('#check-out-date-remove-button').addClass('display-delete-button');
                $('.search-bar-content-selected').removeClass('search-bar-content-selected');
                $('.check-in-container').addClass('search-bar-content-selected');
            }
        }
    
        if(window.searchBarSelected.experiences){
    
            if(!storeDateSelection.checkIn.dateString && !storeDateSelection.checkOut.dateString){
                $('.experience-dates-selected-text').hide();
                $('.experience-dates-not-selected-text').show();
                $('#experience-date-remove-button').removeClass('display-delete-button');
                return 
            }
            $('.experience-check-in-text').empty();
            if(storeDateSelection.checkIn.dateString){
                $('.experience-check-in-text')
                .append(`${storeDateSelection.checkIn.dayDate} ${monthNames[storeDateSelection.checkIn.month].substring(0, 3)}`).show()
                if(!$('#experience-date-remove-button').hasClass('display-delete-button')){
                    $('#experience-date-remove-button').addClass('display-delete-button');
                }  
            }
            $('.experience-check-out-text').empty();
            if(storeDateSelection.checkOut.dateString){
                $('.experience-check-out-text')
                .prepend(`${storeDateSelection.checkOut.dayDate} ${monthNames[storeDateSelection.checkOut.month].substring(0, 3)}`).show();
                if(!$('#experience-date-remove-button').hasClass('display-delete-button')){
                    $('#experience-date-remove-button').addClass('display-delete-button');
                }  
            }
            $('.experience-dates-selected-text').show();
            $('.experience-dates-not-selected-text').hide();
            if($('#experience-date-remove-button').hasClass('display-delete-button')){
                $('#experience-date-remove-button').on('click', function(){
                    storeDateSelection.checkIn.dateString = null;
                    storeDateSelection.checkOut.dateString = null;
                })
            } 
        }
    };

    function handleSelectedCalendarDate(){
        if( $(this).data('date') === storeDateSelection.checkIn.dateString || $(this).data('date') === storeDateSelection.checkOut.dateString ) return;

        if(window.searchBarSelected.placesToStay){
            let checkInSelected = $('.search-bar-content-selected').hasClass('check-in-container');
            let checkOutSelected = $('.search-bar-content-selected').hasClass('check-out-container');

            if(checkInSelected){
                storeDateSelection.checkIn.dateString = $(this).data('date');
            }
            if(checkOutSelected){
                storeDateSelection.checkOut.dateString = $(this).data('date');
            }
        }

        if(window.searchBarSelected.experiences){
            if(!window.experienceCheckIn){
                storeDateSelection.checkIn.dateString = $(this).data('date');
                window.experienceCheckIn = true;
                return
            }
            if(window.experienceCheckIn){
                storeDateSelection.checkOut.dateString = $(this).data('date');
                window.experienceCheckIn = false;
            }
        }
    }

    calendarFlexibleOrSpecificDates()

    class HandleDateSeletion {

        storedDate = null;
        year = null;
        month = null;
        dayDate = null;
        absoluteTime = null;
        $dateDomElement = null;

        get dateString(){
            return this.storedDate;
        };
        /**
        * @param {string} selectedDate
        */
        set dateString(selectedDate){
            this.storedDate = selectedDate;
            this.dateSelected();
        };
        dateSelected(){
            if(this.$dateDomElement) this.$dateDomElement.removeClass('date-selected');
            this.$dateDomElement = $(`[data-date='${this.dateString}']`);

            $('.selected-highlight-days-within-stay').removeClass('selected-highlight-days-within-stay');
            $('.hover-highlight-days-within-stay').removeClass('hover-highlight-days-within-stay');
            storeDateSelection.checkIn.$dateDomElement.css({
                'background-color': '',
                'color': ''
            });
            
            if(!this.dateString){
                passDatesUpToStringDisplay();
                return 
            }

            this.absoluteTime = new Date(this.dateString).getTime();
            const [year, month, date] = this.dateString.split('-');
            this.year = year;
            this.month = month;
            this.dayDate = date;

            if(this.handleDateOrder()) return

            this.$dateDomElement.addClass('date-selected');
            passDatesUpToStringDisplay(); 
            highlightDaysWithinStay()
        }
    }

    // handle checkin and checkout dates
    const storeDateSelection = {
        placesToStaySelected: true,
        experiencesSelected: false,
        checkIn: new HandleDateSeletion(),
        checkOut: new HandleDateSeletion()
    }
    storeDateSelection.checkIn.handleDateOrder = function(){
        if(storeDateSelection.checkOut.dateString && this.absoluteTime > storeDateSelection.checkOut.absoluteTime){
            storeDateSelection.checkOut.dateString = null;
            return false
        }
    }
    storeDateSelection.checkOut.handleDateOrder = function(){
        if(this.absoluteTime < storeDateSelection.checkIn.absoluteTime){
            let selectedDate = this.dateString;
            this.dateString = null;
            storeDateSelection.checkIn.dateString = selectedDate;
            highlightDaysWithinStay()
            passDatesUpToStringDisplay();
            return true;
        }
    }

    // handle remove checkIn date click
    $('#check-in-date-remove-button').on('click', removeCheckInDate)
    function removeCheckInDate(){
        storeDateSelection.checkIn.dateString = null;
        highlightDaysWithinStay();
    } 
    // handle remove checkOut date click
    $('#check-out-date-remove-button').on('click', function(){
        storeDateSelection.checkOut.dateString = null;
        removeCheckInDate();
    })

    //completely reusable
    function highlightDaysWithinStay(){
        // highlight days between selected date and mouse hover
        if(storeDateSelection.checkIn.dateString || storeDateSelection.checkOut.dateString){
            $('.future-calendar-square').on({
                'mouseover': function(){

                    if(storeDateSelection.checkIn.dateString && storeDateSelection.checkIn.absoluteTime < new Date($(this).data('date')).getTime()){
                        
                        $(this).css({
                            'background-color': 'black',
                            'color': 'white'
                        });
                        storeDateSelection.checkIn.$dateDomElement
                        .nextUntil(this, '.future-calendar-square')
                        .addClass('hover-highlight-days-within-stay');

                        // handle highlight while the selected month and hover are over two months 
                        const [, hoverMonth, ] = $(this).data('date').split('-');
                        if(storeDateSelection.checkIn.month < hoverMonth){
                            $(`[data-date='${storeDateSelection.checkIn.year}-${hoverMonth}-1']`).prev()
                            .nextUntil(this, '.future-calendar-square')
                            .addClass('hover-highlight-days-within-stay');
                        }

                    } else if(storeDateSelection.checkOut.dateString && new Date($(this).data('date')).getTime() < storeDateSelection.checkOut.absoluteTime){
                        $(this).css({
                            'background-color': 'black',
                            'color': 'white'
                        });
                        $(this)
                        .nextUntil(storeDateSelection.checkOut.$dateDomElement, '.future-calendar-square')
                        .addClass('hover-highlight-days-within-stay');

                        // handle highlight while the selected month and hover are over two months
                        const [, hoverMonth, ] = $(this).data('date').split('-');
                        if(hoverMonth < storeDateSelection.checkOut.month){
                            $(`[data-date='${storeDateSelection.checkOut.year}-${storeDateSelection.checkOut.month}-1']`).prev()
                            .nextUntil(storeDateSelection.checkOut.$dateDomElement, '.future-calendar-square')
                            .addClass('hover-highlight-days-within-stay');
                        }
                    }
                },
                'mouseout': function(){
                    $('.hover-highlight-days-within-stay').removeClass('hover-highlight-days-within-stay');
                    $(this).css({
                    'background-color': '',
                    'color': ''
                    });
                }
            })
        }
        // highlighting days between selected checkin and checkout 
        if(storeDateSelection.checkIn.dateString && storeDateSelection.checkOut.dateString){

            storeDateSelection.checkIn.$dateDomElement
            .nextUntil(storeDateSelection.checkOut.$dateDomElement, '.future-calendar-square')
            .addClass('selected-highlight-days-within-stay');
            
            if(storeDateSelection.checkIn.month < storeDateSelection.checkOut.month){
                $(`[data-date='${storeDateSelection.checkOut.year}-${storeDateSelection.checkOut.month}-1']`).prev()
                .nextUntil(storeDateSelection.checkOut.$dateDomElement, '.future-calendar-square')
                .addClass('selected-highlight-days-within-stay');
            }
            if(storeDateSelection.checkIn.dateString === storeDateSelection.checkOut.dateString){
                $('.selected-highlight-days-within-stay').removeClass('selected-highlight-days-within-stay')
            }
            $('.hover-highlight-days-within-stay').removeClass('hover-highlight-days-within-stay');
            $('.future-calendar-square').off('mouseover mouseout');
            $('.future-calendar-square').css({
                'background-color': '',
                'color': ''
            });

        }
    }


    (function calenderOpen(){
        const date = new Date();
        const currentDate = date.getDate();
        const currentMonth = date.getMonth();
        const currentYear = date.getFullYear();
    
        let selectedMonth = currentMonth;
        let selectedYear = currentYear;
        $('.next-month-arrow').on('click', nextMonth);
        $('.previous-month-arrow').on('click', previousMonth);
    
        generateCalender(selectedMonth, selectedYear);
    
        function generateCalender(selectedMonth = currentMonth, selectedYear = currentYear){
    
            $('.calendar-day-square').remove();
            $('.calendar-square-blanks').remove();
        
            const createCalenderForMonth = (month, year, $elementForMonth) => {
        
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                let startDayOfMonth = new Date(year, month, 1).getDay();
                startDayOfMonth = (startDayOfMonth === 0) ? 7 : startDayOfMonth;
        
                for(let i = 1; i < startDayOfMonth; i++){
                $elementForMonth.append(`<div class="calendar-square-blanks"></div>`);
                }
                // monthRelaiveToNow  past = -1, currentMonth = 0, future = 1
                const appendCalendarDates = (monthRelativeToNow) => {
                let futureDateClass = monthRelativeToNow === 1 ? 'future-calendar-square' : null;
                for(let i = 1; i <= daysInMonth; i++){
                    if(monthRelativeToNow === 0){
                    futureDateClass = ( i >= currentDate ) ? 'future-calendar-square' : null;
                    }
                    $elementForMonth.append(`<div data-date="${year}-${month}-${i}" class="calendar-day-square ${futureDateClass}">${i}</div>`);
                }
                }
        
                if(new Date(year, month, 1) < new Date(currentYear, currentMonth, 1)){
                appendCalendarDates(-1);
                } else if(year === currentYear && month === currentMonth){
                appendCalendarDates(0);
                } else {
                appendCalendarDates(1);
                }
        
            }
        
            createCalenderForMonth(selectedMonth - 1, selectedYear, $('.overflow-previous-month-calendar-numbers'));
            createCalenderForMonth(selectedMonth, selectedYear, $('.first-displayed-month'));
            createCalenderForMonth(selectedMonth + 1, selectedYear, $('.second-displayed-month'));
            createCalenderForMonth(selectedMonth + 2, selectedYear, $('.overflow-next-month-calendar-numbers'));
        
            // highlight previously selected dates
            if(storeDateSelection.checkIn.dateString){
                storeDateSelection.checkIn.$dateDomElement = $(`[data-date='${storeDateSelection.checkIn.dateString}']`);
                storeDateSelection.checkIn.$dateDomElement.addClass('date-selected');
            }
            if(storeDateSelection.checkOut.dateString){
                storeDateSelection.checkOut.$dateDomElement = $(`[data-date='${storeDateSelection.checkOut.dateString}']`);
                storeDateSelection.checkOut.$dateDomElement.addClass('date-selected');
            }
            highlightDaysWithinStay();
        
            // reset position to 0 after animation
            $('.displayed-month-numbered-dates').css('left', '0');
            $('.month-title').css('left', '0');
        
            // Title for each month
            const monthYearTitle = (month, year) => {
                if(month > 11){
                return `${monthNames[month - 12]} ${year + 1}` 
                }
                if(month < 0){
                return `${monthNames[month + 12]} ${year - 1}` 
                }
                return `${monthNames[month]} ${year}`;
            }
            $('.overflow-previous-month-title').empty().append(monthYearTitle(selectedMonth - 1, selectedYear));
            $('.first-month-title').empty().append(monthYearTitle(selectedMonth, selectedYear));
            $('.second-month-title').empty().append(monthYearTitle(selectedMonth + 1, selectedYear));
            $('.overflow-next-month-title').empty().append(monthYearTitle(selectedMonth + 2, selectedYear));
        
            // event listener for calendar square on click
            $('.future-calendar-square').on('click', handleSelectedCalendarDate)
        }
    
        // listener for next month arrow click 
        function nextMonth(){
            $('.next-month-arrow').off('click', nextMonth);
            selectedMonth += 1; 
            if(selectedMonth > 11){
                selectedMonth = 0;
                selectedYear += 1;
            }
            // listener turned off until animation and processing finished to prevent it breaking with rapid clicking
            $.when(
                $('.month-title').animate({left: `-389px`}, 200),
                $('.displayed-month-numbered-dates').animate({left: `-389px`}, 200)
            ).then(() => {
                generateCalender(selectedMonth, selectedYear)
            }).done(() => {
                $('.next-month-arrow').on('click', nextMonth);
            })
        }
    
        function previousMonth(){
            $('.previous-month-arrow').off('click', previousMonth); 
            selectedMonth -= 1; 
            if(selectedMonth < 0){
                selectedMonth = 11;
                selectedYear -= 1;
            }
            $.when(
                $('.month-title').animate({left: `389px`}, 200),
                $('.displayed-month-numbered-dates').animate({left: `389px`}, 200)
            ).then(() => {
                generateCalender(selectedMonth, selectedYear)
            }).done(() => {
                $('.previous-month-arrow').on('click', previousMonth);
            })
        }
    })();
    // reset string displayed in bar when change from trip to experiences
    passDatesUpToStringDisplay()
}



