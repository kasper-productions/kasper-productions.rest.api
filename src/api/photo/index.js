import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Photo, { schema } from './model'

const router = new Router()
const { name, albumName, photoUrl, photographer } = schema.tree

/**
 * @api {post} /photos Create photo
 * @apiName CreatePhoto
 * @apiGroup Photo
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Photo's name.
 * @apiParam albumName Photo's albumName.
 * @apiParam photoUrl Photo's photoUrl.
 * @apiParam photographer Photo's photographer.
 * @apiSuccess {Object} photo Photo's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Photo not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, albumName, photoUrl, photographer }),
  create)

/**
 * @api {get} /photos Retrieve photos
 * @apiName RetrievePhotos
 * @apiGroup Photo
 * @apiUse listParams
 * @apiSuccess {Object[]} photos List of photos.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /photos/:id Retrieve photo
 * @apiName RetrievePhoto
 * @apiGroup Photo
 * @apiSuccess {Object} photo Photo's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Photo not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /photos/:id Update photo
 * @apiName UpdatePhoto
 * @apiGroup Photo
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Photo's name.
 * @apiParam albumName Photo's albumName.
 * @apiParam photoUrl Photo's photoUrl.
 * @apiParam photographer Photo's photographer.
 * @apiSuccess {Object} photo Photo's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Photo not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, albumName, photoUrl, photographer }),
  update)

/**
 * @api {delete} /photos/:id Delete photo
 * @apiName DeletePhoto
 * @apiGroup Photo
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Photo not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
