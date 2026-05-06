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
      date: '2026-05-06',
      excerpt: 'A systematic treatment of the semi-steering, semi-omni chassis control pipeline: forward kinematics, Kalman-filter velocity observation, Moore-Penrose pseudoinverse force distribution, center-of-gravity normal-force estimation, ternary search optimization, and power control.',
      url: 'posts/chassis-control.html',
      tags: ['RoboMaster', 'Embedded', 'Control']
    }
  ];

  // ============================================================
  // Inject global elements: cursor glow + back-to-top
  // ============================================================
  // Cursor glow
  var glow = document.createElement('div');
  glow.className = 'cursor-glow';
  glow.id = 'cursorGlow';
  glow.style.opacity = '0';
  document.body.prepend(glow);

  // Back to top
  var btt = document.createElement('button');
  btt.className = 'back-to-top';
  btt.id = 'backToTop';
  btt.setAttribute('aria-label', 'Back to top');
  btt.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  btt.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.body.appendChild(btt);

  // ============================================================
  // Cursor glow tracking
  // ============================================================
  var glowTimeout;
  document.addEventListener('mousemove', function (e) {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    glow.style.opacity = '1';
    clearTimeout(glowTimeout);
    glowTimeout = setTimeout(function () {
      glow.style.opacity = '0';
    }, 2000);
  });

  // ============================================================
  // Back to top visibility
  // ============================================================
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      btt.classList.add('visible');
    } else {
      btt.classList.remove('visible');
    }
  });

  // ============================================================
  // 3D card tilt effect
  // ============================================================
  document.addEventListener('mouseover', function (e) {
    var card = e.target.closest('.blog-card, .link-card, .award-category, .skill-card, .edu-card, .english-card');
    if (!card || window.innerWidth < 769) return;

    card.addEventListener('mousemove', handleTilt);
    card.addEventListener('mouseleave', removeTilt);
  });

  function handleTilt(e) {
    var card = e.currentTarget;
    var rect = card.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var centerX = rect.width / 2;
    var centerY = rect.height / 2;
    var rotateX = (y - centerY) / centerY * -4;
    var rotateY = (x - centerX) / centerX * 4;

    card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
    card.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease';
    card.style.boxShadow = '0 16px 40px rgba(0,0,0,0.1)';
  }

  function removeTilt(e) {
    var card = e.currentTarget;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    card.style.transition = 'transform 0.4s ease, box-shadow 0.3s ease';
    card.style.boxShadow = '';
    card.removeEventListener('mousemove', handleTilt);
    card.removeEventListener('mouseleave', removeTilt);
  }

  // ============================================================
  // Navigation
  // ============================================================
  var nav = document.getElementById('nav');
  var navLinks = document.getElementById('navLinks');
  var mobileMenuBtn = document.getElementById('mobileMenuBtn');

  var scrollTicking = false;
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
  // Blog preview on homepage
  // ============================================================
  var blogPreview = document.getElementById('blogPreview');
  if (blogPreview && blogPosts.length > 0) {
    var latestPosts = blogPosts.slice(0, 2);
    latestPosts.forEach(function (post, i) {
      var card = document.createElement('a');
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
  var blogList = document.getElementById('blogList');
  var blogEmpty = document.getElementById('blogEmpty');

  if (blogList) {
    if (blogPosts.length > 0) {
      blogPosts.forEach(function (post, i) {
        var item = document.createElement('article');
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
  var revealObserver = new IntersectionObserver(
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

  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    revealObserver.observe(el);
  });

  var resumeReveal = document.querySelectorAll(
    '.edu-card, .timeline-item, .award-category, .skill-card, .english-card'
  );
  resumeReveal.forEach(function (el, i) {
    if (!el.hasAttribute('data-reveal')) {
      el.setAttribute('data-reveal', '');
      el.style.transitionDelay = (i % 3 * 0.06) + 's';
      revealObserver.observe(el);
    }
  });

  document.querySelectorAll('.link-card:not([data-reveal])').forEach(function (el, i) {
    el.setAttribute('data-reveal', '');
    el.style.transitionDelay = (i * 0.08) + 's';
    revealObserver.observe(el);
  });

  document.querySelectorAll('.skills-tags-hero:not([data-reveal])').forEach(function (el) {
    el.setAttribute('data-reveal', '');
    revealObserver.observe(el);
  });

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
  var heroText = document.querySelector('.hero-text');
  if (heroText) {
    setTimeout(function () {
      heroText.classList.add('hero-revealed');
    }, 80);
  }

  // ============================================================
  // Hero parallax: dot-grid follows mouse
  // ============================================================
  var hero = document.querySelector('.hero');
  if (hero && window.matchMedia('(min-width: 769px)').matches) {
    hero.addEventListener('mousemove', function (e) {
      var mx = (e.clientX / window.innerWidth - 0.5) * 10;
      var my = (e.clientY / window.innerHeight - 0.5) * 10;
      hero.style.setProperty('--mx', mx + 'px');
      hero.style.setProperty('--my', my + 'px');
    });
  }

})();
