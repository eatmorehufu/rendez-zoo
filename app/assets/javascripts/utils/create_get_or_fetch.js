RendezZoo.Mixins.createGetOrFetch = {
  getOrFetch: function(id) {
    var model = this.get(id);
    if (model){
      model.fetch();
    } else {
      model = new this.model({ id: id });
      model.fetch({
        success: function(){
          this.remove(model);
          this.add(model, { merge: true });
        }.bind(this)
      });
    };

    return model;
  }
}
