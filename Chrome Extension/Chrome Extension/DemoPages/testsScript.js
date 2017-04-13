var TestsScript = {

    PadLength: 30,

    Pad: function (Value, Pad, Char) {
        if (Pad === undefined) { Pad = TestsScript.PadLength; }
        if (Char === undefined) { Char = ' '; }
        while (Value.length < Pad) {
            Value += Char;
        }
        return Value;
    },
    DisplayResults: function (TestName, Results, Expected) {
        var pass = true;
        var result = "";
        for (var i = 0; i < Results.length; i++) {
            result += "<div><span class='fieldName'>" + TestsScript.Pad(Results[i].Name) + "</span>";
            result += "<span class='fieldRecieved'>" + TestsScript.Pad(Results[i].Value) + "</span>";
            //console.log(Results[i].Value);
            var found = false;
            for (var j = 0; j < Expected.length; j++) {
                if (Expected[j].Name === Results[i].Name) {
                    Expected[j].Used = true;
                    found = true;
                    result += "<span class='fieldExpected'>" + TestsScript.Pad(Expected[j].Value) + "</span>";
                    //console.log(Expected[j].Value);
                    if (Expected[j].Value === Results[i].Value) {
                        result += "<span class='fieldResult fieldPass'>" + "Pass" + "</span>";
                        //console.log("Pass");
                    } else {
                        result += "<span class='fieldResult fieldFail'>" + "Fail" + "</span>";
                        //console.log("Fail");
                        pass = false;
                    }
                }
            }
            if (!found) {
                result += "<span class='fieldExpected fieldNotFound'>Not Found</span><span class='fieldResult fieldFail'>Fail</span>";
                //console.log("Fail");
                pass = false;
            }
            result += "</div>\r\n";
        }
        for (var j = 0; j < Expected.length; j++) {
            if (Expected[j].Used === undefined) {
                //result += TestsScript.Pad(Expected[j].Name) + TestsScript.Pad("") + TestsScript.Pad(Expected[j].Value) + "Fail" + "\r\n";
                result += "<div><span class='fieldName'>" + TestsScript.Pad(Expected[j].Name) + "</span><span class='fieldRecieved fieldNotFound'>Not Found</span><span class='fieldExpected'>" + TestsScript.Pad(Expected[j].Value) + "</span><span class='fieldResult fieldFail'>Fail</span></div>";
                pass = false;
            }
        }

        result = "<div><span class='testName'>" + TestName + "</span><span class='testResult " + (pass ? "testPass" : "testFail") + "'>" + (pass ? "Passed" : "Failed") + "</span></div><hr />\r\n" + result + "<br /><br />";

        //console.log(TestName + ": " + (pass ? "Passed" : "Failed"));
        //$('TEXTAREA#Results').val($('TEXTAREA#Results').val() + result);
        $('DIV#Results').append(result);
        return pass;
    },

    ExecuteTest: function (Tests) {
        var last = true;
        var pass = true;
        $('DIV#Results').empty();
        $('DIV#Result').removeClass();
        $('DIV#Result').text('Running');

        for (var t = 0; t < Tests.length; t++) {
            last = TestsScript.DisplayResults(Tests[t].TestName, Tests[t].Results, Tests[t].Expected);
            if (!last) { pass = false; }
        }

        if (pass) {
            $('DIV#Result').addClass("Pass");
            $('DIV#Result').text('Passed');

        } else {
            $('DIV#Result').addClass("Fail");
            $('DIV#Result').text('Failed');
        }
    },

    cmdSplitFullName: function () {

        var tests = [
            {
                TestName: "John M Smith",
                Results: ValueProcessors.SplitFullName({ Name: "FullName", Value: "John M Smith" }, ""),
                Expected: [{ Name: "FullName", Value: "John M Smith" }, { Name: "FirstName", Value: "John" }, { Name: "MiddleName", Value: "M" }, { Name: "LastName", Value: "Smith" }]
            },
            {
                TestName: "John Michael Smith",
                Results: ValueProcessors.SplitFullName({ Name: "FullName", Value: "John Michael Smith" }, ""),
                Expected: [{ Name: "FullName", Value: "John Michael Smith" }, { Name: "FirstName", Value: "John" }, { Name: "MiddleName", Value: "Michael" }, { Name: "LastName", Value: "Smith" }]
            },
            {
                TestName: "John",
                Results: ValueProcessors.SplitFullName({ Name: "FullName", Value: "John" }, ""),
                Expected: [{ Name: "FullName", Value: "John" }, { Name: "FirstName", Value: "John" }]
            },
            {
                TestName: "Lieutenant Smith",
                Results: ValueProcessors.SplitFullName({ Name: "FullName", Value: "Lieutenant Smith" }, ""),
                Expected: [{ Name: "FullName", Value: "Lieutenant Smith" }, { Name: "Prefix", Value: "Lieutenant" }, { Name: "LastName", Value: "Smith" }]
            },
            {
                TestName: "Mr Smith",
                Results: ValueProcessors.SplitFullName({ Name: "FullName", Value: "Mr Smith" }, ""),
                Expected: [{ Name: "FullName", Value: "Mr Smith" }, { Name: "Prefix", Value: "Mr" }, { Name: "LastName", Value: "Smith" }]
            },
            {
                TestName: "Mr Smith DDS MD",
                Results: ValueProcessors.SplitFullName({ Name: "FullName", Value: "Mr Smith DDS MD" }, ""),
                Expected: [{ Name: "FullName", Value: "Mr Smith DDS MD" }, { Name: "Prefix", Value: "Mr" }, { Name: "LastName", Value: "Smith" }, { Name: "Suffix", Value: "DDS MD" }]
            },
            {
                TestName: "Smith III",
                Results: ValueProcessors.SplitFullName({ Name: "FullName", Value: "Smith III" }, ""),
                Expected: [{ Name: "FullName", Value: "Smith III" }, { Name: "Suffix", Value: "III" }, { Name: "LastName", Value: "Smith" }]
            },
            {
                TestName: "Smith Jr",
                Results: ValueProcessors.SplitFullName({ Name: "FullName", Value: "Smith III" }, ""),
                Expected: [{ Name: "FullName", Value: "Smith III" }, { Name: "Suffix", Value: "III" }, { Name: "LastName", Value: "Smith" }]
            },
        ]
        TestsScript.ExecuteTest(tests);
    },

    cmdSplitHandle: function () {
        var tests = [
            {
                TestName: "Broadlook.com",
                Results: ValueProcessors.ParseHandle({ Name: "Handle", Value: "Broadlook.com" }, ""),
                Expected: [{ Name: "Website", Value: "Broadlook.com" }]
            },
            {
                TestName: "www.Broadlook.com",
                Results: ValueProcessors.ParseHandle({ Name: "Handle", Value: "www.Broadlook.com" }, ""),
                Expected: [{ Name: "Website", Value: "www.Broadlook.com" }]
            },
            {
                TestName: "http://Broadlook.com",
                Results: ValueProcessors.ParseHandle({ Name: "Handle", Value: "http://Broadlook.com" }, ""),
                Expected: [{ Name: "Website", Value: "Broadlook.com" }]
            },
            {
                TestName: "http://www.Broadlook.com",
                Results: ValueProcessors.ParseHandle({ Name: "Handle", Value: "http://www.Broadlook.com" }, ""),
                Expected: [{ Name: "Website", Value: "www.Broadlook.com" }]
            },
            {
                TestName: "https://Broadlook.com",
                Results: ValueProcessors.ParseHandle({ Name: "Handle", Value: "https://Broadlook.com" }, ""),
                Expected: [{ Name: "Website", Value: "Broadlook.com" }]
            },
            {
                TestName: "https://www.Broadlook.com",
                Results: ValueProcessors.ParseHandle({ Name: "Handle", Value: "https://www.Broadlook.com" }, ""),
                Expected: [{ Name: "Website", Value: "www.Broadlook.com" }]
            },
            {
                TestName: "John@Broadlook.com",
                Results: ValueProcessors.ParseHandle({ Name: "Email", Value: "John@Broadlook.com" }, ""),
                Expected: [{ Name: "Email", Value: "John@Broadlook.com" }]
            },
            {
                TestName: "IBM",
                Results: ValueProcessors.ParseHandle({ Name: "Handle", Value: "IBM" }, ""),
                Expected: [{ Name: "Company", Value: "IBM" }]
            },
            {
                TestName: "BroadlookInc",
                Results: ValueProcessors.ParseHandle({ Name: "Handle", Value: "BroadlookInc" }, ""),
                Expected: [{ Name: "Company", Value: "Broadlook Inc" }]
            },
            {
                TestName: "Broadlook Inc",
                Results: ValueProcessors.ParseHandle({ Name: "Handle", Value: "Broadlook Inc" }, ""),
                Expected: [{ Name: "Company", Value: "Broadlook Inc" }]
            },
            {
                TestName: "Broadlook a Search Company",
                Results: ValueProcessors.ParseHandle({ Name: "Handle", Value: "Broadlook a Search Company" }, ""),
                Expected: [{ Name: "Company", Value: "Broadlook a Search Company" }]
            },
            {
                TestName: "The Exclusive Company",
                Results: ValueProcessors.ParseHandle({ Name: "Handle", Value: "The Exclusive Company" }, ""),
                Expected: [{ Name: "Company", Value: "The Exclusive Company" }]
            },
            {
                TestName: "Exclusive Company, The",
                Results: ValueProcessors.ParseHandle({ Name: "Handle", Value: "Exclusive Company, The" }, ""),
                Expected: [{ Name: "Company", Value: "Exclusive Company, The" }]
            },
            {
                TestName: "BMSmith",
                Results: ValueProcessors.ParseHandle({ Name: "FullName", Value: "BMSmith" }, ""),
                Expected: [{ Name: "FullName", Value: "B M Smith" }, { Name: "FirstName", Value: "B" }, { Name: "MiddleName", Value: "M" }, { Name: "LastName", Value: "Smith" }]
            },
            {
                TestName: "BSmith",
                Results: ValueProcessors.ParseHandle({ Name: "FullName", Value: "BSmith" }, ""),
                Expected: [{ Name: "FullName", Value: "B Smith" }, { Name: "FirstName", Value: "B" }, { Name: "LastName", Value: "Smith" }]
            },
            {
                TestName: "JohnSmith",
                Results: ValueProcessors.ParseHandle({ Name: "FullName", Value: "JohnSmith" }, ""),
                Expected: [{ Name: "FullName", Value: "John Smith" }, { Name: "FirstName", Value: "John" }, { Name: "LastName", Value: "Smith" }]
            },
            {
                TestName: "John_Smith",
                Results: ValueProcessors.ParseHandle({ Name: "FullName", Value: "John_Smith" }, ""),
                Expected: [{ Name: "FullName", Value: "John Smith" }, { Name: "FirstName", Value: "John" }, { Name: "LastName", Value: "Smith" }]
            },
            {
                TestName: "John-Smith",
                Results: ValueProcessors.ParseHandle({ Name: "FullName", Value: "John-Smith" }, ""),
                Expected: [{ Name: "FullName", Value: "John Smith" }, { Name: "FirstName", Value: "John" }, { Name: "LastName", Value: "Smith" }]
            },
            {
                TestName: "John M Smith",
                Results: ValueProcessors.ParseHandle({ Name: "FullName", Value: "John M Smith" }, ""),
                Expected: [{ Name: "FullName", Value: "John M Smith" }, { Name: "FirstName", Value: "John" }, { Name: "MiddleName", Value: "M" }, { Name: "LastName", Value: "Smith" }]
            },
            {
                TestName: "John Michael Smith",
                Results: ValueProcessors.ParseHandle({ Name: "FullName", Value: "John Michael Smith" }, ""),
                Expected: [{ Name: "FullName", Value: "John Michael Smith" }, { Name: "FirstName", Value: "John" }, { Name: "MiddleName", Value: "Michael" }, { Name: "LastName", Value: "Smith" }]
            },
            {
                TestName: "John",
                Results: ValueProcessors.ParseHandle({ Name: "FullName", Value: "John" }, ""),
                Expected: [{ Name: "Handle", Value: "John" }]
            },
            {
                TestName: "Lieutenant Smith",
                Results: ValueProcessors.ParseHandle({ Name: "FullName", Value: "Lieutenant Smith" }, ""),
                Expected: [{ Name: "FullName", Value: "Lieutenant Smith" }, { Name: "Prefix", Value: "Lieutenant" }, { Name: "LastName", Value: "Smith" }]
            },
            {
                TestName: "Mr Smith",
                Results: ValueProcessors.ParseHandle({ Name: "FullName", Value: "Mr Smith" }, ""),
                Expected: [{ Name: "FullName", Value: "Mr Smith" }, { Name: "Prefix", Value: "Mr" }, { Name: "LastName", Value: "Smith" }]
            },
            {
                TestName: "Mr Smith DDS MD",
                Results: ValueProcessors.ParseHandle({ Name: "FullName", Value: "Mr Smith DDS MD" }, ""),
                Expected: [{ Name: "FullName", Value: "Mr Smith DDS MD" }, { Name: "Prefix", Value: "Mr" }, { Name: "LastName", Value: "Smith" }, { Name: "Suffix", Value: "DDS MD" }]
            },
            {
                TestName: "Smith III",
                Results: ValueProcessors.ParseHandle({ Name: "FullName", Value: "Smith III" }, ""),
                Expected: [{ Name: "FullName", Value: "Smith III" }, { Name: "Suffix", Value: "III" }, { Name: "LastName", Value: "Smith" }]
            },
            {
                TestName: "Smith Jr",
                Results: ValueProcessors.ParseHandle({ Name: "FullName", Value: "Smith III" }, ""),
                Expected: [{ Name: "FullName", Value: "Smith III" }, { Name: "Suffix", Value: "III" }, { Name: "LastName", Value: "Smith" }]
            },
            {
                TestName: "TwinkleToes",
                Results: ValueProcessors.ParseHandle({ Name: "FullName", Value: "TwinkleToes" }, ""),
                Expected: [{ Name: "FullName", Value: "Twinkle Toes" }, { Name: "FirstName", Value: "Twinkle" }, { Name: "LastName", Value: "Toes" }]
            },
            {
                TestName: "twinkletoes",
                Results: ValueProcessors.ParseHandle({ Name: "FullName", Value: "twinkletoes" }, ""),
                Expected: [{ Name: "Handle", Value: "twinkletoes" }]
            },
            {
                TestName: "johnsmith",
                Results: ValueProcessors.ParseHandle({ Name: "FullName", Value: "johnsmith" }, ""),
                Expected: [{ Name: "Handle", Value: "johnsmith" }]
            },
        ];
        TestsScript.ExecuteTest(tests);
    },
    cmdHTMLDecode: function () {
        var tests = [
            {
                TestName: "Jack Smith",
                Results: ValueProcessors.HTMLDecode({ Name: "Value", Value: "Jack Smith" }, ""),
                Expected: [{ Name: "Value", Value: "Jack Smith" }]
            },
            {
                TestName: "Jack  Smith",
                Results: ValueProcessors.HTMLDecode({ Name: "Value", Value: "Jack  Smith" }, ""),
                Expected: [{ Name: "Value", Value: "Jack  Smith" }]
            },
            {
                TestName: "Jack&nbsp;Smith",
                Results: ValueProcessors.HTMLDecode({ Name: "Value", Value: "Jack&nbsp;Smith" }, ""),
                Expected: [{ Name: "Value", Value: "Jack\xa0Smith" }]
            },
            {
                TestName: "Jack &amp; Jill",
                Results: ValueProcessors.HTMLDecode({ Name: "Value", Value: "Jack &amp; Jill" }, ""),
                Expected: [{ Name: "Value", Value: "Jack & Jill" }]
            },
            {
                TestName: "Jack &#38; Jill",
                Results: ValueProcessors.HTMLDecode({ Name: "Value", Value: "Jack &#38; Jill" }, ""),
                Expected: [{ Name: "Value", Value: "Jack & Jill" }]
            },
        ];
        TestsScript.ExecuteTest(tests);
    },
    cmdHTMLEncode: function () {
        var tests = [
            {
                TestName: "Jack Smith",
                Results: ValueProcessors.HTMLEncode({ Name: "Value", Value: "Jack Smith" }, ""),
                Expected: [{ Name: "Value", Value: "Jack Smith" }]
            },
            {
                TestName: "Jack  Smith",
                Results: ValueProcessors.HTMLEncode({ Name: "Value", Value: "Jack  Smith" }, ""),
                Expected: [{ Name: "Value", Value: "Jack  Smith" }]
            },
            {
                TestName: "Jack & Jill",
                Results: ValueProcessors.HTMLEncode({ Name: "Value", Value: "Jack & Jill" }, ""),
                Expected: [{ Name: "Value", Value: "Jack &amp; Jill" }]
            },
        ];
        TestsScript.ExecuteTest(tests);
    },
    cmdReplaceNonStandardCharacters: function () {
        var tests = [
            {
                TestName: "Jack&nbsp;Smith",
                Results: ValueProcessors.ReplaceNonStandardCharacters(ValueProcessors.HTMLDecode({ Name: "Value", Value: "Jack&nbsp;Smith" }, "")[0], ""),
                Expected: [{ Name: "Value", Value: "Jack Smith" }]
            },
            {
                TestName: "Jack&#x2013;Smith",
                Results: ValueProcessors.ReplaceNonStandardCharacters(ValueProcessors.HTMLDecode({ Name: "Value", Value: "Jack&#x2013;Smith" }, "")[0], ""),
                Expected: [{ Name: "Value", Value: "Jack-Smith" }]
            },
            {
                TestName: "Jack&#x2014;Smith",
                Results: ValueProcessors.ReplaceNonStandardCharacters(ValueProcessors.HTMLDecode({ Name: "Value", Value: "Jack&#x2014;Smith" }, "")[0], ""),
                Expected: [{ Name: "Value", Value: "Jack-Smith" }]
            },
        ];
        TestsScript.ExecuteTest(tests);
    },
    cmdReplaceNonBreakingSpaces: function () {
        var tests = [
            {
                TestName: "Jack&nbsp;Smith",
                Results: ValueProcessors.ReplaceNonBreakingSpaces(ValueProcessors.HTMLDecode({ Name: "Value", Value: "Jack&nbsp;Smith" }, "")[0], ""),
                Expected: [{ Name: "Value", Value: "Jack Smith" }]
            },
            {
                TestName: "Jack&nbsp;&nbsp;Smith",
                Results: ValueProcessors.ReplaceNonBreakingSpaces(ValueProcessors.HTMLDecode({ Name: "Value", Value: "Jack&nbsp;&nbsp;Smith" }, "")[0], ""),
                Expected: [{ Name: "Value", Value: "Jack  Smith" }]
            },
            {
                TestName: "Jack&nbsp;&nbsp;Smith&nbsp;",
                Results: ValueProcessors.ReplaceNonBreakingSpaces(ValueProcessors.HTMLDecode({ Name: "Value", Value: "Jack&nbsp;&nbsp;Smith&nbsp;" }, "")[0], ""),
                Expected: [{ Name: "Value", Value: "Jack  Smith " }]
            },
            {
                TestName: "Jack&nbsp; &nbsp;Smith&nbsp;",
                Results: ValueProcessors.ReplaceNonBreakingSpaces(ValueProcessors.HTMLDecode({ Name: "Value", Value: "Jack&nbsp; &nbsp;Smith&nbsp;" }, "")[0], ""),
                Expected: [{ Name: "Value", Value: "Jack   Smith " }]
            },
        ];
        TestsScript.ExecuteTest(tests);
    },
    cmdRemove: function () {
        var tests = [
            {
                TestName: "Jack Smith | Director",
                Results: ValueProcessors.Remove({ Name: "Value", Value: "Jack Smith | Director" }, "\\s\\|\\s.*"),
                Expected: [{ Name: "Value", Value: "Jack Smith" }]
            },
            {
                TestName: "Jack Smith | Director",
                Results: ValueProcessors.Remove({ Name: "Value", Value: "Jack Smith | Director" }, /\s\|\s.*/g),
                Expected: [{ Name: "Value", Value: "Jack Smith" }]
            },
            {
                TestName: "Jack Smith | Director",
                Results: ValueProcessors.Remove({ Name: "Value", Value: "Jack Smith | Director" }, { Pattern: "\\s\\|\\s.*", Modifiers: "g" }),
                Expected: [{ Name: "Value", Value: "Jack Smith" }]
            },
        ];
        TestsScript.ExecuteTest(tests);
    },
    cmdReplace: function () {
        var tests = [
            {
                TestName: "Jack Smith | Director",
                Results: ValueProcessors.Replace({ Name: "Value", Value: "Jack Smith | Director" }, { Search: "\\|", New: "-" }),
                Expected: [{ Name: "Value", Value: "Jack Smith - Director" }]
            },
            {
                TestName: "Jack Smith | Director",
                Results: ValueProcessors.Replace({ Name: "Value", Value: "Jack Smith | Director" }, { Search: /\|/g, New: "-" }),
                Expected: [{ Name: "Value", Value: "Jack Smith - Director" }]
            },
            {
                TestName: "Jack Smith | Director",
                Results: ValueProcessors.Replace({ Name: "Value", Value: "Jack Smith | Director" }, { Search: { Pattern: "\\|", Modifiers: "g" }, New: "-" }),
                Expected: [{ Name: "Value", Value: "Jack Smith - Director" }]
            },
            {
                TestName: "Jack Smith | Director",
                Results: ValueProcessors.Replace({ Name: "Value", Value: "Jack Smith | Director" }, { Search: "\\|" }),
                Expected: [{ Name: "Value", Value: "Jack Smith  Director" }]
            },
            {
                TestName: "Jack Smith | Director",
                Results: ValueProcessors.Replace({ Name: "Value", Value: "Jack Smith | Director" }, { Search: /\|/g }),
                Expected: [{ Name: "Value", Value: "Jack Smith  Director" }]
            },
            {
                TestName: "Jack Smith | Director",
                Results: ValueProcessors.Replace({ Name: "Value", Value: "Jack Smith | Director" }, { Search: { Pattern: "\\|", Modifiers: "g" } }),
                Expected: [{ Name: "Value", Value: "Jack Smith  Director" }]
            },
        ];
        TestsScript.ExecuteTest(tests);
    },
    cmdSplit: function () {
        var tests = [
            {
                TestName: "Jack Smith | Jill Smith",
                Results: ValueProcessors.Split({ Name: "Value", Value: "Jack Smith | Jill Smith" }, "\\|"),
                Expected: [{ Name: "Value", Value: "Jack Smith" }, { Name: "Value", Value: "Jill Smith" }]
            },
            {
                TestName: "Jack Smith | Director",
                Results: ValueProcessors.Split({ Name: "Value", Value: "Jack Smith | Jill Smith" }, /\|/g),
                Expected: [{ Name: "Value", Value: "Jack Smith" }, { Name: "Value", Value: "Jill Smith" }]
            },
            {
                TestName: "Jack Smith | Director",
                Results: ValueProcessors.Split({ Name: "Value", Value: "Jack Smith | Jill Smith" }, { Pattern: "\\|", Modifiers: "g" }),
                Expected: [{ Name: "Value", Value: "Jack Smith" }, { Name: "Value", Value: "Jill Smith" }]
            },
        ];
        TestsScript.ExecuteTest(tests);
    },
}
