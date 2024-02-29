/*
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * File: app.js
 * File Created: Monday, 12th February 2024 5:05:00 pm
 * Author: Nebula Studios (https://discord.gg/CsphJ7Wetz)
 *             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * The modification of this file is prohibited without explicit permission from Nebula Studios.
 * Any unauthorized modification of this file will result in support being revoked.
 *             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Last Modified: Thursday, 29th February 2024 1:54:33 am
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
	isMpModel: false,
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

function createFormRow(labelText, inputId, inputName, placeholderText, noteText, link = '', linkText = 'Reference') {
	if (link === '') {
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
	} else {
		return /*html*/ `
			<div class="form-row">
				<i class="ti ti-chevrons-right p-3"></i>
				<label for="${inputId}">${labelText}</label>
				<i class="ti ti-chevron-right p-3"></i>
				<div class="input-group">
					<input class="hover" type="text" id="${inputId}" name="${inputName}" placeholder="${placeholderText}" autocomplete="off"/>
					<div class="input-group-append">
						<i class="ti ti-question-mark"></i>
						<p class="note">${noteText}
							<a href="${link}" target="_blank" class="note-link">${linkText}</a>
						</p>
					</div>
				</div>
			</div>
			<div class="divider"></div>
		`;
	}
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
				<input class="hover" type="number" id="${inputId}" name="${inputName}" autocomplete="off" value="0" min="0" placeholder="${placeholderText}" onkeypress="return event.charCode >= 48 && event.charCode <= 57"/>
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
				<div class="d-flex flex-row align-center justify-start mb-2">
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

