import Carousel from 'react-bootstrap/Carousel'

const GalleryCarousel = ({ gallery, size }) => {
    return (
        <Carousel>
            {
                gallery.map((photo, idx) => {
                    return (
                        <Carousel.Item key={idx} style={{ height: size }}>
                            <img src={photo} style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%', borderRadius: '5px' }} />
                        </Carousel.Item>
                    )
                })
            }
        </Carousel>
    )
}

export default GalleryCarousel