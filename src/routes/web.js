import express from 'express';
import { home, auth, comment, message, feed, user} from '../controllers/index';
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
  router.get('/api/user/search/:userId', user.searchUser);

  //comment
  router.post('/api/comments/:trailerId', comment.postComment);
  // router.delete("/api/comments/:commentId", comment.deleteComment);
  router.get('/api/comments/:trailerId', comment.getComments);
  //file
  router.post('/api/file', upload());
  router.get('/api/file/:filename', download);
  //message
  router.post('/api/messages/get', message.getMessages);
  router.post('/api/messages/create', message.postMessage);
  //feed
  router.get('/api/posts/:userId', feed.getFeeds);
  router.post('/api/posts/create/:userId', feed.postFeed);
  router.get('/api/posts/profile/:userId', feed.getFeedsProfile);

  return app.use('/', router);
};

module.exports = initRoutes;
