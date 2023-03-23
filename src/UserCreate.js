import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";


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



  const handleCreateUser = () => {
    fetch(`https://r4wj0utagf.execute-api.us-east-1.amazonaws.com/prod/createuser?varFirstName=${firstname}&varLastName=${lastname}&varEmail=${email}&varUserName=${username}&varCpfCnpj=${cpfCnpj}&varDate=${date}`, {
      method: 'GET'
    })
      .then((res) => {
        if (res.status === 200) {
          window.alert("ok")

        } else {
          window.alert("ok2")
          throw new Error(`Failed to delete user. Status code: ${res.status}`);
        }
      })
  };

  /*
  const handleSubmit = (event) => {
    event.preventDefault();

    // Chamada GET para a API Gateway com os parâmetros necessários
    const date = new Date().toISOString().slice(0, 10);
    const apiURL =
      "https://r4wj0utagf.execute-api.us-east-1.amazonaws.com/prod/createuser?" +`varFirstName=${firstname}` +`&varLastName=${lastname}` +`&varEmail=${email}` +`&varUserName=${username}` +`&varCpfCnpj=${cpfCnpj}` +`&varDate=${date}`;

    axios.get(apiURL).then((res) => {
      alert(res.data.message);
      if (res.data.status === "200") {
        
      }
    });
  };
  */
  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          User
        </Typography>
        <form className={classes.form} onSubmit={handleCreateUser}>
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
            onClick={handleCreateUser} 
            className={classes.submit}
            
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
  
}
