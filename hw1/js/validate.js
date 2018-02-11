var validateField = function(fieldElem, infoMessage, validateFn) {
	var spanId = "infomessage"+fieldElem.attr('id');
	var infoMessageElem = $("<span id='"+ spanId + "'></span>");
	fieldElem.after(infoMessageElem);
	var messageField = $("#"+spanId);
	messageField.hide();

	fieldElem.focusin(function(){
		messageField.removeClass("ok error").addClass("info").text(infoMessage).show();
	});

	fieldElem.blur(function() {
		var inputText = fieldElem.val();
		if(inputText.length == 0) {
			messageField.hide();
		} else {
			if(validateFn(inputText, fieldElem.attr('id'))) {
				messageField.removeClass("info error").addClass("ok");
				messageField.text("OK");
			} else {
				messageField.removeClass("ok info").addClass("error");
				messageField.text("Error");
			}
		}
	});
};



var validateInput = function(value, inputType) {
	var result;
	if(inputType == "username") {
		//Username field must contain only alphabetical or numeric characters;
		var alphanumericCharacters = /^[0-9a-zA-Z]+$/;
		result = value.match(alphanumericCharacters);
	} else if(inputType == "password") {
		//The password field should be at least 8 characters long.
		result = value.length >= 8;
	} else {
		//Email should match specific regex(copied from http://emailregex.com) e.g user@bla.com
		var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		result = value.match(emailPattern);
	}	
	return result;
};


$(document).ready(function() {
	var restrictionMessages = {
		"username":"Username must contain only alphabetical or numeric characters.",
		"password": "The password should be at least 8 characters long.",
		"email": "The email address should be like user@somewhere.com."
	};
	var inputs = $(".signup").find("input");
	inputs.each(function() {
		validateField($(this), restrictionMessages[$(this).attr("id")], validateInput);
	});
});
