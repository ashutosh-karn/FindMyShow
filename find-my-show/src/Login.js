import * as React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import 'firebase/compat/auth';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .matches(
      /^[a-zA-Z0-9]{8,16}$/,
      'Password must be 8 to 16 characters long and only alphanumeric characters are allowed'
    )
    .required('Password is required'),
});

// Firebase configuration
const firebaseConfig = {
  // Firebase config options
  apiKey: "AIzaSyBJjXA2BDabp7dU6ZU9YIHDKucYZlslb0U",
  authDomain: "find-my-show-90548.firebaseapp.com",
  databaseURL: "https://find-my-show-90548-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "find-my-show-90548",
  storageBucket: "find-my-show-90548.appspot.com",
  messagingSenderId: "700305496947",
  appId: "1:700305496947:web:9a77e5e7eb6ff9098d8306",
  measurementId: "G-XDHQWD57H1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

  function Login() {
    const navigate = useNavigate();
  
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema,
      onSubmit: async (values) => {
        try {
          // Sign in with email and password
          await signInWithEmailAndPassword(auth, values.email, values.password);
  
          // Authentication successful, redirect to Dashboard
          navigate('/dashboard');
        } catch (error) {
          // Handle login error
          console.error('Login Error:', error);
        }
      },
    });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
