import Carousel from 'react-bootstrap/Carousel'

const GalleryCarousel = ({ gallery }) => {
    return (
        <Carousel>
            {
                gallery.map((photo, idx) => {
                    return (
                        <Carousel.Item key={idx} >
                            <img src={photo} style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }} />
                        </Carousel.Item>
                    )
                })
            }
        </Carousel>
    )
}

export default GalleryCarousel