RendezZoo.Mixins.getZipCode = {
  getZipCode: function(event) {
    var zipcode = $(event.currentTarget).val().substring(0, 5);
    if (zipcode.length == 5 && /^[0-9]+$/.test(zipcode)) {
      $.ajax({
        url: "http://ZiptasticAPI.com/" + zipcode,
        dataType: "json",
        success: function(data){
          this.$('#city').html(data.city);
          this.$('#state').html(data.state);
          this._city = data.city;
          this._state = data.state;
        }.bind(this)
      })
    }
  }
}