function createDoubleNumberInputRow(labelText, input1Id, input1Name, placeholder1Text, note1Text, input2Id, input2Name, placeholder2Text, note2Text) {
	return /*html*/ `
		<div class="form-row">
			<i class="ti ti-chevrons-right p-3"></i>
			<label for="${input1Id}">${labelText}</label>
			<i class="ti ti-chevron-right p-3"></i>
			<div class="input-group">
				<input class="hover" type="number" id="${input1Id}" name="${input1Name}" autocomplete="off" value="0" min="0" placeholder="${placeholder1Text}" onkeypress="return event.charCode >= 48 && event.charCode <= 57"/>
				<div class="input-group-append">
					<i class="ti ti-question-mark"></i>
					<p class="note">${note1Text}</p>
				</div>
				<input class="hover" type="number" id="${input2Id}" name="${input2Name}" autocomplete="off" value="0" min="0" placeholder="${placeholder2Text}" onkeypress="return event.charCode >= 48 && event.charCode <= 57"/>
				<div class="input-group-append">
					<i class="ti ti-question-mark"></i>
					<p class="note">${note2Text}</p>
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
		case 'peds':
			if (!isMpModel) {
				formRows = [
					createFormRow('Ped ID', 'pedId', 'pedId', 'Type the Ped ID', 'The ID of the ped that will give the quest'),
					createCheckboxRow('Is MP Model?', 'isMpModel', 'isMpModel', 'Toggle if the ped is a MP Model'),
					createFormRow('Ped Model', 'pedModel', 'pedModel', 'Type the Ped Model', 'The model of the ped', 'https://docs.fivem.net/docs/game-references/ped-models/'),
					createFormRow('Coords', 'pedCoords', 'pedCoords', 'Ex. vector3(-1046.6208, 4909.0034, 209.2752)', 'The coordinates of the ped'),
					createNumberInputRow('Ped Heading', 'pedHeading', 'pedHeading', 'Type the Ped Heading', 'The heading of the ped'),
					createFormRow('Ped Name', 'pedName', 'pedName', 'Type the Ped Name', 'Will be shown to the player is in the coords specified | NS-HUD required'),
					createFormRow('Quest Label', 'questLabel', 'questLabel', 'Type the Quest Label', 'Will be shown to the player is in the coords specified | NS-HUD required'),
					createFormRow('Animation Dict', 'animationDict', 'animationDict', 'Type the Animation Dict', 'The animation dict of the ped', 'https://forge.plebmasters.de/animations/'),
					createFormRow('Animation Name', 'animationName', 'animationName', 'Type the Animation Name', 'The animation name of the ped', 'https://forge.plebmasters.de/animations/'),
				].join('');
			} else {
				formRows = [
					createFormRow('Ped ID', 'pedId', 'pedId', 'Type the Ped ID', 'The ID of the ped that will give the quest'),
					createCheckboxRow('Is MP Model?', 'isMpModel', 'isMpModel', 'Toggle if the ped is a MP Model'),
					createNumberInputRow('Ped Type', 'pedType', 'pedType', 'Type the Ped Type', 'The type of the ped', 'https://runtime.fivem.net/doc/natives/?_0x6C9DD2D0499A4446'),
					createFormRow('Ped Model', 'pedModel', 'pedModel', 'Type the Ped Model', 'The model of the ped', 'https://docs.fivem.net/docs/game-references/ped-models/'),
					createFormRow('Coords', 'pedCoords', 'pedCoords', 'Ex. vector3(-1046.6208, 4909.0034, 209.2752)', 'The coordinates of the ped'),
					createNumberInputRow('Ped Heading', 'pedHeading', 'pedHeading', 'Type the Ped Heading', 'The heading of the ped'),
					createFormRow('Ped Name', 'pedName', 'pedName', 'Type the Ped Name', 'Will be shown to the player is in the coords specified | NS-HUD required'),
					createFormRow('Quest Label', 'questLabel', 'questLabel', 'Type the Quest Label', 'Will be shown to the player is in the coords specified | NS-HUD required'),
					createFormRow('Animation Dict', 'animationDict', 'animationDict', 'Type the Animation Dict', 'The animation dict of the ped', 'https://forge.plebmasters.de/animations/'),
					createFormRow('Animation Name', 'animationName', 'animationName', 'Type the Animation Name', 'The animation name of the ped', 'https://forge.plebmasters.de/animations/'),
					createDoubleNumberInputRow('Hat', 'hatDrawable', 'hatDrawable', 'Type the Hat Drawable', 'The hat drawable of the ped', 'hatTexture', 'hatTexture', 'Type the Hat Texture', 'Texture ID of the Hat'),
					createDoubleNumberInputRow('Glasses', 'glassesDrawable', 'glassesDrawable', 'Type the Glasses Drawable', 'The glasses drawable of the ped', 'glassesTexture', 'glassesTexture', 'Type the Glasses Texture', 'Texture ID of the Glasses'),
					createDoubleNumberInputRow('Ear Accessory', 'earDrawable', 'earDrawable', 'Type the Ear Drawable', 'The ear drawable of the ped', 'earTexture', 'earTexture', 'Type the Ear Texture', 'Texture ID of the Ear Accessory'),
					createDoubleNumberInputRow('Watch', 'watchDrawable', 'watchDrawable', 'Type the Watch Drawable', 'The watch drawable of the ped', 'watchTexture', 'watchTexture', 'Type the Watch Texture', 'Texture ID of the Watch'),
					createDoubleNumberInputRow('Bracelet', 'braceletDrawable', 'braceletDrawable', 'Type the Bracelet Drawable', 'The bracelet drawable of the ped', 'braceletTexture', 'braceletTexture', 'Type the Bracelet Texture', 'Texture ID of the Bracelet'),
					createDoubleNumberInputRow('Glasses', 'glassesDrawable', 'glassesDrawable', 'Type the Glasses Drawable', 'The glasses drawable of the ped', 'glassesTexture', 'glassesTexture', 'Type the Glasses Texture', 'Texture ID of the Glasses'),
					createDoubleNumberInputRow('Ear Accessory', 'earDrawable', 'earDrawable', 'Type the Ear Drawable', 'The ear drawable of the ped', 'earTexture', 'earTexture', 'Type the Ear Texture', 'Texture ID of the Ear Accessory'),
					createDoubleNumberInputRow('Face', 'faceDrawable', 'faceDrawable', 'Type the Face Drawable', 'The face drawable of the ped', 'faceTexture', 'faceTexture', 'Type the Face Texture', 'Texture ID of the Face'),
					createDoubleNumberInputRow('Hair', 'hairDrawable', 'hairDrawable', 'Type the Hair Drawable', 'The hair drawable of the ped', 'hairTexture', 'hairTexture', 'Type the Hair Texture', 'Texture ID of the Hair'),
					createDoubleNumberInputRow('Arms', 'armsDrawable', 'armsDrawable', 'Type the Arms Drawable', 'The arms drawable of the ped', 'armsTexture', 'armsTexture', 'Type the Arms Texture', 'Texture ID of the Arms'),
					createDoubleNumberInputRow('Legs', 'legsDrawable', 'legsDrawable', 'Type the Legs Drawable', 'The legs drawable of the ped', 'legsTexture', 'legsTexture', 'Type the Legs Texture', 'Texture ID of the Legs'),
					createDoubleNumberInputRow('Hands', 'handsDrawable', 'handsDrawable', 'Type the Hands Drawable', 'The hands drawable of the ped', 'handsTexture', 'handsTexture', 'Type the Hands Texture', 'Texture ID of the Hands'),
					createDoubleNumberInputRow('Shoes', 'shoesDrawable', 'shoesDrawable', 'Type the Shoes Drawable', 'The shoes drawable of the ped', 'shoesTexture', 'shoesTexture', 'Type the Shoes Texture', 'Texture ID of the Shoes'),
					createDoubleNumberInputRow('Accessories', 'accessoriesDrawable', 'accessoriesDrawable', 'Type the Accessories Drawable', 'The accessories drawable of the ped', 'accessoriesTexture', 'accessoriesTexture', 'Type the Accessories Texture', 'Texture ID of the Accessories'),
					createDoubleNumberInputRow('T-Shirt', 'tshirtDrawable', 'tshirtDrawable', 'Type the T-Shirt Drawable', 'The t-shirt drawable of the ped', 'tshirtTexture', 'tshirtTexture', 'Type the T-Shirt Texture', 'Texture ID of the T-Shirt'),
					createDoubleNumberInputRow('Body Armor', 'bodyArmorDrawable', 'bodyArmorDrawable', 'Type the Body Armor Drawable', 'The body armor drawable of the ped', 'bodyArmorTexture', 'bodyArmorTexture', 'Type the Body Armor Texture', 'Texture ID of the Body Armor'),
					createDoubleNumberInputRow('Decals', 'decalsDrawable', 'decalsDrawable', 'Type the Decals Drawable', 'The decals drawable of the ped', 'decalsTexture', 'decalsTexture', 'Type the Decals Texture', 'Texture ID of the Decals'),
					createDoubleNumberInputRow('Tops / Torso', 'torsoDrawable', 'torsoDrawable', 'Type the Tops / Torso Drawable', 'The tops / torso drawable of the ped', 'torsoTexture', 'torsoTexture', 'Type the Tops / Torso Texture', 'Texture ID of the Tops / Torso'),
					createDoubleNumberInputRow('Badge', 'badgeDrawable', 'badgeDrawable', 'Type the Badge Drawable', 'The badge drawable of the ped', 'badgeTexture', 'badgeTexture', 'Type the Badge Texture', 'Texture ID of the Badge'),
					createDoubleNumberInputRow('Torso2', 'torso2Drawable', 'torso2Drawable', 'Type the Torso2 Drawable', 'The torso2 drawable of the ped', 'torso2Texture', 'torso2Texture', 'Type the Torso2 Texture', 'Texture ID of the Torso2'),
					createDoubleNumberInputRow('Mask', 'maskDrawable', 'maskDrawable', 'Type the Mask Drawable', 'The mask drawable of the ped', 'maskTexture', 'maskTexture', 'Type the Mask Texture', 'Texture ID of the Mask'),
				].join('');
			}
			updateTemplate(selectedOption);
			break;
		default:
			console.error(`Unknown option: ${selectedOption}`);
			return;
	}
};

$(document).ready(function () {
	initDefaults();
	let selectedOption = $('input[name="config"]:checked').val();
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
		selectedOption = $(this).val();
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
		let changedInput = $(this).attr('name');

		if (changedInput === 'isMpModel') {
			isMpModel = $(this).is(':checked');
			render('peds');
			$('#formContainer').html(formRows);
			// Reimposta lo stato del checkbox dopo aver rigenerato il form
			$('#isMpModel').prop('checked', isMpModel);
		}
	});
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

function createPedTemplate(pedId, isMpModel, pedType, pedModel, pedCoords, pedHeading, pedName, questLabel, animationDict, animationName, hatDrawable, hatTexture, glassesDrawable, glassesTexture, earDrawable, earTexture, watchDrawable, watchTexture, braceletDrawable, braceletTexture, glassesDrawable, glassesTexture, earDrawable, earTexture, faceDrawable, faceTexture, hairDrawable, hairTexture, armsDrawable, armsTexture, legsDrawable, legsTexture, handsDrawable, handsTexture, shoesDrawable, shoesTexture, accessoriesDrawable, accessoriesTexture, tshirtDrawable, tshirtTexture, bodyArmorDrawable, bodyArmorTexture, decalsDrawable, decalsTexture, torsoDrawable, torsoTexture) {
	if (isMpModel) {
		return `
		[${pedId}] = { --! Ped ID (must be unique)
			isMpModel = ${isMpModel}, --! Toggle if the ped is a MP Model
			pedType = ${pedType}, --! The type of the ped // https://runtime.fivem.net/doc/natives/?_0x6C9DD2D0499A4446
			pedModel = ${pedModel}, --! The model of the ped // https://docs.fivem.net/docs/game-references/ped-models/
			pedCoords = ${pedCoords}, --! The coordinates of the ped
			pedHeading = ${pedHeading}, --! The heading of the ped
			pedName = ${pedName}, --! The name of the ped
			questLabel = ${questLabel}, --! The label of the quest
			animationDict = ${animationDict}, --! The animation dict of the ped
			animationName = ${animationName}, --! The animation name of the ped
			propIndex = {
				[1] = { -- Hat
					componentId = 0, --! DO NOT CHANGE
					drawableId = ${hatDrawable},
					textureId = ${hatTexture},
				},
				[2] = { -- Glasses
					componentId = 1, --! DO NOT CHANGE
					drawableId = ${glassesDrawable},
					textureId = ${glassesTexture},
				},
				[3] = { -- Ear Accessory
					componentId = 2, --! DO NOT CHANGE
					drawableId = ${earDrawable},
					textureId = ${earTexture},
				},
				[4] = { -- Watch
					componentId = 6, --! DO NOT CHANGE
					drawableId = ${watchDrawable},
					textureId = ${watchTexture},
				},
				[5] = { -- Bracelet
					componentId = 7, --! DO NOT CHANGE
					drawableId = ${braceletDrawable},
					textureId = ${braceletTexture},
				},
				[6] = { -- Glasses
					componentId = 8, --! DO NOT CHANGE
					drawableId = ${glassesDrawable},
					textureId = ${glassesTexture},
				},
				[7] = { -- Ear Accessory
					componentId = 9, --! DO NOT CHANGE
					drawableId = ${earDrawable},
					textureId = ${earTexture},
				},
			},
			variations = {
				[0] = { -- Face
					componentId = 0, --! DO NOT CHANGE
					drawableId = ${faceDrawable},
					textureId = ${faceTexture},
				},
				[1] = { -- Hair
					componentId = 2, --! DO NOT CHANGE
					drawableId = ${hairDrawable},
					textureId = ${hairTexture},
				},
				[2] = { -- Arms
					componentId = 3, --! DO NOT CHANGE
					drawableId = ${armsDrawable},
					textureId = ${armsTexture},
				},
				[3] = { -- Legs
					componentId = 4, --! DO NOT CHANGE
					drawableId = ${legsDrawable},
					textureId = ${legsTexture},
				},
				[4] = { -- Hands
					componentId = 5, --! DO NOT CHANGE
					drawableId = ${handsDrawable},
					textureId = ${handsTexture},
				},
				[5] = { -- Shoes
					componentId = 6, --! DO NOT CHANGE
					drawableId = ${shoesDrawable},
					textureId = ${shoesTexture},
				},
				[6] = { -- Accessories
					componentId = 7, --! DO NOT CHANGE
					drawableId = ${accessoriesDrawable},
					textureId = ${accessoriesTexture},
				},
				[7] = { -- T-Shirt
					componentId = 8, --! DO NOT CHANGE
					drawableId = ${tshirtDrawable},
					textureId = ${tshirtTexture},
				},
				[8] = { -- Body Armor
					componentId = 9, --! DO NOT CHANGE
					drawableId = ${bodyArmorDrawable},
					textureId = ${bodyArmorTexture},
				},
				[9] = { -- Decals
					componentId = 10, --! DO NOT CHANGE
					drawableId = ${decalsDrawable},
					textureId = ${decalsTexture},
				},
				[10] = { -- Tops / Torso
					componentId = 11, --! DO NOT CHANGE
					drawableId = ${torsoDrawable},
					textureId = ${torsoTexture},
				},
				[11] = { -- Badge
					componentId = 12, --! DO NOT CHANGE
					drawableId = ${badgeDrawable},
					textureId = ${badgeTexture},
				},
				[12] = { -- Torso2
					componentId = 13, --! DO NOT CHANGE
					drawableId = ${torso2Drawable},
					textureId = ${torso2Texture},
				},
				[13] = { -- Mask
				componentId = 1, --! DO NOT CHANGE
				drawableId = ${maskDrawable},
				textureId = ${maskTexture},
				},
			}
		},`;
	} else {
		return `
		[${pedId}] = { --! Ped ID (must be unique)
			isMpModel = ${isMpModel}, --! Toggle if the ped is a MP Model
			pedType = 4, --! The type of the ped // https://runtime.fivem.net/doc/natives/?_0x6C9DD2D0499A4446
			pedModel = ${pedModel}, --! The model of the ped // https://docs.fivem.net/docs/game-references/ped-models/
			pedCoords = ${pedCoords}, --! The coordinates of the ped
			pedHeading = ${pedHeading}, --! The heading of the ped
			pedName = ${pedName}, --! The name of the ped
			questLabel = ${questLabel}, --! The label of the quest
			animationDict = ${animationDict}, --! The animation dict of the ped
			animationName = ${animationName}, --! The animation name of the ped
			propIndex = nil, --! The props of the ped // Only for MP Models
		},`;
	}
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

			coords = getValue('coords', '"WARNING: NO COORDS"', false);
			message = getValue('message', '"WARNING: NO MESSAGE"');
			title = getValue('title', 'nil');
			completeMessage = getValue('completeMessage', 'nil');
			gui = getValue('gui', false, false);
			expReward = getValue('expReward', 0, false);
			stepEvent = getValue('stepEvent', 'nil');
			stepEventType = getEventVaulue('stepEventType');

			template = createStepTemplate(coords, message, title, completeMessage, gui, expReward, stepEvent, stepEventType);
			break;
		case 'peds':
			pedId = getValue('pedId', '"WARNING: NO KEY"');
			isMpModel = getValue('isMpModel', false, false);
			pedType = getValue('pedType', 0, false);
			pedModel = getValue('pedModel', 'nil');
			pedCoords = getValue('pedCoords', '"WARNING: NO COORDS"', false);
			pedHeading = getValue('pedHeading', 0, false);
			pedName = getValue('pedName', 'nil');
			questLabel = getValue('questLabel', 'nil');
			animationDict = getValue('animationDict', 'nil');
			animationName = getValue('animationName', 'nil');

			if (!isMpModel) {
				template = createPedTemplate(pedId, isMpModel, pedType, pedModel, pedCoords, pedHeading, pedName, questLabel, animationDict, animationName);
			} else {
				hatDrawable = getValue('hatDrawable', 0, false);
				hatTexture = getValue('hatTexture', 0, false);
				glassesDrawable = getValue('glassesDrawable', 0, false);
				glassesTexture = getValue('glassesTexture', 0, false);
				earDrawable = getValue('earDrawable', 0, false);
				earTexture = getValue('earTexture', 0, false);
				watchDrawable = getValue('watchDrawable', 0, false);
				watchTexture = getValue('watchTexture', 0, false);
				braceletDrawable = getValue('braceletDrawable', 0, false);
				braceletTexture = getValue('braceletTexture', 0, false);
				glassesDrawable = getValue('glassesDrawable', 0, false);
				glassesTexture = getValue('glassesTexture', 0, false);
				earDrawable = getValue('earDrawable', 0, false);
				earTexture = getValue('earTexture', 0, false);
				faceDrawable = getValue('faceDrawable', 0, false);
				faceTexture = getValue('faceTexture', 0, false);
				hairDrawable = getValue('hairDrawable', 0, false);
				hairTexture = getValue('hairTexture', 0, false);
				armsDrawable = getValue('armsDrawable', 0, false);
				armsTexture = getValue('armsTexture', 0, false);
				legsDrawable = getValue('legsDrawable', 0, false);
				legsTexture = getValue('legsTexture', 0, false);
				handsDrawable = getValue('handsDrawable', 0, false);
				handsTexture = getValue('handsTexture', 0, false);
				shoesDrawable = getValue('shoesDrawable', 0, false);
				shoesTexture = getValue('shoesTexture', 0, false);
				accessoriesDrawable = getValue('accessoriesDrawable', 0, false);
				accessoriesTexture = getValue('accessoriesTexture', 0, false);
				tshirtDrawable = getValue('tshirtDrawable', 0, false);
				tshirtTexture = getValue('tshirtTexture', 0, false);
				bodyArmorDrawable = getValue('bodyArmorDrawable', 0, false);
				bodyArmorTexture = getValue('bodyArmorTexture', 0, false);
				decalsDrawable = getValue('decalsDrawable', 0, false);
				decalsTexture = getValue('decalsTexture', 0, false);
				torsoDrawable = getValue('torsoDrawable', 0, false);
				torsoTexture = getValue('torsoTexture', 0, false);
				badgeDrawable = getValue('badgeDrawable', 0, false);
				badgeTexture = getValue('badgeTexture', 0, false);
				torso2Drawable = getValue('torso2Drawable', 0, false);
				torso2Texture = getValue('torso2Texture', 0, false);
				maskDrawable = getValue('maskDrawable', 0, false);
				maskTexture = getValue('maskTexture', 0, false);

				template = createPedTemplate(pedId, isMpModel, pedType, pedModel, pedCoords, pedHeading, pedName, questLabel, animationDict, animationName, hatDrawable, hatTexture, glassesDrawable, glassesTexture, earDrawable, earTexture, watchDrawable, watchTexture, braceletDrawable, braceletTexture, glassesDrawable, glassesTexture, earDrawable, earTexture, faceDrawable, faceTexture, hairDrawable, hairTexture, armsDrawable, armsTexture, legsDrawable, legsTexture, handsDrawable, handsTexture, shoesDrawable, shoesTexture, accessoriesDrawable, accessoriesTexture, tshirtDrawable, tshirtTexture, bodyArmorDrawable, bodyArmorTexture, decalsDrawable, decalsTexture, torsoDrawable, torsoTexture);

			}

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

	showNotification('Copied to clipboard', 'success');

	setTimeout(() => {
		$('#copyButton').css('color', 'var(--text)').html('');
	}, 2500);
});

function showNotification(message, type, time = 3000) {
	let autogeneratedId = 'id' + Math.random().toString(36).substring(2);

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
		<div class="notification" id='${autogeneratedId}'>
			<div class="notification-content">
				<div class="notification-progress"></div>
				<i class="ti ti-alert-circle notification-icon"></i>
				<p class="notification-message toggle-note">This is a notification</p>
			</div>
		</div>
	`;

	const $notification = $(notification);

	$('.notification-container').append($notification);

	gsap.fromTo(
		'#'+autogeneratedId,
		{
			opacity: 0,
			y: 50,
			duration: 0.1,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.5,
			ease: "power1.out",
		},
	);

	$notification.find('.notification-message').html(message.replace(/\n/g, '<br/>'));
	$notification.find('.notification-icon').addClass(iconTypes[type]).addClass(textTypes[type]);
	$notification.find('.notification-progress').addClass(bgTypes[type]);

	$('.notification-progress').animate({
		width: '0%'
	}, time, 'linear');

	gsap.to('.notification', {
		opacity: 0,
		y: 500,
		duration: 0.5,
		ease: "power1.out",
		delay: time / 1000,
		onComplete: function () {
			$('#'+autogeneratedId).remove();
		}
	});
}
