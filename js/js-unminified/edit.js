 //Method splits URL and makes list of given paramaters and id values
            var QueryString = function() {
                  // This function is anonymous, is executed immediately and
                  // the return value is assigned to QueryString!
                  var query_string = {};
                  var query = window.location.search.substring(1);
                  var vars = query.split("&");
                  for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
                        // If first entry with this name
                    if (typeof query_string[pair[0]] === "undefined") {
                      query_string[pair[0]] = decodeURIComponent(pair[1]);
                        // If second entry with this name
                    } else if (typeof query_string[pair[0]] === "string") {
                      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
                      query_string[pair[0]] = arr;
                        // If third or later entry with this name
                    } else {
                      query_string[pair[0]].push(decodeURIComponent(pair[1]));
                    }
                  }
                    return query_string;
            }();
            
			//getting ID of habit to retrieve data
            var habitId = window.location.search.substring(1);
            var myDataRef = new Firebase('https://jjb750uy9yj.firebaseio-demo.com/habits/'+habitId+'/');
            var selectedIcon;
			
			function selectImage(name) {
				//Clear all the other effects
				document.getElementById('icon1').style.border = "none";
				document.getElementById('icon2').style.border = "none";
				document.getElementById('icon3').style.border = "none";
                document.getElementById('icon4').style.border = "none";
				var image = document.getElementById(name);
				image.style.border = "5px solid #42A5F5";
                
                var srcArray = image.src.split('/');
                var src = srcArray[srcArray.length - 1]
                
                //save current selected icon
                selectedIcon = src;
			}
            
            function displayHabit(name, iconId, daysOfWeek, frequencyPerDay, text, notiHour, notiMin) {
                //alert(JSON.stringify(daysOfWeek));
                var icons = {'../img/sleep.jpg':'icon1', '../img/salad.jpg':'icon2','../img/run.jpg':'icon3', '../img/add.png':'icon4', }
                
                $('#edit-form').append(
                    
    '<p><label><span id=\"title_text\"><i style=\"display:none\" id=\"title_ex\" class=\"fa fa-exclamation\"></i>Habit Title</span></label></p>' +
    '<p><input id=\"title\" type=\"text\" name=\"fullname\" value=\"'+name+'\" maxlength="27"></p>' +
    '<p><label>Habit Icon</label></p>' +
    '<img id=\"icon1\" class=\"icon\" onclick=\"selectImage(\'icon1\');\" src=\"../img/sleep.jpg\" alt=\"sleep image\"/>' +
    '<img id=\"icon2\" class=\"icon\" onclick=\"selectImage(\'icon2\');\" src=\"../img/salad.jpg\" alt=\"eat image\"/>' +
    '<img id=\"icon3\" class=\"icon\" onclick=\"selectImage(\'icon3\');\" src=\"../img/run.jpg\" alt=\"run image\"/>' +
    '<img id=\"icon4\" class=\"icon\" src=\"../img/add.png\" alt=\"find a image\"/>' +
    '<p id=\"weekly_freq\"><label><i style=\"display:none\" id=\"weekly_ex\" class=\"fa fa-exclamation\"></i>Weekly Frequency</label></p>' +
    '<div id=\"ck-button\">' +
        '<label> <input type=\"checkbox\" name=\"dayOfTheWeek\" value=\"sunday\" '+daysOfWeek.Sunday+'><span>Sun</span></label>' +
        '<label> <input type=\"checkbox\" name=\"dayOfTheWeek\" value=\"monday\" '+daysOfWeek.Monday+'><span>Mon</span></label>' +
        '<label> <input type=\"checkbox\" name=\"dayOfTheWeek\" value=\"tuesday\" '+daysOfWeek.Tuesday+'><span>Tues</span></label>' +
        '<label> <input type=\"checkbox\" name=\"dayOfTheWeek\" value=\"wednesday\" '+daysOfWeek.Wednesday+'><span>Wed</span></label>' +
        '<label> <input type=\"checkbox\" name=\"dayOfTheWeek\" value=\"thursday\" '+daysOfWeek.Thursday+'><span>Thur</span></label>' +
        '<label> <input type=\"checkbox\" name=\"dayOfTheWeek\" value=\"friday\" '+daysOfWeek.Friday+'><span>Fri</span></label>' +
        '<label> <input type=\"checkbox\" name=\"dayOfTheWeek\" value=\"saturday\" '+daysOfWeek.Saturday+'><span>Sat</span></label>' +
    '</div>' +

    '<p><label>Daily Frequency</label></p>' +
    '<div id=\"daily-button\">' +
        '<label> <input type=\"radio\" name=\"frequencyPerDay\" value=\"1\"><span>1</span></label>' +
                        '<label> <input type=\"radio\" name=\"frequencyPerDay\" value=\"2\"><span>2</span></label>' +
                        '<label> <input type=\"radio\" name=\"frequencyPerDay\" value=\"3\"><span>3</span></label>' +
        '<span id=\"times\">times</span>' +
    '</div>' +
    '<p><label><span id=\"others_text\">Others: </span><input id=\"others\" type=\"text\" name=\"day\" value=\"'+text+'\"></label></p>' +

                  
   '<div><p><label>'+
      '<div id=\"hour_min_ex\" style=\"display:none\" ><i class=\"fa fa-exclamation\"></i></div>' +
      '<span id=\"noti_text\">Notification Interval: </span>'+
      '<input id=\"notificationHours\" type=\"number\" maxlength=\"2\" onchange=\"isNumberInHour(this)\" value=\"'+notiHour+'\">'+
      '<span class=\"noti_hr_min\" id="hour_val">hours</span>'+
      '<input id=\"notificationMins\" type=\"number\" maxlength=\"2\" onchange=\"isNumberInMin(this)\" value=\"'+notiMin+'\" >'+
      '<span class=\"noti_hr_min\" id="min_val">minutes</span>'+
    '</label></p></div>'+     
   '<p id=\"save_p\"><input id=\"save\" type=\"button\" value=\"Save It\" onClick="editOverlay()\"></p>'    
                );
                //Select Icon
                document.getElementById(icons[iconId]).style.border="5px solid #42A5F5";
                
                //Select Radio Button
                $('input[name=frequencyPerDay][value='+frequencyPerDay+']').attr('checked', 'checked');
            };
            
           $(document).on('click', '#editConfirmed', function(event) {

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
               
                //var daysOfWeek = {'Monday':'0', 'Tuesday':'0','Wednesday':'0', 'Thursday':'0', 'Friday':'0', 'Saturday':'0', 'Sunday':'0'};
                var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                
                var daysOfWeek = {};
                var checkedValues = document.getElementsByName('dayOfTheWeek');
                var times = 0;
                
                editOverlay();
                
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
                
               var habitDataRef = myDataRef.child('habitData');

               var habitNameInput = document.getElementById('title').value;
               var habitOtherInput = document.getElementById('others').value;
               habitOtherInput = Number(habitOtherInput);
             /* notification variable */

               var notiHour = document.getElementById("notificationHours").value;
               var notiMin = document.getElementById("notificationMins").value;
			   alert(notiHour);
			   alert(notiMin);
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
                   //Update habit
                  habitDataRef.update({
                    name: name,
                    text: text,
                    'iconId': selectedIcon,
                    daysOfWeek: daysOfWeek,
                    frequencyPerDay: frequencyPerDay,
                    'notiTime':{
                      notiHour: notiHour,
                      notiMins: notiMin
                    }
                  });
                   
                    document.location='list.html';
               }
            });
            
			var i = 0;
            $(document).ready(function() {
                //fired upon child added to
                myDataRef.on('child_added', function(snapshot) {
                    
                    //data is returned as JSON array of all habit information
                    var data = snapshot.val();
                    selectedIcon = data.iconId;
					//alert(JSON.stringify(data.habitData.notiTime));
					//alert(JSON.stringify(data.notiTime));;
					
                    //alert(JSON.stringify(data.daysOfWeek));
                    
                    var daysOfWeekStates= {};
                    for(var k in data.daysOfWeek)
                    {
                        if(data.daysOfWeek[k] == "yes")
                            {
                                daysOfWeekStates[k] = "checked";
                            }
                        else
                            daysOfWeekStates[k] = "";
                    }
                    //alert(JSON.stringify(daysOfWeekStates));
					
					//var notiRef = new Firebase('https://jjb750uy9yj.firebaseio-demo.com/habits/'+habitId+'/');
					//habitProgressRef.transaction(function(currentData)
            		//{
						
					//if(data.habitData.notiTime != null)
					//{
					displayHabit(data.name, data.iconId, daysOfWeekStates, data.frequencyPerDay, data.text, data.notiTime.notiHour, data.notiTime.notiMins);
                    //displayHabit(data.habitData.name, data.habitData.iconId, daysOfWeekStates, data.habitData.frequencyPerDay, data.habitData.text, data.habitData.notiTime.notiHour, data.habitData.notiTime.notiMins);
					//}
                });
            });
            
  function editOverlay() {
  	var el = document.getElementById("editOverlay");
    var la = document.getElementById("overlay");
    la.style.visibility = (la.style.visibility == "visible") ? "hidden" : "visible";
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }
          
  function isNumberInHour(input){
      if( input.value < 0) input.value = 0;
      if( input.value > 23) input.value = 23;
  }

  function isNumberInMin(input){
      if( input.value < 0) input.value = 0;
      if( input.value > 59) input.value = 59;
  }