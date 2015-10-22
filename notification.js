
(function() {

	var backgroundColor = 'yellow';
	var width = 600;
	var height = 30;
	var notifDurationMS = 2000;
	var notifID = 'tabAlertNotificationBox';
	var top = parseInt(window.innerHeight / 4);
	var left = parseInt((window.innerWidth / 2) - (width / 2));

	var scrollY = window.scrollY;
	var scrollX = window.scrollX;
	top += scrollY;
	left += scrollX;

	var styleCSS = 'position:absolute;padding:0px;' + 
		';top:' + top + 'px' +
		';left:' + left + 'px' +
		';background-color:'+ backgroundColor +
		';width:' + width + 'px' +
		';height:' + height + 'px' +
		';z-index:1000;'

	var settingsLink = document.createElement("a");
	settingsLink.setAttribute('style', 'color:blue; font-weight:bold;');
	settingsLink.innerHTML = "Settings";

	var notif = document.createElement('div');
	notif.setAttribute('id', notifID);
	notif.setAttribute('style', styleCSS);
	notif.style.font = '30px arial,serif';
	notif.style.color = 'rgb(70,70,70)';

	chrome.storage.sync.get('tabAlertOptionsURL', function(items) {
		var optionsPageURL = items.tabAlertOptionsURL;
		settingsLink.setAttribute('href', optionsPageURL);
		notif.innerHTML = 'Tab Overflow prevented a new tab. ' + settingsLink.outerHTML;
		document.body.appendChild(notif);
	});

	function removeNotif() {
		notif.parentNode.removeChild(notif);
	}

	setTimeout(removeNotif, notifDurationMS);
	document.addEventListener("scroll", removeNotif);

})();