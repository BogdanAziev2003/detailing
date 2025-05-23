import React, { useState } from 'react'
import styles from './ServicesAdmin.module.css'
import { createService } from '../../http/servicesAPI'

const ServicesAdmin = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    duration_minutes: '',
    photo_url: null,
    previewImage: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo_url: file,
        previewImage: URL.createObjectURL(file),
      }))
      console.log(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newService = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      discount: Number(formData.discount),
      duration_minutes: Number(formData.duration),
      photo_url: formData.photo_url,
    }
    createService(newService).then((data) => {
      console.log(data)
    })
    // resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      discount: '',
      duration: '',
      image: null,
    })
  }

  return (
    <section className={styles.section}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Название услуги</label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Цена (₽)</label>
            <input
              type='number'
              name='price'
              value={formData.price}
              onChange={handleChange}
              className={styles.input}
              min='0'
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Скидка (%)</label>
            <input
              type='number'
              name='discount'
              value={formData.discount}
              onChange={handleChange}
              className={styles.input}
              min='0'
              max='100'
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Длительность (минуты)</label>
            <input
              type='number'
              name='duration'
              value={formData.duration}
              onChange={handleChange}
              className={styles.input}
              min='1'
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Описание услуги</label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            className={styles.textarea}
            rows='4'
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Изображение услуги</label>
          <div className={styles.imageUpload}>
            {formData.previewImage ? (
              <div className={styles.imagePreviewContainer}>
                <img
                  src={formData.previewImage}
                  alt='Предпросмотр'
                  className={styles.imagePreview}
                />
                <button
                  type='button'
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      image: null,
                      previewImage: '',
                    }))
                  }
                  className={styles.removeImageButton}>
                  ×
                </button>
              </div>
            ) : (
              <label className={styles.uploadLabel}>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  className={styles.fileInput}
                  required
                />
                <span className={styles.uploadText}>Выберите изображение</span>
              </label>
            )}
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button type='submit' className={styles.resetButton}>
            Добавить услугу
          </button>
          <button
            type='button'
            onClick={resetForm}
            className={styles.resetButton}>
            Очистить форму
          </button>
        </div>
      </form>
    </section>
  )
}

export default ServicesAdmin
