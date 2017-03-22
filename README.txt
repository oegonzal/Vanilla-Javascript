——Final Project - Homework 5——

AUTHENTICATION:
We have the code for the authentication working but we were unable to get it to work together correctly. All of the methods are in the project but we didn’t have enough time to get them to work together nicely. 


NOTIFICATIONS:
Notifications are still not working completely properly for offline but it has the notifications from the previous assignment working


MOBILE BROWSERS:
Updated the code in order that the application looks better while in mobile browser views. This included changes for the HTML and CSS for the Habits List, for the notifications List, for the Add and for the Edit pages. This included changing the css and adding checks for a mobile view so that it will look better for users using a smaller browser window. 


MOBILE APPLICATIONS:
Ran the code through phonegap so that it would export as a mobile application in iOS. The process worked but it changed the look of our application so that it wasn’t as good looking. We weren’t able to change the code so that the application would look as good as our Web application. 


MINIFICATION:
For the minification, we started by using grunt. After that we ultimately decided upon using Gulp in order for the minification of the code. 

APPLICATION FUNCTIONALITY


Habit List
It was decided to keep the habit list the way it was because all habits are neatly presented in a list.
Features in our habits include:
	-click and slide:
		Shows the option to pause and play a habit, which allows the user to put a habit on pause.
	-Progess bar progression:
		Click on the check button and the button progresses
	-In adition we decided to add 2 extra buttons in the bottom of the page for the purpose of
		easier navigation between pages
	-Lastly, we felt the best place to put the notfication bar would be in the top of the habits list.
		This carefully chosen location allows easy access to users in case they wish to see which habits
		need to be updated.

Settings Page
	The settigns page has 3 features:
		-Puase: pauses a habit and continues to show it in the main list.
		-Turnoff: turns off the habit and removes it from the main list.
			We believed this would be an important feature because the user has the option
			to remove habits that are cluttering the main list, but don't necessarily have
			to remove it permanently. As a result this feature serves to archive a habit.
		-Sleep: essentially pauses a habit. (feature not working currently)


Edit/Add Habbit
	-Added features to the Add habit is that Image Uploads
		User can add an image under 10 MB of size and it will show on the main page.
	-Edit feature has all saved settings (currently there is an error for when user uploads an image, which
		causes to not show previous settings.)

Notification
The notification works properly. Users are notified with a popup message and a redirection to the notification page. 
The pop up notifications work when broswer and websites are opened. However, when the website is turned off, the notification does not work. 
We could have implemented to make the notification appears with setting of interval or at a specific time if we have a server set up. 
Codes in commented region in add.js are for that purpose. Notifications are changed accordingly when setting of the notification on the setting pages change.
Whenever a habit is created, it will appears on the notification page with a default of notification on. 





CONTRIBUTIONS

- implemented the notification page without database usage. 
- Added the notification interval bar on add.html and validation check of the input for the notification interval bar. 
	 - implement the database retrieval of the notification time interval on edit.html.
- Wrote the Javascript funtions of all the controls of the toggle on the setting.html in setting.js 
- Worked with William as a small team to develop the timer for notification and implement functionalities of notification on not.js and notification.html
- Implemented the web notification pop up and the allow notification message request pop ups when website is opened but not being viewed at the moment.
- Tried implement notification through using the serviceWorkerRegistration to have messages pop up without opening the website. 
	- I have most of the codes for that down from doing lots of amount of researching; however, this implementation requires a server and a working HTTPS, which is really unfortunate.
- Had implemented a bar that explains to the user if they want to turn on the notifications but merging made it disappeared. 
- README  
	- notification section

