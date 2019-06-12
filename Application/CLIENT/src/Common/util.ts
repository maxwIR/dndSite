export function request(path: string): Promise<string>{
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', path, true);
        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log("resp"+xhr.responseText);
              resolve(xhr.responseText);
            } else {
              console.error(">", xhr.statusText);
              resolve(xhr.statusText);
            }
          }
        };
        xhr.onerror = function (e) {
          console.error("> "+ xhr.statusText);
          reject(e);
        };
        xhr.send();
      })
}
