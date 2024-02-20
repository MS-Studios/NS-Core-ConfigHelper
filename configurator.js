/*
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * File: app.js
 * File Created: Monday, 12th February 2024 5:05:00 pm
 * Author: Nebula Studios (https://discord.gg/CsphJ7Wetz)
 *             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * The modification of this file is prohibited without explicit permission from Nebula Studios.
 * Any unauthorized modification of this file will result in support being revoked.
 *             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Last Modified: Tuesday, 20th February 2024 1:58:18 am
 * Modified By: MS Studios
 *             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * License: Creative Commons Attribution Non-commercial No-derivatives 4.0 International
 * License Abbreviation: CC BY-NC-ND 4.0
 * License URL: https://creativecommons.org/licenses/by-nc-nd/4.0/
 * Copyright 2023 - 2024, Nebula Studios
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

let defaults = {
	key: '"WARNING: NO KEY"',
	questToStart: '"WARNING: NO QUEST TO START"',
	mustRemove: false,
	isActive: false,
	isCompleted: false,
	currentStep: 0,
	quest_depend: 'nil',
	quest_unrequire: 'nil',
	quest_give_after: 'nil',
	items_require: 'nil',
	level_require: 0,
	isStopped: false,
	label: '"WARNING: NO LABEL"',
	description: '"WARNING: NO DESCRIPTION"',
	expReward: 0,
	zone: 'nil',
	startEvent: '',
	completedEvent: '',
	coords: 'WARNING: NO COORDS',
	message: '"WARNING: NO MESSAGE"',
	title: 'nil',
	completeMessage: 'nil',
	distance: 0,
	gui: false,
	itemReward: 'nil',
	removeItem: 'nil',
	stepEvent: 'nil',
	template: ''
};

function initDefaults() {
	Object.keys(defaults).forEach(key => {
		window[key] = defaults[key];
	});

	// Update the checkboxes
	$('#mustRemove').prop('checked', defaults.mustRemove);
	$('#isActive').prop('checked', defaults.isActive);
	$('#isCompleted').prop('checked', defaults.isCompleted);
	$('#isStopped').prop('checked', defaults.isStopped);
	$('#startingEventType').prop('checked', defaults.startEvent !== '');
	$('#completeEventType').prop('checked', defaults.completedEvent !== '');
	$('#gui').prop('checked', defaults.gui);
	$('#stepEventType').prop('checked', defaults.stepEvent !== 'nil');
}

function createFormRow(labelText, inputId, inputName, placeholderText, noteText) {
	return /*html*/ `
        <div class="form-row">
            <i class="ti ti-chevrons-right p-3"></i>
            <label for="${inputId}">${labelText}</label>
            <i class="ti ti-chevron-right p-3"></i>
            <div class="input-group">
                <input class="hover" type="text" id="${inputId}" name="${inputName}" placeholder="${placeholderText}" autocomplete="off"/>
                <div class="input-group-append">
                    <i class="ti ti-question-mark"></i>
                    <p class="note">${noteText}</p>
                </div>
            </div>
        </div>
        <div class="divider"></div>
    `;
}

function createCheckboxRow(labelText, checkboxId, checkboxName, noteText) {
	return /*html*/ `
        <div class="form-row">
            <i class="ti ti-chevrons-right p-3"></i>
            <label for="${checkboxId}">${labelText}</label>
            <i class="ti ti-chevron-right p-3"></i>
            <div class="input-group">
                <div class="d-flex flex-row align-center justify-start">
                    <p class="toggle-note">No</p>
                    <label class="switch">
                        <input type="checkbox" id="${checkboxId}" name="${checkboxName}"/>
                        <div class="slider round"></div>
                    </label>
                    <p class="toggle-note">Yes</p>
                </div>
                <div class="input-group-append">
                    <i class="ti ti-question-mark"></i>
                    <p class="note">${noteText}</p>
                </div>
            </div>
        </div>
        <div class="divider"></div>
    `;
}

