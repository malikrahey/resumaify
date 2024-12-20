import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
const htmlToPdfmake = require('html-to-pdfmake');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;


(<any>pdfMake).addVirtualFileSystem(pdfFonts);

export default async function generatePdf(content: string) {
  let result: Buffer;
  const { window } = new JSDOM(``);
  const converted = htmlToPdfmake(content, { window });
  const docDefinition = { content: converted };

  // Generate PDF
  result = await new Promise((resolve, reject) => {
    pdfMake.createPdf(docDefinition).getBuffer((buffer: Buffer) => {
      if (buffer) {
        resolve(buffer);
      } else {
        reject(new Error('Buffer generation failed'));
      }
    });
  });

  return result;
}