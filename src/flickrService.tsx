async function flickrService(state:any) {
    const proxyServer = "https://cors-anywhere.herokuapp.com/"
    const domain = "https://flickr.com"
    const path = "/services/rest/"
    const apiKey = 'bcf368a66e71561fa1c30393a25f8dd9'
    const queryString = `api_key=${apiKey}&format=json&nojsoncallback=1`
    + `&method=flickr.photos.search&safe_search=1&per_page=${state.photoCount}`
    + `&text=${state.searchTerm}`
    //+ `&geo_context="indoors"`
    //+ `&lat=${state.lat}&lon=${state.lon}

    const URL = `${proxyServer + domain + path}?${queryString}`

    const response = await fetch(URL)
    const jsonResponse = await response.json() 
    return jsonResponse
    // return fetch(URL).then((response) => {
    //     return response.json()
    // }).catch(err=>{
    //     console.warn(err.message)
    // })
}

export default flickrService;
