import { ITask } from "../types";

export const mockTask: ITask[] = [
    {
        number: 1,
        header: "Сделаьть хуйню",
        description: "Сделать хуйню качественно и со вкусом",
        date: "02.02.2025",
        timeAtWork: "6 часов",
        endDate: "04.02.2025",
        priority: "easy",
        status: "queue",
        comments: []
    },
    {
        number: 2,
        header: "пукнуть",
        description: "Сделать хуйню качественно и со вкусом",
        date: "02.02.2025",
        timeAtWork: "5 часов",
        endDate: "04.02.2025",
        priority: "normal",
        status: "queue",
        comments: []
    },
    {
        number: 3,
        header: "покакать",
        description: "Сделать хуйню качественно и со вкусом",
        date: "02.02.2025",
        timeAtWork: "2 часа",
        endDate: "04.02.2025",
        priority: "hard",
        status: "queue",
        comments: []
    },

]

export const mockStatus = [
    { status: "queue" }, { status: "development" }, { status: "done" }
]