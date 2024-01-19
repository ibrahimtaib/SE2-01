let virtualDate = null;

function getDate() {
  return virtualDate ? virtualDate : new Date();
}

module.exports = {
  /**
   * Returns the date currently set in the virtual clock.
   * @date 2023-12-07
   * @returns {Date}
   */
  getVirtualClock: () => {
    return getDate();
  },

  /**
   * Sets the date in the virtual clock.
   * @date 2023-12-07
   * @param {Date} newDate
   * @returns {Date}
   */
  setVirtualClock: (newDate) => {
    return (virtualDate = newDate);
  },

  /**
   * Resets the date to the current instant.
   * @date 2023-12-07
   * @returns {Date}
   */
  resetVirtualClock: () => {
    return (virtualDate = null);
  },
};
