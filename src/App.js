import logo from './logo.svg';
import './src/App.scss';
import React, { useState, Compnent } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
const axios = require('axios');

class Transleft extends React.Component {
  constructor(props) {
    super(props);
    this.voteUp = this.voteUp.bind(this);
    this.voteDown = this.voteDown.bind(this);
    this.state = {
      ok: false
    };
  }

  voteUp(e) {
    this.props.onVoteChange(true);
  }
  voteDown(e) {
    this.props.onVoteChange(false);
  }

  render() {
    let message;
    if (this.state.ok == true){
      message = <h5>De vertaling was goed!</h5>
    } else {
      message = <h5>De vertaling was slecht.</h5>
    }
    return (

      <div>
          <style type="text/css">
   
  </style>
        <Container fluid >
          <Row>
            <Col>
            <Button variant="primary" size="sm" onClick={ async ()=>{
              const res = await axios.post("http://localhost:8082/api/translation",{input: this.props.foreign, output: this.props.english,lang: "nl", accepted: true, time: -1});
              
              this.setState({ok: true});
            }}>👍</Button>
            <Button variant="primary" size="sm"onClick={ async ()=>{
              const res = await axios.post("http://localhost:8082/api/translation",{input: this.props.foreign, output: this.props.engish,lang: "nl", accepted: false, time: -1});
              this.setState({ok: false});
            }}>👎</Button>
            </Col>
            <Col>
            {this.props.english}
            </Col>
            <Col>
            <h1>⟷</h1>
            </Col>
            <Col>
            {this.props.foreign}
            </Col>
            <Col>
            {message}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

class Transright extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ok: null
    };
    this.voteUp = this.voteUp.bind(this);
    this.voteDown = this.voteDown.bind(this);

  }

  voteUp(e) {
    this.props.onVoteChange(true);
  }
  voteDown(e) {
    this.props.onVoteChange(false);
  }
  render() {
    let message;
    if (this.state.ok== true){
      message = <h5>The translation was good!</h5>
    } else {
      message = <h5>The translation was bad.</h5>
    }
    return (

      <div>
          <style type="text/css">
   
  </style>
        <Container fluid >
          <Row>
            <Col>
            {message}
            </Col>
            <Col>
            {this.props.english}
            </Col>
            <Col>
            <h1>⟷</h1>
            </Col>
            <Col>
            {this.props.foreign}
            </Col>
            <Col>
            <Button variant="primary" size="sm" onClick={ async ()=>{
              console.log(this.props.foreign);
              const res = await axios.post("http://localhost:8082/api/translation",{input: this.props.english, output: this.props.foreign,lang: "en", accepted: true, time: -1},
                {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              );
              this.setState({ok: true});
            }}>👍</Button>
            <Button variant="primary" size="sm"onClick={ async ()=>{
              const res = await axios.post("http://localhost:8082/api/translation",{input: this.props.english, output: this.props.foreign,lang: "en", accepted: false, time: -1},{
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              );
              this.setState({ok: false});
            }}>👎</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


function App() {
 
  const addEngTrans = (data) => {
    var temp = [...translations, data];
    setTranslations(temp);
};
 
  const [currEngTranslation, setCurrEngTranslation] = useState('');
  const [currForTranslation, setCurrForTranslation] = useState('');
  const [translations, setTranslations] = useState([]);
  const listout = translations.map((array)=>{
    if(array[2] == "eng"){
      return <Transright english={array[0]} foreign={array[1]} />
    }else{
      return <Transleft english={array[0]} foreign={array[1]} />
    }
  });
  return (
    <Container fluid>
      <Navbar bg="purple" variant="dark" expand="lg">
        <Navbar.Brand variant="light" href="#home">Transtable</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="http://example.com/">Survey</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <label></label>
      <Container fluid>
        <Col>
          <Row>
            <Col className="d-flex flex-column justify-content-center">
              <h2>English</h2>
              <textarea value={currEngTranslation} onChange={(e) => { setCurrEngTranslation(e.target.value)}} />
            </Col>
            <Col className="d-flex flex-column justify-content-center">
              <Button variant="primary" size="lg" onClick={async ()=>{
                  const res = await axios.get("http://localhost:8082/api/translate",{params:{text: currEngTranslation, lang:"nl"}});
                  var data = [currEngTranslation,res.data,"eng"];
                  addEngTrans(data);
                  console.log(listout);
              }}>Translate →</Button>
              <label></label>
              <Button variant="primary" size="lg" onClick={async ()=>{
                  const res = await axios.get("http://localhost:8082/api/translate",{params:{text: currForTranslation, lang:"eng"}});
                  var data = [res.data,currForTranslation,"nl"];
                  addEngTrans(data);
              }}>← Vertalen</Button>
            </Col>
            <Col className="d-flex flex-column justify-content-center">
              <h2>Nederlandse
              </h2>
              <textarea value={currForTranslation} onChange={(e) => { setCurrForTranslation(e.target.value)}} />
            </Col>
          </Row>
        </Col>
      </Container>
      <Container fluid>
        {listout}
        
      </Container>

    </Container >
  );
}

export default App;
