$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/left.png"></img></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/right.png"></img></button>',
        responsive: [
            {
              breakpoint: 991,
              settings: {
                autoplay: true,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                adaptiveHeight: false
            }
         },
         {
            breakpoint: 767,
            settings: {
                autoplay: false,
                prevArrow: false,
                nextArrow: false,
                centerMode: true,
                adaptiveHeight: false
            } 
         },
         {
            breakpoint: 576,
            settings: {
                prevArrow:false,
                nextArrow:false
            }
         }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation' ).fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order' ).fadeIn('slow');
        })
    });


    function valideForm(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                  },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Введите своё имя",
                    minlength: jQuery.validator.format("Введите {0} символов")
                  },
                phone: "Введите свой телефон",
                email: {
                    required: "Введите свою почту",
                    email: "Не правельная почта"
                }
            }
        });
    }

    valideForm('#consultation-form');
    valideForm('#consultation form');
    valideForm('#order form');

    $('input[name=phone]').mask('+7 (999) 999-99-99'); //надо убрать type=number

    $('form').submit(function(e) {
        e.preventDefault();

        if(!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });
    //pageup

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a").on('click', function(event) {

        if (this.hash !== "") {
          event.preventDefault();
    
          var hash = this.hash;
    
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function(){
    
            window.location.hash = hash;
          });
        } 
      });

    new WOW().init();
});