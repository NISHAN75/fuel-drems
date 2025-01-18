(function ($) {
	$(document).ready(function () {

		$('.btn-wrapper').each(function () {
			// Get dimensions of the button
			const $btn = $(this);
			const width = $btn.outerWidth();
			const height = $btn.outerHeight();

			const dasharrayPart1 = 150;
			const dasharrayPart2 = 2 * (width + height) + dasharrayPart1;
			const strokeDasharray = `${dasharrayPart1} ${dasharrayPart2}`;
			const initialOffset = dasharrayPart1;
			const hoverOffset = -dasharrayPart2;

			// Target SVG and its properties
			const $svg = $btn.find('.dynamic-svg');
			const $bgLine = $svg.find('.bg-line');
			const $hlLine = $svg.find('.hl-line');

			// Calculate and set polyline points
			const points = `${width - 1},1 ${width - 1},${height - 1} 1,${height - 1} 1,1 ${width - 1},1`;
			$svg.attr({
				width: `${width}px`,
				height: `${height}px`,
				viewBox: `0 0 ${width} ${height}`,
			});

			$bgLine.attr('points', points);
			$hlLine.attr('points', points);

			// Set initial SVG stroke properties
			$svg.css({
				strokeDasharray: strokeDasharray,
				strokeDashoffset: initialOffset,
				transition: 'stroke-dashoffset 0.6s linear',
			});

			// Hover effects
			$btn.hover(
				function () {
					$svg.css('stroke-dashoffset', hoverOffset); // On hover: offset reduces dynamically
				},
				function () {
					$svg.css('stroke-dashoffset', initialOffset); // On hover out: reset to initial
				}
			);
		});





		gsap.registerPlugin(SplitText, ScrollTrigger);
		let textWrappers = $(".animation-text");

		// Split text into lines and letters
		let mainTitleSplit = new SplitText(textWrappers, {
			type: "lines,chars",
			linesClass: "line-wrapper",
			charsClass: "letter",
			tag: "span"
		});

		// Animate each line's letters
		$(".line-wrapper").each(function () {
			let letters = $(this).find(".letter");
			gsap.from(letters, {
				scrollTrigger: {
					trigger: this,
					start: "top bottom",
					end: "bottom top",
					toggleActions: "play none none reverse",
				},
				y: 50,
				opacity: 0,
				duration: 0.5,
				stagger: 0.04,
				ease: "power3.inOut"
			});
		});
		// animation line
		// rotate  logo
		function aboutCardRotate() {
			if ($(window).width() > 991) {
				gsap.to(".rotate-text", {
					scrollTrigger: {
						trigger: "body",
						start: "top top",
						end: "bottom bottom",
						scrub: true,
					},
					rotation: 720,
					ease: "none",
					transformOrigin: "center center",
				});
			}
		}
		aboutCardRotate();

		function reverseCardRotate() {
			if ($(window).width() > 991) {
				gsap.to(".rotate-text", {
					scrollTrigger: {
						trigger: "body",
						start: "top 50%",
						end: "bottom top",
						scrub: true,
					},
					rotation: 360,
					ease: "power1.out",
					transformOrigin: "center center",
					duration: 1
				});
			}
		}
		reverseCardRotate();

		// Magnific popup
		$('.trigger-popup').magnificPopup({
			type: 'iframe',
			iframe: {
				markup: '<div class="mfp-iframe-scaler">' +
					'<div class="mfp-close"></div>' +
					'<iframe class="mfp-iframe" frameborder="0" allowfullscreen allow="autoplay *; fullscreen *"></iframe>' +
					'</div>',
				patterns: {
					youtube: {
						index: 'youtube.com/',
						id: function (url) {
							var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
							if (!m || !m[1]) return null;
							return m[1];
						},
						src: '//www.youtube.com/embed/%id%?autoplay=1&iframe=true'
					},
					vimeo: {
						index: 'vimeo.com/',
						id: function (url) {
							var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
							if (!m || !m[5]) return null;
							return m[5];
						},
						src: '//player.vimeo.com/video/%id%?autoplay=1'
					}
				}
			},
		});
		// portfolio slider
		let portfolioSlider = new Swiper(".portfolio-slider", {
			slidesPerView: 7,
			spaceBetween: 40,
			speed: 6000,
			keyboard: {
				enabled: true,
			},
			freeMode: true, // Allow smooth dragging
			breakpoints: {
				0: {
					slidesPerView: 3,
					spaceBetween: 32,
				},
				480: {
					slidesPerView: 4,
					spaceBetween: 32,
				},
				768: {
					slidesPerView: 5,
					spaceBetween: 32,
				},
				1200: {
					slidesPerView: 7,
					spaceBetween: 40,
				},
			},
			scrollbar: {
				el: ".swiper-scrollbar",
				draggable: true,
			},
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
		});
		// Custom mousemove behavior using jQuery
		const sliderContainer = $(".portfolio-slider");
		const wrapperEl = $(portfolioSlider.wrapperEl);

		sliderContainer.on("mousemove", function (e) {
			const sliderRect = sliderContainer[0].getBoundingClientRect();
			const mouseX = e.clientX - sliderRect.left; // Mouse position relative to slider
			const percentage = mouseX / sliderRect.width; // Get percentage of mouse position in container

			// Move the slider based on mouse position
			const maxTranslate = wrapperEl[0].scrollWidth - sliderRect.width; // Max scrollable area
			const translateX = maxTranslate * percentage;

			// Set the translate manually using Swiper's method
			portfolioSlider.setTranslate(-translateX);
		});


		// Initialize Swiper
		var testimonialSlider = new Swiper(".testimonial-slider", {
			cssMode: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true, // Allows bullets to be clickable
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			loop: true,
			mousewheel: true,
			keyboard: true,
		});
		// single team testimonial slider
		var singleTeamTestimonialSlider = new Swiper(".single-team-testimonial-slider", {
			cssMode: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true, 
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			loop: true,
			mousewheel: true,
			keyboard: true,
			on: {
				slideChange: function () {
					var activeIndex = this.realIndex;
					var $imgItems = $(".team-testimonial-img-item");
					$imgItems.removeClass("active");
					$imgItems.eq(activeIndex).addClass("active");
				},
			},
		});
		$(".team-testimonial-img-item").eq(singleTeamTestimonialSlider.realIndex).addClass("active");
		// single team testimonial slider 2
		var singleTeamTestimonialSlider2 = new Swiper(".single-team-testimonial-slider-2", {
			cssMode: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true, 
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			loop: true,
			mousewheel: true,
			keyboard: true,
			on: {
				slideChange: function () {
					var activeIndex = this.realIndex;
					var $imgItems = $(".team-testimonial-img-item");
					$imgItems.removeClass("active");
					$imgItems.eq(activeIndex).addClass("active");
				},
			},
		});
		$(".team-testimonial-img-item").eq(singleTeamTestimonialSlider.realIndex).addClass("active");

		// brand slider 
		let brandSlider = new Swiper(".tp-brand-slider", {
			slidesPerView: "auto",
			loop: true,
			spaceBetween: 56,
			allowTouchMove: false,
			speed: 4000,
			autoplay: {
				delay: 1,
				disableOnInteraction: true,
			}
		});

		// specific news img slider
		var specificNewsImgSlider = new Swiper(".specific-news-img-slider", {
			slidesPerView: 1,
			spaceBetween: 40,
		});
		var specificNewsContentSlider = new Swiper(".specific-news-content-slider", {
			slidesPerView: 1,
			spaceBetween: 40,
			pagination: {
			  el: ".swiper-pagination",
			  clickable: true,
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			navigation: {
			  nextEl: ".swiper-button-next",
			  prevEl: ".swiper-button-prev",
			},
			on: {
                slideChange: function () {
                    specificNewsImgSlider.slideTo(this.activeIndex);
                },
            },
		  });

		const $myModal = $('#myModal');
		const $myInput = $('#myInput');

		$myModal.on('shown.bs.modal', function () {
			$myInput.focus();
		});
		// mobile menu
		const $mobileMenu = $(".mobile-menu");
		$mobileMenu.find("ul > li > a").on("click", function (e) {
			const $menuItem = $(this).closest("li");

			// Remove 'active' class from all other menu items
			$mobileMenu.find("ul > li").removeClass("active");
			$menuItem.addClass("active");
			const $submenu = $(this).siblings(".sub-menu");

			if ($submenu.is(":visible")) {
				$submenu.slideUp();
				$menuItem.removeClass("active");
			} else {
				// Slide down if not visible
				$(".sub-menu").slideUp();
				$(".menu-link > a").removeClass("active");
				$submenu.stop(true, true).slideDown();
			}
			// Prevent default behavior for menu-link class items
			if ($menuItem.hasClass("menu-link")) {
				e.preventDefault();
			}
		});
		const $footerMenu = $(".main-footer-wrapper");
		$footerMenu.find(".footer-title").on("click", function (e) {
			const $footerItem = $(this).closest(".footer-item");

			// Remove 'active' class from all other menu items
			$footerMenu.find(".footer-item").removeClass("active");
			$footerItem.addClass("active");
			const $footerSubMenu = $(this).siblings(".footer-sub-menu");
			if ($footerSubMenu.is(":visible")) {
				$footerSubMenu.slideUp();
				$footerItem.removeClass("active");
			} else {
				// Slide down if not visible
				$(".footer-sub-menu").slideUp();
				$footerSubMenu.stop(true, true).slideDown();
			}
			// Prevent default behavior for menu-link class items
			if ($footerItem.hasClass(".footer-menu")) {
				e.preventDefault();
			}
		});

		// mobile menu
		// card border animation
		function initExpertiseCardEffect() {
			if ($(window).width() >= 992) {
				$('.card-gradient').on('mouseenter', function (e) {
					const card = $(this);
					const offset = card.offset();
					const height = card.outerHeight();
					const y = e.pageY - offset.top;
					const yPercent = (y / height) * 100;
					card.css({
						background: `radial-gradient(circle at 50% ${yPercent}%, rgba(255,197,136,1) 0%, rgba(255,197,136,0) 100%)`
					});
				});

				$('.card-gradient').on('mousemove', function (e) {
					const card = $(this);
					const offset = card.offset();
					const height = card.outerHeight();
					const y = e.pageY - offset.top;
					const yPercent = (y / height) * 100;
					card.css({
						background: `radial-gradient(circle at 50% ${yPercent}%, rgba(255,197,136,1) 0%, rgba(255,197,136,0) 100%)`
					});
				});

				$('.card-gradient').on('mouseleave', function () {
					$(this).css({
						background: 'transparent'
					});
				});
			}
		}
		initExpertiseCardEffect();
		$(window).on('resize', function () {
			initExpertiseCardEffect();
		});
		// card border animation

		// animation div

		// Select all elements with the class 'animation-div'
		const animationDivs = document.querySelectorAll('.animation-div');

		// Set initial styles for each animation div
		animationDivs.forEach(div => {
			gsap.set(div, {
				opacity: 0,
				filter: 'blur(6px)',
				transform: 'translateY(6px)',
				willChange: 'transform, opacity, filter'
			});

			// Animate the divs when they come into view
			gsap.to(div, {
				opacity: 1,
				filter: 'blur(0px)',
				transform: 'translateY(0px)',
				willChange: 'auto',
				duration: 1,
				scrollTrigger: {
					trigger: div,
					start: 'top bottom',
					end: 'bottom top',
				}
			});
		});
		// animation div

		// OverlayScrollbars
		const {
			OverlayScrollbars,
			ClickScrollPlugin
		} = OverlayScrollbarsGlobal;
		// Initialize the ClickScrollPlugin
		OverlayScrollbars.plugin(ClickScrollPlugin);
		$("body").each(function () {
			OverlayScrollbars(this, {
				scrollbars: {
					clickScroll: true,
					autoHide: "leave",
					dragScrolling: true,
					clickScrolling: true,
				},
				scrollBehavior: 'smooth',
			});
		});
		// lenis
		$(".back-btn").on("click", function (e) {
			e.preventDefault();
			lenis.scrollTo(0)
		});
		// Initialize a new Lenis instance for smooth scrolling
		const lenis = new Lenis();

		// Listen for the 'scroll' event and log the event data to the console
		// lenis.on('scroll', (e) => {
		//     console.log(e);
		// });

		// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
		lenis.on('scroll', ScrollTrigger.update);

		// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
		// This ensures Lenis's smooth scroll animation updates on each GSAP tick
		gsap.ticker.add((time) => {
			lenis.raf(time * 1000); // Convert time from seconds to milliseconds
		});

		// Disable lag smoothing in GSAP to prevent any delay in scroll animations
		gsap.ticker.lagSmoothing(0);
		// lenis



	});
})(jQuery);