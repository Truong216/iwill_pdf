let express = require("express");
let app = express();
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
var convert = require('./views/numToWorld');
const PDFMerger = require('pdf-merger-js');

let students = [{
	name: "Joy",
	email: "joy@example.com",
	city: "New York",
	country: "USA",
	nric: "s123456"
	},
	{
	name: "John",
	email: "John@example.com",
	city: "San Francisco",
	country: "USA",
	nric: "s123456"
	},
	{
	name: "Clark",
	email: "Clark@example.com",
	city: "Seattle",
	country: "USA",
	nric: "s123456"
	},
	{
	name: "Watson",
	email: "Watson@example.com",
	city: "Boston",
	country: "USA",
	nric: "s123456"
	},
	{
	name: "Tony",
	email: "Tony@example.com",
	city: "Los Angels",
	country: "USA",
	nric: "s123456"
	}];
const user = {
        "id": "fcdea581-1937-4985-892b-8dcbfc7a9c39",
        "email": "chuhuumanh@gmail.com",
        "role_id": "d6012715-cad3-4a9e-80c3-64b0d1b9c014",
        "nric": "1999386",
        "postal_code": "123456",
        "address_line_1": "tay tuu tu liem ha noi",
        "address_line_2": "ha noi tay tuu",
        "unit_number": "25-6",
        "full_legal_name": "hahaha",
        "will_pdf_link": null,
        "phone": null,
        "is_verify": true,
        "otp": "3683",
        "customer_stripe_id": null,
        "updated_at": "2021-07-07T06:36:52.000Z",
        "created_at": "2021-07-07T06:36:52.000Z",
        "investments": [
            {
                "id": "914e1eee-edd8-4d1a-aaee-d3f13ca9cc65",
                "user_id": "fcdea581-1937-4985-892b-8dcbfc7a9c39",
                "type_id": "ba2b6e88-c860-4099-b3ec-aa6d6d8cd9bb",
                "financial_institutions": "hoho",
                "account_no": "hihi",
                "capital_outlay": 2000000,
                "current_market_value": 9000000,
                "is_delete": false,
                "updated_at": "2021-07-07T06:36:56.000Z",
                "created_at": "2021-07-07T06:36:56.000Z"
            }
        ],
        "insurance_policies": [
            {
                "id": "6960363b-c6ad-44a5-8b29-6c6bba735660",
                "user_id": "fcdea581-1937-4985-892b-8dcbfc7a9c39",
                "beneficiary_id": "319a71fe-3cd4-4e41-8cbc-ffc045232a79",
                "insurance_company": "test again",
                "is_non_nomivated": null,
                "is_nominated": true,
                "policy_name": null,
                "policy_no": "546653",
                "current_value": null,
                "converage": null,
                "is_delete": true,
                "updated_at": "2021-07-07T06:36:55.000Z",
                "created_at": "2021-07-07T06:36:55.000Z"
            },
            {
                "id": "213b6bc9-7890-42d2-a1a4-fdf6e2b95c0d",
                "user_id": "fcdea581-1937-4985-892b-8dcbfc7a9c39",
                "beneficiary_id": null,
                "insurance_company": "again",
                "is_non_nomivated": true,
                "is_nominated": null,
                "policy_name": "Big 3 Critial IIIness Insurance",
                "policy_no": "546653",
                "current_value": 434374000,
                "converage": 20000000,
                "is_delete": false,
                "updated_at": "2021-07-07T06:36:55.000Z",
                "created_at": "2021-07-07T06:36:55.000Z"
            }
        ],
        "properties": [
            {
                "id": "a0a85efe-b82c-4e2e-b754-c54d6a6281c1",
                "user_id": "fcdea581-1937-4985-892b-8dcbfc7a9c39",
                "country": "Thailand",
                "is_solely": false,
                "is_joint": false,
                "postal_code": "",
                "address_line_1": "",
                "address_line_2": "",
                "joint_name": "",
                "joint_contact": "",
                "unit_number": "",
                "tenure": 10,
                "current_bank_loan_id": "",
                "loan_start_date": "2021-07-19T08:14:02.000Z",
                "loan_end_date": "2021-07-19T08:14:02.000Z",
                "year_loan_taken": 10,
                "interest_rate": 5,
                "outstanding_loan_amount": 6,
                "is_delete": true,
                "updated_at": "2021-07-07T06:36:54.000Z",
                "created_at": "2021-07-07T06:36:54.000Z"
            },
            {
                "id": "98c127db-5b0e-4c67-8f61-c5bc839f97dd",
                "user_id": "fcdea581-1937-4985-892b-8dcbfc7a9c39",
                "country": "Singapore",
                "is_solely": null,
                "is_joint": true,
                "postal_code": "43243264",
                "address_line_1": "address line 1",
                "address_line_2": "address line 2",
                "joint_name": "Chu huu manh",
                "joint_contact": "0987512633",
                "unit_number": null,
                "tenure": null,
                "current_bank_loan_id": null,
                "loan_start_date": null,
                "loan_end_date": null,
                "year_loan_taken": null,
                "interest_rate": null,
                "outstanding_loan_amount": null,
                "is_delete": true,
                "updated_at": "2021-07-07T06:36:54.000Z",
                "created_at": "2021-07-07T06:36:54.000Z"
            }
        ],
        "business_interests": [
            {
                "id": "3845abea-199e-463c-a86f-1db6001612b6",
                "user_id": "fcdea581-1937-4985-892b-8dcbfc7a9c39",
                "company_name": "Fetc",
                "company_uen": "KKKKK",
                "position": "Owner",
                "estimated_current_market_value": 15000000,
                "percentage_share": 70,
                "is_delete": true,
                "updated_at": "2021-07-07T06:36:56.000Z",
                "created_at": "2021-07-07T06:36:56.000Z"
            }
        ],
        "valuables": [
            {
                "id": "1522f029-ea56-487a-b9c3-948c42a9b000",
                "user_id": "fcdea581-1937-4985-892b-8dcbfc7a9c39",
                "type_id": "9dab2e56-c9b9-407d-b2fa-c9f25f0eb7d3",
                "brand": "sand",
                "model": "test1",
                "serial_no": "hi",
                "plate_no": null,
                "country_name": null,
                "address_line_1": null,
                "address_line_2": null,
                "postal_code": null,
                "pet_name": null,
                "pet_breed": null,
                "pet_registration_number": null,
                "safe_box_detail": null,
                "is_delete": false,
                "updated_at": "2021-07-07T06:36:56.000Z",
                "created_at": "2021-07-07T06:36:56.000Z"
            }
        ],
        "executors": [
            {
                "id": "1fb61754-af15-4d6b-9c4d-639884896e85",
                "user_id": "fcdea581-1937-4985-892b-8dcbfc7a9c39",
                "full_legal_name": "",
                "relationship_id": "3f0ca5a2-c2a9-40a3-94cb-2546fdea8b3a",
                "email": null,
                "nric": null,
                "is_delete": true,
                "updated_at": "2021-07-07T06:36:53.000Z",
                "created_at": "2021-07-07T06:36:53.000Z"
            },
            {
                "id": "0c4a8423-5b5c-41b3-86ee-924fa580caaa",
                "user_id": "fcdea581-1937-4985-892b-8dcbfc7a9c39",
                "full_legal_name": "",
                "relationship_id": "07064250-26f5-43c2-821d-9fbbec9ec10e",
                "email": null,
                "nric": null,
                "is_delete": null,
                "updated_at": "2021-07-07T06:36:53.000Z",
                "created_at": "2021-07-07T06:36:53.000Z"
            }
        ],
        "beneficiaries": [
            {
                "id": "ee953689-eb5d-495e-87fe-fe05f1086616",
                "full_legal_name": "Cao van hoi",
                "relationship_id": "3f0ca5a2-c2a9-40a3-94cb-2546fdea8b3a",
                "user_id": "fcdea581-1937-4985-892b-8dcbfc7a9c39",
                "email": "caovanhoi33@gmail.com",
                "nric": null,
                "percent": 60,
                "is_delete": false,
                "updated_at": "2021-07-07T06:36:53.000Z",
                "created_at": "2021-07-07T06:36:53.000Z"
            },
            {
                "id": "319a71fe-3cd4-4e41-8cbc-ffc045232a79",
                "full_legal_name": "Cao Van Doi",
                "relationship_id": "3f0ca5a2-c2a9-40a3-94cb-2546fdea8b3a",
                "user_id": "fcdea581-1937-4985-892b-8dcbfc7a9c39",
                "email": "caovangay333@gmail.com",
                "nric": null,
                "percent": 40,
                "is_delete": true,
                "updated_at": "2021-07-07T06:36:54.000Z",
                "created_at": "2021-07-07T06:36:54.000Z"
            }
        ],
        "bank_accounts": [
            {
                "id": "76768a78-c92d-404a-8c0a-b41563d40f9e",
                "user_id": "fcdea581-1937-4985-892b-8dcbfc7a9c39",
                "bank_id": "2359a754-aed2-49df-9328-c9c9627500bf",
                "account_no": "41532",
                "is_solely": true,
                "is_joint": null,
                "current_balance": 984362000,
                "account_holder": "Shrek green , lord farquaaad",
                "is_delete": true,
                "updated_at": "2021-07-07T06:36:55.000Z",
                "created_at": "2021-07-07T06:36:55.000Z"
            },
            {
                "id": "1a4d4b18-bb02-49a9-908d-0b146d1eaf75",
                "user_id": "fcdea581-1937-4985-892b-8dcbfc7a9c39",
                "bank_id": "2359a754-aed2-49df-9328-c9c9627500bf",
                "account_no": "43242342",
                "is_solely": true,
                "is_joint": null,
                "current_balance": 984362000,
                "account_holder": null,
                "is_delete": true,
                "updated_at": "2021-07-07T06:36:54.000Z",
                "created_at": "2021-07-07T06:36:54.000Z"
            }
        ]
}


