import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title , description,imageUrl , newsurl , author , date , source} = this.props;
    return (
      <div>     
         <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
          <span className='position-absolute top-0 translate-middle badge rounded-pill bg-danger' style={{zIndex:'1',left:'90%'}}>{source}</span>
         <img src={!imageUrl?"https://images.indianexpress.com/2022/06/nerves_200_pixabay.jpg":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}..</h5>
                <p className="card-text">{description}..</p>
                <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                <a href={newsurl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
    </div>
      </div>
    )
  }
}

export default NewsItem