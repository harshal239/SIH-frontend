import axios from "axios"
import { baseurl } from "Components/baseUrl"

export const getstats = async() => {
    let userid = localStorage.getItem('userid');
    let temp;
    axios.get(baseurl + '/chart/placedUnplacedGraph/' + userid)
    .then(res=>{
        console.log(res.data);
        return res.data;
    })
    // console.log(temp);
    // return temp;

}