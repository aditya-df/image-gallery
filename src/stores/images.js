import { defineStore } from "pinia";
import { http } from "@/helper/services/http";
import { ToastSuccess, ToastFailed } from '@/helper/services/toast'

export const useImageStore = defineStore('images', {
    state() {
        return {
            images: []
        }
    }, getters: {}, actions: {
        fetchImages() {
            const storedImages = JSON.parse(localStorage.getItem('images_url'));
            if (storedImages && Array.isArray(storedImages)) {
                this.images = storedImages;
            }
            // http().get('images').then(res => console.log(res))
        },
        uploadImages(image) {
            const formData = new FormData();
            formData.append('image', image);

            http().post('upload', formData, { params: { expiration: 600, key: import.meta.env.VITE_KEY_API } })
                .then(res => {
                    ToastSuccess.fire({
                        icon: 'success',
                        title: 'Gambar berhasil diupload'
                    })
                    const imageUrl = res.data.data.image.url;
                    let existingImages = JSON.parse(localStorage.getItem('images_url')) || [];

                    if (!existingImages.includes(imageUrl)) {
                        existingImages.push(imageUrl);
                        this.images.push(imageUrl);
                        localStorage.setItem('images_url', JSON.stringify(existingImages));
                    }
                }).catch(err => {
                    ToastFailed.fire({
                        icon: 'error',
                        title: 'Upload error'
                    })
                    console.log(err)
                })
        }
    }
})