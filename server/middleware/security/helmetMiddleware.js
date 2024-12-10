import helmet from 'helmet';
import helmetConfig from '../../config/security/helmetConfig.js';

const helmetMiddleware = [
  helmet(helmetConfig),
  helmet.permittedCrossDomainPolicies()
];

export default helmetMiddleware;