const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const TagModel = require('../models/tagModel')

describe('Tags API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  })

  afterEach(async () => {
    await TagModel.deleteMany()
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  describe('GET /tags', () => {
    it('should return all tags', async () => {
      await TagModel.create({ name: 'Tag 1' })
      await TagModel.create({ name: 'Tag 2' })

      const res = await request(app).get('/tags')

      expect(res.statusCode).toEqual(200)
      expect(res.body.length).toEqual(2)
      expect(res.body[0].name).toEqual('Tag 1')
      expect(res.body[1].name).toEqual('Tag 2')
    })
  })

  describe('GET /tags/:id', () => {
    it('should return a single tag', async () => {
      const tag = await TagModel.create({ name: 'Tag 1' })

      const res = await request(app).get(`/tags/${tag._id}`)

      expect(res.statusCode).toEqual(200)
      expect(res.body.name).toEqual('Tag 1')
    })

    it('should return 404 if tag is not found', async () => {
      const res = await request(app).get(`/tags/${mongoose.Types.ObjectId()}`)

      expect(res.statusCode).toEqual(404)
    })
  })

  describe('POST /tags', () => {
    it('should create a new tag', async () => {
      const res = await request(app).post('/tags').send({ name: 'Tag 1' })

      expect(res.statusCode).toEqual(201)
      expect(res.body.name).toEqual('Tag 1')
    })

    it('should return 400 if name is missing', async () => {
      const res = await request(app).post('/tags').send({})

      expect(res.statusCode).toEqual(400)
    })
  })

  describe('PATCH /tags/:id', () => {
    it('should update an existing tag', async () => {
      const tag = await TagModel.create({ name: 'Tag 1' })

      const res = await request(app).patch(`/tags/${tag._id}`).send({ name: 'Tag 2' })

      expect(res.statusCode).toEqual(200)
      expect(res.body.name).toEqual('Tag 2')
    })

    it('should return 404 if tag is not found', async () => {
      const res = await request(app).patch(`/tags/${mongoose.Types.ObjectId()}`).send({ name: 'Tag 2' })

      expect(res.statusCode).toEqual(404)
    })
  })

  describe('DELETE /tags/:id', () => {
    it('should delete an existing tag', async () => {
      const tag = await TagModel.create({ name: 'Tag 1' })

      const res = await request(app).delete(`/tags/${tag._id}`)

      expect(res.statusCode).toEqual(200)
      expect(res.body.message).toEqual('Tag deleted')
    })

    it('should return 404 if tag is not found', async () => {
      const res = await request(app).delete(`/tags/${mongoose.Types.ObjectId()}`)

      expect(res.statusCode).toEqual(404)
    })
  })
})
