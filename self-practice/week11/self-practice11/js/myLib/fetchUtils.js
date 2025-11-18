/* Part 06 - Fetch APIs */
//fetch API

// async-await
async function getItems(url) {
  try {
    const res = await fetch(url)
    const items = await res.json() //json() - convert json to JavaScript Object
    return items
  } catch (e) {
    throw new Error(`There is a problem, cannot read items`)
  }
}

// .then().catch()
function getItems(url) {
  return fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json(); // convert json to JavaScript Object
    })
    .then(items => {
      return items;
    })
    .catch(e => {
      throw new Error(`There is a problem, cannot read items`);
    });
}

export { getItems }