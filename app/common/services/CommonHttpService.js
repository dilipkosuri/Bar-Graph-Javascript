/**
 * Created by DILIP KOSURI on 24/07/17.
 */

'use strict';
function HttpService($http, BASE_URL) {

  return {

    setData: function (response) {
      angular.extend(this, response);
    },

    load: function(endurl) {

      return $http({
        url: endurl,
        method: "GET"

      }).then(function(response) {
        if (response.data) {
            return response.data;
        }
      }, function(response) {
        message = "The server is not avaialble. Please try again later.";
        
      });
    }
  };

}