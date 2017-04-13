
chrome.runtime.onMessage.addListener(OnMessageEvent);

var c = 0;
var Abs = true;

var Layout = null;

document.onload = function (e) {
    console.log("Loaded");
    chrome.runtime.sendMessage({ 'request': 'ShowIcon' }, function (Response) { console.log(Response); });

    chrome.runtime.sendMessage({ 'request': 'PageLoaded' }, function (Response) {

        var val = DetermineLayout(Response);

        if (val != null) {
            chrome.runtime.sendMessage({ 'request': 'ShowIcon' }, function (Response) { });

        }

    });
}


function OnMessageEvent(Message, Sender, Callback) {
    var response = null;
    console.log(Message);
    switch (Message.request) {
        //case 'determineLayout':
        //    var val = DetermineLayout(Message.Patterns);
        //    console.log(val);
        //    response = {};
        //    response.Layout = val;
        //    response.Domain = location.host;
        //    response.Url = document.URL;

        //    //if (val !== null) { val = { "Name": "root", "Index": 0, "Group": null, "Selector": null, "Data": RetreiveData(val.GroupFields, '') }; }
        //    //console.log(val);
        //    //response.Values = val;

        //    Callback(response);
        //    break;
        case 'console.log':
            console.log(Message.message);
        default:
            break;
    }
    //if (Callback != null) {
    //    Callback(response);
    //}
    return true;
}

function DetermineLayout(Patterns) {
    var found = false;
    console.log(Patterns);
    console.log(Patterns.length);

    for (var i = 0; i < Patterns.length; i++) {
        var pattern = Patterns[i];
        console.log(pattern);
        console.log(location.host);
        if (pattern.Domains.indexOf(location.host) >= 0) {
            console.log("Matched Domain");
            for (var p = 0; p < pattern.Paths.length; p++) {
                var path = pattern.Paths[p];
                console.log(path);
                console.log(document.URL);
                for (var up = 0; up < path.UrlPatterns.length; up++) {
                    console.log(path.UrlPatterns[up]);
                    if (document.URL.match(new RegExp(path.UrlPatterns[up]))) { found = true; break; }
                }

                if (found) {
                    console.log("Matched URL");
                    found = false;
                    for (var l = 0; l < path.Layouts.length; l++) {
                        var layout = path.Layouts[l];
                        console.log(layout);

                        found = true;

                        for (var q = 0; q < layout.Qualifiers.length; q++) {
                            var qualifier = layout.Qualifiers[q];
                            console.log(qualifier);

                            //var qd = $(qualifier.Selector);
                            var qd = GetValue(qualifier.Selector);

                            switch (qualifier.ValidationType) {
                                case 'NotExists': if (qd.length !== 0) { found = false; } break;
                                case 'Quantity':
                                    var qty = 0;
                                    if (qd) { qty = qd.length; }
                                    var val = parseInt(qualifier.Value);
                                    switch (qualifier.Operand) {
                                        case '>': if (val >= qd.length) { found = false; } break;
                                        case '>=': if (val > qd.length) { found = false; } break;
                                        case '<': if (val <= qd.length) { found = false; } break;
                                        case '<=': if (val < qd.length) { found = false; } break;
                                        case '!=': if (val === qd.length) { found = false; } break;
                                        default: if (val !== qd.length) { found = false; } break; // '='
                                    }
                                    break;
                                default: if (qd.length < 1) { found = false; } break; // 'Exists'
                            }
                            if (!found) {
                                console.log("Failed Qualifier: " + qualifier.ValidationType + " - " + qd.length);
                                break;
                            } else {
                                console.log("Matched Qualifier: " + qd.length);
                            }
                        }
                        if (found) {
                            console.log("Matched Layout: " + layout.Name);
                            return layout;
                            //break;
                        } else {
                            console.log("Failed Layout");
                        }
                    }

                    //found = true;
                    //break;
                } else {
                    console.log("Failed URL");
                }
            }
        } else {
            console.log("Failed Domain");
        }
        //if (found) { break; }
    }
    return null;
}