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

//wait for a func to return true
async function waitFor(func) {
    function wrapper(done) {
        if (func()) {
            done();
        } else {
            setTimeout(wrapper, 0, done);
        }
    }

    return new Promise(done => {
        setTimeout(wrapper, 0, done);
    });
}

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
    const data = {};

    data.money_maker = [];
    data.money_loser = [];

    data.attorney   = {};
    data.main_loser = {};
    data.main_maker = {};
    data.poe        = {};
    data.fee        = {};
    data.files      = {};
    data.date       = {};

    data.fee.interest = {};
    data.fee.delivery = {};
    data.fee.issuance = {};
    data.fee.search   = {};

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

    //template and signature loads files into data.
    listen("change", e => {
        const reader = new FileReader();
        const name   = e.target.id;
        
        reader.addEventListener("load", async (e) => { data.files[name] = e.target.result; });

        reader.readAsArrayBuffer(e.target.files[0]);
    }, "signature", "template");

    //Clicking save button saves pdf to desktop
    listen("click", async (e) => {
        await waitFor(_ => data.files.template);
        const doc  = await PDFDocument.load(data.files.template);
        const font = await doc.embedFont(StandardFonts.TimesRoman);
        const form = doc.getForm();
        
        let subtotal, str_num, location;
        
        data.attorney.name   = "William D. Schaub, P.C."
        data.attorney.city   = "";
        data.attorney.state  = "";
        data.attorney.street = "";
        data.attorney.phone  = "";
        data.attorney.zip    = "";
        data.attorney.bar    = "770697";

        for (const [key, value] of Object.entries(data.attorney)) {
            data[key] = value.toUpperCase();
        }
        //get all html inputs
        data.court_county   = getValue("court_county");
        data.account_number = getValue("account_number");
        data.case_number    = getValue("case_number");
        data.money_maker[0] = getValue("money_maker_a");
        data.money_maker[1] = getValue("money_maker_b");
        data.money_maker[2] = getValue("money_maker_c");
        data.money_loser[0] = getValue("money_loser_a");
        data.money_loser[1] = getValue("money_loser_b");
        data.money_loser[2] = getValue("money_loser_c");
        //data.amount_owed  = getValue("amount_owed");
        data.main_maker.street = getValue("main_maker_address_street");
        data.main_maker.zip    = getValue("main_maker_address_zip");
        data.main_maker.misc   = getValue("main_maker_address_misc");
        data.main_loser.ssn    = getValue("main_loser_ssn");
        data.main_loser.street = getValue("main_loser_address_street");
        data.main_loser.zip    = getValue("main_loser_address_zip");
        data.main_loser.misc   = getValue("main_loser_address_misc");
        data.poe.name   = getValue("poe_name");
        data.poe.street = getValue("poe_address_street");
        data.poe.zip    = getValue("poe_address_zip");
        data.poe.misc   = getValue("poe_address_misc");
        data.fee.original_debt = Number(getValue("debt_original") || 0);
        data.fee.less_payments = Number(getValue("less_payments") || 0);
        data.fee.transcript = Number(getValue("transcript_fee") || 0);
        data.fee.attorney   = Number(getValue("attorney_fee") || 0);
        data.fee.cost       = Number(getValue("cost_fee") || 0);
        data.fee.sheriff    = Number(getValue("sheriff_fee") || 0);
        data.fee.party      = Number(getValue("party_fee") || 0);
        data.fee.research   = Number(getValue("research_fee") || 0);
        data.fee.other      = Number(getValue("other_fee") || 0);
        data.fee.interest.pre      = Number(getValue("pre_interest") || 0);
        data.fee.interest.post     = Number(getValue("post_interest") || 0);
        data.fee.delivery.current  = Number(getValue("delivery_fee_current") || 0);
        data.fee.issuance.current  = Number(getValue("issuance_fee_current") || 0);
        data.fee.search.current    = Number(getValue("search_fee_current") || 0);
        data.fee.issuance.previous = Number(getValue("issuance_fee_previous") || 0);
        data.fee.delivery.previous = Number(getValue("delivery_fee_previous") || 0);
        data.fee.search.previous   = Number(getValue("search_fee_previous") || 0);
        data.date.calculation = new Date(getValue("calculation_date"));
        data.date.judgement   = new Date(getValue("judgement_date"));
        data.branch_number    = getValue("branch_number");

        data.main_maker.name = data.money_maker.length == 1 ? data.money_maker[0] : getValue("main_maker_name");
        data.main_loser.name = data.money_loser.length == 1 ? data.money_loser[0] : getValue("main_loser_name");

        location = zips_database[data.main_loser.zip];

        data.main_loser.city   = location?.city.toUpperCase();
        data.main_loser.county = location?.county_name.toUpperCase();
        data.main_loser.state  = location?.state_name.toUpperCase();

        location = zips_database[data.main_maker.zip];

        data.main_maker.city   = location?.city.toUpperCase();
        data.main_maker.county = location?.county_name.toUpperCase();
        data.main_maker.state  = location?.state_name.toUpperCase();

        location = zips_database[data.poe.zip];

        data.poe.city   = location?.city.toUpperCase();
        data.poe.county = location?.county_name.toUpperCase();
        data.poe.state  = location?.state_name.toUpperCase();

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
            form.getField("money_maker_name_scrunch").setText(`${data.money_maker[0]}, ${data.money_maker[1]}, ${data.money_maker[2]}`);
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
        form.getField("main_loser_last_four_ssn").setText(`${data.main_loser.ssn.slice(0, 4)}-${data.main_loser.ssn.slice(4,6)}-${data.main_loser.ssn.slice(6,10)}`);

        if (!(data.main_loser.street && data.main_loser.city && data.main_loser.state && data.main_loser.zip)) {
            form.getField("main_loser_address_missing").check();
            form.getField("main_loser_address_street").setText("UNKNOWN");
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

        form.getField("judgement_date_day_month").setText(`${data.date.judgement.getUTCMonth() + 1}/${data.date.judgement.getUTCDate()}`);
        form.getField("judgement_date_year").setText(`${data.date.judgement.getUTCFullYear()}`);
        
        form.getField("debt_original").setText(data.fee.original_debt == 0 ? "" : data.fee.original_debt.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
        form.getField("pre_interest").setText(data.fee.interest.pre == 0 ? "" : data.fee.interest.pre.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
        form.getField("attorney_fee").setText(data.fee.attorney == 0 ? "" : data.fee.attorney.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
        form.getField("cost_fee").setText(data.fee.cost == 0 ? "" : data.fee.cost.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
        form.getField("post_interest").setText(data.fee.interest.post == 0 ? "" : data.fee.interest.post.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
        form.getField("search_fee_current").setText(data.fee.search.current == 0 ? "" : data.fee.search.current.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
        form.getField("search_fee_previous").setText(data.fee.search.previous == 0 ? "" : data.fee.search.previous.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
        form.getField("sheriff_fee").setText(data.fee.sheriff == 0 ? "" : data.fee.sheriff.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
        form.getField("party_free").setText(data.fee.party == 0 ? "" : data.fee.party.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
        form.getField("research_fee").setText(data.fee.research == 0 ? "" : data.fee.research.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
        form.getField("other_fee").setText(data.fee.other == 0 ? "" : data.fee.other.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
        form.getField("issuance_fee_current").setText(data.fee.issuance.current   == 0 ? "" : data.fee.issuance.current.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
        form.getField("delivery_fee_current").setText(data.fee.delivery.current   == 0 ? "" : data.fee.delivery.current.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
        form.getField("delivery_fee_previous").setText(data.fee.delivery.previous == 0 ? "" : data.fee.delivery.previous.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
        form.getField("issuance_fee_previous").setText(data.fee.issuance.previous == 0 ? "" : data.fee.issuance.previous.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
        form.getField("transcript_fee").setText(data.fee.transcript == 0 ? "" : data.fee.transcript.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));

        subtotal  = data.fee.original_debt;
        subtotal += data.fee.transcript;
        subtotal += data.fee.attorney;
        subtotal += data.fee.cost;
        subtotal += data.fee.sheriff;
        subtotal += data.fee.party;
        subtotal += data.fee.research;
        subtotal += data.fee.other;
        subtotal += data.fee.interest.pre;
        subtotal += data.fee.interest.post;
        subtotal += data.fee.delivery.current;
        subtotal += data.fee.issuance.current;
        subtotal += data.fee.search.current;
        subtotal += data.fee.issuance.previous;
        subtotal += data.fee.delivery.previous;
        subtotal += data.fee.search.previous;

        str_num = data.branch_number?.toString() || "";

        form.getField("subtotal").setText(subtotal.toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
        form.getField("less_payments").setText((data.fee.less_payments || 0).toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
        form.getField("total_amount_owed").setText((subtotal - Number(data.fee.less_payments || "0")).toLocaleString("en-us",{useGrouping:true, minimumFractionDigits:2}));
        form.getField("branch_number").setText(`(${str_num.slice(0, 3)}) ${str_num.slice(3,6)}-${str_num.slice(6,10)}`);

        const date = new Date();

        form.getField("todays_date").setText(`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`);
        form.getField("calculation_date_year").setText(`${(""+data.date.calculation.getUTCFullYear()).slice(1)}`);
        form.getField("calculation_date_day_month").setText(`${data.date.calculation.getUTCMonth() + 1}/${data.date.calculation.getUTCDate()}`);
        
        await waitFor(_=> data.files.signature);
        const sig = await doc.embedPng(data.files.signature);

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