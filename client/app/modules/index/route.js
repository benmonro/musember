Client.IndexRoute = Ember.Route.extend({
  setupController: function (controller) {
    controller.set("content", Client.IndexModel.find());
  }
});

