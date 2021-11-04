import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {Bar} from 'react-chartjs-2'

const GET_COUNTRIES = gql`

    {
        countries{
            name
            continent{
                
                name
            }
        }
    }
`;

const CountriesGraphic = () => {

    const { loading, error, data } = useQuery(GET_COUNTRIES)
    if (loading) return <p>Loading data...</p>
    if (error) return <p>Error</p>
    //[2,4,5,7]
    let labels = [];
    let cant = [];
    let result = data.countries.reduce(function (r, a) {

        if (!r[a.continent.name]) {
            labels.push(a.continent.name);
            r[a.continent.name] = 1;
        } else {
            r[a.continent.name]++;
        }

        return r;
    }, Object.create(null));

    for (var i in result)
        cant.push(result[i]);

    var list = [];
    for (var j = 0; j < labels.length; j++)
        list.push({ 'labels': labels[j], 'cant': cant[j] });

    list.sort(function (a, b) {
        return ((a.cant > b.cant) ? -1 : ((a.cant == b.cant) ? 0 : 1));
    });

    for (var k = 0; k < list.length; k++) {
        labels[k] = list[k].labels;
        cant[k] = list[k].cant;
    }

    console.log(labels);
    console.log(cant);

    const datos={
        labels:labels,
        datasets:[{
            indexAxis: 'y',
            label:'Continentes',
            backgroundColor:'rgba(0,255,0,1)',
            borderColor:'black',
            borderWith:1,
            hoverBackgroundColor:'rgba(0,255,0,0,2)',
            hoverBorderColor: '#FF0000',
            data:cant
        }]
    }

    const opciones={
        indexAxis: 'y',
        maintainAspectRatio:false,
        responsive:true
    }

    return (

        <div className="row">
            <div className="col-md-6 offset-md-3">
                {
                    <Bar data={datos} optiones={opciones} />
                }
            </div>
        </div>
    )
}

export default CountriesGraphic;