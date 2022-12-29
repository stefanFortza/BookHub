import { Box, Container, Grid, Paper, styled } from "@mui/material";
import { FunctionComponent, HTMLProps } from "react";
import HomeImage from "../../components/homeImage/homeImage";

interface HomePageProps {}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

//"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"

const HomePage: FunctionComponent<HomePageProps> = () => {
  return (
    <Container>
      <Grid container spacing={2} mt={5}>
        <Grid item xs={12} md={6} lg={4}>
          <Item>
            <HomeImage
              title="Fantasy"
              to="/books/category/fantasy"
              sx={{
                height: "400px",
                width: "100%",
                borderRadius: "20px",
                mt: "20px",
                filter: "brightness(50%)",
              }}
              image="https://images.unsplash.com/photo-1535905557558-afc4877a26fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
            />
          </Item>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Item>
            <HomeImage
              title="Classic"
              to="/books/category/classic"
              sx={{
                height: "400px",
                width: "100%",
                borderRadius: "20px",
                mt: "20px",
                filter: "brightness(50%)",
              }}
              image="https://images.unsplash.com/photo-1509266272358-7701da638078?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1286&q=80"
            />
          </Item>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Item>
            <HomeImage
              title="Adventure"
              to="/books/category/adventure"
              sx={{
                height: "400px",
                width: "100%",
                borderRadius: "20px",
                mt: "20px",
                filter: "brightness(50%)",
              }}
              image="https://images.unsplash.com/photo-1550399105-05c4a7641b02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            />
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <HomeImage
              title="Fiction"
              to="/books/category/fiction"
              sx={{
                height: "400px",
                width: "100%",
                borderRadius: "20px",
                mt: "20px",
                filter: "brightness(50%)",
              }}
              image="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            />
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
