
function init() {
	var manifest = chrome.runtime.getManifest();
	var version = manifest.version;
	document.getElementById('version').innerHTML += version;
	chrome.storage.sync.get('numTabs', function(items) {
		document.getElementById('numTabsAllowed').innerHTML = items.numTabs;
	});
	document.getElementById('saveButton').addEventListener('click', saveSettings);
}


function saveSettings() {
	var numTabs = document.getElementById('numTabs').value;
	numTabs = parseInt(numTabs);
	if(numTabs == null) return;
	if(isNaN(numTabs)) return;
	if(numTabs < 1) numTabs = 1;
	chrome.storage.sync.set({ numTabs: numTabs });
	document.getElementById('numTabsAllowed').innerHTML = numTabs;
}

document.addEventListener('DOMContentLoaded', init);