var tabs = {};

chrome.runtime.onMessage.addListener(OnMessageEvent);

chrome.extension.onRequestExternal.addListener(OnInterop);

//chrome.runtime.onInstalled.addListener(function () {
//    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
//        chrome.declarativeContent.onPageChanged.addRules([{
//            conditions: [
//                // When a page contains a <video> tag...
//                new chrome.declarativeContent.PageStateMatcher({
//                    css: ["span"]
//                })
//            ],
//            // ... show the page action.
//            actions: [new chrome.declarativeContent.ShowPageAction()]
//        }]);
//    });
//});


//chrome.tabs.onSelectionChanged.addListener(function(tabId) {
//    	  //chrome.pageAction.show(tabId);
//    	  //alert(tabId);
//});

//chrome.tabs.onUpdated(function (tabId, changeInfo) {
//    //chrome.pageAction.show(tabId);
//    alert(tabId);
//});
//chrome.tabs.onLoaded(function (tabId, changeInfo) {
//    //chrome.pageAction.show(tabId);
//    alert(tabId);
//});

//chrome.declarativeContent.onPageChanged(function (tabId, changeInfo) {
//    //chrome.pageAction.show(tabId);
//    alert(tabId);
//});

var Data = [];
var Patterns = [];



function OnMessageEvent(Message, Sender, Callback) {
    alert(Message);
    switch (Message.request) {
        case 'SetPatterns':
            Patterns = Message.Patterns;
            break;
        case 'getData':
            Callback({ "Values": Data });
            //alert('Data Set');

            break;
        case 'PageLoaded':
            Callback(Patterns);
            break;
        case 'ShowIcon':
            chrome.pageAction.show(Sender.Tab.tabId);
            Callback(Sender);

            break;
        default:
            break;
    }
    
    //if (Callback != null) {
    //    Callback(response);
    //}
}


function OnInterop(Message, Sender, Callback) {
    //alert(JSON.stringify(Message));

    if (Sender.id === 'bbfahfbopcgaehpelhlemoadekjabhng') {
        switch (Message.request) {
            case 'SetPatterns':
                Patterns = Message.Patterns;
                alert('Patterns Received - ' + JSON.stringify(Message.Patterns));

                break;
            case 'SetData':
                Data = Message.Data;
                //alert('Data Received - ' + JSON.stringify(Data));
                break;

            default:
                break;
        }

        //if (Callback != null) {
        //    Callback(response);
        //}


    }

    //if (sender.id == blacklistedExtension)
    //    sendResponse({});  // don't allow this extension access
    //else if (request.getTargetData)
    //    sendResponse({targetData: targetData});
    //else if (request.activateLasers) {
    //    var success = activateLasers();
    //    sendResponse({activateLasers: success});
    //}
}



//chrome.browserAction.onClicked.addListener(function (tab) { });