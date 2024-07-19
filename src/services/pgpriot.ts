import fs from 'fs';
import * as openpgp from 'openpgp';
import dotenv from 'dotenv';
dotenv.config();

const privatePgpKey = process.env.PGP_PRIVATE_KEY || '';
const publicPgpKey = process.env.PGP_PUBLIC_KEY || '';
const passPgpPhrase = process.env.PGP_PASS_PHRASE || '';

const fetchLue = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer); // Return the buffer directly
}

export const pullPgp = async (url: string, path: string) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }
        
        const flint = await fetchLue(url);
        const fileStream = fs.createWriteStream(path);

        return new Promise((resolve: any, reject: any) => {
            fileStream.write(flint, (err: any) => {
                if (err) {
                    reject(err);
                    return;
                }
                fileStream.close((closeErr: any) => {
                    if (closeErr) {
                        reject(closeErr);
                    } else {
                        console.log("file downloaded!!");
                        resolve();
                    }
                })
            })
        })
        // @ts-ignore
        fs.writeFileSync(path, buffer);
        console.log(`File saved to ${path}`);
    } catch (error: any) {
        console.error(`Error fetching or saving file: ${error.message}`);
    }
};

export const deCryptPgp = async (pgpFilePath: any) => {
    const encryptedData = fs.readFileSync(pgpFilePath, 'utf8');
    const publicKey = await openpgp.readKey({ armoredKey: `${publicPgpKey}` })
    const privateKey = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({ armoredKey: `${privatePgpKey}` }),
        passphrase: `${passPgpPhrase}`
    });
    const message = await openpgp.readMessage({
        armoredMessage: encryptedData // parse armored message
    });

    const { data: decrypted, signatures } = await openpgp.decrypt({
        message,
        decryptionKeys: privateKey,
        expectSigned: true,
        verificationKeys: publicKey,
    })
    return {decrypted}
}

export const generateKeys = async () => {
    const { privateKey, publicKey } = await openpgp.generateKey({
        type: 'rsa', // Type of the key, e.g., RSA
        rsaBits: 4096, // Number of bits for RSA keys
        userIDs: [{ name: 'Banffpay', email: 'banffpay@webmail.africa.com' }], // User ID
        passphrase: passPgpPhrase // Passphrase to protect the private key
    });

    // Save the keys to files
    fs.writeFileSync('publicKey.asc', publicKey, 'utf8');
    fs.writeFileSync('privateKey.asc', privateKey, 'utf8');
}


export const localCreatePgp = async (url: string, path: string) => {
    try {
        const text = fs.readFileSync(url, 'utf8');
        const publicKey = await openpgp.readKey({ armoredKey: publicPgpKey });

        // Read the private key and decrypt it using the passphrase
        const privateKey = await openpgp.decryptKey({
            privateKey: await openpgp.readPrivateKey({ armoredKey: privatePgpKey }),
            passphrase: passPgpPhrase
        });

        // Encrypt the message
        const encrypted = await openpgp.encrypt({
            message: await openpgp.createMessage({ text }), // input as Message object
            encryptionKeys: publicKey,
            signingKeys: privateKey // optional
        });

        fs.writeFileSync(path, encrypted, 'utf8');

        return;
    } catch (error: any) {
        console.error(`Error fetching or saving file: ${error.message}`);
    }
};

export const allWrap = async (url: string, path: string) => {
    try {
        const pull = await pullPgp(url, path);
        const depull = await deCryptPgp(path);
        return
    } catch (error: any) {
        
    }
}