import express from 'express';
import expressJwt from 'express-jwt';
import multer from 'multer';
import companyController from '../controllers/company.controller';
import loadFullUser from '../middleware/loadFullUser.middleware';
import ensureIsAdmin from '../middleware/ensureIsAdmin.middleware';
import config from '../../config/config';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .post(
  expressJwt({ secret: config.jwtSecret })
  , loadFullUser
  , ensureIsAdmin
  , companyController.create
  );

router.route('/:companyId')
/** GET /api/company/:companyId - Get company */
.get(
  expressJwt({ secret: config.jwtSecret })
  , companyController.get
);

router.route('/search')
.get(
  expressJwt({ secret: config.jwtSecret })
  , loadFullUser
  , ensureIsAdmin
  , companyController.list
);


export default router;