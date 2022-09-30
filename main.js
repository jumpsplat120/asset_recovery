const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib

async function modifyPdf() {
    const raw  = await fetch('https://raw.githubusercontent.com/jumpsplat120/asset_recovery/cfb47bbff3169090110dbd0b97de8d5fca0ace0f/2022%20BLANK%20WRIT.pdf')
    const buf  = await raw.arrayBuffer();
    const doc  = await PDFDocument.load(arr_buf);
    const font = await doc.embedFont(StandardFonts.TimesRoman);
    const form = doc.getForm();

    court_address_street = form.getField("court_address_street");
    
    court_address_street.setText("Woo");

    for (const field of form.getFields()) {
        if (field.getText) {
            console.log(`textbox: ${field.getName()}`)
        } else if (field.check) {
            console.log(`checkbox: ${field.getName()}`)
        } else {
            console.log(`?: ${field.getName()}`)
        }
    }
    //embed font
    //const font = await doc.embedFont(StandardFonts.TimesRoman);

    // Get the first page of the document
    //const pages = doc.getPages()
    //const firstPage = pages[0]

    // Get the width and height of the first page
    //const { width, height } = firstPage.getSize()

    //// Draw a string of text diagonally across the first page
    //firstPage.drawText('This text was added with JavaScript!', {
    //    x: 5,
    //    y: height / 2 + 300,
    //    size: 50,
    //    font: font,
    //    color: rgb(0.95, 0.1, 0.1),
    //    rotate: degrees(-45),
    //})
    
    form.updateFieldAppearances(font);

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const bytes = await doc.save()

    // Trigger the browser to download the PDF document
    download(bytes, "pdf-lib_modification_example.pdf", "application/pdf");
}