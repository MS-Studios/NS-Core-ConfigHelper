/*
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * File: app.js
 * File Created: Monday, 12th February 2024 5:05:00 pm
 * Author: Nebula Studios (https://discord.gg/CsphJ7Wetz)
 *             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * The modification of this file is prohibited without explicit permission from Nebula Studios.
 * Any unauthorized modification of this file will result in support being revoked.
 *             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Last Modified: Tuesday, 13th February 2024 1:19:46 pm
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
						<label for="key">Item Name:</label>
						<input class="hover" type="text" id="key" name="key" placeholder="Type the spawn ID of the item"  autocomplete="off"/>
					</div>
					<div class="form-row">
						<label for="questToStart">Quest to start:</label>
						<input class="hover" type="text" id="questToStart" name="questToStart" placeholder="Type the ID Quest" autocomplete="off"/>
					</div>
					<div class="form-row">
						<label for="mustRemove">Remove item?</label>
						<label class="switch">
							<input type="checkbox" id="mustRemove" name="mustRemove"/>
							<div class="slider round"></div>
						</label>
					</div>`;

			updateTemplate(selectedOption);
			break;

		case 'PrimaryQuest_Server':
			formRows = /*html*/`
					<div class="form-row">
						<label for="key">Quest Name:</label>
						<input class="hover" type="text" id="key" name="key" placeholder="Type the ID Quest" autocomplete="off"/>
					</div>
					<div class="form-row">
						<label for="isActive">Is active?</label>
						<label class="switch">
							<input type="checkbox" id="isActive" name="isActive"/>
							<div class="slider round"></div>
						</label>
					</div>
					<div class="form-row">
						<label for="isCompleted">Is completed?</label>
						<label class="switch">
							<input type="checkbox" id="isCompleted" name="isCompleted"/>
							<div class="slider round"></div>
						</label>
					</div>
					<div class="form-row">
						<label for="currentStep">Current step:</label>
						<input class="hover" type="number" id="currentStep" name="currentStep" autocomplete="off"/>
					</div>`;
			updateTemplate(selectedOption);
			break;
		case 'PrimaryQuest':
			formRows = /*html*/ `
					<div class="form-row">
						<label for="key">Quest Name:</label>
						<input class="hover" type="text" id="key" name="key" placeholder="Type the ID Quest" autocomplete="off"/>
					</div>
					<div class="form-row">
						<label for="isActive">Is the quest active?</label>
						<label class="switch">
							<input type="checkbox" id="isActive" name="isActive" />
							<div class="slider round"></div>
						</label>
					</div>
					<div class="form-row">
						<label for="isCompleted">Is the quest completed?</label>
						<label class="switch">
							<input type="checkbox" id="isCompleted" name="isCompleted" />
							<div class="slider round"></div>
						</label>
					</div>
					<div class="form-row">
						<label for="currentStep">Current step:</label>
						<input class="hover" type="number" id="currentStep" name="currentStep" autocomplete="off"/>
					</div>
					<div class="form-row">
						<label for="quest_depend">Quest dependency</label>
						<input class="hover" type="text" id="quest_depend" name="quest_depend" autocomplete="off" />
					</div>
					<div class="form-row">
						<label for="quest_unrequire">Quest unrequire</label>
						<input class="hover" type="text" id="quest_unrequire" name="quest_unrequire" autocomplete="off" />
					</div>
					<div class="form-row">
						<label for="quest_give_after">Quest to give after</label>
						<input class="hover" type="text" id="quest_give_after" name="quest_give_after" autocomplete="off" />
					</div>
					<div class="form-row">
						<label for="items_require">Required item:</label>
						<input class="hover" type="text" id="items_require" name="items_require" autocomplete="off" />
					</div>
					<div class="form-row">
						<label for="level_require">Level requirement</label>
						<input class="hover" type="number" id="level_require" name="level_require" autocomplete="off" />
					</div>
					<div class="form-row">
						<label for="isStopped">Is </label>
						<label class="switch">
							<input type="checkbox" id="isStopped" name="isStopped" />
							<div class="slider round"></div>
						</label>
					</div>
					<div class="form-row">
						<label for="label">label:</label>
						<input class="hover" type="text" id="label" name="label" autocomplete="off" />
					</div>
					<div class="form-row">
						<label for="description">description:</label>
						<textarea class="hover" id="description" name="description" autocomplete="off"></textarea>
					</div>
					<div class="form-row">
						<label for="expReward">expReward:</label>
						<input class="hover" type="number" id="expReward" name="expReward" autocomplete="off" />
					</div>
					<div class="form-row">
						<label for="zone">zone:</label>
						<input class="hover" type="text" id="zone" name="zone" autocomplete="off" />
					</div>
					<div class="form-row">
						<label for="startEvent">startEvent:</label>
						<input class="hover" type="text" id="startEvent" name="startEvent" autocomplete="off" />
					</div>
					<div class="form-row">
						<label for="completedEvent">completedEvent:</label>
						<input class="hover" type="text" id="completedEvent" name="completedEvent" autocomplete="off" />
					</div>`;

			updateTemplate(selectedOption);
			break;
		case 'step':
			formRows = /*html*/ `
					<div class="form-row">
						<label for="coords">coords:</label>
						<input class="hover" type="text" id="coords" name="coords" placeholder="Enter coordinates" autocomplete="off"/>
					</div>
					<div class="form-row">
						<label for="message">message:</label>
						<textarea class="hover" id="message" name="message" autocomplete="off"></textarea>
					</div>
					<div class="form-row">
						<label for="title">title:</label>
						<input class="hover" type="text" id="title" name="title" autocomplete="off" />
					</div>
					<div class="form-row">
						<label for="completeMessage">completeMessage:</label>
						<textarea class="hover" id="completeMessage" name="completeMessage" autocomplete="off"></textarea>
					</div>
					<div class="form-row">
						<label for="distance">distance:</label>
						<input class="hover" type="number" id="distance" name="distance" autocomplete="off" />
					</div>
					<div class="form-row">
						<label for="gui">gui:</label>
						<label class="switch">
							<input type="checkbox" id="gui" name="gui" />
							<div class="slider round"></div>
						</label>
					</div>
					<div class="form-row">
						<label for="itemReward">itemReward:</label>
						<input class="hover" type="text" id="itemReward" name="itemReward" autocomplete="off" />
					</div>
					<div class="form-row">
						<label for="removeItem">removeItem:</label>
						<input class="hover" type="text" id="removeItem" name="removeItem" autocomplete="off" />
					</div>
					<div class="form-row">
						<label for="expReward">expReward:</label>
						<input class="hover" type="number" id="expReward" name="expReward" autocomplete="off" />
					</div>
					<div class="form-row">
						<label for="stepEvent">stepEvent:</label>
						<input class="hover" type="text" id="stepEvent" name="stepEvent" autocomplete="off" />
					</div>
						`;

			updateTemplate(selectedOption);
			break;
	}
	$('#formContainer').html(formRows);
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
