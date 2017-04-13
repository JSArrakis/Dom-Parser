chrome.runtime.onMessage.addListener(OnMessageEvent);

function OnMessageEvent(Message, Sender, Callback) {
    //alert(Message);
    var response = null;
    //switch (Message.request) {
    //    case 'updateCoords':

           

    //        //console.log('updateCoords ' + tabs[Sender.tab.id].x + '-' + tabs[Sender.tab.id].y + '-' + Sender.tab.id);
    //        break;
    //    default:
    //        break;
    //}

    //if (Callback != null) {
    //    Callback(response);
    //}
}

//// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
    var img = document.createElement('span');
    img.innerHTML = "Loaded: ";
    document.body.appendChild(img);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var img = document.createElement('span');
        img.innerHTML = "TabID: " + tabs[0].id;
        document.body.appendChild(img);


        var pats = [];
        for (var p = 0; p < demoPatterns.length; p++) { pats.push(demoPatterns[p]); }
        for (var p = 0; p < patterns.length; p++) { pats.push(patterns[p]); }
        console.log(pats);

        chrome.tabs.sendMessage(tabs[0].id, { 'request': 'determineLayout' ,'Patterns': pats}, LayoutReceived);

        //chrome.tabs.sendMessage(tabs[0].id, { 'request': 'retreive', 'Selector': "DIV#member-1.masthead.vcard.contact H1" }, ShowResponse);
    });
});

function LayoutReceived(Response) {
    var p = document.createElement('p');
    p.innerHTML = "Domain: " + Response.Domain ;
    document.body.appendChild(p);

    var p = document.createElement('p');
    p.innerHTML = "URL: " + Response.Url;
    document.body.appendChild(p);

    var p = document.createElement('p');
    p.innerHTML = "Layout: " + Response.Layout.Name;
    document.body.appendChild(p);

    //var p = document.createElement('p');
    //p.innerHTML = "Values: " + JSON.stringify(Response.Values);
    //document.body.appendChild(p);


    //var p = document.createElement('p');
    //p.innerHTML = "Test";
    //document.body.appendChild(p);

    var p = document.createElement('div');
    p.innerHTML = DisplayGroup(Response.Values, 0);
    document.body.appendChild(p);

    chrome.extension.sendRequest('dgkpkannklmkbknaiiabgjepmdplnikd', { "request": "SetData", "Data": Response.Values }, function (response) {});

    //chrome.tabs.sendMessage(tabs[0].id, { 'request': 'retreiveData', 'Layout': Response.Layout }, DataRetreived);
}


function DisplayGroup(Group, Depth) {
    var html = "";

    if (Group.Data !== undefined) {
        //var p = document.createElement('p');
        //p.innerHTML = "Array: " + Group.Data.length;// + " - " + JSON.stringify(Group.Data);
        //document.body.appendChild(p);

        html = "<p><b>" + CreatePad(Depth) + Group.Name + ((Group.Group !== null) && (Group.Group.Modifier !== undefined) ? " (" + Group.Group.Modifier + ")" : "") + ((Group.Index !== 0) ? " [" + Group.Index + "]" : "") + "</b><br />" + ((Group.Group !== null) && (Group.Group.Description !== undefined) ? "<i>" + Group.Group.Description + "</i><br />" : "");


        //if (Group.Index == 0) { html = "<p><b>" + CreatePad(Depth) + Group.Name + "</b><br />"; }
        //else { html = "<p><b>" + CreatePad(Depth) + Group.Name + "[" + Group.Index + "]</b><br />"; }

        for (var v = 0; v < Group.Data.length; v++) {
            if (Group.Data[v].Data !== undefined) {
                html = html + DisplayGroup(Group.Data[v], Depth + 1);
            } else { html = html + DisplayField(Group.Data[v], Depth + 1); }
        }
    } else {
        html = html + "?" + JSON.stringify(Group);
    }
    return html + "</p>";
}

function DisplayField(Field, Depth) {
    return "<span>" + CreatePad(Depth) + "<i>" + Field.Name + ":</i> " + Field.Value + "</span><br /><span style=\"color: silver;\">" + Field.Selector+"</span><br />";
}
function CreatePad(Depth) {
    var p = "";
    for (var d = 0; d < Depth; d++) { p = p + "&nbsp;"; }
    //for (var d = 0; d < Depth; d++) { p = p + "&#151;"; }
    return p;
}