import React from 'react';
import "./Widgets.css";
import InfoIcon from "@material-ui/icons/Info";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

function Widgets() {

    const newsArticle=(heading,subtitle)=>(
        <div className="widgets__article">
            <div className="widgets__articleLeft">
            <FiberManualRecordIcon />
            </div>
            <div className="widgets__articleRight">
                 <h4>{heading}</h4>
                 <p>{subtitle}</p>
            </div>

        </div>
    )

    return (
        <div className="widgets">
             <div className="widgets__header">
               <h2>LinkedIn News</h2>
               <InfoIcon />
             </div>
             {newsArticle("Tesla is back","Top news - 8176 readers")}
             {newsArticle("Coronsvirus:India updates","Top news - 1876 readers")}
             {newsArticle("Reliance hits new highs","Oil & corporation - 400 readers")}
             {newsArticle("Bitcoin Breaks $22k","Crypto - 5670 readers")}
             {newsArticle("Is Redux too good?","Code - 324 readers")}
             {newsArticle("Oneplus releases new flagship mobile","Topnews - 7890 readers")}
        </div>
    )
}

export default Widgets;
