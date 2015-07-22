RendezZoo.Mixins.Locatable = {
  location: function(){
    if (!this._location) {
      this._location = new RendezZoo.Models.Geolocation();
    }

    return this._location;
  }
}
