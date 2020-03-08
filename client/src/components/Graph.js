  
// import React, {Component} from 'react';
// import {Bar, Line, Pie, Doughnut, Bubble} from 'react-chartjs-2';

// class Chart extends Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       chartData:props.chartData,
//       chartData:{}
//     }
//   }

//   static defaultProps = {
//     displayTitle:true,
//     displayLegend: true,
//     legendPosition:'right',
//     coin:[]
//   }

//   componentWillMount(){
//     this.getChartData();
//   }

//   getChartData(){
    
//     this.setState({
//       chartData:{
//         labels: ['BTC', 'ETH', 'XMR', 'BCH', 'ZEC'],
//         datasets:[
//           {
//             label:'%',
//             data:[
            
                        
//             ],
//             backgroundColor:[
//               'rgba(255, 99, 132, 0.6)',
//               'rgba(54, 162, 235, 0.6)',
//               'rgba(255, 206, 86, 0.6)',
//               'rgba(75, 192, 192, 0.6)',
//               'rgba(153, 102, 255, 0.6)',
//               'rgba(255, 159, 64, 0.6)',
//               'rgba(255, 99, 132, 0.6)'
//             ]
//           }
//         ]
//       }
//     });
//   }

//   render(){
//     return (
//       <div className='chart'>
//         <Bar
//           data={this.state.chartData}
//           width={100}
//           height={20}
//           // 
//           options={{
//             title:{
//               display:this.props.displayTitle,
//               text:'Monthly growth %',
//               fontSize:25,
//               color: 'white'
//             },
//             legend:{
//               display: false,
//               position:'bottom'
//             }
//           }}
//         />

//         {/* <Line
//           data={this.state.chartData}
//           options={{
//             title:{
//               display:this.props.displayTitle,
//               text:'Largest Cities In '+this.props.location,
//               fontSize:25
//             },
//             legend:{
//               display:this.props.displayLegend,
//               position:this.props.legendPosition
//             }
//           }}
//         /> */}

//         {/* <Pie
//           data={this.state.chartData}
//           options={{
//             title:{
//               display:this.props.displayTitle,
//               text:'Market Volume '+this.props.location,
//               fontSize:25
//             },
//             legend:{
//               display:this.props.displayLegend,
//               position:this.props.legendPosition
//             }
//           }}
//         /> */}
//       </div>
//     )
//   }
// }

// export default Chart;