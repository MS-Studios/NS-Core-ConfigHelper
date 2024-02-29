/*
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * File: app.js
 * File Created: Monday, 19th February 2024 2:20:19 pm
 * Author: Nebula Studios (https://discord.nebulastudios.software)
 *             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * The modification of this file is prohibited without explicit permission from Nebula Studios.
 * Any unauthorized modification of this file will result in support being revoked.
 *             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Last Modified: Thursday, 29th February 2024 1:57:42 am
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
	// Random background quote
	bgRandomQuote();
	setInterval(bgRandomQuote, 5000);
	});


function showNotification(message, type, time) {

	$('.notification').remove();

	const bgTypes = {
		'success': 'bg-success shadow-success',
		'error': 'bg-danger shadow-danger',
		'warning': 'bg-warning shadow-warning',
		'info': 'bg-info shadow-info',
		'violet': 'bg-violet shadow-violet',
	};

	const textTypes = {
		'success': 'text-success',
		'error': 'text-danger',
		'warning': 'text-warning',
		'info': 'text-info',
		'violet': 'text-violet',
	};

	const iconTypes = {
		'success': 'ti-check',
		'error': 'ti-exclamation-circle',
		'warning': 'ti-alert-circle',
		'info': 'ti-info-circle',
		'violet': 'ti-check',
	};

	const notification = `
		<div class="notification">
			<div class="notification-content">
				<div class="notification-progress"></div>
				<i class="ti ti-alert-circle notification-icon"></i>
				<p class="notification-message toggle-note">This is a notification</p>
			</div>
		</div>
	`;

	$('.notification-container').append(notification);

	$('.notification').fadeIn(250);

	$('.notification-message').html(message.replace(/\n/g, '<br/>'));
	$('.notification-icon').addClass(iconTypes[type]).addClass(textTypes[type]);
	$('.notification-progress').addClass(bgTypes[type]);

	$('.notification-progress').animate({
		width: '0%'
	}, time, 'linear');

	setTimeout(() => {
		$('.notification').fadeOut(250);
	}, time);
}

function bgRandomQuote() {
	const quotes = [
			'Create a level system with customizable experience requirements',
			'Assign unique perks to each level to incentivize player progress',
			'Unlimited quests and achievements to keep players engaged',
			'Total control over the script and the ability to customize it to your liking',
			'Levels, perks, quests – the building blocks of your unique RP world',
			'Don\'t just play the game, design it',
		],

		randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

		gsap.to('.quote', {
			duration: 1,
			text: "⠀",
			onComplete: () => {
				gsap.to('.quote', {
					text: {
						value: randomQuote,
						duration: 1,
					},
					duration: 1,
				});
			},
		});
}
