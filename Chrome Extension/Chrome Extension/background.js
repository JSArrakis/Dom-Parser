var tabs = {};


var x = 0;
var y = 0;

chrome.runtime.onMessage.addListener(OnMessageEvent);

var blt_contextMenu = chrome.contextMenus.create({ "title": 'Broadlook Agent', "contexts": ["all"], "id": "blt_contextMenu" });
var blt_contextCreateField = chrome.contextMenus.create({ "title": 'Create Field', "contexts": ["all"], "parentId": "blt_contextMenu", "id": "blt_contextCreateField", "onclick": blt_contextCreateField_Click });
var blt_contextCreateLink = chrome.contextMenus.create({ "title": 'Create Link to Directory Details', "contexts": ["link"], "parentId": "blt_contextMenu", "id": "blt_contextCreateLink", "onclick": blt_contextCreateLink_Click });
var blt_contextCreateURL = chrome.contextMenus.create({ "title": 'Create Link to Website', "contexts": ["link"], "parentId": "blt_contextMenu", "id": "blt_contextCreateURL", "onclick": blt_contextCreateURL_Click });

function OnMessageEvent(Message, Sender, Callback) {
    var response = null;
    switch (Message.request) {
        case 'updateCoords':

            tabs[Sender.tab.id] = Message.coords;

            //console.log('updateCoords ' + tabs[Sender.tab.id].x + '-' + tabs[Sender.tab.id].y + '-' + Sender.tab.id);
            break;
        default:
            break;
    }
    
    if (Callback != null) {
        Callback(response);
    }
    //chrome.pageAction.show(Sender.tab.id)

}
function OnMessageCallback(){
}

function blt_contextCreateField_Click(OnClickData, Tab) {
    chrome.tabs.sendMessage(Tab.id, { 'request': 'console.log', 'message': "item " + OnClickData.menuItemId + " was clicked" }, function (Response) { });//alert("tab: " + JSON.stringify(Response)); });
    chrome.tabs.sendMessage(Tab.id, { 'request': 'console.log', 'message': "info: " + JSON.stringify(OnClickData) }, function (Response) { });//alert("tab: " + JSON.stringify(Response)); });
    chrome.tabs.sendMessage(Tab.id, { 'request': 'console.log', 'message': "tab: " + JSON.stringify(Tab) }, function (Response) { });//alert("tab: " + JSON.stringify(Response)); });
    chrome.tabs.sendMessage(Tab.id, { 'request': 'selectCurrent', 'coords': { 'x': tabs[Tab.id].x, 'y': tabs[Tab.id].y } }, function (Response) { if (Response) { alert(JSON.stringify(Response)); } });//alert("tab: " + JSON.stringify(Response)); });    

    //chrome.tabs.sendMessage(Tab.id, { 'request': 'console.log', 'message': Patterns }, function (Response) { });//alert("tab: " + JSON.stringify(Response)); });

    //chrome.extension.sendRequest('dgkpkannklmkbknaiiabgjepmdplnikd', { 'request': 'SetPatterns', 'Patterns': Patterns }, function (response) { });
}
function blt_contextCreateLink_Click(OnClickData, Tab) {
    alert(OnClickData.linkUrl);
}
function blt_contextCreateURL_Click(OnClickData, Tab) {
    alert(OnClickData.linkUrl);
}
//chrome.tabs.executeScript(tabId, { file: 'contentScript.js' });


chrome.browserAction.onClicked.addListener(function (tab) {
  
});