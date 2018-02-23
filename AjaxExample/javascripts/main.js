$(document).ready(function(){
	var $friendsList = $('#friends');
	var $name = $('name');
	var $occupation = $('occupation');
	console.log($friendsList);

	$.ajax({
		type: 'GET',
		url: 'http://rest.learncode.academy/api/learncode/people',
		success: function(friends) {
			console.log(friends);
			$.each(friends, function(i, friend) {
				$friendsList.append('<li> new friend</li>');
			});
		},
	});



	$('#add-friend').on('click', function() {
		var friend = {
			name: $name,
			occupation: $occupation,
		};

		$.ajax({
			type: 'POST',
			url: 'http://rest.learncode.academy/api/learncode/people',
			data: JSON.stringify({'friend':friend}),
			success: function(newFriend) {
				$friendsList.append('<li>'+ newFriend.name + 'is  a '+newFriend.occupation+'</li>');
			},
			error: function() {
				alert("error saving new friend");
			}
		});
	});	
});