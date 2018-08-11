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

  return renderEvents.map(item => {
    const durationInHours = datehelper.diffInHours(item.start, date);
    const eventDuration = datehelper.diffInHours(item.end, item.start);
    const eventStyle = {
      top: `${durationInHours * baseHeight}px`,
      height: `${eventDuration * baseHeight}px`,
      width: "12.5%"
    };
    const titleStyles = {};

    if (eventDuration === 0.5) {
      titleStyles.width = "50%";
      titleStyles.textAlign= 'left';
    }
    return (
      <div
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
          {`${datehelper.format(item.start, "HH:mm")} - ${datehelper.format(
            item.end,
            "HH:mm"
          )}`}
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
