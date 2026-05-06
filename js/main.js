/**
 * Personal Homepage — Main JavaScript
 * Navigation, blog listing, scroll effects
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
      excerpt: '系统地梳理半舵半全向底盘的核心控制链路：速度正解算、卡尔曼滤波逆向观测、Moore-Penrose广义逆力分配、零空间打滑补偿、重心偏移力矩平衡与功率控制。',
      url: 'posts/chassis-control.html',
      tags: ['RoboMaster', '嵌入式', '控制']
    }
  ];

  // ============================================================
  // Navigation
  // ============================================================
  const nav = document.getElementById('nav');
  const navLinks = document.getElementById('navLinks');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');

  // Scroll effect on nav
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

  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  // Close mobile menu on link click
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
      const top = section.offsetTop - 100;
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

  let navScrollTicking = false;
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
    latestPosts.forEach(function (post) {
      const card = document.createElement('a');
      card.className = 'blog-card';
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
      blogPosts.forEach(function (post) {
        const item = document.createElement('article');
        item.className = 'blog-list-item';
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
  // Scroll reveal animation
  // ============================================================
  const revealElements = document.querySelectorAll(
    '.about-card, .edu-card, .timeline-item, .award-category, .skill-card, .english-card, .blog-card, .blog-list-item'
  );

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
          // Stagger the animations slightly
          setTimeout(function () {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index % 3 * 60);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
  );

  revealElements.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });

  // Initial trigger for elements already in view
  setTimeout(function () {
    revealElements.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }, 200);

})();
