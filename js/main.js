/**
 * Personal Homepage — Main JavaScript
 * Navigation, blog listing, scroll effects, animations
 */

(function () {
  'use strict';

  // ============================================================
  // Blog post registry — add new posts here
  // ============================================================
  const blogPosts = [
    {
      title: 'Semi-Steering Semi-Omni Chassis Control: From Velocity Decomposition to Torque Distribution',
      date: '2025-01-15',
      excerpt: 'A systematic treatment of the semi-steering, semi-omni chassis control pipeline: forward kinematics, Kalman-filter velocity observation, Moore-Penrose pseudoinverse force distribution, center-of-gravity normal-force estimation, ternary search optimization, and power control.',
      url: 'posts/chassis-control.html',
      tags: ['RoboMaster', 'Embedded', 'Control']
    }
  ];

  // ============================================================
  // Navigation
  // ============================================================
  const nav = document.getElementById('nav');
  const navLinks = document.getElementById('navLinks');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');

  let scrollTicking = false;
  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      requestAnimationFrame(function () {
        if (window.scrollY > 60) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  // ============================================================
  // Active nav link based on scroll position
  // ============================================================
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = navLinks ? navLinks.querySelectorAll('a[href^="#"]') : [];
    if (navAnchors.length === 0) return;

    let currentSection = '';
    sections.forEach(function (section) {
      var top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        currentSection = section.getAttribute('id');
      }
    });

    navAnchors.forEach(function (a) {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + currentSection) {
        a.classList.add('active');
      }
    });
  }

  var navScrollTicking = false;
  window.addEventListener('scroll', function () {
    if (!navScrollTicking) {
      requestAnimationFrame(function () {
        updateActiveNavLink();
        navScrollTicking = false;
      });
      navScrollTicking = true;
    }
  });

  // ============================================================
  // Blog preview on homepage
  // ============================================================
  const blogPreview = document.getElementById('blogPreview');
  if (blogPreview && blogPosts.length > 0) {
    const latestPosts = blogPosts.slice(0, 2);
    latestPosts.forEach(function (post, i) {
      const card = document.createElement('a');
      card.className = 'blog-card';
      card.setAttribute('data-reveal', '');
      card.style.transitionDelay = (i * 0.1) + 's';
      card.href = 'blog/' + post.url;
      card.innerHTML =
        '<span class="blog-card-date">' + post.date + ' · ' + post.tags.join(', ') + '</span>' +
        '<h3>' + post.title + '</h3>' +
        '<p>' + post.excerpt + '</p>' +
        '<span class="read-more">Read more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>';
      blogPreview.appendChild(card);
    });
  }

  // ============================================================
  // Blog list page
  // ============================================================
  const blogList = document.getElementById('blogList');
  const blogEmpty = document.getElementById('blogEmpty');

  if (blogList) {
    if (blogPosts.length > 0) {
      blogPosts.forEach(function (post, i) {
        const item = document.createElement('article');
        item.className = 'blog-list-item';
        item.setAttribute('data-reveal', '');
        item.style.transitionDelay = (i * 0.08) + 's';
        item.innerHTML =
          '<span class="blog-list-date">' + post.date + ' · ' + post.tags.join(', ') + '</span>' +
          '<h2><a href="' + post.url + '">' + post.title + '</a></h2>' +
          '<p class="blog-list-excerpt">' + post.excerpt + '</p>';
        blogList.appendChild(item);
      });
    } else if (blogEmpty) {
      blogList.style.display = 'none';
      blogEmpty.style.display = 'block';
    }
  }

  // ============================================================
  // Scroll reveal animation (data-reveal)
  // ============================================================
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -20px 0px' }
  );

  // Observe static elements with data-reveal
  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    revealObserver.observe(el);
  });

  // Also observe elements without data-reveal that should animate:
  // sections on resume page
  var resumeReveal = document.querySelectorAll(
    '.edu-card, .timeline-item, .award-category, .skill-card, .english-card'
  );
  resumeReveal.forEach(function (el, i) {
    el.setAttribute('data-reveal', '');
    el.style.transitionDelay = (i % 3 * 0.06) + 's';
    revealObserver.observe(el);
  });

  // Link cards (if any on the page without data-reveal)
  document.querySelectorAll('.link-card:not([data-reveal])').forEach(function (el, i) {
    el.setAttribute('data-reveal', '');
    el.style.transitionDelay = (i * 0.08) + 's';
    revealObserver.observe(el);
  });

  // Skills tags hero
  document.querySelectorAll('.skills-tags-hero:not([data-reveal])').forEach(function (el) {
    el.setAttribute('data-reveal', '');
    revealObserver.observe(el);
  });

  // Initial trigger for elements already in view
  setTimeout(function () {
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('revealed');
      }
    });
  }, 150);

  // ============================================================
  // Hero text stagger reveal
  // ============================================================
  const heroText = document.querySelector('.hero-text');
  if (heroText) {
    // Reveal immediately on page load
    setTimeout(function () {
      heroText.classList.add('hero-revealed');
    }, 80);
  }

  // ============================================================
  // Hero parallax: dot-grid follows mouse
  // ============================================================
  const hero = document.querySelector('.hero');
  if (hero && window.matchMedia('(min-width: 769px)').matches) {
    hero.addEventListener('mousemove', function (e) {
      var x = (e.clientX / window.innerWidth - 0.5) * 10;
      var y = (e.clientY / window.innerHeight - 0.5) * 10;
      // Move the ::after (dot-grid) via CSS custom property
      hero.style.setProperty('--mx', x + 'px');
      hero.style.setProperty('--my', y + 'px');
    });
  }

})();
