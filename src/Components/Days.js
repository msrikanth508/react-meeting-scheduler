import React from "react";
import { datehelper } from '../utils/';
import PropTypes from "react-proptypes";

/**
 * Days component to render entire week
 *
 */
const Days = ({ range, onColumnClicked }) => (
  <div className="days row">
    {[<div className="col col-center" key="header-placeholder" />].concat(
      range.map(day => {
        const cx = ["col", "col-center", "row-header"];
        if (datehelper.isToday(day)) {
          cx.push("today");
        } else if (datehelper.isPast(day)) {
          cx.push("past");
        }
        return (
          <div
            className={cx.join(" ")}
            key={day.toString()}
            onClick={e => {
              onColumnClicked(e, day);
            }}
          >
            <div className="small">{day.format("ddd")}</div>
            <div className="large">{day.date()}</div>
          </div>
        );
      })
    )}
  </div>
);

Days.propTypes = {
  range: PropTypes.array,
  onColumnClicked: PropTypes.func
};

export default Days;
