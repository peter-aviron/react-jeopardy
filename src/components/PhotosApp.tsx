import React from "react";
import flickrService from "../flickrService";

function PhotosApp() {
    let response = flickrService({photoCount: 1})
    console.log(response)
    return <>Photos</>
}



export default PhotosApp;