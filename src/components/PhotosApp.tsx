import React from "react";
import flickrService from "../flickrService";

function PhotosApp() {
    function constructImageURL(photoObj: any, size: any) {
        if (!photoObj) return
        return "https://farm" + photoObj.farm +
            ".staticflickr.com/" + photoObj.server +
            "/" + photoObj.id + "_" + photoObj.secret + "_" + size + ".jpg";
    }
    let response = flickrService({ photoCount: 1 }).then((res) => {
        return res
    })
    console.log(response)
    return (
        <>
            {/* <img src={constructImageURL()} alt="FlickrPhoto"> </img> */}
        </>
    )
}



export default PhotosApp;