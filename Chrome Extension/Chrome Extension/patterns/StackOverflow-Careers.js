if (patterns === undefined) { window[patterns] = [] };

patterns.push(
    {
        "ID": "2",
        "Name": "Careers at StackOverflow.com",
        "Description": "",
        "Domains": ["careers.stackoverflow.com"],
        "UserDomains": [],
        "Paths": [
            {
                "Name": "User Profile",
                "Description": "",
                "UrlPatterns": ["^(http)(s)?(://)(careers.stackoverflow.com/).*$"],
                "Layouts": [
                    {
                        "Name": "Public / Not Signed In",
                        "Description": "",
                        "Qualifiers": [
                            { "Selector": "BODY.strip DIV.container DIV#content", "ValidationType": "Exists" },
                            { "Selector": "DIV#section-personal.personal.section DIV.display H1", "ValidationType": "Exists" }
                        ],
                        "GroupFields": [
                            {
                                "Group": "Profile",
                                "Selectors": ["BODY.strip DIV.container DIV#content"],
                                "GroupFields": [
                                    {
                                        "Group": "Name",
                                        "Selectors": ["DIV.cv.public DIV.personal-block DIV#section-personal.personal.section DIV.display H1"],
                                        "GroupFields": [
                                            { "Field": "FullName", "Selectors": [{ "Selector": "", "Processors": [{ "Name": "TrimWhiteSpace" }, { "Name": "SplitFullName" }] }] }
                                        ]
                                    },
                                    {
                                        "Group": "Position", "Modifier": "Current",
                                        "Selectors": ["DIV.cv.public DIV.personal-block.with-sticky DIV#currently-at-container DIV.section.currently-at.display"],
                                        "GroupFields": [
                                            { "Field": "CompanyTitle", "Selectors": [{ "Selector": "", "Processors": [{ "Name": "TrimWhiteSpace" }, { "Name": "SplitCompanyTitle" }] }] },
                                            { "Field": "Title", "Selectors": [{ "Selector": "STRONG:nth-of-type(1)", "Processors": ["CleanHTML", "DetectCompanyTitle"] }] },
                                            { "Field": "Company", "Selectors": [{ "Selector": "STRONG:nth-of-type(2)", "Processors": ["CleanHTML", "DetectCompanyTitle"] }] }
                                        ]
                                    },
                                    {
                                        "Group": "Position", "Modifier": "Latest",
                                        "Selectors": ["DIV.cv.public DIV#cv-sections DIV#cv-experience.section.cv-section-type DIV[id^=section-].repeater.cv-section.first"],
                                        "GroupFields": [
                                            { "Field": "Title", "Selectors": [{ "Selector": "DIV.display DIV.preview H3", "Processors": ["CleanHTML"] }] },
                                            { "Field": "Company", "Selectors": [{ "Selector": "DIV.display DIV.preview H3 SPAN.location", "Processors": ["CleanHTML"] }] },
                                            { "Field": "Description", "Selectors": [{ "Selector": "DIV.display DIV.description.markdown.collapsible P", "Processors": ["CleanHTML"] }] },
                                            { "Field": "TeniorLocation", "Selectors": [{ "Selector": "DIV.display DIV.preview P.time-frame", "Processors": ["CleanHTML", "DetectTenior", "DetectLocation"] }] }
                                        ]
                                    },
                                    {
                                        "Group": "Positions", "Multiple": true,
                                        "Selectors": ["DIV.cv.public DIV#cv-sections DIV#cv-experience.section.cv-section-type DIV[id^=section-].repeater.cv-section"],
                                        "GroupFields": [
                                            { "Field": "Title", "Selectors": [{ "Selector": "DIV.display DIV.preview H3", "Processors": ["CleanHTML"] }] },
                                            { "Field": "Company", "Selectors": [{ "Selector": "DIV.display DIV.preview H3 SPAN.location", "Processors": ["CleanHTML"] }] },
                                            { "Field": "Description", "Selectors": [{ "Selector": "DIV.display DIV.description.markdown.collapsible P", "Processors": ["CleanHTML"] }] },
                                            { "Field": "TeniorLocation", "Selectors": [{ "Selector": "DIV.display DIV.preview P.time-frame", "Processors": ["CleanHTML", "DetectTenior", "DetectLocation"] }] }
                                        ]
                                    },
                                    {
                                        "Group": "Education", "Modifier": "Latest",
                                        "Selectors": ["DIV.cv.public DIV#cv-sections DIV#cv-education.section.cv-section-type DIV[id^=section-].repeater.cv-section.first"],
                                        "GroupFields": [
                                            { "Field": "Title", "Selectors": [{ "Selector": "DIV.display DIV.preview H3", "Processors": ["CleanHTML"] }] },
                                            { "Field": "Company", "Selectors": [{ "Selector": "DIV.display DIV.preview H3 SPAN.location", "Processors": ["CleanHTML"] }] },
                                            { "Field": "Description", "Selectors": [{ "Selector": "DIV.display DIV.description.markdown.collapsible P", "Processors": ["CleanHTML"] }] },
                                            { "Field": "TeniorLocation", "Selectors": [{ "Selector": "DIV.display DIV.preview P.time-frame", "Processors": ["CleanHTML", "DetectTenior", "DetectLocation"] }] }
                                        ]
                                    },
                                    {
                                        "Group": "Educations", "Multiple": true,
                                        "Selectors": ["DIV.cv.public DIV#cv-sections DIV#cv-education.section.cv-section-type DIV[id^=section-].repeater.cv-section"],
                                        "GroupFields": [
                                            { "Field": "Title", "Selectors": [{ "Selector": "DIV.display DIV.preview H3", "Processors": ["CleanHTML"] }] },
                                            { "Field": "Company", "Selectors": [{ "Selector": "DIV.display DIV.preview H3 SPAN.location", "Processors": ["CleanHTML"] }] },
                                            { "Field": "Description", "Selectors": [{ "Selector": "DIV.display DIV.description.markdown.collapsible P", "Processors": ["CleanHTML"] }] },
                                            { "Field": "TeniorLocation", "Selectors": [{ "Selector": "DIV.display DIV.preview P.time-frame", "Processors": ["CleanHTML", "DetectTenior", "DetectLocation"] }] }
                                        ]
                                    },
                                    { "Field": "BIO", "Selectors": [{ "Selector": "DIV.cv.public DIV DIV#cv-other.section DIV.display", "Processors": ["CleanHTML"] }] },
                                    { "Field": "Twitter", "Selectors": [{ "Selector": "DIV.cv.public DIV DIV#section-personal.personal.section DIV.display DIV P A.twitter", "Processors": ["DiscoverURL"] }] },
                                    { "Field": "Website", "Selectors": [{ "Selector": "DIV.cv.public DIV DIV#section-personal.personal.section DIV.display DIV P#website A", "Processors": ["DiscoverURL"] }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
);