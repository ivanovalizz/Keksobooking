const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png']

const avatarFileChooserElement = document.querySelector('.ad-form-header__input')
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img')
const photoFileChooserElement = document.querySelector('.ad-form__input')
const photoPreviewElement = document.querySelector('.ad-form__photo')

const uploadPhoto = (input, cb) => {
  input.addEventListener('change', () => {
    const file = input.files[0]
    const fileName = file.name.toLowerCase()

    const matches = FILE_TYPES.some(type => fileName.endsWith(type))

    if (matches) {
      const reader = new FileReader()
      reader.addEventListener('load', () => cb(reader))
      reader.readAsDataURL(file)
    }
  })
}

uploadPhoto(avatarFileChooserElement,reader => {
  avatarPreviewElement.src = reader.result
})

uploadPhoto(photoFileChooserElement, reader => {
  photoPreviewElement.style.backgroundImage = `url(${reader.result})`
})
