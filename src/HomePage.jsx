import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
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
  window.location.href = '/HomePage';
}
export default function HomePage() {
  const [user, setUser] = useState(null);
  const history = useHistory();
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  useEffect(() => {
    UsersGet()
  }, [])
  const handleSubmit = event => {
    event.preventDefault();
    window.location.href = '/create';
  }

  const UsersGet = async () => {
    try {
      const response = await fetch("https://sngx3c6fe7.execute-api.sa-east-1.amazonaws.com/dev/consulta");
      const result = await response.json();
      const username = localStorage.getItem('username');
      const email = localStorage.getItem('email');
      console.log(response);
      console.log(username);
      console.log(email);
      if (result && typeof result === 'object') {
        const user = {
          //id: result.id,
          username: result.username,
          pontos: result.pontos
        };
        function compare(a, b) {
          if (a.pontos > b.pontos) {
            return -1;
          }
          if (a.pontos < b.pontos) {
            return 1;
          }
          return 0;
        }
        
        setUsers(result.map((user, index) => ({
          ...user,
          key: user.pontos,
          Posicao: index + 1
        })).sort(compare));
        console.log(result)
      }else {
        console.error('API response is not an array or object:', result);
      }
    } catch (error) {
      console.error('Error fetching data from API Gateway:', error);
    }
  }
  const MinhaPosicao = async () => {
    try {
      const response = await fetch("https://sngx3c6fe7.execute-api.sa-east-1.amazonaws.com/dev/consulta");
      const result = await response.json();
      const username = localStorage.getItem('username');
      const email = localStorage.getItem('email');
      console.log(response);
      console.log(username);
      console.log(email);
      if (result && typeof result === 'object') {
        const user = {
          id: result.id,
          username: result.username,
          pontos: result.pontos
        };
        function compare(a, b) {
          if (a.pontos > b.pontos) {
            return -1;
          }
          if (a.pontos < b.pontos) {
            return 1;
          }
          return 0;
        }
        setUsers(result.map((user) => ({ ...user, key: user.pontos })).sort(compare));
        console.log(result)
      }else {
        console.error('API response is not an array or object:', result);
      }
    } catch (error) {
      console.error('Error fetching data from API Gateway:', error);
    }
  }


  useEffect(() => {
    const token = localStorage.getItem('token');
    //const username = localStorage.getItem('username');

    if (!token) {
      // redireciona o usuário para a página de login se o token não estiver presente
      history.push('/');
    } else {
      try {
        // decodifica o token para obter o ID do usuário
        const { user_id } = jwt_decode(token);
        // atualiza o estado do usuário com o ID decodificado
        setUser({ id: user_id });
      } catch (error) {
        // redireciona o usuário para a página de login se o token for inválido
        history.push('/');
      }
    }
  }, [history]);

  if (!user) {
    // exibe uma mensagem de carregamento enquanto o usuário está sendo verificado
    return <div>Loading...</div>;
  }


  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">    
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom  align='center'>
                Praticando Saúde
              </Typography>
            </Box>
            <Box>
            <Button variant="contained" color="primary" type="button"  onClick={handleSubmit}>
              Upload
            </Button>
          </Box>
          </Box>

          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <Typography component="h2" variant="h6" color="primary" gutterBottom  align='Left' style={{ marginBottom: "16px" }}>
                  Minha posição
                </Typography>
              <TableRow>
                <TableCell align="left">Posição</TableCell>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Pontos</TableCell>
              </TableRow>
            </TableHead>
            <Typography component="h2" variant="h6" color="primary" gutterBottom  align='Left' style={{ marginBottom: "150px" }}></Typography>
          <TableHead>
              <Typography component="h2" variant="h6" color="primary" gutterBottom  align='Left'style={{ marginBottom: "50px" }}>
                  Rank Geral
                </Typography>
              <TableRow>
                <TableCell align="left">Rank</TableCell>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Pontos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell align="left">{user.username}</TableCell>
                  <TableCell align="left">{user.pontos}</TableCell>
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