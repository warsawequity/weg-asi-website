(function($){

  $(document).ready(function(){
    $('.slick').preslick().slick({touchThreshold:50});
    setTimeout('jQuery(window).trigger("scroll")',100);
  
    $("a[href^='#']").click(function(e) {
      e.preventDefault();
      var dest = '#'+$(this).attr('href').split('#')[1];
      if($(dest).length>0){
        $('html,body').animate({ scrollTop: $(dest).offset().top - 40 }, 500);
      }
      else window.location = $(this).attr('href');
    });

    if(window.location.hash) {
        $('html,body').animate({scrollTop: $(window.location.hash).offset().top - 114 }, 100);
        window.location.hash='';
    }  

    $('.au-boxes-value').click(function(){ $('.au-boxes-value-open').removeClass('au-boxes-value-open'); $(this).addClass('au-boxes-value-open'); });
    $('.au-boxes-value-content-close').click(function(){ $(this).closest('.au-boxes-value').removeClass('au-boxes-value-open'); return false; });    

    $('#main-nav .menu-spader').clone().addClass('d-lg-none').removeClass('menu-spader').find('ul').detach().end().prependTo( $('#main-nav .menu-spader ul') )
    $spader = $('#main-nav .menu-spader').removeClass('menu-spader').children('a');
    $spader.html('<span class="d-none d-lg-inline">'+($spader.text())+'</span><span class="d-lg-none">WEG</span>')

    $('#primary-menu a').click(function(e){ e.preventDefault(); document.location=$(this).attr('href'); return false; });
    $('#primary-menu>li').click(function(e){ if(e.target == this || $('#top-bar')[0]==e.target || $(this).hasClass('menu-open')) { $(this).toggleClass('menu-open'); return false; } });
    $('#top-bar').click(function(e){
      $(this).toggleClass('menu-open'); return false;
    });

    $(window).on('scroll resize',function(){
      $('.agenda-element').each(function(){
        bcr = $(this)[0].getBoundingClientRect();
        ID=$(this).attr('data-agenda-id');
        if( bcr.top<window.innerHeight/2 && bcr.bottom>window.innerHeight/2){
          $('#agenda-li-'+ID).addClass('agenda-li-active');
        }else{
          $('#agenda-li-'+ID).removeClass('agenda-li-active');
        }
        if( $('.agenda-li-active').length>0 ) {
          $('.agenda').addClass('agenda-moved');
          $('.agenda-preview').addClass('agenda-preview-moved');
        } else {
          $('.agenda').removeClass('agenda-moved')
          $('.agenda-preview').removeClass('agenda-preview-moved')
        }
      });

      if($('.agenda-container').length>0){
        $agenda_container = $('.agenda-container')[0].getBoundingClientRect();
        if( $agenda_container.bottom<window.innerHeight/3*2 )$('.agenda').fadeOut(300); else $('.agenda').css({'display':'flex'});

      }

    });   

    $('.pg-person').click(function(){
      $('.pg-person-next').removeClass('pg-person-next');
      $('.pg-person-active').removeClass('pg-person-active');
      $(this).addClass('pg-person-active');
      ID=$(this).attr('data-person-count');
      if( ID == $('.pg-person').length ) ID = 1; else ID++;
      $('[data-person-count="'+ID+'"').addClass('pg-person-next');
    });
    $('.pg-person-close').click(function(){
      $(this).closest('.pg-person').removeClass('pg-person-active');
      $('.pg-person-next').removeClass('pg-person-next');
      return false;
    });

  });

  $.fn.preslick = function() {
    this.on('init', function(slick){
      $(slick.currentTarget).prepend('<div class="custom-slick-counter"><span class="custom-slick-counter-current"></span> / <span class="custom-slick-counter-count"></span></div>');
    })
    .on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
      var slide_current = (currentSlide ? currentSlide : 0) + 1;
      var slide_count;
      if(slick.$slides){
        slide_count = slick.$slides.length; 
        if(slick.$slider.find('.slick-placeholder').length>0)slide_count--;
        slick.$slider.find('.custom-slick-counter-current').text( slide_current );
        slick.$slider.find('.custom-slick-counter-count').text( slide_count );
      } 
    })
    return this;
  };

  $(window).on('scroll resize',function(){
    $('.floating-header-container').each(function(){
      bcr = $(this)[0].getBoundingClientRect();
      if( bcr.top<window.innerHeight/5 && bcr.bottom>window.innerHeight/5 + 100) $(this).find('h1').addClass('floating-header-active'); else $(this).find('h1').removeClass('floating-header-active');
    });
    var body = document.body, html = document.documentElement;
    var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    if(window.scrollY==0)$('body').removeClass('body-scrolled'); else $('body').addClass('body-scrolled');
    if(height - window.scrollY - window.innerHeight>16)$('body').removeClass('body-finish'); else $('body').addClass('body-finish');
  });


  $('.sgta').each(function() {
    let text = $(this).text();
    let words = text.split(' ');
    this.innerHTML = '';
    ii=10; for(let word of words) {
      letters=word.split('');
      word_html='';
      for(let letter of letters) {
        word_html+='<span class="sgta-letter" style="transition-delay:'+(ii*40)+'ms">'+letter.replace('_','&nbsp;')+'</span>';
        ii++;
      }
      this.innerHTML += '<span class="sgta-word">' + word_html + '</span> ';
    }
  });

  $('.sgda').each(function() {
    let text = $(this).text();
    let words = text.split(' ');
    this.innerHTML = '';
    ii=0; for(let word of words) {
      letters=word.split('');
      word_html='';
      for(let letter of letters) {
        is_numeric = !isNaN(letter - parseInt(letter));
        word_html+='<span class="sgda-letter'+(is_numeric?' sgda-digit':'')+'" style="transition-delay:'+(ii*40)+'ms">'+letter+'</span>';
        ii++;
      }
      this.innerHTML += '<span class="sgda-word">' + word_html + '</span> ';
    }
  });

  $.fn.sgta_animate = function() {
      $(this).each(function(){
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        if( /*elementBottom > viewportTop &&*/ elementTop < viewportBottom ){
            $(this).addClass('sgxa-init');
        }

      });
  };

  $(window).on('resize scroll load', function() {
      $sgta_elements = $('.sgxa:not(.sgxa-init)');
      if( $sgta_elements.length>0) $sgta_elements.sgta_animate();
  });
  
})(jQuery);