function createNumberInputRow(labelText, inputId, inputName, placeholderText, noteText) {
	return /*html*/ `
		<div class="form-row">
			<i class="ti ti-chevrons-right p-3"></i>
			<label for="${inputId}">${labelText}</label>
			<i class="ti ti-chevron-right p-3"></i>
			<div class="input-group">
				<input class="hover" type="number" id="${inputId}" name="${inputName}" autocomplete="off" value="0" placeholder="${placeholderText}" onkeypress="return event.charCode >= 48 && event.charCode <= 57"/>
				<div class="input-group-append">
					<i class="ti ti-question-mark"></i>
					<p class="note">${noteText}</p>
				</div>
			</div>
		</div>
		<div class="divider"></div>
	`;
}

function createTextAreaRow(labelText, inputId, inputName, placeholderText, noteText) {
	return /*html*/ `
		<div class="form-row">
			<i class="ti ti-chevrons-right p-3"></i>
			<label for="${inputId}">${labelText}</label>
			<i class="ti ti-chevron-right p-3"></i>
			<div class="input-group">
				<textarea class="hover" id="${inputId}" name="${inputName}" placeholder="${placeholderText}" autocomplete="off"></textarea>
				<div class="input-group-append">
					<i class="ti ti-question-mark"></i>
					<p class="note">${noteText}</p>
				</div>
			</div>
		</div>
		<div class="divider"></div>
	`;
}

function createRowPlusCheckbox(labelText, inputId, inputName, placeholderText, noteText, checkboxId, checkboxName, checkboxText) {
	return /*html*/ `
		<div class="form-row">
			<i class="ti ti-chevrons-right p-3"></i>
			<label for="${checkboxId}">${labelText}</label>
			<i class="ti ti-chevron-right p-3"></i>
			<div class="input-group">
				<div class="d-flex flex-row align-center justify-start">
				<p class="toggle-note">Server</p>
				<label class="switch">
					<input type="checkbox" id="${checkboxId}" name="${checkboxName}">
					<div class="slider round"></div>
				</label>
				<p class="toggle-note">Client</p>
				</div>
				<input class="hover" type="text" id="${inputId}" name="${inputName}" placeholder="${placeholderText}" autocomplete="off" />
				<div class="input-group-append">
					<i class="ti ti-question-mark"></i>
					<p class="note">${noteText}</p>
				</div>
			</div>
		</div>
		<div class="divider"></div>
	`;
}

