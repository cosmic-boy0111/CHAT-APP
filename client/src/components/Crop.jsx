import Cropper from 'react-easy-crop'
import React,{useState,useCallback} from 'react'
const Demo = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
  }, [])

  return (
    <Cropper
      image={'https://avatars.dicebear.com/api/identicon/gaurav.svg?b=%23c0bfbf&r=50&scale=99&colorLevel=900'}
      crop={crop}
      zoom={zoom}
      aspect={4 / 4}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
  )
}

export default Demo;