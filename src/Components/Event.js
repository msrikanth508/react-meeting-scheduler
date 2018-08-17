import React from "react";
import { datehelper } from '../utils/';
import PropTypes from "react-proptypes";

/**
 * Event renders event slot on calendar
 */
const Event = ({ events, date, onDragStart, onEventClicked }) => {
  // const baseWidth = 12.5;
  const baseHeight = 40;
  const renderEvents = events.filter(event =>
    datehelper.isSameDay(date, event.start)
  );
  const timeCollisionMapping = {};

  return renderEvents.map(item => {
    const durationInHours = datehelper.diffInHours(item.start, date);
    const eventDuration = datehelper.diffInHours(item.end, item.start);
    const eventStyle = {
      top: durationInHours * baseHeight,
      height: eventDuration * baseHeight,
      width: "12.5%"
    };
    const titleStyles = {};
    const timing = `${datehelper.format(item.start, "HH:mm")} - ${datehelper.format(
      item.end,
      "HH:mm"
    )}`
    if (eventDuration <= 0.5) {
      titleStyles.width = "50%";
      titleStyles.textAlign= 'left';
    }
    if(!timeCollisionMapping[timing]) {
      timeCollisionMapping[timing] = 1;
    } else {
      const minus =  timeCollisionMapping[timing] * 50;
      eventStyle.top += minus;
      eventStyle.height -= minus;
      timeCollisionMapping[timing] +=  1;
    }
    eventStyle.top += 'px';
    eventStyle.height += 'px';
    return (
      <div
        key={item.id}
        className="event"
        style={eventStyle}
        onDragStart={e => onDragStart(e, item.id)}
        draggable
        onClick={e => onEventClicked(e, item.id)}
        title={item.message || null}
      >
        <div className="title" style={titleStyles} title={item.title}>
          {item.title}
        </div>
        <div className="content">
          {timing}
        </div>
      </div>
    );
  });
};

Event.propTypes = {
  range: PropTypes.array,
  date: PropTypes.object,
  onDragStart: PropTypes.func,
  onEventClicked: PropTypes.func
};

export default Event;