function render(selectedOption) {
	switch (selectedOption) {
		case 'ItemsStarters':
			formRows = [
				createFormRow('Item Name', 'key', 'key', 'Type the ID of the item', 'The item that will trigger the start of the Quest'),
				createFormRow('Quest to start', 'questToStart', 'questToStart', 'Type the ID Quest', 'The quest that will be started when the item is used'),
				createCheckboxRow('Remove item?', 'mustRemove', 'mustRemove', 'Toggle to remove the item from the player\'s inventory when the quest is started')
			].join('');
			updateTemplate(selectedOption);
			break;
		case 'PrimaryQuest':
			formRows = [
				createFormRow('Quest Name', 'key', 'key', 'Type the Quest ID', 'It must be unique'),
				// createCheckboxRow('Is enabled?', 'isActive', 'isActive', 'Toggle if the quest is available'),
				// createCheckboxRow('Is completed?', 'isCompleted', 'isCompleted', 'Toggle if the quest is completed by default'),
				// createNumberInputRow('Starting step', 'currentStep', 'currentStep', 'Default is 0', 'Starting step of the Quest'),
				createFormRow('Quest dependency', 'quest_depend', 'quest_depend', 'Type the Quest ID / leave blank', 'The quest that must be completed before this quest can be started'),
				createFormRow('Quest unrequire', 'quest_unrequire', 'quest_unrequire', 'Type the Quest ID / leave blank', 'The quest that will be unrequired after this quest is completed'),
				createFormRow('Quest to give after', 'quest_give_after', 'quest_give_after', 'Type the Quest ID / leave blank', 'The quest that will be given after this quest is completed'),
				createFormRow('Required item', 'items_require', 'items_require', 'Type the Item ID / leave blank', 'The item that will be required to start the quest'),
				createNumberInputRow('Level requirement', 'level_require', 'level_require', 'Type 0 to set always available', 'The level required to start the quest'),
				// createCheckboxRow('Is stopped?', 'isStopped', 'isStopped', 'Toggle to prevent the start of the quest by default (useful if you use custom events)'),
				createFormRow('Label', 'label', 'label', 'Type the Quest Name', 'The name of the quest that will be visible to the players'),
				createFormRow('Description', 'description', 'description', 'A short description of the Quest', 'The description of the quest that will be visible to the players in the Main Interface'),
				createNumberInputRow('EXP Reward', 'expReward', 'expReward', 'Type the EXP Amount', 'The amount of EXP to reward the player with'),
				createFormRow('Zone', 'zone', 'zone', '', 'The zone where the quest will be available to start | NS-Medic required'),
				createRowPlusCheckbox('Starting Event', 'startEvent', 'startEvent', 'Type the event name', 'The event that will be triggered when the quest is started', 'startingEventType', 'startingEventType', 'Starting Event Type'),
				createRowPlusCheckbox('Completed Event', 'completedEvent', 'completedEvent', 'Type the event name', 'The event that will be triggered when the quest is completed', 'completeEventType', 'completeEventType', 'Completed Event Type')
			].join('');
			updateTemplate(selectedOption);
			break;
		case 'step':
			formRows = [
				createFormRow('Coordinates', 'coords', 'coords', 'Ex. vector3(-1046.6208, 4909.0034, 209.2752)', 'The coordinates where the step will be completed'),
				createFormRow('Tip', 'message', 'message', 'Type a short tip on how to complete the step', 'The message that will be displayed in the small UI on the top right corner to the player when the step is started'),
				createCheckboxRow('GUI', 'gui', 'gui', 'Toggle to enable the GUI when the step is completed'),
				createFormRow('Title', 'title', 'title', 'Type a short title', 'The title that will be displayed in the GUI (if active) when the step is completed'),
				createTextAreaRow('Message', 'completeMessage', 'completeMessage', 'Type the text you want to show when the step is completed', 'The message that will be displayed in the GUI (if active) when the step is completed'),
				createNumberInputRow('Distance', 'distance', 'distance', 'Type the desidered distance', 'The distance from the coordinates where the step will be completed'),
				// createFormRow('Reward Item(s)', 'itemReward', 'itemReward', '', 'The item that will be given to the player when the step is completed'),
				// createFormRow('Remove Item(s)', 'removeItem', 'removeItem', '', 'The item(s) that will be removed from the player\'s inventory when the step is completed'),
				createNumberInputRow('EXP Reward', 'expReward', 'expReward', 'Type the EXP Amount', 'The amount of EXP to reward the player with when the step is completed'),
				createRowPlusCheckbox('Step Event', 'stepEvent', 'stepEvent', 'Type the event name', 'The event that will be triggered when the step is completed', 'stepEventType', 'stepEventType', 'Step Event Type')
			].join('');
			updateTemplate(selectedOption);
			break;
	}
};

