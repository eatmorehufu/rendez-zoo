RendezZoo.formatTimeMixin = {
  formatTime: function(timeString) {
    var formatted = {}
    if (timeString) {
      var newString = timeString.slice(0, -5)
      formatted.fullDay = Date.parse(newString).toString("dddd, MMMM d, yyyy");
      formatted.shortDay = Date.parse(newString).toString("ddd, MMM d");
      formatted.fullTime = Date.parse(newString).toString("h:mm tt");
      formatted.mediumDay = Date.parse(newString).toString("MMMM dd");
      formatted.monthYear = Date.parse(newString).toString("MMMM, yyyy");
    }
    return formatted;
  }

}
