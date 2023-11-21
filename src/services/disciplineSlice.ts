import { IDiscipline } from "../components/disciplines/Disciplines";
import { ICourse } from "../components/courses/Course";
import { api } from "./api";

// DisciplineQuery interfaces defines the return value of a getDisciplines query.
interface DisciplinesQuery {
    disciplines: IDiscipline[]
}

// DisciplineQuery interface defines the return value a getDiscipline query.
interface DisciplineQuery {
    discipline: IDiscipline;
    courses: ICourse[]
}

const extendedApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getDisciplines: builder.query<DisciplinesQuery, void>({
            query: () => '/disciplines'
        }),
        getDiscipline: builder.query<DisciplineQuery, string>({
            query: (slug) => `/disciplines/${slug}`
        })
    })
})

export const { useGetDisciplinesQuery, useGetDisciplineQuery } = extendedApiSlice
