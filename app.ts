import { PDFDocument } from "pdf-lib";
import fs from "fs";

async function mergePDFs() {
    const pdf1 = await PDFDocument.load(fs.readFileSync("files_1.pdf"));
    const pdf2 = await PDFDocument.load(fs.readFileSync("files_2.pdf"));
    const mergedPdf = await PDFDocument.create();

    const copiedPages1 = await mergedPdf.copyPages(pdf1, pdf1.getPageIndices());
    copiedPages1.forEach((page) => mergedPdf.addPage(page));

    const copiedPages2 = await mergedPdf.copyPages(pdf2, pdf2.getPageIndices());
    copiedPages2.forEach((page) => mergedPdf.addPage(page));

    fs.writeFileSync("merged.pdf", await mergedPdf.save());
}

// mergePDFs();


async function splitPDF() {
    const pdfDoc = await PDFDocument.load(fs.readFileSync("files_1.pdf"));

    for (let i = 0; i < pdfDoc.getPageCount(); i++) {
        const newPdf = await PDFDocument.create();
        const [page] = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(page);

        fs.writeFileSync(`split_page_${i + 1}.pdf`, await newPdf.save());
    }
}

// splitPDF();


async function resizePDF() {
    const pdfDoc = await PDFDocument.load(fs.readFileSync("files_1.pdf"));
    const pages = pdfDoc.getPages();

    pages.forEach((page) => {
        page.setSize(400, 600); // กำหนดขนาดหน้าเป็น 400x600 px
    });

    fs.writeFileSync("resized.pdf", await pdfDoc.save());
}

// resizePDF();


async function compressPDF() {
    const pdfDoc = await PDFDocument.load(fs.readFileSync("files_1.pdf"), { updateMetadata: false });
    const pages = pdfDoc.getPages();

    pages.forEach((page) => {
        page.setSize(page.getWidth() * 0.8, page.getHeight() * 0.8); // ลดขนาดหน้า PDF
    });

    fs.writeFileSync("compressed.pdf", await pdfDoc.save({ useObjectStreams: false }));
}

compressPDF();
