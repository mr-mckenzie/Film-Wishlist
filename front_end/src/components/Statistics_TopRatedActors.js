import StatisticsFunctions from "../services/StatisticsFunctions"
import { BarChart, Bar, XAxis} from "recharts";

const TopRatedActors = ({ratedFilms}) => {

    let data = []

    const setData = (filmList) => {

        if (filmList.length > 0) {
            console.log("RATED FILMS", filmList)
            const actorArray = StatisticsFunctions.getArrayOfActorsByRating(filmList)
            console.log("ACTOR ARRAY", actorArray)
            for (const actor of actorArray) {
                data.push({"name":actor[0], "rating":actor[3], "films":actor[2]})
            }
        }
    }

    setData(ratedFilms)

    console.log("DATA", data)

    return (
        <BarChart width={800} height={400} data={data.slice(0,10)}>
            <XAxis dataKey={"name"}/>
            <Bar dataKey="rating" fill="blue" label={{position:'top'}}/>
            <Bar dataKey="films" fill="skyblue" label={{position:'top'}}/>
        </BarChart>
    )
}
export default TopRatedActors