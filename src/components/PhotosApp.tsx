import React from "react";
import flickrService from "../flickrService";
import { Alert, Backdrop, Button, CircularProgress, IconButton, ImageList, ImageListItem, ImageListItemBar, Snackbar, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function PhotosApp() {
    const [photoArray, setPhotoArray] = React.useState<any[]>([])
    const [userInput, setUserInput] = React.useState<string>("Burger")
    const [photoCount, setPhotoCount] = React.useState<number>(5)
    const [open, setOpen] = React.useState(false)
    const [errorOpen, setErrorOpen] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState<string>("")

    React.useEffect(() => {
        setOpen(true)
        flickrService({ photoCount: photoCount, searchTerm: userInput }).then((res) => {
            if (res.stat !== 'ok') {
                setErrorMessage(res.message)
                setErrorOpen(true)
            } else {
                setPhotoArray(res.photos.photo)
            }
            setOpen(false)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function inputChangeHandler(e: any) {
        setUserInput(e.target.value)
    }

    function photoCountChangeHandler(e: any) {
        setPhotoCount(e.target.value)
    }

    function submitHandler() {
        flickrService({ photoCount: photoCount, searchTerm: userInput }).then((res) => {
            setPhotoArray(res.photos.photo)
        })
    }

    function loadingChangeHandler() {
        setOpen(false)
    }

    function handleErrorClose() {
        setErrorOpen(false)
    }

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleErrorClose}
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
                onClose={handleErrorClose}
            >
                <Alert onClose={handleErrorClose} severity="error">{"Failed to get photos: " + errorMessage}</Alert>
            </Snackbar>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onChange={loadingChangeHandler}
            >
                <CircularProgress color="inherit" />
            </Backdrop>


            <div className="centerPhotoApp">
                <TextField label="Search" variant="outlined" value={userInput} onChange={inputChangeHandler} />
                <TextField label="Photo Count" variant="outlined" value={photoCount} onChange={photoCountChangeHandler} type="number" />
                <Button onClick={submitHandler}>Submit</Button>
            </div>
            <div style={{ justifyContent: "center", display: "flex" }}>
                <ImageList sx={{ width: 1000, height: 700 }}>
                    {photoArray.map((item) => (
                        <ImageListItem key={item.img}>
                            <img
                                src={constructImageURL(item, 'c')}
                                alt="FlickrPhoto"
                                //srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={item.title}
                                // subtitle={<span>by: {item.author}</span>}
                                position="below"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
            {/* <div className="centerPhotoApp">
                <Button disabled={currentPhotoIndex === 0} onClick={backChangeHandler}>Back</Button>
                <Button disabled={currentPhotoIndex === photoArray.length - 1} onClick={nextChangeHandler}>Next</Button>
            </div >
            <div className="centerPhotoApp">
                <img src={constructImageURL(photoArray[currentPhotoIndex], 'c')} alt="FlickrPhoto" />
            </div>
            <div className="centerPhotoApp">
                {caption}
            </div> */}
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