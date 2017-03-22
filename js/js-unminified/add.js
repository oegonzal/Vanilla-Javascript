

/***********************************************************************************************
*
*  Timing constraint in nofication interval input
*
***********************************************************************************************/


function isNumberInHour(input){
		if( input.value < 0) input.value = 0;
		if( input.value > 23) input.value = 23;
}

function isNumberInMin(input){
		if( input.value < 0) input.value = 0;
		if( input.value > 59) input.value = 59;
} 



/***********************************************************************************************
*
*  Notification
*
***********************************************************************************************

// Once the service worker is registered set the initial state  
function initialiseState() {  
	// Are Notifications supported in the service worker?  
	if (!('showNotification' in ServiceWorkerRegistration.prototype)) {  
		console.warn('Notifications aren\'t supported.');  
		return;  
	}

	// Check the current Notification permission.  
	// If its denied, it's a permanent block until the  
	// user changes the permission  
	if (Notification.permission === 'denied') {  
		console.warn('The user has blocked notifications.');  
		return;  
	}

	// Check if push messaging is supported  
	if (!('PushManager' in window)) {  
		console.warn('Push messaging isn\'t supported.');  
		return;  
	}
	
	if('serviceWorker' in navigator){
	// We need the service worker registration to check for a subscription  
	navigator.serviceWorker.register('../js/add.js').then(function(serviceWorkerRegistration) {  
		// Do we already have a push message subscription?  

		serviceWorkerRegistration.pushManager.getSubscription()  
			.then(function(subscription) {  
				// Enable any UI which subscribes / unsubscribes from  
				// push messages.
				var pushButton = document.querySelector('.notif');  
				pushButton.disabled = false;

				if (!subscription) {  
					// We aren't subscribed to push, so set UI  
					// to allow the user to enable push  
					return;  
				}

				// Keep your server in sync with the latest subscriptionId
				sendSubscriptionToServer(subscription);

				// Set your UI to show they have subscribed for  
				// push messages  
				pushButton.textContent = 'Disable Push Messages';  
				isPushEnabled = true;  
			})  
			.catch(function(err) {  
				console.warn('Error during getSubscription()', err);  
			});  
		});	  
	}
}

/***********************************************************************************************
*
*  Notification
*
***********************************************************************************************

function sub(){
	var pushButton = document.querySelector('.notif');
	if(pushButton.checked == false){
		//unsubscribe();
	}
	else{
		subscribe();
	}
}



function subscribe() {  
	// Disable the button so it can't be changed while  
	// we process the permission request  
	var pushButton = document.querySelector('.notif');  
	var notificationBar = document.querySelector('#notificationIntervalBar');
	//if(pushButton.disabled == false){
		pushButton.disabled = true;
	//}

	navigator.serviceWorker.register('../js/add.js').then(function(serviceWorkerRegistration) {  
		serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly:true})  
			.then(function(subscription) {  
				// The subscription was successful  
				isPushEnabled = true;  
				pushButton.textContent = 'Disable Push Messages';  
				pushButton.disabled = false;

				// TODO: Send the subscription.endpoint to your server  
				// and save it to send a push message at a later date
				return sendSubscriptionToServer(subscription);  
			})  
			.catch(function(e) {  
				if (Notification.permission === 'denied') {  
					// The user denied the notification permission which  
					// means we failed to subscribe and the user will need  
					// to manually change the notification permission to  
					// subscribe to push messages  
					console.warn('Permission for Notifications was denied');  
					pushButton.disabled = true;  
					pushButton.checked = false;
				} else {  
					// A problem occurred with the subscription; common reasons  
					// include network errors, and lacking gcm_sender_id and/or  
					// gcm_user_visible_only in the manifest.  
					console.error('Unable to subscribe to push.', e);  
					pushButton.disabled = false;  
					pushButton.textContent = 'Enable Push Messages';  
				}  
			});  
	});  
}




function unsubscribe() {  
  var pushButton = document.querySelector('.notif');  
  pushButton.disabled = true;

  navigator.serviceWorker.register('../js/add.js').then(function(serviceWorkerRegistration) {  
    // To unsubscribe from push messaging, you need get the  
    // subscription object, which you can call unsubscribe() on.  
    serviceWorkerRegistration.pushManager.getSubscription().then(  
      function(pushSubscription) {  
        // Check we have a subscription to unsubscribe  
        if (!pushSubscription) {  
          // No subscription object, so set the state  
          // to allow the user to subscribe to push  
          isPushEnabled = false;  
          pushButton.disabled = false;  
          pushButton.textContent = 'Enable Push Messages';  
          return;  
        }  

        var subscriptionId = pushSubscription.subscriptionId;  
        // make request from your server side 
        // the subscriptionId from your data store so you
        // don't attempt to send them push messages anymore

        // We have a subscription, so call unsubscribe on it  
        pushSubscription.unsubscribe().then(function(successful) {  
          pushButton.disabled = false;  
          pushButton.textContent = 'Enable Push Messages';  
          isPushEnabled = false;  
        }).catch(function(e) {  
          // We failed to unsubscribe, this can lead to  
          // an unusual state, so may be best to remove
          // the users data from your data store and
          // inform the user that you have done so

          console.log('Unsubscription error: ', e);  
          pushButton.disabled = false;
          pushButton.textContent = 'Enable Push Messages';
        });  
      }).catch(function(e) {  
        console.error('Error thrown while unsubscribing from push messaging.', e);  
      });  
  });  
}




self.addEventListener('push', function(event) {  
  console.log('Received a push message', event);
	
	var titleName = document.getElementById('#title').value();
		
  var title = 'Yay a message.';  
  var body = 'We have received a push message.';  
  var icon = '/images/icon-192x192.png';  
  var tag = 'simple-push-demo-notification-tag';

  event.waitUntil(  
    self.registration.showNotification(title, {  
      body: body,  
      icon: icon,  
      tag: tag  
    })  
  );  
});









/***********************************************************************************************
*
*  pushing notification
*
***********************************************************************************************/



