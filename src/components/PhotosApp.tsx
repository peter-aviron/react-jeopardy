import React from "react";
import flickrService from "../flickrService";
import { Alert, Backdrop, Button, CircularProgress, IconButton, ImageList, ImageListItem, ImageListItemBar, Snackbar, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

// farm
// : 
// 66
// id
// : 
// "52339858772"
// isfamily
// : 
// 0
// isfriend
// : 
// 0
// ispublic
// : 
// 1
// owner
// : 
// "92354342@N00"
// secret
// : 
// "ac2621e58f"
// server
// : 
// "65535"
// title
// : 
// "Surviving half of my Beaconsfield burger from Shorts Eastside"

interface Photo {
    farm: number, 
    id: string, 
    isfamily:  0 | 1, 
    isfriend: 0 | 1, 
    ispublic: 0 | 1, 
    owner: string, 
    secret: string, 
    server: string, 
    title: string
}


function PhotosApp() {
    const [photoArray, setPhotoArray] = React.useState<Photo[]>([])
    const [userInput, setUserInput] = React.useState<string>("Burger")
    const [photoCount, setPhotoCount] = React.useState<number>(5)
    const [loading, setLoading] = React.useState(false)
    const [errorOpen, setErrorOpen] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState<string>("")
    const [lat, setLat] = React.useState<number>(41.6578)
    const [lon, setLon] = React.useState<number>(-91.5346)

    const requestObj = {photoCount: photoCount, searchTerm: userInput, lat: lat, lon: lon}

    console.log("photoArray")
    console.log(photoArray)

    React.useEffect(() => {
        setLoading(true)
        flickrService(requestObj).then((res) => {
            setLoading(false)
            if (!res.stat) {
                setErrorMessage('Failed to reach the server')
                setErrorOpen(true)
                return
            }
            if (res.stat !== 'ok') {
                setErrorMessage(res.message)
                setErrorOpen(true)
            } else {
                setPhotoArray(res.photos.photo)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function submitHandler() {
        flickrService(requestObj).then((res) => {
            setPhotoArray(res.photos.photo)
        })
    }
    
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={()=> setErrorOpen(false)}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    return (
        <>
            <Snackbar
                open={errorOpen}
                autoHideDuration={6000}
                action={action}
                onClose={()=> setErrorOpen(false)}
            >
                <Alert onClose={()=> setErrorOpen(false)} severity="error">{"Failed to get photos: " + errorMessage}</Alert>
            </Snackbar>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                onChange={()=> setLoading(false)}
            >
                <CircularProgress color="inherit" />
            </Backdrop>


            <div className="centerPhotoApp">
                <TextField label="Latitude" variant="outlined" value={lat} onChange={(e:any)=>setLat(e.target.value)} />
                <TextField label="Longitude" variant="outlined" value={lon} onChange={(e:any)=>setLon(e.target.value)} />
                <TextField label="Search" variant="outlined" value={userInput} onChange={(e)=>setUserInput(e.target.value)} />
                <TextField label="Photo Count" variant="outlined" value={photoCount} onChange={(e:any)=>setPhotoCount(e.target.value)} type="number" /> 
                {/* TODO: look into type on photoCount */}
                <Button onClick={submitHandler}>Submit</Button>
            </div>
            <div style={{ justifyContent: "center", display: "flex" }}>
                <ImageList sx={{ width: 1000, height: 700 }}>
                    {photoArray.map((item) => (
                        <ImageListItem key={item.id}>
                            <img
                                src={constructImageURL(item, 'c')}
                                alt="FlickrPhoto"
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={item.title}
                                position="below"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
        </>
    )
}

function constructImageURL(photoObj: any, size: any) {
    if (!photoObj) return
    return "https://farm" + photoObj.farm +
        ".staticflickr.com/" + photoObj.server +
        "/" + photoObj.id + "_" + photoObj.secret + "_" + size + ".jpg";
}


export default PhotosApp;