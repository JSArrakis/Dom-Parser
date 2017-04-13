var demoPatterns = [
    {
        "ID": "D0",
        "Name": "Selectors",
        "Description": "",
        "Domains": [
            "localhost"
        ],
        "UserDomains": [],
        "Paths": [
            {
                "Name": "Selectors",
                "Description": "",
                "UrlPatterns": [
                    "^(http)(s)?(://)(localhost:)[0-9]{5}(/DemoPages/Selector.html)"
                ],
                "Layouts": [
                    {
                        "Name": "Demo Page",
                        "Description": "",
                        "Qualifiers": [
                            {
                                "Selector": "DIV#Simple",
                                "ValidationType": "Exists"
                            }
                        ],
                        "GroupFields": [
                            {
                                "Group": "Profile",
                                "Modifier": "IFrame",
                                "Selectors": [
                                    "DIV#IFrame"
                                ],
                                "GroupFields": [
                                    {
                                        "Group": "Profile",
                                        "Modifier": "Simple",
                                        "Selectors": [
                                            "IFRAME#IFrame"
                                        ],
                                        "GroupFields": [
                                            {
                                                "Field": "FullName",
                                                "Selectors": [
                                                    {
                                                        "Selector": " SPAN#Name",
                                                        "Processors": []
                                                    }
                                                ]
                                            },
                                            {
                                                "Field": "Phone",
                                                "Selectors": [
                                                    {
                                                        "Selector": " SPAN#Phone",
                                                        "Processors": []
                                                    }
                                                ]
                                            },
                                            {
                                                "Field": "Email",
                                                "Selectors": [
                                                    {
                                                        "Selector": " SPAN#Email",
                                                        "Processors": []
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "Group": "Profile",
                                "Modifier": "Simple",
                                "Selectors": [
                                    "DIV#Simple"
                                ],
                                "Buttons": [
                                    {
                                        "Click": "javascript: Capture(this);",
                                        "Selectors": [
                                            {
                                                "Selector": "DIV.profile-header DIV#member-1.masthead.vcard.contact H1",
                                                "Position": "Before",
                                                "ContainerClass": "C_RelativeHidden",
                                                "ButtonClass": "C_CaptureButton"
                                            }
                                        ]
                                    }
                                ],
                                "GroupFields": [
                                    {
                                        "Field": "FullName",
                                        "Selectors": [
                                            {
                                                "Selector": " > SPAN#Name",
                                                "Processors": [
                                                    "SplitFullName"
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Phone",
                                        "Selectors": [
                                            {
                                                "Selector": " > DIV > SPAN#Phone",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Email",
                                        "Selectors": [
                                            {
                                                "Selector": " SPAN#Email",
                                                "Processors": []
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "Group": "Profile",
                                "Modifier": "Nth-Of-Type",
                                "Selectors": [
                                    "DIV#NthOf"
                                ],
                                "GroupFields": [
                                    {
                                        "Field": "FullName",
                                        "Selectors": [
                                            {
                                                "Selector": " SPAN:nth-of-type(2)",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Phone",
                                        "Selectors": [
                                            {
                                                "Selector": " SPAN:nth-of-type(4)",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Email",
                                        "Selectors": [
                                            {
                                                "Selector": " SPAN:nth-of-type(6)",
                                                "Processors": []
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "Group": "Profile",
                                "Modifier": "Scope 1",
                                "Selectors": [
                                    "DIV#Scope"
                                ],
                                "GroupFields": [
                                    {
                                        "Group": "Scope 2",
                                        "Selectors": [
                                            " > DIV.scope"
                                        ],
                                        "GroupFields": [
                                            {
                                                "Group": "Scope 3",
                                                "Selectors": [
                                                    " > DIV.scope"
                                                ],
                                                "GroupFields": [
                                                    {
                                                        "Group": "Scope 4",
                                                        "Selectors": [
                                                            " > DIV.scope"
                                                        ],
                                                        "GroupFields": [
                                                            {
                                                                "Group": "Scope 5",
                                                                "Selectors": [
                                                                    " > DIV.scope"
                                                                ],
                                                                "GroupFields": [
                                                                    {
                                                                        "Group": "Scope 6",
                                                                        "Selectors": [
                                                                            " > DIV.scope"
                                                                        ],
                                                                        "GroupFields": [
                                                                            {
                                                                                "Field": "Scope 0",
                                                                                "Selectors": [
                                                                                    {
                                                                                        "Selector": "SPAN.scope",
                                                                                        "Processors": [],
                                                                                        "Scope": 0
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "Field": "Scope 1",
                                                                                "Selectors": [
                                                                                    {
                                                                                        "Selector": " > SPAN.scope",
                                                                                        "Processors": [],
                                                                                        "Scope": 1
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "Field": "Scope 2",
                                                                                "Selectors": [
                                                                                    {
                                                                                        "Selector": " > SPAN.scope",
                                                                                        "Processors": [],
                                                                                        "Scope": 2
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "Field": "Scope 3",
                                                                                "Selectors": [
                                                                                    {
                                                                                        "Selector": " > SPAN.scope",
                                                                                        "Processors": [],
                                                                                        "Scope": 3
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "Field": "Scope 4",
                                                                                "Selectors": [
                                                                                    {
                                                                                        "Selector": " > SPAN.scope",
                                                                                        "Processors": [],
                                                                                        "Scope": 4
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "Field": "Scope 5",
                                                                                "Selectors": [
                                                                                    {
                                                                                        "Selector": " > SPAN.scope",
                                                                                        "Processors": [],
                                                                                        "Scope": 5
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "Field": "Scope 6",
                                                                                "Selectors": [
                                                                                    {
                                                                                        "Selector": " > SPAN.scope",
                                                                                        "Processors": [],
                                                                                        "Scope": 6
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "Field": "Scope 99",
                                                                                "Selectors": [
                                                                                    {
                                                                                        "Selector": " > SPAN.scope",
                                                                                        "Processors": [],
                                                                                        "Scope": 99
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "Field": "Scope -0",
                                                                                "Selectors": [
                                                                                    {
                                                                                        "Selector": "SPAN.scope",
                                                                                        "Processors": [],
                                                                                        "Scope": 0
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "Field": "Scope -1",
                                                                                "Selectors": [
                                                                                    {
                                                                                        "Selector": " > SPAN.scope",
                                                                                        "Processors": [],
                                                                                        "Scope": -1
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "Field": "Scope -2",
                                                                                "Selectors": [
                                                                                    {
                                                                                        "Selector": " > SPAN.scope",
                                                                                        "Processors": [],
                                                                                        "Scope": -2
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "Field": "Scope -3",
                                                                                "Selectors": [
                                                                                    {
                                                                                        "Selector": " > SPAN.scope",
                                                                                        "Processors": [],
                                                                                        "Scope": -3
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "Field": "Scope -4",
                                                                                "Selectors": [
                                                                                    {
                                                                                        "Selector": " > SPAN.scope",
                                                                                        "Processors": [],
                                                                                        "Scope": -4
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "Field": "Scope -5",
                                                                                "Selectors": [
                                                                                    {
                                                                                        "Selector": " > SPAN.scope",
                                                                                        "Processors": [],
                                                                                        "Scope": -5
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "Field": "Scope -6",
                                                                                "Selectors": [
                                                                                    {
                                                                                        "Selector": " > SPAN.scope",
                                                                                        "Processors": [],
                                                                                        "Scope": -6
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "Field": "Scope -99",
                                                                                "Selectors": [
                                                                                    {
                                                                                        "Selector": "SPAN.scope",
                                                                                        "Processors": [],
                                                                                        "Scope": -99
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    }
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
                                "Group": "Profiles",
                                "Modifier": "Flat List",
                                "Step": 6,
                                "Skip": 2,
                                "Multiple": true,
                                "Selectors": [
                                    "DIV#FlatList SPAN"
                                ],
                                "GroupFields": [
                                    {
                                        "Field": "FullName",
                                        "Selectors": [
                                            {
                                                "Selector": " + SPAN",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Phone",
                                        "Selectors": [
                                            {
                                                "Selector": " ~ SPAN:contains(Phone):eq(0) + SPAN",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Email",
                                        "Selectors": [
                                            {
                                                "Selector": " ~ SPAN:eq(4)",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Company",
                                        "Selectors": [
                                            {
                                                "Selector": " DIV#FlatList SPAN:nth-of-type(2)",
                                                "Processors": [],
                                                "Scope": 0
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "Group": "Profiles",
                                "Modifier": "Flat List",
                                "Multiple": true,
                                "Selectors": [
                                    "DIV#FlatList SPAN:contains(Name)"
                                ],
                                "GroupFields": [
                                    {
                                        "Field": "FullName",
                                        "Selectors": [
                                            {
                                                "Selector": " + SPAN",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Phone",
                                        "Selectors": [
                                            {
                                                "Selector": " ~ SPAN:contains(Phone):eq(0) + SPAN",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Email",
                                        "Selectors": [
                                            {
                                                "Selector": " ~ SPAN:eq(4)",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Company",
                                        "Selectors": [
                                            {
                                                "Selector": "DIV#FlatList SPAN:nth-of-type(2)",
                                                "Processors": [],
                                                "Scope": 0
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "Group": "Profiles",
                                "Modifier": "Flat List",
                                "Multiple": true,
                                "Selectors": [
                                    "DIV#FlatList SPAN:nth-of-type(6n+4)"
                                ],
                                "GroupFields": [
                                    {
                                        "Field": "FullName",
                                        "Selectors": [
                                            {
                                                "Selector": "",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Phone",
                                        "Selectors": [
                                            {
                                                "Selector": " ~ SPAN:contains(Phone):eq(0) + SPAN",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Email",
                                        "Selectors": [
                                            {
                                                "Selector": " ~ SPAN:eq(3)",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Company",
                                        "Selectors": [
                                            {
                                                "Selector": "DIV#FlatList SPAN:nth-of-type(2)",
                                                "Processors": [],
                                                "Scope": 0
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "Group": "Profiles",
                                "Modifier": "Asymetical Flat List",
                                "Multiple": true,
                                "Selectors": [
                                    "DIV#AsymFlatList SPAN:contains(Name)"
                                ],
                                "GroupFields": [
                                    {
                                        "Field": "FullName",
                                        "Selectors": [
                                            {
                                                "Selector": " + SPAN",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Phone",
                                        "Selectors": [
                                            {
                                                "Selector": " ~ SPAN:contains(Phone):eq(0) + SPAN",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Email",
                                        "Selectors": [
                                            {
                                                "Selector": " ~ SPAN:contains(Email):eq(0) + SPAN",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Title",
                                        "Selectors": [
                                            {
                                                "Selector": " ~ SPAN:contains(Title):eq(0) + SPAN",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Website",
                                        "Selectors": [
                                            {
                                                "Selector": " ~ SPAN:contains(Website):eq(0) + SPAN",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Company",
                                        "Selectors": [
                                            {
                                                "Selector": "DIV#FlatList SPAN:nth-of-type(2)",
                                                "Processors": [],
                                                "Scope": 0
                                            }
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
        "ID": "D1",
        "Name": "Qualifiers",
        "Description": "",
        "Domains": [
            "localhost"
        ],
        "UserDomains": [],
        "Paths": [
            {
                "Name": "Qualifiers",
                "Description": "",
                "UrlPatterns": [
                    "^(http)(s)?(://)(localhost:)[0-9]{5}(/DemoPages/Qualifier.html)"
                ],
                "Layouts": [
                    {
                        "Name": "Demo Page Qualifier",
                        "Description": "",
                        "Qualifiers": [
                            {
                                "Selector": "DIV#Simple",
                                "ValidationType": "Exists"
                            }
                        ],
                        "Groups": [
                            {
                                "Group": "Profile",
                                "Selectors": [
                                    "DIV.section"
                                ],
                                "Qualifiers": [
                                    { "Selectors": " > DIV.title", "ValidationType": "NotExists" }
                                ],
                                "GroupFields": [
                                    {
                                        "Field": "FullName",
                                        "Selectors": [
                                            {
                                                "Selector": " SPAN.Name",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Phone",
                                        "Selectors": [
                                            {
                                                "Selector": " SPAN.Phone",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Email",
                                        "Selectors": [
                                            {
                                                "Selector": " SPAN.Email",
                                                "Processors": []
                                            }
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
        "ID": "D2",
        "Name": "Buttons",
        "Description": "",
        "Domains": [
            "localhost"
        ],
        "UserDomains": [],
        "Paths": [
            {
                "Name": "Bottons Page",
                "Description": "",
                "UrlPatterns": [
                    "^(http)(s)?(://)(localhost:)[0-9]{5}(/DemoPages/Buttons.html)"
                ],
                "Layouts": [
                    {
                        "Name": "Demo Page",
                        "Description": "",
                        "ImportCSS": [
                            "http://dq.ringlead.com/api/ereccruit-Style.css"
                        ],
                        "ImportStyle": "",
                        "Qualifiers": [
                            {
                                "Selector": "DIV#Simple",
                                "ValidationType": "Exists"
                            }
                        ],
                        "Events": [
                            {
                                "Event": "click",
                                "Selectors": "#AddAll",
                                "Action": "AddButtons"
                            },
                            {
                                "Event": "click",
                                "Selectors": "#RemoveAll",
                                "Action": "RemoveButtons"
                            },
                            {
                                "Event": "click",
                                "Selectors": "#HideAll",
                                "Action": "ShowButtons"
                            },
                            {
                                "Event": "click",
                                "Selectors": "#ShowAll",
                                "Action": "HideButtons"
                            }
                        ],
                        "GroupFields": [
                            {
                                "Group": "Profile",
                                "Modifier": "Simple",
                                "Selectors": [
                                    "BODY"
                                ],
                                "GroupFields": [
                                    {
                                        "Group": "Profile",
                                        "Modifier": "Simple",
                                        "Selectors": [
                                            "DIV#Simple"
                                        ],
                                        "Containers": [
                                            {
                                                "Selectors": [
                                                    {
                                                        "Selector": " > SPAN#Name"}],
                                                "Type": "SPAN",
                                                "Class": "C_Display_Relative",
                                                "Style": "",
                                                "Position": "after",
                                                "Inner": {
                                                    "Type": "SPAN",
                                                    "Class": "C_Container_ABS_TopLeft",
                                                    "Style": "width: 70px;",
                                                    "Position": "after"
                                                },
                                                "Buttons": [
                                                    "capture_contact_button_logo|height: 50px;",
                                                    "capture_contact_button_logo{ \"Style\": \"height: 60px;\" }"
                                                ]
                                            }
                                        ],
                                        "GroupFields": [
                                            {
                                                "Field": "FullName",
                                                "Selectors": [
                                                    {
                                                        "Selector": " > SPAN#Name",
                                                        "Processors": []
                                                    }
                                                ]
                                            },
                                            {
                                                "Field": "Phone",
                                                "Selectors": [
                                                    {
                                                        "Selector": " > DIV > SPAN#Phone",
                                                        "Processors": []
                                                    }
                                                ]
                                            },
                                            {
                                                "Field": "Email",
                                                "Selectors": [
                                                    {
                                                        "Selector": " SPAN#Email",
                                                        "Processors": []
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "Group": "Profile",
                                "Modifier": "Simple",
                                "Selectors": [
                                    "DIV#List"
                                ],
                                "Events": [
                                    {
                                        "Event": "click",
                                        "Selectors": "#AddScope",
                                        "Action": "AddButtons"
                                    },
                                    {
                                        "Event": "click",
                                        "Selectors": "#RemoveScope",
                                        "Action": "RemoveButtons"
                                    },
                                    {
                                        "Event": "click",
                                        "Selectors": "#HideScope",
                                        "Action": "ShowButtons"
                                    },
                                    {
                                        "Event": "click",
                                        "Selectors": "#ShowScope",
                                        "Action": "HideButtons"
                                    }
                                ],
                                "Containers": [
                                    {
                                        "Selectors": [{ "Selector": " > DIV.title" }],
                                        "Buttons": ["capture_group_button_icon"]
                                    }
                                ],
                                "GroupFields": [
                                    {
                                        "Group": "Profile",
                                        "Modifier": "Simple",
                                        "Multiple": "True",
                                        "Selectors": [
                                            " > DIV"
                                        ],
                                        "Containers": [
                                            {
                                                "Selectors": [{ "Selector": " > SPAN#Name" }],
                                                "Buttons": ["capture_contact_button_logo"]
                                            }
                                        ],
                                        "GroupFields": [
                                            {
                                                "Field": "FullName",
                                                "Selectors": [
                                                    {
                                                        "Selector": " > SPAN#Name",
                                                        "Processors": []
                                                    }
                                                ]
                                            },
                                            {
                                                "Field": "Phone",
                                                "Selectors": [
                                                    {
                                                        "Selector": " > DIV > SPAN#Phone",
                                                        "Processors": []
                                                    }
                                                ]
                                            },
                                            {
                                                "Field": "Email",
                                                "Selectors": [
                                                    {
                                                        "Selector": " SPAN#Email",
                                                        "Processors": []
                                                    }
                                                ]
                                            }
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
        "ID": "D3",
        "Name": "Qualifier Test Case One",
        "Description": "",
        "Domains": [
            "localhost"
        ],
        "UserDomains": [],
        "Paths": [
            {
                "Name": "Qualifier Test Case One",
                "Description": "",
                "UrlPatterns": [
                    "^(http)(s)?(://)(localhost:)[0-9]{5}(/DemoPages/QualifierTestCaseOne.html)"
                ],
                "Layouts": [
                    {
                        "Name": "Qualifier Test Case One",
                        "Description": "",
                        "Qualifiers": [
                            {
                                "Selector": "DIV.section DIV:contains(Person 1)",
                                "ValidationType": "Exists"
                            }
                        ],
                        "Groups": [
                            {
                                "Group": "Profile",
                                "Multiple": "True",
                                "Selectors": [
                                    "DIV.section"
                                ],
                                "Qualifiers": [
                                    { "Selectors": [" > SPAN:contains(John Smith)", " > SPAN:contains(John Doe)"], "ValidationType": "Exists", "Operand": "Or" }
                                ],
                                //Unsure how to construct: Selector One OR Selector Two
                                "GroupFields": [
                                    {
                                        "Field": "FullName",
                                        "Selectors": [
                                            {
                                                "Selector": " SPAN.Name",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Phone",
                                        "Selectors": [
                                            {
                                                "Selector": " SPAN.Phone",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Email",
                                        "Selectors": [
                                            {
                                                "Selector": " SPAN.Email",
                                                "Processors": []
                                            }
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
        "ID": "D4",
        "Name": "Qualifier Test Case Two",
        "Description": "",
        "Domains": [
            "localhost"
        ],
        "UserDomains": [],
        "Paths": [
            {
                "Name": "Qualifier Test Case Two",
                "Description": "",
                "UrlPatterns": [
                    "^(http)(s)?(://)(localhost:)[0-9]{5}(/DemoPages/QualifierTestCaseTwo.html)"
                ],
                "Layouts": [
                    {
                        "Name": "Qualifier Test Case Two",
                        "Description": "",
                        "Qualifiers": [
                            {
                                "Selectors": { "Selector": "IFrame#IFrame", "Selectors": "DIV.section DIV:contains(Person 1)" },
                                "ValidationType": "Exists"
                            }
                        ],
                        "Groups": [
                            {
                                "Group": "Profile",
                                "Selectors": ["IFRAME#IFrame"],
                                "GroupFields": [
                                    {
                                        "Group": "Profile",
                                        "Multiple": "True",
                                        "Selectors": [
                                            "DIV.section"
                                        ],
                                        "GroupFields": [
                                            {
                                                "Field": "FullName",
                                                "Selectors": [
                                                    {
                                                        "Selector": " SPAN.Name",
                                                        "Processors": []
                                                    }
                                                ]
                                            },
                                            {
                                                "Field": "Phone",
                                                "Selectors": [
                                                    {
                                                        "Selector": " SPAN.Phone",
                                                        "Processors": []
                                                    }
                                                ]
                                            },
                                            {
                                                "Field": "Email",
                                                "Selectors": [
                                                    {
                                                        "Selector": " SPAN.Email",
                                                        "Processors": []
                                                    }
                                                ]
                                            }
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
        "ID": "D5",
        "Name": "Qualifier Test Case Three",
        "Description": "",
        "Domains": [
            "localhost"
        ],
        "UserDomains": [],
        "Paths": [
            {
                "Name": "Qualifier Test Case Three",
                "Description": "",
                "UrlPatterns": [
                    "^(http)(s)?(://)(localhost:)[0-9]{5}(/DemoPages/QualifierTestCaseThree.html)"
                ],
                "Layouts": [
                    {
                        "Name": "Qualifier Test Case Three",
                        "Description": "",
                        "Qualifiers": [
                            {
                                "Selector": "DIV.section DIV:contains(Person 1)",
                                "ValidationType": "Exists"
                            }
                        ],
                        "Groups": [
                            {
                                "Group": "Profile",
                                "Multiple": "True",
                                "Selectors": [
                                    "DIV.section"
                                ],
                                "GroupFields": [
                                    {
                                        "Field": "FullName",
                                        "Selectors": [
                                            {
                                                "Selector": " SPAN.FalseName",
                                                "Processors": []
                                            },
                                            //The pattern is not picking up the second selector as an option if the first selector does not return a value. It then appends "null" to the result.
                                            {
                                                "Selector": " SPAN.Name",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Phone",
                                        "Selectors": [
                                            {
                                                "Selector": " SPAN.Phone",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Email",
                                        "Selectors": [
                                            {
                                                "Selector": " SPAN.Email",
                                                "Processors": []
                                            }
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
        "ID": "D6",
        "Name": "Qualifier Test Case Four",
        "Description": "",
        "Domains": [
            "localhost"
        ],
        "UserDomains": [],
        "Paths": [
            {
                "Name": "Qualifier Test Case Four",
                "Description": "",
                "UrlPatterns": [
                    "^(http)(s)?(://)(localhost:)[0-9]{5}(/DemoPages/QualifierTestCaseFour.html)"
                ],
                "Layouts": [
                    {
                        "Name": "Qualifier Test Case Four",
                        "Description": "",
                        "Qualifiers": [
                            {
                                "Selector": "DIV.section DIV:contains(Person 1)",
                                "ValidationType": "Exists"
                            }
                        ],
                        "Groups": [
                            {
                                "Group": "Profile",
                                "Multiple": "True",
                                "Selectors": [
                                    {
                                        "Selector": "DIV.section",
                                        "Qualifiers": [
                                            { "Selectors": [" > SPAN:contains(John Smith)", " > SPAN:contains(John Doe)"], "ValidationType": "Exists", "Operand": "Or" },
                                            { "Selectors": [" > SPAN:contains(John Doe False)"], "ValidationType": "NotExists" }
                                        ]
                                    }
                                ],

                                // Selector One OR Selector two NOT Selector three
                                "GroupFields": [
                                    {
                                        "Field": "FullName",
                                        "Selectors": [
                                            {
                                                "Selector": " SPAN.Name",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Phone",
                                        "Selectors": [
                                            {
                                                "Selector": " SPAN.Phone",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Email",
                                        "Selectors": [
                                            {
                                                "Selector": " SPAN.Email",
                                                "Processors": []
                                            }
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
        "ID": "D7",
        "Name": "Qualifier Test Case Five",
        "Description": "",
        "Domains": [
            "localhost"
        ],
        "UserDomains": [],
        "Paths": [
            {
                "Name": "Qualifier Test Case Five",
                "Description": "",
                "UrlPatterns": [
                    "^(http)(s)?(://)(localhost:)[0-9]{5}(/DemoPages/QualifierTestCaseFive.html)"
                ],
                "Layouts": [
                    {
                        "Name": "Qualifier Test Case Five",
                        "Description": "",
                        "Qualifiers": [
                            {
                                "Selector": "DIV.section DIV:contains(Person 1)",
                                "ValidationType": "Exists"
                            }
                        ],
                        "Groups": [
                            {
                                "Group": "Profile",
                                "Multiple": "True",
                                "Selectors": [
                                    "DIV.section"
                                ],
                                "GroupFields": [
                                    {
                                        "Field": "FullName",
                                        "Selectors": [
                                            {
                                                "Selector": " SPAN.Name",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Phone",
                                        "Selectors": [
                                            {
                                                "Selector": " SPAN.Phone",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Email",
                                        "Selectors": [
                                            {
                                                "Selector": " SPAN.Email:not(:contains(@gmail.com))",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Email2",
                                        "Selectors": [
                                            {
                                                "Selector": " SPAN.Email",
                                                "Qualifiers": [{ "Selectors":[ ":not(:contains(@gmail.com))"], "ValidationType": "Exists"}],
                                                "Processors": []
                                            }
                                        ]
                                    }
                                    //Unsure how on Selector Qualifier construction. I want "Qualifiers": [{ "Selectors": "SPAN.Email:contains(@gmail.com)", "ValidationType": "NotExists"}]
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "ID": "D8",
        "Name": "Button Test Case One",
        "Description": "",
        "Domains": [
            "localhost"
        ],
        "UserDomains": [],
        "Paths": [
            {
                "Name": "Button Test Case One",
                "Description": "",
                "UrlPatterns": [
                    "^(http)(s)?(://)(localhost:)[0-9]{5}(/DemoPages/ButtonTestCaseOne.html)"
                ],
                "Layouts": [
                    {
                        "Name": "Button Test Case One",
                        "Description": "",
                        "Qualifiers": [
                            {
                                "Selector": "DIV.section DIV:contains(Person 1)",
                                "ValidationType": "Exists"
                            }
                        ],
                        "Groups": [
                            {
                                "Group": "Profile",
                                "Multiple": "True",
                                "Selectors": [
                                    "DIV.section"
                                ],
                                "Buttons": [
                                    {
                                        "Type": "SPAN",
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
                                                "Selector": "SPAN.Name",
                                            }
                                        ],
                                        "Buttons": ["capturelogo|height: 10px"]
                                    },
                                    "capture_contact_button_icon|height: 10px; margin-left: 5px;"
                                ],
                                //Need the new classes and constructors for buttons.
                                "GroupFields": [
                                    {
                                        "Field": "FullName",
                                        "Selectors": [
                                            {
                                                "Selector": " SPAN.Name",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Phone",
                                        "Selectors": [
                                            {
                                                "Selector": " SPAN.Phone",
                                                "Processors": []
                                            }
                                        ]
                                    },
                                    {
                                        "Field": "Email",
                                        "Selectors": [
                                            {
                                                "Selector": " SPAN.Email",
                                                "Processors": []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
