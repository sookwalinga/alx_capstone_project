// @ts-nocheck
!(function ($) {
  'use strict'

  //DOC: Hero typed
  if ($('.typed').length) {
    let typed_strings = $('.typed').data('typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    })
  }

  //DPC: Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .scrollto', function (e) {
    if (
      location.pathname.replace(/^\//, '') ==
        this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      e.preventDefault()
      let target = $(this.hash)
      if (target.length) {
        let scrollto = target.offset().top

        $('html, body').animate(
          {
            scrollTop: scrollto,
          },
          1500,
          'easeInOutExpo'
        )

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active')
          $(this).closest('li').addClass('active')
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active')
          $('.mobile-nav-toggle i').toggleClass(
            'icofont-navigation-menu icofont-close'
          )
        }
        return false
      }
    }
  })

  //DOC: Activate smooth scroll on page load with hash links in the url
  $(document).ready(function () {
    if (window.location.hash) {
      let initial_nav = window.location.hash
      if ($(initial_nav).length) {
        let scrollto = $(initial_nav).offset().top
        $('html, body').animate(
          {
            scrollTop: scrollto,
          },
          1500,
          'easeInOutExpo'
        )
      }
    }
  })

  $(document).on('click', '.mobile-nav-toggle', function (e) {
    $('body').toggleClass('mobile-nav-active')
    $('.mobile-nav-toggle i').toggleClass(
      'icofont-navigation-menu icofont-close'
    )
  })

  $(document).click(function (e) {
    let container = $('.mobile-nav-toggle')
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active')
        $('.mobile-nav-toggle i').toggleClass(
          'icofont-navigation-menu icofont-close'
        )
      }
    }
  })

  //DOC: Navigation active state on scroll
  let nav_sections = $('section')
  let main_nav = $('.nav-menu, .mobile-nav')

  $(window).on('scroll', function () {
    let cur_pos = $(this).scrollTop() + 200

    nav_sections.each(function () {
      let top = $(this).offset().top,
        bottom = top + $(this).outerHeight()

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active')
        }
        main_nav
          .find('a[href="#' + $(this).attr('id') + '"]')
          .parent('li')
          .addClass('active')
      }
      if (cur_pos < 300) {
        $('.nav-menu ul:first li:first').addClass('active')
      }
    })
  })

  //DOC: Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow')
    } else {
      $('.back-to-top').fadeOut('slow')
    }
  })

  $('.back-to-top').click(function () {
    $('html, body').animate(
      {
        scrollTop: 0,
      },
      1500,
      'easeInOutExpo'
    )
    return false
  })

  //DOC: Skills section
  $('.skills-content').waypoint(
    function () {
      $('.progress .progress-bar').each(function () {
        $(this).css('width', $(this).attr('aria-valuenow') + '%')
      })
    },
    {
      offset: '80%',
    }
  )

  //DOC: Porfolio isotope and filter
  $(window).on('load', function () {
    let portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows',
    })

    $('#portfolio-flters li').on('click', function () {
      $('#portfolio-flters li').removeClass('filter-active')
      $(this).addClass('filter-active')

      portfolioIsotope.isotope({
        filter: $(this).data('filter'),
      })
      aos_init()
    })

    //DOC: Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function () {
      $('.venobox').venobox()
    })
  })

  //DOC: Testimonials carousel (uses the Owl Carousel library)
  $('.testimonials-carousel').owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      900: {
        items: 3,
      },
    },
  })

  //DOC: Portfolio details carousel
  $('.portfolio-details-carousel').owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1,
  })

  //DOC: Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out-back',
      once: true,
    })
  }
  $(window).on('load', function () {
    aos_init()
  })

  // DOC: Copyright dynamic date
  let monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  let d = new Date()
  let month = monthNames[d.getMonth()]
  let year = d.getFullYear()

  window.onload = function () {
    document.getElementById('currentMonth').innerHTML = month
    document.getElementById('currentYear').innerHTML = year
  }
})(jQuery)

//DOC: Contact Form
// Validation.

let validate = function (e) {
  let fields = document.querySelectorAll(
    '.form-container textarea, .form-container input[type="text"]'
  )
  let regEx
  let removeSpan
  let par
  let check = false
  let val
  let errArr = []

  for (const element of fields) {
    if (element.value === '') {
      if (element.nextElementSibling.classList.contains('error')) {
        removeSpan = element.nextElementSibling
        par = element.parentNode
        par.removeChild(removeSpan)
        element.nextElementSibling.innerHTML =
          element.placeholder + ' is required'
        element.style.boxShadow = '0 0 2px 1px #cc0001'
        errArr.push(element)
      }
      element.nextElementSibling.innerHTML =
        element.placeholder + ' is required'
      element.style.boxShadow = '0 0 2px 1px #cc0001'
      check = false
      errArr.push(element)
    } else {
      // check if message and name values contain valid characters.
      if (element.id !== 'email') {
        val = isValidChar(element)
        if (val === false) {
          element.nextElementSibling.innerHTML = 'Invalid inputs'
          element.style.boxShadow = '0 0 2px 1px #cc0001'
          check = false
          errArr.push(element)
        } else {
          element.nextElementSibling.innerHTML = ''
          element.style.boxShadow = 'none'
          check = true
        }
      }

      if (element.id === 'email') {
        val = isValidEmail(element)
        if (val === false) {
          element.nextElementSibling.innerHTML =
            'Please enter a valid email address.'
          element.style.boxShadow = '0 0 2px 1px #cc0001'
          check = false
          errArr.push(element)
        } else {
          element.nextElementSibling.innerHTML = ''
          element.style.boxShadow = 'none'
          check = true
        }
      }
    }
  }

  if (check === false) {
    let count = 0
    let toErr = setInterval(function () {
      let e = errArr[0].offsetTop + -25
      let pos = Math.abs(e)
      if (count < pos) {
        count++
        window.scrollTo(0, count)
      } else {
        clearInterval(toErr)
      }
    }, 1)
  }

  return check

  // Helper functions.
  function isValidEmail(e) {
    regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let email = e.value
    if (!regEx.test(email)) {
      return false
    }
  }

  function isValidChar(e) {
    regEx = /^[a-zA-Z@#$%!?^&*()_+\-=\[\]{};':"\\|,.\/? ]*$/
    let value = e.value
    if (!regEx.test(value)) {
      return false
    }
  }
}

// DOC: Access form.
document.getElementById('contactForm').addEventListener('submit', function (e) {
  if (!validate(e)) {
    e.preventDefault()
  }
})
