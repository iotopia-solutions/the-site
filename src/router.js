'use strict';

import { Router } from 'express';
import indexService from './index/service';
import { single as singleBlog, multi as multiBlog } from './blog/service'
import emailService from './email/service'

export default
  config => {
    const router = new Router()

    router.get('/', indexService(config))
    router.get('/blog', multiBlog(config))
    router.get('/blog/:id', singleBlog(config))
    router.post('/email', emailService(config))

    return router
  }
