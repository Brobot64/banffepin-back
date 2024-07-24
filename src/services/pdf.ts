import { FileforgeClient } from '@fileforge/client';
import * as fs from 'fs';
import * as path from 'path';

export const generatePDF = async (inputs: any, res: any) => {
  const ff = new FileforgeClient({
    apiKey: `ce99441f-0b22-4a52-a002-950005e6bd94`,
  });

  try {
    const pdf = await ff.pdf.generate(
      [new File([inputs], 'index.html', { type: 'text/html' })],
      {
        options: {
          host: false,
        },
      },
      {
        timeoutInSeconds: 30,
      }
    );

    const tempFilePath = path.join(__dirname, 'results.pdf');
    const fileStream = pdf.pipe(fs.createWriteStream(tempFilePath));
    fileStream.on('finish', () => {
      res.download(tempFilePath, 'results.pdf', (err: any) => {
        if (err) {
          console.error('Error sending file:', err);
        }
        // Clean up temporary file
        fs.unlink(tempFilePath, (err) => {
          if (err) {
            console.error('Error deleting temp file:', err);
          }
        });
      });
    });
  } catch (error) {
    console.error('Error during PDF conversion:', error);
    res.status(500).send('An error occurred while generating the PDF');
  }
};

// app.post('/generate-pdf', async (req, res) => {
//   const { htmlContent } = req.body;
//   if (!htmlContent) {
//     return res.status(400).send('HTML content is required');
//   }

//   await generatePDF(htmlContent, res);
// });

