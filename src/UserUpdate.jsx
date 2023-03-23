import React, { useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UserUpdate() {
  const [firstname, setFname] = useState('');
  const [lastname, setLname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const [cpfCnpj, setCpfCnpj] = useState('');
  const [date, setDate] = useState("");
  const [isError, setIsError] = useState(false);
  const classes = useStyles();

  const { id } = useParams();
  const parsedId = parseInt(id);
  

  const handleSubmit = event => {
    event.preventDefault();
    var data = {
      'id': parsedId,
      'firstname': firstname,
      'lastname': lastname,
      'username': username,
      'email': email,
      'cpfCpnj': cpfCnpj,
      'DATE': date,

    }
  }
    
  const handleUpdateUser = (parsedId) => {
      fetch(`https://r4wj0utagf.execute-api.us-east-1.amazonaws.com/prod/edituser?id=${id}&varfirstName=${firstname}&varlastName=${lastname}&varEmail=${email}&varUserName=${username}&varCpfCnpj=${cpfCnpj}&varDate=${date}`, {
        method: 'GET'
      })
        .then((res) => {
          if (res.status === 200) {
            window.location.href = '/';
          } else {
            console.log(parsedId)
            window.alert(id)
            throw new Error(`Failed to update user. Status code: ${id}`);
          }
        })
    };






  const handleCpfCnpjChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]+$/;

    if (regex.test(value)) {
      setCpfCnpj(value);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  return (
      <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          User
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="firstname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={(e) => setFname(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                onChange={(e) => setLname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="CPFCNPJ"
                  label="CPF ou CNPJ"
                  onChange={handleCpfCnpjChange}
                  value={cpfCnpj}
                  error={isError}
                  helperText={isError ? 'Digite apenas números' : ''}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="DATE"
                  label="Data"
                  onChange={(e) => setDate(e.target.value)}
                  
                />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleUpdateUser} 
            className={classes.submit}
          >
            Update
          </Button>
        </form>
      </div>
    </Container>
  );
}