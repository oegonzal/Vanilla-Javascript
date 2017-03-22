var spinner = new Spinner({color: '#ddd'});
var firebaseRef = 'https://jjb750uy9yj.firebaseio-demo.com/';
var selectedIcon = 'sleep.jpg';//start with add-icon picture, by default

function handleFileSelect(evt) {
  var f = evt.target.files[0];
  var reader = new FileReader();
  reader.onload = (function(theFile) {
    return function(e) {
      var filePayload = e.target.result;
      // Generate a location that can't be guessed using the file's contents and a random number
      var hash = CryptoJS.SHA256(Math.random() + CryptoJS.SHA256(filePayload));
      var f = new Firebase(firebaseRef + 'images/' + hash + '/filePayload');
      spinner.spin(document.getElementById('spin'));
      // Set the file payload to Firebase and register an onComplete handler to stop the spinner and show the preview

		//alert(JSON.stringify(filePayload));
		//f.set(filePayload);
		//selectImage('icon4');
      f.set(filePayload, function() { 
        spinner.stop();
          
          //shows image
        document.getElementById("icon4").src = e.target.result;
		  selectedIcon = e.target.result;
          //alert(document.getElementById("pano").src); //copy link to img tag src attributes to access the img
        $('#file-upload').hide();
        // Update the location bar so the URL can be shared with others
        window.location.hash = hash;
      });
    };
  })(f);
  reader.readAsDataURL(f);
}

$(function() {
  $('#spin').append(spinner);
  //$('#file-upload').hide();
    
  var idx = window.location.href.indexOf('#');
  var hash = (idx > 0) ? window.location.href.slice(idx + 1) : '';
  if (hash === '') {
    // No hash found, so render the file upload button.
    $('#file-upload').show();
    document.getElementById("file-upload").addEventListener('change', handleFileSelect, false);
      //alert("Testing.");
  } else {
    // A hash was passed in, so let's retrieve and render it.
    spinner.spin(document.getElementById('spin'));
    var f = new Firebase(firebaseRef + hash + '/filePayload');
    f.once('value', function(snap) {
      var payload = snap.val();
      if (payload != null) {
        document.getElementById("pano").src = payload;
          //alert(document.getElementById("pano").src);
          //alert("Testing.");
      } else {
        $('#body').append("Not found");
      }
      spinner.stop();
    });
  }
});