/*
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * File: app.js
 * File Created: Monday, 19th February 2024 2:20:19 pm
 * Author: Nebula Studios (https://discord.nebulastudios.software)
 *             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * The modification of this file is prohibited without explicit permission from Nebula Studios.
 * Any unauthorized modification of this file will result in support being revoked.
 *             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Last Modified: Sunday, 25th February 2024 4:31:09 pm
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

	// gsap.fromTo(
	// 	'.features-grid-item *',
	// 	{
	// 		opacity: 0,
	// 		y: 100,
	// 	},
	// 	{
	// 		opacity: 1,
	// 		y: 0,
	// 		duration: 0.2,
	// 		delay: 1,
	// 		stagger: 0.1,
	// 		ease: "back.out(1.7)",
	// 	}
	// );

	// gsap.fromTo(
	// 	'.card',
	// 	{
	// 		opacity: 0,
	// 	},
	// 	{
	// 		opacity: 1,
	// 		duration: 0.5,
	// 		delay: 1,
	// 		stagger: 0.2,
	// 		ease: 'power2.out',
	// 	}
	// );

	// Ottieni tutti i link della navbar
	let navLinks = $('.nav-link');
	// Nascondi tutte le schede
	let tabs = $('.card-body-item');
	tabs.hide();
	// Aggiungi un event listener per ogni link
	navLinks.on('click', function(e) {
		// Prevenire il comportamento di default del link
		e.preventDefault();

		// Rimuovi la classe 'active' da tutti i link
		navLinks.removeClass('active');

		// Aggiungi la classe 'active' al link cliccato
		$(this).addClass('active');

		tabs.hide();

		// Mostra la scheda corrispondente al link cliccato
		let targetTab = $(`.card-body-item[data-tab="${$(this).attr('href').substring(1)}"]`);
		if (targetTab) targetTab.show();
	});

	// Mostra la prima scheda all'avvio
	$('.card-body-item').first().show();

	// Ottieni tutti i bottoni dell'accordion
	let accordionButtons = $('.accordion-button');

	// Aggiungi un event listener per ogni bottone
	accordionButtons.on('click', function() {
		// Trova l'elemento collapse corrispondente
		let collapseElementId = $(this).data('bs-target');
		let collapseElement = $(collapseElementId);

		// Se l'elemento collapse è già mostrato, nascondilo
		if (collapseElement.hasClass('show')) {
			collapseElement.removeClass('show');
		} else {
			// Altrimenti, nascondi tutti gli elementi collapse
			$('.accordion-collapse').removeClass('show');

			// E mostra l'elemento collapse corrispondente
			collapseElement.addClass('show');
		}
	});
});

