import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";


export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTutorials() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  removeAllTutorials() {
    TutorialDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });

    TutorialDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, tutorials, currentTutorial, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-10" style={{paddingTop:"30px", paddingBottom:"8px"}}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append mr-sm-2" >

              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="button"
                onClick={this.searchTitle}
                
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4 style={{paddingTop:"12px", paddingBottom:"30px"}}>Tutorials List</h4>

          <ul className="list-group">
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.title}
                </li>
              ))}
          </ul>

          <button
            className="mt-5 btn btn-sm btn-danger"
            onClick={this.removeAllTutorials}
            style={{width:"140px", borderRadius:"20px", height:"40px"}}
          >
           <b> Remove All</b>
            
          </button>
        </div>
        
        <div className="col-md-6" style={{paddingTop:"76px", paddingBottom:"30px", paddingLeft:"50px"}}>
          {currentTutorial ? (
            <div class="card border-primary" 
            style={{paddingTop:"12px", paddingBottom:"12px", paddingLeft:"50px", paddingRight:"50px", borderRadius:"30px", width:"500px"}}>
              
              <card class="card-body">
              <h4 >Tutorial</h4>
              <div style={{paddingTop:"12px"}}>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentTutorial.title}
              </div>

              <div style={{paddingTop:"5px"}}>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTutorial.description}
              </div>

              <div style={{paddingTop:"5px"}}>
                <label>
                  <strong>Academic Year:</strong>
                </label>{" "}
                {currentTutorial.academic_year}
              </div>

              <div style={{paddingTop:"5px"}}>
                <label>
                  <strong>Semester:</strong>
                </label>{" "}
                {currentTutorial.semester}
              </div>

              <div style={{paddingTop:"5px"}}>
                <label>
                  <strong>Lecturer in Charge Name:</strong>
                </label>{" "}
                {currentTutorial.lectuer_name}
              </div>

              <div style={{paddingTop:"5px", paddingBottom:"25px"}}>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTutorial.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/tutorials/" + currentTutorial.id}
                className="btn btn-primary"
                style={{width:"110px", borderRadius:"20px", height:"40px"}}
              >
                <b>Edit</b>
              </Link>

              </card>
            </div>
          ) : (
            <div class="alert alert-info" role="alert" style={{borderRadius:"30px"}}>
                <p style={{paddingTop:"10px", textAlign:"center"}}><b>Please click on a Tutorial...</b></p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
