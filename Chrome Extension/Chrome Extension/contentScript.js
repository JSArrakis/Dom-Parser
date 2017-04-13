"use strict";

var blt_LastElement = null;

try { chrome.runtime.onMessage.addListener(OnMessageEvent); }
catch (err) { console.log("Failed to Connect to Listener"); }


/* Pattern Capture */

var $ = jQuery;

Array.prototype.clone = function () { return this.slice(0); };

var ButtonActions = {
    Layout: undefined,
    Actions: [],
    ExecuteClick: function (e) {
        var action = e.data;
        //var id = $(this).attr('id');
        //for (var i = 0; i < ButtonActions.Actions.length; i++) { if (ButtonActions.Actions[i].ID === id) { action = ButtonActions.Actions[i]; break; } }
        //for (var i = 0; i < ButtonActions.Actions.length; i++) { if (ButtonActions.Actions[i].Sender === this) { action = ButtonActions.Actions[i]; break; } }
        //for (var i = 0; i < ButtonActions.Actions.length; i++) { if (ButtonActions.Actions[i] === e.data) { action = ButtonActions.Actions[i]; break; } }
        var res = {};
        if (action === undefined || action === null || action.Action === undefined) { return; }
        switch (action.Action.toLowerCase()) {
            case 'capture':
                //[Capture]showCaptureNotificationBar('Contact was selected. Please open Capture! to add selected contacts.', 100, 5000);
                res = {
                    Name: 'root', Index: 0, Group: null, Selector: null,
                    Data: {
                        Name: action.Group.Group, Index: 0, Group: action.Group, Selector: action.Path,
                        Data: PatternSelectionEngine.ProcessGroupFields(action.Group.GroupFields, action.Path, action.Group, { Retrieve: true })
                    }
                };
                console.log(res);
                console.log(action);
                //[Capture]port.postMessage({ AddData: { data: res, sourceUrl: document.URL } });
                break;
            case 'capturegroup':
                //[Capture]showCaptureNotificationBar('Contacts were selected. Please open Capture! to add selected contacts.', 100, 5000);
                res = { Name: 'root', Index: 0, Group: null, Selector: null, Data: PatternSelectionEngine.ProcessGroupFields(action.Group.GroupFields, action.Path, action.Group, { Retrieve: true }) };
                console.log(res);
                console.log(action);
                //[Capture]port.postMessage({ AddData: res, sourceUrl: document.URL });
                break;
            case 'addbuttons':
                if (ButtonActions.Layout !== undefined) {
                    res = { Name: 'root', Index: 0, Group: null, Selector: null, Data: PatternSelectionEngine.ProcessGroupFields(action.Group.GroupFields, action.Path, action.Group, { Retrieve: false, Buttons: true }) };
                }
                break;
            case 'removebuttons': PatternSelectionEngine.RemoveButtons(action.Path); break;
            case 'showbuttons': PatternSelectionEngine.ShowButtons(action.Path); break;
            case 'hidebuttons': PatternSelectionEngine.HideButtons(action.Path); break;
            case 'alert': alert(action.Path.join(' ')); break;
            case 'select':
                break;
            default:
                break;

        }

        //var action = ButtonActions.Actions.find(function (e, i, a) { return e.ID === id; });
        //console.log(id);
        //console.log(action);

        //console.log($(this).attr('id'));
        //alert($(this).attr('id'));
        //alert(ID);
        //alert(Index);
        //alert(Actions[Index]);

    }
};

