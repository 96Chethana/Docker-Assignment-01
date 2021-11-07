import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";


export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAcademic_year = this.onChangeAcademic_year.bind(this);
    this.onChangeSemester = this.onChangeSemester.bind(this);
    this.onChangeLecturer = this.onChangeLecturer.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      academic_year: "",
      semester: "",
      lectuer_name: "",
      published: false,

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeAcademic_year(e) {
    this.setState({
      academic_year: e.target.value
    });
  }

  onChangeSemester(e) {
    this.setState({
      semester: e.target.value
    });
  }


  onChangeLecturer(e) {
    this.setState({
      lectuer_name: e.target.value
    });
  }
  
  saveTutorial() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      academic_year: this.state.academic_year,
      semester: this.state.semester,
      lectuer_name: this.state.lectuer_name
    };

    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          academic_year: response.data.academic_year,
          semester: response.data.semester,
          lectuer_name: response.data.lectuer_name,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      title: "",
      description: "",
      academic_year: "",
      semester: "",
      lectuer_name: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form"
      style={{paddingTop:"40px"}}
      >
        {this.state.submitted ? (

          <div  className="col-md-6" style={{paddingTop:"76px", paddingBottom:"30px"}}>
            <div class="card border-success" style={{paddingTop:"12px", paddingBottom:"25px", paddingLeft:"50px", paddingRight:"50px", width:"500px", borderRadius:"40px"}}>
              <card class="card-body">
                
                <h4 style={{paddingTop:"6px", paddingBottom:"20px"}}>You submitted successfully!</h4>

            <button className="btn btn-success" onClick={this.newTutorial} 
              
            >
              <b>Add</b>
            </button> 
            </card>             
          </div>
          </div>
        ) : (

          <div class="card border-primary" 
          style={{paddingTop:"10px", paddingBottom:"12px", paddingLeft:"50px", paddingRight:"50px", borderRadius:"30px", width:"500px"}}>
            <card class="card-body">
            <div className="form-group" style={{paddingTop:"12px", paddingBottom:"12px", width:"350px"}}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
                placeholder="EC2 Instance"
              />
            </div>

            <div className="form-group"  style={{paddingTop:"12px", paddingBottom:"12px", width:"350px"}}>
              <label htmlFor="description">Description</label>
              
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
                placeholder="An Amazon EC2 instance"
                
              />
            </div>

            <div className="form-group"  style={{paddingTop:"12px", paddingBottom:"12px", width:"350px"}}>
              <label htmlFor="academic_year">Academic Year</label>
              <input
                type="text"
                className="form-control"
                id="academic_year"
                required
                value={this.state.academic_year}
                onChange={this.onChangeAcademic_year}
                name="academic_year"
                placeholder="1st Year"
              />
            </div>

            <div className="form-group" style={{paddingTop:"12px", paddingBottom:"12px", width:"350px"}}>
              <label htmlFor="semester">Semester</label>
              <input
                type="text"
                className="form-control"
                id="semester"
                required
                value={this.state.semester}
                onChange={this.onChangeSemester}
                name="semester"
                placeholder="1st Semester"
              />
            </div>

            <div className="form-group"  style={{paddingTop:"12px", paddingBottom:"30px", width:"350px"}}>
              <label htmlFor="lectuer_name">Lecturer in Charge Name</label>
              <input
                type="text"
                className="form-control"
                id="lectuer_name"
                required
                value={this.state.lectuer_name}
                onChange={this.onChangeLecturer}
                name="lectuer_name"
                placeholder="Mr. Jagath"
              />
            </div>

            <button onClick={this.saveTutorial} className="btn btn-success" style={{width:"120px", borderRadius:"20px", height:"40px"}}>
              <b>Submit</b>
            </button>
            </card>
          </div>



        )}
      </div>
    );
  }
}
