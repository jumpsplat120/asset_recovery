const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib

class CustomError extends Error {
    constructor(...message) {
        super(...message);
        if (this.constructor === CustomError) {
            throw new AbstractError("Unable to instantiate the 'CustomError' class directly.");
        } else {
            this.name = this.constructor.name;
        }
    }

    toString() { return `${this.name}: ${this.message}`; }
}

class AbstractError extends CustomError {
    constructor(m = "This is an abstract class, and can not be instantiated directly.", ...essage) {
        super(m, ...essage);
    }
}

class AlertError extends CustomError {
    constructor(...message) {
        super(message);

        let alert_msg = "Error! ";

        for (const val of message) {
            alert_msg = `${alert_msg} ${val.toString()}`
        }

        alert(alert_msg);
    }
}

class County {
    #name;
    #city;
    #zip;
    #street;
    #state;
    #misc;

    constructor(name, city, zip, street, state, misc) {
        this.#name   = name;
        this.#city   = city;
        this.#zip    = Number(zip);
        this.#street = street;
        this.#state  = state;
        this.#misc   = misc;
        
        if (!this.#name) throw new AlertError("County is missing county name.");
        if (!this.#city) throw new AlertError(`${this.#name} is missing a city.`);
        if (!this.#zip)  throw new AlertError(`${this.#name} is missing a zip.`);
        if (this.#zip == NaN) throw new AlertError(`${this.#name} has an invalid zip; ${this.zip}`);
        if (this.#zip.toString().length != 5) throw new AlertError(`${this.#name} has a zip code of an invalid length. Zip codes should be 5 digits long, but '${this.zip}' is ${this.zip.toString().length} digits long.`);
        if (!this.#street) throw new AlertError(`${this.#name} is missing a street address.`);
        if (!this.#state) throw new  AlertError(`${this.#name} is missing a state.`);
        if (this.#state.length == 2) throw new AlertError(`${this.#name}'s state is using two character state notation. The full state name should be entered.`);
        
        const lookup = zips_database[this.#zip.toString()];

        if (!lookup) throw new AlertError(`${this.#name} has an invalid zip code.`);
        if (lookup.state_name.toLowerCase() != this.#state.toLowerCase()) throw new AlertError(`${this.#name}'s state did not match state in zips database. Lookup found ${lookup.state_name}, but County object has ${this.#state}.`);
        if (lookup.city.toLowerCase() != this.#city.toLowerCase()) throw new AlertError(`${this.#name}'s city did not match city in zips database. Lookup found ${lookup.city}, but County object has ${this.#city}.`);
        if (lookup.county_name.toLowerCase() != this.#name.toLowerCase()) throw new AlertError(`${this.#name}'s county did not match county in zips database. Lookup found ${lookup.county_name}, but County object has ${this.#name}.`);
    }

    get name() { return this.#name.toUpperCase(); }
    get city() { return this.#city.toUpperCase(); }
    get zip()  { return this.#zip.toString();     }
    get street() { return this.#street.toUpperCase(); }
    get state()  { return this.#state.toUpperCase();  }
    get misc()   { return this.#misc.toUpperCase();   }

    get state_shortcode() { return zips_database[this.#zip.toString()].state_id; }
}

const elements       = {}
const court_counties = {}

court_counties.baker     = new County("Baker", "Baker City", 97814, "1995 3rd St", "Oregon", "Ste. 220");
court_counties.benton    = new County("Benton", "Corvallis", 97330, "120 NW 4th St", "Oregon");
court_counties.clackamas = new County("Clackamas", "Oregon City", 97045, "807 Main St", "Oregon");
court_counties.clatsop   = new County("Clatsop", "Astoria", 97103, "749 Commercial St", "Oregon", "Ste. 6");
court_counties.columbia  = new County("Columbia", "Saint Helens", 97051, "230 Strand St", "Oregon");
court_counties.coos      = new County("Coos", "Coquille", 97423, "250 N Baxter St", "Oregon");
court_counties.crook     = new County("Crook", "Prineville", 97754, "300 NE 3rd St", "Oregon", "#21");
court_counties.curry     = new County("Curry", "Gold Beach", 97444, "29821 Ellensburg Ave", "Oregon");
court_counties.deschutes = new County("Deschutes", "Bend", 97703, "1100 NW Bond St", "Oregon");
court_counties.douglas   = new County("Douglas", "Roseburg", 97470, "1036 SE Douglas Ave", "Oregon", "#201");
court_counties.gilliam   = new County("Gilliam", "Condon", 97823, "221 S Oregon St", "Oregon");
court_counties.grant     = new County("Grant", "Canyon City", 97820, "201 S Humbolt St", "Oregon");
court_counties.harney    = new County("Harney", "Burns", 97720, "450 N Buena Vista Ave", "Oregon");
court_counties["HOOD RIVER"] = new County("Hood River", "Hood River", 97031, "309 E State St", "Oregon");
court_counties.jackson   = new County("Jackson", "Medford", 97501, "100 S Oakdale Ave", "Oregon");
court_counties.jefferson = new County("Jefferson", "Madras", 97741, "129 SW E St", "Oregon");
court_counties.josephine = new County("Josephine", "Grants Pass", 97526, "500 NW 6th Street", "Oregon");
court_counties.klamath = new County("Klamath", "Klamath Falls", 97601, "316 Main St", "Oregon");
court_counties.lake    = new County("Lake", "Lakeview", 97630, "513 Center St", "Oregon");
court_counties.lane    = new County("Lane", "Eugene", 97401, "125 E 8th Ave", "Oregon");
court_counties.lincoln = new County("Lincoln", "Newport", 97365, "225 W Olive St", "Oregon", "#201");
court_counties.linn    = new County("Linn", "Albany", 97321, "300 SW 4th Ave", "Oregon");
court_counties.malheur = new County("Malheur", "Vale", 97918, "251 B St W", "Oregon");
court_counties.marion  = new County("Marion", "Salem", 97301, "100 High St NE", "Oregon");
court_counties.morrow     = new County("Morrow", "Heppner", 97836, "100 Court St", "Oregon");
court_counties.multnomah  = new County("Multnomah", "Portland", 97204, "1200 SW 1st Ave", "Oregon");
court_counties.polk       = new County("Polk", "Dallas", 97338, "850 S Main St", "Oregon");
court_counties.sherman    = new County("Sherman", "Moro", 97039, "500 Court St", "Oregon");
court_counties.tillamook  = new County("Tillamook", "Tillamook", 97141, "201 Laurel Ave", "Oregon");
court_counties.umatilla   = new County("Umatilla", "Hermiston", 97838, "915 SE Columbia Dr", "Oregon");
court_counties.union      = new County("Union", "La Grande", 97850, "1105 K Ave", "Oregon");
court_counties.wallowa    = new County("Wallowa", "Enterprise", 97828, "101 S River St", "Oregon", "#204");
court_counties.wasco      = new County("Wasco", "The Dalles", 97058, "511 Washington St", "Oregon", "#201");
court_counties.washington = new County("Washington", "Hillsboro", 97124, "145 NE 2nd Ave", "Oregon");
court_counties.wheeler = new County("Wheeler", "Fossil", 97830, "701 Adams St", "Oregon", "#204");
court_counties.yamhill = new County("Yamhill", "McMinnville", 97128, "535 NE 5th St", "Oregon");

//Function to filter which buttons should show when
//typing in court dropdown
function filterDropdown() {
    const value   = eid("court_county").value.toUpperCase();
    const content = eid("dropdown_content");

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

//Memoize elements, and shorten event listener code
function listen(event, func, ...el_array) {
    for (const element_id of el_array) {
        const element = elements[element_id] || document.getElementById(element_id);

        elements[element_id] = element;

        element.addEventListener(event, func);
    }
}

//get element by id, memoize
function eid(id) { 
    const element = elements[id] || document.getElementById(id);

    elements[id] = element;

    return element;
}

//get the uppercase value of an id.
function getValue(id) {
    const entry = eid(id).value.toUpperCase();

    return entry == "" ? undefined : entry;
}

async function main() {
    //Add event to add text to input when clicking button dropdown
    for (const button of eid("dropdown_content").getElementsByTagName("button")) {
        button.addEventListener("click", e => {
            eid("court_county").value = e.target.textContent;
            filterDropdown();
        });
    }

    //Typing in county triggers filter
    listen("input", filterDropdown, "court_county");

    //Pressing enter auto adds the first entry of the showing options to the input
    listen("keydown", e => {
        if (e.key != "Enter") return;

        const value = e.target.value.toUpperCase();

        for (const button of eid("dropdown_content").getElementsByTagName("button")) {
            if (button.textContent.toUpperCase().indexOf(value) > -1) {
                e.target.value = button.textContent;
                filterDropdown();
                break;
            }
        }
    }, "court_county");

    //Add plaintiff/defendant buttons
    listen("click", e => {
        const type = e.target.id.split("_")[1];
        e.target.setAttribute("data-showing", (Number(e.target.getAttribute("data-showing")) + 1) + "")
        eid(`main_${type}_name`).style.display = "block";
        if (e.target.getAttribute("data-showing") == 2) eid(`money_${type}_b`).style.display = "block";
        if (e.target.getAttribute("data-showing") == 3) eid(`money_${type}_c`).style.display = "block";
    }, "add_money_maker", "add_money_maker");

    //Clicking save button saves pdf to desktop
    listen("click", async (e) => {
        const raw  = await fetch('/template.pdf');
        const buf  = await raw.arrayBuffer();
        const doc  = await PDFDocument.load(buf);
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

        data.court_county   = eid("court_county").value.toUpperCase();
        data.account_number = eid("account_number").value.toUpperCase();
        data.case_number    = eid("case_number").value.toUpperCase();
        data.money_maker[0] = eid("money_maker_a").value.toUpperCase();
        data.money_maker[1] = eid("money_maker_b").value.toUpperCase();
        data.money_maker[2] = eid("money_maker_c").value.toUpperCase();
        data.money_loser[0] = eid("money_loser_a").value.toUpperCase();
        data.money_loser[1] = eid("money_loser_b").value.toUpperCase();
        data.money_loser[2] = eid("money_loser_c").value.toUpperCase();
        data.amount_owed    = eid("amount_owed").value.toUpperCase();
        
        let count = 0;
        
        for (const maker of data.money_maker) {
            if (maker != "") count++;
        }

        data.main_maker.name = count == 1 ? data.money_maker[0] : eid("main_maker_name").value.toUpperCase();

        data.main_maker.street = eid("main_maker_address_street").value.toUpperCase();
        data.main_maker.zip    = eid("main_maker_address_zip").value.toUpperCase();
        data.main_maker.misc   = eid("main_maker_address_misc").value.toUpperCase();

        count = 0;

        for (const maker of data.money_loser) {
            if (maker != "") count++;
        }

        data.main_loser.name = count == 1 ? data.money_loser[0] : eid("main_loser_name").value.toUpperCase();

        data.main_loser.ssn    = eid("main_loser_ssn").value.toUpperCase();
        data.main_loser.street = eid("main_loser_address_street").value.toUpperCase();
        data.main_loser.zip    = eid("main_loser_address_zip").value.toUpperCase();
        data.main_loser.misc   = eid("main_loser_address_misc").value.toUpperCase();

        let location = zips_database[data.main_loser.zip];

        data.main_loser.city   = location.city.toUpperCase();
        data.main_loser.county = location.county_name.toUpperCase();
        data.main_loser.state  = location.state_name.toUpperCase();

        location = zips_database[data.main_maker.zip];

        data.main_maker.city   = location.city.toUpperCase();
        data.main_maker.county = location.county_name.toUpperCase();
        data.main_maker.state  = location.state_name.toUpperCase();
        
        data.poe.name   = eid("poe_name").value.toUpperCase();
        data.poe.street = eid("poe_address_street").value.toUpperCase();
        data.poe.zip    = eid("poe_address_zip").value.toUpperCase();
        data.poe.misc   = eid("poe_address_misc").value.toUpperCase();

        location = zips_database[data.poe.zip];

        data.poe.city   = location.city.toUpperCase();
        data.poe.county = location.county_name.toUpperCase();
        data.poe.state  = location.state_name.toUpperCase();
        
        data.judgement_date = new Date(eid("judgement_date").value);
        data.debt_original = Number(eid("debt_original").value || "0");
        data.pre_interest  = Number(eid("pre_interest").value || "0");
        data.attorney_fee  = Number(eid("attorney_fee").value || "0");
        data.cost_fee      = Number(eid("cost_fee").value || "0");
        data.post_interest = Number(eid("post_interest").value || "0");
        data.delivery_fee_current = Number(eid("delivery_fee_current").value || "0");
        data.issuance_fee_current = Number(eid("issuance_fee_current").value || "0");
        data.search_fee_current   = Number(eid("search_fee_current").value || "0");
        data.search_fee_previous  = Number(eid("search_fee_previous").value || "0");
        data.sheriff_fee  = Number(eid("sheriff_fee").value || "0");
        data.party_fee    = Number(eid("party_fee").value || "0");
        data.research_fee = Number(eid("research_fee").value || "0");
        data.other_fee    = Number(eid("other_fee").value || "0");
        data.issuance_fee_previous = Number(eid("issuance_fee_previous").value || "0");
        data.delivery_fee_previous = Number(eid("delivery_fee_previous").value || "0");
        data.transcript_fee = Number(eid("transcript_fee").value || "0");
        data.branch_number  = eid("branch_number").value;
        data.calculation_date = new Date(eid("calculation_date").value);
        data.less_payments = Number(eid("less_payments").value || "0");
        
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

        const county = court_counties[data.court_county.toLowerCase()];

        form.getField("court_address_street").setText(county.street);
        form.getField("court_address_city").setText(county.city);
        form.getField("court_address_county").setText(county.name);
        form.getField("court_address_state").setText(county.state);
        form.getField("court_address_zip").setText(county.zip);

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

        let subtotal  = data.debt_original
            subtotal += data.pre_interest
            subtotal += data.attorney_fee
            subtotal += data.cost_fee
            subtotal += data.post_interest
            subtotal += data.search_fee_current
            subtotal += data.search_fee_previous
            subtotal += data.sheriff_fee 
            subtotal += data.party_fee
            subtotal += data.research_fee
            subtotal += data.other_fee
            subtotal += data.issuance_fee_current
            subtotal += data.delivery_fee_current
            subtotal += data.issuance_fee_previous 
            subtotal += data.transcript_fee

        form.getField("subtotal").setText(subtotal.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
        form.getField("less_payments").setText((data.less_payments || 0).toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
        form.getField("total_amount_owed").setText((subtotal - Number(data.less_payments || "0")).toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
        let str_num = data.branch_number.toString();
        form.getField("branch_number").setText(`(${str_num.slice(0, 3)}) ${str_num.slice(3,6)}-${str_num.slice(6,10)}`);

        const date = new Date();

        form.getField("todays_date").setText(`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`);
        form.getField("calculation_date_year").setText(`${(""+data.calculation_date.getUTCFullYear()).slice(1)}`);
        form.getField("calculation_date_day_month").setText(`${data.calculation_date.getUTCMonth() + 1}/${data.calculation_date.getUTCDate()}`);
        
        const sig_fetch = await fetch("signature.png");
        const sig_bytes = await sig_fetch.arrayBuffer();
        const sig = await doc.embedPng(sig_bytes);

        form.getField("signature_bounds").setImage(sig);

        form.updateFieldAppearances(font);

        //Serialize the PDFDocument to bytes (a Uint8Array)
        const bytes = await doc.save()

        //Trigger the browser to download the PDF document
        download(bytes, "filled_writ.pdf", "application/pdf");
    }, "save_pdf");
}

//Fire after everything has loaded
document.addEventListener('readystatechange', e => {
    if (e.target.readyState === "complete") {
        main();
    }
});