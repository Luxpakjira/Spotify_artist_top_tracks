import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Card,
} from "react-bootstrap";
import { response } from "express";

const CLIENT_ID = "ba12e852596d4f21980aa0dae89c6403";
const CLIENT_SECRET = "e792d58a4f364cfe8096952873deee7c";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(()=>{
    var authParam = {
      method: 'POST',
      headers:  {
        'Authorization': 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET)
      ,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:'grant_type=client_credentials'
    }

    fetch('https://accounts.spotify.com/api/token',authParam)
    .then(result => result.json())
    .then(data => setAccessToken(data.access_token))
  },[])

//Search 
    

  async function search() {
    console.log("Search for "+searchInput);
    //GET request using search to get the artistID
    var artistParams = {
      method:'GET',
      headers:{
        "Authorization": "Bearer "+accessToken
      }
    }
    var artistID=await fetch('https://api.spotify.com/v1/search?q='+searchInput+'&type=artist',artistParams)
    .then(response=>response.json)
    .then(data=>{return data.artists.items[0].id})
  }

  return (
    <div className="App">
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Search for artist"
            type="input"
            onKeyDown={(event) => {
              if (event.key == "Enter") {
                search();
              }
            }}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <Button
            onClick={() => {
              search();;
            }}
          >
            Search
          </Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className="mx-2 row row-cols-4">
          <Card>
            <Card.Img src="#"/>
            <Card.Body>
              <Card.Title>Album Name</Card.Title>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default App;
