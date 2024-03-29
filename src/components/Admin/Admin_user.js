import './Admin_user.css';
import React from 'react';
import Nav from './Nav'
import Content from './Content';
import Breadcrumb from './Breadcrumb';
import {getListUserFull,getListUserLimit,ChangeRole,deleteUser,Search} from './../../actions/ManagerUserAction';
import {connect} from 'react-redux'
class Admin_user extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={}
    }    
    componentDidMount()
    {
       
       this.props.getListUserFull()
    }
  
    show()
    {
        var result=[]
        if(this.props.list!=null)
        {
           
            result=this.props.list.map((a,index)=>{
                return <tr>
                     <td>{a.username}</td>
                    <td>{a.email}</td>                   
                    <td>
                       <select onChange= {(e) =>{if(window.confirm("Are you sure!!")) {this.props.ChangeRole(e.target.value,a.id)}}}>
                          <option value={1} selected={a.role==1}>Admin</option>
                          <option value={0} selected={a.role==0} >Viewer</option>
                       </select>
                        </td>
                    <td>
                        <button id={a.id} onClick={e=>{if(window.confirm("Are you sure!!")){ this.props.deleteUser(a.id) }} }><i class="fas fa-user-minus"></i></button>
                    </td>
                </tr>
            })
        }
        else{
            result=this.props.list_limit.map((a,index)=>{
                return <tr>
                     <td>{a.username}</td>
                    <td>{a.email}</td>                   
                    <td>
                       <select onChange= {(e) =>{if(window.confirm("Are you sure!!")) {this.props.ChangeRole(e.target.value,a.id) }}}>
                          <option value={a.role} selected={a.role==1}>Admin</option>
                          <option value={a.role} selected={a.role==0} >Viewer</option>
                       </select>
                        </td>
                    <td>
                        <button onClick={e=> {if(window.confirm("Are you sure!!")){this.props.deleteUser(a.id) }}} id={a.id}><i class="fas fa-user-minus"></i></button>
                    </td>
                </tr>
            })
        }
        return result;
    }
    option()
    {
        var op=[]
        var max=20
        if(this.props.list!=null)
        {
            max=this.props.list.length
            for(var i=1;i<=max;i++)
            op.push( <option id={i} value={i}>{i} </option>)
            return op
        } else {
            max=localStorage.getItem('total_user')
            for(var i=1;i<=max;i++)
            op.push( <option id={i} value={i}>{i} </option>)
            return op
        }
        

    }
    render(){
        let {search}=this.state
        return (
            <>
             <div className="containers">
               <div className="row" >                   
                    <div className="col-md-2 col-lg-2">
                        <Content /> 
                    </div>
                   
                   <div className="col-md-10 col-lg-10" >
                        <Nav/>
                        <Breadcrumb br="Quản lý user"/>
                
                        <div className="card mb-3">
                            <div className="card-header">
                               
                               <p> <i class="fas fa-table"></i> Danh sách user</p>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <div className="dataTables_wrapper dt-bootstrap4" id="dataTable_wrapper">
                                        <div className="row>">
                                            <div className="col-sm-12 col-md-6">
                                                <div className="input-group" >
                                                    <input type="search" id="adsearch" value={search} onChange={e => this.setState({search: e.target.value}) }className="form-control" placeholder="Tìm theo username..." />
                                                    <span className="input-group-btn">
                                                        <button id="adbut" onClick={e=> this.props.Search(this.state.search)} className="btn btn-primary" type="submit" >
                                                        <i className="fas fa-search"></i>
                                                        </button>                    
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-6">
                                                Show
                                            <select className="custom-select d-block w-50"  onChange= {(e) => this.props.getListUserLimit(e.target.value)} >
                                                {this.option()}
                                            </select>
                                                entries
                                            </div>
                                        </div>
                                        <div className="row">
                                           
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <table className="table table-bordered dataTable" id="dataTable">
                                                    <tr role="row">
                                                        <th>UserName</th>
                                                        <th>Email</th>                                                        
                                                        <th>Role</th>
                                                        <th>Action</th>
                                                    </tr>
                                                    {this.show()}
                                                </table>
                                            </div>
                                        </div>
                                        {
                                            (this.props.list!=null) && 
                                            <div className="row">                                            
                                            <div className="dataTables_info ml-4" id="dataTable_info" role="status" aria-live="polite"><i class="fas fa-pencil-ruler mr-2"></i>THỐNG KÊ {  this.props.list.length}  user</div>                                                                         
                                            {localStorage.setItem('total_user',this.props.list.length)}
                                        </div>
                                        }
                                        {
                                            (this.props.list==null) &&
                                            <div className="row">                                            
                                            <div className="dataTables_info ml-4" id="dataTable_info" role="status" aria-live="polite"><i class="fas fa-pencil-ruler mr-2"></i>THỐNG KÊ { localStorage.getItem('total_user')}  user</div>                                                                         
                                        </div>
                                        }
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                           
            </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
     list:state.users.full,
     list_limit:state.users.limit
  }
}
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getListUserFull: ()=> dispatch(getListUserFull()),
        getListUserLimit:(end)=> dispatch(getListUserLimit(end)),
        ChangeRole:(role,user_id) => dispatch(ChangeRole(role,user_id)),
        deleteUser:(user_id) => dispatch(deleteUser(user_id)),
        Search:(keyword) => dispatch(Search(keyword))
     
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps) (Admin_user);