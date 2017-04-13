var patterns = [
    {
        "ID": "1d3dce53-9c4f-4dc4-84b4-6284b6576637",
        "Name": "Careers at StackOverflow",
        "Description": "User Profiles on Stack Overflow Careers Page",
        "Domains": ["careers.stackoverflow.com"],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
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
                            { "Selectors": [{ "Selector": "BODY.strip DIV.container DIV#content" }], "ValidationType": "Exists" },
                            { "Selectors": [{ "Selector": "DIV#section-personal.personal.section DIV.display H1" }], "ValidationType": "Exists" }
                        ],
                        "Groups": [
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
    },
    {
        "AuthorName": "Justin Stull",
        "CreatedDate": "2015-01-08",
        "Description": "Google CSE LinkedIn Results",
        "DocumentType": "CapturePatternVer1",
        "Domains": [
          "google.com",
          "cse.google.com"
        ],
        "ID": "5c45b363-4055-4f3a-81f2-f711fc31a154",
        "Name": "Google CSE",
        "Paths": [
          {
              "Description": "",
              "Layouts": [
                {
                    "Description": "",
                    "Groups": [
                      {
                          "Buttons": [
                            {
                                "Class": "Capture_Injected_Container_Inline",
                                "Inner": {
                                    "Class": "Capture_Injected_Container_Inner_TopLeft",
                                    "Style": "width: 16px; margin-left: 5px;",
                                    "Type": "SPAN"
                                },
                                "Position": "after",
                                "Selectors": [
                                  {
                                      "Selector": "DIV.gsc-thumbnail-inside DIV.gs-title A.gs-title"
                                  }
                                ],
                                "Style": "",
                                "Type": "SPAN"
                            },
                            "capture_contact_button_logo|height: 17px; float: right;"
                          ],
                          "Group": "Profiles",
                          "GroupFields": [
                            {
                                "Field": "FullName",
                                "Selectors": [
                                  {
                                      "Processors": [
                                        {
                                            "Name": "Remove",
                                            "Params": "\\| LinkedIn"
                                        },
                                        {
                                            "Name": "ParseHandle"
                                        }
                                      ],
                                      "Selector": "DIV.gsc-thumbnail-inside DIV.gs-title A.gs-title"
                                  }
                                ]
                            },
                            {
                                "Field": "LinkedIn",
                                "Selectors": [
                                  {
                                      "Selector": "DIV.gs-webResult DIV.gsc-url-top DIV.gs-visibleUrl-long"
                                  }
                                ]
                            },
                            {
                                "Field": "Location",
                                "Selectors": [
                                  {
                                      "Processors": [
                                        {
                                            "Name": "Remove",
                                            "Params": "(\\s-\\s).*"
                                        }
                                      ],
                                      "Selector": "SPAN.gsc-location SPAN:eq(1)"
                                  }
                                ]
                            },
                            {
                                "Field": "CompanyTitle",
                                "Selectors": [
                                  {
                                      "Processors": [
                                        {
                                            "Name": "Remove",
                                            "Params": "^([A-z0-9\\s,-]*)(-\\s){1,1}"
                                        },
                                        {
                                            "Name": "SplitCompanyTitle"
                                        }
                                      ],
                                      "Selector": "SPAN.gsc-role"
                                  }
                                ]
                            },
                            {
                                "Field": "Title",
                                "Selectors": [
                                  {
                                      "Processors": [
                                        {
                                            "Name": "Remove",
                                            "Params": "^([A-z0-9\\s,-]*)(-\\s){1,1}"
                                        }
                                      ],
                                      "Selector": "DIV.s DIV DIV.f.slp"
                                  }
                                ]
                            }
                          ],
                          "Multiple": true,
                          "Qualifiers": [
                            
                          ],
                          "Selectors": [
                            "DIV.gsc-resultsRoot DIV.gsc-results DIV.gsc-expansionArea DIV.gsc-webResult"
                          ]
                      }
                    ],
                    "Name": "Google CSE Search Results",
                    "Qualifiers": [
                      {
                          "Selectors": [
                            {
                                "Selector": "DIV#resInfo-0"
                            }
                          ],
                          "ValidationType": "Exists"
                      }
                    ]
                }
              ],
              "Name": "Google CSE Search Results",
              "UrlPatterns": [
                "^(http)?(s)?(:\/\/)?(cse.google.com\/cse\/).*$"
              ]
          }
        ],
        "SchemaVersion": "1.0.0",
        "SourceName": "Core",
        "UserDomains": [],
        "$$hashKey": "object:350"
    },
    {
        "ID": "0ca988ae-d2ca-4fb1-93c0-4718e2423964",
        "Name": "GitHub",
        "Description": "User Profiles on Github",
        "Domains": ["www.github.com", "github.com"],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "Paths": [
            {
                "Name": "User Profile",
                "Description": "",
                "UrlPatterns": ["^(http)(s)?(://)(www.)?(github.com/).*$"],
                "Layouts": [
                    {
                        "Name": "Profile",
                        "Description": "",
                        "Qualifiers": [ {"Selectors": [{ "Selector": "DIV#site-container.context-loader-container DIV.container DIV.columns.profilecols.js-username DIV.column.one-fourth.vcard"}], "ValidationType": "Exists" }
                        ],
                        "Groups": [
                            {
                                "Group": "Profile",
                                "Selectors": ["DIV#site-container.context-loader-container DIV.container DIV.columns.profilecols.js-username DIV.column.one-fourth.vcard"],
                                "GroupFields": [
                                    {
                                        "Group": "Name",
                                        "Selectors": ["H1.vcard-names SPAN.vcard-fullname"],
                                        "GroupFields": [
                                            { "Field": "FullName", "Selectors": [{ "Selector": "", "Processors": [{ "Name": "TrimWhiteSpace" }, { "Name": "SplitFullName" }] }] }
                                        ]
                                    },
                                    { "Field": "Company", "Selectors": [{ "Selector": "UL.vcard-details LI.vcard-detail[itemprop=worksFor]", "Processors": ["CleanHTML"] }] },
                                    { "Field": "Email", "Selectors": [{ "Selector": "UL.vcard-details LI.vcard-detail A.email", "Processors": ["CleanHTML"] }] },
                                    { "Field": "GitHub", "Selectors": [{ "Selector": "H1.vcard-names SPAN.vcard-username", "Processors": ["DiscoverURL"] }] },
                                    { "Field": "Location", "Selectors": [{ "Selector": "UL.vcard-details LI.vcard-detail[itemprop=homeLocation]", "Processors": ["DiscoverURL"] }] },
                                    { "Field": "Website", "Selectors": [{ "Selector": "UL.vcard-details LI.vcard-detail[itemprop=url]", "Processors": ["DiscoverURL"] }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "ID": "23b36c07-2f4f-4917-b4b0-7a22ab9fd582",
        "Name": "Facebook",
        "Description": "Profiles on Facebook",
        "Domains": ["www.facebook.com", "facebook.com"],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "Paths": [
            {
                "Name": "User Profile",
                "Description": "",
                "UrlPatterns": ["^(http)(s)?(://)(www.)?(facebook.com/search/).*(/(likers|intersect))$"],
                "Layouts": [
                    {
                        "Name": "Search Profiles",
                        "Description": "",
                        "Qualifiers": [
                            {"Selectors": [{ "Selector": "BODY DIV._li DIV#globalContainer.uiContextualLayerParent DIV#content.fb_content.clearfix DIV DIV#initial_browse_result DIV.mts.pvm DIV.clearfix DIV#browse_result_area.lfloat DIV DIV#BrowseResultsContainer DIV._4_yl DIV DIV.clearfix._zw"}], "ValidationType": "Exists" }
                        ],
                        "Groups": [
                            {
                                "Group": "Profiles", "Multiple": true,
                                "Selectors": ["DIV#browse_result_area DIV DIV#BrowseResultsContainer._1yt DIV._4_yl",
                                    "DIV#browse_result_area DIV DIV#browse_result_below_fold DIV._1yt DIV._4_yl",
                                    "DIV#browse_result_area DIV DIV[id^=fbBrowseScrollingPagerContainer] DIV._1yt DIV._4_yl"],
                                "GroupFields": [
                                    {
                                        "Group": "Name",
                                        "Selectors": ["DIV DIV.clearfix._zw DIV._42ef DIV._1zf DIV._zs.fwb A "],
                                        "GroupFields": [
                                            { "Field": "FullName", "Selectors": [{ "Selector": "", "Processors": [{ "Name": "TrimWhiteSpace" }, { "Name": "SplitFullName" }] }] }
                                        ]
                                    },
                                    {
                                        "Field": "Subject", "Selectors": [
                                            { "Selector": "DIV DIV.clearfix._zw DIV._42ef DIV._1zf DIV[data-bt*=sub_headers]._dj_ A", "Processors": ["DiscoverURL"] },
                                            { "Selector": "DIV DIV.clearfix._zw DIV._42ef DIV._1zf DIV[data-bt*=sub_headers]._dj_", "Processors": ["DiscoverURL"] }
                                        ]
                                    },
                                    { "Field": "Miscellaneous", "Selectors": [{ "Selector": "DIV DIV.clearfix._zw DIV._42ef DIV._1zf DIV[data-bt*=snippets]._946 DIV DIV._ajw DIV._52eh:nth-of-type(1)", "Processors": ["DiscoverURL"] }] },
                                    { "Field": "Miscellaneous", "Selectors": [{ "Selector": "DIV DIV.clearfix._zw DIV._42ef DIV._1zf DIV[data-bt*=snippets]._946 DIV DIV._ajw DIV._52eh:nth-of-type(2)", "Processors": ["DiscoverURL"] }] },
                                    { "Field": "Miscellaneous", "Selectors": [{ "Selector": "DIV DIV.clearfix._zw DIV._42ef DIV._1zf DIV[data-bt*=snippets]._946 DIV DIV._ajw DIV._52eh:nth-of-type(3)", "Processors": ["DiscoverURL"] }] },
                                    { "Field": "Miscellaneous", "Selectors": [{ "Selector": "DIV DIV.clearfix._zw DIV._42ef DIV._1zf DIV[data-bt*=snippets]._946 DIV DIV._ajw DIV._52eh:nth-of-type(4)", "Processors": ["DiscoverURL"] }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "ID": "d65ac5fc-44fe-4a2c-8a1e-49fcc56cafea",
        "Name": "Salesforce",
        "Description": "Contacts or Leads on Salesforce",
        "Domains": ["^(na)[\\d]*(.salesforce.com)$", "www.salesforce.com", "salesforce.com"],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "Paths": [
            {
                "Name": "Lead Profile",
                "Description": "",
                "UrlPatterns": ["^(http)(s)?(://)((www|na[\\d]*).)?(salesforce.com/00Q).*$"],
                "Layouts": [
                    {
                        "Name": "Lead Profile Layout",
                        "Description": "",
                        "Qualifiers": [
                            { "Selectors": [{ "Selector": "TD#lea2_ilecell"}], "ValidationType": "Exists" }
                        ],
                        "Groups": [
                            {
                                "Group": "Profile",
                                "Selectors": ["BODY.detailPage.sfdcBody"],
                                "GroupFields": [
                                    {
                                        "Group": "Name",
                                        "Selectors": ["DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#lea2_ilecell DIV#lea2_ileinner"],
                                        "GroupFields": [
                                            { "Field": "FullName", "Selectors": [{ "Selector": "", "Processors": [{ "Name": "TrimWhiteSpace" }, { "Name": "SplitFullName" }] }] }
                                        ]
                                    },
                                    { "Field": "Title", "Selectors": [{ "Selector": "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#lea4_ilecell DIV#lea4_ileinner", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "Company", "Selectors": [{ "Selector": "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#lea3_ilecell DIV#lea3_ileinner", "Processors": ["CleanHTML", "DetectName"] }] },
                                    {
                                        "Field": "Email", "Selectors": [
                                            { "Selector": "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#lea11_ilecell DIV#lea11_ileinner DIV.gmailLink A:nth-of-type(1)", "Processors": ["DiscoverURL"] },
                                            { "Selector": "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#lea11_ilecell DIV#lea11_ileinner A:nth-of-type(1)", "Processors": ["DiscoverURL"] }
                                        ]
                                    },
                                    { "Field": "PhoneHome", "Selectors": [{ "Selector": "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#lea8_ilecell DIV#lea8_ileinner", "Processors": ["DiscoverURL"] }] },
                                    { "Field": "PhoneOther", "Selectors": [{ "Selector": "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#lea9_ilecell DIV#lea9_ileinner", "Processors": ["DiscoverURL"] }] },
                                    { "Field": "Fax", "Selectors": [{ "Selector": "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#lea10_ilecell DIV#lea10_ileinner", "Processors": ["DiscoverURL"] }] },
                                    { "Field": "Website", "Selectors": [{ "Selector": "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#lea12_ilecell DIV#lea12_ileinner", "Processors": ["CleanHTML", "DetectName"] }] }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "Name": "Contact Profile",
                "Description": "",
                "UrlPatterns": ["^(http)(s)?(://)((www|na[\\d]*).)?(salesforce.com/003).*$"],
                "Layouts": [
                    {
                        "Name": "Profile",
                        "Description": "",
                        "Qualifiers": [
                            {"Selectors": [{ "Selector": "TD#con2_ilecell"}], "ValidationType": "Exists" }
                        ],
                        "Groups": [
                            {
                                "Group": "Profile",
                                "Selectors": ["BODY.detailPage.sfdcBody"],
                                "GroupFields": [
                                    {
                                        "Group": "Name",
                                        "Selectors": ["DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#con2_ilecell.dataCol.inlineEditWrite DIV#con2_ileinner"],
                                        "GroupFields": [
                                            { "Field": "FullName", "Selectors": [{ "Selector": "", "Processors": [{ "Name": "TrimWhiteSpace" }, { "Name": "SplitFullName" }] }] }
                                        ]
                                    },
                                    { "Field": "Title", "Selectors": [{ "Selector": "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#con5_ilecell.dataCol.inlineEditWrite DIV#con5_ileinner", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "Company", "Selectors": [{ "Selector": "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#con4_ilecell.dataCol.inlineEditWrite DIV#con4_ileinner", "Processors": ["CleanHTML", "DetectName"] }] },
                                    {
                                        "Field": "Email", "Selectors": [
                                            { "Selector": "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#con15_ilecell DIV#con15_ileinner DIV.gmailLink A:nth-of-type(1)", "Processors": ["DiscoverURL"] },
                                            { "Selector": "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#con15_ilecell DIV#con15_ileinner A:nth-of-type(1)", "Processors": ["DiscoverURL"] }
                                        ]
                                    },
                                    { "Field": "PhoneHome", "Selectors": [{ "Selector": "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#con13_ilecell.dataCol.inlineEditWrite DIV#con13_ileinner", "Processors": ["DiscoverURL"] }] },
                                    { "Field": "PhoneOther", "Selectors": [{ "Selector": "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#con14_ilecell.dataCol.inlineEditWrite DIV#con14_ileinner", "Processors": ["DiscoverURL"] }] },
                                    { "Field": "PhoneAssistant", "Selectors": [{ "Selector": "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#con17_ilecell.dataCol.inlineEditWrite DIV#con17_ileinner", "Processors": ["DiscoverURL"] }] },

                                    { "Field": "PhoneDirect", "Selectors": [{ "Selector": "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#con10_ilecell.dataCol.inlineEditWrite DIV#con10_ileinner", "Processors": ["DiscoverURL"] }] },
                                    { "Field": "PhoneMobile", "Selectors": [{ "Selector": "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#con12_ilecell.dataCol.inlineEditWrite DIV#con12_ileinner", "Processors": ["DiscoverURL"] }] },

                                    { "Field": "Fax", "Selectors": [{ "Selector": "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#con11_ilecell.dataCol.inlineEditWrite DIV#con11_ileinner", "Processors": ["DiscoverURL"] }] },
                                    { "Field": "Website", "Selectors": [{ "Selector": "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#lea12_ilecell.dataCol.inlineEditWrite DIV#lea12_ileinner", "Processors": ["CleanHTML", "DetectName"] }] }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "Name": "Company Profile",
                "Description": "",
                "UrlPatterns": ["^(http)(s)?(://)((www|na[\\d]*).)?(salesforce.com/001).*$"],
                "Layouts": [
                    {
                        "Name": "Profile",
                        "Description": "",
                        "Qualifiers": [
                            {"Selectors":[{ "Selector": "TD#acc2_ilecell"}], "ValidationType": "Exists" }
                        ],
                        "Groups": [
                            {
                                "Group": "Profile",
                                "Selectors": ["BODY.detailPage.sfdcBody"],
                                "GroupFields": [
                                    { "Field": "Company", "Selectors": [{ "Selector": "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#acc2_ilecell.dataCol.inlineEditWrite DIV#acc2_ileinner", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "Phone", "Selectors": [{ "Selector": "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#acc10_ilecell.dataCol.inlineEditWrite DIV#acc10_ileinner", "Processors": ["DiscoverURL"] }] },
                                    { "Field": "PhoneOther", "Selectors": [{ "Selector": "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#acc11_ilecell.dataCol.inlineEditWrite DIV#acc11_ileinner", "Processors": ["DiscoverURL"] }] },
                                    { "Field": "Fax", "Selectors": [{ "Selector": "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#acc9_ilecell.dataCol.inlineEditWrite DIV#acc9_ileinner", "Processors": ["DiscoverURL"] }] },
                                    { "Field": "Website", "Selectors": [{ "Selector": "DIV#contentWrapper DIV.bodyDiv TABLE#bodyTable.outer TBODY TR TD#bodyCell.oRight DIV#ep.bDetailBlock DIV.pbBody DIV.pbSubsection TABLE.detailList TBODY TR TD#acc12_ilecell.dataCol.inlineEditWrite DIV#acc12_ileinner", "Processors": ["CleanHTML", "DetectName"] }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "ID": "f09dde95-fdef-4098-ba17-2c6038437b9c",
        "Name": "Dynamics",
        "Description": "Contacts and Leads in Dynamics CRM",
        "Domains": ["^[A-z\\d]*(.crm.dynamics.com)$", "crm.dynamics.com", "dynamics.com"],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "Paths": [
            {
                "Name": "Generic URL",
                "Description": "",
                "UrlPatterns": ["^(http)(s)?(://)((.*)\\.)?(crm\\.)?(dynamics.com/main.aspx#)[\\d]*$"],
                "Layouts": [
                    {
                        "Name": "Lead",
                        "Description": "",
                        "Qualifiers": [
                            {"Selectors": [{ "Selector": "SPAN#Tabnav_accts-main A.navTabButtonLink SPAN.navTabButtonLabel SPAN.navTabButtonText:contains(Accounts)"}], "ValidationType": "NotExists" }
                        ],
                        "Groups": [
                            {
                                "Group": "Profile",
                                "Selectors": ["IFRAME[title^=Content][title$=Area]"],
                                "GroupFields": [
                                    {
                                        "Group": "Name",
                                        "Selectors": [""],
                                        "GroupFields": [
                                            { "Field": "FullName", "Selectors": [{ "Selector": "DIV#FormTitle.ms-crm-Form-Title-Data H1", "Processors": ["CleanHTML", "DetectName"] }] },
                                            { "Field": "FirstName", "Selectors": [{ "Selector": "DIV#firstname DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] },
                                            { "Field": "LastName", "Selectors": [{ "Selector": "DIV#lastname DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] }
                                        ]
                                    },
                                    {
                                        "Group": "Position",
                                        "Selectors": [""],
                                        "GroupFields": [
                                            { "Field": "Title", "Selectors": [{ "Selector": "DIV#jobtitle  DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] },
                                            { "Field": "Company", "Selectors": [{ "Selector": "DIV#companyname  DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] }
                                        ]
                                    },
                                    { "Field": "Email", "Selectors": [{ "Selector": "DIV#emailaddress1  DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "Telephone1", "Selectors": [{ "Selector": "DIV#telephone1 DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "Telephone2", "Selectors": [{ "Selector": "DIV#telephone2 DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "Telephone3", "Selectors": [{ "Selector": "DIV#telephone3 DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "Telephone4", "Selectors": [{ "Selector": "DIV#mobilephone DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "Fax", "Selectors": [{ "Selector": "DIV#fax DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "Website", "Selectors": [{ "Selector": "DIV#websiteurl DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "City", "Selectors": [{ "Selector": "DIV#address1_city DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "State", "Selectors": [{ "Selector": "DIV#address1_stateorprovince DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] }
                                ]
                            }
                        ]
                    },
                    {
                        "Name": "Contact",
                        "Description": "",
                        "Qualifiers": [
                            { "Selectors": [{ "Selector": "IFrame#contentIFrame0", "Selector": "A#header_crmFormSelector NOBR SPAN:contains(Contact)" }], "ValidationType": "Exists"}
                        ],
                        "Groups": [
                            {
                                "Group": "Profile",
                                "Selectors": ["IFRAME[title^=Content][title$=Area]"],
                                "GroupFields": [
                                    {
                                        "Group": "Name",
                                        "Selectors": [""],
                                        "GroupFields": [
                                            { "Field": "FullName", "Selectors": [{ "Selector": "DIV#FormTitle.ms-crm-Form-Title-Data H1", "Processors": ["CleanHTML", "DetectName"] }] },
                                            { "Field": "FirstName", "Selectors": [{ "Selector": "DIV#firstname DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] },
                                            { "Field": "LastName", "Selectors": [{ "Selector": "DIV#lastname DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] }
                                        ]
                                    },
                                    {
                                        "Group": "Position",
                                        "Selectors": [],
                                        "GroupFields": [
                                            { "Field": "Title", "Selectors": [{ "Selector": "DIV#jobtitle DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] },
                                            { "Field": "Company", "Selectors": [{ "Selector": "DIV#parentcustomerid DIV.ms-crm-Inline-Edit TABLE TBODY TR TD DIV UL LI SPAN SPAN", "Processors": ["CleanHTML", "DetectName"] }] }
                                        ]
                                    },
                                    { "Field": "Email", "Selectors": [{ "Selector": "DIV#emailaddress1 DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "Telephone1", "Selectors": [{ "Selector": "DIV#telephone1 DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "Telephone2", "Selectors": [{ "Selector": "DIV#telephone2 DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "Telephone3", "Selectors": [{ "Selector": "DIV#telephone3 DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "Telephone4", "Selectors": [{ "Selector": "DIV#mobilephone DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "Fax", "Selectors": [{ "Selector": "DIV#fax DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "Website", "Selectors": [{ "Selector": "DIV#website DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "City", "Selectors": [{ "Selector": "DIV#address1_city DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "State", "Selectors": [{ "Selector": "DIV#address1_stateorprovince DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] }
                                ]
                            }
                        ]
                    },
                    {
                        "Name": "Account",
                        "Description": "",
                        "Qualifiers": [
                            {"Selectors": [{ "Selector": "SPAN#Tabnav_accts-main A.navTabButtonLink SPAN.navTabButtonLabel SPAN.navTabButtonText:contains(Accounts)"}], "ValidationType": "Exists" },
                            {"Selectors": [{ "Selector": "IFRAME[title^=Content][title$=Area] A#header_crmFormSelector NOBR.ms-crm-FormSelector SPAN.ms-crm-FormSelector:(Account)"}], "ValidationType": "Exists" }
                        ],
                        "Groups": [
                            {
                                "Group": "Profile",
                                "Selectors": ["IFRAME[title^=Content]"],
                                "GroupFields": [
                                    { "Field": "Company", "Selectors": [{ "Selector": "DIV#HeaderTitleElement SPAN#form_title_div DIV#FormTitle H1", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "Company", "Selectors": [{ "Selector": "DIV#name DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "Telephone1", "Selectors": [{ "Selector": "DIV#telephone1 DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "Telephone2", "Selectors": [{ "Selector": "DIV#telephone2 DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "Telephone3", "Selectors": [{ "Selector": "DIV#telephone3 DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "Fax", "Selectors": [{ "Selector": "DIV#fax DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "Website", "Selectors": [{ "Selector": "DIV#websiteurl DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "ticker", "Selectors": [{ "Selector": "DIV#tickersymbol DIV.ms-crm-Inline-Value SPAN", "Processors": ["CleanHTML", "DetectName"] }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "ID": "688cb45d-f3b0-4ec4-b9cf-88cfbc6d9bd6",
        "Name": "Grid Buddy - Lead Assignment",
        "Description": "Contact Grid in GridBuddy Leads for Assignment",
        "Domains": ["^(gblite.)(na)[\\d]{1,}(.visual.force.com)$", "www.salesforce.com"],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "Paths": [
            {
                "Name": "Lead Assignment",
                "Description": "",
                "UrlPatterns": ["^(http)(s)?(:\/\/)(.*)(.na)(.*)(.visual.force.com\/).*$"],
                "Layouts": [
                     {
                         "Name": "User Profile Default",
                         "Description": "",
                         "Qualifiers": [
                             {"Selectors": [{ "Selector": "IFRAME#gridFrame"}], "ValidationType": "Exists" }
                         ],
                         "Groups": [
                            {
                                "Group": "IFrame",
                                "Selectors": ["IFRAME#gridFrame"],
                                "GroupFields": [
                                   {
                                       "Group": "Profiles",
                                       "Multiple": true,
                                       "Selectors": ["TABLE#gbMainTable TBODY TR:not(TR.gradientHeader)"],
                                       "GroupFields": [
                                           { "Field": "FullName", "Selectors": [{ "Selector": "TD[name='v0']", "Processors": [{ "Name": "TrimWhiteSpace" }, { "Name": "SplitFullName" }] }] },
                                           { "Field": "Company", "Selectors": [{ "Selector": "TD[name='v3'] INPUT", "Attribute": "value" }] },
                                           { "Field": "Title", "Selectors": [{ "Selector": "TD[name='v4'] INPUT", "Attribute": "value" }] },
                                           { "Field": "Email", "Selectors": [{ "Selector": "TD[name='v5'] INPUT", "Attribute": "value" }] },
                                           { "Field": "Phone", "Selectors": [{ "Selector": "TD[name='v6'] INPUT", "Attribute": "value" }] }
                                       ]
                                   }
                                ]
                            }
                         ]
                     },
                    {
                        "Name": "User Profile Popout",
                        "Description": "",
                        "Qualifiers": [
                            {"Selectors": [{ "Selector": "DIV.gbPage.gben.compactView"}], "ValidationType": "Exists" },
                            {"Selectors": [{ "Selector": "SPAN.search-wrapper"}], "ValidationType": "NotExists" }
                        ],
                        "Groups": [
                        {
                            "Group": "Profiles",
                            "Multiple": true,
                            "Selectors": ["TABLE#gbMainTable TBODY TR:not(TR.gradientHeader)"],
                            "GroupFields": [
                                { "Field": "FullName", "Selectors": [{ "Selector": "TD[name='v0']", "Processors": [{ "Name": "TrimWhiteSpace" }, { "Name": "SplitFullName" }] }] },
                                { "Field": "Company", "Selectors": [{ "Selector": "TD[name='v3'] INPUT", "Attribute": "value" }] },
                                { "Field": "Title", "Selectors": [{ "Selector": "TD[name='v4'] INPUT", "Attribute": "value" }] },
                                { "Field": "Email", "Selectors": [{ "Selector": "TD[name='v5'] INPUT", "Attribute": "value" }] },
                                { "Field": "Phone", "Selectors": [{ "Selector": "TD[name='v6'] INPUT", "Attribute": "value" }] }
                            ]
                        }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "ID": "a7a23ad4-6db6-4b28-b393-de9015f17f80",
        "Name": "Lead 411",
        "Description": "Lead 411 User Profile",
        "Domains": ["lead411.com", "www.lead411.com"],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "Paths": [
            {
                "Name": "Lead 411 Company List",
                "Description": "",
                "UrlPatterns": ["^(http)?s?(:\/\/)?(www.)?lead411.com\/company_[A-z0-9._-]+$"],
                "Layouts": [
                    {
                        "Name": "Logged Out Company List",
                        "Description": "",
                        "Qualifiers": [
                            {"Selectors": [{ "Selector": "BODY.body_loggedout"}], "ValidationType": "Exists" }
                        ],
                        "Groups": [
                            {
                                "Group": "Profiles",
                                "Multiple": true,
                                "Selectors": ["TABLE#example TBODY TR"],
                                "GroupFields": [
                                    { "Field": "FullName", "Selectors": [{ "Selector": "TD DIV A", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                    { "Field": "Title", "Selectors": [{ "Selector": "TD DIV DIV", "Processors": [{ "Name": "Trim", "Params": "Title:" }, { "Name": "TrimWhiteSpace" }] }] },
                                    { "Field": "Phone", "Selectors": [{ "Selector": "TD:nth-of-type(5)", "Processors": [{ "Name": "Trim", "Params": "HQ :" }, { "Name": "TrimWhiteSpace" }] }] },
                                    { "Field": "Company", "Selectors": [{ "Selector": "DIV.company_system_top_left DIV.system", "Processors": [{ "Name": "TrimWhiteSpace" }], "Scope": 1 }] },
                                    { "Field": "Website", "Selectors": [{ "Selector": "DIV.company_system_top_left DIV.top_left_inner_box1 A", "Processors": [], "Attribute": "href", "Scope": 1 }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "ID": "5c45b363-4055-4f3a-81f2-f711fc31a154",
        "Name": "Google",
        "Description": "Google LinkedIn Results",
        "Domains": ["google.com", "www.google.com"],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "Paths": [
            {
                "Name": "Google Search Results",
                "Description": "",
                "UrlPatterns": ["^(http)?(s)?(:\/\/)?((www|[A-z]{2,2}).)?(google.com\/)(search\\?|webhp\\?|#q=).*$"],
                "Layouts": [
                    {
                        "Name": "Google Search Results",
                        "Description": "",
                        "Qualifiers": [
                            {"Selectors": [{ "Selector": "DIV#resultStats"}], "ValidationType": "Exists" }
                        ],
                        "Groups": [
                            {
                                "Group": "Profiles",
                                "Multiple": true,
                                "Selectors": ["DIV#rso DIV.srg DIV.g DIV.rc"],
                                "Qualifiers": [{ "Selectors": [" > DIV.s DIV DIV.f.kv CITE:contains(linkedin.com/in)", " > DIV.s DIV DIV.f.kv CITE:contains(linkedin.com/pub)"], "ValidationType": "Exists", "Operand": "Or" }, { "Selectors": [" > DIV.s DIV DIV.f.kv CITE:contains(linkedin.com/pub/dir)"], "ValidationType": "NotExists" }],
                                "Buttons": [
                                    {
                                        "Type": "DIV",
                                        "Style": "float: right;",
                                        "Position": "after",
                                        "Selectors": [
                                            {
                                                "Selector": "H3.r"
                                            }
                                        ],
                                        "Buttons": ["capture_contact_button_logo|height: 17px;"]
                                    }
                                ],
                                "GroupFields": [
                                    { "Field": "FullName", "Selectors": [{ "Selector": "H3.r A", "Processors": [{ "Name": "Remove", "Params": " \\| LinkedIn" }, { "Name": "ParseHandle" }] }] },
                                    { "Field": "LinkedIn", "Selectors": [{ "Selector": "DIV.s DIV DIV.f.kv CITE" }] },
                                    { "Field": "Location", "Selectors": [{ "Selector": "DIV.s DIV DIV.f.slp", "Processors": [{ "Name": "Remove", "Params": "(\\s-\\s).*" }] }] },
                                    { "Field": "CompanyTitle", "Selectors": [{ "Selector": "DIV.s DIV DIV.f.slp", "Processors": [{ "Name": "Remove", "Params": "^([A-z0-9\\s,-]*)(-\\s){1,1}" }, { "Name": "SplitCompanyTitle" }] }] },
                                    { "Field": "Title", "Selectors": [{ "Selector": "DIV.s DIV DIV.f.slp", "Processors": [{ "Name": "Remove", "Params": "^([A-z0-9\\s,-]*)(-\\s){1,1}" }] }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    /*{
        "ID": "5c45b363-4055-4f3a-81f2-f711fc31a154",
        "Name": "Google",
        "Description": "Google LinkedIn Results",
        "Domains": ["google.com", "www.google.com"],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "Paths": [{
            "Name": "Google Search Results",
            "Description": "",
            "UrlPatterns": ["^(http)?(s)?(:\/\/)?((www|[A-z]{2,2}).)?(google.com\/)(search\\?|webhp\\?|#q=).*$"],
            "Layouts": [{
                "Name": "Google Search Results",
                "Description": "",
                "Qualifiers": [
                    {"Selectors": [{ "Selector": "DIV#resultStats"}], "ValidationType": "Exists" }
                ]
        }]
    },*/
    /*{
        "ID": "5c45b363-4055-4f3a-81f2-f711fc31a154",
        "Name": "Google",
        "Description": "Google LinkedIn Results",
        "Domains": ["google.com", "www.google.com"],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "Paths": [
            {
                "Name": "Google Search Results",
                "Description": "",
                "UrlPatterns": ["^(http)?(s)?(:\/\/)?((www|[A-z]{2,2}).)?(google.com\/)(search\\?|webhp\\?|#q=).*$"],
                "Layouts": [
                    {
                        "Name": "Google Search Results",
                        "Description": "",
                        "Qualifiers": [
                            {"Selectors": [{ "Selector": "DIV#resultStats"}], "ValidationType": "Exists" }
                        ],
                        "Groups": [
                            {
                                "Group": "Profiles",
                                "Multiple": true,
                                "Selectors": ["OL#rso DIV.srg LI.g DIV.rc"],
                                "Qualifiers": [{ "Selectors": [" > DIV.s DIV DIV.f.kv CITE:contains(linkedin.com/in)", " > DIV.s DIV DIV.f.kv CITE:contains(linkedin.com/pub)"], "ValidationType": "Exists", "Operand": "Or" }, { "Selectors": [" > DIV.s DIV DIV.f.kv CITE:contains(linkedin.com/pub/dir)"], "ValidationType": "NotExists"}],
                                "Buttons": [
                                    {
                                        "Type": "DIV",
                                        "Class": "Capture_Injected_Container_Inline",
                                        "Style": "",
                                        "Position": "after",
                                        "Inner": {
                                            "Type": "SPAN",
                                            "Class": "Capture_Injected_Container_Inner_TopLeft",
                                            "Style": "width: 16px; margin-left: 5px;"
                                        },
                                        "Selectors": [
                                            {
                                                "Selector": "H3.r"
                                            }
                                        ]
                                    },
				                "capture_contact_button_logo|height: 17px; float: right;"
                                ],
                                "GroupFields": [
                                    { "Field": "FullName", "Selectors": [{ "Selector": "H3.r A", "Processors": [{ "Name": "Remove", "Params": "\\| LinkedIn" }, { "Name": "ParseHandle" }] }] },
                                    { "Field": "LinkedIn", "Selectors": [{ "Selector": "DIV.s DIV DIV.f.kv CITE" }] },
                                    { "Field": "Location", "Selectors": [{ "Selector": "DIV.s DIV DIV.f.slp", "Processors": [{ "Name": "Remove", "Params": "(\\s-\\s).*" }] }] },
                                    { "Field": "CompanyTitle", "Selectors": [{ "Selector": "DIV.s DIV DIV.f.slp", "Processors": [{ "Name": "Remove", "Params": "^([A-z0-9\\s,-]*)(-\\s){1,1}" }, { "Name": "SplitCompanyTitle" }] }] },
                                    { "Field": "Title", "Selectors": [{ "Selector": "DIV.s DIV DIV.f.slp", "Processors": [{ "Name": "Remove", "Params": "^([A-z0-9\\s,-]*)(-\\s){1,1}" }] }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },*/
    {
        "ID": "189a8fa4-2a94-4b03-8aba-70319caeeb28",
        "Name": "Twitter - Lists",
        "Description": "Twitter Profiles on Listing Pages",
        "Domains": ["twitter.com", "www.twitter.com"],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "Paths": [
            {
                "Name": "Member List",
                "Description": "",
                "UrlPatterns": ["^(http)(s)?(:\/\/)(www.)?(twitter.com\/)([A-Za-z0-9_-]+)(\/)(lists\/)([A-Za-z0-9_-]+)(\/)(members)(\/)?$"],
                "Layouts": [
                    {
                        "Name": "Member List",
                        "Description": "",
                        "Qualifiers": [
                            { "Selectors": [{ "Selector": "OL#stream-items-id"}], "ValidationType": "Exists"}
                        ],
                        "Groups": [
                            {
                                "Group": "Profiles",
                                "Multiple": true,
                                "Selectors": ["LI.js-stream-item"],
                                "GroupFields": [
                                    { "Field": "FullName", "Selectors": [{ "Selector": "DIV.account DIV.content DIV.stream-item-header A.account-group STRONG.fullname", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                    { "Field": "Twitter", "Selectors": [{ "Selector": "DIV.account DIV.content DIV.stream-item-header A.account-group SPAN.username", "Processors": [{ "Name": "Trim", "Params": "@" }] }] },
                                    { "Field": "Bio", "Selectors": [{ "Selector": "DIV.account DIV.content P.bio" }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "ID": "fd2bdf2c-a7b3-4572-bce5-06a7879591aa",
        "Name": "Dice",
        "Description": "Resumes on Dice",
        "Domains": [ "dice.com", "www.dice.com" ],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "Paths": [
            {
                "Name": "Dice Resumes",
                "Description": "",
                "UrlPatterns": [ "^(http)?(s)?(://)?(employer.dice.com/ows/integratedProfile.html).*$" ],
                "Layouts": [
                    {
                        "Name": "Resume",
                        "Description": "",
                        "Qualifiers": [
                            { "Selectors": [{"Selector": "TITLE#candidateTitle"}], "ValidationType": "Exists"}
                        ],
                        "Groups": [
                            {
                                "Group": "Profile",
                                "Selectors": ["BODY"],
                                "GroupFields": [
                                    {
                                        "Group": "Name",
                                        "Selectors": [ "DIV#tmCandidateName" ],
                                        "GroupFields": [
                                            { "Field": "FullName", "Selectors": [{ "Selector": "H1", "Processors": [{ "Name": "ReplaceNonBreakingSpaces" }, { "Name": "ParseHandle"  }] }] }
                                        ]
                                    },
                                    {
                                        "Group": "Email",
                                        "Selectors": [ "DIV#profile-email" ],
                                        "GroupFields": [
                                            {  "Field": "Email", "Selectors": [{ "Selector": "A", "Processors": [{ "Name": "TrimWhiteSpace" }] }] }
                                        ]
                                    },
                                    {
                                        "Group": "Title",
                                        "Selectors": [ "DIV#currentStatus1" ],
                                        "GroupFields": [
                                            { "Field": "Title", "Selectors": [{ "Selector": "H2", "Processors": [{ "Name": "TrimWhiteSpace" }] }] }
                                        ]
                                    },
                                    {
                                        "Group": "Location",
                                        "Selectors": [ "DIV.tm-current-location" ],
                                        "GroupFields": [
                                            { "Field": "Location", "Selectors": [ { "Selector": "", "Processors": [ { "Name": "TrimWhiteSpace" } ] } ] }
                                        ]
                                    },
                                    {
                                        "Group": "Relocation",
                                        "Selectors": [ "DIV#relocation" ],
                                        "GroupFields": [
                                            { "Field": "Relocate?", "Selectors": [{ "Selector": "A#relocationLink", "Processors": [{ "Name": "TrimWhiteSpace" }, { "Name": "Remove", "Params": "Relocate\\?" }] }] }
                                        ]
                                    },
                                    {
                                        "Group": "Citizenship",
                                        "Selectors": [ "A#work-auth-link" ],
                                        "GroupFields": [
                                            { "Field": "Citizenship", "Selectors": [{ "Selector": "", "Processors": [{ "Name": "TrimWhiteSpace" }] }] }
                                        ]
                                    },
                                    {
                                        "Group": "Position",
                                        "Modifier": "Current",
                                        "Selectors": [ "DL#currentEmployer" ],
                                        "GroupFields": [
                                            { "Field": "CompanyTitle", "Selectors": [{ "Selector": "DD", "Processors": [{ "Name": "TrimWhiteSpace" }, { "Name": "SplitCompanyTitle" }] }] }
                                        ]
                                    },
                                    {
                                        "Group": "Previous Positions",
                                        "Multiple": true,
                                        "Selectors": [
                                            "DL#previousEmployer DD SPAN:nth-of-type(odd)"
                                        ],
                                        "GroupFields": [
                                            { "Field": "Company", "Selectors": [{ "Selector": "", "Processors": [{ "Name": "TrimWhiteSpace" }] }] }
                                        ]
                                    },
                                    {
                                        "Group": "Skill Block",
                                        "Multiple": true,
                                        "Selectors": [ "DIV.talent-match-skills DIV.column" ],
                                        "GroupFields": [
                                            {
                                                "Group": "Skill",
                                                "Multiple": true,
                                                "Selectors": [ "SPAN.skill" ],
                                                "GroupFields": [
                                                    { "Field": "Skill", "Selectors": [ { "Selector": "SPAN.description", "Processors": [ { "Name": "TrimWhiteSpace" } ] } ] },
                                                    { "Field": "Year", "Selectors": [{ "Selector": "SPAN.year", "Processors": [{ "Name": "TrimWhiteSpace" }, { "Name": "Remove", "Params": "[^0-9]*" }] }] }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "Group": "Work Preferences",
                                        "Selectors": [
                                            "DIV#profile-preferences"
                                        ],
                                        "GroupFields": [
                                            {"Field": "Relocate","Selectors": [{ "Selector": "DL#relocationChoices DD SPAN:nth-of-type(1)","Processors": [{"Name": "TrimWhiteSpace"}, {"Name": "Trim","Params": ";"}] }] },
                                            {
                                                "Group": "Relocation Choices",
                                                "Selectors": [ "DL#relocationChoices DD SPAN.relocationChoices SPAN.relocationChoice" ],
                                                "Multiple": true,
                                                "GroupFields": [
                                                    { "Field": "RelocateChoice", "Selectors": [{ "Selector": "", "Processors": [{  "Name": "TrimWhiteSpace" }] }] }
                                                ]
                                            },
                                            { "Field": "Authorization", "Selectors": [{ "Selector": "DL#work-authorization DD", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                            { "Field": "Telecommute", "Selectors": [{ "Selector": "DL#telecommute DD", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                            { "Field": "Travel", "Selectors": [{ "Selector": "DL#travel DD", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                            { "Field": "HourlyRate", "Selectors": [{ "Selector": "DL#hourly-rate DD", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                            { "Field": "Salary", "Selectors": [{ "Selector": "DL#salary DD", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                            { "Field": "TaxTerms", "Selectors": [{ "Selector": "DL#employment-type DD", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                            { "Field": "SecurityClearance", "Selectors": [{ "Selector": "DL#security-clearance DD", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                            { "Field": "ThirdParty", "Selectors": [{ "Selector": "DL#third-party DD", "Processors": [{ "Name": "TrimWhiteSpace" }] }] }
                                        ]
                                    },
                                    {
                                        "Group": "Resume",
                                        "Selectors": [ "DIV#resume" ],
                                        "GroupFields": [
                                            { "Field": "Resume", "Selectors": [{ "Selector": "", "Processors": [] }] }
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
    {
        "ID": "dac51857-7250-44a6-ba89-1b37b06129d6",
        "Name": "Monster",
        "Description": "Resumes on Monster",
        "Domains": [ "monster.com", "www.monster.com" ],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "Paths": [
            {
                "Name": "Monster Resumes",
                "Description": "",
                "UrlPatterns": [ "^(http)?(s)?(://)?(hiring.monster.com/jcm/resumesearch/ResumeView).*$" ],
                "Layouts": [
                    {
                        "Name": "Resume",
                        "Description": "",
                        "Qualifiers": [
                            { "Selectors": [{"Selector": "DIV#candidatedetail"}], "ValidationType": "Exists" }
                        ],
                        "Groups": [
                            {
                                "Group": "Candidate Data",
                                "Selectors": [ "DIV#pageWrapperCandidates" ],
                                "GroupFields": [
                                    { "Field": "FullName", "Selectors": [{ "Selector": "DIV#candidateData DIV.headerColumn.columnCandidateBrief DIV#nameAndIcons SPAN.candidateName", "Processors": [{ "Name": "TrimWhiteSpace" }, { "Name": "SplitFullName" }] }] },
                                    { "Field": "Location", "Selectors": [{ "Selector": "DIV#candidateData DIV.headerColumn.columnCandidateBrief DIV.wordWrap SPAN.candidateLocation", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                    { "Field": "Education", "Selectors": [{ "Selector": "DIV#candidateData DIV.headerColumn.columnCandidateBrief DIV.wordWrap SPAN.candidateEduLevel", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                    {
                                        "Group": "Position",
                                        "Modifier": "Current",
                                        "Selectors": [ "DIV#candidateData DIV.headerColumn.columnCandidateBrief TABLE#tblCandidateProfile TBODY TR.trCandidateRecord TD TABLE#candidateJobProfile TBODY TR TD:nth-of-type(2) DIV" ],
                                        "GroupFields": [
                                            { "Field": "Title", "Selectors": [{ "Selector": "SPAN#currentJobTitle", "Processors": [{ "Name": "TrimWhiteSpace" }, { "Name": "Trim", "Params": "[^A-z0-9]$" }] }] },
                                            {"Field": "Title","Selectors": [{ "Selector": "SPAN#currentCompany", "Processors": [{ "Name": "TrimWhiteSpace" } ] } ] }
                                        ]
                                    },
                                    { "Field": "Location", "Selectors": [{ "Selector": "DIV#candidateData DIV.headerColumn.columnCandidateBrief DIV.detail-holder DIV:nth-of-type(1) SPAN", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                    { "Field": "Phone1", "Selectors": [{ "Selector": "DIV#candidateData DIV.headerColumn.columnCandidateBrief DIV.detail-holder DIV:nth-of-type(2) SPAN", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                    { "Field": "Phone2", "Selectors": [{ "Selector": "DIV#candidateData DIV.headerColumn.columnCandidateBrief DIV.detail-holder DIV:nth-of-type(3) SPAN", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                    { "Field": "Email", "Selectors": [{ "Selector": "DIV#candidateData DIV.headerColumn.columnCandidateBrief DIV.detail-holder DIV:nth-of-type(4) A", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                    { "Field": "Website", "Selectors": [{ "Selector": "DIV#candidateData DIV.headerColumn.columnCandidateBrief DIV.detail-holder DIV:nth-of-type(5) A", "Processors": [], "Attribute": "href" }] },
                                    { "Field": "Experience", "Selectors": [{ "Selector": "DIV#candidateData DIV.headerColumn.columnCandidateDetails FIELDSET UL.candidateDetailList LI:nth-of-type(2) SPAN.candidateDetailInfo", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                    { "Field": "Authorization", "Selectors": [{ "Selector": "DIV#candidateData DIV.headerColumn.columnCandidateDetails FIELDSET UL.candidateDetailList LI.workAuthorization SPAN.candidateDetailInfo", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                    { "Field": "DesiredSalary", "Selectors": [{ "Selector": "DIV#candidateData DIV.headerColumn.columnCandidateDetails FIELDSET UL.candidateDetailList LI.salary SPAN.candidateDetailInfo", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                    { "Field": "Relocation", "Selectors": [{ "Selector": "DIV#candidateData DIV.headerColumn.columnCandidateDetails FIELDSET UL.candidateDetailList LI.relocation SPAN.candidateDetailInfo", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                    { "Field": "Resume", "Selectors": [{ "Selector": "DIV.resumeBody", "Processors": [{ "Name": "TrimWhiteSpace" }] }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "ID": "cf24e051-d7f2-4909-9637-59cedfc52bec",
        "Name": "CareerBuilder",
        "Description": "Resumes on CareerBuilder",
        "Domains": [ "www.careerbuilder.com", "careerbuilder.com" ],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "Paths": [
            {
                "Name": "CareerBuilder Resumes",
                "Description": "",
                "UrlPatterns": [ "^(http)?(s)?(://)?(www.)?(careerbuilder.com/)(/)?(jobposter/resumes/ResumeDetail).*$" ],
                "Layouts": [
                    {
                        "Name": "Resume",
                        "Description": "",
                        "Qualifiers": [
                            { "Selectors": [{"Selector": "DIV#header.resumetitle"}], "ValidationType": "Exists" }
                        ],
                        "Groups": [
                            {
                                "Group": "Profile",
                                "Selectors": [ "DIV#main-container" ],
                                "GroupFields": [
                                    {
                                        "Group": "GeneralInfo",
                                        "Selectors": [ "DIV#detailslbl DIV#personalinfo TABLE TBODY TR TD:nth-of-type(1) TABLE.details TBODY" ],
                                        "GroupFields": [
                                            { "Field": "FullName", "Selectors": [{ "Selector": "TR:nth-of-type(1) TD:nth-of-type(2)", "Processors": [{ "Name": "TrimWhiteSpace" }, { "Name": "SplitFullName" }] }] },
                                            { "Field": "Phone", "Selectors": [{ "Selector": "TR:nth-of-type(2)  TD:nth-of-type(2)", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                            { "Field": "Email", "Selectors": [{ "Selector": "TR:nth-of-type(3)  TD:nth-of-type(2)", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                            { "Field": "Location", "Selectors": [{ "Selector": "TR:nth-of-type(4)  TD:nth-of-type(2)", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                            { "Field": "WorkStatus", "Selectors": [{ "Selector": "TR:nth-of-type(5)  TD:nth-of-type(2)", "Processors": [ { "Name": "TrimWhiteSpace" }] }] }
                                        ]
                                    },
                                    {
                                        "Group": "Experience",
                                        "Selectors": [ "DIV#experience TABLE.details TBODY" ],
                                        "GroupFields": [
                                            { "Field": "TotalExperience", "Selectors": [{ "Selector": "TR:nth-of-type(1) TD:nth-of-type(2)", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                            { "Field": "JobCategories", "Selectors": [{ "Selector": "TR:nth-of-type(2)  TD:nth-of-type(2)", "Processors": [{ "Name": "TrimWhiteSpace" }] }] }
                                        ]
                                    },
                                    {
                                        "Group": "Work History",
                                        "Modifier": "Flat List",
                                        "Step": 3,
                                        "Multiple": true,
                                        "Selectors": [ "DIV#workhistory TABLE.details TBODY TR" ],
                                        "GroupFields": [
                                            { "Field": "Company", "Selectors": [{ "Selector": "TD:eq(1)", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                            { "Field": "Tenure", "Selectors": [{ "Selector": "TD:eq(2)", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                            { "Field": "Title", "Selectors": [{ "Selector": "+ TR TD:eq(1)", "Processors": [ { "Name": "TrimWhiteSpace" }] }] }
                                        ]
                                    },
                                    {
                                        "Group": "Education",
                                        "Modifier": "Flat List",
                                        "Step": 4,
                                        "Multiple": true,
                                        "Selectors": [ "DIV#education TABLE.details TBODY TR" ],
                                        "GroupFields": [
                                            { "Field": "School", "Selectors": [{ "Selector": "TD:eq(1)", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                            { "Field": "Graduation", "Selectors": [{ "Selector": "TD:eq(3)", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                            { "Field": "Major", "Selectors": [{ "Selector": " + TR TD:eq(1)", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                            { "Field": "Degree", "Selectors": [{ "Selector": "+ TR + TR TD:eq(1)", "Processors": [{ "Name": "TrimWhiteSpace" }] }] }
                                        ]
                                    },
                                    {
                                        "Group": "Additional Skills and Qualifications",
                                        "Selectors": [ "DIV#additionalskills TABLE.details TBODY" ],
                                        "GroupFields": [
                                            { "Field": "RecentTitle", "Selectors": [{ "Selector": "TR:eq(0) TD:eq(1)", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                            { "Field": "RecentWage", "Selectors": [{ "Selector": "TR:eq(0) TD:eq(3)", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                            { "Field": "Languages", "Selectors": [{ "Selector": "TR:eq(1) TD:eq(1)", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                            { "Field": "ManagedOthers", "Selectors": [{ "Selector": "TR:eq(1) TD:eq(3)", "Processors": [{ "Name": "TrimWhiteSpace"}] }] },
                                            { "Field": "Security Clearance", "Selectors": [{ "Selector": "TR:eq(2) TD:eq(1)", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                            { "Field": "MilitaryExperience", "Selectors": [{ "Selector": "TR:eq(0) TD:eq(3)", "Processors": [{ "Name": "TrimWhiteSpace" }] }] }
                                        ]
                                    },
                                    {
                                        "Group": "Additional Skills and Qualifications",
                                        "Selectors": [ "DIV#desiredposition TABLE.details TBODY" ],
                                        "GroupFields": [
                                            { "Field": "DesiredWages", "Selectors": [{ "Selector": "TR:eq(0) TD:eq(1)", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                            { "Field": "DesiredEmployment", "Selectors": [{ "Selector": "TR:eq(0) TD:eq(3)", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                            { "Field": "DesiredTravel", "Selectors": [{ "Selector": "TR:eq(1) TD:eq(1)", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                            { "Field": "DesiredCommute", "Selectors": [{ "Selector": "TR:eq(1) TD:eq(3)", "Processors": [{ "Name": "TrimWhiteSpace" }] }] },
                                            { "Field": "DesiredRelocation", "Selectors": [{ "Selector": "TR:eq(2) TD:eq(1)", "Processors": [{ "Name": "TrimWhiteSpace" }] }] }
                                        ]
                                    },
                                    {
                                        "Group": "Resume",
                                        "Selectors": [ "DIV#resumeDetailResume" ],
                                        "GroupFields": [
                                            { "Field": "Resume", "Selectors": [{ "Selector": "", "Processors": [{ "Name": "TrimWhiteSpace" }] }] }
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
    {
        "AuthorName": "Justin Stull",
        "CreatedDate": "2015-01-08",
        "Description": "Linkedin Not Signed-in, Signed-in, Public and Premium Profiles",
        "DocumentType": "CapturePatternVer1",
        "Domains": [
          "linkedin.com",
          "www.linkedin.com"
        ],
        "ID": "9e32e560-3806-4241-9158-4183136fc7cb",
        "Name": "LinkedIn",
        "Paths": [
          {
              "Description": "",
              "Layouts": [
                {
                    "Description": "",
                    "Groups": [
                      {
                          "Buttons": [
                            {
                                "Buttons": [
                                  "capture_contact_button_logo|height: 16px;"
                                ],
                                "Position": "after",
                                "Selectors": [
                                  {
                                      "Selector": "DIV#top-card DIV.profile-top-card DIV.profile-card DIV.profile-overview DIV.profile-overview-content DIV DIV DIV#name-container DIV#name H1 SPAN.fn SPAN.full-name"
                                  }
                                ],
                                "Style": "float: right;",
                                "Type": "DIV"
                            }
                          ],
                          "Group": "Profile",
                          "GroupFields": [
                            {
                                "Field": "FullName",
                                "Selectors": [
                                  {
                                      "Processors": [
                                        {
                                            "Name": "SplitFullName"
                                        }
                                      ],
                                      "Selector": "DIV#name H1 SPAN.fn SPAN.full-name"
                                  }
                                ]
                            },
                            {
                                "Field": "Company",
                                "Selectors": [
                                    {
                                        "Processors": [],
                                        "Selector": "TR#overview-summary-current TD OL LI A"
                                    }
                                ]
                            },
                            {
                                "Group": "Position",
                                "GroupFields": [
                                  {
                                      "Field": "Title",
                                      "Selectors": [
                                        {
                                            "Processors": [],
                                            "Selector": "DIV.current-position:nth-of-type(1) DIV HEADER H4 A"
                                        }
                                      ]
                                  },
                                  {
                                      "Field": "Company",
                                      "Selectors": [
                                        {
                                            "Processors": [],
                                            "Selector": "DIV.current-position:nth-of-type(1) DIV HEADER H5 A"
                                        }
                                      ]
                                  },
                                  {
                                      "Field": "CompanyTitle",
                                      "Selectors": [
                                        {
                                            "Processors": [
                                              {
                                                  "Name": "SplitCompanyTitle"
                                              }
                                            ],
                                            "Selector": "p.title"
                                        }
                                      ]
                                  }
                                ],
                                "Modifier": "Latest",
                                "Selectors": [
                                  ""
                                ]
                            },
                            {
                                "Group": "Positions",
                                "GroupFields": [
                                  {
                                      "Field": "Title",
                                      "Selectors": [
                                        {
                                            "Processors": [],
                                            "Selector": "DIV:nth-of-type(1) HEADER H4 A"
                                        }
                                      ]
                                  },
                                  {
                                      "Field": "Company",
                                      "Selectors": [
                                        {
                                            "Processors": [],
                                            "Selector": "DIV:nth-of-type(1) HEADER H5 SPAN STRONG A"
                                        }
                                      ]
                                  },
                                  {
                                      "Field": "Description",
                                      "Selectors": [
                                        {
                                            "Processors": [
                                              "CleanHTML"
                                            ],
                                            "Selector": "DIV:nth-of-type(1) P.description"
                                        }
                                      ]
                                  },
                                  {
                                      "Field": "TeniorLocation",
                                      "Selectors": [
                                        {
                                            "Processors": [
                                              "CleanHTML",
                                              "DetectTenior",
                                              "DetectLocation"
                                            ],
                                            "Selector": "DIV:nth-of-type(1) SPAN.experience-date-locale"
                                        }
                                      ]
                                  }
                                ],
                                "Multiple": true,
                                "Selectors": [
                                  "DIV#background-experience DIV"
                                ]
                            },
                            {
                                "Field": "Location",
                                "Selectors": [
                                  {
                                      "Processors": [],
                                      "Selector": "DIV#top-card DIV.profile-top-card.top-card DIV.profile-card.vcard DIV.profile-overview DIV.profile-overview-content DIV[id^=member-].masthead DIV DIV#demographics.demographic-info.adr.editable-item DIV#location-container DIV#location.editable-item DL DD SPAN.locality A[name=location]"
                                  }
                                ]
                            },
                            {
                                "Group": "Websites",
                                "GroupFields": [
                                  {
                                      "Field": "Website",
                                      "Selectors": [
                                        {
                                            "Attribute": "href",
                                            "Processors": [
                                              {
                                                  "Name": "GetQueryStringParameter",
                                                  "Params": "url"
                                              },
                                              "URLDecode"
                                            ],
                                            "Selector": "A"
                                        }
                                      ]
                                  }
                                ],
                                "Multiple": true,
                                "Selectors": [
                                  "DIV#website-view UL LI"
                                ]
                            },
                            {
                                "Field": "Twitter",
                                "Selectors": [
                                  {
                                      "Processors": [
                                        "CleanHTML"
                                      ],
                                      "Selector": "DIV#top-card DIV.profile-top-card.top-card DIV.profile-card-extras DIV#contact-info-section.more-info TABLE#internet-presence-table TBODY TR.twitter-presence TD DIV#twitter.editable-item DIV#twitter-view UL LI A"
                                  }
                                ]
                            },
                            {
                                "Field": "Email",
                                "Selectors": [
                                  {
                                      "Processors": [
                                        "CleanHTML"
                                      ],
                                      "Selector": "DIV#top-card DIV.profile-top-card.top-card DIV.profile-card-extras DIV#contact-info-section.more-info TABLE TBODY TR TD DIV#email DIV#email-view UL LI A"
                                  }
                                ]
                            },
                            {
                                "Field": "Phone",
                                "Selectors": [
                                  {
                                      "Processors": [
                                        "CleanHTML"
                                      ],
                                      "Selector": "DIV#top-card DIV.profile-top-card.top-card DIV.profile-card-extras DIV#contact-info-section.more-info TABLE:nth-of-type(2) TBODY TR TD DIV#phone.editable-item DIV#phone-view UL LI"
                                  }
                                ]
                            },
                            {
                                "Field": "Address",
                                "Selectors": [
                                  {
                                      "Processors": [
                                        "CleanHTML"
                                      ],
                                      "Selector": "DIV#top-card DIV.profile-top-card.top-card DIV.profile-card-extras DIV#contact-info-section.more-info TABLE:nth-of-type(2) TBODY TR TD DIV#address.editable-item DIV#address-view UL LI"
                                  }
                                ]
                            },
                            {
                                "Field": "BIO",
                                "Selectors": [
                                  {
                                      "Processors": [
                                        "CleanHTML"
                                      ],
                                      "Selector": "DIV#profile DIV#background.profile-background DIV.background-content DIV#background-summary-container.background-section DIV#background-summary.background-summary.edit-default DIV#summary-item.editable-item.section-item DIV#summary-item-view DIV.summary P.description"
                                  }
                                ]
                            },
                            {
                                "Field": "LinkedIn",
                                "Selectors": [
                                  {
                                      "Selector": "DIV#top-card DIV.profile-actions UL LI DL.public-profile DD A"
                                  }
                                ]
                            },
                            {
                                "Field": "Website",
                                "Selectors": [
                                  {
                                      "Attribute": "href",
                                      "Processors": [
                                        {
                                            "Name": "GetQueryStringParameter",
                                            "Params": "url"
                                        },
                                        "URLDecode"
                                      ],
                                      "Selector": "TR#overview-summary-websites TD UL LI A"
                                  }
                                ]
                            }
                          ],
                          "Selectors": [
                            "DIV#wrapper"
                          ]
                      }
                    ],
                    "Name": "Contact Profile",
                    "Qualifiers": [
                      {
                          "Selectors": [
                            {
                                "Selector": "DIV#wrapper"
                            }
                          ],
                          "ValidationType": "Exists"
                      }
                    ]
                }
              ],
              "Name": "Contact Profile",
              "UrlPatterns": [
                "^(http)(s)?(://)((www|[A-z]{2,2}).)?(linkedin.com/)(profile|in|pub)(/)(?!dir/).*$"
              ]
          }
        ],
        "PatternVersion": "1.2",
        "SchemaVersion": "1.0.0",
        "SourceName": "Community",
        "UserDomains": [],
        "$$hashKey": "object:674"
    },
    /*{
        "AuthorName": "Justin Stull",
        "CreatedDate": "2015-01-08",
        "Description": "Linkedin Not Signed-in, Signed-in, Public and Premium Profiles",
        "DocumentType": "CapturePatternVer1",
        "Domains": [
          "linkedin.com",
          "www.linkedin.com"
        ],
        "ID": "9e32e560-3806-4241-9158-4183136fc7cb",
        "Name": "LinkedIn",
        "Paths": [
          {
              "Description": "",
              "Layouts": [
                {
                    "Description": "",
                    "Groups": [
                      {
                          "Buttons": [
                            {
                                "Buttons": [
                                  "capture_contact_button_logo|height: 16px;"
                                ],
                                "Position": "after",
                                "Selectors": [
                                  {
                                      "Selector": "DIV#top-card DIV.profile-top-card DIV.profile-card DIV.profile-overview DIV.profile-overview-content DIV DIV DIV#name-container DIV#name H1 SPAN.fn SPAN.full-name"
                                  }
                                ],
                                "Style": "float: right;",
                                "Type": "DIV"
                            }
                          ],
                          "Group": "Profile",
                          "GroupFields": [
                            {
                                "Field": "FullName",
                                "Selectors": [
                                  {
                                      "Processors": [
                                        {
                                            "Name": "SplitFullName"
                                        }
                                      ],
                                      "Selector": "DIV#name H1 SPAN.fn SPAN.full-name"
                                  }
                                ]
                            },
                            {
                                "Group": "Position",
                                "GroupFields": [
                                  {
                                      "Field": "Title",
                                      "Selectors": [
                                        {
                                            "Processors": [],
                                            "Selector": "DIV.current-position:nth-of-type(1) DIV HEADER H4 A"
                                        }
                                      ]
                                  },
                                  {
                                      "Field": "Company",
                                      "Selectors": [
                                        {
                                            "Processors": [],
                                            "Selector": "DIV.current-position:nth-of-type(1) DIV HEADER H5:nth-of-type(2) SPAN STRONG A"
                                        }
                                      ]
                                  },
                                  {
                                      "Field": "CompanyTitle",
                                      "Selectors": [
                                        {
                                            "Processors": [
                                              {
                                                  "Name": "SplitCompanyTitle"
                                              }
                                            ],
                                            "Selector": "p.title"
                                        }
                                      ]
                                  }
                                ],
                                "Modifier": "Latest",
                                "Selectors": [
                                  ""
                                ]
                            },
                            {
                                "Group": "Positions",
                                "GroupFields": [
                                  {
                                      "Field": "Title",
                                      "Selectors": [
                                        {
                                            "Processors": [],
                                            "Selector": "DIV:nth-of-type(1) HEADER H4 A"
                                        }
                                      ]
                                  },
                                  {
                                      "Field": "Company",
                                      "Selectors": [
                                        {
                                            "Processors": [],
                                            "Selector": "DIV:nth-of-type(1) HEADER H5 SPAN STRONG A"
                                        }
                                      ]
                                  },
                                  {
                                      "Field": "Description",
                                      "Selectors": [
                                        {
                                            "Processors": [
                                              "CleanHTML"
                                            ],
                                            "Selector": "DIV:nth-of-type(1) P.description"
                                        }
                                      ]
                                  },
                                  {
                                      "Field": "TeniorLocation",
                                      "Selectors": [
                                        {
                                            "Processors": [
                                              "CleanHTML",
                                              "DetectTenior",
                                              "DetectLocation"
                                            ],
                                            "Selector": "DIV:nth-of-type(1) SPAN.experience-date-locale"
                                        }
                                      ]
                                  }
                                ],
                                "Multiple": true,
                                "Selectors": [
                                  "DIV#background-experience DIV"
                                ]
                            },
                            {
                                "Field": "Location",
                                "Selectors": [
                                  {
                                      "Processors": [],
                                      "Selector": "DIV#top-card DIV.profile-top-card.top-card DIV.profile-card.vcard DIV.profile-overview DIV.profile-overview-content DIV[id^=member-].masthead DIV DIV#demographics.demographic-info.adr.editable-item DIV#location-container DIV#location.editable-item DL DD SPAN.locality A[name=location]"
                                  }
                                ]
                            },
                            {
                                "Group": "Websites",
                                "GroupFields": [
                                  {
                                      "Field": "Website",
                                      "Selectors": [
                                        {
                                            "Attribute": "href",
                                            "Processors": [
                                              {
                                                  "Name": "GetQueryStringParameter",
                                                  "Params": "url"
                                              },
                                              "URLDecode"
                                            ],
                                            "Selector": "DIV#website-view UL LI A"
                                        }
                                      ]
                                  }
                                ],
                                "Multiple": true,
                                "Selectors": [
                                  ""
                                ]
                            },
                            {
                                "Field": "Twitter",
                                "Selectors": [
                                  {
                                      "Processors": [
                                        "CleanHTML"
                                      ],
                                      "Selector": "DIV#top-card DIV.profile-top-card.top-card DIV.profile-card-extras DIV#contact-info-section.more-info TABLE#internet-presence-table TBODY TR.twitter-presence TD DIV#twitter.editable-item DIV#twitter-view UL LI A"
                                  }
                                ]
                            },
                            {
                                "Field": "Email",
                                "Selectors": [
                                  {
                                      "Processors": [
                                        "CleanHTML"
                                      ],
                                      "Selector": "DIV#top-card DIV.profile-top-card.top-card DIV.profile-card-extras DIV#contact-info-section.more-info TABLE TBODY TR TD DIV#email DIV#email-view UL LI A"
                                  }
                                ]
                            },
                            {
                                "Field": "Phone",
                                "Selectors": [
                                  {
                                      "Processors": [
                                        "CleanHTML"
                                      ],
                                      "Selector": "DIV#top-card DIV.profile-top-card.top-card DIV.profile-card-extras DIV#contact-info-section.more-info TABLE:nth-of-type(2) TBODY TR TD DIV#phone.editable-item DIV#phone-view UL LI"
                                  }
                                ]
                            },
                            {
                                "Field": "Address",
                                "Selectors": [
                                  {
                                      "Processors": [
                                        "CleanHTML"
                                      ],
                                      "Selector": "DIV#top-card DIV.profile-top-card.top-card DIV.profile-card-extras DIV#contact-info-section.more-info TABLE:nth-of-type(2) TBODY TR TD DIV#address.editable-item DIV#address-view UL LI"
                                  }
                                ]
                            },
                            {
                                "Field": "BIO",
                                "Selectors": [
                                  {
                                      "Processors": [
                                        "CleanHTML"
                                      ],
                                      "Selector": "DIV#profile DIV#background.profile-background DIV.background-content DIV#background-summary-container.background-section DIV#background-summary.background-summary.edit-default DIV#summary-item.editable-item.section-item DIV#summary-item-view DIV.summary P.description"
                                  }
                                ]
                            },
                            {
                                "Field": "LinkedIn",
                                "Selectors": [
                                  {
                                      "Selector": "DIV#top-card DIV.profile-actions UL LI DL.public-profile DD A"
                                  }
                                ]
                            },
                            {
                                "Field": "Website",
                                "Selectors": [
                                  {
                                      "Attribute": "href",
                                      "Processors": [
                                        {
                                            "Name": "GetQueryStringParameter",
                                            "Params": "url"
                                        },
                                        "URLDecode"
                                      ],
                                      "Selector": "TR#overview-summary-websites TD UL LI A"
                                  }
                                ]
                            }
                          ],
                          "Selectors": [
                            "DIV#wrapper"
                          ]
                      }
                    ],
                    "Name": "Contact Profile",
                    "Qualifiers": [
                      {
                          "Selectors": [
                            {
                                "Selector": "DIV#wrapper"
                            }
                          ],
                          "ValidationType": "Exists"
                      }
                    ]
                }
              ],
              "Name": "Contact Profile",
              "UrlPatterns": [
                "^(http)(s)?(://)((www|[A-z]{2,2}).)?(linkedin.com/)(profile|in|pub)(/)(?!dir/).*$"
              ]
          }
        ],
        "PatternVersion": "1.2",
        "SchemaVersion": "1.0.0",
        "SourceName": "Community",
        "UserDomains": [],
        "$$hashKey": "object:356"
    },*/
    {
        "ID": "4b4c597f-ec56-4f8a-9c08-96a224e98764",
        "Name": "Linkedin Who's Viewed My Profile",
        "Description": "Linkedin Who's Viewed My Profile",
        "Domains": ["linkedin.com", "www.linkedin.com"],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "PatternVersion": "1.1",
        "Paths": [
            {
                "Name": "Linkedin Who's Viewed My Profile",
                "Description": "",
                "UrlPatterns": ["^(http)(s)?(:\/\/)((www|[A-z]{2,2}).)?(linkedin.com\/)(wvmx)(\/)(profile).*$"],
                "Layouts": [
                    {
                        "Name": "Linkedin Who's Viewed My Profile",
                        "Description": "",
                        "Qualifiers": [
                            { "Selectors": [{ "Selector": "UL#viewers-list" }], "ValidationType": "Exists" }
                        ],
                        "Groups": [
                            {
                                "Group": "Profiles",
                                "Multiple": true,
                                "Selectors": ["UL#viewers-list LI.PUBLIC"],
                                "Buttons": [
                                    {
                                        "Type": "DIV",
                                        "Style": "position: absolute; left: 201px; top: 325px;",
                                        "Position": "append",
                                        "Selectors": [
                                            {
                                                "Selector": ""
                                            }
                                        ],
                                        "Buttons": ["capture_contact_button_icon|height: 20px;"]
                                    }
                                ],
                                "GroupFields": [
                                    { "Field": "FullName", "Selectors": [{ "Selector": "DIV.viewer-info A:nth-of-type(1)", "Processors": [] }] },
                                    { "Field": "CompanyTitle", "Selectors": [{ "Selector": "DIV.viewer-info H4.headline", "Processors": ["SplitCompanyTitle"] }] },
                                    { "Field": "Location", "Selectors": [{ "Selector": "DIV.viewer-info DL.demographic DD.location", "Processors": [] }] },
                                    { "Field": "LinkedIn", "Selectors": [{ "Selector": "DIV.viewer-info H3 A", "Processors": [], "Attribute": "href" }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "ID": "efbd927b-f5df-4f77-b761-b39378347cf5",
        "Name": "Linkedin Connections",
        "Description": "Linkedin Connection Contacts",
        "Domains": ["linkedin.com", "www.linkedin.com"],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "PatternVersion": "1.1",
        "Paths": [
            {
                "Name": "Linkedin Connections",
                "Description": "",
                "UrlPatterns": ["^(http)(s)?(:\/\/)((www|[A-z]{2,2}).)?(linkedin.com\/contacts\/).*$"],
                "Layouts": [
                    {
                        "Name": "Linkedin Connections Contacts",
                        "Description": "",
                        "Qualifiers": [],
                        "Groups": [
                            {
                                "Group": "Profiles",
                                "Multiple": true,
                                "Selectors": ["DIV#wrapper SECTION#contact-list-container UL.items.contacts-list-view LI.contact-item-view"],
                                "Buttons": [
                                    {
                                        "Type": "SPAN",
                                        "Style": "margin-left: 6px; margin-right: 6px;",
                                        "Position": "append",
                                        "Selectors": [
                                            {
                                                "Selector": "DIV.body H3"
                                            }
                                        ],
                                        "Buttons": ["capture_contact_button_logo|height: 12px;"]
                                    }
                                ],
                                "GroupFields": [
                                    { "Field": "FullName", "Selectors": [{ "Selector": "DIV.body H3 A", "Processors": [] }] },
                                    { "Field": "Title", "Selectors": [{ "Selector": "DIV.body P.headline A.title", "Processors": [] }] },
                                    { "Field": "Company", "Selectors": [{ "Selector": "DIV.body P.headline A.company", "Processors": [] }] },
                                    { "Field": "Location", "Selectors": [{ "Selector": "DIV.body A.location", "Processors": [] }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "ID": "efbd927b-f5df-4f77-b761-b39378347cf5",
        "Name": "People You May Know",
        "Description": "Linkedin Invitations",
        "Domains": ["linkedin.com", "www.linkedin.com"],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "PatternVersion": "1.1",
        "Paths": [
            {
                "Name": "People You May Know",
                "Description": "",
                "UrlPatterns": ["^(http)(s)?(:\/\/)((www|[A-z]{2,2}).)?(linkedin.com\/people\/pymk\/).*$"],
                "Layouts": [
                    {
                        "Name": "People You May Know Profiles",
                        "Description": "",
                        "Qualifiers": [],
                        "Groups": [
                            {
                                "Group": "Profiles",
                                "Multiple": true,
                                "Selectors": ["DIV#pymk_cards_container DIV.card-container UL.people-cards-list LI.shrunken-card DIV.card-wrapper"],
                                "Buttons": [
                                    {
                                        "Type": "SPAN",
                                        "Style": "position: absolute; left: 145px; top: 250px;",
                                        "Position": "append",
                                        "Selectors": [
                                            {
                                                "Selector": ""
                                            }
                                        ],
                                        "Buttons": ["capture_contact_button_icon|height: 20px;"]
                                    }
                                ],
                                "GroupFields": [
                                    { "Field": "FullName", "Selectors": [{ "Selector": "DIV.profile DIV.content DIV.profile-info DIV.name-wrapper H4.name A.title", "Processors": [] }] },
                                    { "Field": "Title", "Selectors": [{ "Selector": "DIV.profile DIV.content DIV.profile-info", "Processors": [] }] },
                                    { "Field": "Company", "Selectors": [{ "Selector": "DIV.profile DIV.content DIV.profile-info", "Processors": [] }] },
                                    { "Field": "Location", "Selectors": [{ "Selector": "DIV.profile DIV.content DIV.profile-info", "Processors": [] }] },
                                    { "Field": "LinkedIn", "Selectors": [{ "Selector": "DIV.viewer-info H3 A", "Processors": [], "Attribute": "href" }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "ID": "fe88ce75-0642-45a8-9c21-3571e401bcd7",
        "Name": "LinkedIn Group Member List",
        "Description": "List of Members of a Group on Linkedin",
        "Domains": ["linkedin.com", "www.linkedin.com"],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "PatternVersion": "1.1",
        "Paths": [
            {
                "Name": "Group Member List",
                "Description": "",
                "UrlPatterns": ["^(http)(s)?(://)((www|[A-z]{2,2}).)?(linkedin.com/grp/member)(.*)$"],
                "Layouts": [
                    {
                        "Name": "Group Member List",
                        "Description": "",
                        "Qualifiers": [],
                        "Groups": [
                            {
                                "Group": "Profiles",
                                "Multiple": true,
                                "Selectors": ["UL#member-list LI.member"],
                                "Buttons": [
                                    {
                                        "Type": "DIV",
                                        "Style": "position: absolute; left: 466px; top: 8px;",
                                        "Position": "append",
                                        "Selectors": [
                                            {
                                                "Selector": ""
                                            }
                                        ],
                                        "Buttons": ["capture_contact_button_logo|height: 12px;"]
                                    }
                                ],
                                "GroupFields": [
                                    { "Field": "FullName", "Selectors": [{ "Selector": "DIV.content H4 A", "Processors": [{ "Name": "SplitFullName" }] }] },
                                    { "Field": "CompanyTitle", "Selectors": [{ "Selector": "DIV.content P.member-headline", "Processors": ["SplitCompanyTitle"] }] },
                                    { "Field": "LinkedIn", "Selectors": [{ "Selector": "DIV.content H4 A", "Attribute": "href", "Processors": [] }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "ID": "2dd3455b-71ae-4de8-ad2e-60ba52e9f011",
        "Name": "LinkedIn People Search",
        "Description": "Search Results for People on Linkedin",
        "Domains": ["linkedin.com", "www.linkedin.com"],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "Paths": [
            {
                "Name": "VSearch",
                "Description": "",
                "UrlPatterns": ["^(http)(s)?(:\/\/)((www|[A-z]{2,2}).)?(linkedin.com\/)(vsearch)(\/).*$"],
                "Layouts": [
                    {
                        "Name": "People Search",
                        "Description": "",
                        "Qualifiers": [
                            {"Selectors": [{ "Selector": "DIV#results-col"}], "ValidationType": "Exists" },
                            {"Selectors": [{ "Selector": "DIV#srp_container.srp-type-people"}], "ValidationType": "Exists" }
                        ],
                        "Groups": [
                            {
                                "Group": "Profiles",
                                "Multiple": true,
                                "Selectors": ["OL#results LI.people"],
                                "Buttons": [
                                    {
                                        "Type": "DIV",
                                        "Style": "position: absolute; left: 466px; top: 8px;",
                                        "Position": "append",
                                        "Selectors": [
                                            {
                                                "Selector": ""
                                            }
                                        ],
                                        "Buttons": ["capture_contact_button_logo|height: 12px;"]
                                    }
                                ],
                                "GroupFields": [
                                    { "Field": "FullName", "Selectors": [{ "Selector": "DIV.bd H3 A.title", "Processors": [{ "Name": "SplitFullName" }] }] },
                                    { "Field": "Location", "Selectors": [{ "Selector": "DIV.bd DL.demographic DD.separator", "Processors": [] }] },
                                    { "Field": "CompanyTitle", "Selectors": [{ "Selector": "DIV.bd DIV.description", "Processors": ["SplitCompanyTitle"] }] },
                                    { "Field": "LinkedIn", "Selectors": [{ "Selector": "DIV.bd H3 A.title", "Attribute": "href", "Processors": [] }] },
                                    { "Field": "Title", "Selectors": [{ "Selector": "DIV.bd P.description" }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "ID": "b96e03e0-d66a-41a2-b4de-f2920060f9de",
        "Name": "Linkedin Sales Navigator",
        "Description": "Lead Profile Cards on Linkedin Sales Navigator",
        "Domains": ["linkedin.com", "www.linkedin.com"],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "Paths": [
            {
                "Name": "Linkedin Sales Navigator",
                "Description": "",
                "UrlPatterns": ["^(http)?(s)?(:\/\/)?((www|[A-z]{2,2}).)?(linkedin.com\/)(sales\/profile\/).*$"],
                "Layouts": [
                    {
                        "Name": "Linkedin Sales Navigator Profiles",
                        "Description": "",
                        "Qualifiers": [
                            {"Selectors": [{ "Selector": "BODY#pagekey-sales-profile"}], "ValidationType": "Exists" }
                        ],
                        "Groups": [
                            {
                                "Group": "Profile",
                                "Selectors": ["DIV#main"],
                                "Buttons": [
                                            {
                                                "Type": "DIV",
                                                "Style": "float: right;",
                                                "Position": "after",
                                                "Selectors": [
                                                    {
                                                        "Selector": "SECTION#topcard DIV.module-body DIV.info-container DIV.profile-info H1.member-name"
                                                    }
                                                ],
                                                "Buttons": ["capture_contact_button_logo|height: 16px;"]
                                            }
                                ],
                                "GroupFields": [
                                    {
                                        "Group": "Name",
                                        "Selectors": ["SECTION#topcard DIV.module-body DIV.info-container DIV.profile-info H1.member-name"],
                                        "GroupFields": [
                                            { "Field": "FullName", "Selectors": [{ "Selector": "", "Processors": [{ "Name": "TrimWhiteSpace" }, { "Name": "SplitFullName" }] }] }
                                        ]
                                    },
                                    {
                                        "Group": "Position", "Modifier": "Current",
                                        "Selectors": ["ARTICLE#experience OL.positions LI:nth-of-type(1)"],
                                        "GroupFields": [
                                            { "Field": "Title", "Selectors": [{ "Selector": "HEADER.position-info H2.position-title", "Processors": [] }] },
                                            { "Field": "Company", "Selectors": [{ "Selector": "HEADER.position-info H3.company-name A", "Processors": [] }] },
                                            { "Field": "Description", "Selectors": [{ "Selector": "P.description", "Processors": ["CleanHTML"] }] },
                                            { "Field": "TeniorLocation", "Selectors": [{ "Selector": "SPAN.meta", "Processors": ["CleanHTML", "DetectTenior", "DetectLocation"] }] }
                                        ]
                                    },
                                    { "Field": "Location", "Selectors": [{ "Selector": "SECTION#topcard DIV.module-body DIV.info-container DIV.profile-info UL LI.location-industry SPAN.location", "Processors": [] }] },
                                    { "Field": "LinkedIn", "Selectors": [{ "Selector": "SECTION#topcard DIV.module-footer UL.actions LI.public-profile", "Processors": [] }] },
                                    { "Field": "Email", "Selectors": [{ "Selector": "DIV.more-info-tray TABLE TBODY TR:contains(Emails) TD UL LI A", "Processors": [] }] },
                                    { "Field": "Website", "Selectors": [{ "Selector": "DIV.more-info-tray TABLE TBODY TR:contains(Websites) TD UL LI A:eq(0)", "Processors": [], "Attribute": "href" }] },
                                    { "Field": "SocialVenue", "Multiple": true, "Selectors": [{ "Selector": "DIV.more-info-tray TABLE TBODY TR:contains(Websites) TD UL LI A:not(:eq(0))", "Processors": [], "Attribute": "href" }] },
                                    { "Field": "Phone", "Selectors": [{ "Selector": "DIV.more-info-tray TABLE TBODY TR:contains(Phone) TD UL LI", "Processors": [] }] },
                                    { "Field": "Twitter", "Selectors": [{ "Selector": "DIV.more-info-tray TABLE TBODY TR:contains(Twitter) TD UL LI A", "Processors": [] }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "ID": "b96e03e0-d66a-41a2-b4de-f2920060f9de",
        "Name": "Crunch Base",
        "Description": "Crunchbase People Profiles",
        "Domains": [
            "www.crunchbase.com",
            "crunchbase.com"
        ],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "Paths": [
            {
                "Name": "User Profile",
                "Description": "",
                "UrlPatterns": [
                    "^(http)(s)?(://)(www.)?(crunchbase.com/person/).*$"
                ],
                "Layouts": [
                    {
                        "Name": "Profile",
                        "Description": "",
                        "Qualifiers": [],
                        "Groups": [
                            {
                                "Group": "Profile",
                                "Selectors": [ "BODY.off-canvas-menu-on.on" ],
                                "GroupFields": [
                                    {
                                        "Group": "Name",
                                        "Selectors": [ "DIV.page.container.entity SECTION.main-content DIV.columns DIV.navigation DIV.base DIV.title-border-bg DIV.card-header H1#profile_header_heading A" ],
                                        "GroupFields": [
                                            { "Field": "FullName", "Selectors": [{ "Selector": "", "Processors": [{ "Name": "TrimWhiteSpace" }, { "Name": "SplitFullName" }] }] }
                                        ]
                                    },
                                    { "Field": "CompanyTitle", "Selectors": [{ "Selector": "DIV.page.container.entity SECTION.main-content DIV.columns DIV.base DIV.info-card-content DIV.info-card-overview-content DIV.definition-list-container DL.definition-list DIV.overview-stats DD:nth-of-type(1)", "Processors": [{ "Name": "TrimWhiteSpace" }, { "Name": "SplitCompanyTitle" }] }] },
                                    { "Field": "Twitter", "Selectors": [{ "Selector": "DIV.social-links UL.container LI.twitter A", "Processors": [], "Attribute": "href" }] },
                                    { "Field": "LinkedIn", "Selectors": [{ "Selector": "DIV.social-links UL.container LI.linkedin A", "Processors": [], "Attribute": "href" }] },
                                    { "Field": "Website", "Selectors": [{ "Selector": "DIV.social-links UL.container LI.homepage A", "Processors": [], "Attribute": "href" }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "ID": "383c889e-94bc-4b67-a4f8-8e01e004267e",
        "Name": "Data.com",
        "Description": "Data.com Connect",
        "Domains": ["data.com", "www.data.com"],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "Paths": [
            {
                "Name": "Data.com Contact Business Card",
                "Description": "",
                "UrlPatterns": ["^(http)?(s)?(:\/\/)?(connect.)(data.com\/contact\/view\/).*$"],
                "Layouts": [
                    {
                        "Name": "Contact Business Card",
                        "Description": "",
                        "Qualifiers": [
                            {"Selectors": [{ "Selector": "FORM#businessCardForm"}], "ValidationType": "Exists" }
                        ],
                        "Groups": [
                            {
                                "Group": "Profile",
                                "Selectors": ["FORM#businessCardForm DIV.businesscard-contactinfo DIV.businesscard-contactinfo-wrapper DIV.businesscard-background"],
                                "Buttons": [
                                        {
                                            "Selectors": [
                                                {
                                                    "Selector": " DIV.businesscard-contactinfo-name",
                                                    "Type": "SPAN",
                                                    "Class": "C_Display_Relative",
                                                    "Style": "",
                                                    "Position": "append",
                                                    "Inner": {
                                                        "Type": "SPAN",
                                                        "Class": "C_Container_ABS_TopLeft",
                                                        "Style": "veritical-align:middle; top: 5px; margin-left: 10px;"
                                                    }
                                                }
                                            ],
                                            "Buttons": [
                                                "capture_contact_button_logo|height:24px"
                                            ]
                                        }
                                ],
                                "GroupFields": [
                                    { "Field": "FullName", "Selectors": [{ "Selector": "DIV.businesscard-contactinfo-name", "Processors": [{ "Name": "ParseHandle" }] }] },
                                    { "Field": "Title", "Selectors": [{ "Selector": "DIV.businesscard-contactinfo-title" }] },
                                    { "Field": "Phone", "Selectors": [{ "Selector": "DIV.businesscard-contactinfo-phone SPAN#contactInfoPhone" }] },
                                    { "Field": "Company", "Selectors": [{ "Selector": "DIV.businesscard-companyinfo DIV.businesscard-companyinfo-name A" }] },
                                    { "Field": "Address", "Selectors": [{ "Selector": "DIV.businesscard-companyinfo DIV.businesscard-companyinfo-addressline" }] },
                                    { "Field": "Location", "Selectors": [{ "Selector": "DIV.businesscard-companyinfo DIV.businesscard-companyinfo-citystatezip" }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "ID": "0389cd9b-3f53-40a4-ae11-34ef36f2bb72",
        "Name": "Zoom Info",
        "Description": "User Profiles on Zoominfo",
        "Domains": [
            "zoominfo.com",
            "www.zoominfo.com"
        ],
        "SchemaVersion": "1.0.0",
        "UserDomains": [],
        "Paths": [
            {
                "Name": "Public/Not Signed In",
                "Description": "",
                "UrlPatterns": [
                    "^(http)(s)?(:\/\/)(www.)?(zoominfo.com\/)(p\/).*$"
                ],
                "Layouts": [
                    {
                        "Name": "User Profile",
                        "Description": "",
                        "Qualifiers": [],
                        "Groups": [
                            {
                                "Group": "Profile",
                                "Selectors": [ "TABLE#personSummaryTable TBODY TR" ],
                                "GroupFields": [
                                    {
                                        "Group": "Name",
                                        "Selectors": [ "TD.compactModeUpsell" ],
                                        "GroupFields": [
                                            { "Field": "FullName",  "Selectors": [{ "Selector": "DIV.personSummary H1", "Processors": [{ "Name": "TrimWhiteSpace" }, { "Name": "SplitFullName" }] }] }
                                        ]
                                    },
                                    {
                                        "Group": "Position",
                                        "Selectors": [ "" ],
                                        "GroupFields": [
                                            { "Field": "Title", "Selectors": [{ "Selector": "DIV#personContact  DIV#title H2", "Processors": [ "CleanHTML", "DetectName" ] }] },
                                            { "Field": "Company", "Selectors": [{ "Selector": "SPAN.personCompanyName", "Processors": [ "CleanHTML", "DetectName" ] }] }
                                        ]
                                    },
                                    { "Field": "Telephone1", "Selectors": [{ "Selector": "DIV#personContact DIV.detailContactInfo DIV.detailContactInfoLeft DIV DIV.phoneNumber A", "Processors": [ "CleanHTML" ] }] },
                                    { "Field": "Location", "Selectors": [{ "Selector": "SPAN.companyAddress I", "Processors": [ "CleanHTML" ] }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "ID": "0389cd9b-3f53-40a4-ae11-34ef36f2bb72",
        "Name": "Zoom Info Subscriber",
        "Description": "User Profiles on Zoominfo",
        "Domains": [
            "zoominfo.com",
            "www.zoominfo.com"
        ],
        "SchemaVersion": "1.0.0",
        "UserDomains": [],
        "Paths": [
            {
                "Name": "Zoom Info Subscriber",
                "Description": "",
                "UrlPatterns": [
                    "^(http)(s)?(:\/\/)(www.)?(subscriber.zoominfo.com\/)(zoominfo\/#search\/person\/).*$"
                ],
                "Layouts": [
                    {
                        "Name": "Search Results List",
                        "Description": "",
                        "Qualifiers": [
                            {
                            "Selectors": [
                              {
                                  "Selector": "DIV#person"
                              }
                            ],
                            "ValidationType": "Exists"
                        }],
                        "Groups": [
                            {
                                "Group": "Profiles",
                                "Selectors": ["TABLE#resultGroup TBODY TR"],
                                "Multiple": true,
                                "Buttons": [
                                    {
                                        "Type": "SPAN",
                                        "Style": "float: right; clear: both;",
                                        "Position": "append",
                                        "Selectors": [
                                            {
                                                "Selector": "TD.personName"
                                            }
                                        ],
                                        "Buttons": ["capture_contact_button_logo|height: 12px;"]
                                    }
                                ],
                                "GroupFields": [
                                    
                                    { "Field": "FullName", "Selectors": [{ "Selector": "TD.personName", "Processors": [{ "Name": "TrimWhiteSpace" }, { "Name": "SplitFullName" }] }] },  
                                    { "Field": "Title", "Selectors": [{ "Selector": "TD.title INPUT#personTitle", "Processors": [], "Attribute": "value" }] },
                                    { "Field": "Company", "Selectors": [{ "Selector": "TD.title DIV.companyLink A", "Processors": ["CleanHTML", "DetectName"] }] },
                                    { "Field": "Phone", "Selectors": [{ "Selector": "TD.contact DIV.phoneNumber SPAN.personContactNbr ", "Processors": ["CleanHTML"] }] },
                                    { "Field": "Email", "Selectors": [{ "Selector": "TD.contact SPAN.personEmail A", "Processors": ["CleanHTML"] }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "ID": "0389cd9b-3f53-40a4-ae11-34ef36f2bb72",
        "Name": "Searchquant",
        "Description": "Results for Search",
        "Domains": [ "searchquant.net", "www.searchquant.net" ],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "Paths": [
            {
                "Name": "Search Results",
                "Description": "",
                "UrlPatterns": [
                    "^(http)(s)?(:\/\/)(www.)?(searchquant.net\/)(li\/people.php\\?company_id=)([0-9]*)(\\&search_url_id=)([0-9]*)$"
                ],
                "Layouts": [
                    {
                        "Name": "User Profile",
                        "Description": "",
                        "Qualifiers": [],
                        "Groups": [
                            {
                                "Group": "Profiles",
                                "Selectors": ["BODY TABLE TBODY TR"],
                                "Multiple": true,
                                "Skip": 1,
                                "GroupFields": [
                                    { "Field": "FullName", "Selectors": [{ "Selector": "TD.name", "Processors": [{ "Name": "SplitFullName" }] }] },
                                    { "Field": "CompanyTitle", "Selectors": [{ "Selector": "TD.title", "Processors": [{ "Name": "SplitCompanyTitle" }] }] },
                                    { "Field": "Title", "Selectors": [{ "Selector": "TD.title", "Processors": [] }] },
                                    { "Field": "Location", "Selectors": [{ "Selector": "TD.location", "Processors": ["CleanHTML"] }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "ID": "49d7ca86-b597-4921-9527-223102dc146a",
        "Name": "Trulia",
        "Description": "Trulia Agent Search Results",
        "Domains": ["trulia.com", "www.trulia.com"],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "Paths": [
            {
                "Name": "Search Results",
                "Description": "",
                "UrlPatterns": [
                    "^(http)(s)?(:\/\/)(www.)?(trulia.com\/directory\/)(.{1,})$"
                ],
                "Layouts": [
                    {
                        "Name": "User Profile",
                        "Description": "",
                        "Qualifiers": [
                            {"Selectors": [{ "Selector": "DIV#findAnAgentContainer"}], "ValidationType": "Exists" }
                        ],
                        "Groups": [
                            {
                                "Group": "Profiles",
                                "Selectors": ["DIV.pageContent DIV.main UL.listBorderedHover.mvn LI.hover.prn"],
                                "Multiple": true,
                                "GroupFields": [
                                    { "Field": "FullName", "Selectors": [{ "Selector": "DIV.media DIV.mediaBody.agent_entry DIV.line DIV.col.cols10 H5", "Processors": [{ "Name": "ParseHandle" }] }] },
                                    { "Field": "CompanyTitle", "Selectors": [{ "Selector": "DIV.media DIV.mediaBody.agent_entry DIV.line DIV.col.cols10 P:eq(0)", "Processors": [{ "Name": "Remove", "Params": "\\([0-9]{3}\\) {1}[0-9]{3}-[0-9]{4}" }, { "Name": "SplitCompanyTitle" }] }] },
                                    { "Field": "Title", "Selectors": [{ "Selector": "DIV.media DIV.mediaBody.agent_entry DIV.line DIV.col.cols10 P:eq(0)", "Processors": [{ "Name": "Remove", "Params": "\\([0-9]{3}\\) {1}[0-9]{3}-[0-9]{4}" }] }] },
                                    { "Field": "Phone", "Selectors": [{ "Selector": "DIV.media DIV.mediaBody.agent_entry DIV.line DIV.col.cols10 P:eq(0)", "Processors": [{ "Name": "Remove", "Params": "^(?!(\\([0-9]{3}\\) {1}[0-9]{3}-[0-9]{4})$).*" }] }] },
                                    { "Field": "Phone", "Selectors": [{ "Selector": "DIV.media DIV.mediaBody.agent_entry DIV.line DIV.col.cols10 P:eq(1)", "Processors": [{ "Name": "Remove", "Params": "^(?!(\\([0-9]{3}\\) {1}[0-9]{3}-[0-9]{4})$).*" }, { "Name": "Remove", "Params": "PRO" }] }] },
                                    { "Field": "Company", "Selectors": [{ "Selector": "DIV.media DIV.mediaBody.agent_entry DIV.line DIV.col.cols10 IMG", "Attribute": "alt" }] },
                                    { "Field": "Location", "Selectors": [{ "Selector": "FORM#agentSearchform DIV.line DIV.col.cols5 DIV.field SPAN.fieldItem.text DIV.filter.comboInput", "Attribute": "data-initial", "Scope": 0 }] },
                                    { "Field": "Location", "Selectors": [{ "Selector": "DIV.media DIV.mediaBody.agent_entry DIV.line DIV.col.cols8 DIV.h7", "Processors": [{ "Name": "Remove", "Params": "In " }] }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "ID": "eeebf01a-d8cc-48a3-8282-ec2a30fd0ff9",
        "Name": "LinkedIn Recruiter Lite People Search",
        "Description": "Search Results for People on Linkedin Recruiter",
        "Domains": ["linkedin.com", "www.linkedin.com"],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "Paths": [
            {
                "Name": "LinkedIn Recruiter Lite People Search",
                "Description": "",
                "UrlPatterns": ["^(http)(s)?(:\/\/)(www.)?linkedin.com\/cap\/peopleSearch\/(resultsWithFacets\/)?.*$"],
                "Layouts": [
                    {
                        "Name": "LinkedIn Recruiter Lite People Search",
                        "Description": "",
                        "Qualifiers": [
                            { "Selectors": [{ "Selector": "UL#results" }], "ValidationType": "Exists" }
                        ],
                        "Groups": [
                            {
                                "Group": "Profiles",
                                "Multiple": true,
                                "Selectors": ["UL#results LI.profile DIV.desc DIV.vcard"],
                                "Buttons": [
                                    {
                                        "Type": "SPAN",
                                        "Style": "margin-left: 5px;",
                                        "Position": "after",
                                        "Selectors": [
                                            {
                                                "Selector": "H2.name"
                                            }
                                        ],
                                        "Buttons": ["capture_contact_button_logo|height: 12px;"]
                                    }
                                ],
                                "GroupFields": [
                                    { "Field": "FullName", "Selectors": [{ "Selector": "H2.name A SPAN.fn.n SPAN.given-name", "Processors": [{ "Name": "SplitFullName" }] }] },
                                    { "Field": "Location", "Selectors": [{ "Selector": "DL.overview-info DD.location", "Processors": [] }] },
                                    { "Field": "CompanyTitle", "Selectors": [{ "Selector": "DL.career-info DD.current SPAN.block", "Processors": ["SplitCompanyTitle"] }] },
                                    { "Field": "LinkedIn", "Selectors": [{ "Selector": "H2.name A", "Attribute": "href", "Processors": [] }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "ID": "9e32e560-3806-4241-9158-4183136fc7cb",
        "Name": "LinkedIn Recruiter Profile Page",
        "Description": "LinkedIn Recruiter Profiles",
        "Domains": ["linkedin.com", "www.linkedin.com"],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "PatternVersion": "1.2",
        "Paths": [
            {
                "Name": "Contact Profile",
                "Description": "",
                "UrlPatterns": ["^(http)(s)?(:\/\/)((www|[A-z]{2,2}).)?(linkedin.com\/recruiter\/profile\/).*$"],
                "Layouts": [
                    {
                        "Name": "Recruiter Contact Profile",
                        "Description": "",
                        "Qualifiers": [],
                        "Groups": [
                            {
                                "Group": "Profile",
                                "Selectors": ["DIV#primary-content"],
                                "Buttons": [
                                    {
                                        "Type": "DIV",
                                        "Style": "",
                                        "Position": "after",
                                        "Selectors": [
                                            {
                                                "Selector": "DIV#topcard DIV.module-body DIV.info-container"
                                            }
                                        ],
                                        "Buttons": ["capture_contact_button_logo|height: 12px; width: 60;"]
                                    }
                                ],
                                "GroupFields": [
                                    { "Field": "FullName", "Selectors": [{ "Selector": "DIV#topcard DIV.module-body DIV.info-container DIV.profile-info H1.searchable", "Processors": [{ "Name": "SplitFullName" }] }] },
                                    {
                                        "Group": "Position", "Modifier": "Latest",
                                        "Selectors": [""],
                                        "GroupFields": [
                                            { "Field": "Title", "Selectors": [{ "Selector": "DIV.current-position:nth-of-type(1) DIV HEADER H4 A", "Processors": [] }] },
                                            { "Field": "Company", "Selectors": [{ "Selector": "DIV.current-position:nth-of-type(1) DIV HEADER H5:nth-of-type(2) SPAN STRONG A", "Processors": [] }] },
                                            { "Field": "CompanyTitle", "Selectors": [{ "Selector": "p.title", "Processors": [{ "Name": "SplitCompanyTitle" }] }] }
                                        ]
                                    },
                                    {
                                        "Group": "Positions",
                                        "Multiple": true,
                                        "Selectors": ["DIV#background-experience DIV"],
                                        "GroupFields": [
                                            { "Field": "Title", "Selectors": [{ "Selector": "DIV:nth-of-type(1) HEADER H4 A", "Processors": [] }] },
                                            { "Field": "Company", "Selectors": [{ "Selector": "DIV:nth-of-type(1) HEADER H5 SPAN STRONG A", "Processors": [] }] },
                                            { "Field": "Description", "Selectors": [{ "Selector": "DIV:nth-of-type(1) P.description", "Processors": ["CleanHTML"] }] },
                                            { "Field": "TeniorLocation", "Selectors": [{ "Selector": "DIV:nth-of-type(1) SPAN.experience-date-locale", "Processors": ["CleanHTML", "DetectTenior", "DetectLocation"] }] }
                                        ]
                                    },
                                    { "Field": "Location", "Selectors": [{ "Selector": "DIV#top-card DIV.profile-top-card.top-card DIV.profile-card.vcard DIV.profile-overview DIV.profile-overview-content DIV[id^=member-].masthead DIV DIV#demographics.demographic-info.adr.editable-item DIV#location-container DIV#location.editable-item DL DD SPAN.locality A[name=location]", "Processors": [] }] },
                                    { "Field": "Twitter", "Selectors": [{ "Selector": "DIV#top-card DIV.profile-top-card.top-card DIV.profile-card-extras DIV#contact-info-section.more-info TABLE#internet-presence-table TBODY TR.twitter-presence TD DIV#twitter.editable-item DIV#twitter-view UL LI A", "Processors": ["CleanHTML"] }] },
                                    { "Field": "Email", "Selectors": [{ "Selector": "DIV#top-card DIV.profile-top-card.top-card DIV.profile-card-extras DIV#contact-info-section.more-info TABLE TBODY TR TD DIV#email DIV#email-view UL LI A", "Processors": ["CleanHTML"] }] },
                                    { "Field": "Phone", "Selectors": [{ "Selector": "DIV#top-card DIV.profile-top-card.top-card DIV.profile-card-extras DIV#contact-info-section.more-info TABLE:nth-of-type(2) TBODY TR TD DIV#phone.editable-item DIV#phone-view UL LI", "Processors": ["CleanHTML"] }] },
                                    { "Field": "Address", "Selectors": [{ "Selector": "DIV#top-card DIV.profile-top-card.top-card DIV.profile-card-extras DIV#contact-info-section.more-info TABLE:nth-of-type(2) TBODY TR TD DIV#address.editable-item DIV#address-view UL LI", "Processors": ["CleanHTML"] }] },
                                    { "Field": "BIO", "Selectors": [{ "Selector": "DIV#profile DIV#background.profile-background DIV.background-content DIV#background-summary-container.background-section DIV#background-summary.background-summary.edit-default DIV#summary-item.editable-item.section-item DIV#summary-item-view DIV.summary P.description", "Processors": ["CleanHTML"] }] },
                                    { "Field": "LinkedIn", "Selectors": [{ "Selector": "DIV#topcard DIV.module-footer UL.topcard-footer-actions LI.public-profile A", "Attribute": "href" }] },
                                    { "Field": "Website", "Selectors": [{ "Selector": "DIV#topcard DIV.module-footer UL.topcard-footer-actions LI.website A", "Processors": [], "Attribute": "href" }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "ID": "9e32e560-3806-4241-9158-4183136fc7cb",
        "Name": "LinkedIn Invitations List",
        "Description": "LinkedIn Invitations List inside Inbox",
        "Domains": ["linkedin.com", "www.linkedin.com"],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "PatternVersion": "1.2",
        "Paths": [
            {
                "Name": "Contact Profile",
                "Description": "",
                "UrlPatterns": ["^(http)(s)?(:\/\/)((www|[A-z]{2,2}).)?(linkedin.com\/inbox\/#invitations)$"],
                "Layouts": [
                    {
                        "Name": "LinkedIn Invitations List",
                        "Description": "",
                        "Qualifiers": [],
                        "Groups": [
                            {
                                "Group": "Profiles",
                                "Multiple": true,
                                "Selectors": ["DIV#invitations OL.inbox-list LI.invitation-item"],
                                "Buttons": [
                                    {
                                        "Type": "SPAN",
                                        "Style": "",
                                        "Position": "append",
                                        "Selectors": [
                                            {
                                                "Selector": "DIV.item-content DIV.form-actions"
                                            }
                                        ],
                                        "Buttons": ["capture_contact_button_logo|height: 18px; width: 60;"]
                                    }
                                ],
                                "GroupFields": [
                                    { "Field": "FullName", "Selectors": [{ "Selector": "DIV.item-content P.participants SPAN.new-miniprofile-container STRONG A", "Processors": [{ "Name": "SplitFullName" }] }] },
                                    { "Field": "LinkedIn", "Selectors": [{ "Selector": "DIV.item-content P.participants SPAN.new-miniprofile-container STRONG A", "Attribute": "href", "Processors": [{ "Name": "Remove", "Params": "&authType.*" }] }] },
                                    { "Field": "CompanyTitle", "Selectors": [{ "Selector": "DIV.item-content P.headline", "Processors": [{ "Name": "SplitCompanyTitle" }] }] },
                                    { "Field": "Title", "Selectors": [{ "Selector": "DIV.item-content P.headline", "Processors": [{ "Name": "SplitCompanyTitle" }] }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "AuthorName": "Justin Stull",
        "CreatedDate": "2015-01-08",
        "Description": "Search Results for People on Linkedin",
        "DocumentType": "CapturePatternVer1",
        "Domains": [
          "linkedin.com",
          "www.linkedin.com"
        ],
        "ID": "2dd3455b-71ae-4de8-ad2e-60ba52e9f011",
        "Name": "LinkedIn Sales Navigator List View",
        "Paths": [
          {
              "Description": "",
              "Layouts": [
                {
                    "Description": "",
                    "Groups": [
                      {
                          "Buttons": [
                            {
                                "Buttons": [
                                  "capture_contact_button_logo|height: 12px;"
                                ],
                                "Position": "append",
                                "Selectors": [
                                  {
                                      "Selector": "DIV.badge-wrapper"
                                  }
                                ],
                                "Style": "margin-left: 5px;",
                                "Type": "SPAN"
                            }
                          ],
                          "Group": "Profiles",
                          "GroupFields": [
                            {
                                "Field": "FullName",
                                "Selectors": [
                                  {
                                      "Processors": [
                                        {
                                            "Name": "SplitFullName"
                                        }
                                      ],
                                      "Selector": "DIV.body DIV.entity-content H4.name A"
                                  }
                                ]
                            },
                            {
                                "Field": "Location",
                                "Selectors": [
                                  {
                                      "Processors": [],
                                      "Selector": "DIV.body DIV.entity-content DL.demographic DD.location"
                                  }
                                ]
                            },
                            {
                                "Field": "CompanyTitle",
                                "Selectors": [
                                  {
                                      "Processors": [
                                        "SplitCompanyTitle"
                                      ],
                                      "Selector": "DIV.body DIV.entity-content P.headline"
                                  }
                                ]
                            },
                            {
                                "Field": "Title",
                                "Selectors": [
                                  {
                                      "Selector": "DIV.body DIV.entity-content P.headline"
                                  }
                                ]
                            },
                            {
                                "Field": "LinkedIn",
                                "Selectors": [
                                  {
                                      "Selector": "DIV.body DIV.entity-content H4.name A",
                                      "Attribute": "href",
                                      "Processors": [{ "Name": "Append", "Params": "https://www.linkedin.com<*>" }]
                                  }
                                ]
                            }
                          ],
                          "Multiple": true,
                          "Selectors": [
                            "DIV#search-results-container.people SECTION.search-results UL.results LI.entity"
                          ]
                      }
                    ],
                    "Name": "LinkedIn Sales Navigator List View",
                    "Qualifiers": [
                      {
                          "Selectors": [
                            {
                                "Selector": "DIV#search-results-container.people"
                            }
                          ],
                          "ValidationType": "Exists"
                      }
                    ]
                }
              ],
              "Name": "LinkedIn Sales Navigator List View",
              "UrlPatterns": [
                "^(http)(s)?(://)((www|[A-z]{2,2}).)?(linkedin.com/)(sales/search).*$"
              ]
          }
        ],
        "SchemaVersion": "1.0.0",
        "SourceName": "Community-Alpha",
        "UserDomains": [],
        "$$hashKey": "object:509"
    },
    {
        "ID": "e5355c9e-d963-45eb-adfa-5bc4865f6058",
        "Name": "Facebook Company Pages",
        "Description": "Facebook Pages Company profiles",
        "Domains": ["facebook.com", "www.facebook.com"],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "PatternVersion": 1,
        "CreatedDate": "2015-07-13",
        "AuthorName": "Justin Stull",
        "Paths": [
          {
              "Name": "Company Profile",
              "Description": "",
              "UrlPatterns": ["^(http)(s)?(:\/\/)(www.)?(facebook.com\/)(pages\/)?([A-Za-z0-9_-]+)(\/)?([0-9]+)?(\\?fref=ts)$"],
              "Layouts": [
                {
                    "Name": "Company Profile",
                    "Description": "",
                    "Qualifiers": [],
                    "Groups": [
                      {
                          "Group": "Profiles",
                          "Selectors": ["DIV#contentArea"],
                          "GroupFields": [
                            { "Field": "FullName", "Selectors": [{ "Selector": "", "Processors": [{ "Name": "AddFakeName", "Params": "Justin" }] }] },
                            { "Field": "Address", "Selectors": [{ "Selector": "DIV._4nq6:eq(0) DIV.clearfix DIV.clearfix DIV._42ef DIV A SPAN DIV.ellipsis:eq(0)" }] },
                            { "Field": "Location", "Selectors": [{ "Selector": "DIV._4nq6:eq(0) DIV.clearfix DIV.clearfix DIV._42ef DIV A SPAN DIV.ellipsis:eq(1)" }] },
                            { "Field": "Phone", "Selectors": [{ "Selector": "DIV._4nq6:eq(1) DIV.clearfix DIV.ellipsis" }] },
                            { "Field": "Website", "Selectors": [{ "Selector": "DIV._4nq6:eq(2) DIV.clearfix A" }] }
                          ]
                      }
                    ]
                }
              ]
          }
        ]
    },
    {
        "ID": "b6f4841c-b026-4331-8d8d-ef078e436558",
        "Name": "Twitter",
        "Description": "Twitter Profile",
        "Domains": ["twitter.com", "www.twitter.com"],
        "UserDomains": [],
        "SchemaVersion": "1.0.0",
        "DocumentType": "CapturePatternVer1",
        "CreatedDate": "2014-08-16",
        "AuthorName": "Justin Stull",
        "Paths": [
            {
                "Name": "Twitter Profile",
                "Description": "",
                "UrlPatterns": ["^(http)?s?(:\/\/)?(www.)?twitter.com\/[A-z0-9._-]+(\\?)?([A-z0-9\\._\\-=%]+)?$"],
                "Layouts": [
                    {
                        "Name": "Twitter Profile",
                        "Description": "",
                        "Qualifiers": [
                            { "Selectors": [{ "Selector": "BODY.ProfilePage" }], "ValidationType": "Exists" }
                        ],
                        "Groups": [
                            {
                                "Group": "Profile",
                                "Selectors": ["DIV#page-container DIV.AppContainer DIV.AppContent-main DIV.Grid DIV.Grid-cell DIV.Grid DIV.Grid-cell DIV.ProfileSidebar DIV.ProfileHeaderCard"],
                                "GroupFields": [
                                    { "Field": "FullName", "Selectors": [{ "Selector": "H1.ProfileHeaderCard-name A", "Processors": [{ "Name": "TrimWhiteSpace" }, { "Name": "ParseHandle" }] }] },
                                    { "Field": "Website", "Selectors": [{ "Selector": "DIV.ProfileHeaderCard-url SPAN.ProfileHeaderCard-urlText A", "Processors": [], "Attribute": "title" }] },
                                    { "Field": "Twitter", "Selectors": [{ "Selector": "H2.ProfileHeaderCard-screenname A.ProfileHeaderCard-screennameLink SPAN", "Processors": [{ "Name": "TrimWhiteSpace" }, { "Name": "Append", "Params": "https://twitter.com/<*>" }] }] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
