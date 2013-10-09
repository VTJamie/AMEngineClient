/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'basecontrolview', 'complexlistitemeditrequestmodel', 'hbs!complexitemlisttemplate'], function (
    $, jqM, Backbone, BaseControlView, ComplexListItemEditRequestModel, Template) {
    "use stric";
    var C = {
        ID: "ID"
    },
    ComplexItemListView = BaseControlView.extend({
            initialize: function (options) {
                BaseControlView.prototype.initialize.apply(this, arguments);
                this.template = Template;
            },
            events: $.extend({
                'click .complexitemlist-item': 'linkItemClicked'
            }, BaseControlView.prototype.events),
            getValue : function () {
                return {};
            },
            linkItemClicked: function(e) {
                ComplexListItemEditRequestModel.request({
                    REQUEST_COMPLEX_ITEM_ID: $(e.target).closest('tr').attr('data-id'),
                    REQUEST_FIELD_ACTION_PROPERTY_NAME: this.model.get(C.ID)
                }, function(responsemodel){
                    debug.log(responsemodel);
                });
                return false;
            }
    });
    return ComplexItemListView;
});
