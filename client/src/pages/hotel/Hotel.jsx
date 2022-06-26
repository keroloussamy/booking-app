import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetHotelQuery } from "../../api/apiSlice";
import SearchContext from "../../context/SearchContext";
import AuthContext from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import Loader from "../../components/loader/Loader";
import "./hotel.css";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hotelId = location.pathname.split("/")[2];

  const [slideNumber, setSlideNumber] = useState(0);
  const [openImgModel, setOpenImgModel] = useState(false);
  const [openReserveModal, setOpenReserveModal] = useState(false);

  const { data, isLoading } = useGetHotelQuery(hotelId);
  const { dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  console.log(dates);
  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleOpenImgModel = (i) => {
    setSlideNumber(i);
    setOpenImgModel(true);
  };

  const handleMoveImgModel = (direction) => {
    let newSlideNumber;

    if (direction === "left") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  const handleClickReserve = () => {
    if (user) {
      setOpenReserveModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {isLoading ? (
        <Loader />
      ) : (
      <div className="hotelContainer">

        {openImgModel && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpenImgModel(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMoveImgModel("left")}
            />
            <div className="sliderWrapper">
              <img src={data.photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMoveImgModel("right")}
            />
          </div>
        )}

        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">
          Excellent location – {data.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
          </span>

          <div className="hotelImages">
            {data.photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpenImgModel(i)}
                  src={photo}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
            </div>
            <div className="hotelDetailsPrice">
            <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> {days} nights
                </h2>
              <button onClick={handleClickReserve}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
      )}
      {openReserveModal && <Reserve setOpenReserveModal={setOpenReserveModal} hotelId={hotelId}/>}
    </div>
  )
}

export default Hotel