$(document).ready(function () {
	// check if the site is running on mobile or desktop (The configurator is not meant to be used on mobile, fuck everyone)
	if (/Mobi/.test(navigator.userAgent)) {
		$('#mobileWarning').show();
		$('.main').hide();
	} else {
		$('#mobileWarning').hide();
		$('.main').show();
		initDefaults();
		selectedOption = $('input[name="config"]:checked').val();
		render(selectedOption);
		$('#formContainer').html(formRows);
		gsap.fromTo(
			'#preloader',
			{
				opacity: 1
			},
			{
				opacity: 0,
				x: 0,
				duration: 1,
				delay: 1,
				ease: "power1.out",
				onComplete: function () {
					$('#preloader').hide()
				}
			}
		)
		gsap.fromTo(
			'.form-row',
			{
				opacity: 0,
				x: -500
			},
			{
				opacity: 1,
				x: 0,
				duration: 0.5,
				stagger: 0.1,
				ease: "power1.out",
			},
		);
		$('input[name="config"]').on('change', function () {
			initDefaults();
			var selectedOption = $(this).val();

			render(selectedOption);

			$('#formContainer').html(formRows);
			gsap.fromTo(
				'.form-row',
				{
					opacity: 0,
					x: -500
				},
				{
					opacity: 1,
					x: 0,
					duration: 0.5,
					stagger: 0.1,
					ease: "power1.out",
				},
			);
		});
		$('#formContainer').on('input', '.form-row input, .form-row textarea', function () {
			console.log(selectedOption)
			updateTemplate(selectedOption)
		});
	};
});

function createItemsStartersTemplate(key, questToStart, mustRemove) {
	return `
		[${key}] = { --! Item Name (unique) // Required
			questToStart = ${questToStart}, -- Quest ID that will be given after using this item
			mustRemove = ${mustRemove}, -- Toggle to remove this item after using it
		},`;
}

function createPrimaryQuestTemplate(key, quest_depend, quest_unrequire, quest_give_after, items_require, level_require, label, description, expReward, zone, startEvent, startingEventType, completedEvent, completedEventType) {
	if (startEvent !== 'nil' && startEvent !== '') {
		startEvent = `{ type = ${startingEventType}, eventName = ${startEvent} }`;
	} else {
		startEvent = 'nil';
	}

	if (completedEvent !== 'nil' && completedEvent !== '') {
		completedEvent = `{ type = ${completedEventType}, eventName = ${completedEvent} }`;
	} else {
		completedEvent = 'nil';
	}

	return `
		[${key}] = { --! Quest ID (must be unique)

			-- Settings for quest
			quest_depend = ${quest_depend}, --! Quest ID that must be completed before this quest can be started
			quest_unrequire = ${quest_unrequire}, --! Quest ID that must be inactive before starting this quest
			quest_give_after = ${quest_give_after}, --! Quest ID that will be given after this quest is completed
			items_require = ${items_require}, --! Item ID that will be required to start the quest
			level_require = ${level_require}, --! Level required to start the quest

			-- Settings for quest
			label = ${label}, --! The name of the quest that will be visible to the players
			description = ${description}, --! The description of the quest that will be visible to the players in the Main Interface
			expReward = ${expReward}, --! The amount of EXP to reward the player with
			zone = ${zone}, --! The zone where the quest will be available to start | NS-Medic required
			startEvent = ${startEvent}, --! The event that will be triggered when the quest is started
			completedEvent = ${completedEvent}, --! The event that will be triggered when the quest is completed

			-- Settings for PED
			usePed = false, --! Toggle if the quest uses a ped
			can_take_quest = true, --! Toggle if the player can take the quest from the ped
			marker_coords = nil, --! The coordinates where the player can take the quest
			pedSettings = PED.Quest[${key}] --! The settings for the ped
		},`;
}

