import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
import { InstagramSvg } from '../../assets/svgs/instagram';
import { TelegramSvg } from '../../assets/svgs/telegram';
import './homePageStyles.scss';

export const HomePage = () => {
    const news:{id:number,title:string,date:string,text:string}[] = [
        {
            id:1,
            title:'Рабські збори',
            date:'07.05.2023',
            text:'На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі...'
        },
        {
            id:2,
            title:'Рабські збори',
            date:'07.05.2023',
            text:'На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі...'
        },
        {
            id:3,
            title:'Рабські збори',
            date:'07.05.2023',
            text:'На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі...'
        },
        {
            id:4,
            title:'Рабські збори',
            date:'07.05.2023',
            text:'На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі...'
        },
        {
            id:5,
            title:'Рабські збори',
            date:'07.05.2023',
            text:'На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі...'
        },
        {
            id:6,
            title:'Рабські збори',
            date:'07.05.2023',
            text:'На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі...'
        },
        {
            id:7,
            title:'Рабські збори',
            date:'07.05.2023',
            text:'На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі...'
        },
        {
            id:8,
            title:'Рабські збори',
            date:'07.05.2023',
            text:'На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі...'
        },
        {
            id:9,
            title:'Рабські збори',
            date:'07.05.2023',
            text:'На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі...'
        },
        {
            id:10,
            title:'Рабські збори',
            date:'07.05.2023',
            text:'На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі...'
        },
    ];

    return <div>
            <section className="first_screen" id="start">
            <div className="homePage__container">
                <div className="fs__content">
                    <div className="socials">
                        <div className="rotate">
                            <h3 className="rotate__text">Ми у соц. мережах</h3>
                        </div>
                        <div className="inst__container">
                            <Link to="#" className="inst">
                                {InstagramSvg()}
                            </Link>
                        </div>
                        <div className="tg__container">
                            <Link to="#" className="tg">
                                {TelegramSvg()}
                            </Link>
                        </div>
                    </div>
                    <div className="main__paragraph">
                        <div className="gurnal">
                            <div className="line"></div>
                            <h4 className="eGurnal">ЕЛЕКТРОНИЙ ЖУРНАЛ</h4>
                        </div>
                        <div className="main__phrase">
                            <h1 className="mPhrase">Хто володіє інформацією – той володіє світом</h1>
                        </div>
                    </div>
                    <div className="pageNav">
                        <Link to="#start" className="pNav__container">
                            <h1 className="pNav__btn">Старт</h1>
                        </Link>
                        <Link to="#news" className="pNav__container pNav__btn">
                            <h1 className="pNav__btn">Новини</h1>
                        </Link>
                        <Link to="#start" className="pNav__container pNav__btn" >
                            <h1 className="pNav__btn">Журнал</h1>
                        </Link>
                        <Link to="#start" className="pNav__container pNav__btn">
                            <h1 className="pNav__btn">Про Нас</h1>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
        <section className="news__page" id="news">
            <div className="news__header">
                <div className="page__number">
                    <svg className="pageNum" xmlns="http://www.w3.org/2000/svg" width="92" height="72" viewBox="0 0 92 72" fill="none">
                        <path d="M29.2 72C23.6667 72 18.6667 70.6 14.2 67.8C9.8 65 6.33333 60.9333 3.8 55.6C1.26667 50.2 0 43.6667 0 36C0 28.3333 1.26667 21.8333 3.8 16.5C6.33333 11.1 9.8 7 14.2 4.2C18.6667 1.4 23.6667 0 29.2 0C34.8 0 39.8 1.4 44.2 4.2C48.6 7 52.0667 11.1 54.6 16.5C57.2 21.8333 58.5 28.3333 58.5 36C58.5 43.6667 57.2 50.2 54.6 55.6C52.0667 60.9333 48.6 65 44.2 67.8C39.8 70.6 34.8 72 29.2 72ZM29.2 60.7C32.4667 60.7 35.3 59.8333 37.7 58.1C40.1 56.3 41.9667 53.5667 43.3 49.9C44.7 46.2333 45.4 41.6 45.4 36C45.4 30.3333 44.7 25.7 43.3 22.1C41.9667 18.4333 40.1 15.7333 37.7 14C35.3 12.2 32.4667 11.3 29.2 11.3C26.0667 11.3 23.2667 12.2 20.8 14C18.4 15.7333 16.5 18.4333 15.1 22.1C13.7667 25.7 13.1 30.3333 13.1 36C13.1 41.6 13.7667 46.2333 15.1 49.9C16.5 53.5667 18.4 56.3 20.8 58.1C23.2667 59.8333 26.0667 60.7 29.2 60.7Z" fill="white" fillOpacity="0.1"/>
                        <path d="M78.3875 71V6L84.0875 11.9H63.5875V0.999999H91.3875V71H78.3875Z" fill="white" fillOpacity="0.1"/>
                    </svg>
                    <svg className="numCircle" xmlns="http://www.w3.org/2000/svg" width="351" height="351" viewBox="0 0 351 351" fill="none">
                        <g filter="url(#filter0_f_32_231)">
                        <rect x="120" y="120" width="111" height="111" rx="55.5" fill="#5EA8FF"/>
                        </g>
                        <defs>
                        <filter id="filter0_f_32_231" x="0" y="0" width="351" height="351" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feGaussianBlur stdDeviation="60" result="effect1_foregroundBlur_32_231"/>
                        </filter>
                        </defs>
                    </svg>
                </div>
                <div className="newsPage__title">
                    <div className="line"></div>
                    <h4 className="news">НОВИНИ</h4>
                </div>
            </div>
            <div className="slider__container">
                <Carousel slidesToShow={4} slidesToScroll={1} className='slider_xxxl' arrows={true} dots={false} infinite={true} >
                    {news.map(newsItem => 
                        <div className="slider__element" key={newsItem.id}>
                            <div className="news__title">
                                <h1 className="news__name">{newsItem.title}</h1>
                                <h1 className="news__date">{newsItem.date}</h1>
                            </div>
                            <h1 className="news__text">{newsItem.text}</h1>
                        </div>
                    )}
                </Carousel>
                <Carousel slidesToShow={3} slidesToScroll={1} className='slider_xxl' arrows={true} dots={false} infinite={true}>
                    {news.map(newsItem => 
                        <div className="slider__element" key={newsItem.id}>
                            <div className="news__title">
                                <h1 className="news__name">{newsItem.title}</h1>
                                <h1 className="news__date">{newsItem.date}</h1>
                            </div>
                            <h1 className="news__text">{newsItem.text}</h1>
                        </div>
                    )}
                </Carousel>
            </div>
        </section>
        <section className="gournal__info" id="info">
        <div className="info__header">
            <svg className="secondNum" xmlns="http://www.w3.org/2000/svg" width="118" height="72" viewBox="0 0 118 72" fill="none">
                <path d="M29.2 72C23.6667 72 18.6667 70.6 14.2 67.8C9.8 65 6.33333 60.9333 3.8 55.6C1.26667 50.2 0 43.6667 0 36C0 28.3333 1.26667 21.8333 3.8 16.5C6.33333 11.1 9.8 7 14.2 4.2C18.6667 1.4 23.6667 0 29.2 0C34.8 0 39.8 1.4 44.2 4.2C48.6 7 52.0667 11.1 54.6 16.5C57.2 21.8333 58.5 28.3333 58.5 36C58.5 43.6667 57.2 50.2 54.6 55.6C52.0667 60.9333 48.6 65 44.2 67.8C39.8 70.6 34.8 72 29.2 72ZM29.2 60.7C32.4667 60.7 35.3 59.8333 37.7 58.1C40.1 56.3 41.9667 53.5667 43.3 49.9C44.7 46.2333 45.4 41.6 45.4 36C45.4 30.3333 44.7 25.7 43.3 22.1C41.9667 18.4333 40.1 15.7333 37.7 14C35.3 12.2 32.4667 11.3 29.2 11.3C26.0667 11.3 23.2667 12.2 20.8 14C18.4 15.7333 16.5 18.4333 15.1 22.1C13.7667 25.7 13.1 30.3333 13.1 36C13.1 41.6 13.7667 46.2333 15.1 49.9C16.5 53.5667 18.4 56.3 20.8 58.1C23.2667 59.8333 26.0667 60.7 29.2 60.7Z" fill="white" fillOpacity="0.1"/>
                <path d="M66.2875 71V62.3L94.0875 35.9C96.4208 33.7 98.1542 31.7667 99.2875 30.1C100.421 28.4333 101.154 26.9 101.488 25.5C101.888 24.0333 102.088 22.6667 102.088 21.4C102.088 18.2 100.987 15.7333 98.7875 14C96.5875 12.2 93.3542 11.3 89.0875 11.3C85.6875 11.3 82.5875 11.9 79.7875 13.1C77.0542 14.3 74.6875 16.1333 72.6875 18.6L63.5875 11.6C66.3208 7.93333 69.9875 5.1 74.5875 3.1C79.2542 1.03333 84.4542 0 90.1875 0C95.2542 0 99.6542 0.833333 103.387 2.5C107.188 4.1 110.088 6.4 112.088 9.4C114.154 12.4 115.188 15.9667 115.188 20.1C115.188 22.3667 114.888 24.6333 114.288 26.9C113.688 29.1 112.554 31.4333 110.888 33.9C109.221 36.3667 106.787 39.1333 103.588 42.2L79.6875 64.9L76.9875 60H117.887V71H66.2875Z" fill="white" fillOpacity="0.1"/>
            </svg>
            <div className="infoPage__title">
                <div className="line"></div>
                <h4 className="news">ЖУРНАЛ</h4>
            </div>
        </div>
        <div className="info__content">
            <div className="laptop__container">
                <img src="" alt="laptop" className="laptop"/>
            </div>
            <div className="info__block">
                <h1 className="info__h1">
                    Інформація у журналі
                </h1>
                <h4 className="info__paragraph">
                    На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі. Також журнал містить розклад занять, інформацію про проведення конференцій та семінарів, анонси важливих подій та оголошення.
                    Електронний щоденник дозволяє вчителям швидко та зручно вносити інформацію про оцінки, пропущені заняття та інші важливі події в житті коледжу, а  учням - дізнаватися про ці події негайно.
                </h4>
                <a href="#" className="info__btn">Увійти</a>
            </div>
        </div>
    </section>
    <section className="about__page" id="about">
        <div className="about__header">
            <div className="aboutPage__number">
                <svg className="thirdNum" xmlns="http://www.w3.org/2000/svg" width="117" height="72" viewBox="0 0 117 72" fill="none">
                    <path d="M29.2 72C23.6667 72 18.6667 70.6 14.2 67.8C9.8 65 6.33333 60.9333 3.8 55.6C1.26667 50.2 0 43.6667 0 36C0 28.3333 1.26667 21.8333 3.8 16.5C6.33333 11.1 9.8 7 14.2 4.2C18.6667 1.4 23.6667 0 29.2 0C34.8 0 39.8 1.4 44.2 4.2C48.6 7 52.0667 11.1 54.6 16.5C57.2 21.8333 58.5 28.3333 58.5 36C58.5 43.6667 57.2 50.2 54.6 55.6C52.0667 60.9333 48.6 65 44.2 67.8C39.8 70.6 34.8 72 29.2 72ZM29.2 60.7C32.4667 60.7 35.3 59.8333 37.7 58.1C40.1 56.3 41.9667 53.5667 43.3 49.9C44.7 46.2333 45.4 41.6 45.4 36C45.4 30.3333 44.7 25.7 43.3 22.1C41.9667 18.4333 40.1 15.7333 37.7 14C35.3 12.2 32.4667 11.3 29.2 11.3C26.0667 11.3 23.2667 12.2 20.8 14C18.4 15.7333 16.5 18.4333 15.1 22.1C13.7667 25.7 13.1 30.3333 13.1 36C13.1 41.6 13.7667 46.2333 15.1 49.9C16.5 53.5667 18.4 56.3 20.8 58.1C23.2667 59.8333 26.0667 60.7 29.2 60.7Z" fill="white" fillOpacity="0.1"/>
                    <path d="M88.3086 72C83.3753 72 78.5419 71.3 73.8086 69.9C69.1419 68.4333 65.2086 66.4333 62.0086 63.9L67.6086 53.8C70.1419 55.8667 73.2086 57.5333 76.8086 58.8C80.4086 60.0667 84.1753 60.7 88.1086 60.7C92.7753 60.7 96.4086 59.7667 99.0086 57.9C101.609 55.9667 102.909 53.3667 102.909 50.1C102.909 46.9 101.709 44.3667 99.3086 42.5C96.9086 40.6333 93.0419 39.7 87.7086 39.7H81.3086V30.8L101.309 7L103.009 11.9H65.4086V0.999999H113.109V9.7L93.1086 33.5L86.3086 29.5H90.2086C98.8086 29.5 105.242 31.4333 109.509 35.3C113.842 39.1 116.009 44 116.009 50C116.009 53.9333 115.009 57.5667 113.009 60.9C111.009 64.2333 107.942 66.9333 103.809 69C99.7419 71 94.5753 72 88.3086 72Z" fill="white" fillOpacity="0.1"/>
                </svg>
                <div className="thirdCircle"></div>
            </div>
            <div className="about__title">
                <div className="line"></div>
                <h4 className="news">ПРО НАС</h4>
            </div>
        </div>
        <div className="about__content">
            <div className="about__block">
                <h1 className="about__h1">Ми Кулак Вейдера</h1>
                <h4 className="about__paragraph">Ми, студенти коледжу зв’язку,  зібрались з метою створення нового та зручного інструменту для коледжу в якому ми навчаємось. Об’єднавши зусилля, ми зробили цей проект для полегшення навчального процесу в нашому коледжі. Нас об’єднав під своїм керівництвом Ігор Сергійович Сорока, та навчив нас ефективно працювати у команді.  Ми сподіваємось, що наш проект вам буде корисним.</h4>
            </div>
            <div className="about__img">
                <div className="sup__back"></div>
                <img className="sup__img" src='' alt="sup"/>
            </div>
            <div className="sup__circle"></div>
        </div>
    </section>
    </div>
}