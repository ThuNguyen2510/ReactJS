import React from 'react';
import Comic from './Comic';
import { connect } from 'react-redux';
import {fetchListComic} from '../actions/ComicActions';
import axios from 'axios';
class ListComic extends React.Component{

    constructor(props)
    {
      super(props)
    }
    componentDidMount()
    {

          this.props.fetchListComic();

    }
    show(){
      var result= [];

        for(var i = 0; i < this.props.list.length; i++)
        {
          result.push(<Comic  id={i} Src={this.props.list[i].Image} name={this.props.list[i].Name} author={this.props.list[i].Author}/>)
        }
      
      return result;
    }
    render()
    {
        return(
            <>                         
               {this.show()}
                <hr></hr>
            </>
        )
    }
}
const mapStateToProps = (state) =>{
  return{
    list: state.comics
  }
}



const mapDispatchToProps =(dispatch, props)=>
{
  return {
    fetchListComic : ()=>{
    dispatch(fetchListComic())

  }
}
}
export default connect(mapStateToProps,mapDispatchToProps)(ListComic);   