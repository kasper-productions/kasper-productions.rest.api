import { Photo } from '.'

let photo

beforeEach(async () => {
  photo = await Photo.create({ name: 'test', albumName: 'test', photoUrl: 'test', photographer: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = photo.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(photo.id)
    expect(view.name).toBe(photo.name)
    expect(view.albumName).toBe(photo.albumName)
    expect(view.photoUrl).toBe(photo.photoUrl)
    expect(view.photographer).toBe(photo.photographer)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = photo.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(photo.id)
    expect(view.name).toBe(photo.name)
    expect(view.albumName).toBe(photo.albumName)
    expect(view.photoUrl).toBe(photo.photoUrl)
    expect(view.photographer).toBe(photo.photographer)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
