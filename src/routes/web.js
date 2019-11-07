import express from 'express';
import { home, auth, comment } from '../controllers/index';
import { authValid } from '../validation/index';
import initPassportLocal from '../controllers/passportController/local';
import passport from 'passport';
import { download, upload } from '../controllers/fileController';

// Init all passport
initPassportLocal();

let router = express.Router();

/**
 * Init all routes
 * @param app from exactly express module
 */
let initRoutes = app => {
  router.get('/', home.getHome);
  router.get('/login-register', auth.getLoginRegister);
  router.post('/register', authValid.register, auth.postRegister);
  router.get('/verify/:token', auth.verifyAccount);
  router.post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login-register',
      successFlash: true,
      failureFlash: true,
    }),
  );

  //API for clients
  router.post('/api/login', auth.postLogin);
  router.post(
    '/api/register',
    authValid.register,
    auth.postApiRegister,
  );
  router.post('/api/comments/:trailerId', comment.postComment);
  // router.delete("/api/comments/:commentId", comment.deleteComment);
  router.get('/api/comments/:trailerId', comment.getComments);
  //file
  router.post('/api/file', upload());
  router.get('/api/file/:filename', download);

  return app.use('/', router);
};

module.exports = initRoutes;
