import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types' 
import InfiniteScroll from 'react-infinite-scroll-component';
export class News extends Component {
  static defaultProps = {
    country:'in',
    pagesize:9,
    category:'general'
  }

  static propTypes = {
    country:PropTypes.string,
    pagesize:PropTypes.number,
    category:PropTypes.string
  }
  capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props){
    super(props);
    //console.log("Hello I am a constructor from news component");
    this.state = {
      articles : [],
      loading : true,
      page:1 , totalResults : 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`;
  }
  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f85123aace68483e8053c05c3c53e157&page=${this.state.page}&pageSize=${this.props.pagesize}`
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
   // console.log(parsedData);
    this.setState({articles:parsedData.articles , totalResults:parsedData.totalResults,loading:false})
  }
  async componentDidMount(){
    this.updateNews()
  }

  handleprevClick=async()=>{
  this.setState({page:this.state.page - 1});
  this.updateNews();
}
  handlenextClick=async()=>{
  this.setState({page:this.state.page + 1});
  this.updateNews();
}
  fetchMoreData = async()=>{
    this.setState({page:this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f85123aace68483e8053c05c3c53e157&page=${this.state.page}&pageSize=${this.props.pagesize}`
    // this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({articles:this.state.articles.concat(parsedData.articles) , totalResults:parsedData.totalResults})
  }
  render() {
    return (
      <>
      {/* // <div className='container my-3'> */}
         <h1  className='text-center text-white' style={{margin:'35px 0px'}}>NewsApp - Top {this.capitalizeFirstLetter(this.props.category)} headlines</h1>
          {this.state.loading && <Spinner/>}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
          style={{overflow:'hidden'}}
          >
        <div className="container my-3">
         <div className='row'>
          { this.state.articles.map((element)=>{
            return <div className='col-md-4' key={element.url}>
            <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsurl = {element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
          })}
         </div>
         </div>
         </InfiniteScroll>
         {/* <div className="container d-flex justify-content-evenly my-5">
         <button disabled={this.state.page<=1} type="button" className="btn btn-dark btn-lg" onClick={this.handleprevClick}> &larr; Previous</button>
         <button disabled={this.state.page=== Math.ceil((this.state.totalResults)/(this.props.pagesize))} type="button" className="btn btn-dark btn-lg" onClick={this.handlenextClick}>Next &rarr;</button>
         </div> */}

      </>
    )
  }
}

export default News