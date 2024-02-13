/*
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * File: app.js
 * File Created: Monday, 12th February 2024 5:05:00 pm
 * Author: Nebula Studios (https://discord.gg/CsphJ7Wetz)
 *             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * The modification of this file is prohibited without explicit permission from Nebula Studios.
 * Any unauthorized modification of this file will result in support being revoked.
 *             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Last Modified: Tuesday, 13th February 2024 3:56:21 pm
 * Modified By: MS Studios
 *             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * License: Creative Commons Attribution Non-commercial No-derivatives 4.0 International
 * License Abbreviation: CC BY-NC-ND 4.0
 * License URL: https://creativecommons.org/licenses/by-nc-nd/4.0/
 * Copyright 2023 - 2024, Nebula Studios
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

let key = '';
let questToStart = '';
let mustRemove = false;
$('#mustRemove').prop('checked', false);
let isActive = false;
$('#isActive').prop('checked', false);
let isCompleted = false;
$('#isCompleted').prop('checked', false);
let currentStep = 0;
let quest_depend = '';
let quest_unrequire = '';
let quest_give_after = '';
let items_require = '';
let level_require = 0;
let isStopped = false;
$('#isStopped').prop('checked', false);
let label = '';
let description = '';
let expReward = 0;
let zone = '';
let startEvent = '';
let completedEvent = '';
let coords = '';
let message = '';
let title = '';
let completeMessage = '';
let distance = 0;
let gui = false;
$('#gui').prop('checked', false);
let itemReward = '';
let removeItem = '';
let stepEvent = '';
let template = '';

function initDefaults() {
	key = '';
	questToStart = '';
	mustRemove = false;
	$('#mustRemove').prop('checked', false);
	isActive = false;
	$('#isActive').prop('checked', false);
	isCompleted = false;
	$('#isCompleted').prop('checked', false);
	currentStep = 0;
	quest_depend = '';
	quest_unrequire = '';
	quest_give_after = '';
	items_require = '';
	level_require = 0;
	isStopped = false;
	$('#isStopped').prop('checked', false);
	label = '';
	description = '';
	expReward = 0;
	zone = '';
	startEvent = '';
	completedEvent = '';
	coords = '';
	message = '';
	title = '';
	completeMessage = '';
	distance = 0;
	gui = false;
	$('#gui').prop('checked', false);
	itemReward = '';
	removeItem = '';
	stepEvent = '';
	template = '';


}

function render(selectedOption) {
	switch (selectedOption) {
		case 'ItemsStarters':
			formRows = /*html*/ `
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="key">Item Name</label>
						<i class="ti ti-chevron-right p-3"></i>
						<input class="hover" type="text" id="key" name="key" placeholder="Type the ID of the item"  autocomplete="off"/>
						<i class="ti ti-question-mark p-3"></i>
						<p class="note">The item that will trigger the start of the Quest</p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="questToStart">Quest to start</label>
						<i class="ti ti-chevron-right p-3"></i>
						<input class="hover" type="text" id="questToStart" name="questToStart" placeholder="Type the ID Quest" autocomplete="off"/>
						<i class="ti ti-question-mark p-3"></i>
						<p class="note">The quest that will be started when the item is used</p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="mustRemove">Remove item?</label>
						<i class="ti ti-chevron-right p-3"></i>
						<label class="switch">
							<input type="checkbox" id="mustRemove" name="mustRemove"/>
							<div class="slider round"></div>
						</label>
						<i class="ti ti-question-mark p-3"></i>
						<p class="note">Toggle to remove the item from the player's inventory when the quest is started</p>
					</div>`;

			updateTemplate(selectedOption);
			break;

		case 'PrimaryQuest_Server':
			formRows = /*html*/`
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="key">Quest Name:</label>
						<i class="ti ti-chevron-right p-3"></i>
						<input class="hover" type="text" id="key" name="key" placeholder="Type the Quest ID" autocomplete="off"/>
						<i class="ti ti-question-mark p-3"></i>
						<p class="note">It <span class="underline">MUST</span> be unique</p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="isActive">Is active?</label>
						<i class="ti ti-chevron-right p-3"></i>
						<label class="switch">
							<input type="checkbox" id="isActive" name="isActive"/>
							<div class="slider round"></div>
						</label>
						<i class="ti ti-question-mark p-3"></i>
						<p class="note">Toggle to make the quest available</p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="isCompleted">Is completed?</label>
						<i class="ti ti-chevron-right p-3"></i>
						<label class="switch">
							<input type="checkbox" id="isCompleted" name="isCompleted"/>
							<div class="slider round"></div>
						</label>
						<i class="ti ti-question-mark p-3"></i>
						<p class="note">Toggle to mark the quest as completed</p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="currentStep">Starting Step</label>
						<i class="ti ti-chevron-right p-3"></i>
						<input class="hover" type="number" id="currentStep" name="currentStep" placeholder="Default is 0"  autocomplete="off" onkeypress="return event.charCode >= 48 && event.charCode <= 57"/>
						<i class="ti ti-question-mark p-3"></i>
						<p class="note">The starting step number for the quest</p>
					</div>`;
			updateTemplate(selectedOption);
			break;
		case 'PrimaryQuest':
			formRows = /*html*/ `
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="key">Quest Name</label>
						<i class="ti ti-chevron-right p-3"></i>
						<input class="hover" type="text" id="key" name="key" placeholder="Type the Quest ID" autocomplete="off"/>
						<i class="ti ti-alert-triangle p-3"></i>
						<p class="note bold">It must match the value set in the PrimaryQuest_Server</p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="isActive">Is enabled?</label>
						<i class="ti ti-chevron-right p-3"></i>
						<label class="switch">
							<input type="checkbox" id="isActive" name="isActive" />
							<div class="slider round"></div>
						</label>
						<i class="ti ti-alert-triangle p-3"></i>
						<p class="note bold">It must match the value set in the PrimaryQuest_Server</p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="isCompleted">Is completed?</label>
						<i class="ti ti-chevron-right p-3"></i>
						<label class="switch">
							<input type="checkbox" id="isCompleted" name="isCompleted" />
							<div class="slider round"></div>
						</label>
						<i class="ti ti-alert-triangle p-3"></i>
						<p class="note bold">It must match the value set in the PrimaryQuest_Server</p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="currentStep">Starting step</label>
						<i class="ti ti-chevron-right p-3"></i>
						<input class="hover" type="number" id="currentStep" name="currentStep" placeholder="Default is 0"  autocomplete="off" onkeypress="return event.charCode >= 48 && event.charCode <= 57">
						<i class="ti ti-alert-triangle p-3"></i>
						<p class="note bold">It must match the value set in the PrimaryQuest_Server</p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="quest_depend">Quest dependency</label>
						<i class="ti ti-chevron-right p-3"></i>
						<input class="hover" type="text" id="quest_depend" name="quest_depend" placeholder="Type the Quest ID / leave blank" autocomplete="off" />
						<i class="ti ti-question-mark p-3"></i>
						<p class="note">The quest that must be completed before this quest is available</p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="quest_unrequire">Quest unrequire</label>
						<i class="ti ti-chevron-right p-3"></i>
						<input class="hover" type="text" id="quest_unrequire" name="quest_unrequire" autocomplete="off" placeholder="Type the Quest ID / leave blank"/>
						<i class="ti ti-question-mark p-3"></i>
						<p class="note">The quest that must be unclompleted <br> from the player's quest log when this quest is started</p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="quest_give_after">Quest to give after</label>
						<i class="ti ti-chevron-right p-3"></i>
						<input class="hover" type="text" id="quest_give_after" name="quest_give_after" autocomplete="off" placeholder="Type the Quest ID / leave blank"/>
						<i class="ti ti-question-mark p-3"></i>
						<p class="note">The quest that will be given after this quest is completed</p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="items_require">Required item</label>
						<i class="ti ti-chevron-right p-3"></i>
						<input class="hover" type="text" id="items_require" name="items_require" autocomplete="off" placeholder="Type the Item ID / leave blank"/>
						<i class="ti ti-question-mark p-3"></i>
						<p class="note">The item that is required to start the quest</p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="level_require">Level requirement</label>
						<i class="ti ti-chevron-right p-3"></i>
						<input class="hover" type="number" id="level_require" name="level_require" autocomplete="off" placeholder="Type 0 to set always available"/>
						<i class="ti ti-question-mark p-3"></i>
						<p class="note">The level required to start the quest</p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="isStopped">Is stopped?</label>
						<i class="ti ti-chevron-right p-3"></i>
						<label class="switch">
							<input type="checkbox" id="isStopped" name="isStopped" />
							<div class="slider round"></div>
						</label>
						<i class="ti ti-question-mark p-3"></i>
						<p class="note">Toggle to prevent the start of the quest by default</p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="label">Label</label>
						<i class="ti ti-chevron-right p-3"></i>
						<input class="hover" type="text" id="label" name="label" autocomplete="off" placeholder="Type the Quest Name"/>
						<i class="ti ti-question-mark p-3"></i>
						<p class="note">The name of the quest that will be visible to the players</p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="description">Description</label>
						<i class="ti ti-chevron-right p-3"></i>
						<textarea class="hover" id="description" name="description" autocomplete="off" placeholder="A short description of the Quest"></textarea>
						<i class="ti ti-question-mark p-3"></i>
						<p class="note">The description of the quest that will be <br> visible to the players in the Main Interface</p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="expReward">EXP Reward</label>
						<i class="ti ti-chevron-right p-3"></i>
						<input class="hover" type="number" id="expReward" name="expReward" autocomplete="off" placeholder="Type the EXP Amount" onkeypress="return event.charCode >= 48 && event.charCode <= 57"/>
						<i class="ti ti-question-mark p-3"></i>
						<p class="note">The amount of EXP to reward the player with</p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="zone">Zone</label>
						<i class="ti ti-chevron-right p-3"></i>
						<input class="hover" type="text" id="zone" name="zone" autocomplete="off" />
						<i class="ti ti-question-mark p-3"></i>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="startEvent">Start Event</label>
						<i class="ti ti-chevron-right p-3"></i>
						<input class="hover" type="text" id="startEvent" name="startEvent" autocomplete="off" />
						<i class="ti ti-question-mark p-3"></i>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="completedEvent">Complete Event</label>
						<i class="ti ti-chevron-right p-3"></i>
						<input class="hover" type="text" id="completedEvent" name="completedEvent" autocomplete="off" />
						<i class="ti ti-question-mark p-3"></i>
					</div>`;

			updateTemplate(selectedOption);
			break;
		case 'step':
			formRows = /*html*/ `
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="coords">Coordinates</label>
						<i class="ti ti-chevron-right p-3"></i>
						<input class="hover" type="text" id="coords" name="coords" placeholder="Ex. vector3(-1046.6208, 4909.0034, 209.2752)" autocomplete="off"/>
						<i class="ti ti-question-mark p-3"></i>
						<p class="note">The coordinates where the step will be <span class="bold underline"> completed</span></p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="message">Tip</label>
						<i class="ti ti-chevron-right p-3"></i>
						<input class="hover" type="text" id="message" name="message" placeholder="Ex. vector3(-1046.6208, 4909.0034, 209.2752)" autocomplete="off"/>
						<i class="ti ti-question-mark p-3"></i>
						<p class="note">The message that will be displayed in the small UI on the top right corner <br> to the player when the step is started</p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="gui">GUI</label>
						<i class="ti ti-chevron-right p-3"></i>
						<label class="switch">
							<input type="checkbox" id="gui" name="gui" />
							<div class="slider round"></div>
						</label>
						<i class="ti ti-question-mark p-3"></i>
						<p class="note">Toggle to enable the GUI when the step is completed</p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="title">Title</label>
						<i class="ti ti-chevron-right p-3"></i>
						<input class="hover" type="text" id="title" name="title" autocomplete="off" />
						<i class="ti ti-question-mark p-3"></i>
						<p class="note">The title that will be displayed in the GUI (if active) when the step is completed</p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="completeMessage">Message</label>
						<i class="ti ti-chevron-right p-3"></i>
						<textarea class="hover" id="completeMessage" name="completeMessage" autocomplete="off"></textarea>
						<i class="ti ti-question-mark p-3"></i>
						<p class="note">The message that will be displayed <br> in the GUI (if active) when the step is completed</p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="distance">Distance</label>
						<i class="ti ti-chevron-right p-3"></i>
						<input class="hover" type="number" id="distance" name="distance" placeholder="Type the desidered distance" autocomplete="off" onkeypress="return event.charCode >= 48 && event.charCode <= 57"/>
						<i class="ti ti-question-mark p-3"></i>
						<p class="note">The distance from the coordinates where the step will be completed</p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="itemReward">Reward Item(s)</label>
						<i class="ti ti-chevron-right p-3"></i>
						<input class="hover" type="text" id="itemReward" name="itemReward" autocomplete="off" />
						<i class="ti ti-question-mark p-3"></i>
						<p class="note">The item that will be given to the player when the step is completed</p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="removeItem">Remove Item(s)</label>
						<i class="ti ti-chevron-right p-3"></i>
						<input class="hover" type="text" id="removeItem" name="removeItem" autocomplete="off" />
						<i class="ti ti-question-mark p-3"></i>
						<p class="note">The item(s) that will be removed from <br> the player's inventory when the step is completed</p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="expReward">EXP Reward</label>
						<i class="ti ti-chevron-right p-3"></i>
						<input class="hover" type="number" id="expReward" name="expReward" autocomplete="off" onkeypress="return event.charCode >= 48 && event.charCode <= 57"/>
						<i class="ti ti-question-mark p-3"></i>
						<p class="note">The amount of EXP to reward the player with when the step is completed</p>
					</div>
					<div class="form-row">
											<i class="ti ti-chevrons-right p-3"></i>
						<label for="stepEvent">Step Event</label>
						<i class="ti ti-chevron-right p-3"></i>
						<input class="hover" type="text" id="stepEvent" name="stepEvent" autocomplete="off" />
						<i class="ti ti-question-mark p-3"></i>
						<p class="note">The event that will be triggered when the step is completed</p>
					</div>
						`;

			updateTemplate(selectedOption);
			break;
	}
};

