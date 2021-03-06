﻿var patterns = [
    {
        ID: "1",
        Name: "LinkedIn",
        Description: "",
        Domains: ["linkedin.com", "www.linkedin.com"],
        UserDomains: [],
        Paths: [
            {
                Name: "Public And Private Layouts",
                Description: "",
                UrlPatterns: ["^(http)(s)?(://)(www.)?(linkedin.com/)(profile|in|pub)(/).*$"],
                Layouts: [
                    {
                        Name: "Public / Not Signed In",
                        Description: "",
                        Qualifiers: [
                            { Selector: "SPAN#name.n.fn SPAN.full-name SPAN.given-name", "ValidationType": "Exists" },
                            { Selector: "SPAN#name.n.fn SPAN.full-name SPAN.family-name", "ValidationType": "Quantity", "Operand": ">", "Value": "0" },
                            { Selector: "DIV#member-1.masthead.vcard.contact H1", "ValidationType": "Exists" },
                            { Selector: "DIV#member-1.masthead.vcard.contact H12", "ValidationType": "NotExists" }
                        ],
                        GroupFields: [
                            {
                                Group: "Profile",
                                Selectors: ["DIV#main.profile.grid-a DIV#content.resume.hresume"],
                                GroupFields: [
                                    {
                                        Group: "Name",
                                        Selectors: ["DIV.profile-header DIV#member-1.masthead.vcard.contact H1"],
                                        GroupFields: [
                                            { Field: "FullName", Selectors: [{ Selector: "SPAN#name.n.fn SPAN.full-name", Processors: ["CleanHTML", "DetectName"] }] },
                                            { Field: "FirstName", Selectors: [{ Selector: "SPAN#name.n.fn SPAN.full-name SPAN.given-name", Processors: ["CleanHTML"] }] },
                                            { Field: "LastName", Selectors: [{ Selector: "SPAN#name.n.fn SPAN.full-name SPAN.family-name", Processors: ["CleanHTML"] }] }
                                        ]
                                    },
                                    {
                                        Group: "Position", "Modifier": "Current",
                                        Selectors: ["DIV.profile-header DIV#member-1.masthead.vcard.contact P.headline-title.title"],
                                        GroupFields: [
                                            { Field: "CompanyTitle", Selectors: [{ Selector: "", Processors: ["CleanHTML", "DetectCompanyTitle"] }] }
                                        ]
                                    },
                                    {
                                        Group: "Position", "Modifier": "Latest",
                                        Selectors: ["DIV#profile-experience.section.subsection-reorder DIV.content.vcalendar DIV DIV"],
                                        GroupFields: [
                                            { Field: "Title", Selectors: [{ Selector: "DIV.position.experience.first.vevent.vcard.summary-current DIV.postitle H3.false SPAN.title", Processors: ["CleanHTML"] }] },
                                            {
                                                Field: "Company", Selectors: [
                                                      { Selector: "DIV.position.experience.first.vevent.vcard.summary-current DIV.postitle H4 STRONG A.company-profile-public SPAN.org.summary", Processors: ["CleanHTML"] },
                                                      { Selector: "DIV.position.experience.first.vevent.vcard.summary-current DIV.postitle H4 STRONG SPAN.org.summary", Processors: ["CleanHTML"] }
                                                ]
                                            },
                                            { Field: "Description", Selectors: [{ Selector: "DIV.position.experience.first.vevent.vcard.summary-current P.description.current-position", Processors: ["CleanHTML"] }] },
                                            { Field: "TeniorLocation", Selectors: [{ Selector: "DIV.position.experience.first.vevent.vcard.summary-current P.period", Processors: ["CleanHTML", "DetectTenior", "DetectLocation"] }] }
                                        ]
                                    },
                                    {
                                        Group: "Positions", "Multiple": true,
                                        Selectors: ["DIV#profile-experience.section.subsection-reorder DIV.content.vcalendar DIV DIV"],
                                        GroupFields: [
                                            { Field: "Title", Selectors: [{ Selector: "DIV.position.experience.vevent.vcard DIV.postitle H3.false SPAN.title", Processors: ["CleanHTML"] }] },
                                            {
                                                Field: "Company", Selectors: [
                                                      { Selector: "DIV.position.experience.vevent.vcard DIV.postitle H4 STRONG A.company-profile-public SPAN.org.summary", Processors: ["CleanHTML"] },
                                                      { Selector: "DIV.position.experience.vevent.vcard DIV.postitle H4 STRONG SPAN.org.summary", Processors: ["CleanHTML"] }
                                                ]
                                            },
                                            { Field: "Description", Selectors: [{ Selector: "DIV.position.experience.vevent.vcard P.description", Processors: ["CleanHTML"] }] },
                                            { Field: "TeniorLocation", Selectors: [{ Selector: "DIV.position.experience.vevent.vcard P.period", Processors: ["CleanHTML", "DetectTenior", "DetectLocation"] }] }
                                        ]
                                    },
                                    { Field: "BIO", Selectors: [{ Selector: "DIV#profile-summary.section DIV.content P.description.summary", Processors: ["CleanHTML"] }] },
                                    { Field: "Website", Selectors: [{ Selector: "DIV#profile-additional.section DIV.content DL DD.websites UL LI.website A", Processors: ["DiscoverURL"] }] }
                                ]
                            },
                            {
                                Group: "Profiles", "Multiple": true,
                                Selectors: ["BODY#pagekey-nprofile-public-success.guest.v2.public-profile.chrome-v5.chrome-v5-responsive.sticky-bg.guest.js DIV#body DIV.wrapper DIV#main.profile.grid-a DIV#extra DIV.modules.panel DIV.leo-module.mod-util.browsemap DIV.content UL LI.with-photo"],
                                GroupFields: [
                                    {
                                        Group: "Name",
                                        Selectors: ["STRONG A"],
                                        GroupFields: [
                                            { Field: "FullName", Selectors: [{ Selector: "", Processors: ["CleanHTML", "DetectName"] }] }
                                        ]
                                    },
                                    {
                                        Group: "Position",
                                        Selectors: ["SPAN.headline"],
                                        GroupFields: [
                                            { Field: "CompanyTitle", Selectors: [{ Selector: "", Processors: ["CleanHTML", "DetectCompanyTitle"] }] }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
                    {
                        Name: "Private / Signed In",
                        Description: "",
                        Qualifiers: [
                            { Selector: "DIV#top-header DIV.wrapper DIV.header-section.last-child UL.nav.utilities LI.nav-item.account-settings-tab A.account-toggle IMG[id^|img-defer-id-1-].img-defer.nav-profile-photo", "ValidationType": "Exists" }
                        ],
                        GroupFields: [
                            {
                                Group: "Profile",
                                Selectors: ["BODY DIV#body.has-text-ad DIV.wrapper DIV#wrapper.guided-edit-promo-profile"],
                                GroupFields: [
                                    {
                                        Group: "Name",
                                        Selectors: ["DIV#top-card DIV.profile-top-card.top-card DIV.profile-card.vcard DIV.profile-overview DIV.profile-overview-content DIV[id^=member-].masthead DIV DIV#name-container DIV#name.editable-item H1 SPAN.n.fn SPAN.full-name"],
                                        GroupFields: [
                                            { Field: "FullName", Selectors: [{ Selector: "", Processors: ["CleanHTML", "DetectName"] }] }
                                        ]
                                    },
                                    {
                                        Group: "Position", "Modifier": "Current",
                                        Selectors: ["DIV#top-card DIV.profile-top-card.top-card DIV.profile-card.vcard DIV.profile-overview DIV.profile-overview-content DIV[id^=member-].masthead DIV DIV#headline-container DIV#headline.editable-item P.title"],
                                        GroupFields: [
                                            { Field: "CompanyTitle", Selectors: [{ Selector: "", Processors: ["CleanHTML", "DetectCompanyTitle"] }] }
                                        ]
                                    },
                                    {
                                        Group: "Position", "Modifier": "Latest",
                                        Selectors: ["DIV#profile DIV#background.profile-background DIV.background-content DIV#background-experience-container.background-section DIV#background-experience.background-experience.edit-default DIV[id^=experience-].editable-item.section-item:nth-of-type(1)"],
                                        GroupFields: [
                                            { Field: "Title", Selectors: [{ Selector: "DIV[id^=experience-][id$=-view] HEADER H4 A[name=title]", Processors: ["CleanHTML"] }] },
                                            {
                                                Field: "Company", Selectors: [
                                                      { Selector: "DIV[id^=experience-][id$=-view] HEADER H5", Processors: ["CleanHTML"] },
                                                      { Selector: "DIV[id^=experience-][id$=-view] HEADER H5", Processors: ["CleanHTML"] }
                                                ]
                                            },
                                            { Field: "Description", Selectors: [{ Selector: "DIV[id^=experience-][id$=-view] P.description", Processors: ["CleanHTML"] }] },
                                            { Field: "Tenior", Selectors: [{ Selector: "DIV[id^=experience-][id$=-view] SPAN.experience-date-locale TIME", Processors: ["CleanHTML", "DetectTenior", "DetectLocation"] }] },
                                            { Field: "Location", Selectors: [{ Selector: "DIV[id^=experience-][id$=-view] SPAN.experience-date-locale SPAN.locality", Processors: ["CleanHTML", "DetectTenior", "DetectLocation"] }] }
                                        ]
                                    },
                                    {
                                        Group: "Positions", "Multiple": true,
                                        Selectors: ["DIV#profile DIV#background.profile-background DIV.background-content DIV#background-experience-container.background-section DIV#background-experience.background-experience.edit-default DIV[id^=experience-].editable-item.section-item"],
                                        GroupFields: [
                                            { Field: "Title", Selectors: [{ Selector: "DIV[id^=experience-][id$=-view] HEADER H4 A[name=title]", Processors: ["CleanHTML"] }] },
                                            {
                                                Field: "Company", Selectors: [
                                                      { Selector: "DIV[id^=experience-][id$=-view] HEADER H5", Processors: ["CleanHTML"] },
                                                      { Selector: "DIV[id^=experience-][id$=-view] HEADER H5", Processors: ["CleanHTML"] }
                                                ]
                                            },
                                            { Field: "Description", Selectors: [{ Selector: "DIV[id^=experience-][id$=-view] P.description", Processors: ["CleanHTML"] }] },
                                            { Field: "Tenior", Selectors: [{ Selector: "DIV[id^=experience-][id$=-view] SPAN.experience-date-locale TIME", Processors: ["CleanHTML", "DetectTenior", "DetectLocation"] }] },
                                            { Field: "Location", Selectors: [{ Selector: "DIV[id^=experience-][id$=-view] SPAN.experience-date-locale SPAN.locality", Processors: ["CleanHTML", "DetectTenior", "DetectLocation"] }] }
                                        ]
                                    },
                                    {
                                        Group: "Positions", "Multiple": true, "Modifier": "Current",
                                        Selectors: ["DIV#top-card DIV.profile-top-card.top-card DIV.profile-card.vcard DIV.profile-overview DIV.profile-overview-content TABLE TBODY TR#overview-summary-current TD OL LI"],
                                        GroupFields: [
                                            {
                                                Field: "Company", Selectors: [
                                                    { Selector: "A", Processors: ["CleanHTML"] },
                                                    { Selector: "", Processors: ["CleanHTML"] }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        Group: "Positions", "Multiple": true, "Modifier": "History",
                                        Selectors: ["DIV#top-card DIV.profile-top-card.top-card DIV.profile-card.vcard DIV.profile-overview DIV.profile-overview-past TABLE TBODY TR#overview-summary-current TD OL LI"],
                                        GroupFields: [
                                            {
                                                Field: "Company", Selectors: [
                                                    { Selector: "A", Processors: ["CleanHTML"] },
                                                    { Selector: "", Processors: ["CleanHTML"] }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        Group: "Education", "Multiple": true,
                                        Selectors: ["DIV#top-card DIV.profile-top-card.top-card DIV.profile-card.vcard DIV.profile-overview DIV.profile-overview-content TABLE TBODY TR#overview-summary-education TD OL LI"],
                                        GroupFields: [
                                            {
                                                Field: "School", Selectors: [
                                                    { Selector: "A", Processors: ["CleanHTML"] },
                                                    { Selector: "", Processors: ["CleanHTML"] }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        Group: "Educations", "Multiple": true,
                                        Selectors: ["DIV#profile DIV#background.profile-background DIV.background-content DIV#background-education-container.background-section DIV#background-education.background-education.edit-default DIV[id^=education-].editable-item.section-item"],
                                        GroupFields: [
                                            {
                                                Field: "School", Selectors: [
                                                      { Selector: "DIV[id^=education-][id$=-view] DIV.education HEADER H4.summary.fn.org A", Processors: ["CleanHTML"] },
                                                      { Selector: "DIV[id^=education-][id$=-view] DIV.education HEADER H4.summary.fn.org", Processors: ["CleanHTML"] }
                                                ]
                                            },
                                            {
                                                Field: "Degree", Selectors: [
                                                    { Selector: "DIV[id^=education-][id$=-view] DIV.education HEADER H5 SPAN.major A", Processors: ["CleanHTML"] },
                                                    { Selector: "DIV[id^=education-][id$=-view] DIV.education HEADER H5 SPAN.major", Processors: ["CleanHTML"] }
                                                ]
                                            },
                                            { Field: "Tenior", Selectors: [{ Selector: "DIV[id^=education-][id$=-view] DIV.education SPAN.education-date TIME", Processors: ["CleanHTML", "DetectTenior", "DetectLocation"] }] }
                                        ]
                                    },
                                    { Field: "BIO", Selectors: [{ Selector: "DIV#profile DIV#background.profile-background DIV.background-content DIV#background-summary-container.background-section DIV#background-summary.background-summary.edit-default DIV#summary-item.editable-item.section-item DIV#summary-item-view DIV.summary P.description", Processors: ["CleanHTML"] }] },
                                    { Field: "Contact", Selectors: [{ Selector: "DIV#profile DIV#background.profile-background DIV.background-content DIV#background-additional-info-container.background-section DIV#background-additional-info.edit-default OL LI#contact-comments.section-item.editable-item DIV#contact-comments-view P.description", Processors: ["CleanHTML"] }] },
                                    { Field: "Website", Selectors: [{ Selector: "DIV#profile DIV#background.profile-background DIV.background-content DIV#background-additional-info-container.background-section DIV#profile-additional.section DIV.content DL DD.websites UL LI.website A", Processors: ["DiscoverURL"] }] }
                                ]
                            },
                            {
                                Group: "Profiles", "Multiple": true,
                                Selectors: ["BODY DIV#body.has-text-ad DIV.wrapper DIV#wrapper.guided-edit-promo-profile DIV#aux DIV.insights DIV.insights-browse-map UL LI"],
                                GroupFields: [
                                    {
                                        Group: "Name",
                                        Selectors: ["H4 A"],
                                        GroupFields: [
                                            { Field: "FullName", Selectors: [{ Selector: "", Processors: ["CleanHTML", "DetectName"] }] }
                                        ]
                                    },
                                    {
                                        Group: "Position",
                                        Selectors: ["P.browse-map-title"],
                                        GroupFields: [
                                            { Field: "CompanyTitle", Selectors: [{ Selector: "", Processors: ["CleanHTML", "DetectCompanyTitle"] }] }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
//========================================================================================================================================================================================================
    {
        ID: "10",
        Name: "LinkedIn Simple",
        Description: "",
        Domains: ["linkedin.com", "www.linkedin.com"],
        UserDomains: [],
        Paths: [
            {
                Name: "Public And Private Layouts",
                Description: "",
                UrlPatterns: ["^(http)(s)?(://)(www.)?(linkedin.com/)(profile|in|pub)(/).*$"],
                Layouts: [
                    {
                        Name: "Public / Not Signed In",
                        Description: "",
                        Qualifiers: [
                            { Selector: "SPAN#name.n.fn SPAN.full-name SPAN.given-name", "ValidationType": "Exists" }
                        ],
                        GroupFields: [
                            { Field: "FirstName", Selectors: [{ Selector: "DIV.profile-header DIV#member-1.masthead.vcard.contact H1 SPAN#name.n.fn SPAN.full-name SPAN.given-name", Processors: ["CleanHTML"] }] },
                            { Field: "LastName", Selectors: [{ Selector: "DIV.profile-header DIV#member-1.masthead.vcard.contact H1 SPAN#name.n.fn SPAN.full-name SPAN.family-name", Processors: ["CleanHTML"] }] },
                            { Field: "Title", Selectors: [{ Selector: "DIV#profile-experience.section.subsection-reorder DIV.content.vcalendar DIV DIV DIV.position.experience.first.vevent.vcard.summary-current DIV.postitle H3.false SPAN.title", Processors: ["CleanHTML"] }] },
                            {
                                Field: "Company", Selectors: [
                                        { Selector: "DIV#profile-experience.section.subsection-reorder DIV.content.vcalendar DIV DIV DIV.position.experience.first.vevent.vcard.summary-current DIV.postitle H4 STRONG A.company-profile-public SPAN.org.summary", Processors: ["CleanHTML"] },
                                        { Selector: "DIV#profile-experience.section.subsection-reorder DIV.content.vcalendar DIV DIV DIV.position.experience.first.vevent.vcard.summary-current DIV.postitle H4 STRONG SPAN.org.summary", Processors: ["CleanHTML"] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
//========================================================================================================================================================================================================
    {
        ID: "2",
        Name: "Careers at StackOverflow.com",
        Description: "",
        Domains: ["careers.stackoverflow.com"],
        UserDomains: [],
        Paths: [
            {
                Name: "User Profile",
                Description: "",
                UrlPatterns: ["^(http)(s)?(://)(careers.stackoverflow.com/).*$"],
                Layouts: [
                    {
                        Name: "Public / Not Signed In",
                        Description: "",
                        Qualifiers: [
                            { Selector: "BODY.strip DIV.container DIV#content", "ValidationType": "Exists" },
                            { Selector: "DIV#section-personal.personal.section DIV.display H1", "ValidationType": "Exists" }
                        ],
                        GroupFields: [
                            {
                                Group: "Profile",
                                Selectors: ["BODY.strip DIV.container DIV#content"],
                                GroupFields: [
                                    {
                                        Group: "Name",
                                        Selectors: ["DIV.cv.public DIV.personal-block DIV#section-personal.personal.section DIV.display H1"],
                                        GroupFields: [
                                            { Field: "FullName", Selectors: [{ Selector: "", Processors: [{ Name: "TrimWhiteSpace", Param: null }, { Name: "SplitFullName", Param: null }] }] }
                                        ]
                                    },
                                    {
                                        Group: "Position", "Modifier": "Current",
                                        Selectors: ["DIV.cv.public DIV.personal-block.with-sticky DIV#currently-at-container DIV.section.currently-at.display"],
                                        GroupFields: [
                                            { Field: "CompanyTitle", Selectors: [{ Selector: "", Processors: [{ Name: "TrimWhiteSpace", Param: null }, { Name: "SplitCompanyTitle", Param: null }] }] },
                                            { Field: "Title", Selectors: [{ Selector: "STRONG:nth-of-type(1)", Processors: ["CleanHTML", "DetectCompanyTitle"] }] },
                                            { Field: "Company", Selectors: [{ Selector: "STRONG:nth-of-type(2)", Processors: ["CleanHTML", "DetectCompanyTitle"] }] }
                                        ]
                                    },
                                    {
                                        Group: "Position", "Modifier": "Latest",
                                        Selectors: ["DIV.cv.public DIV#cv-sections DIV#cv-experience.section.cv-section-type DIV[id^=section-].repeater.cv-section.first"],
                                        GroupFields: [
                                            { Field: "Title", Selectors: [{ Selector: "DIV.display DIV.preview H3", Processors: ["CleanHTML"] }] },
                                            { Field: "Company", Selectors: [{ Selector: "DIV.display DIV.preview H3 SPAN.location", Processors: ["CleanHTML"] }] },
                                            { Field: "Description", Selectors: [{ Selector: "DIV.display DIV.description.markdown.collapsible P", Processors: ["CleanHTML"] }] },
                                            { Field: "TeniorLocation", Selectors: [{ Selector: "DIV.display DIV.preview P.time-frame", Processors: ["CleanHTML", "DetectTenior", "DetectLocation"] }] }
                                        ]
                                    },
                                    {
                                        Group: "Positions", "Multiple": true,
                                        Selectors: ["DIV.cv.public DIV#cv-sections DIV#cv-experience.section.cv-section-type DIV[id^=section-].repeater.cv-section"],
                                        GroupFields: [
                                            { Field: "Title", Selectors: [{ Selector: "DIV.display DIV.preview H3", Processors: ["CleanHTML"] }] },
                                            { Field: "Company", Selectors: [{ Selector: "DIV.display DIV.preview H3 SPAN.location", Processors: ["CleanHTML"] }] },
                                            { Field: "Description", Selectors: [{ Selector: "DIV.display DIV.description.markdown.collapsible P", Processors: ["CleanHTML"] }] },
                                            { Field: "TeniorLocation", Selectors: [{ Selector: "DIV.display DIV.preview P.time-frame", Processors: ["CleanHTML", "DetectTenior", "DetectLocation"] }] }
                                        ]
                                    },
                                    {
                                        Group: "Education", "Modifier": "Latest",
                                        Selectors: ["DIV.cv.public DIV#cv-sections DIV#cv-education.section.cv-section-type DIV[id^=section-].repeater.cv-section.first"],
                                        GroupFields: [
                                            { Field: "Title", Selectors: [{ Selector: "DIV.display DIV.preview H3", Processors: ["CleanHTML"] }] },
                                            { Field: "Company", Selectors: [{ Selector: "DIV.display DIV.preview H3 SPAN.location", Processors: ["CleanHTML"] }] },
                                            { Field: "Description", Selectors: [{ Selector: "DIV.display DIV.description.markdown.collapsible P", Processors: ["CleanHTML"] }] },
                                            { Field: "TeniorLocation", Selectors: [{ Selector: "DIV.display DIV.preview P.time-frame", Processors: ["CleanHTML", "DetectTenior", "DetectLocation"] }] }
                                        ]
                                    },
                                    {
                                        Group: "Educations", "Multiple": true,
                                        Selectors: ["DIV.cv.public DIV#cv-sections DIV#cv-education.section.cv-section-type DIV[id^=section-].repeater.cv-section"],
                                        GroupFields: [
                                            { Field: "Title", Selectors: [{ Selector: "DIV.display DIV.preview H3", Processors: ["CleanHTML"] }] },
                                            { Field: "Company", Selectors: [{ Selector: "DIV.display DIV.preview H3 SPAN.location", Processors: ["CleanHTML"] }] },
                                            { Field: "Description", Selectors: [{ Selector: "DIV.display DIV.description.markdown.collapsible P", Processors: ["CleanHTML"] }] },
                                            { Field: "TeniorLocation", Selectors: [{ Selector: "DIV.display DIV.preview P.time-frame", Processors: ["CleanHTML", "DetectTenior", "DetectLocation"] }] }
                                        ]
                                    },
                                    { Field: "BIO", Selectors: [{ Selector: "DIV.cv.public DIV DIV#cv-other.section DIV.display", Processors: ["CleanHTML"] }] },
                                    { Field: "Twitter", Selectors: [{ Selector: "DIV.cv.public DIV DIV#section-personal.personal.section DIV.display DIV P A.twitter", Processors: ["DiscoverURL"] }] },
                                    { Field: "Website", Selectors: [{ Selector: "DIV.cv.public DIV DIV#section-personal.personal.section DIV.display DIV P#website A", Processors: ["DiscoverURL"] }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
//========================================================================================================================================================================================================
    {
        ID: "3",
        Name: "Twitter",
        Description: "",
        Domains: ["www.twitter.com", "twitter.com"],
        UserDomains: [],
        Paths: [
            {
                Name: "User Profile",
                Description: "",
                UrlPatterns: ["^(http)(s)?(://)(www.)?(twitter.com/).*$"],
                Layouts: [
                    {
                        Name: "Profile",
                        Description: "",
                        Qualifiers: [
                            { Selector: "DIV#page-container.AppContent DIV.AppContainer DIV.AppContent-main.u-cf DIV.Grid.Grid--withGutter DIV.Grid-cell.u-size1of4 DIV.Grid.Grid--withInnerPadding.Grid--withGutter DIV.Grid-cell", "ValidationType": "Exists" }
                        ],
                        GroupFields: [
                            {
                                Group: "Profile",
                                Selectors: ["DIV#page-container.AppContent DIV.AppContainer DIV.AppContent-main.u-cf DIV.Grid.Grid--withGutter DIV.Grid-cell.u-size1of4 DIV.Grid.Grid--withInnerPadding.Grid--withGutter DIV.Grid-cell"],
                                GroupFields: [
                                    {
                                        Group: "Name",
                                        Selectors: ["DIV.ProfileSidebar.ProfileSidebar--withLeftAlignment DIV.ProfileHeaderCard H1.ProfileHeaderCard-name A.ProfileHeaderCard-nameLink.u-textInheritColor.js-nav"],
                                        GroupFields: [
                                            { Field: "FullName", Selectors: [{ Selector: "", Processors: ["CleanHTML", "DetectName"] }] }
                                        ]
                                    },
                                    { Field: "BIO", Selectors: [{ Selector: "DIV.ProfileSidebar.ProfileSidebar--withLeftAlignment DIV.ProfileHeaderCard P.ProfileHeaderCard-bio.u-dir", Processors: ["CleanHTML"] }] },
                                    { Field: "Twitter", Selectors: [{ Selector: "DIV.ProfileSidebar.ProfileSidebar--withLeftAlignment DIV.ProfileHeaderCard H2.ProfileHeaderCard-screenname.u-inlineBlock.u-dir A.ProfileHeaderCard-screennameLink.u-linkComplex.js-nav SPAN.u-linkComplex-target", Processors: ["DiscoverURL"] }] },
                                    { Field: "Location", Selectors: [{ Selector: "DIV.ProfileSidebar.ProfileSidebar--withLeftAlignment DIV.ProfileHeaderCard DIV.ProfileHeaderCard-location SPAN.ProfileHeaderCard-locationText.u-dir", Processors: ["DiscoverURL"] }] },
                                    { Field: "Website", Selectors: [{ Selector: "DIV.ProfileSidebar.ProfileSidebar--withLeftAlignment DIV.ProfileHeaderCard DIV.ProfileHeaderCard-url SPAN.ProfileHeaderCard-urlText.u-dir A", Processors: ["DiscoverURL"] }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
//========================================================================================================================================================================================================
    {
        ID: "4",
        Name: "GitHub",
        Description: "",
        Domains: ["www.github.com", "github.com"],
        UserDomains: [],
        Paths: [
            {
                Name: "User Profile",
                Description: "",
                UrlPatterns: ["^(http)(s)?(://)(www.)?(github.com/).*$"],
                Layouts: [
                    {
                        Name: "Profile",
                        Description: "",
                        Qualifiers: [
                            { Selector: "DIV#site-container.context-loader-container DIV.container DIV.columns.profilecols.js-username DIV.column.one-fourth.vcard", "ValidationType": "Exists" }
                        ],
                        GroupFields: [
                            {
                                Group: "Profile",
                                Selectors: ["DIV#site-container.context-loader-container DIV.container DIV.columns.profilecols.js-username DIV.column.one-fourth.vcard"],
                                GroupFields: [
                                    {
                                        Group: "Name",
                                        Selectors: ["H1.vcard-names SPAN.vcard-fullname"],
                                        GroupFields: [
                                            { Field: "FullName", Selectors: [{ Selector: "", Processors: ["CleanHTML", "DetectName"] }] }
                                        ]
                                    },
                                    { Field: "Company", Selectors: [{ Selector: "UL.vcard-details LI.vcard-detail[itemprop=worksFor]", Processors: ["CleanHTML"] }] },
                                    { Field: "Email", Selectors: [{ Selector: "UL.vcard-details LI.vcard-detail A.email", Processors: ["CleanHTML"] }] },
                                    { Field: "GitHub", Selectors: [{ Selector: "H1.vcard-names SPAN.vcard-username", Processors: ["DiscoverURL"] }] },
                                    { Field: "Location", Selectors: [{ Selector: "UL.vcard-details LI.vcard-detail[itemprop=homeLocation]", Processors: ["DiscoverURL"] }] },
                                    { Field: "Website", Selectors: [{ Selector: "UL.vcard-details LI.vcard-detail[itemprop=url]", Processors: ["DiscoverURL"] }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
//========================================================================================================================================================================================================
    {
        ID: "5",
        Name: "Facebook",
        Description: "",
        Domains: ["www.facebook.com", "facebook.com"],
        UserDomains: [],
        Paths: [
            {
                Name: "User Profile",
                Description: "",
                UrlPatterns: ["^(http)(s)?(://)(www.)?(facebook.com/search/).*(/(likers|intersect))$"],
                Layouts: [
                    {
                        Name: "Search Profiles",
                        Description: "",
                        Qualifiers: [
                            { Selector: "BODY DIV._li DIV#globalContainer.uiContextualLayerParent DIV#content.fb_content.clearfix DIV DIV#initial_browse_result DIV.mts.pvm DIV.clearfix DIV#browse_result_area.lfloat DIV DIV#BrowseResultsContainer DIV._4_yl DIV DIV.clearfix._zw", "ValidationType": "Exists" }
                        ],
                        GroupFields: [
                            {
                                Group: "Profiles", "Multiple": true,
                                Selectors: ["DIV#browse_result_area DIV DIV#BrowseResultsContainer._1yt DIV._4_yl",
                                    "DIV#browse_result_area DIV DIV#browse_result_below_fold DIV._1yt DIV._4_yl",
                                    "DIV#browse_result_area DIV DIV[id^=fbBrowseScrollingPagerContainer] DIV._1yt DIV._4_yl"],
                                GroupFields: [
                                    {
                                        Group: "Name",
                                        Selectors: ["DIV DIV.clearfix._zw DIV._42ef DIV._1zf DIV._zs.fwb A "],
                                        GroupFields: [
                                            { Field: "FullName", Selectors: [{ Selector: "", Processors: ["CleanHTML", "DetectName"] }] }
                                        ]
                                    },
                                    {
                                        Field: "Subject", Selectors: [
                                            { Selector: "DIV DIV.clearfix._zw DIV._42ef DIV._1zf DIV[data-bt*=sub_headers]._dj_ A", Processors: ["DiscoverURL"] },
                                            { Selector: "DIV DIV.clearfix._zw DIV._42ef DIV._1zf DIV[data-bt*=sub_headers]._dj_", Processors: ["DiscoverURL"] }
                                        ]
                                    },
                                    { Field: "Miscellaneous", Selectors: [{ Selector: "DIV DIV.clearfix._zw DIV._42ef DIV._1zf DIV[data-bt*=snippets]._946 DIV DIV._ajw DIV._52eh:nth-of-type(1)", Processors: ["DiscoverURL"] }] },
                                    { Field: "Miscellaneous", Selectors: [{ Selector: "DIV DIV.clearfix._zw DIV._42ef DIV._1zf DIV[data-bt*=snippets]._946 DIV DIV._ajw DIV._52eh:nth-of-type(2)", Processors: ["DiscoverURL"] }] },
                                    { Field: "Miscellaneous", Selectors: [{ Selector: "DIV DIV.clearfix._zw DIV._42ef DIV._1zf DIV[data-bt*=snippets]._946 DIV DIV._ajw DIV._52eh:nth-of-type(3)", Processors: ["DiscoverURL"] }] },
                                    { Field: "Miscellaneous", Selectors: [{ Selector: "DIV DIV.clearfix._zw DIV._42ef DIV._1zf DIV[data-bt*=snippets]._946 DIV DIV._ajw DIV._52eh:nth-of-type(4)", Processors: ["DiscoverURL"] }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
//========================================================================================================================================================================================================
    {
        ID: "6",
        Name: "Salesforce",
        Description: "",
        Domains: ["^(na)[\\d]*(.salesforce.com)$", "www.salesforce.com", "salesforce.com"],
        UserDomains: [],
        Paths: [
            {
                Name: "Lead Profile",
                Description: "",
                UrlPatterns: ["^(http)(s)?(://)((www|na[\\d]*).)?(salesforce.com/00Q).*$"],
                Layouts: [
                    {
                        Name: "Lead Profile Layout",
                        Description: "",
                        Qualifiers: [
                            { Selector: "TD#lea2_ilecell", "ValidationType": "Exists" }
                        ],
                        GroupFields: [
                            {
                                Group: "Profile",
                                Selectors: ["BODY.detailPage.sfdcBody"],
                                GroupFields: [
                                    {
                                        Group: "Name",
                                        Selectors: ["DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#lea2_ilecell DIV#lea2_ileinner"],
                                        GroupFields: [
                                            { Field: "FullName", Selectors: [{ Selector: "", Processors: ["CleanHTML", "DetectName"] }] }
                                        ]
                                    },
                                    { Field: "Title", Selectors: [{ Selector: "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#lea4_ilecell DIV#lea4_ileinner", Processors: ["CleanHTML", "DetectName"] }] },
                                    { Field: "Company", Selectors: [{ Selector: "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#lea3_ilecell DIV#lea3_ileinner", Processors: ["CleanHTML", "DetectName"] }] },
                                    {
                                        Field: "Email", Selectors: [
                                            { Selector: "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#lea11_ilecell DIV#lea11_ileinner DIV.gmailLink A:nth-of-type(1)", Processors: ["DiscoverURL"] },
                                            { Selector: "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#lea11_ilecell DIV#lea11_ileinner A:nth-of-type(1)", Processors: ["DiscoverURL"] }
                                        ]
                                    },
                                    { Field: "PhoneHome", Selectors: [{ Selector: "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#lea8_ilecell DIV#lea8_ileinner", Processors: ["DiscoverURL"] }] },
                                    { Field: "PhoneOther", Selectors: [{ Selector: "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#lea9_ilecell DIV#lea9_ileinner", Processors: ["DiscoverURL"] }] },
                                    { Field: "Fax", Selectors: [{ Selector: "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#lea10_ilecell DIV#lea10_ileinner", Processors: ["DiscoverURL"] }] },
                                    { Field: "Website", Selectors: [{ Selector: "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#lea12_ilecell DIV#lea12_ileinner", Processors: ["CleanHTML", "DetectName"] }] }
                                ]
                            }
                        ]
                    }
                ]
            },
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
            {
                Name: "Contact Profile",
                Description: "",
                UrlPatterns: ["^(http)(s)?(://)((www|na[\\d]*).)?(salesforce.com/003).*$"],
                Layouts: [
                    {
                        Name: "Profile",
                        Description: "",
                        Qualifiers: [
                            { Selector: "TD#con2_ilecell", "ValidationType": "Exists" }
                        ],
                        GroupFields: [
                            {
                                Group: "Profile",
                                Selectors: ["BODY.detailPage.sfdcBody"],
                                GroupFields: [
                                    {
                                        Group: "Name",
                                        Selectors: ["DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#con2_ilecell.dataCol.inlineEditWrite DIV#con2_ileinner"],
                                        GroupFields: [
                                            { Field: "FullName", Selectors: [{ Selector: "", Processors: ["CleanHTML", "DetectName"] }] }
                                        ]
                                    },
                                    { Field: "Title", Selectors: [{ Selector: "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#con5_ilecell.dataCol.inlineEditWrite DIV#con5_ileinner", Processors: ["CleanHTML", "DetectName"] }] },
                                    { Field: "Company", Selectors: [{ Selector: "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#con4_ilecell.dataCol.inlineEditWrite DIV#con4_ileinner", Processors: ["CleanHTML", "DetectName"] }] },
                                    {
                                        Field: "Email", Selectors: [
                                            { Selector: "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#con15_ilecell DIV#con15_ileinner DIV.gmailLink A:nth-of-type(1)", Processors: ["DiscoverURL"] },
                                            { Selector: "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#con15_ilecell DIV#con15_ileinner A:nth-of-type(1)", Processors: ["DiscoverURL"] }
                                        ]
                                    },
                                    { Field: "PhoneHome", Selectors: [{ Selector: "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#con13_ilecell.dataCol.inlineEditWrite DIV#con13_ileinner", Processors: ["DiscoverURL"] }] },
                                    { Field: "PhoneOther", Selectors: [{ Selector: "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#con14_ilecell.dataCol.inlineEditWrite DIV#con14_ileinner", Processors: ["DiscoverURL"] }] },
                                    { Field: "PhoneAssistant", Selectors: [{ Selector: "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#con17_ilecell.dataCol.inlineEditWrite DIV#con17_ileinner", Processors: ["DiscoverURL"] }] },

                                    { Field: "PhoneDirect", Selectors: [{ Selector: "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#con10_ilecell.dataCol.inlineEditWrite DIV#con10_ileinner", Processors: ["DiscoverURL"] }] },
                                    { Field: "PhoneMobile", Selectors: [{ Selector: "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#con12_ilecell.dataCol.inlineEditWrite DIV#con12_ileinner", Processors: ["DiscoverURL"] }] },

                                    { Field: "Fax", Selectors: [{ Selector: "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#con11_ilecell.dataCol.inlineEditWrite DIV#con11_ileinner", Processors: ["DiscoverURL"] }] },
                                    { Field: "Website", Selectors: [{ Selector: "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#lea12_ilecell.dataCol.inlineEditWrite DIV#lea12_ileinner", Processors: ["CleanHTML", "DetectName"] }] }
                                ]
                            }
                        ]
                    }
                ]
            },
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
            {
                Name: "Company Profile",
                Description: "",
                UrlPatterns: ["^(http)(s)?(://)((www|na[\\d]*).)?(salesforce.com/001).*$"],
                Layouts: [
                    {
                        Name: "Profile",
                        Description: "",
                        Qualifiers: [
                            { Selector: "TD#acc2_ilecell", "ValidationType": "Exists" }
                        ],
                        GroupFields: [
                            {
                                Group: "Profile",
                                Selectors: ["BODY.detailPage.sfdcBody"],
                                GroupFields: [
                                    { Field: "Company", Selectors: [{ Selector: "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#acc2_ilecell.dataCol.inlineEditWrite DIV#acc2_ileinner", Processors: ["CleanHTML", "DetectName"] }] },
                                    { Field: "Phone", Selectors: [{ Selector: "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#acc10_ilecell.dataCol.inlineEditWrite DIV#acc10_ileinner", Processors: ["DiscoverURL"] }] },
                                    { Field: "PhoneOther", Selectors: [{ Selector: "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#acc11_ilecell.dataCol.inlineEditWrite DIV#acc11_ileinner", Processors: ["DiscoverURL"] }] },
                                    { Field: "Fax", Selectors: [{ Selector: "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#acc9_ilecell.dataCol.inlineEditWrite DIV#acc9_ileinner", Processors: ["DiscoverURL"] }] },
                                    { Field: "Website", Selectors: [{ Selector: "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#acc12_ilecell.dataCol.inlineEditWrite DIV#acc12_ileinner", Processors: ["CleanHTML", "DetectName"] }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
//========================================================================================================================================================================================================
    {
        ID: "7",
        Name: "Dynamics",
        Description: "",
        Domains: ["^[A-z\\d]*(.crm.dynamics.com)$", "crm.dynamics.com", "dynamics.com"],
        UserDomains: [],
        Paths: [
            {
                Name: "Generic URL",
                Description: "",
                UrlPatterns: ["^(http)(s)?(://)((.*)\\.)?(crm\\.)?(dynamics.com/main.aspx#)[\\d]*$"],
                Layouts: [
                    {
                        Name: "Lead",
                        Description: "",
                        Qualifiers: [
                            { Selector: "IFRAME[title^=Content][title$=Area] DIV#companyname  DIV.ms-crm-Inline-Value SPAN", "ValidationType": "Exists" },
                            { Selector: "IFRAME[title^=Content][title$=Area] DIV#subject  DIV.ms-crm-Inline-Value SPAN", "ValidationType": "Exists" },
                            { Selector: "IFRAME[title^=Content][title$=Area] DIV#lastname  DIV.ms-crm-Inline-Value SPAN", "ValidationType": "Exists" }
                        ],
                        GroupFields: [
                            {
                                Group: "Profile",
                                Selectors: ["IFRAME[title^=Content][title$=Area]"],
                                GroupFields: [
                                    {
                                        Group: "Name",
                                        Selectors: [""],
                                        GroupFields: [
                                            { Field: "FullName", Selectors: [{ Selector: "DIV#FormTitle.ms-crm-Form-Title-Data H1", Processors: ["CleanHTML", "DetectName"] }] },
                                            { Field: "FirstName", Selectors: [{ Selector: "DIV#firstname DIV.ms-crm-Inline-Value SPAN", Processors: ["CleanHTML", "DetectName"] }] },
                                            { Field: "LastName", Selectors: [{ Selector: "DIV#lastname DIV.ms-crm-Inline-Value SPAN", Processors: ["CleanHTML", "DetectName"] }] }
                                        ]
                                    },
                                    {
                                        Group: "Position",
                                        Selectors: [""],
                                        GroupFields: [
                                            { Field: "Title", Selectors: [{ Selector: "DIV#jobtitle  DIV.ms-crm-Inline-Value SPAN", Processors: ["CleanHTML", "DetectName"] }] },
                                            { Field: "Company", Selectors: [{ Selector: "DIV#companyname  DIV.ms-crm-Inline-Value SPAN", Processors: ["CleanHTML", "DetectName"] }] }
                                        ]
                                    },
                                    { Field: "Email", Selectors: [{ Selector: "DIV#emailaddress1  DIV.ms-crm-Inline-Value SPAN", Processors: ["CleanHTML", "DetectName"] }] },
                                    { Field: "Telephone1", Selectors: [{ Selector: "DIV#telephone1 DIV.ms-crm-Inline-Value SPAN", Processors: ["CleanHTML", "DetectName"] }] },
                                    { Field: "Telephone2", Selectors: [{ Selector: "DIV#telephone2 DIV.ms-crm-Inline-Value SPAN", Processors: ["CleanHTML", "DetectName"] }] },
                                    { Field: "Telephone3", Selectors: [{ Selector: "DIV#telephone3 DIV.ms-crm-Inline-Value SPAN", Processors: ["CleanHTML", "DetectName"] }] },
                                    { Field: "Fax", Selectors: [{ Selector: "DIV#fax DIV.ms-crm-Inline-Value SPAN", Processors: ["CleanHTML", "DetectName"] }] },
                                    { Field: "Website", Selectors: [{ Selector: "DIV#websiteurl DIV.ms-crm-Inline-Value SPAN", Processors: ["CleanHTML", "DetectName"] }] }
                                ]
                            }
                        ]
                    },
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
                    {
                        Name: "Contact",
                        Description: "",
                        Qualifiers: [
                            { Selector: "IFRAME[title^=Content][title$=Area] DIV#lastname DIV.ms-crm-Inline-Value SPAN", "ValidationType": "Exists" }
                        ],
                        GroupFields: [
                            {
                                Group: "Profile",
                                Selectors: ["IFRAME[title^=Content][title$=Area]"],
                                GroupFields: [
                                    {
                                        Group: "Name",
                                        Selectors: [""],
                                        GroupFields: [
                                            { Field: "FullName", Selectors: [{ Selector: "DIV#FormTitle.ms-crm-Form-Title-Data H1", Processors: ["CleanHTML", "DetectName"] }] },
                                            { Field: "FirstName", Selectors: [{ Selector: "DIV#firstname DIV.ms-crm-Inline-Value SPAN", Processors: ["CleanHTML", "DetectName"] }] },
                                            { Field: "LastName", Selectors: [{ Selector: "DIV#lastname DIV.ms-crm-Inline-Value SPAN", Processors: ["CleanHTML", "DetectName"] }] }
                                        ]
                                    },
                                    {
                                        Group: "Position",
                                        Selectors: [""],
                                        GroupFields: [
                                            { Field: "Title", Selectors: [{ Selector: "DIV#jobtitle DIV.ms-crm-Inline-Value SPAN", Processors: ["CleanHTML", "DetectName"] }] },
                                            { Field: "Company", Selectors: [{ Selector: "DIV#parentcustomerid DIV.ms-crm-Inline-Edit TABLE TBODY TR TD DIV UL LI SPAN SPAN", Processors: ["CleanHTML", "DetectName"] }] }
                                        ]
                                    },
                                    { Field: "Email", Selectors: [{ Selector: "DIV#emailaddress1 DIV.ms-crm-Inline-Value SPAN", Processors: ["CleanHTML", "DetectName"] }] },
                                    { Field: "Telephone1", Selectors: [{ Selector: "DIV#telephone1 DIV.ms-crm-Inline-Value SPAN", Processors: ["CleanHTML", "DetectName"] }] },
                                    { Field: "Telephone2", Selectors: [{ Selector: "DIV#telephone2 DIV.ms-crm-Inline-Value SPAN", Processors: ["CleanHTML", "DetectName"] }] },
                                    { Field: "Telephone3", Selectors: [{ Selector: "DIV#telephone3 DIV.ms-crm-Inline-Value SPAN", Processors: ["CleanHTML", "DetectName"] }] },
                                    { Field: "Fax", Selectors: [{ Selector: "DIV#fax DIV.ms-crm-Inline-Value SPAN", Processors: ["CleanHTML", "DetectName"] }] },
                                    { Field: "Website", Selectors: [{ Selector: "DIV#website DIV.ms-crm-Inline-Value SPAN", Processors: ["CleanHTML", "DetectName"] }] }
                                ]
                            }
                        ]
                    },
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
                    {
                        Name: "Account",
                        Description: "",
                        Qualifiers: [
                            { Selector: "IFRAME[title^=Content][title$=Area] DIV#name DIV.ms-crm-Inline-Value SPAN", "ValidationType": "Exists" }
                        ],
                        GroupFields: [
                            {
                                Group: "Profile",
                                Selectors: ["IFRAME[title^=Content]"],
                                GroupFields: [
                                    { Field: "Company", Selectors: [{ Selector: "DIV#HeaderTitleElement SPAN#form_title_div DIV#FormTitle H1", Processors: ["CleanHTML", "DetectName"] }] },
                                    { Field: "Company", Selectors: [{ Selector: "DIV#name DIV.ms-crm-Inline-Value SPAN", Processors: ["CleanHTML", "DetectName"] }] },
                                    { Field: "Telephone1", Selectors: [{ Selector: "DIV#telephone1 DIV.ms-crm-Inline-Value SPAN", Processors: ["CleanHTML", "DetectName"] }] },
                                    { Field: "Telephone2", Selectors: [{ Selector: "DIV#telephone2 DIV.ms-crm-Inline-Value SPAN", Processors: ["CleanHTML", "DetectName"] }] },
                                    { Field: "Telephone3", Selectors: [{ Selector: "DIV#telephone3 DIV.ms-crm-Inline-Value SPAN", Processors: ["CleanHTML", "DetectName"] }] },
                                    { Field: "Fax", Selectors: [{ Selector: "DIV#fax DIV.ms-crm-Inline-Value SPAN", Processors: ["CleanHTML", "DetectName"] }] },
                                    { Field: "Website", Selectors: [{ Selector: "DIV#websiteurl DIV.ms-crm-Inline-Value SPAN", Processors: ["CleanHTML", "DetectName"] }] },
                                    { Field: "ticker", Selectors: [{ Selector: "DIV#tickersymbol DIV.ms-crm-Inline-Value SPAN", Processors: ["CleanHTML", "DetectName"] }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
];