app.get("/generateReport", async (req, res) => {
	await ejs.renderFile(path.join(__dirname, './views/', "report-template.ejs"), {
        user: user,
        convert: convert
    }, (err, data) => {
        if (err) {
			console.log(err)
            res.send(err);
        } else {
            let options_1 = {
                "border":{
                    "bottom": "40mm"
                },
                "height": "11.25in",
                "header": {
                    "height": "25mm",
                },
                "footer": {
                    "height": "35mm",
                },
            };
            pdf.create(data, options_1).toFile("report.pdf", function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.send("File created successfully");
                }
            });
        }
    });
    await ejs.renderFile(path.join(__dirname, './views/', "first-page.ejs"), {
        user: user,
        convert: convert
    }, (err, data) => {
        if (err) {
			console.log(err)
            res.send(err);
        } else {
            let options_2 = {
                "height": "11.25in",
                "header": {
                    "height": "25mm",
                },
                "footer": {
                    "height": "35mm",
                },
            };
            pdf.create(data, options_2).toFile("first-page.pdf", function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.send("File created successfully");
                }
            });
        }
    });
    var merger = new PDFMerger();
    (async () => {
    merger.add('first-page.pdf', [1]);
    merger.add('report.pdf');   
    await merger.save('output.pdf'); //save under given name and reset the internal document
    })();
})

app.listen(3000);
