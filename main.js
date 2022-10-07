const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib

async function main() {

}

const files = {}

document.getElementById("clear").addEventListener("click", e => {
    for (const element of document.getElementsByTagName("input")) {
        element.value = ""
    }
})

document.getElementById("signature").addEventListener("change", e => {
    const reader = new FileReader()
    
    reader.readAsArrayBuffer(e.target.files[0]);

    reader.addEventListener("load", e => {
        files.signature = e.target.result;
    })
})

document.getElementById("template").addEventListener("change", e => {
    const reader = new FileReader()

    reader.readAsArrayBuffer(e.target.files[0]);
    
    reader.addEventListener("load", e => {
        files.template = e.target.result;
    })
})

function onFileSelected(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
}

function filterDropdown() {
    const value   = document.getElementById("court_county").value.toUpperCase();
    const content = document.getElementById("dropdown_content");

    if (value == "") {
        content.style.display = "none";
    } else {
        let showing = [];

        for (const button of content.getElementsByTagName("button")) {
            if (button.textContent.toUpperCase().indexOf(value) > -1) {
                showing[showing.length] = button;
                button.style.display = "";
            } else {
                button.style.display = "none";
            }
        }

        content.style.display = showing.length > 1 ? "block" : "none";
        content.style.display = (showing.length == 1 && showing[0].textContent.toUpperCase() == value) ? "none" : "block";
    }
}

document.getElementById("court_county").addEventListener("input", e => {
    filterDropdown();
});

document.getElementById("court_county").addEventListener("keydown", e => {
    if (e.key != "Enter") return;

    const value = e.target.value.toUpperCase();

    for (const button of document.getElementById("dropdown_content").getElementsByTagName("button")) {
        if (button.textContent.toUpperCase().indexOf(value) > -1) {
            e.target.value = button.textContent;
            filterDropdown();
            break;
        }
    }
});

Array.from(document.getElementById("dropdown_content").getElementsByTagName("button")).forEach(button => {
    button.addEventListener("click", e => {
        document.getElementById("court_county").value = e.target.textContent;
        filterDropdown();
    })
});

document.getElementById("add_money_maker").addEventListener("click", e => {
    e.target.setAttribute("data-showing", (Number(e.target.getAttribute("data-showing")) + 1) + "")
    document.getElementById("main_maker_name").style.display = "block";
    if (e.target.getAttribute("data-showing") == 2) document.getElementById("money_maker_b").style.display = "block";
    if (e.target.getAttribute("data-showing") == 3) document.getElementById("money_maker_c").style.display = "block";
})

document.getElementById("add_money_loser").addEventListener("click", e => {
    e.target.setAttribute("data-showing", (Number(e.target.getAttribute("data-showing")) + 1) + "")
    document.getElementById("main_loser_name").style.display = "block";
    if (e.target.getAttribute("data-showing") == 2) document.getElementById("money_loser_b").style.display = "block";
    if (e.target.getAttribute("data-showing") == 3) document.getElementById("money_loser_c").style.display = "block";
})

