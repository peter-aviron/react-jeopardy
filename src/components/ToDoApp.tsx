import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import "../ToDoApp.css";
import { Grid, TextField, Button, Checkbox } from '@mui/material';

function ToDoApp() {
  const [toDoArray, setToDoArray] = React.useState<string[]>([])
  const [selectedToDoIndexArray, setSelectedToDoIndexArray] = React.useState<number[]>([])
  const [inputText, setInputText] = React.useState<string>('')
  const [editIndex, setEditIndex] = React.useState<number>()
  const [editInputText, setEditInputText] = React.useState<string>('')
  const [filteredToDoArray, setFilteredToDoArray] = React.useState<string[]>([])
  const [filteredText, setFilteredText] = React.useState<string>('')

  let submitClickHandler = () => {
    if (inputText.length > 0) {
      setToDoArray((prevArray) => {
        let newArray = [...prevArray, inputText]
        return newArray
      })
    }
    setInputText("")
  }

  let editClickHandler = (e:any, index:number) => {
    setEditIndex(index)
  }

  let deleteClickHandler = (e:any, index:number) => {
    setToDoArray((prevArray) => {
      return prevArray.filter((item, i) => i !== index)
    })
    if (editIndex === index) {
      setEditIndex(undefined)
      setEditInputText("")
    }
  }

  let saveClickHandler = (e:any, index:number) => {
    setToDoArray((prevArray) => {
      prevArray[index] = editInputText
      return [...prevArray]
    })
    setEditIndex(undefined)
    setEditInputText("")
  }

  let bulkDeleteClickHandler = () => {
    let copyToDo = [...toDoArray]
    for (let i = 0; i < copyToDo.length; i++) {
      if (selectedToDoIndexArray.includes(i)) {
        copyToDo.splice(i, 1)
      }
    }
    setToDoArray(copyToDo.filter((item) => {
      return item
    }))
    setSelectedToDoIndexArray([])
  }

  let renderToDo = (item: string, index: number) => {
    return (
      <ListItem className="IndieFlower" style={{ display: "flex", justifyContent: "center" }} key={index}>
        <Checkbox checked={selectedToDoIndexArray.includes(index)} onClick={(e) => {
          setSelectedToDoIndexArray((prevArray) => {
            let newArray = [...prevArray, index]
            return newArray
          })
        }} />
        {editIndex === index ? <input value={editInputText} onChange={(e) => {
          let textValue = e.target.value
          setEditInputText(textValue)
        }}></input> : item}

        {editIndex === index ? <SaveAltIcon onClick={(e) => { saveClickHandler(e, index) }}>Save</SaveAltIcon> : <EditIcon onClick={(e) => { editClickHandler(e, index) }}>
          Edit
        </EditIcon>}
        <DeleteIcon onClick={(e) => { deleteClickHandler(e, index) }} />
      </ListItem>
    )
  }

  React.useEffect(() => {
    let currentItem = toDoArray[editIndex??0]
    if (currentItem !== undefined) {
      setEditInputText(currentItem)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editIndex])

  React.useEffect(() => {
    let filteredToDos = toDoArray.filter((toDo) => {
      return toDo.includes(filteredText)
    })
    setFilteredToDoArray(filteredToDos)
  }, [filteredText, toDoArray])

  return (
    <Grid container direction="column" className="App Notebook" justifyContent={"space-between"}>
      <Grid item>
        <div className="IndieFlower" style={{ fontSize: "36px" }}>To Do List</div>
        <TextField style={{ backgroundColor: "#f7f5f2" }} label={'search'} value={filteredText} onChange={(e) => {
          setFilteredText(e.target.value)
        }} />
        <TextField style={{ backgroundColor: "#f7f5f2" }} variant="outlined" value={inputText} onKeyDown={(e) => {
          if (e.key === "Enter") {
            submitClickHandler()
          }
        }} onChange={(e) => {
          let textValue = e.target.value
          setInputText(textValue)
        }} />
        <Button variant="contained" style={{ height: '56px' }} onClick={submitClickHandler}>Submit</Button>
      </Grid>
      <List>
        {filteredText ? filteredToDoArray.map(renderToDo) : toDoArray.map(renderToDo)}
      </List>
      <Grid item>
        <Button variant="contained" style={{ width: '200px', }} onClick={bulkDeleteClickHandler}>Delete Selected</Button>
      </Grid>
    </Grid>
  );
}
//<TextField id="standard-basic" label="Standard" variant="standard" />

export default ToDoApp;

//Save value of input to put on the page when the button is clicked
//clear the value after the button is clicked