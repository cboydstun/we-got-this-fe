# Accounts

What are all of the accounts that we have in our company?
Who is paying or free?
Where did we acquire them?
When did they sign up / cancel?

```
{
    "accounts": {
        "jackies_cleaning_4321": {
            "name": "Jackies Cleaning",
            "create_date": "11/5/19",
            "users": [Users],
			"teams": [
				{
					"name": "Team 10",
					"users": [
						"jackie_fention_12345",
						"susy_smith_123124",
					]
				}
			]
        }
    }
}
```

# Users

What persmissions does this user have?
What is this person's name?
How do I contact this person?

```
{
    "users": {
        "jackie_fention_12345": {
            "displayName": "Jackie Fention",
            "email": "jackie@jackiescleaning.com",
            "phone": {
                primary: "(432) 456-1940",
                secondary: "(432) 456-1943",
            }
            "roles": ["admin", "tech", "superadmin"],
            "disabled": true,
            "photoUrl": "string-the-photo.com"
        },
        "susy_smith_123124": {
            "displayName": "Susy Smith",
            "email": "susy@jackiescleaning.com",
            "phone": {
                primary: "(432) 456-1940",
            }
            "roles": ["admin", "tech", "superadmin"],
            "disabled": false,
            "photoUrl": null
        }
}
```

# Customers

Who are our customers?
Are they a recurring customer?
Where did we get them?
What jobs have we done for them?
What jobs do we have scheduled for them?

```
{
    "customers": {
        "customer_id_1234423": {
            "name": "Frank Sinatra",
            "payment": "Cash/Check",
            "paymentAmount": 140,
            "schedule": "Monthly",
            "contact": {
                "email": "Frank@fankies.com",
                "phone": "(456) 456-1234"
            },
            "locations": [
                {
				“Name”: “Sherwood Spring”
				“Type”: [“Primary Residence”, “Secondary Residence”, “Rental”, “Vacation”, “Business”],
                    "primary": true,
                    "street": "1234 Heath",
                    "city": "Boise",
                    "state": "ID",
                    "zip": "87540"
                },
                {
				“Name”: “Sherwood Spring”
				“Type”: [“Primary Residence”, “Secondary Residence”, “Rental”, “Vacation”, “Business”],
                    "street": "1235 Heath",
                    "city": "Boise",
                    "state": "ID",
                    "zip": "87540"
                },
                {
				“Name”: “Sherwood Spring”
				“Type”: [“Primary Residence”, “Secondary Residence”, “Rental”, “Vacation”, “Business”],
                    "street": "1236 Heath",
                    "city": "Boise",
                    "state": "ID",
                    "zip": "87540"
                }

            ]
            "type": ["Recurring", "Special"],
            "category": ["single family home", "mobile home"],
            "acquisition": {
                "date": "11/12/19",
                "source": ["Ad", "Phone", "Customer Referral", "Staff Referral", "Other"]
            }
            "jobs": [
                "job_frankie_cleaning_123342354",
                "job_frankie_cleaning_12309874",
                "job_frankie_cleaning_123534234",
            ],
            "notes": [
                {
                    "_id": "note_id_1231243",
                    "timestamp": 12308970129834,
                    "note": "Information"
                },
                {
                    "_id": "note_id_12334987",
                    "timestamp": 12308970129999,
                    "note": "More Information"
                }
            ]
        },
        "customer_id_873892": {
            ...
        }
    }
}

```

# Teams

"teams": {
"doc-id": {
"name": "420 Blazers",
"users": [
"user_id_1",
"user_id_2",
"user_id_3
]
}
}

```


```

# Jobs

Who was on this job?
Who was the client on the job?
When was the job performed?
When was the job scheduled?
Where is the job located?
Who worked this job?

```
{
    "jobs": {
        "_id": "job_frankie_cleaning_123342354",
        "customer": "customer_id_1234423",
        "details": {
            "scheduled_date": "10/31/19",
            "time": "9:00 A.M.",
			"start_time": 9434582903423,
			"end_time": 9874589032345,
        },
        "location": {
            "street": "1234 Heath",
            "city": "Boise",
            "state": "ID",
            "zipcode": "87540"
        },
        "team": "Team B",
        "techs": [
            {
                "user_id": "susy_smith_123124",
                "name": "Susy Smith",
                "start_time": 9434582903423,
                "end_time": 9874589032345
            },
            {
                "user_id": "susy_smith_123124",
                "name": "Helga Bergoli",
                "start_time": 1230909845,
                "end_time": 0983740298534
            }
        ],
        "type": ["Recurring", "Special"],
        "approved_checklist_url": "urltochecklist.com",
        "confirmed_checklist_url": "urltochekclistconfirmed.com",
        "photos": [
            {
                url: "url_to_photo_1.com",
                tag: "kitchen",
                note: "note about this photo"
            },
            {
                url: "url_to_photo_2.com",
                tag: "kitchen",
                note: "note about this photo"
            },
            {
                url: "url_to_photo_3.com",
                tag: "bathroom",
                note: "note about this photo"
            }
        ]
        "notes": "This place was a disaster and now it's beautiful"
    }
}
```
