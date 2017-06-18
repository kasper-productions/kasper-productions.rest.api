import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Photo } from '.'

const app = () => express(routes)

let userSession, photo

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  photo = await Photo.create({})
})

test('POST /photos 201 (user)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: userSession, name: 'test', albumName: 'test', photoUrl: 'test', photographer: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.albumName).toEqual('test')
  expect(body.photoUrl).toEqual('test')
  expect(body.photographer).toEqual('test')
})

test('POST /photos 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /photos 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /photos/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${photo.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(photo.id)
})

test('GET /photos/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /photos/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`/${photo.id}`)
    .send({ access_token: userSession, name: 'test', albumName: 'test', photoUrl: 'test', photographer: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(photo.id)
  expect(body.name).toEqual('test')
  expect(body.albumName).toEqual('test')
  expect(body.photoUrl).toEqual('test')
  expect(body.photographer).toEqual('test')
})

test('PUT /photos/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${photo.id}`)
  expect(status).toBe(401)
})

test('PUT /photos/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: userSession, name: 'test', albumName: 'test', photoUrl: 'test', photographer: 'test' })
  expect(status).toBe(404)
})

test('DELETE /photos/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${photo.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /photos/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${photo.id}`)
  expect(status).toBe(401)
})

test('DELETE /photos/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
