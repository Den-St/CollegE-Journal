import { Link } from 'react-router-dom';
import { InstagramSvg } from '../../assets/svgs/instagram';
import { TelegramSvg } from '../../assets/svgs/telegram';
import './styles.scss';

export const HomePage = () => {
    return <div>
            <section className="first_screen" id="start">
            <div className="container">
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
                        <path d="M29.2 72C23.6667 72 18.6667 70.6 14.2 67.8C9.8 65 6.33333 60.9333 3.8 55.6C1.26667 50.2 0 43.6667 0 36C0 28.3333 1.26667 21.8333 3.8 16.5C6.33333 11.1 9.8 7 14.2 4.2C18.6667 1.4 23.6667 0 29.2 0C34.8 0 39.8 1.4 44.2 4.2C48.6 7 52.0667 11.1 54.6 16.5C57.2 21.8333 58.5 28.3333 58.5 36C58.5 43.6667 57.2 50.2 54.6 55.6C52.0667 60.9333 48.6 65 44.2 67.8C39.8 70.6 34.8 72 29.2 72ZM29.2 60.7C32.4667 60.7 35.3 59.8333 37.7 58.1C40.1 56.3 41.9667 53.5667 43.3 49.9C44.7 46.2333 45.4 41.6 45.4 36C45.4 30.3333 44.7 25.7 43.3 22.1C41.9667 18.4333 40.1 15.7333 37.7 14C35.3 12.2 32.4667 11.3 29.2 11.3C26.0667 11.3 23.2667 12.2 20.8 14C18.4 15.7333 16.5 18.4333 15.1 22.1C13.7667 25.7 13.1 30.3333 13.1 36C13.1 41.6 13.7667 46.2333 15.1 49.9C16.5 53.5667 18.4 56.3 20.8 58.1C23.2667 59.8333 26.0667 60.7 29.2 60.7Z" fill="white" fill-opacity="0.1"/>
                        <path d="M78.3875 71V6L84.0875 11.9H63.5875V0.999999H91.3875V71H78.3875Z" fill="white" fill-opacity="0.1"/>
                    </svg>
                    <svg className="numCircle" xmlns="http://www.w3.org/2000/svg" width="351" height="351" viewBox="0 0 351 351" fill="none">
                        <g filter="url(#filter0_f_32_231)">
                        <rect x="120" y="120" width="111" height="111" rx="55.5" fill="#5EA8FF"/>
                        </g>
                        <defs>
                        <filter id="filter0_f_32_231" x="0" y="0" width="351" height="351" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
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
                <div className="slider__wrapper">
                    <div className="news__list">
                        <div className="slider__element">
                            <div className="news__title">
                                <h1 className="news__name">Рабські збори</h1>
                                <h1 className="news__date">07.05.2023</h1>
                            </div>
                            <h1 className="news__text">На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі...</h1>
                        </div>
                        <div className="slider__element">
                            <div className="news__title">
                                <h1 className="news__name">Сдача Формул</h1>
                                <h1 className="news__date">10.14.2023</h1>
                            </div>
                            <h1 className="news__text">На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі...</h1>
                        </div>
                        <div className="slider__element">
                            <div className="news__title">
                                <h1 className="news__name">Сорока працює</h1>
                                <h1 className="news__date">06.04.2023</h1>
                            </div>
                            <h1 className="news__text">На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі...</h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
}