const path = require('path');
const express = require('express');
const xss = require('xss');
const PostsService = require('./posts-service');
const requireAuth = require('../middleware/jwt-auth');


const postsRouter = express.Router();
const postTypesRouter = express.Router();
const jsonParser = express.json();

postTypesRouter
  .route('/sections')
  .get((req, res, next) => {           
    const knexInstance = req.app.get('db');
    PostsService.getAllPostTypes(knexInstance)
      .then(sections => {
        res.json(sections.map(item => item.section));
      })
      .catch(next);
  });

const serializePost = post => ({
  id: post.post_id,
  userId: post.user_id,
  title: xss(post.title),
  content: xss(post.content),
  date_created: post.date_created,
});

postsRouter
  .route('/allposts')
  .get((req, res, next) => {           
    const knexInstance = req.app.get('db');
    PostsService.getAllPosts(knexInstance)
      .then(posts => {
        res.json(posts.map(serializePost));
      })
      .catch(next);
  })
  .post(jsonParser, requireAuth.requireAuth, (req, res, next) => {   // TODO: add requireAuth() middleware
    const { title, content, userId } = req.body;
    const newPost = { title, content, userId };

    for (const [key, value] of Object.entries(newPost))
      if (value === null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        });

    PostsService.insertArticle(
      req.app.get('db'),
      newPost
    )
      .then(post => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${post.id}`))
          .json(serializePost(post));
      })
      .catch(next);
  });

postsRouter
  .route('/:post_id')
  .all((req, res, next) => {
    PostsService.getById(
      req.app.get('db'),
      req.params.post_id
    )
      .then(post => {
        if (!post) {
          return res.status(404).json({
            // eslint-disable-next-line quotes
            error: { message: `Post doesn't exist` }
          });
        }
        res.post = post;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializePost(res.post));
  })
  .delete((req, res, next) => {
    PostsService.deletePost(
      req.app.get('db'),
      req.params.post_id
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const { title, content, userId } = req.body;
    const articleToUpdate = { title, content, userId };

    const numberOfValues = Object.values(articleToUpdate).filter(Boolean).length;
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          // eslint-disable-next-line quotes
          message: `Request body must content either 'title', 'userId' or 'content'`
        }
      });

    PostsService.updatePost(
      req.app.get('db'),
      req.params.post_id,
      articleToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = { postsRouter, postTypesRouter };


