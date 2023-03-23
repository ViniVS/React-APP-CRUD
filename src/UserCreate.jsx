import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";




const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UserCreate() {
  const classes = useStyles();

  const [firstname, setFname] = useState("");
  const [lastname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [date, setDate] = useState("");
  const [isError, setIsError] = useState(false);
  const [userData, setUserData] = useState(null); // novo estado


  useEffect(() => {
    fetch("https://fakestoreapi.com/users/3") // fazer uma requisição para a fakestoreapi
      .then((response) => response.json())
      .then((data) => {
        setFname(data.name.firstname);
        setLname(data.name.lastname);
        setUsername(data.username);
        setEmail(data.email);
        
        
      });
      
  }, []);
  
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

  const handleDateChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]+$/;
 

    if (regex.test(value)) {
      setDate(value);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };



  const history = useHistory();
  const handleCreateUser = () => {
    fetch(`https://r4wj0utagf.execute-api.us-east-1.amazonaws.com/prod/createuser?varFirstName=${firstname}&varLastName=${lastname}&varEmail=${email}&varUserName=${username}&varCpfCnpj=${cpfCnpj}&varDate=${date}`, {
      method: 'GET'
    })
      .then((res) => {
        if (res.status === 200) {
          
          history.push("/");
        } else {
          window.alert("Convem atualizar a pagina")
          throw new Error(`Failed to Create. Status code: ${res.status}`);
        }
      })
      history.push("/Users");
  };

 
  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          User
        </Typography>
        <form className={classes.form} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="firstname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                value={firstname}
                label="First Name"
                onChange={(e) => setFname(e.target.value)}
                
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="lastname"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                value={lastname}
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
                value={username}
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
                value={email}
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
                  autoFocus
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="DATE"
                  label="Data (ddmmyyy)"
                  onChange={handleDateChange}
                  value={date}
                  error={isError}
                  helperText={isError ? 'Digite apenas números' : ''}
                  
                />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={(cpfCnpj.length !== 11 && cpfCnpj.length !== 14 && date.length !== 8)}
            onClick={handleCreateUser}
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
  
}
