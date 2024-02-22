/*
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * File: app.js
 * File Created: Monday, 19th February 2024 2:20:19 pm
 * Author: Nebula Studios (https://discord.nebulastudios.software)
 *             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * The modification of this file is prohibited without explicit permission from Nebula Studios.
 * Any unauthorized modification of this file will result in support being revoked.
 *             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Last Modified: Thursday, 22nd February 2024 4:40:00 pm
 * Modified By: MS Studios
 *             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * License: Creative Commons Attribution Non-commercial No-derivatives 4.0 International
 * License Abbreviation: CC BY-NC-ND 4.0
 * License URL: https://creativecommons.org/licenses/by-nc-nd/4.0/
 * Copyright 2023 - 2024, Nebula Studios
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

$(document).ready(function () {
	// Preloader

	gsap.to('#preloader', {
		duration: 1,
		opacity: 0,
		x: 100,
		delay: 1,
		display: 'none',
	});


	// Main content animation

	gsap.fromTo(
		'#core-title',
		{
			text: '',
		},
		{
			text: 'NS Core',
			duration: 1,
			delay: 1,
		}
	);

	gsap.fromTo(
		'#core-subtitle',
		{
			opacity: 0,
		},
		{
			opacity: 1,
			duration: 1,
			delay: 2,
		}
	);

	gsap.fromTo(
		'.features-grid-item *',
		{
			opacity: 0,
			y: 100,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.2,
			delay: 1,
			stagger: 0.1,
			ease: "back.out(1.7)",
		}
	);

	gsap.fromTo(
		'.card',
		{
			opacity: 0,
		},
		{
			opacity: 1,
			duration: 0.5,
			delay: 1,
			stagger: 0.2,
			ease: 'power2.out',
		}
	);

	// Smooth scroll
	$('a').on('click', function (event) {
		if (this.hash !== '') {
			event.preventDefault();

			var hash = this.hash;

			$('html, body').animate(
				{
					scrollTop: $(hash).offset().top,
				},
				800,
				function () {
					window.location.hash = hash;
				}
			);
		}
	});
});

