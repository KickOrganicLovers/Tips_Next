import {useEffect, useState} from "react";
import Cropper, {CropperProps, Point} from "react-easy-crop";
import styles from './imageEditingCard.module.css'

interface props {
    loadedImage: string
}

export default function ImageEditingCard(props: props) {
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
            cropSize: {width: 500, height: 500},
            objectFit: 'cover',
            showGrid: false,
            keyboardStep: 1
        }
    )


    useEffect(() => {
        setCropperProps(state => {
            return {...state, image: props.loadedImage}
        })
    }, [props.loadedImage]);

    return (
        <div className={styles.div_0}>
            <Cropper {...cropperProps}/>
        </div>
    )



}
