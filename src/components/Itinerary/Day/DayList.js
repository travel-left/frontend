import React from 'react'
import Day from './Day'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
}

const DayList = ({ days, currentDayId, removeDay, setCurrentDay }) => {
    let dayList = days.map(day => {
        return day._id === currentDayId ? (
            <Day key={day._id} date={day.date} dayId={day._id} setCurrentDay={setCurrentDay} isCurrentDay={true} removeDay={removeDay} />
        ) : (
            <Day key={day._id} date={day.date} dayId={day._id} setCurrentDay={setCurrentDay} isCurrentDay={false} removeDay={removeDay} />
        )
    })

    return <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>{          <Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={false} // means to render carousel on server-side.
        slidesToSlide={2}
        infinite={false}
        centerMode={true}
        autoPlay={false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40px"
      >
          {dayList}
      </Carousel>}</div>
}

export default DayList
