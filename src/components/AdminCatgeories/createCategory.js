import React, { Component } from 'react';
import DashboardSidebar from '../../components/Dashboard/dashboardSidebar';
import axios from 'axios';
import { getToken } from '../Utils/common';
import { getUser } from '../Utils/common';

const token = getToken();
const user = getUser();

class createCategory extends Component {
    state = {
        catename: '',
        Tags: '',
        cateSKU: ''
    }
    
    ChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    
    submitHandler = e => {
        console.log(user.CompanyId);
        e.preventDefault();       
        axios({
            method: 'POST',
            responseType: 'json',
            url: 'http://18.218.124.225:3000/api/category/createCategory',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
      
            },
            data: {
                "categoryname" : this.state.catename,
                "tags" : this.state.Tags,
                "SKU": this.state.cateSKU,
                "companyid" : user.CompanyId

            }                
        })
        .then(response => {
            //debugger;            
            if(response.data.success === 0){
                this.setState({errorMessage: response.data.message});
            }else{
                this.setState({successMsg: response.data.message})
                window.location.href ='/getCategories';
            }                
        })
        .catch(error => {
            //debugger;
           console.log("Error"+error);
                this.setState({errorMessage: error.response.data.message});
            });

    };

    cancel = () => { 
        this.setState({
            catename: '',
            Tags: '',
            cateSKU: ''            
        });
    }
    render() {
      return (
        <div class="container-fluid">
            <div class="row">
                <DashboardSidebar/>
                <div class="col-md-9 ml-sm-auto col-lg-10 px-4">                    
                    { this.state.errorMessage &&
                        <p className="alert alert-danger"> { this.state.errorMessage } </p>
                    } 
                    { this.state.successMsg &&
                        <p className="alert alert alert-success"> { this.state.successMsg } </p>
                    } 
                    <div class="float-left"><h3 class="text-primary">Create Category</h3></div>
                    <form method="post" name="register" onSubmit={this.submitHandler}>
                        <div class="float-right">          
                            <input type="submit" class="btn btn-primary mb-2"  onClick={this.cancel} value="Cancel"/>
                            &nbsp;&nbsp;  <input type="submit" class="btn btn-primary mb-2"  value="Save"/>
                        </div>
                        <br></br> <br></br> <br></br>                                
                        <div class="row register-form">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="text" class="form-control input-lg" required name="catename" value={this.state.catename} onChange={e => this.ChangeHandler(e)} placeholder="Category Name*"/>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="text" class="form-control input-lg" name="cateSKU" value={this.state.cateSKU} onChange={e => this.ChangeHandler(e)} required placeholder="SKU*"/>
                                </div> 
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="text" required name="Tags" value={this.state.Tags} onChange={e => this.ChangeHandler(e)} class="form-control input-lg" placeholder="Tags"/>
                                </div> 
                            </div>
                        </div>    
                    </form>
                </div>
            </div>
        </div>  
    );
    }
  }

  export default createCategory;
          