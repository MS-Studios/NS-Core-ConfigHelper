/*
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * File: app.js
 * File Created: Monday, 12th February 2024 5:05:00 pm
 * Author: Nebula Studios (https://discord.gg/CsphJ7Wetz)
 *             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * The modification of this file is prohibited without explicit permission from Nebula Studios.
 * Any unauthorized modification of this file will result in support being revoked.
 *             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Last Modified: Thursday, 15th February 2024 12:04:24 am
 * Modified By: MS Studios
 *             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * License: Creative Commons Attribution Non-commercial No-derivatives 4.0 International
 * License Abbreviation: CC BY-NC-ND 4.0
 * License URL: https://creativecommons.org/licenses/by-nc-nd/4.0/
 * Copyright 2023 - 2024, Nebula Studios
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

let key = '"WARNING: NO KEY"';
let questToStart = '"WARNING: NO QUEST TO START"';
let mustRemove = false;
$('#mustRemove').prop('checked', false);
let isActive = false;
$('#isActive').prop('checked', false);
let isCompleted = false;
$('#isCompleted').prop('checked', false);
let currentStep = 0;
let quest_depend = 'nil';
let quest_unrequire = 'nil';
let quest_give_after = 'nil';
let items_require = 'nil';
let level_require = 0;
let isStopped = false;
$('#isStopped').prop('checked', false);
let label = '"WARNING: NO LABEL"';
let description = '"WARNING: NO DESCRIPTION"';
let expReward = 0;
let zone = 'nil';
$('#startingEventType').prop('checked', false);
let startEvent = '';
$('#completeEventType').prop('checked', false);
let completedEvent = '';
let coords = 'WARNING: NO COORDS';
let message = '"WARNING: NO MESSAGE"';
let title = 'nil';
let completeMessage = 'nil';
let distance = 0;
let gui = false;
$('#gui').prop('checked', false);
let itemReward = 'nil';
let removeItem = 'nil';
$('#stepEventType').prop('checked', false);
let stepEvent = 'nil';
let template = '';

function initDefaults() {
	key = '"WARNING: NO KEY"';
	questToStart = '"WARNING: NO QUEST TO START"';
	mustRemove = false;
	$('#mustRemove').prop('checked', false);
	isActive = false;
	$('#isActive').prop('checked', false);
	isCompleted = false;
	$('#isCompleted').prop('checked', false);
	currentStep = 0;
	quest_depend = 'nil';
	quest_unrequire = 'nil';
	quest_give_after = 'nil';
	items_require = 'nil';
	level_require = 0;
	isStopped = false;
	$('#isStopped').prop('checked', false);
	label = '"WARNING: NO LABEL"';
	description = '"WARNING: NO DESCRIPTION"';
	expReward = 0;
	zone = 'nil';
	$('#startingEventType').prop('checked', false);
	startEvent = '';
	$('#completeEventType').prop('checked', false);
	completedEvent = '';
	coords = 'WARNING: NO COORDS';
	message = '"WARNING: NO MESSAGE"';
	title = 'nil';
	completeMessage = 'nil';
	distance = 0;
	gui = false;
	$('#gui').prop('checked', false);
	itemReward = 'nil';
	removeItem = 'nil';
	$('#stepEventType').prop('checked', false);
	stepEvent = 'nil';
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
					<div class="input-group">
							<input class="hover" type="text" id="key" name="key" placeholder="Type the ID of the item"  autocomplete="off"/>
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">The item that will trigger the start of the Quest</p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="questToStart">Quest to start</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<input class="hover" type="text" id="questToStart" name="questToStart" placeholder="Type the ID Quest" autocomplete="off"/>
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">The quest that will be started when the item is used</p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="mustRemove">Remove item?</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<div class="d-flex flex-row align-center justify-start">
							<p class="toggle-note">No</p>
							<label class="switch">
								<input type="checkbox" id="mustRemove" name="mustRemove"/>
								<div class="slider round"></div>
							</label>
							<p class="toggle-note">Yes</p>
							</div>
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">Toggle to remove the item from the player's inventory when the quest is started</p>
							</div>
						</div>
					</div>`;

			updateTemplate(selectedOption);
			break;
		case 'PrimaryQuest':
			formRows = /*html*/ `
					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="key">Quest Name</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<input class="hover" type="text" id="key" name="key" placeholder="Type the Quest ID" autocomplete="off"/>
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">It must be unique</p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="isActive">Is enabled?</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<div class="d-flex flex-row align-center justify-start">
							<p class="toggle-note">No</p>
							<label class="switch">
								<input type="checkbox" id="isActive" name="isActive" />
								<div class="slider round"></div>
							</label>
							<p class="toggle-note">Yes</p>
							</div>
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">Toggle if the quest is available</p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="isCompleted">Is completed?</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<div class="d-flex flex-row align-center justify-start">
								<p class="toggle-note">No</p>
								<label class="switch">
									<input type="checkbox" id="isCompleted" name="isCompleted" />
									<div class="slider round"></div>
								</label>
								<p class="toggle-note">Yes</p>
							</div>
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">Toggle id the Quest is completed by default</p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="currentStep">Starting step</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<input class="hover" type="number" id="currentStep" name="currentStep" placeholder="Default is 0" value="0" autocomplete="off" onkeypress="return event.charCode >= 48 && event.charCode <= 57">
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">Starting step of the Quest</p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="quest_depend">Quest dependency</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<input class="hover" type="text" id="quest_depend" name="quest_depend" placeholder="Type the Quest ID / leave blank" autocomplete="off" />
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">The quest that must be completed before this quest can be started</p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="quest_unrequire">Quest unrequire</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<input class="hover" type="text" id="quest_unrequire" name="quest_unrequire" placeholder="Type the Quest ID / leave blank" autocomplete="off" />
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">The quest that will be unrequired after this quest is completed</p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="quest_give_after">Quest to give after</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<input class="hover" type="text" id="quest_give_after" name="quest_give_after" autocomplete="off" placeholder="Type the Quest ID / leave blank"/>
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">The quest that will be given after this quest is completed</p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="items_require">Required item</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<input class="hover" type="text" id="items_require" name="items_require" autocomplete="off" placeholder="Type the Item ID / leave blank"/>
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">The item that will be required to start the quest</p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="level_require">Level requirement</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<input class="hover" type="number" id="level_require" name="level_require" autocomplete="off" value="0" placeholder="Type 0 to set always available"/>
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">The level required to start the quest</p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="isStopped">Is stopped?</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<div class="d-flex flex-row align-center justify-start">
								<p class="toggle-note">No</p>
								<label class="switch">
									<input type="checkbox" id="isStopped" name="isStopped" />
									<div class="slider round"></div>
								</label>
								<p class="toggle-note">Yes</p>
							</div>
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">Toggle to prevent the start of the quest by default (useful if you use custom events)</p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="label">Label</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<input class="hover" type="text" id="label" name="label" autocomplete="off" placeholder="Type the Quest Name"/>
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">The name of the quest that will be visible to the players</p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="description">Description</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<textarea class="hover" id="description" name="description" autocomplete="off" placeholder="A short description of the Quest"></textarea>
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">The description of the quest that will be visible to the players in the Main Interface</p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="expReward">EXP Reward</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<input class="hover" type="number" id="expReward" name="expReward" autocomplete="off" value="0" placeholder="Type the EXP Amount" onkeypress="return event.charCode >= 48 && event.charCode <= 57"/>
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">The amount of EXP to reward the player with</p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="zone">Zone</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<input class="hover" type="text" id="zone" name="zone" autocomplete="off" />
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">The zone where the quest will be available to start<span class="bold"> | NS-Medic required</p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="eventType">Starting Event</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<div class="d-flex flex-row align-center justify-start">
								<p class="toggle-note">Server</p>
								<label class="switch">
								<input type="checkbox" id="startingEventType" name="startingEventType">
								<div class="slider round"></div>
								</label>
								<p class="toggle-note">Client</p>
							</div>
							<input class="hover" type="text" id="startEvent" name="startEvent" autocomplete="off" />
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">The event that will be triggered when the Quest is started</p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="completeEventType">Event Type</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<div class="d-flex flex-row align-center justify-start">
							<p class="toggle-note">Server</p>
							<label class="switch">
								<input type="checkbox" id="completeEventType" name="completeEventType">
								<div class="slider round"></div>
							</label>
							<p class="toggle-note">Client</p>
							</div>
							<input class="hover" type="text" id="completedEvent" name="completedEvent" autocomplete="off" />
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">The event that will be triggered when the Quest is completed</p>
							</div>
						</div>
					</div>
					`;

			updateTemplate(selectedOption);
			break;
		case 'step':
			formRows = /*html*/ `
					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="coords">Coordinates</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<input class="hover" type="text" id="coords" name="coords" placeholder="Ex. vector3(-1046.6208, 4909.0034, 209.2752)" autocomplete="off"/>
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">The coordinates where the step will be <span class="bold underline"> completed</span></p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="message">Tip</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<input class="hover" type="text" id="message" name="message" placeholder="Type a short tip on how to complete the step" autocomplete="off"/>
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">The message that will be displayed in the small UI on the top right corner to the player when the step is started</p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="gui">GUI</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<div class="d-flex flex-row align-center justify-start">
								<p class="toggle-note">No</p>
								<label class="switch">
									<input type="checkbox" id="gui" name="gui" />
									<div class="slider round"></div>
								</label>
								<p class="toggle-note">Yes</p>
							</div>
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">Toggle to enable the GUI when the step is completed</p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="title">Title</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<input class="hover" type="text" id="title" name="title" placeholder="Type a short title" autocomplete="off" />
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">The title that will be displayed in the GUI (if active) when the step is completed</p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="completeMessage">Message</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<textarea class="hover" id="completeMessage" name="completeMessage" placeholder="Type the text you want to show when the step is completed" autocomplete="off"></textarea>
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">The message that will be displayed in the GUI (if active) when the step is completed</p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="distance">Distance</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<input class="hover" type="number" id="distance" name="distance" placeholder="Type the desidered distance" autocomplete="off" onkeypress="return event.charCode >= 48 && event.charCode <= 57"/>
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">The distance from the coordinates where the step will be completed</p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="itemReward">Reward Item(s)</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<input class="hover" type="text" id="itemReward" name="itemReward" autocomplete="off" />
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">The item that will be given to the player when the step is completed</p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="removeItem">Remove Item(s)</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<input class="hover" type="text" id="removeItem" name="removeItem" autocomplete="off" />
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">The item(s) that will be removed from the player's inventory when the step is completed</p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="expReward">EXP Reward</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<input class="hover" type="number" id="expReward" name="expReward" autocomplete="off" onkeypress="return event.charCode >= 48 && event.charCode <= 57"/>
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">The amount of EXP to reward the player with when the step is completed</p>
							</div>
						</div>
					</div>

					<div class="divider"></div>

					<div class="form-row">
						<i class="ti ti-chevrons-right p-3"></i>
						<label for="stepEvent">Step Event</label>
						<i class="ti ti-chevron-right p-3"></i>
						<div class="input-group">
							<div class="d-flex flex-row align-center justify-start">
								<p class="toggle-note">Server</p>
								<label class="switch">
									<input type="checkbox" id="stepEventType" name="stepEventType">
									<div class="slider round"></div>
								</label>
								<p class="toggle-note">Client</p>
							</div>
							<input class="hover" type="text" id="stepEvent" name="stepEvent" autocomplete="off" />
							<div class="input-group-append">
								<i class="ti ti-question-mark"></i>
								<p class="note">The event that will be triggered when the step is completed</p>
							</div>
						</div>
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
				[${key}] = {
					questToStart = ${questToStart},
					mustRemove = ${mustRemove},
				},`;
			break;

		case 'PrimaryQuest':

			let startingEventType = $('#startingEventType').prop('checked') ? 'client' : 'server';
			let completedEventType = $('#completeEventType').prop('checked') ? 'client' : 'server';

			if ((startEvent === 'nil' || startEvent === '') && (completedEvent === 'nil' || completedEvent === '')) {
				template = `
				[${key}] = {
					isActive = ${isActive},
					isCompleted = ${isCompleted},
					currentStep = ${currentStep},
					quest_depend = ${quest_depend},
					quest_unrequire = ${quest_unrequire},
					quest_give_after = ${quest_give_after},
					items_require = ${items_require},
					level_require = ${level_require},
					isStopped = ${isStopped},
					label = ${label},
					description = ${description},
					expReward = ${expReward},
					zone = ${zone},
					startEvent = nil,
					completedEvent = nil,
				},`;
			} else if (completedEvent === 'nil' || completedEvent === '') {
				template = `
				[${key}] = {
					isActive = ${isActive},
					isCompleted = ${isCompleted},
					currentStep = ${currentStep},
					quest_depend = ${quest_depend},
					quest_unrequire = ${quest_unrequire},
					quest_give_after = ${quest_give_after},
					items_require = ${items_require},
					level_require = ${level_require},
					isStopped = ${isStopped},
					label = ${label},
					description = ${description},
					expReward = ${expReward},
					zone = ${zone},
					startEvent = {
						type = "${startingEventType}",
						eventName = ${startEvent},
					},
					completedEvent = nil,
				},`;

			} else if (startEvent === 'nil' || startEvent === '') {
				template = `
				[${key}] = {
					isActive = ${isActive},
					isCompleted = ${isCompleted},
					currentStep = ${currentStep},
					quest_depend = ${quest_depend},
					quest_unrequire = ${quest_unrequire},
					quest_give_after = ${quest_give_after},
					items_require = ${items_require},
					level_require = ${level_require},
					isStopped = ${isStopped},
					label = ${label},
					description = ${description},
					expReward = ${expReward},
					zone = ${zone},
					startEvent = nil,
					completedEvent = {
						type = "${completedEventType}",
						eventName = ${completedEvent},
					},
				},`;
			} else {

				template = `
					[${key}] = {
						isActive = ${isActive},
						isCompleted = ${isCompleted},
						currentStep = ${currentStep},
						quest_depend = ${quest_depend},
						quest_unrequire = ${quest_unrequire},
						quest_give_after = ${quest_give_after},
						items_require = ${items_require},
						level_require = ${level_require},
						isStopped = ${isStopped},
						label = ${label},
						description = ${description},
						expReward = ${expReward},
						zone = ${zone},
						startEvent = {
							type = "${startingEventType}",
							eventName = ${startEvent},
						},
						completedEvent = {
							type = "${completedEventType}",
							eventName = ${completedEvent},
						},
					},`;
			}
			break;

		case 'step':

			let stepEventType = $('#stepEventType').prop('checked') ? 'client' : 'server';
			if (stepEvent === 'nil' || stepEvent === '') {
				template = `
				{
					coords = ${coords},
					message = ${message},
					title = ${title},
					completeMessage = ${completeMessage},
					distance = ${distance},
					gui = ${gui},
					itemReward = ${itemReward},
					removeItem = ${removeItem},
					expReward = ${expReward},
					stepEvent = nil,
				},`;
			} else {
				template = `
					{
						coords = ${coords},
						message = ${message},
						title = ${title},
						completeMessage = ${completeMessage},
						distance = ${distance},
						gui = ${gui},
						itemReward = ${itemReward},
						removeItem = ${removeItem},
						expReward = ${expReward},
						stepEvent = {
							type = "${stepEventType}",
							eventName = ${stepEvent},
						}
					},`;
			}
			break;
	}
	generateCode(template);
}