$(document).ready(function () {
	initDefaults();
	selectedOption = $('input[name="config"]:checked').val();
	render(selectedOption);
	$('#formContainer').html(formRows);
	$('input[name="config"]').on('change', function () {
		initDefaults();
		var selectedOption = $(this).val();

		render(selectedOption);

		$('#formContainer').html(formRows);
	});
	$('#formContainer').on('input', '.form-row input, .form-row textarea', function () {
		updateCode();
	});
});

function updateTemplate(selectedOption) {
	switch (selectedOption) {
		case 'ItemsStarters':

			template = `
				["${key}"] = {
					questToStart = "${questToStart}",
					mustRemove = ${mustRemove},
				},`;
			break;

		case 'PrimaryQuest_Server':

			template = `
				["${key}"] = {
					isActive = ${isActive},
					isCompleted = ${isCompleted},
					currentStep = ${currentStep},
				},`;
			break;

		case 'PrimaryQuest':

			template = `
				["${key}"] = {
					isActive = ${isActive},
					isCompleted = ${isCompleted},
					currentStep = ${currentStep},
					quest_depend = "${quest_depend}",
					quest_unrequire = "${quest_unrequire}",
					quest_give_after = "${quest_give_after}",
					items_require = "${items_require}",
					level_require = ${level_require},
					isStopped = ${isStopped},
					label = "${label}",
					description = "${description}",
					expReward = ${expReward},
					zone = "${zone}",
					startEvent = ${startEvent},
					completedEvent = ${completedEvent},
				},`;
			break;

		case 'step':

			template = `
				{
					coords = ${coords},
					message = "${message}",
					title = "${title}",
					completeMessage = "${completeMessage}",
					distance = ${distance},
					gui = ${gui},
					itemReward = ${itemReward},
					removeItem = ${removeItem},
					expReward = ${expReward},
					stepEvent = ${stepEvent},
				},`;
			break;
	}
	generateCode(template);
}

