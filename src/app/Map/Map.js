
import React from 'react'

const Map = () => {
    return (
        <div className="map" style={{
            height: "500px",
        }}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111551.9926412813!2d31.3785!3d31.0409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7e2f8e8e8e8e8%3A0x8e8e8e8e8e8e8e8e!2sMansoura%2C%20Egypt!5e0!3m2!1sen!2sbd!4v1597926938024!5m2!1sen!2sbd" height="400" style={{ border: 0 }} width={"100%"} allowFullScreen="" aria-hidden="false" tabIndex="0" />
        </div>
    )
}

export default Map
