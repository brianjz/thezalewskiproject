import React, {Component} from "react";
import { Form, Button, Alert } from 'react-bootstrap';
import SearchBox from "./SearchBox";
import axios from "axios";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const TOKEN = process.env.REACT_APP_TOKEN;
const authConfig = {
  headers: {
      'Authorization': `Bearer: ${TOKEN}`
  }
}

class CreateRecord extends Component {
    constructor(props) {
        super(props)

        // Setting up functions
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeGivenNames = this.onChangeGivenNames.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangeMaidenName = this.onChangeMaidenName.bind(this);
        this.onChangePaper = this.onChangePaper.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeNotes = this.onChangeNotes.bind(this);
        this.onChangeFindAGrave = this.onChangeFindAGrave.bind(this);
        this.onChangeWikiTree = this.onChangeWikiTree.bind(this);
        this.onChangeCemOrg = this.onChangeCemOrg.bind(this);
        this.onChangeBillion = this.onChangeBillion.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            date: '',
            title: '',
            givennames: '',
            surname: '',
            maidenname: '',
            paper: '',
            type: '',
            age: '',
            address: '',
            notes: '',
            sites: {},
            isEdit: false,
            message: '',
            error: ''
        }
    }

    componentDidMount() {
      if(this.props.recId) {
        axios.get(`${API_ENDPOINT}/api/record/${this.props.recId}`)
          .then((response)=>{
            this.setState(response.data.record);
            this.setState({isEdit: true});
          });      
        }
        console.log(this.state)
    }

    onChangeDate(e) {
      this.setState({date: e.target.value})
    }

    onChangeTitle(e) {
      this.setState({title: e.target.value})
    }

    onChangeGivenNames(e) {
      this.setState({givennames: e.target.value})
    }

    onChangeSurname(e) {
      this.setState({surname: e.target.value})
    }

    onChangeMaidenName(e) {
      this.setState({maidenname: e.target.value})
    }

    onChangePaper(e) {
      this.setState({paper: e.target.value})
    }

    onChangeType(e) {
      this.setState({type: e.target.value})
    }

    onChangeAge(e) {
      this.setState({age: e.target.value})
    }

    onChangeAddress(e) {
      this.setState({address: e.target.value})
    }

    onChangeNotes(e) {
      this.setState({notes: e.target.value})
    }

    onChangeFindAGrave(e) {
      let siteTemp = this.state.sites;
      siteTemp.findagrave = e.target.value;
      this.setState({sites: siteTemp})
    }
    onChangeWikiTree(e) {
      let siteTemp = this.state.sites;
      siteTemp.wikitree = e.target.value;
      this.setState({sites: siteTemp})
    }
    onChangeCemOrg(e) {
      let siteTemp = this.state.sites;
      siteTemp.cemeteriesorg = e.target.value;
      this.setState({sites: siteTemp})
    }
    onChangeBillion(e) {
      let siteTemp = this.state.sites;
      siteTemp.billiongraves = e.target.value;
      this.setState({sites: siteTemp})
    }

    onSubmit(e) {
        e.preventDefault()

        const recordObject = {
          date: this.state.date,
          title: this.state.title,
          givennames: this.state.givennames,
          surname: this.state.surname,
          maidenname: this.state.maidenname,
          paper: this.state.paper,
          type: this.state.type,
          age: this.state.age,
          address: this.state.address,
          notes: this.state.notes,
          sites: this.state.sites,
        }
        if(this.state.isEdit) {
          axios.post(`${API_ENDPOINT}/api/record/edit/${this.state._id}`, recordObject, authConfig)
              .then(res => {
                if(res.data.updated) {
                  this.setState({message: 'Updated!', error: ''});
                } else {
                  this.setState({error: res.data.error, message: ''});
                }
              });
        } else {
          axios.post(`${API_ENDPOINT}/api/record/add`, recordObject, authConfig)
              .then(res => {
                  console.log(res.data);
                  if(res.data.ackowledged) {
                      console.log(`Added - ${res.data.insertedId}`);
                  } else {
                      console.log("Error");
                  }
              });

          this.setState({
            date: '',
            title: '',
            givennames: '',
            surname: '',
            maidenname: '',
            paper: '',
            type: '',
            age: '',
            address: '',
            notes: '',
            sites: {}
          });
        }
    }

  render() {
    return (<div className="form-wrapper row">
      <div className="col-md-8 col-12 bg-secondary bg-opacity-50 p-3 rounded">
      {(this.state.message !== '') && 
          <Alert variant='success' className='col-md-12 col-12'>
            {this.state.message}
          </Alert>
      }
      {(this.state.error !== '') && 
          <Alert variant='danger' className='col-md-12 col-12'>
            {this.state.error}
          </Alert>
      }
      <Form className="form row" onSubmit={this.onSubmit}>
      <Form.Group className="col-6" controlId="Date">
          <Form.Label>Posted Date</Form.Label>
          <Form.Control type="text" value={this.state.date} placeholder="YYYY-MM-DD" onChange={this.onChangeDate} />
        </Form.Group>

      <Form.Group className="col-6" controlid="GivenNames">
          <Form.Label>Given Name(s)</Form.Label>
          <Form.Control type="text" value={this.state.givennames} onChange={this.onChangeGivenNames} />
        </Form.Group>

        <Form.Group className="col-6" controlid="Title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={this.state.title} onChange={this.onChangeTitle} />
        </Form.Group>

        <Form.Group className="col-6" controlid="Surname">
          <Form.Label>Surname</Form.Label>
          <Form.Control type="text" value={this.state.surname} onChange={this.onChangeSurname} />
        </Form.Group>

        <Form.Group className="col-6" controlid="MaidenName">
          <Form.Label>Maiden Name</Form.Label>
          <Form.Control type="text" value={this.state.maidenname} onChange={this.onChangeMaidenName} />
        </Form.Group>

        <Form.Group className="col-6" controlid="Paper">
          <Form.Label>Paper</Form.Label>
          <Form.Select value={this.state.paper} onChange={this.onChangePaper}>
            <option value="">-- Select Paper --</option>
            <option value="Journal">Milwaukee Journal</option>
          </Form.Select>
          {/* <Form.Control type="text" value={this.state.paper} /> */}
        </Form.Group>

        <Form.Group className="col-6" controlid="Type">
          <Form.Label>Type</Form.Label>
          <Form.Select value={this.state.type} onChange={this.onChangeType}>
            <option value="">-- Select Type --</option>
            <option value="Article">Article</option>
            <option value="Burial">Burial</option>
            <option value="Death Notice">Death Notice</option>
            <option value="Obituary">Obituary</option>
          </Form.Select>
          {/* <Form.Control type="text" value={this.state.type} onChange={this.onChangeType} /> */}
        </Form.Group>

        <Form.Group className="col-6" controlid="Age">
          <Form.Label>Age</Form.Label>
          <Form.Control type="text" value={this.state.age} onChange={this.onChangeAge} />
        </Form.Group>

        <Form.Group className="col-6" controlid="Address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" value={this.state.address} onChange={this.onChangeAddress} />
        </Form.Group>

        <Form.Group className="col-6" controlid="Notes">
          <Form.Label>Notes</Form.Label>
          <Form.Control type="text" value={this.state.notes} onChange={this.onChangeNotes} />
        </Form.Group>

        <Form.Group className="col-6" controlid="FindAGrave">
          <Form.Label>Find-A-Grave ID</Form.Label>
          <Form.Control type="text" value={this.state.sites.findagrave} onChange={this.onChangeFindAGrave} />
        </Form.Group>

        <Form.Group className="col-6" controlid="WikiTree">
          <Form.Label>WikiTree ID</Form.Label>
          <Form.Control type="text" placeholder="Surname-##" value={this.state.sites.wikitree} onChange={this.onChangeWikiTree} />
        </Form.Group>

        <Form.Group className="col-6" controlid="CemOrg">
          <Form.Label>Cemeteries.Org ID</Form.Label>
          <Form.Control type="text" value={this.state.sites.cemeteriesorg} onChange={this.onChangeCemOrg} />
        </Form.Group>

        <Form.Group className="col-6" controlid="Billion">
          <Form.Label>BillionGraves ID</Form.Label>
          <Form.Control type="text" placeholder="Name/ID" value={this.state.sites.billiongraves} onChange={this.onChangeBillion} />
        </Form.Group>

        <Button className="ms-2 mt-2 col-3" variant="success" size="lg" type="submit">
          {this.state.isEdit ? 'Update Record' : 'Create Record'}
        </Button>
        <a href={`/record/${this.state._id}`} className="btn btn-primary col-3 btn-lg mt-2 ms-2">&laquo; Back to Record</a>
      </Form>
      </div>
      <div className="col-12 mt-3">
        <SearchBox record={this.state} />
      </div>
      </div>);
  }
}

export default CreateRecord;