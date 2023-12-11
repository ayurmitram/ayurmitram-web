import logo from './../assets/logo-dark.svg'
import backg from './../assets/darkgreenbg.jpg'
import { useEffect, useRef, useState } from 'react';

const SignupCarousel = () => {
    const data = [
        {
            head: 'Quick Insights',
            body: 'Instantly access a comprehensive breakdown, providing a holistic understanding of your unique prakruti constitution.'
        },
        {
            head: 'PDF Downloads',
            body: 'Seamlessly store and retrieve detailed reports in PDF format, ensuring easy access.'
        },
        {
            head: 'Physician Collaboration',
            body: 'Effortlessly collaborate with your healthcare provider by sharing logs and comprehensive reports securely and effortlessly.'
        },
        {
            head: 'General Ayurveda Queries',
            body: 'Gain access to an extensive resource center addressing common queries about Ayurveda and prakruti.'
        },
        {
            head: 'Self-Care Hub',
            body: 'Explore a dedicated Self-Care Hub within Ayurmitram, designed to elevate your well-being through comprehensive diet planning, personalized workout routines, and lifestyle guidance.'
        },
        {
            head: 'Voice Input Support',
            body: 'Engage effortlessly with the platform using voice input, enabling intuitive and natural interactions.'
        },        
    ]

    const [activeIndex, setActiveIndex] = useState(0);
    const [carouselPaused, setCarouselPaused] = useState(false);
    const carousel = useRef(null);
    const carouselEle = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!carouselPaused) {
                if (activeIndex === data?.length - 1) {
                    setActiveIndex(0);
                    carousel?.current?.scrollTo({
                        left: 0,
                        behavior: "smooth",
                    });
                } else if (activeIndex === 0) {
                    setActiveIndex(activeIndex + 1);
                    if (
                        carouselEle?.current?.offsetWidth <
                        carousel?.current?.offsetWidth / 2
                    ) {
                        carousel?.current?.scrollTo({
                            left:
                                carousel?.current?.scrollLeft +
                                carouselEle?.current?.offsetWidth / 2,
                            behavior: "smooth",
                        });
                    } else {
                        carousel?.current?.scrollTo({
                            left:
                                carousel?.current?.scrollLeft + carouselEle?.current?.offsetWidth,
                            behavior: "smooth",
                        });
                    }
                } else {
                    setActiveIndex(activeIndex + 1);
                    carousel?.current?.scrollTo({
                        left: carousel?.current?.scrollLeft + carouselEle?.current?.offsetWidth,
                        behavior: "smooth",
                    });
                }
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [activeIndex, carouselPaused]);
    
    return (
        <div 
            ref={carousel} 
            className={` rounded-2xl w-full gap-20 min-h-full items-end flex p-10 snap-x overflow-x-scroll bg-no-repeat bg-cover`} 
            style={{
                backgroundImage: `url(${backg})`
            }}
            onMouseEnter={() => setCarouselPaused(true)}
            onMouseLeave={() => setCarouselPaused(false)}
        >
            {data.map((item, index) => (
                <div key={index} ref={index === data?.length-1 ? carouselEle : null} className='bg-[#FFF2F2]/[20%] min-w-full snap-center w-full text-white flex flex-col gap-5 items-start font-normal p-10 backdrop-blur-[25rem] rounded-2xl'>
                    <div className='bg-[#E8EDDF] p-2 px-4 min-w-[200px] flex text-black rounded-lg'>
                        <img src={logo} alt='logo' className='w-[1.4rem]' />
                        <div className='font-medium ml-2'>{item?.head}</div>
                    </div>
                    <div className=''>{item?.body}</div>
                </div>
            ))}
        </div>
    )
}

export default SignupCarousel