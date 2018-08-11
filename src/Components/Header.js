import React from "react";
import PropTypes from "react-proptypes";
import constants from "../constants/";

/**
 * This stateless component renders calendar current month and
 * narrow icons to change week
 */
const Header = ({ nextWeek, prevWeek, date }) => (
  <div className="header row flex-middle">
    <div className="col col-start">
      <div className="icon" onClick={prevWeek}>
        chevron_left
      </div>
    </div>
    <div className="col col-center">
      <span>{date.format(constants.headerDateFormat)}</span>
    </div>
    <div className="col col-end" onClick={nextWeek}>
      <div className="icon">chevron_right</div>
    </div>
  </div>
);

Header.propTypes = {
  nextWeek: PropTypes.func,
  prevWeek: PropTypes.func
};
export default Header;
