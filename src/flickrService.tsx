
function flickrService(state:any) {
    //const proxyServer = "https://shrouded-mountain-15003.herokuapp.com/"
    const domain = "https://flickr.com"
    const path = "/services/rest/"
    const apiKey = 'bcf368a66e71561fa1c30393a25f8dd9'
    const queryString = `api_key=${apiKey}&format=json&nojsoncallback=1`
    + `&method=flickr.photos.search&safe_search=1&per_page=${state.photoCount}`
    // + `&lat=${state.lat}&lon=${state.lon}&text=${state.searchTerm}`

    const URL = `${domain + path}?${queryString}`

    return fetch(URL).then((response) => {
        return response.json()
    }).catch(err=>{
        console.warn(err.message)
    })
}

export default flickrService;
