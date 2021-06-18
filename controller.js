/**
* Author: Edwin Cheah
* Target: lifx.html
* Purpose: lifx js fetch based controller
* Credits: LIFX API
*/
"use strict";

var token = "Insert LIFX authentication token here"; //User Authentication Token to connect to your LIFX account

/**
 * Used to set values to send to the api
 */
function setNSendValues(){
	// Variables
	var intensity_slider = document.getElementById("intensity");
	var intensity_text = document.getElementById("intensity_text");
	
	var duration_slider = document.getElementById("duration");
	var duration_text = document.getElementById("duration_text");

	//converts value to 2 decimal places for script to process
	var intensity_decimal = intensity_slider.value/100;

	//RBG value variables
	var red = document.getElementById("red").value;
	var green = document.getElementById("green").value;
	var blue = document.getElementById("blue").value;

	//Sets values on HTML document
	intensity_text.innerText = intensity_slider.value;

	red_text.innerText = red;
	green_text.innerText = green;
	blue_text.innerText = blue;

	duration_text.innerText = duration_slider.value;

	connectToApi(intensity_decimal, duration_slider, red, green, blue); //calls the method to actually send the new values to the LIFX API

}

/**
 * This method is used to connected to the LIFX API and take various lighting parameters to send to the LIFX API to modify the light's state.
 * @param {*} intensity_decimal 
 * @param {*} duration_slider 
 * @param {*} red 
 * @param {*} green 
 * @param {*} blue 
 */
function connectToApi(intensity_decimal, duration_slider, red, green, blue){
	fetch("https://api.lifx.com/v1/lights/all/state", { //To connect to LIFX API
		method: 'PUT', 
		headers: { 
			"content-type" : "application/json", 
			"authorization" : 'Bearer ' + token
			}, 
		body: JSON.stringify({ 
			brightness: intensity_decimal,
			duration: duration_slider.value,
			color: "rgb:"+red+","+green+","+blue,
			hue: "0",
			}) 
		}
	);
}

/**
 * Initalizes all document attributes and elements and setsup the event listeners
 */
function init () {
	var duration_slider = document.getElementById("duration");
	var duration_text = document.getElementById("duration_text");

	var intensity_slider = document.getElementById("intensity");// link the variable to the HTML element
	var intensity_text = document.getElementById("intensity_text");

	var red = document.getElementById("red");
	var green = document.getElementById("green");
	var blue = document.getElementById("blue");

	var red_text = document.getElementById("red_text");
	var green_text = document.getElementById("green_text");
	var blue_text = document.getElementById("blue_text");

	/* assigns functions to corresponding event listeners */
	duration_slider.onchange = setNSendValues;
	intensity_slider.onchange = setNSendValues;          
	red.onchange = setNSendValues;
	green.onchange = setNSendValues;
	blue.onchange = setNSendValues;


	intensity_text.innerText = intensity_slider.value;
	duration_text.innerText = duration_slider.value;
	red_text.innerText = red.value;
	green_text.innerText = green.value;
	blue_text.innerText = blue.value;
 }

window.onload = init;