-implemented the notifications page without database usage and the redirects and displaying of the notifications on the page with Chia-yu.
-Added the notification task bar at the top of the list page to direct to the notifications page.
-Implemented The Javascript to make the notifications show up and the timers needed in order to make them show up at the right time and go away once clicked, worked with Chia-yu on this.
-Went through and did verification checks on the add/edit pages. these are used to make sure that the user had put input into the fields and didn’t leave them blank.
-Implemented some minor error checking on the add/edit pages. These don’t just check that the fields were inputted but checked to make sure it had the right data inputted.
-The validations and error checking were almost all javascript checks with just a couple additions of id’s for the css in order to show/manipulate the fields.
-Implemented the logout buttons on all the pages. Including the javascript and the css for this. 
-created a small box in order to house the logout button. On the list page it includes a couple other buttons as well, settings button, and add a habit button. This box is used so that when its in mobile view, it doesn’t float over the lists and other options on other pages.  
-README 

-Greatly assisted my team with development and debugging issues.
-Managed and assigned tasks to team
-Did a great portion of planning for the application, including UI and implementation
-Implemented all of the CRUD features including:
    1. Add habits, read habits, delete habits, Update habits
    2. Settings page add settings elements
    
-Implemented Settings page pause, sleep, and turnoff javascript that interacts with DB
-Implemented features that pause of turnoff a habit in the main list
-Debugged and fixed sliding effects in the mainlist and added play and pause picture (previous buttons not compatible with the UI look)
-Greatly assisted with the navbar in the bottom
-Connected progress bar with the backend in the DB
-Added security in input boxes that prevent injections in the add and edit page.
-Added the security popup that prevents user from entering inappropriate input to input boxes
-Implemented all the DB connections of the edit page that interact with the back end and affect the main list.
-Added the upload a photo feature including:
    1. photo storage in the backend
    2. photo input selection
-Added the appropriate redirects to most pages
-I made routing information possible from page to page using URL parameters
-README

-Implemented all of the Overlays throughout the app.
-Provided testing of the app to try and break it.
-Worked exclusively on the login html, css, and js.
- Changed the flow of the app to match the type of login they used.
-Validated the login credentials
	-Includes making sure no blank input is accepted
	-email address provided is in the form of a proper email
	-when using sign-up passwords need to match one another
-Implemented updating the habits card when clicked on.
	-When check is clicked, it displays message with current progress for habit as well as user chosen frequency for habit.
	-Added a meter that updates everytime the habits page is called which shows what the current progress for the user is.
	-(Plan to add functionality so that both of these update whenever the item is clicked.)
-Limited the input length for habit titles so that they would not mess with the habit cards layout.
-README

-worked on the sliding effects of the habit list
-contributed to pause and play image.






NOTES ON IMPLEMENTATION:

Settings page to DB:

1. In db, each habit will have an additional data field known as setting, which 
    will have 3 extra fields: off, sleep, pause
2. Each setting is leveled in order of importance --> javascript conditions to 
    determine which to run.
3. pause- keeps habit on list but doesnt delete results
        a. when paused restart timestamp and renew until the day user unpauses
        b. off removes from list and restarts timestamp
        c. sleep just pauses for chosen amount of days and restarts timestamp
        d. There should be text pop-up into what is happening when user sets one of these switches
            i. popup can appear right below text.
4. Edit and Add Habit page should have frequency set to as long as user wants it to be.




Bar Progress Bar

0. Each Habit will have an additional field known as progress, which will have 2 inner fields:
    timestamp and counter
1. Upon object creation, initiate counter to 0
2.  a. Every time the add button is hit, increment counter
        i.Counter is full, change size of the bar (more blues, increment max size)
        ii.Otherwise, 1 more blue, 1 less gray
    b. Otherwise, once the timestamp is expired renew the bar
        i. reset the whole bar (0 blues, all grays), reset counter and plus 1 for current count
        issue: How to check when the timestamp is required?
            i. auto refresh and upon refresh check and update UI?
            ii. App reloads everyday at midnight,
                javascript function that allows this (upon then UI updates, might be too complicated for this project)
            iii. On page return, shows results
                a. Logic for this would be to check timestamp of last updated and compare with current submission
                    Most practical approach.
