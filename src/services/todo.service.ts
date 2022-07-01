import { writable, derived } from "svelte/store";

export interface Todo {
    id: string;
    description: string;
}

const store = writable<Todo[]>([]);

export const allTodos = derived(store, ($store) => $store);
export const getTodoById = (id: string) => {
    return derived(store, (($store) => $store.filter(item => item[id])))
}

const changeAddTodo = (todo: Todo) => {
    // some immutable logic that uses store.set to update 
}

const deleteTodo = (todo: Todo) => {
    // some immutable logic that uses store.set to update 
}

export const todoService = {
    allTodos,
    getTodoById,
    changeAddTodo,
    deleteTodo
}