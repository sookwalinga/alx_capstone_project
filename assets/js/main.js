!(function ($) {
  'use strict'

  // Hero typed
  if ($('.typed').length) {
    var typed_strings = $('.typed').data('typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    })
  }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .scrollto', function (e) {
    if (
      location.pathname.replace(/^\//, '') ==
        this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      e.preventDefault()
      var target = $(this.hash)
      if (target.length) {
        var scrollto = target.offset().top

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

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function () {
    if (window.location.hash) {
      var initial_nav = window.location.hash
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top
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
    var container = $('.mobile-nav-toggle')
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active')
        $('.mobile-nav-toggle i').toggleClass(
          'icofont-navigation-menu icofont-close'
        )
      }
    }
  })

  // Navigation active state on scroll
  var nav_sections = $('section')
  var main_nav = $('.nav-menu, .mobile-nav')

  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop() + 200

    nav_sections.each(function () {
      var top = $(this).offset().top,
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

  // Back to top button
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

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000,
  })

  // Skills section
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

  // Porfolio isotope and filter
  $(window).on('load', function () {
    var portfolioIsotope = $('.portfolio-container').isotope({
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

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function () {
      $('.venobox').venobox()
    })
  })

  // Testimonials carousel (uses the Owl Carousel library)
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

  // Portfolio details carousel
  $('.portfolio-details-carousel').owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1,
  })

  // Init AOS
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

  var monthNames = [
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
  var d = new Date()
  var month = monthNames[d.getMonth()]
  var year = d.getFullYear()

  window.onload = function () {
    document.getElementById('currentMonth').innerHTML = month
    document.getElementById('currentYear').innerHTML = year
  }
})(jQuery)

// Contact Form
// Validation.
var validate = function (e) {
  var fields = document.querySelectorAll(
    '.form-container textarea, .form-container input[type="text"]'
  )
  var regEx
  var removeSpan
  var par
  var check = false
  var val
  var errArr = []

  for (var i = 0; i < fields.length; i++) {
    if (fields[i].value === '') {
      if (fields[i].nextElementSibling.classList.contains('error')) {
        removeSpan = fields[i].nextElementSibling
        par = fields[i].parentNode
        par.removeChild(removeSpan)
        fields[i].nextElementSibling.innerHTML =
          fields[i].placeholder + ' is required'
        fields[i].style.boxShadow = '0 0 2px 1px #cc0001'
        check = false
        errArr.push(fields[i])
      }
      fields[i].nextElementSibling.innerHTML =
        fields[i].placeholder + ' is required'
      fields[i].style.boxShadow = '0 0 2px 1px #cc0001'
      check = false
      errArr.push(fields[i])
    } else {
      // check if message and name values contain valid characters.
      if (fields[i].id !== 'email') {
        val = isValidChar(fields[i])
        if (val === false) {
          fields[i].nextElementSibling.innerHTML = 'Invalid inputs'
          fields[i].style.boxShadow = '0 0 2px 1px #cc0001'
          check = false
          errArr.push(fields[i])
        } else {
          fields[i].nextElementSibling.innerHTML = ''
          fields[i].style.boxShadow = 'none'
          check = true
        }
      }

      if (fields[i].id === 'email') {
        val = isValidEmail(fields[i])
        if (val === false) {
          fields[i].nextElementSibling.innerHTML =
            'Please enter a valid email address.'
          fields[i].style.boxShadow = '0 0 2px 1px #cc0001'
          check = false
          errArr.push(fields[i])
        } else {
          fields[i].nextElementSibling.innerHTML = ''
          fields[i].style.boxShadow = 'none'
          check = true
        }
      }
    }
  }

  if (check === false) {
    var count = 0
    var toErr = setInterval(function () {
      var e = errArr[0].offsetTop + -25
      var pos = Math.abs(e)
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
    var email = e.value
    if (!regEx.test(email)) {
      return false
    }
  }

  function isValidChar(e) {
    regEx = /^[a-zA-Z@#$%!?^&*()_+\-=\[\]{};':"\\|,.\/? ]*$/
    var value = e.value
    if (!regEx.test(value)) {
      return false
    }
  }
}

// Send email
function submitForm(event) {
  event.preventDefault()

  // Get form data
  const name = document.forms['contactForm']['name'].value
  const email = document.forms['contactForm']['email'].value
  const subject = document.forms['contactForm']['subject'].value

  // Validate the data (you can add more validation as needed)
  if (name === '' || email === '' || subject === '') {
    alert('Please fill in all required fields.')
    return
  }

  // Construct the data to send to the server
  const data = {
    name: name,
    email: email,
    subject: subject,
  }

  // Send the data to the server (you need a server-side script to handle this)
  fetch('server_script.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then((message) => {
      alert(message)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
