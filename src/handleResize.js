
export default function handleResize(){

    resized()
    function resized(){

        if($(window).width() < 1125){
            $('.types-of-accommodation-next-arrow').show()
            $('.types-of-accommodation-prev-arrow').hide()

            $('.types-of-accommodation-next-arrow').on('click', function(){
                $('.type-of-accommodation').css('left', 'calc(-33% - 5px)');
                $('.types-of-accommodation-prev-arrow').show()
                $('.types-of-accommodation-next-arrow').hide()
            })
            $('.types-of-accommodation-prev-arrow').on('click', function(){
                $('.type-of-accommodation').css('left', '0');
                $('.types-of-accommodation-prev-arrow').hide()
                $('.types-of-accommodation-next-arrow').show()
            })
        } else {
            $('.type-of-accommodation').css('left', '0');
        }

        if($(window).width() < 725){
            $('nav').removeAttr('id', 'extend-searchbar');
        }
    }

    $(window).on('resize', resized)
};