function updateCode() {
	key = $('#key').val() ? `"${$('#key').val()}"` : '"WARNING: NO KEY"';
	questToStart = $('#questToStart').val() ? `"${$('#questToStart').val()}"` : 'nil';
	mustRemove = $('#mustRemove').prop('checked');

	isActive = $('#isActive').prop('checked');
	isCompleted = $('#isCompleted').prop('checked');
	currentStep = $('#currentStep').val() || 0;
	quest_depend = $('#quest_depend').val() ? `"${$('#quest_depend').val()}"` : 'nil';
	quest_unrequire = $('#quest_unrequire').val() ? `"${$('#quest_unrequire').val()}"` : 'nil';
	quest_give_after = $('#quest_give_after').val() ? `"${$('#quest_give_after').val()}"` : 'nil';
	items_require = $('#items_require').val() ? `"${$('#items_require').val()}"` : 'nil';
	level_require = $('#level_require').val() || 0;
	isStopped = $('#isStopped').prop('checked');
	label = $('#label').val() ? `"${$('#label').val()}"` : '"WARNING: NO LABEL"';
	description = $('#description').val() ? `"${$('#description').val()}"` : '"WARNING: NO DESCRIPTION"';
	expReward = $('#expReward').val() || 0;
	zone = $('#zone').val() ? `"${$('#zone').val()}"` : 'nil';
	startingEventType = $('#startingEventType').prop('checked') ? '"client"' : '"server"';
	startEvent = $('#startEvent').val() ? `"${$('#startEvent').val()}"` : 'nil';
	completedEventType = $('#completeEventType').prop('checked') ? '"client"' : '"server"';
	completedEvent = $('#completedEvent').val() ? `"${$('#completedEvent').val()}"` : 'nil';

	coords = $('#coords').val() ? `"${$('#coords').val()}"` : '"WARNING: NO COORDS"';
	message = $('#message').val() ? `"${$('#message').val()}"` : '"WARNING: NO MESSAGE"';
	title = $('#title').val() ? `"${$('#title').val()}"` : 'nil';
	completeMessage = $('#completeMessage').val() ? `"${$('#completeMessage').val()}"` : 'nil';
	distance = $('#distance').val() || 0;
	gui = $('#gui').prop('checked');
	itemReward = $('#itemReward').val() ? `"${$('#itemReward').val()}"` : 'nil';
	removeItem = $('#removeItem').val() ? `"${$('#removeItem').val()}"` : 'nil';
	stepEventType = $('#stepEventType').prop('checked') ? '"client"' : '"server"';
	stepEvent = $('#stepEvent').val() ? `"${$('#stepEvent').val()}"` : 'nil';

	updateTemplate($('input[name="config"]:checked').val());
}

function generateCode(template) {
	$('#output').attr('class', 'language-lua').html('<pre>' + Prism.highlight(template, Prism.languages.lua, 'lua') + '</pre>');
}

$('#copyButton').on('click', function () {
	var code = $('#output').text();
	navigator.clipboard.writeText(code);
});