function updateCode() {
	key = $('#key').val();
	questToStart = $('#questToStart').val();
	mustRemove = $('#mustRemove').prop('checked');

	isActive = $('#isActive').prop('checked');
	isCompleted = $('#isCompleted').prop('checked');
	currentStep = $('#currentStep').val();

	quest_depend = $('#quest_depend').val();
	quest_unrequire = $('#quest_unrequire').val();
	quest_give_after = $('#quest_give_after').val();
	items_require = $('#items_require').val();
	level_require = $('#level_require').val();
	isStopped = $('#isStopped').prop('checked');
	label = $('#label').val();
	description = $('#description').val();
	expReward = $('#expReward').val();
	zone = $('#zone').val();
	startEvent = $('#startEvent').val();
	completedEvent = $('#completedEvent').val();

	coords = $('#coords').val();
	message = $('#message').val();
	title = $('#title').val();
	completeMessage = $('#completeMessage').val();
	distance = $('#distance').val();
	gui = $('#gui').prop('checked');
	itemReward = $('#itemReward').val();
	removeItem = $('#removeItem').val();
	stepEvent = $('#stepEvent').val();

	updateTemplate($('input[name="config"]:checked').val());
}

function generateCode(template) {
	$('#output').attr('class', 'language-lua').html('<pre>' + Prism.highlight(template, Prism.languages.lua, 'lua') + '</pre>');
}

$('#copyButton').on('click', function () {
	var code = $('#output').text();
	navigator.clipboard.writeText(code);
});
