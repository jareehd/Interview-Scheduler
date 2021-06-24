import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Link} from "../Constant";
import clsx from 'clsx';
import {makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import DateTimePicker from 'react-datetime-picker'
import Button from 'react-bootstrap/Button'

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} Participant selected
        </Typography>
      }
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));


export default function Create() {
  const classes = useStyles();
  const url = Link.users
  const baseURL = Link.interviews
  const [ loading, setloading ] = useState(true)
  const [ items, setitem ] = useState([])
  const [ emails, setemailstate ] = useState([])
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date()); 
  const [resume, setResume] = useState(""); 
  const [page, setPage] = React.useState(0); 
  const rowsPerPage = 5
  
  useEffect( ()=>{
    const fetch = async ()=>{
        try {
            const Axios = axios.create({baseURL : url})
            const result = await Axios.get()
            setloading(false)
            const users = result.data
            setitem(users)
            
        } catch (e) {
            console.log(e)
        }
    }
    fetch()
  },[])
    
    const handleAdd = (email) => {
        setemailstate(pre=>[
            ...pre,email
        ])
    }
     
    const handleRemove = (email)=>{
     const newEmails = emails.filter ( (item)=> item!==email)
     setemailstate(newEmails)
   }

  const handleClick = (event, email) => {
    emails.includes(email) ? (handleRemove(email)) : handleAdd(email)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
   
  const handleResume = async (event) => {
      const file = event.target.files[0];
      
      function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }
       
      getBase64(file).then(
        data => setResume(data)
      );
       
  }

  const handleSubmit = ()=>{
    if(start>end)
     return alert('Start time should be before or equal to End time')
    const users = items.filter( (item) => emails.includes(item.email))
    let formData = {
        users,
        start : start.getTime().toString(),
        end : end.getTime().toString(),
        resume
    }
    axios
    .post(baseURL, formData)
    .then((response) => {
        const aux =[]
        setemailstate(aux)
        setResume();
        alert('Interview was successfully created');
    })
    .catch((error) => {
      alert(error.response.data.error)
      console.log(error.response.data.error)
    });

  }
 
  const isSelected = (email) => emails.indexOf(email) !== -1;

  return loading? <div> loading... </div> : (

    <div className={classes.root}>
      <div>
           <h2 style={{fontFamily: "arial" , color : "#162252"}}> Select Time</h2>
           <span style={{fontFamily: "verdana"}}>Start Time : </span>
            <DateTimePicker
                onChange={setStart}
                value={start}
            />
            <br/>
            <span style={{fontFamily: "verdana"}}>End Time : </span>
            <DateTimePicker
                onChange={setEnd}
                value={end}
            />
      </div>

      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={emails.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle" 
            aria-label="enhanced table"
          >
            
            <TableBody>
              { items 
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => {
                  const isItemSelected = isSelected(user.email);

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, user.email)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={user.email}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                        />
                      </TableCell>
                      <TableCell component="th"   scope="row" padding="none">
                        {user.email}
                      </TableCell> 
                    </TableRow>
                  );
                })}
               
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination 
          component="div"
          rowsPerPageOptions={[5]}
          count={items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
        />
      </Paper>
       Select Resume
       <input type="file" name="resume" accept="application/pdf" onChange={(e) => handleResume(e)}/>
        
       { resume && <embed src={resume} width="400px" height="100px" />  }

      <Button variant="primary" onClick = {()=>handleSubmit()}>Create Interview</Button>
    </div>
  );
}
