/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

const chatHead = document.getElementById('chat-head');
const chatBox = document.getElementById('chat-box');
const closeChat = document.getElementById('close-chat');
const sendMessage = document.getElementById('send-message');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const categorySelect = document.getElementById('category-select');

// Toggle chat box
chatHead.addEventListener('click', () => {
  chatBox.style.display = chatBox.style.display === 'flex' ? 'none' : 'flex';
});

closeChat.addEventListener('click', () => {
  chatBox.style.display = 'none';
});

// Send message and get AI reply
sendMessage.addEventListener('click', () => {
  const message = chatInput.value.trim();
  if (message) {
    displayUserMessage(message);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
    setTimeout(() => {
      displayAIResponse(message);
    }, 1000); // Simulate AI response delay
  }
});

// Display user message
function displayUserMessage(message) {
  const messageElem = document.createElement('div');
  messageElem.textContent = message;
  messageElem.style.margin = '5px 0';
  messageElem.style.padding = '10px';
  messageElem.style.backgroundColor = '#0078d7';
  messageElem.style.color = 'white';
  messageElem.style.borderRadius = '5px';
  messageElem.style.alignSelf = 'flex-end';
  chatMessages.appendChild(messageElem);
}

// Display AI response
function displayAIResponse(userMessage) {
  const aiResponse = generateAIResponse(userMessage);
  const messageElem = document.createElement('div');
  messageElem.textContent = aiResponse;
  messageElem.style.margin = '5px 0';
  messageElem.style.padding = '10px';
  messageElem.style.backgroundColor = '#ddd';
  messageElem.style.color = 'black';
  messageElem.style.borderRadius = '5px';
  messageElem.style.alignSelf = 'flex-start';
  chatMessages.appendChild(messageElem);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Get selected category
function getSelectedCategory() {
  return categorySelect.value;
}

// Generate AI response based on user message and selected category
function generateAIResponse(userMessage) {
  const lowerCaseMessage = userMessage.toLowerCase();
  const selectedCategory = getSelectedCategory();

  // Responses for programming-related queries
  const programmingResponses = {
    'python': 'Python is a high-level programming language, known for its readability and ease of use.',
    'java': 'Java is a widely-used programming language for building enterprise-level applications.',
    'html': 'HTML is the standard markup language for creating web pages.',
    'css': 'CSS is used to style web pages.',
    'javascript': 'JavaScript is a scripting language used to create interactive effects on websites.',
    'sql': 'SQL stands for Structured Query Language, used for managing data in relational databases.',
  };

  // Responses for web design-related queries
  const webDesignResponses = {
    'web design': 'Web design is the process of creating websites with a focus on layout and functionality.',
    'html': 'HTML is the standard markup language for creating web pages.',
    'css': 'CSS is used to style web pages.',
    'responsive design': 'Responsive web design ensures that websites work on any device, big or small.',
  };

  // Responses for life-related queries
  const lifeResponses = {
    'life': 'Life is an amazing journey of growth, learning, and connection. Make the most of it!',
    'happiness': 'Happiness is the state of mind that comes from within, often through gratitude and positivity.',
    'success': 'Success is achieving goals, big or small, while staying true to your values.',
  };

  // Filter the response based on the selected category
  if (selectedCategory === 'programming') {
    for (let key in programmingResponses) {
      if (lowerCaseMessage.includes(key)) {
        return programmingResponses[key];
      }
    }
  } else if (selectedCategory === 'web-design') {
    for (let key in webDesignResponses) {
      if (lowerCaseMessage.includes(key)) {
        return webDesignResponses[key];
      }
    }
  } else if (selectedCategory === 'life') {
    for (let key in lifeResponses) {
      if (lowerCaseMessage.includes(key)) {
        return lifeResponses[key];
      }
    }
  }

  // Default response if no match is found
  return 'I’m not sure about that. Could you please provide more details?';
}

// Draggable chat head
chatHead.addEventListener('mousedown', (e) => {
  let shiftX = e.clientX - chatHead.getBoundingClientRect().left;
  let shiftY = e.clientY - chatHead.getBoundingClientRect().top;

  function moveAt(pageX, pageY) {
    chatHead.style.left = pageX - shiftX + 'px';
    chatHead.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener('mousemove', onMouseMove);

  chatHead.onmouseup = () => {
    document.removeEventListener('mousemove', onMouseMove);
    chatHead.onmouseup = null;
  };
});

chatHead.ondragstart = () => false;