var ValueProcessors = {

    AddFakeName: function (Field, Params) {
        if (!Params) {
            return Field.Value;
        }
        Field.Value = Params;
        return [Field];
    },

    Append: function (Field, Params){
        if (!Params || Params.indexOf('<*>') === -1){
            return Field.Value;
        }
        Field.Value = Params.replace(/<\*>/, Field.Value);
        return [Field];
    },

    Pad: function (Field, Params) {
        if (Params === undefined) { Params = { Pad: 0, Char: ' ' }; }
        else {
            if (Params.Pad === undefined) { Params.Pad = 0; }
            if (Params.Char === undefined) { Params.Char = ' '; }
        }
        while (Field.Value.length < Params.Pad) { Field.Value += Params.Char; }
        return Field.Value;
    },

    CollapseWhiteSpace: function (Field, Params) {
        Field.Value = Field.Value.replace(/([\s]{2,})/g, ' ');
        return [Field];
    },
    TrimWhiteSpace: function (Field, Params) {
        Field.Value = Field.Value.replace(/^([\s]*)/g, '').replace(/([\s]*)$/g, '');
        return [Field];
    },
    Trim: function (Field, Params) {
        if (Params) {
            var trim = new RegExp('/^[' + Params + ']*/', 'g');
            Field.Value = Field.Value.replace(trim, '');
            trim = new RegExp('/[' + Params + ']*$/', 'g');
            Field.Value = Field.Value.replace(trim, '');
        }
        else { Field.Value = Field.Value.trim(); }
        return [Field];
    },
    Remove: function (Field, Params) {
        if (Params instanceof RegExp) { Field.Value = Field.Value.replace(Params, ''); }
        else if (Params instanceof Object) { Field.Value = Field.Value.replace(new RegExp(Params.Pattern, Params.Modifiers), ''); }
        else if (typeof (Params) === 'string') { Field.Value = Field.Value.replace(new RegExp(Params, 'g'), ''); }
        return [Field];
    },
    Replace: function (Field, Params) {
        if (Params instanceof Object) {
            if (Params.New === undefined) { Params.New = ''; }
            //Field.Value = Field.Value.replace(new RegExp(Params.Pattern, Params.Modifiers), Params.New);

            if (Params.Search instanceof RegExp) {
                Field.Value = Field.Value.replace(Params.Search, Params.New);
            }
            else if (Params.Search instanceof Object) {
                Field.Value = Field.Value.replace(new RegExp(Params.Search.Pattern, Params.Search.Modifiers), Params.New);
            }
            else if (typeof (Params.Search) === 'string') {
                Field.Value = Field.Value.replace(new RegExp(Params.Search, 'g'), Params.New);
            }
        }

        return [Field];
    },

    ParseHandle: function (Field, Params) {
        if (Field.Value.match(/^((http)(s)?(:\/\/))?([\w]{1,}[\.]){1,}[\w]{2,3}$/g)) {
            Field.Name = 'Website';
            Field.Value = ValueProcessors.Remove(Field, '^(http)(s)?(:\/\/)')[0].Value;
            return [Field];
        }

        if (Field.Value.match(/^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/g)) {
            Field.Name = 'Email';
            Field.Value = ValueProcessors.Remove(Field, '^(http)(s)?(:\/\/)')[0].Value;
            return [Field];
        }

        if (Field.Value.match(/^[A-Z]*$/g)) {
            Field.Name = 'Company';
            return [Field];
        }

        var words;
        if (Field.Value.search(/[\-_.]/g) >= 0) {
            words = ValueProcessors.SplitRegex(Field, /[\-_]/g).map(function (s) { return ValueProcessors.Trim(s, '\\-\\_')[0].Value; });
            Field.Value = words.join(' ').replace(/[\s]{2,}/g, ' ');
        }
        else if (Field.Value.indexOf(' ') === -1) {
            words = ValueProcessors.SplitRegex(Field, /(?=[A-Z])/).map(function (s) { return s.Value; });
            Field.Value = words.join(' ');
        }
        else { words = ValueProcessors.Split(Field, ' ').map(function (s) { return s.Value; }); }

        var pre = ['the'];
        var suf = ['the'];
        var int = ['co', 'company', 'inc', 'incorp', 'incorporated', 'est', 'established', 'establish', 'llc', 'llp', 'corp', 'corporation', 'coop', 'cooperative', 'limited', 'lc', 'ltd', 'assoc', 'association'];

        if ((pre.indexOf(words[0].toLowerCase().replace(/[.]/g, '')) >= 0) || (suf.indexOf(words[words.length - 1].toLowerCase().replace(/[.]/g, '')) >= 0)) {
            Field.Name = 'Company';
            return [Field];
        }

        for (var i = 0; i < words.length; i++) {
            if (int.indexOf(words[i].toLowerCase().replace(/[\s,;'.]/g, '')) >= 0) {
                Field.Name = 'Company';
                return [Field];
            }
        }

        Field.Name = 'FullName';
        var flds = ValueProcessors.SplitFullName(Field, undefined);

        if (flds.length > 2) { return flds; }

        Field.Name = 'Handle';
        return [Field];



        ///([a-z](?=[A-Z]))/g


    },
    SplitRegex: function (Field, Params) {
        return ValueProcessors.Split(Field, Params);
    },
    Split: function (Field, Params) {
        var vals = [];
        if (Params instanceof RegExp) { vals = Field.Value.split(Params); }
        else if (Params instanceof Object) { vals = Field.Value.split(new RegExp(Params.Pattern, Params.Modifiers)); }
        else if (typeof (Params) === 'string') { vals = Field.Value.split(new RegExp(Params, 'g')); }
        else { return [Field]; }

        var flds = [];
        for (var i = 0; i < vals.length; i++) { flds.push({ Name: Field.Name, Value: vals[i], Field: Field.Field, Selector: Field.Selector }); }
        return flds;
    },

    SplitFullName: function (Field, Params) {
        PatternSelectionEngine.Log(Field);
        var pre = ['ms', 'miss', 'mrs', 'mr', 'master', 'rev', 'reverend', 'fr', 'father', 'dr', 'doctor', 'atty', 'attorney', 'prof', 'professor', 'hon', 'honor', 'honorable', 'pres', 'president', 'gov', 'governor', 'coach', 'ofc', 'officer', 'supt', 'superintendent', 'rep', 'representative', 'sen', 'senator', 'amb', 'ambassador', 'treas', 'treasurer', 'sec', 'secretary', 'pvt', 'private', 'cpl', 'corporal', 'sgt', 'sargent', 'adm', 'administrative', 'maj', 'major', 'capt', 'captain', 'cmdr', 'commander', 'lt', 'lieutenant', 'lt col', 'lieutenant colonel', 'col', 'colonel', 'gen', 'general'];
        //'Msgr', 'Monsignor','Sr', 'Sister','Br', 'Brother',
        var suf = ['cpa', 'dc', 'dd', 'dds', 'dmd', 'do', 'dvm', 'edd', 'esq', 'esquire', 'ii', 'second', 'iii', 'third', 'iv', 'fourth', 'jd', 'jr', 'junior', 'lld', 'md', 'od', 'pc', 'pe', 'phd', 'rn', 'rnc', 'sr', 'senior', 'usa', 'usaf', 'usafr', 'usar', 'uscg', 'usmc', 'usmcr', 'usn', 'usnr'];

        var res = {};
        var parts = Field.Value.split(' ');

        while (pre.indexOf(parts[0].toLowerCase().replace(/[.]/g, '')) >= 0) {
            if (res.prefix === undefined) { res.prefix = parts[0]; }
            else { res.prefix += ' ' + parts[0]; }
            parts.splice(0, 1);
        }


        while (suf.indexOf(parts[parts.length - 1].toLowerCase().replace(/[.]/g, '')) >= 0) {
            if (res.suffix === undefined) { res.suffix = parts[parts.length - 1]; }
            else { res.suffix = parts[parts.length - 1] + ' ' + res.suffix; }
            parts.splice(parts.length - 1, 1);
        }

        var full = parts.join(' ');

        //PatternSelectionEngine.Log(res);
        if (full.match(/^[A-z]*$/g)) //First or Last
        {
            if (res.prefix !== undefined || res.suffix !== undefined) { res.last = parts[0]; }
            else { res.first = parts[0]; }
        } else if (full.match(/^[A-z]*[\s]{1,}[A-z]*$/g)) //First, Last
        {
            res.first = parts[0];
            res.last = parts[1];
        } else if (full.match(/^[A-z]*[\s]{1,}[A-z](.)?[\s]{1,}[A-z]*$/g)) //First, Middle (Initial), Last
        {
            res.first = parts[0];
            res.middle = parts[1];
            res.last = parts[2];
        } else if (full.match(/^[A-z]*[\s]{1,}[A-z]*[\s]{1,}[A-z]*$/g)) //First, Middle, Last
        {
            res.first = parts[0];
            res.middle = parts[1];
            res.last = parts[2];
        } else if (full.match(/^[A-z]*[\s]{1,}[A-z]*([\s]{1,}[A-z]*){2,}$/g)) //First, Middle, Last (Multiple)
        {
            res.first = parts[0];
            res.middle = parts[1];
            res.last = '';
            for (var i = 2; i < parts.length; i++) {
                res.last = res.last + ' ' + parts[i];
            }
            res.last = res.last.trim();
        }


        var flds = [];
        flds.push(Field);
        if (res.prefix) { flds.push({ Name: 'Prefix', Value: res.prefix, Field: Field.Field, Selector: Field.Selector }); }
        if (res.first) { flds.push({ Name: 'FirstName', Value: res.first, Field: Field.Field, Selector: Field.Selector }); }
        if (res.middle) { flds.push({ Name: 'MiddleName', Value: res.middle, Field: Field.Field, Selector: Field.Selector }); }
        if (res.last) { flds.push({ Name: 'LastName', Value: res.last, Field: Field.Field, Selector: Field.Selector }); }
        if (res.suffix) { flds.push({ Name: 'Suffix', Value: res.suffix, Field: Field.Field, Selector: Field.Selector }); }

        return flds;
    },

    SplitCompanyTitleSub: function (Value, Split1, Split2) {

        var res = {};

        var p1 = Value.split(Split1);
        PatternSelectionEngine.Log(Split1);
        PatternSelectionEngine.Log(p1);
        var p = p1[0];
        //PatternSelectionEngine.Log(p);
        var p2 = Value.match(Split1)[0];
        //PatternSelectionEngine.Log(p2);
        //PatternSelectionEngine.Log(Value.length);
        //PatternSelectionEngine.Log(p.length);
        //PatternSelectionEngine.Log(p2.length);


        var c = Value.substring(p.length + p2.length, Value.length);
        //PatternSelectionEngine.Log(c);

        if (Split2) {
            var c1 = c.split(Split2);
            //PatternSelectionEngine.Log(c1);
            if (c1.length > 2) {
                p2 = c.match(Split2);
                //PatternSelectionEngine.Log(p2);
                c = c1[0];
                for (var i = 1; i < c1.length - 1; i++) {
                    c = c + p2[i - 1] + c1[i];
                }
            } else { c = c1[0]; }
        }

        res.title = p.trim();
        res.company = c.trim();

        PatternSelectionEngine.Log(res);
        return res;
    },

    SplitCompanyTitle: function (Field, Params) {
        var res = {};
        //var parts = Field.Value.split(' ');
        var full = Field.Value;
        if (full.toLowerCase().indexOf('currently ') === 0) {
            full = full.substring(9, full.length).trim();
            //PatternSelectionEngine.Log(full);
        }
        if (full.toLowerCase().indexOf('a ') === 0 || full.toLowerCase().indexOf('@ ') === 0) {
            full = full.substring(1, full.length).trim();
            //PatternSelectionEngine.Log(full);
        } else if (full.toLowerCase().indexOf('an ') === 0 || full.toLowerCase().indexOf('at ') === 0) {
            full = full.substring(2, full.length).trim();
            //PatternSelectionEngine.Log(full);
        } else if (full.toLowerCase().indexOf('the ') === 0) {
            full = full.substring(3, full.length).trim();
            //PatternSelectionEngine.Log(full);
        }

        PatternSelectionEngine.Log(full);
        var paramsPassed = false;
        try {
            PatternSelectionEngine.Log(Params);
            if (Params && full.match(Params)) {
                PatternSelectionEngine.Log(full.match(Params));
                res = ValueProcessors.SplitCompanyTitleSub(full, Params, undefined);
                paramsPassed = true;
                PatternSelectionEngine.Log('Using Params');
            }
        } catch (e) { PatternSelectionEngine.Log(e); }

        if (!paramsPassed) {
            if (full.match(/([\s](contacted|employed|working)(([\s](@|at|with|by|for|through)|,)[\s]).*([\s](@|at|with|by|for|through)[\s]))/gi)) //Title at Company by Company
            { res = ValueProcessors.SplitCompanyTitleSub(full, /(?:[\s](?:contacted|employed|working)(?:(?:[\s](?:@|at|with|by|for|through)|,)[\s]))/gi, /(?:[\s](?:@|at|with|by|for|through)[\s])/gi); }
            else if (full.match(/([\s](contacted|employed|working))?(([\s](@|at|with|by|for|through))[\s])/gi)) //Title, Title at Company
            { res = ValueProcessors.SplitCompanyTitleSub(full, /(?:[\s](?:contacted|employed|working))?(?:(?:[\s](?:@|at|with|by|for|through))[\s])/gi, undefined); }
            else if (full.match(/([\s](contacted|employed|working))?(([\s](@|at|with|by|for|through)|,)[\s])/gi)) //Title at Company
            { res = ValueProcessors.SplitCompanyTitleSub(full, /(?:[\s](?:contacted|employed|working))?(?:(?:[\s](?:@|at|with|by|for|through)|,)[\s])/gi, undefined); }
        }

        var flds = [];
        flds.push(Field);
        if (res.company) { flds.push({ Name: 'Company', Value: res.company, Field: Field.Field, Selector: Field.Selector }); }
        if (res.title) { flds.push({ Name: 'Title', Value: res.title, Field: Field.Field, Selector: Field.Selector }); }

        return flds;
    },

    URLEncode: function (Field, Params) {
        Field.Value = encodeURIComponent(Field.Value);
        return [Field];
    },
    URLDecode: function (Field, Params) {
        //PatternSelectionEngine.Log('ValueProcessURLDecode');
        //PatternSelectionEngine.Log(Field);
        Field.Value = decodeURIComponent(Field.Value);
        return [Field];
    },
    HTMLEncode: function (Field, Params) {
        Field.Value = $('<div>').text(Field.Value).html();
        return [Field];
    },
    HTMLDecode: function (Field, Params) {
        Field.Value = $('<div>').html(Field.Value).text();
        return [Field];
    },
    ReplaceNonStandardCharacters: function (Field, Params) {
        Field.Value = Field.Value.replace(/[\xa0]/g, ' '); // Non-Breaking Space
        Field.Value = Field.Value.replace(/\u2013|\u2014/g, '-'); // EN Dash - EM Dash
        return [Field];
    },
    ReplaceNonBreakingSpaces: function (Field, Params) {
        Field.Value = Field.Value.replace(/[\xa0]/g, ' '); // Non-Breaking Space
        return [Field];
    },
    GetQueryStringParameter: function (Field, Params) {
        var results;
        if (Params) {
            var name = Params.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            var regex = new RegExp('[\\?&]' + name + '=([^&#]*)', 'g');
            //PatternSelectionEngine.Log(regex);
            //PatternSelectionEngine.Log(Field.Value);
            results = regex.exec(Field.Value);
            //PatternSelectionEngine.Log(results);
            if (results.length > 1) { Field.Value = (results === null ? '' : results[1]); }
        }
        return [Field];
    },
    RunValueProcess: function (Fields, Process) {
        var fields = Fields;
        //PatternSelectionEngine.Log(Fields);
        //PatternSelectionEngine.Log(Process);

        if (Process) {
            //PatternSelectionEngine.Log('Processing');
            if (!Process.Name) { Process = { Name: Process }; }
            for (var i = 0; i < Fields.length; i++) {
                var fn = ValueProcessors[Process.Name];
                if (typeof fn === 'function') {
                    fields = fn(Fields[i], Process.Params);
                }
            }
        }
        return fields;
    },

};

var PatternSelectionEngine = {
    Abs: true,

    Debug: true,

    Layout: null,

    Log: function (message) { if (PatternSelectionEngine.Debug) { console.log(message); } },

    RunValueProcess: function (Fields, Process) {
        return ValueProcessors.RunValueProcess(Fields, Process);
    },


    RunValueProcesses: function (Field, Processes) {
        //PatternSelectionEngine.Log(Field);
        //PatternSelectionEngine.Log(Processes);
        var fields = [Field];
        if (Processes) {
            for (var i = 0; i < Processes.length; i++) {
                fields = PatternSelectionEngine.RunValueProcess(fields, Processes[i]);
            }
        }
        return fields;
    },

    TrimPath: function (Path) {
        if (Path.length !== 0) {

            var path = Path.slice(0);
            path.splice(0, 1);
            return path;
        }
        return Path;
    },

    GetElement: function (Selector) {
        console.log(Selector);
        if (Selector === undefined || Selector.length === undefined || Selector.length === 0) { return $('HTML'); }

        //PatternSelectionEngine.Log(Selector);

        //var sels = Selector.trim().replace('  ', ' ').split(' IFRAME');
        var sel = Selector[0];
        var s = 0;
        while (s < Selector.length - 1 && (Selector[s + 1] === '' || Selector[s + 1].indexOf(':') === 0)) { sel += Selector[s + 1]; s++; }
        s++;

        var val = $(sel);

        //var iframe = false;
        var iframe = ((sel.toUpperCase().indexOf('IFRAME') === 0) ? true : false);
        //if (sels[s].indexOf('IFRAME') === 0) { iframe = true; }

        PatternSelectionEngine.Log(Selector);
        PatternSelectionEngine.Log(val);

        for (s = s; s < Selector.length; s++) {
            sel = Selector[s];
            while (s < Selector.length - 1 && (Selector[s + 1] === '' || Selector[s + 1].indexOf(':') === 0)) { sel += Selector[s + 1]; s++; }


            //sels[s] = PatternSelectionEngine.ReplaceNthOfType(sels[s]);
            PatternSelectionEngine.Log(Selector[s - 1] + ' || ' + sel + ' - ' + iframe);

            if (iframe) {
                val = $(val).contents().find(sel);
            } else {
                //PatternSelectionEngine.Log(val.length + ' - ' +  sels[s]);
                val = $(val).find(sel);
            }

            //iframe = true;
            iframe = ((sel.indexOf('IFRAME') === 0) ? true : false);
            //PatternSelectionEngine.Log(val);            
        }

        return val;
    },
    GetSelector: function (Element) {
        var resp = { 'Path': '', 'HasID': false, 'VariantID': false };
        var path = $(Element).prop('tagName');
        var classList;
        if ($(Element).attr('id') !== undefined) {
            resp.HasID = true;
            var id = $(Element).attr('id');
            if (id.match(/[\d]{3,500}/g)) {
                resp.VariantID = true;
                classList = id.split(/[\d]{3,500}/g);
                $.each(classList, function (index, item) {
                    if (item !== '') {
                        if (index === 0) { path += '[id^=' + item + ']'; }
                        else if (index === classList.length - 1) { path += '[id$=' + item + ']'; }
                        else { path += '[name*=' + item + ']'; }
                    }
                });
            } else {
                path += '#' + $(Element).attr('id');
            }
        }
        if ($(Element).attr('name') !== undefined) { path += '[name=' + $(Element).attr('name') + ']'; }
        if ($(Element).attr('class') !== undefined) {
            classList = $(Element).attr('class').split(/\s+/);
            $.each(classList, function (index, item) { if (item !== '' && item !== 'BLT_Hover' && item !== 'BLT_Field') { path += '.' + item; } });
        }
        resp.Path = path;
        return resp;
    },

    LocateParent: function (Element, Path) {
        var c = 1;
        if (c > 20) { return '* ' + Path; }
        $(Element).removeClass('BLT_Hover');
        if ($(Element).prop('tagName') === 'BODY') { return Path.join(' '); }

        var Parent = $(Element).parent();

        var resp = PatternSelectionEngine.GetSelector(Parent);
        Path.splice(0, 0, resp.Path);

        //PatternSelectionEngine.Log(Path.join(' '));

        if (resp.HasID === true && resp.VariantID === false) {
            //PatternSelectionEngine.Log($(Path.join(' ')).length + ' - ' + $(Parent).children(Path[1]).length);
            if ($(Path.join(' ')).length === 1 && PatternSelectionEngine.Abs === false) { return Path.join(' '); }
            else if ($(Parent).children(Path[1]).length > 1) {
                //PatternSelectionEngine.Log('B | ' + Selector + ' | ' + val.length);

                $(Parent).children(Path[1]).each(function (index, item) { if ($(item).is($(Element))) { Path[1] = Path[1] + ':nth-of-type(' + (index + 1) + ')'; } });
            }
        }

        return PatternSelectionEngine.LocateParent(Parent, Path);
    },


    GetMultiPath: function (Selector, Path) {
        var selectors = [];
        var subVals;
        var s = 0;
        if (Path.length === 0 || Selector.length === 0) { selectors.push(Selector); }
        else {

            var val = PatternSelectionEngine.GetElement(Selector);

            PatternSelectionEngine.Log('A | ' + Selector + ' | ' + val.length);
            PatternSelectionEngine.Log(Path);
            PatternSelectionEngine.Log(val);

            if (val.length > 1) {
                //var subVals = GetMultiPath(Selector, Path[0]);
                for (var v = 0; v < val.length; v++) {
                    //PatternSelectionEngine.Log('S ' + Selector + ':nth-of-type(' + (v + 1) + ') ' + Path[0]);
                    subVals = PatternSelectionEngine.GetMultiPath(Selector + ':eq(' + v + ') ' + Path[0], PatternSelectionEngine.TrimPath(Path));
                    for (s = 0; s < subVals.length; s++) {
                        selectors.push(subVals[s]);
                    }
                }
            } else {
                subVals = PatternSelectionEngine.GetMultiPath(Selector + ' ' + Path[0], PatternSelectionEngine.TrimPath(Path));
                for (s = 0; s < subVals.length; s++) {
                    //PatternSelectionEngine.Log('B | ' + subVals[s] + ' | ' + subVals.length);
                    selectors.push(subVals[s]);
                }
            }
        }
        //PatternSelectionEngine.Log(selectors);
        return selectors;
    },

    //GetMultiplePaths: function (Path, Selector) {
    //    var selectors = [];
    //    var path = Path.clone();
    //    path.push(Selector);
    //    var val = PatternSelectionEngine.GetElement(path);

    //    //PatternSelectionEngine.Log(Selector + ' | ' + val.length);
    //    //PatternSelectionEngine.Log(val);
    //    //if (val.length > 1) {
    //    //    var sels = Selector.trim().split(' ');
    //    //    //PatternSelectionEngine.Log(sels);
    //    //    selectors = PatternSelectionEngine.GetMultiPath(sels[0].trim(), PatternSelectionEngine.TrimPath(sels));
    //    //} else {
    //    //var path = Path.clone(); path.push(Selector);
    //    selectors.push(path);
    //    //}

    //    //PatternSelectionEngine.Log('=====================================================================================================================================');
    //    //PatternSelectionEngine.Log(selectors);
    //    return selectors;
    //},
    ProcessLayout: function (Layout, Path, Parent, Options) {

        if (Options !== undefined && Options.Buttons === true) {
            $('[capture=\'container\']').remove(); $('[capture=\'style\']').remove(); $('[capture=\'import\']').remove();
            if (Layout.ImportCSS !== undefined) {
                for (var i = 0; i < Layout.ImportCSS.length; i++) {
                    if (Layout.ImportCSS[i].indexOf('chrome-extension://__MSG_@@extension_id__') === 0) { Layout.ImportCSS[i] = chrome.extension.getURL('') + Layout.ImportCSS[i].replace('chrome-extension://__MSG_@@extension_id__/', ''); }
                    //PatternSelectionEngine.   loadCSSCors(Layout.ImportCSS[i]);
                    $('head').append($('<link>').attr('rel', 'stylesheet').attr('type', 'text/css').attr('capture', 'import').attr('crossorigin', 'anonymous').attr('href', Layout.ImportCSS[i]));
                }
            }
            if (Layout.ImportStyle !== undefined) { $('head').append($('<style>').attr('type', 'text/css').attr('capture', 'style').append(Layout.ImportStyle)); }
        }

        if (Options !== undefined && Options.Events === true) { PatternSelectionEngine.BindEvents([], Layout.Events); }

        // Correct for Old Layout
        if (Layout.GroupFields !== undefined) { Layout.Groups = Layout.GroupFields; }

        return PatternSelectionEngine.ProcessGroupFields(Layout.Groups, Path, Parent, Options);
    },

    RemoveButtons: function (Path) {
        var path = Path.clone();
        path.push('[capture = \'container\']');
        var buttons = PatternSelectionEngine.GetElement(path);
        buttons.remove();
    },
    HideButtons: function (Path) {
        var path = Path.clone();
        path.push('[capture = \'container\']');
        var buttons = PatternSelectionEngine.GetElement(path);
        buttons.css('display', 'none');
    },
    ShowButtons: function (Path) {
        var path = Path.clone();
        path.push('[capture = \'container\']');
        var buttons = PatternSelectionEngine.GetElement(path);
        buttons.css('display', null);
    },

    ProcessGroupFields: function (GroupFields, Path, Parent, Options, Targeted) {
        var data = [];
        var fg;

        for (fg = 0; fg < GroupFields.length; fg++) {
            var fieldGroup = GroupFields[fg];
            if (fieldGroup.Group !== undefined) {
                data = PatternSelectionEngine.ProcessGroup(fieldGroup, Path, Parent, data, Options, Targeted);
            } else if (fieldGroup.Field !== undefined) {
                if (Options === undefined || Options.Retrieve || (Options.Targeted && Targeted)) {
                    data = PatternSelectionEngine.ProcessField(fieldGroup, Path, Parent, data);
                }
            }
        }
        return data;
    },

    ProcessGroup: function (Group, Path, Parent, Data, Options, Targeted) {

        if (Group.Targeted) { Targeted = true; }

        var grp = {
            Name: Group.Group,
            GroupType: Group.GroupType,
            Index: 0,
            Group: Group,
            Selector: Path,
            Data: []
        };

        var paths = PatternSelectionEngine.BuildSelector(Path, Group.Selectors);
        paths = PatternSelectionEngine.QualifyPaths(paths, Group.Qualifiers);

        var p = 0;

        var skip = 0;
        var step = 1;
        var take = 0;

        if (Group.Instances !== undefined && Group.Instances !== '*') { Group.Take = Group.Instances; }

        if (Group.Skip) { skip = parseInt(Group.Skip); }
        if (Group.Step) { step = parseInt(Group.Step); }
        if (Group.Take) { take = parseInt(Group.Take); }

        var taken = 0;
        for (p = skip; p < paths.length; p += step) {
            if (skip > p) { continue; }

            if (take === 0 || taken < take) {

                if (Group.Multiple) {

                    grp.Data.push({
                        Name: Group.Group,
                        GroupType: (Group.GroupType === 'Profiles' ? 'Profile' : Group.GroupType),
                        Index: p + 1,
                        Group: Group,
                        Selector: paths[p],
                        Data: PatternSelectionEngine.ProcessGroupFields(Group.GroupFields, paths[p], Group, Options, Targeted)
                    });
                    if (Options !== undefined && Options.Buttons === true) { PatternSelectionEngine.ProcessContainers(Group, paths[p], Options); }
                    if (Options !== undefined && Options.Events === true) { PatternSelectionEngine.BindEvents([], Group.Events); }
                } else {
                    if (PatternSelectionEngine.QualifyPath(paths[p], Group.Qualifiers)) {
                        grp.Data = grp.Data.concat(PatternSelectionEngine.ProcessGroupFields(Group.GroupFields, paths[p], Group, Options, Targeted));
                        if (taken === 0) {
                            if (Options !== undefined && Options.Buttons === true) { PatternSelectionEngine.ProcessContainers(Group, paths[p], Options); }
                            if (Options !== undefined && Options.Events === true) { PatternSelectionEngine.BindEvents([], Group.Events); }
                        }
                    }
                }
                taken++;
            }
        }

        if (grp.Data.length > 0) {
            //PatternSelectionEngine.Log(grp.Data);
            //for (s = 0; s < grp.Data.length; s++) { grp.Data[s].Index = s + 1; }
            Data.push(grp);
        }
        return Data;
    },

    BuildSelector: function (Path, Selectors, Qualifiers) {
        var paths = [];
        var path = [];
        var s;
        if (Selectors instanceof Array) {
            for (s = 0; s < Selectors.length; s++) { paths = paths.concat(PatternSelectionEngine.BuildSelector(Path, Selectors[s], undefined)); }
        } else if (Selectors instanceof Object) {
            path = PatternSelectionEngine.GetScopePath(Path, Selectors.Scope);
            var ps = PatternSelectionEngine.BuildSelector(path, Selectors.Selector, Selectors.Qualifiers);
            for (s = 0; s < ps.length; s++) {
                paths = paths.concat(PatternSelectionEngine.BuildSelector(ps[s], Selectors.Selectors, undefined));
            }
        } else if (typeof Selectors === 'string') {
            path = Path.clone();
            path.push(Selectors);
            var vals = PatternSelectionEngine.GetElement(path);
            if (vals.length == 1) { paths.push(path); }
            else {
                for (var v = 0; v < vals.length; v++) {
                    var p = path.clone();
                    p[p.length - 1] = p[p.length - 1] + ':eq(' + v + ')';
                    paths.push(p);
                }
            }
            //paths.push(path);
        } else { paths.push(Path); }

        return PatternSelectionEngine.QualifyPaths(paths, Qualifiers);
        //return paths;
    },
    QualifyPaths: function (Paths, Qualifiers) {
        var paths = [];
        if (Qualifiers instanceof Array) {
            if (Qualifiers !== undefined) {
                var p;
                for (p = 0; p < Paths.length; p++) {
                    if (Paths[p] instanceof Array && PatternSelectionEngine.QualifyPath(Paths[p], Qualifiers)) {
                        paths.push(Paths[p]);
                    }
                }
            }
            return paths;
        } else { return Paths; }
    },
    QualifyPath: function (Path, Qualifiers) {

        if (Qualifiers instanceof Array) {
            var q;
            for (q = 0; q < Qualifiers.length; q++) { if (!PatternSelectionEngine.QualifyPath(Path, Qualifiers[q])) { return false; } }
        } else if (Qualifiers instanceof Object) {

            var path = PatternSelectionEngine.GetScopePath(Path, Qualifiers.Scope);
            var res = [];
            var vals;
            if (Qualifiers.Selectors !== undefined) {
                for (var s = 0 ; s < Qualifiers.Selectors.length; s++) {
                    var paths = [];
                    paths = PatternSelectionEngine.BuildSelector(path, Qualifiers.Selectors[s]);

                    if (paths.length === 0) { res.push(PatternSelectionEngine.QualifyValue(undefined, Qualifiers)); continue; }

                    var p;
                    for (p = 0; p < paths.length; p++) {
                        vals = PatternSelectionEngine.GetElement(paths[p]);
                        res.push(PatternSelectionEngine.QualifyValue(vals, Qualifiers));
                    }
                }
            } else {
                vals = PatternSelectionEngine.GetElement(path);
                res.push(PatternSelectionEngine.QualifyValue(vals, Qualifiers));
            }


            var r;
            if (Qualifiers.Operand == 'Or') {
                if (Qualifiers.Not) { for (r = 0; r < res.length; r++) { if (!res[r]) { return true; } } }
                else { for (r = 0; r < res.length; r++) { if (res[r]) { return true; } } }
                return false;
            } else {
                if (Qualifiers.Not) { for (r = 0; r < res.length; r++) { if (!res[r]) { } else { return false; } } }
                else { for (r = 0; r < res.length; r++) { if (res[r]) { } else { return false; } } }
                return true;
            }
        }

        return true;
    },

    QualifyValue: function (Values, Qualifier, Attribute) {
        if (Values === undefined) { Values = []; }
        var val = PatternSelectionEngine.GetValue(Values, Attribute);
        switch (Qualifier.ValidationType) {
            case 'NotExists':
                if (Values.length === 0) { return true; } else { return false; } break;
            case 'Equals':
                if (val === Qualifier.Value) { return true; } else { return false; } break;
            case 'Matches':
                if (val === Qualifier.Value) { return true; } else { return false; } break;
            case 'Quantity':
                var qty = 0;
                if (Values) { qty = Values.length; }
                val = parseInt(Qualifier.Value);
                switch (Qualifier.Operand) {
                    case '>': if (Values.length > val) { return true; } else { return false; } break;
                    case '>=': if (Values.length >= val) { return true; } else { return false; } break;
                    case '<': if (Values.length < val) { return true; } else { return false; } break;
                    case '<=': if (Values.length <= val) { return true; } else { return false; } break;
                    case '!=': if (Values.length !== val) { return true; } else { return false; } break;
                    default: if (Values.length === val) { return true; } else { return false; } break; // '='
                }
                return false;
            default:
                if (Values.length < 1) { return false; } else { return true; } break;  // 'Exists'
        }
        return false;
    },
    GetScopePath: function (Path, Scope) {
        if (Scope !== undefined) {
            var path = [];
            var i = 0;
            if (Scope > 0) { for (i = 0; i < Scope && i < Path.length ; i++) { path.push(Path[i]); } }
            else if (Scope < 0) { for (i = 0; i < Path.length + Scope && i < Path.length  ; i++) { path.push(Path[i]); } }
            return path;
        }
        return Path;
    },

    BindEvents: function (Path, Event, Group) {
        if (Event === undefined) { return; }

        if (Event instanceof Array) {
            for (var i = 0; i < Event.length; i++)
            { PatternSelectionEngine.BindEvents(Path, Event[i], Group); }
        } else if (Event instanceof Object) { PatternSelectionEngine.GenerateEventFromObject(Path, Event, Group); }
        else if (typeof Event === 'string') { PatternSelectionEngine.GenerateEventFromString(Path, Event, Group); }
    },
    ValidEvents: ['blur', 'change', 'click', 'dblclick', 'hover', 'error', 'focus', 'focusin', 'focusout', 'keydown', 'keyup', 'keypress', 'load', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'ready', 'resize', 'scroll', 'select', 'submit', 'unload'],
    GenerateEventFromObject: function (Path, Event, Group) {
        if (Event === undefined) { return undefined; }

        var paths = PatternSelectionEngine.BuildSelector(Path, Event.Selectors, Event.Qualifiers);

        if (Event.Event !== undefined && PatternSelectionEngine.ValidEvents.indexOf(Event.Event.toLowerCase()) === -1) { return; }


        for (var p = 0; p < paths.length; p++) {
            var vals = PatternSelectionEngine.GetElement(paths[p]);

            for (var v = 0; v < vals.length; v++) {
                var action = PatternSelectionEngine.GenerateAction('Event', Event.Action, Group, Path, vals[v]);

                if (Event.Event === undefined) { $(vals[v]).click(action, ButtonActions.ExecuteClick); continue; }

                if ($(vals[v])[Event.Event.toLowerCase()] !== undefined) {
                    $(vals[v])[Event.Event](action, ButtonActions.ExecuteClick);
                }
            }
        }
    },
    GenerateEventFromString: function (Path, Event, Group) {
        var props = PatternSelectionEngine.ParseProps({ Source: Event });

        switch (Event.toLowerCase()) {
            case 'capture_contact_button_logo': case 'capturelogo': case 'capturebuttonlogo': case 'capturebuttontext':
                if (props.Style === undefined || props.Style === '') { props.Style = 'height: 16px;'; } else { props.Style = 'height: 16px; ' + props.Style; }
                if (props.Class === undefined || props.Class === '') { props.Class = 'Capture_Injected_Button_Logo'; } else { props.Class = 'Capture_Injected_Button_Logo ' + props.Class; }
                return PatternSelectionEngine.GeneratEventFromObject(Path, props, Group);
            case 'capture_contact_button_icon': case 'captureicon': case 'capturebuttonicon':
                if (props.Style === undefined || props.Style === '') { props.Style = 'height: 16px;'; } else { props.Style = 'height: 16px; ' + props.Style; }
                if (props.Class === undefined || props.Class === '') { props.Class = 'Capture_Injected_Button_Logo'; } else { props.Class = 'Capture_Injected_Button_Logo ' + props.Class; }
                return PatternSelectionEngine.GeneratEventFromObject(Path, props, Group);
            case 'capture_group_button_logo': case 'capturegrouplogo': case 'capturegroupbuttonlogo': case 'capturegroupbuttontext':
                if (props.Style === undefined || props.Style === '') { props.Style = 'height: 16px;'; } else { props.Style = 'height: 16px; ' + props.Style; }
                if (props.Class === undefined || props.Class === '') { props.Class = 'Capture_Injected_Button_Logo'; } else { props.Class = 'Capture_Injected_Button_Logo ' + props.Class; }
                return PatternSelectionEngine.GeneratEventFromObject(Path, props, Group);
            case 'capture_group_button_icon': case 'capturegroupicon': case 'capturegroupbuttonicon':
                if (props.Style === undefined || props.Style === '') { props.Style = 'height: 16px;'; } else { props.Style = 'height: 16px; ' + props.Style; }
                if (props.Class === undefined || props.Class === '') { props.Class = 'Capture_Injected_Button_Logo'; } else { props.Class = 'Capture_Injected_Button_Logo ' + props.Class; }

                return PatternSelectionEngine.GeneratEventFromObject(Path, props, Group);
            default:
                try {
                    var container = $(Event);
                    $(parent).append(container);
                    return container;
                } catch (e) { return undefined; }
                return undefined;
        }
        return undefined;
    },

    ProcessContainers: function (Group, Path, Options) {
        console.log(Group);
        console.log(Options);

        if (Group.Buttons !== undefined) { Group.Containers = Group.Buttons; }

        if (Group.Containers !== undefined && Options !== undefined && Options.Buttons) {
            return PatternSelectionEngine.GenerateContainers(Path, Group.Containers, Group);
        }
        return undefined;
    },
    GetLastContainer: function (Container) {
        if ($(Container).children().length === 0) { return Container; }
        return PatternSelectionEngine.GetLastContainer($(Container).children().last());
    },

    GenerateContainers: function (Path, Container, Group) {
        if (Container === undefined) { return undefined; }

        if (Container instanceof Array) {
            var containers = [];
            for (var i = 0; i < Container.length; i++)
            { containers.push(PatternSelectionEngine.GenerateContainers(Path, Container[i], Group)); }
            return containers;
        } else if (Container instanceof Object) { return [PatternSelectionEngine.GenerateContainerFromObject(Path, Container, Group)]; }
        else if (typeof Container === 'string') { return [PatternSelectionEngine.GenerateContainerFromString(Path, Container, Group)]; }
        else { return undefined; }
    },
    GenerateContainerFromObject: function (Path, Container, Group) {
        if (Container === undefined) { return undefined; }

        if (Container.Buttons === undefined || Container.Buttons === null || Container.Buttons.length === 0) { return undefined; }

        var container = '';

        container += '<' + (Container.Type !== undefined && Container.Type !== '' ? Container.Type : 'DIV') + ' capture=\'container\' ';
        if (Container.Class !== undefined && Container.Class !== '') { container += 'class=\'' + Container.Class + '\' '; }
        if (Container.Style !== undefined && Container.Style !== '') { container += 'style=\'' + Container.Style + '\' '; }

        if (Container.Attributes !== undefined && Container.Attributes !== '') { container += Container.Attributes + ' '; }

        container += '>';
        if (Container.Contents !== undefined && Container.Contents !== '') { container += Container.Contents; }
        container += '</' + (Container.Type !== undefined && Container.Type !== '' ? Container.Type : 'DIV') + '>';

        container = $(container);

        var paths = PatternSelectionEngine.BuildSelector(Path, Container.Selectors, Container.Qualifiers);

        for (var p = 0; p < paths.length; p++) {
            if (Container.Inner !== undefined) { PatternSelectionEngine.GenerateInner(container, Container.Inner); }

            var parent = PatternSelectionEngine.GetElement(paths[p]);

            if (Container.Position !== undefined) {
                switch (Container.Position.toLowerCase()) {
                    case 'before': $(parent).before(container); break;
                    case 'prepend': $(parent).prepend(container); break;
                    case 'append': $(parent).append(container); break;
                    case 'after': $(parent).after(container); break;
                    case 'wrap': $(parent).wrap(container); break;
                    case 'wrapinner': $(parent).wrapInner(container); break;
                    default: $(parent).append(container); break;
                }
            } else { $(parent).append(container); }
        }

        PatternSelectionEngine.GenerateButtons(PatternSelectionEngine.GetLastContainer(container), Container.Buttons, Group, Path);

        return container;
    },
    GenerateContainerFromString: function (Path, Container, Group) {
        if (Container === undefined) { return undefined; }

        var props = PatternSelectionEngine.ParseProps({ Source: Container });

        switch (props.Value.toLowerCase()) {
            case 'capture_contact_button_logo': case 'capturelogo': case 'capturebuttonlogo': case 'capturebuttontext':
                props = PatternSelectionEngine.FillContainerDefaults(props);
                if (props.Buttons === undefined || props.Buttons === '') { props.Buttons = ['capture_contact_button_logo' + (props.Style !== undefined ? '|' + props.Style : '')]; props.Style = undefined; }
                return PatternSelectionEngine.GenerateContainerFromObject(Path, props, Group);
            case 'capture_contact_button_icon': case 'captureicon': case 'capturebuttonicon':
                props = PatternSelectionEngine.FillContainerDefaults(props);
                if (props.Buttons === undefined || props.Buttons === '') { props.Buttons = ['capture_contact_button_icon' + (props.Style !== undefined ? '|' + props.Style : '')]; props.Style = undefined; }
                return PatternSelectionEngine.GenerateContainerFromObject(Path, props, Group);
            case 'capture_group_button_logo': case 'capturegrouplogo': case 'capturegroupbuttonlogo': case 'capturegroupbuttontext':
                props = PatternSelectionEngine.FillContainerDefaults(props);
                if (props.Buttons === undefined || props.Buttons === '') { props.Buttons = ['capture_group_button_logo' + (props.Style !== undefined ? '|' + props.Style : '')]; props.Style = undefined; }
                return PatternSelectionEngine.GenerateContainerFromObject(Path, props, Group);
            case 'capture_group_button_icon': case 'capturegroupicon': case 'capturegroupbuttonicon':
                props = PatternSelectionEngine.FillContainerDefaults(props);
                if (props.Buttons === undefined || props.Buttons === '') { props.Buttons = ['capture_group_button_icon' + (props.Style !== undefined ? '|' + props.Style : '')]; props.Style = undefined; }
                return PatternSelectionEngine.GenerateContainerFromObject(Path, props, Group);
            case '':
                return PatternSelectionEngine.GenerateContainerFromObject(Path, props, Group);
            default:
                try {
                    var container = $(Container);
                    $(parent).append(container);
                    return container;
                } catch (e) { return undefined; }
                return undefined;
        }
        return undefined;
    },
    FillContainerDefaults: function (Props) {
        if (Props.Class === undefined || Props.Class === '') { Props.Class = 'Capture_Injected_Container_Inline'; }
        if (Props.Position === undefined || Props.Position === '') { Props.Position = 'append'; }
        if (Props.Type === undefined || Props.Type === '') { Props.Type = 'SPAN'; }
        if (Props.Scope === undefined || Props.Scope === '') { Props.Scope = 0; }
        if (Props.Selectors === undefined || Props.Selectors === '') { Props.Selectors = '*:eq(0)'; }
        return Props;
    },

    GenerateButtons: function (Container, Button, Group, Path) {
        if (Button === undefined) { return undefined; }
        if (Button instanceof Array) {
            var buttons = [];
            for (var i = 0; i < Button.length; i++)
            { buttons.push(PatternSelectionEngine.GenerateButtons(Container, Button[i], Group, Path)); }
            return buttons;
        } else if (Button instanceof Object) { return [PatternSelectionEngine.GenerateButtonFromObject(Container, Button, Group, Path)]; }
        else if (typeof Button === 'string') { return [PatternSelectionEngine.GenerateButtonFromString(Container, Button, Group, Path)]; }

        return undefined;
    },
    GenerateButtonFromObject: function (Container, Button, Group, Path) {
        if (Button === undefined) { return undefined; }

        if (Button.Action === undefined) { return undefined; }

        var id = PatternSelectionEngine.GenerateID('Button');
        var button = '';

        button += '<' + (Button.Type !== undefined && Button.Type !== '' ? Button.Type : 'DIV') + ' ';
        button += 'id=\'' + id + '\' ';
        if (Button.Class !== undefined && Button.Class !== '') { button += 'class=\'' + Button.Class + '\' '; }
        if (Button.Style !== undefined && Button.Style !== '') { button += 'style=\'' + Button.Style + '\' '; }
        button += 'title=\'' + (Button.Title !== undefined && Button.Title !== '' ? Button.Title : 'Click to Capture!') + '\' ';

        if (Button.Attributes !== undefined && Button.Attributes !== '') { button += Button.Attributes + ' '; }

        button += '>';
        if (Button.Contents !== undefined && Button.Contents !== '') { button += Button.Contents; }
        button += '</' + (Button.Type !== undefined && Button.Type !== '' ? Button.Type : 'DIV') + '>';

        button = $(button);

        $(Container).append(button);

        $(button).click(PatternSelectionEngine.GenerateAction(id, Button.Action, Group, Path, button[0]), ButtonActions.ExecuteClick);

        if (Button.Inner !== undefined) { PatternSelectionEngine.GenerateInner(button, Button.Inner); }

        //PatternSelectionEngine.GenerateButton($('#' + Action.ID), Button.Inner);
        return button;
    },
    GenerateButtonFromString: function (Container, Button, Group, Path) {
        if (Button === undefined) { return undefined; }

        var props = PatternSelectionEngine.ParseProps({ Source: Button });


        switch (props.Value.toLowerCase()) {
            case 'capture_contact_button_logo': case 'capturelogo': case 'capturebuttonlogo': case 'capturebuttontext':
                if (props.Action === undefined || props.Action === '') { props.Action = 'Capture'; }
                if (props.Title === undefined || props.Title === '') { props.Title = 'Capture Contact'; }
                if (props.Inner === undefined || props.Inner === '') { props.Inner = '<img />'; }
                if (props.Style === undefined || props.Style === '') { props.Style = PatternSelectionEngine.GetDefualtButtonStyle(props.Param); }
                if (props.Class === undefined || props.Class === '') { props.Class = 'Capture_Injected_Button_Logo'; }
                return PatternSelectionEngine.GenerateButtonFromObject(Container, props, Group, Path);
            case 'capture_contact_button_icon': case 'captureicon': case 'capturebuttonicon':
                if (props.Action === undefined || props.Action === '') { props.Action = 'Capture'; }
                if (props.Title === undefined || props.Title === '') { props.Title = 'Capture Contact'; }
                if (props.Inner === undefined || props.Inner === '') { props.Inner = '<img />'; }
                if (props.Style === undefined || props.Style === '') { props.Style = PatternSelectionEngine.GetDefualtButtonStyle(props.Param); }
                if (props.Class === undefined || props.Class === '') { props.Class = 'Capture_Injected_Button_Icon'; }
                return PatternSelectionEngine.GenerateButtonFromObject(Container, props, Group, Path);
            case 'capture_group_button_logo': case 'capturegrouplogo': case 'capturegroupbuttonlogo': case 'capturegroupbuttontext':
                if (props.Action === undefined || props.Action === '') { props.Action = 'CaptureGroup'; }
                if (props.Title === undefined || props.Title === '') { props.Title = 'Capture Group'; }
                if (props.Inner === undefined || props.Inner === '') { props.Inner = '<img />'; }
                if (props.Style === undefined || props.Style === '') { props.Style = PatternSelectionEngine.GetDefualtButtonStyle(props.Param); }
                if (props.Class === undefined || props.Class === '') { props.Class = 'Capture_Injected_Button_Logo'; }
                return PatternSelectionEngine.GenerateButtonFromObject(Container, props, Group, Path);
            case 'capture_group_button_icon': case 'capturegroupicon': case 'capturegroupbuttonicon':
                if (props.Action === undefined || props.Action === '') { props.Action = 'CaptureGroup'; }
                if (props.Title === undefined || props.Title === '') { props.Title = 'Capture Group'; }
                if (props.Inner === undefined || props.Inner === '') { props.Inner = '<img />'; }
                if (props.Style === undefined || props.Style === '') { props.Style = PatternSelectionEngine.GetDefualtButtonStyle(props.Param); }
                if (props.Class === undefined || props.Class === '') { props.Class = 'Capture_Injected_Button_Icon'; }
                return PatternSelectionEngine.GenerateButtonFromObject(Container, props, Group, Path);
            case '':
                return PatternSelectionEngine.GenerateContainerFromObject(Path, props, Group);
            default:
                return undefined;
        }
        return undefined;
    },

    GetDefualtButtonStyle: function (Param) {
        switch (Param) {
            case 'XS': case 'ExtraSmall': return 'height: 8px,';
            case 'S': case 'Small': return 'height: 12px,';
            case 'M': case 'Medium': return 'height: 16px,';
            case 'L': case 'Large': return 'height: 20px,';
            case 'XL': case 'ExtaLarge': return 'height: 24px,';
            default: return '16px';
        }
    },
    GenerateInner: function (Parent, Inner) {
        if (Inner === undefined) { return undefined; }

        if (Inner instanceof Array) {
            var inners = [];
            for (var i = 0; i < Inner.length; i++)
            { inners.push(PatternSelectionEngine.GenerateInner(Parent, Inner[i])); }
            return Parent;
        } else if (Inner instanceof Object) { return [PatternSelectionEngine.GenerateInnerFromObject(Parent, Inner)]; }
        else if (typeof Inner === 'string') { return [PatternSelectionEngine.GenerateInnerFromString(Parent, Inner)]; }

        return undefined;
    },
    GenerateInnerFromObject: function (Parent, Inner) {
        if (Inner === undefined) { return undefined; }

        var inner = '';

        inner += '<' + (Inner.Type !== undefined && Inner.Type !== '' ? Inner.Type : 'DIV') + ' ';
        if (Inner.Class !== undefined && Inner.Class !== '') { inner += 'class=\'' + Inner.Class + '\' '; }
        if (Inner.Style !== undefined && Inner.Style !== '') { inner += 'style=\'' + Inner.Style + '\' '; }

        if (Inner.Attributes !== undefined && Inner.Attributes !== '') { inner += Inner.Attributes + ' '; }

        inner += '>';
        if (Inner.Contents !== undefined && Inner.Contents !== '') { inner += Inner.Contents; }
        inner += '</' + (Inner.Type !== undefined && Inner.Type !== '' ? Inner.Type : 'DIV') + '>';

        //inner += 'onclick='javascript:InnerActions.ExecuteAction(this, ' + (InnerActions.Actions.length - 1) + ', \'' + action.ID + '\');' ';

        inner = $(inner);

        $(Parent).append(inner);

        if (Inner.Inner !== undefined) { PatternSelectionEngine.GenerateInner(inner, Inner.Inner); }

        //PatternSelectionEngine.GenerateInner($('#' + Action.ID), Inner.Inner);
        return inner;
    },
    GenerateInnerFromString: function (Parent, Inner) {
        if (Inner === undefined) { return undefined; }

        var props = PatternSelectionEngine.ParseProps({ Source: Inner });

        if (props.Value === '') {
            return PatternSelectionEngine.GenerateInner(Parent, props);
        } else {
            $(Parent).append($(Inner));
        }

        return undefined;
    },

    ParseProps: function (Props) {
        if (Props === undefined) { return { Value: '' }; }

        var props = Props.Source.indexOf('{');
        Props.Value = Props.Source;

        if (props > 0) {
            Props.Value = Props.Source.substring(0, props);
            props = Props.Source.substring(props);
            try {
                props = JSON.parse(props);
                props.Value = Props.Value;
                props.Source = Props.Source;
                Props = props;
            } catch (e) { }
        } else {
            props = Props.Source.indexOf('|');
            if (props > 0) {
                Props.Value = Props.Source.substring(0, props);
                Props.Style = Props.Source.substring(props + 1);
            }
        }

        var parts = Props.Value.split('.');
        if (parts.length > 0) {
            Props.Param = parts[parts.length - 1];
            Props.Button = parts.splice(0, parts.length - 1).join('.');
        }

        return Props;
    },


    SetAction: function (Action, NewAction) { if (Action !== undefined) { Action.Action = NewAction; } return Action; },

    GenerateID: function (Type) {
        switch (Type) {
            case 'E': case 'Event': return 'C_E_' + PatternSelectionEngine.GenerateGUID();
            case 'B': case 'Button': return 'C_B_' + PatternSelectionEngine.GenerateGUID();
            case 'C': case 'Container': return 'C_C_' + PatternSelectionEngine.GenerateGUID();
            default: return 'C_' + Type + '_' + PatternSelectionEngine.GenerateGUID();
        }
        return 'C_' + Type + '_' + PatternSelectionEngine.GenerateGUID();
    },
    GenerateAction: function (ID, Action, Group, Path, Sender, Event) {
        if (ID === undefined) { ID = PatternSelectionEngine.GenerateID(); }
        else if (ID.length < 20) { ID = PatternSelectionEngine.GenerateID(ID); }
        var action = { ID: ID, Action: Action, Group: Group, Path: Path, Sender: Sender };
        ButtonActions.Actions.push(action);
        return action;
    },

    SortButtons: function (a, b) {
        if (a === undefined && b === undefined) { return 0; }
        if (a === undefined) { return 1; }
        if (b === undefined) { return -1; }

        if (typeof a === 'string' && a.match(/^[0-9]{1,}(-)[a-zA-Z.]*$/g)) { a = { Ordinal: parseInt(a.split('-')[0]) }; }
        if (typeof b === 'string' && b.match(/^[0-9]{1,}(-)[a-zA-Z.]*$/g)) { b = { Ordinal: parseInt(b.split('-')[0]) }; }

        if (a.Ordinal === undefined && b.Ordinal === undefined) { return 0; }
        if (a.Ordinal === undefined) { return 1; }
        if (b.Ordinal === undefined) { return -1; }
        return a.Ordinal - b.Ordinal;
    },
    RemoveOrdinals: function (Buttons) {
        for (var b = 0; b < Buttons.length; b++) {
            if (Buttons[b] instanceof Object) { }
            else if (typeof Buttons[b] === 'string') {
                if (Buttons[b].match(/^[0-9]{1,}(-)[a-zA-Z.]*$/g)) {
                    var bps = Buttons[b].split('-');
                    Buttons[b] = bps[1];
                    //console.log(Buttons[b]);
                }
            } else { Buttons.splice(b, 1); b--; }
        }
        return Buttons;
    },
    GenerateGUID: function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
        return uuid;
    },
    GetValue: function (Elements, Attribute) {
        if (Attribute) {
            switch (Attribute) {
                case 'html': return $(Elements).html(); break;
                case 'text': return $(Elements).text(); break;
                default: return $(Elements).attr(Attribute); break;
            }
        }
        else { return $(Elements).text(); }
    },
    ProcessField: function (Field, Path, Parent, Data) {
        var paths = [];
        var dataFound = false;
        var fldData = { Name: Field.Field, Value: null, Field: Field, Path: null };
        for (var s = 0; s < Field.Selectors.length; s++) {

            paths = PatternSelectionEngine.BuildSelector(Path, Field.Selectors[s]);
            paths = PatternSelectionEngine.QualifyPaths(paths, Field.Qualifiers);

            for (var p = 0; p < paths.length; p++) {
                var vals = PatternSelectionEngine.GetElement(paths[p]);
                for (var v = 0; v < vals.length; v++) {
                    var val = vals[v];
                    var path = paths[p].clone();
                    //path[path.length - 1] = path[path.length - 1] + ':eq(' + v + ')';
                    //if (!PatternSelectionEngine.QualifyPath(path, Field.Qualifiers)) { continue; }

                    //PatternSelectionEngine.Log(val.text());
                    //if (val === '' || val === undefined || val === null || val.length === 0) { continue; }

                    var fld = { Name: Field.Field, Value: PatternSelectionEngine.GetValue(val, Field.Selectors[s].Attribute), Field: Field, Path: path };

                    var fields = PatternSelectionEngine.RunValueProcesses(fld, Field.Selectors[s].Processors);

                    //PatternSelectionEngine.Log(fields);
                    Data = Data.concat(fields);

                    if (Field.Keep === undefined || Field.Keep === 'FirstValue') { return Data; }
                    dataFound = true;
                }

                //var val = PatternSelectionEngine.GetElement(paths[p]);

                ////PatternSelectionEngine.Log(val.text());
                //if (val === '' || val === undefined || val === null || val.length === 0) {
                //    //Data.push();
                //    //if (Field.Keep === undefined || Field.Keep === 'FirstValue') { return Data; }
                //    //dataFound = true;
                //    continue;
                //}

                //for (var v = 0; v < val.length; v++) {

                //    var fld = { Name: Field.Field, Value: null, Field: Field, Path: paths[p] };

                //    if (Field.Selectors[s].Attribute) {
                //        switch (Field.Selectors[s].Attribute) {
                //            case 'html': fld.Value = $(val[v]).html(); break;
                //            case 'text': fld.Value = $(val[v]).text(); break;
                //            default: fld.Value = $(val[v]).attr(Field.Selectors[s].Attribute); break;
                //        }
                //    }
                //    else { fld.Value = $(val[v]).text(); }

                //    var fields = PatternSelectionEngine.RunValueProcesses(fld, Field.Selectors[s].Processors);

                //    //PatternSelectionEngine.Log(fields);
                //    Data = Data.concat(fields);

                //    if (Field.Keep === undefined || Field.Keep === 'FirstValue') { return Data; }
                //    dataFound = true;
                //}

                if (dataFound && (Field.Keep === undefined || Field.Keep === 'FirstSelector')) { return Data; }
            }
        }
        if (!dataFound) { Data.push(fldData); }
        return Data;
    },

    DetermineLayout: function (Patterns) {
        var found = false;
        var p;
        var up;
        var i;
        var l;
        PatternSelectionEngine.Log(Patterns);
        PatternSelectionEngine.Log(Patterns.length);

        for (i = 0; i < Patterns.length; i++) {
            var pattern = Patterns[i];
            PatternSelectionEngine.Log(pattern);
            PatternSelectionEngine.Log(location.host);
            found = false;
            if (pattern.Domains.indexOf(location.host) >= 0) { found = true; }
            else {
                for (p = 0; p < pattern.Domains.length; p++) {
                    PatternSelectionEngine.Log(pattern.Domains[p]);
                    if (location.host.match(new RegExp(pattern.Domains[p], 'g'))) { found = true; break; }
                }
            }

            if (!found && pattern.UserDomains) {
                if (pattern.UserDomains.indexOf(location.host) >= 0) { found = true; }
                else {
                    for (p = 0; p < pattern.UserDomains.length; p++) {
                        PatternSelectionEngine.Log(pattern.Domains[p]);
                        if (location.host.match(new RegExp(pattern.Domains[p], 'g'))) { found = true; break; }
                    }
                }
            }

            if (found) {
                PatternSelectionEngine.Log('Matched Domain: Paths: ' + pattern.Paths.length);
                for (p = 0; p < pattern.Paths.length; p++) {
                    found = false;
                    var path = pattern.Paths[p];
                    PatternSelectionEngine.Log(path);
                    PatternSelectionEngine.Log(document.URL);
                    for (up = 0; up < path.UrlPatterns.length; up++) {
                        PatternSelectionEngine.Log(path.UrlPatterns[up]);
                        if (document.URL.match(new RegExp(path.UrlPatterns[up], 'g'))) { PatternSelectionEngine.Log(path.UrlPatterns[up]); found = true; break; }
                    }

                    if (found) {
                        PatternSelectionEngine.Log('Matched Path: Layouts: ' + path.Layouts.length);
                        found = false;
                        for (l = 0; l < path.Layouts.length; l++) {
                            var layout = path.Layouts[l];
                            PatternSelectionEngine.Log(layout);

                            if (PatternSelectionEngine.QualifyPath([], layout.Qualifiers)) {
                                PatternSelectionEngine.Log('Matched Layout: ' + layout.Name);
                                //alert('Matched Layout: ' + layout.Name);
                                return layout;
                                //break;
                            } else {
                                PatternSelectionEngine.Log('Failed Layout');
                            }
                        }
                        //found = true;
                        //break;
                    } else {
                        PatternSelectionEngine.Log('Failed URL');
                    }
                }
            } else {
                PatternSelectionEngine.Log('Failed Domain');
            }
            //if (found) { break; }
        }
        return null;
    },

};

////var c = 0;
//var Abs = true;

//var Layout = null;

////var port;
////chrome.extension.onConnect.addListener(function (_port) {
////    // ...optional validation of port.name...

////    port = _port;
////    port.onMessage.addListener(OnMessageEvent);
////    port.onDisconnect.addListener(OnDisconnect);
////});

//function OnDisconnect() { }

//document.onmousemove = function (e) {
//    try{    
//        var x = e.pageX;
//        var y = e.pageY;

//        if (blt_LastElement != null) { $(blt_LastElement).removeClass('BLT_Hover'); }
//        blt_LastElement = document.elementFromPoint(x - window.pageXOffset, y - window.pageYOffset);
//        if (blt_LastElement != null) {
//            //$(blt_LastElement).addClass('BLT_Hover');
//            //PatternSelectionEngine.Log('Hover ' + x + '-' + y + ' = ' + blt_LastElement.tagName + ' = ' + e.currentTarget);
//        }
//        chrome.runtime.sendMessage({ 'request': 'updateCoords', 'coords': { 'x': x, 'y': y} }, function (Response) { });
//    } catch (e) { }
//};


$(document).ready(function () {
    //var options = { Buttons: true, Retrieve: false };
    //PatternSelectionEngine.ProcessGroupFields(val.GroupFields, [], null, options)
});


function OnMessageEvent(Message, Sender, Callback) {
    var response = null;
    //PatternSelectionEngine.Log(Message);
    switch (Message.request) {
        case 'determineLayout':
            var val = PatternSelectionEngine.DetermineLayout(Message.Patterns);
            PatternSelectionEngine.Log(val);
            response = {};
            response.Layout = val;
            response.Domain = location.host;
            response.Url = document.URL;

            var options = { Buttons: true, Retrieve: true, Events: true };

            if (val !== null) { val = { Name: 'root', 'Index': 0, 'Group': null, Selector: null, 'Data': PatternSelectionEngine.ProcessLayout(val, [], null, options) }; }
            //PatternSelectionEngine.Log(val);
            response.Values = val;

            Callback(response);
            break;
        case 'selectCurrent':
            var x = Message.coords.x;
            var y = Message.coords.y;

            var element = document.elementFromPoint(x - window.pageXOffset, y - window.pageYOffset);
            //LocateParent(element);
            if (element !== null) {

                var selector = PatternSelectionEngine.LocateParent(element, [PatternSelectionEngine.GetSelector(element).Path]);
                //PatternSelectionEngine.Log(selector);
                response = {};
                var ans = prompt('Enter the Field Type (N=Full Name, F=First Name, L=Last Name, W=Website, P=Phone, T=Title, C=Company, B=Bio, A=Address, G=Grouping)', 'N');
                response.Field = ans;

                $('Body').append('<style> /*' + ans + '*/\r\n ' + selector + ' \r\n{ background-image: url(\'chrome-extension://bbfahfbopcgaehpelhlemoadekjabhng/hoverback.png\') !important; background-repeat: repeat !important; } </style>');
                //PatternSelectionEngine.Log('selectCurrent ' + window.pageXOffset + '+' + x + '-' + window.pageYOffset + '+' + y + ' = ' + element.tagName);
                response.Value = $(selector).text();
                $(selector).addClass('BLT_Field');
                alert(JSON.stringify(response.Value));
                //if (Callback != null) {
                Callback(response);
                //}
            }
            break;
        case 'PatternSelectionEngine.Log':
            PatternSelectionEngine.Log(Message.message);
            break;
        default:
            break;
    }
    //if (Callback != null) {
    //    Callback(response);
    //}
    return true;
}

