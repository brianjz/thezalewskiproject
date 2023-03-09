import React, {Component} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchBox from "./SearchBox";
import axios from "axios";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const TOKEN = process.env.REACT_APP_TOKEN;
const authConfig = {
  headers: {
      'Authorization': `Bearer: ${TOKEN}`
  }
}
const StyledForm = styled.form`
display: grid;
grid-template-columns: 1fr 1fr;
width: 80%;

input.submit {
  width: initial;
  font-size: 1.3rem;
}
`;

const StyledSearchBox = styled.div`
padding: 20px;
margin: 20px;
background-color: var(--dark-slate);
border-radius: var(--border-radius);
width: 80%;
`;

const StyledGroup = styled.div`
padding: 10px;

label {
  padding-right: 10px;
}
input, select {
  border-radius: var(--border-radius);
  height: 3rem;
  width: 100%;
  border: 1px solid #666;
  font-size: 1.3rem;
  padding: 10px;
  background-color: #ccc;
}
`;

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
          <div className="alertbox success">
            {this.state.message}
          </div>
      }
      {(this.state.error !== '') && 
          <div className="alertbox danger">
            {this.state.error}
          </div>
      }
      <StyledForm className="form row" onSubmit={this.onSubmit}>
        <StyledGroup className="col-6" controlId="Date">
            <label>Posted Date</label>
            <input type="text" value={this.state.date} placeholder="YYYY-MM-DD" onChange={this.onChangeDate} />
          </StyledGroup>

        <StyledGroup className="col-6" controlid="GivenNames">
            <label>Given Name(s)</label>
            <input type="text" value={this.state.givennames} onChange={this.onChangeGivenNames} />
          </StyledGroup>

          <StyledGroup className="col-6" controlid="Title">
            <label>Title</label>
            <input type="text" value={this.state.title} onChange={this.onChangeTitle} />
          </StyledGroup>

          <StyledGroup className="col-6" controlid="Surname">
            <label>Surname</label>
            <input type="text" value={this.state.surname} onChange={this.onChangeSurname} />
          </StyledGroup>

          <StyledGroup className="col-6" controlid="MaidenName">
            <label>Maiden Name</label>
            <input type="text" value={this.state.maidenname} onChange={this.onChangeMaidenName} />
          </StyledGroup>

          <StyledGroup className="col-6" controlid="Paper">
            <label>Paper</label>
            <select value={this.state.paper} onChange={this.onChangePaper}>
              <option value="">-- Select Paper --</option>
              <option value="Journal">Milwaukee Journal</option>
            </select>
          </StyledGroup>

          <StyledGroup className="col-6" controlid="Type">
            <label>Type</label>
            <select value={this.state.type} onChange={this.onChangeType}>
              <option value="">-- Select Type --</option>
              <option value="Article">Article</option>
              <option value="Burial">Burial</option>
              <option value="Death Notice">Death Notice</option>
              <option value="Obituary">Obituary</option>
            </select>
          </StyledGroup>

          <StyledGroup className="col-6" controlid="Age">
            <label>Age</label>
            <input type="text" value={this.state.age} onChange={this.onChangeAge} />
          </StyledGroup>

          <StyledGroup className="col-6" controlid="Address">
            <label>Address</label>
            <input type="text" value={this.state.address} onChange={this.onChangeAddress} />
          </StyledGroup>

          <StyledGroup className="col-6" controlid="Notes">
            <label>Notes</label>
            <input type="text" value={this.state.notes} onChange={this.onChangeNotes} />
          </StyledGroup>

          <StyledGroup className="col-6" controlid="FindAGrave">
            <label>Find-A-Grave ID</label>
            <input type="text" value={this.state.sites.findagrave || ''} onChange={this.onChangeFindAGrave} />
          </StyledGroup>

          <StyledGroup className="col-6" controlid="WikiTree">
            <label>WikiTree ID</label>
            <input type="text" placeholder="Surname-##" value={this.state.sites.wikitree || ''} onChange={this.onChangeWikiTree} />
          </StyledGroup>

          <StyledGroup className="col-6" controlid="CemOrg">
            <label>Cemeteries.Org ID</label>
            <input type="text" value={this.state.sites.cemeteriesorg || ''} onChange={this.onChangeCemOrg} />
          </StyledGroup>

          <StyledGroup className="col-6" controlid="Billion">
            <label>BillionGraves ID</label>
            <input type="text" placeholder="Name/ID" value={this.state.sites.billiongraves || ''} onChange={this.onChangeBillion} />
          </StyledGroup>

          <div class="button">
            <input className="submit" type="submit" value={this.state.isEdit ? 'Update Record' : 'Create Record'} />
          </div>
      </StyledForm>
      </div>
      <StyledSearchBox>
        <SearchBox record={this.state} />
      </StyledSearchBox>
      <div class="button">
        <Link className="single" to={`/deaths/record/${this.state._id}`}>&laquo; Back to Record</Link>
      </div>
      </div>
    );
  }
}

export default CreateRecord;