// src/app/LandingPage.tsx
"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import '../app/Styles/site.css';
import '../app/Styles/home.css';

// Image Imports
import Slide1 from '../app/Assets/Landing/TopText/DM_Slide1.png';
import SlideNumber1 from '../app/Assets/Landing/TopText/Numbers/slide01.png';
import LandingLine from '../app/Assets/Landing/Img/landingLine.png';
import ContactUsButton from '../app/Assets/Landing/Buttons/contactUsButtonDefault.svg';
import LeftCircleButton from '../app/Assets/Landing/Buttons/leftCircleButton.svg';
import RightCircleButton from '../app/Assets/Landing/Buttons/rightCircleButton.svg';
import AboutUsHeader from '../app/Assets/Landing/Img/aboutUsHeader.png';
import AboutUsImage from '../app/Assets/Landing/Img/aboutUsImage.png';
import VisitMalgasHeader from '../app/Assets/Landing/Img/visitMalgasHeader.png';
import CarouselImage1 from '../app/Assets/Landing/Img/Carousel/carousel_img1.png';
import CarouselImage2 from '../app/Assets/Landing/Img/Carousel/carousel_img2.png';
import CarouselImage3 from '../app/Assets/Landing/Img/Carousel/carousel_img3.png';
import CarouselImage4 from '../app/Assets/Landing/Img/Carousel/carousel_img4.png';
import CarouselImage5 from '../app/Assets/Landing/Img/Carousel/carousel_img5.png';
import CarouselImage6 from '../app/Assets/Landing/Img/Carousel/carousel_img6.png';
import CarouselImage7 from '../app/Assets/Landing/Img/Carousel/carousel_img7.png';


const LandingPage: React.FC = () => {
    const [currentReason, setCurrentReason] = useState(0);
    const reasons = [
        {
            h2: "1. Stunning Scenery",
            body: "Explore numerous hiking trails that cater to all levels of fitness. <br><br>From lush riverbanks to rolling hills, every view is a postcard moment.",
            image: CarouselImage1
        },
        {
            h2: "2. Hiking Trails",
            body: "Discover the historical landmarks and learn about the cultural heritage of Malgas. <br><br>Discover the diverse flora and fauna, and perhaps spot some local wildlife.",
            image: CarouselImage2
        },
        {
            h2: "3. Whale Watching",
            body: "Visit during whale season to witness the magnificent spectacle of these gentle giants. <br><br>Infanta and Witsand are renowned for their whale watching opportunities.",
            image: CarouselImage3
        },
        {
            h2: "4. Fishing",
            body: "The Breede River is teeming with fish like Cob and Garrick. <br><br>Whether you're a seasoned angler or a beginner, you'll find great spots for fishing.",
            image: CarouselImage4
        },
        {
            h2: "5. Bird Watching",
            body: "With a rich variety of bird species, including fish eagles and kingfishers, Malgas is a haven for bird watchers.",
            image: CarouselImage5
        },
        {
            h2: "6. Local Attractions",
            body: "Explore historical monuments, visit local pubs and restaurants, and tour nearby wineries.<br><br>There's always something new to discover.",
            image: CarouselImage6
        }
    ];

    const changeReasonSlide = (direction: 'next' | 'prev') => {
        if (direction === 'next') {
            setCurrentReason((currentReason + 1) % reasons.length);
        } else {
            setCurrentReason((currentReason - 1 + reasons.length) % reasons.length);
        }
    };

    useEffect(() => {
        const contactButton = document.getElementById('contactButton');
        if (contactButton) {
            contactButton.addEventListener('click', () => {
                window.location.href = '/Contact/ContactUs'; // Adjust this URL if needed
            });
        }

        return () => {
            if (contactButton) {
                contactButton.removeEventListener('click', () => {});
            }
        };
    }, []);

    return (
        <main>
            <section className="section section1" id="section1">
                <div className="button-container">
                    <button className="circle-button left-button" onClick={() => changeReasonSlide('prev')}>
                        <Image src={LeftCircleButton} alt="Left Button" width={50} height={50} />
                    </button>
                    <button className="circle-button right-button" onClick={() => changeReasonSlide('next')}>
                        <Image src={RightCircleButton} alt="Right Button" width={50} height={50} />
                    </button>
                </div>

                <div className="slide-container visible">
                    <Image id="slide-svg" src={Slide1} alt="Slide Text" width={500} height={300} />
                    <p id="slide-description" className="slide-description">Get to know us! We aim to provide a comprehensive service to ensure your stay is memorable.</p>
                    <Image id="slide-no" src={SlideNumber1} alt="Slide Number" width={50} height={50} />
                    <Image id="slide-line" src={LandingLine} alt="line" width={500} height={500} />
                    <button id="contactButton" className="contact-button">
                        <Image src={ContactUsButton} alt="Contact Us" width={50} height={50} />
                    </button>
                </div>

                {/* Carousel Container */}
                <div className="carousel-container">
                    <div className="carousel-track">
                        <Image className="carousel-image" src={CarouselImage1} alt="Image 1" width={500} height={300} />
                        <Image className="carousel-image" src={CarouselImage2} alt="Image 2" width={500} height={300} />
                        <Image className="carousel-image" src={CarouselImage3} alt="Image 3" width={500} height={300} />
                        <Image className="carousel-image" src={CarouselImage4} alt="Image 4" width={500} height={300} />
                        <Image className="carousel-image" src={CarouselImage5} alt="Image 5" width={500} height={300} />
                        <Image className="carousel-image" src={CarouselImage6} alt="Image 6" width={500} height={300} />
                        <Image className="carousel-image" src={CarouselImage7} alt="Image 7" width={500} height={300} />
                    </div>
                </div>
            </section>

            <section className="section section2">
                <div className="aboutHeader">
                    <Image src={AboutUsHeader} alt="About Us Header" width={500} height={300} />
                </div>
                <div className="aboutContent">
                    <Image id="about-image" src={AboutUsImage} alt="About Us Image" width={500} height={300} />
                    <div className="about-text">
                        <h2>Get to know us!</h2>
                        <p>
                            Our mission is to provide a comprehensive umbrella of services designed to enhance your experience, whether you’re here for boating, accommodation, business, tourism, or events.<br />
                            Explore the best of Malgas with us and discover everything this charming destination has to offer.
                        </p>
                        <button className="about-button" id="ourServicesButton" onClick={() => document.getElementById('section1')?.scrollIntoView({ behavior: 'smooth' })}>
                            <Image src={ContactUsButton} alt="Our Services" width={50} height={50} />
                        </button>
                    </div>
                </div>
            </section>

            <section className="section section3">
                <div className="visitHeader">
                    <Image src={VisitMalgasHeader} alt="Visit Us Header" width={500} height={300} />
                </div>
                <div className="visitContent">
                    <div className="visit-text">
                        <h2 id="reasonHeading">{reasons[currentReason].h2}</h2>
                        <p id="reasonBody" dangerouslySetInnerHTML={{ __html: reasons[currentReason].body }} />
                    </div>
                    <Image id="reasonImage" src={reasons[currentReason].image} alt="About Us Image" width={500} height={300} />
                </div>
                <div className="button-container">
                    <button className="circle-button left-button" onClick={() => changeReasonSlide('prev')}>
                        <Image src={LeftCircleButton} alt="Left Button" width={50} height={50} />
                    </button>
                    <button className="circle-button right-button" onClick={() => changeReasonSlide('next')}>
                        <Image src={RightCircleButton} alt="Right Button" width={50} height={50} />
                    </button>
                </div>
            </section>
        </main>
    );
};

export default LandingPage;