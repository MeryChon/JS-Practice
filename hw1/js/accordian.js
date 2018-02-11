var createAccordian = function(accordianElem) {
	// Gets immediate next sibling(corresponding <p>) and shows it if it's hidden and vice-versa
	accordianElem.next().slideToggle(400);	
};

$(document).ready(function() {
	$("p").hide(); 
	$(".accordian").click(function() {
		createAccordian($(this));
	});
});
