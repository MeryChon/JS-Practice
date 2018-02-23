$.ajax({
  type: 'PUT',
  data: {name: 'Billy Bob', age: 28},
  url: 'http://rest.learncode.academy/api/johnbob/friends/1',
  success: function() {
    //no data...just a success (200) status code
    console.log('Friend Updated Successfully!');
  }
});