import React from "react";
import PropTypes from "react-proptypes";
import constants from "../constants/";

/**
 * This stateless component renders 30min time slots on calendar
 */
const TimeSlot = ({ start, end, needTitle, ...rest }) => {
  return (
    <div
      className="time-slot"
      data-start={start.toString()}
      data-end={end.toString()}
      {...rest}
    >
      {needTitle ? start.format(constants.timeSlotFormat) : ""}
    </div>
  );
};

TimeSlot.propTypes = {
  start: PropTypes.object,
  end: PropTypes.object,
  needTitle: PropTypes.bool
};
export default TimeSlot;
