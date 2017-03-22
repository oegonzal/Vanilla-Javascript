  /***Global Variables***/
  var myDataRef = new Firebase('https://jjb750uy9yj.firebaseio-demo.com/habits/');
	var uploadImageFlag = 0;

  function selectImage(name) {
    //Clear all the other effects
    document.getElementById('icon1').style.border = "none";
    document.getElementById('icon2').style.border = "none";
    document.getElementById('icon3').style.border = "none";
	document.getElementById('icon4').style.border = "none";
	uploadImageFlag = 0;
    var image = document.getElementById(name);
    image.style.border = "5px solid #42A5F5";

    var srcArray = image.src.split('/');
    var src = srcArray[srcArray.length - 1]

    //save current selected icon
    selectedIcon = src;
  }

    function uploadImage()
    {
        $('#file-upload').trigger('click');
		uploadImageFlag = 1;
		
        //document.getElementById("icon4").src = e.target.result;
        //alert("wokred");
    }

    
  $('#save').click(function(event) {

    //Get element information
    var name = $('#title').val();
    var text = $('#others').val();

    /*
     * Title Check
     */
    if (name == ''){
      title_ex.style.display = 'block';
      title_text.style.color = 'red';
      return;   
    }
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var daysOfWeek = {};
    var checkedValues = document.getElementsByName('dayOfTheWeek');
    var times = 0;
    for(var i=0, n=checkedValues.length; i<n ; i++)
    {
      if(checkedValues[i].checked)
      {
        daysOfWeek[days[i]] = 'yes';
        times++;
      }
      else
      {
        daysOfWeek[days[i]] = 'no';
      }
    }

    /*
     * Week Check
     */

    if (times == 0){
        weekly_ex.style.display = 'block';
        weekly_freq.style.color = 'red';
        return;
    }
    var frequencyPerDay = $('input[name=frequencyPerDay]:checked').val();

    var habitNameInput = document.getElementById('title').value;
    var habitOtherInput = document.getElementById('others').value;      
    habitOtherInput = Number(habitOtherInput);
	  
	if(uploadImageFlag)
		{
			selectedIcon = document.getElementById('icon4').src;
		}
	  else
	  {
		  selectedIcon = '../img/' + selectedIcon;
	  }
      
    /* notification variable */ 

    var notiHour = document.getElementById("notificationHours").value;
    var notiMin = document.getElementById("notificationMins").value;



      
    /*************************/

    /*
     * Notification check
     */
    if (notiHour == ''){
        hour_min_ex.style.display = 'block';
        hour_min_ex.style.color = 'red';
        hour_val.style.color = 'red';
        return;
    }
        
    if (notiMin == ''){
        hour_min_ex.style.display = 'block';
        hour_min_ex.style.color = 'red';
        min_val.style.color = 'red';
        return; 
    }
        
      

    /*
     * Daily Check
     */
    if ((habitOtherInput != '') && (frequencyPerDay != undefined)){
                    daily_oops.style.display = 'block';
                    daily_oops.style.display = 'red';
                    daily_ex.style.display = 'block';
                    daily_freq.style.color = 'red';
                    return;
                }

    if (habitOtherInput == '') {
      if (frequencyPerDay == undefined){
      daily_ex.style.display = 'block';
      daily_freq.style.color = 'red';
      return;
      }
    }

    if ((frequencyPerDay == undefined) && (habitOtherInput < 1)){
      daily_ex.style.display = 'block';
      daily_freq.style.color = 'red';
      return;
    }
      
    if ((frequencyPerDay == undefined) && (isNaN(habitOtherInput))){
      daily_ex.style.display = 'block';
      daily_freq.style.color = 'red';
      return;
    }
       
    if (frequencyPerDay == undefined)
      frequencyPerDay = habitOtherInput;

    var currentTime = Date.now();
    if (!Date.now) {
      Date.now = function() { return new Date().getTime(); }
    }

    if(/[^a-zA-Z0-9_\-\ /]/.test( habitOtherInput ))
    {
      alert('Input must be alphanumeric. Please remove non-alphanumeric symbols to continue.');
    }
    else if(/[^a-zA-Z0-9\-\ /]/.test( habitNameInput ))
    {
      alert('Input must be alphanumeric. Please remove non-alphanumeric symbols to continue.');
    }
    else
    {
      //make firebase object and push it to DB
      myDataRef.push({
        habitData: {
          name: name, 
          text: text, 
          'iconId': selectedIcon,
          daysOfWeek: daysOfWeek,
          frequencyPerDay: frequencyPerDay,
          'settings': {
            'turnoff': '0', 
            'sleep':'0',
            'pause':'0'
          },
          'habitProgress':{	
            'counter': '0', 
            'maxRecord':'1'
          }, 
          'timestamp': currentTime,
          'notiTime':{
            notiHour: notiHour,
            notiMins: notiMin
          }
        }
      });

      document.location='list.html';
    } 
  }); 

  $(document).ready(function() {
      //event.preventDefault(); //prevent submit: for testing purposes
      //alert("End.");
  });