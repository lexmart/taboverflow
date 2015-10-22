
var previousTabWasRemoved;
var defaultNumTabs = 5;

var optionsPageURL = chrome.extension.getURL('options.html');
chrome.storage.sync.set({'tabAlertOptionsURL': optionsPageURL});

var chromeEvents = {
	onTabCreated: function(tab) {
		var curWindowId = tab.windowId;
		getNumberTabsOpen(curWindowId, tab, handleTabAdded);
	},
	onTabActivated: function(activeInfo) {
		if(!previousTabWasRemoved) {
			return;
		}
		previousTabWasRemoved = false;
		chrome.tabs.getSelected(null, function(tab) {
			if(isChromeURL(tab.url)) return;
			chrome.tabs.executeScript(tab.id, {file: "notification.js"});
		});
	}
}

chrome.tabs.onCreated.addListener(chromeEvents.onTabCreated);
chrome.tabs.onActivated.addListener(chromeEvents.onTabActivated);

function isChromeURL(url) {
	return (url.indexOf("chrome://") === 0 || url.indexOf("chrome-extension://") === 0);
}

function getNumberTabsOpen(windowId, tab, callback) {
	chrome.tabs.getAllInWindow(windowId, function(tabs) {
		numTabsOpen = tabs.length;
		callback(windowId, tab, tabs, numTabsOpen);
	});
}

function handleTabAdded(windowId, tab, windowTabs, numTabs) {
	console.log('%i tabs open on window %i', numTabs, windowId);
	chrome.storage.sync.get('numTabs', function(items) {

		if(items.numTabs == null) {
			chrome.storage.sync.set({ numTabs: defaultNumTabs });
		}

		if(numTabs > items.numTabs) {
			chrome.tabs.remove([tab.id], null);
			previousTabWasRemoved = true;
		}
	});
}
