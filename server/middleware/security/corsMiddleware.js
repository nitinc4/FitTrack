import cors from 'cors';
import corsConfig from '../../config/security/corsConfig.js';

const corsMiddleware = cors(corsConfig);

export default corsMiddleware;