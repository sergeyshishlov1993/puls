//скрипт слайдер
$(document).ready(function(){
   $('.carousel__inner').slick({
      speed:1200,
      adaptiveHeight:false,
      prevArrow:`<button type="button" class="slick-prev"><img src="./img/four-scrin/slide/arrow-left.png"></button>`,
      nextArrow:`<button type="button" class="slick-next"><img src="./img/four-scrin/slide/arrow-right.png"></button>`,
      responsive: [ //адаптация при разрешение экрана меньше 991 появляються точки вместо стрел
          {
             breakpoint: 991,
             settings: {
               dots: true,
               arrows: false
            }
         }
      ]
   });  
   //скрипт табы
   $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.containers').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    }); 

   function toggleSlide (item) {
      $(item).each(function(i) {
         $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
         })
      })
   }
      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back');

      //MODAL
//скрипт для появлений модальных окон
      $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
      });
      $('.modal__close').on('click', function() {
         $('.overlay, #consultation ,#order , #thanks').fadeOut('slow')
      });
      
      $(`.button_mini`).each(function(i) {
         $(this).on(`click`, function() {
            $(`#order .modal__descr`).text($(`.catalog-item__subtitle`).eq(i).text());
            $(`.overlay, #order`).fadeIn(`slow`);
         })
      });
//скрипт для валидации модальных окон
      function valideForms(form){
         $(form).validate({
            rules:{
               name:"required",
               phone:"required",
               email: {
                  required: true,
                  email: true
               }
            },
            messages: {
               name: "Пожалуйства, введите свое имя",
               phone :"Пожалуйства, введите свой номер телефона",
               email: {
                 required: "Пожалуйства, введите свой email",
                 email: "Неправильно введен адрес email"
               }
             }
         });
      };
      valideForms(`#consultation-form`);
      valideForms(`#consultation form`); 
      valideForms(`#order form`);  
//скрипт для маски телефоной формы
      $('input[name=phone]').mask('+3(000)-000-0000');

      $('form').submit(function(e) {
         e.preventDefault();
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

     //Smooth scroll and pageup


     $(window).scroll(function () { 
      if ($(this).scrollTop() >1600) {
         $(`.pageup`).fadeIn();
      }else {
         $(`.pageup`).fadeOut();
      }
     });

     //скрипт для плавной прокрутки страницы вверх


     $("a").on('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        const hash = this.hash;
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 1400, function(){
          window.location.hash = hash;
        });
      } 
    });

    new WOW().init();

});