import Cropper, {Area, CropperProps, Point} from "react-easy-crop";
import React, {Dispatch, SetStateAction, useCallback, useEffect, useRef, useState} from "react";
import styles from './imageEditingCard.module.css'
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai";
import {ArticleSchemeWithPrefix} from "@/types";
import { useEventsStore } from "@/lib/lib-client/stores/eventsStore";

interface props {
    thumbnailImageUrl?: string,
    setArticleOnEdit: Dispatch<SetStateAction<ArticleSchemeWithPrefix>>
    loadedImage?: string,
    setIsCropperOpen?: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

export default function ImageEditingCard(props: props) {
    const inputImageRef = useRef<HTMLInputElement>(null);
    const [isImageEditingMode, setIsImageEditingMode] = useState(false);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | undefined>(undefined)

    const [image, setImage] = useState<string>('')
    const [crop, setCrop] = useState<Point>({x: 0, y: 0});
    const [zoom, setZoom] = useState<number>(1);
    const [rotation, setRotation] = useState<number>(0);

    const editorEvent = useEventsStore(state => state.events.editorEvent)

    const cropperProps: CropperProps =
        {
            image,
            crop,
            zoom,
            rotation,
            aspect: 3 / 2,
            minZoom: 0.1,
            maxZoom: 3,
            cropShape: "rect",
            zoomSpeed: 1,
            onCropChange: (newCrop: Point) => {
                console.log(isImageEditingMode)
                if (isImageEditingMode) {
                    setCrop(newCrop)
                }
            },
            onZoomChange: (newZoom: number) => {
                if (isImageEditingMode) {
                    setZoom(newZoom)
                }
            },
            onRotationChange: (newRotation: number) => {
                if (isImageEditingMode) {
                    setRotation(newRotation)
                }
            },
            style: {
                containerStyle: {
                    width: '100%',
                    aspectRatio: 3 / 2,
                    position: "relative",
                    backgroundColor: '--var(--bg-color-1)'
                },
                cropAreaStyle: (() => isImageEditingMode ? {
                    boxShadow: '0 0 0 9999em rgba(0, 0, 0, 0.5',
                    cursor: 'move'
                } : {boxShadow: '0 0 0 9999em rgba(0, 0, 0, 0.5', cursor: 'default'})()
            },
            classes: {},
            restrictPosition: false,
            mediaProps: {},
            objectFit: 'cover',
            showGrid: false,
            keyboardStep: 1
        }


    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader()
            reader.onloadend = () => {
                if (reader.result) {
                    setImage(reader.result?.toString())
                    setIsImageEditingMode(true)
                }
            }
            reader.readAsDataURL(e.target.files[0])
            e.target.value = ''
        }
    }


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
        //canvasおよびcanvasContextの挙動がわからない。

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


    const onCropFinished = () => {
        if (cropperProps.image && croppedAreaPixels) {
            getCroppedImage(cropperProps.image, croppedAreaPixels, cropperProps.rotation).then((imgAsBase64) => {
                if (imgAsBase64) {
                    props.setArticleOnEdit((prevState) => ({
                        ...prevState,
                        thumbnailImageAsBase64: imgAsBase64
                    }))
                    setIsImageEditingMode(false)
                } else {
                    console.log('Failed')
                }
            })
        }
    }

    const resetCropSettings = () => {
        setZoom(1)
        setRotation(0)
        setCrop({x: 0, y: 0})
    }

    const onCropCanceled = () => {
        if (!!props.thumbnailImageUrl) {
            setImage(props.thumbnailImageUrl)
            resetCropSettings()
        } else {
            setImage('/images/noImage.png')
            resetCropSettings()
        }

        setIsImageEditingMode(false)
    }

    useEffect(() => {
        if (!!props.thumbnailImageUrl) {
            setImage(props.thumbnailImageUrl)
            resetCropSettings()
        } else {
            setImage('/images/noImage.png')
            resetCropSettings()
        }
    }, [props.thumbnailImageUrl]);

    useEffect(() => {
        setImage('/images/noImage.png')
    }, [editorEvent?.payload.upload]);

    return (
        <div className={styles.div_0}>
            <Cropper {...cropperProps} onCropComplete={onCropComplete}/>
            <div className={styles.div_1}>
                {(() => isImageEditingMode ?
                        <div className={styles.div_2}>
                            <div className={styles.div_3}>
                                <p className={styles.p_0}>ズーム</p>
                                <input
                                    className={styles.input_1}
                                    type='range'
                                    value={cropperProps.zoom}
                                    min={1}
                                    max={3}
                                    step={0.01}
                                    aria-labelledby='Zoom'
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        cropperProps.onZoomChange?.(Number(e.target.value))
                                    }}
                                />
                            </div>
                            <div className={styles.div_3}>
                                <p className={styles.p_0}>回転</p>
                                <input
                                    className={styles.input_1}
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
                            <div className={styles.div_4}>
                                <AiOutlineCheck className={styles.AiOutlineCheck} onClick={onCropFinished}/>
                                <AiOutlineClose className={styles.AiOutlineClose} onClick={onCropCanceled}/>
                            </div>
                        </div>
                        :
                        <div className={styles.div_2}>
                            <button className={styles.button_0} onClick={() => {
                                inputImageRef.current?.click()
                            }}>サムネイル画像を選択
                            </button>
                        </div>
                )()}
            </div>
            <input className={styles.input_0} type='file' accept='image/*' ref={inputImageRef} onChange={onFileChange}/>
        </div>
    )
}
