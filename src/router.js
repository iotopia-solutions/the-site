'use strict';

import { Router } from 'express';
import indexService from './index/service';
import { single as singleBlog, multi as multiBlog } from './blog/service'
import emailService from './email/service'
import {team, member as teamMember} from './team/service'
import {portfolio} from './portfolio/service'

export default
  config => {
    const router = new Router()

    router.get('/', indexService(config))
    router.get('/blog', multiBlog(config))
    router.get('/blog/:id', singleBlog(config))
    router.get('/team', team(config))
    router.get('/team/:id', teamMember(config))
    router.get('/portfolio', portfolio(config))
    router.post('/email', emailService(config))

    return router
  }
