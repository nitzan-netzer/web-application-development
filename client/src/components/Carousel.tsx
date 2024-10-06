'use client';

import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import '../styles/AppCarousel.css';

var CarouselData = [
    {
        id: 1,
        image: './top_5_products.png',
        title: 'מוצרים שאסור לפספס',
        description: 'אצלנו באתר תוכלו למצוא מוצרים משלל קטגוריות בפריסה ארצית',
    },
    {
        id: 2,
        image: './top_sellers.png',
        title: 'המוכרים האמינים ביותר',
        description: 'המוכרים הכי טובים נמצאים אצלנו באתר! מוזמנים לרכוש ולהצטרף לחוויית הקנייה המושלמת',
    },
    {
        id: 3,
        image: './products_summer.png',
        title: 'המוצרים החמים ביותר שלנו',
        description: ' כשנהיה חם קונים חכם! מוזמנים להסתכל על המוצרים הנמכרים ביותר שלנו הקיץ בדף המוצרים',
    }
]

function AppCarousel() {
  return (
            <Carousel>
                {
                    CarouselData.map(item => (
                        <Carousel.Item key={item.id}>
                            <img
                                className='carousel-image'  // Apply custom class here
                                src={item.image}
                                alt={"Slide " + item.id}
                            />
                            <Carousel.Caption>
                                <h3 style={{ color: '#0C5C07',
                                    textShadow: '-1px -1px 0 #BFD1BD, 1px -1px 0 #BFD1BD, -1px 1px 0 #BFD1BD, 1px 1px 0 #BFD1BD',
                                    fontSize: '24px',
                                    fontWeight: 'bold' }}>{item.title}</h3>
                                <p style={{ color: '#0C5C07',
                                    textShadow: '-1px -1px 0 #BFD1BD, 1px -1px 0 #BFD1BD, -1px 1px 0 #BFD1BD, 1px 1px 0 #BFD1BD',
                                    fontSize: '17px',}}>{item.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))
                }
            </Carousel>
  )
}

export default AppCarousel;
