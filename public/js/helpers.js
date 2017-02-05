'use strict';

window.Helpers = (() => {
  function checkResponseStatus(response) {
    if (response.ok) {
      return response;
    }

    throw new Error(response.statusText);
  }

  function getResponseJSON(response) {
    return response.json();
  }

  return {
    checkResponseStatus,
    getResponseJSON,
  };
})();
