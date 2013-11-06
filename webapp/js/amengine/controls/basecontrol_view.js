/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'controlviewcollection'], function (
    $, jqM, Backbone, ControlViewCollection) {
    
    var C = {
        ID: "ID"
    },
    BaseControlView = Backbone.View.extend({
        initialize: function (options) {
            if (typeof options !== "undefined") {
                this.model = options.model;
            }
            ControlViewCollection.getCurrentInstance().add({view: this});            
        },

        render: function () {

            this.$el.empty().append(this.template($.extend(
                    {},
                    this.model.toJSON(),
                    this.additionalModel ? this.additionalModel.toJSON() : {}
                )));
            this.$el.trigger("create");
            return this.el;
        },
        attributes: {
            'data-role': 'fieldcontain'
        },
        getValue: function(){
            debug.log(this.model.get(C.ID), 'Control getValue not overridden');
            return {};
        },
        setErrorMessage: function(message) {
            this.$el.find('.error').empty().append("<span>" + message + "</span>");
        },
        reloadModel: function(newmodel) {
            this.model = newmodel;
            this.render();
        }
    });
    return BaseControlView;
});