function createStepTemplate(coords, message, title, completeMessage, gui, expReward, stepEvent, stepEventType) {
	if (stepEvent !== 'nil' && stepEvent !== '') {
		stepEvent = `{ type = ${stepEvent}, eventName = ${stepEventType} }`;
	} else {
		stepEvent = 'nil';
	}

	return `
		{
			coords = ${coords}, --! The coordinates where the step will be completed
			message = ${message}, --! The message that will be displayed in the small UI on the top right corner to the player when the step is started
			title = ${title}, --! The title that will be displayed in the GUI (if active) when the step is completed
			completeMessage = ${completeMessage}, --! The message that will be displayed in the GUI (if active) when the step is completed
			gui = ${gui}, --! Toggle to enable the GUI when the step is completed
			itemReward = {}, --! The item that will be given to the player when the step is completed // Please add manually // Ex. { item = "item", amount = 1 }
			removeItem = {}, --! The item(s) that will be removed from the player's inventory when the step is completed // Please add manually // Ex. { item = "item", amount = 1 }
			expReward = ${expReward}, --! The amount of EXP to reward the player with when the step is completed
			stepEvent = ${stepEvent},
		},`;
}

function getValue(id, defaultValue, isString = true) {
	let element = $(`#${id}`);
	if (element.is(':checkbox')) {
		return element.prop('checked');
	} else {
		let val = element.val();
		return val ? (isString ? `'${val}'` : val) : defaultValue;
	}
}

function getEventVaulue(id) {
	let element = $(`#${id}`);

	return element.prop('checked') ? `'client'` : `'server'`;
}

function updateTemplate(selectedOption) {
	let template;
	switch (selectedOption) {
		case 'ItemsStarters':
			key = getValue('key', '"WARNING: NO KEY"');
			questToStart = getValue('questToStart', 'nil');
			mustRemove = getValue('mustRemove', false, false);
			template = createItemsStartersTemplate(key, questToStart, mustRemove);
			break;
		case 'PrimaryQuest':
			key = getValue('key', '"WARNING: NO KEY"');
			isActive = getValue('isActive', false, false);
			isCompleted = getValue('isCompleted', false, false);
			currentStep = getValue('currentStep', 0, false);
			quest_depend = getValue('quest_depend', 'nil');
			quest_unrequire = getValue('quest_unrequire', 'nil');
			quest_give_after = getValue('quest_give_after', 'nil');
			items_require = getValue('items_require', 'nil');
			level_require = getValue('level_require', 0, false);
			isStopped = getValue('isStopped', false, false);
			label = getValue('label', '"WARNING: NO LABEL"');
			description = getValue('description', '"WARNING: NO DESCRIPTION"');
			expReward = getValue('expReward', 0, false);
			zone = getValue('zone', 'nil');
			startEvent = getValue('startEvent', 'nil');
			startingEventType = getEventVaulue('startingEventType');
			completedEvent = getValue('completedEvent', 'nil');
			completedEventType = getEventVaulue('completeEventType');

			template = createPrimaryQuestTemplate(key, quest_depend, quest_unrequire, quest_give_after, items_require, level_require, label, description, expReward, zone, startEvent, startingEventType, completedEvent, completedEventType);
			break;
		case 'step':

			coords = getValue('coords', '"WARNING: NO COORDS"');
			message = getValue('message', '"WARNING: NO MESSAGE"');
			title = getValue('title', 'nil');
			completeMessage = getValue('completeMessage', 'nil');
			gui = getValue('gui', false, false);
			expReward = getValue('expReward', 0, false);
			stepEvent = getValue('stepEvent', 'nil');
			stepEventType = getEventVaulue('stepEventType');

			template = createStepTemplate(coords, message, title, completeMessage, gui, expReward, stepEvent, stepEventType);
			break;
		default:
			console.error(`Unknown option: ${selectedOption}`);
			return;
	}
	generateCode(template);
}

function generateCode(template) {
	$('#output').attr('class', 'language-lua').html('<pre>' + Prism.highlight(template, Prism.languages.lua, 'lua') + '</pre>');
}

$('#copyButton').on('click', function () {
	var code = $('#output').text();
	navigator.clipboard.writeText(code);
	$('#copyButton').css('color', 'var(--success)').html(`
		<i class="ti ti-check text-success"></i>
	`);

	setTimeout(() => {
		$('#copyButton').css('color', 'var(--text)').html('');
	}, 2500);
});
