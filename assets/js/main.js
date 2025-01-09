(function ($) {
    $(document).ready(function () {
       

 
        // animation
        gsap.registerPlugin(SplitText, ScrollTrigger);
        let textWrappers = $(".animation-text");

        // Split text into lines and letters
        let mainTitleSplit = new SplitText(textWrappers, {
            type: "lines,chars",
            linesClass: "line-wrapper overflow-hidden",
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
        gsap.utils.toArray(".animation-line").forEach((element) => {
            gsap.fromTo(
                element,
                {
                    y: 100,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 90%",
                        toggleActions: "play none none reverse",

                    },
                }
            );
        });
        // animation

  
        // portfolio slider
        let portfolioSlider = new Swiper(".portfolio-slider", {
            slidesPerView: 7,
            spaceBetween: 40,
            speed: 6000,
            keyboard: {
                enabled: true,
            },
            // Responsive breakpoints
            breakpoints: {
                // when window width is >= 640px
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
              },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },  
        });
        // testimonial slider
        var testimonialSlider = new Swiper(".testimonial-slider", {
            cssMode: true,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            pagination: {
              el: ".swiper-pagination",
            },
            mousewheel: true,
            keyboard: true,
        });
        // brand slider 
        let brandSlider = new Swiper(".tp-brand-slider", {
            slidesPerView: "auto",
            loop:true,
            spaceBetween: 56,
            allowTouchMove:false,
            speed:4000,
            autoplay:{
            delay:1,
            disableOnInteraction:true,
            }
        });

        let lastMouseX = 0;

        $(".portfolio-slider").on('mousemove', (event) => {
        const currentMouseX = event.clientX;

        if (currentMouseX > lastMouseX + 10) { 
            portfolioSlider.slideNext();
        } else if (currentMouseX < lastMouseX - 10) {
            portfolioSlider.slidePrev();
        }
        lastMouseX = currentMouseX;
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
        $(".back-btn").on("click",function(e){e.preventDefault();lenis.scrollTo(0)});
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