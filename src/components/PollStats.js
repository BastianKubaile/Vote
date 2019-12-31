import React from "react";
import BaseComponent from "./lib/BaseComponent";
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, HorizontalBarSeries, VerticalBarSeries} from 'react-vis';

class PollStats extends BaseComponent{
    constructor(props){
        super(props);
        let results = [];
        for(let submition of props.submitions){
            for(let selected of submition.selected){
                while(selected > results.length-1){
                    results.push(0);
                }
                results[selected]++;
            }
        }
        this.state = {
            results
        }
    }

    render(){
        let mydata = [];
        for(let i = 0; i < this.state.results.length; i++){
            mydata.push({
                x: `Antwort ${i}`,
                y: this.state.results[i]
            })
        }
        return (
            <div className="PollStats">
                <XYPlot
                    xType="ordinal"
                    width={300}
                    height={300}
                    xDistance={100}
                    stackBy="y">
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <VerticalBarSeries data={mydata} />
                </XYPlot>
            </div>
        )
    }
}

export default PollStats;