import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const handleSubmit = event => {
  event.preventDefault();
  window.location.href = '/create';
}

export default function UserList() {
  const classes = useStyles();



  const [users, setUsers] = useState([]);
  useEffect(() => {
    UsersGet()
  }, [])

  
  const UsersGet = async () => {
    try {
      const response = await fetch("https://r4wj0utagf.execute-api.us-east-1.amazonaws.com/prod/dynamodb");
      const result = await response.json();
      console.log(response);
      if (result && typeof result === 'object') {
        const user = {
          id: result.id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          userName: result.userName,
          cpfCnpj: result.cpfCnpj
        };
        function compare(a, b) {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        }
        setUsers(result.map((user) => ({ ...user, key: user.id })).sort(compare));
        console.log(result)
      }else {
        console.error('API response is not an array or object:', result);
      }
    } catch (error) {
      console.error('Error fetching data from API Gateway:', error);
    }
    
    
  }

  const UpdateUser = id => {
    window.location = '/update/'+id
  }

  

  const UserDelete = (id) => {
    fetch(`https://r4wj0utagf.execute-api.us-east-1.amazonaws.com/prod/deleteusuarios?id=${id}`, {
      method: 'GET'
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(id)
          UsersGet();
        } else {
          throw new Error(`Failed to delete user. Status code: ${res.status}`);
        }
      })
  };

  

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">    
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                USERS
              </Typography>
            </Box>
            <Box>
            <Button variant="contained" color="primary" type="button" onClick={handleSubmit}>
              CREATE
            </Button>
          </Box>
          </Box>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell align="left">First</TableCell>
                
                <TableCell align="left">Last Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">CPF ou CNPJ</TableCell>
                <TableCell align="left">Data</TableCell>
                <TableCell align="center">Action</TableCell>
                
                
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((result) => (
                <TableRow key={result.id}>
                  <TableCell align="right">{result.id}</TableCell>
                  <TableCell align="left">{result.firstName}</TableCell>
                  <TableCell align="left">{result.lastName}</TableCell>
                  <TableCell align="left">{result.email}</TableCell>
                  <TableCell align="left">{result.userName}</TableCell>
                  <TableCell align="left">{result.cpfCnpj}</TableCell>
                  <TableCell align="left">{result.date}</TableCell>
                  <TableCell align="center">
                  <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button key={`edit-${result.id}`} onClick={() => UpdateUser(result.id)}>Edit</Button>
                    <Button key={`delete-${result.id}`} onClick={() => UserDelete(result.id)}>Del</Button>
                  </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
      </Container>
    </div>
    
  );
}