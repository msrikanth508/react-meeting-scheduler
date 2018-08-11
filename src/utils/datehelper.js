import moment from "moment";

/**
 * Date helper object
 */
const datehelper = {
  /**
   *
   * generateHalfHourSlots
   * @param {object} date
   * @returns
   */
  generateHalfHourSlots: function(date) {
    let d = date.clone().startOf("day");
    const nextDay = d.clone().add(1, "d");
    const slots = [];

    while (d < nextDay) {
      slots.push(d);
      d = d.clone().add(30, "m");
    }
    return slots;
  },
  /**
   *
   * getTimeSlots
   * @param {object} [date=moment()]
   * @returns
   */
  getTimeSlots: function(date = moment()) {
    // TODO: Implement memorization
    return this.generateHalfHourSlots(date).map(item => ({
      label: item.format("HH:mm"),
      value: item.format("HH:mm")
    }));
  },
  /**
   *
   * isSameDay
   * @param {object} d1
   * @param {object} d2
   * @returns
   */
  isSameDay: function(d1, d2) {
    return d1.isSame(moment(d2), "day");
  },
  /**
   *
   * isToday
   * @param {object} date
   * @returns
   */
  isToday: function(date) {
    return date.isSame(moment(), "day");
  },
  /**
   *
   * isPast
   * @param {object} date
   * @returns
   */
  isPast: function(date) {
    return date.isBefore(moment(), "day");
  },
  /**
   *
   * isSameOrBefore
   * @param {object} d1
   * @param {object} d2
   * @returns
   */
  isSameOrBefore: function(d1, d2) {
    return d1.isSameOrBefore(d2);
  },
  /**
   *
   * mergeDateTime
   * @param {string} date
   * @param {string} time
   * @returns
   */
  mergeDateTime: function(date, time) {
    const t = moment(date);
    const minHours = time.split(":", 2);
    t.set({
      h: minHours[0],
      m: minHours[1],
      s: 0
    });
    return t;
  },
  /**
   *
   * diffInHours
   * @param {object} start
   * @param {object} end
   * @returns
   */
  diffInHours: function(start, end) {
    return moment.duration(moment(start).diff(end)).asHours();
  },
  /**
   *
   * format date
   * @param {object} date
   * @param {strning} format
   * @returns
   */
  format: function(date, format) {
    return moment(date).format(format);
  },
  /**
   *
   * getWeekRange
   * @param {object} [currentDate=this.currentDate()]
   * @returns
   */
  getWeekRange: function(currentDate = this.currentDate()) {
    var startOfWeek = moment(currentDate).startOf("isoWeek");
    var endOfWeek = moment(currentDate).endOf("isoWeek");

    var days = [];
    var day = startOfWeek;

    while (day <= endOfWeek) {
      days.push(day);
      day = day.clone().add(1, "d");
    }

    return days;
  },

  now: function() {
    return moment();
  },
  convertToDate: function(date) {
    return moment(date);
  },
  getNextWeek: function(date) {
    return moment(date).add(1, "w");
  },
  getPrevWeek: function(date) {
    return moment(date).subtract(1, "w");
  },
  currentDate: function() {
    return moment().startOf("day");
  }
};

export default datehelper;
