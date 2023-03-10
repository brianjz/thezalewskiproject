// import { Link } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import { CircularProgress, Typography, ThemeProvider, createTheme } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { debounceSearchRender } from 'mui-datatables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

class DeathList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      count: 1,
      rowsPerPage: 15,
      sortOrder: {},
      data: [['Loading Data...']],
      title: 'All Records',
      columns: [
        {
          name: 'date',
          label: 'Posted Date',
          options: {},
        },
        {
          name: 'surname',
          label: 'Surname',
          options: {
            customBodyRenderLite: (dataIndex) => {
              if(this.state.data[dataIndex]) {
                if(this.state.data[dataIndex][0] !== 'Loading Data...') {
                  const linkStr = <Link to={`/deaths/record/${this.state.data[dataIndex]._id}`}>{this.state.data[dataIndex].surname}</Link>
                  return linkStr;
                }
              } else {
                return '';
              }
            }
          },
        },
        {
          name: 'givennames',
          label: 'Given Name(s)',
          options: {},
        },
        {
          name: 'age',
          label: 'Age',
          options: {},
        },
        {
          name: 'type',
          label: 'Type',
          options: {},
        },
        {
          name: 'burialinfo',
          label: 'Details',
          options: {
            empty: false,
            sort: false,
            print: false,
            download: false,
            hint: 'Records with external burial records are checked.',
            customBodyRenderLite: (dataIndex) => {
              if(this.state.data[dataIndex]) {
                if(this.state.data[dataIndex][0] !== 'Loading Data...') {
                  let hasLink = false;
                  Object.keys(this.state.data[dataIndex].sites).forEach((site) => {
                    if(this.state.data[dataIndex].sites[site]) hasLink = true;
                  });
                  const linkStr = <Link to={`/deaths/record/${this.state.data[dataIndex]._id}`}>View Details</Link>
                  if(hasLink) {
                    return <>{linkStr} <FontAwesomeIcon icon={faCircleCheck} className="text-success" /></>
                  } else {
                    return linkStr;
                  }
                }
              } else {
                return '';
              }
            }
          },
        },
      ],
      isLoading: false,
      searchModifier: '',
      searchType: '',
      years: [],
      yearcounts: [],
      initialLoad: true
    };

    if(props.modifier) {
      if(props.modifier.indexOf('search') > -1) {
         let term = props.modifier.split('/')[1]
         if(term) {
          this.state.searchType = 'search';
          this.state.searchModifier = term;
          document.title = 'Milwaukee Death Index - "' + term + '" - The Zalewski Project';
          this.initialLoad = false;
         }
       } else {
        this.state.searchType = 'byYear';
        this.state.searchModifier = props.modifier;
        document.title = 'Milwaukee Death Index - ' + props.modifier + ' - The Zalewski Project';
      }
    }

    axios.get(`${API_ENDPOINT}/api/deaths/getYears`).then(res => {
      this.state.years = res.data.records;
    });
    axios.get(`${API_ENDPOINT}/api/deaths/count/all`).then(res => {
      this.state.yearcounts = res.data[0];
    });
  }

    componentDidMount() {
      this.getAllData('', {});
    }

    // get data
    getAllData = async (page, sortOrder) => {
        if(this.state.searchType === 'search') {
          this.search(this.state.searchModifier, page);
          return;
        } else if(this.state.searchType === 'byYear') {
          this.byYear(this.state.searchModifier, page);
          return;
        }
        document.title = 'Milwaukee Death Index - The Zalewski Project';
        this.setState({ isLoading: true });
        page = '/' + (page + 1);
        let sortQS = '';
        const sDir = sortOrder.direction === 'asc' ? 1 : -1;
        if(sortOrder.name) {
            sortQS = '?sort='+sortOrder.name+'&direction='+sDir
        }
   
        const url = `${API_ENDPOINT}/api/deaths${page}${sortQS}`;

        const res = await axios.get(url);
        // console.log(res);
        this.setState({ 
          data: res.data.records, 
          isLoading: false, 
          count: res.data.total, 
          sortOrder: sortOrder,
          searchModifier: '',
          searchType: 'all',
          initialLoad: false
        });
    };
  
    sort = (page, sortOrder) => {
      this.setState({ isLoading: true });
        page = '/' + (page + 1);
        let sortQS = '';
        const sDir = sortOrder.direction === 'asc' ? 1 : -1;
        if(sortOrder.name) {
            sortQS = '?sort='+sortOrder.name+'&direction='+sDir
        }
        const url = `${API_ENDPOINT}/api/deaths${page}${sortQS}`;
        axios.get(url).then(res => {
        this.setState({
          data: res.data.records,
          page: 1,
          sortOrder: sortOrder,
          isLoading: false,
          count: res.data.total,
          searchModifier: sortOrder,
          searchType: 'sort'
        });
      });
    };
    
    search = (term, page = 1) => {
      this.setState({ isLoading: true });
        const url = `${API_ENDPOINT}/api/deaths/search/${term}/${page}`;
        axios.get(url).then(res => {
        this.setState({
          data: res.data.records,
          page: page,
          isLoading: false,
          count: res.data.total,
          searchModifier: term,
          searchType: 'search'
        });
      });
    };

    byYear = (year, page = 1) => {
      let title = `Records from ${year}`;
      if(year === 'all') {
        title = "All Records";
      }
      this.setState({ isLoading: true, title: title });
      let url = `${API_ENDPOINT}/api/deaths/date/${year}/${page}`;
      if(year === 'all') {
        this.setState({
          searchModifier: '',
          searchType: ''
        }, () => {
          this.getAllData(0, {});
          return;
        });
      };
      axios.get(url).then(res => {
        this.setState({
          data: res.data.records,
          page: page,
          isLoading: false,
          count: res.data.total,
          searchModifier: year,
          searchType: 'byYear'
        });
      });
      if(!this.state.initialLoad) {
        if(year === 'all') {
          window.history.pushState({}, "", "/deaths")
        } else {
          window.history.pushState({}, "", "/deaths/"+year)
        }
      } else {
        this.setState({initialLoad:false});
      }
      document.title = 'Milwaukee Death Index - ' + year + ' - The Zalewski Project';
    }

    changePage = (page, sortOrder) => {
      this.setState({
        isLoading: true,
      });
      page = page + 1;
      this.getAllData(page, sortOrder);
    };

    darkTheme = () => createTheme({
      palette: {
        mode: 'light',
      },
    });

    render() {
      const { data, count, isLoading, rowsPerPage, sortOrder } = this.state;
  
      const options = {
        filter: false,
        responsive: 'standard',
        serverSide: true,
        count: count,
        rowsPerPage: rowsPerPage,
        rowsPerPageOptions: [],
        selectableRows: 'none',
        sortOrder: sortOrder,
        viewColumns: false,
        searchPlaceholder: 'Surname or Given Name',
        onTableChange: (action, tableState) => {
          // console.log(action, tableState);
          switch (action) {
            case 'changePage':
                this.changePage(tableState.page, tableState.sortOrder);
                break;
            case 'sort':
                this.sort(tableState.page, tableState.sortOrder);
                break;
            default:
          }
        },
        customSearchRender: debounceSearchRender(500, () => {
          // this.search(term);
        }),
        onSearchChange: (term) => {
          if(term) {
            this.search(term);
          }
        },
        onSearchClose: () => {
          this.setState({
            searchType: '', 
            searchModifier: '', 
            page: 0 
          }, () => {
            this.getAllData(0, {});
          });
        }
      };

      return (
        <div className='row'>
          <div className='col-md-5 col-12 mb-2 row'>
            <label htmlFor='name-select' className='form-label col-3'>Select a Year: </label>
            <select name='year-select' id='year-select' className='col-9' value={this.state.searchModifier} onChange={(e) => this.byYear(e.target.value)}>
              <option value="all">All Years ({this.state.yearcounts.all})</option>
              {this.state.years.map((year, i) => (
                <option key={year._id+i} value={year._id}>{year._id} ({this.state.yearcounts[year._id]})</option>
              ))}
            </select>
          </div>
          <ThemeProvider theme={this.darkTheme()}>
            <MUIDataTable className='col-12'
              title={
                <Typography variant="h6">
                  {this.state.title}
                  {isLoading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
                </Typography>
              }
              data={data}
              columns={this.state.columns}
              options={options}
            />
          </ThemeProvider>
        </div>
      );
    };
}

export default DeathList;