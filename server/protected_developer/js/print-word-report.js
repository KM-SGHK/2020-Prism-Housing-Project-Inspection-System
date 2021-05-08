// (Step 1) Install DOCX and FileSaver CDNs


// (Step 2) Create / save document when click
document.getElementById("generate-report").addEventListener("click",
    async (event) => {
        await generateWordDocument(event);
    }, false
)


// (Step 3) define new doc and  function
async function generateWordDocument(event) {
    event.preventDefault();
    
    // Create a new instance of Document for the docx module
    let doc = new docx.Document();
    
    // Word file的內容
    doc.addSection({
        properties: {},
        children: [
            new docx.Paragraph({
                children: [
                    new docx.TextRun({
                        text: "Building Inspection Report",
                        bold: true,
                    }),
                    new docx.TextRun({
                        text: "\n\tClient:\tTecky Properties Deveopment Limited",
                        text: "\n\tProperty Name:\tThe Carmel",
                        text: "\n\tProperty Location:\t 168 Castle Peak Road (Tai Lam), Tai Lam",
                    }),
                ],
            }),
        ],
    });

    // doc.addSection({
    //     children: [
    //         new docx.Paragraph({
    //             children: [
    //                 new TextRun("Hello World")
    //             ],
    //         }),
    //     ],
    // });


    // Call saveDocumentToFile with the document instance and a filename
    await saveDocumentToFile(doc, "New Document - Project2.docx");
}


// (Step 4) 轉type然後save
async function saveDocumentToFile(doc, fileName) {

    // Create a mime type that will associate the new file with Microsoft Word
    const mimeType =
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    
    // Create a Blob containing the Document instance and the mimeType
    docx.Packer.toBlob(doc).then(blob => {
        console.log(blob);
        const docblob = blob.slice(0, blob.size, mimeType);
        console.log(docblob);
        // Save the file using saveAs from the file-saver package
        saveAs(docblob, fileName);
    })
}






/* Ref for generating docs / pdfs */

// use puppeteer instead
// https://blog.risingstack.com/pdf-from-html-node-js-puppeteer/


/* yarn add browserify first to require() modules at frontend */

// (Step 1) Import dependencies needed to create a Word document
// const docx = require("docx");
// const saveAs = require("file-saver");
// import { Document, Packer } from "docx";
// import { saveAs } from "file-saver";

// How to create a Word document with JavaScript?
//  https://www.iainfreestone.com/how-to-create-a-word-document-with-javascript/
// DOCX 
//  https://docx.js.org/#/?id=installation

