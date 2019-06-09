export function request(path: string) {
    return new Promise(resolve => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', path, true);
        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log("resp"+xhr.responseText);
              resolve(true);
            } else {
              console.error(">", xhr.statusText);
              resolve(false);
            }
          }
        };
        xhr.onerror = function (e) {
          console.error("> "+ xhr.statusText);
          resolve(false);
        };
        xhr.send();
      })
}
