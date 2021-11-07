import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAcademic_year = this.onChangeAcademic_year.bind(this);
    this.onChangeSemester = this.onChangeSemester.bind(this);
    this.onChangeLecturer = this.onChangeLecturer.bind(this);
    this.getTutorial = this.getTutorial.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      currentTutorial: {
        id: null,
        title: "",
        description: "",
        academic_year: "",
        semester: "",
        lectuer_name: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTutorial(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        description: description
      }
    }));
  }

  onChangeAcademic_year(e) {
    const academic_year = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        academic_year: academic_year
      }
    }));
  }

  onChangeSemester(e) {
    const semester = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        semester: semester
      }
    }));
  }

  onChangeLecturer(e) {
    const lectuer_name = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        lectuer_name: lectuer_name
      }
    }));
  }
  
  getTutorial(id) {
    TutorialDataService.get(id)
      .then(response => {
        this.setState({
          currentTutorial: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentTutorial.id,
      title: this.state.currentTutorial.title,
      description: this.state.currentTutorial.description,
      academic_year: this.state.currentTutorial.academic_year,
      semester: this.state.currentTutorial.semester,
      lectuer_name: this.state.currentTutorial.lectuer_name,
      published: status
    };

    TutorialDataService.update(this.state.currentTutorial.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTutorial: {
            ...prevState.currentTutorial,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTutorial() {
    TutorialDataService.update(
      this.state.currentTutorial.id,
      this.state.currentTutorial
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The tutorial was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTutorial() {    
    TutorialDataService.delete(this.state.currentTutorial.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/tutorials')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTutorial } = this.state;

    return (
      <div>
        {currentTutorial ? (
          <div className="edit-form">
          
            <h4>Tutorial</h4>
            <form>
              <div className="form-group" style={{paddingTop:"12px", paddingBottom:"15px", width:"350px" }}>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTutorial.title}
                  onChange={this.onChangeTitle}
                />
              </div>

              <div className="form-group" style={{paddingTop:"12px", paddingBottom:"15px", width:"350px"}}>
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTutorial.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group" style={{paddingTop:"12px", paddingBottom:"15px", width:"350px"}}>
                <label htmlFor="academic_year">Academic Year</label>
                <input
                  type="text"
                  className="form-control"
                  id="academic_year"
                  value={currentTutorial.academic_year}
                  onChange={this.onChangeAcademic_year}
                />
              </div>

              <div className="form-group" style={{paddingTop:"12px", paddingBottom:"15px", width:"350px"}}>
                <label htmlFor="semester">Semester</label>
                <input
                  type="text"
                  className="form-control"
                  id="semester"
                  value={currentTutorial.semester}
                  onChange={this.onChangeSemester}
                />
              </div>

              <div className="form-group" style={{paddingTop:"12px", paddingBottom:"15px", width:"350px"}}>
                <label htmlFor="lectuer_name">Lecturer in Charge Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lectuer_name"
                  value={currentTutorial.lectuer_name}
                  onChange={this.onChangeLecturer}
                />
              </div>

              <div className="form-group" style={{paddingTop:"10px", paddingBottom:"25px"}}>
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTutorial.published ? "Published" : "Pending"}
              </div>
            </form>

            <div>
              {currentTutorial.published ? (
                <button
                  className="btn btn-info mr-2"
                  onClick={() => this.updatePublished(false)}
                  style={{width:"100px", borderRadius:"20px", height:"40px"}}

                >
                  UnPublish
                </button>
              ) : (
                <button
                  className="btn btn-secondary mr-2"
                  onClick={() => this.updatePublished(true)}
                  style={{width:"100px", borderRadius:"20px", height:"40px"}}
                >
                  Publish
                </button>
              )}
              
              <button
                className="btn btn-danger mr-2"
                onClick={this.deleteTutorial}
                style={{width:"100px", borderRadius:"20px", height:"40px"}}
              >
                Delete
              </button>

              <button
                type="submit"
                className="btn btn-warning"
                onClick={this.updateTutorial}

                style={{width:"100px", borderRadius:"20px", height:"40px"}}
              >
                Update
              </button>

              </div>
               
              <p style={{paddingTop:"20px", textAlign:"center"}}>{this.state.message}</p>
        
         

        </div>
      
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}
