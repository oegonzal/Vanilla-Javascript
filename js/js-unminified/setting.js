var refData = new Firebase('https://jjb750uy9yj.firebaseio-demo.com/habits/');
var habitSettingList = [];
var habitSettingObject = {};


/* All session turnoff notication*/
function toggleTurnOff(source) {
  var checkboxes = document.getElementsByName('turnoff');
  for(var i=0, n=checkboxes.length;i<n;i++) {
    /*alert(JSON.stringify(checkboxes));*/
    checkboxes[i].checked = source.checked;
    updateDb(checkboxes[i]);
  }
    //alert('tester.');
}

/* All session pause notication*/
function togglePause(source) {
  var checkboxes = document.getElementsByName('pause');
  for(var i=0, n=checkboxes.length;i<n;i++) {
    /*alert(JSON.stringify(checkboxes));*/
    checkboxes[i].checked = source.checked;
    updateDb(checkboxes[i]);
  }
}

/* All session sleep notication*/
function toggleSleep(source) {
  var checkboxes = document.getElementsByName('sleep');
  for(var i=0, n=checkboxes.length;i<n;i++) {
    /*alert(JSON.stringify(checkboxes));*/
    checkboxes[i].checked = source.checked;
    //alert(checkboxes[i].id);
    updateDb(checkboxes[i]);
  }
}

function updateDb(element)
{
    //alert('called');
    var habitData = $(element).prop('id');
    var array = habitData.split('-');
    var statusStateName = array[0];

    var habitDataRef = refData.child('-' + array[2] +'/habitData/settings/');

    var statusStateVal;
    if($(element).prop("checked") == true)
    {
        statusStateVal = '1';
    }
    else
    {
        statusStateVal = '0';    
    }

    if(statusStateName.localeCompare('sleep') == 0)
    {
        habitDataRef.update({sleep: statusStateVal});
    }
    else if (statusStateName.localeCompare('pause') == 0)
    {
        habitDataRef.update({pause: statusStateVal});
    }
    else if (statusStateName === 'turnoff')
    {
        habitDataRef.update({turnoff: statusStateVal});
    }

}