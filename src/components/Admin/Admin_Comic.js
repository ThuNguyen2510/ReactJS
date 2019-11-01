import React from 'react';
import {Link,Route} from 'react-router-dom';
import Nav from './Nav';
import Content from './Content';
import './Admin_Comic.css';
import {connect} from 'react-redux';
import Breadcrumb from './Breadcrumb';
class Admin_Comic extends React.Component{
    show(){
        return this.props.list.map((a,index)=>
        <tr>
            <td> <Link to={"/Comic/"+index+"/Edit"}>{a.Name}</Link></td>
            <td>{a.Author}</td>
            <td>{a.Genre_id}</td>     
            <td>
            <ul>
                <li id="but" key={index}><Link to={"/Comic/"+index+"/Edit"}><i class="far fa-edit"></i></Link></li>            
                <li id="but" key={index}><Link to={"/Comic/" +index+"/Delete"}><i id="del" class="far fa-minus-square"></i></Link></li>
            </ul>
            </td>           
        </tr>
        
        )
      }
    render() 
    {
        var a={
            float:"left"
        }
        var k="Quản lý truyện";
        return(
            <>
             <body id="page-top">
               <Nav/>
               <div id="wrapper" >                   
                   <Content /> 
                   <div id="content-wrapper" >
                        <Breadcrumb br="Quản lý truyện "/>
                
                        <div className="card mb-3">
                            <div className="card-header">
                                <i class="fas fa-table"></i>
                                Danh sách truyện
                            </div>
                        <div id="k"> <Link to="/Add_Comic"><i class="fas fa-plus"></i>Thêm truyện </Link></div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <div className="dataTables_wrapper dt-bootstrap4" id="dataTable_wrapper">
                                <div className="row">
                                    <div className="col-sm-12 col-md-6">
                                       <div className="input-group" >
                                        <input type="search" className="form-control" placeholder="Tìm tên truyện, tác giả..." aria-label="Tìm tên truyện, tác giả" name="q" autoComplete="off" onkeyup="if (!window.__cfRLUnblockHandlers) return false; initSearch(this)" data-cf-modified-ed9b747aa85a3145e1dd84eb- />
                                        <span className="input-group-btn">
                                            <button className="btn btn-primary" type="submit" >
                                            <i className="fas fa-search"></i>
                                            </button>                    
                                        </span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <table className="table table-bordered dataTable" id="dataTable">
                                                <tr role="row">
                                                    <th>Tên truyện</th>
                                                    <th>Tác giả</th>
                                                    <th>Thể loại</th>
                                                    <th>Action</th>
                                                </tr>
                                                {this.show()}
                                                   
                                            </table>

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12 col-md-5">
                                        <div class="dataTables_info" id="dataTable_info" role="status" aria-live="polite">THỐNG KÊ:{this.props.list.length} cuốn truyện</div>
                                        </div>
                                        <div className="col-sm-12 col-md-7">
                                            <div className="dataTables_paginate paging_simple_numbers">
                                                <ul className="pagination">
                                                <li className="paginate_button page-item previous disabled" id="dataTable_previous"><Link to="#" aria-controls="dataTable" data-dt-idx="0" tabindex="0" className="page-link">Previous</Link></li>
                                                <li className="paginate_button page-item active"><Link to={"/Comics/trang/"+1} aria-controls="dataTable" data-dt-idx="1" tabindex="0" className="page-link">1</Link></li>
                                                <li className="paginate_button page-item "><Link to={"/Comics/trang"+2} aria-controls="dataTable" data-dt-idx="1" tabindex="0" className="page-link">2</Link></li>
                                                <li className="paginate_button page-item "><Link to={"/Comics/trang"+3} aria-controls="dataTable" data-dt-idx="1" tabindex="0" className="page-link">3</Link></li>
                                                <li className="paginate_button page-item next" ><Link to="#" aria-controls="dataTable" data-dt-idx="0" tabindex="0" className="page-link">Next</Link></li>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                       </div>                           
            </body>
            </>
                     
           
        );
    }
}
function mapStateToProps (state)
{
  return{
    list: state.comic
  }
}
export default connect(mapStateToProps)(Admin_Comic);  