export default
  f => (...x) =>
    new Promise((resolve, reject) => {
      f(...x, (err, result) => {
        if (err) {
          reject(err)
        }
        else {
          resolve(result)
        }
      })
    })