var isPushEnabled = false;

/*
window.addEventListener('load', function() {  
var pushButton = document.querySelector('.js-push-button');  
pushButton.addEventListener('click', function() {  
	if (isPushEnabled) {  
		unsubscribe();  
	} else {  
		subscribe();  
	}  
});*/

// Check that service workers are supported, if so, progressively  
// enhance and add push messaging support, otherwise continue without it.  
/*if ('serviceWorker' in navigator) {  
	navigator.serviceWorker.register('/service-worker.js')  
	.then(initialiseState);  
} else {  
	console.warn('Service workers aren\'t supported in this browser.');  
}  
});*/


/*
const HR = 3600000;
const MIN = 60000;
*/

function notifyMe() {
	//check if notification is supported by broswer
	if (!("Notification" in window)) {
		alert("This browser does not support system notifications");
	}

	// Let's check whether notification permissions have already been granted
	else if (Notification.permission === "granted") {
		// If it's okay let's create a notification
		//var notification = new Notification("Hi there!");
		//document.getElementById("notificationIntervalBar").style.visibility = "visible";
		//document.getElementById("noti-button").style.visibility = "hidden";
		//createNotification();
	}

	// Otherwise, we need to ask the user for permission
	else if (Notification.permission !== 'denied') {
		Notification.requestPermission(function (permission) {
			// If the user accepts, let's create a notification
			if (permission === "granted") {
					//var notification = new Notification("Hi there!");
					//createNotification();
			}
		});
	}
}


// create new notification
function createNotification(strTitle, sIcon){
	var strBody = "Time to " + strTitle;
	var note = {
			body: strBody,
			icon: sIcon
	}
	var n = new Notification(strTitle, note);
	n.onclick = function(){
			// should be modify to go to notification page instead
			document.location='list.html';
	}
	setTimeout(n.close.bind(n), 1000);
}
/*
function setAutomatedNotification(hours, minutes){

	var interval = hours*HR + minutes*MIN;
	
	var timestamp = new Date().getTime();
	interval = days*DAY + hours*HR + minutes*MIN;
	timestamp+= interval; 
	timestamp = new Date(timestamp);

	var timenow = new Date().getNow();
	if( timenow >= timestamp){
			createNotification()	
	}
	var displayNotification = setInterval(createNotification, interval);

}
function stopAutomatedNotification(habitCleared){
	clearInterval(habitCleared);
}
*/

				
