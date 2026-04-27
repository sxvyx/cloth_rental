const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('../Cloth Rental App – Project Documentation.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('../extracted_pdf.txt', data.text);
    console.log('PDF extracted to extracted_pdf.txt');
}).catch(function(error) {
    console.error('Error extracting PDF:', error);
});
