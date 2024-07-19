import express, {Express} from 'express'
import cors from'cors'
const morgan = require('morgan');
import dotenv from 'dotenv'
dotenv.config();
import tokenRoute from './src/routes/token';
import authRoute from './src/routes/account';
import schedulerRoute from './src/routes/schedule';
import telcoRoute from './src/routes/telcoprovider'
import epinRoutes from './src/routes/epin';
import { taskRunner } from './src/utils/scheduleRunner';

const app: Express = express();
const PORT = process.env.PORT || 3003;

taskRunner();

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(express.json({ limit: "20mb" }));
app.use(morgan("tiny"));

app.use('/token', tokenRoute);
app.use('/auth', authRoute);
app.use('/schedule', schedulerRoute);
app.use('/provider', telcoRoute);
app.use('/pin', epinRoutes);
// pullPgp("https://file.io/37JuDvMXZw3B", '/Users/Brobot/Downloads/eplinflinter/jumper.txt');
// deCryptPgp("/Users/Brobot/Downloads/eplinflinter/jumper.txt")
// deCryptPgp("/Users/Brobot/Downloads/eplinflinter/jumper.txt")
//     .then(({ decrypted }) => {
//         console.log('Decrypted data:', decrypted);
//     })
//     .catch(error => {
//         console.error('Decryption failed:', error);
//     });

// const duwal = encrypt('356890-00-0-677767');
// console.log(duwal, decrypt(duwal));

// generateKeys().catch(console.error);

// pullPgp('C:/Users/Brobot/OneDrive/Documents/N100-N100-PNGN_30062020_2342523406-2019006.txt','encrypt.pgp');
// deCryptPgp('encrypt.pgp');

// uploadEPinFiles('C:/Users/Brobot/OneDrive/Documents/N100-N100-PNGN_30062020_2342523406-2019006.txt')

// ftpHandleUpload("/N100-N100-PNGN_30062020_2342523406-2019006.txt");
app.listen(PORT, () => {
    console.log(`Service Running on PORT: ${PORT}`)
})