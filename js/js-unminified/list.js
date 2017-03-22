        /*******Global variables**************/
        //reference to firebase
        var myDataRef = new Firebase('https://jjb750uy9yj.firebaseio-demo.com/habits/');
        var progressData;

        function httpGet(theUrl)
        {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
            xmlHttp.send( null );
            return xmlHttp.responseText;
        }

        function showMsg(element){
            var msgElement = (element.parentNode.parentNode.getElementsByClassName("message"))[0];

            var values = (msgElement.getElementsByTagName("strong"));
            var meter = (msgElement.getElementsByTagName("meter"));



            //Update the counter for the progress bar
            var habitKey = element.parentElement.parentElement.id;

            //alert('fadfa');
            //var respond = httpGet('https://jjb750uy9yj.firebaseio-demo.com/habits/' + habitKey+ '/habitData/habitProgress.json');
            //alert(respond);


            var habitProgressRef = myDataRef.child(habitKey + '/habitData/habitProgress/');
			var habitFrequencyRef = myDataRef.child(habitKey + '/habitData/frequencyPerDay/');

            habitProgressRef.transaction(function(currentData)
            {
                //alert(JSON.stringify(currentData));
                var maxRecord = currentData.maxRecord;
                // maxRecord needs update
                if(currentData.maxRecord <= currentData.counter)
                {
                    var maxRecord = parseInt(currentData.maxRecord, 10) + parseInt(1, 10);
                    habitProgressRef.update({ counter: parseInt(currentData.counter, 10) + parseInt(1, 10) , maxRecord: maxRecord});
                    meter[0].value +=1;

                    values[0].innerHTML = currentData.counter+1;
                    values[1].innerHTML = currentData.maxRecord+1;
                }else{
                    // UPDATE the number of times done that day
                    // if(number of times == needed to be done a day, then update)
                    meter[0].value +=1;

                    values[0].innerHTML = currentData.counter+1;
                    values[1].innerHTML = currentData.maxRecord;
                    habitProgressRef.update({ counter: parseInt(currentData.counter, 10) + parseInt(1, 10)});
                }
               // habitProgressRef.update({ counter: parseInt(currentData.counter, 10) + parseInt(1, 10) , maxRecord: maxRecord});
                //alert(JSON.stringify(currentData));
            });


            msgElement.style.visibility="visible";
        }

        //Pauses the habit
        function pausePlayHabit(element){
            /* grab from database if it is play or pause. store as variable then check change play/pause */
            //alert(element.tagName);
            var thisList = (element.parentNode.parentNode);
            var habitElement = (thisList.getElementsByClassName("habit-op"))[0];

            //Get ref to update setting pause
            var habitKey = element.parentElement.parentElement.id;
            var settingsRef = myDataRef.child(habitKey + '/habitData/settings/');

            var button = habitElement.getElementsByTagName("button");
            event.stopPropagation();//stops event listener of parent nodes.

            //getting current state of habit, pause or unpaused
            var play;

            settingsRef.transaction(function(currentData)
            {

                if(currentData.pause === '1')
                {
                    play = false;
                }
                else
                {
                    play = true;
                }
            });

            if(play)
            {
                for(i=0;i<button.length;i++)
                {
                    button[i].setAttribute("disabled",true);
                }

                thisList.style.opacity = "0.5";
                element.src = "../img/play.png";
                play=false;

                settingsRef.transaction(function(currentData)
                {
                    settingsRef.update({pause: '1'});
                    //alert(JSON.stringify(currentData));
                });
            }
            else
            {
                //alert('here');
                for(i=0;i<button.length;i++)
                {
                    button[i].removeAttribute("disabled");
                }

                thisList.style.opacity = "1";
                element.src = "../img/pause.jpe";
                play=true;

                settingsRef.transaction(function(currentData)
                {
                    settingsRef.update({pause: '0'});
                });
            }
        }

        //Deletes habit from page and Db
        function getChild(element){
            var child = element.parentNode.parentNode;
            return child;
        }

        function deleteHabit(child){
            var parent = child.parentNode;
            //delete habit from DB
            var id = child.getAttribute('id');
            var deleteHabitRef = buildEndPoint(id);
            deleteHabitRef.remove();

            parent.removeChild(child);

            //alert(parent.nodeName);
        }

        function buildEndPoint (key) {
            return new Firebase('https://jjb750uy9yj.firebaseio-demo.com/habits/' + key);
        }

        var getKeys = function(obj){
           var keys = [];
           for(var key in obj){
              keys.push(key);
           }
           return keys;
        }

        function editHabit (element){
            var habitId = element.parentNode.parentNode.id;
            document.location='edit.html?' + habitId;
        }
        
        // missed a day button clicked
        function missedADay(element){
            // MAYBE ADD confirmation box?
            var msgElement = (element.parentNode.parentNode.getElementsByClassName("message"))[0];
            var values = (msgElement.getElementsByTagName("strong"));
            var meter = (msgElement.getElementsByTagName("meter"));
            
            var habitKey = element.parentElement.parentElement.id;
            var habitProgressRef = myDataRef.child(habitKey + '/habitData/habitProgress/');
            habitProgressRef.transaction(function(currentData){
                habitProgressRef.update({ counter: 0});
            });
            
            values[0].innerHTML = 0;
            meter[0].value = 0;
            // CHANGE PROGRESS BAR
        }

        function deleteOverlay() {
        	var el = document.getElementById("deleteOverlay");
          var la = document.getElementById("overlay");
          la.style.visibility = (la.style.visibility == "visible") ? "hidden" : "visible";
          el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
        }

        function deleteConfirmed(child){
          deleteOverlay();
          deleteHabit(child);
        }

        function editOverlay() {
        	var el = document.getElementById("editOverlay");
          var la = document.getElementById("overlay");
          la.style.visibility = (la.style.visibility == "visible") ? "hidden" : "visible";
          el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
        }

        function editConfirmed(){
          editOverlay();
          editHabit(this);
        }

        function displayHabit(name, text, key, iconId, habitProgress, frequencyPerDay) {

            $('#habit-list').append(

            '<li class=\"slider\" id=\"'+ key +'\">' +
                '<ul class=\"habit-info\">'+
                    '<li><div class=\"habit-name\">'+name+'</div></li>' +
                    '<li><img class=\"habit-icon\" src=\"'+iconId+'\" alt=\"habit icon\"></li>'+
                '</ul>' +
                '<div class=\"message\">' +
                    '<span class=\"message-total\">' +
                        '<strong>' + habitProgress['counter'] + '</strong> days in a row! Best Record: <strong>' + habitProgress['maxRecord'] + '</strong><br>' +
                        '<div height=\"25\" width=\"150\">' +
						'<meter value=\"'+((habitProgress['counter']%frequencyPerDay)+1)+'\" max=\"'+frequencyPerDay+'\"> '+'</meter>'+
                        '</div>' +
                    '</span><br>' +
                    '<span class=\"message-today\">Completed '+((habitProgress['counter']%frequencyPerDay)+1)+'/'+frequencyPerDay+'</strong> for today!</span>' +
                '</div>' +
                '<div class=\"habit-op\">' +
                    '<button  type=\"button\" class=\"op op-done\" onclick=\"showMsg(this);\" title=\"done\">' +
                        '<img src=\"../img/done.svg\" alt=\"Done\">' +
                    '</button>' +
                    '<button type=\"button\" class=\"op op-edit\" onclick=\"editHabit(this);\" title=\"edit habit\">' +
                        '<img src=\"../img/edit.svg\" alt=\"Edit\">' +
                    '</button>' +
                    '<button type=\"button\" class=\"op op-del\" onclick=\"child = getChild(this); deleteOverlay()\" title=\"delete habit\">' +
                        '<img src=\"../img/delete.svg\" alt=\"Del\">' +
                    '</button>' +
                    '<button type=\"button\" class=\"op op-missed\" onclick=\"missedADay(this)\" title=\"Missed a day\">' +
                        '<img src=\"../img/cross.svg\" alt=\"Cross\">' +
                    '</button>' +
                '</div>' +
                '<div class=\"pause\" style=\"position:relative;left:545px;bottom:50px;display:none\">' +
                    //'<button type=\"button\" class=\"op op-pause\" onclick=\"pausePlayHabit(this);\" title=\"pause\">' +
                        '<img id=\"img'+key+'\" style=\"position:absolute; top: -60px;\" src=\"../img/pause.jpe\" alt=\"Pause\" height=\"150\" width=\"150\" onclick=\"pausePlayHabit(this);\">' +
                    //'</button>' +
                '</div>' +
            '</li>'
            );
            //alert(JSON.stringify($('#'+key)));
            //return $('#'+key);
        };


        $(document).ready(function() {

            //Keep a mapping of firebase locations to HTML elements in order to remove or move elements
            var habitObject = {};
            var habitList = [];

            //fired upon child added to
            myDataRef.on('child_added', function(snapshot) {
                var data = snapshot.val().habitData;
                var habitKey = snapshot.name();
                //alert(JSON.stringify(data));

                //saving progress data for counter updates when user confirms their habit for the day is complete

                if(data.hasOwnProperty('name')){
                    name = data.name ? data.name : '';
                    if(name.trim().length > 0)
                        {
                            habitList.push({key: habitKey, name: name});
                            habitObject[habitKey] = name;
                        }
                }

                //alert(data.settings.turnoff);
                if(data.settings.turnoff === '0')
                {
                    displayHabit(data.name, data.text, habitKey, data.iconId, data.habitProgress, data.frequencyPerDay);

                    //alert(data.settings.pause);
                    if(data.settings.pause === '1' )
                        {
                            //trigger pause style by calling twice
                            pausePlayHabit(document.getElementById('img'+habitKey));
                            pausePlayHabit(document.getElementById('img'+habitKey));
                        }
                }
							
									
						  });
					
					/*
								dataIcon = data.iconId;
								dataName = data.name;
								
							
					
								const HR = 3600000;
								const MIN = 60000;
								var date = new Date();
								var current_time = date.getTime();
								var start_time = snapshot.val().habitData.timestamp;
								var time_diff = (current_time - start_time) / 60000;
								var hour = snapshot.val().habitData.notiTime.notiHour;
								var mins = snapshot.val().habitData.notiTime.notiMins;
								var interval = ((HR * hour) + (MIN * mins)) / 60000;
								var refData = new Firebase('https://jjb750uy9yj.firebaseio-demo.com/habits/'+ habitKey+'/');
								if ((time_diff % interval) < 1){
									alert("IN");
									createNotification(string, data);
								}
                	
							*/
							
          

            //Makes slider go right
            $(document).on('click', '.habit-op', function(event){
                event.stopPropagation();
            });

            $(document).on('click', '.slider', function(evt){
                //alert("I got clicked!");
                var $pause = $(this).find(".pause");

                if($pause.css("display")=="none")
                {
                    $(this).animate({"left":"-=100px"}, "fast");
                    $(this).find(".pause").show("fast");
                }
                else
                {
                    $(this).animate({"left":"+=100px"}, "fast");
                    $(this).find(".pause").hide("fast");
                }
            });
        });