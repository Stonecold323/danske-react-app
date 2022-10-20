import axios from 'axios'
import { Film } from '../interfaces/Films'
import { PaginatedResponse } from '../interfaces/PaginatedResposne'
import { People } from '../interfaces/People'

const movieUrl = 'https://swapi.dev/api/films/'
const poepleUrl = 'https://swapi.dev/api/people'

export const fetchMovies = async () => {
    const response = await axios.get<PaginatedResponse<Film>>(movieUrl)
    return response.data.results
}

const fetchStarWarsPeople = () => {
    let poeple: People[] = []

    return axios.get<PaginatedResponse<People>>(poepleUrl).then(res => {
        poeple = res.data.results
        return res.data.count
    }).then(count => {
        const numberOfPagesLeft = count && Math.ceil((count - 1) / 10)
        let promises = []
        for (let i = 2; i <= numberOfPagesLeft!; i++) {
            promises.push(axios.get<PaginatedResponse<People>>(poepleUrl + `?page=${i}`))
        }
        return Promise.all(promises)
    }).then(response => {
        poeple = response.reduce((acc, data) => [...acc, ...data.data.results], poeple)
        return poeple
    }).catch(error => {
        console.log(error)
    })
}

export const showPoepleFromMovie = async (movie: Film) => {
    const characters = await fetchStarWarsPeople() as People[]
    const matchingPeople: People[] = []
    movie.characters.forEach((character) => {
        characters.forEach((person: People) => {
            const isMatching = person.url === character
            if (isMatching) {
                matchingPeople.push(person)
            }
        })
    })
    return matchingPeople
}