/**
 * Created by dilip on 24/7/17.
 */

'use strict';

function BGBarModel() {

    var obj = {};


    obj.applyRelationship = function(input, limit){
        var temp = [];
        _.each(input, function(value,key){
            temp.push({"input": value, "width":(value*100/limit)+"%", limit: limit,name:"Position of Bar :"+(key+1)})
        });
       return temp
    };


    return {

        getAggregatedData: function (response) {
            var barGraphData = [];
            barGraphData = obj.applyRelationship(response.bars, response.limit);
            return barGraphData;
        }
    }
}