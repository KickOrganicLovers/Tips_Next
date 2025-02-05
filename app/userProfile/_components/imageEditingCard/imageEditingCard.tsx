import React, {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import Cropper, {Area, CropperProps, Point} from "react-easy-crop";
import styles from './imageEditingCard.module.css'
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai";
import {UserProfileScheme} from "@/typs";

interface props {
    loadedImage: string
    setIsCropperOpen: Dispatch<SetStateAction<boolean>>
    setProfileImageAsBase64: Dispatch<SetStateAction<string>>
    userProfile: UserProfileScheme
}

export default function ImageEditingCard(props: props) {
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | undefined>(undefined)
    const [cropperProps, setCropperProps] = useState<CropperProps>(
        {
            image: '',
            crop: {x: 0, y: 0},
            zoom: 1,
            rotation: 0,
            aspect: 1,
            minZoom: 1,
            maxZoom: 1,
            cropShape: "round",
            zoomSpeed: 1,
            onCropChange: (location: Point) => {
                setCropperProps(state => {
                    return {...state, crop: location}
                })
            },
            onZoomChange: (zoom: number) => {
                setCropperProps(state => {
                    return {...state, zoom: zoom}
                })
            },
            onRotationChange: (rotation: number) => {
                setCropperProps(state => {
                    return {...state, rotation: rotation}
                })
            },
            style: {
                containerStyle: {width: '100%', aspectRatio: 1, position: "relative"},
                cropAreaStyle: {boxShadow: '0 0 0 9999em rgba(0, 0, 0, 0.5'}

            },
            classes: {},
            restrictPosition: false,
            mediaProps: {},
            cropSize: {width: 400, height: 400},
            objectFit: 'cover',
            showGrid: false,
            keyboardStep: 1
        }
    )


    const createImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const image = new Image()
            image.addEventListener('load', () => resolve(image))
            image.addEventListener('error', (error) => reject(error))
            image.setAttribute('crossOrigin', 'anonymous')
            image.src = url
            //Promiseの引数として渡される関数に戻り値がないことがわからない
        })


    const getRadianAngle = (degreeValue: number) => {
        return (degreeValue * Math.PI) / 180
    }
    const rotateSize = (width: number, height: number, rotation: number) => {
        const rotRad = getRadianAngle(rotation)

        return {
            width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
            height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height)
        }
    }



    const getCroppedImage = async (imageSrc: string, pixelCrop: Area, rotation = 0, flip = {
        horizontal: false,
        verticalL: false
    }): Promise<string | undefined> => {
        const image = await createImage(imageSrc)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        //canvasおよびcanvascontextの挙動がわからない。

        if (!ctx) {
            return undefined
        }

        const rotRad = getRadianAngle(rotation)
        //getRadianAngleの挙動

        const {width: bBoxWidth, height: bBoxHeight} = rotateSize(image.width, image.height, rotation)
        //width,heightに代入する値であるbBoxWidth,Heightを以降の文でそのまま各パラメータに代入している理由がわからない。

        canvas.width = bBoxWidth
        canvas.height = bBoxHeight

        ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
        ctx.rotate(rotRad)
        ctx.scale(flip.horizontal ? -1 : 1, flip.verticalL ? -1 : 1)
        ctx.translate(-image.width / 2, -image.height / 2)

        // draw rotated image
        ctx.drawImage(image, 0, 0)

        const croppedCanvas = document.createElement('canvas')

        const croppedCtx = croppedCanvas.getContext('2d')

        if (!croppedCtx) {
            return undefined
        }

        // Set the size of the cropped canvas
        croppedCanvas.width = pixelCrop.width
        croppedCanvas.height = pixelCrop.height

        // Draw the cropped image onto the new canvas
        croppedCtx.drawImage(
            canvas,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        )

        // As Base64 string
        return croppedCanvas.toDataURL('image/jpeg');

        // As a blob
        // return new Promise((resolve, reject) => {
        //     croppedCanvas.toBlob((file) => {
        //         if(file){
        //             resolve(URL.createObjectURL(file))
        //         }
        //     }, 'image/jpeg')
        // })
    }

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])


    const onCropCompleted = () => {
        if (cropperProps.image && croppedAreaPixels) {
            getCroppedImage(cropperProps.image, croppedAreaPixels, cropperProps.rotation).then((imgAsBase64) => {
                if (imgAsBase64) {
                    console.log(imgAsBase64)
                    props.setProfileImageAsBase64(imgAsBase64)
                    props.setIsCropperOpen(false)
                    // postImgToServer(imgAsBase64, '').then((res) => {
                    //     res.json().then((json) => {
                    //         if(!json.error){
                    //             console.log(json.profileImageUrl)
                    //             props.setProfileImageUrl(json.profileImageUrl)
                    //             props.setIsCropperOpen(false)
                    //         }else{
                    //             console.log(json.error)
                    //         }
                    //     }).catch((e) => {
                    //         throw e
                    //     })
                    // }).catch((e) => {
                    //     throw e
                    // })
                } else {
                    console.log('Failed')
                }
            })
        }
    }


    const onCropCanceled = () => {
        props.setIsCropperOpen(false)
    }


    useEffect(() => {
        setCropperProps(state => {
            return {...state, image: props.loadedImage}
        })
    }, [props.loadedImage]);






    return (
        <div className={styles.div_0}>
            <Cropper {...cropperProps} onCropComplete={onCropComplete} />
            <div className={styles.div_1}>
                <p className={styles.p_0}>Zoom</p>
                <input
                    className={styles.input_0}
                    type='range'
                    value={cropperProps.zoom}
                    min={1}
                    max={3}
                    step={0.01}
                    aria-labelledby="Zoom"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        cropperProps.onZoomChange?.(Number(e.target.value))
                    }}
                />
            </div>
            <div className={styles.div_1}>
                <p className={styles.p_0}>Rotation</p>
                <input
                    className={styles.input_0}
                    type='range'
                    value={cropperProps.rotation}
                    min={-180}
                    max={180}
                    step={1}
                    aria-labelledby='Rotation'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        cropperProps.onRotationChange?.(Number(e.target.value))
                    }}
                />
            </div>
            <div className={styles.div_2}>
                <AiOutlineCheck className={styles.AiOutlineCheck} onClick={onCropCompleted}/>
                <AiOutlineClose className={styles.AiOutlineClose} onClick={onCropCanceled}/>
            </div>
        </div>
    )


}