async function modifyPdf() {
    //const raw  = await fetch('/template.pdf')
    //const buf  = await raw.arrayBuffer();
    const doc  = await PDFDocument.load(files.template);
    const font = await doc.embedFont(StandardFonts.TimesRoman);
    const form = doc.getForm();

    const data = {};
    
    data.money_maker = [];
    data.money_loser = [];

    data.attorney   = {};
    data.main_loser = {};
    data.main_maker = {};
    data.poe        = {};
    
    data.attorney.name   = "William D. Schaub, P.C."
    data.attorney.city   = "";
    data.attorney.state  = "";
    data.attorney.street = "";
    data.attorney.phone  = "";
    data.attorney.zip    = "";
    data.attorney.bar    = "770697";

    data.oregon_counties = {
        ["BAKER"]: {
            city: "Baker City",
            zip: "97814",
            street: "1995 3rd",
            state: "Oregon",
            misc: "Ste. #220"
        },
        ["BENTON"]: {
            city: "Corvallis",
            zip: "97330",
            street: "120 NW 4th St",
            state: "Oregon",
            misc: ""
        },
        ["CLACKAMAS"]: {
            city: "Oregon City",
            zip: "97045",
            street: "807 Main St",
            state: "Oregon",
            misc: ""
        },
        ["CLATSOP"]: {
            city: "Astoria",
            zip: "97103",
            street: "749 Commercial St",
            state: "Oregon",
            misc: "Suite 6"
        },
        ["COLUMBIA"]: {
            city: "St Helens",
            zip: "97051",
            street: "230 Strand St",
            state: "Oregon",
            misc: ""
        },
        ["COOS"]: {
            city: "Coquille",
            zip: "97423",
            street: "250 N Baxter St",
            state: "Oregon",
            misc: ""
        },
        ["CROOK"]: {
            city: "Prineville",
            zip: "97754",
            street: "300 NE 3rd St",
            state: "Oregon",
            misc: "#21"
        },
        ["CURRY"]: {
            city: "Gold Beach",
            zip: "97444",
            street: "29821 Ellensburg Ave",
            state: "Oregon",
            misc: ""
        },
        ["DESCHUTES"]: {
            city: "Bend",
            zip: "97703",
            street: "1100 NW Bond St",
            state: "Oregon",
            misc: ""
        },
        ["DOUGLAS"]: {
            city: "Roseburg",
            zip: "97470",
            street: "1036 SE Douglas Ave",
            state: "Oregon",
            misc: "#201"
        },
        ["GILLIAM"]: {
            city: "Condon",
            zip: "97823",
            street: "221 S Oregon St",
            state: "Oregon",
            misc: ""
        },
        ["GRANT"]: {
            city: "Canyon City",
            zip: "97820",
            street: "201 S. Humbolt St",
            state: "Oregon",
            misc: ""
        },
        ["HARNEY"]: {
            city: "Burns",
            zip: "97720",
            street: "450 N Buena Vista Ave",
            state: "Oregon",
            misc: ""
        },
        ["HOOD RIVER"]: {
            city: "Hood River",
            zip: "97031",
            street: "309 E State St",
            state: "Oregon",
            misc: ""
        },
        ["JACKSON"]: {
            city: "Medford",
            zip: "97501",
            street: "100 S Oakdale Ave",
            state: "Oregon",
            misc: ""
        },
        ["JEFFERSON"]: {
            city: "Madras",
            zip: "97741",
            street: "129 SW E St",
            state: "Oregon",
            misc: ""
        },
        ["JOSEPHINE"]: {
            city: "Portland",
            zip: "97204",
            street: "1021 SW 4th Ave",
            state: "Oregon",
            misc: ""
        },
        ["KLAMATH"]: {
            city: "Klamath Falls",
            zip: "97601",
            street: "316 Main St",
            state: "Oregon",
            misc: ""
        },
        ["LAKE"]: {
            city: "Lakeview",
            zip: "97630",
            street: "513 Center Street",
            state: "Oregon",
            misc: ""
        },
        ["LANE"]: {
            city: "Eugene",
            zip: "97401",
            street: "125 E 8th Ave",
            state: "Oregon",
            misc: ""
        },
        ["LINCOLN"]: {
            city: "Newport",
            zip: "97365",
            street: "225 W Olive St",
            state: "Oregon",
            misc: "#201"
        },
        ["LINN"]: {
            city: "Albany",
            zip: "97321",
            street: "300 SW 4th Ave",
            state: "Oregon",
            misc: ""
        },
        ["MALHEUR"]: {
            city: "McMinnville",
            zip: "97128",
            street: "535 NE 5th St",
            state: "Oregon",
            misc: ""
        },
        ["MARION"]: {
            city: "Salem",
            zip: "97301",
            street: "100 High St NE",
            state: "Oregon",
            misc: ""
        },
        ["MORROW"]: {
            city: "Heppner",
            zip: "97836",
            street: "100 Court Street",
            state: "Oregon",
            misc: ""
        },
        ["MULTNOMAH"]: {
            city: "Portland",
            zip: "97204",
            street: "1200 SW 1st Ave",
            state: "Oregon",
            misc: ""
        },
        ["POLK"]: {
            city: "Dallas",
            zip: "97338",
            street: "850 S Main St",
            state: "Oregon",
            misc: ""
        },
        ["SHERMAN"]: {
            city: "Moro",
            zip: "97039",
            street: "500 Court St",
            state: "Oregon",
            misc: ""
        },
        ["TILLAMOOK"]: {
            city: "Tillamook",
            zip: "97141",
            street: "201 Laurel Ave",
            state: "Oregon",
            misc: ""
        },
        ["UMATILLA"]: {
            city: "Hermiston",
            zip: "97838",
            street: "915 SE Columbia Dr",
            state: "Oregon",
            misc: ""
        },
        ["UNION"]: {
            city: "La Grande",
            zip: "97850",
            street: "1105 K Ave",
            state: "Oregon",
            misc: ""
        },
        ["WALLOWA"]: {
            city: "Enterprise",
            zip: "97828",
            street: "101 S River Street",
            state: "Oregon",
            misc: "Room 204"
        },
        ["WASCO"]: {
            city: "The Dalles",
            zip: "97058",
            street: "511 Washington St",
            state: "Oregon",
            misc: "#201"
        },
        ["WASHINGTON"]: {
            city: "Hillsboro",
            zip: "97124",
            street: "145 NE 2nd Ave",
            state: "Oregon",
            misc: ""
        },
        ["WHEELER"]: {
            city: "Fossil",
            zip: "97830",
            street: "701 Adams St",
            state: "Oregon",
            misc: "#204"
        },
        ["YAMHILL"]: {
            city: "McMinnville",
            zip: "97128",
            street: "535 NE 5th St",
            state: "Oregon",
            misc: ""
        }
    }

    data.court_county   = document.getElementById("court_county").value.toUpperCase();
    data.account_number = document.getElementById("account_number").value.toUpperCase();
    data.case_number    = document.getElementById("case_number").value.toUpperCase();
    data.money_maker[0] = document.getElementById("money_maker_a").value.toUpperCase();
    data.money_maker[1] = document.getElementById("money_maker_b").value.toUpperCase();
    data.money_maker[2] = document.getElementById("money_maker_c").value.toUpperCase();
    data.money_loser[0] = document.getElementById("money_loser_a").value.toUpperCase();
    data.money_loser[1] = document.getElementById("money_loser_b").value.toUpperCase();
    data.money_loser[2] = document.getElementById("money_loser_c").value.toUpperCase();
    data.amount_owed    = document.getElementById("amount_owed").value.toUpperCase();
    
    let count = 0;
    
    for (const maker of data.money_maker) {
        if (maker != "") count++;
    }

    data.main_maker.name = count == 1 ? data.money_maker[0] : document.getElementById("main_maker_name").value.toUpperCase();

    data.main_maker.street = document.getElementById("main_maker_address_street").value.toUpperCase();
    data.main_maker.zip    = document.getElementById("main_maker_address_zip").value.toUpperCase();
    data.main_maker.misc   = document.getElementById("main_maker_address_misc").value.toUpperCase();

    count = 0;

    for (const maker of data.money_loser) {
        if (maker != "") count++;
    }

    data.main_loser.name = count == 1 ? data.money_loser[0] : document.getElementById("main_loser_name").value.toUpperCase();

    data.main_loser.ssn    = document.getElementById("main_loser_ssn").value.toUpperCase();
    data.main_loser.street = document.getElementById("main_loser_address_street").value.toUpperCase();
    data.main_loser.zip    = document.getElementById("main_loser_address_zip").value.toUpperCase();
    data.main_loser.misc   = document.getElementById("main_loser_address_misc").value.toUpperCase();

    let location = zips_database[data.main_loser.zip];

    data.main_loser.city   = location.city.toUpperCase();
    data.main_loser.county = location.county_name.toUpperCase();
    data.main_loser.state  = location.state_name.toUpperCase();

    location = zips_database[data.main_maker.zip];

    data.main_maker.city   = location.city.toUpperCase();
    data.main_maker.county = location.county_name.toUpperCase();
    data.main_maker.state  = location.state_name.toUpperCase();
    
    data.poe.name   = document.getElementById("poe_name").value.toUpperCase();
    data.poe.street = document.getElementById("poe_address_street").value.toUpperCase();
    data.poe.zip    = document.getElementById("poe_address_zip").value.toUpperCase();
    data.poe.misc   = document.getElementById("poe_address_misc").value.toUpperCase();

    location = zips_database[data.poe.zip];

    data.poe.city   = location.city.toUpperCase();
    data.poe.county = location.county_name.toUpperCase();
    data.poe.state  = location.state_name.toUpperCase();
    
    data.judgement_date = new Date(document.getElementById("judgement_date").value);
    data.debt_original = Number(document.getElementById("debt_original").value || "0");
    data.pre_interest  = Number(document.getElementById("pre_interest").value || "0");
    data.attorney_fee  = Number(document.getElementById("attorney_fee").value || "0");
    data.cost_fee      = Number(document.getElementById("cost_fee").value || "0");
    data.post_interest = Number(document.getElementById("post_interest").value || "0");
    data.delivery_fee_current = Number(document.getElementById("delivery_fee_current").value || "0");
    data.issuance_fee_current = Number(document.getElementById("issuance_fee_current").value || "0");
    data.search_fee_current   = Number(document.getElementById("search_fee_current").value || "0");
    data.search_fee_previous  = Number(document.getElementById("search_fee_previous").value || "0");
    data.sheriff_fee  = Number(document.getElementById("sheriff_fee").value || "0");
    data.party_fee    = Number(document.getElementById("party_fee").value || "0");
    data.research_fee = Number(document.getElementById("research_fee").value || "0");
    data.other_fee    = Number(document.getElementById("other_fee").value || "0");
    data.issuance_fee_previous = Number(document.getElementById("issuance_fee_previous").value || "0");
    data.delivery_fee_previous = Number(document.getElementById("delivery_fee_previous").value || "0");
    data.transcript_fee = Number(document.getElementById("transcript_fee").value || "0");
    data.branch_number  = document.getElementById("branch_number").value;
    data.calculation_date = new Date(document.getElementById("calculation_date").value);
    data.less_payments = Number(document.getElementById("less_payments").value || "0");
    
    form.getField("money_loser_a").setText(data.money_loser[0]);
    form.getField("money_loser_b").setText(data.money_loser[1]);
    form.getField("money_loser_c").setText(data.money_loser[2]);
    form.getField("money_maker_a").setText(data.money_maker[0]);
    form.getField("money_maker_b").setText(data.money_maker[1]);
    form.getField("money_maker_c").setText(data.money_maker[2]);

    form.getField("main_maker_name").setText(data.main_maker.name);
    form.getField("main_maker_address_street").setText(data.main_maker.street);
    form.getField("main_maker_address_city_state_zip").setText(`${data.main_maker.city}, ${data.main_maker.state}, ${data.main_maker.zip}`);
    form.getField("main_maker_address_misc").setText(data.main_maker.misc);

    if (data.money_maker.length == 1) {
        form.getField("money_maker_name_scrunch").setText(data.money_maker[0]);
    } else {
        form.getField("money_maker_name_scrunch").setText(data.money_maker[0] + data.money_maker[1] + data.money_maker[2]);
    }

    form.getField("court_address_street").setText(data.oregon_counties[data.court_county.toUpperCase()].street.toUpperCase());
    form.getField("court_address_city").setText(data.oregon_counties[data.court_county.toUpperCase()].city.toUpperCase());
    form.getField("court_address_county").setText(data.court_county.toUpperCase());
    form.getField("court_address_state").setText(data.oregon_counties[data.court_county.toUpperCase()].state.toUpperCase());
    form.getField("court_address_zip").setText(data.oregon_counties[data.court_county.toUpperCase()].zip);

    form.getField("poe_name").setText(data.poe.name);
    form.getField("poe_address_street").setText(data.poe.street);
    form.getField("poe_address_city_state_zip").setText(`${data.poe.city}, ${data.poe.state}, ${data.poe.zip}`);
    form.getField("poe_address_misc").setText(data.poe.misc);

    form.getField("main_loser_name").setText(data.main_loser.name);
    form.getField("main_loser_last_four_ssn").setText(data.main_loser.ssn);

    if (!(data.main_loser.street && data.main_loser.city && data.main_loser.state && data.main_loser.zip)) {
        form.getField("main_loser_address_missing").check();
    } else {
        form.getField("main_loser_address_street").setText(data.main_loser.street);
        form.getField("main_loser_address_city").setText(data.main_loser.city);
        form.getField("main_loser_address_state").setText(data.main_loser.state);
        form.getField("main_loser_address_zip").setText(data.main_loser.zip);
    }

    form.getField("attorney_name").setText(data.attorney.name.toUpperCase());
    form.getField("attorney_address_street")
    form.getField("attorney_address_city")
    form.getField("attorney_address_state")
    form.getField("attorney_address_zip")
    form.getField("attorney_address_telephone")
    form.getField("attorney_bar").setText(data.attorney.bar);

    form.getField("case_number").setText(data.case_number);
    form.getField("account_number").setText(data.account_number);
    form.getField("amount_owed").setText(data.amount_owed);

    form.getField("judgement_date_day_month").setText(`${data.judgement_date.getUTCMonth() + 1}/${data.judgement_date.getUTCDate()}`);
    form.getField("judgement_date_year").setText(`${data.judgement_date.getUTCFullYear()}`);
    
    form.getField("debt_original").setText(data.debt_original == 0 ? "" : data.debt_original.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
    form.getField("pre_interest").setText(data.pre_interest == 0 ? "" : data.pre_interest.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
    form.getField("attorney_fee").setText(data.attorney_fee == 0 ? "" : data.attorney_fee.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
    form.getField("cost_fee").setText(data.cost_fee == 0 ? "" : data.cost_fee.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
    form.getField("post_interest").setText(data.post_interest == 0 ? "" : data.post_interest.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
    form.getField("search_fee_current").setText(data.search_fee_current == 0 ? "" : data.search_fee_current.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
    form.getField("search_fee_previous").setText(data.search_fee_previous == 0 ? "" : data.search_fee_previous.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
    form.getField("sheriff_fee").setText(data.sheriff_fee == 0 ? "" : data.sheriff_fee.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
    form.getField("party_free").setText(data.party_fee == 0 ? "" : data.party_fee.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
    form.getField("research_fee").setText(data.research_fee == 0 ? "" : data.research_fee.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
    form.getField("other_fee").setText(data.other_fee == 0 ? "" : data.other_fee.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
    form.getField("issuance_fee_current").setText(data.issuance_fee_current == 0 ? "" : data.issuance_fee_current.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
    form.getField("delivery_fee_current").setText(data.delivery_fee_current == 0 ? "" : data.delivery_fee_current.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
    form.getField("delivery_fee_previous").setText(data.delivery_fee_previous == 0 ? "" : data.delivery_fee_previous.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
    form.getField("issuance_fee_previous").setText(data.issuance_fee_previous == 0 ? "" : data.issuance_fee_previous.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
    form.getField("transcript_fee").setText(data.transcript_fee == 0 ? "" : data.transcript_fee.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));

    const subtotal = data.debt_original +
                     data.pre_interest +
                     data.attorney_fee +
                     data.cost_fee +
                     data.post_interest +
                     data.search_fee_current +
                     data.search_fee_previous +
                     data.sheriff_fee  +
                     data.party_fee +
                     data.research_fee +
                     data.other_fee +
                     data.issuance_fee_current +
                     data.delivery_fee_current +
                     data.issuance_fee_previous  +
                     data.transcript_fee
    console.log(subtotal, data)
    form.getField("subtotal").setText(subtotal.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
    form.getField("less_payments").setText((data.less_payments || 0).toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
    form.getField("total_amount_owed").setText((subtotal - Number(data.less_payments || "0")).toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
    let str_num = ""+data.branch_number;
    form.getField("branch_number").setText(`(${str_num.slice(0, 3)}) ${str_num.slice(3,6)}-${str_num.slice(6,10)}`);

    const date = new Date();

    form.getField("todays_date").setText(`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`);
    form.getField("calculation_date_year").setText(`${(""+data.calculation_date.getUTCFullYear()).slice(1)}`);
    form.getField("calculation_date_day_month").setText(`${data.calculation_date.getUTCMonth() + 1}/${data.calculation_date.getUTCDate()}`);
    
    //const sig_fetch = await fetch("signature.png");
    //const sig_bytes = await sig_fetch.arrayBuffer();
    const sig = await doc.embedPng(files.signature);

    form.getField("signature_bounds").setImage(sig);

    form.updateFieldAppearances(font);

    //Serialize the PDFDocument to bytes (a Uint8Array)
    const bytes = await doc.save()

    //Trigger the browser to download the PDF document
    download(bytes, "pdf-lib_modification_example.pdf", "application/pdf");
}

main();